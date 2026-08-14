# PM Signal Lab：Human-owned Trust Copy Contract — 2026-08-15

狀態：implementation contract；不是 release 或 adoption 證明
產品：PM Signal Lab
目前 rollback point：[`9fcff79`](https://github.com/asdc163/pm-signal-lab/commit/9fcff7999889101dfab2eaa966ba95efc9e9daa6)

## Problem frame

- **User/job：** PM 載入一組產品訊號後，要知道來源、限制、下一個可驗證動作，以及哪個決定仍由自己負責。
- **Current friction：** 右側註記、頁底 boundary 與產生後的 session feedback 都反覆出現「不代表模型品質」或 `model quality`；這些句子雖然有 evidence intent，卻把使用者的注意力拉回 AI 系統，而不是目前的來源、判斷與下一步。
- **Decision：** 保留 local-first、privacy、source、limitation 與 human-review boundary，但把可見 trust copy 改成以工作物件與人為決策責任為主詞。
- **Outcome metric：** 首次／載入／核對／安排／帶走五種主要狀態都能在 5 秒內讀到「這張紙留下什麼、下一步是什麼、誰做最後判斷」，且不需要反覆閱讀 AI disclaimer。
- **Constraints：** 只改 copy／trust surface；不改 domain state、event name、CTA action、ARIA landmark、local-only data boundary、privacy gate 或 external side effect。
- **Out of scope：** 不新增 AI provider、model output、telemetry、persistent storage、登入、GitHub mutation、screen-reader sign-off 或真人 adoption claim。

## KB Application Contract

### Relevant KB

下列原則不是裝飾偏好；它們解釋了為什麼本輪要改可見 trust copy，而不是再加一個視覺效果。

- `foundations/product-craft-anti-ai-slop-operating-system.md`：去 AI 感要靠 subject specificity、product truth、human-owned decision 與 evidence，不是把 AI 字樣全部刪掉。這一輪把可見 copy 改成「來源、判斷、下一步、由你決定」，但保留實際資料邊界與限制。
- `foundations/design-rule-hierarchy.md`：Quality Rules 的 trust、error/recovery、可讀性與 accessibility 不可因視覺偏好犧牲；所以本輪只換語言，不移除 boundary 或 human review。
- `foundations/aesthetic-taste-system.md`：重複的 defensive disclaimer 是 fake sophistication；用實際工作物件、neutral hierarchy 與克制的表面取代。這會讓右欄更像 PM workpaper 的 margin note，而不是 AI 產品自我辯護。
- `foundations/design-composition-layout.md`：`現在知道` 是第二讀資訊，必須短、可掃描、沿右欄對齊線，不搶 primary action；boundary note 是底部證據欄，不應成為主標語。
- `foundations/ai-native-ux-operating-system.md`：保留 context、uncertainty、human approval 與 recovery；把「模型品質」與 `model quality` 改成使用者能採取行動的責任句，不讓 trust state 變成抽象 disclaimer。
- `foundations/anti-ai-writing-tells.md`：刪除抽象防禦句，換成具體的物件與責任；避免對稱排比與「不是 X」句式堆疊。不得新增沒有來源的第一手故事或成效宣稱。
- `foundations/design-review-workflow.md`：以 desktop／mobile screenshot、五個工作狀態、正常／錯誤／privacy recovery 行為與第二輪文字審查驗證，不能只看 diff。

## Product Craft Contract

- **Product truth：** 產品先把 `Evidence`、`Claim`、`Experiment Brief` 與 `Decision Memo` 串起來；它不替 PM 做最後判斷。
- **Subject specificity：** 來源、訪談、客服工單、產品觀察、競品拆解、判斷、限制與最小實驗。
- **Selected direction：** human-owned research folio；讓來源與判斷成為主詞，AI 只作背景能力假設，不做 UI 主角。
- **Rejected direction：** 以「模型品質」「AI insight」「智慧引擎」作為 trust hero 或 status label；這會增加抽象感，也超出目前 deterministic local-first evidence。
- **No-AI-feel guard：** 不靠刪掉所有 AI 字眼假裝不是 AI 產品；改用可回看的 domain object、具體操作、限制與 human approval 表達產品價值。
- **Signature detail：** `現在知道` margin note 改成短句「來源可回看，判斷由你確認」，讓右欄成為工作責任的註記，不是模型能力徽章。

## UX states and copy rules

| State | Copy job | Acceptance oracle |
|---|---|---|
| First-run／empty | 說清楚先放哪一段原話 | 不出現模型能力或成效暗示；主 CTA 仍是載入／新增訊號 |
| Loaded／collect | 說清楚訊號已放上桌與下一步 | `現在知道` 與產生後的回報不使用「模型品質」；4 筆 sample 與 source path 不變 |
| Verify | 提醒暫定判斷要看來源、時間、限制 | `這是建議，不是決策`、採用／假設／編輯／缺證據動作不變 |
| Decide | 說清楚 brief 是可驗證行動，不是完整答案 | notice、experiment fields、guardrail 與 manual owner 不變 |
| Ship／memo | 讓輸出保留來源、限制與人為決定責任 | Markdown boundary 不暗示外部採用或品質結果 |
| Feedback／privacy error | 讓使用者先檢查資料再手動送出 | privacy gate、field note、manual GitHub handoff、空白欄位語意不變 |
| Mobile／keyboard | 短句不溢出，action 與 focus 仍可用 | 390px 無水平滾動；所有原有 44px controls 與 focus path 保留 |

## UX/AI/security gate

- **First-time／empty：** 保留「先留一段原話」與 local-only boundary；不以模型能力或結果保證吸引使用者。
- **Loading：** 本輪不改 sample loading state；不得把 copy pass 當成 loading 或 AI activity 證明。
- **Error／recovery：** 空白 claim、privacy 未確認、回報產生失敗的 literal error 與 recovery action 不變；錯誤仍要說明下一步。
- **Mobile／accessibility：** 1440／390 都要重看；文字不得溢出；既有 landmark、label、focus、44px touch target 不改。
- **Trust／AI：** 保留 source、limitation、human approval、local-first 與「不代表外部採用」邊界；不新增 provider、secret、telemetry 或 permission。

## Task sequence

- [x] Step 1：在 `src/App.tsx` 將 boundary note 與 `DecisionContext` 的 `現在知道` 改成 human-owned wording；Expected：可見 UI 不再使用「不代表模型品質」，但仍明確說出來源與人為確認責任。
- [x] Step 2：在 `src/domain/export.ts`、`src/domain/session.ts` 與 `src/domain/feedback.ts` 改寫 Markdown／session receipt／session feedback boundary；Expected：輸出仍保留 local-only、privacy、source、limitation 與 manual adoption boundary，且不出現 defensive model-quality phrase。
- [x] Step 3：在 `src/domain/export.test.ts`、`src/domain/session.test.ts`、`src/domain/feedback.test.ts` 補 deterministic copy assertions，執行 `npm test -- --run`；Expected：4 files、9 tests 全部通過，且新 boundary copy 被測到。
- [x] Step 4：更新 `DESIGN.md`、`CHANGELOG.md`，建立 `31-human-owned-trust-copy-release-audit-2026-08-15.md`；Expected：公開文件說明本輪只改 trust copy，不宣稱 adoption、AI quality 或 stars。
- [x] Step 5：啟動 `http://127.0.0.1:5179/`，以 browser 重跑 first-run、sample、verify、decide、ship、privacy block、keyboard 與 390px；Expected：console／page errors 為 0、無 horizontal overflow、主要 CTA 與原有 focus path 可操作。
- [x] Step 6：push 後等待 CI／Pages，對 `https://asdc163.github.io/pm-signal-lab/` 做 final smoke；Expected：canonical HTTP `200`、final SHA 與 `origin/main` 相同、hosted copy 與 local evidence 一致。

## Execution Contract

- **Modify：**
  - `src/App.tsx`：boundary note、`DecisionContext` 的 `現在知道` copy。
  - `src/domain/export.ts`：decision brief 的 boundary／not-covered literal copy。
  - `src/domain/session.ts`：session receipt 的 boundary copy。
  - `src/domain/export.test.ts`、`src/domain/session.test.ts`、`src/domain/feedback.test.ts`：保護 human-owned boundary 與去除 defensive model-quality phrase 的 deterministic assertions。
  - `DESIGN.md`：記錄 copy／trust surface 規則與本輪 contract。
  - `CHANGELOG.md`：記錄本輪只改 copy，不宣稱 AI quality 或 adoption。
- **Create：** `docs/product/pm-signal-lab/31-human-owned-trust-copy-release-audit-2026-08-15.md`。
- **Observe：** fresh local Vite browser at 1440×1000 and 390×844；first-run、sample loaded、verify、decide、ship、privacy block、feedback output；canonical Pages after push。
- **Verification gate：** `npm test -- --run`、`npm run lint`、`npm run build`、`git diff --check`；browser console／page errors；no horizontal overflow；visual screenshot and behavior trace。
- **Rollback：** revert the copy-only commit to `9fcff79`; no migration or data rollback required.

## Not covered

- Codex Chrome Extension、VoiceOver、NVDA、TalkBack、real device keyboard、non-owner PM session、external adoption、GitHub stars。
- Copy pass 不代表產品已完全去 AI 味；它只驗證本輪明確的 defensive trust copy 被替換，其他 surfaces 仍需由真實 session 回報。
