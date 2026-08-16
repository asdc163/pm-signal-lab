# PM Signal Lab — operational worksheet reframe contract — 2026-08-16

## Decision

Make the loaded PM Signal Lab case read as a small operational work surface:
the source line and the next human decision should arrive before the visual
framing. Keep the existing source → claim → smallest test workflow and trust
boundary. Do not add an AI provider, chat, persistence, telemetry, a new
workflow step, or a distribution action.

This is a narrow product-craft correction, not a visual rebrand. The current
candidate is locally functional, but its large serif masthead, repeated
workpaper labels, and status framing make a useful PM tool feel more like an
AI/product showcase than something a PM would use during a real review.

## KB Application Contract

- **Decision:** Reduce ornamental framing in the loaded state and make the
  working object, source check, and next action the visual entry point.
- **User/job:** An international PM, founder, designer, or product engineer
  opens a short source note and needs to decide what it can support before
  spending time on a test.
- **Outcome metric:** In a fresh local browser run, a first-time user can name
  the current case, locate the first source row, and reach `Start review`
  without a new explanatory card or a misleading AI/status claim. The
  release remains `PASS local / HOLD hosted` until the candidate is explicitly
  merged, deployed, and rechecked.
- **Constraints / out of scope:** English-first copy; no new feature; no
  provider, login, upload, persistence, telemetry, auto-submission, public
  outreach, merge, or deploy; preserve all existing workflow gates, privacy
  wording, keyboard semantics, and mobile fixed-action behavior.
- **Relevant KB:**
  - [`foundations/design-brain.md`](/Users/tommy/Desktop/Claude知識庫/foundations/design-brain.md):
    product context and rule hierarchy must precede decoration. It applies
    because the tool's job is being displaced by its shell; the tradeoff is a
    quieter first impression with less ornamental differentiation.
  - [`foundations/product-craft-anti-ai-slop-operating-system.md`](/Users/tommy/Desktop/Claude知識庫/foundations/product-craft-anti-ai-slop-operating-system.md):
    remove generic framing, unearned status language, and repeated card
    shells before adding visual novelty. It applies because the current
    labels and hero hierarchy resemble a polished AI demo; the tradeoff is
    that fewer labels must carry more precise meaning.
  - [`foundations/design-composition-layout.md`](/Users/tommy/Desktop/Claude知識庫/foundations/design-composition-layout.md):
    establish a clear entry point and use hierarchy to order attention. It
    applies because the source row is the first real PM object; the tradeoff
    is reducing the masthead's visual drama to improve task speed.
  - [`foundations/design-rule-hierarchy.md`](/Users/tommy/Desktop/Claude知識庫/foundations/design-rule-hierarchy.md):
    hierarchy, readability, operability, complete states, responsive behavior,
    and accessibility outrank taste. It applies because this change must not
    trade the editorial look for hidden actions or weaker focus treatment.
  - [`foundations/product-learning-loop.md`](/Users/tommy/Desktop/Claude知識庫/foundations/product-learning-loop.md):
    ship the smallest change with an evidence mix, guardrails, a decision
    rule, and a writeback. It applies because this slice should teach whether
    a simpler work surface improves comprehension before any growth push.
  - [`foundations/quality-evidence-operating-system.md`](/Users/tommy/Desktop/Claude知識庫/foundations/quality-evidence-operating-system.md):
    separate local, hosted, browser, accessibility, and adoption evidence. It
    applies because local craft evidence cannot be reported as hosted release
    or user adoption.
- **Assumptions:** The existing deterministic fixture and workflow are the
  right v0 capability; the problem is first-screen hierarchy, not missing
  functionality. Non-owner session evidence is not provided in this turn.
- **Fastest evidence:** Fresh desktop and mobile local browser runs after the
  change, plus static tests, semantic inspection, keyboard traversal, and a
  five-minute task trace. Then push the candidate and verify CI; do not call
  hosted release complete until the explicit merge/deploy gate is approved.

## Product Craft Contract

### Problem frame

- **Decision to make:** Does the loaded case feel like a PM work surface first,
  rather than an AI showcase or editorial landing page?
- **Current workaround:** The user reads around a large masthead, status block,
  subject labels, and context rail before reaching the source rows.
- **Desired outcome:** The case title, source line, provenance, and next review
  action are legible in one scan; trust and local-only boundaries remain
  explicit.
- **Success signal:** In the local browser trace, the first source title and
  `Start review` remain in the first useful viewport at desktop and mobile
  without horizontal overflow, hidden controls, or new copy explaining the
  product.
- **Unknowns:** Whether a non-owner PM understands the tool without guidance,
  whether the new hierarchy increases return use, and whether it changes
  qualified GitHub stars. These require real sessions and public metrics and
  remain unverified.

### Product scope

- **Must have:**
  - Make the loaded hero/status labels literal and compact.
  - Reduce loaded hero typography and vertical spacing so the source surface
    enters earlier.
  - Rename only the repeated labels that currently sound like presentation
    chrome (`Sheet status`, `Margin note`, `Source pack active`, `Next mark`)
    to direct work language.
  - Preserve `Source lines`, source provenance, review gate, local boundary,
    visible focus, and mobile action bar; keep both source and claim disclosure
    controls free of dangling `aria-controls` targets when collapsed.
- **Nice to have:** None in this slice.
- **Should not build:** AI chat, model activity, confidence score, provider
  integration, new persistence, analytics dashboard, social automation,
  star-gating, testimonials, gradients, glass panels, decorative illustrations,
  or another landing-page section.

### UX flow and states

1. **First run:** Blank worksheet shows the source-line job and local boundary;
   the sample remains available.
2. **Load:** The sample opens with a direct case title and compact review state.
3. **Collect:** The source rows are the primary work surface; provenance can be
   expanded without a dangling ARIA relationship.
4. **Verify:** Premature `Decide` remains blocked until a claim is reviewed.
5. **Decide / Ship:** Existing experiment, export, feedback privacy, and local
   Markdown paths remain unchanged.
6. **Recovery:** Refresh clears the local sheet; reset and clipboard fallbacks
   remain available.
7. **Mobile:** The first source title stays above the fixed next-action bar;
   no horizontal scroll or clipped control is introduced.
8. **Accessibility/trust:** First Tab reaches the skip link; control focus is
   visible; landmarks and live status remain named; the product never implies
   that a generated claim is validated or that a report was submitted.

## Execution Contract

### Files and surfaces

- **Modify:**
  - `src/App.tsx`: literal labels only in the hero/status/context/next-action
    copy; preserve event names and data flow.
  - `src/styles.css`: add one final, scoped operational-worksheet polish block
    for the loaded hero, status, context labels, and next-action surface;
    preserve the existing mobile source-first rules.
- **Create:** This contract and the QA report produced after fresh evidence.
- **Test:** `src/domain/*.test.ts` through the existing Vitest command; no new
  test dependency or fixture is required because behavior/data contracts are
  unchanged.
- **Observe:** Local Vite preview in isolated Chrome at `1280×900` and
  `390×844`; inspect DOM/ARIA, focus, geometry, resource boundary, and the
  full existing task path.

### Task sequence

The numbered task sequence below is the bite-sized execution path; each item
has an observable oracle and can be rolled back with the single implementation
commit.

Task 1 — audit and contract: complete the current-evidence and KB contract
checks before touching product code.

Task 2 — copy slice: change only the named user-visible labels and verify the
old framing labels are absent from the loaded DOM.

Task 3 — visual slice: add only the scoped loaded-state CSS block and compare
desktop/mobile geometry against the prior candidate.

Task 4 — verification and handoff: run static/browser/semantic gates, record
evidence, then push the candidate while leaving release actions held.

- [x] Audit current branch, PR #44, canonical hosted asset identity, public
  metadata, 1,042-reference corpus boundary, and existing local QA.
  **Expected:** current candidate is on the branch/PR, hosted Pages still
  serves the prior bundle, and no adoption or star-growth claim is made.
- [x] Read the selected KB routes and compile this contract.
  **Expected:** each applied principle names a file, design reason, tradeoff,
  scope, oracle, and rollback.
- [ ] Patch `src/App.tsx` labels without changing state transitions or event
  names. **Expected:** rendered English says `Review state`, `Work note`,
  `Working set`, `Record`, and `Next step`; old framing labels are absent from
  the loaded surface while source/provenance copy remains.
- [ ] Add the scoped loaded-state CSS block at the end of `src/styles.css`.
  **Expected:** the loaded masthead is visibly quieter, the first source row
  moves no lower than the current candidate, and no focus or mobile rule is
  overridden accidentally.
- [ ] Run `npm test -- --run`, `npm run lint`, `npm run build`, and `git diff --check`.
  **Expected:** all commands exit 0; build emits a fresh asset identity.
- [ ] Run the local preview/browser trace at both required viewports.
  **Expected:** blank → sample → source expansion → blocked Decide → reviewed
  claim → smallest experiment → edited metric → export → feedback privacy
  block → field note → clipboard fallback → refresh reset all pass.
- [ ] Inspect visible text, unnamed controls, duplicate IDs, dangling source
  and claim `aria-controls`, focus outlines, horizontal overflow, external resources,
  console/protocol errors, and the two screenshots.
  **Expected:** zero new semantic/runtime regressions; any unavailable
  Chrome Extension or native screen-reader coverage is explicitly marked
  unverified.
- [ ] Update README/DESIGN only if the final surface wording or screenshot
  evidence changes public truth. **Expected:** no stale claim that hosted Pages
  serves the candidate and no claim of adoption, virality, or 10,000 stars.
- [ ] Commit and push only the public candidate files on the current branch,
  excluding the private growth plan. **Expected:** PR #44 head matches the
  pushed commit and CI is green; merge/deploy/distribution remain held.

### Acceptance criteria

- The product's first loaded reading is `case → source lines → next review`,
  not a decorative or AI-status narrative.
- No user-visible copy claims model output, validation, adoption, or automatic
  submission.
- The existing local-only boundary appears in the loaded and blank states.
- `Start review` remains reachable by keyboard and the mobile fixed action is
  not overlapped or pushed below the first source title.
- Collapsed source and claim disclosure buttons do not reference missing DOM
  targets; expanded controls reference the visible detail region.
- Existing workflow guards and export/feedback privacy behavior remain intact.
- Local static and browser evidence is fresh; hosted release remains a
  separate gate.

## Learning packet

- **Decision:** Keep, revise, or revert the operational worksheet hierarchy
  before inviting non-owner testers.
- **User job:** Find a defensible source line and the next review action quickly.
- **Learning question:** Does less framing make the source-to-decision path
  easier to understand without lowering trust or discoverability?
- **Smallest ship/test:** One loaded-state copy/spacing slice; no new feature.
- **Evidence plan:** current-turn static checks + desktop/mobile browser trace
  + semantic/focus/geometry inspection + five unguided international sessions
  after hosted release authorization.
- **Guardrails:** no new horizontal overflow, clipped action, missing ARIA
  target, privacy ambiguity, or premature decision bypass; no automated public
  outreach or GitHub mutation.
- **Decision rule:** Keep the slice only if all local gates pass and at least
  three of five unguided sessions independently locate the source row and next
  action without a maintainer explanation, with no trust/privacy blocker. Any
  contradiction or severe accessibility issue means hold and revise.
- **Writeback:** Record the result in the next dated QA/pilot report and update
  the operating system's gate; do not turn a session report into a star or PMF
  claim.

## QA and release contract

### UX/user-facing gate

The first-time, empty, loading, error, recovery, mobile, accessibility, and
trust states must remain observable and safe. The AI gate is explicit: no
model/provider is introduced, no status implies validation or certainty, and
the product must continue to show the source and human review boundary. The
security gate is explicit: no private signal leaves the tab, no secret or
permission is requested, and no public action is automated.

| Layer | Required evidence | Current status before this slice |
| --- | --- | --- |
| Static | tests, typecheck/lint, build, diff check | PASS, rerun after change |
| Local browser | desktop/mobile full task trace | PASS for prior candidate, rerun |
| Semantics | names, IDs, ARIA targets, focus | PASS for prior candidate, rerun |
| Hosted canonical | HTTPS asset identity and browser flow | HOLD; Pages serves prior bundle |
| Preferred Chrome route | Codex Chrome Extension state trace | HOLD; route unavailable this turn |
| Native assistive technology | VoiceOver/NVDA/TalkBack speech | 未驗證 |
| Non-owner learning | five unguided international sessions | 未驗證 |
| Adoption | qualified stars, visits, clones, repeats, referrals | 未驗證 |

## Rollback

Revert the single implementation commit containing the scoped `App.tsx` copy
and CSS polish block. The contract and QA report are evidence artifacts and
can remain for audit. No migration, dependency, provider, account,
permission, telemetry, or external-content cleanup is required.

## Release boundary

This candidate may be pushed to the existing draft PR after fresh verification.
It may not be merged, deployed to canonical Pages, posted publicly, or used as
participant/adoption evidence without the explicit release approval already
required for PR #44.
