# Changelog

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
