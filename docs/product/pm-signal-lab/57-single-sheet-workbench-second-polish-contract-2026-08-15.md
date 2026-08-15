# Single-sheet workbench second-polish contract

Date: 2026-08-15
Surface: PM Signal Lab hosted demo and responsive web UI
Audience: international PMs, founders, product designers, and product engineers

## Product Craft Contract

- Product truth: the product moves a person through `Evidence → Claim → ExperimentBrief → DecisionMemo`; the proof is the source line, source identity, date, limitation, review action, decision rule, and explicit local boundary.
- Subject specificity: this is a source-linked PM worksheet, not a generic AI assistant. Its native language is a source ledger, claim review, smallest test, and human-owned stop rule.
- User/job: an international product practitioner has one messy signal and needs to leave with a source-backed next test that another person can challenge.
- First read: this is a working instrument, the user is in `Collect`, and the next action is to open a local sample worksheet or add one source line.
- Success metric: a first-time visitor can identify the task and primary action in five seconds; a loaded user can reach the source ledger and review docket without reading dashboard summaries.
- Creative divergence:
  - Direct instrument: compact workpaper header and source rows first. Selected because the job is operational, repeated, and evidence-heavy.
  - Editorial field note: retain folios, ruled separators, serif task headings, and one rust signal line. Selected as the product's own memory detail.
  - AI command center: rejected because status walls, chat-shaped surfaces, generated activity, and decorative model chrome would imply capability the deterministic fixture does not have.
- Design direction: a single-sheet workbench with a workflow rail and a quiet desk summary after the workpaper. It should feel like a PM's daily review sheet, not a marketing hero or an AI SaaS dashboard.
- No-AI-feel guard:
  - Replace abstract first-run positioning with direct work language: `Put one signal on the desk`.
  - Remove the duplicated `Decision path` from the hero because the workflow rail already carries it.
  - Label the fixture as `Sample signal` and state that it is not external research.
  - Keep actual counts, source rows, limitations, review actions, and boundaries visible.
  - Avoid gradient, glass, orb, bento, fake activity, model-thinking animation, and unsupported quality claims.
- UX state model:
  - First-time / empty: show the direct task, an honest sample fixture, `Open sample worksheet`, and `Add your own signal`.
  - Loading: preserve the current local boundary and state what is being prepared.
  - Loaded: show source rows and the real review docket before the desk summary.
  - Error / recovery: preserve existing invalid-input, reset, backtracking, and refresh recovery behavior.
  - Mobile: keep the four-step top navigation and sticky current action; the desk summary moves below the workpaper.
  - Accessibility: preserve semantic headings, landmarks, focus order, visible focus, 44px controls, and decorative mark semantics.
  - Trust: do not present fixture text as research evidence; do not imply a provider, model run, adoption, or automatic GitHub action.
- Evidence gate: local unit tests, typecheck, build, fresh Chrome screenshots and visible flows at desktop/390px, empty/loading/loaded/error-recovery/keyboard checks, then canonical hosted verification after Pages deployment. Real-user comprehension, screen-reader output, and adoption remain separate evidence layers.

## KB Application Contract

- Decision: change the information architecture from a three-column dashboard read to a single-sheet workpaper read without weakening the actual decision workflow.
- Outcome metric: five-second task comprehension and lower repeated-summary load; the first viewport should expose the work verb and primary action, while loaded work should expose the source ledger before secondary context.
- Constraints / out of scope: no provider integration, no model behavior, no backend, no telemetry, no auth, no new data model, no automatic public activity, no fabricated research, no new visual trend system, and no claim of user adoption.
- Relevant KB:
  - `foundations/product-craft-anti-ai-slop-operating-system.md`: product truth and subject specificity are stronger anti-AI signals than decoration; design reason: this changes the first read, fixture labeling, and evidence order.
  - `foundations/aesthetic-taste-system.md`: operational tools should be dense but calm, using rows and separators instead of card soup; design reason: this moves the context summary out of the primary reading path.
  - `foundations/design-composition-layout.md`: layout must follow information relationships and a clear alignment spine; design reason: the source ledger becomes the main spine and the duplicate hero route is removed.
  - `foundations/design-rule-hierarchy.md`: hierarchy, states, responsive behavior, accessibility, and trust outrank taste; design reason: the redesign keeps all core controls and recovery paths.
  - `foundations/design-review-workflow.md`: a second polish pass must inspect real desktop/mobile screens, hierarchy, states, and behavior; design reason: the execution contract requires fresh browser evidence.
  - `foundations/product-messaging-copy-operating-system.md`: UI copy needs a concrete job, action, proof, and boundary; design reason: `Open the sample worksheet` and `Sample signal` are more literal than `Load sample data` and an unlabeled quote.
  - `foundations/anti-ai-writing-tells.md`: remove abstract, symmetrical, marketing-shaped phrasing from the visible task header; design reason: a short action sentence and explicit fixture limitation are easier to say and verify.
- Assumptions: the current hosted demo is provider-free and local-first; the existing `Evidence`, `Claim`, `ExperimentBrief`, and `DecisionMemo` behavior remains the source of truth.
- Fastest evidence: fresh Chrome screenshot comparison at desktop and 390px, DOM hierarchy/overflow check, direct click path from empty to loaded to review, invalid-input recovery, keyboard focus sequence, and the canonical hosted verifier.

## Execution Contract

- Files/surfaces:
  - Modify: `src/App.tsx` header/empty/context copy and structure; `src/styles.css` single-sheet composition and responsive summary; `README.md` first-run wording; `DESIGN.md` composition and style direction; `scripts/verify-hosted-demo.mjs` current/stale copy oracle.
  - Create: this contract and a release audit after hosted verification.
  - Test: existing Vitest suite, TypeScript lint, Vite build, `git diff --check`, hosted verifier.
  - Observe: canonical hosted empty, loading, loaded, source expansion, review, invalid input, recovery, mobile, and keyboard behavior through the Codex Chrome Extension.
- Task sequence:
  - [ ] Task 1 — Replace the empty/loaded hero copy with direct work language and add a small worksheet folio label in `src/App.tsx`.
    Expected: empty reads `Put one signal on the desk`; loaded reads `Check what this line supports`; the primary action reads `Open the sample worksheet`; no abstract route sentence is duplicated in the hero.
  - [ ] Task 2 — Label the visible fixture `Sample signal` and add the literal limitation that it is local fixture content, not external research.
    Expected: a first-time visitor cannot mistake the quote for a customer or market evidence claim.
  - [ ] Task 3 — Reduce `DecisionContext` to a bottom desk summary with actual counts, one question, one rule, the current next action, and the existing session trail.
    Expected: the first desktop viewport is not occupied by a right-side dashboard summary; the context still exists below the workpaper and remains available on mobile.
  - [ ] Task 4 — Change `workspace` from the persistent right-rail grid to a single-sheet desktop composition and update the responsive overrides.
    Expected: main content keeps a readable max width, source rows align to one spine, no horizontal overflow appears at 390px, and all controls retain their existing hit areas.
  - [ ] Task 5 — Run `npm test -- --run`, `npm run lint`, `npm run build`, and `git diff --check` before browser QA.
    Expected: all commands exit 0; the build produces a deployable Vite bundle.
  - [ ] Task 6 — Run fresh Chrome behavior cases for first-time comprehension, empty action, loading, loaded source ledger, source expansion, review navigation, invalid custom signal recovery, reset, backtracking, 390px mobile, and keyboard focus.
    Expected: each case has an observable success signal; no app console error or horizontal overflow is observed; the new hierarchy is visible in screenshots.
  - [ ] Task 7 — Run `HOSTED_URL=https://asdc163.github.io/pm-signal-lab/ npm run verify:hosted` after Pages deployment.
    Expected: canonical HTTPS returns 200, `en-US` is present, current copy is present, stale hero/fixture/dashboard copy is absent, and hashed assets return 200.
  - [ ] Task 8 — Record the release evidence and remaining unverified layers in a dated audit under `docs/product/pm-signal-lab/`.
    Expected: the audit names the browser route, viewport, behavior matrix, screenshots, tests, hosted verifier, and not-covered real-user/screen-reader/adoption scope.
- Verification gate: no visual release claim until the local gates, fresh Chrome behavior matrix, and canonical hosted verifier all pass. Native screen-reader parity, five unguided international sessions, adoption, traffic, and stars remain `未驗證` unless separately evidenced.
- Rollback: revert the single UI/documentation commit or PR; no data migration, provider, permission, or external side-effect rollback is required.

## Behavior matrix

| user archetype | starting state | job | success signal | failure signal | recovery expectation |
| --- | --- | --- | --- | --- | --- |
| International PM, first visit | Empty hosted demo | Understand the instrument and start one review | Can explain the task and click `Open the sample worksheet` within five seconds | Reads the page as a marketing landing or AI demo | Direct task header, honest sample label, and visible action |
| Source reviewer | Loaded sample | Trace one line before reviewing a claim | Opens one source row and sees source/date/limitation | Treats summary copy as evidence or loses the source | Source row remains the primary work surface and can collapse again |
| Low-trust PM | Loaded sample | Decide whether to believe the output | Finds the local boundary, limitation, and human review controls | Assumes a model or external research ran | Explicit fixture boundary and `You make the call` / review actions |
| Mobile PM | 390×844 loaded sample | Reach the current action with a thumb | Sticky current action is visible and no horizontal scroll occurs | CTA is clipped or context pushes the task away | Bottom action and top workflow stepper remain available |
| Keyboard user | Fresh empty or loaded page | Navigate the workflow without a pointer | Focus order reaches skip link, navigation, current action, and content controls | Decorative mark becomes focusable or focus disappears | Preserve semantics and visible focus; mark stays `aria-hidden` |

## Not covered by this contract

- Native screen-reader output and assistive technology parity.
- Five unguided international user sessions and qualitative comprehension evidence.
- GitHub traffic, retention, adoption, organic distribution, or star growth.
- Model quality, provider latency/cost, or AI hallucination behavior; the current demo has no provider.

## UX/AI/security gate

- First-time and empty: the direct task and `Open the sample worksheet` remain visible without a maintainer explanation.
- Loading: the current preparation state remains honest and does not simulate model thinking or hidden work.
- Error and recovery: invalid input, cancel, reset, refresh, and backtracking keep their existing recovery paths and do not blame the user.
- Mobile: the 390×844 flow keeps readable type, 44px targets, the top workflow stepper, and the sticky current action without horizontal overflow.
- Accessibility and trust: headings, landmarks, focus order, visible focus, `aria-hidden` decorative mark, local fixture boundary, human review, and limitations remain intact.
- Security and permissions: this redesign adds no provider, secret, permission, telemetry, external request, GitHub mutation, or automatic submission path.
