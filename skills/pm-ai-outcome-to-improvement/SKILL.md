---
name: pm-ai-outcome-to-improvement
description: Turn an AI or agent proposal, human correction, downstream artifact, or verified external outcome into an evidence-bounded improvement finding. Use when a PM must separate model error from preference, workflow noise, product support, source or mapping issues, and downstream state; require identity joins, review, grouping, denominator, owner, next eval or fix, and rollback.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Outcome to Improvement

Turn the difference between an AI proposal and what finally happened into a
reviewable improvement finding. The central question is not “did a person edit
the output?” It is “what does the complete evidence chain support, and what is
the smallest safe next change?”

The output is a source-bounded finding packet. It is not an automatic root-cause
classifier, analytics collector, causal inference engine, training dataset,
issue creator, deployment, or proof that the product improved.

## When to use

Use this skill when:

- an AI proposal is later accepted, edited, rejected, reconciled, or replaced
  by a human or downstream system;
- a product team has a production or pilot correction signal and needs to tell
  model error from user preference, expected workflow variance, source data,
  mapping logic, unsupported product behavior, or an external state change;
- multiple reviewed differences may form a repeated improvement pattern, but
  the team needs a denominator, sampling frame, version boundary, and severity
  split before making a finding;
- an agent's trace, final artifact, human handoff, or downstream receipt must
  be connected to the actual user-job outcome;
- a PM needs to route a finding to an eval, regression, product, data/source,
  UX/control, incident, privacy, security, hold, or no-action destination;
- a team wants a continuous improvement loop while keeping human/domain review
  and reversible release gates in control.

Use `pm-ai-feedback-to-eval` when one reviewed feedback record needs to become
an evaluation case. Use `pm-ai-trace-to-regression` when one concrete failed
run needs reconstruction and a regression case. Use
`pm-ai-run-to-observability` when the primary problem is the trace/event
schema. Use `pm-outcome-to-metric` before an outcome measure exists, and
`pm-experiment-to-readout` after a bounded test has results. Use
`pm-ai-improvement-to-route` when the main question is which improvement lever
to choose before this finding is ready for a route-specific contract.

## Do not use

Do not use this skill to:

- collect or join live telemetry, access customer records, replay a side
  effect, create an issue, change a flag, deploy a fix, or train a model;
- call a correction ground truth, an accepted suggestion completion, a
  downstream status, or a judge label proof of model quality or user value;
- infer prevalence, causality, adoption, safety, or business impact from one
  case, one segment, a synthetic fixture, a thumbs-up/down, or an aggregate
  without exposure and denominator;
- collapse human preference, house style, policy interpretation, expected
  workflow variance, and factual/product error into one label;
- combine records across model, prompt, context, tool, product, tenant, locale,
  or time boundaries without preserving the boundary;
- route a high-impact privacy, security, authorization, money, medical, legal,
  or irreversible-action mismatch into optimization before containment and the
  responsible owner review;
- expose raw prompts, customer content, credentials, tokens, private URLs,
  hidden reasoning, proprietary documents, or private identifiers in a public
  packet.

Use `Not provided`, `Unknown`, `Not reconciled`, `Not reviewed`, `Not measured`,
`Not reproduced`, `Not run`, `Conflict`, `Not applicable`, or `Not covered` when
the evidence is missing.

## Evidence boundary

Keep these layers separate:

| Layer | It may establish | It cannot establish by itself |
| --- | --- | --- |
| `proposal` | what the AI suggested, under which version and context | that the proposal was wrong or useful |
| `human_or_domain_action` | what a person accepted, edited, rejected, or explained | that the action was factual ground truth |
| `downstream_state` | a later artifact, record, submission, approval, or external receipt | that the AI caused the final state |
| `trace` | the ordered path of model, tool, handoff, guardrail, and state events | a user outcome when the outcome system is not joined |
| `review` | a bounded interpretation or label under a rubric | population prevalence or unbiased causality |
| `grouped_finding` | a reviewed pattern with scope, evidence, and next owner | a verified fix or production improvement |
| `evaluation_result` | behavior on a declared slice and oracle | live user value or generalization beyond scope |
| `deployment_outcome` | a named product-surface result with its own denominator and window | causal impact without assignment or a valid comparison |

An improvement finding needs a complete enough chain from proposal to outcome,
or it must state exactly which join is missing. A fluent final answer, a correct
tool result, or a human edit is not a completed user outcome by itself.

## Core guardrails

1. Start with one user job, one product surface, one outcome oracle, one
   decision owner, and one observation window.
2. Freeze identity before interpretation: run, session, task, proposal,
   source, model/config, human action, downstream artifact, and outcome receipt
   IDs must be stable or explicitly `Not provided`.
3. Preserve the ordered chain: input/source → AI proposal → tool/guardrail or
   handoff → human action → final artifact/state → external or user outcome.
4. Separate observed difference, reviewer interpretation, label, expected
   behavior, and actual outcome. A correction may be a preference, workaround,
   policy choice, or another error.
5. Review the reason for the difference before grouping. “Changed” is not a
   root cause.
6. Keep sampling frame, eligible exposure, numerator, denominator, time window,
   segment, version, and missing records visible. Do not call a convenience
   sample representative.
7. Group only records with comparable user job, workflow, version boundary,
   outcome oracle, and mechanism hypothesis. Keep rare severe cases separate.
8. Keep correlation and causation separate. A downstream success after an AI
   proposal may include human work, external systems, or selection effects.
9. Make data purpose, consent or permission, tenant scope, redaction,
   retention, deletion, and eval/training destination explicit before any
   record is reused.
10. Route high-impact, unauthorized, unsafe, privacy, or irreversible outcomes
    to containment, incident, security, privacy, or approval owners before an
    improvement loop.
11. Choose the smallest next action: one reviewed finding, one eval slice, one
    product/control fix, one source repair, or one evidence collection step.
12. Preserve the baseline, a reversible implementation boundary, an owner,
    expiry, and a rollback receipt. A finding is not a release.

## Workflow

### 1. Frame the decision and user job

Write one sentence:

> Decide whether the difference between `AI proposal` and `final outcome` for
> `user job` on `surface` is an actionable improvement finding, expected
> workflow noise, another risk route, or `Need evidence`.

Record the current workaround, decision owner, risk if wrong, outcome oracle,
observation window, versions, and what would change the decision. If the job or
outcome is missing, keep the packet at `Need evidence`.

### 2. Freeze the evidence chain

Assign safe IDs such as `R-001` for the run, `P-001` for the proposal,
`H-001` for the human action, `A-001` for the final artifact, `O-001` for the
outcome, and `F-001` for the finding. Record each field as `Observed`,
`Supplied`, `Reviewed`, `Inferred`, `Proposed`, or a missing-state label.

| Link | Minimum record |
| --- | --- |
| Proposal | proposal ID, version/config, source/context IDs, output shape, timestamp |
| Workflow | route, tools, guardrails, handoffs, retries, permissions, and environment |
| Human action | actor class, accept/edit/reject/override, safe reason, rubric/reviewer |
| Final artifact | final value/state, version, source or downstream receipt |
| Outcome | user-job completion, external state, acknowledgement, correction, or pending state |
| Scope | tenant/segment/locale/device/risk and allowed retention/visibility |

If identifiers do not join, preserve the gap. Never invent a path from a likely
timestamp or similar text.

### 3. Classify the difference

Choose one primary class and list contributors. Keep `Unknown` valid:

| Class | Use when the reviewed evidence points to | Next owner candidate |
| --- | --- | --- |
| `MODEL_OR_GENERATION` | supplied job/context/source were adequate but the generated value/content failed | model/prompt/eval |
| `SOURCE_OR_RETRIEVAL` | the right source, freshness, authority, or citation was missing or wrong | retrieval/data |
| `MAPPING_OR_SCHEMA` | extraction, normalization, field mapping, or output contract changed the value | product/engineering/schema |
| `TOOL_OR_ORCHESTRATION` | a call, transition, retry, handoff, or tool boundary caused the mismatch | tool/orchestration |
| `PRODUCT_SUPPORT_GAP` | the workflow does not support the job or policy even if the output is plausible | product/UX/control |
| `HUMAN_PREFERENCE` | a style, convenience, or house preference changed an acceptable result | product/domain, not automatically model |
| `EXPECTED_WORKFLOW_VARIANCE` | the downstream process legitimately changes values or states | domain/process owner |
| `DOWNSTREAM_STATE` | the final state changed elsewhere or was not reconciled | integration/operations |
| `OPERATIONAL` | timeout, quota, latency, outage, partial state, or retry affected completion | reliability/incident |
| `UNKNOWN` | available evidence cannot distinguish the mechanism | collect evidence/hold |

The class is a hypothesis until the declared reviewer, oracle, reproduction, or
repeated reviewed pattern supports it.

### 4. Reconcile the outcome

For the named user job, answer separately:

- Was the AI proposal available, complete, and within the declared authority?
- Was the human action required, optional, a preference, or a correction?
- Did the final artifact/state satisfy the user job or only reach a workflow
  checkpoint?
- Is there an external receipt, source comparison, or domain confirmation?
- Is the terminal state `Completed`, `Completed with correction`, `Partially
  completed`, `Abandoned`, `Failed`, `Pending`, `Unknown`, or `Not applicable`?
- Which system owns the final truth, and was it read with permission?

Do not call `Accepted`, `Submitted`, `Saved`, `Returned 200`, or `No retry`
the same as a completed user outcome. If a result is delayed, keep it pending
and define a reconciliation owner and expiry.

### 5. Review and group repeated patterns

Review individual records before grouping. For each record, preserve:

- reviewer class, rubric version, decision, disagreement, and adjudication;
- evidence status, reason code, outcome state, severity, and actionability;
- model/config/version, workflow, source, locale, segment, and time window;
- whether the record is eligible, missing, duplicated, contaminated, or held;
- a safe pointer to private raw evidence, never the raw content itself.

Group only after defining stable keys such as user job, failure class, source
type, version, workflow step, or outcome state. Report the eligible exposure,
reviewed sample, numerator, denominator, missingness, and sampling rule. Keep
high-severity privacy, security, side-effect, or access failures outside an
average. A repeated pattern is still a finding hypothesis until the mechanism
and next oracle are explicit.

### 6. Write one improvement finding

The finding must include:

| Field | Required content |
| --- | --- |
| Finding ID | stable ID and source record IDs |
| User job | what the person was trying to complete |
| Difference | proposal, human action, final state, and safe outcome summary |
| Classification | primary class, contributors, confidence, and reviewer |
| Scope | affected versions, segments, exposure, window, and missingness |
| Impact | user, trust, quality, safety, cost, latency, or operational consequence |
| Mechanism | evidence-backed hypothesis and one alternative |
| Actionability | `actionable`, `needs evidence`, `expected variance`, `risk route`, or `no action` |
| Smallest next step | one eval, reproduction, source repair, UX/control change, or owner review |
| Stop rule | what blocks or disproves the next step |
| Owner/expiry | accountable owner, review date, and TTL |
| Rollback | baseline restore, disablement, data removal, or manual fallback |

Do not write “the AI is wrong” without the criterion and outcome evidence.

### 7. Route the finding

Choose one primary destination:

- `eval`: create or extend a reviewed slice while preserving contamination and
  holdout boundaries;
- `regression`: one reproducible failure must not return;
- `product`: the user job, support boundary, output contract, or workflow needs
  a product change;
- `data/source`: source freshness, provenance, permissions, labels, or mapping
  needs review;
- `UX/control`: people need inspect, edit, approve, clarify, abstain, or
  recover states;
- `incident/security/privacy`: impact or authority boundary requires immediate
  containment and specialized review;
- `hold`: the record is meaningful but permission, oracle, identity, or outcome
  evidence is missing;
- `no action`: reviewed expected variance, preference, duplicate, or harmless
  difference with a documented reason.

Do not select a model or prompt fix here if the evidence points to a product,
source, permission, mapping, or downstream-state issue. Use
`pm-ai-improvement-to-route` when several improvement levers remain plausible.

### 8. Define the smallest verification gate

Before an owner implements anything, state:

- baseline and candidate surface, with unchanged surfaces;
- the same user-job slices, critical negatives, and domain oracle;
- what counts as corrected outcome, safe abstention, human acceptance, and
  false pass/false block;
- sample, denominator, observation window, version and segment boundary;
- quality, evidence, safety, privacy, cost, latency, reliability, and user
  control checks as relevant;
- the owner, approval, exposure, stopping rule, rollback, and writeback receipt.

A finding may be actionable while its fix remains unverified. Keep
`Finding: reviewed` separate from `Fix: implemented` and `Outcome: verified`.

### 9. Write back and close the loop

Record the finding in the smallest private or approved destination. Link a later
eval case, regression, product decision, PR, release, or outcome receipt by ID.
When the finding is revisited, compare the same baseline boundary and state
whether the pattern shrank, moved, was reclassified, or remains unknown.

The loop is:

`proposal → human/downstream difference → reviewed classification → grouped
finding → targeted test or product change → verified outcome → new evidence`.

Do not automate the loop's external writes or promote a finding without an
authorized owner and current evidence.

## Output contract

Return these sections in order and preserve missingness explicitly:

### Improvement finding

In five lines or fewer, state the user job, difference, status, primary class,
owner, and one next action.

### Evidence chain

List proposal, workflow, human action, final artifact/state, outcome receipt,
source IDs, versions, timestamps, privacy/permission, and each missing join.

### Difference classification

Show observed facts, reviewer interpretation, primary class, contributors,
confidence, criterion, disagreement, and alternative explanation.

### Outcome reconciliation

State terminal status, completion oracle, downstream system of record, human
work, delayed/unknown state, denominator, time window, and causality limits.

### Pattern review and grouping

List review rubric, eligible records, sampling frame, grouping keys, slice
coverage, missingness, severe cases, duplicates/contamination, and whether the
pattern is actionable or still a hypothesis.

### Route and smallest next step

Choose `eval`, `regression`, `product`, `data/source`, `UX/control`,
`incident/security/privacy`, `hold`, or `no action`; then name one smallest
reversible next step, owner, stop rule, and rejected alternative.

### Verification and release gate

State baseline/candidate, slices, oracle, denominator, reviewer, guardrails,
exposure, rollback, and the separate status of finding, implementation, and
verified outcome.

### Data, permission, and trust boundary

State what may be retained, reused, exported, evaluated, or trained on; who may
see it; what is redacted; which tenant/provider boundary applies; and what is
blocked.

### Not covered

List every unjoined trace, unreviewed correction, missing outcome receipt,
unverified cause, unsupported prevalence, causal impact, quality, safety,
adoption, production, legal, accessibility, or business claim.

### Review ask

End with one choice: `Collect evidence`, `Review/group`, `Route to owner`,
`Run smallest test`, `Hold`, or `Escalate`, plus the receipt needed next.

## Edge cases

- **The person edited the output:** preserve the edit, reason, criterion, and
  final outcome. An edit may be preference, policy, correction, or another
  error.
- **The downstream system accepted the output:** distinguish receipt/acceptance
  from user-job completion and inspect later reconciliation or human work.
- **The final value differs from the source:** check source identity, extraction,
  mapping, normalization, user action, and downstream changes separately.
- **The same correction appears repeatedly:** review a sample, freeze versions,
  define exposure and denominator, and keep rare severe cases visible.
- **A correction rate improves:** confirm that sampling, UI, model, workflow,
  denominator, and user population did not change before interpreting direction.
- **A correction is delayed:** use a pending terminal state, expiry, and owner;
  do not count missing outcomes as successes or failures.
- **A domain expert disagrees:** preserve disagreement and adjudication; do not
  force a label to make a dataset larger.
- **A case contains sensitive content:** keep a private authorized pointer and
  publish only redacted IDs, categories, and evidence status.
- **A finding suggests fine-tuning or distillation:** route through
  `pm-ai-data-to-purpose` and `pm-ai-improvement-to-route`; do not reuse records
  or teacher outputs automatically.
- **A high-impact action already occurred:** stop optimization and route to
  incident, security, privacy, approval, or reconciliation ownership.

## Rationalizations to reject

| Shortcut | Why it fails | Required correction |
| --- | --- | --- |
| “The user fixed it, so the model was wrong.” | A correction may be preference or another error. | Require criterion, reviewer, and outcome evidence. |
| “The downstream API returned success.” | Transport or acceptance is not completed user value. | Reconcile the final state with the job oracle. |
| “The pattern happened often in our sample.” | Convenience samples hide exposure, missingness, and selection. | Add eligible denominator, window, and sampling rule. |
| “We can auto-label and train on it.” | Labels may be noisy, unauthorized, or contaminated. | Review purpose, permission, quality, and destination first. |
| “The aggregate improved.” | A severe slice or version shift can hide behind the average. | Split critical slices and freeze the comparison boundary. |
| “The trace explains the cause.” | A trace shows a path; it does not prove responsibility or outcome. | Keep mechanism as a hypothesis until an oracle supports it. |

## Final check

Before handing off, confirm:

- one user job, outcome oracle, owner, time window, and version boundary are
  explicit;
- proposal, human action, final state, external receipt, and actual outcome are
  separate evidence layers;
- every join is observed or marked missing, and terminal status is reconciled;
- correction, preference, expected variance, product gap, and unknown are not
  collapsed;
- grouping preserves denominator, sampling, segments, version, missingness,
  duplicates, contamination, and severe cases;
- the finding has one owner, one smallest next action, one stop rule, and one
  rollback path;
- data purpose, permission, retention, and public redaction are explicit;
- finding, implementation, and verified outcome are separate statuses;
- first-time, empty, error, recovery, delayed, approval, accessibility, and
  mobile states are represented where relevant;
- `## Not covered` lists every unsupported quality, causal, safety, adoption,
  production, or business claim.
