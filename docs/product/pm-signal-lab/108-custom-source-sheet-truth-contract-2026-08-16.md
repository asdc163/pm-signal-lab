# PM Signal Lab — Custom source-sheet truth contract — 2026-08-16

## Problem Frame

- **Decision:** Separate the deterministic support-draft fixture from a
  visitor's manually entered source sheet in the visible heading, subject
  metadata, sample identity, and exported experiment owner value.
- **User/job:** A PM should be able to bring one real observation into the
  worksheet and immediately know whether they are reviewing the sample case or
  their own local source notes.
- **Outcome metric:** After saving a manual source line, no sample-only
  `Support draft review`, `support draft`, or `fictional worksheet` label is
  presented as if it describes the user's own evidence; the sample path keeps
  its current case-specific labels.
- **Evidence:** Current code renders `Support draft review` and
  `support draft · fictional worksheet` whenever any pack exists, including a
  pack created from manual evidence. The sample pack id also exposes an
  internal AI-oriented name in a copyable session event, and the default owner
  field uses a generic placeholder.
- **Unknowns:** Whether real PMs prefer `Your source sheet` or another label
  remains unverified until non-owner sessions run against the current hosted
  candidate. This slice tests truthfulness and comprehension prerequisites,
  not product-market fit.

## Decision

Use the sample pack identity as the only source of sample-specific subject
copy. Manual entry uses a literal `Your source sheet` heading, `your source
notes · local sheet` subject metadata, and a neutral local pack id. Replace the
default experiment owner value with an actionable statement that the owner
still needs confirmation before the test.

This is a source-truth and comprehension correction. It does not add a data
model, provider, persistence, telemetry, upload, login, dependency, external
submission, or new workflow step.

- **Constraints:** English-first, local-first, deterministic fixture, existing
  four-step workflow, current refresh-clears behavior, and no new external
  state.
- **Out of scope:** a new import format, provider integration, persistence,
  analytics, formal hosted deployment, native AT certification, or claims about
  non-owner adoption.

## KB Application Contract

- **Relevant KB:**
  - `foundations/product-craft-anti-ai-slop-operating-system.md`: product
    truth and subject specificity must come from real domain objects, user
    language, and constraints; this prevents a manual note from being dressed
    as an AI fixture.
  - `foundations/design-rule-hierarchy.md`: hierarchy, state completeness,
    responsive behavior, accessibility, and trust outrank visual taste; the
    visible subject must match the state and source ownership.
  - `foundations/aesthetic-taste-system.md`: real data and real constraints
    make a tool feel used rather than template-generated; remove placeholder
    sophistication before adding decoration.
  - `foundations/design-composition-layout.md`: the first read and second read
    should follow the content relationship; the heading and subject line are
    the first truth cues before the source rows.
  - `foundations/behavioral-ux-qa-evidence-gate.md`: verify normal sample use,
    friction manual entry, and mismatch/recovery states with visible browser
    evidence rather than relying on source code.
  - `foundations/product-learning-loop.md`: a narrow change should reduce a
    known uncertainty and produce a regression case, not become another
    feature added without a learning question.
- **Why it applies:** The current manual-entry path changes the data but not
  the case identity. That is a mental-model and trust defect: a user can no
  longer tell which labels describe the fixture and which describe their own
  source. The smallest fix is to derive visible copy from the actual pack
  identity and retain the existing workflow.

## Product Craft Contract

### Product truth

- **Target user:** PM, founder, product designer, or product engineer adding a
  source line from their own work.
- **Job:** put one observed line on the sheet, inspect the claim it can support,
  and name the smallest test without confusing sample context with personal
  evidence.
- **First read:** `Your source sheet` for manual entry; `Support draft review`
  only for the deterministic sample.
- **Proof:** the heading, subject metadata, source row title, source identity,
  and local boundary all describe the same pack.
- **Success metric:** a fresh manual-entry browser path has no sample-only copy
  in the visible subject surface and still reaches Verify without error.

### Subject specificity

- **Domain objects:** source line, source sheet, sample worksheet, support-draft
  fixture, claim, limitation, smallest experiment, owner confirmation.
- **User language:** `Your source sheet`, `your source notes`, `local sheet`,
  `Owner to confirm before the test`.
- **Real constraints:** manual evidence remains on the page and is cleared on
  refresh; the product does not validate the user's source or infer adoption.
- **Signature detail:** the subject line tells the truth about who owns the
  source before the user reads the evidence row.

### No-AI-feel guard

- Do not make manual evidence look like a generated support-draft result.
- Do not add an AI badge, provider label, confidence score, or generated
  activity state.
- Keep AI-PM framing in the portfolio context and deterministic sample where it
  is factually relevant; keep user-entered source identity literal.

## Scope and acceptance criteria

### Files/surfaces

- **Create:** this contract and a focused local QA report under
  `docs/product/pm-signal-lab/`.
- **Modify:** `src/domain/fixture.ts`, `src/domain/synthesis.ts`,
  `src/App.tsx`, `src/domain/synthesis.test.ts`, `README.md`, `DESIGN.md`, and
  the QA evidence manifest if the current candidate evidence changes.
- **Test:** domain tests, lint, build, local hosted-copy verifier, a fresh
  Playwright manual-entry browser trace, existing normal and edge traces, and
  the current semantic/responsive checks.
- **Observe:** fresh blank → add signal → save one line → inspect heading and
  subject metadata → Verify; sample blank → open sample → inspect that the
  support-draft labels remain; export path owner text; refresh/reset recovery.

### Task sequence

#### Step 1 — Model the pack identity truthfully

- [ ] Rename the sample pack id to a neutral support-draft-review identifier and
  change the default experiment owner to an actionable confirmation value.
- **Expected:** copyable session events and exported briefs no longer expose an
  internal AI-copilot id or an opaque owner placeholder; domain tests remain
  deterministic.

#### Step 2 — Derive visible copy from the pack identity

- [ ] In `src/App.tsx`, derive sample versus custom source-sheet copy from the
  actual pack identity; preserve the current sample labels and use the custom
  labels only for manual entry.
- **Expected:** manual entry reads `Your source sheet` and `your source notes ·
  local sheet`; the sample still reads `Support draft review` and
  `support draft · fictional worksheet`.

#### Step 3 — Add regression oracles

- [ ] Add domain assertions for the neutral sample id and owner value, and add
  browser assertions for the custom/sample copy boundary.
- **Expected:** a future hard-coded sample heading in the manual path fails the
  browser oracle; both normal sample and manual-entry paths remain usable.

#### Step 4 — Record current evidence

- [ ] Capture fresh blank, manual, sample, Verify, and mobile screenshots; add
  a focused QA report and point the current evidence links at it.
- **Expected:** the report distinguishes owner-run local evidence from the
  canonical hosted release, native AT, and non-owner session gates.

## UX state matrix

| State | User sees | Required behavior |
| --- | --- | --- |
| First-time / empty | `Start with a source line` and sample action | The user can choose the deterministic sample or add a personal source. |
| Manual entry open | Add-source form with local boundary | The form explains that the text stays on the page; validation remains recoverable. |
| Manual sheet saved | `Your source sheet` and `your source notes · local sheet` | No sample-only support-draft subject is shown. |
| Sample loaded | `Support draft review` and `support draft · fictional worksheet` | Existing sample fixture labels remain unchanged. |
| Verify / Decide | Source-linked claims and owner confirmation text | The claim, limitation, and test owner remain editable and human-owned. |
| Refresh / reset | Empty sheet | Custom source, sample state, disclosure, and claim selection clear as already specified. |

This covers the first-time, empty, loading, error, recovery, mobile,
accessibility, and trust states. The loading behavior is not redesigned here;
the new oracle must confirm that this copy change does not alter the existing
state boundary.

## UX/AI/security gate

The product remains deterministic and local-first. No provider, secret,
permission, network request, raw-signal transfer, automatic issue submission,
or external mutation is introduced.

- Manual source text remains on the current page and clears on refresh.
- Sample-specific copy is shown only when the sample fixture identity is
  present; user-entered source identity is not inferred or embellished.
- The visible owner value must not imply that a test has already been assigned
  or run.
- Existing focus, keyboard, semantic labels, responsive layout, loading guard,
  and reset recovery must remain unchanged.

## Verification gate

- `npm test -- --run` — domain and export behavior remain green.
- `npm run lint` and `npm run build` — current TypeScript and production bundle
  remain valid.
- `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` — current local
  copy is present and stale sample labels are not introduced.
- Fresh browser trace at `390×844` and `1440×900`:
  blank → add signal → save → inspect custom subject → Verify; then fresh blank
  → sample → inspect sample subject → source disclosure → Verify.
- Existing normal/friction/mismatch traces: reset, refresh, validation,
  missing evidence, export, semantic scan, no overflow, no console errors, and
  no request failures.
- Visual review: inspect the custom and sample screenshots side by side; run a
  first-read, gray-scale hierarchy, box/container, responsive, and
  source-truth check.

## Risk and rollback

- **Risk:** custom copy may be too generic or a custom path may accidentally
  lose sample-independent source metadata.
- **Mitigation:** derive only the visible subject labels from the existing pack
  id; keep the evidence and claim model unchanged; test both pack types.
- **Rollback:** revert the focused source-truth commit. No migration,
  dependency, permission, provider, or external cleanup is required.

## Evidence boundary

This slice can prove that manual and sample source identities are not visually
conflated in the local browser preview. It cannot prove five-second
comprehension by non-owner PMs, formal hosted behavior, native screen-reader
output, physical-device behavior, adoption, or GitHub-star growth.
