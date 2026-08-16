# PM Source to Test — skills-first slice contract

Status: implementation slice. This document records scope and evidence gates;
it does not claim adoption, stars, or real-user validation.

## KB Application Contract

### Relevant KB and why it applies

- `foundations/agent-skills-lifecycle-operating-system.md`: use a small,
  portable skill with a clear trigger, concrete workflow, anti-rationalization
  guardrails, and a definition-of-done floor.
- `foundations/product-craft-anti-ai-slop-operating-system.md`: make the
  domain object specific (`source`, `claim`, `limitation`, `smallest test`)
  instead of adding generic AI positioning or another dashboard surface.
- `foundations/anti-ai-writing-tells.md`: keep outward-facing copy concrete,
  asymmetric, and tied to supplied source material.

The design reason is to make the skill useful through a narrow, inspectable
workflow rather than through more UI surface or generic AI positioning.

## Problem Frame

- Decision: should the first public extension of PM Signal Lab be a small,
  reusable PM skill rather than another web feature?
- User/job: a PM or product-minded builder needs to turn raw notes into a
  defensible next test while keeping the source line attached.
- Workaround: manually rewrite notes into a summary, often losing the source,
  limitation, or decision rule.
- Outcome metric: a new user can copy the skill and produce a source-linked
  review from supplied notes; real adoption is not yet provided.
- Evidence: the current repository already contains the domain objects and a
  deterministic hosted demo; no external PM session has been completed for
  this slice.
- Unknowns: whether third-party Agent Skills-compatible clients discover the
  skill correctly and whether external PMs find it useful.

### Product Craft Contract

```yaml
product_truth:
  target_user: "PMs, founders, product designers, and product engineers using an agent or reviewing product evidence"
  job_to_be_done: "Turn a messy product note into a defensible next test without losing the source line"
  first_read: "This is a portable PM skill, not another AI dashboard"
  proof: "A checked-in SKILL.md, a worked fictional example, and a deterministic validator"
  success_metric: "A new user can copy the skill and produce a source-linked review from supplied notes"

subject_specificity:
  domain_objects: ["source ledger", "candidate claim", "limitation", "smallest test", "not covered"]
  real_constraints: ["no invented evidence", "no tool or network requirement", "human review owns the decision"]
  signature_detail: "Every source-backed claim must show what its source does not prove"

creative_divergence:
  selected_direction: "one narrow, tool-free PM skill with a worked example"
  rejected_directions: ["new provider integration", "skills marketplace", "multi-route web app", "generic AI copilot"]

no_ai_feel_guard:
  checks: ["literal domain nouns", "no generic AI promises", "source and limitation beside claim", "fictional evidence labelled"]
  low_risk_alternative: "plain Markdown plus one no-dependency validator"

ux_and_trust:
  first_time: "README explains what the skill does and where the file is"
  empty_or_missing_input: "return Not provided or Not verified instead of a conclusion"
  recovery: "reviewer can correct source mapping, claim, limitation, or test independently"
  accessibility: "Markdown headings and tables remain readable in repository viewers"
  trust: "no tool permissions, network access, login, telemetry, or external mutation"

evidence_gate:
  static: "validator checks frontmatter, naming, required sections, line budget, example boundary, and placeholders"
  engineering: "npm test, npm run lint, npm run build"
  public: "CI must run the skill validator on the branch before merge"
  not_covered: "real PM sessions, third-party client loading, adoption, and GitHub star growth"
```

## Constraints and scope

### Product scope

Must ship:

- `skills/pm-source-to-test/SKILL.md` with a tool-free PM workflow;
- one fictional worked example under `references/`;
- a no-dependency validator exposed as `npm run verify:skills`;
- a short root README entry that explains the new skill without changing the
  hosted app's interaction model.

Constraints:

- keep the change small and reversible;
- do not change the existing web app interaction model;
- do not add runtime dependencies or external credentials.

Out of scope for this slice:

- model/provider integration;
- login, database, telemetry, marketplace, MCP, or GitHub mutation;
- a new web route or broad CSS redesign;
- claims about real users, adoption, or 10,000 stars.

## Files/surfaces and exact sequence

| Surface | Create | Modify | Test | Observe |
|---|---|---|---|---|
| Portable skill | `skills/pm-source-to-test/SKILL.md`, worked reference | none | `npm run verify:skills` | frontmatter, headings, evidence boundary |
| Repository entry point | none | `README.md` | Markdown link check by review | visitor can find and understand the skill |
| Quality gate | `scripts/verify-skills.mjs` | `package.json`, `.github/workflows/ci.yml` | validator plus existing CI commands | non-zero failure for malformed skill |
| Product evidence | contract | none | hosted static verifier | existing hosted app remains unchanged |

Files/surfaces summary:

- Create: `skills/pm-source-to-test/SKILL.md`, its worked reference, and
  `scripts/verify-skills.mjs`.
- Modify: `README.md`, `package.json`, and `.github/workflows/ci.yml`.
- Test: `npm run verify:skills`, `npm test`, `npm run lint`, and `npm run build`.
- Observe: validator output, CI result, repository links, and the unchanged
  hosted demo static check.

- [ ] Step 1: Create `skills/pm-source-to-test/SKILL.md`.
   Expected: valid frontmatter, literal PM nouns, source boundary, output
   contract, edge cases, and final check.
- [ ] Step 2: Create `skills/pm-source-to-test/references/support-draft-review.md`.
   Expected: the example is explicitly fictional and contains `Not covered`.
- [ ] Step 3: Create `scripts/verify-skills.mjs` and add `verify:skills` to `package.json`.
   Expected: the validator exits zero for this skill and non-zero for a missing
   required section or invalid name.
- [ ] Step 4: Add `npm run verify:skills` to `.github/workflows/ci.yml`.
   Expected: the public CI job checks the skill before tests, typecheck, and
   build.
- [ ] Step 5: Add a concise `Portable PM skill` section to `README.md`.
   Expected: a visitor can understand the skill's job and open its source file
   without confusing it with the hosted demo.

### Definition of done

- The skill is portable Markdown with no runtime dependency.
- The example does not present fictional data as a live outcome.
- The validator passes locally.
- Existing app tests, typecheck, build, and hosted static verifier pass.
- No existing `src/` or `src/styles.css` behavior is changed in this slice.
- Any failed hosted browser audit remains labelled as a gap; this slice does
  not close the existing post-merge browser evidence gap.

### Rollback

Revert the single skills-first commit or remove only the new `skills/`,
`scripts/verify-skills.mjs`, package script, CI step, README section, and this
contract. The hosted app code and its Pages deployment remain unchanged.

## Verification gate

The implementation is not complete until the local commands and public CI
evidence below are recorded. A green static check does not prove real PM use.

## UX/AI/security gate

- First-time: the README states what the skill does before asking a reader to
  copy it.
- Empty: missing input stays `Not provided` rather than becoming a conclusion.
- Loading: no loading state or external call is introduced.
- Error: malformed frontmatter or a missing reference makes the validator exit
  non-zero with a named failure.
- Recovery: a human can correct one source, claim, limitation, or test without
  regenerating the whole review.
- Mobile: the Markdown remains readable in GitHub's narrow repository view;
  no web UI change is part of this slice.
- Trust: no tool permission, secret, network access, login, telemetry, or
  external mutation is granted.
- AI boundary: the skill treats generated text as an artifact to review, not
  as evidence, and does not claim model quality.

## QA evidence manifest

| Layer | Command or observation | Pass condition | Status |
|---|---|---|---|
| Skill structure | `npm run verify:skills` | exit 0; required sections and example boundary pass | pending |
| Unit regression | `npm test` | existing test suite passes | pending |
| Typecheck | `npm run lint` | exit 0 | pending |
| Build | `npm run build` | exit 0 | pending |
| Existing hosted static check | `HOSTED_URL=https://asdc163.github.io/pm-signal-lab/ npm run verify:hosted` | canonical HTTPS, current assets, current copy | pending |
| Public CI | GitHub Actions after push | skill validator and existing gates pass | pending |
| Real PM session | external target user | at least one concrete observation with consent | not executed |
| Client loading | third-party Agent Skills-compatible client | skill is discovered and activated correctly | not executed |
| Adoption | GitHub traffic, clones, stars, feedback | current external readback only; no outcome claim | not a completion gate |
