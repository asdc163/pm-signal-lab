# PM Signal Lab — Less-AI Margin Note and Evidence State Contract — 2026-08-16

## Decision

Remove the remaining dashboard-like status chrome from the loaded workpaper.
The source record, the workflow stepper, the human review boundary, and the
next action remain. This slice changes the reading of existing state; it does
not add a feature, provider, dependency, or new data path.

## KB Application Contract

- **Decision:** Turn the hero status panel into a literal sheet tally and turn
  the Decide readiness banner into a concrete source-check state. The page
  should read like a PM workpaper with margin notes, not an AI control room.
- **User/job:** An international PM should be able to see the source record,
  understand how much has been reviewed, and choose the next human action
  without decoding generic system-status language.
- **Outcome metric:** The first loaded viewport has one reading spine, one
  primary action, and one source-led proof surface. It no longer repeats the
  workflow step or local boundary as a status badge.
- **Constraints / out of scope:** English-first; local-first; deterministic
  fixture; no provider, telemetry, dependency, upload, GitHub mutation, merge,
  or deployment. Real PM sessions, hosted behavior, native assistive
  technology, physical devices, and adoption remain separate evidence gates.
- **Relevant KB:**
  - `foundations/design-brain.md`: follow product context → DNA → composition
    → system → screenshot/behavior QA instead of adding a trend.
  - `foundations/design-rule-hierarchy.md`: protect hierarchy, states,
    responsive behavior, accessibility, and trust before taste; use brand color
    as a signal rather than a status wall.
  - `foundations/product-craft-anti-ai-slop-operating-system.md`: increase
    subject specificity through source lines, limitations, and concrete PM
    actions; remove the generic AI readiness language rather than decorating it.
  - `foundations/aesthetic-taste-system.md`: fix hierarchy, typography,
    spacing, and surface before decoration; prefer rows, dividers, and margin
    notes to card soup.
  - `foundations/design-composition-layout.md`: keep first read, second read,
    primary action, content relationship, and alignment spine explicit; let the
    evidence rows carry the product identity.
  - `foundations/design-review-workflow.md`: inspect the real built UI at
    mobile, tablet, and desktop, then make a second polish pass with behavioral
    evidence.
  - `foundations/anti-ai-writing-tells.md`: replace abstract reassurance and
    symmetrical status phrases with literal product behavior and source-backed
    wording.
- **Why it applies:** The current screenshot shows the main source ledger is
  specific, while `Current step`, `On this page`, and `Ready for confirmation`
  read like generic application chrome. The KB says to remove repeated
  containers/statuses and put product truth in the reading path.
- **Assumptions:** Existing `Pillow Fit` trust discipline + `Altoslab`
  restraint remain the correct DNA. No new external reference, illustration,
  or high-risk visual tactic is needed.
- **Fastest evidence:** local build and copy oracle, screenshots at
  `390×844` / `1024×900` / `1440×900`, and a fresh blank → sample → source →
  Verify → Decide → Ship trace with keyboard and semantic checks.

## Product Craft Contract

### Product truth

- **Target user:** PM, founder, product designer, or product engineer reviewing
  a support-draft signal pack.
- **Job:** Keep the original source line attached while deciding what it can
  support and what smallest test should follow.
- **First read:** `Support draft review`, then the source record and one direct
  next action. The workflow stepper is orientation, not the hero message.
- **Proof:** Four deterministic source rows with source identity, date, source
  line, limitation, claim mapping, and human review actions.
- **Success metric:** A new reader can identify the next action and the local
  data boundary without mistaking a deterministic fixture for live model
  output.

### Subject specificity

- **Domain objects:** source line, source number, claim, limitation, review
  state, evidence gap, smallest test, guardrail, stop rule, decision brief.
- **User language:** `Sheet tally`, `claims reviewed`, `Source check`, `Claim
  accepted`, `Evidence gap`, and `Export decision brief`.
- **Constraints:** refresh clears the sheet; copy/download is manual; no raw
  evidence is sent to GitHub by the product.
- **Signature detail:** the blue evidence spine and ruled source rows remain
  the primary visual anchor; the hero tally behaves like a margin note.

### Creative divergence

- **Selected direction:** Keep the existing workpaper architecture, replace the
  hero's duplicated workflow/boundary status with a concrete tally, and replace
  readiness language with the state of the source check.
- **Rejected direction:** Add a new illustration, AI activity feed, gradient,
  orb, or card wall. Rejected because it adds visual average without helping the
  PM job.
- **Rejected direction:** Remove all progress and trust information. Rejected
  because the user still needs to know what has been reviewed, what stays local,
  and what action is available.

### Design read

`A quiet editorial PM workpaper for source-backed decisions, using field-note
typography, ruled rows, neutral paper surfaces, one trust-blue provenance cue,
one action-red review cue, and literal margin annotations.`

### No-AI-feel guard

- Keep AI-PM framing in the repository and fictional fixture context, not in
  the loaded headline or generic readiness labels.
- Remove repeated `Current step` / `On this page` status phrasing from the hero
  when the stepper and handling note already carry that information.
- Replace `Ready for confirmation` / `Needs validation` with a concrete source
  state tied to observable human review.
- Do not add gradients, glass, or motion; the low-risk alternative is better
  type, fewer repeated statuses, and a stronger source spine.

## Execution Contract

- **Modify:** `src/App.tsx` for the hero tally and experiment evidence-state
  wording; `src/styles.css` for the margin-note and readiness surface.
- **Document:** this contract, `DESIGN.md`, README current-evidence pointers,
  and a focused QA report after the fresh run.
- **Test:** existing Vitest suite, lint, production build, local preview copy
  oracle, and JSON evidence-manifest parse.
- **Observe:** blank, loaded Collect, source disclosure, Verify, Decide, Ship;
  mobile `390×844`, tablet `1024×900`, desktop `1440×900`; first Tab and
  label-aware semantic scan.

## Task sequence / 步驟

1. Rewrite the hero status labels as a `Sheet tally` with source-line and
   review counts, while retaining the first action and live status semantics.
   **Expected:** the hero no longer repeats the workflow step or the local
   boundary as a status badge.
2. Rewrite the experiment readiness state as `Source check` / `Evidence gap`
   language and reduce the filled status surface to a ruled margin annotation.
   **Expected:** the Decide state tells the user what evidence is true and what
   remains to inspect.
3. Update current copy-oracle strings only if required by the intentional copy
   change, then run static, domain, build, and local preview gates.
   **Expected:** no stale generic labels remain and no current required strings
   are accidentally removed.
4. Run a fresh browser trace and inspect screenshots at all target viewports.
   **Expected:** source rows remain the visual anchor, no text overflows, and
   mobile keeps one primary action.

The executable checklist is:

- [ ] Rewrite the hero tally and experiment state in `src/App.tsx`.
- [ ] Reduce duplicate status surface and preserve focus/contrast in
  `src/styles.css`.
- [ ] Update `DESIGN.md`, README, and current evidence docs.
- [ ] Run tests, lint, build, local verifier, browser trace, and screenshot
  inspection.

## UX/AI/security gate

No new secret, permission, provider call, external resource, upload, or GitHub
mutation is introduced. The trust boundary must remain visible in the existing
handling/footer surfaces, the human review gate must remain explicit, and the
new labels must not imply live model output.

## UX state coverage

- **First-time / empty:** source-first title, sample quote, manual signal path,
  and one bottom action remain visible.
- **Loading:** the sample opening state keeps its local boundary and recovery
  message.
- **Normal:** source rows, review states, experiment fields, and export remain
  unchanged.
- **Review incomplete:** the Decide state names the evidence gap and does not
  present a confident conclusion.
- **Review complete:** the Decide state names the accepted source-backed claim
  and asks the user to inspect the editable experiment details.
- **Error / recovery:** field errors, blocked export, clipboard fallback, and
  reset remain literal and actionable.
- **Mobile:** one fixed primary action; no repeated context action below 700px;
  margin note wraps without horizontal overflow.
- **Accessibility:** the live status keeps an accessible name, headings and
  buttons keep their existing labels, focus remains visible, and no
  `aria-controls` relationship changes.
- **Trust:** deterministic fixture, local-only boundary, human review gate, and
  `Not covered` output remain visible.

## Verification gate

- `npm test -- --run`
- `npm run lint`
- `npm run build`
- `git diff --check`
- `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted`
- Fresh browser screenshots and behavior trace at `390×844`, `1024×900`, and
  `1440×900`.
- Fresh first Tab, visible control names, duplicate IDs, dangling
  `aria-controls`, browser errors, request failures, and width geometry.
- Fresh canonical hosted verifier readback remains required after an approved
  merge/deploy; local evidence cannot promote it.

## Rollback

Revert this focused copy/style commit if the screenshots show weaker hierarchy,
if the source tally is ambiguous, if any current copy oracle fails, or if
keyboard/semantic/workflow behavior changes. No data migration or external side
effect is involved.

## Not covered

Chrome Extension foreground control, native VoiceOver/NVDA/TalkBack, physical
device behavior, real PM sessions, canonical hosted candidate behavior, live
model quality, adoption, and GitHub-star growth remain unverified.
