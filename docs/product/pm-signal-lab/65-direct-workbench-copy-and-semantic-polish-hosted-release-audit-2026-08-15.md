# Direct Workbench Copy and Semantic Polish Hosted Release Audit

Date: 2026-08-15
Main commit: `79ef6e7ce004afd6c8f5dda1a07b9a8959007583`
Pull request: [#34](https://github.com/asdc163/pm-signal-lab/pull/34)
CI workflow: [31873401581](https://github.com/asdc163/pm-signal-lab/actions/runs/31873401581)
Pages deploy: [31873427799](https://github.com/asdc163/pm-signal-lab/actions/runs/31873427799)
Hosted smoke: [31873455370](https://github.com/asdc163/pm-signal-lab/actions/runs/31873455370)
Canonical URL: <https://asdc163.github.io/pm-signal-lab/>

## Release result

The copy, semantic, recovery, and public visual-evidence patch is merged to
`main`. GitHub Pages deployed successfully, the hosted smoke workflow passed,
and the canonical verifier passed against the public HTTPS URL. The hosted
demo remains English-first, deterministic, local-first, and free of external
provider calls, login, telemetry, or automatic GitHub submission.

This audit proves the changed release surface. It does not prove universal
usability, model quality, screen-reader conformance, adoption, or GitHub star
growth.

## Canonical verifier evidence

`npm run verify:hosted` was run at `2026-08-15T08:01:55.203Z` after Pages deploy.

| Check | Result |
|---|---|
| Canonical URL | PASS — `https://asdc163.github.io/pm-signal-lab/` returned without redirect. |
| HTTPS | PASS — `canonical_https: true`. |
| HTML | PASS — HTTP `200`. |
| Locale | PASS — `en-US`. |
| Page title | PASS — `PM Signal Lab — Product signals to decisions`. |
| Cache control | Observed — `max-age=600`. |
| JavaScript | PASS — `/pm-signal-lab/assets/index-Up89zsBm.js`, HTTP `200`. |
| CSS | PASS — `/pm-signal-lab/assets/index-BistJMWl.css`, HTTP `200`. |
| Current copy | PASS — all required strings present, including `Current work`, `Session record`, and `Back to Collect`. |
| Stale copy | PASS — old worksheet/activity/recovery strings absent from the hosted JavaScript. |

Verifier checks were all true:
`canonical_https`, `html_ok`, `assets_ok`, `current_copy_present`, and
`stale_copy_absent`.

## Hosted browser evidence

### Route and fallback

- Intended product-QA route: Codex Chrome Extension in the existing Chrome
  session.
- Exact route used for this audit: headless Google Chrome with a temporary
  profile and Chrome DevTools Protocol, because the Chrome Extension controls
  were unavailable in the current tool surface.
- This fallback directly operated the public page and inspected DOM state. It
  does not stand in for foreground-focus behavior, native assistive technology,
  physical touch, or a real PM session.
- No Safari, Browser Use, Browserbase/browse.sh, or alternate devtools bridge
  was used.

### Behavior matrix

| Flow | Expected | Observed |
|---|---|---|
| Fresh desktop at 1280×900 | Current work, sample CTA, own-signal path, boundary, and no horizontal overflow | PASS: `Current work`, `Open the sample worksheet`, `Add your own signal`, local boundary, and `horizontalOverflow: false`. |
| Load sample worksheet | Source workbench appears with current copy | PASS: click found the sample action; loaded DOM showed `Working set` and `Read the source lines before the claim`. |
| Expand source | Provenance action changes state | PASS: `View source` click found; `Hide source` became visible. |
| Start review | Verify state appears | PASS: `Start review` click found; `Check the claim against the line` became visible. |
| Removed status frame | Topbar does not repeat worksheet status | PASS: `topbarStatusNodes: 0`; `Current worksheet` was absent. |
| Removed activity language | Session area stays concrete | PASS: `Session record` present; `Activity recorded` and `No activity yet` absent. |
| Mobile at 390×844 | Top stepper and sticky sample action remain reachable | PASS: `Open the sample worksheet` was visible in `.mobile-action-bar`; `horizontalOverflow: false`. |

### Hosted screenshot evidence

- [Hosted first-run desktop](./assets/qa/hosted-first-run-current-1280.png)
  — 1280×900.
- [Hosted first-run mobile](./assets/qa/hosted-first-run-current-390.png)
  — 390×844.
- [Hosted loaded workbench](./assets/qa/hosted-loaded-current-1280.png)
  — 1280×900 after the sample action.

The screenshots are visual evidence for this exact hosted build. They are not
an accessibility audit and do not represent a user study.

## CI and deployment evidence

- PR #34 CI: PASS — tests, lint/typecheck, and production build.
- Pages deployment `31873427799`: PASS — install, build, configure Pages,
  artifact upload, and deploy all passed.
- Hosted smoke `31873455370`: PASS — canonical hosted verifier passed after
  deployment.
- Local QA contract score: PASS — `63-direct-workbench-copy-and-semantic-polish-contract-2026-08-15.md` scored `100/100`.
- Local behavior report: [`64-direct-workbench-copy-and-semantic-polish-local-qa-2026-08-15.md`](./64-direct-workbench-copy-and-semantic-polish-local-qa-2026-08-15.md).

The GitHub Actions annotation still reports the repository's known Node 20
deprecation warning, while the job itself passed. That is a maintenance item,
not a failed release gate for this patch.

## What this release does not prove

- Exact Codex Chrome Extension foreground-focus behavior for this diff.
- Native VoiceOver, NVDA, TalkBack, rotor output, and full screen-reader
  semantics.
- Physical-device touch, share sheet, save-to-Photos, and hardware keyboard.
- Direct interaction with the defensive empty `Decide` branch; normal guards
  route an empty Decide attempt back to `Collect` before that branch renders.
- Unguided international PM sessions, first-five-second comprehension,
  retention, conversion, adoption, traffic, GitHub stars, or the 10,000-star
  outcome.
- Model quality: the hosted demo still has no external AI provider.

## Rollback

The previous known-good hosted release is merge commit
`91da9829ca756b07aab1afe9597506e88c3e5cb3`. If the changed hosted surface
regresses, revert the single merge commit `79ef6e7ce004afd6c8f5dda1a07b9a8959007583`,
rerun CI, and allow Pages to deploy the reverted `main`. No migration or user
data rollback is needed.
