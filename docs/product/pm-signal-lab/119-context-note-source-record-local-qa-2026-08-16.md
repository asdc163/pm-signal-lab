# Context note source-record local QA

Date: 2026-08-16  
Candidate: `codex/less-ai-editorial-sheet`  
Scope: lower `DecisionContext` copy and visual treatment only  
Release status: local candidate passed; no hosted release approval

## Result

The lower worksheet note now names a visible `Source record` and reports a
concrete source-line/claim count. The blank state says `No source line yet` and
the loaded state says `Original words stay beside the decision.` The boundary
is literal (`Blank sheet` or `Local sheet`); the old `Source set · active`,
`Source set · empty`, `Current source set`, and context status dot are absent.

The slice did not change source data, current-action ownership, the
`Collect → Verify → Decide → Ship` path, Session note behavior, local receipt
content, persistence, network calls, or hosted deployment.

## Product and design checks

- The contract at [`118-context-note-source-record-contract-2026-08-16.md`](./118-context-note-source-record-contract-2026-08-16.md) scored `100/100` with the KB task compiler.
- The lower note follows the existing workpaper composition: source record → sheet count → question/rule → next mark.
- No new card, badge, status meter, gradient, glass, animation, telemetry, model state, confidence signal, or provider integration was added.
- The note keeps the mobile fixed bar as the only current primary action; desktop retains the existing single `Start review` action.

## Verification evidence

| Layer | Command / path | Result |
| --- | --- | --- |
| KB contract | `score_kb_plan.py ...118-context-note-source-record-contract-2026-08-16.md --min-score 85` | `100/100`; all 10 checks passed |
| Domain tests | `npm test -- --run` | 4 files, 11 tests passed |
| TypeScript | `npm run lint` | `tsc --noEmit` passed |
| Production build | `npm run build` | Vite build passed; `dist/assets/index-BDhoeK6X.js` and `dist/assets/index-DAgo-i-P.css` emitted |
| Local static copy | `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` | HTTP 200; `en-US`; current source-record copy present; old context copy absent; assets 200 |
| Blank + manual source | `npm run verify:source-truth` at `390×844` | `Worksheet note`; blank instruction present; old labels absent; `status_dot_count=0`; loaded `Source record`; `visible_current_actions=1`; browser errors/request failures empty |
| Blank + sample source | `npm run verify:source-truth` at `1440×1000` | Same context assertions; `4 source lines · 3 candidate claims`; `visible_current_actions=1`; hero action absent; owner field preserved |
| Keyboard workflow | `npm run verify:keyboard` at `390×844` and `1440×1000` | Skip link, invalid-form focus, cancel recovery, source disclosure, Verify, Decide, Ship, export/copy focus all passed; browser errors/request failures empty |
| Session boundary | `python3 scripts/verify-session-boundary.py` | Loading action disabled; static marker; form hidden during load; reset cleared disclosure; browser errors/request failures empty |
| Edge/recovery | `python3 /tmp/pm-signal-lab-edge-qa.py` | Empty validation/cancel, manual reset, refresh clear, and missing-evidence brief passed |
| Responsive/semantic | `python3 /tmp/pm-signal-lab-margin-qa.py` | `390`, `1024`, `1440` no horizontal overflow; semantic unnamed/duplicate/dangling/external arrays empty |
| Visual inspection | Fresh full-page screenshots below | Loaded mobile and desktop margin note inspected; no status rail or competing surface introduced |

## Fresh visual artifacts

- [Manual source sheet at 390px](./assets/qa/custom-source-sheet-truth-390-2026-08-16.png)
- [Sample source sheet at 1440px](./assets/qa/custom-source-sheet-truth-sample-1440-2026-08-16.png)
- [Keyboard workflow at 390px](./assets/qa/keyboard-flow-390-2026-08-16.png)
- [Keyboard workflow at 1440px](./assets/qa/keyboard-flow-1440-2026-08-16.png)

The inspected loaded screenshots show the source record aligned with the
worksheet margin, a quiet `Local sheet` boundary, and the existing red next
action only. The 390px screenshot keeps the fixed action bar separate from the
lower note and has no horizontal overflow.

## Correctly unverified or blocked

- Canonical Pages was checked separately with
  `HOSTED_URL=https://asdc163.github.io/pm-signal-lab/ npm run verify:hosted` and
  still fails: `Current hosted JavaScript is missing: Start with a source line`.
  The public URL serves the prior bundle; this slice was not merged or
  deployed.
- The preferred Codex Chrome Extension route remains unavailable in this
  runtime. The browser results above are Chrome via Playwright fallback and do
  not become Extension evidence.
- Native VoiceOver/NVDA/TalkBack speech, physical devices, zoom, and reduced
  motion were not executed.
- No non-owner PM sessions, comprehension study, adoption, traffic, or GitHub
  star movement was inferred from local QA.

## Next release gate

Keep PR #44 draft until the canonical Pages bundle is intentionally promoted
and the hosted verifier passes against the same candidate. After that, run the
prepared international PM session kit before making any claim about preference,
comprehension, adoption, or reduced AI feel.
