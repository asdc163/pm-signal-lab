# Product QA Report — PM Signal Lab Subject-Specificity Pass

Date: 2026-08-15
Checked at: `2026-08-15T10:31Z` to `2026-08-15T10:36Z`
Surface: local production preview at `http://127.0.0.1:4179/`
Locale: English-first `en-US`
Change under test: `Support draft review` loaded subject and subordinate
`Subject under review` metadata line
Release target: `https://asdc163.github.io/pm-signal-lab/`

## QA result

The subject-specificity pass is operational in the executed local production
preview scope. The loaded worksheet now reads `Support draft review: deciding
what to test next`; the AI context remains visible as
`AI-assisted support drafting` under `Subject under review`, rather than as the
shell's headline. The first-run sample quote also uses `The support draft...`
so the first human signal is the PM work, not an assistant persona.

The fallback browser completed fresh first-run and loaded observations, source
context inspection, the core source → claim → smallest-test path, decision-brief
export, privacy-gated field-note preparation, refresh reset, mobile reflow,
keyboard skip-link behavior, and console/request checks against the production
preview bundle. No blocking defect was observed in that scope.

This is owner-run local engineering and behavior evidence. It does not prove
that non-owner international users prefer the new naming, that the product is
no longer perceived as AI-like by the market, model quality, adoption,
retention, traffic, or GitHub-star growth.

## Evidence boundary and route used

- Intended product-QA route: Codex Chrome Extension controlling the existing
  Chrome session.
- Current tool surface: the Chrome Extension route was unavailable in this
  task, so it was not presented as completed evidence.
- Route used: Playwright CLI fallback with a headed Chromium session named
  `fieldfolio-preview`, against the local Vite production preview on port
  `4179`.
- Computer Use was not used. No alternate public-browser automation bridge was
  used.
- The fallback proves DOM state, direct interaction, screenshots, console
  output, static requests, and viewport metrics. It does not prove foreground
  focus in Tommy's existing Chrome profile, native VoiceOver/NVDA/TalkBack
  output, physical device behavior, or real-user comprehension.
- Fixture mode: deterministic local sample data. No external model provider,
  login, telemetry, GitHub mutation, or raw-signal upload is connected.

## QA scope

### In scope

- Visible loaded subject hierarchy and copy oracle.
- English-first first-run and loaded behavior.
- Source expansion and source-to-review handoff.
- Decision-brief and manual field-note boundaries.
- Refresh reset and privacy recovery.
- Desktop `1280×900` and mobile `390×844` screenshots.
- Keyboard skip-link and semantic accessible-name snapshot.
- Production preview build, static verifier, console, and request log.

### Out of scope

- Hosted Pages verification for this new commit; it requires PR merge and a new
  deploy.
- Codex Chrome Extension foreground-control evidence.
- Native screen-reader output, browser zoom, real-device touch, or physical
  share/save behavior.
- Non-owner international comprehension or preference testing.
- Live model quality, prompt, retrieval, latency, cost, or safety evaluation.
- GitHub traffic, adoption, retention, referrals, or stars.

## Product QA behavior matrix

| User archetype and job | Starting state | Expected success signal | Failure signal | Recovery path | Evidence status |
|---|---|---|---|---|---|
| International PM / understand the loaded subject | Fresh production preview, then sample loaded | `Support draft review` is read before `AI-assisted support drafting`; the PM job remains the first action | The page leads with an AI assistant identity or hides what is being reviewed | Use the source ledger and `Start review`; subject cue remains metadata | PASS in owner-run desktop/mobile DOM and screenshots; non-owner comprehension is unverified |
| International PM / start on a phone | Fresh `390×844` | First-run task and sticky action remain reachable with no horizontal overflow | CTA is clipped, stepper overlaps, or content exceeds the viewport | Scroll the single-column folio and use the sticky action | PASS: `bodyWidth=375 <= viewportWidth=390`; scrollbar-adjusted client width explained below |
| Evidence reviewer / inspect provenance | Sample loaded | `View source` reveals the original line, source identity, date, and excerpt | The title looks like a conclusion with no source path | Expand/collapse the source row before review | PASS in direct browser trace |
| PM / review a claim | Sample loaded, Collect step | `Start review` reaches Verify with source mapping and human controls | Review implies automatic acceptance or loses source context | Return to Collect or keep a claim open | PASS in the existing core trace |
| PM / draft a smallest test | Verify with first claim accepted | Decide exposes metric, guardrail, smallest test, decision rule, and owner field | Export reads as a completed result | Edit the brief or return to Verify | PASS; `Experiment owner · TBD` remains an honest unstaffed placeholder |
| PM / carry work forward | Decision brief ready | Markdown is inspectable and copy/download are manual | Product implies it sent an issue or changed GitHub | Use text fallback or manual review | PASS; no mutation path exists |
| Privacy-conscious tester / leave feedback | Ship, pilot note open | Unchecked confirmation blocks; checked safe fields produce a local field note | Private-data gate can be bypassed or feedback submits automatically | Correct the boundary, cancel, inspect, then decide manually | PASS in blocked and allowed branches |
| Keyboard user / reach the first action | Fresh production preview | First Tab focuses `Skip to main content`; Enter focuses `main#main-content` | Focus starts in an invisible or unlabeled control | Use the visible skip link and normal tab order | PASS fallback browser; native AT remains unverified |

## Five-second comprehension probe

This was an owner-run visual probe, not a participant study. The fresh loaded
desktop screenshot shows the PM instruction `Check what this line supports`, the
sheet state, the working-file title `Support draft review`, the quiet subject
cue, and the source ledger. The first-run desktop/mobile screenshots show the
source-first job, one primary sample action, and the local handling boundary.

The probe supports a design observation: the visible hierarchy now names the PM
working object before the AI subject. It does not support a claim that an
international user will understand the product without help. A non-owner
paraphrase remains `not verified`.

## Task-based usability protocol

The following deterministic owner-run path was executed against the local
production preview and was supplemented by the existing full local core-flow
trace:

1. Start from the blank first-run sheet.
2. Confirm `Write down the line you can defend`, `Open the sample worksheet`,
   and the local handling boundary.
3. Open the sample and confirm `Support draft review` plus
   `Subject under review` / `AI-assisted support drafting`.
4. Expand a source row and confirm source excerpt text is present.
5. Start review, accept the first source-backed claim, and confirm accepted
   count changes.
6. Draft the smallest experiment, export the decision brief, and inspect the
   Markdown fallback.
7. Open the pilot note, confirm preparation is blocked before privacy
   confirmation, then prepare safe synthetic feedback after confirmation.
8. Reload and confirm the sheet returns to `Blank sheet`.
9. Resize to `390×844`, inspect first-run and loaded screenshots, and confirm
   the sticky action remains present.

This is an engineering acceptance trace, not a usability score, adoption
signal, or participant study.

## Behavior trace evidence

| Trace | Observed result | Evidence |
|---|---|---|
| Fresh first run, desktop | `Write down the line you can defend`, `Blank sheet`, local boundary, and sample CTA are visible | [Subject-specificity first-run desktop](./assets/qa/field-folio-subject-first-run-1280.png) |
| Fresh first run, mobile | Compact workflow, first-run job, and sticky `Open the sample worksheet` action are visible | [Subject-specificity first-run mobile](./assets/qa/field-folio-subject-first-run-390.png) |
| Loaded subject, desktop | `Support draft review` is the working-file title; `Subject under review` is subordinate metadata | [Subject-specificity loaded desktop](./assets/qa/field-folio-subject-loaded-1280.png) |
| Loaded subject, mobile | The subject cue wraps inside the single-column layout; source ledger remains readable | [Subject-specificity loaded mobile](./assets/qa/field-folio-subject-loaded-390.png) |
| Source inspection | `View source` changes to an expanded source excerpt with source identity and date | Fresh production-preview snapshot `page-2026-08-15T10-33-36-681Z.yml` plus local interaction trace |
| Review | `Start review` reaches `Check the claim against the line`; source mappings and human decision controls remain | Existing local core trace, rerun against current Vite dev surface |
| Export | `Decision brief is ready`; Markdown fallback retains handling note, evidence, known limits, experiment, and `Not covered` | Fresh local snapshot `page-2026-08-15T10-24-32-477Z.yml` |
| Privacy blocked | Unchecked preparation shows `Please confirm that this report contains no customer data, private content, API keys, or tokens.` | Fresh local snapshot `page-2026-08-15T10-24-59-952Z.yml` |
| Privacy allowed | Safe synthetic fields produce `This is a field note, not a validation result.` and manual GitHub review link | Fresh local snapshot `page-2026-08-15T10-26-22-297Z.yml` |
| Refresh reset | Reload returns to `Blank sheet`; no session state persists | Fresh local snapshot `page-2026-08-15T10-26-50-510Z.yml` |

## Keyboard and semantic behavior

- On the production-preview mobile session, the first `Tab` focused the
  `Skip to main content` link.
- `Enter` on that link changed the URL to `#main-content` and moved focus to
  `main#main-content` with `tabindex=-1`.
- Source, workflow, sample, feedback, and form controls exposed accessible
  names in the fallback snapshot.
- Native screen-reader output, VoiceOver rotor behavior, NVDA, TalkBack,
  browser zoom, and reduced-motion behavior were not executed.

## Mobile and request checks

At `390×844` in headed Chromium:

- `window.innerWidth=390`.
- `document.documentElement.clientWidth=375`.
- `document.body.scrollWidth=375`.
- `bodyWidth <= viewportWidth`, so no horizontal overflow was observed. The
  15px difference is the normal headed-Chromium vertical scrollbar, not a
  content-width overflow.
- The sticky `Next action` region remained visible in the blank and loaded
  states.
- The loaded subject metadata width was `343px`, inside the content column.

The production-preview request log contained 13 static requests, all `200 OK`:
the document, the hashed JavaScript asset, the hashed CSS asset, and the
favicon repeated across reloads. No dynamic API, model-provider, telemetry,
GitHub mutation, or upload request was observed.

## TA / market context brief

The intended first audience is an international English-speaking PM, founder,
designer, or engineer evaluating an AI-assisted product workflow and needing
to turn a polished observation into a source-linked next test. The naming
change is a product hypothesis: English-speaking practitioners may identify
with the work object `Support draft review` faster than with an AI category
label, while still needing the AI subject to be explicit for portfolio context.

| Context item | Working hypothesis | Evidence boundary |
|---|---|---|
| Segment | English-first product practitioners working across AI support, research, evaluation, or internal tools | Product hypothesis; no target-user study |
| First-read need | Understand the PM task before deciding whether the AI subject is relevant | Owner-run screenshot evidence; external comprehension unverified |
| Trust need | See source, date, limitation, and human review before accepting a claim | Deterministic fixture and browser trace; live model behavior untested |
| Market signal | A concrete PM work object may be more distinctive than a generic AI shell | Design hypothesis; no conversion or star evidence |
| Next learning gate | Five unguided international sessions and at least three concrete field notes | Not yet collected |

### Scenario, workaround, and local-fit simulation

| Scenario | Current workaround before PM Signal Lab | What this surface must make easier | Local-fit confidence |
|---|---|---|---|
| A PM has one support-draft observation and needs a defensible next test | Paste the line into a document, manually add source context, then jump between notes and an experiment template | Keep the observed line, source, review decision, and smallest test in one inspectable folio | Medium for the workflow shape; low for market demand |
| A founder or designer reviewing an AI feature needs to separate a user signal from an AI conclusion | Treat a polished assistant summary as the conclusion or discuss the feature from a generic AI label | Put the work object first and expose AI as the reviewed subject, with limitations beside the claim | Medium for owner-run comprehension; non-owner evidence is missing |
| An international collaborator needs to hand off a decision without implying validation | Share a screenshot or a confident-looking summary with no source trail | Export a Markdown brief that keeps source context, known limits, and `Not covered` visible | Medium for deterministic behavior; real handoff utility is unverified |

The local-fit simulation is intentionally narrow: four fictional source lines,
English copy, no login, and no live model. It tests whether the proposed
workflow can be inspected without an assistant persona. It does not simulate
organizational permissions, multilingual nuance, customer-data handling, or a
real support operation. Confidence is therefore about the tested interaction,
not product-market fit.

## Feature logic and state map

| Promise | Role | Entity / state | Source of truth | Contract and rollback | Evidence |
|---|---|---|---|---|---|
| Turn one observed line into a reviewable PM next step | PM / reviewer | `FieldPack`: blank → loaded | Deterministic fixture in `src/domain/fixture.ts` | Loading the sample is local and reversible via refresh; no server write | E-072-01, E-072-06, E-072-07, E-072-08 |
| Preserve provenance before interpretation | Evidence reviewer | `Source`: collapsed → expanded | Fixture source id, date, excerpt, limitation | Expand/collapse changes view state only; source text is not rewritten | E-072-09, QA-072-003 |
| Keep the decision human-owned | PM | `Claim`: candidate → accepted / edited / hypothesis / missing | Human action in the review step | Refresh resets local session; export cannot mutate GitHub | E-072-09, QA-072-004 |
| Make the smallest next test explicit | PM / collaborator | `DecisionBrief`: draft → ready | Review decisions plus fixture experiment fields | Copy/download and manual handoff are the only outbound boundary | E-072-09, QA-072-005 |
| Prevent unsafe feedback handoff | Tester / owner | `FieldNote`: blocked → prepared | Synthetic fields plus explicit privacy checkbox | Unchecked gate blocks preparation; cancel and refresh recover | E-072-09, QA-072-005, E-072-09 |
| Explain the AI relationship without an AI shell | Portfolio reader | `Subject cue`: hidden in blank → subordinate in loaded | Literal UI copy in `src/App.tsx` and `src/styles.css` | Revert title/cue change together if external comprehension shows confusion | E-072-01, E-072-07, E-072-08 |

There is no model, tool, API, persistence, or external mutation contract in
this release. A future live-model version must add provider input/output
schemas, prompt-injection tests, latency and cost budgets, human escalation,
trace retention, and a separate rollback plan before it can reuse this map.

## Risk model and quality economics

| Risk | User harm / trust impact | Business impact | Data or AI uncertainty | Reversibility | Priority and control |
|---|---|---|---|---|---|
| AI category language makes the product read like a generic assistant | High: portfolio reader may misunderstand the PM work and discount credibility | High: lower qualified attention and weaker differentiation | Medium; interpretation is not yet observed with non-owners | High: copy-only rollback | P1 — PM-first title, subordinate subject cue, five-second probe, five international sessions |
| A source-backed claim is mistaken for a validated result | High: user may make a product decision from insufficient evidence | High: damages trust in the portfolio | Medium; deterministic fixture has explicit limits, live model absent | High: visible status and export boundary | P1 — source mapping, human action, known limits, `Not covered`, manual export |
| A privacy confirmation is misunderstood or bypassed | High: private content or tokens could be prepared for handoff | High: reputational and security damage | High in a future connected release; low in this no-network fixture | Medium: local gate can be tightened; external submission would be harder | P1 — unchecked block, synthetic-only trace, no upload/API path, security review before mutation |
| Mobile layout hides the next action or subject context | Medium: first-run abandonment or misread | Medium: lower trial completion | Low for layout; real devices untested | High: CSS rollback | P1 — `390×844` trace, width oracle, sticky-action check, real-device follow-up |
| Screenshot or owner-run trace is mistaken for adoption evidence | High: public claims overstate product validation | High: direct damage to Tommy's credit | Low uncertainty; evidence boundary is known | High: documentation correction | P1 — explicit evidence layers, no star/adoption claim, non-owner gate |
| Hosted Pages serves a stale bundle after merge | Medium: public reader sees old title or broken behavior | Medium: release confusion | Low once canonical verifier runs | High: revert or redeploy | P1 — hashed asset check, stale-copy forbidden oracle, fresh hosted browser trace |

Priority is ordered by harm and trust before convenience. The current local
change is cheap to reverse, but the public claim boundary is not treated as
cheap: it stays on hold until the hosted and non-owner evidence gates pass.

## Deep QA Toolchain Matrix

| Quality layer | Tool or method | Current evidence | Scope decision |
|---|---|---|---|
| Code correctness | TypeScript compiler, Vitest, Vite build | PASS: 4 files / 10 tests, lint, build | In scope |
| Static copy contract | `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` | PASS: HTTP 200, `en-US`, assets 200, current copy present, old visible title/stale strings absent | In scope; HTTPS is false only because this is local preview |
| E2E browser | Playwright CLI headed fallback | PASS for listed behavior trace | Chrome Extension route unavailable |
| Accessibility | Keyboard skip-link, semantic snapshot, viewport inspection | PASS for executed fallback checks | Native AT unexecuted |
| Visual review | Fresh `1280×900` and `390×844` screenshots | PASS owner-run; no automated pixel baseline | In scope; external comprehension pending |
| Performance | Vite build and static asset response | Build PASS; no production performance claim | Lighthouse, slow-device, and throttled network are out of scope |
| Privacy/security | Privacy gate, source inspection, static request log | PASS for local boundary; no secrets or dynamic requests | Formal threat model, CSP, and hosted-header audit pending |
| AI evaluation | Deterministic fixture with source/limitation/not-covered text | PASS for uncertainty presentation | No live model/provider/eval dataset exists |
| Observability | Console, request log, visible notices | PASS: 0 console errors, 0 warnings; static requests only | No analytics/session replay is connected |

## QA evidence manifest

| Evidence ID | Artifact / command | Layer | Status |
|---|---|---|---|
| E-072-01 | `src/domain/fixture.ts`, `src/App.tsx`, `src/styles.css` | Copy and UI implementation | PASS |
| E-072-02 | `npm test` | Unit/domain regression | PASS: 4 files, 10 tests |
| E-072-03 | `npm run lint` | TypeScript | PASS |
| E-072-04 | `npm run build` | Production bundle | PASS |
| E-072-05 | `git diff --check` | Diff hygiene | PASS |
| E-072-06 | `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` | Local production static contract | PASS |
| E-072-07 | `field-folio-subject-first-run-1280.png`, `field-folio-subject-first-run-390.png` | First-run visual | PASS |
| E-072-08 | `field-folio-subject-loaded-1280.png`, `field-folio-subject-loaded-390.png` | Loaded visual | PASS |
| E-072-09 | Playwright CLI snapshots and behavior traces | Browser behavior | PASS in fallback route |
| E-072-10 | `https://asdc163.github.io/pm-signal-lab/` | Hosted release | Pending after merge/deploy |

### Repository QA surface discovery

| Surface | Discovered truth | QA implication |
|---|---|---|
| `src/domain/fixture.ts` and `src/domain/synthesis.test.ts` | Fixture strings and synthesis expectations are the copy regression boundary | Keep the loaded title, subject cue, source wording, and limitation assertions together |
| `src/App.tsx` and `src/styles.css` | Loaded subject composition and responsive cue are implemented in the app shell | Run desktop, mobile, keyboard, and visual checks after copy/layout edits |
| `scripts/verify-hosted-demo.mjs` | Static verifier checks current and stale strings, locale, assets, and HTTP status | Run against local preview and canonical HTTPS after every public bundle change |
| `.github/workflows/` | CI and Pages deployment are external release gates | A local PASS cannot be promoted until CI and Pages evidence are fresh |
| `docs/product/pm-signal-lab/` | Product contracts and QA reports are the durable handoff surface | Keep current contract, local report, hosted audit, and gaps linked from README/DESIGN |

The repository scan did not find a live model client, analytics SDK, auth
surface, persistence layer, GitHub write client, or uploaded customer-data
path in this change. Those absent surfaces are a boundary, not a passed test.

## Test data and privacy matrix

| Data class | Fixture used | Allowed destination | Gate |
|---|---|---|---|
| Synthetic source lines | Four fictional demo lines | Current page and Markdown preview | PASS |
| Safe owner-run field note | Synthetic browser/device and workflow observations | Local field-note preview; manual review before GitHub | PASS with explicit checkbox |
| Customer names, private tickets, API keys, tokens | None | Nowhere | Blocked by copy and privacy confirmation |
| External model prompts or raw signals | None | Nowhere in this build | Not connected |

## AI eval and trace assertions

- AI eval dataset: not applicable to a live model; this fixture is deterministic
  and cannot support model-quality claims.
- Source assertion: every candidate claim retains source mapping or an explicit
  no-source state.
- Trust assertion: the UI and export retain limitations, known limits, and
  `Not covered` text.
- Control assertion: accepting a claim is an explicit human action; export is
  a manual copy/download boundary.
- Recovery assertion: privacy confirmation blocks unsafe preparation and
  refresh returns local state to the blank sheet.
- No prompt-injection or tool-use test was run because no model/provider/tool
  boundary exists in this version.

## UX diagnostic matrix

| Diagnostic | Likely user interpretation | Mechanism under test | Evidence | Status |
|---|---|---|---|---|
| Comprehension | “This is a worksheet for reviewing a support draft.” | Literal loaded title plus PM-first hero | Fresh desktop/mobile screenshots | PASS owner-run; non-owner pending |
| AI mental model | “AI is the product being reviewed, not the assistant speaking to me.” | Subject-under-review cue; no chat, typing, glow, or agent feed | DOM and visual scan | PASS owner-run |
| Information architecture | “Collect, Verify, Decide, Ship is the order of work.” | Four-step workflow and next action | Snapshot and core trace | PASS |
| Source trust | “I can return to the original line.” | Source folios, date, excerpt, limitation | Source expansion trace | PASS |
| Recovery | “I can recover after a privacy mistake or refresh.” | Explicit block, cancel/manual review, refresh boundary | Blocked/allowed/reload snapshots | PASS |
| Mobile ability | “The next action is still reachable on a phone.” | Sticky action bar and single-column layout | 390px screenshot and width metrics | PASS owner-run |
| Dignity/control | “The product will not submit my note or invent an owner.” | Manual GitHub handoff and `Experiment owner · TBD` | Field-note output | PASS |

### Assistive-technology user profiles and AI uncertainty checks

| Profile | Likely need | Current check | Evidence / gap |
|---|---|---|---|
| Keyboard-only PM on a laptop | Skip repetitive navigation, identify current step, reach source and action controls | First Tab/Enter skip-link path plus semantic names | PASS fallback; full keyboard traversal and native focus announcement remain open |
| Low-vision PM using zoom or high contrast | Preserve title/subject distinction and reachable actions without clipping | 390px visual check and color/spacing inspection | Partial; browser zoom, forced colors, and automated contrast are unexecuted |
| Screen-reader PM reading English copy | Hear the task before decorative metadata and understand source/action labels | DOM role/name snapshot and visible text order | Partial; VoiceOver/NVDA/TalkBack output is unverified |

AI uncertainty checks for this fixture are literal rather than model-based:
the reviewed subject is named, source excerpts remain inspectable, limitations
remain visible, human actions are explicit, and `Not covered` survives export.
Because no model runs, this report deliberately does not infer hallucination,
confidence calibration, prompt injection, retrieval quality, or refusal quality.

## Focused WCAG 2.2 behavior checks

| Check | Observation | Status / remaining evidence |
|---|---|---|
| Keyboard focus order and skip link | First Tab focuses skip link; Enter moves to main | PASS fallback; native AT unverified |
| Focus not obscured | Main focus target and mobile sticky action remain visible in the executed states | PASS visual/fallback; zoom edge cases untested |
| Accessible names | Workflow, source, form, feedback, and action controls expose names | PASS fallback snapshot; screen-reader output unverified |
| Target size | Primary controls remain visually reachable at 390px | Owner-run visual PASS; automated target-size audit not run |
| Contrast / visual hierarchy | Dark ink, red action, blue provenance, and neutral paper were visually inspected | PASS visual; automated contrast tool not run |
| Error/recovery language | Privacy block states the reason and safe next action | PASS |

## Flake and QA debt register

- No flaky browser step was observed in the fresh production-preview run.
- No retry was used to turn an assertion into a pass.
- Fallback-route debt: Chrome Extension control, native assistive technology,
  real-device behavior, hosted browser evidence, and non-owner sessions remain
  open.
- No automated visual baseline exists; screenshots are fresh owner-run evidence
  and must not be described as participant validation.

## QA list

- [x] Loaded visible title puts PM work before AI subject.
- [x] Subject cue is present and subordinate.
- [x] First-run sample quote uses concrete user language.
- [x] Source inspection remains reachable.
- [x] Privacy block and manual handoff remain intact.
- [x] Refresh reset remains intact.
- [x] Desktop/mobile screenshots are fresh.
- [x] Static production preview verifier passes.
- [ ] Hosted Pages verifier for this new commit.
- [ ] Non-owner international comprehension sessions.
- [ ] Native screen-reader and real-device sign-off.

## Findings

### No blocking finding in the executed local scope

- The loaded fixture no longer leads with `AI support copilot`; it leads with
  the PM work object and keeps AI specificity in subject metadata and evidence.
- The first-run and loaded paths remain readable and source-first.
- No new container, gradient, animation, provider call, telemetry, or external
  mutation was added.
- Mobile client-width metrics are scrollbar-adjusted but show no horizontal
  overflow: `375 <= 390`.

The remaining product-learning gap is material: “feels less like AI” is still a
design hypothesis until non-owner international users say what they think this
is and whether the subject cue is enough.

## Fix Brief For Other AI

- Preserve the literal title `Support draft review: deciding what to test next`
  in the loaded worksheet unless new user evidence shows it is unclear.
- Keep `Subject under review · AI-assisted support drafting · deterministic
  sample` as context metadata, not a hero or brand identity.
- Do not restore `AI support copilot: deciding what to test next` to visible
  shell copy merely to make the product feel more AI-native.
- Do not add chat, typing, confidence meters, network marks, gradients, or
  automated GitHub actions without a separate product-truth and evidence gate.
- Rerun the source-to-brief, privacy, refresh, mobile, keyboard, static
  verifier, and hosted release cases after any copy or shell change.

### Fix acceptance and ownership handoff

| Acceptance criterion | Owner hint | Verification | Do not change |
|---|---|---|---|
| Loaded visible title names the PM work object before AI context | Product / UX | QA-072-002 plus fresh desktop/mobile screenshots | Do not restore an AI-assistant headline without new user evidence |
| Subject cue states the AI relationship without becoming a hero | Product / content | QA-072-002, DOM text oracle, visual review | Do not add chat chrome, typing, glow, or confidence UI |
| Source-to-brief flow remains source-linked and human-owned | Engineering / QA | QA-072-003 through QA-072-005 | Do not add automatic submission or GitHub mutation |
| Privacy gate blocks unsafe preparation and explains recovery | Engineering / security | QA-072-005 plus negative branch | Do not weaken the checkbox or hide the handling boundary |
| Public release proves the same behavior on canonical HTTPS | Release owner | QA-072-009 plus hosted audit | Do not call local preview or CI alone a release |

## Regression cases

| ID / priority | Traceability | Preconditions | Steps | Visible result | Hidden/state result | Evidence |
|---|---|---|---|---|---|---|
| `QA-072-001` / P1 | First-run job, scope, CTA | Fresh preview | Load at desktop and mobile widths | PM task, boundary, and sample CTA are readable | Pack is blank; no network dependency | E-072-07, E-072-08 |
| `QA-072-002` / P1 | Subject hierarchy / AI-feel hypothesis | Blank sheet | Open sample and inspect title/cue | PM work object precedes `AI-assisted support drafting`; old title absent | Loaded `FieldPack` keeps fixture id and source count | E-072-06, E-072-08 |
| `QA-072-003` / P1 | Source provenance promise | Loaded sample | Expand first source | Excerpt, source identity, date, and limitation appear | Only view state changes; original fixture text remains | E-072-09 |
| `QA-072-004` / P1 | Human review and decision ownership | Source expanded | Start review, accept first claim, go to Decide | Accepted count and review controls update; next test is editable | Decision state is local; no outbound write | E-072-09 |
| `QA-072-005` / P1 | Privacy and manual handoff | Ship / pilot note | Prepare without checkbox, then with safe synthetic fields | Unsafe branch explains block; safe branch says field note, not validation | No raw evidence/API key/token/network request leaves page | E-072-09, E-072-09 request log |
| `QA-072-006` / P1 | Recovery boundary | Prepared local note | Reload | Blank sheet returns | Local session is not persistent | E-072-09 |
| `QA-072-007` / P1 | Mobile first-run and loaded action | `390×844` | Inspect fresh and loaded states | No horizontal overflow; sticky next action remains reachable | `bodyWidth <= viewportWidth`; subject width is inside column | E-072-08, width oracle |
| `QA-072-008` / P1 | Keyboard access | Fresh preview | Tab, Enter on skip link | Main content receives focus and URL hash updates | `main#main-content` has `tabindex=-1` | Keyboard snapshot |
| `QA-072-009` / P1 | Release stale-copy protection | Local preview or canonical URL | Run static verifier and inspect assets | HTTP, locale, current copy, and stale-copy checks pass | Hashed bundle is the observed response | E-072-06; E-072-10 pending |

Each case has a precondition, action, visible oracle, hidden/state oracle, and
evidence pointer. The table is executable for the current deterministic
fixture; it is not a substitute for live-model or participant testing.

## Static gates

| Command | Result | Evidence |
|---|---|---|
| `npm test` | PASS | 4 test files, 10 tests passed |
| `npm run lint` | PASS | `tsc --noEmit` exited 0 |
| `npm run build` | PASS | Vite production bundle completed |
| `git diff --check` | PASS | No whitespace errors |
| `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` | PASS | HTTP 200, `en-US`, hashed assets 200, current copy present, stale copy absent; HTTPS is false by design for local preview |
| `python3 /Users/tommy/.codex/skills/product-qa-specialist/scripts/score_qa_plan.py docs/product/pm-signal-lab/73-less-ai-subject-specificity-local-qa-2026-08-15.md --min-score 85` | PASS after report expansion | QA plan score must be at least 85 before commit |

## Production feedback and learning gate

The current release has no analytics, session replay, support inbox, model
traces, or alerting connected. That is an intentional privacy and scope
boundary, not an observability PASS. If the product is later instrumented,
the minimum English-first pilot contract is:

| Signal | Collection boundary | Funnel / alert threshold | Owner action |
|---|---|---|---|
| First-run → sample open | Event counts only; no source text or customer data | Alert if sample-open rate is below 60% across 10+ sessions | Inspect first-run copy and CTA with a participant |
| Sample open → source expand | Event counts only | Alert if fewer than 5 of the first 10 sessions inspect a source | Recheck provenance affordance and wording |
| Review → decision brief | Event counts only; no claim text | Alert if fewer than 3 of 5 unguided sessions reach a brief | Run task debrief; do not infer model failure |
| Privacy block / recovery | Aggregate blocked and recovered counts | Any unsafe bypass is a P0 release stop; repeated confusion in 2 sessions triggers copy review | Security/product review before adding any outbound path |
| Subject paraphrase | Manual participant note, consented and anonymized | If 3 of 5 users name an assistant instead of a worksheet, revert or retest title hierarchy | Product owner runs a copy experiment |
| GitHub issue feedback | Public issue text reviewed manually; no auto-ingest | Triage weekly; no star or traffic target is treated as a quality threshold | Respond, tag, and record a concrete product decision |

No threshold is currently evaluated because the required sessions and
instrumentation do not exist. The next gate is five unguided international
sessions, three concrete field notes, and a manual synthesis of paraphrases;
stars remain an external outcome rather than a release acceptance metric.

## Not covered

- New hosted bundle, Pages deploy, canonical HTTPS verifier, and hosted browser
  trace after this change.
- Chrome Extension foreground focus and existing Chrome-profile behavior.
- VoiceOver, NVDA, TalkBack, browser zoom, reduced motion, real-device touch,
  and physical share/save.
- Non-owner PM, founder, designer, or engineer sessions; five-second
  paraphrases; SEQ; field-note triage; or user research consent.
- External model provider, model quality, retrieval, prompt behavior,
  hallucination, latency, cost, telemetry, login, persistence, GitHub API
  mutation, or production privacy review.
- GitHub stars, adoption, traffic, retention, contribution, or the 10,000-star
  outcome.

## Release hold and next gate

Local status: **PASS within scope; not a hosted release**. Do not call this
change fully released until a focused branch is pushed, CI passes, the branch
is merged into `main`, Pages deploys, the canonical HTTPS verifier passes, and
a fresh hosted browser trace confirms the same title, subject cue, mobile
behavior, and core workflow.

The next product-learning gate remains five unguided international sessions and
at least three concrete field notes. Those are not represented by this
owner-run report, and no star-growth claim is made.

## QA Memory Candidate

When a product is intentionally AI-related but must not feel like an AI shell,
name the work object first, keep AI as a subject/context qualifier, and verify
the distinction in fresh desktop/mobile browser evidence. This is a project
rule candidate, not a claim about external user preference.
