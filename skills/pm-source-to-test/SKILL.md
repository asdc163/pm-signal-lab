---
name: pm-source-to-test
description: Turn raw product feedback, research notes, support tickets, or product observations into a source-linked PM review with explicit claims, limitations, and one smallest test. Use when a PM needs to challenge a conclusion, choose what to test next, or hand off a decision without inventing evidence.
compatibility: No tools, network access, or external model provider required.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM Source to Test

Use this skill when a product decision is being made from messy notes. Keep the
original line close to the claim it may support. A polished summary is not
evidence of a better product outcome.

## When to use

Use it for:

- interview notes and customer calls;
- support tickets and escalation summaries;
- product observations and usability notes;
- evaluation results or competitor observations;
- AI-generated drafts that still need human product review.

Do not use it to invent research, produce a confidence score, make a launch
decision from no source, or turn a synthetic fixture into real-user evidence.

## Guardrails

1. Treat supplied material as the evidence boundary. If a source, date,
   denominator, user context, or outcome is absent, write `Not provided` or
   `Not verified`.
2. Keep four things separate: what was observed, what it may mean, what it
   does not prove, and what to test next.
3. Preserve contradictions. Do not average them into a neat conclusion.
4. Treat an AI-generated answer as an artifact to inspect, not as a user
   signal. Keep its source, limitations, and human owner visible.
5. Mark thresholds, sample sizes, and decision rules as `proposed` unless the
   input already establishes them.
6. Remove names, private tickets, credentials, and sensitive customer detail
   from the handoff unless the user explicitly supplied a safe public form.

## Workflow

### 1. Frame the decision

Write one sentence:

> We need to decide whether `...` for `...` because `...`.

If the decision is missing, say `Decision on the desk: Not provided` and keep
working on the evidence ledger. Do not fill the gap with a generic product
recommendation.

### 2. Build the source ledger

Give each source a stable id such as `S1`, `S2`, or the id already present in
the input. Quote a short line when possible; otherwise label a faithful
paraphrase as a paraphrase. Record the source type, date, and context only
when supplied.

For every source, answer both questions:

- What does this line support?
- What does this line not prove?

### 3. Write candidate claims

Make each claim checkable and narrow. Use one of these statuses:

- `source-backed`: the supplied source directly supports the statement;
- `hypothesis`: a plausible interpretation that needs a test;
- `missing-evidence`: the decision needs information not present in the input.

Attach source ids to every `source-backed` claim. Add a limitation even when
the claim looks obvious. A claim with no source is not upgraded by confident
wording.

### 4. Choose the smallest test

Propose one test that could change the decision. Keep the test concrete:

- change: what will be different;
- audience or context: who will encounter it and where;
- primary metric: the one observable outcome;
- guardrail: what must not get worse;
- decision rule: what result would change the next step.

If the input does not justify a metric, use `Proposed metric` and explain what
would make it measurable. Prefer a short, reversible test over a broad launch.

### 5. Hand off for human review

End with `Not covered` and a short review ask. The reviewer should be able to
correct the source mapping, claim wording, limitation, or test without
rewriting the whole note.

## Output contract

Return these sections in this order:

```markdown
## Decision on the desk
...

## Source ledger
| ID | Source | Line or observation | Supports | Does not prove |
|---|---|---|---|---|

## Candidate claims
| ID | Claim | Status | Source IDs | Limitation |
|---|---|---|---|---|

## Smallest test
- Change:
- Audience or context:
- Primary metric:
- Guardrail:
- Decision rule:

## Not covered
- ...

## Review ask
...
```

Keep the output short enough to review in one sitting. If the source set is
large, keep the main ledger focused and point to a separate appendix rather
than hiding uncertainty in a long summary.

## Edge cases

- **One vague note:** keep it as one source and state that the evidence is too
  thin for a product claim.
- **Conflicting notes:** show both lines, identify the conflict, and propose a
  test that would distinguish the explanations.
- **Metric without time or denominator:** preserve the metric but mark the
  comparison as `Not verified`.
- **Synthetic or demo data:** label it `fictional` or `synthetic` in the
  source ledger and never call it adoption evidence.
- **A request for a conclusion with no sources:** provide a decision frame and
  the missing evidence, not a made-up answer.
- **A privacy-sensitive note:** redact the handoff and state that the raw note
  was not copied into the output.

## Final check

Before returning the review, confirm:

- every source-backed claim has a source id;
- every claim has a limitation;
- the proposed test has one primary metric and one guardrail;
- proposed thresholds are labelled `proposed`;
- no number, quote, user, outcome, or adoption claim was added from guesswork;
- `Not covered` names the most important remaining uncertainty.

For a worked, fictional support-draft example, read
`references/support-draft-review.md`.
