# PM Signal Lab — Custom source-sheet truth local QA — 2026-08-16

## Result

The custom-source identity slice passes its local verification gate. A manual
source line now renders as `Your source sheet` with `your source notes · local
sheet`; the deterministic sample continues to render as `Support draft review`
with `support draft · fictional worksheet`. The sample Decide path also shows
`Owner to confirm before the test` rather than a `TBD` placeholder.

This is a local candidate result, not a hosted release result. The canonical
Pages URL still serves the prior bundle and remains outside the evidence proven
here.

The QA report scored `100/100` with the Product QA Specialist rubric, and the
machine-readable evidence manifest validator returned `PASS`. Those scores
describe the report's coverage and evidence structure; they do not turn the
blocked hosted, native-AT, participant, or adoption gates into passes.

## QA mission

- **Product:** PM Signal Lab, English-first local-first PM evidence worksheet.
- **User/job:** Bring one observed line from real product work into the sheet,
  then distinguish personal source notes from the deterministic portfolio
  fixture before reviewing a claim.
- **Slice under test:** Source identity, visible subject metadata, sample
  identity, and experiment-owner truth.
- **Primary risk:** A manually entered source could be presented as a fictional
  support-draft case, creating a trust and mental-model defect.
- **Environment:** Local Vite production preview at
  `http://127.0.0.1:4179/`, `en-US`, headless Google Chrome fallback,
  `390×844` and `1440×1000` for the focused source-truth trace. The preferred
  Codex Chrome Extension route was unavailable in this runtime; it is not
  represented as passed evidence.
- **Test data:** Synthetic, privacy-safe interview note entered locally by the
  owner-run browser trace. No customer or confidential source text was used.

## Acceptance matrix

| Case | User path and oracle | Result | Evidence |
| --- | --- | --- | --- |
| QA-TRUTH-001 | Fresh blank → `Add your own signal` → fill title/source/line → `Save line`; heading becomes `Your source sheet`. | PASS | `npm run verify:source-truth`; custom 390 screenshot |
| QA-TRUTH-002 | Manual sheet subject contains `your source notes` and `local sheet`; sample-only `Support draft review` and `fictional worksheet` are absent. | PASS | Source-truth browser assertions; `.pack-subject` aria-label=`Sheet: your source notes, local sheet` |
| QA-TRUTH-003 | Fresh blank → `Open the sample worksheet`; sample heading, subject, and fictional boundary remain present; custom labels are absent. | PASS | Source-truth browser assertions; sample 1440 screenshot |
| QA-TRUTH-004 | Sample → Verify → accept claim → Decide → draft experiment; owner field is actionable and does not contain `TBD`. | PASS | Browser owner assertion=`Owner to confirm before the test`; domain test |
| QA-TRUTH-005 | Existing normal flow: blank → sample → source disclosure → Verify → accept → Decide → draft → Ship. | PASS | `/tmp/pm-signal-lab-margin-qa.py`, fresh browser run; 390/1024/1440 no overflow, no browser errors, no request failures |
| QA-TRUTH-006 | Empty-form validation, cancel recovery, manual source → reset, refresh clears local sheet, missing evidence → needs-validation. | PASS | `/tmp/pm-signal-lab-edge-qa.py`, exit 0 |
| QA-TRUTH-007 | Sample replacement loading guard: action disabled, form hidden, static worksheet marker, old disclosure cleared after reset. | PASS | `python3 scripts/verify-session-boundary.py`, exit 0; loading/reset screenshots |
| QA-TRUTH-008 | Domain, type, production bundle, local asset/copy oracle, and diff hygiene. | PASS | 11 Vitest tests, `tsc --noEmit`, Vite build, local `verify:hosted`, `git diff --check` |
| QA-TRUTH-009 | Visual inspection of manual 390 and sample 1440 states: hierarchy, source-row anchor, responsive composition, no template/card-soup drift. | PASS | [manual 390](./assets/qa/custom-source-sheet-truth-390-2026-08-16.png), [sample 1440](./assets/qa/custom-source-sheet-truth-sample-1440-2026-08-16.png) |
| QA-TRUTH-010 | Preferred Chrome Extension execution of the focused flow. | BLOCKED | Chrome Extension control was unavailable in this runtime; Playwright/Chrome fallback is recorded separately. |
| QA-TRUTH-011 | Native VoiceOver/NVDA/TalkBack and physical-device behavior. | NOT EXECUTED | No native AT or physical-device harness was used. |
| QA-TRUTH-012 | Canonical hosted current-candidate readback. | BLOCKED | `HOSTED_URL=https://asdc163.github.io/pm-signal-lab/ npm run verify:hosted` fails because Pages serves the prior bundle and is missing `Start with a source line`; PR #44 is still draft and not merged/deployed. |
| QA-TRUTH-013 | Non-owner PM sessions, adoption, and GitHub-star movement. | NOT EXECUTED | These require real participants and public release evidence; no outcome is inferred from local QA. |

## Target audience and market context

- **Target segment:** International PMs, founders, product designers, and
  product engineers who need to turn messy discovery or AI-product evidence
  into a reviewable next test.
- **Locale/language:** English-first `en-US`; the source-truth labels are
  intentionally plain and do not depend on localization expansion.
- **Likely current workaround:** Not provided by research in this run. The
  product does not assume that a notes app, spreadsheet, or AI chat is the
  user's actual workflow until participant sessions confirm it.
- **Scenario simulation:** A PM pastes one interview observation into a local
  worksheet, then checks whether the screen is showing their source or a
  portfolio fixture. This is an owner-run simulation, not a market finding.
- **Evidence confidence:** High for the local copy boundary; low/not provided
  for international comprehension, preference, adoption, retention, or
  willingness to star the repository.
- **Local-fit unknown:** The generic `Your source sheet` label should be
  revisited after real English-speaking PM sessions rather than polished from
  owner preference alone.

This QA list is a focused source-truth regression list, not a claim that the
full release QA surface is complete.

## Behavior matrix

| Archetype | Job | Starting state | Success signal | Failure signal / trust question | Evidence |
| --- | --- | --- | --- | --- | --- |
| First-time PM | Decide whether to start with a sample or a real line | Blank sheet, no login | Can identify both entry paths and the local boundary | Thinks a sample is their own data; asks whether text was uploaded | QA-TRUTH-001, local blank trace |
| Returning PM | Resume a deliberate source review | Refresh or reset | Understands the sheet is empty after refresh and can reopen the intended path | Old source, disclosure, or claim survives | QA-TRUTH-006/007 |
| Low-trust PM | Challenge source, limitation, and owner | Sample loaded, claims unreviewed | Can see the fictional boundary and owner confirmation before a test | Treats a generated-looking label or draft as validated | QA-TRUTH-003/004 |
| Mobile PM | Capture and review one line without losing context | 390×844, manual sheet | Heading, source metadata, next action, and local boundary remain readable with no overflow | Horizontal scroll, hidden action, repeated CTA, or ambiguous subject | QA-TRUTH-001/005/009 |
| Accessibility user | Navigate state changes and source metadata | Keyboard-first blank/loading/manual state | Skip link, main-workbench focus recovery, labels, and semantic relationships remain available | Focus disappears, source disclosure loses its relationship, or only colour explains status | QA-TRUTH-005/007/011 |

## Feature logic and state transitions

The source of truth is the `EvidencePack.id` plus the evidence array. The
manual path creates a neutral local pack; only the deterministic fixture id may
produce sample-specific subject copy.

```text
Blank
  ├─ Open sample → support-draft fixture id → fictional sample labels
  └─ Add source → neutral local-session id → local source-sheet labels

Loaded pack → Collect → Verify → human review → Decide → editable brief → Ship
     └─ Reset / refresh → blank local sheet
```

The regression invariant is: `manual pack ≠ sample copy`, while `sample pack =
sample copy`. The owner field is a human-confirmation state, not evidence that
an experiment has already been assigned or run. Rollback is a source/docs
revert; no migration or external state exists.

The feature logic map includes the product promise (source-linked PM decision
work), roles (visitor as decision owner; deterministic fixture as sample only),
entities (`EvidencePack`, `Evidence`, `Claim`, `ExperimentBrief`), state
transitions, source of truth, rollback, and evidence sources. There is no
AI/tool contract in this slice because no provider, retrieval, or external tool
is connected; that absence is an explicit boundary rather than an assumed
quality result.

## Deep QA toolchain matrix

| Layer | Status | Current evidence or explicit boundary |
| --- | --- | --- |
| Code correctness | PASS | Vitest 4 files/11 tests; TypeScript lint; production build |
| API/contract | OUT OF SCOPE | No API or provider is connected; local copy verifier checks the built asset contract |
| Browser E2E | PASS | Playwright with local Google Chrome fallback; visible normal, edge, source-truth, reset, and export-path interactions |
| Accessibility | PARTIAL | Keyboard/semantic/aria and focus checks passed in fallback; native screen-reader speech and physical AT not executed |
| Visual regression | PASS for focused slice | Fresh 390/1440 screenshots inspected; no automated pixel baseline is claimed |
| Performance/reliability | NOT EXECUTED | No performance budget or load profile was part of this copy-boundary slice |
| Security/privacy | PASS for current boundary | No external resources, upload, secret, provider, persistence, or mutation; manual content is local-only |
| Supply chain/CI | PARTIAL | Local dependency/build checks and existing PR CI are available; no dependency change was introduced in this slice |
| AI eval/red-team | OUT OF SCOPE | Deterministic fixture, no live model, retrieval, tool, prompt, or provider failure path |
| Observability | OUT OF SCOPE | No telemetry; local event receipt is not adoption or production monitoring |
| Repo QA surface | PASS | Existing `npm` scripts, domain tests, local hosted verifier, session-boundary oracle, and browser fixtures were inspected and reused |

## UX diagnostic matrix

| Lens | Likely user interpretation | Mechanism checked | Result / acceptance criterion |
| --- | --- | --- | --- |
| Five-second comprehension | “Is this my sheet or a demo?” | Heading + subject line + boundary appear before source rows | PASS locally: manual and sample paths have mutually exclusive labels |
| Mental model / information architecture | “Where did this source come from?” | Subject identity precedes `Source record`; original line remains visible | PASS locally: source row and local boundary stay in the same reading path |
| Label scent / next action | “What should I do next?” | `Start review` follows source rows; no new status chrome | PASS in normal flow and screenshots |
| Ability / friction | “Can I add one line without setup?” | Blank → form → save; validation preserves text and cancel recovers | PASS in normal and edge traces |
| Trust / AI uncertainty | “Is this a generated result or my evidence?” | Fictional boundary only on sample; no AI activity/confidence theatre; owner confirmation remains editable | PASS for this slice; live model trust not evaluated |
| Recovery / backtracking | “Can I safely start over?” | Reset, refresh, sample replacement, and loading guard | PASS in session-boundary and edge traces |
| Mobile dignity | “Can I read and act without horizontal scrolling?” | 390px source-first composition and fixed action ownership | PASS locally; real-device touch/AT remains unexecuted |

The full usability follow-up is deliberately not represented as owner-run
proof: a five-second comprehension test, task-based usability protocol,
behavior trace for hesitation/backtracking, assistive-technology user profiles,
and AI UX uncertainty probes are required with non-owner PMs or native AT. They
remain planned/blocked until the hosted current candidate and participant
access are available.

The fallback semantic pass covers focused keyboard, labels, landmark, and
source-disclosure behavior; focused WCAG 2.2 checks and native assistive
technology output remain a separate gate.

## Evidence governance and learning loop

- **Evidence manifest:** The machine-readable manifest is
  [`qa-evidence-manifest-2026-08-16.json`](./qa-evidence-manifest-2026-08-16.json);
  it separates local pass, blocked hosted/Extension layers, and unexecuted
  native/participant layers.
- **Test data/privacy:** Browser inputs are synthetic; no private user source
  was placed in screenshots or reports. Raw evidence is not sent to an issue.
- **Flake register:** No flaky retry is counted as a pass. The concurrent
  browser attempt initially hung in Chrome cleanup; it was stopped, rerun
  alone, and only the clean exit-0 run was recorded here.
- **Loading visual evidence:** The loading screenshot uses a test-only 2-second
  hold on the existing 260ms fixture timer so the real loading DOM can be
  captured; the product timer and production behavior were not changed. The
  immediate selector oracle still verifies disabled action, hidden form, and
  static marker before the hold is released.
- **Trace assertions:** The source-truth script asserts visible heading,
  sample/custom mutual exclusion, subject `aria-label`, owner value, browser
  errors, and request failures. The existing scripts assert reset/loading,
  semantic, responsive, and workflow invariants.
- **Risk-based selection:** This slice prioritizes a trust/mental-model defect
  over new features because the wrong sample identity can damage credibility
  even when the UI technically renders.
- **Risk ranking / quality economics:** P0 would be a privacy or external-state
  leak; P1 is source-identity conflation because it can damage trust and cause
  a PM to carry the wrong context into a decision; P2 is label preference or
  copy comprehension drift. The business outcome is credible portfolio use,
  lower support burden, and repeatable PM feedback—not a vanity star count.
- **Reversibility:** The copy/id/owner correction is fully reversible with a
  source revert; no migration, payment, permission, or external data cleanup
  is needed.
- **Learning question:** After a manual save, can a PM tell whose source is on
  the sheet without being told? This run proves the copy prerequisite locally;
  the next test is five unguided international PM sessions on the current
  hosted candidate.

## Production feedback plan

Post-release feedback is intentionally manual until the product has real
users. The current plan is: preserve privacy-safe field notes from five
international PM sessions, record task completion/hesitation/recovery in the
pilot kit, review public GitHub issues manually, and compare each release's
source-truth regression output. There are no production logs, analytics funnel,
session replay, alert thresholds, or AI-eval regression stream in this local
candidate; adding telemetry would require a separate product/privacy decision.

## Fix brief and regression contract

- **Finding:** Manual evidence inherited sample-only support-draft labels.
- **User/product risk:** A visitor could mistake their own source for a
  fictional fixture or read the fixture as a claim about their product.
- **Fix owner hint:** Product/UX implementation owner for the local workpaper;
  no backend or provider owner is involved.
- **Acceptance criteria:** Manual heading/subject/local boundary are present;
  sample heading/subject/fictional boundary remain present; the two sets of
  copy are mutually exclusive; owner does not contain `TBD`; no workflow,
  responsive, semantic, reset, loading, or privacy regression.
- **Regression cases:** QA-TRUTH-001–008 and the committed
  `npm run verify:source-truth` oracle.
- **What not to change:** Do not add a provider, import format, persistence,
  login, telemetry, upload, new workflow step, AI badge, or hosted release as
  part of this correction.

## Traceability and case execution standard

Each `QA-TRUTH-*` case in this QA list maps to the manual/sample source-identity job, the
`EvidencePack.id` source-of-truth rule, a concrete precondition, visible UI
steps, an expected visible result, a hidden-state/invariant oracle where
relevant, and an artifact path or command. Priority is P1 for source identity,
owner truth, and recovery; P2 for visual and responsive polish; P0 remains the
explicit privacy/external-state boundary. The cases are executable regression
candidates, not a checklist inferred from source code.

## Current command evidence

The following commands were run against the current source candidate:

```text
npm test -- --run
  4 files passed · 11 tests passed

npm run lint
  tsc --noEmit passed

npm run build
  Vite 7.3.6 · index-DKwoxpjM.js · index-DUghuE2I.css

HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted
  HTTP 200 · lang=en-US · current copy present · stale copy absent
  canonical_https=false (expected for localhost)

npm run verify:source-truth
  custom 390 and sample 1440 copy boundaries passed
  owner_value=Owner to confirm before the test
  browser_errors=[] · request_failures=[]

python3 scripts/verify-session-boundary.py
  loading guard and reset boundary passed
  browser_errors=[] · request_failures=[]

python3 /tmp/pm-signal-lab-margin-qa.py
  blank → sample → source disclosure → Verify → accept → Decide → draft → Ship
  390/1024/1440 responsive checks passed; no overflow/errors/failures

python3 /tmp/pm-signal-lab-edge-qa.py
  empty validation, cancel, manual reset, refresh clear, and missing evidence passed

git diff --check
  passed
```

## Visual and behavioral review

The manual state now reads as a personal local workpaper: the display heading
is specific enough to establish ownership, the blue subject line names the
source notes, and the local boundary sits directly below it. The sample state
keeps its fictional support-draft context, so the portfolio case remains
legible without making a visitor's source look generated.

The source rows remain the visual anchor at both tested widths. The focused
390px manual screenshot shows one source row, the source record, the next
action, and the local boundary in a single reading path. The 1440px sample
screenshot keeps the four source rows, review action, and lower sheet note in a
quiet workpaper hierarchy. No new gradient, badge, AI activity, confidence
meter, repeated card wall, or decorative status layer was introduced.

The browser also moves focus to the main workbench after saving a manual line;
the screenshot capture scrolls to the top for stable visual evidence. The
runtime check confirmed the skip link remains the first keyboard stop in the
existing normal-flow trace.

## Security, privacy, and AI boundary

- No provider, model, prompt, retrieval, persistence, login, telemetry, secret,
  upload, or external mutation was added.
- Manual source text stays in the current page session and is cleared by
  refresh/reset behavior already covered by the session-boundary oracle.
- The sample remains deterministic. This QA does not evaluate live model
  quality, retrieval freshness, prompt-injection resistance, latency, cost, or
  safety behavior.
- The new neutral sample id removes an internal AI-oriented identifier from the
  copyable session event; it does not claim that the fixture is real data.

## Remaining release gates

This slice is safe to push to the existing draft branch, but it is not a
production release. The following remain explicit gates:

1. Re-read the canonical Pages URL after an approved merge/deploy and rerun the
   hosted verifier against the new hashed bundle.
2. Run the preferred Chrome Extension route plus native AT/device checks when
   that harness is available.
3. Run the five-person unguided international PM pilot against the current
   hosted candidate and write privacy-safe field notes.
4. Use those observations to decide whether the generic manual label should
   become a more specific user-owned source label; do not optimize it from
   owner intuition alone.
5. Measure public traffic, referrals, retention, adoption, and GitHub stars
   only after the public surface is actually current; local QA is not growth
   evidence.

## Rollback

Revert the focused source-truth change in `src/App.tsx`,
`src/domain/fixture.ts`, `src/domain/synthesis.ts`, and the matching tests/docs.
No migration, dependency, permission, provider, or external-state rollback is
required.

## Evidence boundary

This report proves a focused local source-identity correction and regression
coverage. It does not prove that the product is bug-free, hosted, officially
released, understood by non-owner PMs, adopted, viral, or on a path to 10,000
GitHub stars.
