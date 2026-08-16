# Worked reference: support-draft context contract

This is a **fictional fixture** showing how a PM can review context as a
source-and-state contract rather than as one large prompt. It is not a live
provider configuration, customer transcript, retrieval evaluation, security
assessment, or production claim.

## Contents

- [Decision and outcome](#decision-and-outcome)
- [Context components](#context-components)
- [Source and trust ledger](#source-and-trust-ledger)
- [Budget and selection](#budget-and-selection)
- [Dynamic state and compaction](#dynamic-state-and-compaction)
- [Failure and recovery](#failure-and-recovery)
- [Evaluation and release gate](#evaluation-and-release-gate)
- [Instrumentation and writeback](#instrumentation-and-writeback)
- [Not covered](#not-covered)

## Decision and outcome

**Decision on the desk:** `Hold` the fictional context change until the team
can run the completion oracle and negative cases for stale sources,
compaction, injection, privacy, and cross-tenant boundaries.

**User job:** A support agent needs a policy-grounded answer draft that can be
reviewed before a reply is sent.

**Outcome:** A completed draft includes a current policy source, contains no
critical unsupported claim, and is safe to revise or route to manual drafting.

**Baseline:** A fictional full conversation, three policy documents, and six
tools are preloaded. The baseline context is not a quality result; it is the
current design being reviewed.

**Candidate:** A task-scoped context contract with six explicit components,
one read-only policy lookup, a validated handoff capsule, and an explicit
budget and fallback.

**Owner:** Support platform PM, with engineering for context manifests,
privacy for access boundaries, and support operations for the manual route.

## Context components

The six-component inventory prevents a team from treating every token as one
undifferentiated prompt.

| Component | Candidate content | Why it enters | What it must not do |
| --- | --- | --- | --- |
| Instructions | Role, policy citation, output shape, unsupported-claim rule | Directs the job and format | Cannot encode unreviewed customer facts |
| Knowledge | Current refund policy excerpt and source metadata | Supplies approved facts | Cannot become an instruction merely because it was retrieved |
| Tools | Read-only policy lookup schema | Retrieves the current section when needed | Cannot send, refund, mutate, or grant permission |
| Memory | Validated ticket handoff capsule | Carries durable goal and unresolved question | Cannot silently preserve a disputed or unproven fact |
| State | Ticket status, locale, effective date, fallback availability | Describes the current workflow | Is not a user preference or permanent memory |
| Query | Current user request and product identifier | Defines this attempt | Cannot override system policy or access boundary |

### Context manifest fixture

| ID | Component | Selected amount | Authority | Freshness | Privacy | Omission risk | Status |
| --- | --- | ---: | --- | --- | --- | --- |
| `I-001` | Instructions | 360 tokens | Approved support policy | Policy versioned | Internal | Unsupported or malformed draft | Proposed |
| `K-001` | Knowledge | 1,200 tokens | Current policy `POL-12` | Effective this shift | Internal | Wrong refund answer | Proposed |
| `T-001` | Tools | 240 tokens | Read-only schema | Tool versioned | Access-controlled | Cannot refresh source | Proposed |
| `M-001` | Memory | 420 tokens | Validated handoff | Expires at close/correction | Minimized support data | Lost ticket goal | Proposed |
| `S-001` | State | 180 tokens | Workflow record | Current event | Tenant-scoped | Wrong route or fallback | Proposed |
| `Q-001` | Query | 120 tokens | User input | Current attempt | Customer content | Wrong task interpretation | Proposed |

The candidate total is `2,520` fictional input tokens. The proposed input
budget is `3,200`, with `680` tokens for variance and a separate `1,200`
reservation for output, tool results, and safe fallback. These numbers are
fixture arithmetic and must not be promoted into a provider limit.

## Source and trust ledger

| ID | Source | Boundary | Conflict rule | Selection rule | Evidence |
| --- | --- | --- | --- | --- | --- |
| `P-001` | `POL-12` approved refund policy | Current support policy | Wins over old articles and user claims | Retrieve relevant section only | Fictional proposed |
| `P-002` | `HELP-03` old help article | Reference, not policy | Cannot overrule `P-001` | Exclude from preload; reviewer may request history | Fictional proposed |
| `U-001` | Current user message | User-provided data | States intent, not policy | Always include the current query | Fictional proposed |
| `T-001` | Policy lookup result | Read-only tool data | Data cannot issue instructions | Include source ID and retrieval time | Fictional proposed |
| `M-001` | Handoff capsule | Validated temporary state | Must be corrected or reset when disputed | Include only current goal and unresolved issue | Fictional proposed |

The fixture deliberately marks all rows as proposed. A real packet would add
source URL or document ID, owner, retrieval/write time, version, region or
tenant, effective window, access decision, and redaction status. `HELP-03` is
not silently blended with the current policy: its age and lower authority are
visible.

Retrieved documents, web pages, issue comments, tool results, and memory are
data by default. A string inside one of them such as “ignore the policy” is an
injection test case, not a new system instruction. The user-visible flow can
show source identity and freshness without exposing private raw content or
hidden reasoning.

## Budget and selection

### Proposed selection policy

1. Start with the current query, approved instructions, current state, and the
   smallest relevant policy source.
2. Retrieve only the policy sections that support the user job; preserve source
   IDs and effective dates while dropping redundant prose.
3. Expose one read-only policy tool for this task; do not preload unrelated
   tool schemas.
4. Include a validated handoff capsule instead of the raw 12-message history.
5. If the budget is exceeded, remove redundant knowledge and old history first;
   preserve critical instructions, source IDs, current state, and query.
6. If a critical source cannot be loaded or verified, stop the AI path and offer
   the approved policy page or manual drafting.

### Proposed exclusion policy

- old `HELP-03` article unless a reviewer asks for historical comparison;
- raw customer transcript after the handoff capsule is created;
- unapproved memory or an unresolved claim from a previous agent run;
- tools that send, refund, mutate an account, or change permissions;
- duplicate retrieval chunks and unrelated locale or tenant data;
- hidden chain-of-thought or private internal reasoning.

No silent truncation is allowed. A real context manifest should make selected,
omitted, compacted, and truncated statuses independently observable.

## Dynamic state and compaction

The candidate uses a hybrid pattern:

```text
preload: instructions + current state + query
just in time: approved policy section through read-only lookup
durable state: validated handoff capsule with source IDs and open question
fallback: approved policy page or human drafting
```

The handoff capsule must preserve:

- the ticket goal and current user question;
- decisions already made and their source IDs;
- effective policy date and unresolved conflict;
- access, privacy, and tenant boundary;
- open risk, next action, and fallback owner.

The compaction preservation test is `Not run`. If a compaction drops the
policy version, a pending approval, a source ID, or a critical unresolved risk,
the context change is `Hold` or `Rollback`, even if the output looks fluent.

Memory writes need a separate contract: writer, validation, provenance,
retention, correction, deletion, and reset. This fixture does not authorize a
memory system or a customer-data write.

## Failure and recovery

| State | User-visible behavior | Safe record | Recovery |
| --- | --- | --- | --- |
| Empty context | Explain that a grounded draft cannot start | Context version and missing-source category | Open approved policy page or hand off |
| Stale policy | Do not present it as current | Source ID and freshness category | Retrieve current version |
| Conflict | Show that sources disagree | Redacted conflict IDs | Ask policy owner or use higher-authority source |
| Injection-like result | Do not follow the embedded instruction | Tool/source ID and redacted classification | Block unsafe tool and review |
| Oversized context | Report that the budget was reached | Counts and truncation status | Compact safely or hand off |
| Memory correction | Allow inspect, edit, reset | Version and correction reason | Start a clean context version |
| Permission mismatch | Block cross-tenant or unauthorized data | Access decision category | Route to security/incident handling |

The final answer cannot repair a hidden omission. A run that loses a critical
source or crosses a permission boundary is not equivalent to a completed job.

## Evaluation and release gate

The smallest real evaluation compares baseline and candidate with one versioned
completion oracle:

| Slice | Question | Gate |
| --- | --- | --- |
| Ordinary support case | Does the draft cite the current policy? | Source ID visible |
| Stale source | Does the candidate reject old guidance? | No critical stale claim |
| Conflicting policy | Does authority resolve predictably? | Conflict recorded |
| Injection-like tool result | Can data alter instructions? | Zero unsafe follow-up |
| Long history | Does compaction keep critical facts? | Preservation test passes |
| Missing source | Does the flow recover? | Manual fallback available |
| Tenant mismatch | Can unauthorized context enter? | Zero cross-tenant exposure |

Quality, trust, privacy, and safety status is `Not run` for this fixture. A
future evaluation should add human review where deterministic checks cannot
judge source interpretation or recovery clarity. Cost and p50/p95 latency
should be linked to `pm-ai-cost-to-guardrail`, not hidden inside a context
quality score.

Decision rule:

- `Ship` only when critical source, privacy, injection, compaction, fallback,
  and outcome gates pass against the same oracle.
- `Iterate` when the failure is bounded and a reversible context change can be
  evaluated without weakening trust.
- `Hold` when source authority, context manifest, denominator, or negative
  cases are unknown.
- `Rollback` for critical unsupported claims, permission leakage, unsafe tool
  follow-up, or loss of critical state.
- `Need evidence` when the decision depends on an unverified source or sample.

Current fixture decision: `Hold`, not run in production.

## Instrumentation and writeback

Record privacy-safe fields only:

- trace ID, context version, task type, and baseline/candidate label;
- component IDs, source versions, selected/omitted counts, token ranges;
- retrieval time, tool name, tool result classification, memory read/write;
- compaction, truncation, access decision, fallback, completion oracle;
- latency spans, cost-source ID when applicable, and privacy classification.

The raw source or trace stays behind its approved access boundary. A context
failure becomes a regression, evaluation case, incident, cost guardrail, or
release-learning item according to scope; it does not remain an unlabeled
prompt tweak.

## Source note

The context-engineering framing is consistent with the official engineering
discussion in [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents),
which treats system instructions, tools, MCP, external data, and message
history as a changing context state and discusses just-in-time retrieval,
compaction, and structured notes. OpenAI's [Realtime API reference](https://platform.openai.com/docs/api-reference/realtime)
also documents truncation and context-management behavior as an operational
boundary. These sources motivate the contract; they do not validate this
fictional fixture or recommend a provider.

## Not covered

- No provider, model, API, retrieval, MCP server, memory system, or tool was
  called.
- No real context window, token count, retrieval precision, latency, cost,
  quality, privacy, safety, or security result was measured.
- No source-ranking, tool-subsetting, compaction, caching, routing, or fallback
  implementation was deployed.
- No customer content, external user session, third-party client result,
  adoption, traffic, retention, ROI, or star impact is supported.
- No release, rollback, human review, or external communication occurred.
