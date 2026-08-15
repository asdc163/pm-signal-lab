# PM Signal Lab — Less-AI Subject Specificity Contract — 2026-08-15

## Decision

Keep PM Signal Lab as an English-first, local-first worksheet for moving a
product signal to a source-linked claim and a smallest test. Reduce the
remaining AI-template impression by changing the visible sample identity from
`AI support copilot: deciding what to test next` to `Support draft review:
deciding what to test next`.

AI remains visible where it is useful evidence: the subject-under-review line,
source text, claim wording, evaluation coverage, uncertainty, and stop
condition. It should not be the shell's headline, brand label, or simulated
assistant voice.

This is a copy and subject-specificity correction, with a small layout cue for
the loaded worksheet. It is intentionally reversible. It does not add a model,
provider, login, telemetry, upload path, automatic GitHub action, or new
growth claim.

## Product Craft Contract

### Problem frame

- **User/job:** An international PM, founder, product designer, or product
  engineer wants to keep the original product signal beside the claim it may
  support, challenge the claim, and leave with a small test someone else can
  review.
- **Current workaround:** Notes, source links, a chat transcript, and a test
  brief are kept in separate places. The provenance and limitation often get
  lost between them.
- **Current product truth:** PM Signal Lab is a deterministic local worksheet.
  Its public sample is fictional, its session state stays in the current page,
  and its export is a reviewable brief rather than a completed decision.
- **Observed design problem:** In the loaded state, the fixture title and
  topbar make `AI support copilot` the first semantic signal. The page then
  reads like an AI workflow product with an editorial skin, even though the
  product's actual job is source review and experiment framing.
- **Success metric:** In fresh 1280px and 390px sessions, the first loaded read
  should identify a PM review worksheet and the next action before a user sees
  AI-assistant language. This is an owner-run design oracle until non-owner
  sessions are collected.
- **Out of scope:** Adoption, model quality, retention, GitHub stars, external
  user comprehension, screen-reader sign-off, and any new AI provider.

### KB Application Contract

- **Decision:** Reframe the visible loaded subject around the PM work, while
  preserving AI product specificity inside evidence and claims.
- **User/job:** Read a real-looking source record, decide what it supports, and
  name the smallest defensible next test without treating a polished draft as
  proof.
- **Outcome metric:** The first loaded viewport passes the `PM worksheet before
  AI shell` comprehension oracle at desktop and mobile; external comprehension
  remains `not verified`.
- **Constraints / out of scope:** English-first public copy; deterministic
  fixture; no invented owner, adoption, quality, or market claim; no visual
  trend dependency; no destructive migration.
- **Relevant KB:**
  - [`foundations/product-craft-anti-ai-slop-operating-system.md`](../../../../Desktop/Claude知識庫/foundations/product-craft-anti-ai-slop-operating-system.md):
    product truth and subject specificity must lead the visual decision. This
    changes the fixture title and loaded context so the layout names the PM job
    before the AI subject. **Why it applies:** the old title made the AI
    category louder than the source-review job.
  - [`foundations/design-brain.md`](../../../../Desktop/Claude知識庫/foundations/design-brain.md):
    Quality Rules outrank Taste Guardrails, and Project Style Direction must
    come from the product context. This preserves readable states and uses the
    field-folio DNA as a restrained instrument rather than a generic AI skin.
    **Why it applies:** the visual direction must come from the working paper,
    not from an AI-product default.
  - [`foundations/design-rule-hierarchy.md`](../../../../Desktop/Claude知識庫/foundations/design-rule-hierarchy.md):
    first-read clarity is a hard rule; the project may change its visible
    subject label, but not remove source, limitation, control, or recovery
    evidence. **Why it applies:** less AI language cannot come at the cost of
    trust or usable state information.
  - [`foundations/aesthetic-taste-system.md`](../../../../Desktop/Claude知識庫/foundations/aesthetic-taste-system.md):
    remove fake sophistication and repeated AI cues through specificity,
    hierarchy, and a second visual review rather than extra decoration. **Why
    it applies:** the page already has a visual language; the remaining issue
    is semantic hierarchy, not a missing effect.
  - [`foundations/design-composition-layout.md`](../../../../Desktop/Claude知識庫/foundations/design-composition-layout.md):
    the first read is the PM task, the second read is source/context evidence,
    and the primary action remains one step-specific CTA. This avoids letting a
    fixture name become an accidental hero. **Why it applies:** the loaded
    fixture title currently appears before the source record.
  - [`foundations/ai-native-ux-operating-system.md`](../../../../Desktop/Claude知識庫/foundations/ai-native-ux-operating-system.md):
    AI role, context, uncertainty, control, and recovery belong in visible
    evidence objects. The shell must not simulate an agent or claim a live
    model. **Why it applies:** the product must demonstrate AI-PM judgment
    without pretending that its deterministic sample is an assistant.
  - [`foundations/product-messaging-copy-operating-system.md`](../../../../Desktop/Claude知識庫/foundations/product-messaging-copy-operating-system.md):
    use literal category language, concrete next actions, and honest limits;
    do not use AI praise as positioning. **Why it applies:** a title is a
    positioning decision, not just a cosmetic label.
  - [`foundations/anti-ai-writing-tells.md`](../../../../Desktop/Claude知識庫/foundations/anti-ai-writing-tells.md):
    remove abstract, repeated, symmetrical language and keep concrete source
    language. The public sample title becomes shorter and more human without
    deleting the AI-PM evidence from the workflow. **Why it applies:** the
    revised title names the working object in ordinary product language.
  - [`foundations/design-review-workflow.md`](../../../../Desktop/Claude知識庫/foundations/design-review-workflow.md):
    re-run desktop/mobile screenshots, behavioral traces, and a second polish
    pass; visual intent alone is not a release gate. **Why it applies:** the
    claim is about what users see and do, so it needs fresh UI evidence.
- **Assumptions:** The current English-first audience hypothesis remains
  international PMs, founders, designers, and product engineers. The word
  `AI` is still needed in README and evidence copy to show AI-PM relevance; it
  should be a subject qualifier, not the visual identity.
- **Fastest evidence:** Unit test for the fixture title and description; clean
  local build; fresh desktop/mobile browser snapshots; direct scan that the
  old visible title is absent and the subject-under-review cue is present;
  canonical hosted verifier after Pages deployment.

### Design read

> Reading this as: an English-first PM working paper for source review and
> experiment framing, with an editorial case-sheet language, low motion, and
> medium density.

- **Subject:** source lines, source identity, dates, claims, limitations,
  evaluation gaps, and the next test.
- **Audience need:** fast scanning and calibrated trust, not an AI demo.
- **Single job:** decide what one line can support.
- **Constraint:** local-only behavior, fictional deterministic content, manual
  GitHub handoff, responsive web, and honest evidence boundaries.
- **Signature:** a source folio with a red next mark and a blue provenance cue;
  no network mark, glow, chat bubble, model meter, or thinking animation.

### Loaded-state composition brief

- **First read:** `Check what this line supports`, sheet state, and the next
  action.
- **Second read:** `Support draft review` plus the subject-under-review cue,
  then source folios, source identity, date, and limitation.
- **Primary action:** `Start review` after the source ledger.
- **Content relationship:** `Source → Claim → Smallest test`; rows and ruled
  sections are preferred to card grids.
- **Alignment spine:** topbar context → folio title → source record; the
  subject cue is a quiet metadata line under the working-file heading.
- **Responsive reflow:** keep the subject cue readable at 390px; never let it
  push the first action below the fold without the sticky mobile action bar.

### No-AI-feel guard

- Do not use `AI support copilot` as the visible sample headline.
- Do not remove AI-PM evidence from source, claim, evaluation, or README copy;
  hiding the subject would make the portfolio less specific, not more human.
- Use `Support draft review` as the loaded worksheet title.
- Add one plain metadata line: `Subject under review · AI-assisted support
  drafting · deterministic sample`.
- Keep the first-run sample quote in user language: `The support draft looks
  finished...` rather than leading with `The copilot...`.
- Avoid new badges, gradients, or decorative AI symbols. The metadata cue must
  be a text relationship, not a pill wall.
- Keep claims and limitations editable, source-linked, and visibly human-owned.

## UX/AI/security gate

- **First-time / empty:** the blank worksheet still explains the job and offers
  `Open the sample worksheet`; no AI term is required to start.
- **Loading:** the existing local loading state remains honest and does not
  simulate thinking or provider activity.
- **Loaded / context:** the subject-under-review line names the AI-assisted
  product context while keeping the PM review job first.
- **Error / recovery:** invalid evidence and feedback privacy errors preserve
  field-level recovery; refresh still resets only the local page state.
- **Mobile:** the metadata line wraps within the 390px content column and the
  sticky next action remains reachable.
- **Trust / permission:** no provider, secret, upload, telemetry, or automatic
  GitHub submission is introduced; manual feedback review remains explicit.
- **AI evaluation boundary:** this slice evaluates copy hierarchy and
  deterministic interaction only; no live model, prompt, retrieval, latency,
  cost, or model-quality claim is added.

## Execution Contract

### Files and surfaces

- **Modify:**
  - `src/domain/fixture.ts`: rename the visible fixture title and tighten the
    description; keep the fixture ID stable for deterministic session events.
  - `src/App.tsx`: add the loaded subject-under-review metadata line and use
    the plainer first-run sample quote.
  - `src/styles.css`: give the metadata line a quiet ruled/provenance rhythm;
    preserve the current warm paper, ink, red correction, and blue provenance
    tokens.
  - `src/domain/synthesis.test.ts`: update the exact title oracle and assert
    that the fixture still contains evaluation and AI-PM claim language.
  - `scripts/verify-hosted-demo.mjs`: require the new visible copy and forbid
    the old visible title.
  - `README.md` and `DESIGN.md`: point current release references at this
    contract and describe the loaded subject decision.
- **Create:** this contract and a subsequent local QA report only after the
  browser evidence exists.
- **Observe:** first-run and loaded desktop/mobile DOM, screenshots, console,
  static asset requests, current/stale copy, and the feedback boundary.

### Task sequence

- [ ] **Task 1:** Update the deterministic fixture title/description and first-run quote.
   **Expected:** the old visible title is absent from source UI copy; the
   underlying AI support review claims remain present.
- [ ] **Task 2:** Add the loaded subject metadata line and its responsive style.
   **Expected:**
   a loaded session exposes `Subject under review` without creating a new card
   or pushing the primary CTA out of the mobile action path.
- [ ] **Task 3:** Update unit/static oracles. **Expected:** `npm test`, `npm run lint`, and
   `npm run build` all pass; the verifier catches a stale visible title.
- [ ] **Task 4:** Run fresh local browser review at 1280×900 and 390×844. **Expected:** the
   first five-second read is the PM worksheet job; source expansion, review,
   export, refresh reset, and privacy-gated feedback still work.
- [ ] **Task 5:** Inspect screenshots using the layout audit: reading path, type rhythm,
   container count, mobile wrapping, focus visibility, and no accidental AI
   shell language. **Expected:** no new visual regression and no unsupported
   claim.
- [ ] **Task 6:** Publish through the existing PR → `main` → Pages path only after local
   gates pass. **Expected:** canonical HTTPS verifier and hosted browser trace
   confirm the same current copy and behavior.

### Verification gate

```bash
npm test
npm run lint
npm run build
git diff --check
npm run verify:hosted
```

Fresh browser scenarios:

- `first-run`: page title, `Write down the line you can defend`, visible CTA,
  no loaded sample title.
- `loaded`: open sample, confirm `Support draft review`, confirm
  `Subject under review`, inspect the first source line, and confirm the old
  visible title is absent.
- `source-to-brief`: expand source → Start review → accept a claim → draft
  experiment → export → inspect Markdown.
- `recovery`: refresh after load and confirm the blank sheet returns; trigger
  invalid evidence and feedback privacy errors and recover without losing the
  safe boundary.
- `responsive`: run the first-run and loaded paths at 390×844 with
  `bodyWidth <= viewportWidth` and no horizontal overflow. In the current
  headed Chromium run, the vertical scrollbar reports
  `documentWidth=375`, `bodyWidth=375`, and `viewportWidth=390`; this is the
  expected scrollbar-adjusted client width, not horizontal overflow.
- `trust`: confirm no external network request is introduced beyond the static
  hosted document/assets/favicon; no automatic issue submission occurs.

### Evidence boundary

- **Can be proven in this slice:** deterministic fixture copy, local build/test
  health, owner-run browser behavior, desktop/mobile screenshots, current and
  stale static copy checks, canonical hosted HTTP/assets, and the manual
  feedback boundary.
- **Not proven by this slice:** that international users prefer the new name,
  that the product is no longer perceived as AI-like by non-owners, real model
  quality, adoption, retention, traffic, or GitHub star growth.

### Rollback

Revert the feature commit or restore the previous fixture title and remove the
metadata line in a focused follow-up PR. Do not reset the branch or overwrite
the private growth plan. The stable fixture ID and existing state model keep
rollback low-risk.

## Release decision

Current decision: **pilot after fresh local and hosted evidence**. The product
is not promoted to `validated`, `viral`, `adopted`, or `10K-star trajectory` by
this copy and visual change. Non-owner session evidence remains the next real
learning gate.
