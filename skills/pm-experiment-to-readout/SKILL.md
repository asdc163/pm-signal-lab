---
name: pm-experiment-to-readout
description: Turn a bounded product test result into an evidence-aware PM readout with metric, guardrail, decision rule, limitations, and one next action. Use when a PM needs to decide whether to continue, change, stop, or hold after a prototype, experiment, pilot, or evaluation.
compatibility: No tools, network access, or external model provider required.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM Experiment to Readout

Use this skill after a prototype, experiment, pilot, usability check, rollout,
or AI evaluation has produced results. Keep what happened separate from what it
may mean and from the decision that follows. A good readout makes it harder to
move the goalposts after seeing the result.

## When to use

Use it for:

- a product experiment with a primary metric and guardrail;
- a prototype or pilot with completion, failure, or recovery observations;
- an AI evaluation with a stated test set and known limitations;
- a usability session set with a small number of observed tasks;
- a rollout or feature flag readout that needs a continue, change, stop, or
  hold decision.

Do not use it to:

- manufacture a denominator, baseline, statistical result, or causal claim;
- turn synthetic, fictional, or AI-generated results into user evidence;
- call a small test a launch decision without checking guardrails and scope;
- average away a guardrail failure because the primary metric improved;
- replace the raw result record or the owner of the final decision.

## Guardrails

1. Treat supplied result records as the evidence boundary. If a source, test
   window, denominator, baseline, exposure, or outcome is absent, write `Not
   provided` or `Not verified`.
2. Keep four things separate: observed result, interpretation, decision, and
   next validation. Do not let a polished readout upgrade one into another.
3. Use the decision rule supplied with the test when one exists. If it was not
   supplied, label a new rule `proposed`; do not rewrite the rule to fit the
   result.
4. Preserve counts, rates, denominator, time window, control or baseline, and
   stopping conditions. A rate without its denominator is `Not verified`.
5. Keep primary metrics and guardrails separate. A guardrail failure is a hold,
   change, or stop signal unless the owner explicitly records why it is safe to
   proceed.
6. Qualitative observations describe the sessions or cases supplied. They do
   not establish prevalence, preference, or adoption without an appropriate
   sample and method.
7. Treat an AI-generated summary as an artifact to inspect. Trace its material
   lines to the underlying result record or mark them `Not verified`.
8. Remove names, private tickets, credentials, and sensitive customer detail
   from the handoff unless the user supplied a safe public form.

## Workflow

### 1. Frame the test

Write one sentence:

> We tested `...` for `...` to learn `...`.

Record the change, audience or context, baseline or comparison, test window,
and status. If the test question is missing, say `Test on the desk: Not
provided` and do not invent one.

### 2. Build the result ledger

Give each result source a stable ID such as `R1`, `R2`, or the ID already
present in the input. Record the source type, window, denominator, and a short
exact line when possible. Otherwise label a faithful paraphrase as a
paraphrase.

For every result, answer both questions:

- What was observed?
- What does this result not prove?

### 3. Read the metric and guardrail separately

Name the primary metric, guardrails, qualitative signals, and missing
measurement context. Keep `source-backed`, `hypothesis`, `synthetic`, and `Not
verified` visible. Do not use a confidence score to hide a missing baseline or
small denominator.

### 4. Apply the decision rule

Choose one status:

- `continue`: the supplied or proposed rule is met and guardrails are clear;
- `change`: the test found a fixable issue or mixed result;
- `stop`: the result or guardrail makes the direction unsafe or unhelpful;
- `hold`: the evidence is too incomplete to make a responsible choice.

Explain which rule was used. If the evidence is fictional, synthetic, or too
thin, keep the decision narrow, such as `continue the test`, not `launch`.

### 5. Choose one smallest next action

Propose one reversible action that could change the decision. Specify:

- change: what will be different;
- audience or context: who will encounter it and where;
- primary metric: the one observable outcome;
- guardrail: what must not get worse;
- decision rule: what result changes the next step;
- owner or timebox: who or what window is proposed.

If the input does not justify a metric, use `Proposed metric` and explain what
would make it measurable.

### 6. Hand off for human review

End with `Not covered` and a short review ask. The reviewer should be able to
correct the result mapping, metric interpretation, guardrail, or decision rule
without rewriting the whole note.

## Output contract

Return these sections in this order:

```markdown
## Test on the desk
...

## Result ledger
| ID | Result/source | Window/denominator | Observed result | Does not prove |
|---|---|---|---|---|

## Metric and guardrail readout
| Measure | Observed | Evidence status | Limitation |
|---|---|---|---|

## Decision
- Status: continue / change / stop / hold
- Rule used:
- Rationale:

## Smallest next action
- Change:
- Audience or context:
- Primary metric:
- Guardrail:
- Decision rule:
- Owner or timebox:

## Not covered
- ...

## Review ask
...
```

Keep the readout short enough to review in one sitting. If the result set is
large, keep the main ledger focused and point to an appendix rather than hiding
denominator or guardrail detail in a long narrative.

## Edge cases

- **No baseline or control:** preserve the result, mark comparison as `Not
  verified`, and do not claim lift or causality.
- **Missing denominator:** keep the count, write `Denominator: Not provided`,
  and avoid turning it into a rate.
- **Primary metric up, guardrail fails:** show both signals and choose `hold`,
  `change`, or `stop` unless the supplied decision record explains the risk.
- **Small sample:** keep the observed cases, label the readout `directional`,
  and propose the smallest follow-up that could change the decision.
- **Qualitative majority claim:** keep the exact number and context; do not
  write `most users` unless the supplied method supports that wording.
- **Synthetic or fictional result:** label it in the ledger and never call it a
  real-user, adoption, or production result.
- **AI-generated summary:** trace it to raw result sources and do not count it
  as an independent observation.
- **Conflicting result sources:** show the conflict and make the next action
  distinguish between the competing explanations.
- **Stopped early:** record the stopping condition and do not treat the partial
  result as a completed test.
- **No decision rule supplied:** keep the status `hold` or label any rule
  `proposed`; do not present a new threshold as pre-registered.

## Final check

Before returning the readout, confirm:

- every observed result has a source ID, window, denominator, or an explicit
  missing-data label;
- primary metric, guardrails, qualitative signals, and unknowns are separate;
- no count or rate became a lift, causal claim, adoption claim, or launch proof;
- the decision status states which supplied or proposed rule was used;
- the next action has one primary metric, one guardrail, and a decision rule;
- `Not covered` names the most important unresolved risk or measurement gap;
- no number, quote, user, outcome, or safety claim was added from guesswork.

For a ready-to-paste fictional first run, read `examples/first-run.md`. For a
full fictional output shape, read `references/experiment-readout.md`.
