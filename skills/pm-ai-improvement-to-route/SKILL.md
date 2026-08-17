---
name: pm-ai-improvement-to-route
description: Turn an observed AI product quality, trust, cost, latency, coverage, or completion gap into a source-bounded choice of improvement route across prompt, context, retrieval, tools, model, data, UX, or fine-tuning. Use before committing to one technique; require a user job, failure localization, paired evaluation, permission boundary, owner, stop rule, and rollback.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Improvement to Route

Choose the next AI improvement lever from evidence, not fashion. This skill is
for the decision before a team commits to a prompt edit, broader context,
retrieval, a tool or orchestration change, a model or effort change, a data
reuse path, a UX/control change, or fine-tuning/distillation.

The output is a reviewable route packet. It is not an optimizer, benchmark
runner, model or vendor recommendation, tuning pipeline, deployment, or proof
that a candidate will improve a live product.

## When to use

Use this skill when:

- an AI product has a named user-job gap but the team has not agreed which
  layer is responsible or which intervention to test first;
- a proposed fix could be a prompt, context, retrieval, tool, orchestration,
  model, reasoning effort, provider, data, product-control, or UX change and
  the trade-off is not yet visible;
- a team is tempted to fine-tune or distill because a narrow score, cost target,
  or provider feature appears attractive;
- a quality improvement may trade against safety, privacy, evidence, latency,
  cost, reliability, user control, or maintainability;
- a PM needs one smallest, reversible next experiment with a paired baseline,
  an owner, an evaluation slice, and a stop or rollback rule;
- a provider capability, model lifecycle notice, or data-control change may
  change which routes are actually available.

Use `pm-ai-signal-to-intervention` when the primary decision is how to respond
to a validated live signal. Use `pm-ai-trace-to-regression` when one concrete
failed run should become a minimized regression case. Use
`pm-ai-context-to-contract`, `pm-ai-prompt-to-version`, `pm-ai-retrieval-to-grounding`,
`pm-ai-tool-to-contract`, or `pm-ai-orchestration-to-contract` after that route
has been selected. Use `pm-ai-model-to-route` for a model/provider route
decision, `pm-ai-model-change-to-migration` for a lifecycle migration,
`pm-ai-cost-to-guardrail` for economics or latency as the primary question,
`pm-ai-data-to-purpose` for the data lifecycle, and
`pm-ai-evaluation-plan` or `pm-ai-independent-eval-to-release` for evaluation
design or independent evaluation respectively.

## Do not use

Do not use this skill to:

- call a model or provider, run fine-tuning or distillation, inspect a billing
  account, change a prompt or route, enable a flag, deploy code, or send data;
- pick a vendor from reputation, a current price, one leaderboard, or a
  provider statement without task-level evidence and eligibility checks;
- replace a missing baseline, denominator, evaluator, data permission, model
  identity, or user outcome with a plausible value;
- expose raw prompts, customer content, credentials, tokens, private URLs,
  hidden reasoning, or a proprietary training set in the packet;
- make a composite score that hides quality, safety, privacy, cost, latency,
  reliability, or user outcome differences;
- optimize a security incident, privacy breach, authorization failure,
  harmful side effect, or cross-tenant leak before containment and the proper
  security or incident route;
- call a fictional fixture a user study, benchmark, adoption result, safety
  assessment, production result, or release proof.

Write `Not provided`, `Unknown`, `Not measured`, `Not run`, `Not reproduced`,
`Conflict`, `Not available`, or `Not covered` when the evidence is absent.

## Core guardrails

1. Start with one user job, one product surface, one observable gap, one
   decision owner, and one outcome oracle. “Make the AI better” is not a
   decision frame.
2. Localize before selecting a technique. Separate input or intent, context,
   retrieval, instruction, tool or orchestration, model or effort, data,
   product control, UX, and operations hypotheses.
3. Check hard blockers before preference: authorization, privacy, data purpose,
   safety, side effects, required capability, tenant or region, version
   identity, availability, and rollback.
4. Treat a provider document, model card, benchmark, or internal hypothesis as
   scoped evidence. It can shape a test; it cannot prove this product's result.
5. Compare the baseline and one candidate on the same representative tasks.
   Keep success, completeness, required evidence, safety, abstention, cost,
   latency, reliability, and user control as separate observations.
6. Fewer tokens, calls, retries, or dollars count as improvement only when the
   user outcome and required guardrails still pass.
7. Prefer the smallest reversible intervention that can disconfirm the main
   hypothesis. “Smallest” describes the test and blast radius, not a universal
   preference for prompt edits over a real product or data fix.
8. Fine-tuning and distillation require a data-purpose ledger, permission or
   consent boundary, minimization and redaction, contamination review,
   training/evaluation separation, safety regression slices, provider
   availability, and a rollback plan before they are eligible.
9. Do not turn a route choice into a release decision. A selected route still
   needs implementation evidence, evaluation evidence, product-control
   evidence, and deployment or pilot evidence at their own layers.
10. For high-impact decisions, external actions, access, money, customer
    records, or irreversible state, keep human approval and reconciliation
    outside the model's route choice.
11. Preserve a last-known-good baseline and a way to narrow exposure, disable
    the candidate, remove unauthorized data, restore the prior configuration,
    or hand the job to a person.
12. Record freshness and version identity. A route that was available when a
    proposal was written may be unavailable or changed when it is executed.

## Workflow

### 1. Frame the decision

Write one sentence:

> Decide which improvement route should be tested first for `user job` on
> `surface` because `observed gap`, within `quality, trust, cost, latency,
> privacy, and recovery boundaries`.

Record:

- decision owner and approver;
- current workaround and last-known-good configuration;
- exposure, segment, observation window, and freshness;
- primary outcome oracle and guardrail or negative oracles;
- what is known, inferred, supplied, fictional, and missing.

If the gap, user job, or oracle is missing, stop at `Need evidence`.

### 2. Build an evidence ledger

Use stable IDs such as `G-001` for the gap, `B-001` for the baseline, `S-001`
for a source, and `E-001` for an evaluation slice. Record:

| Field | Required record |
| --- | --- |
| Gap | observable behavior, affected job, severity, segment, and freshness |
| Baseline | prompt/context/retrieval/tools/model/data/UX versions or `Not provided` |
| Evidence | source, owner, timestamp, method, denominator, and confidence |
| Outcome | task success, completeness, required evidence, user correction, or safe abstention |
| Resources | tokens, calls, latency, cost, retries, and failure rate when relevant |
| Boundary | data purpose, permission, tenant, region, side-effect, and retention status |
| Missingness | what cannot be concluded and what would change the decision |

Do not infer prevalence from a single trace. Do not use a dashboard count as a
user outcome without exposure and denominator.

### 3. Localize the likely failure layer

Use the smallest evidence-supported hypothesis, then list one alternative:

| Layer | Diagnostic question | Candidate route |
| --- | --- | --- |
| Input or intent | Did the system understand the job and ambiguity? | clarify, classify, or narrow the product entry point |
| Context | Did the model see the right instructions, state, memory, and knowledge? | context contract, selection, compaction, or source boundary |
| Retrieval or grounding | Were eligible, current, authoritative sources found and supportable? | query, ranking, source policy, citation, or abstention |
| Prompt or instruction | Is a measured behavior gap in the instruction or output contract? | versioned prompt or schema change |
| Tool or orchestration | Did a tool, transition, retry, or delegation create the failure? | tool contract, bounded workflow, validator, or handoff |
| Model or effort | Is the task eligible for a different capability or reasoning budget? | model, snapshot, provider, tier, or effort route |
| Data or training | Is a stable behavior gap justified by permitted, representative data? | data repair, supervised tuning, preference route, or distillation |
| Product control or UX | Is the model output acceptable but the user cannot inspect, edit, approve, or recover? | preview, explanation, approval, fallback, or manual route |
| Operations | Is the observed issue caused by latency, quota, outage, drift, or missing telemetry? | budget, availability, observability, or incident route |

Localization is a hypothesis until an ablation, trace, controlled comparison,
or domain review supports it.

### 4. Apply hard eligibility gates

Before comparing upside, mark each route `Eligible`, `Blocked`, `Unknown`, or
`Not applicable` for:

- user job and required capability;
- data purpose, permission, minimization, retention, and provider egress;
- safety, policy, privacy, cross-tenant, and side-effect boundary;
- model or tool identity, version, modality, context/output limits, region,
  quota, reliability, and current provider availability;
- baseline availability, representative slices, evaluator, denominator, and
  success oracle;
- owner, approval boundary, exposure, rollback, and recovery.

Any critical `Blocked` or unresolved high-impact `Unknown` keeps the decision
at `Hold` or `Need evidence`. Do not rank an ineligible route against eligible
ones.

### 5. Form a route shortlist

For each eligible route, record:

| Field | Question |
| --- | --- |
| Mechanism hypothesis | What failure should this route change, and why? |
| Smallest candidate | What is the narrowest reversible test? |
| Required evidence | What baseline, slice, oracle, and owner are needed? |
| Expected benefit | Which user outcome or guardrail could improve? |
| Trade-off | What might worsen: safety, evidence, cost, latency, privacy, or control? |
| Disconfirming signal | What result would rule this route out? |
| Rollback | How is the baseline restored and who owns it? |
| Route status | `Eligible`, `Blocked`, `Unknown`, or `Not applicable` |

Do not prescribe a prompt change when the evidence points to missing authority,
stale sources, a broken tool contract, or an unclear user decision boundary.

### 6. Treat model and training routes as higher-evidence candidates

For a model, effort, provider, fine-tuning, or distillation candidate, freeze:

- provider, model ID, snapshot or alias, endpoint/region, serving tier, and
  source date;
- input/output contract, tools, context, retries, evaluator, budget, and
  safety configuration;
- training or distillation data origin, purpose, permission, redaction,
  retention, labeling, contamination, and quality review;
- baseline and candidate evaluation sets, including out-of-domain and
  high-severity negative slices;
- expected cost, latency, quota, availability, and rollback behavior.

Fine-tuning or distillation is not a substitute for fixing stale knowledge,
missing permission, wrong routing, or a broken user-control state. A small
model that is cheaper is not an improvement if the completed user job, evidence
quality, or safety boundary regresses.

### 7. Define the smallest paired experiment

Use the same representative task slices for baseline and candidate. At minimum
state:

- sample and slice IDs, expected behavior, negative behavior, oracle, reviewer,
  and denominator;
- the single changed surface and all held-constant surfaces;
- quality, completeness, required evidence, abstention, safety, privacy,
  cost, latency, reliability, and user-control observations as applicable;
- exposure, observation window, stopping rule, and whether human review is
  required;
- the rollback trigger and the owner who can apply it.

Do not move a threshold after seeing results. Do not collapse high-severity
failures into an average. If the candidate cannot be tested without real
customer data or irreversible actions, keep the route at `Need evidence` and
design a safe fixture or supervised pilot first.

### 8. Make the route decision

Return exactly one primary status:

- `Ship`: the route is already implemented and its stated release evidence is
  present; this skill alone cannot grant that status.
- `Pilot`: the route and controls are defined, but product-surface or user
  evidence is deliberately bounded and still pending.
- `Iterate`: the route is eligible but the smallest test or evidence needs
  revision.
- `Hold`: a critical safety, privacy, permission, authority, data, or rollback
  boundary is unresolved.
- `Rollback`: the candidate has a verified harmful regression or unsafe state;
  restore the baseline and hand off to the owner.
- `Need evidence`: a required input or evaluation layer is missing.
- `Not applicable`: the route does not address the named job or gap.

The packet must name one primary next action and one explicit reason not to
take the strongest rejected alternative.

### 9. Hand off and write back

Route the packet to the smallest next owner:

- prompt, context, retrieval, tool, orchestration, model, migration, data,
  evaluation, security, privacy, UX, reliability, or incident contract;
- issue or decision log with stable IDs and a review date;
- redacted eval slice or regression case, never raw customer content.

Write back the chosen route, rejected alternative, evidence gap, baseline
identity, owner, expiry, and rollback receipt. A route decision expires when
the model/provider, data policy, user job, or product surface changes materially.

## Output contract

Return these sections in order. Keep unsupported values explicitly labelled:

### Improvement decision

State the user job, observed gap, primary route, status, owner, and one next
action in five lines or fewer.

### Problem frame and evidence ledger

Include the decision sentence, baseline identity, source IDs, observation
window, outcome oracle, guardrails, denominator, and missing evidence.

### Failure localization

Show the primary layer, evidence, alternative hypothesis, confidence, and
what would disconfirm it.

### Route shortlist

Use a table with route status, smallest candidate, expected benefit, trade-off,
required evidence, and rollback. Keep hard blockers visible.

### Paired evaluation and release gate

Name slices, baseline/candidate, held-constant surfaces, oracles, reviewer,
denominator, cost/latency observations, stopping rule, and the exact condition
for `Ship`, `Pilot`, `Iterate`, `Hold`, `Rollback`, or `Need evidence`.

### Data, permission, and trust boundary

State what data may enter which stage, who may approve it, what is redacted,
what is retained, which provider or external system is eligible, and what is
blocked. For fine-tuning or distillation, include training/evaluation
separation and safety regression coverage.

### Rollout, recovery, and writeback

State exposure, manual approval, user-visible degraded state, owner, rollback
trigger, last-known-good configuration, recovery path, expiry, and next review.

### Not covered

List every unrun provider call, unverified score, unavailable source, real-user
claim, production claim, security/legal/accessibility review, adoption claim,
and other evidence layer this packet does not establish.

### Review ask

End with one choice: `Run smallest test`, `Collect evidence`, `Route to owner`,
`Hold`, or `Rollback`, plus the missing receipt needed for the next review.

## Edge cases

- **A prompt edit looks cheapest:** compare it with context, retrieval, tool,
  and UX hypotheses; cost is not the user outcome.
- **A larger model scores higher:** keep quality, evidence, safety, latency,
  cost, and completed-job denominators separate; a single score does not
  authorize migration.
- **Fine-tuning has many examples:** more examples do not establish permission,
  representativeness, contamination safety, or generalization.
- **Distillation copies a strong model:** inspect whether the teacher output is
  correct, permitted, current, and safe; teacher output is not ground truth.
- **Lower latency comes from skipping evidence:** block the route if required
  source support, review, or user control is lost.
- **The route touches a side effect:** require approval, idempotency,
  reconciliation, and postcondition evidence; do not blindly retry through a
  different model or provider.
- **The signal is only a user complaint:** preserve it as a lead, define a
  safe reproduction or research slice, and avoid converting it into
  prevalence or release evidence.
- **Provider guidance conflicts with product evidence:** keep both source IDs,
  lower confidence, and use the product's declared oracle and controls.

## Final check

Before handing off, confirm:

- the route starts from a user job and an observable gap;
- the primary layer and alternative are evidence-labelled;
- ineligible or unknown routes are not ranked as if eligible;
- the smallest candidate changes one surface and has a paired baseline;
- quality, safety, privacy, cost, latency, evidence, and user control are not
  hidden in one score;
- fine-tuning/distillation has data purpose, permission, safety, provider, and
  rollback gates;
- first-time, empty, error, recovery, approval, and manual fallback states are
  represented where relevant;
- the status is truthful and `## Not covered` contains every unsupported
  claim;
- the next owner, review date, and rollback receipt are explicit.
