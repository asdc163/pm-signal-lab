# PM Signal Lab：Workbench Density Transition Contract — 2026-08-15

狀態：下一個可逆的產品表面 slice；目標是讓「載入資料後」更快進入 PM 工作，不改 domain、provider、資料邊界或外部副作用。
產品：PM Signal Lab
決策類型：two-way door；只調整已存在的工作紙抬頭、版面密度與 mobile safe-area，保留研究筆記方向。

## Problem Frame

- Decision：把空白初次使用與已載入工作區分成兩種密度。空白狀態保留 editorial cover，讓新使用者知道這是什麼；載入資料後收斂 hero，讓原文、claim 與下一個動作更早進入視線。
- User/job：PM 想把一段訪談、客服或產品觀察放上桌，快速回看來源、判斷限制，安排一個最小驗證，而不是先閱讀一段長篇產品宣傳。
- Current friction：目前 hosted preview 的 first-run 已能辨識產品，但 loaded verify screenshot 中大標、說明、路徑與狀態仍佔用大量首屏；工作區感覺仍像 landing page，實際 claim review 被推遠。這是 owner-run observation，不是一般 usability 結論。
- Outcome：載入 sample 後，在相同 viewport 中更早看到當前工作與第一個 evidence／claim control；不犧牲 step orientation、trust boundary、focus 或 recovery。
- Success metric：在 1440、768、390 三個 viewport，loaded state 的第一個工作區 section top 位於 compact masthead 之後；mobile sticky action 下方保留安全空間，最後一個可操作 control 不被遮住。這些是 layout／behavior assertions，不是 adoption 或 general usability。
- Evidence boundary：目前可取得 owner-run local／hosted browser、DOM measurements、screenshots、console／page errors、static gates；真人 PM session、Chrome Extension、AT、adoption、stars 仍未驗證。
- Constraints：繁體中文、390／768／1440 reflow、keyboard semantic controls、reduced motion、CJK 可讀性、local-only session、source／limitation／human review boundary；不引入新套件、provider、telemetry 或 external mutation。
- Out of scope：不重做四步 workflow、不新增 model、登入、資料庫、事件追蹤、社群功能、GitHub 自動互動或任何 stars manipulation。

## Product Scope

### Must have

- `pack === null` 時保留目前 first-run editorial cover 與單一主要 CTA。
- `pack !== null` 時給 `workbench` 可辨識的 loaded class，縮短 hero 的垂直間距與顯示尺寸，讓 current step／第一個 work section 更早出現。
- loaded state 仍顯示 literal product truth：原文筆數、目前 step、local-only boundary 與可回看的下一步。
- mobile 390 的 sticky action bar 仍可操作，main content 具有足夠底部空間，不遮住最後的 feedback／export controls。
- 靜態、單元、build、browser flow、responsive、console／page error gates 全部重新執行。

### Nice to have

- loaded hero 的 route 在桌面維持方向提示，在小螢幕縮成短 caption，避免重複佔高。
- screenshot evidence 同時保留 first-run 與 loaded verify，方便日後比較 density，而不是只存漂亮首頁。

### Should not build

- 不增加裝飾、gradient、glass、orb、KPI、fake progress、AI activity、confidence 或 generic marketing promise。
- 不把目前已存在的 work section 改成 card grid；不為了密度移除 heading、focus ring、aria、error、recovery 或 trust copy。

## Acceptance Criteria

- First-run：fresh load 仍有 `把一句話放回它的來源`、`載入範例資料`、`自己新增一筆訊號`，且沒有 horizontal overflow。
- Loaded collect：載入 sample 後，`workbench` 有 loaded state class；`evidence`／collect work section 的 top 比 first-run hero 的 baseline 更早，且 sample count、step、資料邊界仍在 DOM 可見。
- Loaded verify：點入 `核對` 後，第一個 claim／source action 在 compact masthead 下可見；不出現 console error 或 page error。
- Flow：sample → source expand → verify → accept／keep／missing 或 edit recovery → decide → experiment draft → ship → export／copy／feedback privacy gate → reset 可完成；Clipboard、download 或 external issue handoff 若環境限制，必須標為未驗證，不得用假成功補上。
- Responsive：1440、768、390 的 `scrollWidth === clientWidth`；390 的 sticky action bar 高度加 safe-area 後，頁面底部最後一個 control 可透過 scroll 露出。
- Accessibility：`h1`、workflow current state、main region、primary actions、editor error focus 與 keyboard path 不退化；`prefers-reduced-motion` 不依賴動畫理解狀態。
- Release：`npm test -- --run`、`npm run lint`、`npm run build`、`git diff --check` exit 0；CI／Pages success，canonical URL HTTP 200 且 hosted browser smoke 通過。

## UX Flow And States

- First-time：editorial cover → `載入範例資料` 或 `自己新增一筆訊號`；仍用原話 preview 讓使用者先理解工作物件。
- Loading：真實 sample load feedback；不新增 fake thinking。loaded class 只在資料狀態存在後生效。
- Loaded work：compact masthead → current step → evidence／claim work section；內容順序仍是來源 → 判斷 → 驗證。
- Friction：claim editor 留空、source／content 欄位錯誤、feedback privacy 未確認；錯誤靠近欄位且 focus 可回復。
- Recovery：取消 editor、回前一步、重設 sample、重新準備 export；不得因 compact CSS 清掉現有 controls。
- Mobile：sticky action 是最後一個 viewport-level action；main bottom padding 必須包含 action bar 與 safe-area 的可見餘裕。
- Trust／privacy：只留目前頁面、重新整理會重設、沒有登入或外部傳送；feedback 只在使用者明確勾選 privacy gate 後產生可手動送出的文字。

## UX/AI/security gate

- UX gate：first-time、empty、loading、error、recovery、mobile、keyboard、focus、sticky action 與 reduced motion 必須在 fresh browser trace 中可觀察；compact 只改密度，不移除原有工作控制。
- AI gate：本 slice 不新增 provider、model output、confidence、fake progress 或 AI activity；所有結果仍是 fixture／user-entered evidence 與 human review 狀態。
- Security gate：不新增 secret、token、permission、telemetry、customer data 或外部寫入；session boundary、privacy checkbox 與手動 GitHub handoff 必須保持可見。

## Product Craft And No-AI-Feel Contract

## KB Application Contract

### Relevant KB

- `foundations/design-brain.md`：適用於這次 shell 密度判斷；設計理由是產品表面要先服務「回看來源與安排驗證」，所以 loaded state 使用更密的 workpaper rhythm，而不是再加一個視覺效果。Tradeoff 是首屏 spectacle 變少，但工作物件更早可見。
- `foundations/design-composition-layout.md`：適用於 first read／second read、proximity、alignment spine 與 responsive reflow；設計理由是 compact hero 必須把閱讀順序從 masthead 推回 evidence／claim，而不是只縮小字。Tradeoff 是仍保留 step orientation，避免密度變成迷路。
- `foundations/product-craft-anti-ai-slop-operating-system.md`：適用於 product truth、subject specificity 與 no-AI-feel；設計理由是密度只由 `pack` 這個真實 domain state 驅動，不由 fake progress、模型 activity 或抽象 capability copy 驅動。Tradeoff 是不提供炫技式動態。
- `foundations/web-design-system-playbook.md`：適用於 semantic tokens、component states、mobile spacing 與 evidence gate；設計理由是所有變更集中在 scoped tokens／selectors，避免每個 view 產生新的視覺語法。Tradeoff 是改動小、rollback 清楚，但不處理其他歷史 shell debt。
- `foundations/design-typography.md`：適用於 CJK display／body hierarchy 與 mobile type check；設計理由是 loaded state 只收斂 display heading、copy measure 與 spacing，不壓縮 body line-height 或 touch target。Tradeoff 是桌機節省高度，手機仍保留閱讀舒適度。
- `foundations/behavioral-ux-qa-evidence-gate.md`：適用於 normal／friction／recovery、sticky action、focus 與 fresh evidence；設計理由是 screenshot 不能單獨證明工作完成，因此每個密度變更都要有 browser behavior trace 與未覆蓋清單。

本合約只使用與本 slice 直接相關的設計／UX規則；不把 KB 的 taste 當作產品成果，也不把 owner-run evidence 擴張成真人研究結論。

### Product truth

- Domain objects remain `Evidence`、quote、source／timestamp、`Claim`、limitation、`ExperimentBrief`、`DecisionMemo` 與 `Not covered`。
- First read after loading should be the current PM job, not an abstract AI capability or growth claim。
- Loaded density is a product behavior decision: a working notebook becomes denser after its first page is present; it is not a decorative animation。

### Visual rules

- Preserve the research folio DNA: paper ramp、serif display、flat rows、ruled margin、short margin note、one rust accent。
- Use type size、proximity、divider and alignment to compact; do not use shadow、gradient、pill、glow or dashboard counters。
- Keep first-run and loaded states intentionally different in density, not in brand or interaction vocabulary。

### Copy guard

- Keep literal phrases such as `原文`、`來源`、`限制`、`需要你確認`、`最小驗證`、`只留在目前頁面`。
- Delete abstract adjectives, inflated AI claims, fake progress, symmetric benefit lists and assistant-style narration。
- Do not claim a density improvement proves comprehension, usability, adoption, quality, or stars。

## Engineering Plan

### Files / surfaces

- Modify `src/App.tsx`: add a state-derived loaded class to the existing workbench; keep domain state and controls unchanged.
- Modify `src/styles.css`: add loaded masthead density tokens and mobile bottom-spacing rule; scope changes to `.workbench.is-loaded` and responsive overrides.
- Modify `DESIGN.md` and `CHANGELOG.md`: record why density changes after the first evidence pack exists and link fresh evidence。
- Create a release audit under `docs/product/pm-signal-lab/` only after current-turn verification is complete。
- Preserve private untracked `docs/github-star-growth-plan.md`; never stage or publish it。

### Implementation sequence

- [ ] Step 1：Add class/state hook and scoped CSS; do not alter domain functions or data shape. Expected：empty first-run keeps cover density; loaded state receives only the new scoped class。
- [ ] Step 2：Run static gates before browser work. Expected：tests, lint, build and diff check exit 0。
- [ ] Step 3：Operate the complete local flow in a fresh browser context, including friction and recovery. Expected：sample → source → verify → decide → ship → reset remains executable。
- [ ] Step 4：Capture 1440／768／390 first-run and loaded verify; inspect visual hierarchy, mobile overlap, focus and console/page errors. Expected：no horizontal overflow; last mobile action is revealable above the sticky bar。
- [ ] Step 5：Push only if the exact acceptance criteria are evidenced; wait for CI／Pages and repeat canonical hosted smoke. Expected：hosted HTTP 200, current h1, loaded content, no console/page errors。

### Technical risks and rollback

- Risk：class scope accidentally affects empty first-run or future workflow views. Mitigation：assert class presence/absence and inspect all four steps。
- Risk：compact hero makes current work too terse. Mitigation：keep current step, product h1, count, route and boundary; compare screenshot and DOM text。
- Risk：sticky action hides bottom controls on mobile. Mitigation：add explicit bottom padding only if measured; scroll to last actionable element in a 390 viewport。
- Rollback：revert the single implementation commit; no data migration, dependency, or external side effect exists。

## QA And Release Evidence

### Behavior matrix

| Surface | Normal | Friction / mismatch | Recovery | Evidence |
| --- | --- | --- | --- | --- |
| First-run | h1, sample, new signal | no pack / empty context | load sample or open form | fresh browser DOM + screenshot |
| Collect | source list, expand source | invalid evidence form | field focus, cancel, reset | local flow trace |
| Verify | source → claim review | empty edit / missing evidence | cancel or save valid edit | local flow trace + focus |
| Decide / Ship | experiment → memo → export | missing active claim / privacy unchecked | back, revise, prepare field note | local flow trace |
| Responsive | 1440 / 768 / 390 | narrow width / sticky action | scroll bottom control into view | DOM measurements + screenshots |
| Hosted | Pages asset and canonical route | deploy drift / stale asset | CI / Pages run and hosted smoke | Actions URL + HTTP + browser |

### Not covered by this slice

- Chrome Extension path、real screen reader／AT、third-party clipboard persistence、physical mobile share／download、external GitHub issue submission、non-owner PM sessions、adoption、traffic、qualified stars and the 10,000-star outcome。
- These remain explicit follow-up work, not inferred from local or hosted preview evidence。

### Done definition

This slice is done only when implementation, static gates, fresh browser evidence, hosted evidence, and the not-covered list are all recorded. A successful build or a polished screenshot alone is not completion proof。
