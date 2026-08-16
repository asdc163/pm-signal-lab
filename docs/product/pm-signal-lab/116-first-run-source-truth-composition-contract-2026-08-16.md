# First-run source-truth composition contract

Status: local candidate contract for the next PR #44 slice; not a hosted-release approval.

## Problem frame

**Decision:** Make the first-run surface show one real source line before the
user has to scroll, while keeping the existing local fixture boundary and
workflow action ownership unchanged.

**User/job:** An international PM visiting the public preview for the first
time needs to understand within a few seconds that PM Signal Lab is a source
review workpaper, not a generic AI answer screen, and know how to try the
sample or add a real line.

**Current workaround:** The blank hero currently leads with `Sheet tally` and
`No source line yet`; the concrete sample line appears lower inside the blank
panel. The same sample quote therefore arrives late and is repeated in one
first-run path.

**Outcome metric:** At `390×844` and `1440×1000`, the first-run surface exposes
the literal `Sample note`, its source identity, and a bounded source excerpt in
the hero secondary column; the lower empty panel keeps the human entry path
without rendering a duplicate sample quote.

**Evidence boundary:** This is a composition and copy hierarchy improvement.
It can prove visible product truth and local interaction behavior. It cannot
prove five-second comprehension, participant preference, adoption, or GitHub
star growth until real sessions are collected.

## KB Application Contract

### Relevant KB

The following guidance was read and applied to this focused verification
slice; each item states why it applies to the decision and its tradeoff:

- `foundations/design-brain.md`: use product context → design DNA → composition
  before styling. This makes the source line, not a generic count panel, the
  first-run proof object. Tradeoff: the blank state carries more concrete
  content and slightly less empty calm.
- `foundations/design-rule-hierarchy.md`: quality rules require a clear first
  read, predictable primary action, complete states, and no obstruction;
  taste guardrails reject generic hero/card-shell treatment. This keeps the
  sample excerpt secondary to the source-entry job and preserves the fixed
  mobile action.
- `foundations/product-craft-anti-ai-slop-operating-system.md`: AI feel is a
  product-truth and specificity problem, not a missing effect. Showing the
  actual fixture source and its local boundary raises subject specificity;
  removing the repeated quote reduces template-like content stacking.
- `foundations/aesthetic-taste-system.md`: product truth comes first, repeated
  data objects should not become card soup, neutral surface and typography
  should carry hierarchy, and the second polish pass should delete before it
  decorates. The slice moves one source object upward and deletes one duplicate
  object.
- `foundations/design-composition-layout.md`: define first read, second read,
  primary action, content relationship, and alignment spine. The intended path
  is `sample source line → write/add a line → Source → Claim → Smallest test`.
- `foundations/ai-native-ux-operating-system.md`: trust comes from context,
  control, uncertainty, provenance, and recovery rather than a magical output.
  The sample excerpt remains labelled as a local fixture and does not imply
  live model quality.
- `foundations/product-messaging-copy-operating-system.md`: literal copy must
  name the user action and boundary. `Sample note`, source identity, and
  `Local fixture only` are more useful than abstract intelligence language.
- `foundations/behavioral-ux-qa-evidence-gate.md`: first-time, empty, mobile,
  trust, and visual evidence must be tested as behavior, not inferred from
  source code. The new blank-state oracle will assert the visible source,
  action, responsive geometry, and browser boundary.

**Assumptions:** The deterministic `SAMPLE_PREVIEW` content is safe to expose
on the public fixture because it is already present in the current blank state
and explicitly labelled local-only. No live provider, account, telemetry, or
external transfer is introduced.

**Fastest evidence:** local production preview at `390×844` and `1440×1000`,
fresh screenshots, the blank-state browser oracle, existing workflow/recovery
gates, static copy verifier, and the QA manifest validator.

## Product craft and composition contract

- **Product truth:** one source line someone can trace before a claim is made.
- **First read:** `Start with a source line` plus a visible `Sample note` and
  source identity.
- **Second read:** the visitor can either `Open the sample worksheet` or add
  `your own signal`; the workpaper path remains `Source line → Claim → Smallest
  test`.
- **Primary action:** the existing sample CTA remains the action; mobile keeps
  the fixed bottom bar as the sole current action.
- **Subject specificity:** the sample title, source, excerpt, and local-only
  boundary are concrete product objects, not AI category claims.
- **Visual direction:** quiet editorial workpaper; neutral surface, ruled
  source cue, restrained trust blue, red only for the human action.
- **No-AI-feel guard:** no gradient hero, chat bubble, assistant badge,
  confidence meter, model status, fake progress, activity feed, or new card
  cluster.

## Scope and states

Must change:

- Blank hero secondary content becomes the sample source proof object.
- The lower blank panel keeps the entry instruction and path but no duplicate
  sample quote.
- Loaded `Sheet tally`, source identity, current action ownership, and all
  workflow states remain unchanged.
- English-first visible labels, accessible name, static hosted-copy verifier,
  browser oracle, QA report, screenshots, and manifest stay aligned.

Should not build:

- New data, provider integration, personalization, analytics, persistence,
  share automation, or GitHub mutation.
- Decorative gradient, glass, blob, 3D, cursor effect, or heavy animation.
- A second primary CTA or a fake `AI preview` state.

State checks:

- **First-time / empty:** sample line visible, local-only label visible, sample
  action discoverable, own-signal action remains available below.
- **Loading:** existing static `Opening the sample worksheet` state is unchanged.
- **Loaded:** existing source-first Collect state still begins with the sample
  worksheet title and source record.
- **Error / recovery:** empty-form validation and cancel remain unchanged.
- **Mobile:** excerpt wraps/clamps without horizontal overflow; fixed action bar
  does not cover the first-run proof.
- **Trust:** fixture copy remains explicitly fictional/local and never implies
  live model accuracy or adoption.

## Constraints / out of scope

Keep the change English-first, local-first, reversible, and limited to the
first-run composition. Out of scope are hosted deployment, new providers,
analytics, participant comprehension claims, native AT sign-off, and adoption
or star-growth claims.

## Execution contract

### Files/surfaces

- **Modify:** `src/App.tsx`, `src/styles.css`,
  `scripts/verify-keyboard-flow.py`, `scripts/verify-hosted-demo.mjs`,
  `README.md`, `DESIGN.md`, and
  `docs/product/pm-signal-lab/qa-evidence-manifest-2026-08-16.json`.
- **Create:** this contract, its local QA report, and fresh first-run
  screenshots if the visual state changes.
- **Test:** domain tests, TypeScript, production build, local hosted-copy
  verifier, keyboard workflow, source-truth, session-boundary, responsive,
  edge, JSON, manifest, and diff checks.
- **Observe:** first-run blank state at `390×844` and `1440×1000`, source
  excerpt wrapping, CTA ownership, visible local boundary, no browser errors,
  no failed requests, and no overflow.

### Task sequence

- [ ] Step 1 — Change only the blank branch in `src/App.tsx`: render the
  existing `SAMPLE_PREVIEW` title/source/excerpt/boundary in the hero status;
  remove the duplicate `sample-quote` from the blank panel. **Expected:** the
  blank DOM contains one visible sample source proof and the entry panel still
  contains `Add your own signal`.
- [ ] Step 2 — Add only the source-proof typography and wrapping rules to the
  final section of `src/styles.css`. **Expected:** the source excerpt stays
  bounded, the neutral/blue/red roles remain intact, and no new decorative
  surface appears.
- [ ] Step 3 — Extend the blank-state portion of
  `scripts/verify-keyboard-flow.py` and the static verifier's required copy.
  **Expected:** the oracle sees `Sample note`, source identity, local boundary,
  one sample proof, and no duplicate lower quote at both viewport widths.
- [ ] Step 4 — Run the existing code/browser/recovery gates and inspect fresh
  blank screenshots. **Expected:** all current local gates exit 0, no overflow
  or request failure appears, and loaded workflow behavior is unchanged.
- [ ] Step 5 — Record the result in the QA report, manifest, README, DESIGN,
  and PR body without claiming hosted release or user comprehension.
  **Expected:** the evidence points to the exact candidate commit and keeps
  canonical hosted, Chrome Extension, native AT, participant, adoption, and
  stars as separate gates.

## Verification gate

```text
npm test -- --run
npm run lint
npm run build
HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted
npm run verify:keyboard
npm run verify:source-truth
python3 scripts/verify-session-boundary.py
python3 /tmp/pm-signal-lab-margin-qa.py
python3 /tmp/pm-signal-lab-edge-qa.py
python3 -m json.tool docs/product/pm-signal-lab/qa-evidence-manifest-2026-08-16.json
python3 /Users/tommy/.codex/skills/product-qa-specialist/scripts/validate_qa_evidence_manifest.py docs/product/pm-signal-lab/qa-evidence-manifest-2026-08-16.json
git diff --check
```

**Expected:** all local commands exit 0; the static verifier finds the current
English copy; browser errors and request failures are empty; source proof is
visible at both target widths; screenshots pass visual inspection; no external
request, permission, persistence, or product mutation is introduced.

## UX/AI/security gate

- **First-time / empty:** the literal sample note, source identity, and local
  boundary appear before the visitor must scroll; both sample and own-signal
  paths remain discoverable.
- **Loading:** the existing static opening state is unchanged and the sample
  action remains disabled during the local transition.
- **Error / recovery:** the empty-form warning, first-invalid-field focus, and
  keyboard cancel path remain unchanged.
- **Mobile:** the source excerpt wraps within the viewport, the fixed action
  bar remains the only current action, and the proof is not hidden behind it.
- **Accessibility:** visible labels, semantic text, focus behavior, no overflow,
  and existing keyboard/ARIA gates remain green; native screen-reader speech is
  not inferred from the fallback browser trace.
- **Trust / AI:** `Sample note`, source identity, and `Local fixture only` stay
  adjacent; no live-model quality, confidence, adoption, or external transfer
  is implied.
- **Security / permission:** no API key, secret, login, provider, telemetry,
  upload, new permission, persistence, GitHub mutation, or external request is
  introduced.

## Risk and rollback

- **Risk:** moving the quote upward could make the hero too dense on mobile.
  **Mitigation:** clamp the excerpt, inspect 390px, and keep the lower panel
  focused on user-entered source work.
- **Risk:** fixture copy could be mistaken for live evidence. **Mitigation:**
  retain `Sample note`, source identity, and `Local fixture only` together.
- **Risk:** a first-run visual check could pass while real users still miss
  the job. **Mitigation:** keep five-second comprehension and participant
  sessions explicitly unverified.
- **Rollback:** revert the focused App/CSS/verifier/docs/manifest/screenshot
  changes. No data migration, dependency, permission, or external cleanup is
  required.
