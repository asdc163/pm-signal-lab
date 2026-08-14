# PM Signal Lab：Chrome Extension / Assistive Technology Blocked QA Report — 2026-08-15

## Status

`Blocked QA Report`：本報告不是 Chrome、螢幕閱讀器或真人 usability 的完成證明。

這一輪的 inline claim editor 已經有 owner-run local browser evidence；但目前這個 Codex session 沒有可操作的 `Codex Chrome Extension` control surface，因此不能把 headless Chromium fallback 寫成 Chrome Extension sign-off，也不能把 semantic checks 寫成 VoiceOver、NVDA 或 TalkBack pass。

## QA scope

- Product：PM Signal Lab public preview；local-first、in-memory、deterministic fixture、沒有外部 AI provider。
- User/job：PM 在回看 source mapping 與 limitation 時，修改一句暫定 claim，然後知道它仍需自己確認。
- Feature under test：`編輯判斷` inline editor，包含正常輸入、空白錯誤、取消、重新開啟、儲存後回到 `需要你確認`、keyboard focus 與 mobile layout。
- Release goal：確認這個 interaction slice 可被理解、修正、取消、重新確認，且不丟失來源脈絡。
- In scope：first-run → sample pack → source → verify → inline edit；error/recovery；refresh boundary；390px responsive；keyboard semantics；Chrome Extension route availability。
- Out of scope：provider quality、AI rewrite、telemetry、登入、持久化、GitHub auto-mutation、real-device sign-off、non-owner usability、10,000 GitHub stars。

## TA / Market Context Brief

- Target segment：需要把訪談、客服、產品觀察或競品片段整理成下一步的 PM、founder、product designer、product engineer。
- Locale / language：目前以繁體中文介面與台灣 PM 語境為主；英文 README／issue path 是協作補充，不代表已完成跨市場 localization。
- Current workaround：通常會在文件、試算表、筆記或聊天紀錄之間手動維護來源與結論；這是待真人研究確認的 workaround hypothesis，不是本輪市場規模證據。
- Trigger event：例會前需要把多個訊號收斂成一個可驗證的 product decision，或發現一個 claim 需要回看來源。
- Device / channel：公開 hosted web preview；desktop workbench 是主要設計情境，mobile 是 recovery／quick review 情境；real-device coverage 未執行。
- Emotional / social job：在不過度相信整理工具的前提下，讓 PM 能帶著一個有來源、有限制的下一步進入團隊討論。
- Trust / privacy expectation：使用者需要知道內容是否離開頁面、刷新是否會遺失、claim 是否已被採用；本版以 visible local-only boundary 與 manual GitHub handoff 回應。
- Evidence confidence：目前是產品假設 + owner-run workflow evidence；沒有 non-owner task session、retention、adoption、traffic 或 star-growth evidence。

### Scenario Simulation Matrix

| ID | Segment | Scenario | Trigger | Workaround hypothesis | Device / context | Trust question | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TA-SIM-001 | PM | 正常回看並修改一個 claim | 來源與原判斷不完全一致 | 回文件找原文再手改 | desktop hosted preview | 修改後是否仍需自己確認？ | hypothesis |
| TA-SIM-002 | 低耐心使用者 | 空白輸入後想快速回復 | 不確定文字是否可儲存 | 直接放棄或另開筆記 | mobile-like viewport | 錯誤是否保留我的脈絡？ | hypothesis |
| TA-SIM-003 | 隱私敏感使用者 | 先確認資料邊界再貼訊號 | 擔心 customer data 被上傳 | 不使用工具或先匿名化 | hosted web | refresh、外部傳送與 GitHub handoff 是否清楚？ | owner evidence only |

## Environment and route evidence

| Item | Evidence / status |
| --- | --- |
| Repository | `/Users/tommy/Documents/ChatGPT/Github Sar 養成計劃` |
| Local URL | `http://127.0.0.1:5175/`，Vite dev server，owner-run |
| Hosted URL | `https://asdc163.github.io/pm-signal-lab/`，本報告不把 hosted smoke 當成 Chrome Extension evidence |
| Local browser fallback | Playwright 1.62.1，headless Chromium；可證明目前 DOM／行為，但不等於既有 Chrome profile、Chrome Extension 或 assistive technology |
| Requested Chrome route | `Codex Chrome Extension`：本 session control surface unavailable，blocked |
| Browser disabled route | `Browser disabled`：blocked |
| Computer Use fallback | `Not used`；未以其他桌面自動化路徑冒充 Chrome evidence |
| Screen reader | `Not executed`：VoiceOver／NVDA／TalkBack 均未驗證 |
| Real device | `Not executed`：本輪沒有 iOS／Android physical-device evidence |
| Test data | deterministic sample pack；未貼入 customer data、API key、token 或 private roadmap |

### Why the route is blocked

1. 依 Chrome Extension QA route，必須先取得能操作既有 Chrome tab 的 control surface。
2. 本輪可用工具清單沒有該 control surface；因此無法宣稱已在使用者的 Chrome profile、既有 session 或真實 extension context 中操作。
3. 依證據邊界，不能用 Playwright、hosted HTTP 200、build success 或 screenshot 代替這一層證據。

這是 QA 環境阻塞，不是已確認的產品 bug。要解除它需要工具／環境狀態改變，或由使用者在可操作 Chrome Extension 的 session 中重新執行同一份 matrix。

## Behavior Matrix

| user archetype | target job | starting state | feature logic | success signal | failure signal | trust question | evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| first-time PM | 看懂產品用途並完成第一個 claim review | empty first-run | 載入 fixture → 查看來源 → 開始核對 → 編輯判斷 | 能說出下一步，且在 claim detail 找到編輯入口 | 把產品誤認成聊天機器人、找不到來源或主要 CTA | 我是在看來源，還是在相信一個黑箱？ | local owner-run；Chrome blocked |
| PM correcting a claim | 保留來源與限制，只修正 claim 文字 | expanded claim detail | 編輯 → textarea → 儲存 → status 回到 `需要你確認` | 新文字出現；source mapping／limitation 保留；沒有 auto-accept | 文字被清空、來源消失、儲存後變成 supported | 修改後是否知道仍要自己確認？ | local normal/save verified；Chrome blocked |
| PM backing out | 不想修改時回到原狀態 | inline editor open | 按 `取消` 或空白保存後修正 | 原文保留；錯誤可讀；可重新開啟 | 取消仍改到 claim、focus 丟失、頁面跳走 | 我能安全地反悔嗎？ | local cancel/empty verified；Chrome blocked |
| keyboard-only PM | 不使用滑鼠完成 edit/recovery | expanded claim detail | focus editor → Tab → 取消／儲存 → reopen | labelled textarea、error、兩個 button 都可到達，focus 可理解 | focus 跳出 detail、無 visible focus、Enter 觸發錯誤外部動作 | 我知道目前焦點與下一步在哪裡嗎？ | local semantics/Tab verified；screen reader blocked |
| mobile PM | 在 390px 寬度完成短句修正 | loaded verify view on phone-sized viewport | 展開 → 編輯 → 輸入 → 取消或儲存 | no horizontal overflow；controls 至少 44px；按鈕可觸控 | 欄位裁切、按鈕太小、sticky action 蓋住內容 | 我能在小螢幕看完來源與限制嗎？ | local 390px verified；real device blocked |
| screen reader user | 理解 claim、source、limitation 與 editor 狀態 | expanded claim detail | 讀 heading／region／label／helper／alert | region 有可辨識名稱；textarea 有 label/helper/error 關聯 | 只讀到「編輯」而不知道上下文、錯誤不播報、狀態不明 | 螢幕閱讀器是否能傳達「修改不是採用」？ | static semantics only；AT blocked |
| real Chrome user | 在既有 Chrome session 完成同一任務 | hosted demo in real Chrome | 執行上述 normal／error／recovery／mobile-like flow | Chrome extension evidence 可回看，且沒有 console/page errors | 無法取得 tab、extension route 失效、Chrome-only 行為不同 | 公開 demo 在我實際使用的瀏覽器是否可信？ | route unavailable in this session |

## Executed fallback evidence — not Chrome sign-off

這些結果是本輪 fresh owner-run local browser evidence。它們只證明目前 working tree 在 fallback runtime 的可觀察行為，不能解除 Chrome／AT blocker。

| Case | Steps | Observed result | Console / page errors |
| --- | --- | --- | --- |
| Normal edit | `載入範例資料 → 查看來源 → 開始核對 → 編輯判斷` | inline form 出現；label 為 `編輯判斷文字`；focus 進入 textarea；沒有 native prompt | `0 / 0` |
| Empty save | 清空 textarea → `儲存判斷` | `判斷不能是空白；請保留一句可以被回看的說法。`；文字保留空白輸入；原 claim 仍可見；form 未關閉 | `0 / 0` |
| Valid save | 輸入句子 → `儲存判斷` | 新文字可見；狀態回到 `需要你確認`；source mapping 與 `目前限制` 仍可見 | `0 / 0` |
| Reopen / cancel | 再按 `編輯判斷` → 確認 textarea 內容 → `取消` | 重新開啟可讀回新文字；取消後 editor 關閉且新文字保留 | `0 / 0` |
| Keyboard | textarea focus → `Tab` | 依序到 `取消`、`儲存判斷`；controls 可操作 | `0 / 0` |
| Mobile layout | viewport `390px`；開啟 editor | `scrollWidth 390 / clientWidth 390`；textarea 寬 `266px`；兩個 button 各 `266 × 44px` | `0 / 0` |
| Semantic relation | inspect DOM | textarea 有 stable `id`、visible label、`aria-describedby`；error 使用 `role=alert`；claim detail 使用 labelled region | static DOM check only |
| Refresh boundary | edit claim → reload | page returns to first-run；edited claim no longer present | `0 / 0` |

## UX Diagnostic Matrix

| Lens | User question | Failure signal | Evidence to collect next | Current direction | Priority |
| --- | --- | --- | --- | --- | --- |
| First-five-second comprehension | 這是做什麼、我先按哪裡？ | 無法用一句話說出 source-to-decision job | 5-second paraphrase from non-owner PM | 保留 `先看來源，再決定下一步` 與單一 first-run CTA | P1 |
| Mental model / IA | 編輯是在改答案還是採用答案？ | 儲存後誤以為已被系統採用 | task-session observation；回問 status interpretation | helper 明示修改後仍需確認，status 不自動 supported | P0 |
| Ability / friction | 這次修改是否值得我停下來？ | editor 太長、欄位或按鈕被忽略 | time-on-task、backtracking、mobile hesitation | inline continuation；不加 modal、AI rewrite 或額外設定 | P1 |
| Feedback / recovery | 空白或取消後我能否回來？ | re-click、原文消失、錯誤後 abandon | browser trace + user narration | preserve input、field error、cancel、reopen | P0 |
| Trust / AI / dignity | 來源、限制與資料邊界是否可見？ | 把 deterministic suggestion 當成模型結論 | trust question + issue feedback | source／limitation 同區；資料明示 reload reset；no AI confidence | P0 |
| Accessibility | 不用滑鼠或只聽語音是否能完成？ | focus 不明、label/helper/error 不連續 | Chrome Extension + VoiceOver/NVDA pass | semantic controls and visible focus first；AT remains blocked | P0 |

## Five-Second Comprehension Test — pending non-owner evidence

| Viewport | Current owner-run observation | Product/category understood | Primary next action | Trust evidence | Confidence |
| --- | --- | --- | --- | --- | --- |
| desktop | UI shows `PM 工作紙`、`先看來源，再決定下一步`、`來源 → 判斷 → 驗證` | owner-run only；not general usability evidence | `載入範例資料` | source / limitation / reload boundary visible | unverified for target users |
| mobile | single-column first-run and sticky action render without local overflow | owner-run only；real phone not tested | same first-run action | short boundary copy visible | unverified for target users |

## Task-Based Usability Protocol — not yet executed with non-owner users

| ID | Profile | Task/job | Start state | Success criterion | Time / completion | Observed confusion | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| UX-TASK-001 | PM or founder, desktop | edit one claim and decide whether to accept it | loaded sample, first claim collapsed | completes edit, explains why status remains `需要你確認` | not collected | not collected | owner-run browser only |
| UX-TASK-002 | keyboard-only PM | edit, trigger empty error, recover, cancel | expanded claim detail | finishes without pointer and reports focus path | not collected | not collected | local keyboard fallback only |
| UX-TASK-003 | low-trust / privacy-sensitive PM | inspect source, limitation and refresh boundary | first-run then loaded sample | can state what leaves the page and what does not | not collected | not collected | local copy check only |

## Assistive-Technology User Profiles

| Profile | Tool/context | Core task | Known risk | Manual checks | Evidence |
| --- | --- | --- | --- | --- | --- |
| screen reader user | VoiceOver or NVDA with real Chrome | locate claim region; edit; hear helper/error; understand status | region/label/live error order may not match visual order | heading navigation, form label, `aria-describedby`, `role=alert`, status announcement | blocked; not executed |
| keyboard-only user | real Chrome + Tab/Shift+Tab/Enter | complete normal and recovery paths | focus could leave detail or become invisible | focus order, focus-visible, submit/cancel, backtracking | local fallback verified; Chrome route blocked |
| low-vision user | 200% zoom / high contrast | read source and limitation while editing | clipping, reflow, contrast, target size | zoom 200%, no horizontal scroll, focus and status contrast | not executed |
| mobile assistive user | iOS Safari/Android Chrome + assistive tech | complete edit on real device | browser viewport and virtual keyboard can change layout | virtual keyboard, scroll position, target size, spoken labels | not executed |

## Deep QA Toolchain Matrix

| QA layer | Required? | Current evidence | Tool / method | Gate | Status / out-of-scope reason |
| --- | --- | --- | --- | --- | --- |
| Product / TA | yes | owner product contract; no non-owner sessions | PM session kit + field note | ≥5 target sessions before promotion | pending |
| UX behavior | yes | normal/error/cancel/save/reopen local trace | fallback browser route | state oracles pass | local pass; Chrome route blocked |
| Code correctness | yes | tests/lint/build | npm scripts | exit 0 | pending final release run |
| E2E browser | yes | local fallback only | Playwright 1.62.1 | fresh normal + recovery | local evidence; not Chrome proof |
| Accessibility | yes | DOM semantics + keyboard fallback | DOM inspection + keyboard path | label, helper, error, focus, target size | partial; AT blocked |
| Visual regression | yes | 390 / 1440 screenshot capture | screenshot review | no clipping / no AI-slop decoration | pending final capture review |
| Performance | bounded | no formal budget run in this slice | build output / manual load | no new provider or asset budget | not a release claim |
| Security / privacy | yes | no API/provider; refresh boundary and privacy copy | source review + local behavior | no external side effect | partial; formal review out of scope |
| Supply chain / CI | yes | existing npm lock and GitHub workflow | npm install/test/build + CI | workflow succeeds | pending final push readback |
| AI eval / red-team | no for v0 | no provider, no model output | explicit no-provider boundary | no AI quality claim | intentionally out of scope |
| Observability | no for v0 | no telemetry or external logging | manual event receipt only | no hidden collection | intentionally out of scope |

## Repo QA Surface

- Repo path: `/Users/tommy/Documents/ChatGPT/Github Sar 養成計劃`
- Stack: Vite + React + TypeScript; npm package manager.
- Existing QA scripts: `npm test -- --run`, `npm run lint`, `npm run build`, `git diff --check`。
- Existing CI: GitHub Pages build/deploy workflow on `main`。
- Browser/UI test config: no published CI Playwright suite; current fallback evidence is owner-run.
- API contract: none for v0；no external API boundary。
- Security/observability configs: no formal scanner or telemetry in this slice。
- Missing surfaces: Chrome Extension control, screen-reader execution, real-device matrix, non-owner research, continuous browser E2E。

## QA Evidence Manifest

| artifact / path | run or command | result | evidence boundary |
| --- | --- | --- | --- |
| `src/App.tsx`, `src/styles.css` | current working-tree inspection | inline editor and session boundary present | source inspection is not user evidence |
| `docs/product/pm-signal-lab/assets/qa/inline-editor-1440.png` | fresh local screenshot | desktop editor open with source／limitation context | visual artifact is not Chrome or AT evidence |
| `docs/product/pm-signal-lab/assets/qa/inline-editor-390.png` | fresh local screenshot | mobile editor open; stacked controls and no visible clipping | visual artifact is not real-device evidence |
| local URL `http://127.0.0.1:5175/` | fresh owner-run fallback browser | normal/error/recovery/mobile/keyboard observed | not Chrome Extension or AT evidence |
| `docs/product/pm-signal-lab/17-inline-claim-editor-a11y-contract-2026-08-15.md` | KB plan score | `100/100` before this report | contract quality is not product usability |
| `Codex Chrome Extension` route | control-surface availability check | unavailable / blocked | no alternative route claimed |
| hosted Pages URL | HTTP/hosted smoke | separate release evidence | does not prove Chrome or AT |

## Test Data & Privacy Matrix

| Flow | Fixture/source | Synthetic or real | PII class | Reset / cleanup | External side effect |
| --- | --- | --- | --- | --- | --- |
| sample load | bundled sample evidence | synthetic | none intended | reload resets page state | none |
| custom evidence | user-entered local form | unknown user input; must be non-sensitive | reject customer names/tickets/secrets | reload resets; user must copy desired output | none |
| feedback field note | local generated Markdown | self-reported session metadata | no raw evidence or private data | clear/reload resets | manual GitHub handoff only |
| claim edit | in-memory claim draft | synthetic fixture in this run | none | cancel or reload | none |

## Flake & QA Debt Register

| Item | First seen | Current status | Risk | Next action |
| --- | --- | --- | --- | --- |
| Chrome Extension route unavailable | 2026-08-15 | blocked | cannot sign off real Chrome profile behavior | rerun in a session with the route available |
| Screen reader execution absent | 2026-08-15 | not executed | semantic DOM may not equal spoken experience | VoiceOver/NVDA manual pass |
| Real-device keyboard/virtual keyboard absent | 2026-08-15 | not executed | mobile browser behavior may differ | iOS/Android pass before device claim |
| Non-owner task evidence absent | prior public preview | pending | no general usability/adoption inference | recruit five target users; triage three reports |
| Continuous browser suite absent | existing repo surface | accepted debt | regressions require fresh manual fallback | add narrow CI E2E only after task path stabilizes |

## AI Eval Dataset Register

No AI eval dataset is applicable to this v0 slice: there is no model/provider output. The product intentionally exposes deterministic candidate claims and a human review boundary. Any future provider adapter requires a separate groundedness, source freshness, uncertainty, latency, cost and prompt-injection evaluation plan before release.

## Trace-Based Observability Assertions

No external trace or telemetry is present by design. The only current trace is the visible local event receipt used to prepare a manual feedback note. Assertions for this slice are:

1. Editing a claim does not call an external provider or GitHub mutation.
2. Empty save does not mutate the claim.
3. Valid save sets `edited: true`, `reviewed: true`, and `status: review`.
4. Refresh removes the in-memory pack and edited claim.

## Feature Logic Map

- Product promise: help a PM move from source to a reviewable next step.
- Roles / permissions: single unauthenticated local operator；沒有共享 workspace、admin role 或外部 write permission。
- Core entities: `Evidence → Claim → ExperimentBrief → DecisionMemo`。
- State transitions: `expanded claim → editing → error | cancelled | review-needed`。
- AI / tool contract: v0 uses deterministic fixture and local rules；沒有 model call、provider、MCP action 或 automated browser action。
- Source of truth: local React state plus deterministic domain fixture；no remote persistence。
- Evidence sources: current DOM／visible state、local tests／lint／build、owner-run browser trace、hosted HTTP／workflow readback；每一層只支撐對應層級的 claim。
- Irreversible action: none inside the editor；GitHub feedback is manually inspected and submitted by the user。
- Rollback: revert the single release commit if external sessions show lower comprehension or task completion。

## Risk Ranking and Quality Economics

| Area | Risk | Why it matters | Priority / reversible? |
| --- | --- | --- | --- |
| Chrome / AT evidence | release decision based on wrong browser layer | false confidence damages Tommy's public credit | P0; reversible by holding claim |
| Claim trust state | edit mistaken for adoption | PM may carry an unsupported conclusion into experiment | P0; code change reversible |
| Refresh boundary | user loses work unexpectedly | silent loss creates privacy and trust friction | P1; copy and export path reversible |
| Mobile interaction | controls clipped or too small | target PM cannot complete the task | P1; CSS reversible |
| Adoption / stars | vanity metric pressure changes product scope | auto-promotion would weaken product truth | P0; hold until external evidence |

Protected user/business outcome: a PM can inspect evidence and make a consciously bounded next decision. The main quality cost is trust/support damage from claiming evidence that was not collected; the current decision is therefore to keep the public preview honest and keep the Chrome/AT gate open.

## QA List

### QA-001 — Chrome route availability gate

- Priority: P0
- Traceability: inline editor contract Step 6; Chrome Extension QA route.
- User/job: real Chrome user must complete the hosted task in the actual browser context.
- Preconditions: Codex Chrome Extension control surface and an opened canonical URL.
- Steps:
  1. Claim the existing Chrome tab without changing profile, login, or permissions.
  2. Open the canonical Pages URL.
  3. Run normal edit, empty save, cancel, valid save, refresh, and mobile-like resize if supported.
  4. Record visible outcomes, focus, console/page errors, and recovery.
- Expected visible result: all state oracles match the local fallback matrix; no unexpected navigation or external mutation.
- Current result: blocked before Step 1 because the control surface is unavailable in this session.

### QA-002 — Screen-reader claim review

- Priority: P0
- Traceability: accessibility and trust requirements.
- Steps: navigate headings and regions; locate the claim; open editor; hear label/helper; submit empty; hear alert; cancel; reopen and save.
- Expected visible/announced result: the user can distinguish source, limitation, editor, error and `需要你確認` without visual assistance.
- Current result: not executed; no screen-reader evidence.

### QA-003 — Mobile real-device recovery

- Priority: P1
- Traceability: mobile acceptance criterion.
- Steps: on iOS and Android physical devices, load fixture, open claim, edit with virtual keyboard, trigger empty error, cancel, reopen, save.
- Expected visible result: no clipped content, target controls remain usable, scroll position and keyboard dismissal are recoverable.
- Current result: not executed; 390px local viewport is only a fallback layout check.

### QA-004 — Non-owner PM task session

- Priority: P0 before promotion
- Traceability: product learning loop and README promotion triggers.
- Steps: recruit five target users; give only the five-minute session kit; observe without walkthrough; collect task result, hesitation, trust, recovery and one change.
- Expected evidence: at least five sessions and three triageable reports; no invented success metrics.
- Current result: not executed.

## Findings

### BQA-001 — Chrome Extension control surface unavailable

- Severity: `P1 release-gate blocker` for Chrome evidence; not a confirmed product defect.
- Environment: this Codex desktop session; canonical product route available as local/hosted web but Chrome Extension control unavailable.
- Repro: attempt to route QA through the Codex Chrome Extension; no callable control surface is available; Browser is disabled and Computer Use was not used.
- Expected: operate the existing Chrome tab and collect browser-layer behavior evidence.
- Actual: only a Playwright headless Chromium fallback is available.
- Likely user interpretation: none can be inferred because no target user was observed; internally, treating fallback as Chrome sign-off would overstate coverage.
- Product/UX risk: false release confidence and loss of credibility, not a demonstrated user-facing failure.
- Fix brief: re-run the existing matrix when the approved Chrome Extension route is available; do not weaken the evidence boundary.

## Not covered

- Chrome Extension tab control and Chrome profile behavior。
- VoiceOver、NVDA、TalkBack、browser zoom 200% and high-contrast manual review。
- iOS／Android physical devices, virtual keyboard and native share behavior。
- Non-owner PM／founder／designer／engineer task sessions。
- General usability, retention, adoption, traffic, conversion or GitHub star growth。
- External provider behavior, model quality, prompt quality, RAG groundedness, latency, cost or observability。

## Exit criteria for removing the block

Do not change this report to `passed` until all of the following are directly observed and recorded:

1. An approved Codex Chrome Extension control surface is available and the canonical hosted URL is exercised in the real Chrome context.
2. QA-001 normal, empty, cancel, save, refresh and recovery paths have fresh evidence with no unexplained console/page errors.
3. QA-002 is manually completed with at least one screen reader profile; label, helper, error, focus and status announcement are recorded.
4. QA-003 is completed on the target device platforms if the project makes a real-device claim.
5. QA-004 has five non-owner sessions and at least three triageable reports before any feature expansion or adoption statement.
6. The release audit names the exact commit, URL, environment, evidence artifacts and remaining gaps.

## Current decision

Keep PM Signal Lab public preview. The inline editor slice can proceed through static/local verification and a carefully labelled public release, but the Chrome Extension／AT gate remains open. The next product decision is learning from real sessions, not adding AI polish, auto-operation, or growth automation.

## Production Feedback Plan

- Logs / errors / jobs：v0 沒有外部 production log 或 background job；每次 release 以 CI、Pages deploy、canonical HTTP、fresh hosted smoke 與 browser console/page errors 做 evidence packet。
- Analytics / funnel：刻意不加入 telemetry；用 field note 的 task result、hesitation、trust、recovery 與 one change 做人工 triage，不把 issue 數當 adoption rate。
- Session replay / support：不使用 session replay；GitHub issue 由使用者自行檢查、手動提交，maintainer 只處理公開且不含敏感資料的回報。
- AI eval / prompt regression：本版沒有 provider；未來任何 adapter 要先補 groundedness、source freshness、uncertainty、prompt-injection、latency 與 cost dataset。
- Alert / hold thresholds：CI 或 Pages deploy 失敗、canonical HTTP 非 200、privacy gate 可被繞過、或 claim edit 發生外部 side effect 時，停止 promotion；沒有證據時標為 `未驗證`。

## Fix Brief For Other AI / Regression Cases

### BQA-001 fix brief

- Owner hint：具備 approved Chrome Extension route 的 QA operator。
- Acceptance：使用真實 Chrome tab 完成 QA-001，保存 environment、exact URL、timestamp、visible state、focus trace、console/page error結果與 artifact path；不使用 Playwright 代替 Chrome。
- What not to change：不為了通過 QA 偷加 provider、telemetry、auto-submit、permission、登入或 fake success state。
- Verification：重新執行 QA-001、QA-002、QA-003，並更新本報告的 blocked／not covered 段落與 release audit。

### Regression candidates

1. `編輯判斷` 不得重新引入 `window.prompt` 或任何未標籤的 native interaction。
2. 空白保存必須保留原 claim、保留輸入、顯示 field error，且不改 source mapping／limitation。
3. 有效保存必須保持 `status: review`、`reviewed: true`、`edited: true`，不能自動變成 supported。
4. 取消、重新開啟與 refresh 必須符合目前頁面的資料邊界文案。
5. 390px 不能水平溢出；editor buttons 與 mobile controls 需保持至少 44px 高度。
6. 任何 public release audit 必須同時列出已驗證與未驗證層級，不得用 CI 或 HTTP 200 推導真人 usability、Chrome 或 adoption。
