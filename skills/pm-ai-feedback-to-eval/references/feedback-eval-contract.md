# Feedback-to-eval contract reference

Use this reference when one feedback record could become more than a single
regression case. The contract keeps evidence, permission, evaluation design,
and release decisions separate. The example below is a fictional fixture; it
does not describe a real customer, model, provider, or production result.

## Contract fields

```yaml
feedback_eval_contract:
  decision:
  user_job:
  owner:
  source:
    feedback_id:
    source_type: user | reviewer | support | employee | synthetic | trace | sampled_production
    received_at:
    trace_or_session_id:
    workflow:
    model_provider_version:
    prompt_policy_config_version:
    locale:
    raw_evidence_pointer:
  evidence_layers:
    observed:
    interpretation:
    label:
    expected_behavior:
    actual_outcome:
    confidence: low | medium | high
    prevalence: not_measured | sampled | measured
  privacy:
    consent_status: confirmed | unknown | revoked | not_applicable
    retained_fields:
    removed_categories:
    retention_scope:
    access_owner:
    public_safe: true | false | unknown
  eval_case:
    case_id:
    sanitized_input:
    required_context:
    allowed_tools_or_sources:
    denied_behavior:
    expected_route_output_state:
    recovery:
    oracle_type: deterministic | reference | human | outcome
    oracle:
    reviewer:
    execution_status: proposed | not_executed | passed | failed | blocked
  dataset:
    destination: golden | regression | negative | redteam | canary | holdout | hold
    slice_tags:
    representativeness_limit:
    duplicate_status:
    contamination_status:
  calibration:
    rubric_version:
    reviewer_classes:
    independent_labels:
    agreement:
    disagreement:
    adjudication:
  release:
    must_pass:
    must_not_occur:
    human_review:
    fallback:
    rollback_trigger:
    next_validation:
  not_covered:
```

## Separate correction from preference

Use a correction case when a reviewer can state an observable policy, schema,
source, route, or outcome criterion. Use a preference case when two outputs are
both potentially acceptable but a person favors one for tone, structure, or
workflow fit. A preference can become a product signal or pairwise eval only
after the rubric, audience, and intended use are explicit.

| Feedback | First classification | Required next check |
|---|---|---|
| “The answer used the wrong plan rule.” | factual/policy challenge | approved policy source and deterministic check |
| “I prefer the shorter version.” | preference | audience, task outcome, and rubric |
| “I changed it before sending.” | correction plus possible trust issue | before/after reason and actual outcome |
| “The agent kept retrying.” | operational or tool failure | trace, stop condition, and cost/latency evidence |
| “It asked me to confirm before sending.” | possible positive control signal | action risk and approval policy |

## Dataset destination rules

```text
Golden: core job, approved expected behavior, clean source.
Regression: reviewed failure, reproducible oracle, version boundary.
Negative: must abstain, clarify, escalate, or avoid an action/tool.
Red-team: adversarial, privacy, security, injection, or misuse case.
Canary: new behavior with a limited observation plan.
Holdout: clean and reserved; never use for tuning or judge prompt design.
Hold: permission, oracle, privacy, label, or contamination gap remains.
```

Do not use `holdout` as a convenient archive. If case content, labels, or
expected answers were visible during tuning, move it out of holdout and record
the contamination. If a duplicate adds a new locale, risk, or user/job slice,
link it instead of silently collapsing the evidence.

## Pairwise preference receipt

For a subjective comparison, use a receipt like this and keep the result
separate from correctness:

```yaml
preference_receipt:
  feedback_id: F-017
  case_id: C-017
  options: [A, B]
  chosen: B
  reason: "clearer next step for a support agent"
  rubric_version: support_clarity_v1
  reviewer_class: support_domain_reviewer
  independent_labels: 2
  agreement: Not measured
  task_success: Not measured
  factual_correctness: Not measured
  destination: hold
```

The receipt supports a bounded preference question. It does not prove that B
is factually better, faster, safer, or preferred by the whole segment.

## Minimum negative cases

Every feedback-derived pack should consider at least these negative routes when
they apply:

- missing context: ask or escalate instead of guessing;
- unsupported claim: qualify or refuse instead of presenting certainty;
- wrong audience or tenant: do not reveal or act on the record;
- disallowed side effect: preview, require approval, or stop;
- prompt injection in feedback/context: treat it as untrusted content;
- consent or privacy unknown: keep the case private and hold it;
- duplicate or contaminated holdout: link, re-split, or exclude.

## Safe writeback receipt

```yaml
writeback_receipt:
  case_id:
  destination:
  owner:
  authorized_write_location:
  source_hash_or_version:
  privacy_review: pass | hold | not_run
  oracle_review: pass | hold | not_run
  execution_result: pass | fail | not_run
  next_review_at:
  not_covered:
```

Do not fill `pass` from a static inspection. A case becomes an executed
regression only after the authorized owner runs it with the recorded version,
oracle, and evidence receipt.

## Not covered

- This reference does not collect feedback, operate an evaluation service, or
  modify a dataset.
- The fictional fixture is not user research, a model benchmark, a training
  example, a quality result, or an adoption signal.
- Thresholds, reviewer agreement, prevalence, and release status remain
  `Not provided` until an authorized owner supplies current evidence.
