# Product QA Report — quiet utility / source-first slice — 2026-08-16

## Result

The current local candidate passed the final static and behavior checks for
the narrow source-first slice. The loaded desktop first viewport now exposes
the existing `Start review` action in the status block; mobile keeps the
existing fixed action bar. No open product blocker or high-severity finding was
observed in this run.

This is local candidate evidence only. It is not hosted-release, Chrome
Extension, native screen-reader, non-owner session, adoption, or GitHub-star
evidence.

## Environment

- Repository: `asdc163/pm-signal-lab`
- Local route: `http://127.0.0.1:4173/` from the Vite production preview
- Build assets: `dist/assets/index-iXy2tJUr.js`,
  `dist/assets/index-2TCPZDAf.css`
- Browser: isolated Google Chrome headless CDP session, viewport
  `1280×900` and `390×844`, with `scrollY=0` explicitly set before first-
  viewport screenshots
- Browser route: Codex Chrome Extension was unavailable in this session; an
  isolated Chrome CDP fallback was used without touching the user's foreground
  tab. Computer Use was not used. No Safari, Browser Use, Browserbase,
  `browse.sh`, or other alternate browser route was used.
- Fresh screenshots:
  - [blank desktop](./assets/qa/quiet-utility-source-first-local-blank-1280-2026-08-16.png)
  - [loaded desktop](./assets/qa/quiet-utility-source-first-local-loaded-1280-2026-08-16.png)
  - [blank mobile](./assets/qa/quiet-utility-source-first-local-blank-390-2026-08-16.png)
  - [loaded mobile](./assets/qa/quiet-utility-source-first-local-loaded-390-2026-08-16.png)

## Behavior Matrix

| user archetype | job to be done | starting state | success signal | failure signal / hesitation | recovery expectation |
|---|---|---|---|---|---|
| New PM or founder | Understand what the tool is and what to do next | Blank first visit | Sees `Start with a source line`, a concrete source-line instruction, and the sample action | Generic AI promise, unclear first action, or horizontal overflow | Open the sample or add one line; refresh remains a clear reset |
| PM reviewing a signal pack | Find the source record and choose the next review action | Loaded sample at top of page | Sees the case once, `Source lines to check`, source rows, and desktop `Start review` at `y=303–347` | Repeated case framing or a next action hidden below the first viewport | Use `Start review`, expand `View source`, or remain in Collect |
| Low-trust reviewer | Check whether a claim is supported before drafting a test | Collect → Verify | Decide remains on Verify until one claim receives an explicit human action | A claim appears validated automatically or source mapping disappears | Accept, edit, keep as hypothesis, or mark missing evidence |
| Mobile PM | Read the case and reach the current action with one hand | Loaded sample at `390×844`, `scrollY=0` | `Source record` at `y=618.86`, first row starts at `y=655.95`, fixed action is `y=798–844`, no horizontal overflow | Clipped source title, fixed action off screen, or hidden controls | Scroll the workpaper; fixed action remains reachable |
| Keyboard / accessibility user | Enter the work area and operate named controls | Blank first visit | First Tab reaches `Skip to main content`; visible controls have names; disclosure targets resolve | Focus disappears, unnamed control, duplicate ID, or dangling `aria-controls` | Follow the labelled landmark and use the same visible actions |

## Findings

### No open product findings

- **Severity:** none observed in the final candidate.
- **User/job affected:** all matrix users above.
- **Likely user interpretation:** the surface reads as a source-review utility,
  not as a model activity dashboard or marketing page.
- **Hesitation/friction:** the prior desktop placement of `Start review` was
  below the source list; the final candidate places the existing action in the
  loaded status block. This was rechecked after the implementation change.
- **Recovery:** the source disclosure, workflow guard, reset, privacy gate,
  and mobile fixed action all remained available.
- **Trust:** no model activity, validation, adoption, or automatic submission
  claim was introduced.
- **Evidence:** final desktop behavior run, final mobile behavior run, fresh
  screenshots, semantic snapshot, and zero captured console/protocol errors.
- **Fix brief / acceptance criteria:** no further fix is required for this
  slice. Preserve the desktop status CTA, mobile-only fixed action placement,
  source-to-claim gate, and the no-AI-feel copy scan in future changes.

### QA harness notes, not product findings

The first two inline harness attempts were discarded because they used an
unsupported Chrome Runtime command, then serialized a DOM element instead of a
boolean. A later selector assumed every experiment input had an `id`; the
actual `Primary metric` control is correctly associated through its visible
label. The helper was corrected to use boolean wait oracles, label-based field
selection, and an explicit `scrollY=0` before screenshots. The final report uses
only the corrected runs; none of these harness issues changed product code or
is counted as a product pass.

## Repro Steps

1. Run `npm run build` and `npm run preview -- --host 127.0.0.1 --port 4173`.
2. Open `http://127.0.0.1:4173/` in the isolated Chrome fallback at
   `1280×900`; set scroll position to `0`.
3. Confirm the blank state, first-use copy, no horizontal overflow, and first
   Tab skip-link focus.
4. Open `Add your own signal`, submit the empty form, confirm three
   `aria-invalid="true"` controls and a clear title error, then cancel.
5. Select `Open the sample worksheet`. Confirm the loaded case title occurs
   once in the page context, old loaded labels are absent, and the status block
   exposes `Start review`.
6. Expand the first `View source` control. Confirm `aria-expanded="true"` and
   a live `aria-controls` target.
7. Select the status-block `Start review`. Attempt `Decide`; confirm the step
   remains `Verify` until a claim is accepted. Accept one claim and enter
   `Decide`.
8. Draft the smallest experiment. Locate `Primary metric` by its label, edit
   it to `Weekly source-backed resolution rate`, and confirm the value remains
   after the controlled input update.
9. Export the decision brief, open `Open pilot note`, submit once without the
   privacy confirmation, and confirm no field note is prepared. Confirm the
   privacy checkbox, prepare the field note, and exercise `Copy field note`.
10. Refresh and confirm the local worksheet returns to the blank state.
11. Repeat the first-use/load checks at `390×844` with `scrollY=0`. Confirm
   `scrollWidth=375` is within the viewport, `Source record` and the first row
   are in the first viewport, the fixed action is `y=798–844`, and the desktop
   hero action is hidden on mobile.

## Expected vs Actual

| surface | expected | actual | result |
|---|---|---|---|
| Blank first run | Concrete source-line job, sample action, no overflow | `Start with a source line`, `Write down one line you can defend.`, sample action; desktop scroll width `1265 ≤ 1280`, mobile `375 ≤ 390` | PASS |
| First keyboard entry | First Tab reaches the skip link | `A`, text `Skip to main content`, `href=#main-content` | PASS |
| Loaded hierarchy | Case once → source section → next review | Full pack title count `1`; `Source lines to check`, `Source record`, and `Check the source` visible; old framing labels absent | PASS |
| Desktop next action | Existing `Start review` is visible without scrolling the source list | Status-block button exists at `y=303.08`, bottom `347.08` | PASS |
| Source disclosure | Expanded control points to an existing target | `aria-expanded=true`, target `source-evidence-interview-01` exists | PASS |
| Review guard | Decide is blocked before a human claim decision | Current step stayed `Verify`; after `Accept`, `Decide` became available | PASS |
| Experiment edit | Primary metric remains editable | Label-based input retained `Weekly source-backed resolution rate` | PASS |
| Privacy / handoff | Unconfirmed note is blocked; confirmed note is inspectable and manual | Privacy block, field note, copy fallback, and manual feedback boundary observed | PASS |
| Recovery | Refresh returns to blank local state | `Start with a source line` returned; loaded workbench removed | PASS |
| Semantic safety | No duplicate IDs, dangling disclosure target, or unnamed visible control | `duplicates=[]`, `dangling=[]`, `unnamed=[]`; labelled `NAV` and `MAIN` landmarks | PASS |
| Browser runtime | No console/protocol errors | `0` captured errors/warnings in final desktop/mobile runs | PASS |

## Static Verification

- `npm test -- --run`: exit `0`; 4 test files, 11 tests passed.
- `npm run lint`: exit `0`; TypeScript check passed.
- `npm run build`: exit `0`; fresh JS asset `index-iXy2tJUr.js` emitted.
- `git diff --check`: exit `0`.

## Not Covered

- Codex Chrome Extension control was unavailable in this session. The CDP
  fallback proves local browser behavior only; it does not prove the preferred
  Extension route.
- Native screen-reader speech, VoiceOver rotor behavior, and physical-device
  touch behavior were not executed.
- Hosted Pages still needs a separately authorized merge/deploy and a fresh
  canonical HTTPS/browser verification. The current hosted bundle is not
  promoted by this report.
- No non-owner PM session, real user hesitation, retention, conversion,
  adoption, GitHub traffic, fork, or star-growth result was observed.
- No network timeout or permission-denial path applies to this local-first
  static candidate; external provider behavior remains out of scope.

## Release decision

`LOCAL CANDIDATE: PASS` for this copy, hierarchy, desktop CTA, mobile, semantic,
and existing workflow slice. `HOSTED: HOLD`. `CHROME EXTENSION: 未驗證`.
`NATIVE SCREEN READER: 未驗證`. `REAL USER / ADOPTION / STARS: 未驗證`.
