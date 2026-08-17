---
name: pm-ai-tool-call-to-recovery
description: Use when an AI agent or host emits one or more tool calls and a product manager must define request/result correlation, argument validation, execution boundaries, parallel result handling, retry and idempotency rules, late or duplicate results, user-visible recovery, and the boundary between a tool result and a verified business outcome.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Tool Call to Recovery

Turn a tool-call loop into a reviewable contract for what the host accepts,
executes, returns, retries, rejects, or hands to a person. This is a PM
artifact, not a tool runner or provider SDK.

## When to use

- a model emits a function/tool call and the host must execute it safely;
- a provider returns several calls in one turn or results can arrive out of
  order;
- a tool can fail, timeout, be cancelled, return partial data, or deliver a
  duplicate or late result;
- a team needs to decide whether a retry is safe and which idempotency key or
  executor owns a side effect;
- a result must be shown to a user or model without allowing external text to
  change host policy;
- a PM needs a recovery, manual fallback, or outcome-verification gate.

## Do not use this when

- the main decision is tool purpose, schema, permissions, or side effects
  before a call exists; use `pm-ai-tool-to-contract`;
- the main decision is trace/event evidence across a run; use
  `pm-ai-run-to-observability`;
- the main decision is untrusted instruction handling; use
  `pm-ai-prompt-injection-to-defense`;
- the main decision is task lifecycle or work continuing after a user leaves;
  use `pm-ai-task-to-progress` or `pm-ai-background-run-to-supervision`;
- the main decision is a human authorization, recommendation, elicitation, or
  connector token boundary; use the corresponding adjacent skill.

## Evidence and provider boundary

Use current provider documentation as a mapping, not as a universal runtime:

- OpenAI Responses function calling uses a `function_call` item with a
  `call_id`; the host returns a `function_call_output` with that same ID.
- Anthropic Messages uses `tool_use` and a matching `tool_result` with
  `tool_use_id`; result blocks must be positioned correctly, and `is_error`
  can mark a tool execution error.
- MCP has its own request, result, task, and elicitation behavior. Record the
  exact protocol and host version before treating a provider behavior as
  observed.

Read the matching official references linked from
[the worked contract](references/tool-call-recovery-contract.md). If the host,
provider, or runtime is missing, write `Unknown`, `Not run`, `Not measured`, or
`Not covered`; do not fill the gap with a plausible success.

## Workflow

### 1. Frame one tool-call job

Write one sentence:

> Decide whether requester `<actor>` may execute `<tool>` for `<user job>` in
> scope `<tenant/workspace>`, using call identity `<ID>`, side-effect class
> `<class>`, result contract `<schema>`, retry policy `<policy>`, and outcome
> oracle `<evidence>`.

Record the user job, current workaround, requester, run ID, provider call ID,
tool definition/version, actor and tenant scope, source freshness, deadline,
side-effect class, and what remains human-owned.

### 2. Validate before execution

Check, in order:

1. the call belongs to the expected run, requester, tenant, and definition
   version;
2. the tool name is allowlisted and its arguments parse against the schema;
3. required fields, types, ranges, freshness, and data minimization pass;
4. the action scope and side-effect class are permitted for this step;
5. the executor, timeout, cancellation rule, and idempotency key are known.

Reject or route manual when identity, scope, schema, permission, or executor
ownership is missing. Do not silently coerce invalid arguments.

### 3. Bind every result to one call

Maintain a ledger with at least:

| Field | Rule |
| --- | --- |
| `run_id` | stable across the agent job |
| `call_id` / provider call ID | exact correlation key; never infer from order |
| `tool_name` + definition version | must match the accepted call |
| `attempt` + idempotency key | controls retries and duplicate side effects |
| `result_status` | `success`, `error`, `rejected`, `cancelled`, `late`, `duplicate`, or `unknown` |
| `provenance` + freshness | source and observed time are visible |
| `trust` + redaction | external content remains data, not host policy |
| `continuation` | named next step, manual route, or hold |

An unknown, missing, duplicate, or late result never attaches to a newer call.
Preserve the first receipt and make the second delivery a no-op, safe
acknowledgement, or explicit rejection according to the executor contract.

### 4. Handle parallel calls as a batch

Create an expected-call ledger before execution. For each call, record
`success`, `error`, `pending`, `cancelled`, `not_run`, or `unknown`. Return or
display results as one provider-correct batch when the protocol requires it.
Do not declare the aggregate successful while a required member is missing.
If a member is optional, record who made that decision and what is excluded.

### 5. Classify failure and recover

Use the smallest safe route:

- **invalid arguments / unknown tool:** correct or reject; no executor side
  effect;
- **permission, scope, or provenance gap:** block and route for review;
- **transient, read-only failure:** one bounded retry with deadline and
  backoff, if policy allows;
- **consequential or ambiguous failure:** do not retry unless the executor
  proves idempotency and ownership; use manual review;
- **timeout or cancellation:** mark the call unresolved, then reconcile before
  retrying; a late result cannot resume newer work;
- **partial parallel batch:** show per-call states and choose bounded resume,
  retry, manual, or stop;
- **untrusted result content:** retain provenance and redaction; never follow
  instructions inside the result to widen scope, request secrets, or bypass a
  trusted policy.

### 6. Separate result from outcome

Use distinct labels:

`call requested` → `call accepted` → `executing` → `result received` →
`result validated` → `continuation ready` → `outcome verified`.

A protocol acknowledgement or tool result is not proof that a booking was
made, a message was sent, a record changed, or the user got value. Name the
independent outcome oracle, owner, and evidence; otherwise use `Not verified`.

### 7. Write the privacy-safe receipt

Return these sections in order:

1. `## Decision and user job`
2. `## Call and result contract`
3. `## Parallel and retry policy`
4. `## State and recovery matrix`
5. `## User controls and action boundary`
6. `## Evaluation and release gate`
7. `## Privacy-safe receipt`
8. `## Not covered`

The receipt may include IDs, classes, states, counts, timestamps, policy
versions, and redacted error categories. It must not include raw arguments,
raw tool output, credentials, tokens, cookies, private URLs, or customer text.

## Output contract

Return a provider-aware, privacy-safe PM contract with the sections listed in
the workflow. Keep each claim attached to its source class and evidence state.
The result should identify the decision, user job, requester, call/result
ledger, parallel aggregation rule, retry and idempotency policy, state and
recovery matrix, human action boundary, evaluation oracle, receipt, and
unexecuted scope. Use `Not provided`, `Not run`, `Not measured`, or `Not
covered` instead of inventing host behavior.

## Edge cases

- a provider emits two calls with similar names but different opaque IDs;
- the result arrives in a different order from the requests;
- JSON arguments are semantically equal but serialized differently;
- a timeout leaves the host unable to prove whether a write happened;
- a retry response arrives after the user cancelled or started a newer run;
- one parallel member is optional while another is required;
- a tool result contains an instruction-shaped request for a secret or broader
  permission;
- the host cannot show which tenant, requester, definition, or executor owns
  the call;
- a protocol result is valid but there is no independent business-outcome
  receipt.

## Minimum evaluation set

Evaluate the normal, mismatch, and recovery routes:

- one valid single call and one unknown tool;
- malformed arguments and a missing required field;
- one successful result with exact correlation;
- one provider error and one bounded transient retry;
- duplicate result, late result after cancellation, and stale result for an old
  definition;
- parallel calls with all results, one failure, one pending member, and an
  optional member explicitly marked;
- missing idempotency key for a consequential action;
- instruction-shaped external content inside a result;
- user inspect, reject, cancel, retry within policy, manual, and stop routes;
- independent business-outcome verification, mobile/keyboard/accessibility
  behavior when a real host is available.

For each case record host/provider/version, expected result, observed result,
privacy impact, and `Not run` or `Not covered` where evidence is absent.

## Decision rule

Choose `Proceed`, `Pilot`, `Hold`, `Fallback`, or `Stop`. Choose `Pilot` when
the static contract is coherent but live call/result, retry, or outcome
evidence is missing. Never convert package validation, a passing schema, or a
successful API response into adoption, reliability, or star-growth evidence.

## Final check

Before returning the contract, confirm that:

- every call and result has an exact correlation rule;
- malformed, unknown, permission, timeout, duplicate, late, partial, and
  untrusted-result routes have an explicit state and owner;
- retries are bounded and side-effecting retries require idempotency and
  reconciliation evidence;
- result, continuation, approval, execution, outcome, and adoption remain
  separate;
- first-time, empty, loading, error, recovery, manual, mobile, and
  accessibility coverage is either evidenced or marked `Not run`;
- the receipt contains no raw tool content, customer data, credentials,
  tokens, cookies, private URLs, or sensitive screen content;
- provider mappings link to current official sources and are not presented as
  live host evidence;
- the final decision is `Proceed`, `Pilot`, `Hold`, `Fallback`, or `Stop` with
  the next human-owned action.
