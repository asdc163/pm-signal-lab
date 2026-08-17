# First run: turn a policy-draft uncertainty into a usable state contract

This is a **fictional fixture**. It is a prompt to exercise the workflow, not
evidence of model quality, user comprehension, human trust, production safety,
or adoption.

## Request

> We are designing an AI assistant that drafts replies about annual-plan
> cancellations. It can retrieve the current policy, but account eligibility
> is sometimes missing, two policy versions can disagree, and the policy API
> can time out. A support agent must review before anything is sent. Define the
> user-visible uncertainty states, controls, recovery, and evaluation plan for
> a read-only pilot.

## Work the packet

Use `$pm-ai-uncertainty-to-experience` and return:

1. the user job, decision owner, risk/reversibility, evidence boundary, and
   `Ship`/`Pilot`/`Hold` rule;
2. a capability, evidence, policy, completion, and state ledger;
3. concrete first-run, empty, loading, partial, clarification,
   source-unavailable, conflict, approval/diff, success, error, retry, cancel,
   timeout, handoff, and recovery states;
4. plain user-facing messages that say what is known, missing, blocked, and
   available next without showing a fake confidence percentage or simulated
   reasoning;
5. the provenance, receipt, preservation, idempotency, permission, and
   rollback requirements for each high-risk route;
6. positive, negative, mismatch, recovery, high-risk, mobile, accessibility,
   and locale evaluation slices for comprehension and calibrated trust;
7. an explicit `## Not covered` section and one smallest evidence-producing
   action.

Keep live provider behavior, real reviewer results, user research, model
quality, traffic, adoption, and production readiness `Not run` unless direct
evidence is supplied. Do not include raw tickets, account IDs, secrets, hidden
prompts, private URLs, or hidden reasoning.

## Not covered

- No provider, model version, policy system, real support agent, or customer
  record is available in this fixture.
- No live source retrieval, timeout rate, task completion, comprehension,
  trust calibration, accessibility session, or locale review was run.
- No provider, UI implementation, release approval, or production rollout is
  implied.
