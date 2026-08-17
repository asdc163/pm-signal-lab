# First run: fictional travel-planning personalization

This is a **fictional fixture** for learning the workflow. It is not a live
travel plan, user profile, memory record, model result, safety assessment, or
adoption measurement.

## Input

> A fictional travel product helps a returning user plan a three-day work trip.
> The user has previously written, “I prefer quiet dinners and short walking
> routes.” In this task they add, “Keep tonight’s dinner under 30 minutes from
> the hotel.” The product sees an old note that says the user “dislikes
> crowds,” but the user never stated that. A shared workspace contains a team
> budget policy. The product must explain which context it uses, let the user
> correct or remove it, and provide a temporary route that neither reads nor
> writes personalization for this plan.

## Step 1 — Personalization frame

- **User/job:** A fictional traveller wants a concise, low-friction plan for
  one work trip.
- **Experience:** Dinner and walking suggestions may be ordered or filtered;
  identity, authorization, payment, and booking remain separate.
- **Owner/scope:** The traveller owns personal preferences; the fictional team
  policy belongs to the workspace; the task-local constraint belongs only to
  tonight’s plan.
- **Consequence:** A wrong preference can waste time or exclude a good option;
  it must not trigger a booking or expose private information.
- **Success oracle:** Every material personalization change has an attributable
  source, purpose, scope, freshness state, and visible control; the plan can be
  produced through a neutral/manual route when personalization is unavailable.
- **Evidence status:** Fictional fixture; comprehension, model quality, live
  propagation, and user value are `Not run`.

## Step 2 — Preference taxonomy and ledger

| Input | Classification | Source / owner | Purpose and scope | State |
| --- | --- | --- | --- | --- |
| “I prefer quiet dinners.” | Explicit durable preference | User supplied; personal account | Rank dinner options for future planning where the user chooses to use preferences | Eligible; freshness to confirm |
| “I prefer short walking routes.” | Explicit durable preference | User supplied; personal account | Rank route options; never change accessibility, safety, or booking permissions | Eligible; freshness to confirm |
| “Tonight under 30 minutes from the hotel.” | Task-local instruction / constraint | User supplied; this task | Filter this dinner search only; do not save as a durable preference | `Use once` |
| Three-day work trip | Contextual fact | User supplied or confirmed for this trip | Shape itinerary scope; expires with the trip | Task-scoped |
| “The user dislikes crowds.” | Inferred trait lookalike | System note; personal account | No durable use without user confirmation; do not present as user-supplied | Ineligible; ask or abstain |
| Team dinner budget | Workspace policy | Workspace owner | Bound eligible options for the shared plan; never rewrite personal preference | Workspace-scoped |
| Dietary or health detail, if supplied | Sensitive detail | User; scope must be explicit | Minimize and use only for the stated task/purpose | Separate review required |
| Permission to book | Consent / permission | User or authorized traveller | Allows a separate booking action only if the booking flow confirms it | Not provided in this fixture |

The old “dislikes crowds” note is not promoted to a fact. If the product asks
whether the user wants to save it, the response must be an explicit choice,
with a decline path. Silence, a skipped question, or one restaurant choice is
not durable consent.

## Step 3 — Purpose, precedence, and freshness

1. The current task instruction “under 30 minutes” narrows tonight’s search
   without editing the saved short-route preference.
2. The workspace budget policy constrains the shared plan where it applies;
   it cannot reveal the user’s private preferences to teammates.
3. A confirmed, current explicit preference can rank options inside its stated
   purpose and scope.
4. The contextual work-trip fact expires with the trip or when the user removes
   it; it must not become a general working-style preference.
5. The inferred crowd trait is excluded until the user confirms it and the
   product records a source and purpose. If the trait could be sensitive or
   materially affect access, abstain and use the neutral route.
6. A conflict, stale timestamp, missing owner, or scope mismatch narrows the
   effect or abstains. The product shows which source won and why; it does not
   silently rewrite the saved preference.

## Step 4 — Control and copy matrix

| User action | Observable result | Evidence oracle |
| --- | --- | --- |
| Inspect | Shows “quiet dinners,” “short walking routes,” source, purpose, scope, freshness, and saved/one-off state | Receipt links each applied item to a source ID |
| Explain | “Used for ranking dinner options in this plan. It did not book anything.” | Purpose and side-effect boundary are visible |
| Use once | Applies “under 30 minutes” to this plan only | No durable preference write |
| Correct/edit | User changes “short routes” or its scope | Next eligible plan reads the corrected version |
| Forget | Stops using one preference in future personalization | Eligibility state changes; propagation limit is shown |
| Delete | Removes the named stored item and states what other copies are not covered | Deletion receipt and retention boundary are visible |
| Pause | Personalization is paused for the stated account/workspace scope | Future eligible use is blocked without implying deletion |
| Opt out | The user selects no personalization for the applicable route | Neutral/manual route is shown; no silent read or write |
| Temporary plan | “Use this plan without saved personalization” | This task neither reads nor writes saved preferences |
| Shared context | Teammates see the workspace policy, not the private preference | Tenant/user boundary holds in the rendered plan |

Example explanation:

> This plan used your saved “quiet dinners” preference to rank options and
> your one-time “under 30 minutes” limit to filter tonight’s search. The team
> budget is a workspace rule. “Dislikes crowds” was not used because it was
> inferred and not confirmed. Review, change, forget, pause, or use a temporary
> plan.

## Step 5 — Evaluation slices

- **Explicit durable:** a confirmed preference affects only its declared
  purpose and scope.
- **One-off:** the 30-minute limit is used once and is not saved by habit.
- **Contextual:** the work-trip fact expires or is removed at the trip boundary.
- **Conflict:** a current task instruction narrows a durable preference without
  rewriting it; an unresolved conflict abstains.
- **Stale:** an old preference is shown as stale and requests confirmation or
  uses the neutral route.
- **Sensitive:** a sensitive detail is minimized, separately controlled, and
  never exposed through a shared plan.
- **Inferred lookalike:** the crowd inference is not treated as a user fact or
  durable preference.
- **Correction:** editing the preference changes future eligibility within the
  stated scope.
- **Forget/delete:** the named item stops applying; the product does not claim
  deletion from unrelated systems without evidence.
- **Pause/opt out:** no eligible personalization is read or applied after the
  control takes effect; unrelated data is not silently deleted.
- **Temporary:** the plan completes through a manual/default route with a
  truthful no-personalization receipt.
- **Shared context:** private account state cannot alter another user’s plan.
- **Benign lookalike:** quoted travel copy or a one-time constraint does not
  create a preference.

The fixture oracle is a state-and-scope trace, not “the suggestions felt right.”
Live comprehension, ranking quality, deletion propagation, latency, and user
value remain `Not run`.

## Step 6 — Privacy-safe personalization receipt

```text
case_id: fictional-trip-001
preference_id: pref-quiet-dinners
source_type: explicit_durable_preference
source_owner: personal_account
purpose: rank_dinner_options
scope: this_user_selected_trip
sensitivity_state: ordinary_preference_not_sensitive
freshness_state: confirm_before_reuse
control: inspect_and_explain
personalization_state: applied_to_ranking
propagation_state: task_output_only
tenant_state: personal_account_not_shared
outcome_state: not_run
observed_at: 2026-08-17T00:00:00Z
evidence_status: fictional_fixture
```

Do not put raw prompts, hotel addresses, dietary details, credentials, private
URLs, or the inferred trait in this receipt. Record the one-time constraint as a
separate source and record the temporary route as `not_read_not_written`.

## Release decision

`Need evidence` for a live personalization feature. The fixture contract is
complete, but no real account controls, cross-user isolation, delete
propagation, model behavior, host support, user comprehension, or downstream
travel outcome was observed.

## Not covered

- memory storage, retrieval, poisoning defense, or model-context assembly;
- identity, authentication, authorization, consent enforcement, or booking;
- recommendation ranking quality, travel data freshness, or safety advice;
- workspace administration, legal retention, provider deletion guarantees, or
  cross-system erasure;
- live user research, production rollout, adoption, retention, or GitHub stars.
