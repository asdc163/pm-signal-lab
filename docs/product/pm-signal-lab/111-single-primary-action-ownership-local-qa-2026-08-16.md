# PM Signal Lab — Single-primary-action ownership local QA — 2026-08-16

## Result

The action-ownership correction passes the local candidate gate. The loaded
worksheet now exposes one visible current action at the tested mobile and
desktop widths:

- `390×844`: the fixed bottom bar owns `Start review`; the source-row block
  keeps the next-step explanation but its duplicate button is not visible.
- `1440×1000`: the source-row `Next step` block owns `Start review`; the hero
  `Sheet tally` has no action button.

The source identity checks still pass, the workflow transition remains usable,
and no browser error or request failure was observed. This is local evidence,
not a hosted release or a non-owner usability result.

## Finding and fix

Fresh visual review found the same primary action repeated in multiple places:
the loaded desktop hero and source-row block both showed `Start review`; the
loaded mobile screen showed the source-row button and the fixed bottom action.
The correction removes only the duplicate render locations. It preserves the
existing `nextAction` callbacks, source-row explanation, fixed mobile action,
and downstream `Collect → Verify → Decide → Ship` flow.

## Acceptance matrix

| Case | Starting state and task | Expected oracle | Result | Evidence |
| --- | --- | --- | --- | --- |
| QA-ACTION-001 | Manual source saved at `390×844` | Exactly one visible `[data-current-action]`; source-row button hidden; fixed bar says `Start review` | PASS | `npm run verify:source-truth`; custom 390 screenshot |
| QA-ACTION-002 | Sample opened at `1440×1000` | Exactly one visible `[data-current-action]`; hero has no action button; source-row button remains | PASS | `npm run verify:source-truth`; sample 1440 screenshot |
| QA-ACTION-003 | Loaded normal flow at `390`, `1024`, `1440` | No horizontal overflow; mobile bar only appears at mobile breakpoint | PASS | `/tmp/pm-signal-lab-margin-qa.py` |
| QA-ACTION-004 | Source identity and owner regression | Manual/sample labels remain mutually exclusive; owner remains actionable | PASS | `npm run verify:source-truth` |
| QA-ACTION-005 | Loading, reset, and replacement | Existing action disablement, static marker, and clean reset remain intact | PASS | `python3 scripts/verify-session-boundary.py` |
| QA-ACTION-006 | Empty validation, manual reset, refresh, missing evidence | Existing recovery routes remain usable | PASS | `/tmp/pm-signal-lab-edge-qa.py` |
| QA-ACTION-007 | Production candidate and code hygiene | Tests, lint, build, local copy verifier, and diff check pass | PASS | Commands below |
| QA-ACTION-008 | Preferred Chrome Extension route | Same flow through the preferred extension harness | BLOCKED | Extension route unavailable in this runtime; Chrome fallback is recorded separately |
| QA-ACTION-009 | Native AT and physical device | VoiceOver/NVDA/TalkBack and touch behavior | NOT EXECUTED | No native AT or physical-device harness used |
| QA-ACTION-010 | Canonical Pages readback | Current action ownership is present on the public URL | BLOCKED | Pages still serves the prior bundle; merge/deploy requires explicit approval |
| QA-ACTION-011 | Non-owner PM preference | Participant can find the one next action without instruction | NOT EXECUTED | Pilot is prepared but no participant evidence was collected |

## Browser and visual evidence

Focused source-truth oracle output:

```text
custom_source_390:
  visible_current_actions=1
  source_row_action_hidden=true
sample_source_1440:
  visible_current_actions=1
  hero_action_absent=true
browser_errors=[]
request_failures=[]
```

Fresh artifacts:

- [manual source sheet at 390px](./assets/qa/custom-source-sheet-truth-390-2026-08-16.png)
- [fictional sample at 1440px](./assets/qa/custom-source-sheet-truth-sample-1440-2026-08-16.png)
- [loading guard at 390px](./assets/qa/session-boundary-loading-guard-loading-390-2026-08-16.png)

Visual review checked:

- first read: source title and source record remain ahead of the action;
- action hierarchy: one red primary action per tested viewport;
- source relationship: the desktop action stays beside the object it advances;
- mobile reflow: the fixed bar remains reachable and the source-row block does
  not leave a blank red-action gap;
- trust: no assistant badge, confidence meter, spinner, activity feed, or new
  status layer was introduced;
- responsive safety: no horizontal clipping or screenshot-only layout trick.

## Command evidence

All commands below ran against the current local production preview at
`http://127.0.0.1:4179/`, `en-US`, with synthetic privacy-safe input only.

```text
npm test -- --run
  4 files passed · 11 tests passed

npm run lint
  tsc --noEmit passed

npm run build
  Vite 7.3.6 · index-5r46Fikq.js · index-ByNjNY-f.css

HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted
  HTTP 200 · en-US · current copy present · stale copy absent
  canonical_https=false (expected for localhost)

npm run verify:source-truth
  visible_current_actions=1 at 390px and 1440px
  source_row_action_hidden=true at 390px
  hero_action_absent=true at 1440px
  browser_errors=[] · request_failures=[]

python3 scripts/verify-session-boundary.py
  loading/reset boundary passed
  sample_button_disabled_during_loading=true
  loading_marker_animation=none
  expanded_source_after_reset=false
  browser_errors=[] · request_failures=[]

python3 /tmp/pm-signal-lab-margin-qa.py
  blank → sample → source disclosure → Verify → accept → Decide → draft → Ship
  390/1024/1440 responsive checks passed; overflow=false; errors/failures=[]

python3 /tmp/pm-signal-lab-edge-qa.py
  empty validation, cancel, manual reset, refresh clear, missing evidence passed

git diff --check
  passed
```

## QA layer summary

| Layer | Status | Boundary |
| --- | --- | --- |
| Domain / type / build | PASS | No domain model or dependency changed. |
| Browser behavior | PASS | Playwright with local Google Chrome fallback; visible action-count and full workflow checks executed. |
| Responsive behavior | PASS for emulated widths | `390`, `1024`, and `1440` passed; physical device remains separate. |
| Accessibility semantics | PASS in fallback | Labels, focus path, landmarks, and hidden duplicate control were checked; native speech unexecuted. |
| Visual review | PASS for focused slice | Fresh 390/1440 screenshots inspected; no automated pixel baseline is claimed. |
| Security/privacy | PASS for current boundary | No external request, upload, persistence, secret, provider, or mutation added. |
| Hosted release | BLOCKED | Canonical Pages remains stale; no merge/deploy in this slice. |
| Chrome Extension | BLOCKED | Preferred harness unavailable. |
| Real PM learning | NOT EXECUTED | No non-owner participant sessions or preference evidence. |
| Adoption / stars | NOT EXECUTED | Local QA is not growth evidence; current public repo stats are not changed by this slice. |

## Rollback and next learning step

Rollback is a focused source/CSS/oracle revert; no data migration or external
cleanup is required. The next learning step is not another visual embellishment:
after an approved hosted release, run the prepared international PM sessions
and record whether users identify the source-row action on desktop and the
fixed action on mobile without a walkthrough.

This report does not claim the product is bug-free, hosted, officially
released, adopted, viral, or on a proven path to 10,000 GitHub stars.
