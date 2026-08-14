# PM Signal Lab — Project Design System

## Product Frame

- Product type: local-first AI PM evidence-to-decision workbench
- Target user: AI PM / PM / founder / product engineer（v0 以 AI PM 為主要假設族群）
- Primary action: 從 evidence pack 走到可審核、可匯出的 decision brief
- Brand mood: precise、calm、evidence-first、slightly editorial
- Platforms: responsive Web；v0 以 desktop workbench + mobile single-column recovery 為主

## Product truth and signature

The product is not a generic chat wrapper. Its domain objects are `Evidence`、`Claim`、`Opportunity`、`Experiment Brief`、`Decision Memo` and `Not Covered`. The visual signature is an `Evidence spine`: sources and claims are visually connected so provenance is part of the layout, not a footnote.

## Selected DNA

`Orclaw / ALPHA_INTELLIGENCE` 的技術訊號與密度，加入 `Pillow Fit` 的專業信任與低焦慮狀態。只移植決策鏈：深色 shell、可掃描 metadata、source/provenance、低誇張 motion；不複製任何專案的品牌、文字或程式碼。

## Principles

1. Evidence before persuasion：來源、時間、限制比「AI 認為」更重要。
2. One next action：每個 step 只突出一個 primary CTA。
3. State before decoration：first-time、empty、loading、error、recovery、approval 先成立。
4. Dense where it helps：evidence rows 可密集；decision memo 與說明文字保持呼吸。
5. Human owns the decision：AI 只提出候選，任何結論都有 `接受 / 編輯 / 保留為假設`。

## Composition Brief

- First read: `把訊號變成下一步`、current step、sample/workspace status。
- Second read: evidence/claim rows 與 source mapping。
- Primary action: 依 step 的單一 CTA。
- Content relationship: flow + evidence + decision，使用 stepper、row、split pane、definition list，少用 card。
- Density: desktop medium-high / mobile stacked medium。
- Alignment spine: workflow rail → central workbench → decision context rail。
- Layout archetype: `sidebar + workbench split-pane + decision rail`。
- Responsive reflow: rail → top stepper；right context → below main; CTA → sticky bottom action。

## Selected visual concept

- Desktop first-run reference: `docs/product/pm-signal-lab/assets/concept-desktop.png`。
- The concept is a direction anchor, not a pixel-perfect generated asset: keep its shell/workbench/decision-rail hierarchy, but implement exact product states, semantic controls, responsive behavior, and source trust details in React/CSS。
- Deliberate correction during generation: reject invented dashboard metrics and project KPIs; v0 opens with an honest `0 / 4` first-run state and only introduces evidence-derived content after the user loads the fixture。

## Tokens

### Color

- `--shell`: `#101418` — graphite shell, not pure black
- `--shell-surface`: `#182027`
- `--workspace`: `#f5f6f2` — warm/cool neutral workspace
- `--surface`: `#ffffff`
- `--ink`: `#152029`
- `--muted`: `#66737b`
- `--line`: `#dfe4df`
- `--accent`: `#d97706` — amber, CTA/current step only
- `--accent-soft`: `#fff3d6`
- `--trust`: `#2563a8` — source/context
- `--trust-soft`: `#e8f1fb`
- `--success`: `#16734b`
- `--warning`: `#a65f00`
- `--danger`: `#b33b32`
- `--focus`: `#2563a8`

Brand/accent color should remain a signal, roughly 5–10% of a screen. Status uses text + icon/shape, never color alone.

### Typography

```css
font-family: Inter, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif;
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
- Control radius: 8px; panel radius: 12px; pill only for compact status tags.
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

## AI-native states and trust

`compose → accepted → working/activity → partial claims → human decision → memo preview → export completed → recovery`。

The UI must show engine/provider state, source identity, timestamp/freshness, limitations, manual edit, approval boundary, and fallback. No external side effect is present in v0.

## QA rules

- Build/typecheck/lint/test before visual completion.
- Screenshot review at 390×844、768×1024、1440×900。
- Behavior matrix covers first-time、empty、loading、error、recovery、success、mobile、keyboard、long Traditional Chinese。
- Do a second polish pass for hierarchy, spacing, container count, focus visibility, sticky CTA overlap, and status color independence.
- Document any exception to this system in the feature UX spec and release evidence.
