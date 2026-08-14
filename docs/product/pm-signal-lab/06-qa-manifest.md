# QA Manifest — PM Signal Lab v0

## Verdict

**Historical local snapshot: PASS-WITH-KNOWN-ISSUES；current public-preview evidence is recorded separately.**

The core local workflow was operable and the deterministic domain contract passed its automated checks. This file records the pre-hosted local snapshot; the current hosted release and later re-verification are recorded in [`11-editorial-evidence-desk-release-2026-08-15.md`](./11-editorial-evidence-desk-release-2026-08-15.md). Provider quality, authentication, persistence, telemetry, and real-user evidence remain unverified.

This manifest records the evidence boundary before the public repository bootstrap. A green build is not treated as proof of AI quality, usability with real PMs, public adoption, or future GitHub stars.

## Environment and route

| Item | Observed value |
|---|---|
| Date | 2026-08-14, Asia/Taipei |
| Workspace | Repository root |
| Node / npm | Node `v20.19.4`, npm `10.8.2` |
| App | Vite dev server at `http://127.0.0.1:5173/` |
| Browser QA route | Playwright CLI fallback；the Codex Chrome Extension tools were not callable in this session |
| Viewports | 390×844、768×1024、1440×900 |
| Data boundary | fixture + in-memory state only；no external network/provider call |

The browser route is explicitly a fallback evidence layer. It does not equal a Chrome Extension sign-off, native-device test, screen-reader audit, or public production check.

## Automated evidence

| Check | Command / result | Status |
|---|---|---|
| Domain tests | `npm test -- --run`；2 test files、5 tests passed | PASS |
| Type/lint gate | `npm run lint`；TypeScript no-emit completed with exit 0 | PASS |
| Production build | `npm run build`；TypeScript build + Vite build completed with exit 0 | PASS |
| Install / dependency audit | `npm install`；103 packages added、0 vulnerabilities reported | PASS |
| Local HTTP smoke | `curl -I http://127.0.0.1:5173/` returned `HTTP/1.1 200 OK` | PASS |
| Console smoke | Fresh local page；3 messages、0 errors、0 warnings after favicon fix | PASS |
| Horizontal overflow | `scrollWidth` did not exceed viewport at 390/768/1440 | PASS |

## Behavior matrix

| Flow / oracle | Observed result | Status |
|---|---|---|
| Fresh open | Four-step `收集 → 核對 → 安排 → 帶走`、literal promise、empty workspace、`載入範例資料` visible；no API key request | PASS |
| Load sample | Four evidence rows appear with source、type、time、content；count and decision context update | PASS |
| Open Verify | Candidate claims show source mapping、status、limitation；first claim expands to two source mappings | PASS |
| Human review | `採用這個判斷` changes the claim to a reviewed state and unlocks a truthful ready path | PASS |
| Draft experiment | Brief shows primary metric and experiment context；reviewed supported claim yields `可以進一步確認` | PASS |
| Missing evidence | Missing claim remains `Needs validation` and preserves its limitation；it is not presented as ready | PASS |
| Incomplete export | Export from an unreviewed/missing-evidence state is blocked with a next action back to Verify | PASS |
| Complete export | After accepting a sourced claim and drafting the brief, memo preview contains decision、evidence summary、known limits、experiment、not covered | PASS |
| Copy fallback | `複製 Markdown` gives visible `Markdown 已複製；你可以貼到 GitHub issue 或 PRD。` feedback and leaves the memo readable | PASS |
| Invalid evidence form | Empty submit keeps form open, focuses the first invalid field, shows field-level alerts, and preserves entered values | PASS |
| Valid evidence recovery | Adding title/source/content creates a fifth row marked `剛加入` and updates the count | PASS |
| Double activation | Double-clicking the experiment action did not duplicate visible experiment content or corrupt state; local event trace increments twice and remains a minor instrumentation concern | PASS-WITH-KNOWN-ISSUE |
| Mobile 390 | All four step controls fit, content stacks, sticky action remains usable, and no horizontal overflow was observed | PASS-WITH-KNOWN-ISSUE |
| Tablet 768 | Top stepper, evidence list, and action areas reflow without horizontal overflow | PASS |
| Desktop 1440 | Sidebar + workbench + decision context preserve the intended alignment spine and density | PASS |

## Acceptance criteria coverage

| Criteria | Evidence | Verdict |
|---|---|---|
| AC-1–AC-3 | Fresh shell, sample load, usable empty/recovery states; fixture load path observed | PASS for fixture path; provider/parser failure unexecuted |
| AC-4–AC-6 | Valid add and invalid recovery observed; long-content boundary is covered by domain/UI guard but not manually re-entered in this run | PASS-WITH-GAP |
| AC-7–AC-9 | Claim status/source/limitation and accept path observed; edit persistence is implemented but not independently re-run in browser | PASS-WITH-GAP |
| AC-10 | Reviewed opportunity drafts brief with metric and readiness context | PASS |
| AC-11 | Missing claim produces `Needs validation` and blocks readiness/export | PASS |
| AC-12 | Manual provider/internal failure cannot be run because no provider adapter exists in v0 | NOT EXECUTED |
| AC-13–AC-15 | Memo sections, copy feedback, and incomplete-export gate observed | PASS |
| AC-16 | UI visibly labels the `資料邊界`; output remains candidate/human-reviewed | PASS |
| AC-17 | No future provider exists to fail over; deterministic/manual boundary is documented | CONTRACT ONLY |
| AC-18 | Export requires a reviewed claim; human action is required before ready state | PASS |
| AC-19 | 390×844 screenshot and overflow check show responsive reflow; sticky bar means the user should continue scrolling before reading the next section | PASS-WITH-KNOWN-ISSUE |
| AC-20 | Semantic labels, `aria-current`, `aria-invalid`, focus-ring CSS and focus-on-error behavior exist; complete keyboard-only and assistive-tech traversal was not run | PARTIAL |
| AC-21 | Empty/loading/success/validation/error-like recovery copy is present; provider error path remains unexecuted | PARTIAL |

## Visual evidence

- Generated concept anchor: [`concept-desktop.png`](./assets/concept-desktop.png)
- Fresh first-run desktop: [`first-run-1440.png`](./assets/qa/first-run-1440.png)
- Fresh loaded mobile: [`loaded-390.png`](./assets/qa/loaded-390.png)
- Fresh loaded tablet: [`loaded-768.png`](./assets/qa/loaded-768.png)

The final screenshots were inspected after implementation. The five-point comparison was: hierarchy/rail, graphite-neutral palette, literal copy and CTA, evidence-to-decision container relationship, and mobile stepper/action reflow. The implementation follows the accepted concept direction; it does not reproduce concept-only placeholder counts as product metrics.

## Findings and fixes during QA

1. **Fixed — stale derived readiness state**：after accepting a claim, the next action initially stayed at `Needs validation` because a memoized closure did not update with the claim review. The readiness calculation now derives from current state and the browser path shows `Ready for your confirmation`.
2. **Fixed — 390px stepper clipping**：the first mobile implementation used a minimum-width stepper that hid the fourth step. The 390px layout now uses four equal step columns and the overflow check passes.
3. **Known — local event trace on double activation**：the visible state is idempotent, but two local `experiment_drafted` events can be recorded when a user double-clicks. This is not external telemetry in v0; add event de-duplication before any real instrumentation is introduced.
4. **Known — mobile sticky action and reading position**：the opaque action bar remains available while scrolling, so the next section may begin close to its upper edge in the first viewport. No horizontal overflow or text inside the bar is obscured; a later polish pass can add an explicit safe-area spacer if task sessions show hesitation.

## Not covered / not claimed

- No real LLM/provider quality, latency, token cost, prompt-injection resistance, or model failure behavior.
- No Chrome Extension QA sign-off because that route was unavailable in this session; Playwright CLI was used as the documented fallback.
- No complete keyboard-only traversal, screen-reader audit, native iOS/Android behavior, or low-bandwidth network test.
- No real PM task sessions, user interviews, activation, retention, referrals, GitHub traffic, stars, adoption, or 10K-star forecast evidence.
- No in-product GitHub authentication, repository mutation, MCP action, issue automation, or external side effect. The separate repository bootstrap is tracked in the release handoff after this QA run.

## Exit conditions for the next gate

The repository is now a public preview. The next evidence gate is to rerun the same matrix as changes land and add:

1. five target-user task sessions with the primary flow completion target of 4/5 without facilitator rescue;
2. a real provider adapter behind the typed port, with offline eval and visible failure/recovery cases;
3. Chrome Extension or equivalent browser evidence plus keyboard/screen-reader pass;
4. fresh hosted browser evidence after each release-affecting change;
5. fresh public traffic and star measurements, reported as observations rather than promises.
