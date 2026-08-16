# First-run choice clarity contract

Status: local candidate contract for PR #44; not a merge or hosted-release
approval.

## Problem frame

**Decision:** Keep `Open the sample worksheet` as the single primary first-run
action, while moving `Add your own signal` into the first-run hero so a PM who
has real material can choose their own evidence without scrolling.

**User/job:** An international PM arriving at the English-first preview needs to
understand the worksheet's first move, see that the sample is bounded local
fixture data, and choose either a guided sample or their own source line within
the first viewport.

**Current workaround:** The own-signal button exists in the lower blank-sheet
panel, but at `390×844` the fixed sample action and the source proof arrive
before that panel. The product technically supports the path while making the
choice late for a first-time user.

**Outcome metric:** At `390×844` and `1440×1000`, the first-run hero exposes the
literal sample proof, local boundary, primary sample action, and secondary
own-signal action. The sample remains the only `data-current-action` and the
lower entry panel remains available as supporting context.

**Evidence boundary:** Local browser evidence can prove the first-run choices
are visible, named, keyboard-reachable, and behaviorally wired. It cannot prove
five-second comprehension, non-owner preference, activation, adoption, or
GitHub star growth; those remain `未驗證` until real PM sessions and public
readback exist.

## KB Application Contract

### Relevant KB and why it applies

- `foundations/design-brain.md`: start with product context, design DNA, and
  composition before styling. The first screen should answer what this object
  is and what the visitor can do, so the source proof and two explicit choices
  sit in the workpaper hierarchy. Tradeoff: the hero becomes slightly denser.
- `foundations/design-rule-hierarchy.md`: a clear first read, one predictable
  primary action, complete states, and no obstruction outrank decorative polish.
  The sample keeps primary ownership; the own-signal path is a quiet secondary
  control rather than a competing button.
- `foundations/product-craft-anti-ai-slop-operating-system.md`: AI feel is
  reduced by specificity, control, and honest boundaries rather than by adding
  a new visual effect. The fixture source and local label remain concrete; no
  assistant chrome or model state is introduced.
- `foundations/aesthetic-taste-system.md`: use a neutral ruled surface,
  typography, and deletion instead of card accumulation. Reusing the existing
  hero status and text-button language keeps this slice small and avoids a new
  card or badge.
- `foundations/design-composition-layout.md`: define first read, second read,
  primary action, content relationship, and alignment spine. The intended
  sequence is `source proof → sample or own line → Source → Claim → Smallest
  test`.
- `foundations/ai-native-ux-operating-system.md`: trust requires context,
  provenance, control, uncertainty, and recovery. The two choices are explicit;
  the sample remains labelled `Local fixture only`; nothing claims live AI
  quality.
- `foundations/behavioral-ux-qa-evidence-gate.md`: a visible control is not
  enough; fresh runtime checks must verify the first-run action geometry,
  keyboard activation, form recovery, mobile overflow, and unchanged loaded
  workflow. Native screen-reader, Chrome Extension, hosted, participant, and
  adoption evidence stay separate.
- `foundations/product-messaging-copy-operating-system.md`: user-facing copy
  must name the next action and its boundary. `Open the sample worksheet` and
  `Add your own signal` are literal jobs, not capability claims.

**Design reason:** This is a choice-clarity correction, not a feature expansion.
The first-run surface already has both paths; the defect is their ordering and
discoverability. Reusing existing state, handlers, tokens, and controls keeps
the change reversible and preserves the no-AI visual direction.

## Product craft and UX contract

- **First read:** `Start with a source line`, the concrete `Sample note`, its
  source title/excerpt, and `Local fixture only`.
- **Second read:** `Open the sample worksheet` is the guided primary path;
  `Add your own signal` is the quieter human-input path in the same hero.
- **Primary action:** only the sample control is the primary button and only
  the loaded flow owns `data-current-action`; the mobile fixed bar remains the
  current action after loading.
- **Secondary action:** the own-signal control uses the existing text-button
  treatment, opens the existing form, and does not add analytics, persistence,
  upload, provider, or permission behavior.
- **No-AI-feel guard:** no gradient, glass, assistant badge, model status,
  confidence score, fake progress, activity feed, chat framing, or new visual
  container.
- **English-first copy:** all new visible labels remain English and literal.

## Scope, states, and acceptance criteria

### Constraints and out of scope

The change is constrained to the existing first-run React branch, existing
form handler, existing visual tokens, and local browser evidence. It must not
change the loaded workflow, introduce a second primary action, or turn a local
fixture into a provider-backed experience. Hosted release, merge, participant
research, GitHub operations, and star-growth work are out of scope for this
slice.

### Must change

- Render the existing own-signal handler as a visible secondary action beside
  the first-run sample CTA.
- Preserve the existing sample proof title, excerpt, source identity, and local
  boundary.
- Keep the lower blank panel's instruction and existing own-signal action as a
  reachable supporting path unless fresh visual evidence shows harmful
  duplication.
- Add a browser oracle that verifies the hero own-signal control is in the
  first-run region at both target widths, not merely somewhere in the DOM.

### Must not change

- No new data model, API, live model, telemetry, login, persistence, external
  request, file upload, GitHub mutation, dependency, or public deployment.
- No merge to `main` and no hosted release without Tommy's current explicit
  approval.
- No claim of comprehension, adoption, star growth, or bug-free status from
  local browser checks.

### State contract

- **First-time / empty:** source proof, local boundary, sample primary, and own
  signal secondary are visible; the two controls have distinct accessible names.
- **Loading:** the existing `Opening the sample worksheet` state remains; the
  sample button disables during the local transition.
- **Own-signal form:** the secondary action opens the existing form and focuses
  the existing first field; blank save still focuses the first invalid field and
  preserves the warning.
- **Cancel / recovery:** cancel closes the form and returns to the first-run
  surface without losing the source choice.
- **Loaded:** sample workflow, fixed mobile current action, source record,
  Verify, Decide, and Ship behavior remain unchanged.
- **Mobile:** the secondary action remains visible in the hero without being
  covered by the fixed action bar; no horizontal overflow.
- **Trust:** fixture data remains explicitly local and fictional; no current
  claim implies provider-backed intelligence.

## Files and surfaces

- **Modify:** `src/App.tsx` for the existing first-run hero action;
  `src/styles.css` for the restrained secondary treatment and responsive
  visibility; `scripts/verify-keyboard-flow.py` for first-run geometry and
  keyboard assertions; `README.md` and the QA manifest for evidence links.
- **Create:** this contract and
  `123-first-run-choice-clarity-local-qa-2026-08-16.md`; refresh the existing
  first-run and keyboard screenshots only if the fresh run changes them.
- **Test:** domain tests, typecheck, production build, local hosted-copy
  verifier, keyboard workflow, source-truth, session-boundary, responsive and
  edge scripts, JSON/manifest validation, and diff checks.
- **Observe:** first-run DOM and bounding boxes at `390×844` and `1440×1000`,
  primary/secondary action ownership, form opening and recovery, browser errors,
  request failures, overflow, and fresh screenshots.

## Execution steps

- [ ] **Step 1 — Contract gate.** Run
  `python3 /Users/tommy/.codex/skills/kb-task-compiler/scripts/score_kb_plan.py
  docs/product/pm-signal-lab/122-first-run-choice-clarity-contract-2026-08-16.md
  --min-score 100`. Expected: `KB plan score: 100/100`; do not implement if it
  fails.
- [ ] **Step 2 — Minimal UI change.** In `src/App.tsx`, add the existing
  `setIsFormOpen(true)` path as a secondary hero control while retaining the
  sample primary. In `src/styles.css`, reuse existing tokens and keep the
  control quiet on desktop and visible on mobile. Expected: no new state,
  dependency, visual container, or AI-labelled chrome.
- [ ] **Step 3 — Runtime oracle.** Extend
  `scripts/verify-keyboard-flow.py` to assert the own-signal control's bounding
  box lies in the first-run hero/viewport at both target widths, is keyboard
  focusable, opens the form, and leaves the loaded sample action ownership
  unchanged. Expected: the oracle fails if the control merely exists below the
  fold.
- [ ] **Step 4 — Fresh local verification.** Run the full verification gate
  below against a fresh production preview. Expected: all commands exit 0,
  browser errors and failed requests are empty, and screenshots show one
  primary sample path plus one quiet own-signal path.
- [ ] **Step 5 — Evidence handoff.** Record exact command output, screenshot
  paths, changed files, and unverified boundaries in the QA report; update the
  manifest, README, and PR body; push only the feature branch. Expected: no
  merge/deploy action and no hosted claim.

## Verification gate

```text
python3 /Users/tommy/.codex/skills/kb-task-compiler/scripts/score_kb_plan.py docs/product/pm-signal-lab/122-first-run-choice-clarity-contract-2026-08-16.md --min-score 100
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

**Expected evidence:** tests/typecheck/build pass; local hosted-copy check sees
the current English copy; the fresh browser run returns no console errors or
request failures; source proof and both choices are visible at the target
widths; the own-signal form opens and recovers; loaded workflow remains green;
and the screenshot/manifest record remains honest about unexecuted native AT,
Chrome Extension, canonical Pages, participant, and adoption gates.

## UX / AI / security gate

- **First-time:** both explicit choices are in the first-run reading path;
  sample remains primary and own signal is secondary.
- **Loading / error / recovery:** existing disabled/loading, invalid-form,
  focus, and cancel behavior are preserved and freshly executed.
- **Mobile / accessibility:** no overflow; visible focus remains available;
  accessible names are literal; native screen-reader output is not inferred
  from Playwright keyboard evidence.
- **Trust / AI:** the fixture source and `Local fixture only` boundary stay
  adjacent; no model status or unsupported quality claim is introduced.
- **Security / permissions:** no secret, API key, upload, network request,
  login, new permission, telemetry, or GitHub write is added.

## Risk and rollback

- **Risk:** the hero becomes denser or the secondary action competes with the
  sample. **Mitigation:** keep the sample as the only primary button, use the
  existing restrained text-button treatment, inspect 390px, and assert the
  action hierarchy in the browser oracle.
- **Risk:** duplicate own-signal controls feel repetitive. **Mitigation:** keep
  the lower control only as the supporting action at the end of the blank-sheet
  explanation; if fresh visual review shows it is distracting, remove only that
  duplicate in a separately verified patch.
- **Risk:** local browser success is mistaken for public readiness. **Mitigation:**
  report canonical Pages, Chrome Extension, native AT, participant, adoption,
  and star-growth states separately as blocked or `未驗證`.
- **Rollback:** revert only the focused App/CSS/oracle/docs/manifest changes.
  No data, dependency, permission, or external state needs cleanup.
