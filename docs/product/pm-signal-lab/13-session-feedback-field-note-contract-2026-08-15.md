# PM Signal Lab：試用回報 field note 契約

狀態：本輪實作中（2026-08-15）  
產品：PM Signal Lab public preview  
決策類型：可逆的 activation → learning loop 改善

## Problem frame

目前的五分鐘試用可以從空白頁走到 decision brief，也有一份不含原始訊號的 session receipt；但回報一次試用仍要求使用者自己把角色、環境、卡點、信任、恢復與下一個改動重新整理到 GitHub issue。這是根據目前程式路徑與公開 issue template 得出的產品假設，不是已經由真人 session 證明的 drop-off。

要驗證的決策是：把回報整理成一個產品內的 field note，是否能讓完成試用的人更容易留下可 triage 的公開回饋。

### Source truth

- 已有：local-first workflow、decision brief、session receipt、公開 issue template。
- 已有：`docs/operations/pm-session-kit.md` 的回饋欄位與 privacy boundary。
- 尚未有：真人試用完成率、field note 使用率、GitHub issue 提交率、回訪或 stars 增長。

### Success signal

本輪只把可觀察的行為定義清楚，不把本機事件當成 adoption：

`decision brief exported → feedback field note prepared → Markdown copied → user manually submits issue`

真正的外部證據仍是非 owner 的公開 issue、PR、Discussion 或明確授權的 session note。GitHub star 是滯後結果，不是本輪驗證的替代品。

## Product scope

### Must have

- 在帶走頁提供一個低干擾的「整理一次試用」入口。
- 讓試用者選擇 tester role、task result，並可填寫 expectation、hesitation、trust、recovery、one change、environment。
- privacy confirmation 未勾選前，不產生可複製的回報內容。
- 產生不含原始 evidence、customer data 或事件 properties 的 Markdown field note。
- 可複製回報內容，並由使用者自行開啟 GitHub issue、檢查後自行送出。
- 提供 clipboard failure 時的 textarea 備援。

### Nice to have

- 讓 local session trace 的既有摘要仍可單獨複製。
- 在準備回報後顯示 boundary 與「一個 session 不代表整體 usability」的提醒。

### Should not build

- 不加外部 AI provider、登入、資料庫、telemetry、GitHub API mutation 或自動送 issue。
- 不自動讀取 user-agent、原始訊號、頁面內容或任何可能含有客戶資訊的文字。
- 不把「回報已準備」寫成「產品已驗證」或「使用者喜歡」。
- 不在首屏增加第二個 hero CTA、dashboard、card wall 或 AI 狀態文案。

## UX flow and states

1. 使用者完成或準備好 decision brief。
2. 在帶走頁看見一個收斂的 field note 邀請，知道它不會自動發送。
3. 開啟回報整理；表單保留空白，不替使用者猜測感受。
4. 未勾選 privacy：按鈕被阻擋，畫面指出要先確認沒有私密資料。
5. 已勾選 privacy：產生 Markdown 預覽，空白欄位明確寫成 `Not provided`。
6. 複製成功：顯示可貼到 GitHub issue 的提示；複製失敗：textarea 仍可選取。
7. 開 GitHub issue 是外部手動動作；產品不代替使用者按下 submit。

需覆蓋的狀態：

- normal：完整填寫、生成、複製。
- friction：空白欄位、privacy 未確認、剪貼簿被擋。
- recovery：重新編輯、重新生成、返回 decision brief。
- mobile：表單單欄、固定操作列不遮擋、44px 觸控目標。
- accessibility：label/fieldset、focus-visible、錯誤與成功狀態可被讀取。
- trust：原始 evidence 永不進入 field note；外部送出明確由使用者負責。

## Product messaging contract

- Message job：讓完成一次試用的人，用不到一分鐘留下可 triage 的產品觀察。
- Positioning：這是一張把試用經驗整理成公開 field note 的工作紙，不是 AI 回答器或滿意度分數。
- CTA：`整理一次試用`、`產生回報內容`、`複製回報內容`。
- No-AI copy guard：不使用「智慧分析」「自動洞察」「理解你的感受」「AI 驅動」等沒有必要且沒有證據的詞；不預填使用者的信任或滿意度。
- State copy：空白寫 `Not provided`；未確認 privacy 就說明原因；失敗時保留 textarea，不假裝已完成。

## Engineering boundary

- 新增純函式 `buildSessionFeedbackReport`，集中處理 label、trim、空白欄位與 privacy gate。
- App 只保存本次頁面 session 的表單 state 與生成文字；不寫 localStorage、不呼叫網路。
- 既有 `buildSessionReceipt` 保留，兩者用途分開：receipt 是操作軌跡，field note 是人的體驗回饋。
- 先補 domain unit tests，再跑 `npm test`、`npm run lint`、`npm run build`。

## Acceptance criteria

- [ ] 從 hosted demo 的空白頁可完成原有四步流程，且原有 decision brief 輸出不變。
- [ ] 帶走頁可開啟／關閉 field note；不開啟時不增加首屏干擾。
- [ ] privacy 未確認時無法生成回報 Markdown，且焦點／提示清楚。
- [ ] 生成內容只有使用者明確填入的 field note，不含原始 evidence 或 event properties。
- [ ] copy 成功與 clipboard fallback 都有可觀察結果。
- [ ] 390、768、1440 寬度無水平溢出；手機欄位與操作列可用。
- [ ] README、session kit、CHANGELOG 與 release audit 指向同一份最新證據。
- [ ] CI 與 GitHub Pages 完成後，重新讀取 canonical URL；未覆蓋的 AT/native/device scope 仍標成未驗證。

## Learning and rollback

本輪 release 後只觀察：是否出現非 owner 的 issue、回報內容是否可 triage、使用者是否指出新的阻塞。沒有足夠外部樣本前，不做 A/B test、不把本機生成數量當 adoption，也不因沒有 stars 就加更多功能。

若 field note 造成表單負擔或回報品質下降，回滾本輪 commit 即可；既有 decision brief、session receipt 與公開 issue template 不需移除。

