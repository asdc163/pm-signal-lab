# PM Signal Lab — Project Design System

## Product Frame

- Product type: local-first PM decision worksheet for evidence-to-decision work
- Target user: PM / founder / product engineer（作品集敘事聚焦 AI product management，但產品本身不假裝有外部模型）
- Primary action: 從 evidence pack 走到可審核、可匯出的 decision brief
- Brand mood: precise、calm、evidence-first、research-notebook editorial
- Platforms: responsive Web；v0 以 desktop workbench + mobile single-column recovery 為主

## Product truth and signature

The product is not a generic chat wrapper. Its domain objects are `Evidence`、`Claim`、`Opportunity`、`Experiment Brief`、`Decision Memo`、`Session Feedback Field Note` and `Not Covered`. The visual signature is an `Evidence spine`: sources and claims are visually connected so provenance is part of the layout, not a footnote.

## Selected DNA

以 `Pillow Fit` 的專業信任與低焦慮工具感為主，加入 `Altoslab` 的克制排版與 enterprise clarity；第二輪再收斂成 research notebook：紙張色 index rail、簡短 masthead、serif display heading、ruled margin 與 evidence spine，右欄是 margin note 而不是 dashboard metric rail。保留 source/provenance、可掃描 metadata、低誇張 motion；不複製任何專案的品牌、文字或程式碼，也不把 AI dashboard 的視覺語法當成主角。

## Principles

1. Evidence before persuasion：來源、時間、限制比「AI 認為」更重要。
2. One next action：每個 step 只突出一個 primary CTA。
3. State before decoration：first-time、empty、loading、error、recovery、approval 先成立。
4. Dense where it helps：evidence rows 可密集；decision memo 與說明文字保持呼吸。
5. Human owns the decision：AI 只提出候選，任何結論都有 `接受 / 編輯 / 保留為假設`。

## Composition Brief

- First read: `把一句話放回它的來源`、一段真實原文與 `載入範例資料`；五秒內先理解工作紙的任務，再看 route／current step。
- Second read: evidence/claim rows 與 source mapping。
- Primary action: 依 step 的單一 CTA。
- Content relationship: flow + evidence + decision，使用 stepper、row、split pane、definition list，少用 card。
- Density: desktop medium-high / mobile stacked medium。
- Alignment spine: masthead → page title → evidence spine；右欄以同一條 vertical rule 對齊。
- Layout archetype: `research folio + index strip + annotated workpaper + margin note`；右欄是工作註記，不是 dashboard metric rail。
- Responsive reflow: rail → top stepper；right context → below main; CTA → sticky bottom action。
- First-run gesture: hero 用具體的 source-to-decision copy 報告工作；中央 folio 顯示一段原文與唯一主要 CTA；右側 margin note 提供下一步說明，不重複一顆按鈕。
- Loaded-work gesture: pack 存在後，hero 轉成較密的 workbench masthead，讓 evidence／claim section 更早進入首屏；這是由真實 domain state 驅動的密度變化，不是 loading／AI activity 動畫。
- Feedback gesture: decision brief 之後才出現低干擾的 field note；它整理人的試用經驗，不預測感受、不讀取原始 evidence，也不代替使用者送出 issue。

## Selected visual concept

- Desktop first-run reference: `docs/product/pm-signal-lab/assets/qa/notebook-shell-first-run-1440.png`；本輪 density evidence 另見 `docs/product/pm-signal-lab/assets/qa/density-transition-first-run-1440.png`、`density-transition-loaded-1440.png` 與 `density-transition-loaded-390.png`；第二輪 shell contract 在 `docs/product/pm-signal-lab/22-research-notebook-shell-reframe-contract-2026-08-15.md`。
- The concept is a direction anchor, not a pixel-perfect generated asset: keep the folio/workpaper/margin-note relationship, but implement exact product states, semantic controls, responsive behavior, and source trust details in React/CSS。
- Deliberate correction during the second polish: reject the dark SaaS shell, icon-first context rows, pill-like status wall and generic hero language; the first-run page shows an actual source preview and one recoverable task。

## Tokens

### Color

- `--shell`: `#e8dfd2` — paper index rail
- `--shell-surface`: `#f5eee3`
- `--workspace`: `#f1ebe1` — warm paper workspace
- `--surface`: `#fbf7ef`
- `--ink`: `#28251f`
- `--muted`: `#6d6a63`
- `--line`: `#ddd3c5`
- `--accent`: `#b8643d` — clay, CTA/current step only
- `--accent-soft`: `#f6e5d8`
- `--trust`: `#2f6971` — source/context
- `--trust-soft`: `#e4f0ef`
- `--success`: `#2e7255`
- `--warning`: `#9a681f`
- `--danger`: `#ad4b3f`
- `--focus`: `#2f6971`

Brand/accent color should remain a signal, roughly 5–10% of a screen. Status uses text + icon/shape, never color alone.

### Typography

```css
font-family: "Noto Sans TC", "PingFang TC", Inter, "Microsoft JhengHei", system-ui, sans-serif;
font-family-display: "Noto Serif TC", "Songti TC", "STSong", serif;
font-family-mono: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
```

- Hero/tool title: 28px / 1.3
- Section: 24px / 1.3
- Card/row title: 18px / 1.3
- Body: 16px / 1.6
- Caption/metadata: 14px / 1.5
- Tag: 12px / 1.4
- Traditional Chinese body must not use negative letter spacing.

### Spacing / radius / elevation

- Primitive: 4px; layout rhythm: 8px.
- Main gaps: 12 / 16 / 24 / 32 / 48.
- Control radius: 3px; panel radius: 0；status uses text + underline/divider instead of default pill surfaces；shadow only for menus/dialogs/sticky action.
- Default elevation: border + surface; shadow only for menus/dialogs/sticky action.

## Components and states

- Button: primary / secondary / ghost / danger; default / hover / active / focus / disabled / loading.
- Stepper: current / completed / available / blocked; semantic `aria-current`.
- Evidence row: deterministic current-pack source folio (`來源 01`), type, timestamp, source identity, original-phrase preview, and expanded source detail.
- Claim row: status text/icon, claim folio, evidence spine, source references that reuse the source folio, accept/edit/flag actions.
- Status marker: `有來源支持` / `需要你確認` / `缺少證據` with text, icon when useful, and underline/divider rather than a filled pill.
- Alert/toast: success / warning / error / recovery action; `role=status` or `role=alert` by severity.
- Notice：工作紙上的狀態回饋使用透明底、上下 ruled divider、icon 與 tone-specific 左線；不使用整塊彩色提示卡，避免把 UI state 做成 dashboard status wall。
- Human-owned trust copy：可見 boundary 以來源、判斷、限制、下一步與「由你確認」為主詞；不把「模型品質」當成畫面上的自我辯護標語。local-only、privacy、外部採用未驗證等限制仍要保留。
- Textarea/form: visible label, helper, `aria-describedby`, field-level error, preserved input on error；claim editor inline 呈現在 source／limitation 之後，不使用 native prompt。
- Decision preview: definition list + source references + not-covered block + copy/download actions.
- Session feedback field note: collapsed invitation → labelled local form → privacy gate → editable Markdown preview → manual GitHub handoff；不使用分數、AI insight 或自動提交狀態。
- Skeleton/empty/error: no blank content; each state contains the next action.

## Responsive rules

- `<640px`: one column; top horizontal stepper; rows stack; buttons full-width when primary; sticky bottom action with safe area；inline claim editor controls 維持至少 44px。
- `640–1024px`: two-column where possible; decision context moves below main content; rail collapses.
- `>1024px`: persistent workflow rail; central workbench; right context rail; max content width 1440px.
- Touch targets at least 44×44px; no hover-only action; long source URLs wrap or become copyable code-like rows.

## Motion

- 150–200ms for color/border/focus feedback; 200–300ms for drawers/dialogs.
- Synthesis uses activity summary rows, not fake typing or chain-of-thought.
- `prefers-reduced-motion: reduce` disables non-essential transitions.

## Reference distillation and rejected elements

- Accepted decisions: literal first-run promise, quickstart/demo/proof, documentation/community path, multi-adapter readiness, source/eval/observability language — derived from the 1,042-repo research and official GitHub/MCP trend sources.
- Rejected: generic purple/blue gradient hero, abstract orb/blob, glass background, bento feature wall, progress/KPI chrome that is not product proof, dark tiny-text default, copied README/brand assets, unverified “production-ready” or “viral” claims.
- Low-risk alternative for trend decoration: actual evidence rows, source links, a deterministic sample output, status spine, and annotated decision memo.
- Copy treatment: Chinese first, sentence-case labels, and literal verbs; English remains only where it helps a PM move an artifact into an existing workflow.
- No-AI feel pass: 不用 `engine`、`live` 或抽象能力標籤做產品主角；fixture source 以訪談紀錄、客服信箱、產品觀察與競品拆解等可回看的物件命名。
- Notice pass：載入、採用、匯出與 privacy／validation feedback 都回到 ruled annotation 語法；狀態靠 literal copy、icon、語意色線與 recovery action 傳達，不靠彩色卡片或 fake activity。
- Copy pass：不重複「不代表模型品質」這類 defensive disclaimer；改用「這張紙只保留來源、判斷與下一步；最後由你決定是否採用」等可行動、可回看的語言，並保留真正的 evidence boundary。

## AI-native states and trust

`first read → source review → human decision → experiment brief → memo preview → export completed → human feedback field note → manual handoff → recovery`。

The UI must show source identity, timestamp/freshness, limitations, manual edit, approval boundary, and fallback. Provider/engine language is kept out of the main surface because v0 is deterministic and local-first; human-owned decision language stays visible, and no external side effect is present.

## QA rules

- Build/typecheck/lint/test before visual completion.
- Screenshot review at 390×844、768×1024、1440×900。
- Behavior matrix covers first-time、empty、loading、error、recovery、success、mobile、keyboard、long Traditional Chinese。
- Do a second polish pass for hierarchy, spacing, container count, focus visibility, sticky CTA overlap, and status color independence.
- Loaded-state density check: first-run 保留 editorial cover；sample 載入後縮短 masthead，但仍保留 current step、source／limitation、human review 與 local-only boundary。這項 owner-run layout observation 不等同於真人 usability 或 adoption 證據。
- Feedback field note must be checked for empty-field honesty, privacy confirmation, editable output, manual-submit boundary, and mobile form length.
- The second polish pass also checks that the surface reads as a research notebook rather than an AI dashboard: no dark SaaS shell, no icon-first context wall, no generic hero promise, no decorative hamburger on desktop, no generic event names, and no status pill used where a divider or text label is enough.
- The current shell reframe is recorded in [`22-research-notebook-shell-reframe-contract-2026-08-15.md`](./docs/product/pm-signal-lab/22-research-notebook-shell-reframe-contract-2026-08-15.md); it is a visual/product hypothesis, not a claim of complete usability or adoption.
- The loaded-state density decision and fresh hosted evidence are recorded in [`24-workbench-density-transition-contract-2026-08-15.md`](./docs/product/pm-signal-lab/24-workbench-density-transition-contract-2026-08-15.md) and [`25-workbench-density-transition-release-audit-2026-08-15.md`](./docs/product/pm-signal-lab/25-workbench-density-transition-release-audit-2026-08-15.md); they are not claims of complete usability, adoption, or star growth.
- The current visual reframe is recorded in [`15-visual-product-reframe-contract-2026-08-15.md`](./docs/product/pm-signal-lab/15-visual-product-reframe-contract-2026-08-15.md); it is a decision-worksheet direction, not a claim of complete usability or adoption.
- The notice annotation polish is recorded in [`28-notice-annotation-visual-polish-contract-2026-08-15.md`](./docs/product/pm-signal-lab/28-notice-annotation-visual-polish-contract-2026-08-15.md); its release evidence will name the exact visual and behavioral coverage rather than claim a full accessibility or adoption pass.
- The human-owned trust copy pass is recorded in [`30-human-owned-trust-copy-contract-2026-08-15.md`](./docs/product/pm-signal-lab/30-human-owned-trust-copy-contract-2026-08-15.md); it changes visible wording only and does not claim complete AI UX, accessibility, adoption, or star growth.
- The source-ledger composition pass is recorded in [`32-source-ledger-composition-contract-2026-08-15.md`](./docs/product/pm-signal-lab/32-source-ledger-composition-contract-2026-08-15.md) and its release evidence in [`33-source-ledger-composition-release-audit-2026-08-15.md`](./docs/product/pm-signal-lab/33-source-ledger-composition-release-audit-2026-08-15.md); source numbering and mapping are product-specific provenance cues, not decorative trend treatment or adoption evidence.
- Fresh QA captures: [`first-run 1440`](./docs/product/pm-signal-lab/assets/qa/notebook-shell-first-run-1440.png)、[`first-run 768`](./docs/product/pm-signal-lab/assets/qa/notebook-shell-first-run-768.png)、[`first-run 390`](./docs/product/pm-signal-lab/assets/qa/notebook-shell-first-run-390.png)、[`verify 1440`](./docs/product/pm-signal-lab/assets/qa/notebook-shell-verify-1440.png)、[`verify 390`](./docs/product/pm-signal-lab/assets/qa/notebook-shell-verify-390.png)。
- Document any exception to this system in the feature UX spec and release evidence.
