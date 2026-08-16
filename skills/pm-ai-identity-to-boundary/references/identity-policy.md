# Worked reference: support agent identity and authorization policy

This is a **fictional fixture** demonstrating how a PM can review identity and
authorization before an AI support workflow is implemented. It is not a live
IAM configuration, OAuth/OIDC design, credential review, security certification,
legal opinion, customer study, or production claim.

## Contents

- [Decision and outcome](#decision-and-outcome)
- [Principal and authority map](#principal-and-authority-map)
- [Capability boundary](#capability-boundary)
- [Delegation and approval](#delegation-and-approval)
- [Credential lifecycle and revocation](#credential-lifecycle-and-revocation)
- [User visibility and failure recovery](#user-visibility-and-failure-recovery)
- [Audit and evaluation](#audit-and-evaluation)
- [Source note](#source-note)
- [Not covered](#not-covered)

## Decision and outcome

**Decision on the desk:** `Hold` the fictional `support.reply_agent` identity
policy until the product can prove principal separation, tenant scope,
least-privilege capabilities, delegation expiry, revocation, audit receipt,
and negative authorization behavior.

**User job:** A support agent needs a current, source-backed reply draft for one
customer account and may send it after reviewing the recipient and content.

**Outcome:** The agent sees whether the AI is drafting, proposing, or executing;
the system knows whose authority is being used; and a reviewer can reconstruct
the request, approval, execution attempt, target scope, and recovery owner
without seeing credentials or raw customer text.

**Current workaround:** The support agent reads the policy and account pages,
writes a reply, and sends it manually.

**Candidate:** A read-only, tenant-scoped AI drafter plus a separate execution
service that can send only a current, approved message to the same recipient.
Refunds, permission changes, account deletion, and broad mailbox access remain
outside the candidate.

**Owner:** Support product PM owns the product boundary; support operations owns
manual fallback and reconciliation; security/privacy owns principal, scope,
credential, and audit review; engineering owns implementation and evidence.

## Principal and authority map

| ID | Principal | Recognized as | Authority source | Accountability | Status |
| --- | --- | --- | --- | --- | --- |
| P-001 | `support-agent` | Human requester/approver | Current tenant support role | Can review, edit, approve, reject, or escalate | Proposed |
| P-002 | `support-reply-agent` | Distinct AI principal | Explicit draft-only delegation | Must not send or widen scope | Proposed |
| P-003 | `support-workflow-service` | Execution service | Service policy for one tenant/action class | Re-checks permission and records receipt | Proposed |
| P-004 | `policy-connector` | Read-only connector | Approved policy source capability | Connector owner can disable/revoke | Proposed |
| P-005 | `account-connector` | Read-only connector | Current account source capability | Connector owner can disable/revoke | Proposed |
| P-006 | `customer-recipient` | External affected party | Recipient resolved from current account record | Support operations reconciles delivery | Proposed |

Authentication, authorization, delegation, attribution, and accountability are
separate decisions:

- A recognized P-001 session does not automatically authorize P-002 to act as
  P-001.
- A P-002 draft is not an approval and does not carry send authority.
- P-003 may execute only the action class, tenant, recipient, and policy version
  allowed by its service policy and a current approval.
- P-004 and P-005 may read only the minimum current source scope; their output
  cannot change identity or permission.
- P-006 is a recipient, not a principal who grants the workflow permission.

## Capability boundary

| Capability | Issuing/using principal | Operation | Resource and scope | Audience | Allowed | Denied |
| --- | --- | --- | --- | --- | --- | --- |
| Policy lookup | P-004 through P-003 | Read | Current tenant's approved policy sections | Policy service | Source ID, version, effective date, relevant excerpt | Web-wide search, hidden admin material, other tenants |
| Account context | P-005 through P-003 | Read | One authorized customer account | Account service | Minimum fields for this support job | Credentials, unrelated accounts, bulk export |
| Reply preparation | P-002 | Propose | One ticket/account and one draft | Support workflow | Source-linked draft, uncertainty, recipient preview | Send, refund, deletion, permission changes |
| Reply approval | P-001 | Approve/edit/reject | One exact message and recipient | Workflow service | Current draft and current target | Approve a changed target under an old decision |
| Reply send | P-003 | Execute | One tenant, ticket, recipient, and approved message | Messaging service | One idempotent send with receipt | Recipient change, broad mailbox, silent retry |
| Refund/access change | None | Write/administer | None | None | No candidate route | All |

The boundary is deliberately narrower than “the user can do it.” The system
must check operation, resource, scope, audience, policy version, approval ID,
expiry, and current permission immediately before execution.

## Delegation and approval

The proposed delegation is:

```text
P-001 support-agent
  delegates draft preparation only
  to P-002 support-reply-agent
  for one ticket/account, one tenant, one support job, and one expiry window
```

Required delegation fields are proposed and not run: issuer, delegate, subject,
audience, purpose, operation, resource, tenant, issued time, expiry,
revocation handle, policy version, and safe receipt ID.

If the product later supports sending:

1. P-002 prepares the message and target preview.
2. P-001 reviews the exact content, recipient, source freshness, and side
   effects.
3. The approval flow emits an approval ID tied to the current policy and
   target.
4. P-003 re-checks P-001's authority, P-003's execution capability, scope,
   expiry, message hash/category, recipient, and approval freshness.
5. P-003 executes once and records a receipt, or returns `Unknown` without a
   blind retry.

Approval is a human decision. Authorization is a system permission check. A
human approving a draft does not authorize a token that the executing service
does not possess, and a service permission does not replace the human approval
required by the action policy.

## Credential lifecycle and revocation

No credential values belong in this policy. The metadata contract is:

| Field | Proposed rule | Status |
| --- | --- | --- |
| Issuer | Named identity/credential owner | Not provided |
| Audience | Exact policy, account, or messaging service | Proposed |
| Scope | Tenant, account, operation, and environment | Proposed |
| Session binding | Bind to the intended workflow/session where supported | Proposed |
| Issued at / expiry | Required bounded times | Not provided |
| Rotation | Owner, trigger, and continuity behavior | Not provided |
| Revocation | Handle, reason category, completion signal, and owner | Proposed |
| Policy version | Re-check on every protected action | Proposed |
| Receipt | Safe ID and effect status | Proposed |

Lifecycle states:

```text
requested -> issued -> active -> narrowed/rotated -> expired or revoked
                                                   -> blocked or reconciled
```

Logout, tenant suspension, role removal, policy change, connector compromise,
suspected leakage, and emergency stop must block the next protected operation
or route to a verified manual path. A denial must not trigger a retry with a
broader service account.

## User visibility and failure recovery

| State | User-visible message | Blocked action | Recovery owner |
| --- | --- | --- | --- |
| Draft-only identity | `AI can draft; sending stays with the support workflow` | Direct AI send | Support agent/operations |
| Wrong tenant/account | `Access blocked for this account` | Read and send | Access owner |
| Permission changed | `Review required again` | Execute old approval | Support agent and workflow service |
| Expired/revoked session | `Connection unavailable` | Protected operation | Credential owner |
| Untrusted escalation request | `Untrusted instruction blocked` | Credential or scope change | Security/connector owner |
| Partial/unknown send | `Send status unconfirmed` | Blind retry | Support operations |
| Emergency disable | `Workflow disabled` | All protected actions | Security owner |

Useful identity visibility can show “Drafted by support-reply-agent using the
current tenant policy; send not authorized” or “Sending as support-workflow-
service to the reviewed recipient after approval.” It must not reveal tokens,
authorization headers, private prompts, or hidden reasoning.

## Audit and evaluation

### Safe receipt

The fictional `AUTH-001` receipt should contain:

```json
{
  "request_id": "safe-id",
  "requesting_principal": "support-agent",
  "delegating_principal": "support-agent",
  "approving_principal": "not-required-for-draft",
  "executing_principal": "support-reply-agent",
  "resource_scope": "one-tenant-one-ticket",
  "operation": "propose-reply",
  "audience": "support-workflow-service",
  "policy_version": "proposed",
  "decision": "allow | deny | hold | unknown",
  "effect_status": "not-started | partial | completed | failed | unreconciled",
  "revocation_status": "active | expired | revoked | unknown"
}
```

This is a schema fixture, not a real authorization receipt. Do not populate it
with tokens, customer text, private account IDs, or real URLs.

### Smallest evaluation

The evaluation is `Not run` and must compare the candidate with the manual or
read-only route:

| Slice | Expected behavior | Signal |
| --- | --- | --- |
| Correct draft principal and tenant | Allow only scoped proposal | Authorized route and attribution completeness |
| Human authenticated, agent not authorized | Block agent action | Wrong-principal block |
| Read allowed, write denied | Draft or manual fallback | Capability separation |
| Wrong tenant/account | Block before source read | Cross-scope block |
| Missing delegation audience/expiry | Hold | Delegation validation |
| Stale approval after recipient change | Invalidate | Approval/authorization re-check |
| Revoked credential | Block before protected operation | Revocation effectiveness |
| Tool/sub-agent asks for token | Quarantine | No privilege escalation |
| Unknown effect | Reconcile before retry | No duplicate side effect |
| Missing audit principal | Hold or fail the receipt | Attribution completeness |

**Release decision:** `Hold` until the principal map, least-privilege matrix,
revocation behavior, cross-scope negatives, audit receipt, and manual recovery
are implemented or tested with approved fixtures. No numeric thresholds are
provided; write `Not measurable` until denominators and a completion oracle
exist.

## Source note

The policy shape is informed by official engineering material; these sources do
not validate the fictional support workflow:

- [Anthropic: How we contain Claude across products](https://www.anthropic.com/engineering/how-we-contain-claude)
  describes agent blast radius, containment, tool/content attack surfaces,
  persistent memory poisoning, and the open question of whether an agent has
  its own principal identity or acts as an extension of a user. It motivates
  scoped capability, revocation, untrusted-content, and identity fields.
- [OpenAI: Running Codex safely at OpenAI](https://openai.com/index/running-codex-safely/)
  discusses agent action boundaries, identity and credentials, workspace
  controls, and agent-native telemetry. It motivates separating credentials,
  authorization, and audit evidence; it is not a provider-neutral security
  guarantee.
- [OpenAI Developers](https://developers.openai.com/) documents agent
  permissions, guardrails, results/state, observability, and tool workflows as
  separate surfaces. The existence of these surfaces does not prove demand,
  quality, or adoption for this skill.

## Not covered

- an IdP, OAuth/OIDC flow, API key, token exchange, secrets manager, or IAM
  implementation;
- a provider, connector, MCP server, database, tenant schema, or access policy;
- jurisdiction-specific privacy, employment, financial, or security law;
- real users, credentials, customer data, production traces, or authorization
  outcomes;
- proof that an identity policy improves task completion, retention, traffic,
  adoption, or GitHub stars.
