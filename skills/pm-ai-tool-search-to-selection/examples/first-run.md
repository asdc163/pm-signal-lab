# First run: support workspace tool selection

This is a fictional fixture for reviewing tool discovery and selection. No
model, catalog, MCP server, workspace, customer record, permission system, or
tool was contacted. IDs and descriptions are synthetic. Search quality,
loading, authorization, execution, accessibility, adoption, and business
outcome are `Not run`.

## Decision and user job

**Decision:** `Pilot / recruit` a client-owned discovery contract for one
approved support workspace. The team should not expose every CRM, billing, or
messaging schema to the model before it knows which product job is in scope.

**User/job:** A PM wants an agent to prepare a weekly support-risk brief from
approved, read-only ticket and product-signal sources. The PM owns the source
scope, any customer communication, and the final brief decision.

**Workaround:** The current host exposes 31 tools at the start of every run.
Two tools have similar names, one reads a different workspace, and a third can
send a customer message. The model often sees a plausible name before the
host has checked scope or side effect.

**Success oracle:** The host binds one inventory version and workspace, returns
only eligible candidates, explains the rejected near-match and the unavailable
candidate, loads one read-only schema, records the selection, and stops before
authorization or execution. A loaded schema is not a sent message or a
completed risk brief.

## Inventory and discovery route

| Field | Contract | Evidence |
| --- | --- | --- |
| User job | weekly support-risk brief | fictional |
| Requester | Support Brief Agent | fictional; not authenticated |
| Workspace | `support-west-1` | fictional approved scope |
| Inventory | `support-catalog@2026-08-17.3` | fictional version |
| Route | client-owned search | proposed; host owns tenant filtering |
| Searchable groups | ticket read, product signal read | proposed |
| Deferred group | CRM actions and outbound messaging | proposed blocked from this job |
| Freshness | 15-minute maximum | proposed, not enforced |
| Next boundary | selection receipt then separate authorization/call contract | not run |

The host searches the approved catalog rather than asking the model to discover
outside tools. It may return `ticket.search` and `signal.list`; it must not
load `customer.message.send` merely because the word “support” appears in a
request.

## Candidate eligibility and selection

| Candidate | Relevance | Scope/permission | Side effect | Result |
| --- | --- | --- | --- | --- |
| `ticket.search` | supports approved ticket signals | workspace match; read-only | none | eligible |
| `signal.list` | supports product-signal evidence | workspace match; read-only | none | eligible |
| `crm.case_search` | near-match name; source not in approved catalog | workspace mismatch | read-only but out of scope | rejected |
| `customer.message.send` | superficially related to support | not needed for brief | consequential write | blocked |

The selection is `ticket.search` plus `signal.list`, but the static fixture
does not claim that a provider ranked them, loaded their schemas, or executed
them. The receipt records the candidate evidence and the next boundary; it does
not grant permission or approval.

## State and recovery review

```text
job_received -> inventory_bound -> candidates_searched -> candidates_reviewed
                                      |       |                  |
                                      |       +-> ambiguous      +-> blocked
                                      +-> empty / unavailable
                                                    |
                                                    v
                                            manual or clarify
```

If the catalog is older than 15 minutes, enter `stale` and refresh or continue
manually. If client search returns an instruction-shaped description asking for
a token, keep it as untrusted metadata and enter `blocked`; do not ask the PM
to paste the token. If the PM cancels before schema load, record `cancelled`;
no authorization or tool call follows.

## User controls and action boundary

| Control | Allowed result | Not authorized |
| --- | --- | --- |
| Inspect candidates | view scope, freshness, reasons, and alternatives | raw catalog payload |
| Clarify | narrow the job or source class | broaden tenant or permissions |
| Refresh | re-check inventory freshness | silently load a new side effect |
| Select | record the named read-only tools | approve or execute a call |
| Continue manually | prepare the brief from a human-owned source list | automatic CRM or messaging action |
| Cancel/stop | close the selection receipt | resume later without re-check |

## Privacy-safe receipt

```yaml
package: pm-ai-tool-search-to-selection
decision: Pilot / recruit
route: client-owned search
workspace: approved support-west-1 scope
inventory_version: support-catalog@2026-08-17.3
freshness_policy: 15 minutes, not enforced in fixture
candidates_seen: 4
eligible_candidates: 2
selected: ticket.search, signal.list
rejected: one workspace-mismatched near-match
blocked: one consequential messaging tool outside the job
schema_loaded: Not run
authorization: not granted
execution: Not run
outcome: Not verified
raw_catalog_recorded: false
next_action: obtain one sanitized host note covering stale inventory and wrong-tenant rejection
```

## Not covered

- no live model, host, catalog, client-owned lookup, hosted lookup, MCP server,
  namespace, schema load, permission check, or tool execution occurred;
- no relevance, precision, recall, latency, token, cost, or task-success
  measurement exists;
- no mobile, keyboard, screen-reader, network-failure, or tenant-isolation
  behavior was exercised;
- no customer message, CRM mutation, brief acceptance, adoption, or star lift
  is established.
