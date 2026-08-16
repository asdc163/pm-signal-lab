# Keyboard-only workflow contract

Status: local candidate contract for PR #44; not a hosted-release approval.

## Problem frame

The product already had focused keyboard checks for the skip link, source
disclosure, and session note. The critical PM path itself still lacked one
repeatable browser gate that proved a keyboard user could move from the blank
worksheet to a copied decision brief and recover from an empty-form error.

**Decision:** Add one repeatable pointer-free browser oracle for the existing
workflow and keep native assistive-technology claims separate.

**User/job:** A PM who cannot or does not use a pointer needs to open the
worksheet, inspect a source-linked claim, make a human review choice, draft the
smallest experiment, and carry the brief forward.

**Outcome metric:** The fresh oracle completes the blank-form recovery and the
`Collect → Verify → Decide → Ship` path at `390×844` and `1440×1000`, with
focus recovery at each step and empty browser-error/request-failure arrays.

**Current workaround:** Existing checks cover isolated controls, but a reader
must combine several scripts to know whether the complete keyboard path works.

**Evidence boundary:** This is local browser behavior evidence. It cannot
prove participant comprehension, adoption, native screen-reader speech, or a
hosted release.

Success for this slice is a fresh browser trace with keyboard activation only
at the two most important layouts: `390×844` and `1440×1000`. It is local
behavior evidence, not evidence of participant comprehension, adoption, or
native assistive-technology output.

## KB Application Contract

### Relevant KB

The following guidance was read and applied to this focused verification
slice; each item states why it applies to the decision and its tradeoff:

- `foundations/behavioral-ux-qa-evidence-gate.md`: define the user job,
  starting state, success/failure signal, recovery path, and responsive
  behavior before clicking. This changes the gate from isolated DOM checks to
  a trace that observes what a keyboard PM can actually complete. Tradeoff: a
  deterministic browser fallback is narrower than native AT evidence.
- `foundations/design-brain.md`: preserve the product's information
  hierarchy and state transitions before adding test-specific affordances.
  This keeps the existing source → claim → experiment path intact and makes
  focus recovery observable rather than introducing a second navigation model.
- `foundations/product-craft-anti-ai-slop-operating-system.md`: the product
  object is a source-linked workpaper, not an activity console. This keeps the
  oracle on literal user actions and excludes fake progress, assistant status,
  and telemetry-like language from the implementation. Tradeoff: the test
  proves operation, not perceived intelligence or market appeal.
- `foundations/ai-native-ux-operating-system.md`: AI uncertainty and human
  review boundaries must remain visible. This keeps `Accept claim`, the
  experiment brief, and `Not covered` in the path; the deterministic fixture
  is never treated as model-quality evidence.
- `foundations/product-messaging-copy-operating-system.md`: labels and
  notices should state the action and its boundary. The verifier uses the
  visible English labels and the literal copied-Markdown notice, rather than
  hidden selectors or invented test copy.

**Assumptions:** Playwright and a local Chrome executable are available in this
runtime; native VoiceOver/NVDA/TalkBack and the Codex Chrome Extension are not
available for this run. The existing focus recovery is intentional product
behavior, not a test-only hook.

**Fastest evidence:** `npm run verify:keyboard` against the local production
preview, followed by the existing unit, build, static, responsive, edge, and
manifest gates plus fresh screenshot inspection.

## Constraints / out of scope

Must pass:

- First `Tab` reaches `Skip to main content`; `Enter` moves focus to
  `#main-content`.
- On the blank worksheet, keyboard activation opens the custom signal form;
  submitting the empty form focuses `#evidence-title`, exposes the warning,
  and keyboard `Cancel` closes the form.
- Keyboard activation opens the sample worksheet and restores focus to
  `#main-content` after the asynchronous local load.
- The responsive current action can be activated without a pointer: mobile
  uses the fixed action bar; desktop uses the source-sheet next-step card.
- The core path can be completed with keyboard activation only:
  `Start review → expand claim → Accept claim → Go to Decide → Draft smallest
  experiment → Export decision brief → Copy Markdown`.
- After each workflow step change, focus lands on the visible current action;
  no browser errors or failed requests are recorded.
- Fresh mobile and desktop screenshots are inspected for clipping, action
  ownership, and test-only focus artifacts.

Nice to have for this slice:

- Keep the oracle deterministic and dependency-free beyond the existing local
  Playwright/Chrome fallback.
- Emit a JSON-like result in stdout so the evidence can be copied into the
  QA manifest without relying on a screenshot as proof.

Should not build here:

- A new keyboard navigation model, roving tabindex, shortcut layer, or modal
  abstraction.
- Native VoiceOver/NVDA/TalkBack claims, Chrome Extension sign-off, physical
  device behavior, or a claim that the product is bug-free.
- Analytics, telemetry, user accounts, or any external submission.

## UX and trust rules

- Use the same literal English action labels a human sees; the oracle must not
  rely on hidden test-only controls or implementation-only copy.
- The source remains the visual and semantic anchor. Keyboard support should
  make the workpaper easier to operate, not add assistant-like progress copy.
- An empty form remains recoverable and preserves the user's local boundary;
  validation must not silently discard input.
- A copied Markdown notice is a local UI result, not proof that a decision was
  adopted or that the brief was correct.

## Execution Contract

### Files/surfaces

The implementation surface is intentionally narrow:

- **Create:** `scripts/verify-keyboard-flow.py`, this contract, the local QA
  report, and two fresh QA screenshots.
- **Modify:** `package.json`, `README.md`, `DESIGN.md`, and
  `docs/product/pm-signal-lab/qa-evidence-manifest-2026-08-16.json`.
- **Test:** `npm test -- --run`, `npm run lint`, `npm run build`,
  `npm run verify:hosted` against the local preview, `npm run verify:keyboard`,
  the existing source-truth/session-boundary/responsive/edge browser gates,
  JSON validation, and the QA manifest validator.
- **Observe:** fresh 390px and 1440px screenshots, visible source spine,
  focus target after each transition, form error recovery, browser errors,
  request failures, and no horizontal overflow.

The product source is not changed by this slice because the existing focus
recovery and semantic controls already satisfy the contract when exercised as
one flow.

### Task sequence

- [ ] Step 1 — Read the current focus transitions in `src/App.tsx` and map the
  blank, loading, Collect, Verify, Decide, and Ship controls. **Expected:** the
  oracle names only visible product controls and identifies mobile versus
  desktop current-action ownership.
- [ ] Step 2 — Add `scripts/verify-keyboard-flow.py` with a first-Tab skip-link
  trace, empty-form validation/cancel recovery, and keyboard activation for
  the full workflow. **Expected:** the script emits explicit focus/state
  results and fails on browser errors or failed requests.
- [ ] Step 3 — Add `verify:keyboard` to `package.json` and preserve the
  existing product implementation boundary. **Expected:** one command runs
  the same local fallback gate without adding a dependency or external call.
- [ ] Step 4 — Run the new gate at `390×844` and `1440×1000`, inspect both
  screenshots, and record the exact result in the QA report and manifest.
  **Expected:** both paths reach `Copy Markdown`; `browser_errors=[]` and
  `request_failures=[]`.
- [ ] Step 5 — Run the existing code, browser, JSON, manifest, and diff gates.
  **Expected:** all current local checks exit 0; canonical hosted, Chrome
  Extension, native AT, participant, and adoption boundaries remain labelled
  separately.

### Verification gate

The slice is locally green only when the command path below exits 0 and the
fresh screenshots pass human visual inspection:

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
git diff --check
```

**Expected:** domain tests, typecheck, production build, local hosted copy,
keyboard workflow, responsive and recovery traces, JSON parse, manifest
validation, and diff hygiene all pass; no external request or product-side
mutation occurs.

## Release gate

This contract is locally green only when the new oracle, existing domain and
browser checks, production build, visual inspection, and diff hygiene pass.
The candidate remains held for the separate canonical Pages, Chrome
Extension, native AT, participant, and adoption gates. No merge or deployment
is implied by this contract.

## UX/AI/security gate

- **First-time / empty:** first Tab reaches the skip link; an empty form names
  its required fields and returns focus to the first invalid field.
- **Loading:** the sample action is disabled while the local fixture opens;
  focus returns to `main-content` after the asynchronous state change.
- **Normal workflow:** Collect, Verify, Decide, and Ship each expose one
  visible current action for the tested viewport; the human review decision
  remains explicit.
- **Error / recovery:** empty-form submit preserves the local boundary and
  keyboard Cancel closes the form; clipboard copy remains a local notice with
  the Markdown fallback still present.
- **Mobile:** the fixed action bar owns the current action at 390px; the
  desktop next-step card owns it at 1440px; the trace checks no overflow.
- **Trust / AI:** the fixture is not model evidence, `Accept claim` is a human
  decision, and no success notice implies adoption, correctness, or external
  submission.
- **Security / permission:** no API key, secret, login, new permission,
  persistence, telemetry, network upload, GitHub mutation, or provider call is
  introduced; clipboard permission is used only in the local test context for
  the existing copy action.

## Risk and rollback

- **Risk:** a focus assertion can pass in headless emulation while a native
  screen reader or physical device behaves differently. **Mitigation:** keep
  native AT and device coverage explicitly unverified and do not promote this
  fallback to that layer.
- **Risk:** responsive CSS can expose two competing actions. **Mitigation:**
  select the viewport-specific visible current action and retain the existing
  one-action ownership assertions.
- **Rollback:** revert `scripts/verify-keyboard-flow.py`, the package script,
  the QA/docs/manifest entries, and the two screenshots. No migration,
  dependency, permission, or external-state cleanup is required.
