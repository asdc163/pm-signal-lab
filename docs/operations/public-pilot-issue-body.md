## 這次在測什麼

PM Signal Lab 是一張 local-first 的產品證據工作紙：把訪談、客服、產品觀察與競品片段留在原文旁，逐筆確認暫定判斷，最後帶走一個最小驗證。

目前是 public preview。資料只留在目前瀏覽器工作階段；沒有登入、外部模型、API key、telemetry 或 GitHub 自動修改。這次要了解的是工作流、來源回看與信任邊界，不是 AI 品質或 adoption 宣稱。

## 我在找誰

5 位做 product discovery、PM、product design、research 或 founder-led product 的人。你不需要準備自己的資料，也不需要先懂這個 repo。

## 五分鐘試用

1. 開啟 [hosted demo](https://asdc163.github.io/pm-signal-lab/)。
2. 從空白頁按 `載入範例資料`。
3. 展開一筆 `查看來源`，再按 `開始核對`。
4. 對一個 claim 按 `採用這個判斷`，也可以把另一個保留為假設。
5. 到 `安排` 草擬 `最小實驗`，再到 `帶走` 匯出 decision brief。
6. 如果你願意，再開啟 `整理一次試用`，填寫你真正遇到的卡點；勾選 privacy confirmation 後，產生 field note。

請不要貼客戶姓名、私人 ticket、API key、token 或機密 roadmap。sample pack 已經足夠完成任務。

## 如果你用鍵盤或輔助技術

請用同一條路徑再走一次，記錄實際環境：

- `Tab`／`Shift+Tab`／`Enter`／`Space` 能不能找到 sample、source、workflow、claim、editor 與 export 控制？
- claim 編輯留空後，錯誤有沒有說明下一步，焦點有沒有回到可修正的欄位？
- 如果你使用 screen reader 或其他 assistive technology，請寫下實際聽到的 current step、source、limitation、error 或 field note 狀態。

目前 repo 有 owner-run keyboard／semantic fallback evidence，但沒有把它寫成 Chrome Extension、VoiceOver、NVDA 或 TalkBack sign-off；你的環境與觀察會比一句「正常」更有用。

## 我需要的回饋

- 前五秒，你以為這張工作紙在幫你做什麼？
- 你是否看得懂哪一句是來源、哪一句只是暫定判斷？
- 哪一步讓你停頓、誤解、回頭或找不到下一個動作？
- 來源與 limitation 是否改變了你對 claim 的信任程度？
- 匯出的 brief 是否適合貼進 issue、PRD 或團隊討論？
- 你會不會想帶入一組去識別化的 evidence pack？為什麼？
- 一個什麼改動會讓你願意再試一次？

可以用 [session feedback template](https://github.com/asdc163/pm-signal-lab/issues/new?template=pm-session-feedback.md)，或直接用自己的話回覆。請寫 `Tester role`、`Environment`、`Task result`、一個具體 hesitation、trust／recovery 觀察與一個改動。

## 邊界

一份回覆只代表一個人在一個環境完成一次任務，不代表一般 usability、retention、model quality、adoption 或 GitHub growth。送出前請自己檢查內容；GitHub issue 不會由產品自動建立或送出。

如果工作流真的對你有用，star 歡迎但完全可選；具體、可重現的回饋比數字更重要。
