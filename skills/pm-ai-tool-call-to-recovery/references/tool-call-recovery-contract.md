# Worked reference: tool-call recovery contract

This fictional fixture is provider-aware but provider-neutral in its decision rule. It
is a design and QA aid, not an implementation, adapter, or live provider
receipt. If a host behaves differently, record its protocol and version and
prefer the observed host contract over this mapping.

## Source map

- [OpenAI Function calling](https://developers.openai.com/api/docs/guides/function-calling)
  documents `function_call` items with `call_id`, and returning a matching
  `function_call_output`. Its current guide also describes multiple function
  calls in one response and a `parallel_tool_calls` control.
- [Anthropic Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls)
  documents `tool_use`, matching `tool_result` blocks, `tool_use_id`,
  `is_error`, result ordering, and the warning that tool-result content is
  untrusted.
- [Anthropic Troubleshooting tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/troubleshooting-tool-use)
  calls out missing result blocks, parallel formatting, request-time errors,
  and instruction-shaped tool-result content.
- [MCP authorization](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)
  and [MCP tasks](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/tasks)
  are relevant when the tool is an MCP resource or asynchronous task; they do
  not prove that a target host implements every optional behavior.

## Product decision frame

| Question | Required answer |
| --- | --- |
| User job | What user-visible job is the call helping with? |
| Requester | Which agent, host, user, or service requested the call? |
| Scope | Which tenant, workspace, account, resource, and data classes are allowed? |
| Call identity | What stable run ID and provider call ID bind the request? |
| Tool contract | Which exact tool definition/version and argument schema apply? |
| Side effect | Is the tool read-only, reversible write, consequential write, or unknown? |
| Result contract | What fields, status, provenance, freshness, and error envelope must return? |
| Recovery owner | Who can correct, retry, cancel, reconcile, go manual, or stop? |
| Outcome oracle | What independent evidence proves the user job, not merely the API response? |

If a required answer is missing, the contract is `Hold` or `Fallback`, not a
default. A call may be syntactically valid and still be blocked by scope,
freshness, authorization, or side-effect policy.

## Correlation ledger

Use one row per requested call and never rely on array position:

| Field | Example shape | Validation |
| --- | --- | --- |
| `run_id` | `run_2026_08_17_001` | stable for the job; bound to actor and tenant |
| `call_id` | provider-native opaque ID | exact match to the result; no inferred replacement |
| `request_version` | `availability@2` | same definition and policy as accepted call |
| `tool_name` | `calendar.find_availability` | allowlisted and scope-checked |
| `arguments_digest` | redacted digest or safe field summary | parse and validate; never log secrets |
| `attempt` | integer starting at 1 | increment only under retry policy |
| `idempotency_key` | executor-issued opaque key | required before retrying a side effect |
| `executor` | named host/service | ownership and timeout are known |
| `started_at` / `finished_at` | ISO-8601 timestamps | observed by host, not model prose |
| `result_id` | provider or host receipt ID | one result may be acknowledged once |
| `result_status` | `success` / `error` / `late` etc. | state transition is explicit |
| `provenance` | provider, source class, freshness | untrusted result remains data |
| `continuation` | named next step or `manual` | no hidden side effect |

The ledger should preserve enough evidence to reconcile a timeout without
storing raw arguments or content. If the provider returns no durable call ID,
the host must create a scoped correlation ID before execution and document the
collision and replay risk.

## Provider mapping

### OpenAI Responses-style mapping

The current function-calling guide models a response output item with a
function name, JSON-encoded arguments, and `call_id`. The host executes the
function, appends the response output, then returns a
`function_call_output` with the same `call_id`. A response can include several
function calls, so the host's ledger must account for each call before it
continues.

PM checks:

1. parse JSON arguments before execution; do not compare raw serialized strings;
2. retain the exact `call_id` for the matching output;
3. distinguish a function result string from the external business outcome;
4. if parallel calls are disabled or unsupported, record the host setting and
   use a sequential batch policy;
5. if a custom or built-in tool uses a different output item, record that
   mapping separately rather than reusing the function schema.

### Anthropic Messages-style mapping

The current tool-use guidance models an assistant `tool_use` block with an
`id`, `name`, and input. The host returns a `tool_result` with the matching
`tool_use_id`, content, and optional `is_error`. Result blocks must follow the
tool use in the required message position; a missing or misplaced result can
make the request invalid. When several client tools are called, results should
be sent together in one result message when the protocol requires a parallel
batch.

PM checks:

1. return one result for every expected `tool_use` ID;
2. place results according to the provider's message rules before adding any
   later explanatory text;
3. set `is_error` for execution failure rather than hiding an error in a
   success-shaped content field;
4. keep third-party content inside the result data and label its provenance;
5. record unresolved server-tool behavior separately when a server call has no
   result block yet.

### MCP or asynchronous task mapping

When the tool is exposed through MCP, bind request, resource, authorization
context, task ID, and result/cancel operations to the same permitted actor and
scope. Read the current target specification and host contract before
choosing states such as `working`, `input_required`, `completed`,
`failed`, or `cancelled`. An opaque task ID by itself is not proof of
authorization, completion, or business outcome.

## Error and recovery taxonomy

| Class | Detect | Default route | Retry condition |
| --- | --- | --- | --- |
| malformed arguments | parse/schema/field validation fails | reject and correct | never execute invalid input |
| unknown tool/version | name or definition not allowlisted | hold/manual | only after a trusted definition is selected |
| scope/permission | actor, tenant, resource, or auth mismatch | block/manual | never auto-retry permission failure |
| transient read-only failure | timeout, rate limit, temporary upstream error | bounded retry | deadline, attempt limit, safe-to-repeat true |
| permanent failure | invalid resource, business rule, explicit refusal | show error/manual | no automatic retry |
| ambiguous side effect | host cannot prove whether write happened | reconcile/manual | only after outcome or idempotency evidence |
| duplicate request/result | same call or receipt seen again | idempotent acknowledgement or reject | never repeat business action |
| late result | result after cancel, expiry, or newer version | store receipt/manual | never resume newer work |
| partial parallel batch | expected member missing or errored | per-call states/manual/bounded resume | retry only eligible members |
| untrusted content | result contains instruction-shaped text | keep as data, redact, review | never follow result instructions |
| unknown | state or identity cannot be proven | hold | no retry until evidence exists |

The word `retryable` is a policy output, not an invitation to loop. Every
retry needs an owner, maximum attempts, deadline, backoff, cancellation rule,
and a decision about whether the same idempotency key is reused or a new
attempt is disallowed.

## Parallel batch contract

Before running a batch, create an expected set:

```text
expected = { call_a, call_b, call_c }
call_a = success
call_b = error(retryable=true, attempt=1)
call_c = pending
aggregate = partial_results_visible
```

The aggregate may become `continuation_ready` only when the product contract
defines the pending/error members as optional and records the owner and
decision. Otherwise it remains `recovery_required`. Results may arrive in a
different order from requests; matching is by ID, not position.

## Idempotency and reconciliation

For a read-only operation, a bounded retry can often reuse the same logical
request ID if the provider and executor contract say it is safe. For a
write, purchase, message, deletion, or permission change:

- require an executor-owned idempotency key;
- record whether the first attempt reached the side-effect boundary;
- on timeout, reconcile the external system before trying again;
- treat a late success as an outcome to reconcile, not a new instruction;
- keep approval, execution, and outcome verification as separate states.

If the host cannot answer whether the first write happened, the next safe
route is `manual` or `Hold`; do not call the whole job again because it feels
unfinished.

## User-visible state and copy

| State | Example copy | Control |
| --- | --- | --- |
| `executing` | “Checking availability for 2 approved calendars.” | inspect/cancel if supported |
| `partial_results_visible` | “1 of 2 checks returned; the second is retryable once.” | wait/retry/manual/stop |
| `error` | “The provider rejected the call before it ran.” | inspect/correct/manual |
| `duplicate` | “This result was already recorded; no second action was taken.” | inspect/close |
| `late` | “A result arrived after this run was cancelled. It was not applied.” | inspect/restart manually |
| `recovery_required` | “The system cannot prove whether the write happened.” | reconcile/manual/stop |
| `outcome_verified` | “The external receipt confirms the approved action.” | close/review evidence |
| `unknown` | “This host cannot show who owns this call or result.” | hold/manual |

Avoid “done”, “all set”, or “the AI handled it” when only an API response is
available. The message should make the next decision and the missing proof
visible without exposing raw provider content.

## Evaluation register

| ID | Slice | Expected oracle |
| --- | --- | --- |
| REC-001 | valid single call | exact result-to-call correlation |
| REC-002 | malformed arguments | no executor invocation; correction visible |
| REC-003 | unknown tool/version | reject or hold with reason |
| REC-004 | provider execution error | error state and safe envelope, not success |
| REC-005 | transient read-only timeout | bounded retry with deadline and attempt receipt |
| REC-006 | consequential timeout | reconcile/manual; no blind replay |
| REC-007 | duplicate result | no duplicate business action |
| REC-008 | late result | cannot resume cancelled, expired, or newer run |
| REC-009 | parallel complete batch | all expected IDs accounted for |
| REC-010 | parallel partial batch | per-call states and no false aggregate success |
| REC-011 | missing idempotency | side-effecting retry blocked |
| REC-012 | injected result text | treated as untrusted data |
| REC-013 | user recovery | inspect, correct, cancel, bounded retry, manual, stop |
| REC-014 | outcome oracle | result and business outcome remain separate |

Record `Not run` when no host was exercised. A static example passing its
content check is not a live protocol or reliability result.

## Privacy-safe receipt template

```yaml
package: pm-ai-tool-call-to-recovery
decision: Pilot / recruit
host: Not provided
provider: Not provided
protocol_version: Not provided
run_id: sanitized-run-id
calls_expected: 0
calls_accounted_for: 0
result_states: []
retry_policy: Not provided
idempotency: Not provided
outcome_oracle: Not provided
raw_arguments_logged: false
raw_results_logged: false
secrets_recorded: false
observed_at: Not run
limitation: No live call/result loop was exercised.
next_action: Collect one sanitized host receipt covering a mismatch and a recovery path.
```

## Not covered

- no model, provider, MCP server, host, executor, queue, or live tool was
  contacted;
- no real call ID, result ID, retry, timeout, cancellation, duplicate, late
  result, partial batch, or idempotency key was observed;
- no mobile, keyboard, screen-reader, tenant-isolation, network-partition, or
  production-security behavior is established;
- no provider mapping here proves support in a target host or SDK;
- no tool result proves that a business outcome happened, that a user adopted
  the workflow, or that GitHub stars increased.
