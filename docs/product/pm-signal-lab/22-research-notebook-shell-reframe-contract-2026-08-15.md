# PM Signal Lab：Research Notebook Shell Reframe Contract — 2026-08-15

狀態：下一個可逆視覺與 copy slice；保留 domain workflow、local-first、privacy gate 與 public preview 邊界
產品：PM Signal Lab
決策類型：two-way door；降低整體 AI／SaaS shell 語法，不新增 provider、資料模型或外部副作用

## Problem Frame

- Decision：把目前仍帶有「深色側欄 + hero status + 右側狀態欄 + status badge」的 app shell，改成 PM research notebook：上方是簡短 masthead／index，中央是連續的 evidence workpaper，右側只留 margin note。
- User/job：PM 想把一段訪談、客服或產品觀察留在原文旁，逐筆判斷哪句值得採用、哪裡還缺證據，再安排一個最小驗證。
- Current friction：上一輪已移除 progress/KPI，但整體 chrome 仍讓人聯想到 AI productivity dashboard；通用 monogram、四段 app stepper、重複 status row、badge 與 panel 讓產品真相退到第二層。
- Outcome metric：owner-run five-second comprehension 能說出「這是一張 PM 訊號工作紙」，並找到第一個可操作的原文／範例入口；灰階與 box audit 能保留 reading path；normal/friction/recovery 行為不退化。
- Evidence boundary：目前只有 owner-run local／hosted browser、screenshot 與 static gate；「更像研究手稿」與「更不像 AI」仍是設計假設，沒有真人 usability proof。
- Constraints：繁體中文、CJK 可讀性、44px touch target、390／768／1440 reflow、keyboard semantic controls、source／timestamp／limitation／human decision boundary、無 provider、無 telemetry、無外部 mutation。
- Out of scope：不加入 gradient、orb、glass、bento、3D、kinetic type、聊天介面、登入、資料庫、模型 activity、社交功能或 stars manipulation。

## Product Craft Contract

### Product Truth

- Target user：PM、founder、product designer、product engineer。
- Job to be done：把一段原文留在可回看的脈絡裡，做出一個仍可被推翻的判斷，並安排下一個最小驗證。
- First read：這是一張 PM research workpaper，不是替使用者下結論的 AI console。
- Proof：fixture 的原文、來源名稱、日期、claim、limitation、human review state、experiment brief 與 export boundary。
- Success metric：第一次使用者在五秒內找到載入 sample 的入口，並知道判斷仍由自己負責；不能把這個 metric 寫成 general usability 或 adoption。

### Subject Specificity

- Domain objects：`Evidence`、原文 quote、source／timestamp、`Claim`、limitation、`ExperimentBrief`、`DecisionMemo`、`Not covered`。
- User language：`留下一段原話`、`先看來源`、`你自己決定`、`保留為假設`、`最小驗證`。
- Real constraints：資料只留目前頁面；重新整理會重設；沒有登入、provider、telemetry 或 GitHub mutation。
- Signature detail：一條 rust-red ruled margin 從 page index 連到原文與 claim，讓「來源 → 判斷」成為閱讀骨架，不靠 AI icon 或 status chip。

### Creative Divergence

1. **Research notebook / folio（選擇）**：紙張底、編輯式 masthead、平面 index strip、連續 evidence spine、少量 margin note。它直接對應 PM 的回看任務；tradeoff 是少一點即時 dashboard 感，但產品更像真實工作物件。
2. **Quiet SaaS（reject）**：保留側欄、toolbar、status panel 與 compact cards。它容易掃描，但 current screenshot 已證明這條語法仍有 AI productivity tool 聯想。
3. **Public lab / changelog（reject）**：用大篇幅研究敘事、活動紀錄與 community blocks。它會讓作品集感變強，卻把第一次使用者的 source／claim job 推遠，也會暗示不存在的 adoption。

### Design Read

- Reading this as：PM 的 editorial research workpaper for source-to-decision review。
- Design language：quiet folio、plain evidence ledger、annotated margin；不是 AI platform、analytics dashboard 或 chat shell。
- Density：desktop medium；mobile single-column medium；不靠大量空白製造 premium 感。
- Motion：low；只保留 focus、loading、success／error feedback；reduced motion 時不依賴動畫。
- Variance：low-medium；只在 page index、ruled margin、serif display heading 保留記憶點。

### No-AI-Feel Guard

- 以真實 domain object、原文、source、日期、limitation 與人為決策取代抽象 capability copy。
- 降低 app-shell cues：深色滿版 sidebar、monogram brand wall、重複 status block、pill-like badge、icon-first context rows；保留導航、狀態與信任語意，但改成 index／caption／divider／text marker。
- H1 改成具體工作機制，不用「更快、更聰明、更完整」等抽象 promise。
- 不使用 fake progress、fake thinking、model confidence、AI activity、adoption count 或裝飾性 dashboard numbers。
- Low-risk alternative：用 type hierarchy、CJK serif display、neutral paper ramp、ruled margin、flat row、proximity、alignment 與一個主要 CTA 取代更多 ornament。

## Composition Brief

- First read：`把一句話放回它的來源`。
- Second read：一段真實 fixture quote，接著是 source／claim／limitation 的連續閱讀路徑。
- Primary action：first-run 的 `載入範例資料`；loaded collect 的 `開始核對`；verify 的 human claim action。
- Content relationship：masthead → page index → workpaper → evidence spine → margin note；流程是 index，資料是 flat rows／ruled sections，不是 card soup。
- Density：desktop medium；right margin note short；手機依 `title → task → workpaper → note → sticky action` 重排。
- Alignment spine：masthead left edge → page title → evidence left rule；margin note 以同一水平 rhythm 對齊。
- Layout archetype：`research folio + index strip + annotated workpaper + margin note`。
- Responsive reflow：桌面顯示窄 index rail；768 轉成 top index band；390 保留四步文字索引但不產生水平 scroll，context 下移，primary CTA 留在 thumb zone。
- What not to use：dark SaaS shell、generic dashboard status wall、gradient／orb／glass、full-width marketing hero、decorative progress／KPI、AI sparkle／chat bubble、重陰影與大量圓角。

## UX / Trust States

- First-time：五秒內看到產品類型、原文 preview、`載入範例資料` 與 `自己新增一筆訊號`；不需要理解任何 AI 能力。
- Empty：告知可載入 sample 或新增一段訊號；右側 note 不重複主要 CTA。
- Loading：只呈現真實 sample load feedback；不顯示 fake thinking 或模型進度。
- Error：保留輸入、field-level error、說明修正動作；claim editor 空白時保留原文。
- Recovery：可取消 editor、重設 sample、回到前一步；copy／download 失敗仍保留可手動選取內容。
- Mobile：390px 無水平 overflow；body text／button label 不被壓碎；sticky action 不遮住最後一段內容。
- Accessibility：heading／region／label／aria status／focus ring 維持；index button 可鍵盤操作；current step 用 `aria-current` 與文字，不依賴顏色或 icon；contrast 與 reduced motion 需 fresh check。
- Trust：所有 count 只描述 current workpaper domain objects；local-only、沒有 provider、human review 與 limitation 必須留在可見文字；不暗示 model quality、adoption 或 stars。

## KB Application Contract

### Relevant KB

本輪直接應用以下 KB；每一項都記錄為什麼適用、設計理由與 tradeoff，並改變實作或驗證，而不是只作為靈感引用：

- `foundations/design-brain.md`：先從產品情境與 DNA 推導 surface；因此從 Pillow Fit／Altoslab 的低焦慮與克制，往 research folio 收斂。Tradeoff：少一點 tech spectacle，換取 source／claim 可回看。
- `foundations/design-rule-hierarchy.md`：Quality Rules 高於 taste；因此不為了「不像 AI」移除 current step、focus、mobile reflow、error/recovery 或 trust boundary。
- `foundations/product-craft-anti-ai-slop-operating-system.md`：用 product truth、subject specificity、creative divergence、no-AI-feel 與 evidence gate；因此改 shell 和 copy，不新增無 proof 的 AI capability。
- `foundations/aesthetic-taste-system.md`：用 product truth、card-everywhere correction、neutral ramp、type／spacing／surface 與 second polish；因此減少深色 chrome、status badge 與 card-like grouping，改用 divider／rule／proximity。
- `foundations/design-composition-layout.md`：用 first/second read、Gestalt proximity／continuity、flat rows、alignment spine、editorial archetype 與 box audit；因此把證據排成連續 workpaper，而非再做一排 panel。
- `foundations/web-design-system-playbook.md`：用 semantic tokens、type／spacing rhythm、component states、responsive patterns 與 evidence gate；因此 token 變更集中在 `styles.css`，不在每個 view 另寫一套。
- `foundations/design-typography.md`：用 CJK body line-height、長文 measure、有限 weight、serif display／sans UI 分工與 mobile type check；因此只讓 display heading 有編輯感，控制內文可讀性。
- `foundations/design-review-workflow.md`：pre-design critique → real screenshot → behavioral UX review → second polish；因此要求 local／hosted fresh capture、灰階／box／alignment audit 與 normal/friction/recovery。
- `foundations/product-messaging-copy-operating-system.md` + `foundations/anti-ai-writing-tells.md`：copy 先對應 user job／proof／boundary，再刪抽象 praise、對稱排比與 assistant voice；因此用 `原話／來源／限制／下一步` 的 literal sentence，保留可反駁的產品邊界。
- `foundations/ai-native-ux-operating-system.md`：沒有 provider 就不展示 working／tool／confidence；仍保留 provenance、human approval、uncertainty 與 recovery。
- `foundations/behavioral-ux-qa-evidence-gate.md`：用 normal／friction／mismatch、five-second comprehension、focus／mobile／trust evidence；因此不把漂亮 screenshot 當作 usability proof。

## UX/AI/Security Gate

- UX gate：first-time、empty、loading、error、recovery、mobile、keyboard、long Traditional Chinese、reduced motion 都要有可見且可恢復的結果；primary action 不被 margin note 或 sticky bar 藏住。
- AI gate：v0 沒有 provider；不新增 AI activity、fake progress、confidence、模型 praise 或黑箱輸出；來源、限制、human review 與下一步仍是主要資訊。
- Security gate：不新增 secret、token、permission、customer data、external write 或 telemetry；session data 仍只留目前頁面，重新整理會重設；GitHub handoff 仍由使用者自己檢查與送出。
- Trust gate：任何 count、status 或 success copy 只描述目前 workpaper 的可觀察狀態，不宣稱 model quality、adoption、traffic 或 stars。

## Execution Contract

### Files / surfaces

- Modify：`src/App.tsx` 的 H1／hero copy、empty first-run copy、ContextItem marker 與 brand／navigation semantics；保留 workflow actions 與 domain state。
- Modify：`src/styles.css` 的 app shell、sidebar/index、masthead、display type、status marker、context note、surface／radius／spacing、responsive states。
- Modify：`DESIGN.md` 的 Project Style Direction、Composition Brief、token／surface／layout audit 與 rejected shell cues。
- Create：本 contract、fresh visual QA captures、release audit。
- Preserve：`src/domain/*`、claim editor、privacy gate、manual GitHub handoff、private untracked growth plan。

### Task sequence

- [ ] Step 1：在 `src/App.tsx` 把 H1 改成具體的 source-to-decision mechanism，把 empty panel 改成原話入口，把 ContextItem 從 icon-first 改成 text marker；Expected：DOM 仍保有同一批可操作 controls，但首屏與 margin note 不再用通用 AI／dashboard 語法。
- [ ] Step 2：在 `src/styles.css` 將 desktop sidebar／topbar 改成 paper index／masthead，將 display heading、stepper、status marker、badge 與 context rows 改成 editorial typography／divider／rule；Expected：沒有新增 gradient／glass／shadow layer，品牌色只留在 CTA／active／signature rule。
- [ ] Step 3：維持所有 semantic state 與 responsive rules；Expected：first-time、loaded、verify、editor error、editor recovery、mobile 390／tablet 768 都可辨識 current step、primary action、trust boundary。
- [ ] Step 4：更新 `DESIGN.md` 與本輪 release evidence；Expected：文件能說清楚 selected folio direction、rejected SaaS shell、token rationale、copy guard 與未驗證範圍。
- [ ] Step 5：執行 `npm test -- --run`、`npm run lint`、`npm run build`、`git diff --check`；Expected：全部 exit 0。
- [ ] Step 6：用 fresh local browser 執行 first-run → load sample → start review → edit empty error → valid save → reset；desktop 1440、tablet 768、mobile 390 各讀回 overflow、console/page errors、focus、44px action 與 semantic labels；Expected：normal／friction／recovery 不退化。
- [ ] Step 7：截取 fresh first-run／loaded／verify desktop 與 mobile，做灰階、box、alignment、typography、surface、long Traditional Chinese 目視 review；若任一主要階層不清楚，先做 second polish 再 commit。
- [ ] Step 8：push 後讀回 CI／Pages／canonical HTTP／asset hash，再用 fresh hosted browser 重跑核心 flow；Expected：exact SHA、run IDs、asset status、browser path 與 Chrome／AT／non-owner／adoption boundary 全記錄。

## Verification Gate

- Static：4 commands exit 0；無 diff whitespace error。
- Visual：1440／768／390 first-run、loaded、verify screenshots；灰階主次、box 數量、主對齊線、CJK line-height、surface／brand-color ratio。
- Behavior：first-time、sample loading、source expand、start review、claim edit empty error、cancel、valid save、reset、decision brief／manual handoff。
- Accessibility：keyboard tab／focus visible、heading／landmark／aria-current／role alert、44px targets、reduced motion；Chrome Extension／screen reader 若工具不可用，標 `未驗證`／`blocked`。
- Hosted：final branch SHA equals origin/main；CI／Pages success；canonical HTTP 200；fresh hosted browser desktop／390 smoke。
- Evidence boundary：本輪只能證明 owner-run product behavior／visual direction；不能證明真人 usability、adoption、model quality、traffic 或 GitHub stars。

## Rollback

若 shell reframe 讓 first-read、current-step orientation、claim review、mobile action 或 trust 任一退化，revert 本輪單一 behavior commit；保留 domain engine、inline editor、privacy gate 與上一個 hosted preview，重新比較前後 screenshot／behavior trace。
