# PM Signal Lab：Workbench Density Transition Release Audit — 2026-08-15

狀態：public Pages hosted smoke verified；本產品仍是 public preview，真人 adoption、Chrome Extension／AT 與 10,000 stars outcome 尚未證明
產品：PM Signal Lab
公開 repo：https://github.com/asdc163/pm-signal-lab
canonical demo：https://asdc163.github.io/pm-signal-lab/
本輪 commit：`2de7a06` — `Compact loaded PM workbench density`
前一個可回滾點：`90328a5`

## 本輪決策

本輪只處理一個明確的 product-surface 問題：空白初次使用需要像一個 editorial cover，讓人理解 PM 工作紙；一旦真正的 evidence pack 存在，工作台就不應再用同樣高度的 hero 把來源與 claim 推遠。

因此 `src/App.tsx` 只增加由 `pack` 真實狀態衍生的 `workbench is-loaded` class；`src/styles.css` 只對 loaded state 收斂 masthead 的字級、間距與 route rhythm，並在 390px 補上 mobile sticky action 的 safe-area 底部餘裕。沒有新增 provider、模型輸出、telemetry、登入、資料庫或 GitHub 外部 mutation。

公開設計與執行契約：[`24-workbench-density-transition-contract-2026-08-15.md`](./24-workbench-density-transition-contract-2026-08-15.md)；KB execution-plan score：`100/100`。

## Verification gate

### Static local gates

在 `/Users/tommy/Documents/ChatGPT/Github Sar 養成計劃` 執行：

- `npm test -- --run`：4 files、9 tests passed，exit 0。
- `npm run lint`：TypeScript no emit，exit 0。
- `npm run build`：Vite production build 成功，exit 0。
- `git diff --check` 與 staged diff check：exit 0。

### Local browser evidence

環境：local Vite `http://127.0.0.1:5178/`；Playwright bundled Chromium／Google Chrome for Testing fallback；這不是 Chrome Extension sign-off。

- fresh first-run 1440：`workbench` 無 loaded class，hero height `232px`。
- loaded collect 1440：`workbench is-loaded`，hero height `165px`；4 筆 evidence row 可見，body `scrollWidth === clientWidth === 1440`。
- fresh first-run 390：`workbench` 無 loaded class，hero height `410px`。
- loaded collect 390：`workbench is-loaded`，hero height `294px`，sticky action 可見，body `scrollWidth === clientWidth === 390`。
- 768 screenshot 也重新捕捉；stepper 轉為 top index，右側 context 移到下方，沒有 horizontal overflow。

### Local behavior trace

在 fresh desktop context 實際操作：

1. `載入範例資料` → `核對`：heading `先確認這個判斷從哪裡來`，3 個 claim rows。
2. 打開第一個 claim → `編輯判斷` → 空白儲存：顯示 `判斷不能是空白...`，focus 回到 `claim-edit-claim-next-step-friction`，原編輯狀態仍保留。
3. 填入有效文字 → 儲存 → `採用這個判斷` → `前往安排`：current step 是 `安排`，experiment editor 可見，readiness 是 `可以進一步確認`。
4. `匯出決策 brief`：current step 是 `帶走`，memo preview 與 Markdown fallback 可見。
5. 開啟 `整理一次試用`，未勾 privacy 直接產生：被明確擋下，提示要求確認沒有客戶資料、私密內容、API key 或 token。
6. 勾選 privacy 後產生 field note：輸出含 `Not provided` 與人工檢查／手動送出邊界。
7. 回到 `收集` → `重設這組資料`：回到無 loaded class 的 empty CTA。

這條 trace 的 desktop console errors 與 page errors 都是空陣列。一次刻意使用「保留為假設」後嘗試匯出的 debug trace 也驗證了產品 gate：`buildDecisionMemo` 不會把未採用的假設當成決策；該次是測試操作與產品規則不一致，不是 release failure。

### Mobile overlap evidence

在 390px 完成 sample → 採用 → 安排 → 匯出 → field note 後滾到頁底，排除 fixed action 自身後量測：

- sticky action top：`779px`
- 最後一個 main control bottom：`714px`（`回報這次試用`）
- `contentClearOfAction: true`
- `body scrollWidth === clientWidth === 390`

### Hosted GitHub evidence

- CI：[`31841615768`](https://github.com/asdc163/pm-signal-lab/actions/runs/31841615768) — success；test／typecheck／build jobs passed。
- Pages deploy：[`31841615774`](https://github.com/asdc163/pm-signal-lab/actions/runs/31841615774) — success；build、artifact upload、Pages deploy passed。
- fresh hosted browser URL：`https://asdc163.github.io/pm-signal-lab/?release=2de7a06`
- hosted 1440：HTTP `200`；first-run h1 `把一句話放回它的來源`；sample 後 `workbench is-loaded`、4 evidence rows；核對 heading 與 3 claim rows；無 horizontal overflow；console／page errors 空。
- hosted 390：HTTP `200`；同一 h1、4 evidence rows、核對 heading 與 3 claim rows；`scrollWidth === clientWidth === 390`；console／page errors 空。

## Fresh visual evidence

- [first-run 1440](./assets/qa/density-transition-first-run-1440.png)：空白狀態保留 editorial cover。
- [loaded collect 1440](./assets/qa/density-transition-loaded-1440.png)：載入 evidence pack 後工作台抬頭收斂，來源 rows 提前。
- [loaded collect 768](./assets/qa/density-transition-loaded-768.png)：tablet top index 與 workpaper reflow。
- [loaded collect 390](./assets/qa/density-transition-loaded-390.png)：mobile loaded state 與 sticky action。
- [ship + feedback 1440](./assets/qa/density-transition-ship-feedback-1440.png)：decision brief、field note、privacy gate 與 manual handoff。
- [mobile bottom 390](./assets/qa/density-transition-mobile-bottom-390.png)：頁底 sticky action 與 margin note 的現場截圖。

圖片 SHA-256 已在本機生成並與提交檔案一致；圖片是 layout evidence，不是 usability 或 adoption proof。

## Remote operating snapshot

本次透過 GitHub API 讀回：`main`、`0 stargazers`、`0 forks`、`4 open issues`。這是 2026-08-15 本輪的 observation，不是成長結果。

目前每週 PM Signal Lab automation 為 `ACTIVE`，每週只選一個小且可回滾的工作，先讀遠端狀態、文件與 QA，再在證據完整時測試／commit／push／等待 CI。它明確禁止自動 star、follow、like、DM、mass reply、偽造 adoption、偽造 metrics 或自動修改 GitHub 資源。

## Not covered

- Chrome Extension path、真實 screen reader／AT、VoiceOver／TalkBack、physical iOS／Android share 或 download。
- 真實非 owner PM session、外部使用者回報、issue triage、retention、traffic、qualified star、adoption、模型 quality、production readiness。
- GitHub 帳號本身的 10,000 stars outcome；本輪沒有也不會用腳本灌星、互讚、追蹤或偽造活動。

這些不是「沒問題」的反面宣稱；它們是尚未取得正確層級證據的範圍，後續必須由真實 PM session、可審核 issue、修復後重測與長期公開訊號逐步補上。

## Rollback

若 hosted smoke、真實 session 或後續可觀察證據顯示 loaded density 讓 orientation、completion、trust 或 mobile recovery 退化，可將 `2de7a06` 回退到 `90328a5`。本輪沒有資料 migration、dependency change 或外部資料寫入；rollback 尚未執行。

## Release decision

本輪可維持 public preview 並繼續收集真實試用回饋；不能把它標成 fully verified、production-ready、viral、adopted 或 star-growth success。下一個成長 gate 仍是讓非 owner PM 真的走完五分鐘流程，提交一份不含私密資料的 field note／issue，再以同樣的 evidence loop 決定下一個最小改動。
