# PM Signal Lab — mobile source-first reading contract

Status: implemented and verified for the current local candidate on Draft PR
#44. The Chrome Extension, canonical hosted, native AT, real-device, and
participant gates remain separate. This is a bounded mobile composition
correction after a current-candidate headless Chrome check. It adds no
provider, model, dependency, telemetry, account permission, or external write.

## Decision

On a narrow screen, bring the first original source line into the reading path
before the fixed action bar can cover it. Keep the pack title, fictional review
subject, source ownership, and `Add signal` action available, but remove
vertical space that repeats the same context in the mobile layout.

## Problem frame

- Decision: should the loaded mobile collect view spend its first viewport on
  the source row rather than a tall pack description and stacked secondary
  action?
- User/job: an English-speaking PM opens a small source pack on a phone and
  needs to trace the original line before deciding whether a claim is ready.
- Workaround today: scroll past the pack header before the source ledger
  appears; the fixed `Start review` action also occupies the lower viewport.
- Outcome: the source row becomes the next readable object after the pack
  context, without losing the local-only and fictional-subject boundaries.
- Success metric: at `390×844`, the source heading and the first row's title or
  original-line preview are above the fixed mobile action bar after loading the
  sample; no horizontal overflow or overlap is introduced.
- Current evidence: current-candidate fallback geometry put the pack header at
  `y=487.875..815.125`, the source heading at `y=837.125..960`, and the first
  row at `y=976..1252.55`; the row was not visible in the first viewport.
- Unknown: Chrome Extension capture, native assistive technology output,
  real-device touch, non-owner comprehension, hosted behavior, and adoption.

## KB application contract

### Relevant KB

- `foundations/design-brain.md`: start with the PM's source-tracing job and
  use composition to decide what appears first.
- `foundations/design-rule-hierarchy.md`: no overlap, responsive reflow,
  hierarchy, and accessibility outrank the editorial treatment.
- `foundations/product-craft-anti-ai-slop-operating-system.md`: keep the
  specific fictional subject and local boundary while reducing presentation
  that feels like a generated showcase.
- `foundations/aesthetic-taste-system.md`: use a quiet workpaper rhythm and
  remove repeated card-like context instead of adding decoration.
- `foundations/design-composition-layout.md`: protect the first read, second
  read, action reachability, and row/list relationship on narrow screens.
- `foundations/design-review-workflow.md`: re-capture the mobile behavior after
  the correction; a static build is not visual proof.
- `foundations/anti-ai-writing-tells.md`: keep the source description concrete
  and avoid new abstract product language while shortening the mobile reading
  path.

Design reason: the defect is a composition and state-order problem, not a
missing feature. The narrow layout currently makes the PM scroll through
context before seeing the evidence object the product asks them to review.

Tradeoff: the mobile pack description becomes visually shorter and the count
badge yields space to the source row. The complete source description remains
in the DOM, the fictional-subject cue remains visible, and the `Add signal`
control remains named and reachable.

## Scope

## Constraints and out of scope

- Constraints: English-first product language, one small CSS/semantic-label
  correction, no new dependency, preserve the current workflow, keep the
  privacy and human-review boundaries visible, and retain desktop behavior.
- Out of scope: hosted deployment, merge to `main`, public issue activity,
  native screen-reader certification, real-device touch certification,
  participant research, adoption claims, and GitHub star claims.

### Must change

- Give the loaded mobile pack header a compact, bounded treatment.
- Keep the title, `Review subject`, fictional worksheet cue, and `Add signal`
  control readable or accessible.
- Bring `The source comes first` and the first source row above the fixed
  action bar at the exact 390px fallback viewport.
- Preserve the desktop composition and the Collect → Verify → Decide → Ship
  behavior.

### Must not change

- No new model, provider, network request, dependency, telemetry, account
  permission, public comment, merge, deploy, or GitHub write.
- Do not hide the privacy boundary, human review gate, source metadata, or
  recovery/reset behavior.
- Do not claim Chrome Extension, native screen-reader, real-device, hosted, or
  participant evidence from a headless fallback.

## Exact implementation slice

- `src/App.tsx`: give the loaded pack description a stable semantic class and
  keep the `Add signal` button explicitly named for its compact mobile layout.
- `src/styles.css`: on `max-width: 700px`, compact the loaded pack header,
  bound the description, keep the secondary action in a small header slot, and
  shorten the source-heading spacing without changing desktop rules.
- `docs/product/pm-signal-lab/83-mobile-source-first-reading-contract-2026-08-16.md`:
  record the defect, decision, acceptance, and evidence boundary.
- `docs/product/pm-signal-lab/79-editorial-case-sheet-local-qa-2026-08-15.md`
  and `qa-evidence-manifest-2026-08-15.json`: record only fresh fallback
  evidence after the patch; keep the Chrome Extension lane separate.

## Files/surfaces and evidence map

- Create: this contract only; no new runtime surface.
- Modify: `src/App.tsx` and the final mobile block in `src/styles.css`.
- Test: unit tests, lint, production build, diff check, local HTTP verifier,
  and the current-candidate browser fallback flow.
- Observe: loaded mobile source heading/row, fixed action-bar clearance,
  desktop layout, source expansion, review gate, privacy gate, reset,
  keyboard focus, accessibility tree, and external-resource boundary.

## Acceptance criteria

1. At exact `390×844`, loading the sample keeps `Support draft review`, the
   fictional worksheet subject cue, and the named `Add signal` action
   reachable.
2. At exact `390×844`, `The source comes first` and the first source row's
   title or original-line preview are visible above the fixed mobile action
   bar; the fixed action does not cover the source heading.
3. The loaded mobile document and body have no horizontal overflow, and the
   desktop `1280×900` layout remains aligned with the current workpaper.
4. Source expansion, Verify gating, accepted-claim continuation, Decide,
   Ship, feedback privacy blocking/confirmation, refresh reset, keyboard
   focus, and same-origin/no-external-resource boundaries still work in the
   fallback flow.
5. `npm test`, `npm run lint`, `npm run build`, `git diff --check`, and the
   local content verifier pass.
6. The report labels headless Chrome CDP fallback as fallback evidence and
   leaves the Chrome Extension, hosted, native AT, real-device, participant,
   adoption, and stars gates separate.

## Task sequence

- [x] Step 1 — add the stable pack-description class and explicit `Add signal`
  accessible name; expected result: the current semantic controls remain
  discoverable after the visual compaction.
- [x] Step 2 — add the bounded loaded-mobile composition rules; expected
  result: the pack context loses duplicate vertical space without changing
  desktop rules or hiding the subject and local boundary.
- [x] Step 3 — run static checks and the local verifier; expected result: all
  commands exit 0 and the current bundle contains the expected direct copy.
- [x] Step 4 — run the exact current-candidate fallback flow at 390px and
  1280px; expected result: source-first mobile geometry, workflow continuity,
  privacy blocking, reset, focus, and resource boundary are recorded.
- [x] Step 5 — update only the QA addendum and evidence manifest with fresh
  fallback results; expected result: Chrome Extension and hosted remain
  separate blocked or unverified lanes.
- [ ] Release gate — rerun the preferred Chrome Extension route, then perform
  the canonical HTTPS Pages verifier and browser trace after explicit merge
  and deploy approval; this is outside the local implementation pass.

## UX/AI/security gate

- First-time and empty: the blank sheet names one source-line action and keeps
  the local sample boundary visible.
- Loading: the worksheet opens without a fake thinking state or provider claim.
- Error and recovery: invalid source fields preserve input, notices name the
  recovery action, and refresh only clears local state.
- Mobile: the single-column source row and sticky next action stay reachable;
  exact viewport evidence is required before a mobile pass is claimed.
- Accessibility and trust: visible labels, focus rings, named controls, and
  decorative icons remain separated; native assistive technology is not
  implied, and the compact `Add signal` control keeps its accessible name.
- Security: no credentials, secrets, customer data, provider permission,
  telemetry, network upload, or automatic GitHub submission is introduced.

## Verification path

```bash
npm test
npm run lint
npm run build
git diff --check
HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted
```

Then run the exact `390×844` and `1280×900` current-candidate browser flow,
including source expansion, claim review, privacy gate, reset, first-tab
focus, runtime/resource checks, and an accessibility-tree snapshot. If the
preferred Chrome Extension route remains unavailable, record the fallback
command and do not promote it to Chrome Extension evidence.

## Rollback

Revert the small `src/App.tsx` class/label change and the final mobile CSS
block. No migration, data cleanup, dependency removal, provider shutdown, or
external rollback is required.
