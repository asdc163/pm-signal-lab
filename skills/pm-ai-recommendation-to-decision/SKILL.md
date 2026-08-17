---
name: pm-ai-recommendation-to-decision
description: Use when an AI product presents a recommendation, ranking, triage suggestion, or plan that a person may accept, edit, reject, defer, compare, or hand off. Produce a source-bounded recommendation-to-decision contract that keeps evidence, uncertainty, user choice, and consequential execution separate.
---

# PM AI Recommendation to Decision

## When to use

Use this skill when a PM needs to design or review the step after an AI
recommendation appears and before a person makes a product decision.

Good triggers include:

- an AI triage, prioritization, ranking, planning, or review suggestion;
- a copilot that proposes a next step but should preserve human judgment;
- a product team treating recommendation views, clicks, or acceptance as
  proof of correctness or value;
- a flow that needs explicit inspect, accept-as-proposal, edit, reject,
  defer, compare, manual, or abstain states;
- a consequential next step that must remain separate from recommendation
  display and user choice.

Do not use this as a model benchmark, citation implementation, interface
component catalog, external-action approval flow, or first-use activation
plan. Route those needs to the adjacent skill and keep this contract focused on
the human decision boundary.

Keep the boundary explicit: `pm-ai-output-to-interface` owns how a result is
rendered; `pm-ai-uncertainty-to-experience` owns user-visible uncertainty
states; `pm-ai-claim-to-citation` owns claim and source entailment;
`pm-ai-approval-to-flow` owns permission and consequential execution; and
`pm-ai-first-use-to-activation` owns value after the user has selected a
capability or proposal. This skill owns the recommendation-to-human-decision
contract between those surfaces.

## Workflow

1. **Frame the decision, not only the suggestion.** Record the user job,
   decision owner, decision deadline, consequence level, affected people or
   records, and what “better decision” means. Separate the recommendation from
   the action that might follow it.

2. **Write the recommendation contract.** State the recommendation in plain
   language, its alternatives, supporting evidence, missing evidence,
   freshness, assumptions, known conflicts, and a calibrated uncertainty label
   only when a calibration method exists. Never use a confidence number as a
   substitute for evidence or user choice.

3. **Define the decision surface.** Specify what a person can inspect, ask,
   compare, accept as a proposal, edit, reject, defer, or hand to a manual
   route. Make the default explicit. Silence, a view, or a click is not
   acceptance unless the product has a separately justified and observable
   decision contract.

4. **Separate choice from execution.** `Accept as proposal` means the user
   selected or edited a recommendation; it does not authorize a consequential
   external action. If a record update, message, payment, permission change,
   or other side effect follows, hand off to `pm-ai-approval-to-flow` and
   preserve a receipt for the separate execution step.

5. **Design honest states and recovery.** Cover ready, evidence gap,
   conflicting evidence, stale context, no recommendation, disagreement,
   edit, reject, defer, manual comparison, downstream failure, correction,
   and resume. Tell the user what happened, what did not happen, and what they
   can do next.

6. **Evaluate slices before rollout.** Include clear positive cases, negative
   or benign lookalikes, ambiguous jobs, low-evidence cases, conflicting
   evidence, overconfident wording, stale context, user disagreement, and
   high-consequence requests. Define an observable oracle and denominator for
   each slice; do not invent recommendation quality from one happy path.

7. **Record privacy-safe evidence.** Distinguish `eligible`, `exposed`,
   `inspected`, `choice_made`, `proposal_edited`, `manual_route`,
   `execution_approved`, `executed`, `outcome_observed`, and `recovered`.
   Store stable fixture or case identifiers, slice, state, choice, and result
   status—not raw prompts, customer text, credentials, sensitive attributes,
   or private URLs.

8. **Make the release decision.** State what was verified, what remains
   `Not run`, the smallest pilot audience, guardrails, rollback trigger,
   owner, observation window, and the rule for `Ship | Pilot | Hold | Need
   evidence`. A user selecting a recommendation is not proof that it was
   correct or useful.

## Output contract

Return an `AI Recommendation to Decision Contract` with these sections:

1. **Decision frame:** user/job, decision owner, consequence level, timing,
   affected parties, downstream action, and product-specific success oracle.
2. **Recommendation:** exact proposal, alternatives, scope, assumptions,
   evidence links or IDs, freshness, conflicts, unknowns, and uncertainty
   expression. Mark unsupported fields `Not provided` rather than guessing.
3. **Decision choices:** inspect, ask, compare, accept as proposal, edit,
   reject, defer, manual route, and abstain. For every choice state the next
   visible state, whether the user can undo it, and what it does not authorize.
4. **State and copy matrix:** ready, evidence gap, conflict, stale, no result,
   disagreement, edit, reject, defer, approval handoff, execution failure,
   recovery, mobile, and accessibility. Keep user-facing wording literal and
   free of hidden persuasion.
5. **Side-effect boundary:** identify every external or consequential action,
   required permission, separate approval surface, cancellation point, durable
   receipt, and manual fallback. Never collapse recommendation into execution.
6. **Evaluation plan:** positive, negative, ambiguous, low-evidence,
   conflicting, stale, overconfident, high-consequence, and benign-lookalike
   slices; fixture or sampling method; oracle; denominator; reviewer or user
   evidence; guardrails; and failure classification.
7. **Decision receipt:** use privacy-safe fields such as `case_id`, `slice`,
   `recommendation_id`, `evidence_state`, `freshness_state`, `surface_state`,
   `choice`, `edited`, `manual_route`, `approval_state`, `execution_state`,
   `outcome_state`, `recovery_state`, `observed_at`, and `evidence_status`.
   Do not include raw content or secrets.
8. **Rollout and learning:** pilot audience, exposure/inspection/choice/
   execution/outcome denominators, observation window, guardrails, rollback,
   feedback route, and one next decision. Keep adoption, quality, causality,
   and GitHub growth as separate claims.
9. **Release decision:** `Ship | Pilot | Hold | Need evidence`, with the
   exact proof behind the decision and an explicit `Not run` / `Blocked` list.

Use these evidence labels consistently:

- `Verified`: directly observed in the named environment or check.
- `Fictional fixture`: deterministic material for inspecting the workflow.
- `Assumption`: a design hypothesis that still needs evidence.
- `Not run`: the check or user route has not been executed.
- `Blocked`: a named dependency prevents execution.
- `Not covered`: deliberately outside this contract.

## Edge cases

- **Overconfident recommendation:** replace unsupported certainty with the
  evidence, limit, or abstention condition; do not merely lower a percentage.
- **Conflicting evidence:** show the conflict, its freshness, and a manual or
  comparison route. Do not average incompatible facts into false precision.
- **Missing context:** request the smallest non-sensitive missing fact or
  abstain. Do not infer a user preference or consent from silence.
- **Stale recommendation:** expose the last-known time and re-check rule;
  avoid presenting an old proposal as current.
- **User disagreement:** let the user reject, edit, or explain the mismatch
  without a pressure loop. A disagreement is a learning case, not an automatic
  model failure or user error.
- **High-consequence decision:** require a named decision owner, evidence
  review, reversible route where possible, and a separate approval/permission
  boundary before execution.
- **Benign lookalike:** a request with similar words but a different job must
  not receive the recommendation merely because a keyword matched.
- **No result or tool failure:** say that no recommendation was produced and
  preserve the manual route. Do not fabricate a fallback recommendation.
- **Duplicate choice or retry:** reconcile the latest receipt before showing a
  second proposal or repeating an execution handoff.
- **Sensitive inference:** do not expose or log inferred sensitive attributes
  as a reason for the recommendation; minimize the evidence shown to the user.
- **Dark pattern:** do not make accept more prominent by hiding reject, edit,
  defer, or manual alternatives, and do not use urgency that the evidence does
  not support.
- **First-use confusion:** a user selecting a proposal is not first value. If
  the next product job is activation, hand off to
  `pm-ai-first-use-to-activation`.
- **Fictional fixture:** label fictional inputs and outputs at the point of
  use. Never turn a worked example into a live quality, adoption, or star
  claim.

## Final check

Before returning the contract, confirm:

- the user job and decision owner are explicit;
- the recommendation is separate from evidence, uncertainty, alternatives,
  user choice, execution, and outcome;
- inspect, accept-as-proposal, edit, reject, defer, manual, and abstain paths
  are visible where the job permits;
- every consequential action has a separate approval/permission boundary;
- missing, conflicting, stale, and unsupported evidence have honest states;
- the evaluation has positive, negative, ambiguous, and mismatch slices with
  observable oracles and denominators;
- receipts are privacy-safe and separate exposure, choice, execution, and
  outcome;
- rollout, rollback, recovery, `Not run`, `Blocked`, and `Not covered` are
  stated;
- no line claims that a recommendation is correct, adopted, production-ready,
  or capable of increasing GitHub stars without direct evidence.
