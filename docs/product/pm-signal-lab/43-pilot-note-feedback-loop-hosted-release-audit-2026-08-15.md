# Pilot note feedback loop — hosted release audit

Date: 2026-08-15
Product: PM Signal Lab
Canonical URL: https://asdc163.github.io/pm-signal-lab/
Application release SHA: `b3ed0b94185fd16789850a5ad8d8dd3a9874d14c`
CI run: [CI #31857037137](https://github.com/asdc163/pm-signal-lab/actions/runs/31857037137)
Deploy run: [Deploy hosted demo #31857037020](https://github.com/asdc163/pm-signal-lab/actions/runs/31857037020)
Browser route: Codex In-app Browser / Playwright API fallback; the configured Codex Chrome Extension route was not available in this run

## Release decision

`HOSTED PASS for the changed English pilot-note feedback loop.`

The canonical Pages URL served the merge release after both CI and deploy completed successfully. The changed path was operated in fresh hosted desktop and mobile browser states. This is a release-layer result for the changed surface, not a real-user usability, screen-reader, adoption, or star-growth result.

## Deployment evidence

- `git log -1` on local `main` read `b3ed0b9 Clarify the English pilot feedback loop` after a fast-forward from `origin/main`.
- `curl -fsSIL https://asdc163.github.io/pm-signal-lab/` returned `HTTP/2 200`; the response `last-modified` advanced to `Sat, 15 Aug 2026 01:38:30 GMT` after the Pages deploy.
- Hosted HTML returned `lang="en-US"`, title `PM Signal Lab — Product signals to decisions`, `index-B8jNbZns.css`, and the new `index-CPKzMkn6.js` asset.
- CI run `31857037137` completed with `success` for the merge SHA.
- Deploy run `31857037020` completed with `success` for the merge SHA.

## Fresh hosted browser evidence

### Desktop feedback path

- Opened the canonical URL in a fresh browser tab at a 1280×960 viewport.
- Confirmed the title, `en-US` document language, English first-run heading, and visible `Load sample data` action.
- Selected `Load sample data`; the hosted app produced 4 `.evidence-row` elements and the success notice.
- Completed `Start review` → `Accept claim` → `Go to Decide` → `Draft smallest experiment` → `Export decision brief`.
- Opened `Open pilot note`; the page showed `Pilot note / After the task`, `Help decide what to fix next`, the three-line guidance, and `Prepare field note`.
- Submitted the form without privacy confirmation: `#feedback-output` remained absent and the page showed the warning asking for confirmation about customer data, private content, API keys, or tokens.
- Filled synthetic non-private notes, confirmed the privacy checkbox, and prepared the field note. The output appeared, did not contain the fixture's raw source line, and did not contain `model quality`.
- Selected `Copy field note`; the browser clipboard matched the generated Markdown. The `Open feedback page` target was the public issue template URL and was inspected without submitting an issue.
- Hosted console inspection returned 0 `error`, `warn`, or `warning` messages after the path.

### Mobile 390×844 path

- Opened the canonical URL in a fresh mobile-sized browser tab at 390×844.
- The empty `.mobile-action-bar.is-empty` was visible and contained `Load sample data`; document `scrollWidth` matched `clientWidth` at the tested layout width.
- Selecting the action produced 4 rows and changed the bottom action to `Start review`.
- Repeated the path through `Ship`, opened the pilot note, and measured 8 feedback controls in a single-column form.
- The feedback panel width was 343 CSS pixels with `note.scrollWidth === note.clientWidth`; document `scrollWidth` matched `clientWidth` at the tested layout width.
- Hosted console inspection returned 0 `error`, `warn`, or `warning` messages for the mobile path.

## QA note

During the local desktop run, the semantic locator for `Export decision brief` matched both the central workbench button and the right-docket button. The first attempt stopped on the strict-mode multiple-match diagnostic; after inspecting the visible DOM, the central action was selected explicitly and the flow continued. This is a test-targeting observation, not a product error: both controls were visible and enabled.

## What this release proves

- The new English pilot-note invitation is live at the canonical hosted URL.
- The privacy gate still blocks local Markdown generation until the tester confirms the report is free of private material.
- A confirmed report stays editable and local; copy works, while GitHub remains a manual review handoff.
- The changed copy and form remain usable at the tested desktop and 390×844 mobile sizes without observed console errors or horizontal overflow.
- The public issue [#4](https://github.com/asdc163/pm-signal-lab/issues/4) now uses the same three-line pilot instructions as the live product.

## What this release does not prove

- No non-owner international PM session, five-second comprehension result, retention, conversion, adoption, or qualified star outcome.
- No formal Codex Chrome Extension QA or native VoiceOver, NVDA, or TalkBack sign-off; this run used the in-app browser fallback.
- No real-device behavior, low-bandwidth behavior, browser-specific compatibility, or assistive-technology announcement result.
- No external model quality, latency, cost, reliability, or provider behavior; the preview remains deterministic and provider-free.
- No claim that the new copy will increase feedback completion, stars, traffic, or adoption until external session evidence exists.

## Current public snapshot

The current read-only GitHub snapshot during this audit was `pm-signal-lab: 1 star`, `0 forks`, `4 open issues`, and public pilot issue #4 with `0 comments`. These are account/repository state observations, not product adoption or progress toward 10,000 stars.

## Next evidence gate

Recruit five target users through the pinned [public pilot issue #4](https://github.com/asdc163/pm-signal-lab/issues/4). Look for at least three reports with a concrete hesitation, trust or recovery observation, and requested change before deciding whether to scale distribution, add a provider, or broaden the product.
