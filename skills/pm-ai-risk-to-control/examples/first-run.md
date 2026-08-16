# First run: review a support refund agent before launch

This is a fictional fixture. It contains no real customer, model, provider,
account, policy URL, trace, or production evidence.

Copy the input below into an AI PM workflow:

> We are considering a support assistant that drafts refund replies and can
> prepare a billing handoff. It sees a customer message, plan metadata, and a
> policy source ID. It must not promise a refund or execute a money movement.
>
> A reviewer noticed a draft that said, “Your annual plan is eligible for an
> immediate refund,” even though the plan date and policy source had not been
> checked. The reviewer manually changed it to, “I need to verify the plan date
> and applicable policy before promising a refund.”
>
> Decide whether this can ship, pilot, hold, or needs more evidence. Map the
> hazard, harm, affected asset, preventive/detective/corrective controls,
> control oracles, residual risk, fallback, rollback trigger, and one review ask.
> Keep every missing field explicit.

Expected output shape:

1. `## Decision on the desk`
2. `## User, asset, and trust boundary`
3. `## Evidence and source ledger`
4. `## Hazard and harm map`
5. `## Risk and control register`
6. `## Negative routes and trust states`
7. `## Control verification and residual risk`
8. `## Release, fallback, and rollback`
9. `## Not covered`
10. `## Review ask`

Minimum evidence boundary:

- Treat the unsupported refund promise as an observed fictional behavior, not
  proof of a model root cause or support-wide prevalence.
- Require a plan-specific policy reference, a deterministic check for required
  fields, and a human billing route before claiming the control is verified.
- Keep the monetary action outside the assistant's authority and state what
  happens if policy data is missing, stale, conflicting, or unavailable.
- A reasonable first decision is `Hold` or `Need evidence` until the control
  oracle and rollout/rollback owner are confirmed.

## Not covered

- No real customer content, refund policy, account state, provider behavior,
  model output, trace, or execution was supplied.
- No probability, severity score, prevalence, safety certification, compliance
  review, adoption, traffic, or star impact is established.
- No control is verified merely because it appears in the proposed register.

## Review ask

Ask the authorized support and billing owners: `Hold` until the policy oracle,
required-field check, handoff owner, and rollback trigger are confirmed; or
provide the missing evidence that would support a bounded pilot.
