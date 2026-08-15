# PM Signal Lab — design and accessibility polish local QA

**Date:** 2026-08-15
**Surface:** local Chrome Extension browser route at `http://127.0.0.1:5176/`
**Scope:** English-first worksheet vocabulary, focus restoration, desktop/mobile behavior, and the existing source-to-brief workflow
**Related contract:** [`44-design-a11y-completion-contract-2026-08-15.md`](./44-design-a11y-completion-contract-2026-08-15.md)

## Result

The final local code passed the current-scope code checks and the Chrome Extension browser route. The visual polish replaces repeated `Case 01`, `Case file`, `Review docket`, and `Case workflow` chrome with literal PM worksheet language: `Worksheet`, `Source lines`, `Review claim`, `Test brief`, `Decision brief`, and `Worksheet context`.

The route is suitable for a public preview at the local evidence layer. This record does **not** claim hosted verification, native screen-reader sign-off, external PM adoption, or GitHub star growth.

## Code evidence

| Check | Result | Evidence |
| --- | --- | --- |
| Domain tests | PASS | `npm test -- --run`: 4 test files, 9 tests passed. |
| Typecheck / lint | PASS | `npm run lint`: exit 0. |
| Production build | PASS | `npm run build`: Vite transformed 1,585 modules and emitted `dist/` successfully. |
| Contract quality | PASS | `score_kb_plan.py ... --min-score 85`: `KB plan score: 100/100`. |
| UI copy audit | PASS | `src/App.tsx` contains no stale `Case 01`, `Case file`, `Review docket`, or `Case workflow` labels. Remaining “support case” wording is a source-domain example, not interface chrome. |

## Behavior matrix

| State / job | Action performed | Expected | Observed |
| --- | --- | --- | --- |
| Empty first run | Fresh navigation | User sees a clear first action and local boundary | `Load sample data` is visible in the current worksheet status, right context, and compact action bar; `Add your own signal` remains secondary. |
| Loading | Activate sample load | Busy state completes without losing the workspace | Four sample source rows appear and the success notice says the next step is to trace each claim. |
| Source inspection | Activate first `View source` | Source detail expands and remains tied to the row | Button becomes `Hide source`; one `.source-detail` region is present. |
| Claim review | Start review, open the first claim | Source mapping and limitation are visible | Verify shows three claims and the source-backed mapping remains attached. |
| Blank edit recovery | Open `Edit claim`, clear the textarea, save | Save fails closed; original text is preserved; focus stays in the editor | `role="alert"` says `A claim cannot be blank...`; textarea has `aria-invalid="true"` and remains focused. |
| Valid edit | Type a replacement and save | Claim remains reviewable with the source attached | Replacement text is visible, textarea closes, and the success notice says it is kept for review. |
| Human decision | Accept first claim; keep second as hypothesis | Only the person determines how the claim carries forward | Notice confirms acceptance; hypothesis notice explicitly says it is not a validated conclusion. |
| Decision brief | Choose accepted claim, draft experiment, export | Metric, guardrail, test, decision rule, limits, and next action are visible | Decide reaches `03 · Decide`; Ship reaches `04 · Ship` with a Markdown textarea. |
| Local handoff | Copy and download Markdown | Content remains available; no automatic submission | Copy notice and download notice both appear; no GitHub mutation occurs. |
| Pilot note privacy gate | Open pilot note; submit without confirmation | Output is blocked | Notice asks for confirmation that the report contains no customer data, private content, API keys, or tokens. |
| Pilot note output | Confirm privacy; prepare and copy | Field note is inspectable and manual handoff is explicit | Output appears with `This is a field note, not a validation result`; the link is the manual issue template URL; copy notice asks for a final private-content check. |

## Focus and keyboard oracle

The Chrome Extension route was exercised from fresh navigation rather than relying on an existing session.

- The skip link is reachable with the first `Tab`; activating it focuses `main#main-content`.
- The next `Tab` reaches `Load sample data`.
- After keyboard sample load, focus is restored to a visible `Start review` action.
- After keyboard `Start review`, focus is restored to the visible `Draft smallest experiment` action.
- At 390×844, sample load keeps `scrollY: 0`, focus is inside `.mobile-action-bar`, and the active control is `Start review`.
- The mobile run reported `overflowX: false` with four source rows present.
- Editor validation preserves focus and exposes the error through `role="alert"`.

The focus restoration was intentionally changed after the first trace found two problems: focus returned to `body` after sample loading, and the desktop context button was selected on mobile, scrolling the user to the lower rail. Compact viewports now prefer the fixed action-bar control.

## Visual review

Fresh screenshots were inspected at the default desktop viewport and at 390×844. The final mobile screenshot keeps the headline, `Current worksheet` status, source-line section, and sticky `Start review` action in one coherent first read. The desktop screenshot keeps the source-ledger workpaper in the center and the worksheet context in the rail without adding gradients, glass, chat framing, or artificial activity.

## Console and trust checks

- Final browser log inspection found `appConsoleIssues: []` for the local app origin.
- Extension-origin warnings from unrelated browser extensions were not attributed to PM Signal Lab.
- The UI continues to state: no login, no provider, no telemetry, no raw-signal transfer, no automatic GitHub issue, and refresh resets the session.
- The exported brief and pilot note retain `Not covered` / boundary language and do not claim completion, adoption, model quality, or growth.

## Coverage gaps

- **Hosted Pages after this change:** `Not verified` in this local record; verify the canonical URL only after the change is published.
- **Native VoiceOver / NVDA / TalkBack:** `Not verified`; DOM roles, focus, and semantic snapshots are not a native assistive-technology sign-off.
- **Real external PM session:** `Not verified`; the public pilot remains a request for five international testers in [issue #4](https://github.com/asdc163/pm-signal-lab/issues/4).
- **GitHub stars, traffic, retention, adoption:** `Not verified`; no number is inferred from local QA.

## Release decision

**Local preview gate: PASS.** The scoped polish is reversible and behavior-preserving at the tested local layer. A stronger public release statement must wait for canonical hosted HTTP/assets verification after Pages deployment and must keep the coverage gaps above visible.
