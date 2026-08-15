# PM Signal Lab — Design system

## Product frame

- Product type: local-first PM worksheet for moving from evidence to a decision.
- Target user: PM, founder, product designer, or product engineer evaluating a practical AI-PM portfolio project.
- Primary action: move from a source-backed evidence pack to a reviewable, exportable decision brief.
- Brand mood: precise, calm, evidence-first, and closer to a field notebook / decision instrument than an AI dashboard.
- Platforms: responsive web; desktop workbench, tablet reflow, and mobile single-column recovery.
- Public locale: English-first `en-US` for the current hosted demo.

## Project Style Direction

- Selected DNA: Pillow Fit's tool/trust discipline + Altoslab's restrained professional language.
- Original direction: cool mineral paper, graphite text, one rust signal line, teal provenance marks, and a ruled evidence spine.
- Must feel like: a PM can bring this into a real product review and defend the next step.
- Must not feel like: an AI landing-page template, a card-heavy dashboard, a model chat wrapper, or a decorative moodboard.
- Density: medium on first run; medium-high once a source pack is loaded.
- Signature detail: folio marks and a source spine that visibly connects the original line to the next decision. The small brand mark repeats that spine with two provenance nodes and one rust signal junction; it is decorative and never represents model activity or verified output.
- Motion: low; transitions explain state changes and never simulate model thinking.

## Product truth and signature

This is not a generic chat wrapper. Its domain objects are `Evidence`, `Claim`, `ExperimentBrief`, `DecisionMemo`, `SessionFeedback`, and `Not covered`.

The visual signature is an evidence spine: source rows and claim rows are visibly connected so provenance is part of the layout rather than a footnote. A cool paper index rail, ruled annotations, source folios, and a quiet desk summary establish the reading order. A rust line marks the next action and teal marks provenance; neither is used as wallpaper. The summary keeps actual source, claim, and review counts below the workpaper instead of turning secondary context into a persistent dashboard rail.

## Principles

1. Evidence before persuasion: source, date, and limitation matter more than an “AI thinks” label.
2. One next action: each step has one clear primary CTA.
3. State before decoration: first run, empty, loading, error, recovery, and approval must work before polish matters.
4. Dense where it helps: evidence rows can be compact; decision briefs and explanations need room to breathe.
5. Human owns the decision: the system proposes a candidate; a person accepts, edits, keeps it as a hypothesis, or marks evidence missing.
6. Boundary near trust: local-only behavior, manual GitHub handoff, and unverified outcomes stay visible at the point of action.

## Composition brief

- First read: “Put one signal on the desk”, the current worksheet status, and `Open the sample worksheet`.
- Second read: the sample fixture boundary, source rows, source mapping, date, limitation, and review docket.
- Primary action: one step-specific CTA.
- Content relationship: `Source → Claim → Smallest test`; use a stepper, rows, split areas, and definition lists before adding cards.
- Desktop density: medium-high. Mobile density: stacked medium.
- Alignment spine: masthead → worksheet title → evidence spine. The workflow rail remains navigation; the desk summary is a lower-priority horizontal band below the workpaper.
- Layout archetype: single-sheet source ledger + index strip + annotated workpaper + desk summary.
- Responsive reflow: the workflow rail becomes a top stepper; the desk summary moves below the workbench; the primary CTA becomes a sticky bottom action.
- Loaded state: when the pack exists, the masthead switches to direct work language so evidence appears sooner. The source ledger ends in a review docket with the actual candidate-claim count and the primary `Start review` action; the desk summary records one question, one rule, actual counts, and the current next move. This is domain-state reflow, not fake AI activity.
- Feedback state: after the decision brief, offer a low-interruption field note. It records the person's session; it does not infer sentiment or submit an issue.

## Visual tokens

```css
--shell: #dfe6e0;
--shell-surface: #f5f7f3;
--workspace: #eef1ed;
--surface: #fbfcf8;
--ink: #1f2b2a;
--muted: #596663;
--line: #cbd5cf;
--accent: #b85c35;
--accent-soft: #f3e0d5;
--trust: #1f6b67;
--trust-soft: #e1efed;
--success: #2f7255;
--warning: #976c21;
--danger: #a4473e;
--focus: #1f6b67;
```

The accent is a signal, not a background. Keep it to roughly 5–10% of a screen. Status must use text plus icon or shape, never color alone.

### Typography

```css
font-family: Inter, "Avenir Next", "Helvetica Neue", system-ui, sans-serif;
font-family-display: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, "Times New Roman", serif;
font-family-mono: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
```

- Hero and tool title: 28px / 1.3; the display serif is reserved for the direct work statement, source excerpt, and decision headings so it reads as a field-note signature rather than a generic marketing hero.
- Section title: 24px / 1.3.
- Card and row title: 18px / 1.3.
- Body: 16px / 1.6.
- Caption and metadata: 14px / 1.5.
- Tag: 12px / 1.4.
- English-first copy must survive text expansion without clipping or horizontal overflow.

### Spacing, radius, elevation

- Primitive: 4px. Layout rhythm: 8px.
- Main gaps: 12 / 16 / 24 / 32 / 48px.
- Control radius: 3px. Input radius: 3px. Panel radius: 0.
- Status uses text, underline, and dividers rather than default pill surfaces.
- Use borders and surfaces by default; reserve shadows for menus, dialogs, and the sticky action.

## Components and states

- Button: primary, secondary, quiet, and danger; default, hover, active, focus, disabled, and loading.
- Stepper: current, completed, available, and blocked; semantic `aria-current`.
- Evidence row: source folio, type, timestamp, source identity, original line, and expandable source detail.
- Claim row: status text/icon, claim folio, evidence spine, source references, limitation, accept/edit/keep/missing actions.
- Status marker: `Source-backed`, `Needs your review`, and `Missing evidence` with text and icon.
- Notice: success, warning, error, and recovery action; use `role=status` or `role=alert` by severity.
- Form: visible label, helper, `aria-describedby`, field-level error, preserved input, and focus recovery. Claim editing stays inline; do not use a native prompt.
- Decision preview: definition list, evidence summary, known limits, not-covered block, and copy/download actions.
- Session feedback: collapsed invitation → labelled local form → privacy gate → editable Markdown preview → manual GitHub handoff.
- Empty and error states always include a next action and a recovery path.

## Responsive and accessibility rules

- Below 640px: one column, top stepper, stacked rows, full-width primary controls, sticky bottom action with safe-area padding.
- 640–1024px: use two columns where space allows; move context below the main workbench.
- Above 1024px: persistent workflow rail, central workbench, right context rail, max content width 1440px.
- Touch targets are at least 44×44px. No action depends on hover.
- Long source strings wrap. Focus remains visible. Text expansion is checked at 390px.
- Reduced-motion preferences disable non-essential transitions.

## Motion and no-AI feel

- Use 150–200ms for border/focus feedback and 200–300ms for drawers or dialogs.
- Synthesis is shown as a set of claims and limitations, not fake typing, hidden chain-of-thought, or a model activity feed.
- Avoid generic gradient hero art, abstract orbs, glass panels, bento feature walls, repeated rounded containers, unsupported “production-ready” claims, and status chrome that does not represent product proof.
- Prefer actual source rows, folios, limitations, a deterministic sample output, and an annotated decision brief as the visual language.

## Evidence and release references

- First-run design reference: [`case-file-first-run-1440.png`](./docs/product/pm-signal-lab/assets/qa/case-file-first-run-1440.png).
- Latest first-run action reference: [`first-run-action-1280.png`](./docs/product/pm-signal-lab/assets/qa/first-run-action-1280.png) and [`first-run-action-mobile-390.png`](./docs/product/pm-signal-lab/assets/qa/first-run-action-mobile-390.png).
- Source ledger contract: [`32-source-ledger-composition-contract-2026-08-15.md`](./docs/product/pm-signal-lab/32-source-ledger-composition-contract-2026-08-15.md).
- English-first messaging and localization contract: [`34-english-first-product-messaging-contract-2026-08-15.md`](./docs/product/pm-signal-lab/34-english-first-product-messaging-contract-2026-08-15.md).
- No-AI-feel visual refresh QA audit: [`37-no-ai-feel-visual-refresh-qa-audit-2026-08-15.md`](./docs/product/pm-signal-lab/37-no-ai-feel-visual-refresh-qa-audit-2026-08-15.md).
- No-AI-feel hosted release audit: [`38-no-ai-feel-hosted-release-audit-2026-08-15.md`](./docs/product/pm-signal-lab/38-no-ai-feel-hosted-release-audit-2026-08-15.md).
- First-run action visibility contract: [`39-first-run-action-visibility-contract-2026-08-15.md`](./docs/product/pm-signal-lab/39-first-run-action-visibility-contract-2026-08-15.md).
- First-run action visibility local QA: [`40-first-run-action-visibility-qa-audit-2026-08-15.md`](./docs/product/pm-signal-lab/40-first-run-action-visibility-qa-audit-2026-08-15.md).
- First-run action visibility hosted audit: [`41-first-run-action-visibility-hosted-release-audit-2026-08-15.md`](./docs/product/pm-signal-lab/41-first-run-action-visibility-hosted-release-audit-2026-08-15.md).
- Pilot-note feedback loop contract: [`42-pilot-note-feedback-loop-contract-2026-08-15.md`](./docs/product/pm-signal-lab/42-pilot-note-feedback-loop-contract-2026-08-15.md).
- Pilot-note feedback loop hosted audit: [`43-pilot-note-feedback-loop-hosted-release-audit-2026-08-15.md`](./docs/product/pm-signal-lab/43-pilot-note-feedback-loop-hosted-release-audit-2026-08-15.md).
- Design and accessibility completion contract: [`44-design-a11y-completion-contract-2026-08-15.md`](./docs/product/pm-signal-lab/44-design-a11y-completion-contract-2026-08-15.md).
- Design and accessibility polish local QA: [`45-design-a11y-polish-local-qa-2026-08-15.md`](./docs/product/pm-signal-lab/45-design-a11y-polish-local-qa-2026-08-15.md).
- Design and accessibility polish hosted release audit: [`46-design-a11y-polish-hosted-release-audit-2026-08-15.md`](./docs/product/pm-signal-lab/46-design-a11y-polish-hosted-release-audit-2026-08-15.md).
- Signal-review and weekly-growth-pulse local QA: [`47-signal-review-growth-pulse-local-qa-2026-08-15.md`](./docs/product/pm-signal-lab/47-signal-review-growth-pulse-local-qa-2026-08-15.md).
- Signal-review and weekly-growth-pulse hosted release audit: [`48-signal-review-growth-pulse-hosted-release-audit-2026-08-15.md`](./docs/product/pm-signal-lab/48-signal-review-growth-pulse-hosted-release-audit-2026-08-15.md).
- Review-docket workbench contract and hosted audit: [`49-review-docket-workbench-contract-and-hosted-audit-2026-08-15.md`](./docs/product/pm-signal-lab/49-review-docket-workbench-contract-and-hosted-audit-2026-08-15.md).
- Margin-note context contract and hosted audit: [`50-margin-note-context-contract-and-hosted-audit-2026-08-15.md`](./docs/product/pm-signal-lab/50-margin-note-context-contract-and-hosted-audit-2026-08-15.md).
- Formal hosted demo release contract: [`hosted-demo-release-contract-2026-08-15.md`](./docs/operations/hosted-demo-release-contract-2026-08-15.md).
- Formal hosted demo release audit: [`51-formal-hosted-demo-release-audit-2026-08-15.md`](./docs/product/pm-signal-lab/51-formal-hosted-demo-release-audit-2026-08-15.md).
- Hosted-demo copy alignment audit: [`52-hosted-demo-copy-alignment-audit-2026-08-15.md`](./docs/product/pm-signal-lab/52-hosted-demo-copy-alignment-audit-2026-08-15.md).
- No-AI-feel field notebook contract: [`53-no-ai-feel-field-notebook-contract-2026-08-15.md`](./docs/product/pm-signal-lab/53-no-ai-feel-field-notebook-contract-2026-08-15.md).
- Keyboard and semantic oracle audit: [`55-keyboard-semantic-oracle-audit-2026-08-15.md`](./docs/product/pm-signal-lab/55-keyboard-semantic-oracle-audit-2026-08-15.md).
- Evidence-spine brand polish contract: [`56-evidence-spine-brand-polish-contract-2026-08-15.md`](./docs/product/pm-signal-lab/56-evidence-spine-brand-polish-contract-2026-08-15.md).
- Single-sheet workbench second-polish contract: [`57-single-sheet-workbench-second-polish-contract-2026-08-15.md`](./docs/product/pm-signal-lab/57-single-sheet-workbench-second-polish-contract-2026-08-15.md).
- Earlier English-first release audit: [`35-english-first-release-audit-2026-08-15.md`](./docs/product/pm-signal-lab/35-english-first-release-audit-2026-08-15.md).

These references describe decisions and exact evidence boundaries. They do not claim universal usability, model quality, adoption, or GitHub growth.
