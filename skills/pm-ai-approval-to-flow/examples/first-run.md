# First run: approval before sending a support reply

This is a **fictional fixture** for learning the skill. It is not a real
customer request, production workflow, provider result, or proof that an
approval design is safe.

## Decision on the desk

- **Review ask:** `Test`
- **User job:** A support lead wants to send a policy-grounded reply without
  losing control of the recipient, wording, or final action.
- **Proposed action:** Send one support reply after a human review.
- **Current workaround:** Copy the reviewed draft into the approved support
  console and send it manually.
- **Proposed autonomy:** `3 Act with confirmation`; the AI may prepare and
  validate a draft, but it may not send without a current approval.
- **Decision owner:** Support lead for the content and support-platform owner
  for the execution boundary.
- **Evidence status:** Fictional fixture only; no live permission or receipt.

## User job and action

| Step | Action | State-changing? | Owner |
| --- | --- | --- | --- |
| 1 | Read the sanitized request `REQ-017` | No | AI may assist |
| 2 | Retrieve policy source `POL-4` | No | AI may cite |
| 3 | Draft reply `DRAFT-017` | No | AI prepares; lead reviews |
| 4 | Show recipient, content, source, and send consequence | No | Product must show |
| 5 | Approve, edit, reject, defer, or cancel | Decision | Support lead |
| 6 | Send the approved version | Yes | Authorized send path |
| 7 | Record external receipt | Yes | System and owner reconcile |

The target is a fictional customer reference `customer_ref_017`; it is not an
email address. The action scope is one reply, one recipient, and one current
policy version. A manual send remains available if the AI route is disabled.

## Evidence boundary

| ID | Evidence | Supports | Does not prove |
| --- | --- | --- | --- |
| `REQ-017` | Sanitized fictional request | A support reply is the intended job | Real demand or customer impact |
| `POL-4` | Fictional policy excerpt | A source can be displayed with freshness | Policy correctness in production |
| `DRAFT-017` | Fictional draft | A preview can show content before approval | Model quality or safe wording |
| `PERM-017` | Proposed permission record | The send action needs a scoped owner | A real permission grant |
| `RCPT-017` | Receipt field definition | Completion requires a durable receipt | That a message was sent |

## Action and risk map

| ID | Stage | Consequence | Reversibility | Autonomy | Stop condition |
| --- | --- | --- | --- | --- | --- |
| `A1` | Prepare draft | Misleading content may be reviewed | Editable | 1 | Missing source or unclear request |
| `A2` | Validate recipient and source | Wrong target or stale policy | Reversible | 1 | Target or version is unknown |
| `A3` | Approve send | A message may be sent externally | Not reliably reversible | 3 | Any material edit or missing preview |
| `A4` | Execute send | Recipient may receive the reply | Provider-dependent | 3 | Permission, idempotency, or receipt gap |

## Preview and approval contract

Before `Approve send`, show:

- recipient label `customer_ref_017` and destination class;
- exact subject and body with an editable diff;
- source `POL-4`, policy version, and freshness status;
- attachments, links, side effects, and whether a reply can be recalled;
- the approval wording: “Send this exact version to this recipient now”;
- `Edit`, `Reject`, `Defer`, `Cancel`, and manual fallback actions;
- approval expiry and the rule that any material edit creates a new approval.

The approval authorizes one exact action only. It does not authorize future
replies, a different recipient, a refreshed policy version, or a batch send.

## State model and transitions

| State | Entry | Required evidence | Next safe actions |
| --- | --- | --- | --- |
| `Draft` | AI prepares `DRAFT-017` | Draft ID and source ID | Review or revise |
| `Needs review` | Preview is ready | Target, diff, source, expiry | Approve, edit, reject, defer |
| `Edited` | Lead changes content | New content hash | Re-preview and re-approve |
| `Approved` | Lead approves exact version | Approval ID and version hash | Permission check and execute |
| `Executing` | Authorized request sent | Action ID and idempotency key | Wait for receipt |
| `Completed` | External receipt reconciled | Receipt `RCPT-017` | Continue or record learning |
| `Failed` | Deterministic failure returned | Error category and action ID | Manual fallback or owner repair |
| `Unknown` | Timeout or missing receipt | Reconciliation task | Block replay; owner checks record |
| `Rejected` | Lead declines | Rejection reason category | Revise, defer, or manual path |
| `Deferred` | Lead postpones | Expiry and owner | Re-open with fresh review |

The fixture does not authorize any real transition. A missing receipt keeps the
action at `Unknown`, not `Completed` or `Retryable`.

## Permissions, audit, and receipt

Proposed fields:

- `action_id`: `A4-017`;
- `approval_id`: unique to the exact content, recipient, policy, and expiry;
- `trace_id`: links draft, preview, approval, permission, and execution;
- `actor`: redacted owner role, not a raw email;
- `policy_version`: `POL-4`;
- `idempotency_key`: one send attempt for this action;
- `receipt`: provider status, external reference if safe, timestamp, and
  reconciliation status;
- `audit`: approve/edit/reject/defer events with version hashes.

The permission is limited to one support reply, one recipient, and one expiry
window. No batch, delete, access change, or payment permission is included.

## Failure, recovery, and escalation

| Failure | User-visible state | Safe recovery | Owner |
| --- | --- | --- | --- |
| Stale `POL-4` | Source needs refresh | Re-fetch through approved path and re-preview | Policy owner |
| Recipient unclear | `Needs evidence` | Ask lead to identify target; do not guess | Support lead |
| Lead edits body | `Needs review` | Invalidate old approval and create new hash | Product/system |
| Permission denied | `Not sent` | Use manual support console or escalate | Platform owner |
| Timeout, no receipt | `Unknown` | Reconcile record; block replay | Platform owner |
| Duplicate request | `Held for reconciliation` | Check idempotency and external record | Platform owner |
| Partial provider result | `Partially completed` | Preserve receipt and stop dependent actions | Incident owner |

## Smallest evaluation and release gate

The proposed evaluation is `Not run` and uses six fictional cases:

1. normal draft with current source;
2. material body edit invalidates approval;
3. stale policy blocks approval;
4. ambiguous recipient blocks execution;
5. timeout produces `Unknown` and prevents replay;
6. duplicate request uses the same idempotency boundary.

Primary measure: a reviewer can identify the exact target, content version,
source freshness, and consequence before approving. Guardrails: no execution
without current approval, no replay from unknown receipt, no approval surviving
a material edit, and no raw customer data in the packet. Human review, keyboard
accessibility, privacy review, and provider receipt behavior remain untested.

## Not covered

- No model, provider, permission, send action, customer, or production record
  was accessed.
- No fictional case was executed; all states and receipts are proposed.
- No real reviewer comprehension, approval speed, error rate, safety, or
  adoption evidence exists.
- No provider idempotency or recall behavior is verified.
- No accessibility, localization, security, cost, latency, or rollback test ran.
- No public communication or external side effect occurred.

## Review ask

`Test` — the support platform owner should review the exact approval contract
and decide whether the six-case fictional evaluation is the smallest safe test.
