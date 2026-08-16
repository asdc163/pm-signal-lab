# Product QA Report — evidence-ledger quiet-colour slice — 2026-08-16

## Result

`LOCAL CANDIDATE: PASS` for the narrow evidence-ledger colour slice. The
loaded worksheet now uses neutral shell labels, trust blue for source and
provenance metadata, and red for the human review action. The existing
workflow, review gate, local boundary, mobile action, and semantic structure
remain operable.

This is local candidate evidence only. It is not hosted-release, Chrome
Extension, native screen-reader, non-owner session, adoption, or GitHub-star
evidence.

## Change under test

- Contract: [`90-evidence-ledger-quiet-colour-contract-2026-08-16.md`](./90-evidence-ledger-quiet-colour-contract-2026-08-16.md)
- Surfaces: `src/styles.css` loaded-state colour roles and mobile stepper role;
  `DESIGN.md` design-system record.
- No JSX, dependency, data, provider, persistence, tracking, workflow, or
  external submission path changed.

## Environment

- Repository: `asdc163/pm-signal-lab`
- Local route: `http://127.0.0.1:4173/` from the Vite production preview
- Browser: isolated Google Chrome headless CDP fallback, Chrome `151.0.7922.138`
- Viewports: `1280×900` and `390×844`; `scrollY=0` explicitly asserted before
  first-viewport captures
- Browser route: Codex Chrome Extension was unavailable in this session. The
  isolated CDP session did not touch the user's foreground tab. Computer Use,
  Safari, Browser Use, Browserbase, `browse.sh`, and alternate browser routes
  were not used.
- Fresh visual evidence:
  - [blank first run](./assets/qa/evidence-ledger-quiet-colour-local-blank-1280-2026-08-16.png)
  - [loaded desktop](./assets/qa/evidence-ledger-quiet-colour-local-loaded-1280-2026-08-16.png)
  - [loaded mobile](./assets/qa/evidence-ledger-quiet-colour-local-loaded-390-2026-08-16.png)

## Behavior matrix

| archetype | job | starting state | success signal | result |
|---|---|---|---|---|
| New PM or founder | Understand the first source-line job | Blank desktop | First-run copy, sample action, no overflow, and first Tab skip link are available | PASS |
| PM reviewing a signal pack | Identify provenance and start review | Loaded desktop | Case title is one `h1`; source record is visible; current action is visible; source disclosure resolves | PASS |
| Low-trust reviewer | Prevent an unreviewed claim from reaching Decide | Collect → Verify | Decide remains blocked until `Accept claim` marks the claim `Reviewed`; Decide then opens | PASS |
| Mobile PM | Read the source and reach the action with one hand | Loaded `390×844` | Source record is in the first viewport; fixed action is reachable; current step uses trust blue; no overflow | PASS |
| Keyboard / semantic user | Enter and operate named controls | Blank and loaded | Skip link, no duplicate IDs, no dangling controls, no unnamed visible controls | PASS |

## Visual colour oracle

Fresh computed-style checks matched the intended tokens:

| role | observed value | result |
|---|---|---|
| topbar shell label | `rgb(98, 107, 109)` | PASS — neutral muted ink |
| loaded hero label | `rgb(98, 107, 109)` | PASS — neutral muted ink |
| loaded review step | `rgb(29, 95, 168)` | PASS — trust blue |
| loaded subject label | `rgb(29, 95, 168)` | PASS — provenance blue |
| source index | `rgb(29, 95, 168)` | PASS — provenance blue |
| primary review action background | `rgb(214, 75, 56)` | PASS — action red |
| mobile current step number | `rgb(29, 95, 168)` | PASS — desktop/mobile role parity |

The red accent remains on the existing review action and next-action marker;
no new red status, model activity, confidence, or automatic-validation cue was
introduced.

## Fresh browser checks

The final run completed `36` checks with no assertion failures:

- blank state title and first-viewport scroll reset
- blank desktop horizontal overflow
- first Tab reaches `Skip to main content`
- blank form validation preserves the field and reports `evidence-title`
- loaded state, single `h1`, and loaded first-viewport scroll reset
- loaded desktop horizontal overflow
- neutral / blue / red computed colour roles
- desktop `Start review` visibility
- `View source` disclosure opens and its `aria-controls` target exists
- `Collect → Verify` transition
- `Decide` remains blocked before a human review decision
- `Accept claim` marks the claim `Reviewed`
- `Decide` opens after the human review decision
- mobile loaded state and scroll reset
- mobile horizontal overflow, source-record visibility, and fixed action
- mobile current-step trust-blue role
- semantic duplicate IDs: `[]`
- semantic dangling controls: `[]`
- semantic unnamed visible controls: `[]`
- browser console/protocol errors: `[]`

## Static verification

- `npm test -- --run`: exit `0`; 4 test files, 11 tests passed.
- `npm run lint`: exit `0`; TypeScript check passed.
- `npm run build`: exit `0`; fresh CSS/JS assets emitted.
- `git diff --check`: exit `0`.
- KB plan score for contract 90: `100/100`.

## Harness notes, not product findings

Three early attempts were discarded as oracle problems: a close-form text
selector ignored the button's accessible label; a substring count included the
same case phrase in the topbar context and `h1`; and the claim status is
`Reviewed`, not `Accepted`. The helper was corrected to use semantic selectors,
exact `h1` checks, and the real review state. The final run above uses only the
corrected oracles. A separate clean reload captured the blank first-run image
after the interaction checks so the visual reference contains no validation
notice or focused skip link.

## Not covered

- Codex Chrome Extension control was unavailable; this is isolated local CDP
  evidence only.
- Native screen-reader speech, VoiceOver rotor behavior, physical-device touch,
  and browser zoom/text expansion were not executed.
- No live model/provider, network timeout, permission-denial, or persistence
  path applies to this local-first visual slice.
- Formal hosted Pages behavior remains a separate gate. The current public
  bundle was not promoted by this report.
- No non-owner PM session, comprehension study, hesitation, retention,
  conversion, adoption, GitHub traffic, fork, or star-growth result was
  observed.

## Release decision

`LOCAL CANDIDATE: PASS` for this visual and regression slice. `HOSTED: HOLD`.
`CHROME EXTENSION: 未驗證`. `NATIVE SCREEN READER: 未驗證`. `REAL USER /
ADOPTION / STARS: 未驗證`.
