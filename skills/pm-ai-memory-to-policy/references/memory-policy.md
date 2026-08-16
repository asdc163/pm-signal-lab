# Worked reference: support assistant memory policy

This is a **fictional fixture** demonstrating a PM policy for a persistent
memory feature. It is not a live memory implementation, provider comparison,
privacy review, legal opinion, security certification, customer study, or
production claim.

## Contents

- [Decision and outcome](#decision-and-outcome)
- [Memory boundary](#memory-boundary)
- [Candidate inventory](#candidate-inventory)
- [Write and read policy](#write-and-read-policy)
- [Provenance, scope, and freshness](#provenance-scope-and-freshness)
- [User control and recovery](#user-control-and-recovery)
- [Evaluation and release gate](#evaluation-and-release-gate)
- [Instrumentation and writeback](#instrumentation-and-writeback)
- [Source note](#source-note)
- [Not covered](#not-covered)

## Decision and outcome

**Decision on the desk:** `Hold` the fictional `support.remember_language`
capability until its write gate, account scope, user controls, poisoning tests,
and current-source fallback are evaluated against one completion oracle.

**User job:** A support agent needs to prepare a reply in the customer's
explicitly chosen language without repeatedly asking for the same preference.

**Outcome:** The reviewer can either use a current, attributable preference or
see a clear `Needs confirmation`, `Not available`, or `Permission blocked`
state. A fluent reply without that evidence is not a memory-supported success.

**Current workaround:** Read the authorized account profile and ask the
customer when the preference is absent or unclear.

**Candidate:** A narrow account-scoped preference record with explicit source,
write eligibility, freshness, correction, deletion, export, reset, and opt-out
behavior. It is not a generic conversation archive.

**Owner:** Support product PM owns the decision; support operations owns the
fallback; engineering owns instrumentation and implementation; privacy/security
owns the data-class and cross-scope review.

## Memory boundary

| Data | Classification | Product rule | Status |
| --- | --- | --- | --- |
| Explicit reply language | Durable preference candidate | May be written only from an authorized explicit signal | Proposed |
| Current plan tier | Account state/profile | Read from the current account source; do not duplicate as free-text memory | Proposed |
| Ticket status | Workflow state | Keep versioned in the ticket system | Proposed |
| Support policy article | Knowledge | Retrieve from its approved source and freshness rule | Proposed |
| Raw conversation | History | Keep under its own retention and access policy; not automatic memory | Proposed |
| “Customer seems anxious” | Inferred sensitive candidate | Reject without an approved policy and human review | Proposed rejection |

The boundary prevents a convenient “customer profile memory” bucket from
silently becoming a second account database or a place for model guesses.

## Candidate inventory

| ID | Purpose | Source | Scope | Freshness | User value | Non-memory route | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| M-001 | Reuse explicit reply language | Profile action or explicit user request, with source ID | Customer account | Confirm on profile change or policy-defined event | Fewer repeated questions while preserving choice | Current profile read or ask | Proposed |
| M-002 | Select account policy | Authorized account field with current version | Account/tenant | Current at task time | Avoid using an outdated tier | Current account read | State/profile, not memory |
| M-003 | Infer locale from wording | Model inference from conversation | Unknown | No safe rule | Unproven | Ask or use explicit profile | Rejected |

## Write and read policy

### Write gate

`M-001` is eligible only when all of these conditions hold:

1. The user explicitly requests saving the preference, or an authorized profile
   action records it.
2. The value is normalized to an allowed locale field; raw conversation text is
   not stored as the memory value.
3. The source category, source ID, writer class, account scope, time, and
   policy version are recorded.
4. The product gives notice and exposes the relevant inspect/correct/delete/
   export/reset/opt-out control.
5. The write is idempotent for the same source event and does not widen scope.
6. The value is not inferred from tone, name, location guess, or language model
   confidence.

If any condition is missing, route to `No write` or `Hold`. A model-proposed
candidate can be shown for confirmation, but it cannot become durable memory
just because it sounds plausible.

### Read gate

Read `M-001` only when:

- the current support job needs a reply-language preference;
- the requesting actor and current account match the memory scope;
- the item is within its freshness rule and has an attributable source;
- no newer explicit user instruction or authorized profile value conflicts;
- the item is not quarantined, deleted, opted out, or under correction;
- the user-facing flow can expose a useful category/source/time notice when the
  preference affects the draft.

When the gate fails, do not substitute an empty answer that looks like no
preference exists. Return a typed state such as `Needs confirmation`,
`Permission blocked`, or `Memory unavailable`, then use the current profile,
ask, or hand off.

## Provenance, scope, and freshness

### Memory ledger

| Field | M-001 contract | Evidence |
| --- | --- | --- |
| Memory ID | Stable `M-001` | Proposed |
| Value shape | Allowed locale code, not raw text | Proposed |
| Source category | Explicit user request or authorized profile action | Proposed |
| Source ID | Required; exact ID not present in fixture | Not provided |
| Writer | User or authorized profile service | Proposed |
| Written at | Required timestamp | Not run |
| Scope | One customer account; no global or cross-tenant read | Proposed |
| Policy version | Required for migration and rollback | Proposed |
| Freshness | Confirm after an approved change event or policy window | Not provided |
| Transformation | Normalization from approved input to locale field | Proposed |
| Control status | Active, corrected, deleted, opted out, or quarantined | Proposed |

### Conflict rule

An explicit current user instruction or current authorized profile field outranks
an older memory. An untrusted note, retrieved excerpt, or memory content cannot
change that authority order. If source times or authority are unavailable,
surface the conflict and abstain.

### Scope rule

The account is the smallest useful boundary for this fixture. A support agent's
personal preference, a workspace note, and a customer account preference are
different scopes. A shared workspace must not inherit a private account memory
without an explicit product rule and access check.

## User control and recovery

| Journey | Expected behavior | Completion evidence |
| --- | --- | --- |
| Inspect | Show category, source class, written time, scope, and current status | User can identify what is remembered without raw private content |
| Correct | Accept an explicit replacement and create a new provenance version | New version, old version status, and receipt |
| Delete one | Remove or disable M-001 within the declared boundary | Deletion receipt and boundary statement |
| Export | Include the memory category and source metadata in an approved export | Export receipt; copies outside scope disclosed |
| Reset all | Clear the declared account memory set | Reset receipt and verification step |
| Opt out | Block future memory writes and use session/current-source routes | Opt-out state and fallback |
| Store unavailable | Continue without memory or ask | No false memory-supported completion |
| Wrong memory | Quarantine or suppress before another read | Recovery record and re-enable rule |

An explanation should be a concise evidence summary, not hidden reasoning:
“Saved language preference from an explicit account setting on [time]; scope:
this account; change or delete it here.” Fixture timestamps are not supplied.

## Evaluation and release gate

The candidate must be compared with the current account-profile/session-only
route using one task set and one completion oracle. The fixture has not run.

| Slice | Expected behavior | Metric or oracle | Status |
| --- | --- | --- | --- |
| Explicit save | Write normalized value with source and scope | Policy-compliant write | Not run |
| Model inference | Do not write | Inferred-write rate = 0 for this slice | Not run |
| Current profile conflicts with old memory | Use current authorized source | Correct authority route | Not run |
| Stale memory | Confirm, refresh, or withhold | Silent-stale-use rate | Not run |
| Wrong account/tenant | Block | Cross-scope read rate = 0 | Not run |
| Injected memory text | Treat as data and quarantine | Unsafe policy-changing follow-up | Not run |
| Correction/delete/export/reset | Complete control request | Control completion rate | Not run |
| Store outage | Use session-only fallback | Honest fallback receipt | Not run |
| Completed support draft | Improve the stated job without new trust/privacy failure | Same completion oracle as baseline | Not run |

**Gate:** `Hold` unless write precision, read usefulness, wrong-memory
intervention, control completion, privacy/scope negatives, and fallback are
defined with denominators and meet an owner-approved threshold. Thresholds are
`Not provided`; do not invent them.

**Rollback:** disable new writes, suppress the candidate memory class, restore
the last approved policy version, and route to current profile/session-only
behavior. Re-enable only after the failed slice is reproduced and rechecked.

## Instrumentation and writeback

Store privacy-safe event fields only: policy version, memory category, write or
read decision, scope class, freshness state, conflict category, control action,
fallback, and outcome category. Keep raw values, customer text, credentials,
private URLs, and hidden reasoning out of general analytics.

The next learning action is a review with one support operator and one
privacy/security owner using synthetic cases. The review should capture one
confusion, one recovery failure, and one requested policy change. A synthetic
review is a design signal, not non-owner adoption or production evidence.

## Source note

The policy shape is informed by official engineering material, not by the
fictional support fixture:

- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
  describes structured note-taking or agentic memory as notes persisted beyond
  the current context and discusses retrieving them later for long-horizon
  work.
- [Anthropic: How we contain Claude across products](https://www.anthropic.com/engineering/how-we-contain-claude)
  discusses persistent context, untrusted tool/content surfaces, and the need
  to constrain agent blast radius. It motivates explicit provenance, scope,
  quarantine, and rollback questions; it does not validate this policy.
- [OpenAI Developers](https://developers.openai.com/) currently lists
  “Context Engineering for Personalization - State Management with Long-Term
  Memory Notes Agents SDK” among its cookbook topics. The index signals a
  relevant implementation topic; it does not prove demand, quality, or a
  provider-independent product rule.

## Not covered

- a live memory store, API, database, vector index, or provider choice;
- jurisdiction-specific retention, deletion, or consent law;
- actual account data, support transcripts, or user research;
- model quality, cost, latency, privacy, or security certification;
- evidence that persistent memory increases task completion, retention,
  traffic, adoption, or GitHub stars.
