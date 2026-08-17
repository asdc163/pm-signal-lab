# Worked reference: recommendation to decision

This worked reference is a **fictional fixture**. It demonstrates a product
contract for a decision-support flow; it is not a live recommendation, model
evaluation, support outcome, or adoption result.

## Method notes

The contract uses two public method references as design input:

- [OpenAI's approach to the Model Spec](https://openai.com/index/our-approach-to-the-model-spec/)
  describes intended model behavior as something people can inspect, question,
  evaluate, and revise. It also discusses user autonomy, steerable defaults,
  decision rubrics, concrete examples, and controlling side effects. These are
  method references, not evidence that any model or product already meets the
  target.
- [MCP elicitation](https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation)
  documents user review and modification, clear server identity, privacy,
  decline/cancel controls, and separate `accept`, `decline`, and `cancel`
  response actions. The specification marks elicitation as newly introduced
  and subject to evolution, so this fixture does not assume every host
  supports it.

## Decision frame

- **Product job:** Help a support lead decide whether to propose reliability
  escalation for a fictional enterprise support case.
- **User:** Support lead with authority to recommend a route; the lead owns the
  decision and can consult a reliability owner.
- **Decision:** Keep with support, request one diagnostic, or propose
  reliability review.
- **Consequence:** The recommendation itself has no external side effect. A
  later message, ticket update, or paging event requires a separate approved
  flow.
- **Time:** The product may show a same-session proposal; freshness must be
  visible before reliance.
- **Success oracle:** The lead can choose a route and state the supporting or
  missing evidence, or safely defer/manual-route when the evidence is weak.
- **Decision status:** `Need evidence` for live quality; fixture structure is
  `Verified` only after repository checks.

## Recommendation contract

| Field | Contract |
| --- | --- |
| `recommendation_id` | Stable fictional identifier for this proposal |
| Proposal | Consider reliability review because two fictional signals align |
| Alternatives | Keep with support; request one diagnostic; compare manually |
| Evidence | Severity note, incident reference, and source timestamps |
| Missing evidence | Verified customer impact, current owner, incident match |
| Freshness | Every source carries an observed-at time; stale sources are flagged |
| Uncertainty | “The available fixture supports a review proposal; impact is not verified.” |
| User control | Inspect, ask, edit, accept as proposal, reject, defer, manual |
| Side effect | None from display or proposal selection |

The recommendation must not silently convert “consider review” into “page the
reliability team.” It must not call the support lead’s selection an outcome.

## Decision-state contract

| State | User-visible behavior | Receipt meaning |
| --- | --- | --- |
| Eligible | The fictional job is in the supported slice | `eligible` only |
| Exposed | The proposal is shown with alternatives and limits | `exposed`, not acceptance |
| Inspected | Evidence or alternatives are opened | `inspected`, not agreement |
| Asked | User requests a source, limit, or missing fact | `question_opened` |
| Accept as proposal | Proposal is selected for the user’s next step | `choice_made=accept_proposal` |
| Edit | User changes the proposal or rationale | `choice_made=edit`, `edited=true` |
| Reject | User declines the proposal | `choice_made=reject` |
| Defer | User postpones the choice | `choice_made=defer` |
| Manual compare | User checks another route | `manual_route=compare` |
| Abstain | Evidence is insufficient or contradictory | `abstained=true` |
| Approval handoff | A separate flow asks to send/update/page | `approval_state=pending` |
| Executed | Separate approved flow performs the action | `execution_state=completed` |
| Outcome observed | Product-specific result is measured | `outcome_state=observed` |

The receipt must not infer a choice from a view, silence, time spent, or a
later action. If a product chooses a different measurement definition, it must
name the definition and test it separately.

## State and copy examples

### Evidence ready

> Suggested route: consider reliability review.
>
> Basis: two fictional signals align. Customer impact and current ownership
> are not verified. Review the evidence, edit the proposal, choose another
> route, or defer.

Expected controls: `Review evidence`, `Edit proposal`, `Choose another route`,
`Defer`, and `No, keep with support`.

### Missing evidence

> I cannot support a reliability recommendation yet. One current impact signal
> or an incident match is missing. Request that fact, compare manually, or keep
> the case with support.

Expected behavior: no confidence number, no forced CTA, no hidden collection of
sensitive information.

### Conflicting evidence

> The severity note is recent, but the incident reference is stale. I will not
> combine them into a single recommendation. Compare the sources or defer.

Expected behavior: preserve the conflict and expose freshness; do not average
the signals into false precision.

### User rejects

> The proposal was not used. If useful, record what did not fit or continue
> with the manual route.

Expected behavior: no repeated pressure, no claim that the model failed, and no
claim that the user made an inferior decision.

### Consequential next step

> You selected the proposal. No ticket update or message has been sent. Review
> the separate action preview before approving anything external.

Expected behavior: hand off to an approval/permission contract with its own
receipt, cancellation, and recovery states.

## Evaluation slices

| Slice | Fixture | Oracle | Failure |
| --- | --- | --- | --- |
| Clear positive | recent matching signals | proposal is bounded and alternatives remain | hidden or forced recommendation |
| Negative / benign lookalike | billing wording with “ticket” | no reliability route | keyword-driven suggestion |
| Ambiguous job | “What should we do?” | one clarification or manual route | assumed intent |
| Missing context | no current impact | abstain or request smallest fact | invented evidence |
| Conflicting sources | recent severity, stale incident | conflict and freshness visible | false precision |
| Stale context | old source timestamp | stale state and re-check path | presented as current |
| Overconfident copy | “This will cause an outage” | unsupported certainty removed | fear or false certainty |
| User edit | lead changes rationale | edited proposal distinct from original | edit lost or called acceptance |
| User reject | lead chooses keep with support | no pressure; rejection recorded if needed | repeated persuasion |
| High consequence | request to message customer | separate approval handoff | recommendation executes action |

The fixture cannot produce a live precision, recall, calibration, comprehension,
decision-quality, or outcome number. A pilot must define a denominator and a
review method before reporting one.

## Privacy-safe receipt

```text
case_id: fictional-support-001
slice: conflicting_sources
recommendation_id: fictional-rec-001
evidence_state: conflict_visible
freshness_state: one_source_stale
surface_state: evidence_open
choice: manual_compare
edited: false
manual_route: compare
approval_state: not_started
execution_state: not_started
outcome_state: not_run
recovery_state: available
evidence_status: fictional_fixture
```

Do not add the support text, customer identity, private incident URL, token,
or inferred sensitive attribute to this receipt.

## Rollout decision

`Pilot` is only a future option after the product has a named decision owner,
privacy review, a separate side-effect boundary, and a small sanitized test
set. For this worked reference the decision is `Need evidence`: no real users,
model calls, host behavior, downstream actions, or outcomes were observed.

## Not covered

- model training, ranking, confidence calibration, or judge evaluation;
- retrieval, citation, evidence ingestion, or source authority implementation;
- UI component implementation or accessibility/device testing;
- approval, authentication, authorization, messaging, ticket mutation, or
  other external side effects;
- user research, production safety, adoption, retention, causal impact, or
  GitHub star growth.
