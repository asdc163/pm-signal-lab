# PM Signal Lab：Visual Product Reframe Contract — 2026-08-15

狀態：下一輪可逆視覺／產品切片，尚未代表真人 usability 已證明  
產品：PM Signal Lab public preview  
決策類型：two-way door，先以小幅介面重排降低第一眼理解與信任成本

## Problem Frame

- Decision：讓第一次打開 PM Signal Lab 的人，在五秒內知道「這是一張把產品訊號整理成下一個驗證的工作紙」，而不是一個泛用 AI demo 或報表 dashboard。
- User/job：PM、founder 或 product engineer 手上有訪談、客服、產品觀察與競品片段，想保留原文與限制，最後只決定一個值得再查的下一步。
- Current workaround：把片段丟進聊天工具或筆記後再人工追來源；目前沒有真人研究證明哪一個 workaround 佔比最高，這仍是產品假設。
- Outcome metric：first-run comprehension、四步 sample workflow completion、mobile/keyboard task completion，以及非 owner 的可 triage session feedback。GitHub stars 是長期結果，不是本輪視覺驗證指標。
- Evidence boundary：目前有 deterministic fixture、local unit/build checks、Playwright fallback 與 hosted HTTP；尚未有五位真人 PM 的 session、Chrome Extension sign-off、真機／螢幕閱讀器證據或 adoption。
- Constraints：資料留在瀏覽器 session；沒有登入、外部 provider、telemetry、GitHub API mutation 或自動送出 issue。
- Out of scope：不加入模型、聊天框、dashboard metrics、收藏／分享成效承諾、登入或 GitHub star automation。

## PM Filter

- Who：正在建立 AI product judgment 的 PM／founder／product engineer；先以作品集讀者與可自助試用者作為外部觀察對象。
- Job/Pain：不想因為摘要看起來完整就直接相信；需要把一筆觀察變成「來源可回看、限制可見、下一步可執行」的工作物。
- Must：五秒內看懂產品 job；首屏只有一個開始動作；來源、限制、人為決策與 local-only 邊界保持可見；desktop／tablet／mobile 讀路一致。
- Nice：更完整的 session feedback、更多輸入方式、provider adapter、portable schema。
- Should-not-build：AI magic box、假即時狀態、外部自動 mutation、未有真人證據前的 telemetry／登入／大型整合。
- Success metric：先用行為證據與真實回報學習，不把本機 event 數量或 repo star 數誤當成產品價值證明。

## KB Application Contract

Relevant KB：以下來源直接改變本輪的產品判斷、畫面結構與驗證門檻；設計理由是先讓產品真相與可回看的行為成立，再用視覺細節補記憶點。

- `foundations/design-brain.md`：先從產品情境、產品真相、DNA、composition 到 responsive／review；因此本輪先定閱讀路徑，再改 CSS，而不是先堆裝飾。
- `foundations/design-rule-hierarchy.md`：Quality Rules 高於 taste；所以焦點、狀態、44px touch target、reflow、信任邊界不能為了 editorial 感被犧牲。
- `foundations/product-craft-anti-ai-slop-operating-system.md`：用 domain objects、真實限制、human decision boundary 與 recovery 取代 AI 裝飾；因此視覺 signature 只保留 evidence spine。
- `foundations/aesthetic-taste-system.md`：修 product truth、階層、字體、間距、surface，再談 signature detail；因此減少無必要的 panel 感，讓 rows／dividers／definition list 承擔結構。
- `foundations/design-composition-layout.md`：先定 first read、second read、primary action、alignment spine 與 responsive reflow；因此首屏改成「產品 job → 工作紙路徑 → 一個開始動作」。
- `foundations/product-messaging-copy-operating-system.md` + `foundations/anti-ai-writing-tells.md`：產品文字要說 literal job、proof、限制與下一步；因此保留中文 first、刪抽象 AI 形容與不必要的 English system labels。
- `foundations/ai-native-ux-operating-system.md`：即使 v0 不接模型，仍要讓角色、資料來源、控制、限制與 recovery 可理解；因此不製造 thinking、provider 或 confidence 假象。
- `foundations/design-review-workflow.md` + product QA workflow：改完必須看真畫面並走 normal／friction／recovery、mobile、keyboard、trust；build 或自我評論不能代替 browser evidence。
- `foundations/product-discovery-decision-gate.md` + `foundations/product-learning-loop.md`：沒有真人研究只能寫假設，最小 release 要有 evidence boundary、decision rule 與 writeback；因此本輪不因想像的 star growth 加功能。

## Product Truth

PM Signal Lab 是一張 local-first 的 PM decision worksheet：

`來源 → 判斷 → 最小驗證 → 可帶走的 brief`

它不是模型品質 benchmark，也不是替 PM 下結論的聊天機器人。產品獨有的物件是 `Evidence`、`Claim`、`Experiment Brief`、`Decision Memo`、`Not Covered` 與 `Session Feedback Field Note`。第一眼要看到的是這些物件如何形成一條可回看的工作路徑。

## Opportunity Tree and Alternatives

```text
Desired outcome: visitor can make one defensible next-check decision
  ├─ Opportunity A: source and limitation are easy to lose in summaries
  │    ├─ A1: evidence spine + source rows + claim mapping
  │    └─ A2: journal-style narrative with inline citations
  └─ Opportunity B: a public preview can feel like a demo before it feels like work
       ├─ B1: dashboard-style metrics and activity view
       └─ B2: literal field worksheet with one next action
```

### Options considered

1. **Keep the current evidence desk**：保留現有 shell、右側 context rail、source rows 與 stepper。優點是已經有可回歸行為；缺點是如果首屏只剩「工作頁／進度／範例」語彙，仍可能被讀成漂亮 demo。可回滾、工程風險最低。
2. **Decision notebook / field journal**：改成更大的 editorial 文字與單欄閱讀。優點是人味與作品集記憶點強；缺點是四步流程、狀態與掃描速度會變弱，不適合需要回看多筆來源的 PM 工作。
3. **Decision ledger / field worksheet（選擇）**：保留 evidence desk 的結構，但把第一眼讀路收斂成「工作紙 job → source/claim/test path → 一個 CTA」，讓 rows、dividers、definition list 成為主體。這個方向最能同時展示 PM thinking、trust boundary 與可操作產品。

### Rejected direction

不做 dashboard metrics、AI chat entry、gradient／orb／glass、假活動流、star counter 或自動 GitHub 操作。它們可能提高截圖刺激度，卻沒有降低目前最大的未知：真人是否能理解並完成這條工作路徑。

## Project Style Direction

- Reading this as：一張給 PM 使用的 editorial operations worksheet，服務「從一個觀察選出下一個可驗證行動」。
- Selected DNA：Pillow Fit 的低焦慮專業工具感 + Altoslab 的克制排版；deep green rail 是導航記憶點，warm paper 是工作區，不搬用其他專案的表面或文案。
- Density：desktop medium-high；mobile medium，保留來源內容的連續閱讀。
- Variance：low-medium；只在 evidence spine、目前步驟與 clay CTA 上有記憶點。
- Motion：low；只服務 hover、focus、展開與狀態變化，尊重 reduced motion。
- Signature detail：source → claim 的垂直 evidence spine；這是產品關係，不是裝飾線。
- Surface rule：background、workbench、memo、feedback form 各自有清楚層級；repeated evidence 用 row／divider，不用每筆包成同尺寸卡片。
- Color rule：clay accent 只做 primary action／current step／少量提示；trust color 表示來源與控制；狀態不只靠顏色。

## Composition Brief

- First read：這是一張把產品訊號整理成下一個驗證的工作紙。
- Second read：現在在哪一步、桌上有什麼資料、資料是否只留在本機。
- Primary action：first-run 的 `載入範例資料`；loaded flow 依步驟只保留一個主要前進動作。
- Content relationship：flow + evidence + decision；source rows、claim rows、definition list 優先於 feature cards。
- Alignment spine：左側 workflow rail → 中央文字／evidence spine → 右側 decision context。
- Responsive reflow：rail 變 top stepper；right context 置於主工作後；mobile primary action 進 safe-area sticky bar；來源與 CTA 不依賴 hover。
- What not to use：generic AI hero、抽象 ability label、vanity metric、card wall、無語意 spinner、原始 chain-of-thought。

## Product Messaging Contract

- Message Job：讓第一次來的人決定要不要用五分鐘試走一條「來源到下一步」的 PM 工作路徑。
- Source Truth：目前是 deterministic fixture + local in-memory browser state；沒有 external model quality、真人 adoption 或 star evidence。
- Positioning：把產品訊號整理成可回看、可審核、可帶走的下一步；不是替你相信摘要的 AI 回答器。
- Copy Architecture：先講 literal product/job，再講 workflow，再說證據與限制，最後給具體 CTA；不在 hero 堆 capability 名詞。
- No-AI Copy Guard：不使用「智慧」「AI 驅動」「自動洞察」「一站式」「無縫」等沒有必要或沒有證據的話；不預測使用者感受，不寫假數字。
- UX Microcopy States：first-time 有一個起點；empty 有下一步；loading 說正在載入 fixture；error 保留工作區；recovery 可重設／返回；trust 直接說資料不上傳與手動送出邊界。
- Channel Learning：本輪觀察 first-run comprehension、完成路徑、session feedback quality；未有足夠流量前不做 A/B，不把本機 event 當 adoption。

## UX States and Acceptance Criteria

- First-time：可在五秒內讀到產品 job、`來源 → 判斷 → 驗證` 路徑與 `載入範例資料`。
- Empty：不使用破折號填空；顯示實際 sample quote、來源型別與今天只做一件事。
- Loading：保留空間，明確說正在整理範例資料；不使用 fake thinking。
- Error：fixture 失敗時保留安全工作區，提供 `重設這組資料` 或 manual input path。
- Recovery：表單錯誤保留輸入；export／clipboard 失敗保留 textarea；field note 重新編輯會清掉過期 output。
- Mobile：390px 不水平溢出，主要按鈕與來源控制至少 44px，欄位按工作順序單欄重排。
- Accessibility：語意 heading／landmark／label、focus-visible、`aria-current`、status/alert、reduced motion，不能依賴顏色 alone。
- Trust：每個 supported claim 可回到來源；未確認、缺證據、未涵蓋仍保持顯眼；外部 GitHub action 由人檢查與送出。

## Execution Contract

- Files/surfaces to modify：`src/App.tsx` 的 hero/status/first-run copy；`src/styles.css` 的 hero status、first-run ledger、next-action surface、mobile reflow；`DESIGN.md` 與本輪 release audit。
- Files/surfaces to preserve：`src/domain/*`、feedback privacy gate、Markdown export、GitHub manual-submit boundary、private `docs/github-star-growth-plan.md`。
- Implementation slice：只加入可由既有資料與狀態支持的 visual/product framing，不新增 provider、telemetry、auth、API、network 或 domain inference。
- Verification before release：`npm test -- --run`、`npm run lint`、`npm run build`、`git diff --check`；fresh browser normal／friction／recovery；390／768／1440 screenshot；keyboard focus path；hosted HTTP、bundle readback、CI／Pages。
- Rollback：回滾本輪單一視覺／文案 commit；不影響既有 decision brief、session feedback 與 issue template。

### Task sequence

- [x] Step 1：在 `src/App.tsx` 把 hero 的右側狀態改成 literal work-sheet status，顯示目前步驟、桌上訊號數與 local-only boundary；不加入新資料來源。Expected：fresh state 與 loaded state 都能由可見文字讀出「現在在哪裡、下一步是什麼、資料去哪裡」。
- [x] Step 2：在 `src/App.tsx` 收斂 first-run 的工作紙資訊階層，保留 fixture quote、來源型別、`來源 → 判斷 → 最小驗證` 路徑與單一開始 CTA。Expected：首屏沒有第二個 hidden／duplicated primary CTA，且沒有 generic AI capability label。
- [x] Step 3：在 `src/styles.css` 以 divider、alignment、type rhythm 取代不必要的 container weight，讓 evidence spine 與 next-action row 成為主視覺結構。Expected：1440px 灰階／模糊檢查仍可辨識 hero → first-run sheet → next action；loaded rows 不被卡片陰影切碎。
- [x] Step 4：在 `src/styles.css` 重排 390px 與 768px 的 hero status、first-run sheet、context rail、sticky action 與長中文。Expected：`scrollWidth === clientWidth`，主要 controls ≥44px，沒有文字重疊或 sticky bar 蓋住內容。
- [x] Step 5：以現有 domain tests 與 browser path 做回歸，記錄 normal、friction、recovery、keyboard、trust 與未覆蓋 scope。Expected：測試／lint／build exit 0，browser console errors/warnings 皆為 0，clipboard／privacy／manual GitHub boundary 保持可見。
- [x] Step 6：把 fresh screenshot／hosted evidence 回寫到 `DESIGN.md` 與 `docs/product/pm-signal-lab/` audit；只有 CI、Pages、canonical HTTP 與 bundle readback 都讀回後才 push。Expected：remote head、workflow run、Pages deploy、canonical URL 與 release artifact 可互相對上。
- [ ] Follow-up gate：收集至少五位非 owner 的 hosted session 後，回寫外部證據再決定下一個功能切片；在此之前不擴大 scope。

### User-facing UX/AI/security gate

- UX gate：first-time、empty、loading、error、recovery、success、mobile、keyboard 與 long Traditional Chinese 都要有可見結果與下一步；不能只由 code 或 screenshot 推論。
- AI gate：v0 仍是 deterministic/local-first；不新增 provider、thinking animation、虛構 confidence、原始 chain-of-thought、未經批准的外部 action 或 model-quality claim。
- Security/trust gate：不把原始 evidence、customer data、event properties、API key、token 或 private roadmap 帶進 field note；不自動登入、star、issue submit、GitHub mutation 或收集 telemetry。
- Release gate：未完成的 Chrome Extension、screen reader、真機、低頻寬與真人 session 必須明確寫 `未驗證`，不能被視覺 polish 掩蓋。

## Evidence Gate and Learning Loop

- Current evidence：owner-run local／hosted browser evidence、unit/build/lint、remote CI／Pages、canonical HTTP。
- Next real evidence：至少五位非 owner PM／founder／product engineer 完成 hosted session；至少三份能指出 hesitation、trust 或 recovery 的可 triage feedback，才重新評估入口／欄位。
- Decision rule：若真人能理解並完成但回報集中在某一步，iterate 該一步；若無人完成或誤以為是模型品質，hold 並修 trust/copy；若 field note 增加負擔，rollback／縮短；沒有外部樣本時不追加功能。
- Not covered：real provider quality、screen reader／VoiceOver／NVDA／TalkBack、真機、低頻寬、多瀏覽器、real adoption、stars、viral distribution。
