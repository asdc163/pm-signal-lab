# Editorial Evidence Desk Release Audit — 2026-08-15

## Verdict

**已推送的 public preview；本輪視覺、匯出內容與目前覆蓋範圍內的本機／hosted workflow 已重新驗證。**

這份 audit 證明的是一條可重跑的 PM evidence workflow 與它的公開預覽邊界，不是「完全沒問題」、AI 品質、真人採用、GitHub stars 或 10,000 stars 的證明。

## Release identity

| 項目 | 本輪證據 |
|---|---|
| Repository | [`asdc163/pm-signal-lab`](https://github.com/asdc163/pm-signal-lab) |
| Commit | [`af5b6c5`](https://github.com/asdc163/pm-signal-lab/commit/af5b6c5d5011238cbde2cae2b08559f681c9fde1) — `Refine evidence desk visual language` |
| Canonical URL | [`https://asdc163.github.io/pm-signal-lab/`](https://asdc163.github.io/pm-signal-lab/) |
| CI | [`31824818140`](https://github.com/asdc163/pm-signal-lab/actions/runs/31824818140) — success |
| Pages deploy | [`31824818200`](https://github.com/asdc163/pm-signal-lab/actions/runs/31824818200) — success |
| Browser route | Playwright CLI fallback；本輪沒有可呼叫的 Codex Chrome Extension QA 工具 |
| Data boundary | deterministic fixture + in-memory browser state；沒有登入、外部 provider 或 telemetry |

## Design changes applied

本輪把知識庫中的 `Pillow Fit` 專業工具感、`Altoslab` 克制排版、evidence-spine、中文優先與 anti-AI-slop 原則落到實際介面：

- 首屏改成真正的 `evidence desk`，空狀態直接展示一段 fixture 原文與「來源 → 判斷 → 最小驗證」任務，不用抽象 AI 圖示或假 dashboard 指標填空。
- 深色 rail 只保留為 workflow 導航簽名；中央採暖紙張、細線與 rust/teal 信任色，減少泛用 status pill、monospace metadata、光暈與 card soup。
- 工作頁右側只保留「這次怎麼走」、資料邊界與一個下一步；文字改成 `暫定判斷`、`來源在旁邊，你自己決定`、`資料不上傳` 等可理解的 literal copy。
- `Decision brief` 的 Markdown 匯出同步改成與畫面一致的資料邊界文案；本輪 hosted flow 實際回讀確認不再出現舊的 `本機試用邊界`。
- README 使用的 1440×900 first-run 圖片已換成這一輪實際瀏覽器截圖。

「去 AI 味」是本輪的設計判定，不是市場研究結論；真人 PM 是否覺得自然，仍要靠 session feedback 驗證。

## Local verification

### Code gates

- `npm test -- --run`：3 個 test files、7 tests passed。
- `npm run lint`：TypeScript no-emit exit 0。
- `npm run build`：TypeScript build + Vite build exit 0。
- `git diff --check`：pass。

### Fresh browser behavior

以本機 Vite server 的全新／重載 session，實際操作並檢查：

- 1440×900 first-run：讀到 `先看來源，再決定下一步`、真實 fixture quote、單一 primary CTA；無 horizontal overflow。
- 768×1024：workflow rail 收起，decision context 轉為兩欄；無 horizontal overflow。
- 390×844：empty state 不顯示會遮住 quote 的 fixed action bar；載入後 action bar 才出現；無 horizontal overflow。
- normal flow：載入範例 → 展開來源 → 開始核對 → 採用有來源判斷 → 草擬最小實驗 → 匯出 brief。
- export flow：重新整理 brief、複製 Markdown、下載 `pm-signal-decision-brief.md` 成功；匯出內容含新的 `資料邊界`，且不含舊的 `本機試用邊界`。
- friction/recovery：空白新增訊號表單保留表單，顯示標題／來源／內容三個欄位級錯誤；填入測試訊號後成功加入。
- keyboard/semantics：第一個 `Tab` 進入「跳到主要內容」，`Enter` 後焦點落在 `main#main-content`；來源展開後 `aria-expanded="true"` 與 labelled region 可讀。
- 觸控與狀態：390 的 4 個 `查看來源` 控制實測各 44px；載入後 mobile action bar 位於 viewport bottom。

## Hosted verification

以全新 canonical URL browser session 實際重跑：

- 1440×900：title、`zh-Hant`、`先看來源，再決定下一步`、empty state、desktop decorative menu `display: none`、scroll width 1440。
- hosted normal flow：載入 fixture、展開第一筆來源、進入核對、採用第一個有來源判斷、草擬實驗、匯出 brief。
- hosted export：textarea 回讀新的資料邊界文案；`複製 Markdown` 顯示成功 feedback；`下載 .md` 實際產生檔案。
- 390×844：scroll width 390；empty state mobile bar `display: none`；載入後 mobile bar `display: flex`、top 781；4 個來源控制各 44px；console errors 0、warnings 0。
- 768×1024：scroll width 768；sidebar `display: none`；`.desktop-stepper-wrap` `display: none`；console errors 0、warnings 0。
- `curl -fsSIL https://asdc163.github.io/pm-signal-lab/`：HTTP/2 200；Pages response 的 `last-modified` 已晚於本次部署。

## Current GitHub operating evidence

以下是本輪重新讀回的真實遠端狀態，不是目標值：

- repo：public、0 stars、0 forks、4 open issues、homepage 指向 canonical Pages URL。
- 最近可讀的 GitHub traffic window（2026-08-01 至 2026-08-14 UTC）：0 views／0 uniques、0 clones／0 uniques。
- public pilot issue [`#4`](https://github.com/asdc163/pm-signal-lab/issues/4)：open、0 comments。
- 每週營運 automation `pm-signal-lab`：`ACTIVE`，每週一 09:00；只允許讀取指標、做一個可回滾的小工作、在證據完整時推送，禁止自動加星、追蹤、按讚、私訊、群發回覆、偽造 adoption 或 metrics。

## Not covered / not claimed

- 沒有宣稱 real LLM/provider quality、accuracy、latency、token cost、prompt-injection resistance 或長期效果。
- 沒有完成 Codex Chrome Extension sign-off；本輪使用 Playwright fallback。
- 沒有實際執行 VoiceOver、NVDA、TalkBack、原生 iOS/Android、真機分享、低頻寬或多瀏覽器矩陣。
- 沒有完成至少 5 位真實 PM 的 task session、外部 feedback issue、activation、retention、referral 或 adoption evidence。
- 沒有自動加星、灌流量、偽造使用者或用外部工具製造 popularity；10,000 stars 只能透過真實使用、公開品質與可觀測回饋累積，不能被保證。
- repo 尚未選定 license；這是需要主人決策的法律／治理選擇，本輪沒有代替決定。

## Next release gate

下一個 gate 不是再堆泛用功能，而是邀請真實 PM 依 [`pm-session-kit.md`](../../operations/pm-session-kit.md) 完成一次試用，收集停頓、誤解、信任與恢復資料，修正後重新跑同一條 workflow。只有出現可回讀的 session evidence，才開始用 activation、repeat use、issue quality、referral 與 stars 判斷成長。
