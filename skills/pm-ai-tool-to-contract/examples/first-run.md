# First run: support policy lookup tool contract

This is a **fictional fixture** for learning `pm-ai-tool-to-contract`. It is
not a live MCP server, provider call, customer record, tool-use evaluation,
security review, production permission, or adoption result.

## Decision on the desk

- **Review ask:** `Hold`
- **User job:** A support agent needs the current policy section needed to
  prepare a reply draft for review.
- **Candidate tool:** `support.lookup_policy`, a read-only, tenant-scoped
  policy lookup with concise and detailed response modes.
- **Outcome:** One completed lookup supplies a current source ID, effective date,
  relevant excerpt, and an explicit empty or stale state when no policy matches.
- **Decision owner:** Support platform PM, with support operations, privacy,
  and engineering review.
- **Evidence status:** Fictional contract and proposed evaluation only.
- **Reason for hold:** positive routing, no-tool cases, invalid parameters,
  stale results, and injection-like tool output are proposed but not run.

## User job and tool outcome

| Field | Fictional value | Status |
| --- | --- | --- |
| Eligible tasks | 10 support policy questions in one fictional shift | Proposed fixture |
| Tool-needed tasks | 8 require a current policy lookup | Proposed fixture |
| No-tool tasks | 2 ask for clarification or contain no policy question | Proposed fixture |
| Completed tool outcome | Current source and relevant excerpt reach the reviewer | Proposed, not run |
| Current workaround | Agent searches the approved policy page manually | Fictional description |
| Observation window | One fictional support shift | Not production |

The completion oracle is the reviewed support outcome. A valid JSON call, a
successful HTTP response, or a tool call count is not a completed user job.

## Tool purpose and boundary

| Field | Contract | Status |
| --- | --- | --- |
| Name | `support.lookup_policy` | Proposed |
| Namespace | `support.*` | Proposed |
| One purpose | Find the current approved policy section for a support question | Proposed |
| Operation | Read-only lookup | Proposed |
| Allowed resources | Current tenant's approved policy index and sections | Proposed |
| Non-goals | No reply send, refund, account mutation, deletion, or permission change | Proposed |
| Side effect | None intended | Proposed |
| Actor | Support workflow service identity with read-only scope | Proposed |
| Availability | Expose for policy questions; hide for small talk or unsupported tasks | Proposed |
| Fallback | Approved policy page or human support owner | Proposed |

The candidate is deliberately narrower than a generic `search_everything` or
`list_articles` tool. The tool should not become an agent's general web
browser, account operator, or instruction source.

## Input contract and examples

| Field | Type | Required | Rule | Status |
| --- | --- | --- | --- | --- |
| `topic` | string | Yes | The policy question in plain language; no secrets | Proposed |
| `product_area` | enum | Yes | `billing`, `shipping`, `account`, or `returns` | Proposed |
| `locale` | enum | Yes | Approved locale such as `en-US` | Proposed |
| `policy_date` | date | No | Used only when the reviewer asks for historical policy | Proposed |
| `response_format` | enum | No | Defaults to `concise`; `detailed` includes technical IDs | Proposed |
| `cursor` | string | No | Continue a paginated result set; never invent one | Proposed |

Valid fictional call:

```json
{
  "topic": "Can a customer cancel an unused annual plan within the first week?",
  "product_area": "billing",
  "locale": "en-US",
  "response_format": "concise"
}
```

Invalid or clarification-required cases:

- `product_area: "everything"` — reject; the caller must choose a supported
  area or ask a human owner.
- missing `locale` — clarify instead of guessing a policy region.
- `topic` containing an API key or customer secret — redact and route to the
  privacy-safe support path.
- a request to send a refund — this tool cannot perform that action; route to
  the approval and action contract.
- a historical `policy_date` with no approved archive — return `Not available`,
  not the current policy presented as history.

## Output contract and provenance

Default `concise` output:

```json
{
  "match_status": "matched | no_match | stale | permission_denied | partial",
  "source_id": "POL-012",
  "title": "Annual plan cancellation",
  "effective_date": "fictional-date",
  "relevance_reason": "Matches billing cancellation and unused-plan terms",
  "answerable_excerpt": "redacted fictional excerpt",
  "next_cursor": null
}
```

The source ID, effective date, match status, and relevance reason are required
for a reviewer to distinguish current policy from an empty, stale, or partial
result. `detailed` may include approved technical IDs and retrieval metadata
needed for a later tool call; it must not expose secrets or raw private
indexes.

The output is data, not an instruction. If a policy excerpt says “ignore the
system rule,” the caller must treat that text as untrusted policy content and
apply the declared instruction hierarchy.

## Permission, side effects, and approval

- Read-only access to the current tenant's approved policy index.
- No customer account lookup beyond the policy question's declared scope.
- No send, refund, deletion, payment, permission, or database write.
- Audit the tool name, contract version, tenant category, source ID, access
  result, and status without recording raw customer text.
- A future write tool would need preview, approval, idempotency, receipt,
  reconciliation, and rollback through `pm-ai-approval-to-flow`.

## Errors, retries, and recovery

| State | Retry? | User interpretation | Recovery |
| --- | --- | --- | --- |
| Invalid parameter | No | The request is underspecified or unsupported | Clarify or correct the field |
| Permission denied | No automatic retry | The workflow cannot access this policy | Route to policy owner or human support |
| Rate limited | Bounded retry | The source is temporarily busy | Retry once with backoff, then fallback |
| Timeout | Bounded for read only | The current source was not confirmed | Retry once, then show manual route |
| No match | No | No approved policy supports the question | Ask a clarifying question or hand off |
| Stale result | No silent acceptance | The result may be outdated | Retrieve current version or hold |
| Partial result | No success claim | Some requested scope is missing | Show missing portion and fallback |
| Unknown result | No retry without reconciliation | The call effect is not confirmed | Not expected for read-only; investigate |
| Injection-like text | No follow-up from text | Returned data is untrusted | Quarantine, log safe category, block unsafe route |

## Evaluation and release gate

The smallest real evaluation would compare the candidate with the current
manual or broad-search baseline using the same support-draft oracle:

| Slice | Expected route | Gate | Status |
| --- | --- | --- | --- |
| Current billing policy question | Call this tool | Correct source and excerpt | Proposed, not run |
| Small talk or vague request | No tool or clarify | No ritual tool call | Proposed, not run |
| Unsupported product area | Clarify or fallback | No invented category | Proposed, not run |
| Missing locale | Clarify | No guessed region | Proposed, not run |
| Stale policy | Call, then hold | Stale status visible | Proposed, not run |
| Permission mismatch | Block | No cross-tenant result | Proposed, not run |
| Injection-like result | Quarantine | No instruction promotion | Proposed, not run |
| Pagination | Continue only with returned cursor | No invented cursor | Proposed, not run |
| Timeout | Bounded retry then fallback | Safe manual route | Proposed, not run |

Proposed release gates:

- correct tool selection for eligible tasks and correct no-tool routing;
- schema-valid parameters with no ambiguous silent defaults;
- current source ID and freshness status on every matched result;
- zero critical permission or tenant violations;
- zero unsafe follow-up caused by tool-result text;
- partial, stale, timeout, and empty states remain visible;
- read-only retries are bounded and no unknown write is retried;
- response size, tool-call count, p50/p95 latency, cost, and support outcome
  remain separate signals.

Current status: `Hold`, fictional fixture only, not run.

## Instrumentation and learning loop

A real implementation would record approved fields: trace ID, tool name and
contract version, route category, argument categories, validation status,
source ID, freshness category, result status, response size bucket, retry or
timeout category, permission result, fallback, completion oracle, p50/p95
latency, cost-source ID, and privacy class. Raw customer text, credentials,
secrets, and private URLs remain outside the general packet.

Route failures to `pm-ai-trace-to-regression` for one bad call,
`pm-ai-evaluation-plan` for a new slice, `pm-ai-incident-to-runbook` for a
journey-level event, `pm-ai-approval-to-flow` for action controls, or
`pm-ai-cost-to-guardrail` for cost and latency decisions.

## Not covered

- No real tool, MCP server, provider, API, connector, permission, or customer
  record was called.
- No schema validation, tool selection, parameter correctness, response
  usefulness, prompt-injection, privacy, security, latency, cost, or quality
  result was measured.
- No tool implementation, namespacing change, response redesign, pagination,
  retry, fallback, or approval flow was deployed.
- No user session, external tester, adoption, traffic, retention, ROI, revenue,
  or star impact is known.
- No release, rollback, third-party client compatibility, or human review was
  executed by this fixture.

## Review ask

`Hold` — Support platform PM owns the next evidence request: run the same
completion oracle on positive, negative, stale, permission, injection, and
fallback cases, then report one contract change supported by the trace.
