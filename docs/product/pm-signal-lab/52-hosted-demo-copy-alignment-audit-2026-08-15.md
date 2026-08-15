# PM Signal Lab — hosted-demo copy alignment audit

**Date:** 2026-08-15
**Canonical demo:** https://asdc163.github.io/pm-signal-lab/
**Published main SHA:** `e55c4c376f4b6b2e98ee5456be9d7a23dfb533bb`
**Browser route:** Codex Chrome Extension, fresh agent-created tabs, background execution without stealing foreground focus

## Decision

`SCOPED COPY ALIGNMENT PASS / FORMAL HOSTED DEMO BOUNDARY CLEAR / PILOT GATE OPEN`.

The visible product shell now agrees with the public release language. The user sees `Hosted demo` for the public surface and `local-first` for the data boundary. The previous `local preview` / `Public preview` wording is gone from the current client bundle and is guarded by the hosted smoke check.

This is a copy and trust-boundary release. It does not prove external usability, native screen-reader quality, adoption, qualified stars, or a completed 10,000-star outcome.

## Problem frame

The repository, hosted demo contract, pilot issue, and release notes had already been promoted to `formal hosted demo`, but the product UI still said `Evidence desk / local preview`, `Local preview / no transfer`, and `Public preview 0.1`. That mismatch made the public product look less intentional and made it unclear whether `local` described hosting or data handling.

## Product decision

- Use `Hosted demo` for the public, canonical surface.
- Use `Local worksheet`, `local-first`, `refresh resets it`, and `no transfer` for the data boundary.
- Keep the source, claim, limitation, human review, and manual handoff language unchanged.
- Keep the formal smoke check strict enough to reject a regression to the retired preview labels.

## Scope

### Changed

- Empty topbar status: `Hosted demo / no transfer`.
- Sidebar label: `Evidence desk / hosted demo`.
- Footer release label: `Hosted demo 0.1 · refresh resets it`.
- Add-signal form boundary: `This hosted demo handles content on this page only; it does not upload your text.`
- Decision memo boundary: `This memo was prepared in a local-first hosted demo; it does not show external adoption.`
- README, session kit, growth operating system, and hosted smoke assertions.

### Intentionally unchanged

- `Collect → Verify → Decide → Ship` workflow.
- Source ledger, review docket, margin note, human review actions, experiment brief, privacy gate, and manual GitHub handoff.
- No login, database, telemetry, provider, raw-signal upload, or automatic issue submission.

## Product QA Report

### Environment

- Local built bundle: `vite preview` on `http://127.0.0.1:5182/`.
- Canonical hosted bundle: `https://asdc163.github.io/pm-signal-lab/`.
- Browser route: Codex Chrome Extension.
- Chrome context: fresh agent-created tabs; no foreground stealing.
- Temporary viewports: desktop `1280×900`, mobile `390×844`.
- Native screen-reader route: not used; no VoiceOver/NVDA/TalkBack claim is made.

### Behavior matrix

| user archetype | starting state / job | action performed | success signal | boundary |
| --- | --- | --- | --- | --- |
| First-time visitor | Fresh empty hosted page | Inspected the first-run shell | `Hosted demo / no transfer`, `Load sample data`, source-to-test route, and refresh boundary were visible | Non-owner five-second comprehension remains unverified. |
| PM reading a loaded workpaper | Sample loaded | Loaded sample and read the shell and margin note | `Evidence desk / hosted demo`, `Hosted demo 0.1`, `Keep the source in frame`, and `Review docket` appeared; retired preview labels were absent | Fixture remains deterministic, not customer evidence. |
| Keyboard PM | Loaded Collect | Used Enter on `Start review` | Verify opened and focus landed on `Draft smallest experiment` | Native screen-reader announcement remains unverified. |
| Mobile PM | `390×844` current hosted page | Loaded sample and inspected the fixed action | `clientWidth=375`, `scrollWidth=375`, `overflowX=false`, hosted copy present, sticky action visible | Native device and virtual-keyboard behavior remain unverified. |
| PM reading an exported brief | Ship path | Inspected the decision memo boundary | The memo states local-first handling and does not claim external adoption | Export is a proposed decision brief, not an observed outcome. |

### Findings

No blocker or high-severity finding was observed for this scoped change.

- **User interpretation:** `Hosted demo` now identifies the public URL while `local-first` identifies how content is handled.
- **Hesitation/friction:** the previous split wording is removed from the current bundle; no new copy friction was observed in the current smoke.
- **Recovery:** refresh still resets the local worksheet, and the public session kit remains the manual feedback path.
- **Trust:** the copy is specific about what is hosted and what is not transferred; it does not imply backend persistence or AI automation.
- **Severity:** none observed for the changed scope.
- **Evidence:** local built-bundle verifier, canonical HTTP verifier, fresh current-main Chrome desktop/mobile tabs, keyboard transition, and post-deploy workflow.

## Verification evidence

| check | result | evidence |
| --- | --- | --- |
| Product tests | PASS | `npm test -- --run`: 4 files, 10 tests passed. |
| Type/lint gate | PASS | `npm run lint`: exit 0. |
| Production build | PASS | `npm run build`: Vite emitted `assets/index-DWCmjw-d.js` and `assets/index-C_8ph3iF.css`. |
| Built local hosted verifier | PASS | `HOSTED_URL=http://127.0.0.1:5182/ npm run verify:hosted`: current strings present, retired strings absent, assets 200. |
| PR verification | PASS | PR [#24](https://github.com/asdc163/pm-signal-lab/pull/24), verify run [31865449044](https://github.com/asdc163/pm-signal-lab/actions/runs/31865449044). |
| Main CI | PASS | [Run 31865478350](https://github.com/asdc163/pm-signal-lab/actions/runs/31865478350), head `e55c4c3…`. |
| Pages deploy | PASS | [Run 31865478391](https://github.com/asdc163/pm-signal-lab/actions/runs/31865478391), head `e55c4c3…`. |
| Post-deploy smoke | PASS | [Run 31865505200](https://github.com/asdc163/pm-signal-lab/actions/runs/31865505200), current-copy and stale-copy assertions passed. |
| Canonical direct verifier | PASS | At 2026-08-15T04:52:47Z: HTTP 200, `en-US`, JS/CSS 200, current hosted copy present, retired preview copy absent. |
| Current-main Chrome | PASS | Fresh desktop and mobile tabs passed empty, loaded, copy alignment, keyboard transition, sticky action, and no-overflow checks. |

## Not covered

- Five real non-owner PM sessions and three concrete field notes.
- Native VoiceOver, NVDA, TalkBack, formal screen-reader sign-off, real device, and virtual keyboard behavior.
- External model quality, retention, conversion, traffic, adoption, referrals, qualified star quality, and the 10,000-star outcome.
- Automatic public posting, replying, DM, starring, following, or issue submission.

## Next evidence gate

Keep the product in `Iterate / recruit`. The copy alignment is now released and monitored; the next product change should be driven by a real pilot hesitation, trust/recovery observation, or requested change from outside the maintainer account.
