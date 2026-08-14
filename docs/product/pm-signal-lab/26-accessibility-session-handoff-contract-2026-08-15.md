# PM Signal Lab：Accessibility And Session Handoff Contract — 2026-08-15

狀態：下一個可逆 accessibility／session acquisition slice；不把 semantic fallback 寫成 Chrome Extension 或 screen-reader sign-off
產品：PM Signal Lab
決策類型：two-way door；只補 semantic landmarks、live status、focus context、mobile action naming 與試用入口文件，不改 domain model、資料邊界或外部 API。

## Problem Frame

- Decision：讓 keyboard-only 與 assistive-technology 使用者在同一條 PM 工作路徑中，知道目前在哪一頁、發生什麼事、錯誤怎麼修，以及 field note 何時已產生；同時把 public pilot 的第一個行動縮成一個可理解的 five-minute session。
- User/job：PM 想在不靠滑鼠或 maintainer walkthrough 的情況下，從一段來源走到一份可回看的 decision brief，並留下不含私密資料的試用觀察。
- Current friction：目前有 heading、label、`aria-describedby` 與 visible focus，但跨 step 的 status／feedback 更新和 mobile action 的 landmark 語意仍分散；公開 issue 有 invite，卻沒有任何外部 comment，表示入口仍只證明「存在」，不證明「有人完成」。
- Outcome metric：owner-run keyboard trace 能完成 sample → source → verify → edit error recovery → accept → decide → ship；所有動態結果都有可觀察 status／focus；public pilot copy 讓 tester 在一次 scroll 內找到 demo、任務與 privacy boundary。這些是產品可操作性指標，不是真人 usability 或 adoption 結果。
- Evidence boundary：目前可取得 local／hosted browser DOM、keyboard trace、screenshots、static gates、GitHub issue state；Chrome Extension control surface、實際 screen reader、非 owner session、issue comment、stars／adoption 仍未驗證。
- Constraints：繁體中文、保留 research notebook visual DNA、CJK 可讀性、44px target、390／768／1440 reflow、local-only、手動 GitHub handoff、沒有 provider／telemetry／external mutation。
- Out of scope：不加入 axe 依賴、登入、資料庫、analytics、模型、auto-submit issue、外部邀請 spam、star manipulation 或任何把未驗證 feedback 轉成成功率的計算。

## Product Scope

### Must have

- Main landmark 有清楚可讀的名稱，workflow top strip 是可辨識的 navigation region。
- `notice`、hero status、feedback output 與 loading state 具有正確的 live／busy semantics，且不重複播報整個大區塊。
- mobile sticky action 是獨立且有名稱的操作區；進入試用回報表單後暫時隱藏，避免固定列覆蓋表單欄位，也不讓輔助技術使用者把它誤認成頁面主要內容的第二份 copy。
- keyboard-only trace 能以 Tab／Shift+Tab／Enter／Space 完成主要 happy path 與 claim edit error recovery；focus 不被 sticky action 或動態內容遮住。
- public session kit、README、pilot issue 使用同一組 literal 任務語言：`載入範例資料`、`查看來源`、`開始核對`、`採用這個判斷`、`整理一次試用`。

### Nice to have

- 產生 field note 後，視覺與 live status 都能告訴使用者「先檢查，再手動送出」，但不自動開 issue。
- `prefers-reduced-motion` 與 keyboard trace 的 evidence 一起記錄，方便之後在可用 Chrome Extension 的 session 重跑。

### Should not build

- 不用「AI 助理」「智慧分析」「已完成驗證」等抽象 copy 代替 source、claim、limitation、human review。
- 不以 automated DOM checks 宣稱 VoiceOver／NVDA／TalkBack pass；不以 owner-run keyboard trace 宣稱真人 accessibility usability。

## Acceptance Criteria

- Landmark：`main` 有可辨識 label；mobile workflow strip 是 navigation region；sticky action 有 region label；既有 skip link 仍能落到 main。
- Status：sample loading 使用 `aria-busy`／polite status；notice 有 atomic live semantics；feedback output 產生後能被 assistive technology 發現，且不讀出整份 Markdown 作為 live announcement。
- Keyboard：fresh session 以鍵盤可到達 sample CTA；sample 完成後可到 source toggle、workflow `核對`、claim expand、`編輯判斷`、textarea、儲存／取消；空白儲存保留內容、顯示錯誤、focus 回 textarea；有效儲存後仍顯示需要人確認。
- Core transition：keyboard trace 可到 `安排`、`帶走`，且能產生 memo；privacy 未確認時 field note 不產生，確認後 output 有 `Not provided` 與手動送出 boundary。
- Mobile：390px 無 horizontal overflow；非回報表單狀態下 sticky action region 可被 focus；進入試用回報表單後固定列不渲染，表單控制項不被覆蓋；focus ring 可見且不被 fixed bar 遮住。
- Copy：pilot invite 不承諾 stars、adoption 或 AI quality；明確寫出五分鐘、不要貼 private data、回報具體卡點與 star 可選。
- Release：`npm test -- --run`、`npm run lint`、`npm run build`、`git diff --check` exit 0；local keyboard／mobile trace 有 fresh evidence；hosted smoke 仍 HTTP 200；Chrome／AT 未可用時維持 blocked。

## UX Flow And States

- First-time：skip link → main heading → sample CTA；使用者先知道工作物件與 privacy boundary。
- Loading：按 sample 後只播報真實載入狀態，不播 fake thinking；controls 不在未完成時被誤認成可用。
- Step change：workflow button 仍保留 current step、文字 label 與 `aria-current`；new content 由 heading／notice 提供 context，不靠顏色。
- Error/recovery：空白 claim edit 顯示 field error，焦點回 textarea，原文／source mapping／limitation 留在畫面；取消不改 claim。
- Feedback：產生 field note 後只 live announce short result；Markdown textarea 仍可由使用者手動閱讀、複製與檢查；GitHub link 明示開新分頁與人工送出。
- Mobile：fixed action 是 thumb-zone shortcut，但 main content 仍保留 bottom safe area；進入試用回報表單後固定列暫時隱藏，讓表單可以完整 scroll 與操作；Tab focus 到 fixed action 時不會被內容層蓋住。
- Trust：local-only、privacy checkbox、manual handoff 與 `Not provided` 維持 literal copy；不顯示 model confidence、AI activity 或 adoption count。

## Product Craft And No-AI-Feel Contract

### Product truth

- `Evidence`、quote、source、timestamp、`Claim`、limitation、`ExperimentBrief`、`DecisionMemo` 與 field note 是唯一的工作物件。
- Accessibility copy 只說「目前工作、錯誤、下一步、人工送出」，不新增抽象能力敘事。
- A clearer live region is a product affordance, not an AI personality layer；使用者仍要自己判斷、自己檢查與自己送出。

### Visual and copy guard

- 保留 research folio：paper ramp、flat row、ruled margin、serif display、one rust accent；只為 keyboard／AT 增加 focus 與 region clarity，不加 badge、glow、gradient 或 decorative AI cues。
- 用 `目前工作`、`試用回音`、`產生回報內容` 等現有 domain language；不把 accessibility status 改寫成「系統已替你完成」。
- 依 anti-AI writing 五步：刪掉泛用邀請與空泛 promise；換成五分鐘、具體按鈕、privacy prohibition；站在「star 可選，具體回饋更有用」的可反駁立場；亂開句型；讀出是否像 maintainer 真話。

## KB Application Contract

### Relevant KB

這些來源之所以適用，是因為本輪同時改變產品表面、鍵盤／輔助技術狀態、公開試用文案與 release evidence；每一項設計理由都要落到檔案、操作或驗證 oracle，而不是只作為風格引用。

- `foundations/design-brain.md`：用產品真相決定 semantic surface；因此 live region、landmark、focus 直接對應 source／claim／field note，而不是增加「AI helper」裝飾。Tradeoff 是不追求視覺新奇，優先讓使用者能回看與恢復。
- `foundations/design-rule-hierarchy.md`：quality rules 高於 taste；因此保留 44px target、visible focus、current step、mobile reflow、error/recovery 與 trust boundary，即使它們讓畫面少一點極簡感。
- `foundations/product-craft-anti-ai-slop-operating-system.md`：用 product truth、subject specificity、creative divergence 與 evidence gate；因此 session handoff 只收集可觀察的 hesitation、trust、recovery，不新增 AI capability claim。
- `foundations/design-composition-layout.md`：用 first read、proximity、alignment spine 與 mobile reflow；因此 sticky action 被命名為獨立 region，不能在視覺與語意上搶走 main workpaper 的 reading path。
- `foundations/anti-ai-writing-tells.md` + `foundations/product-messaging-copy-operating-system.md`：用刪／換／站／亂／讀與 claim ledger；因此 public invite 只承諾一個五分鐘 session、可選 star、具體回饋與 privacy boundary。
- `foundations/ai-native-ux-operating-system.md`：沒有 provider 就不展示 working／confidence／model activity；因此 status 只反映 UI state、human review 與 manual handoff。
- `foundations/behavioral-ux-qa-evidence-gate.md`：用 normal／friction／recovery、five-second comprehension、focus／mobile／trust evidence；因此 keyboard trace 會記錄可觀察 focus 與最後 control overlap，但仍把真人 AT 留為未驗證。

本合約的 KB 應用改變了三個決策：`aria` surface 要貼著 domain state、sticky action 要有獨立語意、public invite 要以可操作任務取代宣傳文案。它沒有把 fallback browser 結果升格成真人或 Chrome/AT 證據。

## Engineering Plan

### Files / surfaces

- Modify `src/App.tsx`：main／workflow／hero／notice／loading／feedback output／sticky action 的 semantic attributes、short live announcements、manual handoff link name；回報表單開啟時暫時隱藏 mobile action；不改 domain functions。
- Modify `src/styles.css`：focus visibility、live output non-disruptive visual treatment、sticky action focus／safe-area；不新增視覺語法。
- Modify `docs/operations/pm-session-kit.md`：把 keyboard／assistive-tech observation 與 field note boundary 寫成可照做的 session step。
- Modify `README.md`：在 public pilot path 旁清楚放 five-minute task、issue #4、star optional／feedback preferred、未驗證邊界。
- Create `docs/product/pm-signal-lab/27-accessibility-session-handoff-release-audit-2026-08-15.md` only after fresh evidence。

### Implementation sequence

- [x] Step 1：先檢查現有 DOM／state flow，列出需要補的 landmark、live、focus 與 link name；不改 domain。Evidence：本 contract 的 product scope 與 current-turn DOM readback。
- [x] Step 2：實作 scoped semantic attributes、live output 與 focus-safe CSS；保留現有 copy／visual DNA。Evidence：`src/App.tsx`、`src/styles.css`，並修正 mobile feedback form 的 fixed-action overlap。
- [x] Step 3：執行 static gates 與 fresh keyboard-only flow，記錄每個 focus transition、error recovery、mobile overlap 與 console/page errors。Evidence：本輪 local desktop／390 fallback trace 與 `27-accessibility-session-handoff-release-audit-2026-08-15.md`。
- [x] Step 4：更新 session kit、README、pilot issue copy；只做可回滾的 public pilot handoff，不自動送 issue 或聯絡陌生人。Evidence：session kit、README、`public-pilot-issue-body.md` 與 issue #4 readback。
- [x] Step 5：CI／Pages／canonical smoke 後建立 release audit；若 Chrome Extension／AT control surface 仍不可用，明確保持 blocked／未執行。Evidence：CI `31843521426`、Pages `31843521415`、hosted `200` 與 audit not-covered list。

## UX/AI/security gate

- UX gate：first-time、empty、loading、error、recovery、keyboard、mobile、sticky action、copy/export、feedback privacy 與 completion ending 都要有 visible／semantic result。
- AI gate：v0 沒 provider；不新增 fake progress、confidence、assistant voice、AI activity、model quality 或 adoption claim。
- Security gate：不新增 secret、token、permission、customer data、telemetry、external write；public field note 仍有 privacy checkbox、manual review、manual GitHub submit boundary。

## QA And Release

### Selected defect patterns

- DP-001：docs／hosted state must match final commit and canonical URL。
- DP-006：a visual focus fix must be operated with keyboard and mobile fixed bar，不能只看 CSS。
- DP-008：PM Signal Lab copy／brand／issue path 不能混入其他產品語法。
- DP-011：private star-growth plan 與 local fallback artifacts 不得進 public commit。
- DP-012：source／limitation／human review／privacy boundary must remain visible and announced。

### Behavior matrix

| Persona | Job | Starting state | Success signal | Failure signal | Evidence |
| --- | --- | --- | --- | --- | --- |
| keyboard-only PM | 完成一個 claim review | fresh empty | sample、source、核對、edit recovery、accept、memo 可完成 | focus lost、不可見、sticky overlap | keyboard trace + focused IDs + screenshots |
| low-vision / zoom user | 看懂 current step 與下一步 | loaded 390／zoom simulation | focus ring、heading、button label、no overflow | clipped label、fixed bar covers control | browser measurement + visual capture；AT 未執行 |
| cautious PM | 確認來源與 privacy | loaded ship | source／limitation／privacy block／manual handoff 可理解 | 把 field note 當自動送出或把 claim 當結論 | visible copy + notice + generated markdown |
| first-time pilot tester | 五分鐘知道要做什麼 | hosted empty | demo、任務、issue／field note path 清楚 | 需要 maintainer walkthrough、找不到回報 | README／issue／session kit |

### Not covered

- Codex Chrome Extension tab control、既有 Chrome profile、VoiceOver／NVDA／TalkBack、real device／virtual keyboard、非 owner session、issue comments、adoption、traffic、stars。
- 本輪可用的 Playwright／keyboard fallback 只能證明 DOM／焦點與可操作行為，不解除上述 blocked gate。

### Done definition

本 slice 只有在 code、docs、static gates、keyboard fallback、mobile overlap、hosted smoke、public pilot wording 與 not-covered list 都有 current-turn evidence 後才可記錄為 shipped；不能用 `aria` 文字或一張 screenshot 宣稱完整 accessibility 或真人 adoption。
