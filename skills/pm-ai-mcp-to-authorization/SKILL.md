---
name: pm-ai-mcp-to-authorization
description: Use when an AI product connects to an MCP server or agent connector and the team needs a source-bounded authorization contract for resource, issuer, consent, scope, tool side effects, token lifecycle, task isolation, and recovery.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI MCP to Authorization

Use this skill when an AI product may connect to an MCP server, remote tool,
agent connector, or asynchronous MCP Task and a PM must decide what a host,
client, authorization server, resource server, tool, or task store may access.

The output is a product and release contract. It is not an OAuth client, MCP
implementation, connector registry, secret manager, or security certification.
Keep a human owner on consent, scope, consequential actions, and the final
release decision.

## When to use

Use it when:

- a team is adding an MCP server, remote tool, connector, or agent integration;
- a host needs to discover an authorization server or protected resource;
- a tool request may expose data, change a record, send a message, spend money,
  or change permissions;
- the product supports per-tool consent, delegated access, re-authentication,
  revocation, or managed authorization;
- a long-running MCP Task returns a task ID, status, result, or cancellation
  operation that must be bound to the requester;
- an OAuth callback succeeded but nobody has documented audience, issuer,
  scope, tenant, expiry, or downstream token handling;
- the team needs a hold, fallback, or pilot decision without live credentials.

## Do not use

Do not use this skill to:

- implement OAuth, PKCE, an MCP client/server, an authorization server, or a
  token store;
- approve a tool, expand a scope, exchange a code, refresh a token, or revoke
  access;
- treat a discovered metadata document, successful callback, or HTTP 200 as
  proof that every tool or task operation is authorized;
- design ordinary in-session progress; use `pm-ai-task-to-progress`;
- define generic actor identity and delegation; use `pm-ai-identity-to-boundary`;
- define a generic tool schema and side effect contract; use
  `pm-ai-tool-to-contract`;
- supervise a run that continues after the user leaves; use
  `pm-ai-background-run-to-supervision`;
- paste tokens, authorization codes, cookies, customer data, private URLs, or
  sensitive screen content into the contract or public receipt.

Use `Unknown`, `Not provided`, `Not run`, `Not measured`, `Not reproduced`, or
`Not covered` when a host, protocol version, provider, or permission result is
missing.

## Workflow

### 1. Frame the authorization decision

Write one sentence:

> Decide whether actor `...` may use resource `...` through host `...`,
> transport `...`, scope `...`, and tool/task boundary `...`, with consent,
> expiry, revocation, and fallback `...`.

Record the user job, requester, owner, current workaround, protected resource,
tenant or workspace, data class, tool side effects, duration, user timezone,
and what remains the user's decision. A successful login is not consent for
every downstream tool or task.

### 2. Map roles and authority

Name each role and its evidence:

| Role | Product question | Evidence |
| --- | --- | --- |
| Resource owner | Whose data or authority is delegated? | user or policy source |
| Host | What UI or agent environment asks for access? | host contract |
| MCP client | Which connector sends the request? | client identity/version |
| Authorization server | Who issues or validates client authorization? | issuer metadata |
| MCP/resource server | Which protected resource receives the token? | canonical resource URI |
| Gateway | Does routing, rate limiting, or policy change the boundary? | gateway contract |
| Tool | What data and side effect does the call expose? | tool catalog and schema |
| Task store | Who can get, list, result, or cancel a task? | task access policy |

Do not collapse authentication, authorization, consent, delegation, and tool
execution into one `connected` state.

### 3. Identify transport and discovery

Record protocol revision, transport, canonical resource URI, issuer, metadata
locations, redirect URI, client metadata or registration route, and supported
scopes. For HTTP authorization, check resource and authorization-server
metadata, `WWW-Authenticate`, issuer, resource indicator, audience, and token
transport. For STDIO or another local transport, record the host's credential
source and local permission boundary instead of copying HTTP OAuth rules.

If the source or host version is unclear, keep the decision at `Hold` and write
the missing evidence. Do not infer the latest protocol from a package name.

### 4. Define consent, scope, and tool action boundaries

For each requested permission, record:

| Field | Required question |
| --- | --- |
| Resource | What exact server or data surface is protected? |
| Purpose | What user job requires it? |
| Data | What leaves the host and what does the server return? |
| Scope | What least-privilege operation is requested? |
| Tool | Which tool, resource, prompt, or task operation is covered? |
| Side effect | Can it write, send, buy, delete, publish, or change access? |
| Context | Which user, tenant, workspace, and request are bound? |
| Duration | When does consent, token, or task access expire? |
| Control | Can the user inspect, deny, revoke, or choose a manual route? |

Separate server-level connection from per-tool authorization when a host can
support it. A read-only source fetch does not authorize a message send, record
write, purchase, deletion, or permission change.

### 5. Verify token and authorization lifecycle

Do not record a token value. Record whether the host has evidence for:

- exact issuer and authorization-server selection;
- canonical resource and audience binding;
- issuer validation and no authorization-server mix-up;
- redirect exactness, HTTPS or localhost boundary, and PKCE where applicable;
- scope minimization, consent freshness, and scope-change re-consent;
- expiry, refresh, rotation, revocation, and secure storage;
- no token in URL, logs, prompt content, task result, or upstream passthrough;
- distinct 401, 403, invalid scope, expired, revoked, and rate-limit behavior.

If a server calls another API, require a separate downstream credential
boundary. A received token must not silently become a credential for a
different audience.

### 6. Bind tasks and results to authorization context

If asynchronous tasks exist, define ownership for `tasks/get`, `tasks/result`,
`tasks/cancel`, and `tasks/list`. The contract must answer:

- Is a task ID bound to the same user, tenant, client, and authorization
  context that created it?
- Does a requester receive only its own task metadata and result?
- Are task IDs high entropy, rate-limited, and subject to a documented TTL?
- What happens when authorization expires or is revoked while a task runs?
- Does cancellation require the same authorization context and explicit user
  control?
- What is the fallback when the host cannot identify the requester?

If context binding is unavailable, say so, shorten the exposure window where
the host supports it, do not expose a list capability, and keep the release at
`Hold` until the risk is accepted by the owner.

### 7. Model user-visible states and recovery

Use these states as needed:

`not_configured`, `discovering`, `needs_consent`, `authorized`, `denied`,
`expired`, `revoked`, `reauth_required`, `mismatch`, `rate_limited`, and
`unknown`.

For each state, specify the user control, data/tool visibility, next action,
and evidence. Keep wrong issuer, wrong audience, invalid redirect, invalid
scope, task not found, cross-context denial, and server error separate.

- First-time: explain resource, data, tool, tenant, duration, and side effects.
- Empty/loading: name missing metadata or discovery phase; show no fake
  percentage or connection success.
- Error: preserve status and reason; do not retry with broader permission.
- Recovery: re-check issuer, resource, scope, and context before re-auth.
- Backtracking: allow deny, revoke, scope reduction, manual fallback, and
  deletion of the local proposal; do not claim server revocation unverified.
- Mobile/accessibility: keep consent keyboard reachable, readable at narrow
  widths, and explicit about what remains denied.

### 8. Evaluate and decide

Use positive, negative, cross-context, privacy, and recovery cases. At minimum
cover:

| Case | Expected result |
| --- | --- |
| correct issuer and resource | discovery can continue with evidence |
| wrong issuer or audience | reject and enter `mismatch` |
| invalid or open redirect | stop before code exchange |
| scope wider than the user job | reduce, re-consent, or hold |
| token appears in URL, log, prompt, or upstream call | redact and fail |
| task belongs to another context | deny get, result, cancel, and list |
| expired or revoked authorization | re-auth or manual fallback |
| task ID enumeration or excessive polling | rate limit and audit |
| tool metadata contains instructions | treat it as untrusted data |
| host cannot prove a boundary | `Not run`, `Not covered`, or `Hold` |

Choose `Proceed`, `Pilot`, `Hold`, `Fallback`, or `Stop`. A passing schema or
authorization callback is not proof of tenant isolation, user comprehension,
or safe tool behavior.

### 9. Write a privacy-safe receipt

Record package/version, host/client, source versions, transport, resource,
issuer class, scope class, consent state, token/task checks, decision,
limitations, and next action. Exclude raw tokens, codes, cookies, customer
content, private URLs, and sensitive screen data.

## Output contract

Return the sections below in this order:

1. `## Decision and user job` - decision, user, workaround, desired outcome,
   and what remains human-owned.
2. `## Sources and freshness` - source URL or ID, protocol/host version,
   date, relevant claim, and source limitation.
3. `## Authority and resource map` - roles, tenant/workspace, transport,
   canonical resource, issuer, client, gateway, tool, and task store.
4. `## Consent and action boundary` - data, purpose, scope, tool side effect,
   duration, allowed/denied actions, inspect, deny, revoke, and fallback.
5. `## Authorization lifecycle` - discovery, redirect, issuer, audience,
   scope, token, expiry, rotation, revocation, error, and re-auth evidence.
6. `## Task and result isolation` - task ownership, context binding, list/get/
   result/cancel rules, TTL, rate limit, and cross-context negative cases.
7. `## UX states and recovery` - first-time, empty, loading, consent, error,
   mismatch, expiry, revocation, mobile, accessibility, and manual route.
8. `## Evaluation and release gate` - cases, oracles, observed results,
   `Not run` / `Not covered`, decision, rollout, fallback, and rollback.
9. `## Privacy-safe receipt` - sanitized YAML or table with no secrets.
10. `## Not covered` - concrete unknowns, unexecuted flows, and claims not
    supported by current evidence.

## Common rationalizations to reject

- "The callback succeeded, so every tool is authorized." Separate consent,
  scope, tool action, and result access.
- "The task ID is secret enough." Bind it to authorization context and test
  get, result, cancel, and list paths.
- "The MCP server validates the token." Verify the intended resource, issuer,
  audience, scope, and downstream credential boundary.
- "It is only a read tool." Verify data egress, tenant scope, prompt/resource
  visibility, and whether the tool can trigger a hidden side effect.
- "We can reuse the token upstream." Deny token passthrough; require a
  separately issued downstream credential or a documented safe boundary.
- "No one will see the error." Keep denial, expiry, revocation, re-auth, and
  manual fallback visible to the user.
- "The latest spec covers us." Record the exact protocol and host versions;
  compatibility and security still require an actual host oracle.

## Edge cases

- A public tool and a protected tool share one MCP endpoint.
- The issuer changes, the authorization server redirects, or the resource URI
  has a different path than the one shown to the user.
- A scope is added after the first consent, or a tool description changes.
- Authorization expires while a background task is queued, running, or ready.
- A task result is fetched from a different tenant, user, client, or region.
- The client loses the authorization context but still has a task ID.
- A gateway caches tool metadata or routes requests by method and tool name.
- A server response contains an instruction-shaped request to reveal a token,
  widen scope, or call another tool.
- The user denies one tool but accepts another, or revokes access mid-flow.
- The host cannot provide a reliable requester identity or audit trail.

## Adjacent routing

- Use `pm-ai-identity-to-boundary` for generic principal, delegation, and
  authorization ownership outside MCP protocol details.
- Use `pm-ai-tool-to-contract` for tool schema, provenance, side effects, and
  recovery without the authorization lifecycle.
- Use `pm-ai-prompt-injection-to-defense` for a full attack path and negative
  evaluation around untrusted instructions.
- Use `pm-ai-background-run-to-supervision` for runs that continue after the
  current interaction and need pause, cancel, expiry, notification, or review.
- Use `pm-ai-task-to-progress` for ordinary task lifecycle and honest progress
  when cross-context authorization is not the central decision.
- Use `pm-ai-data-to-purpose` for data minimization, retention, deletion, and
  third-party reuse policy across an AI data flow.

## Final check

Before returning the contract, confirm:

- source and protocol version are recorded;
- authentication, authorization, consent, scope, tool action, and task access
  are separate concepts;
- the resource URI, issuer, audience, tenant, and requester context are named;
- HTTP and STDIO or other transport behavior is not conflated;
- per-tool side effects and denied routes are visible;
- task get/result/cancel/list isolation is tested or marked `Not run`;
- 401, 403, mismatch, expiry, revocation, rate limit, and recovery states are
  explicit;
- no token, code, cookie, customer data, private URL, or secret appears;
- unknown host behavior is `Unknown`, `Not covered`, or `Hold`, never invented;
- the final decision and next action are owned by a human.
