---
name: pm-ai-independent-eval-to-release
description: Turn an independent or third-party AI evaluation into an evidence-bounded release decision covering claim type, evaluator independence, system and harness configuration, budget, validity hazards, access and publication boundaries, remediation, and rollback. Use when a PM needs to commission, review, or interpret an external evaluation of an AI model, agent, capability, safeguard, or product before deployment; do not treat one report, benchmark score, red-team exercise, or provider statement as proof of safety, truth, adoption, or production readiness.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Independent Evaluation to Release

Turn an external AI evaluation into a reviewable product decision. The unit of
work is not a headline score; it is the chain from claim to tested system,
harness, budget, validity checks, evidence, limitations, remediation, and
deployment action.

Independent evaluation can add perspective alongside internal testing, but it
does not become a safety certificate, compliance opinion, adoption signal, or
truth judgment. Keep the evaluator's result, the product's controls, and the
user's outcome as separate evidence layers.

## When to use

Use this skill when:

- a PM is commissioning or reviewing an independent lab, external expert, or
  third-party assessment before deploying an AI model, agent, or product;
- an evaluation needs to support a defined capability, safeguard, or system
  comparison claim rather than an unspecified “quality” claim;
- an agentic result may depend on tools, memory, retries, scaffolding, context
  management, environment state, or a product-facing harness;
- an external report needs a methodology review for scope, independence,
  conflicts, budget, task validity, contamination, refusals, reward hacking,
  evaluation awareness, or broken environments;
- a team must define safe model/checkpoint access, data retention, credentials,
  confidentiality, responsible disclosure, redaction, or publication terms;
- the result may change `Ship`, `Pilot`, `Hold`, `Need evidence`, or `Rollback`
  for a consequential AI capability.

Use `pm-ai-evaluation-plan` when the primary job is designing a general test
plan before an evaluator or result exists. Use
`pm-ai-review-to-calibration` when the primary job is aligning human or model
judgments. Use `pm-ai-prompt-injection-to-defense` when the primary job is one
untrusted-content attack path and its product controls. Use
`pm-ai-risk-to-control` for a broad hazard register, and
`pm-ai-incident-to-runbook` after a journey-level incident has occurred.

## Do not use this when

- the request is to run a live jailbreak, exploit, attack, scanner, or provider
  call;
- the only input is a vendor benchmark and there is no product claim or tested
  system to bound;
- the team wants a generic score, a public ranking, a certification, or a
  promise of production readiness;
- a red-team exercise is being treated as the whole evaluation; red teaming is
  a risk-discovery method and must be scoped separately from capability,
  methodology, and product evaluation;
- the open decision is primarily user approval, authorization, moderation,
  provenance, model migration, cost, or user retention;
- private customer data, hidden prompts, credentials, exploit payloads, or
  chain-of-thought would need to be copied into the public packet.

## Evidence boundary

Record each statement as `Observed`, `Reproduced`, `Supplied`, `Proposed`,
`Not run`, `Unknown`, or `Not covered`. A source may describe a method without
proving that the method was applied to this system.

| Evidence layer | It may establish | It cannot establish by itself |
| --- | --- | --- |
| `provider_or_standard` | documented evaluation, harness, or safeguard capability | this product's result, adoption, or deployment fitness |
| `evaluator_process` | who tested, under what independence, scope, access, and method | that the evaluator had representative coverage or no bias |
| `tested_configuration` | model/version, prompt, tools, memory, environment, budget, and safeguards actually in scope | behavior after a configuration, harness, or policy change |
| `evaluation_result` | observed scores, examples, failures, and analysis under the declared setup | a capability ceiling, real-world prevalence, or generalization beyond scope |
| `product_control` | deterministic gate, approval, sandbox, monitor, or fallback behavior | model capability or user outcome |
| `deployment_outcome` | a verified product run, pilot observation, or user decision at a named surface | broad adoption, safety, or causality without its own evidence |

If a report omits system identity, harness, budget, denominator, evaluator
conflict, task validity, or limitation, lower the claim or return `Need
evidence`. Never turn a missing field into a passing assumption.

## Core definitions

| Term | Working meaning | Do not confuse it with |
| --- | --- | --- |
| `Evaluation claim` | The precise capability, safeguard, or comparison statement the assessment is intended to support | a broad “the model is good” statement |
| `Independent evaluation` | An external assessment whose methods and conclusions are not fully controlled by the product team | a vendor marketing page or internal QA run |
| `Methodology review` | External scrutiny of the framework, data, scoring, or interpretation | a rerun of the product itself |
| `SME probing` | Domain-expert testing of real-world tasks with structured input | representative user research or adoption evidence |
| `Red teaming` | Proactive exploration of risks or attacks to discover issues and build evaluations | a complete deployment evaluation |
| `Harness` | Model-facing prompts, tools, interfaces, memory, retries, validators, control logic, and environment | the model name alone |
| `Maximum elicitation` | Testing for the strongest credible behavior under a defined effort/budget | an unlimited or undisclosed attempt count |
| `Validity hazard` | A condition that can inflate or suppress the measured result, such as reward hacking, refusal, contamination, broken task, or evaluation awareness | ordinary variance |
| `Evidence packet` | Versioned claim, configuration, run, artifacts, limitations, and decision records | a slide with one score |
| `Publication boundary` | What can be shared, redacted, delayed, corrected, or withheld, with an owner | permission to publish every raw artifact |
| `Release decision` | `Ship`, `Pilot`, `Hold`, `Need evidence`, or `Rollback` with conditions and owner | safety, legal, compliance, or adoption certification |

## Workflow

### 1. Frame the claim and decision

Write one sentence:

> Decide whether evidence from `<evaluation>` supports `<specific claim>` for
> `<user/job or deployment decision>` under `<scope, risk, and date>`.

State the current workaround, audience, decision owner, false-positive and
false-negative costs, version boundary, and what action the result could change.
Choose one primary claim class:

- **Capability elicitation:** what the system can plausibly produce under a
  credible setup;
- **Safeguard performance:** how robust a defined control is against a defined
  behavior or adversary model;
- **Controlled comparison:** how systems perform under equivalent conditions;
- **Methodology / assurance:** whether a test design or interpretation is fit
  for the decision;
- **SME probing:** what qualified experts observe on domain tasks.

Do not combine these into a single score. If the claim is “safe in production,”
split it into model behavior, product controls, user experience, operations,
and deployment evidence.

### 2. Establish independence, access, and authority

Create an evaluator ledger before accepting results:

| Field | Required question | Status |
| --- | --- | --- |
| `evaluator` | Who performed, funded, supervised, and reviewed the work? | `Observed` / `Unknown` |
| `expertise` | Which capability or risk area is in scope, and what qualification supports it? | `Observed` / `Not provided` |
| `conflicts` | What financial, publication, access, or relationship conflicts exist? | `Observed` / `Unknown` |
| `scope` | Which model, checkpoint, product surface, locale, tools, policies, and dates were tested? | `Observed` / `Not provided` |
| `access` | Which credentials, data, retention, logging, chain-of-thought, or reduced-safeguard access was granted? | `Observed` / `Not provided` |
| `authority` | Who can approve test changes, disclose a finding, remediate, or decide release? | `Observed` / `Not provided` |
| `publication` | Which raw artifacts, summaries, limitations, and corrections can be shared? | `Observed` / `Not provided` |

Treat evaluator access as least privilege. Do not place real customer data,
production secrets, private model weights, or unrestricted external write
authority into a test environment unless the access decision, retention,
isolation, owner, expiry, and rollback are explicit.

### 3. Freeze the tested system and harness

Assign stable IDs for the evaluation, model/provider/version, prompt or policy
version, tool and memory versions, task/environment snapshot, harness, budget,
scorer, reviewer, and report. For an agent, record:

- interface and user-visible surface, not only a raw model endpoint;
- tools, schemas, retries, timeouts, context/compaction, memory, validators,
  approvals, sandbox, and egress boundaries;
- initial state, external data, seed or randomization, locale, and policy;
- turns, tokens, attempts/retries, wall-clock budget, inference cost, and
  expected cost per successful solve where relevant;
- model-level and product-level mitigations that were enabled, disabled, or
  changed during the run.

If a report used a simpler harness than the real product, state the resulting
claim as a component or lower-bound observation. If the harness changed between
systems or runs, label the comparison `Not comparable` until the difference is
explained or the evaluation is repeated.

### 4. Define tasks, slices, oracle, and denominator

Build a small, versioned evaluation matrix before looking at the headline:

| ID | Claim slice | Task / fixture | Expected behavior | Oracle | Hard blocker | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `E-001` | core user job | safe fictional task | observable completion | deterministic or human reference | none | `Not run` |
| `E-002` | negative route | should abstain or ask | no unsupported assertion/action | route or policy oracle | unsafe action | `Not run` |
| `E-003` | edge / OOD | locale, format, or missing tool | bounded recovery | trace plus review | silent failure | `Not run` |
| `E-004` | validity | scorer or environment trap | no shortcut credit | sample inspection | reward hack | `Not run` |
| `E-005` | safeguard | safe category fixture | control blocks or escalates | product control receipt | privacy/security/action leak | `Not run` |

Use private or newly constructed tasks when contamination matters. Keep golden,
regression, negative, high-risk, OOD, and holdout slices distinct. Report
counts, missing cases, abstentions, retry/attempt policy, and the denominator.
A rate without its unit, sample, or budget is not a complete result.

### 5. Check validity hazards before interpreting results

For every result, record `checked`, `not checked`, or `not applicable` for:

- **Reward hacking:** the system earns credit through a shortcut in the task,
  scorer, prompt, tool, or harness rather than the intended behavior;
- **Refusals:** safeguards suppress the tested behavior and make capability or
  robustness difficult to interpret;
- **Contamination:** tasks, answers, or close variants were in training data or
  discoverable through tools;
- **Broken problems:** ambiguous ground truth, missing files, flaky services,
  impossible environments, or unfair scoring;
- **Evaluation awareness / sandbagging:** the system changes behavior because
  it recognizes evaluation or the consequences of a high score;
- **Harness and budget drift:** retries, tools, context preservation, scoring,
  or effort differ in ways that change the observed result;
- **Review drift:** a judge, rubric, policy, or human interpretation changed
  after seeing the result.

Inspect representative trajectories, not only summary scores. A higher score
with more shortcuts, malformed tool structure, or hidden refusal behavior is
not automatically an improvement.

### 6. Separate result, limitation, and product control

Write findings in this order:

1. **Observation:** what happened under the frozen setup.
2. **Interpretation:** what the result may support and what it cannot support.
3. **Limitation:** which task, model, harness, budget, validity, or access gap
   narrows the claim.
4. **Product consequence:** what control, UX state, human review, or scope
   restriction should change.
5. **Re-test:** which artifact or condition must be rerun after remediation.

Keep a model refusal separate from a product control that prevented a tool call,
blocked an egress path, or gave a user a safe recovery. Keep a capability result
separate from a user outcome. An external evaluator can provide additional
evidence; it does not own the product's final release decision.

### 7. Set data, confidentiality, and publication boundaries

For each artifact, define:

| Artifact | Minimum public form | Restricted material | Owner / expiry |
| --- | --- | --- | --- |
| task set | category, count, sampling rule, safe fixture | private prompts, live credentials, sensitive targets | `Not provided` |
| trace / trajectory | redacted step summary or stable ID | secrets, PII, hidden reasoning, private URLs | `Not provided` |
| score / report | claim, setup, denominator, limitations, result | confidential details, exploit-enabling material | `Not provided` |
| finding | sanitized issue, severity, mitigation, retest state | weaponizable payload or private incident detail | `Not provided` |

Record data retention, deletion/correction, access logging, responsible
disclosure, accuracy review, publication delay, and correction path. If a result
cannot be independently inspected because of confidentiality, narrow the claim
and label the evidence boundary instead of implying full transparency.

### 8. Choose the smallest release decision

- **`Ship`:** the claim is narrow and supported by the correct harness, critical
  validity checks are addressed, no hard blocker is open, ownership and rollback
  are real, and the product controls were tested at the surface that will ship;
- **`Pilot`:** exposure is narrow, high-impact actions are gated, human review or
  safe fallback exists, unresolved limitations have owners and dates, and the
  pilot has an observable stop rule;
- **`Hold`:** evaluator independence, configuration, task validity, denominator,
  access, publication, or control evidence is missing or not comparable;
- **`Need evidence`:** the decision is well framed but the relevant evaluation
  has not run or the supplied result cannot be verified;
- **`Rollback`:** a released claim or control is contradicted by a verified
  critical finding, regression, access failure, or unsafe product behavior.

For every choice, name the user-visible state, owner, TTL/review date, fallback,
rollback trigger, and one next learning question. Restore requires a new
verification window; silence is not evidence of recovery.

### 9. Write back and ask one review question

Return a packet that an evaluator, PM, engineering owner, safety/security
reviewer, and release owner can all inspect. Link the report, configuration,
validity notes, findings, remediation, re-test, publication status, and decision
without copying restricted content. Add a new regression, negative case, or
methodology correction to the authorized evaluation record when appropriate.

End with one concrete ask, such as:

- `Approve the narrow pilot with the stated stop rule.`
- `Hold until the harness and denominator are frozen.`
- `Add the validity failure to the holdout and rerun.`
- `Need the evaluator conflict, access, or publication record.`

## Output contract

Return these sections in order:

```markdown
## Evaluation decision on the desk
## Claim and user/job boundary
## Evaluator independence and access ledger
## Tested system and harness
## Task, slice, oracle, and denominator matrix
## Validity hazard review
## Result and limitation ledger
## Product control and remediation
## Data, confidentiality, and publication boundary
## Release, fallback, and rollback
## Not covered
## Review ask
```

Use `Not provided`, `Unknown`, `Not run`, `Not comparable`, `Not verified`,
`Proposed`, or `Not covered` when the evidence does not support a stronger
statement. For a copy-ready fictional shape, read
`references/independent-evaluation-release-brief.md`.

## Common rationalizations and red flags

| Rationalization | Red flag / correction |
| --- | --- |
| “The external lab is credible, so the score speaks for itself.” | Credibility does not replace a claim, configuration, harness, denominator, or validity review. |
| “It is the same model name, so the comparison is fair.” | Tools, retries, context, policy, budget, and product surface can change the result. Freeze or label the comparison. |
| “The benchmark is public and large, so it proves generalization.” | Public or reused tasks can be contaminated; report the tested distribution and limitation. |
| “The model refused, so the product is safe.” | Inspect tool calls, egress, data boundaries, user recovery, and product controls separately. |
| “Red teaming found no issue, so we can ship.” | Red teaming is one risk-discovery slice, not a complete capability, product, or deployment evaluation. |
| “We can publish the raw trace to build trust.” | Redact secrets, PII, hidden instructions, private URLs, and exploit-enabling detail; publish the smallest useful artifact. |
| “The report is confidential, so limitations do not need to be stated.” | Confidentiality narrows the claim; it does not justify silent uncertainty. |
| “A green CI run makes the external assessment complete.” | CI proves repository checks, not evaluator independence, harness validity, product behavior, or adoption. |

## Edge cases

- **No external evaluator:** produce a commissioning brief with `Result: Not
  run` and keep the decision at `Need evidence`.
- **Vendor-produced benchmark:** record it as `Supplied`, name the vendor's
  interest and setup, and do not label it independent.
- **Model-only test for an agent product:** state the product harness gap and
  do not generalize the model result to the agent.
- **Different harnesses:** report separate results or rerun under a shared
  setup; do not rank systems from an unqualified comparison.
- **Reduced safeguards or early checkpoint:** record the exact access boundary,
  isolation, retention, and the fact that the result may not represent the
  deployed configuration.
- **High score with reward hacking or broken tasks:** quarantine the result,
  correct the task/scorer, and return `Hold` or `Need evidence`.
- **High-risk red-team finding:** keep the safe summary public, restrict the
  payload, assign remediation, and do not claim the absence of a finding means
  the system is secure.
- **Small sample or no denominator:** keep the result descriptive and label the
  decision `Not measurable` or `Need evidence`.
- **Confidential third-party report:** preserve the report locator, scope,
  methodology review, and limitation statement without exposing restricted text.
- **Fictional or synthetic fixture:** label it clearly; it supports workflow
  shape and known edge cases, not real capability, safety, user, or adoption.

## Final check

Before returning the packet, confirm:

- the decision, user/job, claim class, evaluator, system, version, harness,
  budget, task set, denominator, and observation window are visible or marked
  missing;
- independence, conflict, access, data retention, confidentiality,
  publication, and responsible-disclosure boundaries are explicit;
- capability, safeguard, comparison, methodology, product control, and user
  outcome evidence are not collapsed into one score;
- golden, negative, edge/OOD, validity, high-risk, and holdout slices are
  represented where relevant;
- reward hacking, refusals, contamination, broken problems, evaluation
  awareness, harness/budget drift, and review drift are checked or marked;
- product controls, human review, fallback, rollback, owner, TTL, and stop
  condition are observable;
- the report distinguishes supported, unsupported, unknown, not run, blocked,
  and not covered claims;
- no secret, private payload, raw customer content, hidden reasoning, or
  unsupported safety, truth, legal, adoption, or production claim was added.

## References and first run

- For a copy-ready fictional workflow, read
  [`examples/first-run.md`](examples/first-run.md). It is a **fictional
  fixture**, not a live evaluation or deployment result.
- For a complete packet shape and source ledger, read
  [`references/independent-evaluation-release-brief.md`](references/independent-evaluation-release-brief.md).
- For current technical source context, read the official sources in the
  reference file; refresh them before making version-sensitive claims.

## Not covered

- This skill does not run an evaluation, red team, jailbreak, exploit, scanner,
  model call, external provider, or third-party engagement.
- It does not certify safety, security, compliance, legal status, truth,
  authorship, production readiness, user satisfaction, adoption, or GitHub
  growth.
- It does not authorize access to private data, model weights, credentials,
  hidden reasoning, production tools, or external write surfaces.
