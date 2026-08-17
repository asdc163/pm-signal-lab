# First run: support-draft workflow readiness

This is a **fictional fixture** for practicing a pre-test readiness decision.
It is not a live workflow, user study, benchmark, model evaluation, adoption
result, value estimate, safety review, or production approval.

## Decision on the desk

- **Decision:** Is a proposed English support-draft workflow ready for a
  representative internal test?
- **Decision owner:** `Not provided`.
- **Eligible user/job:** A support reviewer preparing a routine answer from an
  approved policy source.
- **Current workaround:** A reviewer searches the handbook and drafts the
  answer manually; the actual time, error rate, and case volume are `Not
  measured`.
- **Candidate:** `support-draft-routine/v0.1.0-candidate`, which drafts an
  answer and suggests a policy citation. No provider or support system was
  accessed.
- **Evidence that could change the route:** named source owner, approved
  handbook version, reviewer capacity, representative cases, citation oracle,
  and a confirmed manual fallback.

## Workflow candidate

| Field | Current evidence | Status |
| --- | --- | --- |
| User/job | routine English support answer prepared before a human send | `Partial` |
| Users | one internal reviewer is proposed; identity and eligibility are not supplied | `Missing` |
| Owner | support workflow owner and source approver are not supplied | `Missing` |
| Trigger/frequency | recurring support work is proposed; frequency and denominator are not supplied | `Partial` |
| Current workaround | handbook search plus manual drafting | `Reported` |
| Value hypothesis | may reduce drafting effort or improve source traceability | `Proposed`, not measured |
| Inputs/sources | an approved handbook is expected; authority, version, freshness, and redaction are not supplied | `Missing` |
| Access/dependencies | handbook access and any citation source are not confirmed | `Blocked` |
| Human boundary | reviewer should edit and approve before send, but the rule is not accepted | `Partial` |
| Support/fallback | manual drafting is possible in principle; support owner and escalation are not supplied | `Partial` |
| Testability | no case set, citation oracle, reviewer, duration, or stop rule is supplied | `Missing` |

## Readiness map

The candidate has a concrete job and a plausible bounded change, but missing
owner, source, access, reviewer, cases, and receipt fields prevent a safe and
interpretable test from being authorized by this packet. The gaps may be
recoverable, so the candidate is not yet an `Avoid for now` decision.

## Route

**Route: `Validate further`.**

Decisive gaps:

1. The source authority and exact handbook version are not named.
2. No accountable workflow/source owner or reviewer is supplied.
3. No legitimate access and redaction boundary is confirmed.
4. No representative, unsupported, conflicting, or citation-negative cases are
   defined.
5. No reviewer oracle, stop condition, or dated fallback receipt exists.

This is not `Test now` because those gaps could make the test unauthorized or
uninterpretable. It is not `Sequence later` because the owner has not yet
shown that timing or capacity, rather than missing evidence, is the reason to
defer. It is not `Avoid for now` because a safe manual fallback and a narrow
internal job are plausible, pending legitimate owner and source receipts.

## Smallest safe recovery

Before any candidate use, the support lead should provide:

1. an accountable workflow owner, source approver, and one reviewer;
2. the approved handbook authority, version, freshness date, allowed source,
   and redaction rule;
3. a sanitized case slice containing a clear answer, a policy conflict, a
   missing-policy case, an unsupported billing/legal/safety case, and a wrong
   citation negative case;
4. the human rule: the draft is editable and review-only; no automatic send,
   account action, or customer exposure;
5. a reviewer oracle for answer scope, policy match, citation correctness,
   abstention, and escalation;
6. a short internal test record with the manual route available, a stop rule,
   and rollback to manual drafting.

Until those receipts exist, execution status is `Not run` and the safe route is
the existing manual workflow.

## Claims ledger

| Claim | Status | Scope/unit | Source/method | Limitation | Next receipt |
| --- | --- | --- | --- | --- | --- |
| The candidate can draft a routine support answer | `Proposed` | fictional routine case | supplied fixture only | no output was generated or reviewed | paired candidate/manual case review |
| The candidate improves citation traceability | `Proposed` | fictional policy-answer case | no oracle supplied | citation authority and correctness are unknown | approved source plus citation rubric |
| Manual drafting is a fallback | `Proposed` | fictional internal reviewer | workflow description | support owner and capacity are not verified | owner-confirmed fallback receipt |
| The workflow reduces time or improves business outcome | `Unknown` | Not measured | no baseline, denominator, or method | no causal or outcome claim supported | defined outcome comparison |
| The workflow is ready for testing | `Unknown` | this packet only | readiness review | route is a recommendation, not approval | accountable owner accepts boundary |

## Human control and support

- **AI may:** draft a proposed English answer and suggest a citation inside the
  bounded internal test.
- **AI may not:** send a message, change an account, decide a refund/legal/
  safety matter, access an unapproved source, or expose customer data.
- **Person must:** verify source authority and freshness, check answer scope
  and citation, edit or reject the draft, escalate ambiguity, and choose the
  manual route.
- **Stop/ask/escalate:** stop on source conflict, unsupported request, wrong
  or missing citation, sensitive data, permission failure, or unclear human
  ownership; ask the source/workflow owner; escalate through the support route
  once supplied.
- **Fallback:** manual handbook search and drafting; actual support capacity is
  `Not verified`.

## Implementation handoff

- **Owner:** `Not provided`; support lead must assign one before testing.
- **Smallest next action:** create the source/owner/reviewer/case/receipt
  packet, then re-run this readiness review.
- **Affected surfaces:** approved policy source, sanitized case fixture,
  reviewer rubric, support fallback, and any candidate workflow version.
- **Evidence:** source authority/version, permission and redaction receipt,
  case denominator, reviewer decisions, stop events, and fallback use.
- **Writeback:** the workflow decision record; no external system write is
  authorized by this fixture.
- **Follow-on:** use `pm-ai-evaluation-plan` only after the readiness gaps are
  resolved and the owner wants a formal paired test.

## Not covered

This **fictional fixture** does not establish source accuracy, model quality,
regression rates, customer outcome, time savings, ROI, causality, adoption,
traffic, GitHub stars, security, privacy, compliance, accessibility,
localization, support capacity, production readiness, rollout, or rollback
execution. No model, provider, policy system, customer record, external tool,
message send, account action, or real user was accessed.

## Review ask

Choose exactly one after the missing receipts are reviewed: `Test now`,
`Validate further`, `Sequence later`, or `Avoid for now`. The first correction
needed is a named accountable owner plus an approved source/version.
