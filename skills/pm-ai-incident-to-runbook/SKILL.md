---
name: pm-ai-incident-to-runbook
description: Turn an AI or agent incident signal into a critical-journey impact map, evidence-bounded severity, safe containment, recovery runbook, communication boundary, verification and reopen gate, and learning writeback. Use when several runs, users, or operational signals suggest a journey-level failure and a PM needs an actionable response without inventing prevalence, root cause, or production readiness.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Incident to Runbook

Use this skill when an AI or agent problem may have crossed from one bad run
into a journey-level incident. The output is a reviewable operating packet: it
connects evidence to user impact, makes containment explicit, and defines how
an authorized owner can recover and safely reopen the path. It is not a pager,
monitor, incident-management integration, or production diagnosis.

## When to use

Use it when the input includes at least one of these signals:

- several related traces, retries, stuck states, escalations, or user reports;
- a critical AI-assisted journey is partially unavailable, unsafe, or unclear;
- a tool, approval, policy, model, retrieval, deployment, or configuration
  change may have affected more than one run;
- an owner needs a containment, recovery, communication, or reopen decision;
- a single trace already has a regression case, but the surrounding journey
  needs an incident response and learning loop.

Use `pm-ai-trace-to-regression` when the work is one concrete run or failure
case. Use `pm-ai-evaluation-plan` when no incident signal exists and the task is
to design an offline evaluation. Use `pm-release-to-learn` when the release is
healthy and the question is how to collect learning. Use `pm-ai-task-boundary`
when the decision is which work AI should be allowed to perform.

Do not use this skill to page a team, change a feature flag, resume a paused
run, replay a tool call, contact customers, publish a status claim, or declare
an incident resolved. Produce a bounded handoff for an authorized owner.

## Guardrails

1. Preserve stable evidence IDs, trace or run IDs, timestamps, workflow and
   version boundaries when supplied. If a field is absent, write `Not provided`.
2. Redact names, email addresses, account IDs, secrets, tokens, private URLs,
   payment details, tenant data, and raw customer content. Keep the smallest
   safe excerpt needed to understand the incident.
3. Separate `observed`, `reproduced`, `inferred`, `proposed`, `not measured`,
   and `unknown`. Several similar reports do not prove prevalence or root
   cause.
4. Start with the affected critical journey and user harm, not with a model
   label. Severity follows impact and blast radius; frequency stays `Not
   measured` unless a defensible denominator is supplied.
5. For privacy, security, financial, legal, medical, access, or irreversible
   action risk, stop retries and side-effecting automation. Require an
   authorized human owner and preserve a safe receipt or unknown state.
6. Treat pending, timed-out, and partially completed runs as ambiguous until
   the approved owner reconciles whether a side effect happened. Never advise
   blind resume or replay.
7. Keep fictional fixtures, synthetic evaluations, internal observations, and
   production evidence separate. None proves adoption, safety, reliability,
   or customer impact by itself.
8. Do not create issues, modify code, call a provider, change a flag, send a
   message, or publish an incident statement. Return an action-ready packet.

## Incident framing

Use this compact frame before writing the runbook:

| Field | Required question |
| --- | --- |
| Decision | What must the owner decide now: contain, recover, hold, or reopen? |
| User job | Which person is trying to complete which critical journey? |
| Current workaround | What safe path remains available, if any? |
| Impact | What can the person not do, or what harm could occur? |
| Evidence | Which sources support each claim, and which are missing? |
| Scope | Which workflow, version, segment, region, or time boundary is known? |
| Owner | Who can authorize containment, recovery, and communication? |
| Stop rule | What must remain disabled until verification passes? |

Name the journey in user terms. For example, “support agent gets a reviewable
answer draft” is more useful than “the assistant endpoint is degraded.” Define
the success signal, failure modes, fallback, blast-radius boundary, and any
side-effect boundary before choosing a severity.

## Workflow

### 1. Frame the decision and journey

Write one sentence:

> We need to decide whether to contain, recover, hold, or reopen `...` for the
> user job `...`, using evidence `...` and the fallback `...`.

Record the normal journey, the expected success signal, the earliest known
deviation, and the safe fallback. If the journey is not known, keep the
decision at `Need evidence` rather than inventing an incident scope.

### 2. Freeze and minimize the evidence

Build a source ledger with stable IDs such as `I-007`, `T-041`, `R1`, and
`C1`. Record source type, timestamp, workflow, version, environment, what it
proves, and what it cannot prove. Redact raw trace and customer content before
the packet leaves an approved private location.

### 3. Reconstruct the impact timeline

Order only known events:

1. user request and intended journey;
2. route, context, policy, model, retrieval, or tool change;
3. run, approval, handoff, timeout, retry, or state transition;
4. output, user correction, escalation, abandonment, or side-effect receipt;
5. detection, fallback, containment, and current state.

Mark every event `observed`, `missing`, or `inferred`. Cluster related runs by
the smallest defensible shared boundary, such as workflow and version. Do not
turn a matching timestamp into a causal claim.

### 4. Map impact and choose severity

Describe affected journey steps, users or segments, possible harm, blast
radius, duration boundary, data integrity risk, and fallback quality. Use a
severity label only with a reason:

- `Sev0`: data loss, payment or irreversible action risk, or broad outage;
- `Sev1`: core journey failure with no credible safe fallback;
- `Sev2`: partial degradation with a usable workaround or manual path;
- `Sev3`: localized degradation or observation with no material journey harm;
- `Unknown`: the impact boundary is not established.

Severity is `proposed` until an authorized owner confirms it. Do not infer
frequency from the number of examples unless the sample denominator and query
boundary are supplied.

### 5. Define immediate containment

Choose the smallest safe action that limits harm and preserves learning. The
runbook may pause a route, stop high-risk automation, switch to read-only or
manual fallback, require approval, preserve pending states, or lower scope to
known-good versions. State owner, start condition, expiry or review time,
blocked side effects, and the condition for moving to recovery.

### 6. Write the recovery runbook

Use numbered, reversible steps. A recovery step must name its evidence, owner,
and stop condition:

1. inventory affected runs, states, versions, and receipts;
2. mark missing receipts as `Unknown` and prevent blind replay;
3. reconcile data and side effects through the approved owner path;
4. restore or disable the smallest suspect policy, route, tool, or config
   boundary;
5. validate the safe fallback and a bounded set of representative cases;
6. record the recovery receipt and unresolved exceptions;
7. hand off to verification before any gradual reopen.

Never claim that the system recovered because a flag changed or a command
returned success. Recovery requires journey evidence and data-integrity
verification.

### 7. Set the communication boundary

Separate internal draft, affected-user communication, public status, and
regulatory or contractual communication. State the audience, owner, approved
facts, uncertainty language, next update trigger, and prohibited claims. If no
authorized communication path exists, write `Not covered` and do not draft a
public resolution statement.

### 8. Define verification and reopen

Specify the minimum evidence required before the route can reopen: journey
success, safe state transitions, no unexpected side effects, fallback
availability, trace coverage, privacy checks, cost or latency guardrails, and
owner sign-off. Include a canary or bounded sample when appropriate, an abort
condition, rollback mode, and review window. A proposed check is not a pass.

### 9. Write back to learning surfaces

Link the incident to the smallest durable follow-up: a trace regression case,
evaluation slice, telemetry field, release gate, owner checklist, or product
decision. Record the incident boundary and version so the next release can be
compared. Keep operational follow-up separate from a claim that the product is
now reliable.

### 10. End with one review ask

Choose exactly one: `Contain`, `Recover`, `Hold`, `Verify`, `Reopen`, or `Need
evidence`. Name the unresolved risk, decision owner, and the next evidence
that could change the ask.

## Output contract

Return these sections in this order. Keep unsupported fields explicitly
`Not provided`, `Unknown`, `Not measured`, `Not reproduced`, or `Not covered`.

## Incident decision on the desk

State the one review ask, affected user job, current workaround, proposed
severity, decision owner, evidence status, and what would change the decision.

## Critical journey and impact

Map the normal journey, success signal, failed step, affected segment or scope,
possible harm, blast radius, duration boundary, fallback, and side-effect
boundary. Keep `observed` separate from `inferred`.

## Evidence timeline

List source IDs, trace or run IDs, timestamps, workflow and version boundaries,
state transitions, receipts, redaction, and missing evidence in chronological
order. State what each item proves and does not prove.

## Severity and containment

Give the proposed severity and rationale, impact and frequency status, owner,
immediate containment, blocked actions, safe fallback, expiry or review time,
and the condition for moving to recovery.

## Recovery runbook

Write numbered owner-action steps with preconditions, evidence to capture,
side-effect reconciliation, rollback or disable mode, stop conditions, and
exception handling. Do not advise blind resume or replay.

## Communication boundary

Separate internal, affected-user, public, and regulated communication. State
approved facts, uncertainty, owner, audience, next update trigger, and claims
that must not be made.

## Verification and reopen gate

Define the journey checks, data-integrity checks, trace and privacy checks,
fallback check, canary or sample boundary, abort rule, rollback mode, review
window, and required owner sign-off. Mark the status `proposed`, `not run`, or
`passed` only when the evidence supports it.

## Learning writeback

Name the regression, evaluation, telemetry, release-gate, decision-log, or
owner-checklist follow-up. Link stable IDs and version boundaries. State the
smallest next change and its learning question without claiming that it is
implemented or effective.

## Not covered

List missing traces, receipt reconciliation, versions, providers, locales,
segments, duration, frequency denominator, prevalence, production impact,
customer communication, adoption, safety, and any recovery or reopen action
that was not performed.

## Review ask

Ask for exactly one of `Contain`, `Recover`, `Hold`, `Verify`, `Reopen`, or
`Need evidence`. Name the decision owner, due boundary, and one unresolved risk.

## Edge cases

- **One report only:** keep the signal at `Unknown` incident scope and route it
  to `pm-ai-trace-to-regression` or evidence collection.
- **No trace or run IDs:** preserve the symptom, define the smallest safe event
  capture, and do not claim a shared root cause.
- **Pending or timed-out approval:** preserve the run state, check for a
  receipt, and require reconciliation before resume or replay.
- **Side effect may have happened:** stop automation, verify the affected
  record through the approved owner path, and escalate before optimization.
- **No safe fallback:** raise the severity candidate, keep the path contained,
  and make the reopen gate explicit.
- **Prompt injection or untrusted tool output:** contain the route, preserve a
  redacted case, verify permissions, and add a negative regression.
- **Several possible causes:** classify the impact first, list hypotheses with
  evidence limits, and avoid choosing a model cause for an operations failure.
- **Provider, model, prompt, retrieval, tool, or config change:** bind the
  timeline to both versions and compare with the last known-good boundary.
- **Communication is not authorized:** record the boundary and owner; do not
  turn an internal draft into a public status update.
- **Already recovered:** require a fresh journey receipt and reopen evidence;
  a successful command or historical pass is not incident closure.

## Final check

Before returning the packet, confirm:

- the user job and critical journey are named in plain language;
- every material claim has a source ID or is marked `Unknown` or `Proposed`;
- impact, severity, frequency, root cause, and recovery status are not blended;
- containment blocks unsafe side effects and preserves pending or unknown state;
- recovery steps are owned, reversible, receipt-based, and stop-safe;
- communication facts are separated from unapproved public claims;
- reopen checks include journey, integrity, fallback, telemetry, and rollback;
- learning writeback has a stable ID and a version boundary;
- fictional, synthetic, internal, and production evidence are labelled;
- `Not covered` lists every unexecuted verification and unresolved risk;
- the final line contains one review ask and one decision owner.
