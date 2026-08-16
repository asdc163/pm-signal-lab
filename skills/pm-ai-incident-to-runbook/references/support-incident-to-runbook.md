# Worked reference: support approval incident packet

This is a **fictional fixture** showing the expected shape of an incident
packet. It is intentionally operationally specific while making no claim about
production behavior, real users, or adoption.

## Contents

- [Decision and scope](#decision-and-scope)
- [Impact map](#impact-map)
- [Timeline and evidence ledger](#timeline-and-evidence-ledger)
- [Containment](#containment)
- [Recovery runbook](#recovery-runbook)
- [Communication boundary](#communication-boundary)
- [Verification and reopen](#verification-and-reopen)
- [Learning writeback](#learning-writeback)
- [Not covered](#not-covered)

## Decision and scope

**Incident ID:** `I-007`

**Decision on the desk:** `Contain` the AI-assisted support-draft route while
the owner checks pending approvals and side-effect receipts.

**User job:** A support agent wants a policy-grounded answer draft that can be
reviewed before it is sent.

**Boundary:** Fictional support-draft workflow, policy/configuration boundary
`C1`, synthetic run IDs `R1` to `R3`, and an internal-only review packet.

**Current fallback:** Manual drafting from the approved policy source.

**Decision owner:** Support platform owner; policy owner confirms the safe
content path.

**Evidence posture:** `Proposed` and `Not measured`. This packet has no live
monitoring, production query, customer transcript, or external side effect.

## Impact map

| Journey element | Assessment | Evidence status |
| --- | --- | --- |
| Request intake | Route receives a support request | Observed in fictional fixture |
| AI draft | Draft may remain pending | Observed in `R1` to `R3` fixture states |
| Approval | Completion event is missing | Observed in fixture |
| Send | No receipt is available | Observed as missing, not proof of no side effect |
| Manual fallback | Policy page can support manual drafting | Proposed, not tested |
| Harm | Delay or unsafe retry if state is ambiguous | Risk hypothesis |
| Blast radius | Workflow/config boundary only | Not measured |
| Frequency | Three fixture runs | Not a denominator |

The impact is currently consistent with `Sev2`: the assisted path may be
partially degraded and a manual workaround is available. If an external send
or data-integrity issue is found, the owner must reassess severity.

## Timeline and evidence ledger

| Time | ID | Event | Status | Limit |
| --- | --- | --- | --- | --- |
| 09:00 | `C1` | Policy/configuration boundary changes | Observed | Does not prove causality |
| 09:04 | `R1` | Support request selects draft route | Observed | Does not prove a broad impact |
| 09:05 | `R2` | Approval remains pending | Observed | Fixture state only |
| 09:06 | `R3` | No send receipt is found | Missing receipt | Does not prove no send |
| 09:10 | `I-007` | Owner receives incident signal | Observed | Internal synthetic note |

**Trace and run fields:** provider, model, prompt, tool versions, environment,
and exact timestamps are `Not provided`. Raw content is not included.

## Containment

The owner should, after confirming the preconditions:

1. pause new AI drafts on `C1`;
2. stop automatic send actions for this route;
3. preserve pending and unknown run states;
4. route new requests to the manual policy fallback;
5. record the containment owner and review time in the private incident record.

The stop rule is “any missing receipt, unexpected side effect, or new stuck
approval keeps the route disabled.” No command, flag, provider call, or message
was executed for this reference.

## Recovery runbook

### Preconditions

- An authorized support platform owner is present.
- The private run inventory and approved record path are available.
- The manual fallback owner is identified.

### Steps and receipts

| Step | Owner action | Required receipt | Stop condition |
| --- | --- | --- | --- |
| 1 | Inventory pending, timed-out, and completed runs | Query boundary and run list | Unknown scope |
| 2 | Reconcile approval and send state | Record ID or exception ID | Any possible unverified side effect |
| 3 | Restore last-known-good boundary or keep route disabled | Config/version receipt | No trustworthy baseline |
| 4 | Verify manual fallback | Redacted review note | Fallback cannot be used safely |
| 5 | Run bounded non-production cases | Trace, final state, receipt | Stuck or unexpected state |
| 6 | Submit reopen packet | Owner sign-off | Missing gate evidence |

No step permits blind replay. A run without a side-effect receipt remains
`Unknown` until the approved owner reconciles it.

## Communication boundary

The only permitted artifact in this fixture is an internal review draft. It
does not authorize a public status page, customer email, postmortem, SLA claim,
or statement that no data or side effect was affected. The owner must replace
the synthetic facts with current, approved evidence before communicating.

## Verification and reopen

**Gate status:** `Proposed`, `Not run`.

Reopen requires all of the following:

- the affected run inventory is bounded and receipt reconciliation is complete;
- no automatic send occurs from an unapproved or unknown state;
- the manual fallback is available;
- three representative non-production cases complete with trace and final
  state evidence;
- the route, approval, final state, and side-effect receipt are observable;
- an owner records the abort rule, rollback mode, and review window.

The evidence must be fresh for the candidate version. A successful deployment,
configuration command, or old regression pass is insufficient.

## Learning writeback

Create a proposed link from `I-007` to `REG-SUPPORT-001`, add approval-state
durability to the AI evaluation slice, and add side-effect receipt coverage to
the release gate. The owner should record whether the next test is intended to
learn about state durability, policy compatibility, tool execution, or UX
legibility. The learning task is not implemented in this fixture.

## Not covered

- No live incident system, monitor, trace store, provider, model, or tool was
  accessed.
- No real containment, rollback, reconciliation, fallback, or reopen test ran.
- No production duration, denominator, frequency, prevalence, user count,
  reliability, safety, adoption, or star impact is known.
- No root cause is established; the configuration boundary is only a hypothesis
  boundary.
- No customer, public, legal, or regulatory communication was sent.
