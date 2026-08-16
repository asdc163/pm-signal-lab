# PM Signal Lab — literal worksheet language contract — 2026-08-16

## Decision

Replace five shell labels that describe an abstract system state with literal
worksheet language that tells a PM what is in front of them. The surface should
read as a local workpaper: a source review, a current step, a source set, a
sheet note, and a recent action. Keep all workflow behavior, evidence objects,
privacy boundaries, and review rules unchanged.

This is a small copy-and-semantics slice. It does not add a feature, model,
provider, persistence layer, analytics, integration, public post, merge, or
deployment.

## KB Application Contract

- **Decision:** Use literal object and action language in the visible shell so
  the product does not imply an invisible assistant or system activity feed.
- **User/job:** An international PM should understand the current worksheet,
  source review, next step, and local boundary without decoding product
  framework language.
- **Evidence boundary:** Local browser, static, semantic, and hosted-copy
  checks can prove this slice. Hosted deployment, Chrome Extension control,
  native screen-reader speech, non-owner sessions, adoption, and stars remain
  separate evidence gates.
- **Tradeoff:** The copy becomes less branded and less dramatic, but the first
  read becomes closer to an object a PM can actually use in a review.
- **Relevant KB and design reason:**
  - `anti-ai-writing-tells.md`: replace abstraction with concrete objects,
    break repeated label formulas, and remove system-sounding vocabulary.
  - `product-craft-anti-ai-slop-operating-system.md`: remove generic shell
    signals before adding novelty; the product should not simulate an agent.
  - `design-brain.md`: product truth and user job outrank presentation chrome;
    each label must earn its place by naming a real object or action.
  - `design-rule-hierarchy.md`: copy changes cannot weaken readability,
    accessibility, complete states, or trust boundaries.
  - `design-composition-layout.md`: the reading spine remains case → source →
    next review; labels should support that order rather than compete with it.
  - `quality-evidence-operating-system.md`: local copy proof and hosted bundle
    proof are different layers and must be recorded separately.

## Problem frame

- **User/job:** A PM opens the worksheet and needs to know what is being
  reviewed, what step is current, and where the last action was recorded.
- **Current friction:** `Working sheet`, `Current work`, `Review state`,
  `Working set`, and `Session trace` sound like framework or agent telemetry
  rather than the visible source-review objects.
- **Decision:** Does literal worksheet language reduce system theatre without
  removing status, orientation, or the local-only boundary?
- **Desired first read:** `Local worksheet` → `Source review` → `Current step`
  → source record → `Start review`.
- **Success metric:** In fresh desktop and mobile runs, all five replacement
  labels are visible in the correct state, the old labels are absent from the
  current bundle, and the existing action/state oracles still pass.
- **Unknown:** Non-owner comprehension, hosted behavior after deployment,
  screen-reader speech, adoption, and stars. These remain `未驗證`.

## Scope

### Must change

1. Replace only the five visible shell labels and their matching accessible
   names/copy where they describe the same object.
2. Update the read-only hosted verifier's required and forbidden strings to
   match the current candidate.
3. Update `DESIGN.md` and the QA record so the naming decision is durable.

### Must not change

- Do not change workflow step IDs, event names, domain data, review states,
  claim rules, export rules, or privacy gates.
- Do not change layout, colors, typography, dependencies, network behavior,
  persistence, telemetry, or external actions.
- Do not claim that new copy proves usability, adoption, or AI quality.

## Constraints and out of scope

- This pass is limited to visible labels, matching accessible names, the
  hosted current-copy verifier, and the related evidence documentation.
- A wording change must not trigger a component rewrite, visual redesign, or
  new product capability.
- Real-user recruitment, public posting, profile-main merge, PR #44 merge,
  Pages deployment, Chrome Extension control, and adoption measurement are out
  of scope for this copy candidate.

## Language mapping

| old shell language | new literal language | reason |
|---|---|---|
| `Working sheet` | `Local worksheet` | states the actual storage/boundary behavior |
| `Current work` | `Source review` | names the job instead of a vague system state |
| `Review state` | `Current step` | tells the user where they are in the workflow |
| `Working set` | `Source set` | names the visible object and its active/empty state |
| `Session trace` | `Recent action` | records what happened without implying agent telemetry |

Supporting context changes are literal variants only: `Work note` becomes
`Sheet note`, `Record` becomes `In this sheet`, and the empty trace sentence
states that the visit stays on the page. No event or data schema changes.

## Files/surfaces and executable steps

Step 1 through Step 5 are intentionally limited to one copy/semantics pass:

1. **Modify:** update the five visible labels and matching aria labels in
   `src/App.tsx`; preserve all handlers and state transitions.
2. **Modify:** update required/forbidden current-copy strings in
   `scripts/verify-hosted-demo.mjs`.
3. **Modify:** update the naming rule and current evidence links in
   `DESIGN.md`.
4. **Create:** write
   `docs/product/pm-signal-lab/93-literal-worksheet-language-local-qa-2026-08-16.md`
   after the fresh run.
5. **Test/Observe:** run static checks, direct bundle scans, desktop/mobile
   browser behavior, semantic checks, and screenshot review.

### Execution checklist

- [ ] Apply only the literal language mapping and inspect the diff.
- [ ] Run the direct current/stale-copy verifier against the fresh build.
- [ ] Operate the source, review-gate, mobile, keyboard, and semantic paths.
- [ ] Push the candidate branch; keep hosted release and adoption on `HOLD`.

## UX/AI/security gate

- **First-time/empty:** `Local worksheet`, the source-line instruction, sample
  action, and skip link remain understandable and visible.
- **Loading/error/recovery:** loading copy, notices, form errors, reset, and
  privacy denial retain their current recovery actions.
- **Mobile:** replacement labels wrap without clipping at `390×844`; the fixed
  action remains reachable and all targets retain their current sizes.
- **Trust state:** source line, View source, human review, missing evidence,
  and local-only copy remain explicit; no colour or wording becomes the sole
  status signal.
- **AI gate:** no model activity, assistant voice, confidence, automatic
  validation, or hidden-work implication is introduced.
- **Security gate:** no new network request, secret, permission, persistence,
  tracking, or external submission path is introduced.

## Verification and rollback

Run `npm test -- --run`, `npm run lint`, `npm run build`, `git diff --check`,
`npm run verify:hosted`, and the fresh local browser matrix. The local
candidate can pass while the canonical hosted verifier remains `HOLD` if Pages
still serves an older bundle. Rollback is a single commit revert; no data or
external state changes are involved.
