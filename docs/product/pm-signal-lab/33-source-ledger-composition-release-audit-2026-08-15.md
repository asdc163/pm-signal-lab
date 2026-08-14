# PM Signal Lab：Source Ledger Composition Release Audit — 2026-08-15

狀態：local gates 與 fresh local browser 已驗證；本輪 push 後的 GitHub Actions／Pages hosted smoke 尚未執行<br>
產品：PM Signal Lab<br>
公開 repo：https://github.com/asdc163/pm-signal-lab<br>
canonical demo：https://asdc163.github.io/pm-signal-lab/<br>
基準 public head：[`eda7f69f13ea122339d46b276754a3181d07541b`](https://github.com/asdc163/pm-signal-lab/commit/eda7f69f13ea122339d46b276754a3181d07541b)

## 本輪決策

這一輪只處理 loaded evidence 的資訊關係與 provenance hierarchy。原本的 evidence row 有來源、日期與原文，但在載入後仍容易被一般化的狀態列、圓點與重複的右側操作稀釋；claim mapping 也沒有用同一個人能快速回看的索引回指來源。

決策是把 Evidence 改成「來源帳頁／逐筆回看」：

- 每筆 evidence 使用目前工作區順序的 deterministic `來源 01`、`來源 02`… folio；左側 spine 同時保留順序與連線。
- row 內明確標出 `原話`、來源身份、類型與日期；展開後仍使用相同來源編號，不展示內部資料 id。
- claim 使用 `判斷 01`… folio，expanded source mapping 回指 `來源 01`…，讓判斷與原文是同一條閱讀路徑。
- 不改 domain schema、fixture、provider、storage、telemetry、permission 或外部 mutation；這是可逆的 React/CSS composition slice。
- 編號只保證在目前工作區 render 與 claim mapping 內一致；新增或排序訊號可能重排 folio，本輪不宣稱 durable source identity 或跨 session reference。

本輪依 [`32-source-ledger-composition-contract-2026-08-15.md`](./32-source-ledger-composition-contract-2026-08-15.md) 執行；KB execution-plan score 為 `100/100`。

## KB application

- `design-rule-hierarchy`：先確立 product truth、subject specificity 與 evidence，再選視覺語法。
- `product-craft-anti-ai-slop-operating-system`、`aesthetic-taste-system`：用真實 PM 工作物件取代泛用 AI status／裝飾；不新增 gradient、orb、glass、3D 或假活動。
- `design-composition-layout`、`design-typography`、`design-tokens`、`web-design-system-playbook`：保留 alignment spine、ruled divider、CJK 可讀性與既有 token，不做 trend-driven container 堆疊。
- `ai-native-ux-operating-system`、`anti-ai-writing-tells`：provenance 先於 persuasion；顯示來源、時間、限制與人為確認，不用抽象模型能力做主詞。
- `design-risk-register`、`design-review-workflow`：以實際來源列、編號與 mapping 取代高風險裝飾，並用 fresh screenshot／behavior／mobile 做第二輪檢查。

## Static local gates

在 `/Users/tommy/Documents/ChatGPT/Github Sar 養成計劃` 執行：

- `npm test`：4 test files、9 tests passed，exit 0。
- `npm run lint`：TypeScript no emit，exit 0。
- `npm run build`：Vite production build 成功，exit 0。
- `git diff --check`：exit 0。

這些 gate 證明型別、deterministic domain tests、production build 與 patch whitespace 沒有回歸；不等同於 hosted、真人、跨瀏覽器或螢幕閱讀器證據。

## Fresh local browser evidence

環境：local Vite `http://127.0.0.1:5179/`；Playwright CLI bundled browser fallback。這不是 Codex Chrome Extension、既有 Chrome profile 或 screen-reader sign-off。browser session：`pm-signal-ledger-20260815`。

### Covered behavior

- fresh first-run：重新整理後仍是空工作區；第一個鍵盤 Tab 落在 `跳到主要內容`。
- loading／loaded：從 first-run 觸發 `載入範例資料`，載入後保留 local-only boundary，出現 4 筆 evidence。
- source ledger：1440×900 loaded capture `.playwright-cli/source-ledger-loaded-1440.png`；讀到 `來源帳頁／逐筆回看`、來源 `01`–`04`、`原話`、各筆 source identity 與日期。
- expanded source：第一筆展開後讀到 `原文摘錄` 與 `原始內容保留於目前試用 · 來源 01`；收起後內容消失，控制項 `aria-expanded` 同步更新。
- verify mapping：進入 `核對` 後，判斷展開層讀到 `來源 01`、`來源 02` 與 `來源 03`、`來源 04` 的對照；沒有把 `evidence-*`／`claim-*` 內部 id 當成可見文案。
- human action：對第二個判斷按 `保留為假設`，notice 讀到 `已保留為假設；它不會被當成已驗證結論。`。
- recovery／empty：重設資料後回到 first-run；在沒有 evidence 時嘗試進入 `核對`，notice 讀到 `先載入範例資料或新增一筆訊號，才有內容可以核對。`。
- responsive：390×844、768×900 與 1440px local checks 的 `document.documentElement.scrollWidth` 分別等於 viewport width；390px 展開來源後仍 `overflow: false`。手機 capture 為 `.playwright-cli/source-ledger-loaded-390-top.png` 與 `.playwright-cli/source-ledger-section-390.png`。
- trust copy scan：頁面 body 不含 `model quality`、`模型品質`、`AI 會替你決定`、`信心分數` 或 `正在思考`；visible body 不含內部 evidence／claim ids。
- browser console：fresh session `console error` 回報 Total messages `3`，Errors `0`、Warnings `0`；目前訊息只有 React DevTools development notice。

### Visual judgment

人工檢查 1440×900 與 390×844 capture：來源編號成為讀取欄，不靠彩色卡片或狀態 pill 搶注意力；desktop 保留 evidence spine 與右側 margin note，mobile 轉成單欄並保留來源編號、44px 操作與 sticky action。這是 owner-run visual judgment，不是非 owner usability 結果。

## Hosted gate and release decision

本檔案建立時尚未 push 本輪變更，因此以下項目保持 `未執行`：

- GitHub Actions CI 對本輪 commit：未執行。
- GitHub Pages deploy 對本輪 commit：未執行。
- canonical URL `https://asdc163.github.io/pm-signal-lab/` 的 fresh hosted 1440／390 smoke：未執行。
- GitHub API public snapshot、stars、forks、issue comments 與真人 PM session：未作為本輪成功指標。

在 hosted gate 完成前，release decision 是 `hold for hosted verification`，不是「完全沒問題」或「已爆紅」。若 hosted smoke 失敗，先停止宣稱 release，依 failure layer 回到本機重現；若需回滾，可回到 `eda7f69f13ea122339d46b276754a3181d07541b`。本輪沒有 migration、dependency、provider、secret 或 database write。

## Not covered

- Codex Chrome Extension、既有 Chrome profile、Chrome／Firefox／Safari 完整矩陣。
- VoiceOver、NVDA、TalkBack、實際 screen-reader announcement、real iOS／Android device、virtual keyboard、native share／download。
- 非 owner PM session、外部 tester feedback、task success、retention、traffic、qualified star、adoption、model quality、production readiness。
- GitHub 帳號或 repository 的 10,000 stars outcome；本輪沒有也不會用腳本灌星、互讚、追蹤、DM、mass reply 或偽造 metrics。

這些是尚未取得正確層級證據的範圍，不是反向宣稱產品有問題或沒問題。下一個 promotion gate 是 hosted smoke 通過後，讓非 owner PM 真的完成五分鐘任務，留下可審查且不含私密資料的回報，再依卡點修正並重跑相同 evidence loop。
