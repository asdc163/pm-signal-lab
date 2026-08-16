# PM Signal Lab — quiet workpaper second-polish contract

Status: implemented on Draft PR #44; the current-candidate browser gate remains
open because the Mac was locked. This is a small visual and language pass after
the editorial case-sheet reframe. It does not add a model, provider,
dependency, account, telemetry, or external write.

## Decision

Reduce the remaining model-average feeling in the work surface by removing
repeated editorial jargon and all-caps metadata, then make the source row the
clearest visual unit. The product should feel like a tool a PM can use during a
review, not a styled AI demo.

## Problem frame

- Decision: should this iteration spend its next change on direct language and
  calmer metadata rather than another feature or visual decoration?
- User/job: an English-speaking PM needs to see one source line, understand
  what it can support, and choose a human-owned next step.
- First read: the current case or the blank action, followed by the next source
  line to inspect.
- Outcome metric: a visitor can name the work object and next action from the
  first viewport, and a loaded visitor can scan one source row without
  decoding design labels.
- Success signal: a new visitor can name the work object and next action from
  the first viewport; a loaded visitor can scan source, date, limitation, and
  review action without decoding design labels.
- Current evidence: the local case-sheet screenshots show a coherent ruled
  surface, but they also show repeated labels, all-caps metadata, and folio
  language that make the interface feel more like a generated editorial mockup
  than a daily work surface.
- Unknown: non-owner comprehension, current Chrome Extension render after this
  pass, native screen-reader output, hosted behavior, and adoption.

## KB Application Contract

### Relevant KB

- `foundations/design-brain.md`: start from product truth, composition, and
  design system; this keeps the change on the source-to-decision reading path.
- `foundations/design-rule-hierarchy.md`: task clarity, no overlap, responsive
  behavior, and accessibility outrank the editorial treatment.
- `foundations/product-craft-anti-ai-slop-operating-system.md`: increase
  subject specificity and human control instead of adding decoration or AI
  capability language.
- `foundations/aesthetic-taste-system.md`: remove repeated labels and card-like
  noise, keep one restrained signature detail, and make the surface feel used.
- `foundations/design-composition-layout.md`: protect first read, second read,
  alignment spine, density, and row-based grouping before adding containers.
- `foundations/design-review-workflow.md`: perform a second polish pass and
  keep browser, mobile, keyboard, accessibility, hosted, and participant gates
  separate.
- `foundations/anti-ai-writing-tells.md`: replace abstract or symmetrical
  phrases with direct nouns and observable actions; do not invent user proof.

Design reason: these files apply because the remaining quality risk is not a
missing visual effect; it is the distance between the PM's source line and the
interface's labels. The pass changes that distance in copy, typography,
composition, and the evidence gate together.

Tradeoff: less all-caps and less folio vocabulary makes the interface slightly
less stylized, but gives the PM task more room and lowers the cost of reading
the first source row. The red action line and blue provenance line remain as
the single product-specific signature.

## Project style direction

- Reading this as: a quiet PM workpaper for a source review, with an editorial
  paper surface and operational row density.
- Selected DNA: Pillow Fit's calm tool discipline plus Altoslab's restrained
  professional language.
- Must feel like: a real review instrument with visible source ownership.
- Must not feel like: an AI dashboard, a landing-page hero, an editorial
  template, or a collection of decorative labels.
- Density: medium on first run; medium-high when source rows are loaded.
- Signature: one red action rule and one blue provenance rule, not a palette
  sprayed across every label.
- Trend gate: no gradient, glass, orb, bento, 3D, cursor glow, or heavy motion;
  the low-risk alternative is type rhythm, ruled rows, and direct copy.

## Composition brief

- First read: `Start with a source line` or `Support draft review`.
- Second read: the next action and the first source row's original line.
- Primary action: the current step's one action, with the sticky mobile action
  preserving reachability.
- Content relationship: source pack → source row → claim review → smallest test
  → decision brief.
- Alignment spine: masthead → workflow index → case title → source row.
- Layout archetype: one workpaper with row-based evidence, not a dashboard rail.
- What to remove: duplicate case labels, unexplained `folio` vocabulary, and
  all-caps metadata that competes with the source line.

## Constraints and out of scope

- Constraints: English-first copy, no new feature, no new dependency, no live
  provider, no telemetry, no external write, preserve current workflow and
  privacy gate.
- Out of scope: hosted deployment, merge to `main`, native screen-reader
  certification, real-device touch, non-owner sessions, adoption, and star
  growth.

## Files/surfaces and exact implementation slice

### Modify

- `src/App.tsx`
  - use direct copy for the empty instruction, source heading, source row count,
    and source-pack context;
  - keep the human-review and privacy boundaries unchanged.
- `src/styles.css`
  - make content labels sentence case instead of all caps;
  - reduce tracking on metadata;
  - preserve the red/blue signature, touch targets, focus styles, and mobile
    sticky action.
- `scripts/verify-hosted-demo.mjs`
  - require the new direct strings and reject the replaced phrases.
- `README.md` and `DESIGN.md`
  - describe source rows and source numbers in the current public language.

### Preserve

- `Collect → Verify → Decide → Ship` state transitions.
- Human review gate before drafting an experiment.
- Local-only fixture, privacy confirmation, manual GitHub handoff, and refresh
  reset behavior.
- Existing repository and deployment boundaries.

### Test and observe surfaces

- Create: this contract only; no new product runtime surface.
- Modify: `src/App.tsx`, `src/styles.css`, `scripts/verify-hosted-demo.mjs`,
  `README.md`, and `DESIGN.md`.
- Test: unit tests, TypeScript lint, production build, diff check, local HTTP
  verifier, and a fresh browser screenshot when the desktop is unlocked.
- Observe: first-run render, loaded source rows, text casing, mobile CTA
  reachability, keyboard focus, accessibility tree, and network boundary.

## Acceptance criteria

1. Current bundle contains `The source comes first`, `Each row keeps the
   original line, source, date, and limit together.`, `source rows`, and
   `Source pack`.
2. Current bundle does not contain `Read the record before you make the case`,
   `source folios`, or `No source file`.
3. The working surface no longer renders content-oriented metadata in all caps;
   labels remain visually distinct through size, color, spacing, and rules.
4. No new dependency, provider, network request, external write, or AI persona
   is introduced.
5. Existing local tests, lint, build, diff check, and local content verifier
   pass.
6. A fresh browser capture at `1280×900` and `390×844` brings the first loaded
   source row into the reading path, keeps the first action visible, and shows
   that the fixed mobile action does not cover the loaded heading. If the
   preferred Chrome route is unavailable, the evidence is labelled as fallback
   and the Chrome gate stays open.

## Task sequence

- [x] Step 1 — replace the remaining indirect source and workpaper labels in
  `src/App.tsx`; expected result: the new direct strings appear in the bundle
  and the replaced phrases do not.
- [x] Step 2 — add the final sentence-case metadata overrides in
  `src/styles.css`; expected result: content labels keep hierarchy without
  rendering as all-caps template chrome.
- [x] Step 3 — update `scripts/verify-hosted-demo.mjs`, `README.md`, and
  `DESIGN.md`; expected result: public copy, static oracle, and design record
  describe the same source-row vocabulary.
- [x] Step 4 — run the static commands below; expected result: each exits 0 and
  the local verifier reports current copy present and stale copy absent.
- [ ] Step 5 — capture desktop and mobile browser states; expected result: the
  loaded source row is readable, the primary action is visible, and the fixed
  mobile action does not cover the heading.

## Verification and release boundary

Run:

```bash
npm test
npm run lint
npm run build
git diff --check
HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted
```

The canonical Pages URL, native screen reader, real-device touch, non-owner
PM sessions, adoption, and GitHub stars remain separate evidence layers. This
contract does not authorize merge, deploy, public issue comments, or claims of
virality.

## UX/AI/security gate

- First-time and empty: the blank sheet names one source-line action and keeps
  the local sample boundary visible.
- Loading: the worksheet opens without a fake thinking state or provider claim.
- Error and recovery: invalid source fields preserve input, notices name the
  recovery action, and refresh only clears local state.
- Mobile: the single-column source row and sticky next action stay reachable;
  exact viewport evidence is required before a mobile pass is claimed.
- Accessibility: visible labels, focus rings, named controls, and decorative
  icons remain separated; native assistive technology is not implied.
- Trust/security: no credentials, secrets, customer data, provider permission,
  telemetry, network upload, or automatic GitHub submission is introduced.

## Rollback

Revert this small copy/style slice. No data migration, dependency removal,
provider shutdown, permission change, or external cleanup is required.
