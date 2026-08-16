# PM Signal Lab — Less-AI Workpaper Second Polish Contract — 2026-08-16

## Decision

Apply one narrow visual and copy pass to the current source-first workpaper.
The domain flow remains `Collect → Verify → Decide → Ship`; this slice changes
how the existing evidence is read, not what the product claims or stores.

## KB Application Contract

- **Decision:** Make the worksheet feel like a human PM field sheet rather than
  an AI orchestration demo.
- **User/job:** An international PM should understand the source → claim → test
  path quickly, then know which action is theirs without reading a product
  explanation.
- **Outcome metric:** The first-run and loaded screens keep one visible reading
  spine, one primary action, and one memorable product detail: the ruled source
  record. No new status chrome is introduced.
- **Constraints / out of scope:** English-first; local-first; deterministic
  fixture; no provider, telemetry, dependency, upload, GitHub mutation, merge,
  or deployment. Real PM sessions, hosted behavior, native assistive
  technology, and adoption remain separate evidence gates.
- **Relevant KB:**
  - `foundations/design-brain.md`: follow product context → DNA → composition →
    system → screenshot/behavior QA, so this pass starts from the workpaper job
    instead of adding a trend.
  - `foundations/design-rule-hierarchy.md`: protect readability, trust,
    responsive behavior, and accessibility first; use restrained brand color
    and a project-specific signature second.
  - `foundations/product-craft-anti-ai-slop-operating-system.md`: increase
    subject specificity through source lines, limitations, and concrete PM
    actions; remove generic AI reassurance instead of hiding it with polish.
  - `foundations/aesthetic-taste-system.md`: fix hierarchy, typography,
    spacing, and surface before decoration; prefer rows and dividers to card
    soup.
  - `foundations/design-composition-layout.md`: keep first read, second read,
    primary action, and alignment spine explicit; let the evidence rows carry
    the visual identity.
  - `foundations/design-review-workflow.md`: verify the real built UI at mobile,
    tablet, and desktop, then run a second polish pass rather than trusting the
    CSS diff.
  - `foundations/anti-ai-writing-tells.md`: replace abstract reassurance with
    literal product behavior and uneven, human-sounding copy.
- **Why it applies:** These files all point to the same constrained decision:
  the source row is the product proof, so visual polish must improve its
  reading path and trust rather than introduce a new AI identity.
- **Assumptions:** The existing `Pillow Fit` trust discipline plus `Altoslab`
  restraint remains the correct DNA; no new reference asset or high-risk visual
  tactic is needed.
- **Fastest evidence:** production build, local copy oracle, fresh screenshots
  at 390×844 / 1024×900 / 1440×900, keyboard/semantic scan, and the existing
  Collect → Verify → Decide → Ship trace.

## Product Craft Contract

### Product truth

- **Target user:** PM, founder, product designer, or product engineer reviewing
  a support-draft signal pack.
- **Job:** Keep the original source line attached while deciding what it can
  support and what smallest test should follow.
- **First read:** `Start with a source line` on an empty sheet; `Support draft
  review` and the current source count when loaded.
- **Proof:** Realistic source rows with source identity, date, original wording,
  limitation, review state, and a deterministic decision brief.
- **Success metric:** A new reader can identify the next action and the local
  data boundary without mistaking the fixture for live model output.

### Subject specificity

- **Domain objects:** source line, claim, limitation, review state, smallest
  test, guardrail, stop rule, decision brief.
- **User language:** `Check the claim against the line`, `Keep as hypothesis`,
  `Mark missing evidence`, and `Export decision brief`.
- **Constraints:** refresh clears the sheet; copy/download is manual; no raw
  evidence is sent to GitHub by the product.
- **Signature detail:** the blue evidence spine and ruled source rows.

### Creative divergence

- **Direct direction:** strip visible orchestration language and make the source
  record arrive sooner. Selected because it improves the PM job without adding
  a new feature.
- **Rejected direction:** gradient hero, floating AI orb, chat wrapper, or
  animated “thinking” state. Rejected because it would make the deterministic
  fixture look like a model product and would add no evidence.
- **Rejected direction:** a dashboard of more cards and metrics. Rejected
  because the product is a single decision path, not a monitoring console.

### Design read

`A quiet editorial workpaper for PM evidence review, using field-note typography,
ruled rows, neutral paper surfaces, one trust-blue provenance cue, and one
action-red review cue.`

### No-AI-feel guard

- Keep AI-PM framing in the repository and fixture context, not in the loaded
  headline or reassurance labels.
- Replace `You make the call`, `You still own the stop rule`, and `Portable
  Markdown` with literal operational labels.
- Use the display face for the work statement so the loaded state shares the
  human editorial signature of the empty state.
- Do not add gradients, glass, or motion; the low-risk alternative is better
  type, fewer disclaimers, and a stronger source spine.

## Execution Contract

- **Modify:** `src/App.tsx` for visible product language only; `src/styles.css`
  for the loaded work-statement type and margin-note hierarchy.
- **Document:** this contract, `DESIGN.md`, and the focused QA report after the
  fresh run.
- **Test:** existing Vitest suite, lint, production build, local preview copy
  oracle, and manifest validation.
- **Observe:** blank, loaded Collect, source disclosure, Verify, Decide, Ship;
  mobile 390×844, tablet 1024×900, desktop 1440×900; keyboard first Tab and
  label-aware semantic scan.

## Task sequence / 步驟

1. Replace the visible trust labels with literal PM-workpaper language.
   **Expected:** no new AI/status jargon appears in the primary path; the
   local boundary and human review gate remain explicit.
2. Apply the display type to the loaded work statement and keep section titles
   sans-led. **Expected:** loaded and empty states share one editorial voice
   without changing layout width or action ownership.
3. Run the existing static, domain, and build gates. **Expected:** all pass and
   the local copy oracle finds current strings while rejecting stale copy.
4. Run a fresh browser trace and inspect screenshots. **Expected:** source rows
   remain the visual anchor, no text overflows at the three target viewports,
   and the primary action remains singular on mobile.

The executable checklist is:

- [ ] Change the visible labels and boundary copy in `src/App.tsx`.
- [ ] Apply the loaded work-statement type and margin-note hierarchy in
  `src/styles.css`.
- [ ] Run the listed static gates and record their exit status.
- [ ] Inspect fresh screenshots and the full workflow trace at all target
  viewports.

## UX/AI/security gate

This is a user-facing gate. No new secret, permission, provider call, or
external mutation is introduced; the trust boundary must remain visible.

## UX state coverage

- **First-time / empty:** source-first title, sample quote, manual signal path,
  and one bottom action remain visible.
- **Loading:** the sample opening state keeps its local boundary and recovery
  message.
- **Normal:** source rows, review states, experiment fields, and export remain
  unchanged.
- **Error / recovery:** field errors, blocked export, clipboard fallback, and
  reset remain literal and actionable.
- **Mobile:** one fixed primary action; no repeated context action below 700px.
- **Accessibility:** visible labels, focus recovery, keyboard skip link, source
  disclosure semantics, role/name checks, and no color-only status meaning.
- **Trust:** deterministic fixture, local-only boundary, human review gate, and
  `Not covered` output remain visible.

## Verification gate

- `npm test -- --run`
- `npm run lint`
- `npm run build`
- `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted`
- `python3 /Users/tommy/.codex/skills/product-qa-specialist/scripts/validate_qa_evidence_manifest.py docs/product/pm-signal-lab/qa-evidence-manifest-2026-08-15.json`
- Fresh browser screenshots and behavior trace at 390×844, 1024×900, and
  1440×900.
- Fresh canonical hosted verification remains required after an approved
  merge/deploy; local evidence cannot promote it.

## Rollback

Revert this one commit if the fresh screenshots show weaker hierarchy, if any
current copy oracle fails, or if keyboard/semantic behavior changes. No data
migration or external side effect is involved.

## Not covered

Chrome Extension foreground control, native VoiceOver/NVDA/TalkBack, physical
device behavior, real PM sessions, hosted candidate behavior, live model
quality, adoption, and GitHub-star growth remain unverified.
