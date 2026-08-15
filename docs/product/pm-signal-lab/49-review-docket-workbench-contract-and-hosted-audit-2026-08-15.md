# PM Signal Lab — review docket workbench contract and hosted audit

**Date:** 2026-08-15  
**Canonical surface:** https://asdc163.github.io/pm-signal-lab/  
**Published main SHA:** `90d4067391bbcbc4091885d328bdcd6f1e39c031`  
**Browser route:** Codex Chrome Extension, fresh agent-created tabs, background execution without stealing foreground focus

## Decision

`SCOPED HOSTED PASS / LEARNING GATE OPEN`.

The loaded workbench now places the real next action in the reading spine: after a PM reads the source ledger, the central review docket starts the claim check. The loaded masthead also switches from landing-page language to direct work language, and the right context rail explains the same next move without presenting a second desktop CTA.

This is evidence for one product and visual slice. It is not evidence of external adoption, qualified stars, general usability, AI quality, or a completed 10,000-star outcome.

## Problem frame

### User job

An international PM or product builder has a few raw signal lines and needs to move from source inspection to a reviewable claim without losing the limitation or handing the decision to an opaque system.

### Observed product problem

The source ledger was already readable, but the loaded screen still carried a large first-run masthead and the central `Next move` note only described the action. The functional `Start review` control lived in the context rail. That made the work surface feel more like a polished AI demo than a PM workbench: the user could read the next step without being able to start it where the reading ended.

### Decision

Make the smallest useful action visible at the end of the source ledger, reduce generic micro-label styling, and keep the loaded state written around the human review job:

`Source line → Claim → Smallest test`

### Unknowns kept open

- Whether an external PM understands the first five seconds without maintainer guidance.
- Whether the new central action reduces hesitation in real sessions.
- Whether the product earns repeat use, referrals, qualified stars, or adoption.
- Whether native assistive technology announces the complete experience as intended.

## Product scope and acceptance criteria

### In scope

- Loaded hero copy that names the source-to-test job directly.
- A central `Review docket` with a live candidate-claim count and a real `Start review` action.
- A truthful empty-claim fallback that offers `Add a signal`, never `Copy Markdown`.
- A desktop context rail that explains the central docket instead of duplicating its CTA during `Collect`.
- Sans typography for general section/card labels; monospace remains reserved for folios, identifiers, and compact metadata.
- Responsive and keyboard behavior for the new action.

### Out of scope

- Adding an external model provider, chat surface, login, telemetry, or automatic GitHub mutation.
- Adding decorative gradients, glass panels, or dashboard-style KPI chrome.
- Claiming that deterministic fixture output is customer evidence or AI quality proof.
- Native VoiceOver/NVDA/TalkBack sign-off or real-user research.

### Acceptance criteria

1. After sample load, the source ledger shows the actual number of candidate claims waiting for review.
2. The central `Start review` action changes the workflow to Verify and preserves the source/claim context.
3. On desktop Collect, the context rail contains explanatory copy rather than a second identical primary button.
4. On mobile, the sticky action remains visible and can perform the same transition.
5. Empty and invalid states keep a truthful recovery action and do not imply that an export or decision is ready.
6. Local tests, type checks, production build, CI, Pages, hosted HTTP, and fresh hosted browser smoke all pass for this slice.

## Visual and interaction contract

- First read in loaded state: `Start with the source. Decide what to test.`
- Second read: the source ledger and its folios, dates, source identity, and original lines.
- Primary action: one `Start review` button in the central review docket; mobile may repeat the same action in the sticky action bar because it is the responsive navigation surface.
- Right rail role: show counts, open questions, evidence rule, and the next-move explanation; do not compete with the central workpaper action on desktop Collect.
- Surface language: warm paper, ruled rows, restrained terracotta action color, teal trust boundary, no gradients, glass, or generic AI status theater.
- Copy rule: name what the PM can do now; do not claim that the system knows, validates, or improves an outcome it has not observed.

## Implementation boundary

- `src/App.tsx`: loaded-state copy, truthful `nextAction` fallback, `CollectView` review docket, central action wiring, and desktop context-rail handoff.
- `src/styles.css`: loaded masthead density, natural-language section labels, and docket action spacing.
- No domain model, provider, API, persistence, authentication, or external side-effect changes.

## Product QA Report

### Environment

- Local QA surface: `http://127.0.0.1:5176/`.
- Hosted QA surface: `https://asdc163.github.io/pm-signal-lab/`.
- Browser route: Codex Chrome Extension.
- Chrome context: fresh agent-created tabs for local and hosted checks; no foreground stealing.
- Temporary viewport checks: desktop `1280×900` and mobile `390×844`.
- Fresh hosted HTML: HTTP `200`, document language `en-US`, published assets `assets/index-DOntSh2t.js` and `assets/index-DB0_Cm90.css`.

### Behavior matrix

| user archetype | starting state / job | action performed | success signal | failure signal / recovery |
| --- | --- | --- | --- | --- |
| International PM, first visit | Fresh empty hosted page; identify the product job | Opened a fresh tab and inspected the first screen | English-first `Load sample data`, `Add your own signal`, and `Source line → Claim → Smallest test` are present | No external comprehension claim; the visible recovery is to load sample data or add a signal. |
| PM reading source material | Loaded sample; inspect before interpreting | Loaded sample and counted source rows and candidate claims | Four source rows, three candidate claims, and one central `Start review` control were observed | Source details remain expandable; no automatic claim acceptance. |
| PM moving from evidence to review | Loaded Collect; start the next step at the end of the workpaper | Clicked the central `Start review` | Verify heading appeared and focus moved to the next valid action, `Draft smallest experiment` | If there are no claims, the action changes to `Add a signal`; no export is implied. |
| Keyboard user | Loaded Collect with the central docket available | Focused the central button and pressed Enter | The same Collect → Verify transition occurred; focus was restored to the visible next action | Native screen-reader announcement remains unverified. |
| Mobile PM | Hosted sample at `390×844` | Loaded sample, checked layout metrics, and used the sticky `Start review` | `scrollWidth=375`, `clientWidth=375`, `overflowX=false`; Verify opened from the sticky action | Native device behavior and assistive technology remain unverified. |
| Low-trust tester | Empty form; avoid saving an incomplete signal | Submitted blank signal form | Three field alerts appeared, input stayed preserved, and focus returned to `evidence-title` | The user can correct or cancel without leaving the page. |
| Source reviewer | Loaded source row; trace and close the original line | Opened `View source`, then `Hide source` | One source region appeared and disappeared; four source toggles remained distinct | No source text leaves the page in the tested flow. |

### Findings

No blocker or high-severity finding was observed for this scoped slice.

- **Severity:** none observed.
- **Likely user interpretation:** the source ledger ends in an actionable review queue, rather than a decorative status note.
- **Hesitation/friction:** the loaded page still contains a substantial amount of reading content; this is intentional for evidence review, but external first-five-second comprehension is not proven.
- **Recovery:** `Add a signal`, `Reset this set`, source expand/collapse, and the workflow stepper remain available.
- **Trust:** the interface says `candidate claims`, keeps limitations visible, and does not state that a decision has been made.
- **Evidence:** local and hosted Chrome Extension snapshots, screenshots, direct action counts, focus readback, and responsive layout metrics from this release.
- **Fix brief:** use the first five external PM sessions to test whether the central docket label and action are understood without explanation; change wording only from observed hesitation.

### Repro Steps

1. Open the canonical URL in a fresh Chrome Extension tab.
2. Select `Load sample data` and wait for the local worksheet to render.
3. Confirm four source rows, three candidate claims, and one central `Start review` button.
4. Select the central `Start review` button.
5. Confirm `Check the claim against the line` appears and focus moves to `Draft smallest experiment`.
6. At `390×844`, reload a fresh tab, load the sample, confirm no horizontal overflow, and use the sticky `Start review` action.

### Expected vs Actual

| check | expected | actual |
| --- | --- | --- |
| Loaded masthead | Work language replaces the first-run landing sentence | `Start with the source. Decide what to test.` appeared with direct source-to-test copy. |
| Central action | The workpaper itself starts review | `Review docket` showed `3 candidate claims are waiting for a source check.` and a working `Start review` button. |
| Desktop rail | Context supports rather than duplicates the central action during Collect | The rail showed `Use the review docket in the workpaper.` and no second desktop Collect button. |
| Keyboard | Enter on the focused docket action performs the same transition | Verify opened and focus moved to the visible next action. |
| Mobile | Sticky action remains reachable without width overflow | `390×844` check reported `clientWidth=375`, `scrollWidth=375`, `overflowX=false`; sticky action opened Verify. |
| Empty invalid input | Preserve work and return the user to the first repair field | Three alerts appeared and focus was `evidence-title`. |

## Code, CI, and hosted evidence

| check | result | evidence |
| --- | --- | --- |
| Product tests | PASS | `npm test -- --run`: 4 files, 10 tests passed. |
| Type/lint gate | PASS | `npm run lint`: exit 0. |
| Production build | PASS | `npm run build`: Vite production build completed. |
| Diff hygiene | PASS | `git diff --check`: exit 0 before commit. |
| PR verification | PASS | [PR #17](https://github.com/asdc163/pm-signal-lab/pull/17), CI run [31862020886](https://github.com/asdc163/pm-signal-lab/actions/runs/31862020886). |
| Main CI | PASS | [Run 31862090498](https://github.com/asdc163/pm-signal-lab/actions/runs/31862090498), head `90d4067…`. |
| Pages deploy | PASS | [Run 31862090497](https://github.com/asdc163/pm-signal-lab/actions/runs/31862090497), completed successfully. |
| Canonical HTTP | PASS | Fresh `curl` returned HTTP/2 `200`, `en-US`, and the new asset hashes. |
| Hosted browser | PASS | Fresh hosted Chrome Extension tabs passed empty, loaded, central review, focus, and mobile overflow checks. |

## Not covered

- Real international PM sessions, unguided five-second comprehension, retention, conversion, adoption, referrals, traffic, and GitHub star quality.
- Native VoiceOver, NVDA, TalkBack, or a formal screen-reader sign-off.
- Actual external AI-provider behavior; the preview remains local-first and provider-free.
- Any claim that the current repository has 10,000 stars. The latest public snapshot remains `1` star and the growth pulse remains `iterate_recruit`.
- A complete browser-origin console log export for this specific slice; no app-origin error was observed in the direct runs, but this is not a substitute for an independent production observability system.

## Next evidence gate

Keep the release in `Iterate / recruit`. The next meaningful action is five unguided external sessions and triage of concrete hesitation, trust, recovery, or requested-change evidence. The product should earn broader attention through a useful, reproducible workbench and public learning trail; no automated star, follow, reply, post, DM, or issue-submission loop is enabled.
