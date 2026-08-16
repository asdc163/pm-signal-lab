# PM Signal Lab — Session Boundary Reset and Loading Guard Contract — 2026-08-16

## Decision

Make sample loading and reset a real session boundary. A sample load must close
the manual evidence form, clear form errors and stale selection state, and stop
the previous source disclosure from reopening. The empty-state sample action
must also become disabled while its existing loading state is running. This is
a small recovery/trust fix; it does not add a feature, provider, dependency,
network path, or persisted storage.

## KB Application Contract

- **Decision:** Treat `loadSample` and `resetDemo` as explicit workspace-state
  transitions instead of only changing the evidence array. Disable the sample
  action during its 260ms fixture load so duplicate clicks cannot create
  duplicate transitions.
- **User/job:** A PM should be able to abandon a partial source entry, open the
  sample, reset the worksheet, or refresh the page without seeing stale form,
  expanded-source, or claim-selection state from the previous attempt.
- **Outcome metric:** After sample load or reset, no prior form, field error,
  source disclosure, active claim, or loading-triggered duplicate action remains
  visible or selected.
- **Constraints / out of scope:** local-first; deterministic fixture;
  English-first; no persistence, provider, telemetry, upload, GitHub mutation,
  merge, deployment, native screen-reader certification, or participant claim.
- **Relevant KB:**
  - `foundations/design-rule-hierarchy.md`: state completeness, recovery,
    keyboard operation, and trust are Quality Rules; a visually tidy reset is
    not enough if hidden state leaks into the next task.
  - `foundations/product-craft-anti-ai-slop-operating-system.md`: real
    constraints and recovery are part of product craft; truthful local state is
    stronger than a polished but ambiguous preview.
  - `foundations/behavioral-ux-qa-evidence-gate.md`: test friction and mismatch
    paths, not only the happy path; bind the finding to visible state
    transitions and a reproducible evidence manifest.
  - `foundations/frontend-ux-delivery-gate.md`: loading/disabled states,
    focus, keyboard, responsive behavior, and recovery belong in the frontend
    delivery gate.
  - `foundations/design-review-workflow.md`: the next polish target is a real
    state/recovery defect, not additional decoration; verify the exact flow on
    desktop and mobile after the fix.
- **Why it applies:** A fresh local browser reproduction showed
  `form_still_visible_after_load=true` and `expanded_source_after_reset=true`.
  Those states make a user question whether the new worksheet is actually
  clean and whether their previous source is still active.
- **Assumptions:** The existing local-first boundary and 260ms deterministic
  fixture load remain the intended v0 behavior. No user data should survive a
  reset or refresh.
- **Fastest evidence:** reproduce the two failing browser paths, apply the
  minimal state reset, rerun the same red/green browser oracle, then run the
  existing full flow, edge flow, static gates, and responsive screenshots.

## Product Craft Contract

### Product truth

- **Target user:** PM, founder, product designer, or product engineer using the
  worksheet to inspect source-backed signals.
- **Job:** start a clean review session or safely recover from a partial one.
- **First read:** the visible worksheet state must match the action just taken.
- **Proof:** the sample heading, form presence, source disclosure control,
  active claim, loading state, and local boundary are directly observable.
- **Success metric:** a reset or sample load always produces a clean, coherent
  worksheet state with no stale session affordance.

### Subject specificity

- **Domain objects:** source line, evidence form, source disclosure, claim
  selection, worksheet reset, deterministic sample, local session boundary.
- **User language:** `Opening the sample worksheet`, `Sheet cleared`, `Local
  sheet · refresh clears it`.
- **Real constraint:** this preview intentionally does not persist the sheet.
- **Signature detail:** the ruled source record remains the visual proof; reset
  controls the record rather than pretending to manage an invisible agent.

### No-AI-feel guard

- Do not add a new progress animation or status panel.
- Use the existing loading state and disabled action as literal feedback.
- Clear state in the same transition that changes the worksheet, so the UI does
  not imply a hidden background process or a retained memory.

## Execution Contract

### Files/surfaces

- **Modify:** `src/App.tsx` only for this slice.
- **Create:** a reusable local browser oracle at
  `scripts/verify-session-boundary.py` using the existing Chrome fallback
  convention; it is an execution aid, not a native AT claim.
- **Document:** this contract, a focused QA report, the current evidence
  manifest, `README.md`, `DESIGN.md`, and hosted preflight pointers.
- **Test:** existing Vitest/lint/build/local verifier plus the new session
  boundary browser oracle and the existing full/edge browser paths.
- **Observe:** blank → open form → load sample while form is open; loaded →
  expand source → reset → load sample; duplicate sample action during loading;
  first Tab/focus, mobile 390×844, desktop 1440×900.

## Task sequence

### Step 1 — reproduce the stale-state paths

1. Reproduce the two stale-state paths with the browser oracle.
   **Expected:** the pre-fix oracle records the form and expanded source as
     still visible after the transitions.
### Step 2 — clear sample-loading state

2. In `loadSample`, close the form, clear its fields/errors, clear expanded
   source and active claim state before the fixture resolves; disable the hero
   sample button while `isLoading` is true.
   **Expected:** loading shows one non-repeatable action and the resolved sample
     starts clean.
### Step 3 — clear reset state

3. In `resetDemo`, clear the expanded source and active claim state alongside
   the existing evidence/experiment reset.
   **Expected:** reset followed by a new sample cannot reopen the prior source or
   point Decide at a prior claim.
### Step 4 — rerun browser evidence

4. Run the same red/green browser oracle and inspect blank, loaded, reset,
   missing-evidence, Decide, Ship, 390px, and 1440px states.
   **Expected:** both original findings are false after the fix; no new
   console/request/semantic/overflow issue appears.
### Step 5 — run static gates

5. Run static gates and update the evidence artifacts.
   **Expected:** tests, lint, build, local copy verifier, JSON manifest, and
   `git diff --check` all pass; canonical hosted state remains explicitly
   separate.

### Execution checklist

- [ ] Reproduce the stale form and source-disclosure states before the patch.
- [ ] Apply only the session-boundary and loading-guard changes described above.
- [ ] Rerun the focused browser oracle and the existing regression paths.
- [ ] Record current-turn evidence and leave external release gates separate.

## UX/AI/security gate

The product has no model/provider action in this slice. The UX gate is about
honest local state, accessible loading feedback, and safe recovery.

- Loading action is visibly disabled and cannot be double-triggered.
- Existing focus behavior remains intact: first invalid form field receives
  focus; sample load moves focus to `main`; step transitions move focus to the
  next action.
- Reset and sample load do not expose stale source, claim, or form content.
- No new `aria-controls`, live region, or status copy is added; existing
  semantic contracts remain unchanged.
- The local boundary remains visible; no claim is made that data persists.

## Verification gate

- `python3 scripts/verify-session-boundary.py` at `http://127.0.0.1:4179/`.
- `npm test -- --run`.
- `npm run lint`.
- `npm run build`.
- `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted`.
- Existing normal, friction, mismatch, keyboard, semantic, responsive, and
  screenshot checks.
- `git diff --check` and JSON evidence-manifest parse.
- Canonical HTTPS verifier remains a separate release gate and is not promoted
  by local evidence.

## Rollback

Revert the focused state-reset/loading-guard commit if sample loading loses its
visible recovery state, if form focus or source disclosure regresses, or if a
fresh worksheet unexpectedly retains user-entered data. No migration,
dependency, permission, or external side effect is involved.

## Not covered

Chrome Extension foreground control, native VoiceOver/NVDA/TalkBack output,
physical devices, real PM sessions, hosted candidate behavior, live model
quality, adoption, and GitHub-star growth remain unverified.
