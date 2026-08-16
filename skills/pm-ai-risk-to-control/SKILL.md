---
name: pm-ai-risk-to-control
description: Turn an AI product or agent hazard into a reviewable risk-to-control contract with affected users and assets, harm paths, preventive/detective/corrective controls, verification oracles, residual risk, ownership, fallback, rollback triggers, and a Ship, Pilot, Hold, Rollback, or Need evidence decision. Use for pre-launch or pre-change risk reviews; do not treat a risk register as safety, security, legal, compliance, or adoption evidence.
---

# PM AI Risk to Control

Use this skill before launching or materially changing an AI feature, assistant,
RAG flow, or agent. Turn a vague concern into a compact register that a PM,
design partner, engineering owner, security reviewer, and operations owner can
read together. Keep the risk, control, evidence, and release decision separate.

This is a planning and review aid. It does not scan a system, enforce a policy,
quantify risk, certify safety, or prove that a proposed control is deployed.

## When to use

Use it when the input includes one or more of these:

- a new AI capability, tool, agent action, data source, or autonomy level;
- a launch, model, provider, prompt, policy, permission, or workflow change;
- a concern about hallucination, prompt injection, privacy, security, access,
  misleading output, unsafe action, fairness, cost, latency, or recovery;
- a request to decide whether an AI change should ship, pilot, hold, or roll
  back;
- an existing risk list that has no clear control owner or verification oracle.

Use `pm-ai-incident-to-runbook` when harm or an operational failure has already
occurred and the primary job is response. Use `pm-ai-approval-to-flow` when the
primary job is to place a human approval in a specific action path. Use
`pm-ai-identity-to-boundary` when the primary job is to define who may act and
which authority is in scope. Use `pm-ai-task-boundary` when the primary job is
to divide work between a person and an AI system. Use this skill when the
decision is whether a risk is controlled enough for a product change.

Do not use it to create a generic compliance checklist, run a penetration test,
send a notification, change a production flag, call a model provider, upload
customer data, or claim that a product is safe because the table is complete.

## Guardrails

1. Name the affected user, job, asset, trust boundary, and possible harm. A
   model name or feature name is not a risk description.
2. Separate `hazard`, `harm`, `risk`, `control`, `control evidence`, and
   `residual risk`. Do not collapse them into one severity label.
3. Record the source and status of every material statement as `Observed`,
   `Reproduced`, `Inferred`, `Proposed`, `Not measured`, or `Unknown`.
4. Never invent probability, severity, prevalence, exposure, or control
   effectiveness. If the owner asks for a score without inputs and calibration,
   return `Not provided` and state what would make it measurable.
5. Distinguish inherent risk before controls from residual risk after controls.
   A proposed control does not reduce residual risk until its oracle has passed.
6. Classify controls as `Preventive`, `Detective`, or `Corrective`, and specify
   the failure path when the control is missing, bypassed, stale, or unavailable.
7. Keep approval separate from identity, authorization, enforcement, audit,
   and recovery. A button labelled “Approve” is not proof of permission.
8. For privacy, security, money, access, medical, legal, safety, or irreversible
   actions, require deterministic checks and human review where appropriate.
   Aggregate quality does not override a critical must-not-occur condition.
9. Treat no incident as absence of observed evidence, not proof of low risk.
   Treat one incident, one demo, one judge result, or one user opinion as a
   bounded signal, not population evidence.
10. Keep source provenance and data minimization visible. Do not copy raw names,
    account IDs, secrets, private URLs, tokens, payment data, or sensitive
    transcripts into a public artifact.
11. If evidence, owner, fallback, or rollback is missing, use `Need evidence`
    or `Hold`. Do not make a launch decision sound stronger than its inputs.
12. End with one review ask and one smallest next validation. Do not create
    external issues, deploy, modify permissions, or write to a registry.

## Core definitions

| Term | Meaning | Do not confuse it with |
|---|---|---|
| `Hazard` | A condition or behavior that could lead to harm | the harm itself |
| `Harm` | The negative user, organizational, societal, privacy, security, or operational consequence | a model error label |
| `Risk` | A bounded statement about the possibility and consequence of harm in a context | a numerical score without calibration |
| `Inherent risk` | The risk before the proposed controls operate | the post-control state |
| `Control` | A product, process, technical, human, or operational measure that prevents, detects, or corrects a hazard | a promise in a document |
| `Control oracle` | A deterministic, reference, human, or outcome check that can tell whether a control worked | a confidence sentence |
| `Residual risk` | The remaining risk after verified controls and fallback are considered | “low” by default |
| `Risk owner` | The person or role accountable for the decision and follow-up | the model provider |
| `Negative route` | An input or state that must abstain, clarify, deny, escalate, or recover | a normal happy path |
| `Release decision` | `Ship`, `Pilot`, `Hold`, `Rollback`, or `Need evidence` with conditions | a certification |

## Workflow

### 1. Frame the decision and user job

Write one sentence:

> We need to decide whether `...` can `Ship`, run as a bounded `Pilot`, stay on
> `Hold`, trigger `Rollback`, or remain `Need evidence` for `...`.

Name the user/job, current workaround, decision owner, affected asset, and the
cost of being wrong. If a field is missing, write `Not provided` rather than
guessing it.

### 2. Freeze the capability and change boundary

Record the feature or agent action, entry point, model/provider and version if
known, prompt/policy/config version, tools, data/context sources, user roles,
permission boundary, rollout stage, and what changed. Mark unknown versions as
`Not provided`. A previous approval does not automatically transfer across a
model, provider, tool, data, policy, or autonomy change.

### 3. Build the evidence and asset ledger

Assign stable IDs such as `S-001`, `A-001`, `T-001`, and `R-001`. For each source
or artifact, record its pointer, date/version, owner, scope, status, and
limitation. For each affected asset, record its user, data, account, tool,
decision, money, reputation, or operational state. Keep `Observed`, `Inferred`,
`Proposed`, and `Not measured` distinct.

### 4. Map the trust boundary and risk surface

Choose every relevant surface:

- `Model/output`: fabricated, misleading, biased, or overconfident content;
- `Data/context`: stale, poisoned, private, cross-tenant, or missing context;
- `Tool/action`: unauthorized, irreversible, duplicated, or mis-scoped action;
- `Identity/permission`: confused role, missing consent, or approval bypass;
- `UX/trust`: hidden uncertainty, unclear handoff, poor recovery, or false
  confidence;
- `Privacy/security`: secret exposure, prompt injection, exfiltration, or
  insecure output handling;
- `Operations/cost`: retry storm, latency, quota, drift, outage, or spend harm;
- `Fairness/impact`: unequal error burden, exclusion, or consequential access.

State where untrusted input enters, where authority begins, where data crosses a
tenant or system boundary, and where a human can inspect or stop the flow.

### 5. Write hazards and harm paths

For each material risk, write:

`Trigger → AI/system behavior → affected user or asset → harm → detection gap →
recovery or stop condition`.

Keep the mechanism narrow. “The model is unsafe” is not a useful hazard. “A
support agent states refund eligibility before plan date and policy source are
verified” is testable. Include high-impact, low-frequency paths even when
likelihood is `Unknown`.

### 6. Design the smallest control set

For each hazard, propose one or more controls and label each one:

- `Preventive`: constrain input, context, authority, tool, schema, or state
  before the risky behavior can occur;
- `Detective`: check source, policy, output, tool intent, permission, anomaly,
  or state before it becomes an accepted outcome;
- `Corrective`: stop, undo, quarantine, escalate, notify, repair, or roll back
  after a failure or uncertain state.

Specify the control owner, dependency, failure behavior, and whether the control
is already deployed, proposed, or not verified. Prefer a bounded fallback over a
claim that the model will always behave.

### 7. Define the control oracle and run status

Attach an oracle to every material control:

- `Deterministic`: schema, permission, policy-source, state, tool, or audit
  assertion;
- `Reference`: an approved policy, source, expected state, or domain rule with
  provenance;
- `Human`: a rubric, reviewer role, calibration sample, and adjudication path;
- `Outcome`: the user job, account state, or operational result actually
  completed.

Record execution status as `Passed`, `Failed`, `Not executed`, `Not reproduced`,
or `Not measurable`. Keep the oracle, run date, sample/slice, and limitation.
An LLM judge, thumbs-up, or absence of a report can support review but cannot
close a critical risk by itself.

### 8. Set residual risk, ownership, and acceptance

Re-state the harm after the verified controls and fallback. If the control has
not run, residual risk is `Unknown` or `Not verified`. Name a risk owner and,
where relevant, an acceptance owner. A product manager may document a decision;
they must not imply that documentation transferred legal, security, or
operational accountability.

### 9. Define negative routes, release, and rollback

Cover normal, friction, mismatch, and recovery routes. Define what happens for
missing context, prompt injection, privacy leakage, cross-tenant data, tool
failure, duplicate action, approval denial, stale source, provider outage,
model drift, monitoring failure, and contradictory evidence. State:

- must-pass control conditions;
- must-not-occur harm or action;
- `Ship`, `Pilot`, `Hold`, `Rollback`, or `Need evidence` decision;
- fallback, kill switch, stop owner, and rollback trigger;
- monitoring, review cadence, and the smallest post-release sample.

### 10. Write back without overstating

Return the contract to the authorized product, risk, issue, or decision record.
Preserve source links, versions, assumptions, unresolved contradictions, and the
next validation. End with exactly one review ask such as `Accept control`,
`Need evidence`, `Hold`, `Pilot with guardrail`, or `Rollback`.

## Output contract

Return these sections in order. Use `Not provided`, `Unknown`, `Not measured`,
`Not verified`, `Proposed`, or `Not covered` instead of filling a gap with a
plausible story.

## Decision on the desk

State the user/job, current workaround, decision owner, change boundary, risk if
wrong, and the conditional release decision.

## User, asset, and trust boundary

List users, roles, accounts, data, tools, decisions, external systems, tenant
boundaries, authority boundary, and the human stop or recovery point.

## Evidence and source ledger

List source IDs, pointers, versions/dates, owner, scope, status, limitations,
contradictions, and the next validation. Separate evidence from assumptions.

## Hazard and harm map

For each `R-...`, show trigger, system behavior, affected user/asset, harm,
risk surface, inherent risk evidence, and detection or recovery gap.

## Risk and control register

Use one row per hazard/control relationship:

| ID | Hazard / harm | Surface | Inherent risk | Control + type | Owner | Oracle + status | Residual risk | Decision |
|---|---|---|---|---|---|---|---|---|
| `R-001` / `C-001` | concise, specific harm | one taxonomy value | evidence or `Unknown` | preventive/detective/corrective | role or `Not provided` | check, date, `Not executed` | after-control state | conditional state |

Do not hide missing evidence in a color, score, or aggregate.

## Negative routes and trust states

Cover `No risk register`, `Incomplete evidence`, `Control proposed`, `Control
verified`, `High-impact blocker`, `Residual risk accepted`, `Fallback active`,
and `Post-release monitoring`. For each route, state what the user sees, what
the system is allowed to do, who can recover, and what remains unknown.

## Control verification and residual risk

List the oracle, test or review method, sample/slice, run date, expected result,
actual result, evidence link, reviewer, limitations, and whether residual risk
is `Known`, `Unknown`, or `Not verified`. Include a re-test trigger for model,
provider, prompt, policy, permission, tool, data, or UX changes.

## Release, fallback, and rollback

State must-pass, must-not-occur, fallback, kill/stop owner, monitoring, rollout
scope, rollback trigger, rollback action, and the next learning question.

## Not covered

List missing likelihood or severity data, unexecuted controls, unverified
deployment, unknown prevalence, missing consent or privacy review, untested
provider/client behavior, legal/compliance scope, adoption, traffic, retention,
and star impact. State which gap blocks the decision.

## Review ask

Ask the smallest decision question for the authorized owner: `Ship`, `Pilot with
guardrail`, `Hold`, `Rollback`, or `Need evidence`, plus the one missing artifact
or control that must be resolved next.

## Edge cases

- **No incident yet:** say `No observed incident supplied`; keep monitoring and
  negative-route design separate from a low-risk claim.
- **One signal:** preserve the case as a bounded observation; do not infer
  frequency, prevalence, or model superiority.
- **High impact, low or unknown likelihood:** keep the control, human review,
  fallback, and stop condition visible; do not dismiss the harm.
- **Missing source or stale source:** mark the control dependent on source
  freshness and set `Need evidence` or `Hold`.
- **Prompt injection:** map untrusted content, authority boundary, tool scope,
  output handling, detection, and recovery; do not call the injected tool.
- **Tool failure or duplicate action:** identify the external state, idempotency,
  confirmation, audit, compensation, and kill path.
- **Approval is present:** verify who may approve, what is shown, whether the
  approval is bound to the exact action, and what happens after denial.
- **Cross-tenant or sensitive data:** minimize fields, verify authorization and
  isolation, and hold when the data-use boundary is not established.
- **Model/provider/config change:** reopen affected risks and rerun the relevant
  control and regression evidence; do not inherit a prior decision silently.
- **Conflicting owners:** record the conflict and stop the release decision until
  accountability is explicit.
- **Requested risk score:** return the formula and required inputs as `Proposed`
  or `Not measurable`; never invent a number.
- **User accepts the risk:** record the scope, informed choice, expiration, and
  owner; user acceptance does not erase security, privacy, legal, or platform
  obligations.

## Final check

Before returning the contract, verify:

- the decision, user/job, change boundary, assets, trust boundary, and owner are
  explicit;
- every material hazard names harm, surface, inherent risk evidence, control,
  control type, oracle, execution status, residual risk, fallback, and rollback;
- unknown, proposed, observed, reproduced, and verified states are not blended;
- normal, friction, mismatch, negative, and recovery routes are included;
- prompt injection, privacy, permission, tool, model-change, monitoring, and
  cross-tenant edges are handled or marked as `Not covered`;
- no claim says safe, compliant, secure, improved, adopted, or ready without
  the evidence and scope to support it;
- the output ends with a bounded `Not covered` section and one review ask.
