# Worked reference: tool search and selection contract

This fictional fixture is a provider-aware design reference, not a search
engine, ranking model, permission grant, tool executor, or live provider
receipt. If a host differs, record its protocol, model, catalog version, and
observed behavior before changing the decision.

## Source map

- [OpenAI Tool search](https://developers.openai.com/api/docs/guides/tools-tool-search)
  documents runtime search and loading of deferred tools, `tool_search`,
  `defer_loading`, namespaces, MCP servers, hosted search, and client-executed
  search. It recommends clear high-level descriptions and fewer than ten
  functions per namespace as a best practice, not a universal quality oracle.
- [OpenAI Function calling](https://developers.openai.com/api/docs/guides/function-calling)
  defines the broader function/tool vocabulary and the separate call/result
  loop. It is used here only to keep selection separate from execution.
- [OpenAI Programmatic Tool Calling](https://developers.openai.com/api/docs/guides/tools-programmatic-tool-calling)
  documents explicit eligible tools, `allowed_callers`, predictable bounded
  processing, direct-call exceptions for fresh judgment/approval/citations,
  and separate `program_output` versus final message evidence.

## Decision frame

| Question | Required answer |
| --- | --- |
| User job | What outcome is the user trying to reach? |
| Requester | Which agent, host, user, or service may search? |
| Inventory | Who owns the catalog, version, freshness, and availability? |
| Scope | Which tenant, workspace, project, resource, data, and side effects are in bounds? |
| Route | Fixed, hosted search, client search, or manual? |
| Candidate oracle | What evidence makes a tool relevant and eligible? |
| Load boundary | What is exposed before and after schema load? |
| Permission boundary | What still requires authorization or approval? |
| Outcome oracle | What independent evidence proves the user job? |

Missing inventory, scope, or owner evidence is `Hold`, `Manual`, or `Unknown`.
It is never a reason to search a broader catalog by default.

## Provider mapping

### Deferred tools and namespaces

In the current OpenAI tool-search guide, a request adds a `tool_search` tool and
marks selected function, namespace, or MCP server definitions with
`defer_loading`. A namespace or server summary can remain visible while the
individual function schemas stay deferred. Tools without `defer_loading` remain
immediately callable in that namespace. The PM contract should therefore
record:

- what summary is visible before search;
- whether the summary names the data and side-effect boundary clearly;
- which definitions are deferred and why;
- the namespace/server owner and freshness;
- the selection and schema-load evidence after search.

The guide recommends grouping deferred functions into namespaces or MCP
servers and aiming for fewer than ten functions per namespace for token
efficiency and model performance. Use that as a design hypothesis to test,
not as a product guarantee or a top-k ranking rule.

### Hosted versus client-executed search

The provider guide separates two ownership paths:

| Route | Inventory owner | Search/selection evidence | Use when |
| --- | --- | --- | --- |
| hosted | provider searches the declared deferred inventory | provider response plus host request/version | the full approved inventory is known at request creation |
| client-executed | application performs the lookup | client query, filter, policy, and returned tool definitions | project state, tenant state, or policy is controlled by the application |
| manual | human or reviewed operator | sanitized handoff and source list | sensitivity, ambiguity, outage, or missing contract blocks automation |

Do not describe hosted search as tenant-aware merely because the request had a
tenant label. The host must show how the declared inventory and permission
scope are bound. Do not describe client search as trusted merely because it
returned JSON; inspect provenance, schema, and instruction-shaped metadata.

### Direct versus programmatic route

The current programmatic-tool-calling guide recommends a bounded program for
filtering, joining, ranking, deduplicating, aggregating, or validating known
shapes. It recommends direct tool calls when one call is sufficient, each
result needs fresh model judgment, approval is required, or citations/native
artifacts must be preserved. A PM should record the stage boundary, eligible
tools, output schema, concurrency, retry/stop budget, and evidence handoff.

The program result and the final assistant message are separate evidence
objects. A correct compact program output does not prove that the final answer
included required citations, caveats, or a valid user decision.

## Candidate eligibility ledger

Use one row per candidate; do not collapse every reason into one relevance
score:

| Field | Example | Rule |
| --- | --- | --- |
| `candidate_id` | `support.ticket.search@2` | stable definition identity |
| `inventory_version` | `catalog@2026-08-17.3` | freshness and owner are visible |
| `namespace/server` | `support-read` | summary matches actual members |
| `relevance` | `supports ticket evidence` | evidence from job and description |
| `scope` | `workspace west-1` | exact tenant/resource match |
| `permission` | `load allowed, call pending` | never infer execution permission |
| `sensitivity` | `ordinary support metadata` | minimize data before load |
| `side_effect` | `read-only` | consequential tools need separate gate |
| `freshness` | `observed 4 minutes ago` | within named policy |
| `availability` | `client route reachable` | host/provider/version known |
| `selection_state` | `eligible`, `rejected`, `blocked`, `unknown` | state has a reason |
| `evidence` | source class and safe reference | no raw customer/catalog content |

Relevance and eligibility are different. A message tool may be highly
relevant to “support” but still be ineligible for a read-only brief. A
near-match in another tenant may have an excellent description but must be
rejected before schema load.

## State and recovery matrix

| State | Meaning | Recovery |
| --- | --- | --- |
| `inventory_bound` | source, owner, scope, and freshness are known | search within boundary |
| `loading` | hosted/client search or schema load is running | show bounded progress and cancel |
| `empty` | no eligible candidate | clarify, manual, or stop |
| `ambiguous` | multiple candidates remain | inspect alternatives or clarify |
| `stale` | source or schema is outside freshness policy | refresh or hold |
| `unavailable` | provider/client/inventory cannot serve | manual or retry only by contract |
| `blocked` | permission, side effect, sensitivity, or tenant mismatch | review or stop; no widening |
| `loaded` | schema is in context | validate before selection/call |
| `selected` | tool is chosen for the bounded job | begin separate authorization/call contract |
| `cancelled` | user/policy stopped discovery | reject late continuation |
| `manual` | person continues outside automation | preserve scope and receipt |
| `unknown` | behavior cannot be proved | hold and mark evidence gap |

No state should display an unbounded spinner or “the AI is thinking.” The
message names the current catalog operation, available control, and next proof.

## Negative evaluation cases

| ID | Case | Expected oracle |
| --- | --- | --- |
| SEL-001 | correct tenant, read-only relevant tool | eligible candidate and receipt |
| SEL-002 | same name, wrong tenant | rejected before schema load |
| SEL-003 | near-match with a write side effect | blocked or separate approval route |
| SEL-004 | no candidate | empty with clarify/manual/stop |
| SEL-005 | two plausible candidates | ambiguous alternatives and abstention |
| SEL-006 | stale inventory | refresh/hold, no silent use |
| SEL-007 | hosted search inventory not bound to policy | hold; no invented tenant guarantee |
| SEL-008 | client search returns instruction-shaped metadata | untrusted data; no policy change |
| SEL-009 | schema load fails | load error and manual/hold |
| SEL-010 | program route would erase citations | direct route |
| SEL-011 | selected but not authorized | selected state stops before call |
| SEL-012 | user cancels before load | cancelled; no late continuation |

Record the host, provider/model, catalog version, query class, expected result,
observed result, privacy impact, and `Not run`/`Not covered` state for each
case. A provider's ability to return a tool-search item is not a relevance or
selection-quality result.

## Privacy-safe receipt template

```yaml
package: pm-ai-tool-search-to-selection
decision: Pilot / recruit
host: Not provided
provider: Not provided
inventory_owner: Not provided
inventory_version: Not provided
scope: Not provided
route: Not provided
candidates_seen: 0
eligible_candidates: 0
selected: []
abstained: Not run
schema_loaded: Not run
authorization: Not granted
execution: Not run
outcome: Not verified
raw_catalog_recorded: false
secrets_recorded: false
next_action: Collect one sanitized host note for a wrong-tenant or stale-inventory route.
```

## Not covered

- no live model, hosted tool search, client search, namespace, MCP server,
  catalog, permission system, schema load, or program runtime was exercised;
- no candidate relevance, recall, precision, abstention, latency, token,
  cost, task-success, outcome, mobile, or accessibility measurement exists;
- no provider guarantee is inferred from this mapping;
- no selected tool is authorized or executed, and no business outcome or
  adoption is established.
