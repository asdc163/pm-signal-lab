# PM Signal Lab — quiet utility / source-first contract — 2026-08-16

## Decision

Make the loaded worksheet feel like a small tool a PM can use during a
review, not a polished AI showcase. The next slice is deliberately small:
remove the duplicated case framing, replace abstract or presentation-like
labels with direct work language, and quiet the loaded typography. Keep the
existing `Collect → Verify → Decide → Ship` workflow and all evidence and
privacy boundaries unchanged.

This is a product-craft correction, not a feature expansion. There will be no
provider, chat, persistence, analytics, new workflow step, social automation,
merge, deploy, or public outreach in this slice.

## KB Application Contract

- **Decision:** Reduce presentation chrome in the loaded state and make the
  source-review job the first visible product truth.
- **User/job:** A PM needs to inspect a source line, decide what it supports,
  and choose the smallest next test.
- **Evidence boundary:** Local browser and static checks can prove craft and
  behavior; hosted deployment, Chrome Extension coverage, native screen-reader
  speech, non-owner sessions, adoption, and stars remain separate evidence
  gates.
- **Tradeoff:** A quieter shell gives up some editorial drama in exchange for
  faster task recognition and a more credible utility surface.
- **Relevant KB and design reason:**
  - `design-brain.md` says product context and hierarchy must precede
    decoration; it applies because the source object is currently competing
    with its shell.
  - `design-rule-hierarchy.md` says readability, operability, complete states,
    responsive behavior, and accessibility outrank taste; it applies because
    the visual reduction cannot hide actions or weaken trust.
  - `design-composition-layout.md` defines first read, second read, action,
    relationship, and alignment spine; it applies because the intended spine
    is case → source → next review.
  - `product-craft-anti-ai-slop-operating-system.md` removes generic framing
    and unearned status before adding novelty; it applies because repeated
    framing is the remaining AI-showcase cue.
  - `anti-ai-writing-tells.md` favors concrete, varied, task-specific copy; it
    applies because the copy should tell a PM what to inspect next.
  - `quality-evidence-operating-system.md` separates local, hosted, browser,
    accessibility, and adoption evidence; it applies because no local polish
    claim may be promoted to a release or growth claim.

## Problem frame

- **User/job:** An international PM, founder, designer, or product engineer
  opens a short signal pack and needs to check what each source line can
  support before choosing a test.
- **Current friction:** The loaded page repeats the case title in the hero and
  the pack header, then adds several labels that describe the presentation
  rather than the work. The surface is credible but still reads like a
  designed AI/product demo.
- **Decision:** Does a simpler first reading help a user understand and begin
  the source-review job faster?
- **Desired first reading:** `Support draft review` → `Source lines to check` →
  a visible `Start review` path.
- **Success metric:** In a fresh local desktop and mobile run, a user can name
  the case, find the source record, and identify the next review action in one
  scan without an extra explanatory card or an implied model status.
- **Unknown:** Non-owner comprehension, repeat use, hosted behavior after
  deployment, and any GitHub adoption or star change. These remain
  `未驗證` until directly observed.

## Product Craft Contract

### Product truth

The product is a local-first evidence worksheet. Its real objects are source
lines, provenance, candidate claims, human review states, an experiment brief,
and a manually inspected handoff. The fixture is deterministic and fictional;
the interface must not imply that a model ran, that a claim was validated, or
that a report was submitted.

### Subject specificity

Use the concrete PM work already present in the fixture: a support draft, a
source line, a claim, a source check, and the smallest test. Avoid generic
phrases such as “unlock insights,” “move with confidence,” or “AI-powered
workflow.” A direct instruction is more useful than a promise.

### UX copy direction

- Loaded hero: the case appears once; the supporting line states the immediate
  work (`source lines to check before choosing a test`).
- Pack header: identify the section as `Source lines to check`, not another
  copy of the case title.
- Source record: state what stays together (`original line, source, date, and
  limit`) rather than using a slogan.
- Next action: say what must happen before a test is chosen; leave a gap open
  when the source is not enough.
- Context rail: use `Question`, `Rule`, and direct stage questions. Keep the
  local-only boundary and manual ownership visible.

### Visual direction

Use the selected DNA from the KB: Pillow Fit's tool/trust discipline with
Altoslab's restrained professional language. The current warm paper and ruled
source rows remain the product's own signature, but the loaded state should
borrow the utility discipline of a source-review tool:

- loaded case title: sans-led, compact, and lower weight;
- loaded section title: smaller and task-labelled;
- source heading: sans-led so the tool does not split into a marketing serif
  masthead and a separate editorial page;
- no decorative folio number in the loaded hero because the workflow already
  provides the step index;
- no gradients, glass, blobs, 3D, cursor theatre, model activity, or extra
  cards;
- keep the red action mark, blue provenance cue, dividers, and source rows
  sparse and functional.

### No-AI-feel guard

After the patch, scan the rendered loaded surface for repeated case framing,
generic status theatre, unearned confidence, abstract benefit language, and
phrases that sound generated rather than written for this PM task. If a string
does not help the user inspect a source, review a claim, choose a test, or
understand a boundary, it should not be added in this slice.

## Constraints and scope

### Constraints

English-first copy, no new dependency, no domain-state change, no provider or
external transfer, no login, no telemetry, no public outreach, no merge or
deploy, and no claim beyond current evidence. Keep the private growth plan
untracked and out of the public commit.

### Must have

- Change only the loaded-state copy and scoped typography needed for the
  source-first reading order.
- Expose the existing `Start review` action in the loaded desktop status block
  so the first viewport has a direct next action; keep the existing fixed
  mobile action as the mobile placement.
- Keep all state transitions, event names, fixture data, privacy wording,
  recovery actions, exports, and accessibility semantics intact.
- Preserve the visible source/provenance/limitation relationship and the
  mobile fixed next-action bar.
- Keep the page English-first and usable at `1280×900` and `390×844`.

### Out of scope

Anything outside this narrow copy/typography slice is out of scope, including
new product behavior, distribution, and release actions.

### Nice to have

None. This slice is intentionally complete without another feature.

### Should not build

AI provider integration, chat, confidence scores, model traces, persistence,
login, telemetry, a public API, star-gating, testimonials, social automation,
new onboarding, a new layout section, or a visual trend added for novelty.

## UX flow and states

1. **Blank:** The page tells the user to write or open one source line.
2. **Loading:** The sample opening state remains honest and recoverable.
3. **Loaded / Collect:** The case appears once, source rows enter early, and
   the next review action is visible.
4. **Verify:** The existing source check and human review actions remain the
   gate; no claim becomes validated automatically.
5. **Decide / Ship:** Existing metric, guardrail, stop rule, export, and field
   note behavior remains unchanged.
6. **Recovery:** Reset and refresh behavior remain visible; clipboard fallback
   and privacy confirmation remain testable.
7. **Mobile:** The source title and first row stay above the fixed action bar;
   no horizontal overflow or clipped control is introduced.
8. **Accessibility/trust:** The skip link, landmarks, live status, focus
   outlines, control names, disclosure targets, and local-only boundary remain
   intact.

## Files / surfaces and implementation contract

### Files

- `src/App.tsx`: replace only the loaded hero, collect header, source heading,
  next-action, and context copy identified in the copy direction.
- `src/styles.css`: append one scoped loaded-state polish block; reduce loaded
  hero/section emphasis and hide only the redundant loaded folio index.
- `DESIGN.md`: update the composition notes if the final wording changes the
  documented reading order.

No domain logic or dependency changes are required.

### File surface map

- **Create:** this contract and the fresh local QA report; no new runtime
  surface.
- **Modify:** `src/App.tsx`, `src/styles.css`, and only the affected reading
  order notes in `DESIGN.md`.
- **Test:** existing Vitest domain tests, lint, production build, diff check,
  and the local browser/semantic path.
- **Observe:** local preview DOM, visible strings, focus, ARIA targets,
  geometry, screenshots, console/protocol output, PR CI, and the canonical
  hosted bundle identity as a separate hold.

### Acceptance criteria

- The loaded reading order is case → source lines → next review.
- The loaded desktop first viewport exposes `Start review`; mobile keeps the
  fixed action bar as the persistent action placement.
- The full case title is not rendered twice in the loaded Collect view.
- No visible copy claims model activity, validation, adoption, or automatic
  submission.
- Source title, source identity, date, limitation, and review action remain
  discoverable.
- The primary action remains keyboard reachable and the fixed mobile action is
  not overlapped.
- No collapsed disclosure control points at a missing `aria-controls` target.
- Existing tests/build/lint remain green and the built asset identity changes.

## Bite-sized execution steps

### Step 1 — Lock the copy surface

Modify only the loaded hero, collect header, source heading, next-action, and
context strings named above. **Expected:** the full case title appears once,
the source section has a direct task label, and no new state transition or
event name changes.

### Step 2 — Quiet the loaded shell

Append one scoped CSS block for the loaded hero, section title, source heading,
and redundant folio index. **Expected:** the source rows do not move lower at
either target viewport, the visual hierarchy is quieter, and blank-state or
mobile fixed-action rules remain intact.

### Step 3 — Run static gates

Run `npm test -- --run`, `npm run lint`, `npm run build`, and `git diff
--check`. **Expected:** each command exits 0 and the build emits a fresh
hashed asset identity.

### Step 4 — Run behavioral and trust gates

Start a fresh local preview and execute the complete path at `1280×900` and
`390×844`. **Expected:** blank → sample → source disclosure → blocked Decide
→ reviewed claim → smallest experiment → edited metric → export → feedback
privacy block → field note → clipboard fallback → reset all pass, with no
horizontal overflow, console error, protocol error, duplicate ID, or dangling
disclosure target.

### Step 5 — Record and publish the candidate

Write the QA report with exact evidence and explicit unverified coverage, then
commit only public candidate files, push the branch, and verify PR #44 head and
CI. **Expected:** PR head matches the pushed commit and CI is green; merge,
deploy, distribution, adoption, and star-growth claims remain held.

### Definition-of-done checklist

- [ ] The five steps above have fresh current-turn evidence, not self-review
  alone.
- [ ] The private growth plan is excluded from the public commit.

## Verification gate

Run in this order after implementation:

1. `npm test -- --run`, `npm run lint`, `npm run build`, and
   `git diff --check`.
2. Start a fresh local preview and inspect the rendered DOM at
   `1280×900` and `390×844`.
3. Run the existing five-minute path: blank → sample → source disclosure →
   blocked Decide → reviewed claim → smallest experiment → edited metric →
   export → feedback privacy block → field note → clipboard fallback → reset.
4. Inspect visible strings, duplicate IDs, ARIA targets, focus, overflow,
   external resources, console/protocol errors, and fresh screenshots.
5. Push the candidate and wait for CI. Keep PR review, canonical Pages
   deployment, preferred Chrome Extension coverage, native screen-reader
   speech, non-owner sessions, and adoption evidence as separate gates.

### UX/AI/security gate

Inspect first-time, empty, loading, error, recovery, mobile, focus, trust,
permission, and secret-handling states. The surface must keep the local-only
boundary near the relevant action, must not expose raw signal content in the
feedback path, and must never imply model activity or automatic submission.
Any unavailable native screen-reader or preferred Chrome Extension evidence
must be reported as `未驗證`, not inferred from a build or a fallback browser.

### Decision rule

Keep the slice if local desktop/mobile behavior is green and the first useful
viewport reads as a source-review tool without new trust or accessibility
regressions. Revise or revert only if the quieter hierarchy hides the case,
source, action, boundary, or recovery path. Do not use visual polish as
evidence of user adoption or GitHub growth.

## Risk and rollback

- **Risk:** Less visual framing could make the case or next action harder to
  find on a narrow viewport. **Oracle:** fresh desktop/mobile screenshots and
  the first-use task trace. **Rollback:** revert the single implementation
  commit if the case, source, action, boundary, or recovery path is hidden.
- **Risk:** Copy-only changes could leave stale public documentation or hosted
  expectations. **Oracle:** `rg` string scan, README link review, and hosted
  asset/copy verifier. **Rollback:** keep the PR open and mark hosted behavior
  HOLD; do not merge or deploy to make the docs appear true.

## Applied KB references

- [`design-brain.md`](/Users/tommy/Desktop/Claude知識庫/foundations/design-brain.md):
  product truth and hierarchy precede decoration; applied by making the source
  record the entry point.
- [`design-rule-hierarchy.md`](/Users/tommy/Desktop/Claude知識庫/foundations/design-rule-hierarchy.md):
  hierarchy, readability, operability, state completeness, responsive
  behavior, and accessibility outrank taste; applied as non-negotiable QA.
- [`design-composition-layout.md`](/Users/tommy/Desktop/Claude知識庫/foundations/design-composition-layout.md):
  first read, second read, action, and alignment spine define the layout;
  applied as case → source → next review.
- [`design-project-profiles.md`](/Users/tommy/Desktop/Claude知識庫/foundations/design-project-profiles.md):
  Pillow Fit and Altoslab provide the tool/trust and restrained-professional
  calibration; the existing warm paper and ruled rows remain the local
  signature.
- [`product-craft-anti-ai-slop-operating-system.md`](/Users/tommy/Desktop/Claude知識庫/foundations/product-craft-anti-ai-slop-operating-system.md):
  remove generic framing and unearned status before adding novelty; applied by
  deleting duplicate presentation chrome instead of adding decoration.
- [`anti-ai-writing-tells.md`](/Users/tommy/Desktop/Claude知識庫/foundations/anti-ai-writing-tells.md):
  use concrete, varied, task-specific language; applied to the loaded copy
  pass and rendered-string scan.
- [`product-learning-loop.md`](/Users/tommy/Desktop/Claude知識庫/foundations/product-learning-loop.md):
  ship the smallest testable change with a decision rule and writeback;
  applied by keeping hosted/adoption claims separate from local craft proof.
- [`quality-evidence-operating-system.md`](/Users/tommy/Desktop/Claude知識庫/foundations/quality-evidence-operating-system.md):
  local, hosted, browser, accessibility, and adoption evidence are different
  layers; applied to the release report and explicit holds.
