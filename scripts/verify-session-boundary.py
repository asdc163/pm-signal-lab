#!/usr/bin/env python3
"""Verify that sample loading and reset create a clean local session boundary."""

from __future__ import annotations

import json
import os
from pathlib import Path

from playwright.sync_api import sync_playwright


BASE_URL = os.environ.get("BASE_URL", "http://127.0.0.1:4179/")
CHROME_BIN = os.environ.get(
    "CHROME_BIN", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
)
REPO_ROOT = Path(__file__).resolve().parents[1]
SCREENSHOT_DIR = REPO_ROOT / "docs/product/pm-signal-lab/assets/qa"


def visible(page, role: str, name: str) -> bool:
    return page.get_by_role(role, name=name).is_visible()


with sync_playwright() as playwright:
    browser_errors: list[str] = []
    request_failures: list[str] = []
    launch_options = {"headless": True}
    if Path(CHROME_BIN).exists():
        launch_options["executable_path"] = CHROME_BIN

    browser = playwright.chromium.launch(**launch_options)
    context = browser.new_context(
        viewport={"width": 390, "height": 844}, locale="en-US"
    )
    page = context.new_page()
    page.on("console", lambda message: browser_errors.append(message.text) if message.type == "error" else None)
    page.on("pageerror", lambda error: browser_errors.append(str(error)))
    page.on("requestfailed", lambda request: request_failures.append(f"{request.method} {request.url}: {request.failure}"))

    SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
    page.goto(BASE_URL, wait_until="networkidle")
    page.get_by_role("heading", name="Start with a source line").wait_for(state="visible")

    # A manual draft must not survive a deliberate switch to the fixture.
    page.get_by_role("button", name="Add your own signal").click()
    page.get_by_role("heading", name="Write down one real observation").wait_for(state="visible")
    sample_button = page.get_by_role("button", name="Open the sample worksheet")
    sample_button.click()
    loading_button_disabled = sample_button.is_disabled()
    form_hidden_during_loading = not visible(page, "heading", "Write down one real observation")
    loading_marker = page.locator(".loading-state > svg")
    loading_marker_visible = loading_marker.is_visible()
    loading_marker_class = loading_marker.get_attribute("class") or ""
    loading_marker_animation = loading_marker.evaluate(
        "element => getComputedStyle(element).animationName"
    )
    page.evaluate("window.scrollTo(0, 0)")
    page.screenshot(path=SCREENSHOT_DIR / "session-boundary-loading-guard-loading-390-2026-08-16.png", full_page=True)
    page.get_by_role("heading", name="Support draft review").wait_for(state="visible")
    form_still_visible_after_load = visible(page, "heading", "Write down one real observation")
    page.evaluate("window.scrollTo(0, 0)")
    page.screenshot(path=SCREENSHOT_DIR / "session-boundary-loading-guard-loaded-390-2026-08-16.png", full_page=True)

    # A reset must close the old disclosure before the next fixture is opened.
    page.get_by_role("button", name="View source").first.click()
    page.get_by_role("button", name="Hide source").first.wait_for(state="visible")
    page.get_by_role("button", name="Reset this set").click()
    page.get_by_role("heading", name="Start with a source line").wait_for(state="visible")
    page.get_by_role("button", name="Open the sample worksheet").click()
    page.get_by_role("heading", name="Support draft review").wait_for(state="visible")
    expanded_source_after_reset = page.get_by_role("button", name="Hide source").count() > 0
    page.evaluate("window.scrollTo(0, 0)")
    page.screenshot(path=SCREENSHOT_DIR / "session-boundary-loading-guard-reset-390-2026-08-16.png", full_page=True)

    result = {
        "base_url": BASE_URL,
        "sample_button_disabled_during_loading": loading_button_disabled,
        "form_hidden_during_loading": form_hidden_during_loading,
        "loading_marker_visible": loading_marker_visible,
        "loading_marker_class": loading_marker_class,
        "loading_marker_animation": loading_marker_animation,
        "form_still_visible_after_load": form_still_visible_after_load,
        "expanded_source_after_reset": expanded_source_after_reset,
        "browser_errors": browser_errors,
        "request_failures": request_failures,
        "screenshots": [
            str(path.relative_to(REPO_ROOT))
            for path in sorted(SCREENSHOT_DIR.glob("session-boundary-loading-guard-*-390-2026-08-16.png"))
        ],
    }
    print(json.dumps(result, indent=2))

    assert loading_button_disabled is True
    assert form_hidden_during_loading is True
    assert loading_marker_visible is True
    assert "spin" not in loading_marker_class
    assert loading_marker_animation in {"none", ""}
    assert form_still_visible_after_load is False
    assert expanded_source_after_reset is False
    assert browser_errors == []
    assert request_failures == []
    browser.close()
