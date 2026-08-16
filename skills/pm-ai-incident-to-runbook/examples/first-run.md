# First run: approval states stuck in a support-draft journey

This is a **fictional fixture** for learning the skill. It is not a production
incident, customer report, uptime measurement, or proof that a real system is
safe.

## Incident decision on the desk

- **Review ask:** `Contain`
- **User job:** A support agent needs a reviewable answer draft before sending
  a response.
- **Current workaround:** Draft the answer manually from the approved policy
  page; do not send the AI draft automatically.
- **Proposed severity:** `Sev2` because the assisted draft step is degraded but
  a manual path remains. This severity is proposed, not confirmed.
- **Decision owner:** Support platform owner with the policy owner as reviewer.
- **Evidence status:** Internal synthetic observations only.
- **Decision change:** A missing receipt or evidence of an external send would
  raise the risk and require an authorized incident path.

## Critical journey and impact

| Step | Expected | Fixture evidence | Status |
| --- | --- | --- | --- |
| Receive request | A support request has a safe internal ID | `I-007` and `R1` | Observed in fixture |
| Draft answer | AI returns a reviewable draft | `R2` stays pending | Observed in fixture |
| Approval | Reviewer can approve or reject the draft | `R2` has no completion event | Observed in fixture |
| Send | Only an approved draft can be sent | No send receipt in `R3` | Observed in fixture |
| Fallback | Agent can write manually | Manual policy route in `F1` | Proposed |

The affected journey is “support agent gets a reviewable answer draft.” The
fixture groups three pending runs after a policy/configuration update, but it
does not provide a denominator, a real duration, or a production query. The
blast radius, prevalence, user count, and cause are `Not measured`.

## Evidence timeline

| ID | Evidence | What it supports | What it does not prove |
| --- | --- | --- | --- |
| `I-007` | Synthetic incident note | A possible shared journey signal | A real incident or prevalence |
| `R1` | Sanitized request state | The support-draft route was selected | That the model caused the issue |
| `R2` | Three synthetic runs in `awaiting_approval` | A stuck approval state is possible | That all users or runs are stuck |
| `R3` | No fictional send receipt | No send receipt is present in the fixture | That no side effect happened in a real system |
| `F1` | Manual policy-draft fallback | A safe workaround can be proposed | That the fallback was tested |
| `C1` | Policy/config boundary changed | A version boundary to compare | Causality |

## Severity and containment

- **Proposed impact:** The assisted draft path may delay support work. An
  unknown approval or send state could create a higher-risk action if someone
  retries blindly.
- **Proposed containment:** Pause new AI drafts on the affected policy/config
  boundary, stop automatic sends, preserve pending run states, and route new
  requests to manual drafting.
- **Frequency:** `Not measured`; the three runs are a fixture sample, not a
  population count.
- **Blocked action:** Do not resume, retry, or replay `R2` until a receipt is
  reconciled by the authorized owner.
- **Move to recovery when:** The owner confirms the run inventory, side-effect
  boundary, last-known-good configuration, and manual fallback owner.

## Recovery runbook

1. Inventory pending and timed-out support-draft runs by workflow, policy
   version, state, and receipt. Capture the query boundary in the private
   incident record.
2. Mark runs without a receipt as `Unknown`; keep automatic send disabled and
   do not replay them.
3. Reconcile any possible approval or send side effect through the approved
   support record path. Record the receipt or exception ID.
4. Restore the last-known-good policy/configuration boundary, or keep the AI
   route disabled if the owner cannot establish one.
5. Verify the manual fallback with a redacted support case and verify that the
   send action remains human-controlled.
6. Run three representative non-production cases through the bounded route;
   capture approval state, final state, trace ID, and no-side-effect evidence.
7. Hand the packet to the owner for the `Verify` decision. Any missing receipt,
   unexpected send, or stuck approval keeps the route contained.

## Communication boundary

This fixture supports an internal draft only. It does not authorize a customer
notice, public status update, reliability claim, or statement that the incident
is resolved. Approved facts are limited to the synthetic evidence above. The
support platform owner must authorize any affected-user communication.

## Verification and reopen gate

The reopen gate is `proposed` and `not run`:

- pending states have a receipt or an owner-recorded exception;
- no automatic send occurs without an approved state;
- three bounded non-production cases complete the journey;
- manual fallback is available and understood by the owner;
- trace IDs cover route, approval, final state, and side-effect receipt;
- the owner records an abort rule for any new stuck or unknown state.

## Learning writeback

Link the incident packet to the proposed regression case `REG-SUPPORT-001`
from the trace-to-regression workflow. Add a release gate for approval-state
durability and a telemetry field for side-effect receipts. These are proposed
follow-ups; no code, telemetry, or regression execution occurred in this
fixture.

## Not covered

- No real traces, customers, production environment, provider, or deployment
  were inspected.
- No side-effect receipt was reconciled.
- No containment, rollback, manual fallback, or bounded case was executed.
- No frequency denominator, duration, prevalence, adoption, safety, or
  reliability measure exists.
- No public or affected-user communication was sent.
- Root cause, recovery, and reopen status are `Unknown` or `Not run`.
