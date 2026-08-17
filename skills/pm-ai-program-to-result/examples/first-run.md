# First run: support-volume program review

This is a fictional fixture for reviewing a programmatic tool-calling route.
No model-generated code, hosted runtime, child tool, support workspace,
customer record, or live provider was contacted. IDs and data are synthetic.
Runtime safety, output quality, citations, mobile behavior, adoption, and
business outcome are `Not run`.

## Decision and user job

**Decision:** `Pilot / recruit` a bounded program for a read-only weekly
support-risk brief. Keep final synthesis and source-note validation on a
direct route after the program returns its aggregate.

**User/job:** A PM wants counts and grouped themes from approved ticket and
product-signal sources. The program may filter, join, deduplicate, and
aggregate records. The PM owns interpretation, any customer communication,
and the final decision.

**Workaround:** The current agent asks the model to call every source directly,
then treats a compact count as the final answer. It is expensive to repeat and
can omit the source note or hide a missing child result.

**Success oracle:** The route names a bounded read-only program, allowlists two
child tools, preserves parent/program/child identity, accounts for each child
result, validates the aggregate, then waits for a direct final message that
includes source IDs, freshness, limits, and `Not covered`. No write or message
send is authorized.

## Route and caller contract

| Field | Contract | Evidence |
| --- | --- | --- |
| User job | weekly support-risk brief | fictional |
| Parent run | `brief-run-2026-08-17-01` | fictional |
| Program | `support.aggregate@1` | fictional bounded route |
| Program call | `call_prog_support_01` | fictional opaque ID |
| Caller | `program:call_prog_support_01` | must be preserved on child output |
| Workspace | `support-west-1` | fictional approved scope |
| Eligible child tools | `ticket.search.read`, `signal.list.read` | read-only allowlist |
| Denied child tools | `customer.message.send`, `billing.refund` | approval-sensitive writes |
| Budget | two child calls, 30 seconds, one retry for read-only timeout | proposed, not enforced |
| Final boundary | direct message with source note and caveat | not run |

The program route is selected because the intermediate operations are
predictable filtering, joining, and aggregation. A final answer that needs
fresh judgment or citations remains direct. The route does not grant
permission just because a tool is available to the host.

## Child results and output contract

| Child | First result | State | Recovery |
| --- | --- | --- | --- |
| `ticket.search.read` / `child_ticket_01` | 42 sanitized records | accounted | none |
| `signal.list.read` / `child_signal_01` | timeout | recovery | one bounded read-only retry |

The program output is `partial` until the second child is accounted for. If
the retry returns, the program may produce a structured aggregate with counts,
group keys, source classes, freshness, and missing-data flags. It still does
not prove that the PM received a final answer.

If a child result arrives without the original `caller`, the host enters
`blocked` and does not attach it to another program. If the program returns a
valid aggregate but no final message, the state is `final_message_pending`, not
`completed`. If the final message lacks its source note, the state is
`incomplete` and the PM can continue direct validation or go manual.

## User controls and action boundary

| Control | Allowed result | Not authorized |
| --- | --- | --- |
| Inspect | view route, tool allowlist, states, budget, source classes | generated code or raw records |
| Continue | let the bounded program process approved read-only results | add a tool or widen tenant |
| Retry | one read-only child retry under the same policy | replay a write or whole job blindly |
| Direct validation | review final message, sources, caveats, and missing data | approve customer outreach |
| Manual | finish the brief outside program execution | automatic export or CRM update |
| Cancel/stop | close the run and reject late continuation | silent resume |

## Privacy-safe receipt

```yaml
package: pm-ai-program-to-result
decision: Pilot / recruit
program: support.aggregate@1
program_call_id: call_prog_support_01
caller: program:call_prog_support_01
workspace: approved support-west-1 scope
eligible_child_tools: 2
child_results_accounted: 1 of 2
program_state: recovery
retry_policy: one bounded read-only retry
program_output: Not run
final_message: Not run
citation_validation: Not run
authorization: no write or send authority granted
outcome: Not verified
raw_code_recorded: false
raw_tool_content_recorded: false
next_action: obtain one sanitized host note covering child retry and missing final-message recovery
```

## Not covered

- no model-generated program, hosted runtime, child function, retry, timeout,
  cancellation, output, final message, citation, or business outcome occurred;
- no real workspace, customer content, tool permission, token, credential,
  generated code, or provider request was accessed;
- no mobile, keyboard, screen-reader, network partition, or tenant-isolation
  behavior was exercised;
- no task success, cost, latency, adoption, natural traffic, or star lift is
  established.
