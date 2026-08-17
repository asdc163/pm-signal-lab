# Outcome-to-improvement reference

This reference is a **fictional fixture** for learning how to turn a reviewed
proposal-to-outcome difference into an improvement finding. It is not a live
analytics specification, customer-data contract, causal analysis, or product
result.

## Source ledger

| ID | Source | What it supports | Boundary |
| --- | --- | --- | --- |
| `SRC-001` | [OpenAI: Evaluate agent workflows](https://developers.openai.com/api/docs/guides/agent-evals) | Traces record an end-to-end workflow of model calls, tool calls, guardrails, and handoffs; trace grading helps identify workflow issues and regressions; datasets/eval runs support repeatability | Trace/eval evidence is not automatically a user outcome or causal product result |
| `SRC-002` | [OpenAI: Trace grading](https://developers.openai.com/api/docs/guides/trace-grading) | Structured scores or labels on traces can assess correctness, quality, or adherence to expectations and help locate problems at scale | A graded trace does not prove responsibility, adoption, or real-world value |
| `SRC-003` | [OpenAI model guidance](https://developers.openai.com/api/docs/guides/latest-model) | Representative-task comparisons should keep task success, final completeness, required evidence, tokens, latency, cost, calls, turns, and retries separate | Current provider guidance is not a result for this product and model details can change |
| `SRC-004` | [OpenAI: Building self-improving tax agents with Codex](https://openai.com/index/building-self-improving-tax-agents-with-codex/) | Production corrections can differ because of extraction, mapping, unsupported behavior, practitioner preference, or downstream workflow; reviewed differences can be grouped into targeted eval findings with a practitioner-led loop | A partner case and its reported numbers do not establish another product's quality, causality, or adoption |

## Evidence-chain contract

| Link | Evidence to preserve | Safe public form |
| --- | --- | --- |
| Proposal | run/task ID, version/config, source/context IDs, output shape, timestamp | stable ID, category, version or `Not provided` |
| Workflow | route, model, tools, retrieval, guardrails, handoffs, retries, authority | component IDs and status, no raw content |
| Human action | actor class, accept/edit/reject/override, reason, rubric, disagreement | action type and reviewer class |
| Final artifact | final value/state, source or downstream version, approval/edit status | redacted artifact ID and state |
| Outcome | user-job completion, external receipt, acknowledgement, correction, or pending state | outcome class, oracle, timestamp, and evidence status |
| Scope | segment, locale, tenant, device, risk, version, sampling frame | safe categories and denominator metadata |

If any link cannot be joined, state `Not reconciled` and lower the finding. Do
not infer a chain from matching timestamps, similar text, or an HTTP success.

## Difference taxonomy

| Class | Test question | Do not assume |
| --- | --- | --- |
| `MODEL_OR_GENERATION` | Was the task, source, context, and product contract adequate while the generated result violated the oracle? | every bad field is a model fault |
| `SOURCE_OR_RETRIEVAL` | Was the source eligible, current, authoritative, and actually selected? | more retrieved text is better |
| `MAPPING_OR_SCHEMA` | Did normalization, extraction, mapping, or schema transform the value? | a well-formed output is semantically correct |
| `TOOL_OR_ORCHESTRATION` | Did a call, transition, retry, handoff, or authority boundary change the result? | tool success is user success |
| `PRODUCT_SUPPORT_GAP` | Was the requested job outside the supported product workflow? | unsupported means model failure |
| `HUMAN_PREFERENCE` | Was the edit style, convenience, or house convention rather than an objective error? | preference is a golden label |
| `EXPECTED_WORKFLOW_VARIANCE` | Did the domain process legitimately alter the proposal? | all differences need fixes |
| `DOWNSTREAM_STATE` | Did another system, actor, or reconciliation step change the final state? | the AI caused the final value |
| `OPERATIONAL` | Did latency, quota, timeout, outage, partial completion, or retry affect the job? | optimize the prompt first |
| `UNKNOWN` | Which identity, source, reviewer, or outcome receipt is missing? | fill the gap with a plausible cause |

## Grouping protocol

Before grouping a set of records, require:

1. A stable user job and outcome oracle.
2. Comparable workflow, model/config, prompt/context, source, locale, and
   product version boundaries.
3. A review rubric, reviewer class, disagreement record, and adjudication path.
4. A declared eligible exposure, sample, denominator, window, sampling rule,
   missingness, duplicate handling, and contamination boundary.
5. A primary difference class, one alternative mechanism, and a severity split.
6. A statement of what the grouped pattern can support and cannot support.

Keep privacy, security, authorization, side-effect, and other high-severity
records separate from a routine average. A repeated pattern is an actionable
hypothesis, not proof that a fix will improve the product.

## Finding template

```text
Finding ID: [stable ID]
User job/surface: [one job and surface]
Difference: [proposal -> human action -> final state -> outcome]
Evidence: [source/run/artifact/outcome IDs and statuses]
Primary class: [class]  Confidence: [low/medium/high]
Alternative: [one competing explanation]
Scope: [version/segment/window/denominator or Not provided]
Impact: [user/trust/quality/safety/cost/latency/operations]
Actionability: [actionable/needs evidence/expected variance/risk route/no action]
Destination: [eval/regression/product/data-source/UX/control/incident/hold]
Smallest next step: [one reversible action]
Stop rule: [what blocks or disproves it]
Owner/expiry: [owner, review date, TTL]
Rollback: [baseline restore, disablement, data removal, or manual route]
Not covered: [missing joins and unsupported claims]
```

## Status separation

Use independent statuses:

| Status | Meaning |
| --- | --- |
| `Finding: proposed` | a signal has been captured but not reviewed |
| `Finding: reviewed` | evidence and interpretation were reviewed under a rubric |
| `Finding: grouped` | comparable reviewed records form a bounded pattern |
| `Finding: actionable` | owner and smallest next step are accepted |
| `Fix: implemented` | a change exists; this does not prove its result |
| `Outcome: verified` | the named oracle passed on the declared surface/window |
| `Hold` | permission, identity, outcome, safety, or evidence is insufficient |

Never promote `Finding: reviewed` directly to `Outcome: verified`.

## Not covered

- No provider, model, trace, telemetry, customer record, downstream system,
  evaluator, or production environment is accessed by this reference.
- No correction, completion rate, grouped finding, or source link establishes
  quality, safety, adoption, causality, legal compliance, or business impact.
- Current provider guidance and partner case studies require fresh, product-
  specific verification before any implementation, data reuse, or release.
