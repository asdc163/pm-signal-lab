# PM Signal Lab — source-first chrome simplification contract — 2026-08-16

Status: implemented and locally verified for the current candidate. This
contract does not authorize merge, deployment, public outreach, or a claim
about adoption.

## Problem frame

- **Decision:** remove the remaining repeated editorial labels that make the
  loaded worksheet look like a generated case-study template instead of a
  small tool someone can use.
- **User/job:** a PM should identify the case, read the first source line, and
  start review without decoding duplicate labels or decorative folio casing.
- **Current evidence:** the current loaded desktop render shows the full case
  title in the top-right context and again in the hero; the Collect surface
  shows `Source lines` above `Source lines to check`; source markers render
  `SOURCE` above each number. The existing workflow and source rows otherwise
  provide the needed product-specific structure.
- **Success signal:** the loaded workpaper has one case title, one direct
  source heading, and sentence-case source markers while retaining the source
  number, provenance rail, action hierarchy, and local boundary.
- **Outcome metric:** first-viewport comprehension and source-row scanability;
  no new feature or growth metric is inferred from this visual slice.

## Product Craft Contract

### Product truth

PM Signal Lab is a local-first worksheet that keeps `Source → Claim → Smallest
test` visible. The default support-draft case is fictional and deterministic;
it is not a live model, support queue, or adoption proof.

### Direction

- **Keep:** quiet workpaper, ruled rows, source number, one red next-action
  rule, blue provenance, direct English copy, and the current four-step flow.
- **Remove:** duplicate case context, duplicate source label, and all-caps
  folio treatment that competes with the original line.
- **Do not add:** cards, gradients, glass, assistant persona, confidence
  meters, provider calls, telemetry, or new interaction states.

### UX and trust states

- First run keeps `Start with a source line` and the local-only boundary.
- Loaded Collect keeps the case title, source count, first source row, and
  `Start review` action.
- Verify, Decide, and Ship keep their current state-specific actions and human
  review gate.
- Mobile keeps the single fixed primary action and safe-area padding.
- Keyboard controls, form labels, focus treatment, privacy confirmation, and
  manual GitHub handoff remain unchanged.

## KB Application Contract

**Relevant KB**

- `foundations/design-brain.md`: product truth and composition come before
  decoration. It changes the plan by making the hero the single case-title
  owner and the source ledger the single source-heading owner.
- `foundations/design-rule-hierarchy.md`: clarity, responsive behavior,
  contrast, and accessible focus outrank the editorial treatment. The pass
  changes only copy ownership and metadata casing; it does not remove control
  focus or touch targets.
- `foundations/product-craft-anti-ai-slop-operating-system.md`: reduce AI
  feel through subject-specific objects and human-owned actions, not through
  extra visual effects. The source row remains the visual proof object.
- `foundations/aesthetic-taste-system.md`: remove repeated labels and
  template-like surface noise before adding decoration. The remaining source
  number is kept as one restrained signature detail.
- `foundations/design-composition-layout.md`: protect the first read, second
  read, and alignment spine. The desktop topbar becomes quiet context; the
  case title and source heading stay on the workpaper spine.
- `foundations/anti-ai-writing-tells.md`: use direct nouns and sentence case
  rather than symmetrical or ornamental label formulas. No new user proof or
  adoption claim is introduced.
- `foundations/design-review-workflow.md`: inspect the real built UI at blank,
  loaded, mobile, and desktop states, then run a second polish and keep hosted,
  Extension, native AT, participant, and adoption evidence separate.

Design reason: why it applies is that the remaining quality risk is repeated
chrome and ornamental casing, not missing capability. The tradeoff is to give
the workpaper fewer labels while keeping the source row as the product proof.

**Tradeoff:** the interface loses a small amount of editorial ornament, but
the remaining source number and ruled row carry enough identity. The PM task
becomes easier to read and the page is less likely to be mistaken for a
marketing mockup.

## Constraints / out of scope

- English-first copy, no new feature, no new dependency, no live provider, no
  telemetry, no external write, and no change to the current workflow or
  privacy gate.
- Out of scope: hosted deployment, merge to `main`, native screen-reader
  certification, real-device touch, non-owner sessions, adoption, and star
  growth claims.

## Execution Contract

### Files/surfaces

- **Create:** no runtime file; this contract and its focused QA report are the
  durable evidence surfaces.
- **Modify:** `src/App.tsx`, `src/styles.css`, and only the matching current
  candidate documentation/oracle strings if the implementation requires it.
- **Test:** `npm test -- --run`, `npm run lint`, `npm run build`,
  `git diff --check`, and fresh local browser states.
- **Observe:** blank, loaded Collect, Verify, Decide, Ship, mobile action
  ownership, source expansion, keyboard semantics, and same-origin resources.

- **Modify** `src/App.tsx`:
  - keep only `Local worksheet` in the desktop topbar context;
  - rename the loaded Collect eyebrow from `Source lines` to `Evidence`;
  - keep the existing case title, source-row heading, workflow, and actions.
- **Modify** `src/styles.css`:
  - render the source index label in sentence case;
  - preserve source numbering, blue provenance, red action cues, visible
    keyboard focus, and the mobile action bar.
- **Modify** `scripts/verify-hosted-demo.mjs` only if the current copy oracle
  needs the new direct string; do not weaken the stale-bundle check.
- **Update** `README.md` and `DESIGN.md` only if their current candidate
  descriptions name the replaced label; they must keep the hosted hold.
- **Do not modify** domain behavior, external integrations, deployment files,
  authentication, telemetry, or private source handling.

### Task sequence

- [x] Step 1 — Remove the duplicated topbar case title in `src/App.tsx`; expected:
  `Local worksheet` remains visible on desktop and the hero remains the only
  case-title owner.
- [x] Step 2 — Rename the loaded Collect eyebrow to `Evidence`; expected: the rendered
  section reads `Evidence` followed by `Source lines to check`.
- [x] Step 3 — Change only the source-index casing rule in `src/styles.css`; expected:
  the visible marker reads `Source` and its number, with no all-caps marker.
- [x] Step 4 — Run the static gates and fresh browser path; expected: no workflow,
  privacy, focus, or responsive regression.
- [x] Step 5 — Record current evidence and open gates; expected: the report does not
  claim hosted, Chrome Extension, native AT, participant, adoption, or stars.

## Acceptance criteria

1. The loaded desktop topbar does not repeat the complete case title.
2. The loaded Collect section shows `Evidence` and `Source lines to check`
   without repeating the same label.
3. A source marker uses sentence-case `Source` plus its number; source rows,
   dates, limits, and `View source` behavior remain intact.
4. Blank, Verify, Decide, and Ship keep their existing copy and state-specific
   actions.
5. No new dependency, provider, network request, external write, telemetry,
   AI persona, or feature is introduced.
6. `npm test -- --run`, `npm run lint`, `npm run build`, and `git diff --check`
   pass; the local bundle contains the new direct strings and no stale
   dashboard labels.
7. Fresh browser evidence at `390×844`, `1024×900`, and `1440×900` shows no
   overflow, no duplicate primary action on mobile, and a readable first
   source row. If the Chrome Extension route is unavailable, the fallback is
   labelled as such and the Extension gate remains open.

## UX/AI/security gate

- First-time and empty: the blank state still presents the sample action and
  a manual source-line path without adding system language.
- Loading and error: the existing loading notice, preserved form input, and
  reset path remain unchanged; no fake model-thinking state is introduced.
- Recovery: source expansion, back navigation, claim review, privacy blocking,
  and refresh reset keep their current labels and focus behavior.
- Mobile: the fixed action remains the only primary action, uses safe-area
  padding, and the source marker does not collide with the first row.
- Accessibility: visible labels, named buttons, keyboard focus, headings,
  landmarks, and `aria-controls` relationships are preserved.
- Trust and security: no provider, permission, secret, upload, telemetry,
  account mutation, or automatic GitHub submission is introduced.

## Verification and release boundary

Run:

```bash
npm test -- --run
npm run lint
npm run build
git diff --check
```

Then inspect the local candidate in the blank, loaded Collect, Verify, Decide,
and Ship states. `npm run verify:hosted` remains a separate canonical-hosted
check; a local pass cannot substitute for it. Native screen-reader speech,
real-device touch, the preferred Chrome Extension trace, non-owner PM sessions,
adoption, and GitHub stars remain `未驗證` unless independently observed.

## Rollback

Revert this small copy/style slice. No data migration, dependency change,
provider shutdown, permission change, or external cleanup is required.
