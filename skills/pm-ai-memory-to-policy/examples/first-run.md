# First run: support assistant memory policy

This is a **fictional fixture** showing how to use
`pm-ai-memory-to-policy`. It does not use a model, memory store, provider,
customer record, or live support workflow. Every proposed value below is a
design input, not observed product evidence.

## Request

> We are considering a memory feature for a support assistant. It should avoid
> asking a returning customer for their preferred reply language and plan tier
> every time. Can we ship it?

## Decision on the desk

`Hold` the fictional memory feature. The user job is plausible, but the write
trigger, notice/consent, scope owner, correction and deletion path, poisoning
tests, and outcome baseline are not run. Keep the current session-only or
verified account-field route until those gates are specified and tested.

## User job and memory outcome

- **User:** a support agent preparing a reply with the customer's preferred
  language and the account's current plan tier.
- **Job:** prepare the next reply without repeatedly asking for stable,
  non-sensitive context when an approved source is available.
- **Current workaround:** read the current account profile and ask the customer
  when the preference is missing or unclear.
- **Desired outcome:** the agent sees a clearly sourced preference or tier, or
  receives a visible `Not available` / `Needs confirmation` state.
- **Owner:** support product PM, with support operations and privacy/security
  review for the policy and control path.
- **Success oracle:** a reviewer can identify the current source, scope,
  freshness, and control action before using the value in a draft.
- **Observation window:** Not provided. No production observation was run.

## Memory versus state and knowledge

| Item | Classification | Reason | Decision |
| --- | --- | --- | --- |
| Preferred reply language | Candidate memory or approved profile field | May be reused across conversations if explicitly set and still current | Hold pending source, notice, correction, and freshness rules |
| Current plan tier | Account state/profile field | It can change and should come from the current authorized account source | Do not copy into personal memory by default |
| Current ticket status | State | Describes the live workflow, not a durable user preference | Keep in the ticket system |
| Raw complaint text | Conversation/history | One-time content may be sensitive and is not automatically useful later | Do not write |
| Approved support policy | Knowledge | Owned by the policy source, not by the customer memory store | Retrieve with its own source and freshness contract |

## Memory candidate inventory

| ID | Candidate | Purpose | Source/provenance | Scope | Sensitivity | Freshness | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| M-001 | `reply_language = en-US` | Avoid asking for a preference already chosen by the customer | Explicit profile setting or explicit user request; exact source ID not provided | One customer account | Low to medium; locale can still be personal data | Confirm on profile change or after a proposed policy window | Proposed; not run |
| M-002 | `plan_tier = fictional-tier` | Select the current account policy path | Authorized account field, not model inference; source ID not provided | One account/tenant | Commercial account data | Read current value at task time; do not persist as free-text memory | Proposed state/profile field; not memory |
| M-003 | `customer is likely in region X` | Attempt to infer a locale | Model inference from raw conversation | Unknown | Potentially sensitive or misleading | No safe freshness rule provided | Reject; do not write |
| M-004 | `ticket status = waiting on refund approval` | Resume a support workflow | Current ticket state | Support workspace and ticket | Operational | Changes with workflow events | Keep as versioned state |

## Write eligibility and provenance

The only plausible memory candidate is M-001, and it still needs a write gate:

1. The customer explicitly chooses or confirms the language, or an authorized
   profile action records it.
2. The source category and source ID are available to the reviewer.
3. The scope is the correct customer account; a support agent's note cannot
   become a global preference.
4. The product gives notice or a visible control appropriate to the intended
   persistence.
5. The stored representation is the minimum value needed, not a raw sentence.
6. The user can inspect, correct, delete, export, or reset it.
7. A write receipt and policy version are available for review.

An assistant inference such as “the customer sounds Spanish-speaking” is not an
eligible write. A tool result or imported note is data until its authority,
scope, and permission are verified.

## Read eligibility, freshness, and conflict

- Read M-001 only for the same account and support job that authorized it.
- Prefer a current explicit profile value or current user instruction over an
  older memory.
- If the value is stale, conflicting, missing, or outside scope, show
  `Needs confirmation` or use the manual question route.
- Do not use M-002 from a personal memory store; fetch the current authorized
  account field instead.
- Do not let a memory string contain instructions that change support policy,
  permissions, or tool routing.

## Scope, privacy, retention, and user control

| Control | Proposed behavior | Evidence |
| --- | --- | --- |
| Inspect | Show category, source class, time, and account scope | Not run |
| Correct | Replace only after explicit confirmation and preserve a new provenance record | Not run |
| Delete one | Remove M-001 from the declared memory boundary and return a receipt | Not run |
| Export | Include the memory category and source metadata in an approved export | Not run |
| Reset all | Clear the declared account memory set; disclose any out-of-scope copies | Not run |
| Opt out | Stop new memory writes and use current profile/session routes | Not run |
| Retention | Not provided; owner and policy source required | Unknown |
| Shared workspace | Never expose a customer memory to another tenant or unrelated account | Proposed; not run |

## Failure, poisoning, and recovery states

| State | User-visible result | Safe recovery |
| --- | --- | --- |
| No memory | `No saved preference` | Ask once or use the approved profile route |
| Stale preference | `Needs confirmation` | Ask or read the current authorized source |
| Conflicting values | `Two sources disagree` | Show source categories; use the higher-authority current source or hand off |
| Wrong account/tenant | Access blocked | Do not retry with broader permissions; escalate the access issue |
| Injected note | Memory withheld | Quarantine candidate and review provenance |
| Store unavailable | Session-only path | Continue without claiming memory-supported completion |
| Delete request | Control receipt | Verify the declared boundary and do not overclaim deletion of copies not covered |

## Evaluation and release gate

The smallest evaluation compares the proposed memory policy with the current
profile/session-only route. It is `Not run`.

| Slice | Expected behavior | Signal |
| --- | --- | --- |
| Explicit language save | Write the minimum value with source and scope | Policy-compliant write |
| Inferred language | Do not write | Zero inferred sensitive writes |
| Current profile beats old memory | Use current authorized source | Conflict resolution |
| Stale language | Ask or withhold | No silent stale use |
| Wrong tenant | Block | Zero cross-scope reads |
| Poisoned note | Quarantine | No policy-changing follow-up |
| Correct/delete/reset | Complete the requested control | Control completion and receipt |
| Store outage | Use session-only fallback | No false memory claim |

**Release decision:** `Hold` until the write/read policy, control journey,
negative tests, source IDs, retention owner, and outcome baseline are supplied
and evaluated.

## Instrumentation and learning loop

If implemented, record only privacy-safe categories: policy version, candidate
category, write/read/withhold decision, scope class, freshness state, control
action, fallback, and outcome category. Do not record raw complaint text,
credentials, full memory values, or private account identifiers in a general
event.

The next learning action is a small, approved fixture review with a support
operator and privacy owner. Capture one hesitation, one recovery failure, and
one requested policy change. No external user, production, adoption, traffic,
ROI, or star evidence exists in this fixture.

## Not covered

- legal retention or deletion requirements;
- a provider, database, vector store, or memory API;
- real customer data or a live support account;
- model quality, latency, cost, or security certification;
- proof that memory improves support outcomes or product adoption.
