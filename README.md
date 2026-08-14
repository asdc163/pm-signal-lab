# PM Signal Lab

> 把產品訊號變成有來源、可審核的下一步。

PM Signal Lab 是一個 local-first product evidence workbench。它把訪談、客服、產品觀察與競品片段串成一條可回看的工作流：

`收集 → 核對 → 安排 → 帶走`

Hosted demo：<https://asdc163.github.io/pm-signal-lab/>

## 五分鐘試用

不需要登入，也不用準備 API key：

1. 開啟 [hosted demo](https://asdc163.github.io/pm-signal-lab/)，按 `載入範例資料`。
2. 展開一筆 `查看來源`，確認原文、時間與限制。
3. 按 `開始核對`，對一個暫定判斷選擇 `採用這個判斷` 或 `保留為假設`。
4. 到 `安排` 按 `草擬最小實驗`，再匯出或複製決策 brief。
5. 在 `帶走` 的「試用回音」開啟 `整理一次試用`，填寫你真正遇到的卡點，勾選 privacy confirmation，產生並檢查 field note。
6. 若你願意回報，複製 field note 後自行開啟 [公開試用 issue #4](https://github.com/asdc163/pm-signal-lab/issues/4)；產品不會自動送出。

這條路徑的目標不是讓你相信一個模型，而是讓你看見：哪一句來自哪個來源、哪裡仍然缺證據，以及下一步要怎麼驗證。

![PM Signal Lab first-run](./docs/product/pm-signal-lab/assets/qa/notebook-shell-first-run-1440.png)

這個專案不是泛用聊天機器人，也不把規則輸出包裝成模型能力。v0 先用固定規則完成一條可重跑、可檢查、沒有 API key 的產品工作流，讓 PM 練習 evidence、claim、uncertainty、experiment 與 decision memo 之間的關係。

這是 [John Wu](https://github.com/asdc163) 的 AI Product Manager portfolio project：重點不在「AI 看起來很會」，而在於能不能把訊號、來源、限制與下一步連成一個可被團隊使用的產品流程。

## 為什麼現在做

工具的門檻正在下降，但 PM 最難的部分仍然是：哪些訊號值得相信、結論能不能回到來源、缺口要如何轉成最小實驗。PM Signal Lab 以這個信任問題為產品核心，讓系統整理候選內容，但把判斷責任留在人身上。

本專案的方向建立在 2026-08-14 對 1,042 個公開 GitHub reference repos 的 metadata、README 結構與 20 個近鄰案例研究上。完整研究方法與證據邊界在 [`docs/research/github-reference-research-2026-08-14.md`](./docs/research/github-reference-research-2026-08-14.md)。這是 reference corpus，不是採用率或成功保證。

## 目前可以做什麼

- 載入一組含訪談、客服、產品觀察與競品訊號的 sample evidence pack。
- 新增一筆本機 evidence；表單會保留錯誤輸入並標出來源、內容與長度問題。
- 逐個查看 candidate claim 的 source mapping、timestamp 與 limitation。
- `接受`、`編輯`、`保留為假設` 或標記缺少證據；編輯會留在來源旁，儲存後仍回到 `需要你確認`，只有人為處理過的 claim 才能進入決策 brief。
- 草擬可編輯的 experiment brief，包含 primary metric、guardrail、smallest test 與 decision rule。
- 匯出、複製或下載帶有 `Not covered` 的 Markdown decision memo。
- 在帶走頁整理一份不含原始訊號的 session feedback field note，送出前由你自己檢查並決定是否貼到 GitHub issue。

所有內容目前只留在目前這個頁面；重新整理會重設，沒有登入、資料庫、外部 AI provider、GitHub mutation、MCP action、telemetry 或自動發送。若要保留 brief 或 field note，請在離開或重新整理前自行複製或下載。

## Quickstart

需要 Node.js 20.19+ 與 npm。

```bash
npm install
npm run dev
```

開啟 Vite 顯示的 local URL，按下 `載入範例資料`，再依序完成 `核對`、`安排` 與 `帶走`。

在提交前執行完整本機 gate：

```bash
npm test
npm run lint
npm run build
```

## 產品與工程設計

核心 domain object 是：

`Evidence → Claim → ExperimentBrief → DecisionMemo`

UI 與 domain engine 分開，便於日後加入 provider adapter，而不把 API key、模型漂移或外部 side effect 帶進第一版。主要檔案：

- [`src/App.tsx`](./src/App.tsx)：工作流程、狀態與互動組合。
- [`src/domain/synthesis.ts`](./src/domain/synthesis.ts)：deterministic candidate claims 與 experiment draft。
- [`src/domain/export.ts`](./src/domain/export.ts)：decision memo readiness gate 與 Markdown export。
- [`src/domain/feedback.ts`](./src/domain/feedback.ts)：privacy-gated session feedback field note export。
- [`src/domain/fixture.ts`](./src/domain/fixture.ts)：可重跑的 product discovery sample pack。
- [`src/styles.css`](./src/styles.css)：paper index rail、warm-paper workbench、evidence spine 與 responsive layout。
- [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml)：每次 `main` 更新後自動建置並部署 hosted demo。
- [`DESIGN.md`](./DESIGN.md)：視覺 DNA、tokens、狀態與排版規範。
- [`research notebook shell contract`](./docs/product/pm-signal-lab/22-research-notebook-shell-reframe-contract-2026-08-15.md)：本輪將 shell 收斂成 PM 研究工作紙的設計決策、排除項目與驗證邊界。
- [`workbench density transition contract`](./docs/product/pm-signal-lab/24-workbench-density-transition-contract-2026-08-15.md)：說明為什麼 first-run 保留 editorial cover、載入 evidence pack 後改用更密的工作台抬頭，以及本輪的驗證門檻。

## 目前不宣稱的事情

- 這不是 production AI quality benchmark。
- 尚未驗證真實使用者 adoption、留存、conversion、模型準確率或 GitHub stars 成長。
- 沒有把 GitHub / MCP / issue mutation 接進去，因此不會代表使用者修改外部資源。
- `4/5` 是 experiment brief 裡的 usability hypothesis，不是已完成的研究結果。

## Public demo status

這個 repository 以 public preview 形式公開，並提供一個不需要登入的 hosted demo，方便收集 issue、task-session feedback 與後續貢獻。產品資料仍只留在目前這個頁面；重新整理會重設：沒有登入、雲端資料庫、外部 provider 或自動修改 GitHub 資源。這是刻意的 local-first 邊界，不是持久化儲存承諾。

Hosted demo 目前由 GitHub Pages workflow 部署；Vercel 只作為本機部署排錯時的參考，不是作品集 canonical URL。

目前的公開版本與驗證範圍記錄在 [`research notebook shell release audit`](./docs/product/pm-signal-lab/23-research-notebook-shell-release-audit-2026-08-15.md)、[`editorial field note release audit`](./docs/product/pm-signal-lab/21-editorial-field-note-release-audit-2026-08-15.md)、[`inline claim editor release audit`](./docs/product/pm-signal-lab/19-inline-claim-editor-release-audit-2026-08-15.md)、[`inline editor / Chrome blocked QA report`](./docs/product/pm-signal-lab/18-chrome-extension-a11y-blocked-qa-report-2026-08-15.md) 與 [`visual product reframe release audit`](./docs/product/pm-signal-lab/16-visual-product-reframe-release-audit-2026-08-15.md)。它們證明的是目前覆蓋範圍內的可重跑 workflow，不是「完全沒問題」、真人 adoption、模型品質或 10,000 顆星的保證。

## 想一起試用

如果你是 PM、founder、designer 或 product engineer，可以用 [`五分鐘試用腳本`](./docs/operations/pm-session-kit.md) 自己走完一次，不需要 maintainer 逐步帶操作。完成後，使用帶走頁的 field note 整理卡點、信任或不信任的原因，以及一個你最希望先改的地方；檢查過後，再貼到 [公開試用 issue #4](https://github.com/asdc163/pm-signal-lab/issues/4)。

這個回饋入口只需要任務觀察，不需要貼入 private customer data、API key、token 或原始敏感 evidence；若內容可能含有機密，請先不要公開提交。

## 下一輪 promotion triggers

先取得至少 5 位目標使用者的 task-session evidence，再決定是否進入下一輪：

1. ≥3 人主動要求帶入自己的 evidence pack，才評估 OpenAI、Anthropic 或 local model adapter。
2. ≥3 個外部工作流需要 portable schema，才評估 JSON import/export。
3. provider、source provenance 與 approval contract 穩定後，才評估 read-only GitHub/MCP adapter。
4. usability gate 通過且取得明確授權後，才考慮加入 provider、登入或外部 mutation；hosted demo 本身不代表真實 adoption 或 production readiness。

## License

目前尚未宣告 license。除非另有書面授權，請先把這個 repository 視為可閱讀的 public preview，不要直接重新發布或把程式碼放進商業產品。
