# First run: support-draft cost and latency guardrail

This is a **fictional fixture** for learning the skill. It is not a provider
invoice, production telemetry export, customer study, ROI result, or evidence
that a support-draft workflow is economically viable.

## Decision on the desk

- **Review ask:** `Hold`
- **User job:** A support agent needs a policy-grounded answer draft that can
  be reviewed before responding.
- **Outcome:** One completed, reviewable draft that meets the fictional source
  and unsupported-claim checks.
- **Current workaround:** Manual drafting from the approved policy page.
- **Decision owner:** Support platform PM with engineering and finance review.
- **Evidence status:** Fictional usage and fictional pricing snapshot only.
- **Reason for hold:** The fixture p95 latency is above the proposed budget;
  no production denominator or charged usage exists.

## User job and outcome

| Field | Fixture value | Status |
| --- | --- | --- |
| Eligible jobs | 30 support-draft attempts in one fictional window | Proposed fixture |
| Completed jobs | 24 drafts pass the stated review oracle | Proposed fixture |
| Fallback jobs | 4 use manual drafting | Proposed fixture |
| Abandoned jobs | 2 do not reach a reviewable draft | Proposed fixture |
| Success oracle | Draft includes policy source, no critical unsupported claim, and is reviewable | Proposed |
| Observation window | One fictional day | Not production |

The denominator for `cost per completed job` is 24, not 30 requests. Manual
fallback is reported separately and its burden is included only in the loaded
cost estimate below.

## Pricing and usage evidence

| ID | Input | Value | Evidence status |
| --- | --- | --- | --- |
| `P-001` | Fictional model input rate | $0.50 per million tokens | Fixture price input |
| `P-002` | Fictional model output rate | $2.00 per million tokens | Fixture price input |
| `P-003` | Fictional search call rate | $0.002 per call | Fixture price input |
| `P-004` | Fictional reviewer burden | $18/hour and 20 seconds per completed draft | Fixture estimate |
| `U-001` | Initial model usage | 120,000 input and 18,000 output tokens | Fixture usage |
| `U-002` | Retry model usage | 24,000 input and 3,000 output tokens | Fixture usage |
| `U-003` | Search calls | 36 calls | Fixture usage |

The fixture intentionally does not use a live provider price. A real packet
must record the provider source URL, retrieval time, currency, tier, model
version, region, and effective price window.

## Cost ledger and denominator

| Component | Calculation | Total | Evidence |
| --- | --- | ---: | --- |
| Initial model input | 120,000 × $0.50 / 1,000,000 | $0.060 | Fictional usage |
| Initial model output | 18,000 × $2.00 / 1,000,000 | $0.036 | Fictional usage |
| Retry input | 24,000 × $0.50 / 1,000,000 | $0.012 | Fictional usage |
| Retry output | 3,000 × $2.00 / 1,000,000 | $0.006 | Fictional usage |
| Search tools | 36 × $0.002 | $0.072 | Fictional usage |
| Model and tool subtotal | Sum of above | $0.186 | Calculated fixture |
| Manual review burden | 24 × 20 seconds × $18/hour | $2.400 | Fictional estimate |
| Loaded variable cost | Subtotal + review burden | $2.586 | Calculated fixture |

```text
cost per attempt
  = $0.186 / 30 = $0.0062 model-and-tool subtotal

loaded cost per completed job
  = $2.586 / 24 = $0.10775
```

The first number is not a success metric. The second number is a fictional
loaded estimate whose result changes if the completion oracle, manual burden,
or price snapshot changes. No margin, willingness to pay, revenue, or ROI is
inferred.

## Latency and journey budget

| Signal | Fixture value | Proposed guardrail |
| --- | ---: | ---: |
| p50 draft latency | 2.1 seconds | Observe |
| p95 draft latency | 7.8 seconds | ≤ 6.0 seconds |
| Abandoned attempts | 2 / 30 | Investigate before scale |
| Retry share | 6 retry calls | Must be segmented by failure reason |
| Manual fallback | 4 / 30 | Keep available |

The p95 guardrail is proposed, not a user-derived threshold. Because the
fictional p95 exceeds it, the packet stays at `Hold`; no claim is made that
context size, retries, or the search tool caused the tail.

## Quality and trust guardrails

Promotion must not proceed if any of these occur in a real evaluation:

- a critical unsupported claim passes the completion oracle;
- the source ID or freshness boundary is missing from a reviewable draft;
- a retry or fallback is counted as an AI success without being labelled;
- the user cannot reach manual drafting;
- raw customer content enters the cost packet;
- p95 or abandonment exceeds the approved budget without an owner decision.

Quality, privacy, trust, and manual-burden evidence is `Not run` in this
fixture. Cost alone cannot release the flow.

## Options and tradeoffs

| Option | Possible benefit | Risk or unknown | Status |
| --- | --- | --- | --- |
| Baseline | Preserve current quality and source scope | p95 and loaded burden exceed proposed budget | Hold |
| Reduce retrieval scope | Lower input tokens and latency | May remove needed policy context | Proposed |
| Cap retries | Bound cost and tail time | More manual fallback | Proposed |
| Route simple requests to a smaller path | Lower cost for easy cases | Negative routing or quality regression | Proposed |
| Keep manual fallback | Protect trust and correctness | Higher human burden | Required while held |

No option was implemented or compared. The smallest next evaluation should
isolate retry cap and retrieval scope while keeping the same completion oracle.

## Decision rule and release gate

- **Ship:** only if completed-job quality meets its critical gates, p95 stays
  within the approved budget, cost per completed job is calculated from a
  defensible denominator, fallback is available, and no P1 privacy or safety
  failure occurs.
- **Iterate:** if quality holds but a diagnosed cost or latency driver can be
  tested without weakening trust or fallback.
- **Hold:** if denominator, pricing snapshot, p95, quality, or data integrity
  is unknown, or if the cost improvement trades away a critical guardrail.
- **Rollback:** if a change produces a critical unsupported claim, privacy
  issue, runaway retry/tool loop, or unsafe fallback failure.

Current status: `Hold`, proposed fixture only, not run.

## Instrumentation and learning loop

A real workflow would need redacted event and trace fields for workflow ID,
model/provider/version, prompt or policy version, input/output tokens, tool
calls, retry reason, cache or batch mode, start/end timestamps, fallback,
completion oracle, human takeover, cost-source ID, and privacy class. A real
cost or latency failure should become a regression, incident, or next eval
case; it should not remain only in a finance spreadsheet.

## Not covered

- No provider billing, current price table, production telemetry, customer
  content, or real support workflow was accessed.
- No denominator, quality oracle, p50/p95 threshold, retry diagnosis, or manual
  burden was validated with real users.
- No model routing, context reduction, cache, batch, retry cap, or fallback
  change was implemented or compared.
- No adoption, traffic, revenue, margin, ROI, reliability, safety, privacy,
  accessibility, localization, or star impact is known.
- No release, rollback, human review, or external communication occurred.
