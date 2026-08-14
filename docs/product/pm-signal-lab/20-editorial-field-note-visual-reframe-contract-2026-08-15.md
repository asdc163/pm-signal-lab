# PM Signal Lab：Editorial Field Note Visual Reframe Contract — 2026-08-15

狀態：下一個可逆視覺切片；不改 domain schema、外部邊界或產品 workflow
產品：PM Signal Lab public preview
決策類型：two-way door；把 dashboard 語法降級成 PM editorial workpaper，不新增潮流裝飾

## Problem Frame

- Decision：把目前的 `sidebar + workbench + decision rail` 從「狀態很多的 AI 工作台」再收斂成「有索引、來源脊柱與邊欄註記的 PM field note」。
- User/job：PM 想把一段原文放上桌，回看它對應的判斷與限制，再決定下一個最小驗證；他需要的是閱讀順序與證據，不是儀表板感。
- Current friction：首屏的 `01 / 04`、progress bar、右欄三格大數字與重複的進度語法，容易讓人把產品理解成 AI workflow／analytics dashboard；它們不是目前產品的核心 proof。
- Outcome metric：owner-run five-second comprehension 能否指出「來源 → 判斷 → 最小驗證」；visual review 是否能在灰階下看見主次；normal／friction／recovery behavior 不因改版退化。
- Evidence boundary：目前只有 owner-run screenshot 與 browser evidence；「比較不像 AI」仍是設計假設，不能寫成真人研究結果。
- Constraints：維持繁體中文、evidence spine、local-first、no provider、human decision boundary、390px no-overflow、keyboard focus 與既有 domain tests。
- Out of scope：不加入 gradient、orb、glass、3D、bento、kinetic type、動畫敘事、AI chat、provider、telemetry、登入或新的資料模型。

## Product Craft Contract

### Product Truth

- Target user：PM、founder、product designer、product engineer。
- Job to be done：從真實訊號回到一個可被討論、可被驗證的下一步。
- First read：這是一張 PM 工作紙，不是一個替你下結論的 AI dashboard。
- Proof：真實 fixture 的來源、原文、時間、claim mapping、limitation、human review state 與 decision memo。
- Success metric：使用者能在不看說明文件的情況下找到下一步，並知道 claim 仍需要自己確認。

### Subject Specificity

- Domain objects：`Evidence`、`Claim`、`ExperimentBrief`、`DecisionMemo`、`Not covered`。
- User language：`看來源`、`需要你確認`、`保留為假設`、`最小驗證`、`資料邊界`。
- Real constraints：資料只留目前頁面；重新整理會重設；沒有登入、provider、telemetry 或自動外部修改。
- Signature detail：evidence spine；來源、claim 與限制沿一條可回看的垂直線排列。

### Creative Divergence

1. **Editorial field note（選擇）**：用 page index、ruled margin、source spine 與 margin note 取代進度／KPI 語法；直接強化 PM 的閱讀任務。Tradeoff：少了 dashboard 的即時感，但更貼近產品真相。
2. **Monochrome decision ledger（reject）**：全頁黑白 table／ledger，掃描性高但會壓低來源與人為判斷的層次，也不適合目前的 warm-paper signature。
3. **AI activity console（reject）**：加入 activity feed、tool chips、progress state；這會增加 AI 感，且 v0 沒有 provider 或真實工具活動可展示。

### Design Read

- Reading this as：editorial product-research workpaper for PM decision-making。
- Design language：quiet editorial tool + evidence ledger，不是 AI console。
- Density：desktop medium-high；mobile single-column medium。
- Motion：low；只保留 focus／state feedback，尊重 reduced motion。
- Variance：low-medium；只在 page index、ruled margin 與 margin note 保留記憶點。

### No-AI-Feel Guard

- 保留真實 domain object、source、timestamp、limitation、human approval 與 recovery。
- 移除或降級沒有產品 proof 的 progress bar、KPI-like count strip 與重複狀態語法。
- 不使用 generic hero、card soup、purple/blue gradient、orb、glass、假 metrics、fake thinking 或 AI praise。
- Copy 改成 literal workpaper language；每個數字必須服務回看任務，不作成「成效」暗示。
- Low-risk alternative：用 divider、spacing、type scale、ruled margin、source spine 與 one next action 取代裝飾和 dashboard chrome。

## Composition Brief

- First read：`先看來源，再決定下一步` 與一個真實的 PM workpaper task。
- Second read：source／claim／limitation 的 evidence spine。
- Primary action：目前 workflow 的一個下一步；first-run 是 `載入範例資料`。
- Content relationship：流程用 stepper；證據用 flat list／spine；補充內容用 margin note；不把每個區塊做成 card。
- Density：主 workbench medium-high；右欄是短註記，不是 KPI dashboard。
- Alignment spine：sidebar index → page title → source/claim spine；右欄以同一條 vertical rule 對齊。
- Layout archetype：editorial field note + index rail + margin note。
- Responsive reflow：mobile 先讀 title／task，再讀 workpaper，margin note 下移；不依賴 hover；sticky action 保持唯一主要 CTA。
- What not to use：full-screen gradient、orb/blob、glass、bento、KPI strip、progress bar as decoration、fake activity log、heavy motion。

## UX / Trust States

- First-time：看見「這是一張 PM 工作紙」與一個真實 sample quote；不需要理解 AI 能力。
- Empty：知道要載入或新增一筆訊號，且看見資料邊界。
- Loading：只顯示真實的範例資料載入，不做 fake thinking。
- Error：保留輸入、說明原因、提供可恢復動作。
- Recovery：可重設、取消、重新開啟、回到上一個 workflow step。
- Mobile：390px 不水平溢出；source／claim／actions 仍沿同一閱讀順序。
- Accessibility：heading／region／label／focus／aria status 維持；移除 progressbar 後不可丟失目前 step 的文字語意。
- Trust：狀態與數字只描述目前頁面工作，不暗示 model quality、adoption 或 productivity gain。

## KB Application Contract

Relevant KB：以下檔案直接改變本輪的 composition、surface、copy、state 與 evidence gate；它們不授權我把「不像 AI」寫成真人研究結論。設計理由是用產品真相與資訊關係，取代 AI dashboard 的平均化視覺。

- `foundations/design-brain.md`：先從產品情境、產品類型與 Design DNA 推導表面；因此選 `quiet editorial tool + evidence ledger`，而不是再加 AI platform decoration。Tradeoff：少一點即時儀表板感，換取更清楚的 PM 工作物件。
- `foundations/design-rule-hierarchy.md`：Quality Rules 高於 taste；因此移除 progress／count 時保留 current-step、next-action、responsive、focus、trust 的文字語意。Tradeoff：視覺更安靜，但不能犧牲 orientation。
- `foundations/product-craft-anti-ai-slop-operating-system.md`：用 subject specificity、product truth、card-soup correction 與 no-AI-feel gate；因此只刪 dashboard chrome，不重做 domain model 或假造新 proof。
- `foundations/aesthetic-taste-system.md`：AI cheapness 的核心是 card everywhere、fake sophistication、same palette；因此用 divider、spacing、type rhythm、evidence spine 與一個 signature detail 代替更多 surface。
- `foundations/design-composition-layout.md`：用 reading path、Gestalt proximity、continuity 與 editorial layout archetype；因此右欄變成 margin note，source／claim 保持 flat list。
- `foundations/design-review-workflow.md`：先 critique 現狀，再 screenshot／behavioral QA／second polish；因此本輪先留下 contract，並要求灰階、box、alignment、responsive 與 behavior evidence。
- `foundations/product-messaging-copy-operating-system.md`：headline、section copy、microcopy 各自服務不同任務；因此只改會造成 AI dashboard 誤讀的 literal copy，不用抽象「智慧／效率」形容詞填空。
- `foundations/ai-native-ux-operating-system.md`：AI 狀態契約要求 context、control、uncertainty、recovery；本 v0 沒 provider，因此不展示不存在的 activity/progress，改顯示真實 source、限制與 human decision boundary。

## Execution Contract

### Files / surfaces

- Modify：`src/App.tsx` 的 hero status、topbar trust label、DecisionContext count strip／margin note；`src/styles.css` 的 hero status、context ledger、editorial surface spacing。
- Modify：`DESIGN.md` 的 Project Style Direction、Composition Brief、rejected elements 與 component states。
- Create：本 contract、visual QA screenshots、release audit。
- Preserve：`src/domain/*`、evidence spine、inline claim editor、privacy gate、manual GitHub handoff、private untracked growth plan。

### Task sequence

- [x] Step 1：在 `src/App.tsx` 移除 hero 的 decorative `progress-track`，改用目前 workflow step 的文字狀態；Expected：first-run／loaded 都能知道現在在哪一步，但沒有 progressbar／KPI 視覺。
- [x] Step 2：把 `DecisionContext` 的三格大數字改成一行 domain metadata；Expected：右欄仍能知道目前訊號／已處理／有來源支持，但不再像 dashboard metric strip。
- [x] Step 3：把 topbar／context boundary copy 收斂成 literal `只在本頁處理`／`留在本頁`；Expected：不新增 AI marketing language，trust meaning 不變。
- [x] Step 4：在 `src/styles.css` 做 editorial second polish；Expected：flat divider、ruled margin、surface hierarchy、中文長字、390／768／1440 reflow 不退化，無新 gradient／glass／orb／shadow layer。
- [x] Step 5：更新 `DESIGN.md` 與 release docs；Expected：文件明確說明 selected direction、rejected dashboard/AI console、evidence boundary。
- [x] Step 6：執行 static gates 與 fresh browser／screenshot review；Expected：test、lint、build、diff check exit 0；desktop／mobile normal、friction、recovery、keyboard console/page errors 0。
- [ ] Step 7：push 後讀回 CI／Pages／canonical HTTP／hosted smoke；Expected：exact SHA、asset hash、browser path 與 unverified Chrome／AT／non-owner boundary 全部記錄。

## Verification Gate

- Static：`npm test -- --run`、`npm run lint`、`npm run build`、`git diff --check`。
- Visual：fresh first-run／loaded／verify screenshot；灰階、box、alignment、spacing、type、surface、mobile reflow review。
- Behavior：first-run → load sample → source → review → editor；empty error；cancel；valid save；refresh；decision brief；privacy gate；manual GitHub boundary。
- Accessibility：keyboard focus、heading／region／label、aria status、reduced motion、44px targets；Chrome Extension／screen reader route separately labelled `未驗證` if unavailable。
- Hosted：CI／Pages success、canonical HTTP 200、bundle readback、fresh hosted desktop／390 smoke。
- Evidence boundary：visual polish 不能證明真人 usability、adoption、model quality 或 GitHub stars。

## UX/AI/Security Gate

- UX gate：first-time、empty、loading、error、recovery、mobile、keyboard、long Traditional Chinese 與 reduced motion 都要有可見且可恢復的結果；移除 progressbar 後仍要保留文字化 current step。
- AI gate：v0 沒有 provider；不新增 AI activity、fake progress、模型 confidence、AI rewrite 或「智慧」能力暗示。來源、限制與 human decision boundary 仍優先。
- Security gate：不新增 permission、secret、token、API key、customer data、外部 write 或 telemetry；頁面資料仍只留目前頁面，重新整理會重設。
- Trust gate：任何 count 只描述目前工作紙的 domain object，不代表 adoption、quality、productivity 或 model performance。

## Product Messaging Contract

- Message Job：讓第一次使用者理解這是一張 PM workpaper，並開始回看一筆來源。
- Source Truth：目前產品有 fixture evidence、claim、limitation、experiment brief、local-only boundary；沒有 provider／adoption proof。
- Positioning：evidence-to-decision workpaper；alternative 是文件、試算表、聊天摘要混用；差異機制是 source／claim／limitation 沿同一條 spine 可回看。
- Copy Architecture：literal product category → current job → source proof → one next action；不重複 progress 或 AI ability。
- No-AI Copy Guard：刪抽象 praise、假成效、模型語氣、過度整齊的 feature list；保留 user language、限制與可恢復 action。
- UX Microcopy States：first-time／empty／loading／error／recovery／trust 都要能回答「現在發生什麼、我下一步做什麼」。
- Channel Learning：以 five-second comprehension、owner-run behavior trace、後續非 owner feedback 驗證「不像 AI dashboard」這個假設；尚無 general usability evidence。

## Rollback

若 fresh behavior 或 mobile evidence 顯示 orientation、completion、trust 任一退化，先 revert 本輪單一 commit；保留 inline editor、domain model、privacy gate 與既有 public preview，重新比較前後 screenshot／behavior trace，再決定是否保留 editorial direction。
