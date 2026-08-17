---
name: pm-ai-preference-to-personalization
description: Use when an AI product may adapt to a user's preference, custom instruction, memory, contextual fact, or inferred trait. Produce a source-bounded personalization control contract with type, purpose, scope, freshness, correction, deletion, opt-out, temporary use, conflict handling, evaluation, and safe fallback.
---

# PM AI Preference to Personalization

## When to use

Use this skill when a PM needs to design or review how a user preference or
context changes an AI product experience.

Good triggers include:

- custom instructions, saved preferences, memory, profile settings, or
  adaptive defaults;
- an AI answer, recommendation, or interface that changes because of prior
  context or a user’s stated working style;
- a product deciding whether a fact is one-off, durable, contextual, inferred,
  sensitive, or consent/permission-related;
- a need to explain why the experience changed and let the user edit, forget,
  pause, opt out, or use a temporary/no-personalization route;
- conflicts, stale preferences, shared workspaces, deletion requests, or
  concerns about inferred sensitive traits.

Do not use this as a memory store implementation, identity/authorization
system, data-lifecycle policy, recommendation design, or intent-routing plan.
Route those needs to adjacent skills and keep this contract focused on the
product control between a preference source and a personalized experience.

Keep the boundary explicit: `pm-ai-memory-to-policy` owns memory read/write
eligibility and poisoning boundaries; `pm-ai-data-to-purpose` owns data
purpose and lifecycle; `pm-ai-identity-to-boundary` owns principals and
authorization; `pm-ai-recommendation-to-decision` owns a user’s choice about a
recommendation; and `pm-ai-intent-to-discovery` owns capability routing. This
skill owns preference type, source, purpose, scope, freshness, control, and
personalization behavior.

## Workflow

1. **Frame the personalization job.** Record the user job, experience that may
   change, decision owner, affected people or workspace, consequence level,
   and product-specific success oracle. Separate personalization from consent,
   identity, authorization, and external action.

2. **Classify the source.** Label each input as a task-local instruction,
   explicit durable preference, contextual fact, inferred trait, constraint,
   sensitive detail, workspace policy, or consent/permission. Record whether
   the user supplied, edited, imported, or the system inferred it. Never turn
   silence or weak behavior into an explicit preference.

3. **Define purpose and scope.** State exactly why the source can change the
   experience, where it applies, which user/tenant owns it, what it must not
   affect, how long it lasts, and what happens in a temporary or
   no-personalization route.

4. **Make control visible.** Let the user inspect what was used, why it was
   used, and whether it was used once or saved. Provide edit, correct, forget,
   delete, pause, reset, opt out, and temporary controls with visible effects.
   Do not bury a meaningful control behind a generic settings page.

5. **Handle freshness and conflict.** Define source precedence, timestamps,
   expiry, contradiction, correction, and re-confirmation. A newer task-local
   instruction may override a durable preference for the task without changing
   the saved preference. When a conflict cannot be resolved safely, narrow the
   scope or abstain from personalization.

6. **Protect sensitive and shared context.** Minimize sensitive attributes,
   avoid inferring protected traits, bind preferences to the right account or
   tenant, and prevent one person’s preference from shaping another person’s
   experience. Keep personalization separate from permission to access or act.

7. **Evaluate slices before rollout.** Test explicit durable, one-off,
   contextual, conflict, stale, sensitive, inferred, correction, deletion,
   pause/opt-out, temporary, shared-context, and benign-lookalike cases. Define
   an observable oracle and denominator; a response that “feels tailored” is
   not evidence of correctness or value.

8. **Record privacy-safe evidence.** Distinguish `captured`, `classified`,
   `eligible`, `applied`, `corrected`, `forgotten`, `deleted`, `paused`,
   `opted_out`, `temporary_used`, and `outcome_observed`. Store source type,
   scope, state, version, and timestamp—not raw prompts, customer text,
   credentials, private URLs, or unnecessary sensitive attributes.

9. **Make the release decision.** State source coverage, host support, control
   evidence, propagation limits, fallback, pilot audience, guardrails,
   rollback, and `Ship | Pilot | Hold | Need evidence`. Personalization use is
   not proof that the preference is correct, consented, or valuable.

## Output contract

Return an `AI Preference to Personalization Contract` with these sections:

1. **Personalization frame:** user/job, experience, owner, consequence,
   affected scope, downstream action, and product-specific success oracle.
2. **Preference taxonomy:** task-local instruction, explicit durable
   preference, contextual fact, inferred trait, constraint, sensitive detail,
   workspace policy, consent/permission, and `Not provided` where unknown.
3. **Source and purpose ledger:** source owner, user-supplied versus inferred,
   purpose, eligible surfaces, forbidden uses, scope, retention/expiry,
   freshness, version, correction, deletion, and propagation limits.
4. **Precedence and conflict:** task versus durable preference, workspace or
   policy boundary, contradiction, stale state, re-confirmation, narrow scope,
   and abstention. Never hide the winning source.
5. **Control and copy matrix:** inspect source, explain why, use once, save,
   edit/correct, forget/delete, pause, reset, opt out, temporary/no-memory,
   restore, mobile, accessibility, and shared-context behavior.
6. **Safety boundary:** distinguish personalization from consent, identity,
   authorization, sensitive inference, recommendation correctness, and
   external action. Route those contracts to adjacent skills.
7. **Evaluation plan:** explicit, one-off, contextual, conflict, stale,
   sensitive, inferred, correction, deletion, pause/opt-out, temporary,
   shared-context, and benign-lookalike slices; fixture or sampling method;
   oracle; denominator; guardrails; and failure classification.
8. **Personalization receipt:** use privacy-safe fields such as `case_id`,
   `preference_id`, `source_type`, `source_owner`, `purpose`, `scope`,
   `sensitivity_state`, `freshness_state`, `control`, `personalization_state`,
   `propagation_state`, `tenant_state`, `outcome_state`, `observed_at`, and
   `evidence_status`. Do not include raw content or secrets.
9. **Rollout and learning:** host/version, fallback, audience, capture/eligible/
   apply/control/outcome denominators, observation window, guardrails,
   rollback, feedback route, and one next decision.
10. **Release decision:** `Ship | Pilot | Hold | Need evidence`, with exact
    proof and explicit `Not run` / `Blocked` / `Not covered` items.

Use these evidence labels consistently:

- `Verified`: directly observed in the named environment or check.
- `Fictional fixture`: deterministic material for inspecting the workflow.
- `Assumption`: a design hypothesis that still needs evidence.
- `Not run`: the check or user route has not been executed.
- `Blocked`: a named dependency prevents execution.
- `Not covered`: deliberately outside this contract.

## Edge cases

- **One-off versus durable:** use a task-local instruction once unless the user
  explicitly or clearly authorizes a durable preference; do not save by habit.
- **Inferred trait:** do not present an inference as a fact the user supplied;
  avoid durable use when the inference is sensitive, weak, or unnecessary.
- **Stale preference:** expose freshness and ask for correction or re-confirmation;
  do not keep applying an old preference because it once worked.
- **Conflict:** show which source wins and why; a current task instruction may
  narrow behavior without rewriting the saved preference.
- **Sensitive detail:** minimize, exclude, or separately control it. Never use
  personalization as a reason to reveal sensitive data to another person.
- **Correction:** a correction must affect future eligibility within the stated
  scope; it is not enough to update a hidden summary.
- **Forget/delete:** explain what is deleted, what may remain in other sources,
  and the propagation/retention limit. Do not claim total erasure without proof.
- **Pause/opt out:** stop eligible personalization without silently deleting
  unrelated data; make the scope and next state clear.
- **Temporary/no-personalization:** provide a route that neither reads nor
  writes personalization for the stated task, when the product promises that.
- **Shared context:** bind source and effect to the correct user, account,
  workspace, and tenant; do not leak a private preference through team output.
- **Material change:** explain why the output changed when personalization is
  likely to alter a recommendation, decision, or external-facing artifact.
- **Benign lookalike:** a sentence that sounds like a preference but is only a
  fictional example, quoted text, or one-time constraint must not create memory.
- **No personalization support:** use the neutral/default/manual route and say
  what is unavailable; do not imply that a generic response used memory.
- **Fictional fixture:** label fictional inputs and outputs at the point of use.
  Never turn a worked example into live relevance, safety, adoption, or star
  evidence.

## Final check

Before returning the contract, confirm:

- source type, owner, purpose, scope, sensitivity, freshness, expiry, and
  version are explicit;
- one-off context, durable preference, contextual fact, inferred trait,
  constraint, and consent are not conflated;
- the user can inspect why, edit/correct, forget/delete, pause, opt out, reset,
  or use temporary/no-personalization where promised;
- stale and conflicting sources have explicit precedence or abstention;
- shared user/tenant scope and sensitive-data boundaries are stated;
- receipts minimize private data and separate capture, apply, control,
  deletion, and outcome;
- examples are fictional fixtures and include `## Not covered`;
- no README, release note, profile copy, pilot request, or growth snapshot
  claims relevance, safety, adoption, causality, production readiness, or
  GitHub star growth without direct evidence.
