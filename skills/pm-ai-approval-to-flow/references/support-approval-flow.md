# Worked reference: support reply approval flow

This is a **fictional fixture** that shows a complete approval-flow packet for a
support reply. It is not a live permission design, production incident, user
study, or claim that an AI sender is safe.

## Contents

- [Decision and user job](#decision-and-user-job)
- [Evidence boundary](#evidence-boundary)
- [Action risk map](#action-risk-map)
- [Preview and approval](#preview-and-approval)
- [State machine](#state-machine)
- [Permission and receipt contract](#permission-and-receipt-contract)
- [Failure and recovery](#failure-and-recovery)
- [Evaluation and release gate](#evaluation-and-release-gate)
- [Implementation handoff](#implementation-handoff)
- [Not covered](#not-covered)

## Decision and user job

**Decision:** `Test` a human-confirmed send flow for one support reply. The AI
may prepare a draft and surface policy evidence. It may not send the reply
without a current approval for the exact recipient and content.

**User job:** A support lead wants to answer a request quickly while retaining
control of wording, policy basis, destination, and the final send action.

**Current workaround:** The lead copies a reviewed draft into a support console
and sends it manually. The workaround is slower but keeps the action boundary
visible.

**Fixture scope:** Request `REQ-017`, policy `POL-4`, draft `DRAFT-017`, and a
single recipient reference. IDs are fictional and contain no customer data.

**Owner:** The support lead owns the content decision; the support-platform
owner owns permission, execution, and receipt reconciliation.

## Evidence boundary

| ID | Type | Observation | Limitation |
| --- | --- | --- | --- |
| `REQ-017` | Fictional request | Establishes the intended support job | Not a demand signal |
| `POL-4` | Fictional policy | Provides a source and version field | Not a production policy |
| `DRAFT-017` | Fictional output | Shows what a reviewer could inspect | Not a model-quality result |
| `PERM-017` | Proposed permission | Defines least-privilege scope | Not a granted permission |
| `RCPT-017` | Proposed receipt | Defines completion evidence | Not proof of send |

Observed behavior, reproduced behavior, production evidence, and real-user
feedback are `Not provided`. The packet is a proposed design and a structural
fixture only.

## Action risk map

| Action | Preparation or execution | Target | Consequence | Reversible? | Proposed control |
| --- | --- | --- | --- | --- | --- |
| `A1` | Prepare | One support request | Bad draft could waste review time | Yes | AI draft plus source |
| `A2` | Validate | One recipient and policy version | Wrong target or stale basis | Yes | Deterministic checks |
| `A3` | Approve | Exact content and target | Human authorizes external send | No reliable recall | Current explicit approval |
| `A4` | Execute | One send request | Message may reach recipient | Provider-dependent | Idempotency and receipt |

The action is proposed as autonomy level `3 Act with confirmation`. A policy
could support a different level only after a separate risk, permission,
evaluation, and rollback decision. The label itself is not evidence.

## Preview and approval

The preview must display the same values that execution will receive:

1. target reference and destination class;
2. subject and body in an editable diff;
3. policy ID, version, freshness, and missing-source state;
4. links, attachments, scheduling, cost, and any external side effect;
5. the action expiry and the consequence of sending;
6. `Approve send`, `Edit`, `Reject`, `Defer`, `Cancel`, and manual fallback.

The primary action must say what it does. `Approve send` is clearer than
`Continue`. The approval text should say:

> Send this exact version to this exact recipient in this one-action scope.

An edit, target change, source refresh, policy change, permission change, or
expiry invalidates the approval. The user sees `Needs review` again and a new
approval ID is created.

## State machine

```text
Draft
  -> Needs review
      -> Edited -> Needs review
      -> Rejected
      -> Deferred -> Needs review
      -> Approved
          -> Executing
              -> Completed (receipt reconciled)
              -> Failed (known error)
              -> Partially completed (some result known)
              -> Unknown (receipt missing; replay blocked)
```

| State | Meaning | Required evidence | Safe next action |
| --- | --- | --- | --- |
| `Draft` | Content is being prepared | Draft ID and source IDs | Preview |
| `Needs review` | A current proposal awaits a decision | Target, diff, version, expiry | Approve, edit, reject, defer |
| `Edited` | Reviewer changed the proposal | New content hash | Re-preview |
| `Approved` | Current owner approved one exact action | Approval ID and hash | Permission and execution |
| `Executing` | Request is in flight | Action ID and idempotency key | Wait or reconcile |
| `Completed` | External result is reconciled | Receipt and timestamp | Continue |
| `Failed` | Known failure prevented completion | Error category | Manual fallback or repair |
| `Partially completed` | Some effects are known | Partial receipt and exception | Stop dependent actions |
| `Unknown` | Effect cannot yet be established | Reconciliation task | Block replay |

The UI must not show a green “sent” confirmation for an accepted or queued
request without a completion receipt. The owner may close an exception only
after checking the approved record path.

## Permission and receipt contract

The proposed action envelope is:

```yaml
action:
  action_id: A4-017
  approval_id: unique-per-exact-version
  trace_id: linked-redacted-trace
  actor_role: support-lead
  target: customer_ref_017
  scope: one-reply
  policy_version: POL-4
  content_hash: hash-of-reviewed-body
  expires_at: proposed-review-window
  idempotency_key: one-send-attempt
  allowed_effect: send-one-reply
  denied_effects: [batch-send, delete, access-change, payment]
  receipt:
    status: accepted | executed | failed | partial | unknown
    external_reference: redacted-or-not-provided
    observed_at: timestamp-or-not-provided
    reconciled_by: owner-or-not-provided
```

The permission is scoped to one action. It is not a general agent credential.
Audit events should capture proposal, preview, edit, approval, invalidation,
permission check, execution request, receipt, rejection, defer, and recovery.
Raw content and personal identifiers stay outside the public packet.

## Failure and recovery

| Failure | Visible state | Blocked action | Recovery |
| --- | --- | --- | --- |
| Missing target | `Need evidence` | Approve and execute | Ask the owner to identify the target |
| Stale policy | `Source refresh required` | Approve old draft | Refresh, diff, and review again |
| Material edit | `Needs review` | Execute old approval | Recompute hash and require approval |
| Permission denied | `Not sent` | Retry under another identity | Use authorized manual path |
| Timeout without receipt | `Unknown` | Replay | Reconcile external record first |
| Duplicate request | `Held` | Send a second request | Check idempotency and record |
| Partial effect | `Partially completed` | Continue dependent actions | Preserve receipt and escalate |
| User cancels | `Cancelled` | Execute | Preserve draft only if permitted |

If the owner cannot establish whether a side effect happened, the correct
status is `Unknown`. Recovery is a reconciliation decision, not a prompt tweak.

## Evaluation and release gate

The smallest proposed evaluation uses six fictional cases:

- current source and clear target;
- material edit after preview;
- stale source;
- ambiguous target;
- timeout with no receipt;
- duplicate request with the same idempotency boundary.

| Measure | Proposed oracle | Status |
| --- | --- | --- |
| Approval comprehension | Reviewer can state target, version, consequence | Not run |
| Approval invalidation | Edited proposal cannot execute under old approval | Not run |
| Permission boundary | Denied effect never reaches execution request | Not run |
| Receipt integrity | No completion state without reconciled receipt | Not run |
| Recovery | Unknown state blocks replay and names owner | Not run |
| Accessibility | Keyboard and semantic status expose decision states | Not run |

Promotion remains `Hold` until the authorized owner reviews the cases, the
deterministic state and permission checks pass, the human review path is
tested, and rollback or disable behavior is recorded. No real provider or
external action was run for this fixture.

## Implementation handoff

The smallest implementation packet would include:

1. a state model with durable IDs and explicit terminal/unknown states;
2. a preview component that exposes target, diff, source, freshness, and
   side effects;
3. an action envelope with scoped permission and idempotency key;
4. a receipt schema and reconciliation owner;
5. negative tests for stale source, edited approval, denied permission,
   timeout, duplicate, and partial result;
6. keyboard, semantic-status, and manual-fallback checks;
7. a kill switch or disable route that preserves pending and unknown states.

This handoff authorizes no implementation, permission grant, provider call, or
customer communication.

## Not covered

- No live support platform, provider, permission, recipient, or customer data
  was accessed.
- No approval, send, receipt, timeout, duplicate, rollback, or recovery action
  was executed.
- No human reviewer comprehension, trust, usability, accessibility,
  localization, cost, latency, security, safety, reliability, adoption, or
  production evidence exists.
- No model or provider quality, policy correctness, recall behavior, or
  idempotency behavior is verified.
- No public status, customer message, issue assignment, or external side
  effect occurred.
