# PM Signal Lab — field notebook visual refresh release audit

**Date:** 2026-08-15
**Canonical demo:** https://asdc163.github.io/pm-signal-lab/
**Published main SHA:** `335c8422aabae1b58a9253312dafa2e042dcc1b6`
**Release:** [v0.1.27](https://github.com/asdc163/pm-signal-lab/releases/tag/v0.1.27)
**PR:** [#26](https://github.com/asdc163/pm-signal-lab/pull/26)
**Browser route:** Codex Chrome Extension, fresh agent-controlled tab, background execution without stealing foreground focus

## Decision

`SCOPED FIELD-NOTEBOOK REFRESH / HOSTED EVIDENCE PATH VERIFIED / PILOT GATE OPEN`.

The English-first surface now reads as a field notebook / decision instrument: cool mineral paper, graphite text, a rust next-action signal, teal provenance marks, and a ruled evidence spine. The first read names the PM job directly: keep the source line attached, decide what it supports, and leave with the smallest test worth discussing.

This is a visual and product-truth release. It does not prove external comprehension, native screen-reader quality, adoption, qualified stars, or a completed 10,000-star outcome.

## Problem frame

The product already had source-linked claims, human review, limitations, a decision brief, and a manual field-note handoff. The remaining risk was presentation: the shell still carried some generic AI-workspace average, and the first-run copy described the atmosphere more than the PM job. The design pass therefore used the local design knowledge base to strengthen subject specificity and composition without adding a provider, fake model activity, telemetry, or decorative trend tactics.

## Product decision

- Use `Field notebook / decision instrument` as the visual direction.
- Keep the original source line, evidence type, folio, limitation, claim, smallest test, guardrail, and decision rule visible.
- Use cool mineral neutrals for the work surface, rust only for the next action, and teal for provenance/trust.
- Prefer ruled sections, list rows, folios, and definition lists over repeated rounded cards.
- Keep `local-first`, refresh reset, human review, privacy confirmation, manual GitHub handoff, and `Not covered` visible.
- Keep the public surface English-first for international discovery and future recruiting.

## Scope

### Changed

- First-run copy now starts with `From one product signal to one testable decision` and `Bring in one source line`.
- Loaded copy now asks `What does this line actually support?` and keeps the original line / limitation / smallest test relationship in view.
- The empty state is flatter and more paper-like; the source excerpt and folio are the visual anchor.
- The visual contract records the selected DNA, rejected AI-template patterns, state model, QA gate, and rollback boundary.
- Hosted verification rejects the retired first-read strings as well as the older preview/dashboard labels.

### Intentionally unchanged

- `Collect → Verify → Decide → Ship` workflow and deterministic sample pack.
- Source ledger, claim mapping, limitations, human review actions, decision brief, local-only state, and privacy-gated field note.
- No login, external model provider, raw-signal upload, telemetry, automatic GitHub issue submission, or social automation.

## Product QA Report

### Environment

- Local built bundle: `vite preview` at `http://127.0.0.1:5182/`.
- Canonical hosted bundle: `https://asdc163.github.io/pm-signal-lab/`.
- Browser route: `Codex Chrome Extension`.
- Chrome context: fresh agent-controlled tab; no foreground stealing.
- Desktop viewport: requested `1440×900`, browser document client width `1425px`.
- Mobile viewport: requested `390×844`, browser document client width `375px`.
- Native screen-reader route: not used; no VoiceOver, NVDA, or TalkBack claim is made.

### Behavior matrix

| user archetype | starting state / job | action performed | success signal | failure signal / recovery expectation |
| --- | --- | --- | --- | --- |
| International PM visiting for the first time | Fresh hosted empty state; understand the product and start one review | Inspected the first viewport and the primary action | `From one product signal to one testable decision`, `Bring in one source line`, visible sample line, `Load sample data`, and `Source line → Claim → Smallest test` were present | If the first read is still unclear, recruit an unguided non-owner session; local refresh remains the recovery boundary |
| PM checking a source-backed claim | Sample loaded; move from evidence into a defensible review | Pressed `Load sample data`, then used Enter on `Start review` | Loaded H1 became `What does this line actually support?`; Verify showed `Check the claim against the line`, source context, limitation, and review actions | A claim stays open until the PM accepts it, keeps it as a hypothesis, edits it, or marks missing evidence |
| PM writing the smallest test | One claim accepted in Verify | Used `Go to Decide`, inspected the brief, and exported it | `Smallest experiment brief` appeared; after export, `Decision brief is ready`, `Take a brief someone can challenge`, and the Markdown actions appeared | If no claim is accepted, export is blocked and the UI returns to Verify with `No accepted claim yet`; this recovery was also observed locally |
| PM preparing a feedback note | Decision brief ready; share only a safe field note | Opened `Pilot note / After the task`, tried to prepare without privacy confirmation, then checked the confirmation and prepared the note | The unconfirmed action showed the exact privacy alert; after confirmation, `Session feedback is ready`, `Field note / Inspect before sharing`, `Copy field note`, and a manual GitHub feedback link appeared | No issue was submitted; the UI explicitly asks the user to inspect the content first |
| Mobile PM | Fresh and loaded hosted states at `390×844` | Loaded the sample and used Enter through the first review transition | `clientWidth=375`, `scrollWidth=375`, `overflowX=false`; sticky action remained reachable; landmarks were `main=1`, `nav=1`, `complementary=2` | Native device, virtual keyboard, and native assistive-technology behavior remain unverified |

### Findings

No blocker or high-severity finding was observed for this scoped refresh.

- **Likely user interpretation:** this is a source-backed PM worksheet for deciding what to test next, not a chat wrapper or a claim generator that has validated the market.
- **Hesitation / friction:** the first run has one dominant action and a visible sample line; the loaded state places the review docket after the source ledger. No new copy or layout hesitation was observed in the controlled run.
- **Recovery:** refresh resets the local worksheet; an unaccepted claim blocks export; blank/private feedback is blocked until the privacy confirmation; the field note remains inspectable before any manual GitHub action.
- **Trust:** the source, limitation, human owner, local boundary, and `Not covered` language remain adjacent to the relevant actions. No fake confidence, typing, model activity, adoption claim, or automatic submission was added.
- **Severity:** none observed for changed scope.
- **Evidence:** local gates, current-main CI, Pages deployment, post-deploy hosted smoke, direct canonical verifier, fresh Chrome Extension behavior trace, desktop/mobile screenshots, keyboard transition, privacy recovery, and app-origin console filtering.
- **Fix brief / acceptance criteria:** preserve the field-note direction; do not add decorative AI patterns or new claims without a corresponding product object and verification path. The next meaningful visual change should be driven by a real pilot hesitation, trust concern, recovery failure, or requested change.

## Repro Steps

1. Open the [canonical hosted demo](https://asdc163.github.io/pm-signal-lab/) in a fresh tab.
2. Confirm the empty first read and `Load sample data` action.
3. Press Enter on `Load sample data`, then Enter on the first `Start review` action.
4. Confirm `Check the claim against the line`, then click `Accept claim`.
5. Press Enter on `Go to Decide`, inspect `Smallest experiment brief`, and click `Export decision brief`.
6. Open `Pilot note / After the task` and click `Prepare field note` without checking the privacy confirmation.
7. Confirm the privacy alert, check the confirmation, and click `Prepare field note` again.
8. Confirm the inspect-before-sharing field note and manual GitHub feedback link; stop before opening or submitting the external issue form.

## Expected vs Actual

| check | expected | actual |
| --- | --- | --- |
| First read | English-first job and one clear next action | PASS: literal source-to-decision job, source excerpt, and `Load sample data` were visible |
| Hosted HTTP | Canonical HTTPS 200 with current hashed assets | PASS: HTTPS 200; JS `/pm-signal-lab/assets/index-DB8tj0_8.js` and CSS `/pm-signal-lab/assets/index-Cl2eK8Kj.css` both returned 200 |
| Copy guard | Current field-notebook strings present; retired generic/preview strings absent | PASS: direct verifier found all required strings and all forbidden strings absent |
| Source review | Source-backed review with limitation and human action | PASS: Verify showed source context, `Check the claim against the line`, `Accept claim`, and trust boundary copy |
| Decision brief | Accepted claim can produce a challengeable brief | PASS: `Decision brief is ready`, Markdown actions, evidence summary, known limits, and `Not covered` appeared |
| Recovery | Unsafe or incomplete handoff is blocked and recoverable | PASS: no-claim export returned to Verify; unconfirmed field note showed the privacy alert; confirmation then prepared a local field note |
| Responsive | No horizontal overflow; primary action stays reachable | PASS: desktop and mobile controlled runs showed `overflowX=false`; mobile sticky action remained visible |
| Console | App-origin errors/warnings are absent or explained | PASS: no app-origin error/warn entries; external warnings came from an installed MetaMask extension and were not treated as product evidence |

## Verification evidence

| check | result | evidence |
| --- | --- | --- |
| KB application contract | PASS | `score_kb_plan.py ... --min-score 85`: `KB plan score: 100/100` |
| Product tests | PASS | `npm test -- --run`: 4 files, 10 tests passed |
| Type/lint gate | PASS | `npm run lint`: exit 0 |
| Production build | PASS | `npm run build`: Vite emitted `assets/index-DB8tj0_8.js` and `assets/index-Cl2eK8Kj.css` |
| Diff hygiene | PASS | `git diff --check`: exit 0 |
| Local hosted verifier | PASS | At `2026-08-15T05:26:17.495Z`: HTTP 200, `en-US`, assets 200, current copy present, stale copy absent; `canonical_https=false` was expected for localhost |
| PR CI | PASS | [Run 31867008653](https://github.com/asdc163/pm-signal-lab/actions/runs/31867008653), PR #26 verify |
| Main CI | PASS | [Run 31867034961](https://github.com/asdc163/pm-signal-lab/actions/runs/31867034961), head `335c842…` |
| Pages deploy | PASS | [Run 31867034928](https://github.com/asdc163/pm-signal-lab/actions/runs/31867034928), head `335c842…` |
| Post-deploy hosted smoke | PASS | [Run 31867062198](https://github.com/asdc163/pm-signal-lab/actions/runs/31867062198), current-copy and stale-copy assertions passed |
| Canonical direct verifier | PASS | At `2026-08-15T05:29:48.912Z`: HTTPS 200, `en-US`, hashed JS/CSS 200, current field-notebook copy present, retired copy absent |
| Current-main Chrome Extension | PASS | Fresh hosted tab passed empty, loaded, keyboard review, source-backed acceptance, decision brief export, privacy recovery, field-note preparation, desktop/mobile no-overflow, and app-origin console filtering |

## Not Covered

- Five unguided non-owner international PM sessions and real field notes.
- Native VoiceOver, NVDA, TalkBack, formal screen-reader sign-off, physical device, and virtual keyboard behavior.
- External model quality, retention, conversion, traffic, adoption, referrals, qualified star quality, and organic causality for GitHub stars.
- Download event / filesystem behavior on every supported browser and OS.
- Automatic public posting, replying, DM, starring, following, or issue submission.
- The 10,000-star outcome.

## Next evidence gate

Keep the project in `Iterate / recruit`. The public demo is now more specific and visually credible, but the next product decision must come from five non-owner international sessions using the public pilot issue, not from more self-review. Track hesitation, trust, recovery, and one requested change; then ship only the smallest evidence-backed iteration.
