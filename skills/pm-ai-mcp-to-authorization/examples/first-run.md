# First run: support workspace MCP authorization review

This is a fictional fixture showing how a PM can review an MCP connector before
implementation. It is not an OAuth exchange, MCP connection, tool execution,
task lookup, provider result, security audit, or adoption evidence. No token,
authorization code, cookie, customer text, or private URL is present. Runtime,
consent, isolation, retention, cost, and latency checks are `Not run` or `Not
measured`.

## Decision and user job

**Decision:** `Hold` the connector until the host provides a resource, issuer,
consent, scope, tool-side-effect, token lifecycle, and task isolation contract.

**User/job:** A support PM wants an AI host to read a selected support workspace,
summarize open tickets, and draft a suggested reply for review. The PM must
approve any send, edit, delete, export, customer-data expansion, billing, or
permission action.

**Current workaround:** The team connects a general-purpose assistant, accepts
a broad workspace permission, and assumes that a successful callback covers
every tool exposed by the server.

**Desired outcome:** A dated review packet that says what the connector may
read, what it may draft, what it must never do while unattended, how a user can
deny or revoke access, and how task results stay within the same authorization
context.

**Evidence boundary:** No host was contacted, no metadata was fetched, no
consent was shown, no token was issued, no tool was called, and no task was
created or retrieved.

## Sources and freshness

| Source | Relevant claim | Evidence status |
| --- | --- | --- |
| MCP authorization specification, 2025-06-18 | HTTP resource and authorization-server discovery, resource indicator, token audience, and error boundary | Current source reference, not host proof |
| MCP Tasks security guidance, 2025-11-25 | Task IDs need authorization-context binding, list isolation, TTL, and rate limits | Current source reference, not implementation proof |
| Fictional Desktop Host contract | Host asks for support workspace access | Not provided |

The source version must be recorded again when this fixture is replaced with a
real host observation. The fictional server name is not an authorization
server, and the fictional run ID is not a live task ID.

## Authority and resource map

| Role | Value | Evidence status |
| --- | --- | --- |
| Resource owner | Support workspace administrator | Proposed user role |
| Host | Fictional Desktop Host | No host contract |
| MCP client | `support-review-client.v1` | Proposed fixture ID |
| Authorization server | Not provided | Not run |
| Protected resource | Selected support workspace | Proposed scope |
| MCP server | Fictional Support MCP | No endpoint contacted |
| Transport | HTTP | Proposed, not verified |
| Tenant/workspace | One named workspace only | Boundary rule |
| Tools | `tickets.read`, `reply.draft` | Proposed allowlist |
| Task store | Fictional task store | No task access policy |
| Reviewer | Support PM | Human owner |

The connector is classified as `Complement`: it organizes ticket evidence and
drafts text; the PM retains customer communication and workspace decisions.

## Consent and action boundary

| Request | While user is away? | Gate |
| --- | --- | --- |
| read selected ticket fields | Proposed | exact resource and data scope |
| read attachments or customer history | Denied | separate purpose and consent |
| draft a reply for review | Proposed | result review and no send |
| send or publish a reply | Denied | separate human approval |
| edit, delete, export, or assign a ticket | Denied | separate workflow |
| change tool scope, tenant, schedule, or retention | Denied | owner re-consent |
| fetch an unlisted URL | Denied | source and host review |
| retrieve another requester's task | Denied | authorization-context check |

Required consent copy must name the workspace, ticket fields, draft purpose,
retention, tool list, duration, denied side effects, and revoke route. A broad
"connect workspace" label is not sufficient evidence.

## Authorization lifecycle

| Field | Value | Evidence status |
| --- | --- | --- |
| Canonical resource URI | Not provided | Not run |
| Issuer | Not provided | Not run |
| Metadata discovery | Not run | Not run |
| Redirect URI | Not provided | Not run |
| PKCE or client protection | Not provided | Not measured |
| Scope | `tickets.read` and `reply.draft` | Proposed minimum |
| Audience check | Not run | Not run |
| Expiry and refresh | Not provided | Not measured |
| Revocation | Not provided | Not run |
| Upstream token passthrough | Denied by product rule | Not tested |

Until issuer, resource, audience, redirect, scope, and lifecycle evidence are
available, the PM must not change `Hold` to `Pilot`.

## Task and result isolation

| Operation | Rule | Evidence |
| --- | --- | --- |
| `tasks/get` | same requester, tenant, client, and authorization context | Not run |
| `tasks/result` | same context; redact out-of-scope ticket data | Not run |
| `tasks/cancel` | same context and explicit user control | Not run |
| `tasks/list` | only tasks in the requester's context | Not run |
| task ID | high entropy and no public enumeration | Not measured |
| TTL | maximum lifetime documented and enforced | Not provided |
| authorization expires mid-task | quarantine result and request re-auth or manual route | Not run |

If the host cannot identify the requester, the list operation remains disabled
and the task result is not accepted as private merely because the ID is hard to
guess.

## UX states and recovery

```text
not_configured -> discovering -> needs_consent -> authorized
                                  |              |
                                  +-> denied    +-> expired -> reauth_required
authorized -> mismatch | revoked | rate_limited | unknown
```

- `not_configured`: explain the missing resource, issuer, or scope.
- `discovering`: show the metadata phase; no connected claim.
- `needs_consent`: show data, tools, workspace, duration, and denied actions.
- `authorized`: show current scope, expiry, reviewer, and revoke control.
- `mismatch`: stop when issuer, audience, resource, tenant, or tool changes.
- `expired` or `revoked`: do not send or retry; ask for re-auth or manual work.
- `unknown`: show the missing host evidence and keep the decision at `Hold`.

## Evaluation register

| Case | Expected result | Status |
| --- | --- | --- |
| MCP-001 correct issuer and resource | discovery can continue | Not run |
| MCP-002 HTTP versus STDIO behavior | transport rules stay separate | Not run |
| MCP-003 consent lists data and tools | user can inspect and deny | Not run |
| MCP-004 wrong issuer | enter `mismatch` | Not run |
| MCP-005 wrong audience | reject resource request | Not run |
| MCP-006 open redirect | stop before authorization code exchange | Not run |
| MCP-007 scope wider than ticket draft | reduce, re-consent, or hold | Not run |
| MCP-008 token in log, URL, prompt, or upstream call | redact and fail | Not run |
| MCP-009 expired or revoked access | re-auth or manual fallback | Not run |
| MCP-010 cross-context `tasks/get` | deny | Not run |
| MCP-011 cross-context `tasks/result` | deny and do not leak ticket text | Not run |
| MCP-012 cross-context `tasks/cancel` | deny | Not run |
| MCP-013 `tasks/list` enumeration | isolate, rate limit, or disable | Not run |
| MCP-014 task TTL and requester limits | documented and enforced | Not measured |
| MCP-015 instruction-shaped tool metadata | treat as untrusted data | Not run |

## Decision receipt

```yaml
package: pm-ai-mcp-to-authorization
decision: Hold
client: support-review-client.v1
host: Fictional Desktop Host
transport: HTTP
protected_resource: selected support workspace
authorization_server: Not provided
scope:
  - tickets.read
  - reply.draft
consent_state: Not run
issuer_check: Not run
audience_check: Not run
tool_side_effect_check: Not run
task_context_binding_check: Not run
revocation_check: Not run
retention_ttl: Not provided
allowed_while_away:
  - read selected ticket fields
  - draft a reply for review
denied_while_away:
  - send or publish
  - edit or delete
  - export or change permissions
  - access another authorization context
limitations:
  - Fictional fixture; no host, server, token, tool, or task was contacted.
  - No consent, isolation, retention, cost, or latency result was measured.
next_action: Attach a sanitized host contract and run MCP-001 through MCP-015.
```

## Not covered

- no OAuth login, token issuance, refresh, rotation, or revocation was run;
- no MCP server, client, gateway, tool, task store, or provider was contacted;
- no claim is made about tenant isolation, consent comprehension, secure token
  storage, provider support, production safety, or adoption;
- no customer content, credential, authorization code, cookie, private URL, or
  sensitive screen content is included;
- the public issue is a feedback lead, not evidence of external usage.
