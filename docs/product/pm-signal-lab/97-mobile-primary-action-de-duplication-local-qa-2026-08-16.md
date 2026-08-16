# Mobile primary-action de-duplication — focused local QA

Date: 2026-08-16
Candidate: `codex/less-ai-editorial-sheet`
Scope: the mobile `Sheet note` no longer renders a duplicate primary button when the fixed action bar is present

## QA scope

This is a focused local QA report for the changed responsive surface. It is not a full product release sign-off. The core user job remains: read a source line, review what it supports, name the smallest test, and carry a challengeable brief forward.

### Environment and evidence boundary

- Local Vite app: `http://127.0.0.1:4173/`
- Isolated headless Google Chrome 151.0.7922.138 through local CDP fallback
- Viewports: `390×844`, `1024×900`, `1440×900`
- Browser fallback was used because the preferred Chrome Extension route was unavailable in this environment.
- No hosted, native assistive-technology, real-device, non-owner, or adoption claim is made here.

## Finding that triggered the fix

### UX-001 — repeated mobile primary action

- Severity: P2, comprehension and visual hierarchy
- User/job: a PM reading the workpaper on a phone
- Repro: load the sample, review one claim, open `Decide` before drafting an experiment
- Before: the lower worksheet context and fixed bottom action bar both exposed `Draft smallest experiment`.
- Expected: one clear mobile primary action, with the lower context note explaining the question and rule.
- User interpretation risk: the page can read like a dashboard with two command rails instead of a focused workpaper.
- Fix: keep the context label/question/rule, hide only its action button below `700px`, and keep the fixed bar as the mobile action owner.
- Regression case: `QA-006` and `QA-007` below.

## Behavior matrix

| Case | Starting state and task | Expected oracle | Result |
| --- | --- | --- | --- |
| QA-001 | Fresh `Collect` at 390px; inspect the first action | Sticky bar is visible, says `Start with a source line`, and opens the sample | PASS |
| QA-002 | Loaded `Collect` at 390px; inspect the action context | Bar says `Read the source lines` and `Start review`; context action is not visible | PASS |
| QA-003 | Move to `Verify` at 390px after opening the sample | Bar says `Draft the smallest test` and `Draft smallest experiment`; review controls remain reachable | PASS |
| QA-004 | Accept one claim and open `Decide` without a draft at 390px | Bar remains `Draft smallest experiment`; context note keeps the question and rule; no duplicate visible context button | PASS |
| QA-005 | Draft the experiment at 390px | Bar changes to `Export decision brief`; the brief remains editable | PASS |
| QA-006 | Export at 390px and open `Ship` | Bar says `Inspect before copying` and exposes `Copy Markdown`; no external submission occurs | PASS |
| QA-007 | Open `Decide` at 1024px and 1440px | Desktop/tablet context action remains visible; mobile bar remains hidden | PASS |
| QA-008 | Inspect responsive geometry at all three viewports | No horizontal overflow; action target remains at least 44px | PASS |
| QA-009 | Inspect semantic tree after a fresh load and loaded desktop state | No duplicate IDs, dangling `aria-controls`, or unnamed visible controls | PASS |

## UX diagnostic matrix

| Lens | Evidence | Result |
| --- | --- | --- |
| Comprehension | The mobile bar label and button agree in blank, Collect, Verify, Decide, and Ship | PASS |
| Mental model | `Sheet note` still exposes the source set, question, rule, and recent action; only the duplicate control is removed | PASS |
| Ability / friction | The fixed action remains visible and at least 44px high at 390px | PASS |
| Recovery | Existing notice, review gate, export gate, and local-only fallback were not changed | PASS |
| Trust | No provider, upload, telemetry, automatic issue, or decision authority was added | PASS |
| Visual hierarchy | Mobile now has one fixed primary action in the context of this slice; desktop retains its context action | PASS |

## Visual evidence

- [Blank mobile](./assets/qa/mobile-primary-action-dedup-blank-390-2026-08-16.png)
- [Loaded mobile](./assets/qa/mobile-primary-action-dedup-loaded-390-2026-08-16.png)
- [Decide before drafting](./assets/qa/mobile-primary-action-dedup-decide-390-2026-08-16.png)
- [Decide after drafting](./assets/qa/mobile-primary-action-dedup-decide-drafted-390-2026-08-16.png)
- [Ship mobile](./assets/qa/mobile-primary-action-dedup-ship-390-2026-08-16.png)
- [Loaded tablet](./assets/qa/mobile-primary-action-dedup-loaded-1024-2026-08-16.png)
- [Loaded desktop](./assets/qa/mobile-primary-action-dedup-loaded-1440-2026-08-16.png)

The screenshots keep the warm paper surface, ruled source spine, trust-blue provenance, and restrained red action. No gradient, glass, orb, card wall, fake agent feed, or new animation was introduced.

## Static and browser evidence

- `npm test -- --run` — exit 0; 4 files / 11 tests passed.
- `npm run lint` — exit 0; TypeScript passed.
- `npm run build` — exit 0; Vite production build passed.
- `git diff --check` — exit 0.
- Browser runtime / console errors during the fresh flow — none.
- Mobile action region names matched the visible action: `Next action: <button label>`.
- `390×844`: `scrollWidth = 390`, no overflow; visible fixed action button height `44px` after the blank state.
- `1024×900` and `1440×900`: no overflow; context action visible in `Decide`, mobile bar hidden.
- Semantic checks: duplicate IDs `0`; dangling `aria-controls` `0`; unnamed visible controls `0`.
- KB execution contract passed the pre-execution compiler gate at `100/100`; the post-checklist rerun is `88/100` because the scorer expects unchecked task markers, still above the `85` minimum.

## Release decision

**PASS for this changed mobile action slice.** The fix is small, local, reversible, and supported by fresh browser evidence. This does not change the broader release decision: the public candidate remains on hold until the canonical hosted bundle, preferred Chrome Extension path, native assistive technology, real devices, and real PM sessions are separately verified.

## Not covered

- Chrome Extension foreground QA.
- Native VoiceOver, NVDA, TalkBack, or equivalent screen-reader speech output.
- Real iOS Safari or Android Chrome behavior.
- Canonical GitHub Pages behavior after merge/deploy.
- Five real PM task sessions, ease scores, repeat use, or user feedback replies.
- Live provider quality, adoption, traffic, stars, or any claim that the project is viral.

## Rollback

Revert the implementation commit if the context explanation disappears, the desktop action changes, the fixed mobile action becomes unreachable, or focus/overflow regresses. No data migration or external rollback is required.
