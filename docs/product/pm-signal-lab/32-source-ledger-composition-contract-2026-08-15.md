# PM Signal Lab：Source Ledger Composition Contract — 2026-08-15

狀態：implementation contract；不是 release、usability 或 adoption 證明<br>
產品：PM Signal Lab<br>
目前 rollback point：[`eda7f69`](https://github.com/asdc163/pm-signal-lab/commit/eda7f69f13ea122339d46b276754a3181d07541b)

## Problem frame

- **User/job：** PM 載入一組產品訊號後，要先看懂「這句話來自哪裡、何時被記下、原文怎麼說」，再決定是否值得形成判斷。
- **Current state：** 目前的暖紙張、serif display、evidence spine 與 margin note 已經有研究工作紙的方向；但 loaded／verify 的來源仍主要靠小型 metadata、圓點與右欄狀態堆疊，來源本身不是第一讀。這會讓畫面退回通用的 AI／ops workbench 感。
- **Decision：** 將 `Evidence` 重排為有編號的 source ledger，讓來源身分、日期、原文與 `查看來源` 成為主要閱讀路徑；在 `Claim` 展開內容中用可對照的來源編號把判斷接回證據。
- **Outcome metric：** sample 載入後的 5 秒理解測試中，使用者可以從畫面回答：目前有幾筆來源、第一筆來自哪一類／哪個紀錄、原文在哪裡展開、下一步要做什麼。這是 owner-run comprehension oracle，不是真人 usability 結果。
- **Constraints：** 不更動 evidence／claim data model、event name、CTA action、privacy boundary、local-only behavior、workflow state 或 external side effect；只調整 source／claim 的 DOM 結構與 CSS hierarchy。
- **Out of scope：** 不新增 AI provider、模型輸出、搜尋、排序、持久化、analytics、登入、GitHub mutation、3D、gradient、glass、orb、heavy animation 或 screen-reader sign-off。

## Problem-solving frame

### Issue tree

1. **Product truth：** 來源、日期、source identity 與原文是否比狀態 chrome 更容易被看見？
2. **Composition：** loaded／verify 是否有單一路徑：來源編號 → 原文 → 暫定判斷 → 下一個動作？
3. **Typography／surface：** source ledger 是否用 type scale、divider、alignment spine 取代 card soup，而不靠裝飾填空？
4. **Responsive／accessibility：** 編號、長中文、source URL、展開控制與 mobile sticky CTA 是否仍可讀、可操作、可恢復？

### Working hypothesis

目前最需要修的不是再加一個「智慧」功能，而是把真正的 domain object 放回視覺中心。如果來源變成有索引的帳頁，AI／dashboard 的抽象感會下降，PM 也會更快知道下一步不是相信系統，而是回看一筆具體證據。

**Kill criteria：** 若編號讓 source／claim 對照更難掃描、手機折行失控、focus path 變差，或 1440px screenshot 仍只剩裝飾而沒有更清楚的來源閱讀路徑，回退到 `eda7f69`，不保留這個方向。

## KB Application Contract

### Relevant KB

設計理由：本輪每一條 KB 原則都必須落到來源欄位、閱讀路徑、文字層級、狀態行為或驗證 oracle；只引用風格名稱而不改變實作，不算使用知識庫。

這一輪不是把 KB 當成風格詞彙，而是讓每份原則改變具體 surface：

- `foundations/design-rule-hierarchy.md`：Quality Rules 優先於 taste；先保留 heading、focus、responsive、error/recovery 與 trust，再用 project style 改 source hierarchy。取捨是少一點裝飾性自由，換取更快的 evidence scanning。
- `foundations/product-craft-anti-ai-slop-operating-system.md`：用 subject specificity、product truth 與 provenance 取代 generic AI workbench；`Evidence`、source id、日期與原文是這個產品的視覺主體。取捨是介面更像專業工作紙，少一點通用 SaaS 的即時感。
- `foundations/aesthetic-taste-system.md`：card everywhere／fake sophistication 的修法是 row、divider、真實資料、穩定 surface；因此不新增背景特效，只提高 source row 的內容密度與節奏。
- `foundations/design-composition-layout.md`：用 first read／second read、alignment spine、proximity、continuity 與 source-to-claim reading path 重排；編號成為對齊骨架，不是裝飾 badge。
- `foundations/design-typography.md`：遵守繁中 body 16px 左右、caption 14px 左右、長中文可讀與英數混排；source id／日期退到 metadata，不與原文搶權重。
- `foundations/design-tokens.md` 與 `foundations/web-design-system-playbook.md`：只使用現有 semantic color、4／8px rhythm、border-first elevation 與可重複的 list pattern，不為一次性頁面新增任意 palette／radius。
- `foundations/ai-native-ux-operating-system.md`：`provenance before persuasion`；來源 identity、時間、限制與可回看控制要先於任何 system status。這個 v0 仍然 deterministic，不新增模型 activity。
- `foundations/anti-ai-writing-tells.md`：將抽象的「訊號整理」語言換成 `來源帳頁`、`來源 01`、`原文摘錄` 等具體工作物件；避免再寫一層平均化的 AI 產品說明。
- `foundations/design-risk-register.md`：本輪拒絕 bento、glass、gradient、orb、3D、cursor 與 heavy motion；低風險替代是 actual evidence row、numbered index、ruled divider 與 source detail。
- `foundations/design-review-workflow.md`：用 1440／768／390 screenshot、normal／expanded／error／recovery behavior 與第二輪 layout audit 驗證，而不是只看 CSS diff。

## Product Craft and Composition Contract

- **Product truth：** `Evidence` 是原文、來源、類型、觀察日期與可回看的限制；`Claim` 是需要人確認的暫定判斷。兩者的關係本身就是產品價值。
- **Selected direction：** research folio 的 source ledger；讓每筆來源像一頁研究帳，不像系統自動生成的 insight card。
- **Rejected direction：** 以 status badge、AI score、confidence ring、gradient panel 或更多 KPI chrome 增加「智慧感」；這些都沒有目前的 evidence 支持。
- **Signature detail：** `來源 01 / 02 / 03` 的窄索引與連續 evidence spine，讓 PM 能用編號把 source 與 claim 對回去。
- **No-AI-feel guard：** source identity、日期、原文與 limitation 必須比抽象 status 更先被看見；不新增「智慧」「自動」「洞察」等能力宣稱。

### Composition Brief

- **First read：** 來源帳頁的編號、來源類型／紀錄與一句原文。
- **Second read：** 日期、source id、限制與可展開的原文 detail。
- **Primary action：** `查看來源`；在 verify 狀態則是打開一筆 claim 並選擇 `採用這個判斷`／`保留為假設`。
- **Content relationship：** ledger row → source detail → claim mapping → next action。
- **Density：** desktop medium-high；mobile single-column medium，保留 metadata 與原文的呼吸。
- **Alignment spine：** source number → evidence spine → source text → right-side date/action；claim detail 使用同一套來源編號。
- **Layout archetype：** annotated research ledger + margin note；不是 card grid、metric dashboard 或 prompt workspace。
- **Responsive reflow：** desktop index／spine／content／action；mobile index／content／action 依序堆疊，`查看來源` 仍保留 44px 操作區。
- **What not to use：** filled status wall、nested cards、fake progress、decorative AI activity、glass／gradient／orb。

## UX states and acceptance oracles

| State | User question | Acceptance oracle |
|---|---|---|
| First-run／empty | 我先要放什麼？ | 原有 sample quote、唯一主要 CTA 與 empty recovery 不變；source ledger 不會在沒有資料時假裝有內容 |
| Loading | 發生什麼事？ | 原有 loading state、`aria-busy`、短暫 progress feedback 不變；不新增 fake thinking |
| Loaded／collect | 這些來源是什麼？ | 4 筆 source row 有穩定編號、類型、source identity、日期、原文 preview；`查看來源` 可展開 |
| Expanded source | 原文在哪裡？ | detail 仍保留原文、source id、local-only boundary；收起後 focus 與閱讀位置可恢復 |
| Verify／claim | 判斷依據是哪幾筆？ | claim 顯示來源數；展開後每個 mapped source 有可對照的 source number、identity、日期與原文 |
| Error／recovery | 資料不完整怎麼辦？ | missing source、空白編輯、privacy error 的 literal copy／recovery action 不被改壞 |
| Mobile／keyboard | 我能不能用手指或鍵盤走完？ | 390px 無 horizontal overflow；source／claim controls 至少 44px；focus ring 可見；sticky action 不遮內容 |
| Trust | 系統是否替我下結論？ | source／limitation／human approval 仍可見；不新增 model score、confidence 或 adoption claim |

## UX/AI/security gate

- **First-time／empty／loading：** first-run 的 sample quote、empty action 與 loading `aria-busy` 保持原樣；source ledger 只有在真的有 evidence 時才顯示編號，不能用 placeholder 假裝資料。
- **Error／recovery：** `查看來源`、收起來源、claim 編輯空白、缺少證據與 privacy error 都要保留原有 recovery action；來源編號不能取代 literal error 或讓使用者重新開始。
- **Mobile／accessibility：** 390／768／1440 都要測；長中文、英文 source id、URL、focus、keyboard、44px controls、heading／landmark／aria-expanded 不能因新欄位而退化。
- **Trust／AI：** provenance、日期、限制與 human approval 先於任何 status；不新增 model score、AI activity、secret、permission、外部傳送或自動 mutation。
- **Index boundary：** `sourceIndex`／`claimIndex` 是目前工作區資料順序的 deterministic folio；新增或排序訊號可能重排編號，這一輪不宣稱 durable source identity 或跨 session reference。

## Execution Contract

- **Modify：**
  - `src/App.tsx`：`CollectView`、`EvidenceRow`、`VerifyView`、`ClaimRow` 的 source／claim index 與 literal ledger labels。
  - `src/styles.css`：source ledger grid、index／spine、metadata hierarchy、mobile reflow；只沿用現有 tokens。
  - `DESIGN.md`：source ledger signature、composition、component state 與 QA rule。
  - `CHANGELOG.md`：記錄本輪是 evidence hierarchy／visual polish，不宣稱 usability、AI quality、adoption 或 stars。
  - `README.md`：公開 audit index。
- **Create：** `docs/product/pm-signal-lab/33-source-ledger-composition-release-audit-2026-08-15.md`。
- **Test／observe：** existing `npm test`、`npm run lint`、`npm run build`、`git diff --check`；fresh Playwright local／hosted screenshots and visible behavior。
- **Task sequence：**
  - [x] Step 1：在 `EvidenceRow` 傳入 deterministic current-pack `sourceIndex`，畫面顯示 `來源 01` 等可掃描索引；Observed：4 筆 sample 每筆都有唯一索引，source identity／date／preview 仍存在。
  - [x] Step 2：在 `ClaimRow` 傳入 deterministic current-pack `claimIndex`，mapped source 顯示對應 source index；Observed：展開 claim 後能從 claim 反向回看來源，accept／keep／edit／missing 行為未改動。
  - [x] Step 3：用 existing semantic tokens 重排 ledger 的 typography、divider、spine 與 mobile grid；Observed：沒有新增 card soup 或 trend decoration，390／768／1440 均無 horizontal overflow。
  - [x] Step 4：更新 `DESIGN.md`、`CHANGELOG.md`、`README.md`，建立 release audit；Observed：文件記錄 KB decision、exact evidence 與 not covered，沒有把 local proof 寫成 adoption／stars success claim。
  - [x] Step 5：local browser 重跑 first-run、loading、loaded、expanded source、verify、claim mapping、empty/recovery、keyboard 與 390／768／1440 checks；Observed：正常與 friction path 可操作，console errors／warnings 為 0。
  - [x] Step 6：push 後等待 CI／Pages，fresh hosted browser 重跑 loaded／expanded／verify mapping 與 390px smoke；Observed：CI `31849156344`、Pages `31849156352` 對 exact SHA `e3373c20ae4ab1c0305b78da040b4047b473b706` 成功，canonical HTTP `200`、hosted copy／layout 與 local evidence 一致，`HEAD` 與 `origin/main` 相同。
- **Verification gate：** KB plan score ≥85；static gates exit 0；visual screenshot review；behavior matrix；no overflow；focus／touch target spot check；hosted smoke。
- **Rollback：** revert the copy／composition commit to `eda7f69`; no migration, dependency, provider, secret or data rollback required。

## Not covered

- 真實非 owner PM 的 5 秒理解與任務成功；本輪的 outcome metric 只是 owner-run oracle。
- Codex Chrome Extension／既有 Chrome profile、VoiceOver、NVDA、TalkBack、real iOS／Android device、完整 browser matrix。
- source quality、claim correctness、AI model quality、長期留存、traffic、adoption、GitHub stars 或 10,000-star outcome。
- 來源編號不是資料可信度分數，也不代表排序、重要性或模型信心。
