# PRD — PM Signal Lab

## Context

研究 1,042 個公開 GitHub reference repos 後，最值得做的不是泛用 AI PRD writer，而是一個把 evidence、claim、uncertainty、experiment 與 decision 串起來的 local-first PM workbench。這份 PRD 承接 [`01-discovery.md`](./01-discovery.md)，第一版只承諾一個可重跑、可驗證、無 API key 也能完成的 vertical slice。

## Users & jobs

| User | Job / situation | Priority |
|---|---|---|
| AI PM / PM | 手上有訪談、客服、埋點與競品片段，不想直接相信 AI 摘要；需要整理成可引用的 decision brief | P0 |
| Founder / product engineer | 想快速把產品觀察轉成最小 experiment，而不是寫一份沒人執行的 PRD | P0 |
| AI tool builder / open-source contributor | 想檢視 AI workflow 的來源、限制與品質，並把 output 匯出到 GitHub issue/PRD | P1 |

### Exclusion segment for v0

需要完整公司級 data warehouse、多人權限、私有 customer data、長期 cohort analytics 或 autonomous issue mutation 的企業團隊，不是 v0 的服務對象。

## Product promise

> 不是幫你寫一篇更長的 AI 報告，而是讓每個 claim 都有來源、每個不確定都看得見、每個下一步都能被驗證。

## Scope

### Must-have

1. **Fixture evidence pack**：使用者進入後能載入一組完整的 AI PM onboarding sample，看到 evidence rows、source、type、時間與內容。
2. **Evidence collection**：使用者能貼上一段簡單文字 evidence 並儲存到目前工作區；空白/過長/無標題輸入要有可理解的錯誤與修復提示。
3. **Claim review**：系統依 fixture/evidence 產生候選 claims，顯示 `Supported`、`Needs review`、`Missing evidence`，每個 claim 至少能回到一個 source；使用者能 approve、flag 或編輯。
4. **Experiment brief**：使用者從一個 opportunity 產生最小 experiment brief，包含 hypothesis、primary metric、guardrail、smallest test、decision rule 與 owner；缺資料時顯示 `Needs validation`。
5. **Decision memo + export**：使用者能檢視 decision memo，看到 decision、evidence summary、known limits、next action；能複製/下載 Markdown，不需要外部服務。
6. **Provider-neutral, honest synthesis**：保留 provider-neutral synthesis interface 與 deterministic fixture workflow；畫面明確顯示資料邊界與來源，不把固定規則輸出冒充真實模型能力。
7. **Stateful, responsive workbench**：完成 `收集 → 核對 → 安排 → 帶走` 主流程，涵蓋 first-time、empty、loading/synthesizing、error、recovery、success、mobile、keyboard/focus 與 trust states。

### Nice-to-have（promotion trigger）

- OpenAI / Anthropic / local model adapter：當至少 5 位目標使用者完成 fixture flow，且 ≥3 位主動要求帶入自己的 evidence pack 時再做。
- JSON import/export schema：當至少 3 個外部使用者需要把 output 接到自己的工具時再做。
- Read-only GitHub/MCP adapter：當 provider adapter 與 source/provenance contract 穩定，且使用者明確需要 GitHub issue/PR context 時再做。
- Real instrumentation/telemetry：當有公開 pilot 流量且需要比較 activation/retention 時再做；v0 先以 local event log / manual task evidence 為主。
- Shareable hosted demo：v0 已以 GitHub Pages public preview 形式提供；它不等於 production readiness，後續仍需真實 session evidence。

### Should-not-build

- 不做 autonomous agent 直接發 issue、改 repo、送通知、deploy 或代表 PM 下 decision；這些都是外部 side effect，需要另立 approval/permission/rollback contract。
- 不做雲端帳號、多人協作、資料庫、組織權限與 billing；它們會把 v0 推進 one-way data/auth door。
- 不做 full product analytics、warehouse connector、cohort engine；目前沒有 production data evidence，會先堆 integration 而非驗證核心 job。
- 不做 generic chat interface、prompt marketplace 或「輸入任何東西都能產 PRD」；這些會削弱產品 specificity 與 trust boundary。
- 不宣稱 AI 已經驗證需求、已經取代 PM、已經提高 conversion 或會帶來 10K GitHub stars；所有未有真實 evidence 的地方必須顯示 hypothesis/未驗證。

## Stories & acceptance criteria

### Story 1 — Load a useful first evidence pack

As an AI PM, when I open the project for the first time, I want a meaningful sample pack instead of an empty chat box, so that I can understand the product in under one minute.

- **AC-1** Given a fresh session, when the app loads, then it shows the four-step path `收集`, `核對`, `安排`, `帶走`, the empty workspace, and a literal description of what the sample contains.
- **AC-2** Given the sample pack is available, when I choose `載入範例資料`, then at least three evidence rows appear with source, evidence type, timestamp, and readable content.
- **AC-3** Given the sample pack is not available or the fixture parser fails, when the load action runs, then the app keeps the workspace usable, shows a recovery message, and provides `重設這組資料` without a blank screen.

### Story 2 — Add and inspect evidence

As a PM, when I have one more observation, I want to add it to the current evidence pack, so that the decision is not limited to prewritten demo data.

- **AC-4** Given the evidence form is open, when I enter a title, source, type, and content and submit, then the new evidence row appears with a visible `Just added` state and is included in the current count.
- **AC-5** Given the title or content is blank, when I submit, then the form remains open, identifies the invalid field in text, and does not create a partial evidence row.
- **AC-6** Given the content is longer than the v0 limit, when I submit, then the app explains the limit and preserves the entered text so I can edit it instead of losing work.

### Story 3 — Review claims with provenance

As a PM, when the system proposes claims, I want to see the supporting evidence and uncertainty, so that I can accept, correct, or reject the claim before it drives a decision.

- **AC-7** Given a loaded sample pack, when I open `Verify`, then each candidate claim has a status, supporting source reference, evidence type, and an uncertainty/limitation note.
- **AC-8** Given a claim has no supporting evidence, when it is rendered, then it is marked `Missing evidence` and cannot be represented as a supported conclusion.
- **AC-9** Given I edit or flag a claim, when I return to the list, then the new status and edited text persist for the current session and the original source remains visible.

### Story 4 — Create an experiment brief

As a PM, when I choose a promising opportunity, I want a small experiment brief with metrics and stop rules, so that the next step is executable rather than inspirational.

- **AC-10** Given at least one reviewed opportunity, when I choose `Draft experiment`, then the brief includes hypothesis, primary metric, guardrail, smallest test, decision rule, and owner placeholder.
- **AC-11** Given the opportunity has `Missing evidence`, when I draft the experiment, then the brief clearly says `Needs validation` and lists the missing evidence instead of implying readiness.
- **AC-12** Given the experiment draft action encounters an internal error, when the action fails, then the app keeps the reviewed claims, shows a retry path, and allows manual brief editing.

### Story 5 — Export a decision memo

As a PM, when I finish reviewing a decision, I want a portable Markdown memo, so that I can move the artifact into a GitHub issue, PRD, or team discussion.

- **AC-13** Given a reviewed claim set and experiment brief, when I choose `Export Markdown`, then the output contains decision, evidence references, uncertainty, experiment, guardrails, next action, and an explicit `not covered` section.
- **AC-14** Given the browser blocks a download, when export runs, then the app offers copy-to-clipboard or an accessible text area fallback and reports the result.
- **AC-15** Given no claim or experiment is ready, when I choose export, then the app explains what is missing and does not generate a falsely complete memo.

### Story 6 — Make AI assistance honest and reversible

As a PM, when AI-like synthesis is shown, I want to know whether it is a demo fallback, what evidence it used, and where I remain the decision owner, so that I do not overtrust the output.

- **AC-16** Given the v0 deterministic workflow is used, when a decision brief is shown, then the UI keeps the `資料邊界` visible, preserves source/limitation context, and does not claim external model quality.
- **AC-17** Given a future provider adapter is unavailable, when synthesis is requested, then the app falls back to deterministic/manual mode and keeps the evidence pack intact.
- **AC-18** Given any generated recommendation, when the user reaches the decision boundary, then an explicit human action (`Approve`, `Edit`, or `Keep as hypothesis`) is required before the decision memo is considered ready.

### Story 7 — Work on desktop and mobile with recovery states

As a PM switching between laptop and phone, I want the workflow to stay readable and recoverable, so that visual polish does not come at the cost of task completion.

- **AC-19** Given a viewport at 390px wide, when I inspect the main flow, then navigation, evidence rows, controls, and export action reflow without horizontal scrolling or overlapping text.
- **AC-20** Given keyboard navigation, when I tab through the flow, then interactive controls have visible focus, semantic labels, and a logical order.
- **AC-21** Given a loading, empty, error, or success state, when it is shown, then the state explains what happened and offers a next action; a spinner alone is not the only feedback.

## AI allocation

| Capability | SCAN zone | Autonomy | Human responsibility | Failure UX |
|---|---|---:|---|---|
| Evidence normalization | Aid | 1 | Confirm source/title/type and edit malformed rows | Keep raw text, show parse issue, allow manual correction |
| Candidate claim extraction | Complement | 1–2 | Approve/flag/edit claim and source mapping | Mark missing evidence, show limitation, retry/manual mode |
| Experiment brief draft | Aid + Complement | 2 | Choose opportunity, metric, guardrail, stop rule | `Needs validation`; preserve reviewed claims and allow manual edit |
| Decision memo export | Aid | 1 | Decide whether memo is ready to share | Block incomplete export or show explicit incomplete sections |
| GitHub/MCP/issue mutation | Non-negotiable | 0 in v0 | Tommy/user owns every external action | Not implemented; future flow requires preview + approval + audit + rollback |

### AI quality contract for v0

- The deterministic engine is a product fallback and UX oracle, not a model benchmark.
- Offline fixtures must test: supported claim, conflicting evidence, missing source, empty input, long input, and export with incomplete state.
- The v0 UI must preserve source identity, evidence type, timestamp, limitation, and user correction path.
- No raw chain-of-thought is displayed; only concise activity/status summaries and evidence links are shown.

## Metrics

### Primary metric

`core_flow_completed`: a session loads or adds evidence, reviews at least one claim, creates an experiment brief, and exports or copies a decision memo.

Initial validation target: **at least 4 of 5 task sessions complete the flow without facilitator rescue**. This is a v0 usability target, not a production benchmark.

### Guardrails

- `source_visibility_rate`: every supported claim rendered in the memo has at least one visible source reference; target 100% in fixture tests.
- `uncertainty_preservation_rate`: every `Needs review`/`Missing evidence` item remains marked in the brief/export; target 100% in fixture tests.
- `recovery_success_rate`: invalid input, failed synthesis, and blocked download expose a successful recovery action; target 100% in behavior matrix.
- `mobile_overflow_count`: 0 horizontal overflow/overlap findings at 390px, 768px, and desktop target widths.
- `unsupported_ai_claims`: 0 copy statements implying real model accuracy, user adoption, or guaranteed results without evidence.

### Instrumentation events

The v0 keeps events local and non-identifying; no external analytics SDK is required.

| Event | Properties | Purpose |
|---|---|---|
| `sample_pack_loaded` | `pack_id`, `source` | first value path |
| `evidence_added` | `evidence_type`, `source_kind`, `content_length_bucket` | collection friction |
| `claim_reviewed` | `claim_status`, `source_count`, `edited` | trust/correction behavior |
| `experiment_drafted` | `needs_validation`, `metric_present`, `guardrail_present` | decision readiness |
| `decision_exported` | `format`, `copy_or_download`, `complete` | shareable artifact path |
| `recovery_used` | `state`, `action` | failure/recovery learning |

No raw evidence content, API key, private URL, or user identity is sent anywhere in v0.

## Risks & dependencies

- **Desirability risk:** PMs may prefer existing notes/LLM workflows; must validate with interviews and task sessions.
- **Trust risk:** a polished deterministic workflow may be mistaken for AI intelligence; label the data boundary and evidence limits in UI and README.
- **Scope risk:** GitHub/MCP integration could make the project trend-relevant but would add permission and side-effect complexity; defer until core workflow works.
- **Data risk:** evidence may contain personal or confidential information; v0 is local-first and sample-based, with no external transmission.
- **Design risk:** dark technical SaaS, bento, gradient, glass, or animation could become decoration; layout must be driven by evidence/claim/decision relationships.
- **Repo health risk:** generated UI can become a monolith; keep domain types, deterministic engine, view components, and export function separated.
- **Release risk:** no public ship claim until build/test, actual operation, responsive review, accessibility smoke, and README/community files are complete.

## Open questions

| Question | Owner | Blocking? | Default if unanswered |
|---|---|---|---|
| Public repo name: `pm-signal-lab` or `signal-to-spec`? | Tommy | Non-blocking for local build | Use `pm-signal-lab` in code/docs; revisit before GitHub creation |
| First target segment: AI PM, founder, or product engineer? | Tommy + 5 interviewees | Non-blocking for fixture v0; blocking for public positioning | Write copy for AI PM first, mark segment hypothesis |
| Which LLM provider should be first adapter? | Tommy | Non-blocking | Keep provider-neutral interface; no provider in v0 |
| Should data persist across browser refresh? | Tommy | Non-blocking | Session-local state only; no database |
| Should the first public demo deploy? | Tommy | Resolved for v0 preview | GitHub Pages public preview exists; production readiness and adoption remain unverified |

The defaults above keep the public preview reversible until real-user and release evidence changes the decision.
