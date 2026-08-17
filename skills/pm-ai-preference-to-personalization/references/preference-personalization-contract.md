# Worked reference: AI preference to personalization

This worked reference is a **fictional fixture**. It demonstrates a PM
contract for user-controlled personalization; it is not a live memory system,
privacy certification, model evaluation, product integration, or adoption
measurement.

## Method notes

The contract uses current public method references as design input:

- [OpenAI Academy: Personalization](https://openai.com/academy/personalization/)
  distinguishes stable working-style instructions, a specific task prompt,
  and recurring context. It also points users toward inspecting and managing
  personalization. This informs the taxonomy and control surface; it does not
  prove an implementation in this skill.
- [OpenAI Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq.)
  documents controls for viewing, correcting, deleting, turning memory off,
  and using temporary conversations. It also explains that deleting a visible
  memory and deleting a source conversation can be separate actions. This
  informs propagation and deletion language; it is not a deletion guarantee for
  another product.
- [How ChatGPT protects privacy](https://openai.com/index/how-chatgpt-protects-privacy/)
  describes optional memory controls, review/edit/delete actions, turning
  memory off, and temporary conversations as user controls. This informs the
  trust boundary; it does not replace product-specific privacy review.
- [ChatGPT memory and continuity](https://openai.com/index/chatgpt-memory-dreaming/)
  describes useful continuity, following preferences and constraints, and the
  need to keep context current. This informs freshness and correction checks;
  it does not establish that a given preference is correct or valuable.

The sources support a product question—what context may change this experience
and what control does the user have—not a claim that all products expose the
same controls or retain the same data.

## Personalization frame

- **Product job:** A fictional travel planner helps one traveller prepare a
  three-day work-trip dinner plan.
- **User/job:** Find suitable options quickly while keeping personal choices,
  task constraints, and team rules understandable.
- **Experience:** Ranking and filtering may change; booking, payment, identity,
  authorization, and external communication are separate flows.
- **Owner:** Personal preferences belong to the account holder; workspace rules
  belong to the tenant owner; task-local context belongs to this plan.
- **Consequence:** A wrong or hidden preference can exclude a useful option or
  expose private context. No external action is allowed from personalization
  alone.
- **Success oracle:** Applied context has an attributable source, purpose,
  scope, freshness, and control; a neutral/manual fallback is available; the
  user can correct or withdraw the context within the stated propagation
  boundary.

## Preference taxonomy

| Type | Example fixture | Default treatment | Must not be conflated with |
| --- | --- | --- | --- |
| Task-local instruction | “Tonight under 30 minutes.” | Use once for this task | Durable preference |
| Explicit durable preference | “I prefer quiet dinners.” | Save only with a clear user-authorized scope | Inferred trait |
| Contextual fact | “This is a work trip.” | Use while current and expire/reconfirm | General profile |
| Inferred trait | “The user dislikes crowds.” | Do not treat as user-supplied; ask, minimize, or abstain | Explicit preference |
| Constraint | “Avoid this time window.” | Enforce within named scope and expiry | Ranking taste |
| Sensitive detail | Health, dietary, or protected information | Minimize, isolate, and separately control | Benign preference |
| Workspace policy | Team budget cap | Apply to tenant-owned output only | Personal account state |
| Consent/permission | “You may book this.” | Gate a separate action and re-check scope | Personalization |
| Not provided | Unknown owner or purpose | Do not invent; hold or use default route | Any eligible source |

## Source and purpose ledger

| Field | Fictional contract rule |
| --- | --- |
| Source owner | Identify user, workspace, task, imported record, or system inference |
| Provenance | Distinguish user-supplied, user-edited, imported, and inferred |
| Purpose | Name the exact experience change, such as ranking dinner options |
| Eligible surface | List the screen, task, tenant, or account where it may apply |
| Forbidden use | State what it cannot change, such as permission or booking authorization |
| Scope | Bind to user, account, workspace, task, trip, or other explicit boundary |
| Freshness | Show current, stale, unknown, or confirm-before-reuse state |
| Expiry | Set an event/time/task boundary; do not imply indefinite retention |
| Version | Keep the preference definition or policy version visible to evaluation |
| Correction | Define what future eligibility changes after an edit |
| Deletion | Name the item removed and the sources/propagation not covered |
| Control | Support inspect, explain, edit, forget, delete, pause, reset, opt out, and temporary where promised |

## Precedence and conflict contract

```text
current task instruction
        ↓ narrows this task only
workspace policy for workspace-owned output
        ↓ applies within tenant scope
confirmed durable preference
        ↓ applies within declared purpose and freshness
contextual fact
        ↓ applies while current
inferred or unknown source
        ↓ abstain, ask, or use neutral route
```

This is not a universal ranking algorithm. The product must declare the
precedence for the specific job and show the winning source. A task instruction
can override a saved preference for the task without silently mutating it. A
workspace rule can constrain a shared plan without granting access to private
preferences. If ownership, purpose, freshness, or sensitivity is unresolved,
the safe result is narrower scope or abstention.

## Control and state contract

| Control/state | User-visible behavior | Evidence oracle |
| --- | --- | --- |
| Inspect | Show source type, owner, purpose, scope, freshness, and saved/one-off state | The receipt resolves to a non-secret source ID |
| Explain | Say why the context changed this experience and what it did not do | Purpose and side-effect boundary are explicit |
| Use once | Apply task-local context without durable write | Storage/control trace says no saved preference change |
| Edit/correct | Update the named item and its scope | Future eligible case reads the new version |
| Forget | Mark the preference ineligible for future use | Apply trace stops within the stated scope |
| Delete | Remove the named stored item and expose retention/propagation limits | Deletion receipt, not a generic success toast |
| Pause | Stop eligible personalization for account/workspace/task scope | Later eligible request is blocked or neutral |
| Reset | Return to declared default/manual behavior | Defaults are visible; reset is not deletion unless specified |
| Opt out | Choose no personalization for the route | No eligible source is read or written |
| Temporary | Run without saved personalization for the task | Read/write trace is empty for saved context |
| Shared context | Keep personal and workspace ownership distinct | Cross-user/tenant test does not leak state |
| Stale/conflict | Reconfirm, narrow scope, or abstain | No silent winner or stale application |

## Worked fictional case

1. The user’s saved “quiet dinners” preference is explicit, account-owned, and
   eligible for dinner ranking after a freshness check.
2. “Under 30 minutes from the hotel” is a one-time task constraint. The product
   applies it to tonight’s filter and does not save it.
3. “Work trip” is contextual and expires with the trip.
4. The old “dislikes crowds” note is an inference. It is excluded and shown as
   unconfirmed if the product exposes it to the user.
5. The team budget is applied only to the workspace plan. It does not change or
   reveal the user’s private preference.
6. If the user selects a temporary/no-personalization route, the product uses a
   neutral/manual path and records `not_read_not_written` for saved context.
7. If the user deletes “quiet dinners,” the product says the named item was
   deleted and states whether a source conversation, export, cache, or external
   provider is outside the demonstrated propagation boundary.

## Evaluation plan

| Slice | Fixture | Oracle | Failure class |
| --- | --- | --- | --- |
| Explicit durable | confirmed quiet-dinner preference | applies only to declared purpose/scope | hidden expansion |
| One-off | 30-minute dinner limit | used once, no durable write | accidental memory |
| Contextual | work-trip fact | expires/reconfirms at trip boundary | stale carryover |
| Conflict | task instruction vs saved preference | task narrows without rewriting saved value | silent mutation |
| Stale | old preference timestamp | confirmation or neutral route | stale application |
| Sensitive | fictional dietary/health detail | minimized and isolated | sensitive leakage |
| Inferred lookalike | crowd inference | not treated as supplied fact | inference laundering |
| Correction | user changes route preference | future eligibility uses new version | ineffective correction |
| Forget/delete | user withdraws preference | named item no longer applies; limits visible | false erasure |
| Pause/opt out | account pause or route opt-out | eligible personalization is blocked | control bypass |
| Temporary | no-personalization plan | no saved read/write | hidden personalization |
| Shared context | teammate opens plan | private state is not exposed | tenant leak |
| Benign lookalike | quoted travel copy | no preference created | false capture |

The denominator is each fixture case that reached the relevant decision point.
Report captured, classified, eligible, applied, control, corrected, forgotten,
deleted, and outcome states separately. “The result sounded tailored” is not a
quality oracle. Live model quality, user comprehension, deletion propagation,
and value are `Not run` for this reference.

## Privacy-safe personalization receipt

```text
case_id: fictional-trip-001
preference_id: pref-quiet-dinners
source_type: explicit_durable_preference
source_owner: personal_account
purpose: rank_dinner_options
scope: user_selected_trip
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

The receipt deliberately omits raw preference text, prompts, addresses, health
details, credentials, private URLs, and hidden inference content. A real
implementation still needs a data-minimization, access-control, retention,
deletion, and incident-review contract.

## Rollout decision

`Need evidence` for live personalization. A future pilot needs a named host,
account/tenant boundary, control receipts, stale/conflict cases, temporary
fallback, deletion propagation test, and a direct user-comprehension check.
Those requirements are not satisfied by this fictional reference.

## Not covered

- memory read/write implementation, retrieval ranking, prompt assembly, or
  poisoning defense;
- identity, authentication, authorization, consent enforcement, or booking;
- recommendation correctness, travel data freshness, or safety advice;
- provider-specific legal retention, cross-system erasure, workspace admin, or
  production privacy certification;
- live user research, model quality, adoption, retention, causality, or GitHub
  star growth.
