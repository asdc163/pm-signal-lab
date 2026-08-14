# PM Signal Lab：Human-owned Trust Copy Release Audit — 2026-08-15

狀態：public Pages hosted smoke verified；本產品仍是 public preview，真人 adoption、Chrome Extension／AT 與 10,000 stars outcome 尚未證明<br>
產品：PM Signal Lab<br>
公開 repo：https://github.com/asdc163/pm-signal-lab<br>
canonical demo：https://asdc163.github.io/pm-signal-lab/<br>
本輪行為 commit：[`86755fe`](https://github.com/asdc163/pm-signal-lab/commit/86755fef6b22b8a266a3c5e03871292db7c148f3) — `Make trust copy human-owned`<br>
前一個可回滾點：[`9fcff79`](https://github.com/asdc163/pm-signal-lab/commit/9fcff7999889101dfab2eaa966ba95efc9e9daa6)

## 本輪決策

本輪只處理一個明確的 copy／trust slice：右側 `現在知道`、頁底資料邊界、decision brief、session receipt 與產生後的 session feedback 原本會把使用者的注意力拉回「模型品質」或 `model quality`。這些字句雖然想表達 evidence boundary，實際上更像 AI 產品自我辯護，也沒有幫 PM 做下一個判斷。

現在的可見語言改成來源、判斷、限制、下一步與 human-owned decision：

- `現在知道`：`來源可回看，判斷由你確認`
- 頁底 boundary：`這張紙只保留來源、判斷與下一步；最後由你決定是否採用。`
- decision brief：保留來源、判斷與限制，最後由 PM 決定是否採用。
- session receipt：只反映目前頁面的操作，不代表外部使用者已採用。
- session feedback：保留單次、單環境、手動檢查與手動送出的限制，但不再把 `model quality` 當成 visible disclaimer。

本輪沒有新增 provider、model output、telemetry、persistent storage、登入、GitHub mutation、permission 或 external side effect；`sample`、4 筆 evidence、source path、privacy gate、manual GitHub handoff 與原有 workflow action 都保持不變。這個決策依 [`30-human-owned-trust-copy-contract-2026-08-15.md`](./30-human-owned-trust-copy-contract-2026-08-15.md) 執行，KB execution-plan score 為 `100/100`。

## Verification gate

### Static local gates

在 `/Users/tommy/Documents/ChatGPT/Github Sar 養成計劃`、commit `86755fe` 執行：

- `npm test -- --run`：4 files、9 tests passed，exit 0。
- `npm run lint`：TypeScript no emit，exit 0。
- `npm run build`：Vite production build 成功，exit 0。
- `git diff --check` 與 staged diff check：exit 0。
- targeted copy scan：product source 不再輸出中文「模型品質」或英文 `model quality`；negative assertions 只保留在 tests，防止回歸。

這些 gates 只能證明 deterministic domain behavior、型別、production build 與這次文字邊界在本機可通過，不能推導真人 usability、螢幕閱讀器、跨瀏覽器完整性或 adoption。

### Local browser evidence

環境：local Vite `http://127.0.0.1:5179/`；Playwright CLI bundled browser fallback。這是可重跑的 browser fallback，不是 Codex Chrome Extension、既有 Chrome profile 或 screen-reader sign-off。

browser session：`pm-signal-copy-20260815`。本輪在重新載入後以 `1440×1000` 重跑 first-run → sample → verify → adopt → decide → ship → feedback：

- first-run 的 boundary 讀到 `這張紙只保留來源、判斷與下一步；最後由你決定是否採用。`；載入 sample 後出現 4 個 `.evidence-row`，`現在知道` 讀到 `來源可回看，判斷由你確認`。
- verify 讀到 `先確認這個判斷從哪裡來`；adopt 與 `草擬最小實驗` 可以走到 decide；`匯出決策 brief` 可以走到 ship；原有 source、limitation、manual owner 與 output path 保留。
- 開啟 `整理一次試用` 後，不勾 privacy 直接按 `產生回報內容`，output 不存在並顯示 `請先確認這份回報沒有客戶資料、私密內容、API key 或 token。`。
- 勾選 `確認試用回報不含私密資料` 後，`#feedback-output` 產生；回報內容不含 `model quality`，頁面也不含中文「模型品質」或英文 `model quality`。
- 讓 `關閉提示` 取得 focus，再以鍵盤 `Enter` 關閉 status notice；notice 消失，頁面沒有 horizontal overflow。
- `console error`：Total messages `3`，Errors `0`、Warnings `0`，返回 `0` errors。

最後的 local `390×844` smoke 讀到：ship／feedback output 存在、boundary 與 `現在知道` copy 正確、`scrollWidth === clientWidth === 390`、`overflow: false`、feedback 不含 `model quality`；fresh capture 為 `.playwright-cli/human-owned-trust-copy-local-final-mobile-390.png`，已人工檢視。這證明本輪 copy 沒有破壞 mobile layout；不是 real device 或 AT 證明。

### Hosted GitHub evidence

GitHub Actions 與 Pages 都對 `86755fef6b22b8a266a3c5e03871292db7c148f3` 成功：

- [CI run `31847080929`](https://github.com/asdc163/pm-signal-lab/actions/runs/31847080929) — success；test、typecheck、build jobs passed。
- [Pages deploy run `31847080935`](https://github.com/asdc163/pm-signal-lab/actions/runs/31847080935) — success；build、artifact upload、Pages deploy passed。
- `curl -L https://asdc163.github.io/pm-signal-lab/` — HTTP `200`，canonical URL 沒有 redirect 到 preview 或 local surface。

fresh hosted browser session：`pm-signal-hosted-20260815`。

- `1440×1000` fresh first-run title 為 `PM Signal Lab — 產品訊號到決策`；first-run boundary 已更新，沒有中文「模型品質」或英文 `model quality`。
- 載入 sample 後讀到 4 個 evidence rows、`現在知道來源可回看，判斷由你確認`、no horizontal overflow；verify → adopt → decide → ship 可操作。
- hosted feedback privacy block 與合法 output 都重跑：未確認時 output 不存在；確認後 output 存在，feedback 不含 `model quality`，頁面不含中文「模型品質」或英文 `model quality`。
- 將同一 hosted session 調整為 `390×844`：ship／feedback output 存在、boundary／context copy 正確、`scrollWidth === clientWidth === 390`、`overflow: false`；capture 為 `.playwright-cli/human-owned-trust-copy-hosted-mobile-390.png`，已人工檢視。
- hosted `console error`：Total messages `0`，Errors `0`、Warnings `0`。

Hosted smoke 證明的是 `86755fe` 已透過 GitHub Actions 建置、部署，canonical URL 可回應且這個 slice 在 hosted browser 可操作；它不證明跨瀏覽器完整性、真實裝置、螢幕閱讀器、真人 usability 或 model quality。

### Public snapshot

本輪 GitHub API readback：repo `0 stargazers`、`0 forks`、`1 open issue`、default branch `main`；公開 issue [#4](https://github.com/asdc163/pm-signal-lab/issues/4) `open`、`0 comments`。這是 2026-08-15 本輪 snapshot，不是 adoption、growth 或 10,000-star progress result；issue 存在也不代表有人完成 session。

## Not covered

- Codex Chrome Extension tab control、既有 Chrome profile、Chrome／Firefox／Safari 完整矩陣。
- VoiceOver、NVDA、TalkBack、任何實際 screen-reader announcement、real iOS／Android device、virtual keyboard、native share／download。
- 非 owner PM session、外部 tester comment、field note／issue triage、retention、traffic、qualified star、adoption、model quality、production readiness。
- GitHub 帳號或 repository 的 10,000 stars outcome；本輪沒有也不會用腳本灌星、互讚、追蹤、DM、mass reply 或偽造 metrics。

這些不是「沒問題」的反面宣稱，而是尚未取得正確層級證據的範圍。下一個 promotion gate 仍是讓非 owner PM 真的完成五分鐘任務，留下可審查且不含私密資料的回報，再依實際卡點修正並重跑相同 evidence loop。

## Rollback

若後續真實 session 顯示 human-owned copy 的語意、閱讀順序或 recovery affordance 退化，可回到 [`9fcff79`](https://github.com/asdc163/pm-signal-lab/commit/9fcff7999889101dfab2eaa966ba95efc9e9daa6)。本輪沒有 migration、dependency change、provider、secret 或資料庫寫入；rollback 尚未執行。

## Release decision

本輪可以維持 public preview，並繼續以 issue #4 收集真實 session evidence；這個 slice 的 copy、deterministic tests、local browser 與 hosted smoke 已驗證。不能把它標成 fully verified、production-ready、viral、adopted 或 star-growth success。

對 Tommy 的作品集價值是把一次具體的產品語意判斷、AI 去味與 human-owned trust boundary 寫成可回看的 PM evidence；對 10,000 stars 目標而言，真正缺的仍不是把數字寫大，而是非 owner 使用、公開問題、修復回歸與長期可見的外部訊號。
