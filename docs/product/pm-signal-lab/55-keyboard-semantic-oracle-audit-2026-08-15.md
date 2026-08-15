# PM Signal Lab — keyboard and semantic oracle audit

**Date:** 2026-08-15
**Canonical demo:** https://asdc163.github.io/pm-signal-lab/
**Published main SHA:** `4a932aa19ed22a6140c95fa47a1a36b93bf0434f`
**Browser route:** Codex Chrome Extension, fresh agent-controlled tab, no foreground stealing
**Scope:** semantic names, focus order, landmarks, headings, empty/loaded keyboard entry points

## Product QA Report

This is a focused keyboard and semantic oracle report. It strengthens DOM and focus evidence for the English-first hosted demo; it does not claim native VoiceOver, NVDA, TalkBack, or general assistive-technology usability.

## Environment

- URL: `https://asdc163.github.io/pm-signal-lab/`
- Fresh Chrome Extension tab at the current hosted bundle.
- Desktop viewport requested: `1440×900`.
- Product state: fresh empty worksheet, then deterministic sample loaded.
- The test used semantic browser controls and repeated `Tab` from the page body, then read the active element's tag, role, accessible label, visibility, and bounds.
- Native screen-reader route: not used; no VoiceOver/NVDA/TalkBack claim is made.

## Behavior Matrix

| user archetype | starting state / job | action performed | success signal | failure signal / recovery expectation |
| --- | --- | --- | --- | --- |
| Keyboard PM starting a new worksheet | Fresh empty hosted page; find the first usable action | Pressed `Tab` repeatedly through the empty surface | The focus path exposed `Skip to main content`, workflow controls, `Report a session`, `Load sample data`, and `Add your own signal` with readable labels | If focus becomes unclear, the maintainer should report the exact control and environment; native AT remains unverified |
| Keyboard PM reviewing a loaded pack | Sample loaded; move from sources to the next decision | Pressed `Tab` repeatedly after loading the sample | The path exposed `Reset this set`, `Copy session receipt`, `Report this session in a new tab for manual review`, `Dismiss notice`, `Add signal`, four `View source` controls, and `Start review` | If a source row does not expose its toggle state, report the row and browser; current DOM oracle found `aria-expanded` and `aria-controls` on the source toggles |
| PM using semantic navigation | Empty or loaded worksheet; understand where the current surface sits | Read the semantic surface after the keyboard walk | Interactive count was `16`; unnamed interactive elements were `0`; main/nav/aside/region landmarks and heading hierarchy were named | A DOM name is not a spoken screen-reader announcement; native assistive technology remains a separate gate |

## Findings

No blocker or high-severity finding was observed in this focused scope.

- **Likely user interpretation:** the page exposes a real worksheet, workflow navigation, source controls, and a next action rather than a canvas of unlabeled icon buttons.
- **Hesitation / friction:** the workflow contains repeated stepper controls for the persistent rail and mobile navigation surfaces; the current semantic labels remain identical and the browser oracle found no unnamed interactive element. A non-owner session is still needed to learn whether the repetition feels confusing.
- **Recovery:** the empty path reaches `Load sample data` and `Add your own signal`; the loaded path reaches `Reset this set`; source rows expose their expanded/collapsed state; the feedback and notice controls have names.
- **Trust:** the keyboard surface preserves `local-first`, source, limitation, human review, and manual handoff language. No automated verdict or model activity is introduced by this audit.
- **Severity:** none observed for the changed scope.
- **Evidence:** fresh semantic focus trace, interactive-name scan, landmark scan, heading scan, and current hosted URL.
- **Fix brief / acceptance criteria:** keep every newly added control in the same named-role contract. If a future visual slice adds an icon-only action, it must add an accessible name, a visible focus state, and a recovery result before release.

## Repro Steps

1. Open the [canonical hosted demo](https://asdc163.github.io/pm-signal-lab/) in a fresh Chrome tab.
2. Start from the empty worksheet.
3. Press `Tab` through the page and record the focused label after each step.
4. Confirm the empty path includes `Skip to main content`, workflow buttons, `Report a session`, `Load sample data`, and `Add your own signal`.
5. Activate `Load sample data`.
6. Press `Tab` through the loaded worksheet.
7. Confirm the loaded path exposes reset, session receipt, manual feedback, notice dismissal, add signal, source expansion, and `Start review` controls.
8. Inspect the DOM semantic surface and record native screen-reader behavior separately if an assistive technology is available.

## Expected vs Actual

| check | expected | actual |
| --- | --- | --- |
| Empty first focus | A keyboard user can find a skip link and the primary task | PASS: `Skip to main content` was first, followed by named workflow and worksheet controls |
| Empty actions | The main action and custom-signal path are reachable | PASS: `Load sample data` and `Add your own signal` appeared in the focus path |
| Loaded actions | Source, reset, review, feedback, and notice controls are reachable | PASS: `Reset this set`, `Copy session receipt`, `Report this session in a new tab for manual review`, `Dismiss notice`, four `View source` controls, and `Start review` appeared |
| Accessible names | Every visible interactive element has a name | PASS: 16 visible interactive elements; unnamed list was empty |
| Landmarks | Main work, workflow navigation, context, and current action are distinguishable | PASS: named `PM Signal Lab workspace`, `Workflow`, `PM Signal Lab navigation`, `Worksheet context`, and `Current work action` surfaces were present |
| Headings | The current page and source/review sections have a readable hierarchy | PASS: H1, H2, H3, and source H4 headings were present with current English copy |
| Native announcements | A real screen reader announces the same meaning correctly | NOT PROVEN: this oracle reads DOM semantics only and does not replace VoiceOver, NVDA, or TalkBack |

## Verification evidence

| check | result | evidence |
| --- | --- | --- |
| Canonical hosted bundle | PASS | Current hosted verifier: HTTP 200, `en-US`, hashed assets 200, current copy present, stale copy absent |
| Empty focus trace | PASS | Fresh Chrome Extension tab; named skip link, workflow, report, sample, and custom-signal controls observed |
| Loaded focus trace | PASS | Fresh Chrome Extension tab; reset, receipt, feedback, dismiss, add signal, source toggles, and review observed |
| Interactive name scan | PASS | `16` visible interactive elements; `0` unnamed elements |
| Landmark scan | PASS | Main, workflow navigation, navigation aside, worksheet context, and current-work-action region named |
| Heading scan | PASS | Current H1/H2/H3/H4 hierarchy read from the hosted DOM |
| Native AT | NOT COVERED | No VoiceOver, NVDA, TalkBack, or physical-device session was available in this run |

## Not Covered

- Native VoiceOver, NVDA, TalkBack, or other screen-reader announcement quality.
- Real PM / founder / designer / product-engineer sessions.
- Physical device, virtual keyboard, browser zoom, high-contrast mode, or low-bandwidth behavior.
- General usability, retention, adoption, traffic, referrals, star quality, or organic GitHub star causality.
- The 10,000-star outcome.

## Next evidence gate

Keep the product in `Iterate / recruit`. The DOM and keyboard oracle is now stronger, but the next meaningful evidence must come from five non-owner international sessions. Ask those testers to report the browser/assistive technology, the exact control where they hesitated, what they expected to hear or see, and one change they would make. Do not promote this semantic pass to a screen-reader or adoption claim.
