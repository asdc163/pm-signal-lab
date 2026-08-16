# First run: hand off a refund question without losing the user job

This is a fictional fixture. It contains no real customer, model, provider,
account, policy URL, queue, transcript, or production evidence.

Copy the input below into an AI PM workflow:

> We are designing a support assistant that drafts refund replies. It can read
> a customer question and authorized plan metadata, but it cannot move money or
> decide eligibility. A billing specialist owns exceptions.
>
> The user asks, “Can I get a refund?” The plan date is missing. The policy
> source available to the assistant is stale, and a previous tool request timed
> out with no confirmed external state. The user says, “Please connect me with
> a person.”
>
> Design the handoff-to-recovery contract. Decide what the assistant must stop,
> what minimum packet can be sent to billing, what the user sees while waiting,
> who owns acknowledgement, what happens if billing is unavailable, and what
> evidence would allow the workflow to resume. Separate handoff, approval,
> identity, and resolution. Keep missing evidence explicit.

Expected output shape:

1. `## Decision on the desk`
2. `## User/job and AI boundary`
3. `## Handoff trigger and stop condition`
4. `## Handoff packet`
5. `## Destination, ownership, and permission`
6. `## User-visible state and recovery`
7. `## Verification and learning writeback`
8. `## Not covered`
9. `## Review ask`

Minimum evidence boundary:

- Treat the stale policy, missing plan date, and timed-out request as supplied
  fictional conditions, not proof of a real system failure.
- Do not promise refund eligibility, execute money movement, or claim that
  billing accepted or resolved the case.
- Include the user goal, missing evidence, source/version status, attempted
  action, uncertain external state, allowed/denied actions, redaction status,
  recipient, owner, acknowledgement, fallback, and return condition.
- A reasonable first decision is `Hold` or `Need evidence` until destination
  identity, policy freshness, timeout handling, packet schema, and recovery
  oracle are confirmed.

## Not covered

- No real customer, account, billing queue, policy, provider, model output,
  trace, tool response, permission, or human outcome was supplied.
- No response-time SLA, handoff acceptance, resolution rate, safety/security
  review, adoption, traffic, retention, or star impact is established.
- A transfer event, owner-written note, or proposed packet is not proof that the
  user job was resolved.

## Review ask

Ask the authorized support and billing owners: `Hold` until the packet,
destination/permission boundary, acknowledgement state, timeout fallback, and
resume oracle are verified; or provide the evidence required for a bounded
draft-only pilot.
