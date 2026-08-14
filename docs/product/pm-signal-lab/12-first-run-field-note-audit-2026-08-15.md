# First-run Field Note Audit — 2026-08-15

## Verdict

**本輪介面改造已推送，並完成本機與 canonical GitHub Pages 的可重跑驗證。**

這份 audit 證明的是「第一輪 PM 試用工作流」在目前覆蓋範圍內可操作、可回看、可匯出；它不證明產品沒有任何問題、真人採用、模型品質、production readiness、爆紅或 10,000 GitHub stars。

## Release identity

| 項目 | 本輪證據 |
|---|---|
| Repository | [`asdc163/pm-signal-lab`](https://github.com/asdc163/pm-signal-lab) |
| Commit | [`f0c8bf7`](https://github.com/asdc163/pm-signal-lab/commit/f0c8bf71e56fb8d8da79b2e9234b91322ff82598) — `Refine first-run evidence workflow` |
| Canonical URL | [`https://asdc163.github.io/pm-signal-lab/`](https://asdc163.github.io/pm-signal-lab/) |
| CI | [`31827981086`](https://github.com/asdc163/pm-signal-lab/actions/runs/31827981086) — success |
| Pages deploy | [`31827981023`](https://github.com/asdc163/pm-signal-lab/actions/runs/31827981023) — success |
| Browser route | Playwright CLI fallback；本輪沒有可呼叫的 Codex Chrome Extension QA 工具 |
| Data boundary | deterministic fixture + in-memory browser state；沒有登入、外部 provider 或 telemetry |

Pages job 有 GitHub Actions 的 Node.js 20 deprecation annotation，但 deploy job 本身成功；這是 CI 維護風險，不是本輪產品流程失敗。

## Product decision behind this pass

這輪把首輪體驗定義成一張可閱讀的 field note，而不是泛用 AI dashboard：PM 先看到一段具體原文，再做一個明確判斷，最後帶走一份可驗證的最小實驗。

- Hero 只報告「第一步／先看一組範例」與進度；主要開始入口只放在中央試用任務。
- 右側空狀態提供「先從中央的試用任務開始」的文字指引，不再複製一顆載入按鈕。
- 抽象的 `PM SIGNAL LAB / evidence desk`、`engine`、`live` 表達不再出現在 runtime 的產品主角位置。
- fixture source 改成 `訪談紀錄`、`客服信箱`、`產品觀察`、`競品拆解` 等可回看的物件名稱。
- 空狀態不再用 `—` 填空；改成「哪一句訊號值得再查」「一個最小驗證」「來源會跟著判斷」。
- mobile sticky action 與來源控制都維持 44px 觸控高度。

這些是基於 KB 的產品設計判定，不是「真人已覺得自然」的研究結論；後者仍要透過真實 PM session 回報驗證。

## Code gates

在 commit 前於本機執行：

- `git diff --check`：pass。
- `npm test -- --run`：3 個 test files、7 tests passed。
- `npm run lint`：TypeScript no-emit exit 0。
- `npm run build`：TypeScript build + Vite production build exit 0。

## Fresh browser evidence

以下使用本機 Vite 與 canonical Pages 的乾淨／重載 Playwright session；不是 self-review 或只看 build log。

### Local fallback

- 首屏讀到 `產品訊號／工作頁`、`先看來源，再決定下一步`、具體 fixture quote；首屏只留下中央 `載入範例資料` 主要 CTA。
- normal flow：載入範例資料 → 展開第一筆來源 → 開始核對 → 採用有來源判斷 → 草擬最小實驗 → 匯出決策 brief。
- friction/recovery：空白新增訊號表單顯示標題、來源、內容三個欄位級錯誤；已填入測試資料並成功新增一筆訊號，輸入沒有被錯誤狀態清掉。
- export：`複製 Markdown` 顯示成功提示；`下載 .md` 實際產生 `pm-signal-decision-brief.md`，內容含資料邊界與 `未涵蓋`。
- keyboard：第一個 `Tab` 落到「跳到主要內容」，按 `Enter` 後 URL 為 `#main-content`、焦點落在 `main#main-content`。
- 390×844：empty 時 mobile action bar `display: none`；載入後才顯示；scroll width = 390；4 個 `查看來源` 控制各 44px；sticky CTA = 44px。
- 768×1024 與 1440×900：scroll width 分別等於 viewport width，沒有 horizontal overflow。
- console：本輪檢查 error/warning 均為 0；React DevTools info 不算產品錯誤。

### Hosted canonical

- `curl -fsSIL https://asdc163.github.io/pm-signal-lab/`：HTTP/2 200；`last-modified` 為本次 Pages deploy 之後。
- 乾淨 hosted session 讀到 title `PM Signal Lab — 產品訊號到決策`、`lang=zh-Hant`、hero `先看來源，再決定下一步`；舊的 `PM SIGNAL LAB / evidence desk` 與 `Interview note · PM-07` 不存在於 runtime。
- hosted normal flow 實際重跑載入、來源展開、核對、採用、實驗草稿與 export；export 畫面保留 `資料邊界`、`已知限制`、`未涵蓋`。
- hosted copy/download：複製提示成功，下載檔案成功；檔案內保留「尚未驗證真實模型品質、長期留存或轉換提升」與「這份 memo 是本機預覽輸出，不代表外部使用者採用」。
- 390×844：empty mobile bar `none`；載入後 `flex`；scroll width = 390；mobile CTA = 44px；4 個來源控制各 44px。
- 768×1024：scroll width = 768；desktop sidebar `display: none`。
- hosted console：error = 0、warning = 0。

## Current GitHub operating evidence

這些是本輪透過 GitHub API 讀回的真實狀態，不是目標值：

- repo：public、0 stars、0 forks、4 open issues；homepage 指向 canonical Pages URL。
- 最近可讀的 GitHub traffic endpoint window：0 views／0 uniques、0 clones／0 uniques。
- public pilot issue [`#4`](https://github.com/asdc163/pm-signal-lab/issues/4)：open、0 comments；目前仍在等待真實 PM session，不把 issue 建立當成 adoption。
- weekly automation `pm-signal-lab`：`ACTIVE`、每週一 09:00；只允許讀取指標、做一個最小可回滾工作、在證據完整時推送，禁止自動加星、追蹤、按讚、私訊、群發回覆或偽造 metrics/adoption。

## Not covered / not claimed

- 沒有宣稱 real LLM/provider quality、accuracy、latency、token cost、prompt-injection resistance 或長期效果。
- 沒有完成 Codex Chrome Extension sign-off；Playwright 只能作為本輪 fallback，不能代替完整 Chrome Extension、screen reader 或真機驗證。
- 沒有實際執行 VoiceOver、NVDA、TalkBack、iOS/Android 真機、真機分享、低頻寬或多瀏覽器矩陣。
- 沒有完成至少 5 位真實 PM 的 task session、外部 feedback issue、activation、retention、referral 或 adoption evidence。
- 沒有自動加星、灌流量、偽造使用者、互動或流量；10,000 stars 不能保證，只能透過真實使用者價值、公開品質、可觀測回饋與可持續分發逐步累積。
- repo 尚未選定 license；這是需要主人決策的法律／治理選擇，本輪沒有代替決定。

## Next release gate

下一個 gate 是讓真實 PM 依 [`pm-session-kit.md`](../../operations/pm-session-kit.md) 完成一次 hosted trial，回報「哪裡停頓、哪裡誤解、是否信任來源、是否能恢復」，再以實際 session evidence 決定下一個最小改動。只有出現可回讀的使用與回饋，才開始用 activation、repeat use、issue quality、referral 與 stars 判斷成長。
