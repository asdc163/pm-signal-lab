---
name: pm-ai-trace-to-regression
description: Turn an AI or agent failure trace, tool error, user correction, or guardrail event into an evidence-bounded failure classification, containment step, minimal reproduction, regression case, owner, and release decision. Use after an AI run, pilot, evaluation, or production observation when a PM needs to separate trace facts from root-cause hypotheses without inventing prevalence or safety claims.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Trace to Regression

Use this skill when an AI or agent workflow has a concrete bad run and the team
needs to decide how to contain it, reproduce it, and prevent silent regression.
The output is a reviewable failure packet, not a claim that the model, product,
or fix is safe.

## When to use

Use it when the input includes at least one of these:

- a trace or span record with an unexpected model, retrieval, tool, handoff, or
  guardrail behavior;
- a user correction, retry, escalation, abandonment, or support observation
  tied to an AI or agent run;
- a failed evaluation case, red-team result, malformed tool call, or policy
  violation that needs a durable regression case;
- a cost, latency, loop, state, or partial-completion event that may affect an
  AI-assisted critical journey.

Use `pm-ai-evaluation-plan` when the question is how to design an evaluation
before a concrete failure exists. Use `pm-feedback-to-fix` for a general
product observation that does not require AI trace or component diagnosis. Use
`pm-ai-task-boundary` when the decision is which work AI should be allowed to
perform before implementation.

Do not use this skill to replay a production side effect, expose raw customer
traces, assign a population rate from one run, or declare a fix verified when
the new case has not been executed.

## Guardrails

1. Preserve trace IDs, span IDs, timestamps, workflow name, model/provider
   version, prompt or policy version, retrieval snapshot, tool version, and
   environment when supplied. If a field is absent, write `Not provided`.
2. Redact names, email addresses, account IDs, secrets, tokens, private URLs,
   payment details, tenant data, and raw sensitive content before writing the
   packet. Keep only the smallest safe excerpt needed to understand the
   failure.
3. Separate `observed`, `reproduced`, `inferred`, `proposed`, and `not
   measured`. A trace can locate a symptom without proving its root cause.
4. Choose one primary failure class and list contributing classes separately.
   Use `unknown` when the available spans cannot distinguish model, context,
   tool, policy, UX, or operations.
5. Contain high-severity privacy, security, financial, legal, medical,
   access, or irreversible-action failures before proposing optimization.
   Stop retries and replays that could create a real side effect; route to a
   human owner or approved private incident path.
6. Keep model judge scores, synthetic fixtures, and one-off traces separate
   from real-user evidence. None proves adoption, prevalence, production
   quality, or safety by itself.
7. A regression case is a proposed prevention artifact until it has an oracle,
   a reviewer, an execution result, and a recorded version. Do not write
   `passed` from inspection alone.
8. Do not create issues, modify code, call a provider, replay a tool, publish a
   release, or change a production flag. Produce a handoff for an authorized
   owner.

## Failure taxonomy

Use the narrowest class supported by the trace. Keep the class names stable so
they can be searched across regression cases.

| Class | Use when the evidence points to | Typical check |
|---|---|---|
| `INTENT_ROUTER` | the request was misunderstood or sent to the wrong workflow | expected route vs actual route |
| `CONTEXT_RETRIEVAL` | the needed source, memory, state, or freshness boundary was wrong | source IDs, snapshot, retrieval spans |
| `MODEL_GENERATION` | the supplied task context was adequate but the generated reasoning or content failed | same input/context comparison |
| `TOOL_ACTION` | a tool was missing, malformed, misused, repeated, or called without the required policy gate | tool schema, sequence, approval, receipt |
| `GUARDRAIL_POLICY` | a safety, privacy, permission, or product rule was not enforced | denied case and policy oracle |
| `OUTPUT_CONTRACT` | the result violated schema, citation, locale, format, or claim boundary | deterministic output assertions |
| `UX_TRUST` | the system state, uncertainty, provenance, or recovery path was not legible to the person | transcript, state trace, correction path |
| `OPERATIONS` | latency, cost, retry, timeout, loop, partial completion, or state durability changed the job outcome | journey-level signals and run state |

Do not force a model label when the trace only proves a product-control gap.
For example, a tool output that is correct but shown as an approved refund is
usually a policy or output-contract failure with retrieval as a possible
contributor, not automatically a model failure.

## Workflow

### 1. Frame the decision

Write one sentence:

> We need to decide whether to contain, reproduce, add a regression, change,
> hold, or escalate this AI behavior for `...`.

Name the affected user job, current workaround, decision owner, and what would
make the packet insufficient.

### 2. Freeze and minimize the evidence

Create a source ledger for the trace, user report, policy, evaluation case,
tool record, and relevant version. Keep raw evidence outside the public packet
when it is sensitive. Assign stable IDs such as `T-041`, `S1`, and `R1`.

### 3. Reconstruct the run

Order the available spans or events:

1. request and intended job;
2. route, context, retrieval, and source snapshot;
3. model generation or decision;
4. tool call, handoff, guardrail, or approval;
5. output, state transition, user correction, retry, escalation, or side effect.

Mark each step `observed`, `missing`, or `inferred`. Do not fill a missing span
with a plausible story.

### 4. Classify the failure

Choose one primary class from the taxonomy, list contributors, and state the
mechanism hypothesis. Use a confidence label such as `low`, `medium`, or
`high`; confidence describes the evidence for the classification, not the
severity of the user impact.

### 5. Decide severity and containment

Describe the immediate safe action: block a send, stop a tool, disable a route,
switch to read-only, require human review, preserve the trace, or collect one
more observation. Severity should follow potential user harm and blast radius;
frequency may remain `Not measured`.

### 6. Write the minimal reproduction

Give a safe starting state, the smallest input and context, numbered steps,
expected behavior, observed failure, and recovery. If the behavior is
nondeterministic, define a bounded replay or sample rule without replaying a
real side effect.

### 7. Write one regression case

Record the case ID, input, required context, allowed or denied tools, expected
route, expected output or state, negative condition, oracle, reviewer, and
status. Include a negative case when the system must abstain, escalate, or not
call a tool. Keep the case small enough to rerun after one change.

### 8. Choose a fix vector and owner

Compare the smallest plausible lever: router, context/retrieval, prompt/model,
tool schema or policy, output validator, UX state, data freshness, or
operations. Do not prescribe a prompt change when the trace points to a missing
permission gate. Name the owner surface, dependency, downside, and stop/revise
condition.

### 9. Set the evaluation and release gate

Link the regression to the existing evaluation plan or propose the smallest
new slice. Define what must pass, what must never occur, whether human review
is required, the fallback, rollback trigger, and what remains untested. A
critical privacy, security, or irreversible-action failure blocks promotion
until an authorized owner records a new result.

### 10. Write back and hand off

Record the failure taxonomy, case ID, version boundary, decision, and next
review location in the appropriate eval dataset, issue, runbook, or product
decision log. End with one review choice: `Contain`, `Reproduce`, `Add
regression`, `Change`, `Hold`, or `Need evidence`.

## Output contract

Return these sections in this order. Keep unsupported fields explicitly
`Not provided`, `Unknown`, `Not measured`, `Not reproduced`, or `Not covered`.

## Failure decision on the desk

State the decision, affected user job, current workaround, decision owner,
severity status, and what would change the decision.

## Trace and evidence record

List trace/span IDs, source IDs, workflow, environment, model/provider and
version, prompt/policy/config boundary, retrieval snapshot, tool versions,
timestamps, redaction, and evidence status for each field.

## Reconstructed workflow

Show the ordered request, route, context, generation, tool or guardrail,
output, user correction, state, and side-effect steps. Mark each as observed,
missing, inferred, reproduced, or not reproduced.

## Failure taxonomy

Name one primary class, contributing classes, mechanism hypothesis, confidence,
and the evidence that supports or limits the classification.

## Severity and containment

State potential impact, blast radius, frequency status, immediate containment,
human or incident owner, and the condition for safely reopening the path.

## Minimal reproduction

Include the safe starting state, sanitized input/context, numbered actions,
expected behavior, observed behavior, recovery, and any nondeterminism or
missing span that blocks reproduction.

## Regression case

Include case ID, setup, input, expected route/output/state, denied behavior,
oracle, reviewer, version boundary, execution status, and where the case will
be stored. Keep `proposed` separate from `passed`.

## Fix hypothesis and owner

Name the smallest fix vector, why it matches the evidence, owner surface,
dependency, downside, and stop or revise condition. Keep alternative causes
visible when confidence is low.

## Evaluation and release gate

State the smallest evaluation slice, primary measure, critical guardrail,
human review, fallback, rollback or disable action, and decision rule. Include
trace, privacy, cost, latency, and tool-structure checks when relevant.

## Not covered

List missing traces, untested versions, providers, locales, segments, frequency,
prevalence, production impact, user trust, adoption, safety, and any real
side-effect verification that was not performed.

## Review ask

Ask for one decision: `Contain`, `Reproduce`, `Add regression`, `Change`,
`Hold`, or `Need evidence`. Name the one unresolved risk that the reviewer
must keep visible.

## Edge cases

- **No trace:** do not infer a component root cause; preserve the symptom and
  define the smallest safe trace or event capture needed next.
- **Only a final answer:** classify the failure as unresolved until context,
  route, tool, and policy evidence can be inspected.
- **Tool side effect already happened:** stop replay, verify the receipt and
  affected record through the approved owner path, and escalate before tuning.
- **Prompt injection or untrusted tool output:** contain the path, preserve a
  redacted attack case, and add a negative regression plus permission check.
- **Nondeterministic failure:** record sampling, seed or run boundary when
  available; do not convert one replay into a stable rate.
- **Several failures in one run:** choose the earliest causal or highest-risk
  primary failure, list the rest as contributors or follow-up cases.
- **Provider, model, prompt, retrieval, or tool change:** bind the case to both
  versions and compare against the known baseline before attributing a cause.
- **User says it was wrong but expected behavior is unclear:** preserve the
  correction as a signal and route to policy or human review; do not invent an
  oracle.
- **Sensitive trace:** minimize, redact, and link only to an approved private
  location; never place raw trace content in a public issue or release.
- **Already-fixed report:** require the changed version and a fresh execution
  result. A code diff or historical pass is not current evidence.

## Final check

Before handoff, confirm that the packet preserves provenance, redacts sensitive
data, reconstructs only observed steps, names one primary failure class,
separates severity from frequency, includes containment and a safe recovery,
defines one runnable regression case with an oracle, assigns an owner and
release gate, and lists what is not covered. If the trace cannot support a safe
classification, return `Need evidence` rather than a confident root cause.
