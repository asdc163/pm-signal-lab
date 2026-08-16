# PM Signal Lab — Design system

## Product frame

- Product type: local-first PM workpaper for moving from source lines to a defensible decision.
- Target user: PM, founder, product designer, or product engineer evaluating a practical AI-PM portfolio project.
- Primary action: move from a support-draft signal pack to a reviewable, exportable decision brief.
- Brand mood: precise, calm, evidence-first, and closer to a field notebook / decision instrument than an AI dashboard.
- Platforms: responsive web; desktop workbench, tablet reflow, and mobile single-column recovery.
- Public locale: English-first `en-US` for the current hosted demo.

## Project Style Direction

- Selected DNA: Pillow Fit's tool/trust discipline + Altoslab's restrained professional language.
- Original direction: warm paper, ink hierarchy, one red correction line, blue provenance marks, and ruled source rows.
- Must feel like: a PM can bring this into a real product review and defend the next step.
- Must not feel like: an AI landing-page template, a card-heavy dashboard, a model chat wrapper, or a decorative moodboard.
- Density: medium on first run; medium-high once a source pack is loaded.
- Signature detail: source numbers, source lines, and restrained review marks that keep the original line beside the next decision. The brand mark is a simple sheet index; it does not represent model activity, confidence, or verified output.
- Colour roles: neutral ink/muted text carries shell and navigation; trust blue carries source/provenance; the red accent is reserved for the next human action and its small marker. This keeps colour attached to evidence meaning instead of decorative AI theatre.
- Motion: low; transitions explain state changes and never simulate model thinking.

## Product truth and signature

This is not a generic chat wrapper. Its domain objects are `Evidence`, `Claim`, `ExperimentBrief`, `DecisionMemo`, `SessionFeedback`, and `Not covered`. The default fixture is a fictional support-draft review with interview, support, product-observation, and evaluation-review rows; it does not represent a live model or support queue. The AI-PM framing belongs in the portfolio and fixture boundary, not as a badge that takes over the work surface.

The visual signature is a quiet workpaper: the workflow is a thin paper index, the case subject leads the page, source rows and claim rows are visibly related, and provenance stays in the workpaper rather than a dashboard rail. A warm paper surface, ruled annotations, source numbers, evaluation-review limits, and a quiet margin note establish the reading order. A red line marks the next action and blue marks provenance; neither is used as wallpaper. Actual source, claim, and review counts remain metadata, not the main visual event.

## Principles

1. Evidence before persuasion: source, date, and limitation matter more than an “AI thinks” label.
2. AI product specificity without AI theatre: the support draft, source freshness, evaluation coverage, and stop condition appear as evidence objects, not as a simulated assistant.
3. One next action: each step has one clear primary CTA.
4. State before decoration: first run, empty, loading, error, recovery, and approval must work before polish matters.
5. Dense where it helps: evidence rows can be compact; decision briefs and explanations need room to breathe.
6. Human owns the decision: the system proposes a candidate; a person accepts, edits, keeps it as a hypothesis, or marks evidence missing.
7. Boundary near trust: local-only behavior, manual GitHub handoff, and unverified outcomes stay visible at the point of action.
8. Review before decision: the Decide step cannot draft an experiment until at least one claim has an explicit human review state.

9. Quiet workpaper shell: concrete source rows, margins, and review marks carry the visual identity; AI terms stay inside the portfolio framing, product fixture, and source content.

## Composition brief

- First read: `Support draft review` under the `Source review` label when loaded, or `Start with a source line` on first run; the workflow index remains quiet context.
- First-run choice: the concrete `Sample note` and `Local fixture only` boundary establish the source proof; `Open the sample worksheet` stays primary while `Add your own signal` is a quiet secondary action in the same hero. The mobile fixed bar owns the sample action, while tablet keeps the hero primary because no fixed bar is present.
- Manual-source first read: after a visitor saves their own line, use `Your source sheet` and `your source notes · local sheet`; never reuse the fictional sample's subject labels for a custom pack.
- Second read: the case subject, source rows, source mapping, date, limitation, and review mark.
- Primary action: one step-specific CTA; loaded desktop places `Start review`
  after the source record, while mobile keeps the fixed action bar. The
  `Sheet tally` is status only and never competes with the source action.
- Content relationship: `Source → Claim → Smallest test`; use a stepper, rows, split areas, and definition lists before adding cards.
- Desktop density: medium-high. Mobile density: stacked medium.
- Alignment spine: `Source review` label → case title → `Source lines to check` → ruled source record. The workflow index is navigation, not a persistent dashboard rail; the `Sheet note` stays below the workpaper and names the visible source record.
- Layout archetype: quiet workpaper + index strip + annotated source rows + desk summary.
- Responsive reflow: the desktop index becomes the existing top stepper below 1024px; the desk summary remains below the workbench; the primary CTA becomes the single sticky bottom action on mobile while the context note keeps only the question and rule.
- Loaded state: when the pack exists, the masthead uses `Support draft review` once, the pack header uses the `Evidence` eyebrow plus `Source lines to check`, and the subject line identifies `support draft · fictional worksheet`. The desktop topbar keeps only the local worksheet boundary instead of repeating the case title. AI-PM framing remains in the repository and fixture boundary, not as a visual badge. The `Sheet tally` reports the current state without an action; the source lines end in a `Next step` with the actual claim count and the only desktop `Start review` action; the `Sheet note` records a literal `Source record`, one question, one rule, actual counts, and the current next action. This is domain-state reflow, not fake AI activity.
- Manual source state: when the pack was created from visitor-entered evidence, the masthead uses `Your source sheet`, the subject line uses `your source notes · local sheet`, and the sample-only `fictional worksheet` boundary is absent. The evidence row remains literal and the local refresh-clears boundary stays adjacent to the source.
- Operational worksheet reframe: the loaded hero uses `Source review` and a literal `Sheet tally`, the context uses `Sheet note`, `Source record`, and `In this sheet`, and the first source row enters earlier with a quieter sans-led masthead. The local/blank sheet boundary stays literal, while source-line counts carry the visible state instead of a status dot or active/empty rail.
- Evidence-ledger colour pass: in the loaded state, repeated red shell labels and navigation cues are quieted; source numbers, source type, subject, and provenance use trust blue; only the review CTA and next-action marker stay red. The words still name each trust state, so colour never becomes the sole status signal.
- Literal worksheet language pass: `Local worksheet`, `Source review`, `Sheet tally`, `Source record`, and `Recent action` replace abstract shell language. `Sheet note` and `In this sheet` keep the lower context useful without sounding like agent telemetry; `Local sheet` and `Blank sheet` state the boundary without implying invisible work.
- Optional receipt disclosure: `Session note` and `Optional local receipt` remain visible as a quiet operational footnote; `Recent action`, the receipt copy control, and manual report handoff stay collapsed until the owner asks for them. The copied receipt says `Actions on this page` so the local boundary is literal rather than telemetry-like. This keeps the source → claim → test reading path primary without removing the local recovery path.
- Contextual mobile action strip: the fixed helper line follows the current state (`Start with a source line`, `Read the source lines`, `Draft the smallest test`, `Export the decision brief`, or `Inspect before copying`) and exposes the button label in its region name. When `Decide` has no experiment yet, both the helper and button stay on `Draft smallest experiment`; export only appears after the brief exists. It remains a quiet margin note, not a second status dashboard.
- Mobile action ownership: the fixed bottom bar is the only mobile primary button. The lower `Sheet note` still shows the next-step label, question, and rule; the optional `Session note` keeps the receipt detail collapsed so the same action and operational trace do not compete with the mobile reading path.
- Feedback state: after the decision brief, offer a low-interruption field note. It records the person's session; it does not infer sentiment or submit an issue.

## Visual tokens

```css
--shell: #e8e3d8;
--shell-surface: #fbfaf5;
--workspace: #f3f0e8;
--surface: #fffdf8;
--ink: #202a2f;
--muted: #626b6d;
--line: #d5d0c5;
--line-strong: #9aa09d;
--accent: #d64b38;
--accent-soft: #f7e3dd;
--trust: #1d5fa8;
--trust-soft: #e7f0f8;
--success: #2f7255;
--warning: #976c21;
--danger: #a4473e;
--focus: #1d5fa8;
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
- The brand mark is a sheet index, never a node graph or a signal of model activity.
- Use borders and surfaces by default; reserve shadows for menus, dialogs, and the sticky action.

## Components and states

- Button: primary, secondary, quiet, and danger; default, hover, active, focus, disabled, and loading.
- Stepper: current, completed, available, and blocked; semantic `aria-current`.
- Evidence row: source number, type, timestamp, source identity, original line, and expandable source detail.
- Claim row: status text/icon, claim number, evidence spine, source references, limitation, accept/edit/keep/missing actions.
- Review gate: Decide is blocked until a claim is explicitly reviewed; the recovery message names the valid human outcomes rather than silently drafting a test.
- Status marker: `Source-backed`, `Needs your review`, and `Missing evidence` with text and icon.
- Notice: success, warning, error, and recovery action; use `role=status` or `role=alert` by severity.
- Form: visible label, helper, `aria-describedby`, field-level error, preserved input, and focus recovery. Claim editing stays inline; do not use a native prompt.
- Session boundary: sample replacement closes manual entry and clears disclosure/claim selection; Reset returns to a clean local worksheet; loading actions become disabled during the existing fixture transition.
- Decision preview: definition list, evidence summary, known limits, not-covered block, and copy/download actions.
- Session feedback: collapsed invitation → labelled local form → privacy gate → editable Markdown preview → manual GitHub handoff.
- Empty and error states always include a next action and a recovery path.

## Responsive and accessibility rules

- Below 640px: one column, top stepper, stacked rows, full-width primary controls, sticky bottom action with safe-area padding.
- 640–1024px: use two columns where space allows; move context below the main workbench.
- Above 1024px: full-width masthead, thin horizontal workflow index, central workpaper, and lower context band, max content width 1260px.
- Touch targets are at least 44×44px. No action depends on hover.
- Long source strings wrap. Focus remains visible. Text expansion is checked at 390px.
- Reduced-motion preferences disable non-essential transitions.

## Motion and no-AI feel

- Use 150–200ms for border/focus feedback and 200–300ms for drawers or dialogs.
- Synthesis is shown as a set of claims and limitations, not fake typing, hidden chain-of-thought, or a model activity feed.
- The deterministic sample transition uses a static worksheet marker and literal loading copy; there is no spinner or simulated model-thinking animation when no measurable progress exists.
- Avoid generic gradient hero art, abstract orbs, glass panels, bento feature walls, repeated rounded containers, unsupported “production-ready” claims, and status chrome that does not represent product proof.
- Avoid network-like brand marks, graph nodes, fake confidence meters, chat bubbles, typing indicators, and shell copy that makes the preview look like an AI agent.
- Prefer actual source rows, source numbers, limitations, a deterministic sample output, and an annotated decision brief as the visual language.
- Keep AI language in subject/context and evidence objects; do not make it the loaded worksheet headline.
- Second-polish rule: the loaded hero keeps the same editorial display voice as the empty sheet, while margin labels state literal ownership or output (`Decision owner: you`, `Stop rule: yours`, `Markdown export`). Do not add another status layer to explain the product.
- Recovery rule: a replaced or reset worksheet must not retain a previous form, source disclosure, or claim selection; use literal disabled/loading feedback instead of simulating background agent activity.

## Evidence and release references

- Quiet workpaper second-polish contract: [`82-quiet-workpaper-second-polish-contract-2026-08-16.md`](./docs/product/pm-signal-lab/82-quiet-workpaper-second-polish-contract-2026-08-16.md).
- Mobile source-first reading contract: [`83-mobile-source-first-reading-contract-2026-08-16.md`](./docs/product/pm-signal-lab/83-mobile-source-first-reading-contract-2026-08-16.md).
- Evidence-ledger quiet-colour contract: [`90-evidence-ledger-quiet-colour-contract-2026-08-16.md`](./docs/product/pm-signal-lab/90-evidence-ledger-quiet-colour-contract-2026-08-16.md).
- Literal worksheet language contract: [`92-literal-worksheet-language-contract-2026-08-16.md`](./docs/product/pm-signal-lab/92-literal-worksheet-language-contract-2026-08-16.md).
- Literal worksheet language local QA: [`93-literal-worksheet-language-local-qa-2026-08-16.md`](./docs/product/pm-signal-lab/93-literal-worksheet-language-local-qa-2026-08-16.md).
- Mobile action context and craft pass: [`94-mobile-action-context-and-craft-pass-contract-2026-08-16.md`](./docs/product/pm-signal-lab/94-mobile-action-context-and-craft-pass-contract-2026-08-16.md).
- Mobile action context local QA: [`95-mobile-action-context-local-qa-2026-08-16.md`](./docs/product/pm-signal-lab/95-mobile-action-context-local-qa-2026-08-16.md).
- Mobile primary-action de-duplication contract: [`96-mobile-primary-action-de-duplication-contract-2026-08-16.md`](./docs/product/pm-signal-lab/96-mobile-primary-action-de-duplication-contract-2026-08-16.md).
- Mobile primary-action de-duplication local QA: [`97-mobile-primary-action-de-duplication-local-qa-2026-08-16.md`](./docs/product/pm-signal-lab/97-mobile-primary-action-de-duplication-local-qa-2026-08-16.md).
- Source-first chrome simplification contract: [`98-source-first-chrome-simplification-contract-2026-08-16.md`](./docs/product/pm-signal-lab/98-source-first-chrome-simplification-contract-2026-08-16.md).
- Source-first chrome simplification local QA: [`99-source-first-chrome-simplification-local-qa-2026-08-16.md`](./docs/product/pm-signal-lab/99-source-first-chrome-simplification-local-qa-2026-08-16.md).
- Less-AI workpaper second-polish contract: [`100-less-ai-workpaper-second-polish-contract-2026-08-16.md`](./docs/product/pm-signal-lab/100-less-ai-workpaper-second-polish-contract-2026-08-16.md).
- Less-AI workpaper second-polish local QA: [`101-less-ai-workpaper-second-polish-local-qa-2026-08-16.md`](./docs/product/pm-signal-lab/101-less-ai-workpaper-second-polish-local-qa-2026-08-16.md).
- Less-AI workpaper second-polish machine-readable evidence: [`qa-evidence-manifest-2026-08-16.json`](./docs/product/pm-signal-lab/qa-evidence-manifest-2026-08-16.json).
- Less-AI margin note and evidence state contract: [`102-less-ai-margin-note-and-evidence-state-contract-2026-08-16.md`](./docs/product/pm-signal-lab/102-less-ai-margin-note-and-evidence-state-contract-2026-08-16.md).
- Less-AI margin note and evidence state local QA: [`103-less-ai-margin-note-and-evidence-state-local-qa-2026-08-16.md`](./docs/product/pm-signal-lab/103-less-ai-margin-note-and-evidence-state-local-qa-2026-08-16.md).
- Session boundary, reset, and loading-guard contract: [`104-session-boundary-reset-and-loading-guard-contract-2026-08-16.md`](./docs/product/pm-signal-lab/104-session-boundary-reset-and-loading-guard-contract-2026-08-16.md).
- Session boundary, reset, and loading-guard local QA: [`105-session-boundary-reset-and-loading-guard-local-qa-2026-08-16.md`](./docs/product/pm-signal-lab/105-session-boundary-reset-and-loading-guard-local-qa-2026-08-16.md).
- Custom source-sheet truth contract: [`108-custom-source-sheet-truth-contract-2026-08-16.md`](./docs/product/pm-signal-lab/108-custom-source-sheet-truth-contract-2026-08-16.md).
- Custom source-sheet truth local QA: [`109-custom-source-sheet-truth-local-qa-2026-08-16.md`](./docs/product/pm-signal-lab/109-custom-source-sheet-truth-local-qa-2026-08-16.md).
- Single-primary-action ownership contract: [`110-single-primary-action-ownership-contract-2026-08-16.md`](./docs/product/pm-signal-lab/110-single-primary-action-ownership-contract-2026-08-16.md).
- Single-primary-action ownership local QA: [`111-single-primary-action-ownership-local-qa-2026-08-16.md`](./docs/product/pm-signal-lab/111-single-primary-action-ownership-local-qa-2026-08-16.md).
- Session note progressive-disclosure contract: [`112-session-note-progressive-disclosure-contract-2026-08-16.md`](./docs/product/pm-signal-lab/112-session-note-progressive-disclosure-contract-2026-08-16.md).
- Session note progressive-disclosure local QA: [`113-session-note-progressive-disclosure-local-qa-2026-08-16.md`](./docs/product/pm-signal-lab/113-session-note-progressive-disclosure-local-qa-2026-08-16.md).
- Keyboard-only workflow contract: [`114-keyboard-only-workflow-contract-2026-08-16.md`](./docs/product/pm-signal-lab/114-keyboard-only-workflow-contract-2026-08-16.md).
- Keyboard-only workflow local QA: [`115-keyboard-only-workflow-local-qa-2026-08-16.md`](./docs/product/pm-signal-lab/115-keyboard-only-workflow-local-qa-2026-08-16.md).
- First-run source-truth composition contract: [`116-first-run-source-truth-composition-contract-2026-08-16.md`](./docs/product/pm-signal-lab/116-first-run-source-truth-composition-contract-2026-08-16.md).
- First-run source-truth local QA: [`117-first-run-source-truth-local-qa-2026-08-16.md`](./docs/product/pm-signal-lab/117-first-run-source-truth-local-qa-2026-08-16.md).

- Current candidate screenshot set, captured locally on 2026-08-16: [blank mobile](./docs/product/pm-signal-lab/assets/qa/less-ai-margin-note-evidence-state-blank-390-2026-08-16.png), [loaded mobile](./docs/product/pm-signal-lab/assets/qa/less-ai-margin-note-evidence-state-loaded-390-2026-08-16.png), [Decide](./docs/product/pm-signal-lab/assets/qa/less-ai-margin-note-evidence-state-decide-390-2026-08-16.png), [Ship mobile](./docs/product/pm-signal-lab/assets/qa/less-ai-margin-note-evidence-state-ship-390-2026-08-16.png), [tablet](./docs/product/pm-signal-lab/assets/qa/less-ai-margin-note-evidence-state-loaded-1024-2026-08-16.png), and [desktop](./docs/product/pm-signal-lab/assets/qa/less-ai-margin-note-evidence-state-loaded-1440-2026-08-16.png).
- Keyboard-only workflow captures: [390px](./docs/product/pm-signal-lab/assets/qa/keyboard-flow-390-2026-08-16.png) and [1440px](./docs/product/pm-signal-lab/assets/qa/keyboard-flow-1440-2026-08-16.png).
- First-run source-truth captures: [390px](./docs/product/pm-signal-lab/assets/qa/first-run-source-truth-390-2026-08-16.png) and [1440px](./docs/product/pm-signal-lab/assets/qa/first-run-source-truth-1440-2026-08-16.png). These show the existing deterministic fixture source title, bounded excerpt, source identity, and `Local fixture only` boundary before the visitor scrolls into the own-signal panel.
- Session-boundary screenshots: [loading guard](./docs/product/pm-signal-lab/assets/qa/session-boundary-loading-guard-loading-390-2026-08-16.png), [clean loaded worksheet](./docs/product/pm-signal-lab/assets/qa/session-boundary-loading-guard-loaded-390-2026-08-16.png), and [clean worksheet after reset](./docs/product/pm-signal-lab/assets/qa/session-boundary-loading-guard-reset-390-2026-08-16.png).
- Source-truth screenshots: [manual source sheet at 390px](./docs/product/pm-signal-lab/assets/qa/custom-source-sheet-truth-390-2026-08-16.png) and [fictional sample at 1440px](./docs/product/pm-signal-lab/assets/qa/custom-source-sheet-truth-sample-1440-2026-08-16.png).
- Older screenshot names remain in the assets folder as historical evidence only. They are not current visual proof and do not prove hosted behavior.
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
- Direct workbench no-AI-feel contract: [`60-direct-workbench-no-ai-feel-contract-2026-08-15.md`](./docs/product/pm-signal-lab/60-direct-workbench-no-ai-feel-contract-2026-08-15.md).
- Direct workbench no-AI-feel local QA: [`61-direct-workbench-no-ai-feel-local-qa-2026-08-15.md`](./docs/product/pm-signal-lab/61-direct-workbench-no-ai-feel-local-qa-2026-08-15.md).
- Direct workbench hosted release audit: [`62-direct-workbench-hosted-release-audit-2026-08-15.md`](./docs/product/pm-signal-lab/62-direct-workbench-hosted-release-audit-2026-08-15.md).
- Direct workbench copy and semantic polish contract: [`63-direct-workbench-copy-and-semantic-polish-contract-2026-08-15.md`](./docs/product/pm-signal-lab/63-direct-workbench-copy-and-semantic-polish-contract-2026-08-15.md).
- Direct workbench copy and semantic polish local QA: [`64-direct-workbench-copy-and-semantic-polish-local-qa-2026-08-15.md`](./docs/product/pm-signal-lab/64-direct-workbench-copy-and-semantic-polish-local-qa-2026-08-15.md).
- Direct workbench copy and semantic polish hosted release audit: [`65-direct-workbench-copy-and-semantic-polish-hosted-release-audit-2026-08-15.md`](./docs/product/pm-signal-lab/65-direct-workbench-copy-and-semantic-polish-hosted-release-audit-2026-08-15.md).
- AI product signal-pack contract: [`66-ai-product-signal-pack-contract-2026-08-15.md`](./docs/product/pm-signal-lab/66-ai-product-signal-pack-contract-2026-08-15.md).
- AI product signal-pack local QA record: [`67-ai-product-signal-pack-local-qa-2026-08-15.md`](./docs/product/pm-signal-lab/67-ai-product-signal-pack-local-qa-2026-08-15.md).
- AI product signal-pack hosted release audit: [`68-ai-product-signal-pack-hosted-release-audit-2026-08-15.md`](./docs/product/pm-signal-lab/68-ai-product-signal-pack-hosted-release-audit-2026-08-15.md).
- Less-AI field folio visual direction contract: [`69-less-ai-field-folio-visual-direction-contract-2026-08-15.md`](./docs/product/pm-signal-lab/69-less-ai-field-folio-visual-direction-contract-2026-08-15.md).
- Less-AI field folio local QA report: [`70-less-ai-field-folio-local-qa-2026-08-15.md`](./docs/product/pm-signal-lab/70-less-ai-field-folio-local-qa-2026-08-15.md).
- Less-AI field folio hosted release audit: [`71-less-ai-field-folio-hosted-release-audit-2026-08-15.md`](./docs/product/pm-signal-lab/71-less-ai-field-folio-hosted-release-audit-2026-08-15.md).
- Less-AI subject-specificity contract: [`72-less-ai-subject-specificity-contract-2026-08-15.md`](./docs/product/pm-signal-lab/72-less-ai-subject-specificity-contract-2026-08-15.md).
- Less-AI subject-specificity local QA report: [`73-less-ai-subject-specificity-local-qa-2026-08-15.md`](./docs/product/pm-signal-lab/73-less-ai-subject-specificity-local-qa-2026-08-15.md).
- Less-AI subject-specificity hosted release audit: [`74-less-ai-subject-specificity-hosted-release-audit-2026-08-15.md`](./docs/product/pm-signal-lab/74-less-ai-subject-specificity-hosted-release-audit-2026-08-15.md).
- Less-AI domain-language contract: [`75-less-ai-domain-language-contract-2026-08-15.md`](./docs/product/pm-signal-lab/75-less-ai-domain-language-contract-2026-08-15.md).
- Less-AI domain-language local QA: [`76-less-ai-domain-language-local-qa-2026-08-15.md`](./docs/product/pm-signal-lab/76-less-ai-domain-language-local-qa-2026-08-15.md).
- Earlier English-first release audit: [`35-english-first-release-audit-2026-08-15.md`](./docs/product/pm-signal-lab/35-english-first-release-audit-2026-08-15.md).

These references describe decisions and exact evidence boundaries. They do not claim universal usability, model quality, adoption, or GitHub growth.
