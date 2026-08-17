# First run: calendar batch recovery review

This is a fictional fixture for reviewing a tool-call contract. No model,
calendar, provider, user account, booking, retry worker, or live host was
contacted. The names and IDs are synthetic. Runtime behavior, mobile behavior,
accessibility, adoption, and business outcome are `Not run`.

## Decision and user job

**Decision:** `Pilot / recruit` the contract after the host supplies a real,
sanitized call/result receipt. The static review is useful, but it does not
prove that the host correlates results or prevents duplicate bookings.

**User/job:** A PM wants an agent to find two available slots and draft a
meeting proposal for a customer. The PM owns the recipient, final time, and
send decision. The agent may read availability but may not create or send an
event in this first step.

**Workaround:** The current design forwards provider responses by array order
and retries the whole batch after any timeout. That can attach the wrong slot
to a call or repeat a side effect if the tool later succeeds.

**Success oracle:** Every requested call has a stable correlation ID; each
result is validated and visible by call; a partial batch cannot be called
complete; a retry is bounded and idempotent; a late or duplicate result cannot
resume newer work; and the PM sees the difference between availability data,
draft readiness, and a sent invitation.

## Call and result contract

| Field | Proposed contract | Evidence |
| --- | --- | --- |
| `run_id` | `renewal-calendar-review-2026-08-17` | fictional |
| `call_id` | `call_availability_a`, `call_availability_b` | fictional; exact ID required |
| Tool | `calendar.find_availability` | proposed read-only tool |
| Definition | `calendar.find_availability@2` | proposed version pin |
| Scope | one approved workspace and calendar set | not authenticated |
| Side effect | read-only lookup | product rule, not live permission |
| Arguments | date window, timezone, duration, attendee class | no raw attendee data |
| Result | availability intervals plus source/freshness metadata | schema proposed |
| Failure envelope | `error_class`, `retryable`, `safe_to_repeat`, redacted detail | proposed |
| Outcome oracle | PM review of a draft; provider confirmation only for a later send step | not run |

For an OpenAI Responses mapping, the host would preserve each provider
`call_id` in its matching `function_call_output`. For an Anthropic Messages
mapping, it would preserve each `tool_use_id` in a `tool_result` and follow the
provider's result ordering rules. These are documentation mappings, not host
evidence.

## Parallel and recovery review

| Call | First result | Recovery | Final state |
| --- | --- | --- | --- |
| `call_availability_a` | valid intervals | none | `result_validated` |
| `call_availability_b` | timeout | one read-only retry before deadline | `retry_guarded` |

The batch remains `partial_results_visible`. The PM may inspect the first
result, wait for the bounded retry, or continue manually. The host may not
draft a confident combined recommendation until the required second result is
accounted for.

If `call_availability_b` later arrives after cancellation, its result is
recorded as `late` and cannot resume a newer run. If the same result is
delivered twice, the second receipt is `duplicate` and must not trigger another
calendar action. No idempotency key is sufficient authority to send an event;
the later send step needs a separate approval and outcome contract.

## User controls and action boundary

| Control | Allowed result | Not authorized |
| --- | --- | --- |
| Inspect | show tool, scope, freshness, call status, and error class | raw provider payload |
| Retry | one bounded read-only retry under the same run and policy | whole-batch replay or side effect |
| Cancel | stop continuation and reject late resume | delete a provider event |
| Continue manually | use the visible source list outside the agent loop | automatic calendar access |
| Stop | close the review with a receipt | silently retry later |

The PM's choice to retry or continue is not approval to create, update, or
send a calendar event.

## Privacy-safe receipt

```yaml
package: pm-ai-tool-call-to-recovery
decision: Pilot / recruit
run_id: renewal-calendar-review-2026-08-17
provider: Not run
host: Fictional Calendar Host
calls_expected: 2
calls_accounted_for: 2
result_states:
  call_availability_a: result_validated
  call_availability_b: retry_guarded
retry_policy: one bounded read-only retry before the run deadline
idempotency: no side-effecting action in this step
trust: external result content remains untrusted data
outcome: draft review only; send outcome Not verified
raw_content_recorded: false
next_action: obtain one sanitized real host receipt covering timeout and late-result recovery
```

## Not covered

- no provider request, model output, tool execution, retry, cancellation, or
  duplicate delivery occurred;
- no real account, calendar, customer, recipient, timezone, or event was
  accessed;
- no mobile, keyboard, screen-reader, network partition, or tenant-isolation
  result is available;
- no booking, draft acceptance, invitation send, adoption, or star lift is
  established.
