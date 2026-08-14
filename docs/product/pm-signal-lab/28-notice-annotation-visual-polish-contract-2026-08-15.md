# PM Signal Lab：Notice Annotation Visual Polish Contract — 2026-08-15

狀態：下一個可逆的 visual／trust polish slice；不改 domain、copy truth、外部 API 或資料邊界
產品：PM Signal Lab
決策類型：two-way door；把既有 notice 從泛用彩色提示卡改成研究工作紙上的 ruled annotation，讓狀態回饋更像產品自己的紙張語言，而不是 AI／SaaS dashboard 的 toast card。

## Problem Frame

- User/job：PM 在收集、核對、安排與帶走之間，需要快速知道剛才的操作結果與下一個可做的動作；他不需要一個看起來像系統「替他判斷」的彩色訊息面板。
- Current friction：載入、採用、匯出、privacy block 與錯誤 recovery 目前共用完整的彩色矩形 notice。它能傳達狀態，但視覺上仍像泛用 SaaS／AI 工作台，和本產品的 research folio、ruled margin、flat row 不一致。
- Product truth：notice 只反映真實 UI state（例如 `範例資料已載入`、`判斷已採用`、`privacy 未確認`），不是 AI activity、模型信心或品質證明。
- Outcome metric：在不改變 notice message、role、live semantics、close action 或 recovery 行為的前提下，success／warning／error／info 四種狀態都呈現為同一套工作紙註記語法；390px 不溢出，鍵盤仍能到達 close button，空白 claim error focus 不退化。
- Evidence boundary：目前可取得 local browser screenshots、DOM／computed-style readback、keyboard flow、static gates 與 hosted smoke；螢幕閱讀器、真實 PM session 與 adoption 仍是未驗證。
- Out of scope：不加入 gradient、glass、shadow wall、motion、new dependency、provider、telemetry、AI copy、auto-submit 或外部 GitHub mutation。

## Constraints / Scope

- 保留現有 research folio、warm paper、evidence spine、CJK typography、44px controls、local-first 與手動 GitHub handoff。
- 只改 notice 的 visual surface 與對應的 design documentation；不改 domain state、message truth、event schema、external URL 或 feedback privacy gate。
- Quality rules 優先於 taste：任何色彩收斂都不能降低 success／warning／error 可辨識度、文字對比、keyboard recovery、mobile reflow 或 trust boundary。

## KB Application Contract

Relevant KB：本輪只選與 product truth、visual surface、composition、no-AI feel 與 behavioral evidence 直接相關的設計基礎，不引入趨勢裝飾或未驗證能力。設計理由：notice 是狀態回饋，不該成為另一個 dashboard surface。

- `foundations/product-craft-anti-ai-slop-operating-system.md`：AI 感來自 product truth、subject specificity、UX states 與 evidence 同時不足；因此 notice 只做現有 UI state 的工作紙註記，不新增 AI capability copy。Tradeoff：少一點彩色即時感，換更一致的產品語言。
- `foundations/aesthetic-taste-system.md`：先修 product truth、hierarchy、surface 與 spacing，不用 gradient／glass／裝飾補「差一點」；因此用 flat ruled annotation 取代彩色卡片。Tradeoff：需要靠 icon、文字與左側 tone rule 共同傳達狀態。
- `foundations/design-rule-hierarchy.md`：quality rules（可讀、可操作、不可重疊、a11y、trust）高於 taste guardrails；因此不移除 live semantics、close target 或 error focus，只調 surface。
- `foundations/design-composition-layout.md`：分組順序是 spacing、alignment、typography、divider、最後才 card；因此 notice 回到 ruled margin，退居 primary workflow 之後。
- `foundations/design-review-workflow.md`：重要 UI 必須經過 real screenshot、behavioral UX、second polish；因此驗證會同時操作 success、warning、error、mobile 與 keyboard close，不以 CSS diff 當完成證據。

### Fastest evidence

先在 local Vite 對四種 notice tone 讀 computed style 與 screenshot，再用 keyboard 重跑空白 claim error／privacy warning；若任何 state 失去辨識或 overlap，停止 release 並回退 CSS。

## Product Craft Contract

- Subject specificity：這個產品的 signature 是 `Evidence → Claim → ExperimentBrief → DecisionMemo` 與紙張上的 evidence spine；notice 應該像 margin annotation，貼著工作物件，不像獨立的訊息中心。
- Creative divergence：採用「工作紙註記」方向，不增加新的視覺主題；狀態用左側語意色線、上下 ruled divider、icon 與具體句子傳達。取捨是少一點 instant color pop，換取更穩的閱讀路徑與更低的 AI template 感。
- No-AI-feel guard：不把 notice 改成 `AI 已完成`、`智慧分析`、`系統建議` 或 fake progress；保留現有 literal action／boundary copy，讓視覺直接服務真實 state。
- Taste system：background 退後，分組優先使用 spacing、alignment、typography、divider，再使用 card；品牌色只保留在狀態線與 icon，不讓整塊背景變成 status wall。

## UX Flow And States

- First-time／empty：沒有 notice 時，首屏維持空白工作紙與唯一 sample CTA；不新增提示卡。
- Success：載入 sample、採用 claim、匯出 brief 後，notice 是可讀、可關閉、低干擾的完成註記。
- Warning／error：privacy 未確認、空白 claim、表單欄位錯誤仍保留 literal error、`role="alert"`／`role="status"`、focus recovery 與原輸入。
- Mobile：notice 在 390px 內自然換行；close button 保持至少 44px；不覆蓋 sticky action、表單或 feedback output。
- Accessibility：只調整視覺 surface；現有 `aria-atomic`、role、文字與 focus contract 不得退化。focus-visible 仍清楚。
- Trust：notice 不表示 adoption、model quality、validation success 或 external send；manual GitHub handoff boundary 維持可見。

## UX/AI/Security Gate

- UX：notice 的文字、close action、error focus、mobile wrap、44px target 與 primary CTA hierarchy 不退化。
- AI：v0 沒有 provider；不得加入 fake thinking、confidence、model activity、AI assistant voice 或把 UI status 寫成品質結果。
- Security：不新增 secret、token、permission、telemetry、customer data、external write；privacy warning 與手動 GitHub submit boundary 仍可見。

## Execution Contract

### Files / surfaces

- Modify `src/styles.css`：把 `.notice` 改為 transparent ruled annotation；各 tone 只控制語意色的 left rule／icon text，不改 message layout 或 control size。
- Modify `DESIGN.md`：記錄 notice 是 ruled margin annotation、狀態色只作 signal、不得回到彩色卡片牆。
- Modify `CHANGELOG.md`：記錄本輪 visual polish 與未驗證邊界。
- Create `docs/product/pm-signal-lab/29-notice-annotation-visual-polish-release-audit-2026-08-15.md` only after fresh evidence。
- Test `npm test -- --run`、`npm run lint`、`npm run build`、`git diff --check`。
- Observe local `http://127.0.0.1:5179/` at 1440／390；load sample success、blank claim error、privacy warning、field note success、keyboard close／focus。

### Task sequence

- [ ] Step 1：執行 baseline static gates，確認本輪從綠線開始；Expected：4 test files／9 tests、lint、build、diff check exit 0。
- [ ] Step 2：只修改 `.notice` surface tokens／rules，保留 JSX、copy、role、`aria-atomic` 與 close button；Expected：四種 tone 都沒有實心彩色背景，computed left border 仍能區分 tone。
- [ ] Step 3：在 fresh 1440 browser 操作 `載入範例資料`、`開始核對`、空白 claim 儲存與 `privacy 未確認`；Expected：success／warning/error 視覺一致、error focus 回 editor、privacy 不產生 output。
- [ ] Step 4：在 fresh 390 browser 檢查 long Traditional Chinese notice、close button、fixed action、feedback form；Expected：`scrollWidth === clientWidth`、無 overlap、close target ≥44px。
- [ ] Step 5：看 fresh desktop／mobile screenshots，做灰階、box、alignment、type、surface second polish；Expected：notice 退到工作紙層級，不搶走 primary action，也不變成空白無辨識度的細線。
- [ ] Step 6：更新 DESIGN／CHANGELOG，建立 release audit；Expected：current commit、local evidence、CI／Pages／canonical smoke、not-covered list 可互相對照。

## Verification Gate

- Static：test、lint、build、diff check。
- Browser：success、warning、error、recovery、privacy trust、keyboard close、1440、390。
- Visual：真實 built UI screenshot；檢查背景、邊界、色彩比例、文字長度、icon／close alignment。
- Accessibility：role／aria unchanged；keyboard can reach close button；error focus remains editor；no overlap。
- Release：GitHub Actions success；Pages HTTP 200；canonical URL readback against final SHA。
- Not covered：screen reader announcements、real PM sessions、adoption、traffic、stars、10,000-star outcome。

## Rollback

若 ruled annotation 讓 warning／error 失去辨識、長文難讀、close button 難找或使用者把狀態當成一般文字而錯過 recovery，回退本輪 CSS／docs commit；不需要 migration、dependency rollback 或資料修復。
