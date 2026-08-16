# PM Signal Lab — evidence-ledger quiet-colour contract — 2026-08-16

## Decision

Make the loaded worksheet read as an evidence instrument rather than an AI
showcase by reducing decorative red labels and assigning colour to real
meaning: neutral for navigation and hierarchy, blue for provenance and trust,
and red only for the next human action. Keep the source-first workflow,
local-only boundary, review gate, mobile action bar, and all behavior unchanged.

This is a visual hierarchy correction. It is intentionally small: no new
feature, provider, model call, persistence, analytics, workflow step, outreach,
merge, or deployment.

## KB Application Contract

- **Decision:** Rebalance the loaded state from repeated red editorial cues to
  a neutral evidence ledger with a blue provenance spine and one red action.
- **User/job:** An international PM needs to identify the source record, see
  what is still unreviewed, and start a human source check without decoding a
  branded AI shell.
- **Evidence boundary:** Local static checks, screenshots, browser behavior,
  keyboard, and semantic inspection can prove this visual candidate. Hosted
  Pages, Codex Chrome Extension, native screen reader speech, non-owner
  sessions, adoption, and stars remain separate evidence gates.
- **Tradeoff:** The page gives up some colour drama and editorial emphasis in
  exchange for faster recognition of what is provenance versus what is an
  action.
- **Relevant KB and design reason:**
  - `design-brain.md`: product truth and hierarchy precede decoration; the
    source record must carry the first visual weight.
  - `design-rule-hierarchy.md`: readability, operability, complete states,
    responsive behavior, and accessibility outrank taste; the colour pass must
    not remove action clarity or focus visibility.
  - `design-composition-layout.md`: use first read, second read, action, and
    relationship as the composition spine; the intended order is case → source
    → next review.
  - `design-tokens.md`: Pillow Fit's cool trust blue and restrained Altoslab
    neutrals support provenance, while the red accent should remain a small
    action signal.
  - `product-craft-anti-ai-slop-operating-system.md`: remove generic shell
    signals before adding novelty; no new visual ornament is needed.
  - `quality-evidence-operating-system.md`: local visual quality cannot be
    promoted to hosted release or growth evidence.

## Problem frame

- **User/job:** A PM opens the deterministic sample and wants to inspect source
  lines before accepting a claim or choosing a test.
- **Current friction:** Loaded labels and status text use the same warm red
  emphasis even when they describe navigation, provenance, or state. The page
  therefore spends visual attention on its shell before the source row.
- **Decision:** Does a semantic colour hierarchy make the source-first job
  easier to scan while preserving the existing action and trust boundaries?
- **Desired first read:** `Support draft review` → `Source lines to check` →
  source metadata in blue → one red `Start review` action.
- **Success metric:** In fresh 1280px and 390px local runs, the loaded state
  has one obvious red action family, visible source/provenance metadata, no
  horizontal overflow, and the existing review flow remains operable.
- **Unknown:** Non-owner comprehension, hosted behavior after deployment,
  real PM hesitation, adoption, and GitHub growth. These remain `未驗證`.

## Scope

### Must change

1. Scope the loaded-state palette so shell labels and workflow status use
   neutral ink/muted colours.
2. Use trust blue for source/provenance metadata and the source-row spine.
3. Keep red for the loaded primary review action and its small action marker.
4. Preserve text labels, contrast, visible focus, and all current selectors and
   behavior oracles.

### Must not change

- Do not change the `Collect → Verify → Decide → Ship` workflow.
- Do not change claim review rules, privacy gates, local-only behavior, or
  refresh reset behavior.
- Do not add gradients, glass, rounded card grids, animated AI states, provider
  calls, persistence, tracking, social automation, or public outreach.

## Constraints and out of scope

- One visual slice only; no component rewrite and no new package.
- CSS may change only the loaded worksheet role mapping and its responsive
  overrides; blank-state copy and existing behavior stay stable.
- Do not spend the slice on a logo refresh, a new landing page, or a marketing
  claim. The source object must remain the product surface.
- Hosted release, Chrome Extension QA, native VoiceOver, real-user research,
  adoption, and GitHub star growth are out of scope for this candidate.

## UX and visual states

| state | expected reading | action/trust requirement |
|---|---|---|
| blank first run | Existing first-run copy and sample action remain intact | No colour pass may hide the first action or skip link |
| loaded collect | Case and source record lead; provenance is blue; `Start review` is the only red primary action | Source stays expandable; refresh boundary remains visible |
| verify/decide/ship | Existing claim, experiment, export, and guard states remain unchanged | Human review gate and missing-evidence language remain explicit |
| mobile loaded | Same semantic colour roles stack without clipping | Fixed action bar remains reachable and at least 44px tall |
| focus/error/privacy | Focus, field errors, notices, and privacy denial keep their current semantics | Colour is never the only state signal |

## Implementation boundary

- **Primary surface:** `src/styles.css`, loaded-state selectors only.
- **Documentation:** update `DESIGN.md` with the colour-role decision and add
  a local QA record after verification.
- **No new dependency or component:** reuse existing tokens, markup, icons,
  labels, and event handlers.
- **Rollback:** revert the one visual commit; no data migration or external
  state is involved.

## Files/surfaces and executable steps

Step 1 through Step 5 are intentionally limited to one visual pass and its
evidence record:

1. **Modify:** append one scoped loaded-state colour-role block to
   `src/styles.css`; keep blank state, focus rings, notices, buttons, and
   workflow semantics untouched.
2. **Modify:** update `DESIGN.md` with the neutral / provenance-blue /
   action-red rule and the visual acceptance criteria.
3. **Create:** write
   `docs/product/pm-signal-lab/91-evidence-ledger-quiet-colour-local-qa-2026-08-16.md`
   with screenshots, environment, behavior matrix, exact commands, and held
   evidence gates.
4. **Test:** run the static commands and fresh local browser checks listed in
   the verification gate; capture desktop and mobile screenshots.
5. **Observe:** inspect the loaded screenshot and semantic snapshot for one
   red action family, blue source/provenance markers, no clipped text, visible
   focus, and no console/protocol errors.

## UX/AI/security gate

- **First-time/empty:** the blank worksheet still exposes the existing source
  instruction, sample action, skip link, and add-signal path.
- **Loading/error/recovery:** existing loading, notice, reset, form error, and
  privacy-denial states keep their text and recovery actions.
- **Mobile:** the 390px loaded state keeps the fixed action bar, 44px targets,
  readable source metadata, and no horizontal overflow.
- **Trust state:** colour never replaces the words `Source line`, `View
  source`, `Needs your review`, `Missing evidence`, or the local-only boundary.
- **AI gate:** no model activity, confidence, automatic validation, or external
  provider claim is introduced by the visual pass.
- **Security gate:** no new network request, secret, permission, persistence,
  tracking, or external submission path is introduced.

### Execution checklist

- [ ] Apply the scoped colour-role change and inspect the diff.
- [ ] Run static verification and the fresh desktop/mobile browser oracle.
- [ ] Review screenshots and semantic output against the trust and no-AI
  gates.
- [ ] Push only the candidate branch; keep hosted release and adoption on
  `HOLD`.

## QA and release gate

Run the following after the patch:

- `npm test -- --run`
- `npm run lint`
- `npm run build`
- `git diff --check`
- Fresh local browser run at `1280×900` and `390×844` with explicit scroll
  reset, screenshots, no-overflow check, first Tab/skip-link check, source
  disclosure check, review-gate check, mobile fixed-action check, semantic
  duplicate/dangling/unnamed-control scan, and console/protocol error capture.

Release remains `LOCAL CANDIDATE` unless all checks pass. Hosted Pages stays
`HOLD` until the explicitly authorized merge/deploy boundary is satisfied and
the canonical HTTPS bundle is freshly verified. No star, adoption, or viral
claim may be made from this slice.
