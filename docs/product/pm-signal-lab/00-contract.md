# Execution Contract — PM Signal Lab

- Mode: FULL
- Decision: 這次工作存在，是要讓 Tommy 以一個可公開驗證的開源 AI PM 工具，展示「把零散產品訊號整理成有來源、可審核、可執行的決策與實驗」的能力；第一版成功的可觀察訊號，是使用者能在本機用一組範例資料完成 `Signals → Claims → Experiment → Decision` 流程並匯出一份可讀的決策 brief。
- Door type: two-way for the local prototype UI and deterministic sample workflow; public repository bootstrap is now authorized for this preview; one-way risks remain external API keys, persistent user data, package release, deployment, and public claims.
- User / job: 主要使用者是想用 AI 提升產品判斷品質的 PM、AI PM、founder 或產品工程師；他們需要把訪談、客服、埋點與競品觀察等混雜訊號，快速整理成可追溯的證據、機會、實驗與決策，而不是得到一篇無法驗證的 AI 長文。
- Success signal: (1) 研究 corpus 去重後至少有 1,000 個公開 GitHub reference repos，且每筆有來源 URL、分類、品質/適配評分與資料時間；(2) v0 可從範例 evidence pack 產生 claims、顯示來源與不確定性、建立 experiment brief、輸出 Markdown；(3) build/typecheck/test 通過，並完成 desktop/mobile 與 normal/friction/mismatch 行為驗證。
- Constraints: 以目前工作區為 repo truth；私人帳號成長規劃不納入 public repository；研究優先使用公開 GitHub metadata 與官方來源；產品預設 local-first、provider-neutral、無需 secrets 才能展示；繁體中文介面，保留英文技術識別；本階段允許建立 public preview repository，但不 deploy、發文或啟用外部付費服務。
- Out of scope: 保證爆紅、保證 10,000 GitHub stars、購買或操縱 stars、把 reference repo 的人氣當成使用者採用證據；真實 PMF、付費意願、留存、流量與 GitHub production traffic 的結論。
- Out of scope: v0 不做多人協作、帳號/權限、雲端資料庫、背景 agent 自動改寫 repo、直接發佈 PR/issue、連接真實客服/分析平台，亦不在沒有使用者明確授權時處理私有資料。
- Key unknowns: Tommy 最想服務的 PM 細分族群尚未由真人研究確認；外部 LLM provider、資料持久化與公開 repo 名稱尚未決定；1,000+ reference corpus 可以揭示可遷移的經營模式，但不能證明哪個題目一定會爆紅；第一版的真實使用者完成率與收藏/分享動機仍未驗證。
- Assumptions made without asking: 先以「證據到決策」作為 AI PM 旗艦工具的窄切口；先做可公開 demo、可重跑的 deterministic fixture，而不是先做 generic chatbot；先支援 Markdown export，因為它能快速產生可分享的 artifact；視覺採 editorial evidence workbench + dark technical SaaS 的混合方向，而非大面積 gradient/glass/bento。
- Compressed/skipped phases and accepted risk: none. Discovery 會以公開 reference corpus、官方趨勢資料與可重跑的產品假設明確標示 confidence，但這些不能取代真人訪談；第一次交付只做本機 v0，接受尚未有 production analytics、真實使用者研究、公開 GitHub 回饋與 deploy evidence 的風險。

## Research evidence contract

- Tier A — corpus scan: 至少 1,000 個去重的公開 GitHub repos，保存 repo identity、stars/forks、topics、language、created/pushed time、license、community/README signals、研究 query、資料時間與限制。
- Tier B — deep sample: 由品質與產品適配分數選出約 100 個，讀 README、release/community/contribution pattern，抽取可遷移的 onboarding、documentation、distribution、maintenance 與 positioning pattern。
- Tier C — close comparators: 約 20 個與 AI PM / developer tool / evidence workflow 最接近的 repo，做更細的產品、UX、社群與經營拆解。
- Evidence boundary: Tier A 是 metadata-level reference research；不能寫成「深度人工研究每一個 repo」，也不能把 stars 寫成 adoption、revenue、PMF 或品質的直接證明。

## Initial release gate

只有同時具備以下證據，才能把本階段稱為「第一個專案 v0 完成」：

1. 研究報告有 corpus count、去重規則、評分公式、query/source 清單、資料時間、top sample 與 limitations。
2. Repo 有 PRD、UX state model、DESIGN.md、tech/task plan 與可由下一個 session 接手的 commands。
3. 產品可以在無 API key 的情況下用 fixture 完成主流程；AI provider 是可插拔增量，不是 demo 的唯一依賴。
4. `npm run build`、`npm run lint`、`npm test`（若有）與手動/瀏覽器行為 evidence 都留下結果；任何未做項目標示 `未驗證`。
5. Release decision 只能是 `ship`、`pilot` 或 `hold`；本次已取得 GitHub public preview push 授權，但 hosted release、deploy、社群發文與外部 side effect 仍需另外驗證與授權。
