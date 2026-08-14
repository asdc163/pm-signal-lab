# PM Signal Lab：Inline Claim Editor / Accessibility Contract — 2026-08-15

狀態：下一個可逆互動切片；Chrome Extension、螢幕閱讀器與真人 session 仍未驗證
產品：PM Signal Lab public preview
決策類型：two-way door；只替換 claim 編輯互動，不改 domain schema 或外部邊界

## Problem Frame

- Decision：把 `編輯判斷` 從瀏覽器原生 `window.prompt` 改成來源旁的 inline editor，讓 PM 能在同一個工作紙狀態中修改、取消、修正空白輸入，再重新確認。
- User/job：PM 在回看來源時發現暫定判斷寫得不準，想保留來源與限制，只改文字並決定它是否仍需要確認。
- Current friction：原生 prompt 沒有產品自己的標籤、helper、錯誤位置或 mobile layout；使用者離開頁面脈絡，也沒有可穩定驗證的 accessible name 與 recovery。
- Outcome metric：edit task completion、空白修正成功率、取消後原文保留、keyboard focus continuity，以及真人 session 對「修改後是否知道要重新確認」的回報。
- Evidence boundary：目前只有 owner-run browser evidence；沒有 Chrome Extension、screen reader 或非 owner session 證據。這份契約不能把模擬或 Playwright 結果寫成真人 usability。
- Constraints：維持 local-first、in-memory、無 provider、無 telemetry、無 GitHub mutation；原始 source mapping 與 limitation 不得因編輯消失。
- Out of scope：不做 AI rewrite、suggestion、modal dialog、autosave、外部同步、批次編輯、模型 confidence 或自動採用。

## PM Filter

- Who：需要修正產品判斷文字的 PM／founder／product engineer。
- Job/Pain：在來源旁把一句判斷改成自己真正願意帶進實驗的版本，同時知道它會回到「需要你確認」。
- Must-have：inline labelled field、原文保留、取消不變、空白錯誤保留文字、儲存後狀態回到 `需要你確認`、keyboard path、mobile no-overflow。
- Nice-to-have：未來真人 evidence 顯示需要時，再考慮字數提示或 revision history。
- Should-not-build：AI 改寫、漂亮但無語意的 dialog、沒有 diff 的 silent mutation、auto-accept、外部儲存。
- Success signal：使用者能從 claim 展開區完成一次有意識的 edit → review，而不需要瀏覽器原生對話框或 maintainer 解釋。

## KB Application Contract

Relevant KB：以下檔案直接改變本輪 interaction、狀態與驗證門檻；它們不授權我把模擬結果寫成真人證據。設計理由：把原生 prompt 的不可見狀態換成產品自己的可讀、可回復工作物。

- `foundations/design-brain.md`：先由產品情境、產品真相、狀態與 responsive 再決定表面；因此 editor 放在 claim detail 內，不另造 modal 層。Tradeoff：編輯區會增加 detail 高度，但保留來源脈絡。
- `foundations/design-rule-hierarchy.md`：Quality Rules 高於 taste；因此 labelled control、visible focus、44px touch target、error recovery 優先於更緊湊的 editorial 排版。Tradeoff：少一點密度，換取可理解與可恢復。
- `foundations/product-craft-anti-ai-slop-operating-system.md`：用真實 domain object 與 human decision boundary 取代 AI magic；因此編輯只改 claim text，儲存後明確回到待確認，不生成或代替判斷。
- `foundations/ai-native-ux-operating-system.md`：保留 control、approval、uncertainty 與 recovery；即使 v0 沒有 provider，也要讓「修改不是採用」可見。Tradeoff：多一個狀態轉換，但降低過度相信。
- `foundations/design-composition-layout.md`：資訊關係優先於容器裝飾；因此 editor 是 claim/source/limitation 下的一段 continuation，而不是獨立 card。
- `foundations/product-learning-loop.md`：最小切片要有 learning question、behavior evidence 與 writeback；因此本輪只改 edit task，下一個決策留給真人 session，不追加 analytics。
- `foundations/product-discovery-decision-gate.md`：沒有真人研究只能標成假設；因此 completion 只證明可操作與狀態正確，不宣稱 usability 或 adoption。

## Product Truth

`Claim.text` 是人可以修正的工作物，不是模型答案。儲存一個修改後的 claim 必須同時做到：

1. 原本的 source mapping 與 limitation 留在同一個 detail。
2. `edited: true`、`reviewed: true` 保留工作紀錄。
3. status 回到 `review`，顯示 `需要你確認`，不能因修改自動變成 supported。
4. 取消或空白失敗不改變原本 claim。

## Options considered

1. **保留 `window.prompt`**：工程成本最低，但離開產品脈絡、無法提供穩定 helper/error、mobile 與 a11y 控制弱；reject。
2. **自製 modal dialog**：可集中注意力，但需要 focus trap、Escape、背景 inert、scroll lock 與額外狀態；目前沒有證據顯示需要把小幅修改升格成 modal；reject。
3. **Inline editor（選擇）**：把編輯放在已展開的來源與限制旁，使用原生 labelled textarea、取消／儲存與 field error；最符合 PM 的回看工作，也最容易回歸與回滾。

## UX States and acceptance criteria

- First-time：使用者看見 `編輯判斷`，按下後在同一個 claim detail 出現標題、可編輯欄位、helper 與 `取消／儲存判斷`。
- Normal：輸入文字後儲存，claim 顯示新文字、`已處理` 與 `需要你確認`；source mapping、limitation 不變。
- Empty/error：儲存空白文字時，欄位保留輸入、顯示文字錯誤、focus 留在欄位，原 claim 不被清空。
- Recovery：取消回到原 claim；重新開啟可再次編輯；不產生 prompt、未預期跳窗或 page navigation。
- Keyboard：`編輯判斷 → textarea → 取消 → 儲存判斷` 可由 Tab／Shift+Tab 到達；Enter 不會意外提交外部動作；focus-visible 清楚。
- Mobile：390px 不水平溢出；textarea 與兩個操作至少 44px；編輯區在來源與限制之後自然堆疊。
- Trust：helper 明確說「來源與限制會保留；儲存後仍需重新確認」；不出現 AI rewrite、confidence 或自動採用語句。

## Execution Contract

- Files/surfaces to modify：`src/App.tsx` 的 claim edit state／handlers／`ClaimRow` inline form；`src/styles.css` 的 claim edit layout／focus／mobile rules；unit or browser regression evidence；本契約與 release audit。
- Files/surfaces to preserve：`src/domain/types.ts`、`src/domain/synthesis.ts`、source mapping、decision export、feedback privacy gate、manual GitHub boundary、private growth plan。
- Implementation slice：只替換 edit interaction；不新增 package、provider、API、telemetry、auth 或 persistence。

### Task sequence

- [x] Step 1：讀取目前 claim edit state 與 CSS，確認 `window.prompt` 是唯一編輯入口；Expected：改動範圍只落在 App claim flow 與對應樣式。
- [x] Step 2：加入 `editingClaimId`、draft text、field error、focus ref 與 save/cancel handlers；Expected：取消不改 claim，空白保存不改 claim，成功保存設定 `edited/reviewed/review`。
- [x] Step 3：把 `ClaimRow` 的 edit action 換成 inline labelled form；Expected：detail 內可見 helper、error、取消、儲存，畫面沒有 browser prompt。
- [x] Step 4：補 mobile、focus-visible、long Traditional Chinese 與 reduced-motion 規則；Expected：390／768／1440 沒有水平溢出，控制項至少 44px。
- [x] Step 5：執行 `npm test -- --run`、`npm run lint`、`npm run build`、`git diff --check` 與 fresh browser normal／empty／cancel／save／keyboard 路徑；Expected：exit 0、console/page errors 0、state oracle 全部通過。
- [x] Step 6：先確認 Codex Chrome Extension control surface；若不可用，建立標記為 `Blocked QA Report` 的 evidence，不用其他瀏覽器冒充 Chrome／screen reader 證據。
- [ ] Step 7：CI／Pages／hosted smoke 回讀後，更新 release audit；Expected：remote SHA、workflow、canonical bundle 與 current source 都對得上。
- [ ] Follow-up gate：至少 5 位非 owner 完成 hosted session、至少 3 份 feedback 可 triage 後，才決定是否擴大到 provider／analytics／extension。

## Verification gate

- Static：unit tests、TypeScript lint、production build、diff check。
- Browser：first-run → load fixture → source → review → edit; empty save; cancel; valid save; reopen; mobile; keyboard focus; refresh/backtracking。
- Accessibility basics：semantic label、`aria-describedby`、`aria-invalid`、focus-visible、heading/region relationship、no native prompt。
- Chrome gate：Codex Chrome Extension route only；本輪 fresh availability check 結果為 unavailable，已建立 `Blocked QA Report`，不以 fallback browser 解除 gate。
- Trust gate：edited claim must remain `需要你確認`，source/limitation remain visible；no external side effect。

## User-facing UX/AI/security gate

- UX gate：first-time、empty、loading、error、recovery、mobile、keyboard 與 long Traditional Chinese 都要有可見結果與下一步；inline editor 不得把使用者帶離 claim/source context。
- AI gate：v0 沒有 provider；編輯不能生成、改寫、auto-accept、虛構 confidence 或暗示模型判斷。
- Security gate：draft 只留在目前頁面，重新整理會重設；不把原始 evidence、customer data、API key、token 或 private roadmap 帶進外部 action。
- Trust gate：編輯後狀態回到 `需要你確認`，source／limitation 保留，取消與空白錯誤不改變原 claim。

## Rollback

若 inline editor 造成真人 session 的完成率或理解下降，先 `git revert` 本輪單一 commit，恢復既有 prompt behavior，再依 feedback 決定是否改成 modal；不改動 domain objects、source data 或已公開 feedback path。
