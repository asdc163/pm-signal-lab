---
name: pm-ai-model-change-to-migration
description: Use when an AI product faces a model, provider, endpoint, snapshot, lifecycle, capability, price, latency, or serving-behavior change. Produce a source-bounded migration decision with identity, impact, baseline and candidate comparison, safety and cost gates, rollout, fallback, rollback, and explicit evidence limits.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Model Change to Migration

Use this skill when a model or provider change may alter a user-facing AI or
agent workflow. It turns a lifecycle notice, replacement recommendation,
provider change, or observed serving change into a reviewable migration packet.

The output is a decision contract, not a model leaderboard. It does not call a
provider, change a model setting, run a deployment, or prove that a candidate
is better.

## When to use

Use it when:

- a provider announces a deprecation, retirement date, replacement, endpoint
  change, or model-family migration;
- a team wants to change a model ID, dated snapshot, alias, provider, region,
  endpoint, serving tier, safety configuration, or capability surface;
- a model ID is unchanged but routing, safety classifiers, sampling behavior,
  rate limits, price, or latency appears to have changed;
- a product needs a baseline and candidate comparison before a canary or
  controlled migration;
- a model change may affect prompts, tools, retrieval, schemas, citations,
  safety behavior, data handling, cost, latency, or user comprehension;
- a production decision needs a hold, fallback, sunset, or rollback owner.

## Do not use

Do not use this skill to:

- choose a model for a brand-new job without a migration event; use
  `pm-ai-model-to-route`;
- version a prompt or prompt object; use `pm-ai-prompt-to-version`;
- design a general evaluation rubric or dataset; use
  `pm-ai-evaluation-plan`;
- explain a concrete failed run after a change; use
  `pm-ai-trace-to-regression`;
- call a provider, run a benchmark, switch a flag, migrate data, or publish a
  quality claim;
- replace an unknown model ID, retirement date, score, cost, latency, or
  privacy boundary with a guess;
- paste raw prompts, customer content, credentials, tokens, cookies, private
  URLs, or sensitive screen content into a public receipt.

Use `Unknown`, `Not provided`, `Not run`, `Not measured`, `Not reproduced`, or
`Not covered` when the evidence is missing.

## Workflow

### 1. Frame the migration decision

Write one sentence:

> Decide whether change `...` can move workload `...` from baseline `...` to
> candidate `...` within the product's quality, safety, data, cost, latency,
> and recovery boundaries.

Record the decision owner, affected surface, user job, reason for change,
deadline, current workaround, last-known-good state, and success oracle. A
replacement recommendation is a migration input, not a release decision.

### 2. Build the model identity ledger

Record each field for baseline and candidate. Keep values source-backed.

| Field | Baseline | Candidate | Source or status |
|---|---|---|---|
| provider and platform |  |  |  |
| model ID and snapshot or alias |  |  |  |
| endpoint, region, and serving tier |  |  |  |
| lifecycle state and retirement date |  |  |  |
| request and response contract |  |  |  |
| prompt and configuration version |  |  |  |
| tools, retrieval, and schema versions |  |  |  |
| data retention and training boundary |  |  |  |
| owner, approver, and observation window |  |  |  |

Do not infer a snapshot from a friendly display name. Distinguish a pinned
model ID from an alias, and distinguish model weights from changes in routing,
safety classifiers, sampling, or other serving infrastructure.

### 3. Classify the change

Select every applicable class:

- `model-id-or-snapshot`: a new model name, dated snapshot, alias target, or
  model family;
- `provider-or-platform`: a new vendor, cloud partner, region, or hosted
  surface;
- `api-or-schema`: request fields, response fields, tool schema, streaming,
  structured output, error, or rate-limit behavior;
- `capability-or-quality`: reasoning, context, modality, tool use, grounding,
  refusal, or output behavior;
- `safety-or-policy`: moderation, refusal, data boundary, permission, or
  policy behavior;
- `cost-or-latency`: price, tokenization, throughput, timeout, or p50/p95
  behavior;
- `serving-infrastructure`: an observable change with the same model ID.

If the change class cannot be verified, keep it as `Unknown` and choose `Hold`.

### 4. Map the blast radius

For each affected user job, map:

1. input shape, locale, data class, and tenant or region boundary;
2. prompt and context assumptions;
3. retrieval sources, freshness, and citation contract;
4. tool names, permissions, call order, stop conditions, and schemas;
5. output schema, UI copy, escalation, and user comprehension;
6. safety, privacy, retention, and abuse controls;
7. token, cost, p50/p95 latency, timeout, retry, and rate-limit budget;
8. flag, version pin, fallback, owner, and recovery path.

Separate confirmed impact from a hypothesis. A model change with no inventory
of actual usage cannot be called low risk.

### 5. Design the same-input comparison

Compare baseline and candidate on the same sanitized packet, configuration,
and corpus revision whenever the host permits it. Register cases by type:

- **Golden:** core user jobs that must keep working;
- **Regression:** previously fixed failures and known fragile formats;
- **Negative:** jobs that should abstain, escalate, or avoid a tool;
- **Edge:** empty input, long input, locale, timeout, partial result, and
  schema variation;
- **Red-team:** prompt injection, secret-shaped output, PII, tenant crossing,
  unsafe tool action, cost exhaustion, and permission mismatch.

Use deterministic checks for schemas, tool calls, citations, permissions, and
stop conditions. Use a rubric or human review for usefulness, factuality,
grounding, safety language, and comprehension. Record dataset, corpus,
prompt, model, judge, and configuration versions.

If no comparison ran, write `Not run` and do not convert a provider claim or
average score into a migration recommendation.

### 6. Apply decision gates

Choose exactly one state:

- `Migrate`: comparison and operational gates pass, owner and rollback are
  ready, and no critical blocker remains;
- `Canary`: evidence is sufficient for a bounded exposure with stop thresholds
  and a known fallback, but full migration is not yet justified;
- `Hold`: a required identity, impact, comparison, privacy, safety, cost,
  latency, or recovery input is missing or fails;
- `Rollback`: the candidate is causing a confirmed critical regression or
  violates a stop threshold; return to the last-known-good path;
- `Not run`: the packet is incomplete and no decision was authorized.

State the decision owner, evidence that supports it, blockers, next safe action,
deadline, and what would change the decision. A hold is a valid product result.

### 7. Define rollout and recovery

Specify the smallest reversible rollout:

- immutable baseline and candidate identifiers;
- feature flag, version pin, or routing rule;
- exposure, tenant, region, and duration boundary;
- p50/p95 latency, cost, error, retry, tool, safety, and user-correction
  signals;
- stop thresholds and who can stop the rollout;
- fallback model or manual path;
- data, prompt, schema, and observability rollback steps;
- retirement deadline and evidence needed before removing the baseline.

Do not call a migration complete while the fallback, stop signal, or owner is
missing.

## Output contract

### Privacy-safe receipt

Return a compact record with no raw customer content:

```yaml
migration_id: stable_id
decision: hold | migrate | canary | rollback | not_run
user_job: one_sentence_job
change_class: []
baseline: provider_and_model_identity
candidate: provider_and_model_identity
sources: []
impact: confirmed | hypothesis | unknown
comparison:
  dataset_id: value_or_not_provided
  cases: {golden: 0, regression: 0, negative: 0, edge: 0, red_team: 0}
  deterministic: pass | fail | not_run
  human_or_judge: pass | fail | not_run
operations:
  cost: measured | not_measured
  latency: measured | not_measured
  privacy_review: pass | fail | not_run
rollout: bounded_plan_or_not_provided
rollback: owner_and_action_or_not_provided
not_covered: []
next_action: one_safe_action
```

## Common rationalizations to reject

- "The provider recommends it, so migrate." Record the recommendation as a
  source and still compare the product job.
- "The average score went up, so the release is safe." Check critical,
  negative, tool, safety, privacy, cost, latency, and comprehension cases.
- "The model ID did not change, so nothing changed." Inspect serving,
  routing, safety, rate-limit, and latency signals.
- "It is only a small model swap." Map prompts, tools, retrieval, schemas, and
  fallback behavior before accepting that claim.
- "We can test after switching." Use a bounded canary or hold until a safe
  baseline, stop threshold, and recovery path exist.
- "The old model is being retired, so every result is acceptable." A deadline
  changes urgency, not the evidence standard; if emergency action is needed,
  label the recovery limitation.
- "The user will not notice." Measure comprehension, correction, retry,
  abandonment, escalation, and task completion instead of guessing.

## Edge cases

- If only a retirement date is known, create a source-backed `Hold` packet with
  a migration deadline and the missing comparison fields.
- If baseline usage is spread across providers or tenants, split the ledger by
  surface and do not average away a high-risk route.
- If the candidate supports a new capability, test the old core job before
  adding the new surface; capability gain does not erase regression risk.
- If only a provider's aggregate benchmark is available, label product impact
  `Unknown` and require task-specific evidence.
- If a third-party platform sets a different retirement schedule, record the
  platform-specific source and never copy a vendor date across surfaces.
- If the candidate is unavailable in the production region, stop at `Hold` or
  `Canary plan`; do not treat a local or preview run as production proof.
- If emergency cutover removes the fallback, choose `Migrate` only with an
  owner, observation window, forward recovery plan, and explicit limitation.
- If private model data or traces are required, keep the receipt to hashes,
  counts, labels, and source identifiers that are safe for the audience.

## Adjacent routing

- `pm-ai-model-to-route` owns model selection for a new job, not a migration.
- `pm-ai-prompt-to-version` owns prompt configuration changes.
- `pm-ai-evaluation-plan` owns evaluation design when no lifecycle migration
  is the primary decision.
- `pm-ai-trace-to-regression` owns writeback after a concrete run fails.
- `pm-ai-cost-to-guardrail` owns economics or latency when model identity is
  stable and the budget is the primary decision.
- `pm-ai-output-to-interface` owns output and UI contract changes.
- `pm-ai-skill-to-package` owns the package discovery and distribution
  contract, not model migration itself.

## Final check

Before returning the packet, confirm:

- the user job and change event are explicit;
- baseline and candidate identities are source-backed or marked unknown;
- change class and blast radius are separate from assumptions;
- golden, regression, negative, edge, and red-team cases are present or
  explicitly `Not provided`;
- deterministic, judge, human, cost, latency, privacy, and tool gates are
  separately recorded;
- the decision is one of `Migrate`, `Canary`, `Hold`, `Rollback`, or `Not run`;
- rollout, stop thresholds, fallback, rollback owner, and sunset are present;
- the receipt contains no raw prompts, customer data, secrets, or private URLs;
- every unsupported claim is labeled `Unknown`, `Not run`, or `Not covered`.
