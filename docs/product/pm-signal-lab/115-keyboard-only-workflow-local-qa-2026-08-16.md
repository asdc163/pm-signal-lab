# Keyboard-only workflow local QA

Date: 2026-08-16 (Asia/Taipei)

Candidate: `codex/less-ai-editorial-sheet` · local candidate for PR #44

Contract: [`114-keyboard-only-workflow-contract-2026-08-16.md`](./114-keyboard-only-workflow-contract-2026-08-16.md)

## Result

PASS at the local browser-fallback layer.

The new verifier exercised the primary PM workflow with pointer-free keyboard
activation at both `390×844` and `1440×1000`:

```text
blank → first Tab skip link → main content → empty-form validation/recovery
→ open sample → Collect → Verify → expand claim → Accept claim
→ Decide → draft experiment → Ship → Copy Markdown
```

The local trace recorded:

- `skip_focused_after_first_tab=true`
- `skip_enter_focus_target=main-content`
- `title_invalid_focused=true`
- `form_closed_after_cancel=true`
- `loaded_focus_target=main-content`
- `verify_action_focus=true`
- `claim_expanded=true`
- `claim_reviewed=true`
- `decide_action_focus=true`
- `experiment_ready=true`
- `ship_action_focus=true`
- `markdown_notice_visible=true`
- the same assertions passed at both viewport widths;
- `browser_errors=[]` and `request_failures=[]`.

The responsive action ownership was exercised as part of the flow: the mobile
run used `.mobile-action-bar`, while the desktop run used the source-sheet
next-step control. The test did not click those controls; it focused them and
pressed `Enter`.

## Environment and boundary

- Local Vite production preview: `http://127.0.0.1:4179/`
- Locale: `en-US`
- Fixture: deterministic fictional support-draft worksheet
- Browser: Google Chrome executable through Playwright fallback, headless
- Viewports: `390×844`, `1440×1000`
- Permissions: local clipboard read/write for the final copy action
- Inputs: no private customer data; empty form and fixture data only

This is browser DOM/focus evidence. It is not native VoiceOver, NVDA,
TalkBack, Chrome Extension, physical-device, zoom, or screen-reader speech
evidence. The preferred Chrome Extension route is still unavailable in this
runtime, so no Extension claim is made.

## Visual inspection

Fresh screenshots were captured after the final keyboard action and inspected:

- [keyboard flow at 390px](./assets/qa/keyboard-flow-390-2026-08-16.png)
- [keyboard flow at 1440px](./assets/qa/keyboard-flow-1440-2026-08-16.png)

Observed:

- The mobile fixed action bar remains the single visible current action and
  does not obscure the decision brief's readable content.
- The desktop layout keeps the brief, export controls, pilot note, and context
  note in a quiet workpaper hierarchy.
- The blue focus ring in the captures is on the final `Copy Markdown` control,
  which is the expected keyboard state at the end of the trace; it is not
  product copy or a loading indicator.
- No assistant badge, model trace, confidence meter, spinner, or generated
  progress language was introduced.

## Command evidence

```text
KB plan score
  score_kb_plan.py .../114-keyboard-only-workflow-contract-2026-08-16.md --min-score 85
  KB plan score: 100/100

npm test -- --run
  4 files passed · 11 tests passed

npm run lint
  tsc --noEmit passed

npm run build
  Vite 7.3.6 · index-o7prm33y.js · index-CcoUeL_C.css

npm run verify:keyboard
  blank recovery passed
  mobile_390 passed
  desktop_1440 passed
  browser_errors=[] · request_failures=[]

python3 scripts/verify-session-boundary.py
  pass; disabled loading action, static marker, reset, and disclosure reset

python3 /tmp/pm-signal-lab-margin-qa.py
  pass; blank → sample → source disclosure → Verify → Decide → Ship
  390/1024/1440; overflow=false; errors/failures=[]

python3 /tmp/pm-signal-lab-edge-qa.py
  pass; empty validation, cancel, manual reset, refresh clear, missing evidence

git diff --check
  pass
```

## Evidence matrix

| Surface | Result | Evidence boundary |
| --- | --- | --- |
| Skip link and main landmark | PASS | Chrome fallback focus trace |
| Empty-form validation | PASS | First invalid field receives focus; warning remains visible |
| Cancel recovery | PASS | Keyboard cancel closes the form |
| Async sample load | PASS | Focus returns to `main-content` |
| Collect → Verify | PASS | Current action and claim expansion activated by keyboard |
| Human review gate | PASS | `Accept claim` changes the claim to `Reviewed` |
| Verify → Decide | PASS | Current action focus is restored |
| Experiment draft | PASS | Owner field and brief are present |
| Decide → Ship | PASS | Export changes step and restores current action focus |
| Markdown copy | PASS | Clipboard notice appears after keyboard activation |
| Responsive geometry | PASS for emulated widths | 390px and 1440px; physical device remains separate |
| Native screen reader | NOT EXECUTED | No native AT harness used |
| Chrome Extension | BLOCKED | Preferred control surface unavailable |
| Canonical Pages | BLOCKED | Hosted bundle remains stale; no merge/deploy performed |
| Non-owner PM comprehension | NOT EXECUTED | No participant sessions in this run |
| Adoption / GitHub stars | NOT EXECUTED | Local QA is not growth evidence |

## Follow-up

The next meaningful gate is not another cosmetic pass. It is a fresh hosted
release readback after explicit approval to merge/deploy, followed by the
prepared international PM sessions and a separate native AT pass. Until those
layers are executed, this remains a well-checked local candidate rather than a
released or adopted product.

This report does not claim the product is bug-free, hosted, officially
released, adopted, viral, or on a proven path to 10,000 GitHub stars.
