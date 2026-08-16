# Worked example: support AI task boundary

This is a fictional fixture showing a PM decision packet before an AI support
workflow enters evaluation or implementation. It is not a real support policy,
model result, safety assessment, adoption result, or growth claim.

## Decision on the desk

A fictional support product team wants an “agent” that reads a request, finds a
policy, chooses urgency, drafts a reply, sends it, and closes the ticket. The
team has one five-minute review slot and no production permission. The decision
is where the AI should stop, not whether the team should buy a model.

- User/job: a support specialist needs to move a request toward a defensible
  response while retaining policy judgment and customer responsibility.
- Outcome: reduce avoidable comparison effort while preserving source review;
  baseline, target, and time window are `Not provided`.
- Current workaround: manually compare request, policy, draft, and ticket
  state.
- Decision owner: fictional support product owner; specialist owns the final
  customer-facing decision.
- Alternative: keep the entire workflow manual. The proposed AI slice must
  earn its place through a small, reversible evaluation.

## User job and workflow

| Step | Human job | Consequence if wrong |
|---|---|---|
| Read request | Understand what the customer needs | Misrouting or missed urgency |
| Find policy | Identify the governing source and freshness | Unsupported or stale answer |
| Choose urgency | Decide queue, priority, or escalation | Delayed or mishandled case |
| Draft reply | Prepare a clear, source-backed response | Incorrect customer guidance |
| Send/close | Change external state and represent the company | Irreversible trust, payment, or record harm |

## Task allocation map

| Task | Allocation | AI boundary | Human boundary | Evidence status |
|---|---|---|---|---|
| Policy lookup | `Complement`, level 0 | Read approved fixture source and cite matching lines | Confirm relevance and freshness | Proposed from fictional S1 |
| Urgency suggestion | `Complement`, level 2 | Offer category, rationale, alternative, and uncertainty | Choose, edit, or escalate | Proposed from fictional S1/S2 |
| Reply draft | `Aid`, level 1 | Draft only from approved source lines | Verify, edit, accept, or discard | Proposed; quality not measured |
| Send/close | `Non-negotiable`, level 0 | No execution | Specialist explicitly performs action | Risk-based boundary |

The word “agent” does not change this allocation. The safe first slice is
read-only source lookup plus a labelled recommendation and draft. Sending or
closing is outside the slice.

## Evidence boundary

| Source | Type | Supports | Does not prove |
|---|---|---|---|
| `S1`, `S2` | Fictional reported support friction | A small comparison test is reasonable | Prevalence, productivity gain, or segment demand |
| `S3` | Fictional policy fixture | A payment dispute needs specialist review | Current legal, financial, or production policy |
| Maintainer request | Reported request for full automation | Stakeholder wants less manual work | Permission to automate or user trust |
| No runtime trace | Missing evidence | Nothing about model quality or tool behavior | Accuracy, safety, latency, cost, or adoption |

No numeric confidence or autonomy score is inferred from the sources. Allocation
and thresholds below are `Proposed`.

## AI and human role

The AI is a source-finding assistant, recommendation aid, and drafting scaffold.
The human is the policy verifier, urgency decision owner, editor, sender, and
escalation owner. The design should help the specialist explain the decision,
not replace the skill with an opaque button.

The manual path remains available. If the specialist cannot verify the source,
the system must preserve the request and return to manual lookup rather than
falling through to a confident draft.

## Autonomy and action boundary

### Allowed in the first slice

- read-only access to a sanitized request and an approved policy fixture;
- source IDs, excerpts, date/freshness, and a limitation;
- urgency alternatives and a draft marked `AI draft — verify before sending`;
- reviewer edits, reject/keep-as-hypothesis, and manual continuation.

### Denied in the first slice

- sending, closing, deleting, assigning, or changing ticket state;
- searching unapproved sources or using private customer records;
- payment, refund, legal, employment, or regulated decisions;
- external provider calls, background loops, automatic retries with side effects,
  and any hidden persistence.

### Future level-3 gate

If a later version proposes send or close, it must separately define:

- preconditions: source verified, specialist approval, current ticket version;
- postconditions: exact message/record mutation and receipt;
- allowed/denied tools and data classes;
- approval event, actor, timestamp, audit record, and rate limit;
- stop/kill switch, duplicate-action check, and tested rollback;
- evaluation slices for tool misuse, stale policy, injection, privacy, and
  multilingual input.

Without those fields, the later action remains `Hold`.

## Control, approval, and permissions

The review UI must show source identity, freshness, relevant excerpt, missing
context, recommendation rationale, alternatives, and the consequence of each
urgency choice. The specialist can edit, reject, ask for manual lookup, keep a
hypothesis, or escalate. The send/close action is absent from the first slice;
there is no implied approval.

## Trust and UX states

- First-time: explain the role, limits, source boundary, and human-owned step.
- Working: show read-only source lookup and current state; no fake “thinking”
  animation or raw chain-of-thought.
- Partial: display the draft and source map separately from the recommendation.
- Uncertain: show `Needs specialist review` when context, source, or policy is
  incomplete.
- Empty: show `No approved source found` with a manual path.
- Permission denied: explain which data or tool is unavailable and preserve the
  request.
- Error/timeout: offer safe retry of read-only lookup or manual continuation;
  never replay a side effect.
- Decision boundary: make `Send/close remains human-owned` visible where the
  specialist decides.
- Accessibility/localization: semantic task status, source, buttons, focus,
  and error association are required; native assistive-technology and other
  locales are `Not run`.

## Failure, recovery, and escalation

| Failure | Recovery | Escalation / evidence |
|---|---|---|
| Policy not found | Keep draft empty; manual lookup | Add missing-source regression case |
| Policy stale | Show freshness warning; hold draft | Product owner reviews source governance |
| Prompt injection in request/source | Treat it as untrusted data; do not execute | Add red-team case; security review |
| Ambiguous urgency | Show alternatives; specialist decides | Capture disagreement and context |
| Unsupported draft claim | Keep as hypothesis; edit/discard | Add source-grounding regression |
| Permission denied | Preserve request; explain manual route | Owner reviews least-privilege scope |
| Tool/provider timeout | Retry read-only lookup once or hand off | Capture timeout category; no side effect |

## Smallest evaluation

Run one fixture-level comparison of the manual review and the proposed
read-only assistance. Use one sanitized request, one approved policy note, one
ambiguous case, and one payment-dispute negative case.

- Primary signal: can the reviewer identify the source, state the human-owned
  decision, and recover when evidence is missing? Unit: one review session.
- Guardrails: no external mutation, no unapproved source, no private content,
  no unsupported policy claim, no hidden approval. Status `Proposed`; execution
  `Not run`.
- Evidence capture: session code, task context, first action, hesitation,
  mismatch, recovery, limitation, and one improvement. Do not collect identity,
  raw tickets, or credentials.
- Decision rule: `Continue` if the boundary is understood and guardrails hold;
  `Revise` if source, uncertainty, or human ownership is misread; `Hold` on any
  privacy, security, external-action, or recovery failure.
- Follow-on: use `pm-ai-evaluation-plan` for model behavior and `pm-decision-to-spec`
  only after the allocation survives review.

## Decision and writeback

Proposed decision: `Test` the read-only assistance slice. This contract supports
role and permission design; it does not support a provider choice, accuracy
claim, customer outcome, production release, or full-agent roadmap.

Write back a real observation to the project evidence registry or pilot issue
only after human review and redaction. A new failure should become a regression
or red-team case, not a stronger marketing claim.

## Not covered

- Real support behavior, task success rate, productivity, satisfaction,
  prevalence, segment fit, business impact, adoption, retention, traffic, or
  stars
- Model/provider quality, tool-call validity, latency, cost, legal policy
  validity, production authorization, or security certification
- Send/close execution, rollback execution, accessibility testing with native
  assistive technology, and localization beyond the English fixture

## Implementation handoff

- Product owner: approve the task map and human-owned send/close boundary.
- Design: prototype the source, uncertainty, recommendation, edit, manual, and
  escalation states without adding an execution button.
- AI evaluation: build golden, missing-source, stale-source, ambiguity,
  injection, unsupported-claim, permission-denied, and timeout cases.
- Engineering/QA: enforce read-only permissions, source mapping, no hidden
  persistence, keyboard semantics, duplicate-action prevention, and recovery.
- Review decision: keep any future level-3 action in a separate packet until
  approval, audit, rate, kill switch, rollback, and red-team evidence exist.

## Review ask

`Test` the read-only boundary. Unresolved risk: the fictional sources may not
represent real support contexts, and the proposed usefulness signal is manual
and not measured.
