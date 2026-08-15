# Direct Workbench Hosted Release Audit

Date: 2026-08-15
Checked at: `2026-08-15T07:30:14.185Z`
Main commit: `2b24c2c9ecb0d113218b4988c8ae7396e40dd4bb`
Pull request: [#32](https://github.com/asdc163/pm-signal-lab/pull/32)
Deploy workflow: [31872073464](https://github.com/asdc163/pm-signal-lab/actions/runs/31872073464)
CI workflow: [31872073463](https://github.com/asdc163/pm-signal-lab/actions/runs/31872073463)
Canonical URL: <https://asdc163.github.io/pm-signal-lab/>

## Release result

The direct workbench refinement is merged to `main`, GitHub Pages deployment
completed successfully, and the canonical hosted verifier passed. The release
keeps the English-first, deterministic, local-first boundary. It does not add a
model provider, login, persistence, telemetry, GitHub mutation, or new
permission boundary.

## Canonical HTTPS evidence

`npm run verify:hosted` was run after the merge and Pages deploy.

| Check | Result |
|---|---|
| Canonical URL | PASS — `https://asdc163.github.io/pm-signal-lab/` returned without redirect |
| HTML | PASS — HTTP `200` |
| Locale | PASS — `en-US` |
| Page title | PASS — `PM Signal Lab — Product signals to decisions` |
| Cache control | Observed — `max-age=600` |
| JavaScript | PASS — `/pm-signal-lab/assets/index-7CdBY3SI.js`, HTTP `200`, `application/javascript` |
| CSS | PASS — `/pm-signal-lab/assets/index-BA1g8M9t.css`, HTTP `200`, `text/css` |
| Current copy | PASS — empty, source, boundary, review-docket, and field-note strings present |
| Stale copy guard | PASS — all configured stale strings absent from the hosted JavaScript |

Verifier checks were all `true`: `canonical_https`, `html_ok`, `assets_ok`,
`current_copy_present`, and `stale_copy_absent`.

## Canonical Chrome behavior evidence

Route: Codex Chrome Extension.
Chrome context: a fresh controlled tab in the existing Chrome session.
Focus behavior: the run stayed in the controlled tab and avoided stealing
foreground focus.
Viewport: desktop `1280×900`.

Observed on the canonical hosted URL:

- Empty state showed `Open the sample worksheet`, `Add your own signal`, the
  sample quote, and the local-only boundary.
- Loaded state showed `Working set`, `Signal review: deciding what to test
  next`, `Read the source lines before the claim`, and `01–04 folios`.
- The source rows remained the primary artifact; the removed duplicate `Source
  ledger` eyebrow was not visible.
- The first `View source` control changed to `Hide source` after activation.
- The loaded success notice read `Sample worksheet is open. Next, trace each
  claim back to its source.`

This browser observation verifies the current desktop hosted path and one
source-expansion interaction. Local evidence for mobile, reset recovery, and
keyboard focus is recorded in
[`61-direct-workbench-no-ai-feel-local-qa-2026-08-15.md`](./61-direct-workbench-no-ai-feel-local-qa-2026-08-15.md).

## Build and review evidence

- Branch CI for PR #32: PASS — tests, typecheck, and build.
- Main CI after merge: PASS — run `31872073463`.
- Pages deployment after merge: PASS — run `31872073464`.
- Local contract score: PASS — `60-direct-workbench-no-ai-feel-contract-2026-08-15.md` scored `100/100`.
- Local QA: PASS within the declared scope — 4 test files, 10 tests, typecheck,
  build, diff check, desktop/mobile screenshots, source expansion, reset, and
  keyboard focus baseline.

## What this release does not prove

- No native VoiceOver, NVDA, TalkBack, or other screen-reader sign-off.
- No physical-device touch, share sheet, save-to-Photos, or hardware keyboard
  result.
- No non-owner PM task sessions, comprehension rate, retention, conversion,
  adoption, traffic, GitHub stars, or 10,000-star outcome.
- No model quality or external AI-provider result; the hosted fixture remains
  deterministic and local.

## Rollback

If a regression appears, revert the single merge commit
`2b24c2c9ecb0d113218b4988c8ae7396e40dd4bb`, rerun CI, and allow the Pages
workflow to deploy the reverted `main`. No migration or user data rollback is
needed.
