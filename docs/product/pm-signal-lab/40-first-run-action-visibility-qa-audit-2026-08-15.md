# First-run action visibility — local QA audit

Date: 2026-08-15
Product: PM Signal Lab
Scope: desktop first-run action placement, mobile empty action bar, sample transition, keyboard activation, visual evidence
Browser route: Codex In-app Browser / Playwright API fallback; the configured Codex Chrome Extension route was not available for this run

## Release decision

`LOCAL PASS for the changed action surface; hosted verification pending.`

The new action is visible at the intended breakpoints, the existing deterministic sample path still loads, and the changed screenshots were inspected. This is not a real-user usability result or a formal Chrome/screen-reader sign-off.

## Static checks

- `npm test -- --run`: 4 files, 9 tests passed.
- `npm run lint`: passed (`tsc --noEmit`).
- `npm run build`: passed (`tsc -b` and Vite production build).
- `git diff --check`: passed.

## Behavior matrix

| ID | user archetype | starting state | success signal | failure signal | recovery expectation | result |
|---|---|---|---|---|---|---|
| FAV-001 | First-time desktop PM | Empty case at the default browser viewport | A visible `Load sample data` button is present in `Current work` before the empty panel | The visitor must scroll to find the first action | Use the same button or the central manual route | PASS: fresh DOM snapshot showed the named button in the current-work block |
| FAV-002 | First-time mobile PM | Empty case at 390×844 | The bottom action bar is visible and says `Load sample data` | No action is reachable without scrolling | Scroll to the central case and use `Add your own signal` | PASS: 390×844 screenshot and fresh DOM state showed `.mobile-action-bar is-empty` with a visible sample button |
| FAV-003 | Sample trial user | Empty case | Four source rows appear after the sample action | Loading leaves the case empty or throws an error | Refresh and retry the local fixture | PASS: desktop and mobile actions each produced 4 `.evidence-row` elements |
| FAV-004 | Keyboard user | Empty case with the sample button focused | `Enter` activates the native button and loads the sample | Focus is lost or the button does not activate | Return to the focused button and retry | PASS: semantic focus plus `Enter` produced 4 source rows |
| FAV-005 | Low-trust reviewer | Empty case | Local boundary remains visible beside the action | CTA implies upload, transfer, or model work | Read the boundary and stop before entering data | PASS: `Stays on this page; refresh resets it` remained visible; no external request was observed |
| FAV-006 | Narrow-screen user | 390×844 empty and loaded states | The action and source ledger remain inside the viewport | Horizontal scrolling or clipped controls | Use the responsive action bar and reset | PASS: visual review showed no horizontal clipping; loaded transition produced 4 rows and `Start review` |

## Fresh browser evidence

- Empty desktop screenshot: [`first-run-action-1280.png`](./assets/qa/first-run-action-1280.png).
- Empty mobile screenshot: [`first-run-action-mobile-390.png`](./assets/qa/first-run-action-mobile-390.png).
- Desktop DOM snapshot: `Load sample data` was visible inside `Current worksheet status`; the central case exposed only `Add your own signal` as the alternative.
- Mobile DOM snapshot: `.mobile-action-bar is-empty` was visible with the `Load sample data` button.
- After sample activation, the desktop and mobile case each exposed 4 source rows; the mobile bottom action changed to `Start review`.
- Browser console inspection after the changed journey returned 0 error/warning messages.

## Failed or not-captured checks

- The first direct locator `.press("Enter")` attempt exceeded the browser-tool selector deadline while leaving the focused button and empty state unchanged. I inspected the DOM and then reran through a semantic focus plus keyboard `ENTER` path; that path passed. The tool timeout is retained as a QA incident, not hidden.
- The 260ms fixture loading state was not captured as a stable screenshot because the transition completed before the first timed observation. The existing loading state is unchanged; a future slower-network or throttled run should capture it explicitly.
- No real PM session, native screen reader, formal Chrome Extension route, adoption, or GitHub star outcome was tested.

## Trust and safety boundary

The sample action calls the existing local fixture only. No provider, login, telemetry, raw-evidence upload, GitHub mutation, or automatic issue submission was introduced.
