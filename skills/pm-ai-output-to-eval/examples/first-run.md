# First run: support-label output evaluation

This is a **fictional fixture** for learning the skill. It is not a model run,
dataset, grader result, human review, production metric, or evidence that any
evaluation platform is suitable.

## Request

A fictional support team has a model that labels an incoming ticket as
`billing`, `access`, or `technical`. The output is schema-valid, but the PM
needs to know whether the label helps the routing job and whether a prompt
change should ship.

## Contract

- `job`: route a support ticket to the right queue without silently sending a
  sensitive or ambiguous ticket to the wrong team.
- `output_contract`: `ticket-label.v2`; output status, label, confidence class,
  and evidence note are captured. Provider/model/SDK/route are `Not provided`.
- `evaluation_unit`: one de-identified ticket, approved human label, model
  sample, source snapshot, slice, and output/config version.
- `positive slice`: ordinary billing, access, and technical examples with a
  trusted label; expected deterministic label match.
- `negative slice`: a ticket that contains two intents or asks for a policy
  exception; expected `abstain` or manual review, not a forced label.
- `privacy slice`: a ticket includes a secret-looking value; expected no secret
  in the evaluation receipt and no routing-scope change.
- `drift slice`: a new product queue appears after the v2 label set was frozen;
  expected `drift` or `not-scoreable` until the reference is versioned.
- `oracle`: exact label match for simple cases; trained human review for
  ambiguous cases; a model judge is optional and cannot override the hard
  privacy or abstention rule.
- `labels`: `pass`, `fail`, `abstain`, `conflict`, `invalid`, `drift`,
  `not-scoreable`, and `manual` are counted separately.
- `denominator`: report eligible, scored, abstained, conflicted, and excluded
  cases by slice. Zero eligible cases are not a perfect score.

## Fictional readout

The reference set contains ordinary cases, ambiguous cases, and one drifted
queue. A fictional score is intentionally not calculated because the dataset,
labels, judge, denominator, and run window were not executed or reviewed.

The decision is `Pilot` the contract as documentation only. Before changing a
prompt, freeze the v2 reference and run the same slices for baseline and
candidate. If a model judge ranks a fluent wrong answer above a trusted answer,
mark a grader-hacking calibration failure and keep human review as the gate.

## Recovery questions

1. Which labels are hard rules, and which require a trained reviewer?
2. Are abstentions a safe product behavior or an excluded score?
3. Did the reference, queue taxonomy, prompt, model, schema, or evaluator
   change between baseline and candidate?
4. Can a reader see the denominator and the not-scoreable count without opening
   raw ticket text?
5. If the eval platform is deprecated, which receipt and slice version will be
   preserved for a paired migration?

## Not run

No model, provider, SDK, dataset, ticket, label, grader, model judge, human
reviewer, webhook, dashboard, platform migration, routing tool, user, mobile
device, or screen reader was used.

## Not covered

Label accuracy, ambiguous-intent handling, source quality, judge calibration,
grader hacking, false-pass/false-fail rates, drift, privacy, latency, cost,
production readiness, accessibility, external-user comprehension, adoption,
traffic, and GitHub stars are not established by this fictional fixture.
