# Changelog

## 0.1.7 — 2026-08-15

- 將 app shell 收斂成 PM 研究工作紙：以 paper index、暖紙張、serif page title、evidence spine 與邊欄註記組織閱讀順序，移除深色 SaaS shell、icon-first context wall 與 pill status wall。
- 把首屏的主張改成「把一句話放回它的來源」，讓 sample、source、limitation、human review 與最小驗證保持在同一條可回看的路徑。
- 修正 inline claim editor 在空白提交後的鍵盤回復：錯誤訊息出現時焦點會回到帶有 `aria-invalid` 與錯誤描述的 textarea。
- 重跑 Chrome desktop／tablet／mobile 截圖、loading、Tab、編輯失敗回復、儲存、重設與 local build/test gate；Chrome Extension、螢幕閱讀器、真人 usability 與 adoption 仍未驗證。

這一版是可逆的視覺與可用性調整；它不代表完全無 bug、真人 usability、Chrome／螢幕閱讀器驗證、adoption、模型品質、production readiness 或 GitHub stars 成長。

## 0.1.6 — 2026-08-15

- 將 PM Signal Lab 從「狀態很多的 AI 工作台」再收斂成 editorial field note：保留目前 workflow step 的文字方向感，移除首屏 progress bar 與右欄三格 KPI-like count strip。
- 以 page index、暖紙張、evidence spine 與 margin note 強化 `來源 → 判斷 → 最小驗證` 的閱讀順序；右欄改成描述目前工作紙的工作記錄，不暗示成效或模型活動。
- 將 local-only boundary 收斂成 `只在本頁處理`／`留在本頁`，並補上視覺契約、1440／390 fresh captures 與本輪 release evidence。

這一版是視覺與資訊關係的可逆調整；它不代表完全無 bug、真人 usability、Chrome／螢幕閱讀器驗證、adoption、模型品質、production readiness 或 GitHub stars 成長。

## 0.1.5 — 2026-08-15

- 將 claim 的 `編輯判斷` 從瀏覽器原生 prompt 改成來源旁的 inline editor：有可見 label、helper、field error、取消、儲存與 focus continuity。
- 編輯後維持 `需要你確認`，不會自動採用；空白錯誤保留原 claim，source mapping 與 limitation 不會消失。
- 把 local-only 邊界說清楚為「只留在目前頁面；重新整理會重設」，並同步 decision memo、README 與五分鐘試用腳本。
- 補上 fresh 1440／390 inline editor captures 與 Chrome Extension／assistive technology `Blocked QA Report`；本輪仍不宣稱 Chrome、螢幕閱讀器、真人 usability、adoption 或 GitHub stars。

這一版改善的是 claim review 的可回復互動與資料邊界理解，不代表完全無 bug、production readiness、真人 adoption、模型品質或 GitHub stars 成長。

## 0.1.4 — 2026-08-15

- 將首屏重新聚焦成 `PM 工作紙`：用 `來源 → 判斷 → 驗證` 路徑、當頁進度與資料邊界說清楚這個產品要幫 PM 完成什麼。
- 以暖紙張 workbench、deep-green workflow rail、evidence spine 與平面 ledger row 強化視覺層級；移除重複 CTA 與容易像 AI dashboard 的裝飾語法。
- 補上 1440、768、390 的 fresh visual QA captures，並重跑完整 local workflow、privacy gate、手動 GitHub handoff、clipboard fallback、新增訊號 recovery 與鍵盤路徑。

這一版改善的是產品理解與可回看的試用路徑，不代表完全無 bug、真人 adoption、模型品質、production readiness 或 GitHub stars 成長。

## 0.1.3 — 2026-08-15

- 在帶走頁加入 local-only session feedback field note：用角色、任務結果與具體卡點整理可 triage 的 Markdown。
- privacy confirmation 未完成前不會生成回報內容；剪貼簿失敗時保留可手動選取的文字備援。
- GitHub issue 仍由使用者自行開啟、檢查與送出；沒有 telemetry、原始 evidence 上傳或自動 mutation。

這一版改善的是試用回饋的可整理性，不代表真人 usability、adoption、模型品質、production readiness 或 GitHub stars 成長。

## 0.1.2 — 2026-08-15

- 首屏只保留中央試用任務的開始入口；右側空狀態改成文字指引，不再重複載入按鈕。
- 把 `evidence desk`、`engine`、`live` 等抽象／英文表達換成產品訊號、資料邊界與可回看的來源物件。
- 範例資料改用中文來源名稱，並將 mobile sticky action 恢復為 44px 觸控高度。

這一版只描述介面與可驗證工作流的變更，仍不宣稱真人 adoption、模型品質、production readiness 或 GitHub stars 成長。

## 0.1.1 — 2026-08-15

- 將公開入口與介面流程對齊為 `收集 → 核對 → 安排 → 帶走`，並補上五分鐘 hosted trial path。
- 以 evidence desk 的 literal copy、來源回看與資料邊界取代泛用的 AI demo 語氣。
- 更新 public preview、GitHub Pages、session feedback 與未驗證範圍的 release 文件。

這一版仍不宣稱真人 adoption、模型品質、production readiness 或 GitHub stars 成長。

## 0.1.0 — 2026-08-14

- Added the local-first `收集 → 核對 → 安排 → 帶走` workbench.
- Added source-linked claims, explicit limitations, human review state, experiment brief, decision memo, and Markdown export.
- Added deterministic fixtures and domain tests without requiring an API key.
- Added responsive desktop, tablet, and mobile layouts with a graphite shell, neutral workbench, and evidence spine.
- Added public-preview documentation, QA evidence, and release boundaries.

This release does not claim real model quality, user adoption, production readiness, or a star-growth outcome.
