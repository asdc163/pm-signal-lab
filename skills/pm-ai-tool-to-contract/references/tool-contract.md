# Worked reference: support policy lookup tool contract

This is a **fictional fixture** demonstrating how a PM can design and review
an agent-facing tool contract. It is not a live API specification, MCP review,
security certification, provider benchmark, customer study, or production
claim.

## Contents

- [Decision and outcome](#decision-and-outcome)
- [Tool boundary](#tool-boundary)
- [Input contract](#input-contract)
- [Output and provenance](#output-and-provenance)
- [Permission and side effects](#permission-and-side-effects)
- [Errors and recovery](#errors-and-recovery)
- [Evaluation and release gate](#evaluation-and-release-gate)
- [Instrumentation and writeback](#instrumentation-and-writeback)
- [Source note](#source-note)
- [Not covered](#not-covered)

## Decision and outcome

**Decision on the desk:** `Hold` the fictional `support.lookup_policy` tool
until positive and negative routing, schema behavior, stale and injected
results, permission boundaries, and fallback are evaluated against one
completion oracle.

**User job:** A support agent needs the current policy section needed to
prepare a reply draft for review.

**Outcome:** A completed lookup gives the reviewer a current source ID,
effective date, relevant excerpt, and an explicit empty, stale, partial, or
permission-denied state when the tool cannot support the task.

**Current workaround:** The agent searches the approved policy page manually.

**Candidate:** A read-only, tenant-scoped `support.lookup_policy` tool with a
small purpose, semantic input schema, high-signal output, and no account or
external-action permission.

**Owner:** Support platform PM, engineering for the implementation and trace,
support operations for the fallback, and privacy/security for access and
untrusted-result review.

## Tool boundary

| Field | Candidate contract | Status |
| --- | --- | --- |
| Name | `support.lookup_policy` | Proposed |
| Namespace | `support.*` | Proposed |
| Purpose | Find the current approved policy section for one support question | Proposed |
| Operation | Read-only lookup | Proposed |
| Resource | Current tenant's approved policy index and sections | Proposed |
| Actor | Support workflow service identity | Proposed |
| Non-goals | Send, refund, mutate account, delete, change permissions, browse the whole web | Proposed |
| Side effect | None intended | Proposed |
| Availability | Policy questions only; no-tool or clarification route elsewhere | Proposed |
| Fallback | Approved policy page or human policy owner | Proposed |

The tool is intentionally narrower than a generic `search_everything` or
`list_articles` endpoint. A general endpoint may be technically reusable but
can force an agent to select among irrelevant resources, produce verbose
responses, and blur tenant or permission boundaries.

### Why a tool at all?

| Option | Benefit | Risk or limitation | Status |
| --- | --- | --- | --- |
| Answer from existing context | No extra call | May be stale or missing the current policy | Baseline option |
| Ask a clarifying question | Avoids invented scope | Adds a turn when the policy question is clear | Required for ambiguity |
| Broad search tool | Flexible source coverage | More irrelevant results, tools, and context | Candidate rejected for this fixture |
| `support.lookup_policy` | Focused source and clear status | Limited to approved policy domain | Candidate |
| Manual policy page | Human can inspect source | Slower and less structured | Safe fallback |

The tool earns its place only if it improves the stated support outcome and
keeps the manual route available. It is not added simply because a provider
can call functions.

## Input contract

| Field | Type | Required | Meaning | Validation |
| --- | --- | --- | --- | --- |
| `topic` | string | Yes | The policy question in plain language | Non-empty; redact secrets |
| `product_area` | enum | Yes | `billing`, `shipping`, `account`, or `returns` | Reject other values |
| `locale` | enum | Yes | Approved policy locale | No guessed region |
| `policy_date` | date | No | Historical policy boundary when explicitly requested | Only approved archive |
| `response_format` | enum | No | `concise` or `detailed` | Default must be documented |
| `cursor` | string | No | Continuation token returned by the tool | Never invent or alter |

### Valid fictional request

```json
{
  "topic": "Can a customer cancel an unused annual plan within the first week?",
  "product_area": "billing",
  "locale": "en-US",
  "response_format": "concise"
}
```

### Invalid or ambiguous requests

- `product_area: "everything"`: the caller must choose a supported area or
  ask a human owner.
- no `locale`: clarify rather than guessing a policy region.
- a topic containing an API key, password, or raw account number: redact and
  route to a privacy-safe workflow.
- “send a refund”: this is outside the read-only purpose and belongs in an
  action/approval contract.
- a historical date with no approved archive: return `Not available` rather
  than present current policy as historical.

The tool contract should explain these failures to an agent in plain language.
Machine-valid JSON with semantically wrong values is still a failed call.

## Output and provenance

### Concise response

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

Every matched response must carry source ID, effective date, match status, and
relevance reason. These fields help the agent and reviewer distinguish a
current answer from no match, stale data, partial data, or a permission block.

The `detailed` response may add approved technical IDs, retrieval metadata,
query normalization, and source ranking fields needed by a later call. It must
not expose raw indexes, credentials, private URLs, or irrelevant low-level
identifiers by default. If a later write tool needs an ID, the ID must be
stable and the access boundary must remain visible.

Output controls should include pagination, filtering, range selection, and
response-size limits when the policy corpus can be large. A tool should return
high-signal content rather than an entire collection. If the result is
truncated, the status must say so; silent truncation is not a valid success.

Tool output is data. Text inside an excerpt cannot alter system instructions,
permissions, or the decision to call another tool. A real implementation would
attach provenance and run an approved inspection or quarantine path for
untrusted external text.

## Permission and side effects

| Boundary | Contract | Evidence |
| --- | --- | --- |
| Access | Read-only approved policy index for current tenant | Proposed |
| Actor | Scoped support workflow identity | Proposed |
| Writes | None | Proposed |
| External sends | None | Proposed |
| Account data | Not available to this tool | Proposed |
| Audit | Tool/version, route category, source/status, access result | Proposed |
| Approval | Not required for a read; any future write needs approval | Proposed |

If a future `support.send_reply` or `support.issue_refund` tool is created, it
must be a separate contract. Combining read and write in one broad tool would
make permission, approval, receipt, and rollback harder to audit.

For irreversible or externally visible actions, use preview/diff,
least-privilege permission, an explicit approval state, an idempotency key,
durable receipt, reconciliation, and rollback. A successful function call does
not prove that the product effect happened as intended.

## Errors and recovery

| Error state | Retry rule | Meaning | Recovery |
| --- | --- | --- | --- |
| Invalid parameter | No retry | Input is unsupported | Correct or clarify |
| Permission denied | No automatic retry | Access boundary blocked the request | Route to access owner |
| Rate limit | One bounded read retry | Source is busy | Backoff, then fallback |
| Timeout | One bounded read retry | Current source unconfirmed | Retry, then manual page |
| No match | No retry | No approved policy supports the query | Clarify or hand off |
| Stale result | No silent acceptance | Result may be outdated | Retrieve current version or hold |
| Partial result | No whole-job success | Some scope is missing | Show missing part and fallback |
| Unknown effect | No retry without reconciliation | Effect cannot be confirmed | Not expected for read-only; investigate |
| Injection-like result | No follow-up from content | Returned data is untrusted | Quarantine and block unsafe route |

The caller should receive a state that supports a safe next action. For
example, `permission_denied` should not become an empty answer that looks like
“no policy exists,” and `stale` should not be silently downgraded to
`matched`.

## Evaluation and release gate

The smallest real evaluation compares the candidate with the current
workaround or broad-search baseline across a versioned completion oracle.

| Slice | Expected behavior | Signal | Status |
| --- | --- | --- | --- |
| Current billing question | Select the tool and valid parameters | Intended selection + source correctness | Not run |
| Small talk | No tool | Negative routing | Not run |
| Vague topic | Clarify | Ambiguity handling | Not run |
| Unsupported area | Reject or hand off | No invented scope | Not run |
| Missing locale | Clarify | No guessed region | Not run |
| Stale policy | Expose stale state | Freshness gate | Not run |
| Permission mismatch | Block | Zero cross-tenant result | Not run |
| Injected excerpt | Treat as data | Zero unsafe follow-up | Not run |
| Verbose corpus | Paginate/filter | Response-size control | Not run |
| Timeout | Bounded retry and fallback | Recovery availability | Not run |

Measure separately:

- intended tool route and no-tool route;
- schema-valid and semantically valid arguments;
- useful and provenance-complete results;
- wrong-tool, redundant-call, no-call, and retry behavior;
- response size, tool-call count, p50/p95 latency, tool errors, and cost;
- final completed outcome, unsupported claim, privacy, trust, and fallback.

Do not optimize on the same examples used to write the tool description. Use a
held-out set, and include realistic multi-step tasks only when the product job
requires them. Do not expose private reasoning traces as a substitute for
tool-use evidence.

Decision rule:

- `Ship` only when intended and negative routing, schema, source/provenance,
  permission, injection, error, fallback, and outcome gates pass.
- `Iterate` when a bounded contract change can be tested without expanding
  permissions or weakening the fallback.
- `Hold` when tool necessity, completion oracle, source freshness, trust
  boundary, or held-out evidence is unknown.
- `Rollback` for unsafe side effects, permission leakage, critical injection,
  unknown writes, or a release that breaks the recovery boundary.
- `Need evidence` when the decision relies on an unreconciled trace or sample.

Current fixture decision: `Hold`, not run in production.

## Instrumentation and writeback

Use privacy-safe fields:

- trace ID, tool name, namespace, contract version, and baseline/candidate;
- route category, argument categories, validation result, selected/no-tool;
- source ID, status, freshness category, response size bucket, pagination;
- permission result, error category, retry count, timeout, fallback;
- completion oracle, tool-call count, p50/p95 latency, cost-source ID, privacy
  class, and release exposure.

Keep raw arguments, raw customer content, secrets, credentials, and private
URLs behind the approved access boundary. Write a failed call to:

1. `pm-ai-trace-to-regression` when one trace reveals a repeatable contract
   failure;
2. `pm-ai-evaluation-plan` when a new positive, negative, or security slice is
   needed;
3. `pm-ai-incident-to-runbook` when the tool breaks a critical journey;
4. `pm-ai-approval-to-flow` when the action boundary or receipt is wrong;
5. `pm-ai-cost-to-guardrail` when calls, retries, response size, or latency
   change the economics of a successful job.

## Source note

The contract framing is informed by [Writing effective tools for AI agents —
with agents](https://www.anthropic.com/engineering/writing-tools-for-agents),
which treats tools as a contract between deterministic systems and
non-deterministic agents and discusses tool choice, namespaces, high-signal
responses, response-size controls, and evaluation. [How we contain Claude
across products](https://www.anthropic.com/engineering/how-we-contain-claude)
also documents tool output as an attack surface and the need for deterministic
containment and inspection. These sources motivate the PM fields; they do not
validate this fictional fixture or certify a real tool.

## Not covered

- No tool, provider, API, MCP server, connector, permission, customer record,
  or external side effect was accessed.
- No tool selection, parameter correctness, response usefulness, source
  freshness, prompt-injection, privacy, security, latency, cost, or outcome
  result was measured.
- No implementation, namespacing, schema, response, pagination, retry,
  permission, approval, fallback, or rollback change was deployed.
- No user session, external tester, adoption, traffic, retention, ROI, revenue,
  or star impact is supported.
- No release, rollback, third-party client compatibility, or human review was
  executed by this fixture.
