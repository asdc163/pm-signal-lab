# GitHub Reference Research — 2026-08-14

## Executive decision

這次研究不支持「再做一個泛用 AI chatbot」；它支持一個更窄、也更能代表 AI Product Manager 能力的方向：

> **PM Signal Lab：把訪談、客服、埋點、競品與 GitHub/AI 變化整理成有來源、有不確定性、可審核、可執行的產品決策與實驗 brief。**

第一個可交付切口是 local-first 的 `Signals → Claims → Experiment → Decision` 工作台。它把 AI 放在「整理與輔助判斷」的位置，讓人保留核准、修正、匯出與停止權，而不是再做一個黑箱聊天框。

這是一次 **reference research / product discovery**，不是 PMF 證明，也不是保證爆紅的預言。

## 研究範圍與資料時間

- 資料時間：2026-08-14，Asia/Taipei。
- 研究目標：至少 1,000 個與 AI、agent、MCP、LLMOps、developer tools、analytics、automation、knowledge management、product management 相關的公開 GitHub repository reference objects。
- 唯一性：以 `owner/name` 去重；同一 repo 出現在多個 query 或 Trending 頁只算一次。
- 研究來源：GitHub REST repository search、GitHub Trending HTML、repo public README；未登入、未讀私有內容、未使用第三方排行資料作為主證據。
- Durable manifest：[`github-reference-manifest-2026-08-14.json`](./github-reference-manifest-2026-08-14.json)。

## Corpus evidence

| Layer | 研究量 | 取得方式 | 欄位完整度 | 能支持什麼 |
|---|---:|---|---|---|
| Tier A — API metadata | 821 unique repos | 10 個 GitHub REST search query，各取 stars 排序前 100 筆後去重 | full public repository metadata | 分群、品質/適配排序、熱門問題空間 |
| Tier A — Trending supplement | 221 unique repos | 14 個成功的 GitHub Trending 頁面，跨 all、Python、JavaScript、TypeScript、Go、Rust、Swift、Jupyter、Java、Ruby、Dart、Kotlin 及 daily/weekly/monthly | identity、topic/語言頁面、Trending presence；部分欄位未提供 | 補充近期可見的 discovery signal |
| Tier B — README deep sample | 100 repos | 從 API layer 依品質/適配分數選樣，下載 100 份 README 全文 | 100/100 成功；抽取 headings、quickstart、demo、docs、contributing、community 等訊號 | 研究 onboarding、proof、documentation、community 經營模式 |
| Tier C — close comparators | 20 repos | 從 top sample 選出 AI platform、eval/observability、agent harness、developer tool、product analytics 相近對象，讀 README 首段與主要 headings | qualitative pattern review；不是 GitHub 內部營收或流量資料 | 收斂第一個產品 wedge 與 repo 經營打法 |

結果：**1,042 個去重後的公開 GitHub reference repos**。這個數字是本輪可重跑的研究集合，不代表 1,042 個 repo 都做了同等深度的人工 code review。

## 研究 query 與去重

### GitHub REST search queries

每個 query 使用 repository search、`sort=stars`、`order=desc`、`per_page=100`：

```text
stars:>100 topic:ai
stars:>100 topic:llm
stars:>50 topic:ai-agents
stars:>20 topic:mcp
stars:>50 topic:llmops
stars:>100 topic:developer-tools
stars:>50 topic:analytics
stars:>50 topic:automation
stars:>50 topic:knowledge-management
stars:>20 topic:product-management
```

API layer 共取得 1,000 筆 raw rows，去重後 821 repos。GitHub repository API 的 `per_page` 上限是 100，因此本輪採用多 query，而不是假裝一個 query 能代表整個市場。[GitHub REST repository endpoints](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28)

### Trending supplement

API search 去重後只有 821，為了達到使用者要求的 1,000+ 研究對象，我再用 GitHub Trending 的近期頁面補足 221 個 unique identity records。補充 records 沒有被推測出不存在的 stars、license、pushed_at 或 repo health；資料缺少就保留 `未提供`，品質分數只作低信心 reference priority。

## Reference-selection score

這個 score 只用來決定「哪些 reference 先深讀」，不是 repo 品質認證，也不是 adoption、PMF、營收或使用者滿意度分數。

API metadata 的排序公式：

```text
score =
  0.25 × normalized(log10(stars + 1))
+ 0.10 × normalized(log10(forks + 1))
+ 0.18 × recency(pushed_at)
+ 0.06 × not_archived
+ 0.04 × has_license
+ 0.02 × has_homepage
+ 0.015 × has_issues
+ 0.015 × has_discussions
+ 0.015 × has_topics
+ 0.30 × AI/PM-fit keyword signal
```

AI/PM-fit keyword signal 檢查 repo name、description、topics 是否出現 `ai`、`llm`、`agent`、`mcp`、`eval`、`prompt`、`product`、`analytics`、`developer`、`automation`、`workflow`、`knowledge`、`copilot`、`rag`、`observability`、`experiment` 等詞。這個設計刻意沒有讓 stars 佔大多數，避免把人氣誤當作與 Tommy 的產品適配度。

## 主要觀察

### 1. 最接近 AI PM 旗艦工具的機會，在「可驗證工作流」而不是「再做聊天」

Top 100 的 query mix 中，`mcp` 出現於 35 個、`llm` 34 個、`ai-agents` 34 個、`ai` 22 個、`llmops` 21 個；`product-management` 只有 1 個直接進入 top 100。這表示市場的供給重心很偏向 runtime、agent、context、eval、observability 與 developer tooling，**直接服務 PM decision quality 的開源工具仍然是低密度區**。

這是機會訊號，不是需求已驗證。它支持我們做「PM workflow 的 evidence layer」，不支持直接做一個完整 PM SaaS。

### 2. Python + TypeScript 是合理的雙語言策略，但第一版應選 TypeScript Web

API sample 中最常見的語言是 Python 253、TypeScript 182、JavaScript 60、Rust 50、Go 49。GitHub 的 Octoverse 2025 也指出 TypeScript 在 2025 年超過 Python 與 JavaScript 成為 GitHub 上最常用語言，同時 Python 仍是 AI/data workloads 的主力。[Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)

因此第一版選 TypeScript + Web UI：它能直接展示 PM 工作台、容易做 responsive/分享與 GitHub README demo；AI provider 或分析 pipeline 後續可以用 Python adapter，不在 v0 同時承擔兩套 runtime。

### 3. README 的共同成功模式是「先讓人成功一次，再解釋完整系統」

在 100 份 README deep sample 中：

| README signal | 命中 |
|---|---:|
| docs / documentation link or section | 94 |
| quickstart / getting started | 81 |
| examples / usage / tutorial | 81 |
| installation | 80 |
| community / Discord / Slack / sponsor / discussions | 81 |
| contributing / development setup | 76 |
| demo / screenshot / video / try it | 75 |
| package-level install command | 72 |
| license mention | 82 |
| badges | 54 |
| changelog / release notes | 25 |
| roadmap | 29 |

這個結果直接影響第一個 repo：README 必須先露出 literal promise、sample data、60 秒 quickstart、可視化結果與 export；roadmap 反而不需要塞在首屏。

### 4. High-performing references 會把「證據」放在 claim 旁邊

這 20 個 close comparators 的共同手法不是同一種視覺，而是 proof placement：

| Reference | 可遷移的經營機制 |
|---|---|
| [Graphify](https://github.com/Graphify-Labs/graphify) | 用「What it does → Benchmarks → Install → 產出報告」把抽象 code intelligence 變成可檢查的工作結果。 |
| [ECC](https://github.com/affaan-m/ECC) | 多語言/多 harness 安裝路徑，讓同一個核心能力被 Claude Code、Codex、Cursor 等多個入口採用。 |
| [Dify](https://github.com/langgenius/dify) | Cloud、self-host、docs、pricing、community 同時出現，將 repo 變成產品入口，而不是只有 source code。 |
| [wshobson/agents](https://github.com/wshobson/agents) | 用可數的 plugins/agents/skills/commands 讓價值密度一眼可見，並以 single source-of-truth 支撐多 harness。 |
| [MLflow](https://github.com/mlflow/mlflow) | 以 debug、evaluate、monitor、optimize 的完整工作鏈講產品，不只講 model capability。 |
| [Haystack](https://github.com/deepset-ai/haystack) | 版本 announcement、documentation、features、community、contributing 與 enterprise path 串成生態。 |
| [RAGFlow](https://github.com/infiniflow/ragflow) | 用 citations、heterogeneous data、workflow、self-hosting 等具體 feature 對應信任與場景。 |
| [Promptfoo](https://github.com/promptfoo/promptfoo) | 「test prompts/agents/RAG + red teaming」是一句可執行的 wedge，並接 CLI、CI/CD、docs、community。 |
| [Headroom](https://github.com/headroomlabs-ai/headroom) | 「節省多少 token」直接做成 proof/benchmark，並提供 library、proxy、MCP、reversible/local-first 等多個 adoption path。 |
| [nanobot](https://github.com/HKUDS/nanobot) | Start Here、Why、Install、Quick Start、Deploy、WebUI、Architecture、Docs、Releases 排出清楚的第一次成功路徑。 |
| [Opik](https://github.com/comet-ml/opik) | Quick Start、比較、FAQ、cloud/self-host 兩種部署方式，降低評估工具的導入疑慮。 |
| [FastGPT](https://github.com/labring/FastGPT) | 多語 README、快速開始、第三方生態、社群與 Star History，讓中文市場也能被採用與傳播。 |
| [Langfuse](https://github.com/langfuse/langfuse) | Cloud/self-host、integration、quickstart、demo、changelog、roadmap、feature request 全部靠近 repo。 |
| [Khoj](https://github.com/khoj-ai/khoj) | 用「AI second brain」一句定位，接 docs、web、app、self-host、enterprise 與 contributor。 |
| [Helicone](https://github.com/Helicone/helicone) | observability、agent tracing、routing、cost/latency、datasets、fallback 以決策語言呈現。 |
| [code-review-graph](https://github.com/tirth8205/code-review-graph) | 「Stop burning tokens」搭配 blast-radius、incremental updates、benchmarks、limitations，強化可信度。 |
| [PostHog](https://github.com/PostHog/posthog) | analytics、session replay、flags、experiments、error tracking、logs、MCP 是一個完整 product learning loop。 |
| [DeerFlow](https://github.com/bytedance/deer-flow) | 版本敘事、one-line setup、quickstart、configuration、build/start，把複雜 agent runtime 壓成可啟動動作。 |
| [TruLens](https://github.com/truera/trulens) | 「Trace every step」+ compare/ship/metrics + installation/usage，把 AI 品質變成可觀察工作。 |
| [Coze Loop](https://github.com/coze-dev/coze-loop) | development、debugging、evaluation、monitoring 的 full lifecycle，並提供 Docker/Kubernetes 與 community path。 |

不要複製這些 repo 的品牌、文案或程式碼；要吸收的是「問題語言、第一次成功、證據、整合面與社群維護」的決策鏈。[GitHub README guidance](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)

### 5. Current AI trend 對產品設計的具體影響

這次不是把「AI」貼到產品名稱，而是把目前的 platform signals 轉成產品機制：

1. **Agentic workflow 正在從 demo 走向可治理的 repo 工作流。** GitHub Agentic Workflows technical preview 以 Markdown 描述目標，預設 read-only，寫入透過 safe outputs；這支持 PM 工具顯示 evidence、approval、action boundary，而不是直接讓 agent 改外部狀態。[GitHub Agentic Workflows](https://github.blog/changelog/2026-02-13-github-agentic-workflows-are-now-in-technical-preview/)
2. **AI action 需要 rationale、confidence 與 approval。** GitHub Issues 的 agent automation preview 將 rationale、confidence 與 accept/decline 放到變更前，這正好對應 PM decision brief 的 claim review 與人工核准。[GitHub agent automation controls](https://github.blog/changelog/2026-07-23-agent-automation-controls-in-github-issues-in-public-preview/)
3. **MCP 正在成熟成 agent infrastructure，而不是單純 connector。** 2026-07-28 MCP specification 引入 stateless core、可快取的 list results、authorization hardening 與 Tasks；因此 v0 先保留 provider/MCP adapter 邊界，但不把 MCP 當必要依賴。[MCP 2026-07-28 specification](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
4. **AI 工具的可信度從「生成結果」移向「eval、trace、observability、cost、rollback」。** 這同時出現在 MLflow、Promptfoo、Opik、Langfuse、Helicone、TruLens、PostHog 的 README 工作鏈中，也與 GitHub 對 agentic coding sandbox / control 的方向一致。[GitHub sandbox preview](https://github.blog/changelog/2026-06-02-cloud-and-local-sandboxes-for-github-copilot-now-in-public-preview/)
5. **TypeScript 是展示層的合理選擇，但不能假裝 AI quality 已被驗證。** 語言趨勢支持 stack 選擇，不支持需求、留存或 star growth 的結論。

## Tommy 的產品決策

### Selected direction: PM Signal Lab

產品一句話：

> 把一包散亂的產品訊號，變成一份「每個 claim 都能回到來源、每個不確定都能被看見、每個下一步都能被驗證」的決策 brief。

### 第一個 Aha moment

使用者載入內建的 `AI PM onboarding` sample pack 後，不需要 API key，60 秒內看到：

1. 原始訊號被拆成可閱讀的 evidence rows。
2. 系統把結論分成 `Supported`、`Needs review`、`Missing evidence`，而不是直接顯示一個漂亮的 AI 分數。
3. 使用者選中一個 opportunity，得到一份 experiment brief：假設、primary metric、guardrail、最小測試、停止條件。
4. 一鍵匯出 Markdown，能貼到 GitHub issue、PRD、Notion 或團隊討論。

### 為什麼這個切口適合 Tommy

- 它直接展示 PM 必須具備的 problem framing、evidence judgment、metric/experiment、AI trust、UX state、engineering contract 與 GTM artifact。
- 它有清楚的開源分享物：一份可讀的 decision brief、fixture pack、templates、evaluation cases，而不是只有一個 demo URL。
- 它能與 GitHub 當前的 agent、MCP、approval、trace 趨勢相接，但不需要在第一版就接 GitHub token、雲端資料庫或真實 customer data。
- 它可以從 deterministic fixture 起步，再逐步接 OpenAI/Anthropic/local model、MCP、GitHub Issues、PostHog 等 adapters。

### 不選的方向

| 方向 | 為什麼不選 |
|---|---|
| Generic AI PRD writer | 供給密度高，容易變成 prompt wrapper；缺少可驗證的差異。 |
| Full PM analytics platform | 需要真實資料接入、身份/權限、埋點品質與長期營運，v0 風險過大。 |
| Autonomous GitHub PM agent | 目前趨勢很強，但涉及 token、issue write、權限與外部 side effect；先做 approval/evidence layer，再決定是否接入。 |
| 只做模板/文件庫 | 最快，但無法展示 AI PM 的 workflow、狀態與行為能力。 |
| 直接做 MCP server | 有趨勢但與 Tommy 的 PM 能力主張太間接；先把核心 domain object 做對，再提供 MCP adapter。 |

## 建議的 Star / distribution mechanism

Stars 不是目標本身；第一版應設計可被「收藏、引用、fork、分享」的 artifact loop：

```text
內建 fixture
  → 一次成功的 decision brief
  → 可下載 Markdown / JSON
  → GitHub issue / PRD 可直接引用
  → 使用者 fork 自己的 evidence pack
  → 回到 repo 提交新 template / evaluation case / adapter
```

Repo page 需要：literal README、60 秒 quickstart、產品截圖、sample output、limitations、contributing、license、topics、issue templates、release note。GitHub 官方說 topics 會幫助使用者發現與貢獻 repository；community profile 也會檢查 README、CODE_OF_CONDUCT、LICENSE、CONTRIBUTING 等健康檔案。[GitHub topics](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics)、[GitHub community profile](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/about-community-profiles-for-public-repositories)

不要用購買 stars、交換 stars、機器帳號、灌水 issue 或虛構 adoption。真正的 distribution 先驗證：clone/use、fork、sample export、issue/PR feedback、repeat visit、外部 referral；GitHub traffic 需要 push access，且只提供過去 14 天的 traffic window，不應在未登入時假裝知道。[GitHub traffic](https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/viewing-traffic-to-a-repository)

## Limitations / not covered

- 1,042 是公開 metadata/Trending reference corpus；其中 221 筆只具有 identity/Trending-level fields，不能宣稱所有對象都有完整 README、issue、release 或 community 深讀。
- 100 份 README 都成功下載，但 signal extraction 是規則式；不是每一個 repo 的人工產品研究、使用者訪談或 code review。
- 20 個 close comparator 是本輪的 qualitative pattern review；沒有私有營收、MAU、clone、traffic、conversion 或 contributor retention 資料。
- GitHub stars 是 interest/discovery proxy，不是 adoption、品質、PMF 或收入證明。
- 沒有真人 PM 訪談、可用性測試、fake door、付款或 production usage；因此 PM Signal Lab 的 desirability/viability 仍是 low-confidence hypothesis。
- 沒有登入 `asdc163`、沒有 push、release、deploy、發文，也沒有改 GitHub 帳號設定。

## Next evidence to collect

1. 先完成 fixture-based v0 與 5 個 task-based usability sessions，確認使用者能否在 5 分鐘內說出「哪個 claim 可以相信、下一步是什麼」。
2. 找 5–8 位 AI PM / PM / founder 做 story-based interview，驗證 current workaround、switch trigger 與 export/share 行為。
3. 用 3 個真實但去識別化的 evidence packs 做比較：純人工模板、generic LLM summary、PM Signal Lab evidence workflow。
4. 只有當 core workflow 有行為證據，再接一個 provider adapter 或 MCP read-only adapter。
5. 公開 pilot 時再建立 `clone → first brief → export → fork/issue` 的 instrumentation 與 decision rule；在此之前不把 star count 當主要 KPI。
