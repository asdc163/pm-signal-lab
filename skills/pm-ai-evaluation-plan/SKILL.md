---
name: pm-ai-evaluation-plan
description: Turn an AI feature goal and available evidence into a bounded evaluation plan with test slices, rubric, failure taxonomy, judge boundary, guardrails, fallback, and release gate. Use when a PM needs to decide what to measure before building, comparing, or promoting an AI capability.
compatibility: No tools, network access, or external model provider required.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Evaluation Plan

Use this skill before building, comparing, or promoting an AI feature. Make the
evaluation unit, risk slices, rubric, reviewer, fallback, and release gate
explicit before anyone treats a demo or benchmark as product evidence.

## When to use

Use it for:

- an AI or agent feature that needs a quality plan before implementation;
- a model, prompt, retrieval, tool, or provider comparison;
- an evaluation set that needs slices, expected behavior, and failure classes;
- a question about which human review is required for a high-risk output;
- a promotion decision that needs quality, guardrail, and fallback criteria.

Do not use it to:

- generate benchmark scores without a test set and result record;
- treat an LLM judge as ground truth or a vendor claim as evaluation evidence;
- infer safety, adoption, or business impact from a demo or synthetic score;
- hide rare but severe failures inside an average;
- replace domain review, security review, accessibility review, or legal review.

## Guardrails

1. Treat supplied material as the evidence boundary. If a goal, test set,
   source, model/version, denominator, user context, or outcome is absent, write
   `Not provided` or `Not verified`.
2. Separate capability, quality, safety, usability, operational, and business
   questions. A pass in one category does not prove the others.
3. Define slices before choosing a score. Include normal, edge, ambiguous,
   unsupported, and high-severity failure cases when they apply. Do not cherry-
   pick easy examples.
4. Anchor each rubric item to observable output behavior. Record who or what
   evaluates it; an AI judge is an evaluation method to validate, not ground
   truth.
5. Keep baseline, control, model/provider/version, prompt or retrieval change,
   and test window visible. Do not move a threshold after seeing results.
6. Keep high-severity failures separate from aggregate quality. A rare unsafe
   or unsupported action can block promotion even when the average looks good.
7. Define human review, fallback, rollback, and release gates for outputs that
   can affect people, money, access, external systems, or customer records.
8. Synthetic fixtures can test structure and known edge cases. They do not
   prove real-user quality, prevalence, adoption, or production readiness.
9. Remove names, private tickets, credentials, and sensitive customer detail
   from the handoff unless the user supplied a safe public form.

## Workflow

### 1. Frame the evaluation decision

Write one sentence:

> We need to decide whether `...` for `...` under `...`.

Record the feature goal, target user or job, decision stage, and what failure
would be costly. If the decision is missing, write `Evaluation decision on the
desk: Not provided` and keep the plan bounded.

### 2. Define the evaluation unit

State what one test case contains: input, context, expected behavior, allowed
tools or sources, output, and reviewer. Name the product action that the result
could support. If the output is not yet connected to a user or product job,
mark that gap instead of inventing one.

### 3. Build the test slices

Create stable slice IDs. Include the user/job context, fixture or source,
expected behavior, failure condition, severity, and review owner. Prefer a
small set that exposes the main risk over a large undifferentiated test pack.

### 4. Define the rubric and evidence plan

For each measure, write a pass definition that a reviewer can apply twice and
reach the same result. Record the evidence source, evaluator, proposed or
supplied threshold, and limitation. Keep citation correctness, unsupported
claims, refusal or abstention, task completion, latency, cost, and safety as
separate measures when they matter.

### 5. Set guardrails, fallback, and release gate

State what must not happen, what happens when the system is uncertain, who owns
manual review, and what blocks promotion. Use a status such as `plan`, `hold`,
`ready for evaluation`, or `not ready for promotion`; do not call a plan a
passing evaluation.

### 6. Choose the smallest next evaluation

Propose one reversible evaluation pass that could change the decision. Specify
the test pack, primary measure, guardrail, reviewer, proposed threshold, and
decision rule. If the input does not justify a threshold, label it `proposed`.

### 7. Hand off for human review

End with `Not covered` and a review ask. The reviewer should be able to change
the slice, rubric, judge, fallback, or release gate without rewriting the
whole plan.

## Output contract

Return these sections in this order:

```markdown
## Evaluation decision on the desk
...

## Evaluation scope
| Field | Value | Evidence status | Limitation |
|---|---|---|---|

## Test slices
| ID | Slice and user/job | Input or fixture | Expected behavior | Failure condition | Review owner |
|---|---|---|---|---|---|

## Rubric and evidence plan
| Measure | Pass definition | Evidence source | Evaluator | Threshold | Limitation |
|---|---|---|---|---|---|

## Guardrails and fallback
- Must not:
- Human review:
- Fallback:
- Rollback:

## Release gate
- Status: plan / hold / ready for evaluation / not ready for promotion
- Must pass:
- Must not occur:
- Decision rule:

## Smallest next evaluation
- Test pack:
- Primary measure:
- Guardrail:
- Reviewer:
- Proposed threshold:
- Decision rule:

## Not covered
- ...

## Review ask
...
```

Keep the plan short enough to review before implementation. If the evaluation
set is large, keep the main slice map focused and point to an appendix without
dropping the rare-failure or human-review boundary.

## Edge cases

- **No test set:** write `Test set: Not provided`, define the smallest safe pack,
  and keep the release gate at `not ready for promotion`.
- **Demo only:** record what the demo shows and what it does not test; do not
  call a happy-path demonstration a quality result.
- **LLM judge:** name the judge model, rubric, calibration sample, disagreement
  review, and human fallback. Do not treat judge output as ground truth.
- **One aggregate score:** split it into risk slices and observable rubric items;
  an average cannot expose a severe rare failure.
- **Prompt or model change:** record the exact version and comparison baseline;
  otherwise mark the comparison `Not verified`.
- **Conflicting reviewers:** preserve both judgments, name the disagreement,
  and propose adjudication or a clearer rubric.
- **High-severity rare failure:** keep it as a separate release gate even when
  the primary quality measure passes.
- **Synthetic or fictional data:** label it and keep claims limited to fixture
  behavior, structure, or known edge-case coverage.
- **Privacy-sensitive evaluation:** describe the redaction and review boundary;
  do not copy raw customer material into the public handoff.

## Final check

Before returning the plan, confirm:

- the decision, user/job, evaluation unit, model/version, and test window are
  visible or explicitly marked missing;
- slices cover the main user path and relevant failure classes;
- every measure has an observable pass definition, evaluator, threshold status,
  and limitation;
- AI judge output, synthetic fixtures, and vendor claims are not mislabeled as
  ground truth or real-user evidence;
- guardrails, human review, fallback, rollback, and release gate are explicit;
- the smallest next evaluation has one primary measure, one guardrail, and a
  decision rule;
- `Not covered` names the most important unresolved quality or safety risk;
- no score, user, outcome, safety, or adoption claim was added from guesswork.

For a ready-to-paste fictional first run, read `examples/first-run.md`. For a
full fictional output shape, read `references/ai-support-evaluation-plan.md`.
