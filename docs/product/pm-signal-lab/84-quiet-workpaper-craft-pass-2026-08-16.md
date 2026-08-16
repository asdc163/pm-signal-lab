# Quiet workpaper craft pass — 2026-08-16

Status: implemented and locally verified for the current candidate; the
preferred Chrome Extension, canonical hosted, native AT, participant, and
release gates remain separate.

## Problem frame

- Decision: make the loaded Collect surface read as a deliberate PM workpaper
  at first glance, without adding more visual effects or AI-labelled chrome.
- User/job: a first-time PM should understand the case, see the source ledger,
  and start the human review without being distracted by browser-default focus
  treatment or clipped explanatory copy.
- Current evidence: fresh local headless Chrome fallback at 1280×900 and
  390×844 showed a full-surface focus outline after the sample opened; the
  mobile pack description ended in a clipped ellipsis at 390px. A follow-up
  semantic scan also found collapsed source toggles pointing at source-detail
  IDs that were not yet in the DOM.
- Success signal: the same state keeps a visible, calm reading path; the
  programmatically focused landmark has no full-surface outline; the pack
  description remains complete within its intended mobile line budget.
- Outcome metric: at 390px, a first-time visitor can read the complete case
  description and the first source title without a clipped sentence or a
  browser-default focus frame competing with the workpaper.
- Constraint: keep the source-first layout, current action hierarchy, keyboard
  control focus rings, and local-only trust boundary unchanged.
- Constraints / scope: this is a small visual-and-semantics polish slice; it
  does not change the domain model, workflow states, external integrations, or
  public release state.
- Out of scope: new product features, provider integration, telemetry,
  hosted deployment, public recruitment, and claims about usability or adoption.

## Product Craft Contract

### Product truth

The product is a local-first worksheet that keeps `Source → Claim → Smallest
test` visible. The loaded fixture is fictional and deterministic; it is not a
live support system or model-quality proof.

### Project Style Direction

- Design read: a quiet evidence workpaper for a PM decision review, with medium
  desktop density and a stacked mobile reading path.
- Selected DNA: Pillow Fit's tool/trust discipline plus Altoslab's restrained
  professional language.
- Signature: source folios, ruled rows, one red next-action mark, and blue
  provenance cues.
- Rejected direction: adding gradient, glass, orb, chat bubbles, confidence
  meters, or decorative AI activity to make the screen feel more "advanced".

### Composition brief

- First read: `Support draft review` and the one-sentence job.
- Second read: the current source count, the source-ledger heading, and the
  first source title.
- Primary action: `Start review`.
- Content relationship: the case header hands directly into ruled source rows.
- Fix in this pass: remove a non-interactive focus artifact and rewrite the
  short description so the reading path ends on a complete sentence.

## KB Application Contract

Relevant KB and why it applies:

- `foundations/design-brain.md`: product truth and composition come before
  decoration; this keeps the change on the source-ledger reading path.
- `foundations/design-rule-hierarchy.md`: focus visibility and text integrity
  are Quality Rules; the paper treatment is a Taste Guardrail, so the polish
  cannot remove real control focus rings.
- `foundations/product-craft-anti-ai-slop-operating-system.md`: no-AI feel
  comes from subject-specific objects and honest states, not extra effects; the
  fixture sentence names the support-draft review and its actual limitation.
- `foundations/aesthetic-taste-system.md`: second polish removes cheapness by
  fixing hierarchy, typography, surface noise, and clipped content before
  adding decoration.
- `foundations/design-composition-layout.md`: the source ledger is a ruled
  list, not a card wall; the first source row must remain the next readable
  object after the case header.
- `foundations/anti-ai-writing-tells.md`: replace abstract or padded phrasing
  with a short, concrete sentence that can survive narrow widths without a
  summary-style tail.
- `foundations/frontend-ux-delivery-gate.md`: keyboard focus, responsive text,
  screenshot evidence, and behavior evidence are separate gates.

Implementation consequence: the main landmark keeps programmatic context
handoff without a control-style outline; source toggles only expose
`aria-controls` while their source excerpt exists; buttons and form controls
keep their keyboard focus treatment.

## Execution contract

### Files/surfaces

- Create: this contract document, which records the applied design rules and
  the evidence boundary.
- Modify: `src/domain/fixture.ts` for the complete, narrow-safe case
  description; `src/styles.css` for the non-interactive main-landmark focus
  rule; `src/App.tsx` so a collapsed source toggle does not point to a missing
  `aria-controls` target.
- Test: `src/domain/*.test.ts`, TypeScript lint, production build, and
  `git diff --check`.
- Observe: fresh local browser screenshots and DOM geometry at 1280×900 and
  390×844, followed by source expansion, keyboard focus, and review entry.

### Task sequence

- [x] Step 1 — Run `npm test -- --run`, `npm run lint`, and `npm run build` on
  the current candidate. Expected: exit 0 with zero failed tests, zero
  typecheck errors, and a generated `dist/assets/index-*.js` plus CSS bundle.
- [x] Step 2 — Inspect the loaded 1280×900 and 390×844 screenshots. Expected:
  the case header hands into the source ledger; no blue outline surrounds the
  whole main landmark; the first source title remains legible above the fixed
  mobile action bar.
- [x] Step 3 — Run the keyboard path from refresh: first Tab exposes `Skip to
  main content`, then the source toggle and `Start review` remain reachable
  with a visible focus treatment. Expected: no unnamed interactive control and
  no focus ring is removed from a button or form control.
- [x] Step 4 — Expand one source and enter Verify. Expected: the original
  source excerpt remains visible, the review state changes, and the local-only
  boundary text is unchanged.
- [x] Step 5 — Run `git diff --check` and inspect the final diff. Expected: no
  whitespace error, no unrelated file, no external request, and a reversible
  three-file implementation change.
- [ ] Release gate — rerun the preferred Chrome Extension route, verify the
  merged canonical HTTPS bundle, and only then run the international pilot
  sessions after explicit merge/deploy approval.

### Acceptance criteria

- `main.workspace:focus` has no full-surface browser outline after sample load.
- A button, input, select, textarea, and the skip link still expose a visible
  focus treatment when reached by keyboard.
- A collapsed source toggle has no dangling `aria-controls`; an expanded
  source toggle references the visible source excerpt region.
- At 390px the pack description has no horizontal overflow and no clipped
  ellipsis in the loaded case header.
- The first source title remains readable above the fixed mobile action bar;
  no source heading or action label overlaps another.
- The source-first copy, fictional-fixture boundary, and local-only boundary
  remain visible.
- No external resource, provider call, telemetry, or GitHub mutation is added.

## Verification gate

Run:

```bash
npm test -- --run
npm run lint
npm run build
git diff --check
```

Browser fallback evidence must record the route boundary explicitly:

- Preferred `Codex Chrome Extension`: unavailable in this session.
- Executed fallback: isolated local headless Chrome CDP against
  `http://127.0.0.1:5173/`; this is current-candidate evidence, not canonical
  hosted evidence.
- Required states: blank first visit, loaded sample, 1280×900 screenshot,
  390×844 screenshot, first Tab skip link, focus after loading, source expansion,
  collapsed/expanded `aria-controls`, and no app-origin console/resource error.
- Not covered by this pass: formal hosted URL, native screen-reader output,
  real device, Chrome Extension trace, non-owner PM sessions, and adoption.

## UX/AI/security gate

- First-time: the blank sheet still offers the sample and a manual source-line
  path.
- Loaded: the support-draft subject, source count, source rows, and next review
  action remain visible.
- Loading/error/recovery: the existing sample loading message, preserved form
  input, reset action, and refresh-clears-local boundary are unchanged.
- Mobile: the description does not use an ellipsis to hide product truth, the
  first source title stays readable, and the fixed action remains reachable.
- Accessibility: control focus rings stay visible; the landmark focus rule
  applies only to `main.workspace` after programmatic context handoff; source
  toggle relationships exist only when their excerpt exists.
- Trust: no AI confidence claim, provider call, source upload, telemetry,
  secret, permission change, or external mutation is introduced.

## Local verification snapshot

The current candidate was run through the fallback route on 2026-08-16. The
full raw observations are recorded in
`85-quiet-workpaper-craft-local-qa-2026-08-16.md`.

- Static gates: `npm test -- --run` passed 11/11 tests; `npm run lint`,
  `npm run build`, and `git diff --check` passed. The final local build emitted
  hashed JavaScript and CSS bundles.
- Desktop/mobile composition: the loaded case was inspected at `1280×900` and
  `390×844`; the main landmark reported `outline-style: none`, the complete
  mobile description fit `50/50` CSS pixels, and the first source title ended
  at `y=797.81` directly above the `y=798` fixed action boundary.
- Keyboard/semantic: first Tab reached `Skip to main content`; the loaded path
  reached named source toggles and `Start review` with a solid 3px focus ring;
  visible unnamed controls were `0`, duplicate IDs were `0`, collapsed source
  toggles had no dangling `aria-controls`, and expanded source toggles mapped
  to a live excerpt region.
- Workflow/recovery: blank → sample → source expansion → Start review →
  blocked Decide gate → accepted claim → smallest experiment → edited metric →
  decision brief → privacy-blocked feedback → reviewed field note → clipboard
  fallback → refresh reset all passed. Same-origin resource count had no
  external URLs and no browser protocol errors were observed.

## Rollback

Revert the single implementation commit if the focus handoff harms keyboard
orientation or if a narrow viewport regresses. The fixture copy and the source
toggle semantics can be reverted independently without changing the domain
model.
