# No-AI-feel visual refresh — hosted release audit

Date: 2026-08-15
Product: PM Signal Lab
Canonical URL: https://asdc163.github.io/pm-signal-lab/
Release SHA: `037cf1ad82306633ce7e6200cea8f678915a9533`
Deploy run: [Deploy hosted demo #31854092054](https://github.com/asdc163/pm-signal-lab/actions/runs/31854092054)
Browser route: Playwright CLI fallback; the configured Codex Chrome Extension route was not callable in this run

## Release decision

`HOSTED PASS for the changed public surface`.

The canonical Pages URL serves the merged case-file refresh and the browser-visible core journey works at desktop and mobile viewports. This is a hosted release result, not a claim of real-user usability, adoption, AI quality, or GitHub growth.

## Deployment evidence

- `git ls-remote origin refs/heads/main` returned the release SHA above.
- `curl -fsSIL https://asdc163.github.io/pm-signal-lab/` returned `HTTP/2 200`.
- The hosted HTML returned the expected title and the new Vite assets: `index-DQydTbI3.js` and `index-C5IU2sxT.css`.
- GitHub Actions `CI` run `31854092104` completed successfully.
- GitHub Actions `Deploy hosted demo` run `31854092054` completed successfully; all deploy job steps passed.

## Hosted browser evidence

### Desktop, 1440×900

- Opened the canonical URL in a fresh Playwright browser session.
- Page title: `PM Signal Lab — Product signals to decisions`.
- Runtime language: `en-US`.
- First-run copy showed `PM SIGNAL LAB / EVIDENCE DESK`, `Put a product signal back next to its source`, the case path, `Load sample data`, `Add your own signal`, and the local/no-transfer boundary.
- `scrollWidth = 1440`, viewport = 1440, `overflow = false`.
- Selected `Load sample data`: 4 source rows and 3 candidate claims appeared; the review docket reported live counts.
- Opened the first `View source`: the source excerpt, folio, source identity, date, and local-session boundary appeared; the control became `Hide source`.
- Selected `Start review`, accepted claim 01, selected `Decide`, drafted the smallest experiment, and exported the decision brief.
- Hosted Ship view showed `Decision brief / Preview`, `Known limits`, `Not covered`, and `Shareable, but not a completion guarantee`.

### Mobile, 390×844

- Reloaded the canonical URL at 390×844.
- Page title and `en-US` remained correct.
- Fresh first-run measurement: `scrollWidth = 390`, viewport = 390, `overflow = false`.
- Selected `Load sample data`: 4 source rows appeared.
- Loaded-state measurement: `scrollWidth = 390`, viewport = 390, `overflow = false`, and the sticky `.mobile-action-bar` was present with its bottom edge at the viewport bottom.

### Console and external-boundary checks

- Hosted browser console: 0 errors, 0 warnings, 0 messages returned by the CLI console inspection.
- No API provider, login, telemetry, MCP action, GitHub mutation, or automatic issue submission was observed.
- The feedback link remains a manual GitHub handoff; the browser flow did not submit an issue.

## What this release now proves

- The public English-first interface uses a product-specific case-file/evidence-desk hierarchy instead of generic AI-demo summary chrome.
- The source/review/decision objects are visible in the hosted UI and the main local state transitions survive the deploy.
- The hosted desktop and mobile layouts render without horizontal overflow at the tested widths.
- The local-only and human-decision boundaries remain visible at the point of action.

## What this release does not prove

- No real international PM task sessions, native-speaker comprehension study, retention, conversion, adoption, or GitHub star growth.
- No formal Codex Chrome Extension QA or native screen-reader certification; the Chrome Extension route was unavailable and Playwright CLI was used as fallback.
- No external model quality, hallucination, latency, cost, or provider reliability result; this preview remains deterministic and provider-free.
- No claim that the visual refresh will produce virality or a specific star count.

The hosted release gate is complete for this commit. The product-learning gate remains open until real target-user sessions are collected and reviewed.
