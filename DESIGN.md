# PM Signal Lab — Project Design System

## Product Frame

- Product type: local-first PM decision worksheet for evidence-to-decision work
- Target user: PM / founder / product engineer（作品集敘事聚焦 AI product management，但產品本身不假裝有外部模型）
- Primary action: 從 evidence pack 走到可審核、可匯出的 decision brief
- Brand mood: precise、calm、evidence-first、slightly editorial
- Platforms: responsive Web；v0 以 desktop workbench + mobile single-column recovery 為主

## Product truth and signature

The product is not a generic chat wrapper. Its domain objects are `Evidence`、`Claim`、`Opportunity`、`Experiment Brief`、`Decision Memo`、`Session Feedback Field Note` and `Not Covered`. The visual signature is an `Evidence spine`: sources and claims are visually connected so provenance is part of the layout, not a footnote.

## Selected DNA

以 `Pillow Fit` 的專業信任與低焦慮工具感為主，加入 `Altoslab` 的克制排版與 enterprise clarity；深色 workflow rail 只作為導航簽名，中央畫面維持暖紙張與 evidence desk 的閱讀節奏。保留 source/provenance、可掃描 metadata、低誇張 motion；不複製任何專案的品牌、文字或程式碼，也不把 AI dashboard 的視覺語法當成主角。

## Principles

1. Evidence before persuasion：來源、時間、限制比「AI 認為」更重要。
2. One next action：每個 step 只突出一個 primary CTA。
3. State before decoration：first-time、empty、loading、error、recovery、approval 先成立。
4. Dense where it helps：evidence rows 可密集；decision memo 與說明文字保持呼吸。
5. Human owns the decision：AI 只提出候選，任何結論都有 `接受 / 編輯 / 保留為假設`。

## Composition Brief

- First read: `先看來源，再決定下一步`、`來源 → 判斷 → 驗證` route、current step、sample/workspace status；首屏只保留中央試用任務的主要 CTA。
- Second read: evidence/claim rows 與 source mapping。
- Primary action: 依 step 的單一 CTA。
- Content relationship: flow + evidence + decision，使用 stepper、row、split pane、definition list，少用 card。
- Density: desktop medium-high / mobile stacked medium。
- Alignment spine: workflow rail → central workbench → decision context rail。
- Layout archetype: `sidebar + workbench split-pane + decision rail`。
- Responsive reflow: rail → top stepper；right context → below main; CTA → sticky bottom action。
- First-run gesture: hero 只報告 `這一頁的進度` 與資料邊界，中央 field note 承擔開始試用；右側空狀態提供下一步說明，不重複一顆按鈕。
- Feedback gesture: decision brief 之後才出現低干擾的 field note；它整理人的試用經驗，不預測感受、不讀取原始 evidence，也不代替使用者送出 issue。

## Selected visual concept

- Desktop first-run reference: `docs/product/pm-signal-lab/assets/qa/visual-reframe-first-run-1440.png`；方向概念仍保留在 `docs/product/pm-signal-lab/assets/concept-desktop.png`。
- The concept is a direction anchor, not a pixel-perfect generated asset: keep its shell/workbench/decision-rail hierarchy, but implement exact product states, semantic controls, responsive behavior, and source trust details in React/CSS。
- Deliberate correction during generation: reject invented dashboard metrics and project KPIs; v0 opens with an honest `0 / 4` first-run state and only introduces evidence-derived content after the user loads the fixture。

## Tokens

### Color

- `--shell`: `#1c2521` — deep green graphite shell
- `--shell-surface`: `#27342e`
- `--workspace`: `#f3efe7` — warm paper workspace
- `--surface`: `#fffdf8`
- `--ink`: `#202824`
- `--muted`: `#68736c`
- `--line`: `#ded8ca`
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
- Control radius: 6px; panel radius: 0–9px，依狀態分組需要使用；pill only for compact status tags.
- Default elevation: border + surface; shadow only for menus/dialogs/sticky action.

## Components and states

- Button: primary / secondary / ghost / danger; default / hover / active / focus / disabled / loading.
- Stepper: current / completed / available / blocked; semantic `aria-current`.
- Evidence row: source badge, type, timestamp, status, content preview, expanded source.
- Claim row: status text/icon, evidence spine, source references, accept/edit/flag actions.
- Status badge: `有來源支持` / `需要你確認` / `缺少證據` with text and icon.
- Alert/toast: success / warning / error / recovery action; `role=status` or `role=alert` by severity.
- Textarea/form: visible label, helper, `aria-describedby`, field-level error, preserved input on error.
- Decision preview: definition list + source references + not-covered block + copy/download actions.
- Session feedback field note: collapsed invitation → labelled local form → privacy gate → editable Markdown preview → manual GitHub handoff；不使用分數、AI insight 或自動提交狀態。
- Skeleton/empty/error: no blank content; each state contains the next action.

## Responsive rules

- `<640px`: one column; top horizontal stepper; rows stack; buttons full-width when primary; sticky bottom action with safe area.
- `640–1024px`: two-column where possible; decision context moves below main content; rail collapses.
- `>1024px`: persistent workflow rail; central workbench; right context rail; max content width 1440px.
- Touch targets at least 44×44px; no hover-only action; long source URLs wrap or become copyable code-like rows.

## Motion

- 150–200ms for color/border/focus feedback; 200–300ms for drawers/dialogs.
- Synthesis uses activity summary rows, not fake typing or chain-of-thought.
- `prefers-reduced-motion: reduce` disables non-essential transitions.

## Reference distillation and rejected elements

- Accepted decisions: literal first-run promise, quickstart/demo/proof, documentation/community path, multi-adapter readiness, source/eval/observability language — derived from the 1,042-repo research and official GitHub/MCP trend sources.
- Rejected: generic purple/blue gradient hero, abstract orb/blob, glass background, bento feature wall, dark tiny-text default, copied README/brand assets, unverified “production-ready” or “viral” claims.
- Low-risk alternative for trend decoration: actual evidence rows, source links, a deterministic sample output, status spine, and annotated decision memo.
- Copy treatment: Chinese first, sentence-case labels, and literal verbs; English remains only where it helps a PM move an artifact into an existing workflow.
- No-AI feel pass: 不用 `engine`、`live` 或抽象能力標籤做產品主角；fixture source 以訪談紀錄、客服信箱、產品觀察與競品拆解等可回看的物件命名。

## AI-native states and trust

`first read → source review → human decision → experiment brief → memo preview → export completed → human feedback field note → manual handoff → recovery`。

The UI must show source identity, timestamp/freshness, limitations, manual edit, approval boundary, and fallback. Provider/engine language is kept out of the main surface because v0 is deterministic and local-first; no external side effect is present.

## QA rules

- Build/typecheck/lint/test before visual completion.
- Screenshot review at 390×844、768×1024、1440×900。
- Behavior matrix covers first-time、empty、loading、error、recovery、success、mobile、keyboard、long Traditional Chinese。
- Do a second polish pass for hierarchy, spacing, container count, focus visibility, sticky CTA overlap, and status color independence.
- Feedback field note must be checked for empty-field honesty, privacy confirmation, editable output, manual-submit boundary, and mobile form length.
- The second polish pass also checks that the surface reads as an evidence desk rather than an AI dashboard: no decorative hamburger on desktop, no generic event names, and no status pill used where a divider or text label is enough.
- The current visual reframe is recorded in [`15-visual-product-reframe-contract-2026-08-15.md`](./docs/product/pm-signal-lab/15-visual-product-reframe-contract-2026-08-15.md); it is a decision-worksheet direction, not a claim of complete usability or adoption.
- Fresh QA captures: [`first-run 1440`](./docs/product/pm-signal-lab/assets/qa/visual-reframe-first-run-1440.png)、[`loaded 390`](./docs/product/pm-signal-lab/assets/qa/visual-reframe-loaded-390.png)、[`loaded 768`](./docs/product/pm-signal-lab/assets/qa/visual-reframe-loaded-768.png)。
- Document any exception to this system in the feature UX spec and release evidence.
