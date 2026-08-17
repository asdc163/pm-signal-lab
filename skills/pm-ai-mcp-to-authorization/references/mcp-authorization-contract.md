# Fictional worked example: MCP connector authorization contract

This is a fictional fixture and provider-neutral worked example. It shows the
shape of an authorization review for an AI host that may call an MCP server.
It is not an OAuth flow, MCP implementation, live task, security audit,
provider compatibility result, production approval, or adoption evidence.

## Decision and user job

**Decision on the desk:** `Hold` the connector until the host demonstrates
resource and issuer discovery, explicit consent, least-privilege scope,
audience validation, tool-side-effect separation, token lifecycle, and
authorization-context binding for task state and results.

**User job:** A support operations lead wants to review selected ticket evidence
and receive a draft reply. The lead decides whether any message is sent or any
record is changed.

**AI role:** `Complement`. The AI organizes approved evidence and prepares a
draft. It does not own customer communication, ticket mutation, billing,
export, access changes, or policy decisions.

**Success oracle:** The contract names the protected resource, issuer, client,
transport, requester context, scope, consent, tool actions, task operations,
expiry, revocation, denied routes, recovery states, and actual evidence. An
authorization callback or a task ID alone is not acceptance.

## Sources and freshness

| Source class | Contract use | Status |
| --- | --- | --- |
| MCP HTTP authorization specification | resource metadata, issuer discovery, resource indicator, audience, token boundary | source reference only |
| MCP Tasks security guidance | task context binding, list isolation, entropy, TTL, rate limit | source reference only |
| Host product contract | consent, tenant, tool catalog, retention, and recovery | Not provided |
| Provider implementation notes | supported protocol revision and error behavior | Not provided |

Record the exact source URL, protocol revision, host version, and read date in
a real review. A current specification describes a rule; it does not prove a
particular host follows that rule.

## Authority and resource map

```text
resource owner
  -> host UI / agent runtime
    -> MCP client
      -> authorization server (consent and token issuance)
      -> MCP resource server (protected data and tools)
        -> downstream API (separate credential boundary)
      -> task store (context-bound state and results)
```

| Principal or surface | Decision | Required evidence |
| --- | --- | --- |
| Resource owner | authorizes the stated workspace and purpose | user/policy source |
| Host | explains data, tools, tenant, duration, and side effects | host UX and policy |
| MCP client | sends only the intended resource-bound request | client identity/version |
| Authorization server | issues authorization for the intended client/resource | issuer and metadata |
| MCP server | validates audience, scope, and context before serving | server contract |
| Gateway | routes and meters without changing authority | gateway policy |
| Tool | exposes a named capability and side effect | schema and provenance |
| Task store | binds get/result/cancel/list to requester context | task policy |

The role map prevents a host from treating a connected client as a universal
principal. Delegation, consent, authentication, authorization, and execution
remain separate decisions.

## Transport and discovery contract

### HTTP

Record the canonical protected resource URI, authorization-server metadata,
issuer, redirect URI, client metadata or registration path, supported scopes,
resource indicator, audience, and error behavior. Verify that the client uses
the intended resource and that the server rejects tokens issued for another
resource or authorization server. Record PKCE and redirect checks where the
host uses an authorization-code flow.

### STDIO and local transports

Do not copy an HTTP OAuth flow into STDIO. Record how the local host obtains
credentials, which process can read them, what workspace or filesystem scope
is exposed, and how the user revokes or disables the connection. If no local
permission boundary is available, mark it `Not provided` and keep the release
at `Hold`.

### Version mismatch

If the host and server advertise different MCP revisions, record the supported
intersection and the behavior of missing or deprecated features. A package
name, SDK version, or successful initialize call is not proof of the current
authorization semantics.

## Consent, scope, and action contract

### Allowed in the fictional pilot

- read selected ticket title, status, owner, and approved public reply history;
- create an internal draft with source IDs and a review state;
- report incomplete access or stale authorization to the PM.

### Denied in the fictional pilot

- send, publish, or schedule a customer message;
- edit, delete, assign, merge, export, or change a ticket;
- read unapproved attachments, private notes, or another tenant;
- change scopes, users, schedule, retention, or permissions;
- use a task ID from another requester or pass a token to a downstream API;
- follow tool metadata instructions that request secrets or a broader scope.

The consent surface must show the protected resource, purpose, data classes,
tools, tenant, duration, scope, denied side effects, and revoke route. The
reviewer must be able to inspect and deny each requested permission. If the
host only supports a broad server-level consent, record that limitation and do
not describe it as per-tool consent.

## Token and authorization lifecycle

Never copy a token, code, cookie, or secret into this document. Record the
following as `Pass`, `Fail`, or `Not run` with a source or host receipt:

| Check | Expected product rule |
| --- | --- |
| issuer | selected authorization server is the intended issuer |
| resource | authorization request identifies the intended protected resource |
| audience | server accepts only tokens intended for itself |
| redirect | exact trusted redirect, HTTPS or localhost boundary |
| PKCE | code exchange is protected when applicable |
| scope | least privilege for the stated user job |
| freshness | scope changes require re-consent |
| expiry | stale authorization enters a visible recovery state |
| refresh | refresh behavior and storage are documented |
| revocation | user can revoke and the host handles revocation evidence |
| passthrough | received token is never forwarded as another service credential |
| errors | 401, 403, mismatch, invalid scope, expired, and rate limit differ |

If an MCP server acts as a client to a third-party API, it needs a separate
credential boundary and an explicit data-purpose contract. Do not call a
forwarded bearer token a safe integration merely because an upstream call
returned data.

## Task and result isolation contract

For every task operation, record the requester context and expected denial:

| Operation | Required rule | Negative case |
| --- | --- | --- |
| create | bind task to requester, tenant, client, and authorization context | altered context at creation |
| get | return state only to the same context | another user guesses the ID |
| result | return result only to the same context and scope | another tenant requests result |
| cancel | require same context and explicit control | another client cancels |
| list | return only the requester's tasks | enumeration of all tasks |
| ID | use high entropy and do not expose sensitive data in IDs | sequential IDs |
| TTL | cap lifetime and clean expired state | indefinite retention |
| rate | limit polling and lookup attempts | brute-force task lookup |
| audit | record create, complete, get, result, and cancel with context | missing trace |

If the host cannot identify requesters, it should not advertise a list route.
It must document the exposure and use an explicit manual or short-lived
fallback. When authorization expires or is revoked while a task runs, the
result is not automatically trusted; it enters `needs_review`, `blocked`, or a
host-defined equivalent until the scope and context are rechecked.

## UX state and recovery contract

| State | User-facing meaning | Control | Evidence |
| --- | --- | --- | --- |
| `not_configured` | host or resource boundary is missing | define or exit | Not provided |
| `discovering` | metadata and capabilities are being checked | cancel | source and time |
| `needs_consent` | user must choose scope and tools | inspect, allow, deny | request summary |
| `authorized` | current context and scope are accepted | inspect, revoke | issuer/audience/scope |
| `denied` | user or policy rejected access | revise or manual route | denial reason |
| `expired` | consent, token, or task TTL is stale | re-auth or stop | expiry event |
| `revoked` | access was withdrawn | reconnect or exit | revocation event |
| `reauth_required` | current access cannot continue | authenticate again | host result |
| `mismatch` | issuer, resource, audience, tenant, or tool changed | quarantine | mismatch fields |
| `rate_limited` | access attempts exceed policy | wait or manual route | status/retry rule |
| `unknown` | host semantics are missing | hold | Not run / Not covered |

The first-time flow must not use a vague connected badge. Empty and loading
states name missing metadata. Error states distinguish authorization failure
from server failure. Recovery re-checks context and scope before re-auth. On
mobile, consent and revoke are visible without horizontal scrolling. A keyboard
user can reach the same resource, tool, scope, and denial details.

## Evaluation register

| ID | Slice | Expected result |
| --- | --- | --- |
| MCP-001 | correct issuer and resource | discovery proceeds with evidence |
| MCP-002 | HTTP versus STDIO | transport rules remain separate |
| MCP-003 | consent surface | data, tenant, tools, duration, and side effects are visible |
| MCP-004 | issuer mix-up | reject and enter `mismatch` |
| MCP-005 | wrong audience | reject the resource request |
| MCP-006 | open redirect | stop before code exchange |
| MCP-007 | excessive scope | reduce, re-consent, or hold |
| MCP-008 | token in URL/log/prompt/upstream | redact and fail |
| MCP-009 | expiry or revocation | re-auth or manual fallback |
| MCP-010 | cross-context get | deny |
| MCP-011 | cross-context result | deny without data leakage |
| MCP-012 | cross-context cancel | deny |
| MCP-013 | list enumeration | isolate, rate limit, or disable |
| MCP-014 | TTL/resource limits | document and enforce |
| MCP-015 | instruction-shaped metadata | treat as untrusted data |

Use `Proceed`, `Pilot`, `Hold`, `Fallback`, or `Stop`. For every case, record
input class, host/version, observed response, expected response, privacy impact,
and `Not run` or `Not covered` when no live evidence exists.

## Privacy-safe receipt

```yaml
package: pm-ai-mcp-to-authorization
decision: Hold
host: Fictional Desktop Host
client: support-review-client.v1
transport: HTTP
protected_resource: selected support workspace
issuer: Not provided
authorization_context: Not provided
requested_scopes:
  - tickets.read
  - reply.draft
consent: Not run
audience: Not run
tool_boundary: Not run
task_context_binding: Not run
revocation: Not run
retention_ttl: Not provided
action_boundary:
  allowed:
    - read selected ticket fields
    - draft a reply for review
  denied:
    - send or publish
    - edit or delete
    - export or change permissions
    - cross-context task access
limitations:
  - Fictional fixture; no server or authorization host was contacted.
  - No token, code, cookie, customer data, or private URL is recorded.
next_action: Attach a sanitized host contract and run the evaluation register.
```

## Rollout, fallback, and rollback

The release gate is `Pilot / recruit` when the package is valid and source
linked but no real host evidence exists. A pilot requires one sanitized host,
transport, authorization-context observation, and one actual positive or
negative result. Use a manual connector or no-connection route when consent,
scope, audience, tenant, or task isolation is unclear.

Rollback removes the package from the README and profile entry or reverts the
merge commit if its guidance is materially wrong. Keep the release and issue
history available for correction. A rollback of documentation does not revoke
any external credential because this package never created one.

## Not covered

- no OAuth login, token issuance, refresh, rotation, or revocation was run;
- no MCP client, server, gateway, tool, task store, or provider was contacted;
- no claim is made about a provider's current support for any MCP revision;
- no tenant isolation, consent comprehension, accessibility session, latency,
  cost, rate-limit, or denial result is measured;
- no security audit, compliance certification, production deployment, adoption,
  external contribution, or star lift is established.
