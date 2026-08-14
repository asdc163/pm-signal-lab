# PM Signal Lab：Accessibility And Session Handoff Release Audit — 2026-08-15

狀態：public Pages hosted smoke verified；本產品仍是 public preview，真人 adoption、Chrome Extension／AT 與 10,000 stars outcome 尚未證明
產品：PM Signal Lab
公開 repo：https://github.com/asdc163/pm-signal-lab
canonical demo：https://asdc163.github.io/pm-signal-lab/
本輪行為 commit：[`f371fbf`](https://github.com/asdc163/pm-signal-lab/commit/f371fbf2c57394dddfe87b68f34279c6accb167a) — `Improve accessible PM session handoff`
前一個可回滾點：[`27666db`](https://github.com/asdc163/pm-signal-lab/commit/27666dbb486b6a8538f5c8bc3570d49de4cdbc8a)

## 本輪決策

本輪只處理一個明確的 trust／accessibility／session acquisition slice：讓使用者能知道目前在哪個工作區、動態結果何時產生、空白編輯錯誤要怎麼修，以及 field note 何時已經可以檢查；同時把公開試用入口改成一個可照做的五分鐘任務。

實作的 semantic surface 包含 `main` label、workflow navigation、hero status live region、notice atomic status、loading busy state、feedback output region、privacy checkbox label、manual GitHub handoff link name 與產生 field note 後的 focus handoff。這些語意都貼著現有的 `Evidence`、`Claim`、`DecisionMemo` 與 `SessionFeedback` 工作物件，沒有新增 provider、模型、telemetry、登入或外部 mutation。

本輪還抓到一個真實的 mobile regression：在 390px 開啟 `整理一次試用` 後，固定在底部的 next-action bar 位於 `y=779–844`，表單第一個 `select` 位於 `y=799–841`，兩者實際交疊。修正方式是回報表單開啟時暫時不渲染 mobile action bar；回報自己的內容時，表單不再與另一個固定 CTA 競爭。這是行為修正，不是只改 screenshot。

公開設計／執行契約：[`26-accessibility-session-handoff-contract-2026-08-15.md`](./26-accessibility-session-handoff-contract-2026-08-15.md)；KB execution-plan score：`100/100`。

## Verification gate

### Static local gates

在 `/Users/tommy/Documents/ChatGPT/Github Sar 養成計劃`、`f371fbf` 的行為狀態執行：

- `npm test -- --run`：4 files、9 tests passed，exit 0。
- `npm run lint`：TypeScript no emit，exit 0。
- `npm run build`：Vite production build 成功，exit 0。
- `git diff --check` 與 staged diff check：exit 0。

這些 gates 只能證明程式碼與 deterministic domain tests 在本機可通過，不能推導真人 usability、螢幕閱讀器或 adoption。

### Local browser evidence

環境：local Vite `http://127.0.0.1:5178/`；Playwright bundled Chromium／Google Chrome for Testing fallback。這是可重跑的 browser fallback，不是 Codex Chrome Extension、既有 Chrome profile 或 screen-reader sign-off。

#### Desktop keyboard-only trace

fresh `1440×1000` context 只用 `Tab`、`Enter`、`Space`、鍵盤選取／刪除與文字輸入完成：

1. `載入範例資料` → `查看來源` → `開始核對`，核對 heading `先確認這個判斷從哪裡來` 出現。
2. 展開第一個 claim → `編輯判斷`；空白儲存後 `.claim-edit-error` 出現，focus 回 `claim-edit-claim-next-step-friction`，且 `aria-invalid="true"`。
3. 輸入有效句子 → `儲存判斷` → `採用這個判斷` → `前往安排` → `匯出決策 brief`。
4. `整理一次試用` 後不勾 privacy 直接產生：field note 不產生，提示要求確認沒有客戶資料、私密內容、API key 或 token。
5. 以 `Space` 勾選 privacy，再以鍵盤產生 field note；`#feedback-output` 取得 focus，`role="region"`，內容明確寫出「這是一份 field note，不是驗證結果」與手動送出邊界。

結果：viewport `1440×1000`、`body.scrollWidth === clientWidth === 1440`；console errors 與 page errors 都是空陣列。fresh capture 在本輪以 `/tmp/pm-signal-a11y-keyboard-desktop-final.png` 產生並人工檢視；這是本機證據，不代表 AT pass。

#### Mobile keyboard／fixed-action trace

fresh `390×844` context 以同一條鍵盤路徑重跑，並在回報表單與 field note output 狀態讀回 layout：

- `body.scrollWidth === clientWidth === 390`。
- 進入 `整理一次試用` 後，`[role="region"][aria-label="目前工作操作"]` 不存在；visible form controls 沒有與 fixed action overlap，原本出錯的 select 即使位於 `y=799–841` 也不再被覆蓋。
- 未勾 privacy 時 output count 為 `0`；勾選後 `#feedback-output` 取得 focus，且沒有 horizontal overflow。
- mobile output focus 的 fresh readback：`scrollY=3218`、focused region `top=346`、`bottom=844`；console errors 與 page errors 都是空陣列。

fresh capture 在本輪以 `/tmp/pm-signal-a11y-keyboard-mobile-final.png` 產生並人工檢視。這仍是 viewport simulation；real iOS／Android、virtual keyboard、VoiceOver／TalkBack 尚未執行。

### Hosted GitHub evidence

CI 與 Pages 都對 `f371fbf2c57394dddfe87b68f34279c6accb167a` 成功：

- CI：[`31843521426`](https://github.com/asdc163/pm-signal-lab/actions/runs/31843521426) — success；test、typecheck、build jobs passed。
- Pages deploy：[`31843521415`](https://github.com/asdc163/pm-signal-lab/actions/runs/31843521415) — success；build、artifact upload、Pages deploy passed。
- fresh hosted browser URL：`https://asdc163.github.io/pm-signal-lab/?release=f371fbf`
- hosted desktop：HTTP `200`；sample 後 `workbench is-loaded`、4 個 `.evidence-row`；展開來源後 1 個 source region；核對 heading 與 1 個 claim detail region 可見；`main` label 為 `PM Signal Lab 工作區`；workflow strip role 為 `navigation`；hero status `aria-live="polite"`；console／page errors 空。
- hosted mobile：HTTP `200`；sample 後 `workbench is-loaded`；`scrollWidth === clientWidth === 390`；非回報表單狀態的 mobile action region 實際位於 `y=779–844`。

Hosted smoke 證明的是這個 commit 已透過 GitHub Actions 建置、部署且 canonical URL 可回應與操作；它不證明 production readiness、跨瀏覽器完整性、真人 usability 或 model quality。

### Public pilot handoff

本輪將 issue #4 的公開文字更新為可照做的五分鐘 session，加入 keyboard／assistive-technology observation、具體 hesitation／trust／recovery 欄位、privacy prohibition 與「star 可選，具體回饋更有用」的邊界。公開 issue：[`Public pilot: looking for 5 PM session testers`](https://github.com/asdc163/pm-signal-lab/issues/4)。

本輪 GitHub API readback：issue #4 `open`、`0 comments`；repo `0 stargazers`、`0 forks`、`4 open issues`、default branch `main`。這是 2026-08-15 本輪 snapshot，不是 adoption 或成長結果；issue 存在也不代表有人完成 session。

## Not covered

- Codex Chrome Extension tab control、既有 Chrome profile、Chrome／Firefox／Safari 完整矩陣。
- VoiceOver、NVDA、TalkBack、任何實際 screen reader announcement、real iOS／Android device、virtual keyboard、native share／download。
- 非 owner PM session、外部 tester comment、field note／issue triage、retention、traffic、qualified star、adoption、模型 quality、production readiness。
- GitHub 帳號或 repository 的 10,000 stars outcome；本輪沒有也不會用腳本灌星、互讚、追蹤、DM、mass reply 或偽造 metrics。

這些不是「沒問題」的反面宣稱，而是尚未取得正確層級證據的範圍。下一個 promotion gate 仍是讓非 owner PM 真的完成五分鐘任務，留下可審查且不含私密資料的回報，再依實際卡點修正並重跑相同 evidence loop。

## Rollback

若後續真實 session 顯示 semantic surface、field note focus 或 mobile form handoff 讓 orientation／completion／trust 退化，可回到 [`27666db`](https://github.com/asdc163/pm-signal-lab/commit/27666dbb486b6a8538f5c8bc3570d49de4cdbc8a)。本輪沒有 migration、dependency change、provider、secret 或資料庫寫入；rollback 尚未執行。

## Release decision

本輪可以維持 public preview，並繼續以 issue #4 收集真實 session evidence；不能把它標成 fully verified、production-ready、viral、adopted 或 star-growth success。對 Tommy 的作品集價值是可展示一個有明確 evidence boundary 的 AI PM workflow；對 10,000 stars 目標而言，真正缺的仍不是文案或數字，而是非 owner 使用、公開問題、修復回歸與長期可見的外部訊號。
