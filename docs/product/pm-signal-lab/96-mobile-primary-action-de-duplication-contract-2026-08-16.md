# Mobile primary-action de-duplication — Product Craft Contract

Date: 2026-08-16
Scope: remove the repeated primary action from the mobile context note while preserving the fixed action bar and desktop context action

## Product Craft Contract

### Product Truth

- Product: a local-first PM workpaper that keeps a source line attached to the claim and smallest test it may support.
- User/job: a PM on a phone needs one obvious next action while reading the current workpaper.
- First read: the current step, the source/claim relationship, and one actionable next step.
- Proof: the fixed bottom action bar is already visible and state-specific; the context note supplies the question and rule around it.
- Outcome metric: one visible mobile primary action per workflow state, with no horizontal overflow or lost keyboard/focus path.

### Subject Specificity

- Domain objects: `Evidence`, `Claim`, `ExperimentBrief`, `DecisionMemo`, `SessionFeedback`, and `Not covered`.
- User language: `Draft smallest experiment`, `Export decision brief`, and `Copy Markdown`.
- Constraint: the product is local-first and deterministic; the mobile bar must remain the only fixed action surface and must not imply an agent is waiting for approval.
- Signature detail: source numbers and ruled rows remain the visual spine; the context note is a margin annotation, not a second toolbar.

### Creative Divergence

- Selected direction: keep the explanatory context note and remove only its duplicate mobile button. The sticky bar remains the single primary control.
- Rejected direction: remove the entire context note on mobile. That would discard the question, rule, and recent-action evidence that make the worksheet useful.
- Rejected direction: add another badge or visual treatment to distinguish the two buttons. That would preserve the duplication and add shell noise.

### Design Read

`Reading this as: a compact mobile workpaper for a PM choosing a source-backed next step, with a quiet editorial surface, medium density, low motion, and one fixed action.`

- Density: medium; explanatory context remains readable below the workpaper.
- Motion: low; no new animation.
- Surface: warm paper, ruled dividers, trust blue for provenance, red for the human action.
- Rejected tactics: gradient hero, glass, orb/blob decoration, card wall, fake agent activity, and extra status badges.

## KB Application Contract

### Relevant KB

Why it applies: each source below changes the responsive action hierarchy, the workpaper reading path, or the evidence gate for this exact mobile correction.

- `foundations/design-rule-hierarchy.md`: Quality Rules require one clear primary action and complete responsive behavior; the mobile duplicate violates action clarity. Tradeoff: the explanatory rail keeps less action chrome on mobile.
- `foundations/design-composition-layout.md`: proximity, continuity, and responsive reflow should preserve the reading path before adding containers. The fixed bar is the mobile continuation of the workflow, so the context note should not compete with it.
- `foundations/product-craft-anti-ai-slop-operating-system.md`: no-AI-feel comes from real task objects and honest state, not status widgets. Removing the duplicate makes the page read as a workpaper instead of a dashboard with two command rails.
- `foundations/aesthetic-taste-system.md`: tool quality comes from hierarchy, spacing, and restrained surfaces. The smallest polish is deletion, not another visual distinction.
- `foundations/design-review-workflow.md`: a fresh mobile behavior trace and screenshot must prove the fixed action remains reachable while the context note no longer exposes a second primary button.
- `foundations/web-design-system-playbook.md`: responsive component behavior is part of the component contract; desktop and mobile variants need explicit evidence rather than relying on a hidden overflow assumption.

## Constraints and out of scope

- Keep the existing workflow state machine, callbacks, event names, focus behavior, safe-area CSS, privacy boundary, and deterministic fixture unchanged.
- Do not remove the context question, rule, recent action, session receipt, or report link.
- Do not change desktop/tablet context actions.
- Do not add a provider, telemetry, external submission, animation, or new feature.

## Execution Contract

### Files and surfaces

- Modify: `src/App.tsx` so the context note renders an explanatory non-action on mobile while keeping its desktop action.
- Modify: `src/styles.css` only for the narrow mobile visibility/layout rule if needed.
- Modify: `DESIGN.md` with the single-primary-action responsive rule.
- Create: this contract and a fresh local QA report.
- Test: domain tests, TypeScript, production build, bundle/semantic checks.
- Observe: local browser at `390×844`, `1024×900`, and `1440×900` through `Collect`, `Verify`, `Decide`, and `Ship`.

### Task sequence

- [x] Step 1 — Change the context next-action surface for mobile only. Expected: the fixed bottom bar remains the only mobile primary button; the context note still explains the next step.
- [x] Step 2 — Keep the desktop context action unchanged. Expected: at `1024px` and `1440px`, the context rail still exposes its action where it was before.
- [x] Step 3 — Record the responsive rule in `DESIGN.md`. Expected: future changes do not reintroduce duplicate mobile primary actions.
- [x] Step 4 — Run the static and browser gates. Expected: no workflow transition, semantic label, focus, touch target, or overflow regression.

### UX/AI/security gate

- First-time/empty: the existing blank sheet and sample CTA remain unchanged.
- Loading/error/recovery: the existing notice and disabled/loading behavior remain unchanged.
- Mobile: the fixed action bar remains visible inside the safe area and is the only mobile primary action.
- Accessibility/trust: the fixed action keeps its accessible name, focus behavior, 44px target, and local-only boundary; no permission, secret, provider, or external submission surface changes.

### Verification gate

- Static: `npm test -- --run`, `npm run lint`, `npm run build`, `git diff --check` exit 0.
- Browser: load the sample, inspect each workflow step, and record visible mobile primary-action count plus desktop context-action visibility.
- Responsive: `390×844`, `1024×900`, and `1440×900`; `scrollWidth <= viewport width`.
- Semantic: no duplicate IDs, dangling `aria-controls`, unnamed visible controls, or missing fixed-bar accessible name.
- Visual: no new card, gradient, glass, orb, or agent-status decoration; context note remains legible and the bottom action remains 44px or larger.
- Evidence: save screenshots and list the unverified Chrome Extension, native AT, real-device, hosted, and human-session boundaries.

### Rollback

Revert the single implementation commit if the context explanation disappears, the desktop action changes unexpectedly, the mobile action becomes unreachable, or focus/overflow regresses. No data migration or external rollback is required.
