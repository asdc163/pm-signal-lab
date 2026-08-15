# PM Signal Lab: design and accessibility completion contract

**Status:** implementation contract for the next public-preview polish
**Date:** 2026-08-15
**Owner:** Product owner
**Audience:** PMs, researchers, designers, and engineers trying the local-first preview

## KB Application Contract

### Relevant KB

- `foundations/design-brain.md` — product truth and task fit must lead the visual direction.
- `foundations/design-rule-hierarchy.md` — separate quality rules, taste guardrails, and project style so polish does not become decoration.
- `foundations/product-craft-anti-ai-slop-operating-system.md` — remove generic AI-product signals through subject specificity, honest states, and recovery paths.
- `foundations/aesthetic-taste-system.md` — preserve a restrained palette, clear type rhythm, one signature detail, and real content over card decoration.

### Why it applies / design reason

The current UI already has a valid source-linked evidence spine, but repeated `Case` and `case file` labels add costume around a simple PM task. Applying these KB rules means reducing metaphor, making the source-to-decision object hierarchy literal, and proving that the change improves comprehension without inventing capability.

## Problem Frame

- **Decision:** Should the next public-preview polish replace repeated case-file chrome with literal PM worksheet language while keeping the evidence spine and local-only boundary?
- **User/job:** A PM needs to trace a source line, challenge a claim, and name a smallest test without wondering whether the interface is summarizing, judging, or sending anything for them.
- **Workaround today:** People can read the current preview, but repeated archival labels compete with the source, claim, and action vocabulary.
- **Outcome metric:** In a fresh five-second read, a tester can point to the current step and next action; in the browser oracle, the primary keyboard path retains focus on a visible action and mobile `scrollY` remains `0` after sample load.
- **Evidence available now:** Current Chrome Extension local route shows the full workflow, blank-claim recovery, export, and pilot-note states; the old focus trace showed focus returning to `body` and mobile focus scrolling to the review docket.
- **Unknown:** Whether external PMs find the contracted labels clearer; there is no external session evidence yet.
- **Constraints:** English-first public copy, local-first runtime, no provider or telemetry, no login, no automatic GitHub mutation, reversible code-only change, and no fabricated adoption or star claims.
- **Out of scope:** Native screen-reader sign-off, real-user adoption, hosted behavior until the new build is deployed, and any change to account permissions or GitHub profile state.

## 1. Product craft contract

### Product truth

PM Signal Lab helps a product person move one traceable source line through a small decision workflow:

`source line → claim review → smallest test → portable brief`

The product must keep the source, claim, limitation, and next action visible together. It does not call an external model, upload user content, create GitHub issues, or prove adoption. The public preview is a local worksheet, not an autonomous analyst.

### User job

When a PM has an interview note, support case, or product observation, they need to decide what the line can support and what to test next without losing the original wording.

### Design decision

Keep the evidence spine and warm editorial palette as the product signature, but remove repeated archival labels that make the interface read like a generic AI-generated case-study template. Every label should answer one of three practical questions:

1. What source am I looking at?
2. What decision step am I in?
3. What can I do next?

### Style guardrails

- Keep the quiet paper-and-ink palette, serif display type, evidence spine, thin rules, and restrained terracotta accent.
- Keep the interface English-first and literal.
- Prefer source rows, workpaper sections, and one clear action over equal card grids.
- Do not add gradients, glass, floating orbs, AI chat bubbles, fake thinking, animated telemetry, or decorative trend charts.
- Use the accent for focus, state, and action; it must remain a small part of the page rather than a brand wash.
- Preserve a single signature detail: source content stays visibly connected to the decision path.

### Copy contract

Replace decorative or repetitive labels with literal product language:

| Current pattern | Contracted label | Reason |
| --- | --- | --- |
| `Case 01` in the top bar | `Worksheet` | Names the current surface without inventing a case-management system. |
| `Case 01 / Current work` | `Current worksheet` | Describes the live state directly. |
| `Case workflow` | `Workflow` | Removes an unnecessary metaphor from navigation. |
| `Case 01 / Start with evidence` | `Start with evidence` | Keeps the first-run instruction actionable. |
| `Case file / source lines` | `Source lines` | Puts the domain object first. |
| `Source ledger / case file` | `Source ledger` | Avoids repeating the same archive metaphor. |
| `Case file / Verify` | `Review claim` | Names the PM action, not the container. |
| `Case file / Decide` | `Test brief` | Names the artifact being authored. |
| `Case file / Carry forward` | `Decision brief` | Names the portable output. |
| `Case 01 / Active|Empty` | `Worksheet active|Empty worksheet` | Makes the state readable without a fictional case number. |
| `Case record` | `Worksheet record` | Keeps the metadata grounded in this session. |

These changes are copy and hierarchy changes only. They must not change the domain model, workflow states, or trust boundaries.

## 2. Scope and acceptance criteria

### Must ship in this slice

- Apply the contracted labels above to desktop, mobile, status, empty, loaded, Verify, Decide, Ship, and review-docket states.
- Preserve the evidence spine and source-to-claim relationship.
- Preserve the local-only boundary copy and manual-submit warning.
- After a keyboard action changes the workflow, focus a visible next action. On compact viewports, prefer the fixed mobile action bar so the viewport does not jump to the lower review docket.
- Preserve the existing blank-claim recovery behavior: reject blank input, keep the original text, expose an alert, and leave focus in the editor.
- Preserve mobile layout at 390×844 with no horizontal overflow and a reachable primary action.
- Keep every action and form field available by semantic role/name; no icon-only action may lose its accessible name.

### Nice to have, explicitly deferred

- Custom signal fixtures beyond the existing sample pack.
- Real-user analytics, authentication, server persistence, provider integrations, or automatic issue creation.
- Native VoiceOver, NVDA, TalkBack, or physical iOS/Android confirmation. These require an appropriate device or assistive-technology session and remain `Not verified` here.

### Do not build in this slice

- Star-growth automation, mass outreach, fake GitHub activity, or generated testimonials.
- Any provider API or background upload that would change the local-only promise.
- A dashboard of popularity, model confidence, or fabricated adoption metrics.

### Acceptance criteria

1. Fresh desktop load reads as a product worksheet within five seconds: source, claim, test, and next action are apparent without a generic AI dashboard cue.
2. Fresh mobile load at 390×844 keeps the headline, current step, and primary action in context; the first sample load does not scroll the user away from the top of the worksheet.
3. Keyboard route can reach the skip link, load sample data, follow the visible next action, expand a source, and reach the workflow controls without a mouse.
4. Invalid blank claim edit keeps the user in the editor, exposes a programmatic alert, and allows a valid replacement to save.
5. A reviewed claim can become a decision brief, copy/download locally, and generate a pilot note only after the privacy confirmation.
6. `npm test`, `npm run lint`, and `npm run build` pass after the change.
7. Public claims continue to distinguish local verification from hosted behavior, native assistive technology, real user sessions, GitHub adoption, and star count.

## 3. UX flow and state contract

| State | User must understand | Required affordance | Recovery / trust rule |
| --- | --- | --- | --- |
| Empty | Nothing has left the desk yet. | `Load sample data` and `Add your own signal`. | Explain refresh reset and no external transfer. |
| Loading | The sample pack is being prepared locally. | Busy state with `aria-busy`. | Keep the original workspace safe if loading fails. |
| Loaded / Collect | Four source lines are available. | `Start review`, source expansion, add/reset. | Do not imply that source lines are validated claims. |
| Verify | Each claim needs a source check. | Accept, keep as hypothesis, edit, mark missing evidence. | Source and limitation remain attached; blank edits fail closed. |
| Decide | A test must name metric, guardrail, and stop rule. | Choose a reviewed claim and draft the brief. | Unreviewed or missing evidence remains visible as a limit. |
| Ship | The brief is portable but not proof of success. | Copy/download, pilot note, manual GitHub link. | Inspect-before-sharing and manual submission stay explicit. |
| Error / blocked | The action did not complete. | Inline status or alert tied to the control. | Keep content on page and give a reversible next step. |

### Keyboard and focus oracle

- First `Tab` reaches `Skip to main content`.
- Activating the skip link focuses `main#main-content`.
- The next `Tab` reaches `Load sample data` in the empty state.
- Activating sample load keeps focus on the visible `Start review` action. On compact viewports, that action is the fixed action-bar button and `scrollY` remains at the top.
- Claim edit opens with focus in the textarea; a blank save keeps focus there and exposes `role="alert"`.
- Generating a decision brief moves focus to the output region; generating a pilot note moves focus to its inspectable output.
- Native screen-reader announcement quality is not claimed from DOM inspection alone.

## 4. Engineering execution contract

### Change boundary

- Primary surface: `src/App.tsx` label hierarchy and focus restoration.
- Styling surface: `src/styles.css` only if the contracted copy changes wrapping or needs a small spacing correction.
- Tests: existing domain tests remain the regression floor; browser evidence covers behavior and visual states.
- Durable evidence: this contract plus the following release audit.

### Files/surfaces map

| Action | Surface | Observable responsibility |
| --- | --- | --- |
| Create | `docs/product/pm-signal-lab/44-design-a11y-completion-contract-2026-08-15.md` | Preserve the product/design/QA contract and the evidence boundary. |
| Modify | `src/App.tsx` | Replace repeated labels and restore focus to the correct visible next action. |
| Modify if needed | `src/styles.css` | Only repair wrapping or spacing caused by the literal labels. |
| Test | `src/domain/*.test.ts`, `npm test`, `npm run lint`, `npm run build` | Keep domain behavior and production compilation green. |
| Observe | Chrome Extension local tab at `http://127.0.0.1:5176/` | Verify desktop/mobile behavior, focus, semantic names, screenshots, and console errors. |
| Observe | `https://asdc163.github.io/pm-signal-lab/` after deploy | Verify hosted HTTP, title, language, and current asset load separately from local QA. |

Surface verbs: **Create:** the contract and release evidence; **Modify:** `src/App.tsx` and only the required CSS wrapping; **Test:** domain tests, typecheck, lint, build, and browser behavior; **Observe:** local Chrome Extension and canonical hosted HTTP separately.

### Implementation order

1. Apply literal labels without changing state transitions.
2. Keep the current `data-current-action` focus hook and make compact viewport preference explicit.
3. Run typecheck, domain tests, and production build.
4. Run the Chrome Extension route at desktop and 390×844.
5. Inspect screenshots, focus trace, semantic snapshot, and console output.
6. Run an independent copy pass for AI-sounding claims, repeated labels, and unsupported promises.

### Execution checklist

- **Step 1 — map and copy:** identify every repeated label, then apply only the contracted PM vocabulary.
- [ ] Search the source for every contracted label before editing.
- [ ] Modify `src/App.tsx` and preserve existing workflow and boundary copy.
- **Step 2 — compile and regress:** run code-level checks before browser work.
- [ ] Run `npm test -- --run` and capture the exit status.
- [ ] Run `npm run lint` and `npm run build` and capture the exit status.
- **Step 3 — exercise states:** use fresh browser sessions for empty, loaded, recovery, and output states.
- [ ] Re-run the Chrome Extension route from a fresh empty state.
- [ ] Re-run the loaded desktop route through Verify, Decide, Ship, and pilot note.
- [ ] Re-run the 390×844 mobile route and inspect a fresh screenshot.
- **Step 4 — gate claims:** publish only the evidence layers actually observed.
- [ ] Record semantic/focus evidence and explicitly mark native screen-reader coverage `Not verified`.
- [ ] Search the final UI copy for stale `Case 01` and repeated `case file` labels.
- [ ] Only then prepare the release audit and public PR.

### Risk and rollback

- **Risk:** label changes alter line wrapping or make a heading ambiguous. **Mitigation:** inspect desktop and mobile screenshots and search for old labels.
- **Risk:** focus restoration scrolls to a hidden/secondary action. **Mitigation:** select the compact action bar first and verify `scrollY`.
- **Risk:** a copy change suggests persistence or external transfer. **Mitigation:** retain the boundary copy and re-run a literal trust scan.
- **Rollback:** revert the single feature branch/PR; no schema, hosting, account, or external data mutation is part of this slice.

## 5. QA and release contract

### UX/AI/security gate

- **UX gate:** empty, loading, loaded, error, recovery, mobile, keyboard, and focus states must retain a visible next step.
- **AI gate:** no fake reasoning, model feed, confidence score, automatic verdict, generic assistant voice, or claim stronger than the attached source.
- **Security/trust gate:** no raw signal transfer, provider key, token, customer data, automatic issue mutation, or hidden telemetry; pilot note requires an explicit privacy confirmation and manual review.

### Evidence layers

- **Local code:** tests, lint, and build.
- **Local browser:** Chrome Extension route, current behavior trace, screenshots, focus and semantic inspection.
- **Hosted:** canonical Pages HTTP/HTML/assets after deploy; this is separate from local browser evidence.
- **Native assistive technology:** `Not verified` unless a real VoiceOver/NVDA/TalkBack session is recorded.
- **Adoption:** `Not verified` until an external PM submits a report or another reproducible public artifact exists.
- **GitHub growth:** track actual stars only from GitHub; no target is represented as current performance.

### Release gate

Do not describe this slice as complete until the exact acceptance criteria are backed by current evidence. If a layer is unavailable, publish the limitation beside the result and hold the stronger claim.

## 6. Learning loop

The next learning question is not “does this look like an AI product?” It is:

> Can a PM identify the source, challenge the claim, and name the next test without asking what the decorative labels mean?

Record that answer through the local pilot note, ask testers to submit it manually through GitHub issue #4, and keep real session counts separate from self-run QA. Promote a change only when the evidence says the source-to-decision path became clearer without weakening the trust boundary.
