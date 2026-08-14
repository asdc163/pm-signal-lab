# Session Feedback Field Note Release Audit — 2026-08-15

## Verdict

本輪新增的 local-only session feedback field note 已在本機完成程式與互動驗證；它把「完成一次試用」到「留下可 triage 回饋」之間的手動整理工作收斂成一條可檢查的路徑。

這份 audit 不宣稱產品沒有任何問題、真人 usability、adoption、模型品質、production readiness、爆紅或 10,000 GitHub stars。公開 hosted release 的 CI、Pages 與 canonical URL readback 會在推送後補上；在那之前不把本機結果當成遠端完成證據。

## Release identity

| 項目 | 本輪證據 |
|---|---|
| Repository | [`asdc163/pm-signal-lab`](https://github.com/asdc163/pm-signal-lab) |
| Code commit | [`1f58e2d`](https://github.com/asdc163/pm-signal-lab/commit/1f58e2d602d1af2e8cefefa04a860330b2cef056) — `Add local session feedback field note` |
| Canonical URL | [`https://asdc163.github.io/pm-signal-lab/`](https://asdc163.github.io/pm-signal-lab/) — post-push readback pending |
| CI / Pages | post-push run IDs pending；尚未宣稱遠端部署完成 |
| Browser route | Playwright CLI fallback；本輪沒有可呼叫的 Codex Chrome Extension QA 工具 |
| Data boundary | in-memory browser state + local Markdown generation；沒有登入、外部 provider、telemetry 或自動 GitHub mutation |

## Product decision

目前產品已能產生 decision brief，但原本的 session receipt 仍要求試用者自行把角色、卡點、信任、恢復與改動重新整理到 issue。這是根據現有 code path 與公開 issue template 建立的 product hypothesis，不是由真人 session 證明的 drop-off。

本輪因此只做一個可逆切片：在 `帶走` 頁加入收斂的「試用回音」field note。

- 使用者自己填 role、environment、task result、expectation、hesitation、trust、recovery、one change。
- privacy confirmation 未完成前不生成 Markdown。
- 空白欄位寫成 `Not provided`，不替使用者猜測感受或滿意度。
- 產出內容不帶原始 evidence、sample quote 或 event properties。
- 複製與開啟 GitHub 都是手動動作；使用者必須自己檢查並按下 issue submit。
- 不新增模型、登入、資料庫、telemetry、GitHub API、MCP 或外部 side effect。

## Code gates

在 code commit [`1f58e2d`](https://github.com/asdc163/pm-signal-lab/commit/1f58e2d602d1af2e8cefefa04a860330b2cef056) 前於本機重新執行：

- `npm test -- --run`：4 個 test files、9 tests passed。
- `npm run lint`：TypeScript no-emit exit 0。
- `npm run build`：TypeScript build + Vite production build exit 0。
- `git diff --check`：pass。

新增的純函式 `buildSessionFeedbackReport` 有兩個 unit tests：privacy gate、空白欄位與不含 workspace evidence 的輸出邊界。

## Fresh browser evidence

以下是本機 `http://127.0.0.1:5175/` 的 Playwright CLI fallback session `pm-signal-feedback-local-v1`，不是只看程式碼或 build log。

### Normal path

實際操作：

`載入範例資料 → 開始核對 → 採用有來源判斷 → 草擬最小實驗 → 匯出決策 brief → 整理一次試用 → 填寫 field note → 勾 privacy → 產生回報內容 → 複製回報內容`

結果：

- decision brief 保留 `資料邊界`、`已知限制`、`未涵蓋`。
- field note 產出可讀的 GitHub Markdown，包含手動送出 boundary。
- clipboard success 顯示「試用回報已複製」提示。
- 產出 textarea 的即時檢查：沒有 sample 原文 `我有訪談、客服和埋點資料`，沒有 `evidence-interview-01`；內容長度為 766 字元（本輪手動填入內容）。

### Friction and recovery

- 未勾 privacy 直接按 `產生回報內容`：畫面顯示「請先確認這份回報沒有客戶資料、私密內容、API key 或 token」，不生成 output。
- 生成後修改「一個會讓你再試一次的改動」：舊 Markdown 被清除，避免複製過期回報。
- 強制讓 `navigator.clipboard.writeText` reject：畫面顯示「剪貼簿被瀏覽器擋住」，Markdown textarea 仍保留可手動選取內容。
- keyboard：從最後一個 textarea 按 Tab，焦點依序落到 privacy checkbox、`取消`、`產生回報內容`；表單控制在 snapshot 中都有可讀 label。

### Responsive and visual check

- 390×844：`scrollWidth = 390`、`clientWidth = 390`；field note 變成單欄；表單按鈕高度均為 44px；sticky action 仍可見。
- 768×1024：`scrollWidth = 768`、`clientWidth = 768`；sidebar 隱藏、decision context 移到下方；field note 兩欄寬度各 321px。
- 1440×900：已截圖檢查 loaded/exported field note；深綠 workflow rail、暖紙工作區、青綠 trust surface 與黏土色 primary action 維持原有 evidence desk hierarchy，沒有新增 AI dashboard、gradient、orb 或 card wall。
- Playwright console：Errors 0、Warnings 0。

## Remote release gate

以下項目在本檔建立時尚未推送，因此不預先填寫：

- [ ] `git push origin main` 完成。
- [ ] GitHub Actions build run readback 為 success。
- [ ] GitHub Pages deploy run readback 為 success。
- [ ] canonical URL 回傳 HTTP 200，且 hosted bundle 含 field note 字串。
- [ ] 新鮮 hosted browser session 重跑 normal、privacy block、clipboard fallback、390px 與 768px。

只有上述 remote gate 讀回後，這份文件才可以改成「本輪 public preview 已更新」；未通過前不使用 `ready`、`complete` 或「正式網站完成」等說法。

## Not covered / not claimed

- 沒有完成 Codex Chrome Extension sign-off；本輪 Playwright 只是 fallback。
- 沒有執行 VoiceOver、NVDA、TalkBack、iOS/Android 真機、真機分享、低頻寬或多瀏覽器矩陣。
- 沒有把測試內容貼到公開 issue；不能用 owner session 冒充非 owner feedback。
- 沒有完成至少 5 位真人 PM 的 task session，也沒有 activation、retention、referral、adoption 或 stars growth evidence。
- 沒有宣稱 field note 會提高 issue submit rate；這仍是一個待真實 session 驗證的 product hypothesis。

## Rollback and next gate

若 field note 增加負擔、讓回饋品質下降或產生新的信任問題，回滾 code commit [`1f58e2d`](https://github.com/asdc163/pm-signal-lab/commit/1f58e2d602d1af2e8cefefa04a860330b2cef056) 即可；既有 decision brief、session receipt 與 issue template 不需移除。

下一個 gate 是請至少 5 位目標使用者自己完成 hosted trial，觀察是否能在不被 maintainer 帶領的情況下留下可 triage 的 field note。只有真實 session evidence 出現後，才決定是否改欄位、改入口，或進入下一個 adoption hypothesis。

