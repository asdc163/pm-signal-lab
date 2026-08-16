# Literal worksheet language — local QA report

Date: 2026-08-16
Candidate: `codex/less-ai-editorial-sheet`
Scope: copy-only product language slice from [92-literal-worksheet-language-contract-2026-08-16.md](./92-literal-worksheet-language-contract-2026-08-16.md)

## Result

Local candidate verification passed: 53/53 checks, with no browser runtime or console errors.

The slice changes visible shell language from abstract system/workbench terms to literal worksheet language:

- `Local worksheet`
- `Source review`
- `Current step`
- `Source set`
- `Recent action`
- `Sheet note`
- `In this sheet`

The workflow, state transitions, event names, source handling, privacy boundary, and review gate were not changed.

## Executed coverage

Harness: isolated headless Google Chrome 151 over local CDP, pointed at the Vite production preview at `http://127.0.0.1:4173/`. This is not Chrome Extension evidence and does not prove the GitHub Pages deployment.

### Desktop, 1280 × 900

- Blank state renders `Start with a source line` and `Local worksheet`.
- Old shell labels are absent: `Working sheet`, `Current work`, `Review state`, `Working set`, `Session trace`.
- `Current step` is present as both visible status copy and the status region `aria-label`.
- First keyboard `Tab` reaches `Skip to main content`.
- Sample worksheet opens and renders `Source review`, `Source set`, `Recent action`, `Sheet note`, and `In this sheet`.
- Page title remains singular and correct: `Support draft review`.
- `View source` expands the source excerpt region and changes to `Hide source`.
- No horizontal overflow.

### Review gate

- `Start review` opens `Verify`.
- Attempting `Decide` before review leaves the current step at `Verify`.
- `Accept claim` produces the visible `Reviewed` state.
- `Decide` becomes reachable only after the claim is reviewed.

### Mobile, 390 × 844

- Sample worksheet opens without horizontal overflow.
- The same literal worksheet labels are present and the old shell labels remain absent.
- The source record is visible.
- The fixed bottom action bar and its enabled current action are inside the viewport.
- Semantic checks are clean:
  - duplicate IDs: none
  - dangling `aria-controls`: none
  - unnamed visible controls: none
  - landmarks present for workflow, worksheet, and context

## Evidence files

- [Blank desktop screenshot](./assets/qa/literal-worksheet-language-local-blank-1280-2026-08-16.png)
- [Loaded desktop screenshot](./assets/qa/literal-worksheet-language-local-loaded-1280-2026-08-16.png)
- [Loaded mobile screenshot](./assets/qa/literal-worksheet-language-local-loaded-390-2026-08-16.png)

## Static checks paired with this report

- `npm test -- --run` — passed, 4 files / 11 tests.
- `npm run lint` — passed.
- `npm run build` — passed.
- `git diff --check` — passed.
- Fresh bundle scan — all seven required new labels present; all five retired shell labels absent.
- Hosted verifier — still fails because the canonical GitHub Pages bundle is an earlier preview and does not contain the current candidate copy. This remains a release hold, not a local candidate failure.

## Not covered

- Chrome Extension control path.
- Native screen-reader or assistive-technology pass.
- Real mobile Safari/Chrome device behavior.
- Non-owner PM sessions.
- Canonical GitHub Pages behavior after merge/deploy.
- Adoption, stars, traffic, or any claim that this candidate is viral.
