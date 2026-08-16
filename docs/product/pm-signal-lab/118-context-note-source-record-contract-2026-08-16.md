# Context note source-record contract

Status: implemented and locally verified in PR #44 candidate; not a hosted-release approval.

## Problem frame

**Decision:** Reframe the lower `DecisionContext` from an active/empty system
rail into a concrete source-record margin note, while keeping its question,
rule, current action, and optional local receipt behavior unchanged.

**User/job:** An international PM moving through Collect, Verify, Decide, or
Ship needs a quiet reminder of what remains attached to the work and what to do
next. They should read a source record and a human decision path, not infer an
invisible AI session state from `active`, `empty`, or a status dot.

**Current workaround:** The current lower note says `Source set · active` or
`Source set · empty`, `Current source set`, `On this page`, and shows a status
dot. These labels are technically true but abstract; the source rows and
decision rule already provide the more useful product truth.

**Outcome metric:** At the existing loaded and blank browser paths, the lower
note exposes `Source record` and a concrete source-line count or blank-source
instruction; it no longer renders `Source set · active/empty`, `Current source
set`, or a `status-dot` inside the context note. Visible current-action count,
Session note disclosure, and workflow outcomes remain unchanged.

**Evidence boundary:** This can prove a more literal information hierarchy,
DOM-level removal of status-rail language, and unchanged local interaction
behavior. It cannot prove that international PMs prefer the new wording or
that the product has less AI flavor for real users until participant sessions
are collected.

## KB Application Contract

### Relevant KB

The following guidance was read and applied to this focused verification
slice; each item states why it applies to the decision and its tradeoff:

- `foundations/design-brain.md`: product context and product objects come
  before visual treatment. The lower note should name the source record and
  decision path, not an invisible system condition. Tradeoff: the note loses a
  compact active/empty shorthand and uses slightly longer literal copy.
- `foundations/design-rule-hierarchy.md`: quality rules preserve hierarchy,
  predictable actions, complete states, and trust; taste guardrails reject a
  dashboard/status shell. Removing the status dot and active/empty labels
  changes taste language without hiding the next action or local boundary.
- `foundations/product-craft-anti-ai-slop-operating-system.md`: AI feel is a
  product-truth and specificity problem. `Source record`, source-line counts,
  original-words language, and a local sheet boundary are concrete product
  objects. Tradeoff: less generic reassurance and more direct operational
  language.
- `foundations/aesthetic-taste-system.md`: delete template-like chrome before
  decorating; use hierarchy, typography, and ruled surfaces to carry meaning.
  This slice deletes one status indicator and keeps the existing workpaper
  surface. Tradeoff: the lower note becomes quieter and may feel less like a
  familiar dashboard panel.
- `foundations/design-composition-layout.md`: the lower note is a secondary
  read after the source/claim/test spine. Its alignment should support the
  source record → question/rule → next mark relationship rather than compete
  as a second dashboard.
- `foundations/ai-native-ux-operating-system.md`: context, provenance,
  control, uncertainty, and recovery should be explicit; a status dot is not
  evidence of any AI work. The local receipt stays progressively disclosed,
  while the visible note names the human-controlled source and next action.
- `foundations/behavioral-ux-qa-evidence-gate.md`: test the normal loaded path,
  blank path, mobile reflow, keyboard disclosure, current-action ownership, and
  regression. DOM copy alone is insufficient, so the local browser oracle and
  fresh screenshots must be rerun.

**Assumptions:** The current `DecisionContext` is a secondary reading surface,
not a required external integration contract. Existing source counts,
question/rule text, action ownership, receipt behavior, and local boundary are
the product truth to preserve.

**Fastest evidence:** local production preview at `390×844`, `1440×1000`, and
the existing source-truth / keyboard / edge oracles, plus fresh screenshots of
the loaded margin note.

## Product craft and composition contract

- **Product truth:** source rows and their attached claims are the primary
  objects; the margin note only summarizes the visible work.
- **First read:** current screen heading and source/claim/brief content remain
  unchanged.
- **Second read:** `Source record` → current sheet count → question/rule → next
  mark.
- **Primary action:** existing current-action ownership remains unchanged;
  mobile keeps the fixed bottom bar as the sole current action.
- **Subject specificity:** source record, source-line count, local sheet, and
  human decision rule are more specific than active/empty status.
- **Visual direction:** quiet editorial margin note; no new card, badge, dot,
  gradient, glass, animation, or dashboard ornament.
- **No-AI-feel guard:** no agent context rail, telemetry-like active state,
  model status, confidence language, fake progress, or invisible work claim.

## Scope and states

Must change:

- Replace the context heading boundary's status-dot copy with a literal local
  sheet/blank-sheet label.
- Replace `Source set · active/empty` and `Current source set` with `Source
  record` and a concrete count or blank-source instruction.
- Keep the existing question, rule, next-action behavior, Session note, local
  receipt, source-boundary semantics, and responsive layout.
- Update static copy verification, source-truth browser assertions, docs, fresh
  screenshots, and the QA manifest.

Should not build:

- New data, provider integration, AI output, telemetry, persistence, analytics,
  routing, authentication, external submission, or GitHub mutation.
- A new sidebar, dashboard, status meter, progress indicator, or decorative
  visual treatment.
- Participant comprehension or adoption claims.

State checks:

- **First-time / empty:** `Source record`, a clear no-line instruction, and the
  existing own-signal/sample paths remain discoverable.
- **Loading:** the existing static opening state and disabled CTA remain
  unchanged.
- **Loaded:** source count and question/rule remain visible; active/empty/status
  rail terms are absent from the context note.
- **Error / recovery:** empty-form validation, reset, refresh clear, and session
  receipt behavior remain unchanged.
- **Mobile:** the margin note wraps without horizontal overflow; the fixed bar
  remains the sole current action.
- **Accessibility:** accessible name, visible labels, keyboard-opened receipt,
  semantic structure, and focus behavior remain green; native screen-reader
  speech remains unverified.
- **Trust / AI:** no AI work or confidence is implied by the context note; the
  local-only boundary remains explicit.
- **Security / permission:** no secret, provider, upload, new permission,
  persistence, external request, or mutation is introduced.

## Constraints / out of scope

Keep the change English-first, local-first, reversible, and limited to the
existing lower context note. Do not change the source/claim/experiment data
model, current-action ownership, Session note receipt schema, hosted deployment,
Chrome Extension path, native AT coverage, participant research, adoption
measurement, or GitHub-star claims.

## Execution contract

### Files/surfaces

- **Modify:** `src/App.tsx`, `src/styles.css`,
  `scripts/verify-hosted-demo.mjs`, `scripts/verify-source-sheet-truth.py`,
  `README.md`, `DESIGN.md`, and
  `docs/product/pm-signal-lab/qa-evidence-manifest-2026-08-16.json`.
- **Create:** this contract, its local QA report, and fresh margin-note
  screenshots if the rendered surface changes.
- **Test:** KB plan score, unit tests, TypeScript, build, local hosted-copy
  verifier, keyboard flow, source-truth, session-boundary, responsive, edge,
  JSON, manifest, and diff checks.
- **Observe:** blank and loaded context note at `390×844` and `1440×1000`,
  visible action count, Session note closed/open/closed behavior, no overflow,
  no browser errors, and no request failures.

### Task sequence

- [x] Step 1 — Change only the `DecisionContext` visible labels and remove the
  context-note status dot. **Expected:** concrete source-record language with
  the same existing question/rule/action/receipt behavior.
- [x] Step 2 — Add only the margin-note visual overrides needed to keep the
  literal source record calm and aligned. **Expected:** no new surface or
  dashboard ornament.
- [x] Step 3 — Extend static and browser oracles to assert new source-record
  copy and absence of the old active/empty/status language. **Expected:** both
  blank and loaded paths are covered at mobile and desktop widths.
- [x] Step 4 — Run code, browser, recovery, responsive, and visual gates.
  **Expected:** all current local gates exit 0, no overflow/errors/failures,
  and loaded workflow behavior remains unchanged.
- [x] Step 5 — Record exact evidence in the QA report, manifest, README, DESIGN,
  and PR without claiming hosted release or participant comprehension.

## Verification gate

```text
python3 /Users/tommy/.codex/skills/kb-task-compiler/scripts/score_kb_plan.py docs/product/pm-signal-lab/118-context-note-source-record-contract-2026-08-16.md --min-score 85
npm test -- --run
npm run lint
npm run build
HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted
npm run verify:keyboard
npm run verify:source-truth
python3 scripts/verify-session-boundary.py
python3 /tmp/pm-signal-lab-margin-qa.py
python3 /tmp/pm-signal-lab-edge-qa.py
python3 -m json.tool docs/product/pm-signal-lab/qa-evidence-manifest-2026-08-16.json
python3 /Users/tommy/.codex/skills/product-qa-specialist/scripts/validate_qa_evidence_manifest.py docs/product/pm-signal-lab/qa-evidence-manifest-2026-08-16.json
git diff --check
```

**Expected:** all local commands exit 0; both viewport context notes show the
new source-record language; old active/empty/status-dot context language is
absent; current actions remain correct; screenshots pass visual inspection; no
external request, permission, persistence, or product mutation is introduced.

## UX/AI/security gate

- **First-time / empty:** the blank note explains that there is no source line
  yet and points back to the existing sample/own-signal paths.
- **Loading:** the existing static `Opening the sample worksheet` state and
  disabled sample button remain unchanged.
- **Error / recovery:** invalid form focus, cancel, reset, refresh clear, and
  missing-evidence recovery remain unchanged.
- **Mobile:** the source-record note wraps within the viewport, does not add a
  competing button, and leaves the fixed current action as the sole primary
  action.
- **Accessibility:** source-record labels remain visible and semantic; the
  Session note remains native `details`, keyboard-openable, and keyboard-
  closable; native screen-reader speech is not inferred.
- **Trust / AI:** no `active`, `empty`, status dot, model state, telemetry, or
  confidence signal is presented as proof of work; local boundaries remain
  literal.
- **Security / permission:** no API key, secret, login, provider, telemetry,
  upload, new permission, persistence, GitHub mutation, or external request is
  introduced.

## Risk and rollback

- **Risk:** removing active/empty shorthand may make the lower note less
  immediately scannable. **Mitigation:** retain the concrete source count,
  blank instruction, question, rule, and next action; inspect both widths.
- **Risk:** copy changes could break static or source-truth oracles.
  **Mitigation:** update required strings and assert both presence of the new
  source record and absence of the old status-rail terms.
- **Risk:** a visual cleanup could be mistaken for reduced AI complexity or
  better real-user comprehension. **Mitigation:** keep participant sessions,
  hosted behavior, native AT, adoption, and stars explicitly unverified.
- **Rollback:** revert the focused App/CSS/verifier/docs/manifest/screenshot
  changes. No data migration, dependency, permission, or external cleanup is
  required.
