# Direct Workbench No-AI-Feel Contract

Date: 2026-08-15
Surface: PM Signal Lab hosted demo
Audience: international PMs, founders, product designers, and product engineers
Locale: English-first `en-US`

## Decision

Make the workbench read like a real product field sheet, not a generic SaaS
dashboard. Keep the evidence spine, folios, source limits, and one next action.
Reduce repeated status chrome around them so the source line is the strongest
visual object on the page.

This is a focused visual and copy refinement. It does not add a model provider,
login, persistence, telemetry, GitHub mutation, or a new workflow step.

## Decision record

- Decision: remove one layer of repeated status framing and strengthen the
  source-ledger reading surface.
- User/job: an international PM should identify the source line, its limit, and
  the next review action without decoding a dashboard shell.
- Outcome metric: in a fresh five-second read, the first action and the source
  artifact are both identifiable; this is a design oracle, not a user-study
  result.
- Success metric: empty, loaded, and expanded-source browser states keep the
  source → claim → smallest-test path clear with no hidden primary action.

## Constraints

- The hosted demo is static, local-first, deterministic, and English-first.
- No backend, model provider, API key, telemetry, login, or automatic GitHub
  write may be introduced by this pass.
- Existing public copy, source provenance, privacy boundary, keyboard behavior,
  responsive breakpoints, and historical audit trail are protected.
- Historical release documents are evidence records; they are not rewritten to
  make older screenshots or wording look current.

## Relevant KB and why it applies

| Relevant KB | Why it applies / design reason |
|---|---|
| `foundations/product-craft-anti-ai-slop-operating-system.md` | AI smell is a product-truth and evidence problem as much as a visual problem; the source line and honest limits must do the identity work. |
| `foundations/aesthetic-taste-system.md` | The product needs a deliberate visual signature and a controlled surface system, not more decoration or trend effects. |
| `foundations/design-composition-layout.md` | The first read, primary action, alignment spine, and density should follow `Source → Claim → Smallest test` before component styling. |
| `foundations/product-messaging-copy-operating-system.md` | English-first CTA and boundary copy must describe the concrete next action and stay aligned with the public pilot. |
| `foundations/anti-ai-writing-tells.md` | Removing stock framing and capability language protects Tommy's credit when the repo is shared internationally. |

These sources are applied as a product-craft decision, not as a license to
copy an external repository's visual style. The current evidence spine and
English-first boundary remain the local product truth.

## Product Craft Contract

### Product truth

PM Signal Lab lets a person keep a product observation attached to its source,
review a candidate claim, and write the smallest test that could change the next
decision. The hosted demo uses a deterministic local fixture. It is not a model
quality benchmark and it does not infer adoption, confidence, or market truth.

### Problem frame

- User/job: a PM needs to move from a messy product signal to a defensible next
  step without losing the original line or its limitation.
- Current workaround: copy a quote into notes, summarize it elsewhere, and
  reconstruct the source when someone challenges the conclusion.
- Desired outcome: the source, candidate claim, review decision, and smallest
  test remain visible in one traceable path.
- Current success signal: an unguided visitor can identify the source line,
  open the sample worksheet, review a claim, and reach an exportable brief.
- Not yet known: whether five target PMs understand the workflow without help,
  whether they would bring their own de-identified evidence, and whether the
  public repository earns durable attention.

### Subject specificity

The design must use these real domain objects as its visual material:

- source folio, source type, source identity, observed date, and original line;
- candidate claim and its source mapping;
- limitation or missing-evidence state;
- metric, guardrail, smallest test, decision rule, and owner;
- a local session receipt and a manually reviewed field note.

No decorative AI object may carry the visual identity. The product earns its
identity from what a reviewer can trace and challenge.

### Creative divergence options considered

1. **AI command centre:** dark panels, assistant activity, confidence meters,
   and an animated synthesis feed. Rejected: it would claim model activity that
   the hosted demo does not perform and would turn uncertainty into theatre.
2. **Generic evidence dashboard:** repeated cards, KPI tiles, gradients, and a
   three-column control-room layout. Rejected: it would make the domain look
   interchangeable with analytics or project-management software.
3. **Field sheet / direct workbench:** a quiet paper surface, one annotated
   source spine, ruled rows, a compact review docket, and a single next action.
   Selected: it makes provenance and limits visible while matching the actual
   deterministic, local-first product boundary.

### Composition brief

- First read: the current work statement and the one action that starts the
  worksheet.
- Second read: one source line, its folio, source identity, date, and limit.
- Primary action: `Open the sample worksheet` on first run; then the current
  step action such as `Start review`.
- Content relationship: `Source → Claim → Smallest test`; rows and ruled
  annotations carry the relationship before containers do.
- Alignment spine: masthead → work statement → source folio → review docket.
- Density: calm on first run; compact but readable once the source pack is
  loaded. Do not add a persistent metrics dashboard.
- Layout archetype: single-sheet workbench with a lower desk note, not a
  dashboard of equal-weight panels.
- Responsive reflow: workflow becomes a top stepper; the source ledger remains
  first; the desk note follows the workpaper; the current action remains easy to
  reach at 390px.
- Signature detail: one rust action line and one teal provenance line. They
  point to real product states; they are not background decoration.
- What not to use: gradients, glass, blobs, orbs, bento tiles, fake model
  activity, unsupported metrics, excessive pill badges, or another status panel
  that repeats an existing count.

### Current diagnosis

The current release is visually disciplined and has no obvious model-chat
surface. It still asks the visitor to parse too many labels before reaching the
actual source object: the topbar status, hero status, workflow rail, loaded
`Source lines` heading, `Source ledger` heading, and lower `Desk note` all carry
parts of the same state. The next pass will keep the information but lower the
frame weight of repeated labels, tighten the loaded source header, and give the
source ledger one uninterrupted reading surface.

## KB Application Contract

The implementation applies the selected knowledge-base guidance as follows:

- product truth before styling: the local fixture, source limit, and human
  review boundary remain visible at the point of action;
- composition before decoration: the first read, primary CTA, evidence spine,
  and responsive reflow are defined before CSS changes;
- anti-AI copy: replace abstract framing with concrete source, review, and
  recovery language; do not use `AI-powered`, `intelligent`, `seamless`,
  `magic`, or capability claims that the demo cannot prove;
- taste and restraint: use borders, folios, type hierarchy, and one signal line
  instead of additional visual effects;
- review loop: inspect an empty first run and a loaded source ledger in a fresh
  browser context before treating the refinement as useful.

## Product scope

### Must have

- Reduce duplicate visual chrome in the first-run and loaded collect states.
- Preserve all existing accessible names, state announcements, controls, and
  source/claim behavior.
- Keep English-first copy aligned across the UI, README, and public pilot issue.
- Keep the privacy and local-only boundary explicit.

### Nice to have

- Make the loaded workpaper feel more like a continuous source ledger than a
  collection of separate sections.
- Improve the visual distinction between a source line and a review action
  without adding color-only meaning.

### Out of scope

- external model calls, provider adapters, login, storage, telemetry, GitHub
  automation, star prompts, or social automation;
- a new navigation model or a second visual theme;
- claims about user adoption, conversion, or GitHub stars.

## UX states and behavior matrix

| State | User job | Expected read | Recovery / trust requirement |
|---|---|---|---|
| Empty first run | Understand what to do | One source line starts the sheet | Sample fixture is labelled local-only; own-signal path remains visible |
| Loading | Wait without guessing | The sample is being prepared | No fake progress or model activity; original workspace remains safe |
| Loaded collect | Inspect evidence | Folios and original lines lead the page | Source identity, date, and limitation stay discoverable |
| Expanded source | Challenge a line | Detail opens in place | Toggle has a meaningful accessible name and preserves context |
| Verify | Decide whether a claim survives | Claim is visibly a draft until reviewed | Accept, edit, hypothesis, and missing-evidence states remain explicit |
| Decide | Name a smallest test | Metric, guardrail, and stop rule are concrete | Human owns the decision and can go back |
| Ship | Carry the brief forward | Export is an artifact, not a completion claim | `Not covered` and known limits remain in the Markdown |
| Feedback | Leave a field note | The note is inspectable before sharing | Privacy gate excludes raw signal content and GitHub submission is manual |
| Mobile / keyboard | Complete the same job | No hidden primary action or horizontal overflow | Focus remains visible; touch targets stay usable |

## Execution Contract

### Intended implementation boundary

- `src/App.tsx`: only change visible labels or grouping where they reduce
  repeated framing without changing domain behavior.
- `src/styles.css`: lower shell/status weight, tighten the loaded source header,
  and preserve the ruled evidence spine and responsive breakpoints.
- `README.md` and `docs/operations/public-pilot-issue-body.md`: keep public
  first-run instructions aligned with the actual CTA.
- `DESIGN.md`: link this contract after implementation so the next person can
  see the direction and evidence boundary.

### Files / surfaces map

| Operation | Surface | Evidence to inspect |
|---|---|---|
| Create: | `docs/product/pm-signal-lab/60-direct-workbench-no-ai-feel-contract-2026-08-15.md` | Contract score is at least 85/100 and the intended diff is bounded. |
| Modify: | `src/App.tsx` | Visible labels and grouping remain aligned with the actual local workflow. |
| Modify: | `src/styles.css` | Desktop, tablet, mobile, focus, and reduced-motion rules preserve the evidence spine. |
| Modify: | `README.md`, `docs/operations/public-pilot-issue-body.md`, `DESIGN.md` | Public instructions, design reference, and hosted CTA agree. |
| Test: | `src/**/*`, repository scripts, and the fresh Chrome Extension tab | Tests, typecheck, build, visual states, DOM accessibility oracles, and hosted verifier pass. |
| Observe: | `https://asdc163.github.io/pm-signal-lab/` after merge | Canonical HTTPS returns the current English-first bundle and visible CTA. |

### Bite-sized execution steps

- Step 1: define the visual diff and its evidence oracle.
- [ ] Re-read the current empty and loaded screenshots against the composition
  brief; record the repeated chrome to remove before touching code.
- Step 2: implement the bounded workbench refinement.
- [ ] Reduce the loaded header's duplicate framing while preserving the pack
  title, count, add-signal action, and source-ledger heading semantics.
- [ ] Tune the empty and loaded CSS hierarchy so the source quote, folios, and
  next action carry more visual weight than shell labels.
- [ ] Align visible CTA copy in the README and public pilot handoff; preserve
  historical wording in historical audit documents.
- [ ] Run `npm test -- --run`, `npm run lint`, `npm run build`, and `git diff --check`.
- [ ] Run a fresh Chrome Extension audit at desktop, 768px tablet, and 390px
  mobile widths, including empty, loading, loaded, expanded source, and reset.
- [ ] Inspect fresh screenshots and DOM signals; record any unexecuted native
  assistive-technology or adoption work as `未驗證`.
- [ ] Publish the bounded change through a PR, wait for CI and Pages deploy,
  then run `npm run verify:hosted` against the canonical URL.

## UX/AI/security gate

- First-time and empty: the first action is concrete and the local fixture is
  labelled; no fake assistant voice or model status appears.
- Loading and error: the interface names the state, avoids simulated thinking,
  and keeps a recovery path that does not discard the original workspace.
- Recovery and mobile: reset, backtracking, sticky actions, and text expansion
  remain usable at 390px without relying on hover.
- Trust and permission: source/date/limitation, local-only boundary, manual
  GitHub handoff, and privacy gate remain visible near the relevant action.
- AI gate: deterministic fixture output is never described as model output; no
  capability, confidence, or adoption claim may be added without evidence.
- Security gate: no secret, API key, raw signal, login, external transfer, or
  new permission boundary is introduced by a visual or copy change.

### Risk and rollback

- Risk: reducing labels can hide the current step or make the loaded source
  count ambiguous. Guardrail: retain semantic headings, visible counts, and the
  workflow stepper; compare empty and loaded DOM snapshots before release.
- Risk: CSS-only changes can regress tablet or mobile primary-action reach.
  Guardrail: fresh Chrome screenshots at 1280px, 768px, and 390px plus a
  keyboard focus pass.
- Risk: public copy can drift from the deployed CTA. Guardrail: run the hosted
  copy verifier and inspect the pilot issue source after the PR merge.
- Rollback: revert the single PR merge commit, rerun the repository gate, and
  redeploy `main`; no data migration or external user state is changed.

### Acceptance criteria

- A fresh empty screen has one obvious first action and one visible own-signal
  path; no generic AI framing appears.
- A loaded screen presents the source ledger as the main artifact, with no
  duplicate heading that changes the meaning of the same count.
- The rust accent and teal provenance marks remain tied to action and evidence;
  no new decorative color field is introduced.
- Existing tests, lint, build, hosted verifier, and browser behavior remain
  green.
- At 390px, 768px, and desktop widths, the current action, source rows, and
  recovery controls remain visible and usable.
- Any coverage not directly executed in this turn is labelled `未驗證` in the
  handoff and release audit.

### QA and release gates

1. Run the repository test, typecheck/lint, build, and diff checks.
2. Use a fresh Chrome Extension tab to inspect empty, loading, loaded, expanded
   source, and one recovery path at desktop, tablet, and mobile widths.
3. Record DOM evidence for the primary action, source rows, accessible labels,
   and absence of stale visible English copy.
4. Publish only through a reviewable PR; deploy from `main` after merge.
5. Re-run the canonical HTTPS hosted verifier and inspect the deployed page
   after the new commit.
6. Keep real PM sessions, native VoiceOver/NVDA/TalkBack, physical-device share
   behavior, and adoption outcomes explicitly outside the verified claim until
   those activities happen.

## Evidence boundary

This contract is a design and implementation decision, not proof of usability,
market fit, AI quality, GitHub reach, or the 10,000-star goal. Current proof
must remain separated into local code gates, browser behavior, canonical hosted
behavior, and external user/adoption evidence.
