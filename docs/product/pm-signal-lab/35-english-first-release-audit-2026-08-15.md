# English-first release audit

Date: 2026-08-15
Product: PM Signal Lab
Audience: international PMs, product designers, founders, and product engineers
Release status: English-first hosted smoke verified for the release commit; formal Chrome Extension and assistive-technology sign-off remain unverified.

## Decision

The public preview is being shipped as an `en-US` product surface:

- the workflow, controls, notices, errors, accessible names, sample data, and generated Markdown are in English;
- the README, design notes, trial kit, public issue handoff, metadata, and current release evidence are in English;
- the workflow remains local-first and deterministic: no login, database, external model provider, API key flow, telemetry, GitHub mutation, MCP action, or automatic issue submission;
- a locale selector and runtime translation framework are deliberately out of scope for this slice.

The product messaging and localization contract is [`34-english-first-product-messaging-contract-2026-08-15.md`](./34-english-first-product-messaging-contract-2026-08-15.md).

## Release scope

This release updates the public product surface and its evidence trail:

- `src/App.tsx`: English-first workflow labels, copy, notices, errors, accessible names, and feedback handoff.
- `src/domain/fixture.ts`: English sample signals and source text.
- `src/domain/synthesis.ts`: English claims, limitations, and experiment fields.
- `src/domain/export.ts`: English decision brief sections and source mapping.
- `src/domain/feedback.ts`: English privacy boundary and field-note copy.
- domain tests: English expectations and negative-path coverage.
- `index.html` and `src/styles.css`: `en-US` metadata and an English-oriented type stack.
- `README.md`, `DESIGN.md`, `CHANGELOG.md`, and operations notes: English-first public documentation.
- `docs/research/github-reference-research-2026-08-14.en.md`: English summary of the reference study and its evidence limits.
- English-first screenshots in [`assets/qa`](./assets/qa/).

Historical Chinese audits remain in the repository as an evidence trail. They are not presented as the current public messaging contract.

## Behavior matrix

| User archetype | Starting state | Action and success signal | Failure signal and recovery |
| --- | --- | --- | --- |
| International PM trying the preview | Fresh page at `Collect` with no workspace | Select `Load sample data`; the page shows one loading notice, then four traceable source rows and the `Start review` action | If the sample does not load, the user can add a signal manually or reset the workspace and try again |
| Low-trust reviewer | Loaded sample data | Expand `View source`; the source folio, original line, date, and limitation remain visible. Start review and accept, edit, keep as hypothesis, or mark missing evidence | A blank claim is rejected with an inline error and focus returns to the claim editor; a valid edit remains reviewable rather than silently becoming accepted |
| PM preparing a decision | At least one reviewed claim | Select `Draft smallest experiment`, then `Export decision brief`; the brief includes `Evidence summary`, `Known limits`, `Experiment`, and `Not covered` | If the evidence is not ready, the export path keeps the decision in review instead of presenting an unqualified conclusion |
| Mobile reader | `390x844` viewport | Move through `Collect → Verify → Decide → Ship`; content wraps within the viewport and the primary action remains reachable | If a long brief becomes difficult to scan, the user can copy or download the Markdown and continue outside the page |
| Keyboard user | Fresh page | Use the skip link; focus moves to the main workspace, and interactive controls retain visible focus behavior | Formal screen-reader and assistive-technology sign-off remains unverified because the Chrome Extension control surface was unavailable |
| Contributor testing recovery | Empty or loaded workspace | Submit an empty `Add a signal` form; field errors identify title, source, and signal problems while preserving the form. Use `Reset this set` to return to the empty state | The product does not send feedback automatically; the user must inspect the generated field note before manually opening GitHub |

## Local static evidence

The final local candidate was checked in the repository root with:

```text
npm test -- --run       4 test files passed, 9 tests passed
npm run lint            passed (`tsc --noEmit`)
npm run build           passed (`vite build`)
git diff --check        passed
```

The current public surfaces were scanned for Han characters, Chinese locale declarations, old CJK font names, and full-width punctuation. No matches were returned for the scanned paths. This does not mean that every historical note in the repository is English; the historical evidence trail is intentionally preserved.

## Local behavioral evidence

Environment: Playwright CLI fallback against `http://127.0.0.1:5175/`, fresh page reloads, 2026-08-15. The preferred Codex Chrome Extension control surface was unavailable in this session, so these results are local browser fallback evidence, not Chrome Extension sign-off.

Verified observations:

- document title: `PM Signal Lab — Product signals to decisions`;
- document language: `en-US`;
- fresh first-run state shows one `Collect` heading and a usable `Load sample data` action;
- loading copy appears before sample data is ready;
- loaded state shows four source rows;
- `View source` opens one source excerpt and `Hide source` closes it;
- `Start review` produces three candidate claim rows and preserves source mapping;
- empty claim save is rejected, focus returns to the editor, and the invalid field remains marked;
- a valid claim edit closes the editor but stays in review until a human accepts it;
- accepting a claim keeps its source and limitation in the decision path;
- `Draft smallest experiment` moves to `Decide`, and export moves to `Ship`;
- the generated Markdown contains `Evidence summary`, `Known limits`, `Experiment`, and `Not covered`, with source IDs and no Han characters or full-width colons;
- feedback preparation is privacy-gated; without confirmation it creates no report, and with confirmation it produces an English field note without raw sample evidence;
- an empty signal form shows three actionable errors and preserves the empty values; a valid signal adds a fifth row;
- reset returns to an empty `Collect` state with English recovery copy;
- at `1440`, `768`, and `390` CSS-pixel viewports, no horizontal overflow was observed; the final mobile check measured `scrollWidth = clientWidth = 375` at a `390x844` viewport;
- the final local browser run observed no console errors or warnings.

Visual captures from the same local verification pass:

- [English-first first run, 1440](./assets/qa/english-first-first-run-1440.png)
- [English-first loaded source ledger, 1440](./assets/qa/english-first-loaded-1440.png)
- [English-first decision brief and feedback path, 390](./assets/qa/english-first-ship-390.png)

## Hosted verification gate

The public hosted release was checked against the exact release commit:

1. `main` is pushed to `https://github.com/asdc163/pm-signal-lab`.
2. The repository verification workflow passes for that commit.
3. The GitHub Pages deployment workflow passes for that commit.
4. `https://asdc163.github.io/pm-signal-lab/` returns HTTP 200 and serves the expected English metadata and asset bundle.
5. A fresh hosted browser smoke test repeats the title, `en-US`, first-run, sample-load, source expansion, decision-brief, mobile overflow, and console checks.

### Hosted evidence record

- Release commit: `2a0314d432e2986baf2acf5d5a7e7d4b2dbce18f`.
- CI workflow: [run 31852122066](https://github.com/asdc163/pm-signal-lab/actions/runs/31852122066), conclusion `success`, head SHA matched the release commit.
- Pages workflow: [run 31852122089](https://github.com/asdc163/pm-signal-lab/actions/runs/31852122089), conclusion `success`, head SHA matched the release commit.
- Canonical URL: [`https://asdc163.github.io/pm-signal-lab/`](https://asdc163.github.io/pm-signal-lab/), HTTP `200`, `content-type: text/html; charset=utf-8`, served HTML contained `<html lang="en-US">`, the expected title, and the English bundle `assets/index-u2jiU_zd.js`.
- Fresh hosted browser smoke: Playwright CLI fallback session `en-first-hosted-20260815`, 2026-08-15. The page title and `en-US` language matched; first run showed `Start with a source line`; sample loading showed `Preparing sample data`; the loaded state exposed four `View source` controls; source excerpt opened and closed; review produced three claims with source mapping; accept → decide → export produced the four expected Markdown sections and no Han characters; a fresh `390x844` run measured `scrollWidth = clientWidth = 390`; console output was `0` messages (`0` errors, `0` warnings).

## Not covered

This audit does not claim:

- formal Chrome Extension QA, screen-reader QA, or native assistive-technology sign-off;
- native-speaker copy review or international user research;
- real PM task-session success, retention, conversion, adoption, or production readiness;
- model quality, provider quality, latency, cost, or AI accuracy;
- GitHub stars, forks, traffic, issue activity, or progress toward 10,000 stars;
- any automatic GitHub operation, social promotion, star exchange, follow exchange, or unsolicited message;
- that the historical Chinese audit notes have been translated.

## Rollback

The English-first change is intended to remain one reversible release boundary. If hosted verification or an external review finds a release-blocking regression, revert the English-first release commit to the previous public parent `c9034263f408630506f06bad0ea4f29c1b2d398b`, then rerun the repository and Pages gates. The private local growth plan at `docs/github-star-growth-plan.md` must remain untracked during either path.

## Next learning gate

The next product decision is not another visual polish pass. Collect at least five real international PM task sessions, record concrete hesitation and recovery evidence, and use those observations to decide whether the product needs a provider adapter, portable evidence import, or a second locale. Until then, the deterministic English-first workflow is the honest scope of this portfolio project.
