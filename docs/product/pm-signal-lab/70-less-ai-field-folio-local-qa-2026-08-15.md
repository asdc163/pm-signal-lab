# Product QA Report — PM Signal Lab Field Folio

Date: 2026-08-15
Checked at: `2026-08-15T09:16Z` to `2026-08-15T09:27Z`
Surface: local Vite preview at `http://127.0.0.1:5178/`
Locale: English-first `en-US`
Release target: `https://asdc163.github.io/pm-signal-lab/`

## QA result

The current visual and copy pass is operational in the executed local scope.
The surface now reads as a PM field folio: a source line, an attached claim,
and the smallest test. The shell does not simulate a chat thread, typing state,
agent activity, or confidence score. AI appears only as the subject of the
fictional local fixture and remains bounded by visible source, limitation, and
human review states.

The owner-run fallback browser completed the first-run path, sample loading,
source inspection, claim review, experiment drafting, decision-brief export,
copy fallback, pilot-note privacy gate, form validation/recovery, keyboard skip
link, mobile rendering, and refresh reset. No release-blocking defect was
observed in that scope.

This is local engineering and behavior evidence. It is not a hosted release,
Chrome Extension sign-off, native assistive-technology sign-off, non-owner
usability research result, adoption signal, or GitHub-star result.

## Evidence boundary and route used

- Intended Tommy product-QA route: Codex Chrome Extension controlling the
  existing Chrome session.
- Current tool surface: `Browser disabled`; no Codex Chrome Extension control
  surface was available in this task.
- Route used: Playwright CLI fallback with a persistent local session named
  `fieldfolio-local`, against the local Vite preview.
- Computer Use was not used. No alternate browser automation bridge was used.
- The fallback proves observable DOM state, direct interaction, screenshots,
  console output, and captured requests. It does not prove foreground focus in
  Tommy's existing Chrome profile, VoiceOver/NVDA/TalkBack output, physical
  device behavior, or real user comprehension.
- Fixture mode: deterministic local sample data. No external model provider,
  login, telemetry, GitHub mutation, or raw-signal upload is connected.

## Product QA behavior matrix

| User archetype and job | Starting state | Expected success signal | Failure signal | Recovery path | Evidence status |
|---|---|---|---|---|---|
| International PM / understand the first action | Fresh page at 1280×900 | Understand the source-first job and find one primary sample action | Mistakes the product for a chat or cannot tell what to do first | Use the sample CTA or add one source line | PASS in owner-run DOM and screenshot; non-owner comprehension is unverified |
| International PM / start on a phone | Fresh page at 390×844 | Read the first-run statement and reach the sticky sample action without horizontal scrolling | CTA is clipped, stepper overlaps, or page width exceeds viewport | Scroll the single-column folio and use the sticky action | PASS: `documentWidth=390`, `bodyWidth=390`; screenshot captured |
| Evidence reviewer / inspect provenance | Sample worksheet loaded | `View source` expands the source excerpt and can be collapsed again | A claim looks complete without its source or the source control is ambiguous | Return to the source row and use the review path | PASS in direct browser trace |
| PM / review a candidate claim | Sample loaded, Collect step | `Start review` reaches Verify with source mappings and a human decision control | Review path skips source or implies automatic acceptance | Back to Collect or keep the claim open | PASS in direct browser trace |
| PM / draft a smallest test | First claim active and accepted | Decide shows hypothesis, metric, guardrail, smallest test, decision rule, and owner field | Export appears to be a completed result | Re-edit the brief or return to Verify | PASS in direct browser trace; `Experiment owner · TBD` remains an explicit placeholder |
| PM / carry work forward | Decide brief ready | Ship shows a selectable Markdown brief and manual copy/download actions | Product implies it submitted to GitHub or resolved the case | Copy text, inspect it, or go back | PASS: export and copy notice observed; no automatic submission |
| Privacy-conscious tester / leave feedback | Ship page, pilot note open | Unchecked privacy confirmation blocks preparation; checked confirmation creates inspectable local Markdown | Private-data gate can be bypassed or feedback is sent automatically | Add/remove confirmation, inspect, cancel, or manually review GitHub page | PASS in both blocked and allowed branches; no issue submitted |
| PM / add a real source line | Add-source form open | Valid title, source, and source line add one new line | Empty save loses text or gives no field-level guidance | Fix fields, save, or cancel | PASS: empty validation preserved fields; valid line increased sheet from 4 to 5 lines |

## Five-second comprehension probe

This was an owner-run visual probe, not a participant study. At first load, the
1280×900 screenshot exposes `Write down the line you can defend`, the
source-first explanation, `Blank sheet`, the local handling boundary, and one
red `Open the sample worksheet` action. The 390×844 screenshot keeps the same
job visible under the compact workflow bar and keeps the primary action in a
sticky bottom region.

The probe supports a design observation: the first read is now a field-note
job rather than a generic AI workspace. It does not support a claim that
international users understand the product without help. A real paraphrase
from a non-owner PM remains `未驗證`.

## Task-based usability protocol

The following owner-run task was executed as a deterministic behavior trace:

1. Start from an empty sheet.
2. Open the sample worksheet.
3. Inspect a source row and expand its source excerpt.
4. Start review and accept one claim.
5. Draft the smallest experiment.
6. Export the decision brief and copy Markdown.
7. Open the pilot note, attempt preparation without privacy confirmation,
   then confirm a safe synthetic report and inspect the generated field note.
8. Add a source line with empty fields first, correct the errors, save it, and
   confirm the sheet count increases.
9. Refresh and confirm the local sheet returns to the blank state.

No SEQ or participant-comprehension score was collected. The task result is an
engineering acceptance trace, not evidence of general usability.

## Behavior trace evidence

| Trace | Observed result | Evidence |
|---|---|---|
| Fresh first run | `New worksheet`, `Write down the line you can defend`, `Blank sheet`, sample CTA, and local boundary visible | `field-folio-first-run-1280.png` and `field-folio-first-run-390.png` |
| Open sample | Four source lines and three candidate claims visible; `Sample worksheet is open` notice appears | `field-folio-loaded-1280.png` and loaded mobile screenshot |
| Source inspection | A source row changes from `View source` to an expanded source excerpt and can be hidden | Direct Playwright click and current DOM snapshot |
| Verify | `Start review` reaches `Check what this line supports`; source mappings remain visible | Direct Playwright click and current DOM snapshot |
| Accept | First claim changes to `Reviewed`; the sheet status increments accepted count | Direct Playwright click and current DOM snapshot |
| Decide | `Draft smallest experiment` reaches a ready-to-inspect brief with explicit limits | Direct Playwright click and current DOM snapshot |
| Ship | `Export decision brief` shows the Markdown text fallback; `Copy Markdown` reports that the text was copied | Direct Playwright click and copy notice |
| Pilot note blocked branch | Clicking `Prepare field note` without the checkbox shows `Please confirm that this report contains no customer data, private content, API keys, or tokens.` | Fresh snapshot after blocked click |
| Pilot note allowed branch | Safe synthetic fields plus confirmation produce `This is a field note, not a validation result.` and local Markdown; no GitHub issue was submitted | Fresh snapshot after allowed click |
| Add-source validation | Empty save marks title, source, and source line invalid and says text is preserved | Fresh snapshot after empty save |
| Add-source recovery | Filling valid synthetic values and saving raises the local sheet from 4 to 5 source lines | Fresh DOM readback: `5 source lines on this sheet` |
| Refresh reset | Reload returns to `Blank sheet`; the custom line and sample state are not persisted | Fresh reload readback |

## Keyboard and semantic behavior

- From a fresh page, the first `Tab` focused the `Skip to main content` link.
- `Enter` on the skip link changed the URL to `#main-content`, moved focus to
  the `main` element with `id="main-content"`, and moved the viewport to the
  main content region.
- The source, workflow, sample, feedback, and form controls expose accessible
  names in the fallback snapshot.
- Console output contained 3 messages total: 0 errors, 0 warnings, and one
  React DevTools informational message.
- Native screen-reader output, VoiceOver rotor behavior, NVDA, TalkBack,
  browser zoom, and reduced-motion behavior were not executed.

## Mobile and request checks

At `390×844`:

- `window.innerWidth=390`.
- `document.documentElement.scrollWidth=390`.
- `document.body.scrollWidth=390`.
- The sticky `Next action` region remained visible in the blank and loaded
  states.
- Fresh screenshots were visually inspected for clipped text, overlapping
  controls, and accidental horizontal overflow.

The fallback request log showed 41 static requests, all `200 OK`, all served
from `127.0.0.1:5178`. No dynamic API request was shown. This supports the
local-first boundary for this preview only; it does not prove a hosted network
policy or production privacy posture.

## TA / market context brief

The intended first audience is an international English-speaking PM, founder,
designer, or engineer who is evaluating an AI-assisted product workflow and
needs to turn a polished observation into a source-linked next test. The first
segment is not “everyone who uses AI”; it is people who already feel the cost
of checking an answer whose source, freshness, or stop condition is unclear.

| Context item | Current working hypothesis | Evidence confidence and local fit |
|---|---|---|
| Segment | English-first product practitioners working across AI support, research, evaluation, or internal tools | Product hypothesis; the local fixture is written in English and uses PM vocabulary, but no target-user study has been run |
| Locale / culture | International teams need plain English, explicit limits, and a portable artifact that can be pasted into a PRD or GitHub issue | Medium confidence from the requested market direction and existing product workflow; cultural comprehension is unverified |
| Current workaround | Read a generated answer, open separate source material, copy notes into a PRD or issue, and decide whether the result is trustworthy | Product hypothesis represented by the fixture; no diary or interview dataset is connected |
| Do-nothing behavior | Keep accepting polished drafts, or keep restarting a lookup when a source is missing or stale | Fictional local fixture only; not an observed adoption rate |
| Scenario simulation | A PM reviews four source lines, challenges one claim, accepts a bounded claim, names a smallest test, and carries a Markdown brief forward | Executed as an owner-run browser scenario; no non-owner completion or time-on-task evidence |
| Local fit | A small, local, reviewable field folio is a plausible first step because it reduces data-transfer anxiety and makes evidence portable | Design hypothesis; real international user feedback is the next gate |

This context prevents the QA from treating visual novelty as market fit. The
current workaround, user job, and evidence confidence remain explicit; no
market size, demand, or star forecast is inferred from the local browser run.

## Deep QA Toolchain Matrix

| Quality layer | Tool or method | Current evidence | Scope decision / out-of-scope reason |
|---|---|---|---|
| Code correctness | TypeScript compiler, repository tests, `npm run lint`, `npm test -- --run` | PASS: current local gates are green | In scope |
| API / contract | Request log and same-origin boundary inspection | PASS for local static requests; no API exists in v0 | External API contract is out of scope because no provider or backend is connected |
| E2E browser | Playwright CLI fallback, persistent `fieldfolio-local` session | PASS for the listed behavior trace | Codex Chrome Extension route is blocked by unavailable control surface |
| Accessibility | Keyboard skip-link trace, accessible-name snapshot, 390px viewport inspection | PASS for executed keyboard and semantic checks | Native screen reader and assistive-technology output are unexecuted |
| Visual regression | Fresh 1280×900 and 390×844 screenshots with manual visual inspection | PASS for current capture; no pixel baseline or automated diff is wired | Automated visual baseline is deferred until the visual direction stabilizes |
| Performance | Vite build output and manual response observation | Build PASS; no production performance claim | Lighthouse, Web Vitals, slow-device, and network-throttle runs are out of scope for this local visual pass |
| Security / privacy | Source inspection, privacy gate, request log, no-secret fixture values | PASS for local feedback gate and no dynamic request observation | Formal threat model, penetration test, CSP audit, and hosted headers remain pending |
| Supply chain | `package.json`/lockfile review and existing repository scripts | No new dependency was introduced in this pass | Dependency audit and provenance review are deferred to release hardening |
| AI evaluation | Deterministic fixture, visible source/limitation/not-covered text | PASS for uncertainty presentation; no model quality claim | No live model, prompt/eval dataset, retrieval, latency, or cost test exists |
| Red-team / prompt injection | Source lines are treated as fixture content; no provider call is made | Not applicable to a live model in v0 | Prompt-injection and tool-confusion exercises require a connected model contract |
| Observability | Console, request log, visible session receipt, and local status notices | PASS for owner-run visibility; no analytics pipeline | Production logs, analytics, session replay, and alerting are intentionally not connected |
| Mutation / fault injection | Empty form, privacy denial, refresh reset, and guarded local states | PASS for executed negative paths | Automated mutation testing and network fault injection are deferred |

## 2026 hard evidence and governance gates

### QA evidence manifest

| Evidence ID | Artifact path or URL | CI job / command | Layer | Status |
|---|---|---|---|---|
| E-001 | `src/App.tsx`, `src/styles.css`, `index.html` | `npm run lint` | Code and copy | PASS |
| E-002 | Repository test suite | `npm test -- --run` | Unit/domain regression | PASS: 4 files, 10 tests |
| E-003 | Local production bundle | `npm run build` | Build/release assembly | PASS |
| E-004 | `field-folio-first-run-1280.png`, `field-folio-first-run-390.png` | `fieldfolio-local` screenshot | Visual first-run | PASS |
| E-005 | `field-folio-loaded-1280.png`, `field-folio-loaded-390.png` | `fieldfolio-local` screenshot | Visual loaded path | PASS |
| E-006 | This report and the CLI snapshots under `.playwright-cli/` | Playwright CLI trace | Browser behavior | PASS in fallback route |
| E-007 | Canonical GitHub Pages URL | `npm run verify:hosted` and hosted browser | Production/canonical | Pending branch merge and deploy |

### Repo QA surface discovery

The detected stack is a Vite + React + TypeScript single-page application. The
existing QA surface includes TypeScript checking, Vitest repository tests,
Vite production build, a hosted verifier, GitHub Actions workflows, and the
Playwright CLI fallback used for this task. There is no repo-native continuous
browser/a11y suite that can replace the required Chrome Extension or native
assistive-technology route.

### Test-data and privacy matrix

| Data class | Fixture used | Allowed destination | Gate |
|---|---|---|---|
| Synthetic source lines | Four fictional demo lines and one synthetic added line | Local page state and local Markdown preview | PASS |
| User session note | Safe owner-run sentences with no customer names or secrets | Local field-note preview; manual review before GitHub | PASS with explicit checkbox |
| Customer data, private tickets, API keys, tokens | None | Nowhere | Blocked by copy and privacy confirmation |
| External model prompts or raw signals | None | Nowhere in v0 | Not connected |

### Flake register and QA debt

- Flake register: no flaky browser step was observed in this run; the fallback
  session was deterministic and the same-origin requests returned `200 OK`.
- QA debt: Chrome Extension control, native assistive technology, real-device
  behavior, hosted browser evidence, and non-owner sessions remain open items.
- No retry was used to turn a failed assertion into a pass. Repeated state
  checks were used only to read a fresh snapshot after a known interaction.

### AI evaluation dataset and trace assertions

- AI eval dataset register: not applicable to a live model; the fixture is
  deterministic and must not be presented as model-quality evidence.
- Trace assertions: each claim must retain a source mapping; each export must
  retain known limits and not-covered text; pilot feedback must retain the
  privacy confirmation and manual-review boundary.
- Risk-based test selection prioritized trust, source visibility, privacy
  gating, recovery, and mobile reachability over unconnected model metrics.

## UX diagnostic matrix

| Diagnostic | Likely user interpretation | UX mechanism under test | Evidence | Acceptance criteria |
|---|---|---|---|---|
| Comprehension | “This is a working paper for a source-linked product decision.” | Hero says `Write down the line you can defend`; source line → claim → smallest test is visible | Fresh desktop/mobile screenshots | A non-owner can paraphrase the job and first action; currently pending |
| Mental model | “I am reviewing evidence, not chatting with an agent.” | Field-folio language, source folios, no typing/agent activity, AI only in fixture subject | Visual inspection and copy scan | No generic assistant shell cues; PASS owner-run |
| Information architecture | “Collect, Verify, Decide, Ship is the order of work.” | Four-step workflow and persistent next action | DOM snapshot and click trace | Every core step has a reachable next action; PASS owner-run |
| Label scent | “Open the sample worksheet” tells me exactly what happens next. | One explicit primary CTA plus `Add your own signal` secondary path | First-run screenshot | Primary action is visible without searching; PASS owner-run |
| Action clarity | “I can inspect a source before accepting a claim.” | `View source`, `Start review`, `Accept claim`, and `Draft smallest experiment` are explicit | Browser trace | No action implies automatic acceptance; PASS owner-run |
| Ability / friction | “I can recover after an empty form or privacy mistake.” | Inline invalid states preserve text; privacy gate explains why it blocks | Validation and privacy snapshots | Error has a visible recovery action and preserved content; PASS owner-run |
| Trust | “This result is bounded, local, and not a validation result.” | Handling note, source/limitation text, manual owner, not-covered list | DOM snapshot and Markdown preview | Trust claims stay tied to evidence; PASS owner-run |
| Recovery | “Refresh clears this sheet; I can return to Collect.” | Refresh boundary, Cancel, Reset, and workflow navigation | Reload and cancel paths | User can leave or reset without hidden persistence; PASS owner-run |
| Dignity / control | “The product will not submit my note or invent an owner.” | Manual GitHub handoff and `Experiment owner · TBD` placeholder | Pilot note output | User decides whether to share; PASS owner-run |

## Feature logic map

| Promise | Roles | Entities | States / state transitions | AI or tool contract | Source of truth | Rollback / evidence |
|---|---|---|---|---|---|---|
| Move one product observation to a defensible smallest test | PM, founder, designer, engineer; final decision owner is the user | Source line, claim, source mapping, experiment, decision brief, field note | Blank → Collect → Verify → Decide → Ship; claim open → reviewed → accepted; feedback closed → prepared | No live AI or external tool; fixture text is deterministic and user-editable | In-memory React state for the current tab; source mapping stays on each claim | Refresh resets local state; browser trace, screenshots, and visible notices are the evidence |
| Keep evidence attached while drafting | Evidence reviewer and PM | Source folio, original line, date, limitation | Source collapsed ↔ expanded; claim accepted or left open | No provider call; no hidden retrieval | Fixture plus current page state | Reset or refresh returns to blank; source expansion trace is the regression proof |
| Carry a reviewable brief forward | PM and manual recipient | Decision brief, Markdown fallback, pilot note | Ready to inspect → copied/downloaded or manually reviewed | Clipboard/download are browser affordances only; no automatic GitHub mutation | Rendered text fallback in the current page | Re-copy, download, or refresh; copy notice and Markdown content are visible evidence |

## Risk model and quality economics

| Risk | User harm / trust impact | Business or support impact | AI uncertainty / data risk | Reversibility | Priority and mitigation |
|---|---|---|---|---|---|
| Source disappears behind a polished conclusion | PM accepts a claim they cannot defend | Poor decisions and support rework | High source/freshness uncertainty | High; local UI change | P0 trust: keep source mapping, limitation, and review control visible |
| Feedback sends private material | User loses control of confidential notes | Reputation and support burden | High privacy risk | Low after external submission | P0 privacy: local-only preview, explicit confirmation, manual GitHub review |
| Empty form loses a source line | User abandons or duplicates work | Lower learning signal and higher support burden | Low AI risk, medium product friction | High | P1 recovery: preserve text and show field-level errors |
| Mobile CTA is unreachable | International mobile user cannot start | Lower conversion and shareability | Low AI risk | High | P1 ability: sticky action and 390px overflow check |
| Visual polish is mistaken for model validation | User over-trusts the fixture | Credibility damage | High because no live model exists | High; copy can be corrected | P0 truth: label fixture, limits, and not-covered state |
| Hosted bundle differs from local evidence | Public user sees stale or broken behavior | Release support burden and lost trust | Medium deployment risk | Medium with rollback to prior commit | P0 release: canonical HTTP verifier plus fresh hosted browser trace |

Quality economics for this v0 favors reversible, evidence-rich work: one extra
source review or privacy check costs seconds; a false claim of model quality,
an accidental private-data submission, or a misleading hosted release costs
credibility and creates support work. No revenue, conversion, or star value is
assigned until the relevant external evidence exists.

## Traceable executable QA cases

| Case ID / priority | Traceability | Preconditions | Steps | Expected visible result | Hidden state assertion | Evidence |
|---|---|---|---|---|---|---|
| QA-001 / P0 | First-run CTA and field-folio contract | Fresh local page, 1280×900 | Observe hero, sheet state, sample CTA, handling note | Source-first job and one primary action are visible | No sample data is loaded before activation | Screenshot + DOM snapshot |
| QA-002 / P0 | Source-led review contract | Fresh local page | Open sample, expand one source, start review | Source excerpt is visible; Verify is reachable | Claim retains source mapping | Browser trace + snapshot |
| QA-003 / P0 | Human-owned decision contract | Verify with claims | Accept one claim, draft experiment, inspect brief | Reviewed/accepted state and explicit limits are visible | No automatic result or hidden provider call | Browser trace + Markdown text |
| QA-004 / P0 | Privacy handoff contract | Ship with pilot note open | Prepare once unchecked; prepare again with safe fields and confirmation | First attempt blocks; second creates `This is a field note, not a validation result.` | No GitHub submission occurs | Blocked/allowed snapshots |
| QA-005 / P1 | Recovery and validation contract | Add-source form open | Save empty; fill title/source/line; save | Errors preserve text; valid line raises count | In-memory source list has one additional line | Snapshots + DOM readback |
| QA-006 / P1 | Refresh boundary contract | Custom local line exists | Reload page | Blank sheet returns | No local persistence or external request is created | Reload readback + request log |
| QA-007 / P1 | Keyboard access contract | Fresh page | Tab, inspect focus, Enter skip link | Skip link is first focus; main receives focus | URL includes `#main-content` | Active-element eval |
| QA-008 / P1 | Mobile ability contract | Fresh and loaded page, 390×844 | Inspect screenshots and width metrics; reach sticky action | No clipped CTA or horizontal overflow | `scrollWidth === innerWidth` | Two mobile screenshots + eval |
| QA-009 / P2 | Hosted release contract | Branch merged to `main` | Run HTTP verifier, Pages smoke, hosted browser trace | Canonical bundle matches local copy and behavior | Deployed asset hash/commit matches release | Pending until deploy |

## AI, source, privacy, and trust cases

| Case | Current handling | Status |
|---|---|---|
| Source freshness | Fixture dates and source labels remain visible; the UI does not claim freshness beyond the fixture | PASS for presentation; real freshness integration unverified |
| Groundedness | Claims retain source mappings and export includes evidence summary and known limits | PASS in deterministic fixture |
| Hallucination / unsupported conclusion | Copy names `No claim travels without its source` and keeps claims open until human review | PASS for product guard; live model behavior untested |
| Tool failure | No live tool/provider is connected; copy explicitly says no external transfer or automatic changes | Not applicable to live tool failure; provider contract pending |
| Prompt injection | No model call or retrieval boundary exists in v0 | Unexecuted / not applicable until provider connection |
| Privacy / permission | Pilot-note confirmation blocks preparation until safe-data confirmation | PASS |
| Payment-value | No payment, subscription, or monetization flow exists in this preview | Out of scope; no payment value claim made |

## Focused WCAG 2.2 behavior checks

| Check | Current observation | Status / remaining evidence |
|---|---|---|
| Keyboard focus order and skip link | First Tab focuses skip link; Enter moves to main | PASS owner-run; native AT unverified |
| Focus not obscured | Main focus is moved into the page; mobile sticky action remains visible | PASS visual probe; browser zoom and unusual sticky overlap untested |
| Accessible labels | Buttons, form fields, status regions, and navigation expose names in the snapshot | PASS fallback snapshot; screen-reader output unverified |
| Target size | Primary controls are visually reachable and form controls are separated | Owner-run visual PASS; automated target-size audit not run |
| Contrast / visual hierarchy | Warm paper, dark ink, red action, and blue provenance were manually inspected | Visual PASS; automated contrast tool not run |
| Consistent help and error recovery | Handling note is persistent; errors preserve fields and name the repair | PASS |
| Dragging, redundant entry, accessible authentication | No drag, repeated-entry, or authentication flow exists | Out of scope for this local-first preview |

## Production feedback plan

The next release-learning loop is intentionally manual and reviewable:

- Logs: retain GitHub Actions, hosted verifier, Pages deployment, and browser
  console/request evidence; alert on a non-200 canonical response, stale title,
  stale forbidden copy, or missing primary CTA.
- Analytics / funnel: do not add telemetry yet. Once five consented sessions
  exist, record only aggregate step completion (`Collect → Verify → Decide →
  Ship`) and feedback count; no raw source lines by default.
- Session replay / support: no replay is connected. Use the manual GitHub
  feedback template after the user reviews the generated field note.
- AI eval regression: not applicable until a live model/provider is connected;
  then add source-linked, missing-source, freshness, refusal, and prompt-
  injection cases before promotion.
- Alert thresholds: block release on any P0 privacy/trust failure, any
  canonical HTTP failure, any console error in the critical path, or any
  mobile overflow that hides the primary action. Do not use star count as a
  quality threshold.

## Fix brief and regression candidates

No serious defect was found in the executed local scope, so no behavior fix is
being smuggled in under the QA report. The preservation brief for this visual
pass is:

- Acceptance criteria: retain one source-first first-run CTA; keep source,
  limitation, human owner, and manual handoff visible; keep privacy and empty-
  form recovery explicit; keep 390px overflow at zero; retain copy that says a
  field note is not a validation result.
- Owner hint: product owner plus implementation owner for the next code pass;
  user research owner for non-owner sessions.
- Regression cases: `QA-001`, `QA-002`, `QA-003`, `QA-004`, `QA-005`, `QA-006`,
  `QA-007`, and `QA-008` must rerun after any shell, copy, or state-flow change.
- What not to change without evidence: do not add a chat shell, typing
  animation, fake confidence score, automatic GitHub mutation, telemetry that
  captures raw signals, or a provider integration merely to make the demo feel
  more AI-native.
- Verification: rerun lint, tests, build, diff check, local browser trace,
  canonical verifier, and hosted browser trace before calling the pass ready.

## Static gates

| Command | Result | Evidence |
|---|---|---|
| `npm run lint` | PASS | `tsc --noEmit` exited 0 |
| `npm test -- --run` | PASS | 4 test files, 10 tests passed |
| `npm run build` | PASS | Vite production build completed successfully |
| `git diff --check` | PASS | No whitespace errors |
| `HOSTED_URL=http://127.0.0.1:4173/ npm run verify:hosted` | PASS within local production-preview scope | HTTP 200, `en-US`, new title, hashed JS/CSS assets, required current strings present, stale strings absent; `canonical_https=false` is expected for local preview |
| `python3 /Users/tommy/.codex/skills/product-qa-specialist/scripts/score_qa_plan.py <this-report> --min-score 85` | PASS when rerun after this report expansion | Required before commit |

## Visual evidence

- [Fresh first-run desktop — 1280×900](./assets/qa/field-folio-first-run-1280.png)
  — warm paper shell, editorial source marker, first-run job, local boundary,
  and primary sample action.
- [Fresh first-run mobile — 390×844](./assets/qa/field-folio-first-run-390.png)
  — compact workflow bar and sticky primary action without horizontal overflow.
- [Fresh loaded desktop — 1280×900](./assets/qa/field-folio-loaded-1280.png)
  — source folios, visible provenance, and a quieter evidence spine.
- [Fresh loaded mobile — 390×844](./assets/qa/field-folio-loaded-390.png)
  — loaded source path and `Start review` remain reachable on one column.

## Findings

### No blocking finding in the executed local scope

- The visual hierarchy is now specific to a PM source-review instrument rather
  than a generic AI dashboard.
- The first-run path has one dominant action and a visible handling boundary.
- Source, limitation, review, ownership, and manual handoff remain in the
  observable product state.
- Privacy and validation friction are explicit and recoverable.
- Desktop and mobile screenshots show no visual clipping; the DOM width check
  confirms no horizontal overflow at 390px.

The following are product-learning gaps, not claims of product success:

- “Feels less like AI” is still a design hypothesis until non-owner
  international users say what the product is and why they would use it.
- The owner field is deliberately `Experiment owner · TBD`; the product does
  not invent a real person or pretend the test has been staffed.
- There is no evidence yet for retention, repeat use, contribution, adoption,
  GitHub traffic, or stars.

## Not covered

- Canonical hosted HTTP, hosted bundle strings, Pages deploy, hosted smoke, or
  hosted browser behavior for this new visual pass.
- Codex Chrome Extension foreground-focus and existing Chrome-profile behavior.
- Native VoiceOver, NVDA, TalkBack, real-device touch, hardware keyboard, or
  physical share/save behavior.
- Non-owner PM, founder, designer, or engineer sessions; five-second
  paraphrases; SEQ; field-note triage; or user-research consent.
- External model-provider quality, latency, cost, prompt behavior, retrieval,
  telemetry, login, persistence, GitHub API mutation, or production privacy
  review.
- GitHub-star growth, adoption, or the 10,000-star outcome.

## Release hold and next gate

Do not call this visual pass hosted or released until a branch is pushed, CI
passes, the branch is merged into `main`, GitHub Pages deploys, the canonical
HTTP verifier passes against
`https://asdc163.github.io/pm-signal-lab/`, and a fresh hosted fallback browser
run confirms the same current copy and core path. The next product-learning
gate remains five unguided international sessions and three triageable field
notes; those are not represented by this owner-run report.
