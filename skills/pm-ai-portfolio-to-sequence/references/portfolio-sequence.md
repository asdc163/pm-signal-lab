# AI portfolio sequence reference

Use this reference when a team has several AI candidates and needs to explain
why one starts first, what foundation comes before another, and what evidence
changes the order. The result is a small sequence with gates, not a permanent
roadmap.

## When to use

Load this reference when a portfolio review asks:

- Which candidate has the clearest first learning job?
- Is a proposed platform or foundation actually blocking the work?
- What can run in parallel without exhausting review, support, or approval
  capacity?
- Which receipt unlocks the next stage?
- What should be held, stopped, or retired?

## From pilots to portfolios

[OpenAI's value-model guidance](https://openai.com/index/the-five-ai-value-models-driving-business-reinvention/)
argues that organizations move from disconnected pilots to a portfolio of value
models. Those models have different economics, time-to-value, and governance
requirements. The sequence question is therefore not "which AI use case is
best?" It is: *what should be built first, what foundation does it create, and
what does it unlock next?*

The guidance describes a chain from workforce fluency to governance, deeper
system integration, dependency management, and agent-led operations. Treat
that chain as a hypothesis for the team's context. It is not a universal order.

[OpenAI's investment guidance](https://openai.com/index/managing-ai-investments-in-agentic-era/)
adds a portfolio operating rule: fund broad productivity, repeatable
function-specific workflows, and a smaller set of strategic bets; govern before
scale; then match capacity and support to proven demand. A candidate that looks
valuable but has no owner or available support is not automatically the next
candidate.

## Candidate card

Use one row per candidate:

| Field | What to record | If absent |
| --- | --- | --- |
| Candidate and owner | stable name, accountable owner, affected team | `card_status: incomplete` |
| User/job | who needs what work and where it happens | keep `Explore` |
| Value model | supplied category or `Not classified` | do not infer from tooling |
| Maturity | Explore, Validate, Pilot, Scale, or Retire | keep the supplied status |
| Evidence | test, quality bar, accepted outcome, source, freshness | label each gap |
| Foundation | identity, data, eval, observability, support, or enablement need | `Not provided` |
| Dependency | prerequisite, shared foundation, optional accelerator, or unverified | no graph edge without source |
| Capacity | people, budget, quota, support, review, or concurrency | cap at `Not provided` |
| Risk and authority | affected users, approval, fallback, stop condition | do not promote to Start |
| Next learning job | the smallest question the first stage should answer | ask for one |

## Dependency map

Use this table rather than a decorative arrow diagram:

| From | To | Relationship | Source/owner | Confidence | Confirmation receipt | Failure route |
| --- | --- | --- | --- | --- | --- | --- |
| candidate A | candidate B | prerequisite/shared foundation/etc. | supplied or `Not provided` | high/medium/low/unverified | what would confirm it | Hold, Narrow, or remove edge |

Do not treat a shared foundation as free. It needs a user/job, owner, cost or
capacity boundary, accepted outcome, and stop rule. An identity or evaluation
foundation may support multiple candidates, but the fact that it is reusable
does not prove it should be built first.

## Sequence card

Every placed item needs these fields:

| Field | Example shape |
| --- | --- |
| Route | Start, Foundation first, Parallel, Next, Hold, Stop, Retire |
| Entry condition | what is already true before work starts |
| Learning job | one question the stage must answer |
| Exit receipt | evidence needed to continue or unlock another card |
| Owner | named person or `Not provided` |
| Capacity | people, budget/quota, support/eval, concurrency |
| Review date | a date or explicit `Not provided` |
| Failure route | what happens if the receipt fails |
| Reorder authority | who can move the card and why |

`Parallel` is not a default. Use it only when the shared capacity, risk,
approval, and evidence boundary are explicit. If two candidates compete for the
same reviewer or support queue, the portfolio has a concurrency constraint.

## Stage gates

Use a gate that matches the candidate's job:

- **Fluency or enablement:** repeated useful behavior, reusable workflow,
  practice, and safe-use boundary.
- **Expert bottleneck:** cycle time, reviewer quality, rework, and evidence that
  the domain expert can sign off.
- **System/dependency:** identity, entitlements, trusted context, logging,
  evaluation, exception handling, and ownership.
- **Process re-engineering:** end-to-end outcome, permissions, controls,
  exceptions, support, and a real owner.
- **Distribution or product route:** qualified intent, conversion quality,
  trust, retention, and user outcome at the named scope.

The category changes the gate. A strong enablement signal does not unlock an
autonomous action without its own authority and control receipts.

## Reorder rule

Write the rule as:

```text
If <receipt> changes from <current status> to <observed status>,
then <owner> may move <candidate> from <current route> to <new route>
at <review point>, subject to <capacity/risk boundary>.
```

Examples:

- If the support-draft slice meets the quality bar and the review queue remains
  supportable, the owner may move it from `Test` to `Next` for one adjacent
  queue.
- If a required identity or approval receipt remains missing, the agent-action
  candidate stays `Hold` even when its demo is compelling.
- If a foundation consumes the only evaluator capacity, a parallel candidate
  moves to `Hold` rather than silently lowering review quality.

## Portfolio review questions

[OpenAI's HP case](https://openai.com/index/hp-frontier-partnership/)
describes pilots becoming a broader portfolio through a connective layer for
access, context, deployment, and evaluation. Ask:

1. What work is the connective layer responsible for?
2. Which candidates share a real foundation and which only share a vendor?
3. Who owns the foundation after the first pilot?
4. What is the smallest outcome that proves the foundation is useful?
5. Which candidates can be safely held without losing an option?

[OpenAI Academy's workflow courses](https://openai.com/index/academy-courses-applying-ai-at-work/)
connect individual use to repeatable workflows and ask teams to balance
inputs, models, tools, checkpoints, human review, quality, speed, and cost. Use
those as candidate-level learning inputs, not as proof that a portfolio is ready.

[OpenAI's B2B signals](https://openai.com/index/introducing-b2b-signals/)
emphasize depth of engagement and workflow maturity over message volume alone.
Use that distinction to ask whether a candidate is becoming a repeatable,
governed workflow; do not treat a high-volume channel signal as proof of value.

## Fictional worked fixture

The support-draft portfolio in `examples/first-run.md` is a **fictional fixture**.
It shows a low-risk drafting bet starting before a higher-risk action bet, with
evaluation and approval foundations treated as separate gates.
It does not report real team value or recommend a real roadmap.

## Not covered

This reference does not establish business value, adoption, causal impact,
delivery dates, budget, staffing, vendor suitability, security, privacy,
compliance, accessibility, localization, production readiness, or
organizational transformation. It does not mutate a roadmap, connect a
provider, approve a dependency, grant access, or start parallel work.
