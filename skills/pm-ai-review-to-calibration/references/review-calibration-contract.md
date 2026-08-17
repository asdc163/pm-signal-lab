# Worked review-to-calibration contract

This is a **fictional fixture** for an AI-assisted billing support draft. It
demonstrates how a PM can separate reviewer agreement from judge quality; it
does not contain real customer data, live labels, a provider result, or a
production release recommendation.

## Decision on the desk

We need to decide whether a review protocol can support a read-only pilot for
drafting a billing-policy response. The draft may be shown to a trained agent,
but a customer-facing send remains manual.

- User/job: support agent needs to identify whether a draft is supported by the
  approved policy and what must be reviewed before sending.
- Review target: policy groundedness, unsupported eligibility claims, and
  customer-visible uncertainty. Tone is a secondary criterion.
- Risk class: high for financial interpretation; no refund or account mutation.
- Owner: fictional Billing Operations plus Product Quality; names `Not provided`.
- Artifact snapshot: `billing-draft-pack-2026-02-14`; label run `Not run`.
- Current decision: `Hold` until the blind review and high-risk adjudication
  route are executed by an approved owner.

## User/job and review boundary

The review may decide whether a draft claim is supported, partial, unsupported,
or requires a policy owner. It may not decide a refund amount, invent an
exception, expose another tenant, or replace the agent's approval. The review
only uses the frozen policy source IDs and redacted draft excerpts.

## Artifact and version ledger

| Field | Fixture value | Status |
| --- | --- | --- |
| Input/source snapshot | `billing-pack-2026-02-14` | Proposed fixture |
| Draft output set | `support-drafts-v3` | Proposed fixture |
| Prompt/instruction | `draft-policy-response-v2` | Proposed fixture |
| Model/provider | `Not decided` | Not run |
| Judge prompt/config | `judge-groundedness-v1` | Proposed fixture |
| Rubric | `billing-review-v1` | Proposed fixture |
| Reviewers | `R-A`, `R-B`, domain owner `R-C` | Pseudonyms only |
| Trace/receipt | `Not provided` | Not run |

The five review items below are safe fixture rows. They are not a statistically
representative sample and cannot prove that a reviewer or judge is calibrated.

## Rubric and anchor set

| Criterion | Scale | Anchor | Product action |
| --- | --- | --- | --- |
| `K-grounding` | `pass`, `partial`, `fail`, `abstain` | `A-pass`: claim is supported by current policy section; `A-partial`: rule is supported but an account fact is missing; `A-fail`: claim contradicts the policy | show, qualify, remove, or route |
| `K-scope` | `pass`, `fail`, `abstain` | `A-scope-fail`: another tenant's ticket is used as evidence | hard block on fail |
| `K-clarity` | `clear`, `needs-edit` | `A-clear`: limitation and next action are readable | edit before send |

The hard gate is any `K-scope=fail` or unsupported high-impact eligibility
claim. `K-clarity` cannot compensate for a grounding or scope failure.

## Sampling and blind-review protocol

The fixture proposes five rows: two clear anchors, one borderline partial case,
one unsupported claim, and one cross-tenant negative case. The actual sample
size, reviewer eligibility, observation window, and holdout split are `Not
provided`. Each reviewer must label independently before seeing another label
or the judge result. Items used to explain the anchors must not silently become
the holdout.

## Human label ledger

These rows are **fictional fixture labels**, not observed human study results:

| Item | Grounding A | Scope A | Grounding B | Scope B | Confidence | Note |
| --- | --- | --- | --- | --- | --- | --- |
| `I-001` clear current-policy claim | pass | pass | pass | pass | high | Both point to the same policy section |
| `I-002` unsupported 45-day claim | fail | pass | fail | pass | high | Current policy fixture says the claim is not supported |
| `I-003` rule supported, account fact missing | partial | pass | abstain | pass | low/low | Rubric boundary needs adjudication |
| `I-004` other-tenant evidence | fail | fail | abstain | fail | low/low | Human owner must decide safe display state |
| `I-005` readable but incomplete limitation | partial | pass | partial | pass | medium | Clarity needs edit, not a new policy claim |

Keep `observation`, `interpretation`, `label`, and `action` separate in the real
label store. The rows show why a mean score would hide the `I-004` hard gate.

## Judge comparison and calibration

The fictional judge labels are intentionally mixed:

| Item | Adjudicated human label | Judge label | Calibration reading |
| --- | --- | --- | --- |
| `I-001` | pass/pass | pass/pass | Agreement candidate |
| `I-002` | grounding fail | grounding pass | Critical false pass; block |
| `I-003` | partial, clarification required | partial | Label may agree while action is incomplete |
| `I-004` | scope fail, human route | grounding pass / scope uncertain | Critical privacy false pass; block |
| `I-005` | partial, edit | partial | Agreement candidate |

No judge quality result is claimed. The correct next run would preserve judge
model/version, prompt/config, run ID, per-criterion labels, confusion matrix,
critical false-pass rate, and an untouched holdout. If the judge is tuned on
`I-002` or `I-004`, the apparent agreement becomes contaminated.

Proposed calculations are only executable after the denominator is approved:

```text
exact_agreement = same independent human labels / comparable pairs
judge_critical_false_pass_rate = judge passes hard-gate failures / hard-gate failures checked
adjudication_rate = pairs requiring owner decision / comparable pairs
```

Thresholds, confidence interval, reviewer agreement target, and observation
window are `Not provided`; results are `Not run`.

## Disagreement and adjudication

`I-003` is a rubric-boundary disagreement: the policy rule is supported, but
the account fact is absent. The adjudicator should either define `partial`
with a required clarification or define `abstain` for missing facts, then add
the resolved example as an anchor. `I-004` is a scope and privacy blocker; a
domain owner must decide the safe user-visible state, and no judge pass can
release it.

Original labels remain stored. An unresolved high-risk disagreement is a
`Hold`, not a majority vote. A new anchor or rubric change requires rerunning
the calibration and holdout boundaries.

## Bias, drift, privacy and trust

The fixture does not test reviewer bias, locale, workload, class imbalance,
judge drift, or source-version drift. The real plan should slice agreement by
reviewer role, locale, policy version, risk class, and label distribution.
Store pseudonymous reviewer IDs and safe item IDs; keep raw customer text and
private account fields out of shared review artifacts. Show a support agent the
review state and limitation, not a fabricated confidence score.

## Evaluation and release decision

The release decision is `Hold` because the fixture has no approved sample
denominator, no real independent review, no adjudicated holdout, no executed
judge run, and no privacy/security review. A read-only pilot could later allow
source-linked drafts only if hard scope failures are blocked, high-impact
cases route to a human, original labels remain inspectable, and rollback is a
draft-disable switch.

## Not covered

- No real reviewer, judge model, provider, annotation tool, or human agreement
  measurement was used.
- No statistical significance, reliability certification, model quality,
  production safety, customer outcome, cost, latency, adoption, or traffic was
  measured.
- No raw customer ticket, account record, secret, private URL, or hidden
  reasoning is included.
- Mobile, accessibility, localization, and customer-facing send behavior need
  separate verification.

## Implementation handoff

1. Billing Operations freezes the policy snapshot and supplies one safe locator
   per anchor and hard-gate case.
2. Product Quality approves criterion definitions, the `partial` versus
   `abstain` boundary, and the adjudicator role.
3. Engineering stores redacted review receipts and prevents judge output from
   bypassing the scope hard gate.
4. Evaluation creates separate calibration and holdout slices and reports
   per-criterion agreement plus critical false passes.
5. Release keeps drafting read-only until the owner reviews the evidence packet.

## Review ask

The product owner should approve the `K-grounding` and `K-scope` action rules.
The domain owner should resolve `I-003` and `I-004`. The evaluation owner
should return one redacted calibration receipt and one untouched holdout
readout before changing `Hold`.

## Method notes

The method boundary is consistent with official evaluation guidance that treats
evaluation as task definition, test inputs, result analysis, and iteration, and
with grader guidance that compares model-generated answers with references.
Google's judge evaluation documentation also describes comparing model-based
scores with human ratings as ground truth for judge calibration. These links are
method references only; they do not validate this fictional fixture or select a
provider:

- [OpenAI working with evals](https://developers.openai.com/api/docs/guides/evals)
- [OpenAI graders](https://developers.openai.com/api/docs/guides/graders)
- [Google evaluate a judge model](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/evaluate-judge-model)
- [Google develop a generative AI application](https://docs.cloud.google.com/docs/ai-ml/generative-ai/develop-generative-ai-application)

