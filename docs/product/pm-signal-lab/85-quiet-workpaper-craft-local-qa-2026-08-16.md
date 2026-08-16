# PM Signal Lab — quiet workpaper craft local QA — 2026-08-16

## Release decision

**PASS for the current local candidate; HOLD for hosted release.**

This report verifies the small visual-and-semantics slice locally. It does not
claim that the canonical GitHub Pages URL serves this candidate, that a native
screen reader announces it correctly, or that a non-owner user would adopt it.

## Product QA report

The pass covers the English-first PM workpaper's blank state, deterministic
sample state, source expansion, keyboard focus path, review gate, experiment
draft, decision brief, feedback privacy boundary, clipboard fallback, refresh
reset, mobile geometry, semantic relationships, and runtime resource boundary.

The changed product behavior is intentionally narrow:

- the loaded case description is shorter and concrete enough for the mobile
  line budget;
- the programmatically focused `main.workspace` landmark no longer receives a
  full-surface browser outline;
- a collapsed source toggle does not reference a missing `aria-controls`
  target, while an expanded toggle points to its live source excerpt.

## Environment and evidence boundary

- Candidate surface: local Vite server at `http://127.0.0.1:5173/`.
- Browser route: isolated local headless Chrome CDP on port `9223`.
- Preferred Codex Chrome Extension route: unavailable in this session; no
  Chrome Extension claim is made.
- Viewports: `1280×900` and `390×844`.
- State source: deterministic local fixture; no provider, login, upload,
  telemetry, or external write.
- Runtime observation: no external resource URL and no browser protocol error
  or warning was observed during the final flow.
- Screenshot artifacts: [desktop loaded state](assets/qa/quiet-workpaper-craft-local-1280-2026-08-16.png)
  and [mobile loaded state](assets/qa/quiet-workpaper-craft-local-390-2026-08-16.png).

## Behavior matrix

| User/job | Starting state | Action | Success signal | Result |
| --- | --- | --- | --- | --- |
| First-time PM finds a safe starting point | Fresh blank worksheet | Read the first surface and activate the sample | `Start with a source line`, `Open the sample worksheet`, and the local boundary are present | PASS |
| PM reads the loaded case | Sample opened | Inspect the case header and first source row at desktop/mobile sizes | The source-first hierarchy is intact; no full-main outline competes with the sheet; the first mobile title is above the fixed action | PASS |
| PM checks provenance | Loaded Collect | Expand `View source` | Original excerpt is visible; expanded toggle has `aria-expanded="true"`, a live `aria-controls` target, and the source boundary remains visible | PASS |
| Keyboard PM enters the task | Blank or loaded page | Press first Tab, then continue through the loaded controls | First Tab reaches `Skip to main content`; source toggles and `Start review` are reachable with visible control focus | PASS |
| PM is blocked from premature certainty | Loaded Collect/Verify | Enter Verify and try `Decide` before reviewing a claim | The app stays in Verify and explains that one claim must be reviewed | PASS |
| PM moves from evidence to a test | Verify | Accept a claim, open Decide, draft the smallest experiment, edit the primary metric, export | Ready brief is editable and the edited metric appears in the decision brief | PASS |
| PM records a safe field note | Ship | Open pilot note and submit without privacy confirmation | No report is generated; the privacy instruction is shown | PASS |
| PM shares a reviewed field note manually | Ship | Confirm privacy, prepare the note, try clipboard, inspect the output | Note says it is not a validation result; clipboard failure preserves the text fallback and the manual GitHub link | PASS |
| PM recovers from a local session | Any loaded state | Refresh the local page | The sample and feedback output are cleared; the blank worksheet returns | PASS |

## Exact findings and fixes

### Finding 1 — full-surface landmark outline after state handoff

- Severity: P2 visual/interaction quality; fixed in this slice.
- Repro: at either tested viewport, open the sample and inspect the focused
  `main.workspace` after the state change.
- Before: browser default outline surrounded the whole work area.
- Expected: the landmark receives programmatic focus for context, while only
  interactive controls carry a visible control focus treatment.
- Fix: `main.workspace:focus { outline: none; }`; control and skip-link
  `:focus-visible` rules remain unchanged.
- After: computed `outline-style` was `none` while the active element was the
  main landmark; tabbed buttons and the skip link still had visible focus.

### Finding 2 — collapsed source toggle referenced a missing target

- Severity: P2 semantic robustness; fixed in this slice.
- Repro: load the sample and inspect the collapsed `View source` buttons.
- Before: each button declared `aria-controls="source-*"` before the
  conditional source detail existed in the DOM.
- Expected: a collapsed control does not expose a dangling relationship; an
  expanded control references the visible region.
- Fix: `src/App.tsx` now adds `aria-controls` only when `expanded` is true.
- After: collapsed dangling relationships `0`; after expanding the first row,
  `aria-expanded="true"`, the target existed, and dangling relationships were
  still `0`.

No blocker remained for the local candidate scope after these fixes.

## Verification evidence

### Static gates

| Command | Result | Evidence |
| --- | --- | --- |
| `npm test -- --run` | PASS | 4 files, 11 tests passed |
| `npm run lint` | PASS | `tsc --noEmit` exited 0 |
| `npm run build` | PASS | Vite emitted `dist/assets/index-IL-GFLNo.js` and `dist/assets/index-BArkKczP.css` |
| `git diff --check` | PASS | no whitespace errors |

### Browser geometry and semantics

| Check | `1280×900` | `390×844` |
| --- | --- | --- |
| Main focus outline | `none` | `none` |
| Description text | `25/25` CSS px; no clamp | `50/50` CSS px; two-line budget, no ellipsis |
| First source title | visible at `y=719.16..744.16` | visible at `y=753.81..797.81` |
| Fixed action | not rendered at desktop | `y=798..844`, immediately after first title |
| Document/body width | `1265/1265`, within viewport | `375/375`, within `390px` viewport |
| Visible unnamed controls | `0` | `0` |
| Duplicate IDs | `0` | `0` |
| Collapsed dangling `aria-controls` | `0` | `0` |

### Keyboard and runtime flow

- Blank first Tab: `Skip to main content`, with browser-visible focus.
- Loaded focus handoff: active element was `main.workspace` with no full-surface
  outline.
- Twelve subsequent Tab steps reached workflow buttons, notice dismissal,
  `Add signal`, all four source toggles, `Start review`, and reset; each
  interactive control in that trace exposed a non-`none` focus outline.
- End-to-end state trace passed: blank → sample → source expansion → Verify →
  blocked Decide gate → accepted claim → Decide → experiment → edited metric →
  Ship → feedback privacy block → prepared field note → clipboard fallback →
  refresh reset.
- Same-origin resource scan returned no external URLs; the final protocol-error
  list was empty.

## Not covered

- Preferred Codex Chrome Extension trace; the route was unavailable in this
  session.
- Canonical GitHub Pages behavior or served candidate asset identity.
- Native VoiceOver, NVDA, TalkBack, or any actual screen-reader speech output.
- Physical-device touch, browser zoom, high contrast, reduced motion, or
  low-bandwidth behavior.
- Non-owner PM/founder/designer/engineer sessions, comprehension, retention,
  adoption, traffic quality, referrals, or GitHub star movement.
- Any claim that the product is viral or on track for 10,000 stars.

## Release boundary and next evidence gate

Keep the candidate in local `PASS / hosted HOLD`. The next release evidence
must use the preferred Chrome route against the canonical HTTPS bundle after
the user explicitly authorizes merge and deploy. The next product-learning
evidence must come from non-owner international sessions; this local run is
not participant evidence.

## Rollback

Revert the implementation commit containing the fixture copy, main-landmark
focus rule, and conditional source-toggle semantics. No migration, dependency,
provider, account, permission, telemetry, or external cleanup is required.
