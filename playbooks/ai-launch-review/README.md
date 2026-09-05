# Can we ship this AI feature?

A launch-review worksheet for PMs moving a support-draft feature from demo to
pilot. Bring the case results to a review meeting and leave with a decision,
the evidence that could change it, and someone responsible for the next step.

Start with [ten practice cases](./cases.md), then copy the
[decision template](./decision-template.md) for your own feature. No installation
or AI account is needed to review the example.

## The decision worth arguing about

A support assistant gets nine of ten practice cases right. In the tenth, it
tells a customer their refund has been approved even though it can only draft
replies. Would you let it enter a pilot?

The [practice pack](./cases.md) contains the inputs, source policy, authored
sample responses and scoring key. **All ten cases and responses are fictional.**
The 9/10 result describes that exercise, not a model run or product benchmark.

## Run the review

1. **Set the scope.** Name the feature, version and user action. Here, the
   assistant drafts text; a support operator reviews it before sending. It has
   no authority to approve refunds or change accounts.
2. **Agree on the rule before scoring.** For this exercise, an unsupported
   refund approval blocks the pilot even if every other response passes. This
   is a proposed rule for this scenario, not a universal launch standard.
3. **Score the cases.** Read the source and response, then mark `pass`, `fail`
   or `not reviewed`. Write the exact sentence behind a failure. Have a second
   reviewer independently score the approval and ambiguous-policy cases;
   preserve disagreements before resolving them.
4. **Write the decision.** Use the template. Include the worst unresolved
   failure, missing evidence, the next test, an owner and a revisit trigger.

For your product, replace the fictional policy and cases with material you are
allowed to use. Keep private tickets and customer information outside this
public repository. Preserve a baseline and candidate output for the same cases;
record prompt/model/source versions and the review date. Mark a case `not
reviewed` until its actual output has been inspected.

## Worked decision: hold the pilot

| Question | Exercise answer |
| --- | --- |
| What are we deciding? | Whether a support-draft assistant may enter a limited, human-reviewed pilot. |
| What evidence do we have? | Ten authored practice responses, scored against fictional policy P1–P5. Nine pass the exercise rubric; C09 fails. No deployed model was tested. |
| What blocks the decision? | C09 says “Your refund is approved.” P3 allows a reviewer to assess a request, not the assistant to approve it. |
| Does a human review step resolve this? | Not established. We have no observed evidence that the review flow catches this failure. |
| Decision | Hold the pilot. Continue internal evaluation. |
| Smallest next change | Make the draft distinguish a refund request from an approved refund; retain the existing manual approval flow. |
| Retest | Rerun C09 and the rest of the pack on the candidate, retaining baseline and candidate outputs. Add approved, denied and missing-status refund cases with the policy owner. |
| Owner | Assign an actual product decision owner and support policy reviewer before the run. Neither is provided in this exercise. |
| Revisit when | Actual case results, version identity and a demonstrated human-review fallback are available. Passing the practice pack alone is insufficient. |

Latency, cost, real-case coverage and reviewer agreement remain unmeasured.
The next product review must also decide which of those are required for its
pilot scope. Ten handpicked cases cannot establish production reliability.

## Turn it into a working artifact

The [decision template](./decision-template.md) can go into an issue, PR,
meeting note or internal document. The case table can be copied into a sheet.
If you use AI to draft the review, give it your redacted evidence and require
case IDs beside every conclusion. A reviewer still owns the decision.

The existing [AI evaluation-plan skill](../../skills/pm-ai-evaluation-plan/SKILL.md)
helps define additional slices and measures. Use it when this pack does not
cover your product's failure modes; the skill catalog is optional.

## Tell us where the review breaks

After trying it, [open a feedback issue](https://github.com/asdc163/pm-signal-lab/issues/new)
with the product job, the confusing case or template field, and what you needed
instead. Please omit customer text and internal identifiers. A sentence about
a real obstacle is more useful than a generic endorsement.

If this is a review you will run again, you can star the repository to find it
later. Feedback and contributions do not require a star.
