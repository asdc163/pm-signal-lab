#!/usr/bin/env python3
"""Verify that sample and manual source sheets keep distinct, truthful copy."""

from __future__ import annotations

import json
import os
from pathlib import Path

from playwright.sync_api import Page, sync_playwright


BASE_URL = os.environ.get("BASE_URL", "http://127.0.0.1:4179/")
CHROME_BIN = os.environ.get(
    "CHROME_BIN", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
)
REPO_ROOT = Path(__file__).resolve().parents[1]
SCREENSHOT_DIR = REPO_ROOT / "docs/product/pm-signal-lab/assets/qa"


def attach_browser_logs(page: Page, browser_errors: list[str], request_failures: list[str]) -> None:
    page.on(
        "console",
        lambda message: browser_errors.append(message.text)
        if message.type == "error"
        else None,
    )
    page.on("pageerror", lambda error: browser_errors.append(str(error)))
    page.on(
        "requestfailed",
        lambda request: request_failures.append(
            f"{request.method} {request.url}: {request.failure}"
        ),
    )


def body_text(page: Page) -> str:
    return page.locator("body").inner_text()


def inspect_session_note(page: Page) -> dict[str, object]:
    details = page.locator(".context-trace")
    summary = details.locator("summary")
    body = page.locator(".context-trace-body")
    receipt = page.get_by_role("button", name="Copy session receipt")
    report_link = page.locator(".context-trace-actions a")

    initial_closed = details.get_attribute("open") is None
    initial_body_hidden = not body.is_visible()
    summary.focus()
    summary_focused = page.evaluate(
        "document.activeElement?.classList.contains('trace-summary') === true"
    )
    page.keyboard.press("Enter")
    opened_by_keyboard = details.get_attribute("open") is not None
    receipt_visible_when_open = receipt.is_visible()
    report_visible_when_open = report_link.is_visible()
    page.keyboard.press("Enter")
    closed_after_keyboard = details.get_attribute("open") is None
    body_hidden_after_close = not body.is_visible()
    page.evaluate("document.activeElement?.blur()")

    return {
        "summary_text": " ".join(summary.inner_text().split()),
        "initial_closed": initial_closed,
        "initial_body_hidden": initial_body_hidden,
        "summary_focused": summary_focused,
        "opened_by_keyboard": opened_by_keyboard,
        "receipt_visible_when_open": receipt_visible_when_open,
        "report_visible_when_open": report_visible_when_open,
        "closed_after_keyboard": closed_after_keyboard,
        "body_hidden_after_close": body_hidden_after_close,
    }


def run_custom_source_flow(page: Page, screenshot_name: str) -> dict[str, object]:
    page.goto(BASE_URL, wait_until="networkidle")
    page.get_by_role("heading", name="Start with a source line").wait_for(state="visible")
    page.get_by_role("button", name="Add your own signal").click()
    page.get_by_role("heading", name="Write down one real observation").wait_for(
        state="visible"
    )
    page.locator("#evidence-title").fill("Interview note: next step is unclear")
    page.locator("#evidence-source").fill("Interview notes · PM-08")
    page.locator("#evidence-content").fill(
        "Three participants asked what to do after the first result appeared."
    )
    page.get_by_role("button", name="Save line").click()
    page.get_by_role("heading", name="Your source sheet").wait_for(state="visible")

    text = body_text(page)
    aria_label = page.locator(".pack-subject").get_attribute("aria-label")
    session_note = inspect_session_note(page)
    page.evaluate("window.scrollTo(0, 0)")
    page.screenshot(path=SCREENSHOT_DIR / screenshot_name, full_page=True)

    return {
        "heading_present": "Your source sheet" in text,
        "custom_subject_present": "your source notes" in text,
        "custom_boundary_present": "local sheet" in text,
        "sample_heading_absent": "Support draft review" not in text,
        "sample_boundary_absent": "fictional worksheet" not in text,
        "subject_aria_label": aria_label,
        "visible_current_actions": page.locator("[data-current-action]:visible").count(),
        "source_row_action_hidden": not page.locator(".next-action-card .button").is_visible(),
        "session_note": session_note,
    }


def run_sample_source_flow(page: Page, screenshot_name: str) -> dict[str, object]:
    page.goto(BASE_URL, wait_until="networkidle")
    page.get_by_role("heading", name="Start with a source line").wait_for(state="visible")
    page.get_by_role("button", name="Open the sample worksheet").click()
    page.get_by_role("heading", name="Support draft review").wait_for(state="visible")

    text = body_text(page)
    aria_label = page.locator(".pack-subject").get_attribute("aria-label")
    session_note = inspect_session_note(page)
    page.evaluate("window.scrollTo(0, 0)")
    page.screenshot(path=SCREENSHOT_DIR / screenshot_name, full_page=True)

    page.get_by_role("button", name="Start review").first.click()
    page.get_by_role("heading", name="Check the claim against the line").wait_for(
        state="visible"
    )
    page.get_by_role("button", name="Accept claim").click()
    page.get_by_role("button", name="Go to Decide").click()
    page.get_by_role("heading", name="Name the smallest test").wait_for(state="visible")
    page.get_by_role("button", name="Draft smallest experiment").click()
    owner_value = page.get_by_label("Owner").input_value()

    return {
        "heading_present": "Support draft review" in text,
        "sample_subject_present": "support draft" in text,
        "sample_boundary_present": "fictional worksheet" in text,
        "custom_heading_absent": "Your source sheet" not in text,
        "custom_boundary_absent": "local sheet" not in text,
        "subject_aria_label": aria_label,
        "owner_value": owner_value,
        "visible_current_actions": page.locator("[data-current-action]:visible").count(),
        "hero_action_absent": page.locator(".hero-status .button").count() == 0,
        "session_note": session_note,
    }


with sync_playwright() as playwright:
    browser_errors: list[str] = []
    request_failures: list[str] = []
    launch_options: dict[str, object] = {"headless": True}
    if Path(CHROME_BIN).exists():
        launch_options["executable_path"] = CHROME_BIN

    browser = playwright.chromium.launch(**launch_options)
    SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)

    mobile_context = browser.new_context(
        viewport={"width": 390, "height": 844}, locale="en-US"
    )
    mobile_page = mobile_context.new_page()
    attach_browser_logs(mobile_page, browser_errors, request_failures)
    custom_result = run_custom_source_flow(
        mobile_page, "custom-source-sheet-truth-390-2026-08-16.png"
    )

    desktop_context = browser.new_context(
        viewport={"width": 1440, "height": 1000}, locale="en-US"
    )
    desktop_page = desktop_context.new_page()
    attach_browser_logs(desktop_page, browser_errors, request_failures)
    sample_result = run_sample_source_flow(
        desktop_page, "custom-source-sheet-truth-sample-1440-2026-08-16.png"
    )

    result = {
        "base_url": BASE_URL,
        "custom_source_390": custom_result,
        "sample_source_1440": sample_result,
        "browser_errors": browser_errors,
        "request_failures": request_failures,
        "screenshots": [
            str(SCREENSHOT_DIR / "custom-source-sheet-truth-390-2026-08-16.png"),
            str(SCREENSHOT_DIR / "custom-source-sheet-truth-sample-1440-2026-08-16.png"),
        ],
    }
    print(json.dumps(result, indent=2))

    assert custom_result["heading_present"] is True
    assert custom_result["custom_subject_present"] is True
    assert custom_result["custom_boundary_present"] is True
    assert custom_result["sample_heading_absent"] is True
    assert custom_result["sample_boundary_absent"] is True
    assert custom_result["subject_aria_label"] == "Sheet: your source notes, local sheet"
    assert custom_result["visible_current_actions"] == 1
    assert custom_result["source_row_action_hidden"] is True
    assert custom_result["session_note"]["summary_text"] == "Session note Optional local receipt"
    assert custom_result["session_note"]["initial_closed"] is True
    assert custom_result["session_note"]["initial_body_hidden"] is True
    assert custom_result["session_note"]["summary_focused"] is True
    assert custom_result["session_note"]["opened_by_keyboard"] is True
    assert custom_result["session_note"]["receipt_visible_when_open"] is True
    assert custom_result["session_note"]["report_visible_when_open"] is True
    assert custom_result["session_note"]["closed_after_keyboard"] is True
    assert custom_result["session_note"]["body_hidden_after_close"] is True
    assert sample_result["heading_present"] is True
    assert sample_result["sample_subject_present"] is True
    assert sample_result["sample_boundary_present"] is True
    assert sample_result["custom_heading_absent"] is True
    assert sample_result["custom_boundary_absent"] is True
    assert sample_result["subject_aria_label"] == "Subject: support draft, fictional worksheet"
    assert sample_result["owner_value"] == "Owner to confirm before the test"
    assert sample_result["visible_current_actions"] == 1
    assert sample_result["hero_action_absent"] is True
    assert sample_result["session_note"]["summary_text"] == "Session note Optional local receipt"
    assert sample_result["session_note"]["initial_closed"] is True
    assert sample_result["session_note"]["initial_body_hidden"] is True
    assert sample_result["session_note"]["summary_focused"] is True
    assert sample_result["session_note"]["opened_by_keyboard"] is True
    assert sample_result["session_note"]["receipt_visible_when_open"] is True
    assert sample_result["session_note"]["report_visible_when_open"] is True
    assert sample_result["session_note"]["closed_after_keyboard"] is True
    assert sample_result["session_note"]["body_hidden_after_close"] is True
    assert browser_errors == []
    assert request_failures == []

    mobile_context.close()
    desktop_context.close()
    browser.close()
