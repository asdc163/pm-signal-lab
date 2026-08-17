---
name: pm-ai-guardrail-to-enforcement
description: Use when an AI or agent workflow needs a guardrail contract that maps each input, output, tool, handoff, approval, or runtime boundary to its timing, enforcement action, tripwire, failure state, evidence, recovery, and residual risk.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Guardrail to Enforcement

Turn “we have guardrails” into a reviewable enforcement map. This skill identifies what a check can see, when it runs, what it can stop, which paths it does not cover, and how the product recovers when the check rejects, trips, or fails. It does not implement a classifier or prove safety.

## When to use

- an AI workflow has input, output, tool, handoff, approval, hosted, or built-in execution checks;
- a PM needs to know whether a guardrail runs before a model/tool/side effect, after it, or only on a final output;
- a manager, handoff, parallel branch, custom function tool, or agent-as-tool may create an uncovered path;
- a team must choose serial versus parallel checking and make the latency, token, cost, and unsafe-work window explicit;
- a guardrail can allow, reject content, throw a tripwire, block, request manual review, or fail to complete;
- the team needs evidence, negative evaluation slices, retry/resume rules, residual risk, or a release decision.

## Do not use this when

- the primary work is a general hazard and control register; use `pm-ai-risk-to-control`;
- the primary work is an injection attack path; use `pm-ai-prompt-injection-to-defense`;
- the primary work is approving an external side effect; use `pm-ai-approval-to-flow`;
- the primary work is calibrating human or model judges; use `pm-ai-review-to-calibration`;
- the primary work is a specialist delegation boundary; use `pm-ai-subagent-to-delegation`.

## Evidence boundary

Current SDK documentation is a source mapping, not proof that this product blocks anything. Record host, provider/model, SDK/version, workflow item, guardrail ID/version, timing, decision, tripwire/error, side-effect state, observed time, and evidence layer. If a fact is not observed, write `Unknown`, `Not run`, `Not measured`, or `Not covered`. A guardrail score or pass is not a verified safe outcome.

## Workflow

### 1. State the harm and boundary

Write one sentence:

> Decide whether guardrail `<guardrail/version>` may protect item `<agent/tool/handoff/output>` from harm `<harm>` before/after `<side effect>`, using data `<scope>`, timing `<serial/parallel>`, decision `<behavior>`, tripwire `<failure>`, evidence `<oracle>`, recovery `<path>`, and residual-risk owner `<owner>`.

Map the workflow: first agent, intermediate agents, handoffs, manager-as-tool calls, custom tools, hosted/built-in tools, approvals, parallel branches, final output, and manual surface. A missing item is a `coverage_gap`, not an implicit pass.

### 2. Choose the enforcement layer

Select the layer that can actually observe and stop the risk:

| Layer | Covers | PM question |
| --- | --- | --- |
| `input` | initial user input or declared entry | does it run on the first agent and before expensive work? |
| `output` | final agent output or declared result | is this the final user-visible item, and is it too late for side effects? |
| `tool_input` | custom function-tool arguments | does it run before every invocation and before execution? |
| `tool_output` | custom function-tool result | can it replace/block the result before the model or user sees it? |
| `handoff` | transfer/ownership boundary | is the handoff path covered by a dedicated check? |
| `approval_adjacent` | proposed action before/after approval | what runs before approval, again before execution, and after resolution? |
| `host_runtime` | provider/host/built-in execution path | is there an independent enforcement point for a path outside custom tools? |
| `manual` | person-owned review | who decides and how is the decision recorded? |

Do not infer that an agent-level input/output hook covers every agent, tool, handoff, hosted tool, or built-in execution tool.

### 3. Decide timing and failure behavior

Compare serial and parallel checks:

| Mode | Benefit | Risk to disclose |
| --- | --- | --- |
| `serial` | can stop model/token/tool work before it starts | adds latency; stale input may need a fresh check |
| `parallel` | reduces perceived latency | model tokens or tool/side-effect work may begin before a late trip |
| `after` | sees the produced output or result | cannot claim prevention of an already completed side effect |
| `manual` | handles ambiguity and high consequence | adds waiting and reviewer responsibility |

Choose and record `allow`, `reject_content`, `throw_exception`, `block`, `manual`, `unknown`, or `guardrail_execution_failed`. Define whether a rejected tool call is skipped, whether a model may continue, whether an approval is created, and whether the product fails closed.

### 4. Define the check and receipt

Record guardrail ID/version, owner, purpose, input/output data class, model or rule, threshold/oracle, freshness, policy source, timing, execution mode, and retention. Correlate workflow, run, agent, branch, tool, approval, item, tripwire/error, and side-effect IDs. Redact secrets, customer text, raw prompts, and sensitive outputs from public evidence.

### 5. Inspect gaps and recovery

Name paths not covered by the chosen layer: handoffs, `agent.asTool()`, hosted tools, shell/computer/patch/code execution, parallel branches, resumed state, retries, approval transitions, and final synthesis. For each rejection, exception, unavailable check, timeout, cancellation, late trip, false pass, and false block, define retry, restart, resume, manual, cancel, and rollback rules.

Do not reuse a saved state if doing so skips a required initial-input check. Do not let a failed check silently become allow. Do not call an after-output check a prevention control.

### 6. Evaluate and release

Run positive, negative, false-pass, false-block, latency/cost, coverage, recovery, injection, secret, and side-effect slices against the same policy version. Decide `ship`, `pilot`, `hold`, `rollback`, or `unknown`; separate detection evidence, enforcement evidence, product outcome, and residual risk.

## Output contract

Return every field below. `Unknown` is a valid value; omission is not.

| Field | Required content |
| --- | --- |
| `job` | user goal, harm, and side effect at stake |
| `coverage_map` | agents, handoffs, tools, approvals, host/built-in paths, branches, outputs, and manual surface |
| `guardrail` | ID/version, owner, layer, purpose, data class, and oracle |
| `timing` | serial/parallel, before/after approval, before/after execution, latency/cost, and unsafe-work window |
| `decision` | allow, reject_content, throw_exception, block, manual, unknown, or guardrail_execution_failed |
| `enforcement` | tripwire/error, skipped side effect, replacement output, approval state, and user-visible state |
| `evidence` | item/run/agent/tool/branch IDs, redacted input/output reference, decision time, trace, and reviewer |
| `recovery` | retry, restart, resume, manual, cancel, or rollback path and whether a fresh check is required |
| `evaluation` | positive/negative slice, false-pass/false-block guardrail, latency/cost, and release result |
| `residual_risk` | uncovered paths, detection uncertainty, fail-open window, owner, TTL, and next action |
| `not_covered` | provider compatibility, live enforcement, mobile/accessibility, adoption, and user outcome gaps |

## Edge cases

- Guardrail has no named harm, owner, boundary, or enforcement action: `coverage_gap` or `unknown`.
- Input check attached to a non-first agent: mark that path uncovered; add a check that actually sees the item or hold.
- Output check attached to a non-final agent: do not call it final-output protection; validate the intermediate result separately.
- Tool check covers custom function tools but the workflow uses a handoff, `agent.asTool()`, hosted tool, shell, computer, patch, or other built-in surface: map the gap explicitly.
- Parallel check may trip after token spend or side effects begin: disclose the window and choose serial when fail-closed prevention matters more than latency.
- Approval is pending: decide whether input checks run before approval, again immediately before execution, or only after; record each state.
- `reject_content` versus tripwire: define whether the model may continue, whether the tool was skipped, and what the user sees.
- Check fails to complete, times out, or provider is unavailable: choose fail-closed, manual, or a bounded fail-open exception with owner/TTL; never silently allow.
- Retry/resume uses saved state: record which checks rerun. A saved state may not re-trigger an initial input check; a final output check may have a different retry path.
- Handoff or parallel branch adds a new agent/tool: update coverage before execution; first/final checks do not cover every inserted node.
- Check sees sensitive input/output: minimize, redact, retain, and disclose its own data path and egress.
- Guardrail blocks a legitimate request: preserve reason, appeal/manual route, false-block label, and correction path; do not silently lower the rule.
- Guardrail passes but the tool/output is out of scope, stale, injected, or unverified: keep the product blocked or manual; detection is not authorization or correctness.
- Late trip after a side effect: contain, stop descendants if possible, inspect artifact/state, notify owner, and use rollback; do not report clean prevention.

## Final check

Before returning the contract, verify:

- [ ] harm, side effect, workflow item, guardrail owner, ID/version, and oracle are explicit;
- [ ] first-agent input, final-agent output, every custom tool, handoff, agent-as-tool, hosted/built-in path, branch, approval, retry, resume, and manual surface are mapped;
- [ ] serial/parallel timing, token/cost/latency tradeoff, and unsafe-work window are visible;
- [ ] allow, reject-content, exception/tripwire, block, manual, unknown, and check-failed behavior are distinct;
- [ ] approval ordering, side-effect state, user-visible state, and fresh-check requirements are recorded;
- [ ] evidence correlates policy, item, run, agent, tool, branch, approval, tripwire/error, and outcome without exposing secrets;
- [ ] false-pass, false-block, negative, recovery, injection, secret, and side-effect slices exist;
- [ ] provider and runtime claims link to current documentation and are not universal guarantees;
- [ ] mobile, accessibility, external user, adoption, live enforcement, and user outcome are listed as `Not covered` when not tested.

Read [the worked guardrail enforcement contract](references/guardrail-enforcement-contract.md) for the source mapping, coverage matrix, and recovery tables.
