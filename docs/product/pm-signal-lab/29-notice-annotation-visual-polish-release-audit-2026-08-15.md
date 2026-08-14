# PM Signal Lab：Notice Annotation Visual Polish Release Audit — 2026-08-15

狀態：public Pages hosted smoke verified；本產品仍是 public preview，真人 adoption、Chrome Extension／AT 與 10,000 stars outcome 尚未證明
產品：PM Signal Lab
公開 repo：https://github.com/asdc163/pm-signal-lab
canonical demo：https://asdc163.github.io/pm-signal-lab/
本輪行為 commit：[`fece968`](https://github.com/asdc163/pm-signal-lab/commit/fece968196d5831038e877d6ab4efd0bea971082) — `Refine notice feedback into folio annotations`
前一個可回滾點：[`9087493`](https://github.com/asdc163/pm-signal-lab/commit/9087493b4509057574b7615b13688ff9916f1fff)

## 本輪決策

本輪只處理一個明確的 visual／trust slice：原本的 success、warning、error、info notice 使用整塊淡色提示卡，和 PM Signal Lab 的暖紙張、evidence spine、margin note 語法不一致，也容易讀成一般 SaaS 或 AI dashboard 的 status card。

現在的 notice 改成透明底、上下 ruled divider、2px tone-specific 左線、icon、literal copy 與原本的關閉動作。成功、警告、錯誤與資訊仍使用相同的 DOM、文字、`role`／live semantics 與 recovery path；這不是把狀態藏起來，也沒有新增模型活動、分數、趨勢或 fake progress。

這個決策沿用 [`28-notice-annotation-visual-polish-contract-2026-08-15.md`](./28-notice-annotation-visual-polish-contract-2026-08-15.md) 的 Product Craft Contract；KB execution-plan score：`100/100`。本輪的改動面只有 `src/styles.css`、`DESIGN.md`、`CHANGELOG.md` 與公開契約／audit 文件，沒有 provider、登入、telemetry、資料庫、secret 或外部資料傳送變更。

## Verification gate

### Static local gates

在 `/Users/tommy/Documents/ChatGPT/Github Sar 養成計劃`、`fece968` 執行：

- `npm test -- --run`：4 files、9 tests passed，exit 0。
- `npm run lint`：TypeScript no emit，exit 0。
- `npm run build`：Vite production build 成功，exit 0。
- `git diff --check` 與 staged diff check：exit 0。

這些 gates 只能證明程式碼、型別、production build 與 deterministic domain tests 在本機可通過，不能推導真人 usability、螢幕閱讀器、跨瀏覽器完整性或 adoption。

### Local browser evidence

環境：local Vite `http://127.0.0.1:5179/`；Playwright bundled browser fallback。這是可重跑的 browser fallback，不是 Codex Chrome Extension、既有 Chrome profile 或 screen-reader sign-off。

本輪以 fresh page 重跑：

- `1440×1000` 載入範例資料後，notice class 為 `notice notice-success`；computed background 為 `rgba(0, 0, 0, 0)`、border-left 為 success green、border-radius 為 `0px`；4 個 evidence rows 出現；頁面沒有 horizontal overflow。
- 第一個 claim 的空白儲存仍得到原本的 warning copy「判斷不能是空白；原本的內容仍保留。」；warning notice 也維持透明底與語意色左線；focus 回到 `claim-edit-claim-next-step-friction`，field error 仍存在。
- 完成有效判斷、採用、安排與匯出後，不勾 privacy 直接產生回報仍被原本的 privacy gate 阻擋：「請先確認這份回報沒有客戶資料、私密內容、API key 或 token。」；output count 為 `0`。
- 以純 `Tab` 找到 `關閉提示`，按 `Enter` 後 notice 消失；關閉按鈕實際為 `44×44`；page／console errors 為空。
- `390×844` 載入範例資料後，notice 高度為 `54px`、關閉按鈕為 `44×44`，`scrollWidth === clientWidth === 390`；fresh capture `/tmp/pm-signal-notice-mobile-top.png` 已人工檢視。桌面 capture `/tmp/pm-signal-notice-desktop.png` 顯示透明 ruled annotation 能和紙張／邊欄語法接上，沒有新增彩色 status card。

這些結果證明本輪 notice visual surface 沒有破壞既有的成功、錯誤、privacy block、鍵盤關閉與 mobile layout path；它們不是完整 accessibility 或 production readiness 證明。

### Hosted GitHub evidence

GitHub Actions 與 Pages 都對 `fece968196d5831038e877d6ab4efd0bea971082` 成功：

- [CI run `31844988081`](https://github.com/asdc163/pm-signal-lab/actions/runs/31844988081) — success；test、typecheck、build jobs passed。
- [Pages deploy run `31844988079`](https://github.com/asdc163/pm-signal-lab/actions/runs/31844988079) — success；build、artifact upload、Pages deploy passed。
- `curl -L https://asdc163.github.io/pm-signal-lab/` — HTTP `200`，canonical URL 沒有 redirect 到 preview 或 local surface。
- fresh hosted browser session `pm-signal-hosted-20260815` 在 `1440px` 讀到 page title `PM Signal Lab — 產品訊號到決策`；載入範例後讀到 success notice、4 個 evidence rows、透明 background、綠色左線、`44×44` 關閉按鈕與 no horizontal overflow；console errors 為 `0`。
- 同一 hosted session 調整為 `390×844` 並重新整理後載入範例；notice 高度 `54px`、關閉按鈕 `44×44`、`scrollWidth === clientWidth === 390`、console errors 為 `0`。頁首 screenshot 已人工檢視，notice 在手機仍是工作紙註記，不是彩色卡片。

Hosted smoke 證明的是這個 commit 已透過 GitHub Actions 建置、部署且 canonical URL 可回應與操作；它不證明跨瀏覽器完整性、真實裝置、螢幕閱讀器、真人 usability 或 model quality。

### Public snapshot

本輪 GitHub API readback：repo `0 stargazers`、`0 forks`、`4 open issues`、default branch `main`；公開 issue #4 `open`、`0 comments`。這是 2026-08-15 本輪 snapshot，不是 adoption、growth 或 10,000-star progress result；issue 存在也不代表有人完成 session。

## Not covered

- Codex Chrome Extension tab control、既有 Chrome profile、Chrome／Firefox／Safari 完整矩陣。
- VoiceOver、NVDA、TalkBack、任何實際 screen-reader announcement、real iOS／Android device、virtual keyboard、native share／download。
- 非 owner PM session、外部 tester comment、field note／issue triage、retention、traffic、qualified star、adoption、model quality、production readiness。
- GitHub 帳號或 repository 的 10,000 stars outcome；本輪沒有也不會用腳本灌星、互讚、追蹤、DM、mass reply 或偽造 metrics。

這些不是「沒問題」的反面宣稱，而是尚未取得正確層級證據的範圍。下一個 promotion gate 仍是讓非 owner PM 真的完成五分鐘任務，留下可審查且不含私密資料的回報，再依實際卡點修正並重跑相同 evidence loop。

## Rollback

若後續真實 session 顯示透明 notice 的 contrast、定位、閱讀順序或 recovery affordance 退化，可回到 [`9087493`](https://github.com/asdc163/pm-signal-lab/commit/9087493b4509057574b7615b13688ff9916f1fff)。本輪沒有 migration、dependency change、provider、secret 或資料庫寫入；rollback 尚未執行。

## Release decision

本輪可以維持 public preview，並繼續以 issue #4 收集真實 session evidence；不能把它標成 fully verified、production-ready、viral、adopted 或 star-growth success。對 Tommy 的作品集價值是把一次具體的視覺判斷、產品語意保留與公開驗證寫成可回看的 PM evidence；對 10,000 stars 目標而言，真正缺的仍不是把數字寫大，而是非 owner 使用、公開問題、修復回歸與長期可見的外部訊號。
