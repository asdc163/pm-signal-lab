# Mobile action context — local QA report

Date: 2026-08-16
Candidate: `codex/less-ai-editorial-sheet`
Scope: mobile action-strip context and the existing Decide precondition

## Result

The final local run passed 41/41 checks with no browser runtime or console errors.

The exploratory run before the fix found a real state mismatch: after a reviewed claim was taken directly to `Decide`, the action strip offered `Export decision brief` even though no experiment draft existed. The export path correctly refused the incomplete state, but the visible next action was premature. The candidate now keeps `Draft smallest experiment` visible until the draft exists, then changes to `Export decision brief`.

This slice does not add a feature or change the workflow model. It makes the visible next action agree with the current state.

## Environment and evidence boundary

- Local Vite production preview: `http://127.0.0.1:4173/`
- Isolated headless Google Chrome 151 through local CDP
- Viewports: `390×844`, `1024×900`, and `1440×900`
- This is scripted browser fallback evidence, not Chrome Extension evidence.
- It does not prove the canonical GitHub Pages deployment, native assistive technology output, real-device behavior, non-owner usage, or adoption.

## Executed behavior matrix

| State | Visible helper | Visible button | Result |
| --- | --- | --- | --- |
| Blank Collect | `Start with a source line` | `Open the sample worksheet` | PASS |
| Loaded Collect | `Read the source lines` | `Start review` | PASS |
| Verify | `Draft the smallest test` | `Draft smallest experiment` | PASS |
| Decide without experiment | `Draft the smallest test` | `Draft smallest experiment` | PASS |
| Decide with experiment | `Export the decision brief` | `Export decision brief` | PASS |
| Ship | `Inspect before copying` | `Copy Markdown` | PASS |

Additional browser checks:

- First mobile `Tab` reaches `Skip to main content`.
- Sample worksheet loads from the visible button.
- `View source` opens a `role=region` source excerpt.
- Review flow accepts a claim and marks it `Reviewed`.
- Decide precondition is exercised before drafting.
- Drafting the experiment changes the action strip before export.
- Export reaches `Ship` and exposes the copy action.
- Mobile action region accessible names match the visible button: `Next action: <button label>`.
- Mobile fixed action button height is at least 44px and remains in the viewport.
- No horizontal overflow at `390×844`, `1024×900`, or `1440×900`.
- Mobile action bar is hidden at `1024px` and `1440px` where the desktop/context actions remain available.
- Semantic checks: duplicate IDs none, dangling `aria-controls` none, unnamed visible controls none.
- Browser runtime/console errors: none.

## Screenshot evidence

- [Blank mobile](./assets/qa/mobile-action-context-local-blank-390-2026-08-16.png)
- [Loaded Collect mobile](./assets/qa/mobile-action-context-local-loaded-390-2026-08-16.png)
- [Ship mobile](./assets/qa/mobile-action-context-local-ship-390-2026-08-16.png)
- [Loaded desktop](./assets/qa/mobile-action-context-local-loaded-1440-2026-08-16.png)

## Static checks

- `npm test -- --run` — 4 files / 11 tests passed.
- `npm run lint` — TypeScript passed.
- `npm run build` — Vite production build passed.
- `git diff --check` — passed.
- KB contract score — `100/100`.

## Not covered

- Chrome Extension foreground control path.
- Native screen-reader speech and full assistive-technology profile.
- Real iOS Safari or Android Chrome device behavior.
- Hosted GitHub Pages behavior after merge/deploy.
- Real non-owner PM sessions, task ease scores, or repeated-user evidence.
- Adoption, traffic, stars, or any claim that the product is viral.

Local QA decision: **PASS for the changed action-context slice; public release remains HOLD until the separate hosted and human-evidence gates pass.**
