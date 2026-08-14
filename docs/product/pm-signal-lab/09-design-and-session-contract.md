# Design and Session Contract

Date: 2026-08-14 (Asia/Taipei)

This is the second-pass contract for turning PM Signal Lab from a local public preview into a product that people can actually try, understand, and report on.

## Problem frame

- Decision: make the first-run product feel like a calm evidence desk, not a generic AI demo, while giving a real PM tester a short path to complete and report.
- User/job: a PM has scattered notes and wants to decide what to check next without losing the source or overstating the evidence.
- Outcome metric: a first-time visitor can explain the product, complete the sample workflow, export a decision brief, and share a session receipt without sending evidence to a server.
- Evidence required: fresh desktop/mobile browser behavior, keyboard traversal, screen-reader-oriented semantic checks, successful production HTTP, CI, and externally submitted session feedback.
- Constraints: local-first data boundary, no API key, no telemetry, no invented adoption, no automatic external side effect.
- Out of scope: provider integration, account system, external evidence ingestion, automated GitHub mutation, and claiming market adoption before real sessions.

## KB Application Contract

- Decision: use product truth, an evidence-spine composition, and a copy-only session receipt to make the public preview feel like a real PM workbench.
- User/job: a PM needs to move from an observation to one defensible next check without losing source context.
- Outcome metric: first-run comprehension, core task completion, keyboard/mobile task completion, and the number of externally submitted session reports. Adoption remains `未驗證` until reports exist.
- Constraints / out of scope: session-local data, no provider/API key, no automatic public interaction, no invented usage claims; provider integration and account storage remain out of scope.
- Relevant KB:
  - `foundations/product-craft-anti-ai-slop-operating-system.md`: product truth, subject specificity, and state evidence replace generic AI decoration; this applies because the current screen still exposes generic AI labels.
  - `foundations/design-brain.md` and `foundations/design-rule-hierarchy.md`: select project DNA and keep quality rules above taste; this applies because the workbench needs a deliberate composition rather than more styling.
  - `foundations/aesthetic-taste-system.md` and `foundations/design-composition-layout.md`: reduce card soup, establish reading path, type rhythm, and one signature detail; this applies to the visual second pass.
  - `foundations/product-messaging-copy-operating-system.md` and `foundations/anti-ai-writing-tells.md`: use literal product language, real constraints, and human voice; this applies to `Demo engine`, `live`, and other labels.
  - `foundations/frontend-ux-delivery-gate.md` and `foundations/behavioral-ux-qa-evidence-gate.md`: keyboard, mobile, recovery, trust, and interaction-grounded evidence are required; this applies before calling the hosted demo shareable.
- Why it applies: these sources change the implementation boundary from "make it prettier" to "make the product's job, state, trust, and recovery observable".
- Assumptions: Vercel is authenticated to an account the owner controls; the first hosted release can remain public preview; external PM testers will be invited through a reviewable issue path rather than fabricated.
- Fastest evidence: run the local sample workflow, keyboard traversal, mobile screenshots, production build, then deploy and repeat the same path against the canonical URL.

## Product Craft Contract

### Product truth

PM Signal Lab is a local-first evidence workbench. Its real objects are evidence rows, candidate claims, source mappings, experiment fields, and a decision memo with `Not covered`. The first screen should show that working relationship, not promise intelligence.

### Subject specificity

- Domain objects: `Evidence`, `Claim`, `Experiment brief`, `Decision memo`, `Not covered`.
- User language: 「我現在應該先看哪一個問題？」 and 「哪一句是使用者真的說過的？」
- Signature detail: the evidence spine connects a source row to the claim review, so provenance is part of the layout.
- Real constraint: the demo is session-local and deterministic; it does not prove model quality or adoption.

### Composition brief

- First read: the literal job and the current workspace state.
- Second read: source rows, not decorative feature cards.
- Primary action: one step-specific action at a time.
- Layout: quiet workbench with a left workflow rail, an evidence spine, and a decision context rail.
- Density: medium on desktop, stacked and thumb-readable on mobile.
- What not to use: sparkle icons, purple gradients, glass, bento feature walls, fake live status, or unexplained AI labels.

### Copy guard

- Prefer literal verbs: `載入範例`, `查看來源`, `接受 claim`, `保留為假設`, `草擬 brief`, `複製 session 摘要`.
- Name the boundary in the same place as the action.
- Do not call a fixed rule a model, an engine, or a live system.

## Execution contract

### Files/surfaces

- Create: `src/domain/session.ts`, `src/domain/session.test.ts`, `docs/operations/pm-session-kit.md`, `.github/ISSUE_TEMPLATE/pm-session-feedback.md`.
- Modify: `src/App.tsx` for semantic landmarks, a real mobile workflow control, less generic labels, a session receipt action, and a feedback link.
- Modify: `src/styles.css` for a warm paper-like neutral system, stronger type hierarchy, quieter surfaces, visible focus states, reduced container noise, and mobile safe-area spacing.
- Modify: `src/domain/export.ts` for plain-language provenance copy.
- Modify: `DESIGN.md`, `README.md`, and `index.html` to align public claims and the design source of truth.
- Test: `src/domain/session.test.ts`, `npm test`, `npm run lint`, `npm run build`, keyboard traversal, mobile/desktop browser flows.
- Observe: local screenshots, hosted HTTP, hosted browser flow, CI run, and real GitHub session feedback issues.

### Task sequence and oracles

- [ ] Step 1: Replace generic AI cues with literal product language. Expected: source scan has no sparkle/demo/live labels in user-facing workflow, and the app compiles.
- [ ] Step 2: Add the session receipt and feedback path. Expected: a loaded sample session can copy a receipt containing counts, current step, event names, and an explicit not-covered boundary without raw evidence text.
- [ ] Step 3: Fix the mobile workflow control and semantic relationships. Expected: keyboard can reach the control, the menu scrolls to the stepper, expanded rows expose `aria-controls`, and focus remains visible.
- [ ] Step 4: Rebalance the visual system. Expected: 1440, 768, and 390 screenshots show a clear first read, no horizontal overflow, no card soup, and a coherent neutral/accent ratio.
- [ ] Step 5: Run `npm test`, `npm run lint`, and `npm run build`. Expected: all exit successfully.
- [ ] Step 6: Deploy the verified build to a canonical hosted URL. Expected: Vercel deployment reports ready and the canonical URL returns HTTP 200; the hosted URL is then browser-tested separately.
- [ ] Step 7: Invite real PM testers through the session kit. Expected: submitted GitHub issues or private feedback contain the session schema; until then adoption remains `未驗證`.

### Rollback

Revert the design/session commits while retaining the prior public bootstrap commit. The session receipt is a local copy-only feature and has no server or database migration.

## Release gates

### UX/AI/security gate

- UX gate: first-time, empty, loading, error, recovery, mobile, keyboard, trust, and copy states are checked in the browser.
- AI gate: the product labels the fixed-rule demo honestly, exposes source/limitation, and does not claim model quality.
- Security gate: no raw evidence is sent by the preview, no secrets enter client code or issues, and the feedback route warns against private data.

- Local code: tests, lint, build.
- Browser: first run, normal workflow, invalid form recovery, session receipt, keyboard path, mobile 390/768, desktop 1440.
- Hosted: canonical HTTP, fresh hosted browser workflow, no console errors in covered path.
- Accessibility: semantic landmarks, visible focus, labels, keyboard completion, reduced motion, and an automated accessibility scan where available.
- Human evidence: do not mark the real PM session gate complete until an external tester submits a report. A self-run or scripted run is regression evidence, not market adoption.
