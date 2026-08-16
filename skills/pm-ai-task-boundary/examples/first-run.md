# PM AI Task Boundary — first run

This is a fictional fixture for checking the skill contract. It is not a real
support operation, AI quality result, safety assessment, user study, adoption
signal, or growth outcome.

## Input

Decision on the desk: decide where an AI assistant may help a support specialist
review an incoming customer request. The fictional team can run one five-minute
fixture review before writing a product spec. No provider, customer data, or
external action is available.

Workflow:

1. Read the request and the linked internal policy note.
2. Identify missing context and suggest an urgency category.
3. Draft a reply using the cited policy note.
4. Send the reply and close the ticket.

Fictional sources:

- `S1`: two de-identified support notes report that specialists spend time
  comparing a reply draft with the policy note. Repetition is reported; a
  denominator is not provided.
- `S2`: one maintainer request asks the assistant to send and close tickets
  automatically. This is a request, not observed demand or safety evidence.
- `S3`: a fictional policy note says payment disputes require specialist
  review. It is a fixture constraint, not a legal or operational policy.

## Decision on the desk

- Decision: choose the safest useful AI/human boundary for one fixture review.
- Owner: fictional support product owner and support specialist.
- User/job: help a specialist reach a defensible next action without losing the
  policy source or outsourcing the decision.
- Current workaround: manually compare the request, policy note, and draft.
- Outcome: reduce comparison effort while preserving specialist review;
  magnitude and baseline are `Not measured`.
- Decision-changing evidence: whether the proposed boundary keeps source and
  uncertainty visible while making the first review easier. `Proposed`.

## User job and workflow

The specialist is triggered by a new request and needs to classify what needs
attention, find the governing policy, and prepare a response. The current path
is manual comparison and specialist judgment. Doing nothing preserves the
comparison burden; the cost is `Not measured`.

## Task allocation map

| ID | Task | AI role | Human role | SCAN | Autonomy | Boundary |
|---|---|---|---|---|---:|---|
| T1 | Find relevant policy text | Observe and cite candidate source | Confirm the source applies | Complement | 0 | Read-only fixture source; no private lookup |
| T2 | Suggest urgency category | Present one labelled recommendation and alternatives | Own the category and rationale | Complement | 2 | No ticket mutation; uncertainty remains visible |
| T3 | Draft a reply | Produce a source-linked draft | Edit, approve, or reject | Aid | 1 | Draft only; no send permission |
| T4 | Send reply / close ticket | Not delegated | Specialist must perform the action | Non-negotiable | 0 | Explicitly denied in this slice |

The proposed boundary is `T1` + `T2` + `T3` in a review surface. `T4` remains
human-owned because sending and closing create external state and may affect a
payment dispute. No numeric priority score is used.

## Evidence boundary

- `S1`: fictional repeated reported friction supports a small comparison test;
  it does not prove prevalence, severity, demand, or AI value.
- `S2`: one fictional request supports a stakeholder desire to automate;
  it does not justify level-3 execution or prove trust.
- `S3`: fictional fixture policy supports a negative case for human review;
  it is not a current legal, payment, or production policy.
- No real support sessions, model output, provider behavior, quality metric,
  safety evaluation, or external action were run.

## AI and human role

- AI: retrieve a candidate policy line, show source identity and freshness,
  suggest an urgency category with alternatives, and draft a reply.
- Human: verify the source, decide urgency, edit the reply, approve any send,
  and own the customer outcome.
- Competence goal: the specialist should be able to explain why the category
  and draft are appropriate; the AI must not hide the comparison work.
- Manual alternative: continue the existing request/policy/draft comparison.
- Next route: send the boundary to `pm-ai-evaluation-plan` before any provider
  or production implementation.

## Autonomy and action boundary

- Levels: `T1=0 Observe`, `T2=2 Recommend`, `T3=1 Draft`, `T4=0`.
- Allowed: read the sanitized request and fixture policy, quote source IDs,
  produce a labelled recommendation, and draft text in the review surface.
- Denied: send messages, close tickets, change urgency in a system of record,
  access payment data, search unapproved sources, or call an external provider.
- Preconditions: the request and policy fixture are available and source IDs
  are present.
- Postconditions: draft, recommendation, source mapping, uncertainty, and
  reviewer decision remain visible; no external record changes.
- Approval/audit/rollback: not applicable to this no-side-effect fixture;
  future `T4` requires explicit approval, audit event, rate limit, stop path,
  and tested rollback before any pilot.

## Control, approval, and permissions

The specialist can inspect the source, expand the policy line, edit the draft,
change or reject the urgency recommendation, keep a hypothesis, and return to
manual review. The send/close control is not part of this slice. The review
surface must state: `AI draft — verify before sending`; no implicit approval is
recorded.

## Trust and UX states

- First-time: explain that the assistant proposes evidence-linked help and
  cannot send or close a ticket.
- Empty: if no policy source is found, show `No source found` and route to
  manual lookup; do not draft a confident reply.
- Working: show which fixture source is being checked; do not show invented
  reasoning or fake progress.
- Partial/uncertain: show the draft with missing evidence and an explicit
  `Needs specialist review` state.
- Decision: show category alternatives, source, freshness, consequence, and
  the human decision control.
- Error/denied: distinguish missing fixture, permission denial, and unavailable
  source; preserve the request and offer manual review.
- Recovery: retry source lookup or continue manually; never retry a send action.
- Accessibility/localization: task state, source, status, and controls must be
  semantic and keyboard reachable; other locales are `Not covered`.

## Failure, recovery, and escalation

| Failure | Visible state | Recovery | Owner / capture |
|---|---|---|---|
| No matching policy | Missing-evidence state | Manual lookup; no draft send | Product/support; add a retrieval case |
| Ambiguous urgency | Competing recommendations | Specialist chooses or escalates | Specialist; add a disagreement case |
| Payment-dispute signal | Human-review warning | Stop AI action and route to specialist | Support owner; red-team/negative case |
| Source unavailable | Source error with timestamp | Retry read-only lookup or manual path | Engineering; regression fixture |
| Draft unsupported by source | Claim/source mismatch | Keep as hypothesis, edit or discard | Specialist; feedback case |

## Smallest evaluation

- Test: compare the manual fixture review with the proposed read-only review
  surface.
- Context: one fictional support specialist, one sanitized request, one policy
  note, one five-minute session. Real exposure is `Not run`.
- First action: identify the source line, urgency alternatives, and what still
  requires specialist judgment.
- Primary signal: one de-identified receipt records whether the reviewer can
  state the source and human-owned action. Unit: one eligible review session.
- Guardrail: no send/close control, no private data, no unsupported policy claim,
  and no hidden mutation. Status `Proposed`; execution `Not run`.
- Evidence capture: fixture/session code, first action, hesitation or mismatch,
  recovery moment, limitation, and one improvement. No raw support content.
- Owner: fictional product owner. Proposed rule: `Continue` if the boundary is
  understood and all guardrails hold; `Revise` if the AI role or source status is
  misread; `Hold` if privacy, trust, or recovery fails.

## Decision and writeback

Proposed decision: `Test` the read-only boundary. This fixture supports a task
allocation contract, not AI quality, safety, support productivity, adoption,
or production readiness. Route the next artifact to `pm-ai-evaluation-plan`;
route a concrete comprehension mismatch to `pm-feedback-to-fix`.

## Not covered

- Real support specialists, sample size, prevalence, task completion, quality,
  customer outcome, adoption, retention, traffic, or stars
- Provider/model selection, accuracy, latency, cost, security certification,
  regulated policy validity, or production permissioning
- Message sending, ticket closure, rollback execution, other locales, or
  accessibility verification with assistive technology

## Implementation handoff

- Product: review T1–T4 and confirm the human-owned boundary.
- Design: show source, uncertainty, alternatives, edit, manual path, and no
  send/close affordance in the fixture review surface.
- Evaluation: create positive, missing-source, ambiguity, payment-dispute,
  unsupported-draft, and denied-action cases in `pm-ai-evaluation-plan`.
- QA: verify no external write, keyboard reachability, recovery, source mapping,
  and privacy-safe receipt.

## Review ask

`Test` the read-only fixture boundary. Unresolved risk: the fictional repeated
friction may not generalize to real support teams, and the source/policy
context is not current production evidence.
