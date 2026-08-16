#!/usr/bin/env python3
"""Verify the primary worksheet flow with keyboard activation only.

This is a browser-level keyboard fallback. It does not replace native screen
reader or Chrome Extension testing.
"""

from __future__ import annotations

import json
import os
from pathlib import Path

from playwright.sync_api import Locator, Page, sync_playwright


BASE_URL = os.environ.get("BASE_URL", "http://127.0.0.1:4179/")
CHROME_BIN = os.environ.get(
    "CHROME_BIN", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
)
REPO_ROOT = Path(__file__).resolve().parents[1]
SCREENSHOT_DIR = REPO_ROOT / "docs/product/pm-signal-lab/assets/qa"


def attach_browser_logs(
    page: Page, browser_errors: list[str], request_failures: list[str]
) -> None:
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


def active_element(page: Page) -> str | None:
    return page.evaluate(
        """() => {
          const element = document.activeElement;
          if (!element) return null;
          return element.id || element.getAttribute('aria-label') || element.textContent?.trim() || element.tagName;
        }"""
    )


def focus_and_press_enter(page: Page, control: Locator) -> bool:
    control.wait_for(state="visible")
    control.focus()
    focused_before_activation = control.evaluate(
        "element => document.activeElement === element"
    )
    page.keyboard.press("Enter")
    return bool(focused_before_activation)


def current_action_locator(page: Page, viewport_width: int) -> Locator:
    selector = (
        ".mobile-action-bar [data-current-action]"
        if viewport_width <= 700
        else ".context-next [data-current-action]"
    )
    action = page.locator(selector)
    action.wait_for(state="visible")
    return action


def verify_skip_link_and_blank_recovery(page: Page) -> dict[str, object]:
    page.goto(BASE_URL, wait_until="networkidle")
    page.get_by_role("heading", name="Start with a source line").wait_for(
        state="visible"
    )

    page.keyboard.press("Tab")
    skip_link = page.get_by_role("link", name="Skip to main content")
    skip_focused = skip_link.evaluate(
        "element => document.activeElement === element"
    )
    page.keyboard.press("Enter")
    page.wait_for_function(
        "document.activeElement?.id === 'main-content'"
    )
    skip_focus_target = active_element(page)

    add_signal = page.get_by_role("button", name="Add your own signal")
    add_signal_keyboard_focused = focus_and_press_enter(page, add_signal)
    page.get_by_role("heading", name="Write down one real observation").wait_for(
        state="visible"
    )

    save_line = page.get_by_role("button", name="Save line")
    save_line_keyboard_focused = focus_and_press_enter(page, save_line)
    page.wait_for_function("document.activeElement?.id === 'evidence-title'")
    title_invalid_focused = page.locator("#evidence-title").get_attribute(
        "aria-invalid"
    ) == "true"
    warning_visible = page.get_by_text(
        "Some fields need attention. Your text is still preserved.", exact=True
    ).is_visible()

    cancel = page.get_by_role("button", name="Cancel")
    cancel_keyboard_focused = focus_and_press_enter(page, cancel)
    form_closed_after_cancel = not page.get_by_role(
        "heading", name="Write down one real observation"
    ).is_visible()

    return {
        "skip_focused_after_first_tab": bool(skip_focused),
        "skip_enter_focus_target": skip_focus_target,
        "add_signal_keyboard_focused": add_signal_keyboard_focused,
        "save_line_keyboard_focused": save_line_keyboard_focused,
        "title_invalid_focused": title_invalid_focused,
        "warning_visible": warning_visible,
        "cancel_keyboard_focused": cancel_keyboard_focused,
        "form_closed_after_cancel": form_closed_after_cancel,
    }


def verify_primary_flow(
    page: Page,
    viewport_width: int,
    screenshot_name: str,
    first_run_screenshot_name: str,
) -> dict[str, object]:
    page.goto(BASE_URL, wait_until="networkidle")
    page.get_by_role("heading", name="Start with a source line").wait_for(
        state="visible"
    )

    sample_note = page.get_by_text("Sample note", exact=True)
    sample_note.wait_for(state="visible")
    source_title = page.locator(".hero-status-source-title")
    source_title.wait_for(state="visible")
    source_excerpt = page.locator(".hero-status-quote")
    source_excerpt.wait_for(state="visible")
    local_fixture_boundary = page.get_by_text("Local fixture only", exact=False).first
    local_fixture_boundary.wait_for(state="visible")
    own_signal = page.get_by_role("button", name="Add your own signal")
    own_signal.wait_for(state="visible")
    first_run_sample_note_visible = sample_note.is_visible()
    first_run_source_title = source_title.inner_text()
    first_run_source_excerpt = source_excerpt.inner_text()
    first_run_local_fixture_boundary_visible = local_fixture_boundary.is_visible()
    first_run_own_signal_visible = own_signal.is_visible()
    lower_sample_quote_count = page.locator(".empty-panel .sample-quote").count()
    no_horizontal_overflow = page.evaluate(
        "document.documentElement.scrollWidth <= document.documentElement.clientWidth"
    )
    page.screenshot(
        path=SCREENSHOT_DIR / first_run_screenshot_name,
        full_page=False,
    )

    open_sample = page.get_by_role("button", name="Open the sample worksheet")
    open_sample_keyboard_focused = focus_and_press_enter(page, open_sample)
    page.get_by_role("heading", name="Support draft review").wait_for(state="visible")
    page.wait_for_function("document.activeElement?.id === 'main-content'")
    loaded_focus_target = active_element(page)

    start_review = (
        page.locator(".mobile-action-bar [data-current-action]")
        if viewport_width <= 700
        else page.locator(".next-action-card button[data-current-action]")
    )
    start_review_keyboard_focused = focus_and_press_enter(page, start_review)
    page.get_by_role("heading", name="Check the claim against the line").wait_for(
        state="visible"
    )
    verify_action = current_action_locator(page, viewport_width)
    verify_action_focus = verify_action.evaluate(
        "element => document.activeElement === element"
    )

    claim_title = page.locator(".claim-title-button").first
    claim_title_keyboard_focused = focus_and_press_enter(page, claim_title)
    claim_detail = page.locator(".claim-detail").first
    claim_detail.wait_for(state="visible")
    claim_expanded = claim_title.get_attribute("aria-expanded") == "true"

    accept_claim = page.get_by_role("button", name="Accept claim").first
    accept_claim_keyboard_focused = focus_and_press_enter(page, accept_claim)
    page.get_by_text("Reviewed", exact=True).first.wait_for(state="visible")
    claim_reviewed = page.get_by_text("Reviewed", exact=True).first.is_visible()
    claim_notice_visible = page.get_by_text(
        "Claim accepted. Its source and limitation will stay in the decision brief.",
        exact=True,
    ).is_visible()

    go_to_decide = page.get_by_role("button", name="Go to Decide")
    go_to_decide_keyboard_focused = focus_and_press_enter(page, go_to_decide)
    page.get_by_role("heading", name="Name the smallest test").wait_for(state="visible")
    decide_action = current_action_locator(page, viewport_width)
    decide_action_focus = decide_action.evaluate(
        "element => document.activeElement === element"
    )

    draft_experiment = page.locator(
        ".opportunity-picker button", has_text="Draft smallest experiment"
    )
    draft_experiment_keyboard_focused = focus_and_press_enter(page, draft_experiment)
    page.get_by_label("Owner").wait_for(state="visible")
    experiment_ready = page.get_by_label("Owner").input_value() != ""

    export_brief = page.locator(".brief-footer button", has_text="Export decision brief")
    export_brief_keyboard_focused = focus_and_press_enter(page, export_brief)
    page.get_by_role("heading", name="Take a brief someone can challenge").wait_for(
        state="visible"
    )
    ship_action = current_action_locator(page, viewport_width)
    ship_action_focus = ship_action.evaluate(
        "element => document.activeElement === element"
    )

    copy_markdown = page.locator(".export-actions button", has_text="Copy Markdown")
    copy_markdown_keyboard_focused = focus_and_press_enter(page, copy_markdown)
    page.get_by_text(
        "Markdown copied. You can paste it into a GitHub issue or PRD.", exact=True
    ).wait_for(state="visible")

    page.evaluate("window.scrollTo(0, 0)")
    page.screenshot(path=SCREENSHOT_DIR / screenshot_name, full_page=True)

    return {
        "viewport_width": viewport_width,
        "first_run_sample_note_visible": first_run_sample_note_visible,
        "first_run_source_title": first_run_source_title,
        "first_run_source_excerpt": first_run_source_excerpt,
        "first_run_local_fixture_boundary_visible": first_run_local_fixture_boundary_visible,
        "first_run_own_signal_visible": first_run_own_signal_visible,
        "first_run_lower_sample_quote_count": lower_sample_quote_count,
        "first_run_no_horizontal_overflow": bool(no_horizontal_overflow),
        "open_sample_keyboard_focused": open_sample_keyboard_focused,
        "loaded_focus_target": loaded_focus_target,
        "start_review_keyboard_focused": start_review_keyboard_focused,
        "verify_action_focus": bool(verify_action_focus),
        "claim_title_keyboard_focused": claim_title_keyboard_focused,
        "claim_expanded": claim_expanded,
        "accept_claim_keyboard_focused": accept_claim_keyboard_focused,
        "claim_reviewed": claim_reviewed,
        "claim_notice_visible": claim_notice_visible,
        "go_to_decide_keyboard_focused": go_to_decide_keyboard_focused,
        "decide_action_focus": bool(decide_action_focus),
        "draft_experiment_keyboard_focused": draft_experiment_keyboard_focused,
        "experiment_ready": experiment_ready,
        "export_brief_keyboard_focused": export_brief_keyboard_focused,
        "ship_action_focus": bool(ship_action_focus),
        "copy_markdown_keyboard_focused": copy_markdown_keyboard_focused,
        "markdown_notice_visible": True,
        "active_element_after_copy": active_element(page),
    }


with sync_playwright() as playwright:
    launch_options: dict[str, object] = {"headless": True}
    if Path(CHROME_BIN).exists():
        launch_options["executable_path"] = CHROME_BIN

    browser = playwright.chromium.launch(**launch_options)
    SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
    browser_errors: list[str] = []
    request_failures: list[str] = []
    results: dict[str, object] = {}

    for viewport_width, viewport_height, result_key, screenshot_name, first_run_screenshot_name in [
        (
            390,
            844,
            "mobile_390",
            "keyboard-flow-390-2026-08-16.png",
            "first-run-source-truth-390-2026-08-16.png",
        ),
        (
            1440,
            1000,
            "desktop_1440",
            "keyboard-flow-1440-2026-08-16.png",
            "first-run-source-truth-1440-2026-08-16.png",
        ),
    ]:
        context = browser.new_context(
            viewport={"width": viewport_width, "height": viewport_height},
            locale="en-US",
            permissions=["clipboard-read", "clipboard-write"],
        )
        page = context.new_page()
        attach_browser_logs(page, browser_errors, request_failures)
        if result_key == "mobile_390":
            results["blank_recovery"] = verify_skip_link_and_blank_recovery(page)
        results[result_key] = verify_primary_flow(
            page, viewport_width, screenshot_name, first_run_screenshot_name
        )
        context.close()

    result = {
        "base_url": BASE_URL,
        "browser": "Chrome via Playwright fallback; native screen-reader and Chrome Extension coverage is separate",
        **results,
        "browser_errors": browser_errors,
        "request_failures": request_failures,
        "screenshots": [
            str(SCREENSHOT_DIR / "first-run-source-truth-390-2026-08-16.png"),
            str(SCREENSHOT_DIR / "first-run-source-truth-1440-2026-08-16.png"),
            str(SCREENSHOT_DIR / "keyboard-flow-390-2026-08-16.png"),
            str(SCREENSHOT_DIR / "keyboard-flow-1440-2026-08-16.png"),
        ],
    }
    print(json.dumps(result, indent=2))

    blank_recovery = results["blank_recovery"]
    assert isinstance(blank_recovery, dict)
    assert blank_recovery["skip_focused_after_first_tab"] is True
    assert blank_recovery["skip_enter_focus_target"] == "main-content"
    assert blank_recovery["add_signal_keyboard_focused"] is True
    assert blank_recovery["save_line_keyboard_focused"] is True
    assert blank_recovery["title_invalid_focused"] is True
    assert blank_recovery["warning_visible"] is True
    assert blank_recovery["cancel_keyboard_focused"] is True
    assert blank_recovery["form_closed_after_cancel"] is True

    for key in ("mobile_390", "desktop_1440"):
        flow = results[key]
        assert isinstance(flow, dict)
        assert flow["first_run_sample_note_visible"] is True
        assert flow["first_run_source_title"] == "Interview: the draft looks finished before I can trust it"
        assert "support draft gives me a polished reply" in flow["first_run_source_excerpt"]
        assert flow["first_run_local_fixture_boundary_visible"] is True
        assert flow["first_run_own_signal_visible"] is True
        assert flow["first_run_lower_sample_quote_count"] == 0
        assert flow["first_run_no_horizontal_overflow"] is True
        assert flow["open_sample_keyboard_focused"] is True
        assert flow["loaded_focus_target"] == "main-content"
        assert flow["start_review_keyboard_focused"] is True
        assert flow["verify_action_focus"] is True
        assert flow["claim_title_keyboard_focused"] is True
        assert flow["claim_expanded"] is True
        assert flow["accept_claim_keyboard_focused"] is True
        assert flow["claim_reviewed"] is True
        assert flow["claim_notice_visible"] is True
        assert flow["go_to_decide_keyboard_focused"] is True
        assert flow["decide_action_focus"] is True
        assert flow["draft_experiment_keyboard_focused"] is True
        assert flow["experiment_ready"] is True
        assert flow["export_brief_keyboard_focused"] is True
        assert flow["ship_action_focus"] is True
        assert flow["copy_markdown_keyboard_focused"] is True
        assert flow["markdown_notice_visible"] is True

    assert browser_errors == []
    assert request_failures == []
    browser.close()
