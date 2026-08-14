# Visual Polish and Hosted QA Audit — 2026-08-15

## Verdict

**可分享的 hosted preview；核心 fixture workflow 已在本機與 canonical URL 重跑通過。**

這份 audit 證明的是一條可重跑的 PM 工作流和它的公開預覽邊界，不是 AI 品質、真實使用者採用、GitHub stars 或 10K stars 的證明。`Chrome Extension` 路徑、實際 screen reader、原生手機行為與真人 PM session 仍然是 `未驗證`。

## Release identity

| 項目 | 本輪證據 |
|---|---|
| Repository | `https://github.com/asdc163/pm-signal-lab` |
| Commit | `a8f5028` — `Polish PM Signal Lab evidence workbench` |
| Canonical URL | `https://asdc163.github.io/pm-signal-lab/` |
| Pages | public、HTTPS enforced、HTTP/2 200 |
| Browser route | Playwright CLI fallback；本輪沒有可呼叫的 Codex Chrome Extension QA 工具 |
| Data boundary | fixture + in-memory browser state；沒有登入、外部 provider 或 telemetry |

## Design decisions applied

本輪使用知識庫中的 product truth、subject specificity、evidence-spine composition、Chinese-first literal copy、card-soup reduction、type rhythm、state/recovery 與 behavior-first QA 原則。具體結果是：

- 將 `Collect / Verify / Decide / Ship`、`claim`、`opportunity`、泛用 status pill 與 generic event name 降到程式 domain 或必要 artifact 邊界；主要操作改成「收集 → 核對 → 安排 → 帶走」。
- 保留產品真正的 signature：來源、判斷、限制與最小實驗在同一條 evidence spine 上互相連接。
- 將主畫面整理成 evidence desk：暖中性底、清楚的讀取順序、左側 workflow rail、右側決策脈絡；不使用紫藍漸層、玻璃、orb、bento 或假 live 狀態。
- 將來源展開按鈕調整為至少 44px 觸控高度；平板只保留一份 workflow stepper，避免 768px 重複導航。

「去 AI 味」是本輪的設計判定，不是可量化的市場結論；是否讓真人 PM 感到自然，仍要靠實際 session feedback 驗證。

## Tested

### Code and CI

- `npm test -- --run`：3 個 test files、7 tests passed。
- `npm run lint`：TypeScript no-emit exit 0。
- `npm run build`：TypeScript build + Vite build exit 0。
- GitHub CI run `31821428772`：success，涵蓋 install、test、typecheck、build。
- GitHub Pages deploy run `31821428760`：success。
- `gh api repos/asdc163/pm-signal-lab/pages`：public、`https_enforced: true`。
- `curl -fsSIL https://asdc163.github.io/pm-signal-lab/`：HTTP/2 200；回應內容的 `last-modified` 對應本輪部署。

### Local browser behavior

在全新或清空的 Playwright fallback sessions 以 1440×900、768×1024、390×844 實際操作：

- first-run empty state → 載入範例資料 → 展開來源 → 進入核對。
- 展開 claim detail，確認 `role="region"`、`aria-labelledby`、來源對照與目前限制都可讀。
- 採用一個有來源的判斷 → 草擬最小實驗 → 匯出決策 brief。
- 複製 Markdown 成功顯示回饋；下載成功產生 `pm-signal-decision-brief.md`。
- 空白新增訊號表單會保留表單、聚焦第一個錯誤欄位、顯示欄位級 alert；填入不含私人資料的測試訊號後成功加入第 5 筆。
- 1440、768、390 的 `document.documentElement.scrollWidth` 都沒有超過 viewport；768 只顯示 1 份 stepper；390 的 mobile action bar 固定在 viewport 底部。
- 390 的來源展開按鈕實測為 44px；主要可見操作也維持觸控友善尺寸。
- 重新載入後以鍵盤按第一個 `Tab` 會進入「跳到主要內容」，按 `Enter` 後焦點落在 `main#main-content`。
- local covered path console errors：0；warnings：0。

### Hosted browser behavior

在全新 canonical URL sessions，以 `https://asdc163.github.io/pm-signal-lab/` 重跑：

- desktop 1440×900：title 正確、favicon 存在、desktop decorative menu `display: none`、初始畫面可理解。
- desktop full workflow：範例資料、來源、核對、採用、最小實驗、決策 brief、複製與下載均成功。
- mobile 390×844：scroll width 390、mobile action bar 在 viewport 781–844、4 個來源展開按鈕各 44px、可展開來源的語意 region 存在。
- tablet 768×1024：scroll width 768、可見 stepper 數量 1、`.desktop-stepper-wrap` 為 `display: none`。
- hosted covered path console errors：0；warnings：0。

## Findings fixed in this pass

1. **Fixed — generic AI/SaaS surface language**：主要工作流、狀態、空白頁、來源、判斷、實驗與 context rail 改成以產品工作為中心的中文 literal copy。
2. **Fixed — 768px duplicated navigation**：平板原本同時顯示 mobile stepper 與內容內 stepper；現在保留單一 top workflow control。
3. **Fixed — small source control target**：`查看來源`／`收起來源` 從約 30px 調整為 44px，並重新驗證手機沒有橫向溢出。
4. **Fixed — visual identity drift**：favicon、theme color、document title 與 design notes 對齊 PM Signal Lab 的證據工作台定位。

## Visual review score

這是本輪 fresh screenshot 與行為檢查的內部 review，不是使用者研究分數。

| 面向 | 分數 | 判定 |
|---|---:|---|
| Product truth / trust | 4/5 | 邊界、來源、限制與未涵蓋內容清楚；仍是 fixture preview |
| Hierarchy / first read | 4/5 | 首屏能先看到 job、來源與下一步；sample pack title 仍保留部分英文 artifact 語境 |
| Typography / copy | 4/5 | 中文優先、literal verbs、少 generic label；Markdown artifact 保留必要英文 heading |
| Layout / composition | 4/5 | evidence spine 與決策 context 成為主要構圖；仍未經真人 hesitation 研究 |
| Responsive / interaction | 4/5 | 390、768、1440 無水平溢出，stepper 與 sticky CTA 可用 |
| Recovery / accessibility semantics | 4/5 | empty、invalid form、focus-on-error、skip link、region/label 已驗；實際 AT 未跑 |

**平均：4.0/5（限本輪覆蓋範圍）；沒有已知 P0/P1 release blocker。**

## Not covered / not claimed

- 沒有宣稱 real LLM/provider quality、latency、token cost、prompt-injection resistance 或 AI accuracy。
- 沒有完成 Codex Chrome Extension sign-off；本輪是 Playwright CLI fallback evidence。
- 沒有實際執行 VoiceOver、NVDA、TalkBack、原生 iOS/Android、真機分享或低頻寬網路測試。
- 沒有真人 PM task session、外部 feedback issue、activation、retention、referral、GitHub traffic、stars 或 adoption evidence。
- 沒有自動加星、灌流量、偽造使用者或以外部工具製造 GitHub popularity；10K stars 只能透過真實使用、公開品質與可觀測回饋累積，不能被保證。
- GitHub mutation、MCP action、登入、資料庫、外部 telemetry 仍未接入。

## Next gate

下一個 release gate 不是再加一層漂亮 UI，而是邀請至少 5 位目標 PM 依 [`pm-session-kit.md`](../../operations/pm-session-kit.md) 自行完成一次試用，記錄完成率、停頓、信任與回復；在真實回饋出現前，adoption 與 stars 必須維持 `未驗證`。
