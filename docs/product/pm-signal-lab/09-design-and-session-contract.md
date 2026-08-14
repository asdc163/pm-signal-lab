# Design and Session Contract

Date: 2026-08-15 (Asia/Taipei)

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
  - `foundations/product-craft-anti-ai-slop-operating-system.md`: product truth, subject specificity, and state evidence replace generic AI decoration; this applies because the public entry and earlier specs still needed to catch up with the current screen.
  - `foundations/design-brain.md` and `foundations/design-rule-hierarchy.md`: select project DNA and keep quality rules above taste; this applies because the workbench needs a deliberate composition rather than more styling.
  - `foundations/aesthetic-taste-system.md` and `foundations/design-composition-layout.md`: reduce card soup, establish reading path, type rhythm, and one signature detail; this applies to the visual second pass.
  - `foundations/product-messaging-copy-operating-system.md` and `foundations/anti-ai-writing-tells.md`: use literal product language, real constraints, and human voice; this applies to stale `Demo engine`, `live`, and other labels in the public documentation.
  - `foundations/frontend-ux-delivery-gate.md` and `foundations/behavioral-ux-qa-evidence-gate.md`: keyboard, mobile, recovery, trust, and interaction-grounded evidence are required; this applies before calling the hosted demo shareable.
- Why it applies: these sources change the implementation boundary from "make it prettier" to "make the product's job, state, trust, and recovery observable".
- Assumptions: GitHub Pages is controlled by the repository owner; the hosted release remains a public preview; external PM testers will be invited through a reviewable issue path rather than fabricated.
- Fastest evidence: run the local sample workflow, keyboard traversal, mobile screenshots, production build, then repeat the same path against the canonical GitHub Pages URL.

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

- [x] Step 1: Replace generic AI cues with literal product language. Evidence: current `src/App.tsx` exposes `資料邊界` and human decision copy; public docs are aligned in this release.
- [x] Step 2: Add the session receipt and feedback path. Evidence: the current app exposes `複製試用摘要`, excludes raw evidence from the receipt, and links to issue #4.
- [x] Step 3: Fix the mobile workflow control and semantic relationships. Evidence: the release audit records keyboard skip-link/focus behavior, `aria-expanded`/`aria-controls`, and 390/768 layout checks.
- [x] Step 4: Rebalance the visual system. Evidence: the editorial evidence desk audit records fresh 1440/768/390 browser checks and the screenshot set.
- [x] Step 5: Run `npm test`, `npm run lint`, and `npm run build`. Evidence: all passed in the current release audit; rerun after this documentation-only change before push.
- [x] Step 6: Publish the verified build to the canonical GitHub Pages URL. Evidence: `https://asdc163.github.io/pm-signal-lab/` returned HTTP 200 and the hosted workflow was browser-tested; this is a public preview, not production readiness.
- [ ] Step 7: Invite real PM testers through the session kit. Evidence required: submitted GitHub issues or private feedback containing the session schema; until then adoption remains `未驗證`.

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
