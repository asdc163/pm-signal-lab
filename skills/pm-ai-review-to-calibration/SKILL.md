---
name: pm-ai-review-to-calibration
description: Turn human review or model-judge scoring of an AI output into a source-bounded calibration contract covering the user job, artifact versions, rubric criteria, anchor examples, blind labels, reviewer agreement, judge comparison, adjudication, bias, drift, privacy, release thresholds, fallback, and writeback. Use when a PM needs to decide whether review evidence is consistent enough to support an AI quality, rollout, or release decision.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Review to Calibration

Use this skill when a team is about to trust a human label, an LLM-as-judge,
or a rubric score for an AI product decision. It turns review into a calibrated
protocol: what is being judged, which evidence is frozen, how reviewers label
independently, how disagreements are preserved and adjudicated, and what must
be true before a score can influence release.

The output is a review-and-calibration decision packet, not a quality verdict,
judge benchmark, statistical certification, provider recommendation, live
annotation operation, or replacement for domain experts. Agreement is not
truth; a high judge score is not adoption, safety, or production readiness.

## When to use

Use it when:

- an AI feature needs human labels, rubric scores, pairwise preferences, or
  reviewer sign-off before a rollout or release;
- a team wants to compare an LLM-as-judge with human reviewers or an existing
  deterministic oracle;
- reviewers disagree about task success, groundedness, tool correctness,
  safety, tone, or user comprehension;
- a rubric, anchor set, model, judge prompt, dataset, locale, or product
  contract changed and prior evaluation results may no longer be comparable;
- a PM needs to set a calibration sample, blind-review protocol, adjudication
  route, drift trigger, or high-risk human gate;
- a review result may affect a customer-facing answer, financial/legal/medical
  workflow, privacy boundary, tool action, or agent autonomy decision.

Use `pm-ai-evaluation-plan` when the main question is which test slices and
metrics to create before review. Use `pm-ai-feedback-to-eval` when the main
input is one user correction or trace that must become an evaluation case. Use
`pm-ai-claim-to-citation` when the main question is claim-level source support.
Use `pm-experiment-to-readout` when calibrated results already exist and the
main task is interpreting a bounded test.

Do not use this skill to invent labels, access a private dataset, expose raw
customer output, declare a judge reliable from one sample, average away a
high-risk disagreement, or call a provider, evaluator, or annotation service.

## Guardrails

1. Define one user job, review decision, risk class, artifact boundary, owner,
   and observation window before calculating agreement.
2. Freeze the input, output, context/source snapshot, prompt/model/tool
   versions, rubric version, judge configuration, and reviewer instructions.
   Do not compare labels produced from silently different artifacts.
3. Write atomic criteria and observable anchors. Separate task completion,
   factual support, safety, tool behavior, user comprehension, and style when
   they lead to different actions.
4. Collect independent blind labels before discussion or adjudication. Preserve
   each original label, confidence, abstention, and rationale; never overwrite
   disagreement with the final consensus.
5. Keep observation, interpretation, label, explanation, and release decision
   as separate fields. A reviewer rationale is not a source of truth.
6. Treat judge output as untrusted evaluation data. Compare it with a declared
   human or deterministic reference and inspect critical false passes and false
   fails, not only a mean score.
7. Use a calibration set distinct from the holdout or release decision set when
   tuning the rubric, judge prompt, or reviewer instructions. State
   contamination and sample reuse if separation is impossible.
8. Report denominators, missing labels, abstentions, class imbalance, segment
   slices, confidence intervals or uncertainty when appropriate, and evidence
   status. If these are missing, write `Not measurable`.
9. High-risk, privacy, security, financial, legal, medical, and irreversible
   tool-action cases require a domain owner or human gate even when the judge
   agrees with prior labels.
10. Redact PII, secrets, private URLs, account IDs, hidden prompts, raw customer
    text, and hidden reasoning. Keep a safe artifact ID and locator instead.
11. Recalibrate when the model, judge prompt, rubric, source corpus, user job,
    locale, policy, or label distribution changes materially.
12. Use `Ship`, `Pilot`, `Iterate`, `Hold`, `Need evidence`, or `Rollback` only
    with an observable oracle and declared decision rule. Otherwise state
    `Not run`, `Unknown`, or `Not measurable`.

## Core definitions

| Term | Working meaning | Minimum evidence |
| --- | --- | --- |
| Review item | One frozen input/output/context unit under review | Stable item ID and version |
| Criterion | One independently judgeable product property | Observable definition and action |
| Rubric | The criteria, scale, anchors, exclusions, and decision mapping | Version, owner, and change log |
| Anchor | A representative example with an explained label at a score boundary | Safe artifact, label, rationale, limitation |
| Human label | An independent reviewer judgment before adjudication | Reviewer ID, label, confidence, timestamp |
| Judge label | A model or automated evaluator result | Judge model/config/version and output |
| Agreement | Declared similarity between independent labels | Metric, denominator, slice, and window |
| Adjudication | A documented resolution or escalation after disagreement | Original labels plus owner decision |
| Calibration set | Items used to align reviewers or judge behavior | Sampling rule and contamination boundary |
| Holdout set | Items reserved to estimate behavior after calibration | Frozen split and no tuning access |
| Drift | A material change in labels, artifacts, rubric, judge, or task distribution | Trigger and comparison window |
| Release gate | The rule connecting review evidence to product action | Threshold, hard blockers, fallback |

## Workflow

### 1. Frame the review decision and user job

Write one sentence:

> We need to decide whether review evidence for `...` supports the user job
> `...` for audience `...` within `...` risk and release boundaries.

Record the current workaround, decision owner, affected journey, intended
action, risk class, audience, source/permission boundary, evaluation window,
success oracle, and what would change the decision. Define whether the review
is judging the final answer, a claim, a tool action, a route, a trace, or a
user experience state. If no outcome oracle exists, write `Not measurable`.

### 2. Freeze the review artifact and provenance

Create IDs for the review run, item set, input, output, context/source
snapshot, prompt/instruction, model/provider/version, tool configuration,
rubric, judge, reviewer instructions, and decision owner. Record language,
locale, policy version, and relevant trace or source locator.

Keep raw private content in its approved system. The public packet should carry
only a safe paraphrase, redacted excerpt, hash, or artifact class. If two
reviewers saw different source versions, mark the pair `not comparable`; do
not repair the problem by averaging the labels.

### 3. Define criteria, scale, anchors, and abstention

Build a criterion ledger before collecting labels:

| ID | Criterion | Observable pass | Observable fail | Anchor IDs | Action |
| --- | --- | --- | --- | --- | --- |
| K-001 | ... | ... | ... | A-001/A-002 | show/qualify/hold |

For each criterion, define the unit of judgment, score scale, positive and
negative anchors, partial-credit rule, exclusion or `Not applicable` rule,
confidence field, abstention trigger, and product action. Use the smallest
scale that changes a decision. A five-point scale without distinct anchors is
not more rigorous than a binary label.

Separate hard gates from soft dimensions. For example, a privacy leak or an
unauthorized tool action can block release even if helpfulness is high. Keep
task completion, factual grounding, safety, tool correctness, and user
comprehension separate when a failure in one dimension needs a different fix.

### 4. Construct calibration, holdout, and negative slices

Sample a balanced, privacy-safe set that represents the user job and its risk:

- golden cases for core jobs and clear anchors;
- borderline cases near each score boundary;
- regression cases from reviewed failures;
- negative-route or abstention cases where the system should not assert or act;
- high-risk, privacy, security, tool-action, multilingual, and OOD cases;
- holdout cases not used to tune the rubric, reviewer instructions, or judge.

Record sampling rule, item count, class distribution, segment slices, inclusion
and exclusion, source version, reviewer eligibility, and whether the same item
appears in training, calibration, adjudication, or holdout. Do not manufacture
sample size or representativeness; use `Not provided` when unknown.

### 5. Run independent human review

Give each reviewer the same frozen artifact, rubric version, anchor set,
instructions, allowed context, and time window. Ask for one label per
criterion, confidence, abstention reason, and a concise observable rationale.
Do not reveal another reviewer's label or the judge result before submission.

Store a label row such as:

```yaml
review_id: review_001
item_id: item_042
reviewer_id: reviewer_pseudonym
rubric_version: rubric_v1
criterion: groundedness
label: partial
confidence: low
abstain: false
observation: "The source supports the date but not the exception."
evidence_locator: "source-class / section"
submitted_at: "Not provided"
```

Keep `observation` separate from interpretation and product action. A reviewer
may abstain because the rubric is ambiguous, the source is missing, or the
case requires domain authority; these are different calibration signals.

### 6. Measure agreement and inspect disagreement

Choose the agreement measure before reviewing the results. For categorical
labels, report exact agreement and a confusion matrix; for ordered scales,
report adjacent agreement and an ordinal measure only if the sample and
assumptions support it. For more than two reviewers, state the chosen
multi-rater method or use a transparent pairwise view.

Useful calculations after scope and denominators are real:

```text
exact_agreement = identical paired labels / comparable paired labels
adjacent_agreement = labels within one ordered step / comparable paired labels
critical_disagreement_rate = hard-gate label conflicts / critical pairs
judge_false_pass_rate = judge passes that human/adjudicated label blocks / judge passes checked
abstention_rate = abstained review items / eligible review items
adjudication_rate = pairs requiring adjudication / comparable paired pairs
```

Show per-criterion, risk, locale, reviewer, segment, and label-class slices.
Do not report a single average when one reviewer systematically misses a
privacy or safety class. Treat low agreement as a rubric, artifact, reviewer,
or job-definition signal; it is not automatically a model failure.

### 7. Compare and calibrate a model-based judge

Run the judge against the same frozen calibration and holdout boundaries. Save
judge model/version, prompt, rubric, temperature or equivalent settings when
available, output label, explanation, and run ID. Compare to independently
collected human labels or an adjudicated reference, while preserving the
uncertainty of that reference.

Inspect confusion by criterion and risk. A judge that matches overall labels
but passes every unsafe case is not calibrated for the product. Check critical
false passes, critical false fails, score compression, class imbalance, judge
abstention, explanation usefulness, and performance on holdout and OOD slices.
Do not use the judge's own explanation as proof of its label.

If the judge and humans disagree, first check artifact/version drift, rubric
ambiguity, source availability, reviewer disagreement, and label policy. Only
then decide whether to revise the judge prompt, rubric, dataset, product
behavior, or human review route. Record the change and rerun the same slices.

### 8. Adjudicate without erasing disagreement

Define who may adjudicate, what evidence they may inspect, whether the process
is blind to the judge, and when to escalate to a domain owner. The adjudicated
label must include the reason, evidence locator or `Not provided`, policy or
rubric clause, confidence, and action.

Keep all original labels and mark whether disagreement was resolved, unresolved,
or invalid because the artifact pair was not comparable. An unresolved
high-risk disagreement is a release blocker. A resolved disagreement should
become an anchor, regression case, rubric clarification, or reviewer training
example when it is safe to do so.

### 9. Set drift, privacy, and release gates

Define recalibration triggers: model or judge change, prompt/rubric change,
source or policy change, new locale, new user job, material label-distribution
shift, rising abstention, rising critical disagreement, or a newly observed
failure. Keep calibration and holdout snapshots versioned.

Choose one decision: `Ship`, `Pilot`, `Iterate`, `Hold`, `Need evidence`, or
`Rollback`. A proposed rule may require critical hard-gate pass, minimum
review coverage, acceptable judge-human agreement, no unresolved high-risk
disagreement, privacy-safe storage, and a working human fallback. Thresholds
are proposed until their owner, denominator, sample, and observation window
are approved.

### 10. Write back and hand off

Record the review run, label artifacts, disagreement cluster, adjudication,
rubric change, new anchor, new regression or red-team case, owner, review date,
decision, rollback route, and next learning question. Link a recurring issue to
`pm-ai-evaluation-plan`, `pm-ai-feedback-to-eval`, `pm-ai-trace-to-regression`,
or `pm-ai-claim-to-citation` rather than adding broad instructions everywhere.

## Output contract

Return these sections in order. Keep unknown fields explicit as `Not provided`,
`Unknown`, `Not run`, `Not measurable`, or `Not covered`.

## Decision on the desk

State the review decision, user job, audience, risk class, owner, artifact
snapshot, current evidence, fallback, and what would change the decision.

## User/job and review boundary

Describe the item being judged, intended product action, allowed evidence,
source/permission boundary, observation window, success oracle, and excluded
inferences.

## Artifact and version ledger

List item-set, input/output/context, source, prompt, model, tool, rubric,
judge, reviewer-instruction, trace, and policy versions. Redact raw private
content and state comparability.

## Rubric and anchor set

Show criterion IDs, scale, observable definitions, anchors, partial/NA rule,
confidence, abstention, hard gates, and action mapping.

## Sampling and blind-review protocol

Record calibration/holdout/negative slices, sampling rule, reviewer eligibility,
blinding, independence, contamination boundary, locale/risk coverage, and
missing-data treatment.

## Human label ledger

Show safe item IDs, reviewer role or pseudonym, criterion labels, confidence,
abstention, observation, evidence locator, timestamp, and evidence status.

## Judge comparison and calibration

Compare judge and human/adjudicated labels by criterion and risk. Include
confusion, critical false passes/fails, agreement measure, denominator,
holdout result, judge version, and limitations. Do not turn judge agreement
into model truth.

## Disagreement and adjudication

List disagreement class, original labels, evidence reviewed, adjudicator or
owner, final/unresolved state, reason, escalation, and writeback candidate.

## Bias, drift, privacy and trust

Cover reviewer/segment/locale bias, class imbalance, rubric drift, model/judge
drift, artifact comparability, redaction, access, retention, and high-risk
human review. Include user-visible uncertainty when relevant.

## Evaluation and release decision

Name the gate, hard blockers, thresholds, numerator/denominator, observation
window, fallback, rollback, owner, and decision: `Ship`, `Pilot`, `Iterate`,
`Hold`, `Need evidence`, or `Rollback`.

## Not covered

List live annotation, real human agreement, judge quality, provider behavior,
statistical significance, production safety, adoption, traffic, cost/quota,
and other surfaces not directly inspected or run.

## Implementation handoff

Give the smallest work slices for artifact freezing, rubric/anchor storage,
blind labeling, comparison, adjudication, redaction, monitoring, and rollback.
Name source owners, reviewer roles, receipt fields, tests, and the next
evidence-producing action.

## Review ask

Name the decision owner and ask for one rubric correction, one missing anchor
or negative case, and one concrete calibration or holdout run.

## Edge cases

- Reviewers saw different context, source, locale, or product policy: mark the
  pair not comparable, repair the snapshot, and do not calculate agreement.
- A reviewer and judge disagree on a high-risk item: retain both labels, route
  to a domain owner, and block the action until adjudicated.
- A judge agrees with humans because the same examples were used to tune it:
  flag contamination and require a holdout or label-independent review.
- A rubric has a score boundary but no anchor: label the criterion ambiguous,
  do not infer a threshold, and create an anchor before recalculating.
- A reviewer is confident but cannot cite an observable reason: retain the
  confidence as a signal, mark the evidence gap, and avoid treating confidence
  as correctness.
- Labels are imbalanced or one class is missing: show the distribution and
  report the affected metric `Not measurable`; do not celebrate agreement.
- A model update improves mean score but increases critical false passes:
  block release and inspect the hard-gate slice.
- A product change adds a locale or new user job: require a new calibration
  slice; prior agreement does not automatically transfer.
- The output contains PII, secrets, or hidden reasoning: replace it with a safe
  artifact ID/paraphrase and record the redaction boundary.
- A disagreement is caused by an unclear product promise rather than a label:
  send it to product scope or UX review; do not force reviewers to choose.
- A judge explanation cites a plausible but unverified reason: assess the label
  against the rubric and evidence, not the fluency of the explanation.

## Final check

Before handing off, confirm:

- one user job, review target, risk class, owner, artifact snapshot, oracle,
  and observation window are explicit;
- input/output/context/source/prompt/model/tool/rubric/judge versions are
  comparable and private content is redacted;
- criteria are atomic, anchors are observable, hard gates are separate, and
  abstention/Not applicable behavior is defined;
- calibration, holdout, regression, negative, high-risk, locale, and OOD slices
  have sampling and contamination boundaries;
- independent human labels retain reviewer role, confidence, abstention,
  observation, locator, and timestamp without exposing raw sensitive content;
- agreement and judge comparison include denominator, confusion, critical
  false passes/fails, segment slices, and `Not measurable` when evidence is
  missing;
- disagreement and adjudication preserve original labels and specify owner,
  escalation, writeback, and unresolved high-risk handling;
- drift triggers, privacy, trust, first-time, loading, error, recovery, mobile,
  accessibility, and human-review states are covered where relevant;
- release, fallback, rollback, and all unrun surfaces are explicit;
- the packet ends with one review owner, one smallest next action, and one
  evidence boundary rather than a quality guarantee.

