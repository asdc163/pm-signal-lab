# Discovery Brief — PM Signal Lab

## Opportunity

- Stated request: 做一個能搭上 AI 與時事、能代表 Tommy 持續接觸 AI、強化 AI Product Manager 能力，並有機會在 GitHub 被收藏與傳播的開源專案。
- Underlying opportunity: AI PM 需要把不完整、互相矛盾、來源不同的產品訊號，轉成可解釋的產品決策與最小驗證行動；現有 AI 工具常停在摘要、聊天或生成 PRD，沒有把 claim、source、uncertainty、metric、guardrail、approval 與 export 串成一個可稽核的工作流。
- Evidence (cited):
  - Tommy 在本次需求中直接表達 AI PM 身份、時事/AI 連結、PM 小工具與 GitHub 傳播目標；這是 owner intent evidence，不是外部需求證明。
  - 2026-08-14 的 1,042-repo public GitHub reference corpus 顯示，供給大量集中在 agents、MCP、LLMOps、eval、observability、developer tools；直接以 product-management 為 topic 並進入 API top sample 的只有 1 個，表示「PM decision quality layer」是相對低密度的探索空間，但仍是 market signal，不是 PMF。
  - 100 份 top-sample README 中，94 有 docs signal、81 有 quickstart、75 有 demo/screenshot/video、76 有 contributing signal；這支持「第一次成功 + proof + community path」作為開源產品設計要求。
  - GitHub Agentic Workflows technical preview、Issues agent automation 的 rationale/confidence/approval、以及 MCP 2026-07-28 的 stateless/auth/tasks 方向，支持把 AI 產品的核心能力放在 context、approval、provenance、可回復工作流，而不是只放一個聊天框。
- Current workaround: Tommy 目前以 Codex/ChatGPT、工作區文件、手動 repository audit、手動產品規劃與分散的 PM/AI 工具完成相同工作；前一輪已存在的 [`github-star-growth-plan.md`](../../github-star-growth-plan.md) 顯示策略、研究、repo audit 與執行清單目前是文件化但分散的流程。這是工作區 observation，不代表其他 PM 已採用相同 workaround。
- Why now: agentic coding、MCP、AI eval/observability、GitHub approval/sandbox 讓「AI 做了什麼、用了什麼、為什麼相信、何時需要人批准」成為產品問題；同時 TypeScript 的 GitHub usage momentum 使一個 TypeScript Web 工作台能直接服務開源展示與分享。

## Opportunity Solution Tree

```text
Desired outcome:
  AI PM 能更快產出可信、可執行、可分享的產品決策
  ├─ Opportunity A：零散訊號難以整理成可追溯 claim
  │  ├─ Solution A1：local-first evidence ledger + claim status（選）
  │  └─ Solution A2：generic AI summarizer（不選，缺 provenance）
  ├─ Opportunity B：AI 建議缺少不確定性、人工核准與下一步
  │  ├─ Solution B1：experiment brief + decision rule + approval boundary（選）
  │  └─ Solution B2：autonomous GitHub PM agent（延後，side-effect/permission 風險高）
  └─ Opportunity C：有價值的 PM artifact 不容易被引用與分享
     ├─ Solution C1：Markdown/JSON export + fixture/template ecosystem（選）
     └─ Solution C2：先做 full SaaS collaboration（延後，資料/權限成本高）
```

## Alternatives considered

| Option | Cost | Risk | Verdict |
|---|---|---|---|
| Generic AI PRD writer | 低至中；可快速串 LLM | 供給過密、輸出同質、容易變成 prompt wrapper，無法證明 PM judgment | Reject |
| Full PM analytics platform | 高；需要 data connector、identity、schema、permissions、analytics QA | 一開始就碰 one-way data/auth door，且沒有 Tommy 目前 production data | Defer |
| Autonomous GitHub PM agent | 中至高；可接 issue/PR/MCP | 外部 side effect、token/permission、誤改 issue 或發文；需 approval/audit/rollback | Defer; use as later adapter |
| Manual templates / docs only | 低；最快分享 | 沒有可操作 workflow，無法展示 AI UX、state、verification 與 engineering ability | Reject as flagship |
| PM Signal Lab — local-first evidence-to-decision workbench | 中；可先用 fixture + deterministic rules | 真人 desirability、AI quality、長期留存仍未知，但可逆、可測、可逐步接 adapter | Select |

## Riskiest assumptions

| Assumption | Bucket | Confidence | Evidence type | Test (if low) |
|---|---|---|---|---|
| AI PM/PM/founder 真的願意把 evidence pack 整理成 claim/experiment，而非直接用 ChatGPT 寫摘要 | Desirability | Low | owner intent + market signal | 5–8 個 story-based interviews；比較人工模板、generic summary、PM Signal Lab 的回訪/分享意願 |
| 使用者能理解 `Supported / Needs review / Missing evidence`，並在 5 分鐘內完成一份 decision brief | Usability | Medium-low | UX hypothesis + prototype | task-based usability test、five-second/first-click、normal/friction/mismatch behavior QA |
| 不接外部 API key 也能展示核心價值 | Feasibility | High | deterministic fixture plan | build + test + fresh browser operation；再加一個 provider adapter 做 optional path |
| claim provenance、uncertainty、approval 會增加信任，而不是讓流程變得太慢 | Usability / Desirability | Low | AI-native UX principles + README pattern | A/B 不先做；先做 5 次 moderated task，量完成率、修正率、誤信率與 export intent |
| fixture → brief → export 是可分享的 open-source artifact loop | Viability | Low | GitHub distribution pattern + market signal | pilot 後觀察 clone、first brief、export、fork/issue、repeat visit；先不以 stars 下結論 |
| TypeScript Web + Markdown export 足以承擔第一版 adoption | Feasibility / Viability | Medium | GitHub language and README pattern | build a vertical slice; test desktop/mobile; ask target users whether output fits GitHub issue/PRD workflow |

## AI / Human task allocation

- AI role: `Aid + Complement`，不是 Substitute。
- AI autonomy: v0 level 1–2：整理輸入、產生候選 claim、標記缺證據、提出 experiment draft；不能直接發 issue、改 repo、送通知或代表使用者做 product decision。
- Human ownership: 使用者確認 source、修正 claim、選 opportunity、批准 export；高風險或缺資料時顯示 `Needs review` / `Missing evidence`。
- Trust controls: source row、資料時間、claim status、uncertainty、原始文字回看、edit、approve、reset、export。
- Recovery: input parse error → 保留原文並提示修正；資料不足 → 允許建立「待驗證」brief；AI/provider unavailable → deterministic rules + manual editing；export failure → copy Markdown fallback。

## Kill criteria

我們應該停止或改題，如果完成至少 5 次目標使用者 task session 後，同時出現以下任一情況：

1. 少於 3/5 能在 5 分鐘內完成從 evidence pack 到 decision brief 的主流程；
2. 少於 3/5 能指出一個 claim 的來源與不確定性；
3. 少於 2/5 願意把輸出貼到 issue/PRD/團隊討論，且訪談找不到更強的分享/引用 job；
4. 使用者一致表示直接用既有工具就能以相同成本完成，且沒有可觀察的信任或速度差異。

若只有速度慢、資訊層級不清或 export 不合用，但使用者仍能說出價值，先縮小 scope 或改 UX；若核心 job 不存在，才 pivot。

## Recommendation

選擇 `PM Signal Lab` 作為第一個 flagship open-source product，先做一個不需要 API key 的可操作 vertical slice：fixture evidence pack → claim review → experiment brief → decision memo → Markdown export。第一版成功條件是行為完成與 evidence trust，不是漂亮 UI、stars 或模型回答長度。

會改變這個決定的證據：目標使用者訪談顯示他們更需要另一個具體 PM job（例如 GitHub issue triage、AI eval review、research synthesis），或 task sessions 證明 evidence workflow 無法降低決策摩擦。這些證據出現前，不擴大成 full PM platform，也不先接有 side effect 的 GitHub agent。
