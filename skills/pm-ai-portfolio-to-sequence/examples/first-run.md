# First run: support workflow portfolio

This is a **fictional fixture** for a small AI workflow portfolio. It is not a
roadmap commitment, adoption result, transformation proof, or production plan.

## Request

> We have three AI ideas. The support-draft demo is popular, the policy search
> project has a good prototype, and an agent could issue refunds. Which one
> should go first, and what should we build in parallel?

## Candidate cards

### A. Support-draft workflow

- **User/job:** support agent prepares a routine English email reply.
- **Value model:** workforce workflow / customer support.
- **Maturity:** `Pilot`, based on a fictional internal review. The quality bar,
  accepted outcomes, support capacity, and baseline are not provided.
- **Owner:** support operations lead, name not provided.
- **Foundation:** written review rubric, manual fallback, feedback route, and
  support owner.
- **Risk:** low-risk slice is proposed; billing, safety, legal, multilingual,
  and unusual policy cases are out of scope.
- **Stop condition:** pause if an out-of-scope case reaches the workflow without
  a human review path.

### B. Policy search

- **User/job:** support agent finds the current policy source before drafting.
- **Value model:** system/context foundation.
- **Maturity:** `Validate`; prototype status only.
- **Owner:** not provided.
- **Foundation:** source authority, freshness, retrieval evaluation, and
  citation review.
- **Dependency:** possible `shared_foundation` for A, but the relationship is
  `unverified` until the support owner confirms it.
- **Stop condition:** hold if source freshness or citation review cannot be
  assigned.

### C. Refund action agent

- **User/job:** resolve an eligible refund request by checking policy and
  taking an external action.
- **Value model:** process re-engineering / high-impact action.
- **Maturity:** `Explore`.
- **Owner:** not provided.
- **Foundation:** identity, least privilege, approval, audit receipt,
  observability, exception handling, and rollback.
- **Dependency:** `prerequisite` on those control foundations. The owner and
  verification date are not provided.
- **Stop condition:** no external action without a verified approval and manual
  fallback path.

## AI Portfolio Sequence Brief

### Decision in one line

**Start A at a narrow Pilot**, with the review rubric and support route as
`Foundation first`; keep B as `Next` only after its source/evaluation edge is
verified; keep C at `Hold`. There is no evidence or capacity basis for running
all three in parallel.

### Portfolio limits

- Support owner: `Not provided`.
- Evaluation/reviewer capacity: `Not provided`.
- Budget/quota: `Not provided`.
- Concurrent bets: `Not provided`; default to one workflow plus only the
  smallest shared foundation until an owner confirms otherwise.
- Opportunity cost: `Not estimable`.

Because the limits are missing, the sequence is a proposal for the next review,
not an approved roadmap.

### Dependency and foundation map

| From | To | Relationship | Status | Confirmation receipt |
| --- | --- | --- | --- | --- |
| review rubric + support route | A | `prerequisite` | proposed | named owner and low-risk review window |
| source authority + retrieval eval | B | `prerequisite` | `Not verified` | source ledger, freshness, and reviewed cases |
| B | A | `shared_foundation` | `unverified` | support owner confirms policy lookup is in A's job |
| identity + approval + audit + rollback | C | `prerequisite` | missing | control contract and negative cases |

The card names show why "build policy search first" is not automatically right:
its role in A has not been confirmed, while its own source/evaluation work may
be valuable. Do not turn a shared label into a dependency without a receipt.

### Sequence

#### Foundation first: review and support for A

- **Entry:** a named support owner agrees to a low-risk English email slice.
- **Learning job:** can a human reviewer use a written bar and manual fallback
  to keep the workflow supportable?
- **Exit receipt:** eligible cases, reviewed outputs, edits/rejections,
  escalations, support notes, and a review date.
- **Route if it fails:** `Hold` A and revise the slice or support path.

#### Start: A, narrow Pilot

- **Entry:** the foundation receipt above exists.
- **Learning job:** does the same support role return to the workflow for the
  named job and accept useful drafts without creating more work than it saves?
- **Exit receipt:** repeated useful behavior, quality by slice, correction and
  escalation reasons, support burden, and a baseline-backed outcome if one is
  measurable.
- **Route if it fails:** `Revise`, `Hold`, or `Stop` A according to the receipt.

#### Next: B, only after its edge is verified

- **Entry:** source authority, freshness, retrieval evaluation, and the B-to-A
  relationship are confirmed by owners.
- **Learning job:** does policy search provide current, reviewable evidence for
  the support job without adding unacceptable delay or review burden?
- **Exit receipt:** source ledger, retrieval slice, citation review, support
  handoff, and a decision about whether B actually unlocks A.
- **Route if it fails:** keep B at `Validate` or `Hold`; do not count the
  prototype as a shared foundation.

#### Hold: C, refund action agent

- **Reason:** identity, authorization, approval, audit, exception handling,
  observability, and rollback are not verified. The high-impact action has no
  owner or control receipt.
- **Unlock condition:** a separate control and evaluation package passes for
  the exact action and a human fallback is ready.
- **Route if it fails:** `Hold` or `Retire`; a popular demo does not move C.

### Reorder rule

If A's low-risk window produces a verified accepted-outcome and support receipt,
the support owner may propose moving B from `Next` to `Parallel` for one
bounded policy slice, subject to evaluator capacity. If the support route or
reviewer capacity fails, A and B move to `Hold`. C remains `Hold` until its own
control receipt passes. The portfolio owner is not provided, so approval is
`Not provided`.

## Not covered

This **fictional fixture** does not verify quality, adoption, value, causal
impact, staffing, capacity, budget, dependency truth, security, privacy,
compliance, accessibility, localization, production readiness, or a real
roadmap. No provider, support queue, policy source, customer record, or
external action was accessed.
