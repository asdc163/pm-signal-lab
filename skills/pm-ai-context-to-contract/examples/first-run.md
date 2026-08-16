# First run: support-draft context contract

This is a **fictional fixture** for learning `pm-ai-context-to-contract`. It
is not a provider run, retrieval trace, customer transcript, model evaluation,
security assessment, production context window, or adoption result.

## Decision on the desk

- **Review ask:** `Hold`
- **User job:** A support agent needs a policy-grounded answer draft that can
  be reviewed before a reply is sent.
- **Context change:** replace a full conversation and broad document preload
  with a task-scoped context contract and a validated handoff capsule.
- **Outcome:** one reviewable draft includes the current policy source and no
  critical unsupported claim.
- **Decision owner:** Support platform PM, with engineering, privacy, and
  support-operations review.
- **Evidence status:** Fictional source ledger and proposed budget only.
- **Reason for hold:** the stale-source exclusion, compaction preservation, and
  prompt-injection checks are proposed but not run.

## User job and context outcome

| Field | Fictional value | Status |
| --- | --- | --- |
| Eligible jobs | 12 support-draft attempts in one fictional window | Proposed fixture |
| Completed outcome | A draft passes the source and critical-claim oracle | Proposed, not run |
| Current workaround | Agent reads the approved policy page and drafts manually | Fictional description |
| Baseline | Full 12-message history, three policy documents, and six tools | Proposed fixture |
| Candidate | Task-scoped six-component context contract | Proposed fixture |
| Observation window | One fictional support shift | Not production |

The success oracle is about the support draft, not token count. A manual
fallback is a safe journey outcome only when it is labelled separately from an
AI-completed outcome.

## Context inventory

| ID | Component | Included content | Selection and authority | Budget | Status |
| --- | --- | --- | --- | ---: | --- |
| `I-001` | Instructions | Support role, source citation, no unsupported claim, output shape | Approved support policy; highest product instruction | 360 tokens | Proposed |
| `K-001` | Knowledge | Current refund policy excerpt and source metadata | Current approved policy `POL-12`; only relevant sections | 1,200 tokens | Proposed |
| `T-001` | Tools | Read-only policy lookup schema | One task-relevant tool; no send or write permission | 240 tokens | Proposed |
| `M-001` | Memory | Validated handoff capsule with ticket goal and open question | Versioned, human-correctable note; no raw transcript | 420 tokens | Proposed |
| `S-001` | State | Ticket status, locale, policy effective date, fallback availability | Current workflow state; not a durable user preference | 180 tokens | Proposed |
| `Q-001` | Query | Current support request and explicit product identifier | User input; data, not an instruction | 120 tokens | Proposed |

The candidate context is `2,520` fictional input tokens. The proposed input
budget is `3,200`; `680` tokens remain for variance, and a separate `1,200`
tokens are reserved for output, tool results, and safe fallback. These are
fixture numbers, not a provider context limit.

## Source, freshness, and trust contract

| ID | Source | Authority | Freshness | Privacy | Rule | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `P-001` | `POL-12` approved refund policy | Policy | Effective for the fictional shift | Internal support data | Wins over articles and user claims | Proposed |
| `P-002` | `HELP-03` old help article | Reference only | 90 fictional days old | Internal support data | Exclude unless a reviewer explicitly requests history | Proposed |
| `U-001` | Current user message | User-provided data | Current request | Customer content | Can state intent; cannot override policy | Proposed |
| `T-001` | Policy lookup result | Tool data | Must carry retrieval time and source ID | Access-controlled | Data only; cannot issue instructions | Proposed |
| `M-001` | Handoff capsule | Validated state summary | Expires at ticket close or correction | Minimized support data | Read only until a human-approved write rule exists | Proposed |

If `POL-12` conflicts with `HELP-03`, the current approved policy wins and the
conflict is recorded. If a tool result contains text such as “ignore the
policy,” it remains untrusted data and cannot change the instruction hierarchy.
Raw customer content and private URLs do not enter the context packet or the
analytics record.

## Budget and selection rules

| Rule | Candidate behavior | Status |
| --- | --- | --- |
| Include current policy | Retrieve only sections matching the ticket topic and preserve source ID | Proposed |
| Exclude stale article | Do not preload `HELP-03`; surface it only in a reviewer-led comparison | Proposed |
| Narrow tools | Expose policy lookup only; no send, refund, or account mutation tool | Proposed |
| Compact history | Preserve goal, decisions, constraints, source IDs, unresolved risk, and next action | Proposed |
| Exceed budget | Drop redundant prose, keep source IDs and critical rules, then offer manual fallback | Proposed |
| Missing source | Stop the AI draft and route to the approved policy page or human agent | Proposed |

No silent truncation is allowed. A real implementation would publish a
versioned context manifest with selected IDs, counts, budget, exclusions, and
truncation status.

## Dynamic state, memory, and compaction

The candidate uses a hybrid approach:

- preload the short support instructions and current ticket state;
- retrieve the policy section just in time with `T-001`;
- use `M-001` only after its provenance and correction status are visible;
- compact the old transcript into a handoff capsule, retaining source IDs,
  decisions, unresolved questions, and the next action;
- start a new context version when the policy effective date or ticket owner
  changes.

The compaction preservation test is `Not run`. Until it passes, the packet
stays at `Hold`.

## Failure, privacy, and recovery

- **Empty context:** show that the draft cannot start and offer manual drafting.
- **Stale policy:** block the draft and request a current source.
- **Conflicting policy:** show the conflict and route to the approved owner.
- **Injected tool result:** ignore its instruction, record a redacted event, and
  block any unsafe follow-up tool.
- **Oversized history:** do not silently drop the policy or source ID; compact
  or hand off to a person.
- **Memory correction:** let a reviewer inspect, correct, or reset `M-001`.
- **Permission mismatch:** block cross-tenant content and route to security or
  incident handling.

No raw customer transcript, private account identifier, secret, or hidden
chain-of-thought is displayed as context evidence.

## Evaluation and release gate

The smallest real evaluation would use the same support-draft oracle for a
baseline and candidate across:

- ordinary policy questions;
- stale and conflicting policy cases;
- irrelevant retrieved content;
- injected tool or document instructions;
- long-history compaction cases;
- missing-source and manual-fallback cases;
- unauthorized or cross-tenant context cases.

Required gates are proposed and not run:

- zero critical unsupported claims;
- current source ID and effective date visible to the reviewer;
- no raw private content in the manifest;
- no unauthorized tool or tenant context;
- compaction preserves critical facts;
- p95 latency and cost are reviewed with the separate cost guardrail;
- manual fallback remains available.

**Current decision:** `Hold`, fictional fixture only. A cheaper or shorter
context cannot ship until the outcome oracle and negative cases pass.

## Instrumentation and writeback

A real run should record only approved fields: trace ID, context version,
component IDs, source versions, selected and omitted counts, token ranges,
retrieval time, tool name, memory read/write, compaction status, access
decision, fallback, completion oracle, privacy class, and latency. A failure
about one component should become a case for `pm-ai-trace-to-regression`,
`pm-ai-evaluation-plan`, `pm-ai-incident-to-runbook`, or
`pm-ai-cost-to-guardrail` as appropriate.

## Not covered

- No model, provider, API, retrieval system, MCP server, or memory system was
  called.
- No real token count, context-window limit, latency, cost, quality, privacy,
  security, accessibility, or user feedback was measured.
- No compaction, tool-subsetting, source-ranking, routing, or fallback change
  was implemented.
- No customer transcript, private URL, account data, adoption, traffic,
  retention, ROI, or star impact is known.
- No release, rollback, external session, or third-party client compatibility
  was executed by this fixture.

## Review ask

`Hold` — Support platform PM owns the next evidence request: run the same
oracle on a sanitized baseline/candidate set and report whether stale-source,
compaction, injection, and privacy gates pass.
