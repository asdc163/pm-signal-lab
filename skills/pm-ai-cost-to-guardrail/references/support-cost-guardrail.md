# Worked reference: support-draft cost guardrail packet

This is a **fictional fixture** that demonstrates how to keep provider pricing,
usage, outcome denominators, latency, and quality guardrails separate. It is
not a live billing analysis or a production economics claim.

## Contents

- [Decision and outcome](#decision-and-outcome)
- [Evidence and pricing snapshot](#evidence-and-pricing-snapshot)
- [Cost ledger](#cost-ledger)
- [Denominator and outcome](#denominator-and-outcome)
- [Latency journey](#latency-journey)
- [Guardrails](#guardrails)
- [Options and decision rule](#options-and-decision-rule)
- [Instrumentation and writeback](#instrumentation-and-writeback)
- [Not covered](#not-covered)

## Decision and outcome

**Decision on the desk:** `Hold` the fictional support-draft rollout until the
team can replace the fixture numbers with observed usage, confirm the
completed-job oracle, and investigate the p95 tail.

**User job:** A support agent needs a source-grounded draft that is reviewable
before a reply is sent.

**Outcome:** A completed draft passes the fictional source and critical-claim
checks. A request, a draft, a manual fallback, and a successful user outcome
are not interchangeable.

**Owner:** Support platform PM, with engineering for traces and finance for
the pricing or loaded-cost assumptions.

**Scope:** One fictional day, 30 eligible attempts, one support-draft route,
one fictional model price snapshot, search-tool calls, retry calls, and a
declared manual-review estimate.

## Evidence and pricing snapshot

| ID | Source | Boundary | Status | Limitation |
| --- | --- | --- | --- | --- |
| `P-001` | Fictional model input price | $0.50 / million input tokens | Price input | Not a provider rate |
| `P-002` | Fictional model output price | $2.00 / million output tokens | Price input | Not a provider rate |
| `P-003` | Fictional search price | $0.002 / call | Price input | Not a provider rate |
| `P-004` | Fictional manual burden | $18/hour, 20 sec per draft | Estimate | Not a payroll record |
| `U-001` | Fictional initial usage | 120k input, 18k output | Observed in fixture | Not production telemetry |
| `U-002` | Fictional retry usage | 24k input, 3k output | Observed in fixture | Failure cause unknown |
| `U-003` | Fictional tool usage | 36 search calls | Observed in fixture | Tool pricing scope assumed |
| `O-001` | Fictional outcome count | 24 completed, 4 fallback, 2 abandoned | Observed in fixture | No real success oracle |

Every real price row would also need a source URL or document ID, retrieval
timestamp, currency, unit, tier, model or tool version, region, and effective
window. A durable skill must not freeze a current provider price as a product
truth.

## Cost ledger

| Component | Quantity | Unit price | Formula | Total |
| --- | ---: | ---: | --- | ---: |
| Initial input | 120,000 tokens | $0.50 / MTok | 120,000 × 0.50 / 1,000,000 | $0.060 |
| Initial output | 18,000 tokens | $2.00 / MTok | 18,000 × 2.00 / 1,000,000 | $0.036 |
| Retry input | 24,000 tokens | $0.50 / MTok | 24,000 × 0.50 / 1,000,000 | $0.012 |
| Retry output | 3,000 tokens | $2.00 / MTok | 3,000 × 2.00 / 1,000,000 | $0.006 |
| Search calls | 36 calls | $0.002 / call | 36 × 0.002 | $0.072 |
| Model/tool subtotal | — | — | sum of above | $0.186 |
| Manual review | 24 × 20 sec | $18 / hour | 24 × 20 / 3,600 × 18 | $2.400 |
| Loaded variable total | — | — | subtotal + manual review | $2.586 |

The model/tool subtotal is not a product success measure. It describes one
declared cost scope. The loaded total is an estimate that depends on a stated
manual-burden assumption. Infrastructure, storage, support, and allocation
costs are `Not provided`.

## Denominator and outcome

```text
eligible attempts = 30
completed jobs = 24
fallback jobs = 4
abandoned jobs = 2

model/tool cost per attempt = $0.186 / 30 = $0.0062
loaded cost per completed job = $2.586 / 24 = $0.10775
```

The denominator is a fictional completion oracle: the draft has the required
source and no critical unsupported claim. If a real product counts a manual
fallback as the same outcome, it must state that choice and show AI versus
manual paths separately. If the completion oracle changes, the metric is no
longer directly comparable without a version boundary.

The packet does not calculate revenue, gross margin, payback, willingness to
pay, or ROI. It has no evidence for any of those outcomes.

## Latency journey

**Start event:** sanitized support request accepted by the draft route.

**End event:** reviewable draft reaches the agent, or a manual fallback is
offered. The time to send a reply is outside this packet.

| Signal | Fixture value | Interpretation |
| --- | ---: | --- |
| p50 draft latency | 2.1 seconds | Directional fixture value |
| p95 draft latency | 7.8 seconds | Above the proposed 6.0-second budget |
| Retry calls | 6 | Cost and failure signal; cause unknown |
| Abandoned attempts | 2 of 30 | Could be latency, quality, or task mismatch |
| Manual fallback | 4 of 30 | Keeps the journey available but adds burden |

The p95 result supports a `Hold` proposal for this fixture. It does not prove
that retrieval, context size, model, or retries caused the tail. A real readout
would inspect span-level latency and split the result by path and version.

## Guardrails

The following are proposed hard gates:

| Guardrail | Gate | Fixture status |
| --- | --- | --- |
| Critical unsupported claim | Zero tolerated in critical cases | Not run |
| Source visibility | Source ID and freshness visible | Not run |
| Completed-job oracle | Stable and versioned | Proposed only |
| p95 latency | At or below approved budget | Fails proposed fixture budget |
| Manual fallback | Available when AI path stops | Proposed only |
| Retry or loop cost | Bounded and reason-coded | Not diagnosed |
| Privacy | No raw support content in analytics | Not run |
| Human takeover | Owner can complete safely | Not run |

The quality and trust gates can block a release even if cost is below budget.
The cost gate can also block a release when the outcome is good but the path
cannot be operated responsibly within the declared budget.

## Options and decision rule

| Option | Expected mechanism | Tradeoff | Evidence status |
| --- | --- | --- | --- |
| Baseline | Keep current context and retries | Highest observed fixture tail | Fixture only |
| Retrieval scope cap | Reduce input tokens and work | May remove policy evidence | Hypothesis |
| Retry cap | Bound spend and tail | More manual fallback | Hypothesis |
| Simple-case route | Use a cheaper path for bounded cases | Negative routing risk | Hypothesis |
| Cache or batch | Reduce repeated work or unit price | Freshness or latency constraints | Hypothesis |

Decision rule:

- `Ship` only with a valid denominator, fresh price/usage snapshot, quality
  gates, p95 budget, fallback, and no critical privacy or safety failure.
- `Iterate` when the cost or latency driver is identifiable and a reversible
  test preserves the completion oracle and trust guardrails.
- `Hold` when evidence, denominator, tail behavior, or guardrails are unknown.
- `Rollback` when a change creates critical quality, privacy, runaway-loop, or
  fallback failure.
- `Need evidence` when a result depends on a source, price, or denominator that
  cannot be reconciled.

Current fixture decision: `Hold`, not run in production.

## Instrumentation and writeback

A real implementation would capture, with privacy-safe fields:

- `workflow_id`, `task_type`, `model_version`, `prompt_or_policy_version`;
- input/output token counts, cache or batch mode, tool call count, retry reason;
- start/end span timestamps, timeout, p50/p95 aggregation window;
- eligible, attempted, completed, fallback, abandoned, and human-takeover
  events;
- price source ID and effective window, not a hard-coded provider constant;
- completion-oracle version, privacy classification, and cost allocation scope.

The learning loop sends a real failure to one of the existing surfaces:

1. `pm-ai-trace-to-regression` for a single trace or cost loop;
2. `pm-ai-incident-to-runbook` for a journey-level cost or latency incident;
3. `pm-ai-evaluation-plan` for a new quality or routing slice;
4. `pm-release-to-learn` for a healthy rollout that needs observation.

## Not covered

- No live provider price, billing export, production trace, telemetry, or
  finance data was accessed.
- No real denominator, completion oracle, cost allocation, latency budget,
  quality score, or manual burden was validated.
- No model, prompt, retrieval, context, retry, cache, batch, or routing option
  was implemented or compared.
- No provider recommendation, revenue, margin, ROI, PMF, adoption, retention,
  reliability, safety, privacy, accessibility, localization, or star impact is
  supported.
- No rollout, rollback, human review, or external communication occurred.
