# Product QA Report — PM Signal Lab Domain-Language Pass

Date: 2026-08-15

Checked at: `2026-08-15T11:08Z` to `2026-08-15T11:13Z`

Surface: local production preview at `http://127.0.0.1:4179/`

Locale: English-first `en-US`

Change under test: replace generic task-flow AI labels with concrete `support draft`, `source`, `claim`, `smallest test`, and `decision brief` language; keep `AI-assisted support drafting` only as subject context.
Release target: `https://asdc163.github.io/pm-signal-lab/`

## QA result

The domain-language slice passed the executed local production-preview scope.
The working flow now reads as a source-review worksheet for an AI-assisted
support draft: `Check what this line supports` → source folios → human claim
review → `support-draft worksheet` → smallest test → decision brief. The bundle
contains the current concrete vocabulary and rejects the stale task strings
`support copilot`, `assistant draft`, `AI support-copilot pack`, and
`support-copilot review flow`.

The fresh headed browser trace completed first-run, sample loading, source
expansion, claim acceptance, smallest-experiment drafting, decision-brief
export, privacy-blocked and privacy-allowed feedback preparation, refresh
reset, desktop and mobile viewport checks, keyboard skip-link behavior, console
inspection, and static request inspection. Fresh screenshots were reviewed at
`1280×900` and `390×844`; no blocking defect was observed in that scope.

This is owner-run engineering and behavior evidence. It does not prove that
non-owner international PMs prefer the naming, that the product no longer
feels AI-like to the market, live-model quality, adoption, retention, traffic,
or GitHub-star growth.

## Evidence boundary and route used

- Intended QA route: Codex Chrome Extension controlling the existing Chrome
  session.
- Current tool surface: the Chrome Extension route was unavailable in this
  task, so it is not presented as completed evidence.
- Route executed: Playwright CLI fallback with a headed Chromium session named
  `fieldfolio-domain-local`, against the local Vite production preview.
- Computer Use was not used because the tested surface is a web product and
  the Playwright fallback was available.
- The fallback proves DOM state, direct interaction, screenshots, console
  output, static requests, and viewport metrics. It does not prove foreground
  focus in Tommy's existing Chrome profile, native VoiceOver/NVDA/TalkBack
  output, physical device behavior, or real-user comprehension.
- Fixture mode: deterministic fictional worksheet. No external model provider,
  login, telemetry, GitHub mutation, upload, or raw-signal transfer is
  connected.

## Product frame and QA scope

### User/job and release goal

The intended first user is an international English-speaking PM, founder,
designer, or product engineer who has one product signal and needs to move
from the exact source line to a defensible next test. The release goal is to
make the PM work object and evidence path legible before the AI subject label,
without hiding the AI-PM portfolio context.

### In scope

- English-first loaded subject hierarchy and stale-copy bundle oracle.
- Blank first-run and fictional sample worksheet states.
- Source expansion, source mapping, freshness, limitation, and human claim
  review.
- Smallest-experiment fields, decision-brief export, and manual boundaries.
- Privacy-gated field-note preparation and recovery.
- Refresh reset, desktop `1280×900`, and mobile `390×844` behavior.
- Keyboard skip link, focus recovery, accessible names, console, and static
  request boundary.
- Fresh screenshot review for first-run and loaded visual hierarchy.

### Out of scope / blocked

- Hosted Pages verification for this new commit; it requires a PR, merge, and a
  new deploy.
- Codex Chrome Extension foreground-control evidence: blocked because the
  route was unavailable.
- Native screen-reader output, VoiceOver rotor, NVDA, TalkBack, browser zoom,
  reduced-motion preference, real-device touch, and physical share/save.
- Non-owner international comprehension, preference, conversion, retention,
  adoption, traffic, referrals, and GitHub stars.
- Live model quality, retrieval, prompt injection, latency, cost, provider
  safety, or model drift; this release has no model/provider.
- Production analytics, logs, session replay, alerting, and AI evaluation
  regression; no observability backend is connected.

## TA / market context brief

| Context | Working hypothesis | Current workaround / scenario simulation | Evidence confidence |
|---|---|---|---|
| International PM or founder reviewing an AI feature | A concrete work object such as `support draft review` will land faster than a generic AI-category label | Copy a polished answer into notes, then separately hunt for its source and write an experiment | Owner-run visual and behavior evidence only; non-owner comprehension `未驗證` |
| Product designer or engineer challenging a claim | Source identity, date, limitation, and human review should be visible before a conclusion is carried forward | Treat a polished assistant-like sentence as the conclusion, then lose the evidence trail | Deterministic fixture and browser trace; live operation `未驗證` |
| English-first collaborator receiving a handoff | A portable brief should preserve limits and `Not covered` without implying validation | Share a screenshot or summary with no source mapping or stop rule | Export behavior PASS; real handoff utility `未驗證` |

Local-fit confidence is about the tested interaction only. It is not market
size, product-market fit, or a star-growth forecast. The next research gate is
five unguided international sessions with concrete paraphrases, hesitation,
trust, recovery, and retry observations.

## Behavior matrix

| Archetype / job | Starting state | Success signal | Failure signal | Trust question / recovery | Evidence |
|---|---|---|---|---|---|
| International PM / understand the product | Fresh blank sheet | Reads `Write down the line you can defend` and sees one sample action | AI persona or generic category leads the page | Does the subject cue clarify what is under review? Use the source ledger and sample CTA | PASS owner-run; non-owner comprehension unverified |
| Evidence reviewer / inspect provenance | Sample loaded, Collect | `View source` reveals source identity, date, excerpt, and limit | Claim has no traceable source or freshness | Can I challenge the line before accepting it? Collapse/reopen source row | PASS direct browser trace |
| PM / make a human review decision | Verify with three candidate claims | Accepting a claim changes reviewed/accepted counts and retains limitation | Product auto-accepts or calls the claim validated | Is the status clear? Keep as hypothesis, edit, or mark missing evidence | PASS direct browser trace |
| PM / draft a smallest test | One source-backed claim accepted | Decide exposes metric, guardrail, smallest test, decision rule, and owner | Brief looks like a completed outcome | Does the brief state what it does not prove? Edit fields or return to Verify | PASS direct browser trace |
| PM / carry a handoff forward | Decision brief ready | Markdown preview, copy, and download remain manual | Product implies GitHub or notification was changed | Is `Not covered` visible? Use text fallback or refresh | PASS direct browser trace |
| Privacy-conscious tester / leave feedback | Ship, pilot note open | Unchecked confirmation blocks; checked synthetic fields prepare local note | Private-data gate bypassed or automatic issue submitted | Does the note contain raw signals? Cancel, inspect, and manually decide | PASS blocked and allowed branches |
| Keyboard user / reach first action | Fresh page | Tab focuses skip link; Enter focuses `main#main-content` | Focus starts invisibly or is trapped | Can I recover to the main work? Use normal tab order | PASS fallback browser; native AT unverified |
| Mobile user / start the task | `390×844`, sample loaded | Sticky `Start review` remains reachable and no horizontal overflow exists | CTA clipped, content exceeds viewport, or stepper overlaps | Can I continue after reflow? Use single-column sticky action | PASS viewport metrics and direct click |

## UX diagnostic matrix

| Diagnostic | What was inspected | Likely user interpretation | UX mechanism / risk | Acceptance criterion | Result |
|---|---|---|---|---|---|
| Mental model / label scent | `Support draft review`, `Check what this line supports`, `support-draft worksheet` | “This is a PM review instrument for a draft, not a chat assistant” | Generic AI labels could make the shell feel like a demo wrapper | The task object appears before the AI subject cue | PASS owner-run; market interpretation unverified |
| Information architecture | `Source → Claim → Smallest test` reading path | “I can see where the statement came from and what happens next” | Cards or dashboard context could bury provenance | Source rows and limitation precede claim decision | PASS screenshot and snapshot |
| Next-action clarity | One primary action per state, including sticky mobile action | “I know the next thing to do” | Multiple competing CTAs could cause hesitation | First run opens sample; Collect starts review; Ship copies brief | PASS direct trace |
| Trust / uncertainty | Status labels, freshness, limitation, `Not covered`, human review | “This is a suggestion with boundaries, not validation” | Polished wording could outrun evidence | Export keeps known limits and no-adoption statement | PASS direct trace |
| Recovery / dignity | Privacy block, cancel, refresh reset, text fallback | “I can correct course without losing control” | Gate could feel punitive or state could be lost | Unsafe preparation blocks with actionable message; refresh returns blank | PASS direct trace |
| AI UX uncertainty | No typing theatre, no confidence meter, AI only in subject context | “AI is the reviewed subject, not an invisible agent” | Category labels or fake processing would add AI smell | Bundle has no stale task strings; no model requests | PASS local oracle and request log |

## Five-second comprehension probe

This was an owner-run visual probe, not a participant study. In the loaded
desktop screenshot, the first read is `Check what this line supports`, followed
by `Support draft review`, then the quiet `Subject under review · AI-assisted
support drafting · fictional worksheet` cue and the source ledger. In the
first-run desktop/mobile screenshots, the source-first job and one primary
sample action appear before any AI terminology.

The probe supports a design observation that the hierarchy is now PM-first. It
does not support a claim that an international user will understand the page
without help. No SEQ, SUS, think-aloud, time-on-task, participant paraphrase,
or preference score was collected; those are `未驗證`.

## Task-based usability protocol and behavior trace

This deterministic owner-run protocol was executed against the production
preview. It is an engineering acceptance trace, not a usability score.

1. Start from the blank first-run sheet.
2. Confirm the first-run task, local boundary, and `Open the sample worksheet`.
3. Load the sample; confirm `Support draft review`, `Subject under review`,
   `AI-assisted support drafting`, and `fictional worksheet`.
4. Expand the first source row; confirm source excerpt, identity, date, and
   original line.
5. Start review; accept the first source-backed claim; confirm `1 reviewed`
   and `1 accepted`.
6. Go to Decide; confirm the `support-draft review flow`, primary metric,
   guardrail, smallest test, decision rule, and owner field.
7. Export the decision brief; inspect Markdown, known limits, and `Not covered`.
8. Open pilot note; prepare without privacy confirmation and confirm the
   blocking message.
9. Enter synthetic feedback, check the privacy confirmation, prepare the field
   note, and confirm `This is a field note, not a validation result.` plus the
   manual GitHub review boundary.
10. Reload; confirm the sheet returns to `Blank sheet`.
11. Resize to `390×844`; confirm no horizontal overflow and click the sticky
    `Start review` action.

No repeated-click, rage-click, abandonment, or unexplained backtracking was
observed in this short owner trace. That observation is not evidence of real
user ease or retention.

## Traceable executable QA cases

| Case | Priority / traceability | Preconditions | Steps | Expected visible / hidden result | Evidence |
|---|---|---|---|---|---|
| QA-076-001 | P1 / contract: first-run and copy | Fresh preview | Load page; inspect headline, blank state, handling note | `Write down the line you can defend`, `Blank sheet`, and local boundary visible; no stale task copy | E-076-01, E-076-02 |
| QA-076-002 | P1 / contract: subject specificity | Blank → sample | Open sample; inspect loaded title and subject cue | `Support draft review` is the working title; AI appears only in subject cue; `fictional worksheet` is visible | E-076-03, E-076-04 |
| QA-076-003 | P1 / contract: source trust | Sample loaded | Expand `View source` | Source excerpt, identity, date, and original line appear; source row can be collapsed | E-076-05 |
| QA-076-004 | P1 / feature logic: human review | Source ledger loaded | Start review; accept first source-backed claim | Verify shows source mapping and limitation; counts change to `1 reviewed` / `1 accepted` | E-076-06 |
| QA-076-005 | P1 / contract: smallest test | First claim accepted | Go to Decide; inspect fields; export | `support-draft worksheet`, metric, guardrail, smallest test, rule, owner, Markdown, and `Not covered` remain visible | E-076-07 |
| QA-076-006 | P1 / privacy negative path | Pilot note open, checkbox unchecked | Select `Prepare field note` | Preparation is blocked with a private-data/token confirmation message; no note is produced | E-076-08 |
| QA-076-007 | P1 / privacy recovery | Pilot note open | Enter synthetic fields; check confirmation; prepare | Local field note says it is not a validation result; manual GitHub link only; no request is sent | E-076-09 |
| QA-076-008 | P1 / recovery | Any loaded state | Reload page | State returns to `Blank sheet`; no persisted source, claim, or feedback remains | E-076-10 |
| QA-076-009 | P1 / mobile/accessibility | Sample loaded at `390×844` | Inspect width; click sticky `Start review` | `scrollWidth=375`, no horizontal overflow; sticky action opens Verify | E-076-11, E-076-12 |
| QA-076-010 | P1 / keyboard | Fresh page | Press Tab; press Enter on skip link | First focus is `Skip to main content`; Enter changes `#main-content` and focuses `main#main-content` | E-076-13 |

The QA-076 case IDs are the `QA-001`-style executable series for this release.
Each case records the precondition, steps, expected visible result, hidden state
assertion where relevant, and evidence artifact; hidden state includes reviewed
counts, URL hash, viewport width, request boundary, and privacy-gate state.

## Feature logic map

| Promise | Role | Entity / state transition | Source of truth | Tool / AI contract | Rollback | Evidence |
|---|---|---|---|---|---|---|
| Move one line to a next test | PM / reviewer | `FieldPack`: blank → loaded | Deterministic fixture in `src/domain/fixture.ts` | No provider or model call | Refresh resets local state | E-076-01, E-076-02 |
| Preserve provenance | Evidence reviewer | `Source`: collapsed ↔ expanded | Source id, date, excerpt, limitation | No retrieval or upload | Collapse row or refresh | E-076-05 |
| Keep decision human-owned | PM | `Claim`: candidate → accepted / edited / hypothesis / missing | Human control in Verify | No automatic acceptance or confidence score | Return to Verify; refresh | E-076-06 |
| Name the smallest test | PM / collaborator | `ExperimentBrief`: draft → ready | Reviewed claim plus deterministic experiment fields | No generated model output; domain function is deterministic | Edit fields or return to Verify | E-076-07 |
| Prevent unsafe handoff | Tester / owner | `FieldNote`: blocked → prepared | Synthetic fields plus privacy checkbox | No external submission or raw evidence read | Cancel, correct, inspect, refresh | E-076-08, E-076-09 |
| Keep AI as subject context | Portfolio reader | Subject cue: absent in blank → subordinate in loaded | Literal UI copy in `src/App.tsx` | AI is not an agent or provider | Revert copy slice and rerun all gates | E-076-03, E-076-04 |

## Risk model and quality economics

| Risk | User harm / trust impact | Business impact | Data or AI uncertainty | Reversibility | Control / regression |
|---|---|---|---|---|---|
| Generic AI language makes the PM work look like an assistant wrapper | Portfolio reader misreads the product and discounts credibility | Lower qualified attention and weaker differentiation | Non-owner interpretation unknown | High; copy-only revert | P1: bundle forbidden strings, screenshot review, five-session gate |
| Source-backed claim is mistaken for validation | User may make a product decision from insufficient evidence | Direct trust damage | Deterministic sample; live model absent | High | P1: source mapping, status, limitation, `Not covered`, manual export |
| Privacy confirmation is bypassed or misunderstood | Private content or tokens could be prepared for handoff | Reputational and security damage | Low in local no-network fixture; high in future connected version | Medium | P1: unchecked block, synthetic-only test, no upload/API path |
| Mobile reflow hides the next action | Trial abandonment or misread | Lower completion | Real device and touch not tested | High | P1: `390×844`, sticky action, width oracle; real-device follow-up |
| Local QA is mistaken for adoption evidence | Public claims overstate validation | Damages Tommy's credit | Evidence layer is known | High | P1: explicit `未驗證`, hosted release gate, no stars claim |
| Hosted Pages serves stale bundle after merge | Public reader sees old language | Release confusion | Canonical state not yet tested for this slice | High | P1: post-merge HTTPS verifier and hosted browser audit |

## Deep QA toolchain matrix

| Quality layer | Tool / method | Current result | Scope decision |
|---|---|---|---|
| Repo QA surface discovery | `package.json`, `src/`, `scripts/`, `.github/workflows/` inspection | Vite + TypeScript + Vitest; local verifier and Pages/smoke workflows identified | In scope |
| Code correctness | Vitest, TypeScript compiler, Vite production build | PASS: 4 files / 10 tests; lint and build PASS | In scope |
| Static contract | `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` | PASS: HTTP 200, `en-US`, JS/CSS 200, current strings present, stale strings absent | In scope; local HTTPS intentionally false |
| E2E browser | Playwright CLI headed fallback | PASS for QA-076-001 through QA-076-010 in listed scope | Chrome Extension blocked |
| Accessibility | Keyboard skip link, semantic snapshot, accessible names, viewport | PASS for fallback checks | Native assistive technology unexecuted |
| Visual regression | Fresh screenshots at `1280×900` and `390×844`, human composition review | PASS owner-run; no pixel baseline | External comprehension pending |
| API / contract | Network request log and static asset responses | PASS: 13 requests, all static and 200; no API/model/upload/mutation | No API exists in this release |
| Performance | Vite build, static asset response | Build PASS; no performance claim | Lighthouse, throttled network, slow device out of scope |
| Privacy / security | Unchecked/checked feedback gate, static request inspection | PASS local boundary | Formal threat model, CSP, hosted headers, and connected secret handling pending |
| Supply chain | Existing lockfile/package scripts inspection | No new dependency added in this slice | Full dependency audit out of scope for copy-only change |
| AI evaluation | Deterministic fixture, source/limitation/`Not covered` assertions | PASS for uncertainty presentation | No live model or AI eval dataset exists |
| Observability | Browser console, notices, request log | PASS: 0 console errors, 0 warnings; local visible notices work | Logs, analytics, session replay, alerting not connected |
| Mutation / flake | Unit repeatability and deterministic fixture | Unit run PASS; no flake observed in one run | Mutation testing and repeated CI runs not executed |

### Test data and privacy matrix

| Data class | Fixture/test value | Allowed boundary | Evidence |
|---|---|---|---|
| Fictional source line | Demo interview/support/observation/evaluation text | Local DOM and generated local Markdown | PASS |
| Synthetic session feedback | Owner-authored non-sensitive text | Local field note after explicit checkbox | PASS |
| Customer names, private tickets, keys, tokens, confidential roadmap | None supplied | Must block / never upload | Privacy negative path PASS |
| Live user or model output | None supplied | Not available in this release | `未驗證` / out of scope |

### Flake register and AI eval dataset register

- Flake register: no browser or unit flake observed in this run; this is not a
  repeated-CI stability claim. The deterministic local preview and no-network
  boundary reduce state variance.
- AI eval dataset register: no live model, prompt set, retrieval corpus, or
  provider trace exists. The only test data is the fictional fixture; model
  quality and prompt-injection behavior are therefore `未驗證`, not passed.
- Trace assertions: current bundle strings must be present, stale task strings
  must be absent, static requests must remain 200, and the privacy block must
  remain actionable.
- Risk-based selection: P1 cases prioritize task comprehension, provenance,
  evidence overclaim, privacy, mobile action, and hosted stale-bundle risk;
  decoration and unconnected future-provider paths are lower priority.

## Mobile and accessibility evidence

At `390×844` in headed Chromium:

- `window.innerWidth=390`.
- `document.documentElement.scrollWidth=375`.
- `document.body.scrollWidth=375`.
- `subjectWidth=343` when the sample was loaded.
- `horizontalOverflow=false`.
- The sticky `Next action` region remained visible; clicking its `Start review`
  action opened Verify.
- First Tab focused the `Skip to main content` link with `href="#main-content"`.
- Enter changed the URL to `#main-content` and focused `main#main-content`.
- Snapshot accessible names were present for source, workflow, sample,
  review, export, feedback, and form controls.

Native VoiceOver/NVDA/TalkBack, touch targets on physical devices, browser
zoom, reduced motion, focus-not-obscured under all scroll positions, and
contrast sampling were not executed. They remain `未驗證`.

The fallback check covers a `390×844` mobile viewport and the sticky touch
action's direct click path. WCAG 2.2 behavior checks for target size, focus not
obscured, contrast, and reduced motion are still `未驗證` on a real device or
assistive technology profile.

## QA evidence manifest and execution evidence

| Evidence ID | Artifact / command | Layer | Status |
|---|---|---|---|
| E-076-01 | `npm test` | Unit/domain regression | PASS: 4 files, 10 tests |
| E-076-02 | `npm run lint`, `npm run build`, `git diff --check` | Type/build/diff hygiene | PASS |
| E-076-03 | `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` | Local production copy contract | PASS: current/stale string oracle |
| E-076-04 | `field-folio-domain-local-first-run-1280.png`, `field-folio-domain-local-first-run-390.png` | First-run visual | PASS owner-run review |
| E-076-05 | `fieldfolio-domain-local` snapshot after `View source` | Source behavior | PASS |
| E-076-06 | Snapshot after `Start review` and `Accept claim` | Review behavior | PASS |
| E-076-07 | Snapshot after `Export decision brief` | Decision/export behavior | PASS |
| E-076-08 | Snapshot after unchecked `Prepare field note` | Negative privacy behavior | PASS blocked |
| E-076-09 | Snapshot after safe synthetic fields + checkbox | Privacy recovery behavior | PASS local field note |
| E-076-10 | Snapshot after reload | Recovery/reset behavior | PASS `Blank sheet` |
| E-076-11 | `field-folio-domain-local-loaded-1280.png`, `field-folio-domain-local-loaded-390.png` | Loaded visual | PASS owner-run review |
| E-076-12 | Mobile eval: width, subject width, horizontal overflow; sticky click | Mobile behavior | PASS |
| E-076-13 | Keyboard Tab/Enter eval | Focus/semantic behavior | PASS fallback route |
| E-076-14 | Playwright `console` | Runtime errors/warnings | PASS: 0 / 0 |
| E-076-15 | Playwright `requests --static` | Network/privacy boundary | PASS: 13 static 200 requests |
| E-076-16 | `https://asdc163.github.io/pm-signal-lab/` | Canonical hosted release | Pending PR/merge/deploy |

## Fix brief and regression candidates

No blocking defect was found in the executed local scope, so no product fix is
being invented. The implemented copy change is the fix brief for the original
semantic defect:

- **Acceptance criteria:** the working flow uses concrete support-draft
  objects; the subject cue remains explicit; stale task strings are rejected
  by unit/bundle oracles; the source → claim → test path and privacy gates stay
  intact.
- **Owner hint:** product owner / PM Signal Lab maintainer.
- **Regression cases:** QA-076-001, QA-076-002, QA-076-005, QA-076-006,
  QA-076-008, and QA-076-009 must rerun after any copy or layout change.
- **What not to change:** do not add a chat shell, model activity theatre,
  confidence meter, telemetry, login, provider, upload, or automatic GitHub
  submission as part of this copy slice.
- **Verification:** local gates pass now; canonical hosted proof remains
  pending until the release path is executed.

## Production feedback plan

This is a plan, not active evidence. After public release, the feedback loop
should use privacy-safe logs or manually reviewed issue notes, a simple funnel
from first run → source expansion → review → brief, and a support/field-note
channel. If a future model is connected, add an AI-eval regression dataset,
source-freshness failures, refusal/abstention checks, and prompt-injection
tests. Do not enable session replay or raw-signal analytics without a separate
privacy review.

Proposed review thresholds:

- Any canonical stale-copy or failed smoke check: hold release immediately.
- Any privacy-gate bypass or unexpected external request: P0, disable the
  feedback path, and investigate before reopening.
- Two or more of five international PM sessions unable to name the source,
  uncertainty, and next test: revise copy/flow before promotion.
- No star, traffic, or adoption threshold is used as a substitute for product
  evidence.

## Release decision

Local QA decision: **PASS for the changed slice; public release HOLD until the
PR, Pages deployment, canonical HTTPS verifier, hosted smoke, and fresh hosted
browser trace are completed.**

The local evidence supports a less AI-like task vocabulary and a preserved
trust boundary. It does not support a general usability, market, model,
adoption, or GitHub-growth claim. Chrome Extension control, native assistive
technology, real-device behavior, international participant sessions, hosted
release evidence for this commit, and the 10,000-star outcome remain
`未驗證` or blocked as stated above.
