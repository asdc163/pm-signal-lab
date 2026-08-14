# PM Signal Lab：Editorial Field Note Release Audit — 2026-08-15

狀態：local verified；公開 Pages release pending hosted smoke
產品：PM Signal Lab public preview
行為 commit：`eea0156`（`Reframe PM worksheet as editorial field note`）
比較基線：`0314048`（`Clarify release audit branch evidence`）

## 本輪決策

這一輪把工作區從容易被讀成「AI dashboard」的 `sidebar + workbench + decision rail`，收斂成 `editorial field note + index rail + margin note`。

- 移除首屏 decorative progress bar 與 `01 / 04` 進度語法，改保留可讀的目前 workflow step。
- 移除右欄三格大數字，改成描述目前工作紙的 domain metadata 與一行工作記錄。
- 保留 source、timestamp、limitation、human review state、experiment 與 local-only boundary；沒有加入 provider、AI activity、fake thinking、model confidence 或 external mutation。
- 保留 deep-green index rail、warm-paper workbench、evidence spine、中文 literal copy、responsive reflow 與 inline claim editor。

「比較不像 AI」目前仍是 product/design hypothesis，不是真人研究結果；本輪 evidence 只證明畫面與行為在 owner-run local scope 內可重跑。

## Completion Evidence Packet

### Static

本輪在 `eea0156` 前後重新執行：

- `npm test -- --run`：exit 0；4 個 test files、9 個 tests 全部通過。
- `npm run lint`：exit 0；TypeScript no-emit 通過。
- `npm run build`：exit 0；Vite production build 完成，bundle 為 `index-WJ4OpNH7.css` 與 `index-Dj7dvZRJ.js`。
- `git diff --check`：exit 0。
- KB contract：`score_kb_plan.py ...20-editorial-field-note-visual-reframe-contract-2026-08-15.md --min-score 85`：100/100。

### Fresh local browser behavior

環境：全新 Playwright Chromium contexts，`http://127.0.0.1:5175/`；不是 Chrome Extension sign-off，也不是正式 Pages evidence。

- First-run desktop：`h1 = 先看來源，再決定下一步`；`role=progressbar` 數量 0；`.context-counts` 數量 0；空狀態 `.context-record` 數量 0；`scrollWidth = clientWidth = 1440`。
- Normal flow：`載入範例資料 → 開始核對 → 編輯判斷` 可進入 editor；載入後目前工作顯示 `01 · 收集`，進入核對後顯示 `02 · 核對`。
- Friction：清空 editor 儲存後，`role=alert` 顯示 `判斷不能是空白；請保留一句可以被回看的說法。`；原本判斷仍留在頁面。
- Recovery：填入有效判斷後儲存，editor 關閉，右欄工作記錄更新為 `這張紙上有 4 筆訊號、1 個已處理。`，claim 仍保留 `需要你確認`。
- Mobile 390px：`scrollWidth = clientWidth = 390`；`取消` 與 `儲存判斷` action 各為 44px 高；沒有水平溢出。
- Desktop/mobile console 與 page errors：本次 fresh smoke 都是空陣列。

### Visual

已用 fresh local capture 並完成目視 review：

- [1440 first-run](./assets/qa/editorial-reframe-first-run-1440.png)：主閱讀順序是 page title → evidence spine → next action；右欄是 margin note，沒有 progress/KPI strip。
- [1440 verify](./assets/qa/editorial-reframe-verify-1440.png)：來源、限制、claim 與 inline editor 保持在同一個可回看工作區。
- [390 first-run](./assets/qa/editorial-reframe-first-run-390.png)：工作紙向單欄重排，註記下移，沒有依賴 hover。
- [390 verify](./assets/qa/editorial-reframe-verify-390.png)：inline editor 與 sticky action 維持閱讀順序，長中文沒有把 viewport 撐寬。

視覺 review 的結論是「符合本輪選定的 editorial field note composition」；這不是可泛化的 usability、conversion 或 adoption 結論。

## Release boundary

### 待完成／未驗證

- 本檔建立時，尚未完成本輪 commit 的 GitHub Actions／Pages hosted smoke；完成後要補上 exact workflow run、Pages 狀態、canonical HTTP、asset hash 與 fresh hosted browser path。
- Chrome Extension control surface 目前 unavailable；Chrome browser、螢幕閱讀器、完整 assistive technology route 標記為 `未驗證`／`blocked`，不能用 Playwright local fallback 代替。
- 尚未有非 owner PM session、5 位目標使用者 task-session evidence、真人「不像 AI」比較結果、adoption、retention、conversion 或外部 issue trend。
- 尚未驗證 model quality；v0 沒有 external AI provider，也沒有自動修改 GitHub、MCP action、登入、資料庫或 telemetry。
- GitHub repo 的 stars、forks、traffic 與 10,000 stars 目標仍是外部結果，不由本輪 UI QA 證明。

### Rollback

若 hosted smoke 或後續 session evidence 顯示 orientation、completion、trust 任一退化，回退 `eea0156` 這個單一 behavior commit；保留 `inline claim editor`、domain model、privacy gate 與既有 public preview，重新比較前後 screenshot／behavior trace。

## Next operating loop

保留既有每週 evidence-oriented automation：它只做 public state／CI／Pages／issues／stars observation、產生候選內容與 weekly report，不會自動 star、follow、like、DM、mass reply、偽造 adoption，或自動修改 GitHub。下一個 promotion gate 仍是取得真實 PM session evidence，再決定是否做 provider adapter、portable schema 或 read-only external integration。
