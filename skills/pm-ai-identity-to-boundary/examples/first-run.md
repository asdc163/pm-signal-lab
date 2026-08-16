# First run: support assistant identity policy

This is a **fictional fixture** showing how to use
`pm-ai-identity-to-boundary`. It does not use a real identity provider,
credential, token, tenant, connector, customer, or support system. Every value
below is a proposed design input, not observed security evidence.

## Request

> We want a support AI to read the current policy and customer account context,
> draft a reply, and maybe send it after the support agent approves. What
> identity and access should it use?

## Decision on the desk

`Hold` the fictional capability until the principals, tenant scope, delegated
authority, credential lifecycle, revocation, audit receipt, and negative tests
are defined and run. Keep the current manual lookup and human-send route.

The AI may be useful as a draft proposer, but “the support agent is logged in”
does not prove that the AI may send a message or read every customer record.

## User job and principal map

- **User job:** A support agent needs a current, source-backed reply draft for
  one customer account and may send it after reviewing the exact recipient and
  content.
- **Current workaround:** The support agent opens the approved policy page and
  customer account screen, writes a draft, and sends it manually.
- **Decision owner:** Support product PM; support operations owns the manual
  fallback; security/privacy owns scope and credential review.
- **Success oracle:** A reviewer can identify who requested, who approved, who
  would execute, which tenant/account is targeted, and what the system will
  block before any external send.
- **Observation window:** Not provided. No real session or authorization test
  was run.

| ID | Principal | Role | Authority | Status |
| --- | --- | --- | --- | --- |
| P-001 | `support-agent` | Human requester and possible approver | Support role in the current tenant | Proposed; not run |
| P-002 | `support-assistant` | AI drafter | No independent send authority by default | Proposed; not run |
| P-003 | `support-workflow-service` | Execution and policy-check service | Service policy for one tenant and action class | Proposed; not run |
| P-004 | `policy-connector` | Read-only approved policy source | Connector-specific read capability | Proposed; not run |
| P-005 | `account-connector` | Read-only current account source | Current tenant/account read capability | Proposed; not run |
| P-006 | `customer-recipient` | Affected external recipient | Receives only a reviewed message | Proposed; not run |

## Authentication, authorization, delegation, and accountability

- **Authentication:** Not provided. A real implementation must identify the
  support agent, workflow service, and connector sessions separately.
- **Authorization:** P-002 may propose a reply from approved read sources;
  P-002 may not read another tenant, send, refund, delete, or grant access.
- **Delegation:** P-001 may delegate draft preparation to P-002 for one
  account-scoped support job. Any send delegation must be explicit, current,
  audience-bound, time-limited, and separately authorized.
- **Attribution:** The receipt must distinguish P-001's request, P-001's
  approval, P-003's execution attempt, and P-006 as recipient.
- **Accountability:** P-001 can reject or edit the draft; support operations
  can stop the workflow; security can revoke the connector/service capability.

Approval would be handled by `pm-ai-approval-to-flow`, but approval alone must
not expand P-002's permissions. The execution service must re-check identity,
scope, target, policy version, and permission immediately before sending.

## Capability and scope boundary

| Capability | Principal | Scope | Allowed | Denied | Evidence |
| --- | --- | --- | --- | --- | --- |
| Read approved policy | P-004 via P-003 | Current tenant policy index | Current policy sections with source/version | Web-wide search, hidden admin policy, other tenants | Proposed; not run |
| Read account context | P-005 via P-003 | One authorized customer account | Minimum fields needed for the draft | Credentials, unrelated accounts, bulk export | Proposed; not run |
| Draft reply | P-002 | One support job | Produce a draft with source and freshness | Claim to be the agent, send, refund, change account | Proposed; not run |
| Approve reply | P-001 | One reviewed message and recipient | Accept, edit, reject, defer | Approve a changed target under an old receipt | Proposed; not run |
| Send reply | P-003 after current approval | One recipient and tenant | Execute the approved message once | Broad mailbox access, recipient change, silent retry | Hold; not run |
| Refund or permission change | No candidate principal | None | None | All routes | Explicitly out of scope |

The safest v0 may keep send manual. It should not issue P-002 a general user
token simply because the support agent initiated the request.

## Credential, session, and revocation lifecycle

Credential values are not supplied and must never be pasted into this packet.
The policy still needs to define:

```text
requested -> issued to a named audience -> active for one scope
-> expired, rotated, or revoked -> blocked or reconciled
```

Required metadata is proposed but not run: audience, scope class, issuer,
policy version, issued time, expiry, session binding, revocation owner,
rotation reason category, and last protected operation. Logout, tenant removal,
connector compromise, policy change, suspected leak, and service disable must
fail closed or route to manual work.

## Tenant, failure, and recovery states

| State | Visible result | Safe recovery |
| --- | --- | --- |
| Agent authenticated but not authorized to send | `Draft only — manual send required` | Keep the draft; do not ask for a broader token |
| Wrong tenant/account | `Access blocked` | Verify account and hand off to the access owner |
| Approval stale after target change | `Review required again` | Invalidate and re-approve the new target |
| Credential expired or revoked | `Connection unavailable` | Re-authenticate through the approved path or continue manually |
| Tool output asks for a credential | `Untrusted instruction blocked` | Quarantine the output and preserve the original boundary |
| Send result unknown | `Send status unconfirmed` | Reconcile by receipt before any retry |
| Emergency stop | `Workflow disabled` | Revoke/rotate and reopen affected jobs with support operations |

## Audit receipt and release gate

The receipt should include safe categories for request ID, requesting
principal, delegating principal, approving principal, executing principal,
tenant/account scope class, operation, policy version, decision, effect status,
expiry/revocation state, and recovery owner. It must not contain tokens, raw
customer content, private URLs, or authorization headers.

**Release decision:** `Hold`. The fixture has no real identity provider,
permission test, cross-tenant negative test, revocation test, audit event, or
completed customer message.

## Not covered

- an identity provider, OAuth/OIDC configuration, API key, token, or secret;
- legal role requirements or enterprise access policy;
- real customer data, support transcripts, or production tenant state;
- model quality, delivery reliability, security certification, or adoption;
- proof that delegated agent access increases support productivity or stars.
