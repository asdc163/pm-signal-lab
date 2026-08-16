# Mobile action context and craft pass — Product Craft Contract

Date: 2026-08-16
Scope: one-state-consistency fix for the existing mobile action strip

## Product Craft Contract

### Product Truth

- Product: a local-first PM workpaper that keeps a source line attached to the claim and smallest test it may support.
- User/job: a PM reviewing a small signal pack needs to know the next defensible action without decoding system state.
- First read: the page names the current PM work and shows one next action.
- Proof: the visible source rows, source identity, limitation, review mark, and step-specific action already exist in the candidate.
- Outcome metric: the action strip's helper copy and button label describe the same next step in every workflow state.

### Subject Specificity

- Domain objects: `Evidence`, `Claim`, `ExperimentBrief`, `DecisionMemo`, `SessionFeedback`, and `Not covered`.
- User language: `Start with a source line`, `Start review`, `Draft smallest experiment`, `Export decision brief`, and `Copy Markdown`.
- Constraint: the product is local-first and deterministic; it must not imply hidden model activity or external submission.
- Signature detail: a source number and ruled evidence spine carry the visual identity. The action strip should reinforce the workpaper's current step, not add a new visual motif.

### Creative Divergence

Three possible directions were considered:

1. **Decorative direction:** add another badge or status colour to the mobile bar. Rejected because it would increase shell noise without improving the decision.
2. **Structural direction:** move the mobile action bar into each step's content section. Rejected because it would change the existing responsive and focus behavior for a one-line mismatch.
3. **Contextual direction:** keep the fixed bar, but give its helper line literal copy for the current state. Selected because it repairs comprehension with one deterministic function and no workflow change.

### Design Read

`Reading this as: a compact professional workpaper for a PM making a source-backed next-step decision, with a quiet editorial surface, medium density, low motion, and one action strip that behaves like a margin note.`

- Density: medium on first run, medium-high once sources are loaded.
- Motion: low; no new animation.
- Surface: warm paper, ruled dividers, trust blue for provenance, red only for the human action.
- Rejected tactics: gradient hero, glass panels, orb/blob decoration, card wall, fake agent activity, and extra status badges.

## Constraints and out of scope

- Keep the existing workflow, callbacks, event names, focus behavior, safe-area layout, privacy boundary, and deterministic fixture unchanged.
- Do not add a new feature, provider, telemetry, external submission, gradient, glass surface, orb, card wall, or autonomous agent behavior.
- Do not treat this local candidate as a hosted release or adoption result.

## KB Application Contract

### Relevant KB and why it applies

- `foundations/design-brain.md`: composition must begin with first read, second read, primary action, and responsive reflow. It applies because the mobile action strip is part of the first-read action path; the tradeoff is keeping the strip visually quiet instead of using extra decoration to make it noticeable.
- `foundations/design-rule-hierarchy.md`: Quality Rules require one clear primary action and complete responsive state; Taste Guardrails reject template chrome. It applies because the helper copy currently conflicts with the primary action; the fix must preserve the existing touch target and workflow.
- `foundations/product-craft-anti-ai-slop-operating-system.md`: no-AI-feel comes from subject specificity and honest UX state, not a ban list. It applies because literal step copy makes the PM task visible and avoids an abstract system label.
- `foundations/aesthetic-taste-system.md`: tool beauty comes from hierarchy, spacing, surface restraint, and real product state. It applies because the action strip should read as a useful margin note, not a decorative status widget.
- `foundations/design-composition-layout.md`: proximity and continuity are preferred over extra containers; the action label and helper must form one readable unit. It applies because the fixed bar is a compact continuation of the workflow index.
- `foundations/design-review-workflow.md`: second polish must inspect the real desktop and mobile UI plus behavior, not only CSS. It applies because the mismatch was found in a fresh mobile screenshot and must be rechecked across state transitions.
- `foundations/web-design-system-playbook.md`: component states need a content rule and accessible name, not only a visual variant. It applies because the mobile action region must stay 44px-operable and its accessible label must match the visible action.
- `foundations/anti-ai-writing-tells.md`: replace abstraction with concrete action and avoid stock system language. It applies to the new helper copy; the tradeoff is that each state gets a short literal phrase instead of one reusable generic sentence.

## Execution Contract

### Files and surfaces

- Modify: `src/App.tsx` mobile action strip and a small state-to-copy helper.
- Modify: `DESIGN.md` to record the contextual action-strip rule.
- Create: this contract and its local QA report.
- Test: `src/domain` regression suite, TypeScript lint, production build, bundle scan.
- Observe: local Vite production preview in isolated Chrome at `1440×900`, `1024×900`, `390×844`, and workflow states `Collect`, `Verify`, `Decide`, `Ship`.

### Task sequence

- [x] Step 1 — Replace the mobile helper copy with a deterministic mapping for blank, Collect, Verify, Decide-without-a-draft, Decide-with-a-draft, and Ship. Expected: the helper sentence describes the action button in the same state.
- [x] Step 2 — Add an accessible region label containing the visible next-action label. Expected: the mobile action region exposes `Next action: <button label>` to assistive technology.
- [x] Step 3 — Keep the existing action callback, button label, disabled state, focus behavior, and safe-area CSS unchanged. Expected: no workflow state transition or event name changes.
- [x] Step 4 — Add the rule to `DESIGN.md`. Expected: future UI changes retain state-specific action context without adding dashboard chrome.

### UX / AI / security gate

- First-time/empty: `Start with a source line` remains the helper; the button still opens the sample worksheet.
- Loaded Collect: helper says `Read the source lines` when claims exist, or `Add a source line` when the pack has no claims.
- Verify: helper says `Draft the smallest test`; no claim is silently accepted.
- Decide without a draft: helper and button say `Draft the smallest test`.
- Decide with a draft: helper and button say `Export the decision brief`; no export or GitHub submission is automatic before that state.
- Ship: helper says `Inspect before copying`; no external submission is automatic.
- Loading/error/recovery: the existing disabled/loading and notice behavior remains unchanged.
- Mobile: fixed bar remains inside the safe area, with a 44px action target and no horizontal overflow.
- Accessibility: region name, button name, keyboard focus, contrast, and reduced-motion behavior remain valid.
- Trust/privacy: no provider, upload, telemetry, raw-signal export, or external mutation is introduced.

### Verification gate

- Static: `npm test -- --run`, `npm run lint`, `npm run build`, `git diff --check` all exit 0.
- Browser: visibly load the sample, move through Collect → Verify → Decide → Ship, and record helper copy plus button label for each state.
- Responsive: inspect fresh screenshots at `1440×900`, `1024×900`, and `390×844`; measure `scrollWidth <= viewport width`.
- Semantic: no duplicate IDs, dangling `aria-controls`, or unnamed visible controls; the action region has the expected accessible name.
- Visual: compare blank and loaded mobile screenshots against the current quiet workpaper direction; no added gradient, glass, orb, card wall, or agent telemetry.
- Evidence: save a QA report with exact environment, states, screenshots, commands, and not-covered gates. This remains local candidate evidence, not hosted or adoption evidence.

### Rollback

Revert the single implementation commit if the action strip becomes ambiguous, loses its 44px target, breaks focus handoff, or changes a workflow transition. No data migration or external state rollback is required.
