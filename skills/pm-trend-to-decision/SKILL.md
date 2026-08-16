---
name: pm-trend-to-decision
description: Turn a dated AI, platform, developer-tool, or market change note into a source-linked PM decision brief with impact, uncertainty, and one smallest validation. Use when a PM needs to decide whether a change matters, who it affects, or what to test next.
compatibility: No tools, network access, or external model provider required.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM Trend to Decision

Use this skill when a new release note, platform change, developer-tool update,
policy note, competitor move, or trend digest creates a product question. Keep
the source, observed change, possible impact, and next validation separate. A
trend brief should make a decision easier to review; it should not manufacture
urgency.

## When to use

Use it for:

- AI model, agent, or platform release notes;
- API, SDK, developer-tool, pricing, or access changes;
- competitor or market notes that need a product response;
- an internal trend digest that needs source checking before circulation;
- a question about who may be affected and what to validate first.

Do not use it to:

- predict adoption or market size from one announcement;
- replace an official changelog, policy, or compatibility document;
- turn a vendor claim into a verified product capability;
- write a launch decision with no affected user, source, or test;
- present an AI-generated digest as independent evidence.

## Guardrails

1. Treat the supplied material as the evidence boundary. If an origin, URL,
   date, version, denominator, user context, or outcome is absent, write `Not
   provided` or `Not verified`.
2. Keep four things separate: the observed change, what it may affect, what it
   does not prove, and what would be tested next.
3. Give every source a stable ID. Preserve source type, origin, date/version,
   and whether the source is primary, secondary, internal, or AI-generated when
   that information is supplied.
4. A vendor announcement can show an intended or documented change. It does
   not by itself prove reliability, compatibility, user demand, adoption,
   business impact, or production readiness.
5. Treat an AI-generated summary as an artifact to inspect. Trace any material
   claim to the underlying source or mark it `Not verified`.
6. Preserve conflicting sources and later corrections. Do not turn disagreement
   into a single confident trend line.
7. Mark thresholds, sample sizes, time windows, and decision rules as
   `proposed` unless the input establishes them.
8. Remove names, private tickets, credentials, and confidential roadmap detail
   from the handoff unless the user supplied a safe public form.

## Workflow

### 1. Frame the decision

Write one sentence:

> We need to decide whether `...` for `...` because `...`.

If the decision or affected user is missing, say `Decision on the desk: Not
provided` or `Affected user/product: Not provided`. Do not fill the gap with a
generic recommendation.

### 2. Build the change ledger

Give each source a stable ID such as `S1`, `S2`, or the ID already present in
the input. Record the source type, origin, date/version, and a short exact line
when possible. Otherwise label a faithful paraphrase as a paraphrase.

For every observed change, answer both questions:

- What does this source support?
- What does this source not prove?

### 3. Map possible impact

For each affected area, name the user or product surface, the possible impact,
the evidence status, and the unknown that could change the decision. Use
`source-backed`, `hypothesis`, or `Not verified`; do not use a confidence score
to hide missing evidence.

### 4. Write candidate implications

Keep each implication narrow enough to review. The implication may be to
`trial`, `update`, `defer`, or `monitor`, but it is not a final decision unless
the supplied evidence supports that level. Attach source IDs and one
limitation to every source-backed implication.

### 5. Choose the smallest validation

Propose one reversible test that could change the decision. Specify:

- question: what uncertainty the test is meant to reduce;
- change: what will be different;
- audience or context: who will encounter it and where;
- primary metric: the one observable outcome;
- guardrail: what must not get worse;
- decision rule: what result would change the next step;
- timebox: how long or how many observations, labelled `proposed` when needed.

If the input does not justify a metric, use `Proposed metric` and explain what
would make it measurable.

### 6. Hand off for human review

End with `Not covered` and a short review ask. The reviewer should be able to
correct the source mapping, impact wording, limitation, or validation without
rewriting the whole brief.

## Output contract

Return these sections in this order:

```markdown
## Decision on the desk
...

## Change ledger
| ID | Source and type | Date/version | Observed change | Does not prove |
|---|---|---|---|---|

## Impact map
| Area | Affected user/product | Possible impact | Evidence status | Unknown |
|---|---|---|---|---|

## Candidate implications
| ID | Implication | Status | Source IDs | Limitation |
|---|---|---|---|---|

## Smallest validation
- Question:
- Change:
- Audience or context:
- Primary metric:
- Guardrail:
- Decision rule:
- Timebox:

## Not covered
- ...

## Review ask
...
```

Keep the brief short enough to review in one sitting. If the source set is
large, keep the main ledger focused and point to an appendix rather than
burying uncertainty in a long trend summary.

## Edge cases

- **Undated change:** keep the source, write `Date/version: Not provided`, and
  state that freshness is unresolved.
- **One vendor announcement:** record the documented change, then mark demand,
  reliability, compatibility, and production impact as `Not verified` unless
  other sources establish them.
- **AI-generated trend digest:** keep it as an artifact, trace each material
  line to underlying sources, and do not count the digest as a second source.
- **Conflicting sources:** show both observations, name the conflict, and make
  the validation distinguish between the competing explanations.
- **No decision supplied:** provide the source and impact ledgers, keep the
  decision as `Not provided`, and ask for the smallest decision that matters.
- **Broad trend claim without a denominator:** preserve the wording as a claim
  to inspect and mark prevalence, adoption, and market size `Not verified`.
- **No affected user or product surface:** keep the change ledger, mark impact
  as `Not verified`, and do not recommend a build from novelty alone.

## Final check

Before returning the brief, confirm:

- every observed change has a source ID and an evidence boundary;
- dates, versions, source type, and missing origin are visible;
- no availability claim became an adoption, reliability, or business claim;
- every proposed implication has a status, source IDs where applicable, and a
  limitation;
- the validation has one primary metric, one guardrail, a decision rule, and a
  proposed timebox or a stated measurement gap;
- `Not covered` names the most important unresolved uncertainty;
- no number, quote, user, outcome, market size, or adoption claim was added
  from guesswork.

For a ready-to-paste fictional first run, read `examples/first-run.md`.
