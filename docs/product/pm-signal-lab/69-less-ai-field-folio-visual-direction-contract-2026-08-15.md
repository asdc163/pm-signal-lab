# PM Signal Lab — Less-AI Field Folio Visual Direction Contract — 2026-08-15

**Status:** implementation contract for the next visual and copy pass
**Product:** PM Signal Lab public preview
**Audience:** international PMs, founders, product designers, and product engineers
**Locale:** English-first `en-US`
**Current rollback point:** `a4e995c`

## Why this pass exists

The current release is functional and evidence-led, but the latest visual review found a product-level mismatch: it still looks like an AI workflow product that has been given an editorial skin. The geometric node mark, source/claim spine, persistent four-step rail, repeated status labels, and prominent `AI support copilot` language make the interface read as an AI SaaS template before it reads as a PM working paper.

This is a design finding from the current screenshots and hosted browser review, not a claim about visitor perception. Real external comprehension is still `未驗證` until international PMs complete an unguided session.

## KB Application Contract

- **Decision:** move the public surface from an AI-workbench shell to an editorial field folio while preserving the source → claim → smallest-test behavior.
- **User/job:** an international PM needs to put one product line on the page, challenge what it can support, and leave with a brief that another person can inspect.
- **Outcome metric:** in a fresh 1280px and 390px session, the first read identifies the PM job and the first action without AI-assistant cues; the loaded state keeps the source row as the visual anchor. External comprehension remains `未驗證`.
- **Constraints / out of scope:** English-first; local-first; no provider, login, telemetry, raw-signal upload, automatic GitHub mutation, or fake model activity. No new visual trend tactic is justified.
- **Relevant KB:**
  - `foundations/product-craft-anti-ai-slop-operating-system.md`: product truth and subject specificity must lead the visual decision; **why it applies:** this prevents a generic AI shell from being mistaken for product differentiation.
  - `foundations/aesthetic-taste-system.md`: remove AI cheapness through stronger hierarchy, fewer repeated containers, and a deliberate second polish pass rather than adding decoration; **why it applies:** the current UI is polished but still reads as an AI workflow template.
  - `foundations/product-messaging-copy-operating-system.md`: every visible claim needs a concrete product object or boundary; **why it applies:** shell copy must not sell an unsupported AI capability.
  - `foundations/anti-ai-writing-tells.md`: replace symmetrical labels and generic workflow language with concrete, uneven, human-readable PM wording; **why it applies:** repeated labels are making the shell sound generated without adding product meaning.
  - `foundations/ai-native-ux-operating-system.md`: keep AI uncertainty, provenance, approval, and recovery explicit in the content objects; **why it applies:** the product needs AI-PM specificity without simulating an assistant in the chrome.
  - `foundations/behavioral-ux-qa-evidence-gate.md`: validate first-time, empty, loading, recovery, mobile, keyboard, trust, and visual hierarchy as behavior evidence rather than self-review; **why it applies:** visual intent is not user comprehension evidence.
- **Assumptions:** the repository name and public URL remain `pm-signal-lab`; the existing deterministic fixture and core workflow labels remain recognizable to avoid breaking current QA and international pilot instructions.
- **Fastest evidence:** fresh local and hosted screenshots plus browser traces for empty → sample → source expansion → review → export; direct string checks for stale AI-shell copy; `npm run lint`, `npm test`, `npm run build`, and `npm run verify:hosted`.

## Product Craft Contract

### Product Truth

PM Signal Lab is a local-first worksheet for keeping a product signal next to the claim it may support and the smallest test that could change the next move. The current fixture is a fictional AI support-copilot review, not a live model, support queue, or adoption report.

### Subject Specificity

The visual subject is a working folio: source lines, dates, source identity, review marks, limitations, test fields, and an exportable decision brief. The UI should feel like the place a PM writes down what can be defended, not the place an assistant performs intelligence.

### Creative Divergence

Use the visual language of a marked-up research folio and newsroom working paper: a warm paper field, ink hierarchy, red correction mark, blue provenance mark, folio numbers, ruled sections, and a restrained index rail. This direction is original to the product and does not copy an external prompt, template, or proprietary asset.

### No-AI Feel Guard

- Remove the network-style brand mark; use a folio index mark.
- Keep AI terms inside the sample product context and evidence rows, not in the shell's repeated labels.
- Replace generic status chrome with concrete sheet state and handling notes.
- Reduce card-like containers and graph-like circles; use ruled rows, margins, underlines, and source folios.
- Do not add chat bubbles, typing indicators, model scores, glowing effects, gradients, glass, or an abstract AI hero.
- Do not claim that the visual change proves usability, adoption, model quality, or GitHub growth.

### Design Risk Gate

No trend-led decoration is justified for this pass. The low-risk alternative is subject-specific typography, folio numbering, ruled structure, color used as editorial annotation, and a clear source-first reading path. Gradients, glass, bento, 3D, orb/blob, cursor effects, and kinetic type are rejected.

### UX Flow And States

The primary flow remains:

`Blank sheet → Open sample / Add signal → Read source folios → Start review → Accept or keep a hypothesis → Draft smallest test → Export Markdown → Optional local field note`

The pass must preserve:

- first-time and empty state with one obvious action and one manual alternative;
- loading state that explains the local boundary without fake model activity;
- source expansion and claim mapping with visible provenance;
- missing-evidence and recovery messages near the action that needs correction;
- mobile single-column reflow and sticky current action;
- keyboard focus, skip link, semantic headings, and status/alert semantics;
- trust copy stating that content stays on the page and GitHub submission remains manual.

## Scope and acceptance criteria

### Must-have

1. Fresh desktop and mobile views read as a PM field folio within five seconds of visual inspection.
2. The first visible action remains `Open the sample worksheet`; `Add your own signal` remains available.
3. The loaded sample keeps the source rows and review docket as the visual anchor.
4. The core selectors and browser flow remain intact.
5. Stale shell copy such as `Evidence desk / hosted demo`, `Hosted demo 0.1`, `Current work`, and `Desk note` is removed from the runtime surface and verifier expectations.
6. The hosted page remains English-first, HTTPS, HTTP 200, and free of console errors in the fresh fallback browser run.

## UX/AI/security gate

- **First-time / empty:** the blank folio names the PM job, exposes `Open the sample worksheet`, and keeps `Add your own signal` as a manual path.
- **Loading / error:** sample opening explains the local boundary, preserves the existing workspace on failure, and never simulates model thinking.
- **Recovery:** a missing claim source, blocked clipboard, blocked download, or rejected feedback privacy gate leaves the user's content available and names the next action.
- **Mobile:** the 390px view reflows to one column, keeps 44px controls, and exposes the current action without horizontal overflow.
- **Trust / AI:** source identity, date, limitation, approval state, and the deterministic fixture boundary remain visible; no provider, secret, permission, or external mutation is added.

### Nice-to-have

- A stronger page title and meta description that describe the working folio without promising AI automation.
- A durable design audit with screenshots and exact evidence boundaries.

### Should not build in this pass

- External model calls, generated answers, login, telemetry, database storage, automatic issue submission, or star automation.
- A growth claim, viral loop claim, or fabricated user/tester count.
- A second design system or a large component refactor unrelated to the visual finding.

## Exact execution contract

### Files and surfaces

- **Modify:** `src/App.tsx` for shell and PM-specific copy; preserve behavior and accessible names where the pilot depends on them.
- **Modify:** `src/styles.css` for the folio palette, mark treatment, ruled layout, source markers, and responsive overrides.
- **Modify:** `index.html` for English-first title, description, and theme color.
- **Modify:** `scripts/verify-hosted-demo.mjs` for the new current-surface strings and stale-string guard.
- **Modify:** `DESIGN.md` with the new selected DNA, rejected elements, and evidence link.
- **Create:** a local QA record with screenshot paths, behavior matrix, commands, and unverified coverage.
- **Create:** a hosted release audit only after the canonical deployment and fresh browser run pass.

### Task sequence

- [ ] **Step 1:** Replace the graph-like brand mark with a folio index mark and update shell labels. **Expected:** a fresh DOM contains the new field-folio language and no stale AI-shell labels.
- [ ] **Step 2:** Apply the warm paper / ink / red correction / blue provenance token pass. **Expected:** screenshots show a clearly different visual language while preserving readable contrast and no new gradient or glass treatment.
- [ ] **Step 3:** Convert source and claim markers from network-like circles to ruled editorial marks. **Expected:** source rows remain expandable and claims remain status-distinguishable by text plus mark.
- [ ] **Step 4:** Reduce rectangular card emphasis in the review, experiment, memo, and feedback surfaces. **Expected:** the reading path is ruled sections and margins, not a stack of SaaS cards.
- [ ] **Step 5:** Run `npm run lint`, `npm test`, `npm run build`, and `git diff --check`. **Expected:** all commands exit `0`.
- [ ] **Step 6:** Run a fresh local fallback browser session at 1280×900 and 390×844. **Expected:** empty, loaded, expanded-source, review, export, overflow, console, and keyboard checks produce screenshots and traceable results.
- [ ] **Step 7:** Run `python3 /Users/tommy/.codex/skills/product-qa-specialist/scripts/score_qa_plan.py <qa-report> --min-score 85`. **Expected:** score is at least `85/100`.
- [ ] **Step 8:** Push a reviewed branch, wait for CI, merge only after green checks, and read back the Pages deployment. **Expected:** remote head, CI, Pages deploy, canonical HTTP, and bundle readback agree.
- [ ] **Step 9:** Run `npm run verify:hosted` and a fresh hosted browser session. **Expected:** current strings are present, stale strings absent, HTTP 200, no console errors, and the core flow works.

### Rollback

Revert the visual/copy commit(s) to `a4e995c` if the new bundle fails build, hosted verification, source-to-claim interaction, mobile overflow, or the current trust boundary. Do not revert unrelated user work, including the private untracked growth plan.

## Evidence gate

This contract is not a claim that the redesign is complete. Completion requires fresh code, browser, visual, hosted, and release evidence. International user comprehension, real PM session feedback, adoption, and GitHub stars remain separate evidence lanes and stay `未驗證` until observed outside the maintainer's own run.
