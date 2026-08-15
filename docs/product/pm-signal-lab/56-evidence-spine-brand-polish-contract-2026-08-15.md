# Evidence-spine brand polish contract

Date: 2026-08-15
Surface: PM Signal Lab hosted demo and responsive web UI
Audience: international PMs, founders, product designers, and product engineers

## KB Application Contract

- Decision: make the small brand mark carry PM Signal Lab's evidence-spine idea while preserving the existing calm workpaper layout.
- User/job: an international product practitioner should recognise the product as a source-linked decision tool before they start the five-minute trial.
- Outcome metric: in the first viewport, the product remains understandable as an English-first evidence worksheet, the primary action remains discoverable, and the brand mark is a recognisable source-to-claim trace rather than a generic initials badge.
- Constraints / out of scope: no new product feature, model provider, account flow, telemetry, locale switcher, marketing claim, decorative hero art, gradient, glass surface, orb, bento wall, or automatic external action. Real-user comprehension, adoption, screen-reader parity, and GitHub star growth remain unverified by this visual pass.
- Relevant KB:
  - `foundations/design-brain.md`: choose a project DNA from the product job and signature detail; design reason: the mark stays tied to the evidence spine instead of copying a fashionable surface.
  - `foundations/design-rule-hierarchy.md`: preserve hierarchy, readability, states, responsive behaviour, accessibility, and trust before taste; design reason: the mark remains decorative and never carries required meaning.
  - `foundations/product-craft-anti-ai-slop-operating-system.md`: product truth and subject specificity are the strongest anti-AI-sloc signal; design reason: the mark may reference real folios and provenance, but cannot imply model activity.
  - `foundations/aesthetic-taste-system.md`: use a restrained neutral ramp, one accent, and deletion over decoration; design reason: this is one quiet signature detail, not another visual system.
  - `foundations/design-composition-layout.md`: the alignment spine and first read must remain unchanged; design reason: the mark supports the existing source-ledger composition without competing with the task.
  - `foundations/design-risk-register.md`: avoid high-risk decorative patterns; design reason: the existing ruled, low-motion product UI is the safer alternative.
  - `foundations/product-messaging-copy-operating-system.md`: keep the outward-facing surface concrete and English-first; design reason: this pass changes no unsupported product promise.
- Assumptions: the current hosted bundle and local source are aligned at the current `main` commit; the mark is hidden from assistive technology because the adjacent product name already supplies the accessible brand label.
- Fastest evidence: fresh Chrome screenshots at desktop and 390px, DOM/overflow inspection, keyboard semantic checks, local test/build/lint, then the canonical hosted verifier after Pages deployment.

## Execution Contract

- Files/surfaces:
  - Modify: `src/App.tsx` brand-mark markup in the desktop sidebar and mobile topbar; `src/styles.css` brand-mark geometry; `DESIGN.md` visual signature and evidence references.
  - Create: this contract as the implementation and QA record.
  - Test: existing Vitest suite, TypeScript lint gate, Vite production build, `git diff --check`.
  - Observe: hosted empty state, hosted loaded state, responsive 390px state, keyboard focus order, and the no-AI visual guardrails.
- Task sequence:
  - [ ] Task 1 — Replace the literal `PS` glyph in both brand-mark instances with a CSS-only folio/spine mark that remains `aria-hidden`.
    Expected: the desktop sidebar and mobile topbar show the same small mark; `PM Signal Lab` remains the visible and accessible brand text; no new copy is introduced.
  - [ ] Task 2 — Keep the existing spacing, border, colours, and control hit areas unchanged except for the internal mark geometry.
    Expected: no layout shift in the sidebar, topbar, hero, workflow stepper, or sticky mobile action.
  - [ ] Task 3 — Record the signature detail and QA references in `DESIGN.md`.
    Expected: the design system explains why the mark is evidence-linked and points to the current contract and audit without claiming adoption or universal accessibility.
  - [ ] Task 4 — Run `npm test -- --run`, `npm run lint`, `npm run build`, and `git diff --check`.
    Expected: all commands exit 0 and the production build emits the current Vite bundle.
  - [ ] Task 5 — In a fresh Chrome tab, inspect the hosted empty state, load the sample pack, inspect the loaded state, and capture desktop screenshots.
    Expected: the first read remains the product job and `Load sample data`; the loaded state remains source-ledger-first; no console errors or horizontal overflow appear.
  - [ ] Task 6 — In the same fresh tab, set the viewport to 390×844 and inspect the empty or loaded responsive state, the topbar mark, sticky action, and workflow stepper.
    Expected: the mark is legible but secondary, all English copy wraps without clipping, and the primary action remains reachable without hover.
  - [ ] Task 7 — Verify keyboard semantics for the visible controls after the mark change.
    Expected: the mark contributes no tab stop, visible focus remains on interactive controls, and accessible names remain unchanged.
  - [ ] Task 8 — After a public merge and Pages deployment, run `HOSTED_URL=https://asdc163.github.io/pm-signal-lab/ npm run verify:hosted`.
    Expected: canonical HTTPS returns 200, current assets and English copy are present, and stale copy is absent.
- Verification gate: do not describe the visual pass as complete until local gates, fresh Chrome evidence, and the canonical hosted verifier all pass. Report real-user sessions, native screen-reader coverage, adoption, GitHub traffic, and stars as `未驗證` unless separately evidenced.
- Rollback: revert the single visual commit or close the branch before merge; because the change is CSS/markup-only and has no data or deployment migration, rollback is a normal code revert followed by the same local and hosted checks.

## UX/AI/security gate

- First-time and empty: the product statement and `Load sample data` remain the first-read task; the decorative mark adds no instruction.
- Loading and error/recovery: the mark is static and does not simulate thinking, progress, or a provider; existing loading and error/recovery copy remains unchanged.
- Mobile: the 390×844 layout keeps the mark secondary, preserves the sticky current action, and has no horizontal overflow.
- Accessibility and trust: the mark remains `aria-hidden`, adds no tab stop, does not change accessible names, and cannot imply that a source, claim, model, or GitHub action is verified.
- Security and permissions: this visual-only change adds no secret, permission, external request, telemetry, provider, GitHub mutation, or automatic submission path.

## Product truth guard

The mark is an identity cue only. It does not mean that a source has been verified, a claim is supported, an experiment is ready, a model ran, or a GitHub action happened. Those meanings remain in the literal workflow labels, source rows, status text, and boundary copy.
