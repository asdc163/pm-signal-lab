# First run: support answer claim-to-citation review

This is a **fictional fixture** showing how to use
`pm-ai-claim-to-citation`. It does not call a model, search engine, provider,
support account, customer record, or source system. The answer, sources, IDs,
and statuses below are proposed fixture data, not observed factual evidence.

## Request

> An AI drafted this support answer: “The refund window is 30 days, this
> account qualifies, no approval is needed, and the policy was updated
> yesterday.” Can we show it with the policy citation?

## Decision on the desk

`Hold` the fictional answer. The policy fixture may support a narrow refund
window claim, but it does not establish account eligibility, approval status, or
the update date. Keep the answer as a draft and route the missing account and
policy evidence to support operations.

## User job and answer boundary

- **User job:** A support agent needs a reviewable, current refund explanation
  for one account before sending a reply.
- **Audience:** One support agent; no customer-facing send is in this run.
- **Success oracle:** Every consequential claim has a safe source locator,
  support relation, freshness/authority status, and a visible next action.
- **Risk:** Financial and customer-trust impact; human review is required.
- **Answer boundary:** Only the four sentences above and the three fictional
  source records below. No live retrieval or hidden model reasoning.

## Claim ledger

| ID | Claim | Type | Source IDs | Status | Limitation | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| C-001 | The policy allows refunds within 30 days. | policy fact | S-001 | `supported-in-fixture` | Applies only to the stated policy scope. | Keep narrow citation. |
| C-002 | This account qualifies. | account judgment | S-001, S-002 | `not-verified` | Purchase age and exception state are not provided. | Ask for approved account evidence. |
| C-003 | No approval is needed. | workflow rule | S-001 | `partially-supported` | Policy requires review for an exception; this account's exception state is unknown. | Qualify or abstain. |
| C-004 | The policy was updated yesterday. | time-sensitive fact | S-003 | `unsupported` | The fixture has no authoritative update timestamp. | Remove the sentence. |

`C-001` is the only claim eligible to appear in a narrowed draft. A citation
to S-001 cannot be inherited by C-002, C-003, or C-004 merely because the
sentences are adjacent.

## Citation and source ledger

| ID | Source class | Locator | Authority | Freshness | Permission | Status |
| --- | --- | --- | --- | --- | --- | --- |
| S-001 | fictional approved refund policy | `section=refunds; paragraph=1` | support-policy owner | `current-in-fixture` | one support workspace | Proposed; not run |
| S-002 | fictional account record | `field=purchase_age` | account connector | `Not provided` | one account | Missing field |
| S-003 | fictional release note | `section=changelog` | unknown | `Not provided` | public fixture | Not authoritative |

The public packet keeps safe source classes and locators only. It does not
include an account ID, private URL, customer text, token, or raw connector
payload.

## Reader verification and UX states

- **Supported:** Show “Refunds are allowed within 30 days under the fictional
  policy” with the S-001 section locator.
- **Partial:** Show “Approval status still needs review” and link the missing
  evidence state; do not display “no approval needed.”
- **Unsupported:** Remove the update-date sentence instead of showing a weak
  citation or a confidence number.
- **Source unavailable:** Keep the draft unsent and offer `Request approved
  policy source` or `Use manual support path`.
- **High-risk review:** Require a support owner to approve any customer-facing
  wording about eligibility, exceptions, or money.

## Evaluation and release gate

Proposed cases: one supported policy fact, account eligibility missing, approval
exception, stale update date, conflicting policy versions, private source
locator, malicious instruction inside a policy excerpt, and no source returned.
No case was executed. No citation coverage, entailment rate, customer outcome,
financial safety, production quality, adoption, traffic, or star result is
measurable from this fixture.

**Release decision:** `Hold`. The next safe test is a private, sanitized packet
with an approved policy snapshot and a reviewer who can confirm each claim
status without exposing customer content.

## Not covered

- a real refund policy, account, source system, customer, model, or provider;
- live source freshness, citation URL resolution, retrieval quality, or search
  ranking;
- legal or financial advice, production safety, factuality, or reliability;
- real user comprehension, support resolution, adoption, traffic, or stars;
- proof that a citation improves trust or support productivity.
