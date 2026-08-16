# PM Signal Lab — Session note progressive disclosure local QA — 2026-08-16

## Result

The optional session receipt is now subordinate to the source-first worksheet.
The loaded manual and fictional sample states show a native `Session note`
summary with `Optional local receipt`; the existing receipt and manual report
controls are hidden until the summary is opened. The event state, receipt
contents, feedback URL, workflow, and privacy boundary were not changed.

This is a local candidate result. It does not prove hosted release, native
screen-reader speech, physical-device behavior, non-owner comprehension, or
adoption.

## Finding and fix

The always-open `Recent action` / `Last action below` strip looked like
telemetry or an agent trace even though it only described a local owner-run
receipt. That operational detail competed with the source, claim, limitation,
and next test.

The focused fix uses native `<details>` / `<summary>` markup:

- `Session note` and `Optional local receipt` are visible by default.
- The existing `Recent action`, last-action text, receipt copy button, and
  manual report link stay inside the same local-only body.
- Keyboard `Enter` opens and closes the disclosure; focus remains visible
  while the summary is focused.
- No model, provider, analytics, persistence, permission, network request, or
  new workflow was added.

## Acceptance matrix

| Case | Starting state and task | Expected oracle | Result | Evidence |
| --- | --- | --- | --- | --- |
| QA-NOTE-001 | Manual source saved at `390×844` | Summary is closed; body controls are hidden | PASS | `npm run verify:source-truth`; fresh mobile screenshot |
| QA-NOTE-002 | Fictional sample opened at `1440×1000` | Summary is closed; source record remains the visual anchor | PASS | `npm run verify:source-truth`; fresh desktop screenshot |
| QA-NOTE-003 | Focus summary and press `Enter` | Native disclosure opens; receipt and report controls are visible | PASS | Focused browser oracle: `opened_by_keyboard=true`, both controls visible |
| QA-NOTE-004 | Press `Enter` again | Disclosure closes and body is hidden again | PASS | Focused browser oracle: `closed_after_keyboard=true`, `body_hidden_after_close=true` |
| QA-NOTE-005 | Loaded normal flow at `390`, `1024`, `1440` | No horizontal overflow; mobile action ownership remains unchanged | PASS | `/tmp/pm-signal-lab-margin-qa.py` |
| QA-NOTE-006 | Loading, reset, and recovery cases | Existing boundaries remain usable | PASS | `verify-session-boundary.py` and `/tmp/pm-signal-lab-edge-qa.py` |
| QA-NOTE-007 | Build and static copy gate | Tests, lint, build, local copy, and diff checks pass | PASS | Commands below |
| QA-NOTE-008 | Preferred Chrome Extension route | Same flow through the Extension harness | BLOCKED | Extension control is unavailable in this runtime; Chrome fallback is recorded separately |
| QA-NOTE-009 | Native assistive technology / physical device | VoiceOver/NVDA/TalkBack and touch behavior | NOT EXECUTED | No native AT or physical-device harness was used |
| QA-NOTE-010 | Canonical Pages readback | Current Session note bundle is public | BLOCKED | Pages still serves the prior bundle; merge/deploy is not authorized in this slice |
| QA-NOTE-011 | Non-owner PM comprehension | Participants discover the optional note without instruction | NOT EXECUTED | No participant sessions were collected |

## Browser and visual evidence

The focused source-truth oracle ran against the local Vite production preview at
`http://127.0.0.1:4179/` with `en-US` and privacy-safe synthetic input:

```text
custom_source_390.session_note:
  summary_text="Session note Optional local receipt"
  initial_closed=true
  initial_body_hidden=true
  summary_focused=true
  opened_by_keyboard=true
  receipt_visible_when_open=true
  report_visible_when_open=true
  closed_after_keyboard=true
  body_hidden_after_close=true

sample_source_1440.session_note:
  summary_text="Session note Optional local receipt"
  initial_closed=true
  initial_body_hidden=true
  summary_focused=true
  opened_by_keyboard=true
  receipt_visible_when_open=true
  report_visible_when_open=true
  closed_after_keyboard=true
  body_hidden_after_close=true

browser_errors=[]
request_failures=[]
```

Fresh screenshots were inspected after the keyboard oracle closed and blurred
the summary, so the captured default state does not include a test-only focus
ring:

- [manual source sheet at 390px](./assets/qa/custom-source-sheet-truth-390-2026-08-16.png)
- [fictional sample at 1440px](./assets/qa/custom-source-sheet-truth-sample-1440-2026-08-16.png)
- [loaded mobile recovery state](./assets/qa/session-boundary-loading-guard-loaded-390-2026-08-16.png)
- [clean reset state](./assets/qa/session-boundary-loading-guard-reset-390-2026-08-16.png)

Visual review checked:

- source title, source record, and next-step block remain ahead of the
  optional note;
- the note reads as an operational footnote rather than a status wall;
- the summary uses a visible text/icon state and a keyboard focus outline;
- the body does not add a second action or alter mobile CTA ownership;
- no assistant badge, confidence meter, spinner, activity feed, or model trace
  was introduced;
- 390px and 1440px layouts remain readable without clipping.

## Command evidence

```text
KB plan score
  score_kb_plan.py .../112-session-note-progressive-disclosure-contract-2026-08-16.md --min-score 85
  KB plan score: 100/100

npm test -- --run
  4 files passed · 11 tests passed

npm run lint
  tsc --noEmit passed

npm run build
  Vite 7.3.6 · index-C4geDNrd.js · index-CcoUeL_C.css

HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted
  HTTP 200 · en-US · current copy present · stale copy absent
  canonical_https=false (expected for localhost)

npm run verify:source-truth
  custom/source boundary passed at 390px; sample/source boundary passed at 1440px
  session note closed → keyboard open → keyboard closed passed in both states
  visible_current_actions=1; owner_value=Owner to confirm before the test
  browser_errors=[] · request_failures=[]

python3 scripts/verify-session-boundary.py
  loading/reset boundary passed; browser_errors=[] · request_failures=[]

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
| KB application plan | PASS | Contract scored `100/100`; this does not replace user evidence |
| Domain / type / build | PASS | No domain model or dependency changed |
| Browser behavior | PASS | Playwright with local Google Chrome fallback; keyboard open/close and existing workflow executed |
| Responsive behavior | PASS for emulated widths | `390`, `1024`, and `1440` passed; physical device remains separate |
| Accessibility semantics | PASS in fallback | Native summary focus/toggle, labels, duplicate IDs, dangling references, and overflow checked; native speech unexecuted |
| Visual review | PASS for focused slice | Fresh 390/1440 screenshots inspected; no automated pixel baseline is claimed |
| Security/privacy | PASS for current boundary | No external request, upload, persistence, secret, provider, or mutation added |
| Hosted release | BLOCKED | Canonical Pages remains stale; no merge/deploy in this slice |
| Chrome Extension | BLOCKED | Preferred harness unavailable |
| Real PM learning | NOT EXECUTED | No non-owner participant sessions or comprehension evidence |
| Adoption / stars | NOT EXECUTED | Local QA is not growth evidence |

## Rollback and next learning step

Rollback is a focused `App.tsx` / `styles.css` / oracle / docs revert. No data
migration or external cleanup is required. The next learning step is to run
the prepared international PM sessions after an approved hosted release and
ask whether the optional receipt is discoverable without distracting from the
source-backed decision path.

This report does not claim the product is bug-free, hosted, officially
released, adopted, viral, or on a proven path to 10,000 GitHub stars.
