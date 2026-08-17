# Worked reference: fictional support-draft orchestration contract

This is a fictional fixture for a pre-launch review. It contains no real
customer, provider, model, prompt, trace, price, quota, policy, permission,
credential, receipt, or production evidence.

## Method note

The structure is informed by the [OpenAI Agents SDK overview](https://openai.github.io/openai-agents-python/), its [agent orchestration guide](https://openai.github.io/openai-agents-python/multi_agent/), [handoff guide](https://openai.github.io/openai-agents-python/handoffs/), [guardrails guide](https://openai.github.io/openai-agents-python/guardrails/), and [tracing guide](https://openai.github.io/openai-agents-python/tracing/). These official documents illustrate manager-style orchestration, handoffs, tool-level guardrails, and workflow traces. They do not establish the fictional workflow, candidates, policy, quality, or production readiness below.

## Decision on the desk

`Hold` an autonomous multi-agent workflow. A draft-only `Pilot` may be
considered after the state model, policy freshness, step permissions, join
rule, receipt behavior, and negative evaluation cases are verified.

- **User/job:** help a support worker prepare a clear billing reply while an
  authorized billing owner retains policy and account authority.
- **Current workaround:** the support worker reads the ticket and current
  policy manually, then writes and reviews a draft.
- **Proposed workflow:** deterministic code classifies the job and controls
  policy freshness; a bounded specialist may draft from approved context; the
  billing owner reviews and decides the next action.
- **Decision owner:** support product owner with billing, platform, privacy,
  and support-operations owners.
- **Evidence status:** fictional proposal; no run, trace, receipt, approval,
  or user session was executed.

## User/job and workflow boundary

| Boundary | Allowed | Denied | Status |
|---|---|---|---|
| Support worker | supply an authorized ticket slice, review/edit a draft, request policy clarification | upload unrelated records or delegate eligibility | proposed |
| Workflow | classify a bounded job, retrieve a versioned policy, prepare a draft, wait for review | grant authority, widen tenant scope, or send a reply | proposed |
| Billing owner | verify policy/account facts, edit or approve the final reply | act outside the authorized role or tenant | authority `Not provided` |
| External system | read-only policy lookup in the pilot | payment mutation, account change, outbound send | denied by boundary |

The safe manual alternative is the current support process. If the policy is
stale, the target is ambiguous, or the receipt is missing, the workflow stops
and asks the human owner to reconcile it.

## Workflow topology and ownership

The chosen topology is a **code-controlled graph with one bounded specialist
call**. It is smaller and easier to review than a free-form manager or a
handoff chain because the job has known states and a high-impact authority
boundary.

| Option | Decision | Reason and tradeoff |
|---|---|---|
| Code-controlled graph | chosen for pilot | code owns freshness, permissions, joins, and terminal states; it costs more explicit state work |
| Manager with specialists | deferred | useful for independent expertise, but model-selected delegation can hide context and loop cost |
| Handoff chain | deferred | useful when a specialist owns the next user turn, but ownership and resume behavior are not yet specified |
| Parallel fan-out | narrow use only | policy metadata and language checks may run independently; the final draft waits for the required join |

The model may classify an ordinary versus ambiguous draft only as a proposal.
Deterministic code decides whether the job is eligible, whether policy is
fresh, whether the required fields exist, and whether a human review state is
mandatory. The human owns eligibility and send authority.

## Step contract

| ID | Owner | Input and source boundary | Output and oracle | Budget / side effect | Status |
|---|---|---|---|---|---|
| `W-01` classify | deterministic code with model suggestion | authorized ticket slice; source `S-ticket` | `ordinary`, `ambiguous`, `high-impact`, or `unsupported`; schema check and human review for uncertainty | one attempt; no external write | proposed |
| `W-02` policy freshness | deterministic code + read-only policy tool | tenant-scoped policy ID and snapshot `S-policy` | current version, freshness result, and source IDs; stale or missing blocks the path | one read; receipt `R-policy`; no mutation | proposed |
| `W-03` draft | bounded drafting specialist | only approved fields from `W-01` and fresh `W-02` | short structured draft with source IDs and no eligibility promise; support rubric oracle | one model turn, one bounded retry, no tool write | proposed |
| `W-04` review | billing human | draft, source IDs, diff, and uncertainty flags | edit/approve/reject; approval ID and expiry | no automatic send; human-owned decision | proposed |
| `W-05` close | deterministic code | review result and receipt | `Completed` only when the reviewed draft is saved; otherwise `Rejected`, `Cancelled`, or `Unknown` | idempotent save if authorized; no outbound send | proposed |

`W-02` may have a small parallel metadata check, but the join requires both
policy freshness and tenant match. A single successful lookup is not enough to
mark the workflow ready.

## State and transition map

| From | Condition / actor | To | Visible state and receipt |
|---|---|---|---|
| `New` | authorized worker submits required fields | `Planning` | show job ID and no model action yet |
| `Planning` | `W-01` returns a supported slice | `Policy check` | show classification as proposed, not a decision |
| `Planning` | missing or uncertain target | `Needs clarification` | show the missing field; no draft or tool write |
| `Policy check` | `W-02` fresh and tenant-matched | `Drafting` | record `R-policy` and source freshness |
| `Policy check` | stale, denied, or missing receipt | `Needs review` | block drafting and route to policy owner |
| `Drafting` | `W-03` passes schema and content checks | `Needs review` | show draft, sources, uncertainty, and `R-draft` |
| `Drafting` | timeout, invalid output, or budget breach | `Manual fallback` | truthful incomplete state; no automatic replay |
| `Needs review` | billing owner edits or approves | `Approved` or `Rejected` | record approval ID, diff, actor, and expiry |
| `Approved` | authorized save succeeds with receipt | `Completed` | reviewed draft saved; outbound send remains separate |
| any running state | cancellation or expiry | `Cancelled` | preserve evidence and stop dependent work |
| external action has unknown result | no receipt after timeout | `Unknown` | block retry and assign reconciliation owner |

## Control budget and side-effect boundary

Proposed pilot limits are one classification attempt, one policy read per
version, one draft turn plus one safe retry, one specialist, and a bounded
wall-clock window. Exact values are `Not provided`; the owner must set them
before execution. The workflow cannot expand context across tenants, call an
unlisted tool, or turn a review approval into an outbound send.

Every request receives a workflow ID, policy version, step ID, attempt number,
and idempotency key. The receipt must include status, actor, source IDs,
policy/config version, redacted target, timestamp, and the next owner. It must
not contain raw ticket text, payment data, authorization headers, or hidden
model reasoning.

## Failure, recovery, and escalation

| Failure | User-visible state | Blocked action | Recovery / owner |
|---|---|---|---|
| missing ticket field | `Needs clarification` | drafting | worker supplies the smallest missing field |
| stale policy | `Needs review` | draft and eligibility promise | policy owner refreshes and reopens a new version |
| tenant mismatch | `Permission denied` | provider/tool egress | privacy or support owner verifies scope; no raw data disclosure |
| invalid draft schema | `Draft unavailable` | review or save | record a regression case; manual draft path |
| tool timeout with no receipt | `Unknown` | retry and dependent steps | platform owner reconciles before replay |
| draft specialist unavailable | `Manual fallback` | autonomous continuation | support worker writes manually |
| human approval expires | `Review expired` | save or send | create a fresh review with current policy |
| duplicate save request | `Reconcile` | second mutation | use idempotency key and verify the existing receipt |
| prompt injection or untrusted policy text | `Blocked for review` | tool or model continuation | contain, redact, add negative case, and security review |

## Evaluation and release gate

The smallest evaluation has six fictional, versioned slices:

| Slice | Oracle | Guardrail | Status |
|---|---|---|---|
| `E-01` ordinary draft | clear, structured, source-bounded draft | no unsupported eligibility promise | not run |
| `E-02` ambiguous refund | asks for a fact or routes to human | no invented policy or account action | not run |
| `E-03` stale policy | blocks drafting and exposes source freshness | no stale-context egress | not run |
| `E-04` tool timeout | manual or `Unknown` recovery | no blind replay or false completion | not run |
| `E-05` tenant mismatch | deny before provider/tool call | no cross-tenant data | not run |
| `E-06` edited approval | invalidates old approval and requires new review | no execution of edited content | not run |

Measure workflow-state correctness, step oracle pass rate, human review
comprehension, tool/permission safety, cost, latency, fallback, and saved
outcome separately. No threshold is supplied. Proposed decision rules:

- `ship_if`: all critical negative slices pass, receipts reconcile, and human
  review has a clear owner;
- `iterate_if`: normal slices work but state, recovery, or comprehension has a
  fixable mismatch;
- `hold_if`: version, source, permission, receipt, denominator, or trace is
  missing;
- `rollback_if`: an unauthorized side effect, cross-tenant egress, false
  completion, or unreconciled external state occurs;
- `inconclusive_if`: evidence is too small or contradictory to distinguish
  topology, model, tool, policy, or UX causes.

## Not covered

- No model, provider, framework, agent, tool, policy, or workflow was executed.
- No claim is made about model quality, latency, cost, security, reliability,
  safety, human comprehension, adoption, production readiness, or star growth.
- Real approval behavior, external receipts, rollback execution, mobile and
  accessibility results, localization, prevalence, and user outcome are not
  measured.

## Implementation handoff

The next owner packet should create a versioned state machine, deterministic
permission/freshness validators, a bounded specialist adapter, redacted trace
fields, six eval cases, receipt reconciliation, and the human review surface.
The owner should run the pilot in read-only or draft-only mode first and keep
the outbound send path separate. This reference is not implementation approval.

## Review ask

`Need evidence`: the support product owner, platform owner, privacy owner, and
billing owner must provide the workflow version, state transition oracle,
policy freshness rule, receipt schema, control budgets, and negative-evaluation
results before any automatic routing or external write is considered.
