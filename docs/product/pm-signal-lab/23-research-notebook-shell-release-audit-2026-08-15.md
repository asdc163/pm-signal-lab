# PM Signal Lab：Research Notebook Shell Release Audit — 2026-08-15

狀態：public Pages hosted smoke verified；更廣的 release／adoption 邊界仍未完成
產品：PM Signal Lab public preview
行為 commit：`4c8c2c2`（`Reframe shell as PM research notebook`）
比較基線：`cc9d3c0`（`Record hosted release verification`）

## 本輪決策

這一輪把上一版仍然偏像 SaaS／AI dashboard 的 shell，再收斂成一張 PM research notebook：

- 左側是紙張色 page index，不再用深色 app chrome 當品牌主角。
- 首屏主標改成 `把一句話放回它的來源`，中央工作紙直接放一段可回看的原話與唯一主要 CTA。
- status 改成文字與底線／分隔線；右側 context rail 改成 margin note 與工作記錄，不用 icon-first wall 或 pill status wall。
- 保留 `Evidence → Claim → ExperimentBrief → DecisionMemo`、source mapping、limitation、human review、local-only boundary 與可回報 field note；沒有加入 provider、AI activity、fake thinking、model confidence 或 external mutation。
- 補上 claim editor 空白提交後的 focus recovery：錯誤文字、`aria-invalid` 與 `aria-describedby` 同時留在欄位旁，焦點回到可修正的位置。

「去 AI 味」仍是 product/design hypothesis，不是真人研究結果；本輪 evidence 只證明 owner-run local／hosted scope 的可重跑畫面與行為。

## Completion Evidence Packet

### Static

本輪在 `4c8c2c2` 前後重新執行：

- `npm test -- --run`：exit 0；4 個 test files、9 個 tests 全部通過。
- `npm run lint`：exit 0；TypeScript no-emit 通過。
- `npm run build`：exit 0；Vite production build 完成，local bundle 為 `index-Bpa1oFEu.css` 與 `index-CMOhelsW.js`。
- `git diff --check`：exit 0。
- Research notebook shell contract：`22-research-notebook-shell-reframe-contract-2026-08-15.md`；KB plan score `100/100`。

### Fresh local browser behavior

環境：全新 Playwright page contexts，使用本機 Google Chrome executable `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`；這是 local fallback，不是 Chrome Extension sign-off，也不是螢幕閱讀器 evidence。

- First-run desktop／mobile：`h1 = 把一句話放回它的來源`；舊標題不存在；desktop `scrollWidth = clientWidth = 1440`，mobile `scrollWidth = clientWidth = 390`。
- Loading：點擊 `載入範例資料` 後於 60ms 觀察到 `正在整理範例資料`，完成後顯示 `4 筆原文已放上桌`。
- Normal flow：載入後進入 `核對`，出現 3 個 candidate claims；editor 可以由 claim row 開啟，textarea 在進入編輯時自動取得焦點。
- Friction：清空 editor 儲存後，`role=alert` 顯示 `判斷不能是空白；請保留一句可以被回看的說法。`；錯誤欄位為 `claim-edit-claim-next-step-friction`、`aria-invalid=true`，焦點回到 textarea。
- Keyboard recovery：由 textarea 按 Tab 依序到 `取消`、`儲存判斷`；first-run skip link 後可進入 workflow button；主要 CTA focus outline 為 3px solid。
- Recovery：儲存有效判斷後 editor 關閉；回到 `收集` 重設資料後，h1 恢復、claim count 為 0、editor count 為 0，current step 回到 `01 收集`。
- Desktop／mobile console 與 page errors：本次 fresh smoke 都是空陣列。

### Visual

已用 fresh local capture 並完成目視 review：

- [1440 first-run](./assets/qa/notebook-shell-first-run-1440.png)：紙張色 index、serif title、原文入口與 margin note 建立第一閱讀順序。
- [768 first-run](./assets/qa/notebook-shell-first-run-768.png)：tablet 轉成上方 stepper，context note 仍與工作紙保持分區。
- [390 first-run](./assets/qa/notebook-shell-first-run-390.png)：單欄重排、長中文可讀、無水平溢出、context note 下移。
- [1440 loaded](./assets/qa/notebook-shell-loaded-1440.png)：載入後的 evidence／claim workspace 保留來源、限制與人為判斷責任。
- [1440 verify](./assets/qa/notebook-shell-verify-1440.png)：inline editor 與 evidence spine 同屬可回看區域。
- [390 verify](./assets/qa/notebook-shell-verify-390.png)：mobile sticky action 與 claim review 順序可重跑。

視覺 review 的結論是「符合本輪 research notebook composition」；這不是可泛化的 usability、conversion 或 adoption 結論。

### Hosted GitHub Pages

本輪由 `main` push 後讀回 GitHub Actions、canonical HTTP 與 hosted browser：

- Push：`cc9d3c0..4c8c2c2` 到 `origin/main`。
- CI：[`31839569261`](https://github.com/asdc163/pm-signal-lab/actions/runs/31839569261)；`verify` 的 test、typecheck、build 全部成功。
- Pages deploy：[`31839569215`](https://github.com/asdc163/pm-signal-lab/actions/runs/31839569215)；artifact upload 與 GitHub Pages deploy 成功。
- Canonical URL：<https://asdc163.github.io/pm-signal-lab/>；fresh HTTP GET `200`。
- Production assets：`assets/index-Bpa1oFEu.css` 與 `assets/index-CMOhelsW.js`；兩個 asset fresh GET 都是 `200`。
- Fresh hosted browser：desktop／mobile response 都是 `200`；首屏 h1 為 `把一句話放回它的來源`、舊標題數量為 0；載入後 claim count 為 3；desktop／mobile 都沒有 horizontal overflow；console/page errors 都是空陣列。
- [Hosted desktop first-run](./assets/qa/notebook-shell-hosted-desktop.png)、[hosted desktop loaded](./assets/qa/notebook-shell-hosted-loaded-desktop.png)、[hosted mobile first-run](./assets/qa/notebook-shell-hosted-mobile.png) 與 [hosted mobile loaded](./assets/qa/notebook-shell-hosted-loaded-mobile.png) 都由同一輪 canonical browser smoke 留存。

## Release boundary

### 待完成／未驗證

- Chrome Extension control surface 目前 unavailable；Chrome Extension、螢幕閱讀器、完整 assistive technology route 標記為 `未驗證`／`blocked`，不能用 Playwright local fallback 代替。
- 尚未有非 owner PM session、5 位目標使用者 task-session evidence、真人「不像 AI」比較結果、adoption、retention、conversion 或外部 issue trend。
- 尚未驗證 model quality；v0 沒有 external AI provider，也沒有自動修改 GitHub、MCP action、登入、資料庫或 telemetry。
- GitHub repo 的 stars、forks、traffic 與 10,000 stars 目標仍是外部結果，不由本輪 UI QA 證明。

### Current public baseline

本輪 `gh api repos/asdc163/pm-signal-lab` 讀回：`visibility=public`、`default_branch=main`、`homepage=https://asdc163.github.io/pm-signal-lab/`、`stargazers_count=0`、`forks_count=0`、`open_issues_count=4`。這是 current snapshot，不是 growth forecast。

### Screenshot hashes

以下 hash 讓後續 review 可以確認本輪 evidence asset 沒有被靜默替換：

```text
a552f33ca460c5cf1cca2879ce4ab71de7f8af7f6b8f13eb8cd32f096eae95d9  notebook-shell-first-run-1440.png
9567a7895bddb3a9211d622d228e4173108e0c1d116b5a283a5942d5751a51f8  notebook-shell-first-run-768.png
9275319d82b8c2f75f060793cbece69e2f8e9e23c7cde05aabb8523eaeff5992  notebook-shell-first-run-390.png
f766f5399df7f709be282f96fd3841d0102a1b82f2febf1f7323a7db5a91a76e  notebook-shell-loaded-1440.png
58a212484aeb40af7da37d240da2af0cf09f77bdb1a79fc4b4f79d28e80a9658  notebook-shell-verify-1440.png
c2bfd4af1cfd547dc2fcbd9ef1f5a20bb67305d01bc934b35382804790fccd6b  notebook-shell-verify-390.png
430a640e50bd019fa27347964208e8095d2a4c1cf6499b2fa9d7f81b7317af4b  notebook-shell-hosted-desktop.png
8bfa0e182fdeaf39cc7c27d6ba17b5e46e6f29423d1179fea131c8067f6feb1c  notebook-shell-hosted-loaded-desktop.png
23030f5d64d233fdc5ae562f39e37bb90137360aa6a9de40ee581e72b2a96a38  notebook-shell-hosted-loaded-mobile.png
9275319d82b8c2f75f060793cbece69e2f8e9e23c7cde05aabb8523eaeff5992  notebook-shell-hosted-mobile.png
```

### Rollback

若 hosted smoke 或後續 session evidence 顯示 orientation、completion、trust 任一退化，回退 `4c8c2c2` 這個單一 behavior commit 到 `cc9d3c0`；保留 inline claim editor、domain model、privacy gate 與既有 public preview，重新比較前後 screenshot／behavior trace。Rollback 尚未執行。

## Next operating loop

保留既有每週 evidence-oriented automation：它只做 public state／CI／Pages／issues／stars observation、產生候選內容與 weekly report，不會自動 star、follow、like、DM、mass reply、偽造 adoption，或自動修改 GitHub。下一個 promotion gate 仍是取得真實 PM session evidence，再決定是否做 provider adapter、portable schema 或 read-only external integration。
