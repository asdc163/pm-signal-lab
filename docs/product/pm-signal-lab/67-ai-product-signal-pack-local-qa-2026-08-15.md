# AI product signal pack — local QA record

Date: 2026-08-15
Surface: local Vite preview for the English-first PM Signal Lab demo
Release intent: make the deterministic sample visibly useful for an AI PM portfolio without adding a provider, fake model activity, or unsupported product claims
Status: local scope executed; hosted release gate remains open until the PR, Pages deployment, canonical verifier, and a fresh hosted browser pass are complete

## Scope and product frame

The tested product is a local-first AI product evidence worksheet. An international
PM, founder, designer, or product engineer should be able to inspect a fictional
AI support-copilot signal, keep the source and limitation attached, and leave with
the smallest test worth discussing.

The current workaround is a chat transcript, copied assistant answer, or notes
page that makes a polished draft look more final than its source, freshness,
evaluation coverage, or downstream outcome justify. This QA run tests whether the
sample makes that distinction legible. It does not test market fit, a real support
queue, a live model, or a production workflow.

Target audience / market context: English-first international PM and AI PM
portfolio reviewers. Locale evidence is the rendered `en-US` surface; cultural
fit, international comprehension, five-second comprehension, and non-owner task
evidence are `Not verified` until external sessions are collected.

The fictional fixture contains four demo signals:

- an interview about a polished assistant draft and source freshness;
- a support note about a wrong answer with no repair path;
- a product observation that copying is not resolution;
- an evaluation review whose happy-path coverage misses missing-source and stop conditions.

The fixture is deterministic and local. It does not represent a benchmark score,
model quality, customer record, live support case, user study, adoption, traffic,
or GitHub growth.

## Environment and evidence manifest

| Evidence ID | Environment / tool | Artifact path or URL | Result | Confidence boundary |
|---|---|---|---|---|
| E-LOCAL-01 | `http://127.0.0.1:5180/`, Playwright CLI fallback, 1280×900 | `assets/qa/ai-pm-fixture-first-run-1280.png` | PASS: fresh empty state exposed `Current work`, the AI PM sample quote, `Open the sample worksheet`, `Add your own signal`, and the local boundary | Browser-visible local evidence; not a hosted or Chrome Extension sign-off |
| E-LOCAL-02 | Playwright CLI fallback, 390×844 | `assets/qa/ai-pm-fixture-first-run-390.png` | PASS: mobile stepper, source-first copy, and sticky sample action were visible | No physical-device touch or native assistive technology |
| E-LOCAL-03 | Playwright CLI fallback, 1280×900 | `assets/qa/ai-pm-fixture-loaded-1280.png` | PASS: four source folios, `Evaluation review`, the review docket, and the AI support-copilot domain were visible | Local build only |
| E-LOCAL-04 | Playwright CLI fallback, 390×844 | `assets/qa/ai-pm-fixture-loaded-390.png` | PASS: loaded workbench kept the top stepper, source-review hierarchy, and sticky `Start review` action reachable | No physical-device touch or native assistive technology |
| E-LOCAL-05 | Playwright CLI snapshots, 2026-08-15 08:34–08:35 +08:00 | Playwright snapshot transcripts in `.playwright-cli/` | PASS: sample → source expansion → Verify → accepted source-backed claim → Decide → Ship | CLI fallback because the configured Codex Chrome Extension route was not callable |
| E-LOCAL-06 | Playwright CLI download event | `assets/qa/ai-pm-fixture-decision-brief-2026-08-15.md` | PASS: `Download .md` created a file; content contained the decision brief, AI support-copilot metric, `Known limits`, `Not covered`, and `copying is not resolution` | Download was verified in the local browser session; the committed file is a deterministic artifact from the same fixture; no cloud storage or submission was attempted |
| E-LOCAL-07 | Playwright CLI keyboard path | URL hash `#main-content`; snapshot at 08:33:41–08:33:54 +08:00 | PASS: first `Tab` focused `Skip to main content`; `Enter` moved focus to `main#main-content` | Keyboard baseline only; no native screen-reader sign-off |
| E-LOCAL-08 | Playwright CLI console and requests | `console`, `requests --static` output | PASS: 0 console messages, 0 errors, 0 warnings; requests were same-origin HTML, hashed JS/CSS, and favicon with no external provider request | A clean local session is not a production observability result |
| E-LOCAL-09 | Playwright CLI mobile metric | `window.innerWidth = 390`, `document.documentElement.scrollWidth = 390` | PASS: `hasHorizontalOverflow: false` | One tested mobile viewport |
| E-LOCAL-10 | `score_qa_plan.py` | This record | PASS: `100.0 / 100`, verdict `strong` | Numeric score is a coverage aid, not proof of product quality |
| E-LOCAL-11 | Playwright CLI feedback path, 2026-08-15 08:35–08:36 +08:00 | `.playwright-cli/page-2026-08-15T08-35-35-731Z.yml` and `.playwright-cli/page-2026-08-15T08-36-12-751Z.yml` | PASS: privacy refusal, checked field-note generation, inspect-before-sharing copy, and copy feedback were visible | Synthetic feedback only; no GitHub submission |

The configured Chrome Extension / foreground-focus route was unavailable in this
session. The Playwright CLI fallback is intentionally recorded as separate
evidence; it must not be described as Chrome Extension or native assistive-
technology sign-off.

## Repo QA surface and deep QA toolchain matrix

| Layer | Existing surface | Current execution | Status / explicit boundary |
|---|---|---|---|
| Code correctness | Vitest domain and export tests | `npm test -- --run` | PASS after implementation; exact result is recorded after this report is committed locally |
| Type / compile | TypeScript check through `npm run lint` | `npm run lint` | PASS after implementation |
| Build / asset contract | Vite production build | `npm run build` | PASS after implementation |
| Browser end-to-end | Playwright CLI fallback | Fresh local first-run and loaded flow | PASS for the listed cases; preferred Chrome Extension route unavailable |
| API / contract | Static app; no backend API | Same-origin request inspection | PASS for no external request in the tested session; no API contract exists to certify |
| Accessibility semantics | landmarks, named controls, status, focus, keyboard | snapshots, skip-link activation, visible focus route | PASS for executed baseline; VoiceOver, NVDA, TalkBack, and automated WCAG scanner not run |
| Visual regression | Browser screenshots | 1280×900 and 390×844 first-run / loaded screenshots, visual inspection | PASS for the current fixture direction; no pixel-diff baseline gate exists |
| Responsive behavior | CSS responsive layout | 390px overflow metric and mobile screenshots | PASS at 390px; 768px and physical devices are not part of this diff's fresh execution |
| Performance | No performance budget or profiler in repo | Not run | `未執行`; do not claim performance readiness |
| Security / privacy | Local-only boundary, privacy checkbox, no provider | feedback refusal and field-note generation path | PASS for the tested local boundary; no full SAST, dependency audit, penetration test, or prompt-injection test was run |
| Supply chain | `package-lock.json` and npm scripts | Not independently audited in this slice | `未執行`; dependencies are not evidence of safety |
| AI evaluation | deterministic domain tests and fixture | evaluation-review row and claim mapping exercised | PASS for deterministic product behavior; no model, prompt, retrieval, hallucination, latency, cost, or quality evaluation exists |
| Observability / production feedback | public pilot issue and manual field note | No telemetry or issue mutation | Intentionally out of scope; real session evidence remains open |

## Test data and privacy matrix

| Data class | Test data used | Allowed surface | Protected boundary |
|---|---|---|---|
| Fictional product signal | Four demo lines, `PM-07`, `Case 1842`, `24 cases` | Local fixture and public demo | Must remain clearly labelled as demo data; never present it as customer or benchmark evidence |
| User-entered feedback | Synthetic QA note written in this run | Local field-note textbox | Must be reviewed before sharing; no raw signal content is copied into the report |
| Secrets / credentials | None | Nowhere | No API key, token, login, or private ticket was entered |
| External mutation | None | Nowhere | GitHub feedback link opens a manual review page only; the browser did not submit an issue |

## Behavior matrix

| Case | Persona / job | Starting state | Success signal | Failure signal / trust question | Evidence |
|---|---|---|---|---|---|
| UX-001 | International PM wants to understand the first action | Fresh empty page | Reads the literal source-first job and finds one sample action without an AI chat prompt | Asks “what does this do?” or sees an unexplained AI promise | PASS: E-LOCAL-01, E-LOCAL-02 |
| UX-002 | AI PM wants a concrete review object | Fresh page after sample action | Sees `AI support copilot`, four demo signals, and `Evaluation review` | Confuses the fixture with a live model or real benchmark | PASS: E-LOCAL-03 |
| UX-003 | Low-trust reviewer checks provenance | Loaded worksheet | Expands a source and can read source identity, date, original line, and limitation | Claim appears without a line, date, or source boundary | PASS: source expansion in E-LOCAL-05 |
| UX-004 | PM decides whether a claim travels | Verify step | Sees Source-backed, Needs your review, and Missing evidence; accepts one source-backed claim | The UI turns a suggestion into a fact or hides the limitation | PASS: Verify snapshot in E-LOCAL-05 |
| UX-005 | PM prepares a test | Decide step | Can see and edit metric, guardrail, smallest test, decision rule, and owner | A proposed `4 of 5` rule reads like completed research | PASS: Decide snapshot; the brief labels the rule as a current limit |
| UX-006 | PM carries a brief forward | Ship step | Export shows evidence, known limits, experiment, and `Not covered` | Export implies completion, adoption, or model quality | PASS: Ship snapshot and download content check |
| UX-007 | Feedback reporter protects private data | Pilot note open | Report is blocked until the privacy confirmation is checked; field note says inspect before sharing | Raw source or private ticket is silently sent | PASS: refusal then checked generation path |
| UX-008 | Mobile PM starts the task | 390×844 fresh page | Top stepper and sticky sample CTA remain usable without horizontal scroll | CTA is clipped, hidden, or the page overflows | PASS: E-LOCAL-02, E-LOCAL-09 |
| UX-009 | Keyboard user bypasses repeated navigation | Fresh page, keyboard only | First `Tab` reaches skip link; `Enter` focuses `main#main-content` | Focus disappears or starts in an unexpected control | PASS: E-LOCAL-07 |

## UX diagnostic matrix

| Diagnostic | Current observation | Mechanism / risk | Acceptance criterion | Evidence status |
|---|---|---|---|---|
| Mental model | The workbench uses `Source → Claim → Smallest test` | Users can mistake synthesis for an answer unless the source stays adjacent | A reviewer can explain what is observed, claimed, and still open | Locally supported; external comprehension not verified |
| Information architecture | Collect, Verify, Decide, Ship are visible as a four-step rail | A generic AI shell would make the PM job less distinct | Each step has a literal job label and a recoverable state | PASS in snapshots |
| Label scent | `Evaluation review`, `source freshness`, `missing evidence`, and `copying is not resolution` are concrete | Generic “AI insights” wording would create AI theatre | Current copy names observable product work | PASS in current bundle and browser |
| Next action | One primary action is visible for each current state | Multiple competing CTAs can create first-run hesitation | Current work status and primary action agree | PASS in screenshots and snapshots |
| Ability / friction | Mobile uses stacked sections and a bottom action; text remains editable | Long source lines or sticky actions can clip content | No horizontal overflow at 390px; primary action remains reachable | PASS at one viewport |
| Trust / dignity | Human approval, local boundary, limitations, and privacy gate remain visible | False certainty or silent submission would damage credit | No provider, customer, adoption, or star claim appears as a result | PASS for tested scope |
| Recovery | Refresh resets safely; privacy refusal preserves the form; `Not covered` remains in export | A failure must not destroy or silently submit a user's note | User can dismiss, cancel, inspect, and manually decide | PASS for privacy path; refresh/reset and all error branches are not all browser-executed here |

## Five-second, task usability, behavior trace, and assistive-technology plan

| Evidence slice | Method | Current result | Gate before learning claim |
|---|---|---|---|
| Five-second comprehension | Show a fresh first-run screenshot or page for five seconds, then ask what the product is, who it is for, and what the first action is | Not run with a non-owner; the local screenshot is a visual oracle only | At least five international PM sessions with recorded answers and no maintainer explanation |
| Task-based usability | Unguided five-minute session: open sample, inspect one source, accept or keep one claim, draft the smallest test, and explain the limit | Not run with a non-owner; the browser path is technically executable | Record completion, time on task, abandonment, and the user's own explanation |
| Behavior trace | Observe hesitation, repeated clicks, backtracking, scroll search, recovery, and where the tester stops | Not available from a maintainer-run CLI session; no session replay is installed | Collect a de-identified trace or concrete written observation from the public pilot |
| Assistive-technology profiles | Keyboard-only, VoiceOver, NVDA, TalkBack, low-vision zoom, and reduced-motion profiles | Keyboard skip-link baseline passed; native assistive technology and low-vision profiles are not run | Test at least one real profile per supported platform before claiming accessibility completeness |
| AI UX uncertainty | Ask whether the reviewer can distinguish source, observation, design hypothesis, missing evidence, and proposed experiment | Local fixture visibly separates these states; non-owner interpretation is not verified | External session notes must confirm or refute the distinction without a maintainer prompt |

The current browser trace is implementation evidence, not usability evidence.
It intentionally does not substitute an internal walkthrough for task research.

## Feature logic map and source of truth

### Product promise, roles, entities, and AI/tool contracts

- **Promise:** keep a product signal attached to its source, show what the line
  supports, and turn the remaining uncertainty into the smallest test.
- **Roles:** a visitor is the reviewer; the product owner controls acceptance,
  editing, export, and manual sharing; there is no autonomous agent or hidden
  operator role.
- **Entities:** `Evidence`, `Claim`, `ExperimentBrief`, `DecisionMemo`,
  `SessionFeedback`, source folio, limitation, and `Not covered`.
- **AI/tool contract:** the current fixture makes no model call, tool call,
  retrieval call, provider claim, or external mutation. Any future provider
  adapter must keep source IDs, freshness, uncertainty, human approval, and
  refusal/recovery states visible before it can enter this workflow.
- **Source truth:** fixture rows live in `src/domain/fixture.ts`; type identity
  lives in `src/domain/types.ts`; claim and experiment derivation lives in
  `src/domain/synthesis.ts`; export/readiness lives in `src/domain/export.ts`;
  feedback privacy shaping lives in `src/domain/feedback.ts`.
- **Evidence sources:** current-turn tests, screenshots, browser snapshots,
  request/console output, and the canonical hosted verifier. Historical notes
  are context only and cannot replace a current release check.

The state transitions are intentionally local and reversible until a human
accepts a claim and chooses to carry the brief forward.

| State / transition | Source of truth | Visible contract | Rollback / recovery |
|---|---|---|---|
| Empty → sample loaded | `src/domain/fixture.ts` plus local React state | Four labelled demo rows, source IDs, and the AI support-copilot title appear | Refresh or `Reset this set` returns to a safe empty state |
| Source row → source excerpt | Evidence row state in `src/App.tsx` | `View source` becomes `Hide source`; original line remains visible | Toggle closed without deleting the source |
| Collect → Verify | Workflow state and synthesized claims | Claim status and source mapping are explicit | Guarded navigation keeps empty claims in Collect |
| Verify → accepted claim | Claim review state | Notice says the source and limitation stay in the decision brief | Keep as hypothesis, edit, or mark missing evidence remain available |
| Verify → Decide | `src/domain/synthesis.ts` experiment draft | Editable metric, guardrail, smallest test, decision rule, owner | User can edit before export; no automatic mutation |
| Decide → Ship | `src/domain/export.ts` readiness gate | Portable Markdown has evidence, limits, experiment, next action, and `Not covered` | Missing review keeps export unavailable according to existing gate |
| Ship → field note | `src/domain/feedback.ts` and privacy confirmation | Local Markdown only; inspect before manual GitHub review | Cancel, dismiss, or do not check privacy confirmation |

## Risk model and quality economics

| Rank | Risk | User / business impact | Current control | Reversibility |
|---|---|---|---|---|
| P0 | A polished assistant draft is mistaken for a supported product outcome | Trust damage to the reviewer and to Tommy's AI PM portfolio | Source mapping, visible limitations, human acceptance, `Missing evidence`, and `Not covered` | High: local copy and fixture can be reverted in one reviewed commit |
| P0 | Private research or customer material is copied into public feedback | Privacy harm and irreversible public disclosure | Fictional fixture, no raw evidence in field note, privacy confirmation, manual review, no auto-submit | Low after publication; therefore blocked by default |
| P1 | Evaluation coverage is read as a benchmark or model-quality result | Incorrect product decision and inflated credibility | `Evaluation review` is a demo signal; brief states no live model or benchmark | High before publishing; low if claimed publicly |
| P1 | The primary action or source hierarchy fails on mobile or keyboard | Abandonment and accessibility exclusion | Responsive screenshots, 390px overflow metric, semantic landmarks, skip-link baseline | High: CSS/copy change and rerun browser gates |
| P1 | GitHub growth is treated as product validation | Misleading portfolio and growth decisions | Stars, forks, traffic, and adoption remain explicitly external and unclaimed | High if no fabricated claim is made |
| P2 | Long-term usage or retention is unknown | Wasted build effort and unclear PMF | Five-PM pilot gate and public feedback handoff | High: gather evidence before expanding scope |

Quality economics for this release favor a small deterministic surface: a false
claim or privacy leak costs more trust than a missing provider integration costs
feature breadth. The team should pay the verification cost at the source,
review, export, mobile, privacy, and hosted boundaries before adding model
latency, telemetry, authentication, or external mutation.

## Fix brief and regression candidates

No P0/P1 defect was found in the executed local scope. The following are the
regression candidates and follow-up acceptance gates, not claims that they have
already passed:

| Candidate | Acceptance criterion | Owner hint | Regression case | What not to change |
|---|---|---|---|---|
| AI PM sample copy drift | Current bundle and hosted page contain `AI support copilot`, `Evaluation review`, and the source/freshness limitation; retired generic fixture copy is absent | Product / content | QA-001, QA-002, hosted verifier | Do not add generic AI marketing language just to improve discoverability |
| Evidence type drift | `evaluation` remains a domain type and renders as `Evaluation review` without changing provider neutrality | Engineering | QA-002, domain tests | Do not encode a vendor or model name in the type identifier |
| Claim limitation drift | Missing-source and copied-response limitations remain visible in Verify and Ship | Product / QA | QA-003, QA-005 | Do not convert a design hypothesis into a result |
| Mobile action drift | 390px first-run and loaded states have no horizontal overflow and retain the primary action | UX / frontend | QA-008 | Do not hide the source or action behind decorative panels |
| Feedback boundary drift | Privacy refusal remains blocking; generated field note contains manual-review language and no raw source | Product / frontend | QA-006 | Do not auto-submit GitHub issues or silently persist private content |
| Hosted asset drift | Pages serves the merged hashed bundle and canonical verifier passes | Release owner | Hosted audit cases | Do not call local or CI success a production release |

## Traceable executable QA cases

### QA-001 — first-run AI PM comprehension surface

- Priority: P0
- Traceability: AI product signal pack contract AC-1, AC-5, AC-6
- Preconditions: local preview running at `http://127.0.0.1:5180/`; fresh reload; 1280×900 viewport
- Steps: reload; inspect the first viewport; read `Current work`; inspect the sample quote; locate `Open the sample worksheet` and `Add your own signal`
- Expected visible result: the product job is source-first and the sample is clearly a fictional AI support-copilot fixture; no chat bubble, model activity, provider, or star claim appears
- Expected hidden state: no API or external request is made; no session content is persisted
- Evidence: E-LOCAL-01; screenshot `ai-pm-fixture-first-run-1280.png`

### QA-002 — sample pack and evaluation evidence

- Priority: P0
- Traceability: contract AC-1, AC-2, AC-3
- Preconditions: fresh first-run state
- Steps: select `Open the sample worksheet`; inspect all four rows; locate the fourth row; inspect its source type and demo identity
- Expected visible result: `AI support copilot: deciding what to test next`, `Evaluation review`, and `Demo evaluation review · 24 cases` are visible; the row explains the missing-source and stop-condition limitation
- Expected hidden state: the underlying type is provider-neutral `evaluation`; the fixture remains deterministic
- Evidence: E-LOCAL-03 and E-LOCAL-05

### QA-003 — source-to-claim trust path

- Priority: P0
- Traceability: contract AC-3, AC-4; source-ledger QA cases
- Preconditions: loaded sample worksheet
- Steps: expand the evaluation-review source; select `Start review`; inspect all three claim statuses; accept the Source-backed claim
- Expected visible result: the source excerpt is reversible; Verify shows source mapping and limitations; the missing-evidence claim remains visibly unapproved; acceptance feedback says the source and limitation stay in the brief
- Expected hidden state: only the accepted claim is marked reviewed/accepted; no external state changes
- Evidence: E-LOCAL-05 snapshots at 08:28–08:35 +08:00

### QA-004 — smallest AI PM experiment

- Priority: P0
- Traceability: contract AC-4
- Preconditions: one source-backed claim accepted
- Steps: select `Draft smallest experiment`; inspect the brief fields; do not rely on an external model
- Expected visible result: primary metric references a source-linked next action; guardrail prevents a polished draft from looking complete before source/freshness review; smallest test asks five PMs to name source, uncertainty, and next test; decision rule is labelled as a current limit
- Expected hidden state: all fields are local editable state; no notification or issue is sent
- Evidence: Decide snapshot at 08:35:08 +08:00

### QA-005 — decision brief export and download

- Priority: P0
- Traceability: export contract and contract AC-4, AC-6
- Preconditions: experiment brief drafted
- Steps: select `Export decision brief`; inspect preview and text fallback; select `Copy Markdown`; select `Download .md`; read the downloaded file
- Expected visible result: feedback confirms copy; browser reports a downloaded `pm-signal-decision-brief.md`; output includes `Known limits`, `Not covered`, and the no-resolution boundary
- Expected hidden state: the content is generated locally and download is the only file side effect
- Evidence: E-LOCAL-06; `rg` content check on the downloaded file

### QA-006 — privacy-gated pilot note

- Priority: P0
- Traceability: trust/privacy contract and public pilot boundary
- Preconditions: Ship view with a prepared decision brief
- Steps: open `Help decide what to fix next`; select `Prepare field note` without privacy confirmation; verify the refusal; fill synthetic feedback; check the privacy confirmation; prepare and inspect the field note; copy it
- Expected visible result: first action is blocked with a clear privacy message; after confirmation the field note explicitly says it is not a validation result, contains no raw source line, and asks the user to inspect before manual GitHub review; copy feedback appears
- Expected hidden state: no issue submission or external mutation occurs
- Evidence: E-LOCAL-11; Playwright snapshots `page-2026-08-15T08-35-35-731Z.yml` and `page-2026-08-15T08-36-12-751Z.yml`.

### QA-007 — keyboard skip-link baseline

- Priority: P1
- Traceability: keyboard and semantic oracle
- Preconditions: fresh page with body focused
- Steps: press `Tab`; inspect active element; press `Enter`; inspect URL hash and active element
- Expected visible result: first focus is `Skip to main content`; `Enter` moves focus to `main#main-content` and URL hash becomes `#main-content`
- Evidence: E-LOCAL-07

### QA-008 — mobile no-overflow baseline

- Priority: P1
- Traceability: responsive acceptance criteria
- Preconditions: fresh and loaded states at 390×844
- Steps: reload at 390×844; inspect first-run screenshot; open the sample; inspect loaded screenshot; measure `document.documentElement.scrollWidth`
- Expected visible result: stepper and sticky primary action remain visible; document width equals viewport width
- Evidence: E-LOCAL-02, E-LOCAL-04, E-LOCAL-09

## Negative, recovery, and interruption coverage

| Path | Expected safety behavior | Current evidence |
|---|---|---|
| Prepare field note without privacy confirmation | Refuse and preserve the typed form | PASS in current browser run |
| Refresh midway through a worksheet | Reset to a safe empty state; no stale claims or external persistence | Existing product contract/source path; fresh reload was executed, but a mid-form refresh with unsaved user text is not separately recorded in this slice |
| Reset the loaded source set | Return to an empty worksheet without deleting external data | Existing UI path; not separately executed after this diff |
| Attempt Decide before source/claims exist | Keep the user in Collect and explain the missing input | Source and bundle inspection; guarded normal UI prevents direct invalid entry |
| Download blocked by browser | Keep Markdown in the text fallback | Textarea is visible in the Ship snapshot; forced download-block simulation not run |
| GitHub feedback link | Open a manual review page only; never auto-submit | Link target and UI warning inspected; no page submission attempted |
| Provider/model failure | No provider call is possible in this build | Same-origin request list; live-provider failure is out of scope |

## AI/source/trust checks

- Source freshness is named in the first signal and in the accepted claim; the
  current fixture does not invent a freshness timestamp for a live source.
- Evaluation coverage is treated as a product limitation, not a benchmark
  score. The sample says that happy-path matching does not prove a stop or
  refusal behavior.
- `A copied assistant response will resolve a support case.` is intentionally a
  Missing evidence claim. The limitation says that copying is not resolution.
- The generated experiment includes a guardrail against presenting a polished
  answer as complete before source and freshness are reviewable.
- No prompt, retrieval, model, provider, tool-call, or autonomous action is
  present. Prompt-injection and provider-failure cases are therefore explicitly
  out of scope for this deterministic fixture, not silently treated as passed.

## Result, defects, and release interpretation

No blocking finding was observed in the executed local browser scope. The
specific product change is visually coherent with the field-sheet direction:
AI specificity comes from source rows, evaluation limits, claim states, and an
editable experiment brief. No decorative AI treatment, fake progress, model
persona, or unsupported result was added.

This is not a complete product-quality sign-off. It is a local evidence gate.
The hosted release must still prove the exact merged commit at the canonical
Pages URL, including the current sample copy, asset integrity, fresh hosted
browser flow, mobile overflow, console state, and the correct GitHub/Pages
workflow results.

## Not covered / blocked / out of scope

- The Codex Chrome Extension foreground-focus route was unavailable; Playwright
  CLI fallback is the executed browser evidence.
- VoiceOver, NVDA, TalkBack, native mobile touch, hardware keyboard, and a full
  WCAG 2.2 audit were not run.
- Five-second comprehension, task usability with non-owner international PMs,
  hesitation/backtracking traces, retention, conversion, and market fit are not
  verified. The intended five-PM pilot remains open.
- No live model, provider adapter, retrieval, prompt-injection, hallucination,
  benchmark, latency, cost, or AI output-quality evaluation is claimed.
- Performance profiling, dependency/supply-chain audit, SAST, DAST, and
  penetration testing were not executed in this slice.
- No production telemetry, GitHub traffic, issue comments, forks, stars, or
  adoption result is inferred from this run.

## Release, rollback, and learning gate

Release preconditions:

1. Static tests, typecheck, build, diff check, and the QA record score pass.
2. The branch is pushed and its PR passes repository CI.
3. The PR is merged through the normal GitHub review boundary; the private local
   `docs/github-star-growth-plan.md` remains untracked.
4. GitHub Pages deploys from `main`.
5. `npm run verify:hosted` passes against
   `https://asdc163.github.io/pm-signal-lab/`.
6. A fresh hosted browser run repeats QA-001 through QA-005 and the mobile,
   console, and request-boundary checks.

If the hosted gate fails, do not call the release complete. Revert this single
feature commit or merge commit using the repository's normal reviewed Git path,
then rerun the static and hosted gates. Do not delete the public repository or
rewrite history.

The product-learning gate remains open until real international PM sessions are
reviewed. Record one concrete expectation, hesitation, trust/doubt signal,
recovery moment, and requested change in the public pilot issue only after the
report has been manually inspected for private data. Stars are an external
outcome; this QA record makes no star or adoption claim.
