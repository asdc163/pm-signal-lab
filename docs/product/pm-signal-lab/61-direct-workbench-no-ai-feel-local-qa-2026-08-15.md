# Direct Workbench No-AI-Feel Local QA

Date: 2026-08-15
Checked at: `2026-08-15T07:26:21Z`
Surface: local Vite app at `http://127.0.0.1:5177/`
Route: Codex Chrome Extension
Chrome context: fresh controlled `psVisualAuditTab` tab in the existing Chrome session
Focus behavior: run stayed in the controlled tab and avoided stealing foreground focus
Forbidden-route check: no Safari, Browser Use, Browserbase/browse.sh, or alternate Chrome devtools bridge was used.

## Product QA Report

This is a focused local QA record for the visual and copy refinement in
`60-direct-workbench-no-ai-feel-contract-2026-08-15.md`. It does not replace the
broader workflow evidence in `58-single-sheet-workbench-second-polish-local-qa-2026-08-15.md`.

## Behavior Matrix

| user archetype | job | starting state | success signal | failure signal | recovery expectation |
|---|---|---|---|---|---|
| International PM on desktop | Understand what starts the worksheet | Fresh empty page at 1280px | `Open the sample worksheet` and `Add your own signal` are visible; the source quote explains the boundary | The first action looks like a generic AI prompt or is hidden in status chrome | Use the visible sample or own-signal action |
| Evidence reviewer | Read a source before reviewing a claim | Sample worksheet loaded at 1280px | `Working set`, `Read the source lines before the claim`, `01–04 folios`, source rows, and `Start review` are visible | A repeated dashboard label competes with the source rows or the folio range is unclear | Open `View source`; the row changes to `Hide source` |
| Cautious PM | Check the trust boundary after a state change | Loaded sample, then reset | Reset returns to the empty worksheet and shows a concrete recovery notice | Reset loses the original path or leaves stale loaded evidence visible | `Workspace reset. Open the sample worksheet or add your own signal.` |
| Mobile PM | Start and continue without a desktop layout | Fresh and loaded page at 390×844 | Mobile stepper, sample CTA, source-first layout, and sticky `Start review` remain reachable | Horizontal clipping hides the action or the sticky action covers the work | Use the top stepper, sticky action, or scroll to the source rows |
| Keyboard user | Move through controls without a pointer | Empty page after reset | Tab traversal reaches controls and the focused session receipt button shows a visible outline | Focus disappears or recovery controls cannot be reached | Continue with Tab / Shift+Tab; report native assistive-technology behavior separately |

## Findings

### No blocking finding in the executed scope

- Severity: none observed.
- User/job affected: first-run comprehension, source-ledger scanning, and
  reset recovery.
- Likely user interpretation: the page reads as a source-backed worksheet;
  the sample is an explicit starting artifact rather than an invisible AI
  process.
- Hesitation / friction: the lower desk note remains information-dense on
  desktop, but it is below the workpaper and no longer competes with a second
  source-ledger frame.
- Recovery: `View source` / `Hide source` and `Reset this set` were both
  exercised; the reset path returned to an empty state with the sample action.
- Trust: the local-only boundary, source identity/date/limitation, and manual
  session handoff remained visible.
- Evidence: fresh screenshots and DOM-CUA snapshots from the controlled Chrome
  tab; local typecheck, tests, and build also passed after the diff.
- Fix brief: no additional fix is required before the hosted review of this
  bounded change. Revisit the desk note only if non-owner sessions report
  hesitation there.

## Repro Steps

1. Open `http://127.0.0.1:5177/` in a fresh controlled Chrome Extension tab.
2. At desktop width, confirm the empty hero, sample CTA, own-signal CTA, and
   local-only boundary.
3. Select `Open the sample worksheet`.
4. Confirm the loaded source surface reads `Working set`,
   `Read the source lines before the claim`, and `01–04 folios`.
5. Expand the first source; confirm the control changes to `Hide source`.
6. Select `Reset this set`; scroll to the top if the controlled action retains
   the prior position, then confirm the empty recovery notice and sample CTA.
7. Set the viewport to 390×844 and reload. Confirm the mobile stepper and
   sticky sample action; load the sample and confirm the sticky `Start review`.
8. Use Tab twice from the reset state and confirm the visible focus outline on
   the reachable session receipt control.

## Expected vs Actual

| Check | Expected | Actual |
|---|---|---|
| First run | One literal sample action and one own-signal path | PASS: both were visible; DOM-CUA exposed `Open the sample worksheet` and `Add your own signal`. |
| Loaded hierarchy | Source rows are the main artifact; repeated `Source ledger` chrome is removed | PASS: loaded screenshot showed `Working set`, direct source instruction, `01–04 folios`, and the rows. |
| Source recovery | Expanded row can collapse again | PASS: `View source` changed to `Hide source`. |
| Reset recovery | Empty state returns with an explanatory notice | PASS: reset returned the empty workbench and showed `Workspace reset. Open the sample worksheet or add your own signal.` |
| Mobile first run | CTA is visible and not covered by the bottom action | PASS: 390×844 screenshot showed the sample CTA in the sticky bar. |
| Mobile loaded | Next action remains available | PASS: 390×844 screenshot showed sticky `Start review`. |
| Keyboard baseline | Focus remains visible during traversal | PASS: screenshot showed a visible focus outline on `Copy session receipt`. |
| Loading wording | Transient state uses concrete worksheet language | PASS in source/build copy; the transient visual frame was not captured directly because the extension click call waited until the short loading transition completed. |

## Local Gates

- `npm test -- --run`: PASS — 4 files, 10 tests.
- `npm run lint`: PASS — `tsc --noEmit`.
- `npm run build`: PASS — Vite transformed 1,585 modules and emitted a fresh
  hashed bundle.
- `git diff --check`: PASS.
- `verify:hosted`: not run after this local diff; the canonical hosted page
  still represents the previous merged commit until this change is reviewed,
  merged, deployed, and rechecked.

## Not Covered

- Native VoiceOver, NVDA, TalkBack, or other screen-reader output.
- Physical-device touch, share sheet, save-to-Photos, or keyboard hardware.
- Forced loader failure, denied clipboard permission, or network interruption
  at the exact transient frame.
- Non-owner PM comprehension, task completion, field notes, retention,
  adoption, traffic, stars, or the 10,000-star target.
- GitHub Pages deploy behavior for this diff; it requires the post-merge hosted
  verification gate.

## Release acceptance criteria

Do not describe this refinement as released until the PR has passed CI, GitHub
Pages has deployed from `main`, `npm run verify:hosted` passes against
`https://asdc163.github.io/pm-signal-lab/`, and a fresh hosted tab confirms the
same empty and loaded hierarchy. Keep the not-covered items above explicit in
the hosted release audit.
