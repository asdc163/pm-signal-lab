---
name: pm-ai-program-to-result
description: Use when an AI workflow may let a model-generated program call eligible tools and a product manager must define the direct-versus-programmatic boundary, parent/program/child caller linkage, allowed tools, input and output schemas, budgets, pause and continuation, final-message completeness, citations, recovery, and the boundary between program output and a verified user outcome.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Program to Result

Keep a programmatic tool run bounded and outcome-ready. This skill defines the
PM contract around a model-generated program; it does not execute code or
tools.

## When to use

- several tool results can be filtered, joined, ranked, deduplicated,
  aggregated, or validated by predictable code;
- a program may call client-owned tools and pause before it can continue;
- the host needs to preserve parent, program, child-call, actor, and tenant
  identity;
- the team needs a program output schema, final-message schema, citation gate,
  or stopping rule;
- direct calls and program calls need different permission, approval, cost,
  latency, or evidence policies;
- a `program_output` or compact aggregate might be mistaken for a final answer.

## Do not use this when

- one tool's purpose, schema, permission, or side effect is the main decision;
  use `pm-ai-tool-to-contract`;
- tool catalog search or deferred selection is the main decision; use
  `pm-ai-tool-search-to-selection`;
- a single emitted tool call needs result pairing and retry recovery; use
  `pm-ai-tool-call-to-recovery`;
- the main work is generic multi-step topology, trace evidence, approval,
  authorization, or background supervision; use the adjacent contract.

## Evidence and provider boundary

Use current provider documentation as a mapping, not a universal runtime:

- OpenAI's programmatic-tool-calling route lets the application decide which
  eligible tools a program may call, with `allowed_callers` controlling route
  eligibility.
- The program's nested function calls preserve `call_id` and `caller`; a
  client-owned result must return that linkage so the correct program resumes.
- `program_output` and a final assistant `message` are separate outputs. Keep
  going until the final message is present and validated when the product
  contract requires one.
- OpenAI recommends direct calling for fresh model judgment, approval,
  citations, or native artifacts, and bounded programmatic processing for
  predictable data operations.

Read the official links in
[the worked contract](references/program-to-result-contract.md). Record the
host, provider/model, route, program version, and observed time. If a runtime
fact is missing, use `Unknown`, `Not run`, `Not measured`, or `Not covered`.

## Workflow

### 1. Frame the bounded stage

Write one sentence:

> Decide whether requester `<actor>` may use program `<program/version>` for
> stage `<stage>` in scope `<tenant/workspace>`, with child tools `<allowlist>`,
> caller linkage `<IDs>`, budget `<limits>`, output contract `<schema>`, and
> final/outcome oracle `<evidence>`.

Record the user job, workaround, route owner, parent run, program identity,
actor/tenant scope, candidate tools, side-effect class, approval boundary,
input freshness, budget, stopping rule, and human-owned decision.

### 2. Choose direct or programmatic

Use **direct tool calling** when one call is enough, each result needs fresh
model judgment, an action needs approval, or citations/native artifacts must
be preserved. Use a **bounded program** when code can process known shapes by
filtering, joining, ranking, deduplicating, aggregating, or validating without
fresh judgment between every child result. Use **manual** when the stage is
not safely representable.

Do not select a program solely because it uses fewer turns or tokens. Compare
task success, completeness, evidence, calls, retries, latency, and cost on the
same representative tasks.

### 3. Bind parent and child authority

Create a ledger with:

| Field | Rule |
| --- | --- |
| `run_id` | stable user job identity |
| `program_call_id` | parent program request identity |
| `caller` / `caller_id` | preserved across nested client-owned calls |
| `child_call_id` | exact identity for each eligible tool call |
| `tool_name` + version | allowlisted and definition-pinned |
| actor/tenant/scope | inherited and rechecked; never widened by the program |
| attempt/budget | bounded count, time, output, and cost policy |
| result state | success, error, paused, cancelled, late, or unknown |
| continuation | explicit next step or manual route |

If caller or scope is absent, the child call is `blocked` or `manual`; do not
guess identity from array order, tool name, or generated code.

### 4. Limit eligible child tools

For each tool, state whether the program may call it directly, via the host,
or not at all. Check purpose, schema, input/output shape, permission, tenant,
sensitivity, side effect, timeout, retry, and provenance. Keep approval-
sensitive writes, sends, purchases, deletes, publishes, and permission changes
out of a program route unless a separate reviewed contract explicitly owns
them.

Availability is not permission. A program must not discover or call every tool
visible to the host.

### 5. Define output and continuation

Specify input schema, child result schema, program output schema, required
evidence, citations, caveats, error shape, and final message fields. A program
may pause more than once for client-owned calls. Continue until one of these
observable states is reached:

- final message meets the product contract;
- an explicit refusal or blocked state is returned;
- a bounded recovery or manual route owns the next step;
- the user cancels or the budget/expiry stops the run.

If a `program_output` exists without a required final message, mark
`final_message_pending` or `incomplete`, not `completed`.

### 6. Recover without hidden replay

- **wrong route or tool:** switch to direct/manual only with policy evidence;
- **child error:** classify and retry only within the child contract;
- **caller mismatch:** reject and hold; do not attach to another program;
- **partial aggregate:** expose missing members and choose bounded recovery;
- **output-schema failure:** return structured failure or manual review;
- **missing final message:** continue from the preserved response state or
  manual route; do not invent a final answer;
- **citation/native-artifact gap:** route direct or mark incomplete;
- **timeout/cancel:** stop continuation and reconcile late results;
- **budget exceeded:** stop, summarize safe evidence, and do not silently
  expand limits.

### 7. Separate result from outcome

Use distinct labels:

`program requested` → `program running` → `child results accounted for` →
`program output ready` → `final message validated` → `outcome verified`.

Neither generated code, a child result, nor `program_output` proves that a
business action happened, a user accepted the answer, or adoption occurred.

### 8. Write the privacy-safe receipt

Return these sections:

1. `## Decision and user job`
2. `## Route and caller contract`
3. `## Child tool and output contract`
4. `## State and recovery matrix`
5. `## User controls and action boundary`
6. `## Evaluation and release gate`
7. `## Privacy-safe receipt`
8. `## Not covered`

Include safe IDs, classes, counts, states, limits, versions, and redacted
errors only. Exclude generated code, raw inputs/outputs, customer content,
credentials, tokens, cookies, private URLs, and sensitive screen content.

## Output contract

Produce a bounded program-to-result contract, not a code sample pretending to
be a tested agent. It must state the user job, direct/program/manual decision,
parent/program/child identity, eligible tools, actor/tenant scope, budgets,
input and output schemas, continuation/final-message oracle, citation and
approval boundary, recovery, receipt, and evidence gaps. Use `Not provided`,
`Not run`, `Not measured`, and `Not covered` instead of invented runtime
behavior.

## Edge cases

- program output is valid but the final message is missing;
- child function output loses the original `caller` field;
- a program asks for a tool outside its `allowed_callers` set;
- one child result is missing, late, duplicate, malformed, or from another
  tenant;
- a predictable aggregation would remove citations or source provenance;
- a tool becomes approval-sensitive after the route was chosen;
- generated code requests a secret or instruction-shaped external content tries
  to change the host policy;
- the program pauses for a client-owned call more than once;
- budget, expiry, cancellation, or network failure interrupts continuation.

## Minimum evaluation set

Evaluate normal, mismatch, and recovery routes:

- one bounded aggregation route and one direct-call route;
- allowed and denied child tools with exact caller/tenant linkage;
- successful child result, partial result, child error, timeout, cancellation,
  late result, and bounded retry;
- malformed program output, missing final message, missing source/citation,
  refusal, budget stop, and manual fallback;
- program result versus final message versus independently verified outcome;
- untrusted child content and generated-code request for a secret;
- inspect, direct, cancel, continue, manual, retry within policy, and stop;
- mobile, keyboard, and accessibility behavior when a real host exists.

Record host/provider/version, expected and observed result, privacy impact,
and `Not run` or `Not covered` when evidence is absent.

## Decision rule

Choose `Proceed`, `Pilot`, `Hold`, `Fallback`, or `Stop`. Choose `Pilot` when
the static route is coherent but caller linkage, final-message completeness,
runtime safety, cost/latency, or outcome evidence is missing. Never convert a
program output, passing schema, provider feature, or GitHub signal into final
answer quality, adoption, or star-growth evidence.

## Final check

Before returning the contract, confirm that:

- bounded stage, route owner, parent/program/child IDs, actor, tenant, and
  eligible tools are named;
- direct/program/manual choice and approval-sensitive exclusions are explicit;
- caller linkage, scope, budgets, schemas, output, final message, citations,
  and outcome are separately validated;
- missing final message, incomplete output, child error, mismatch, timeout,
  cancellation, late result, budget, and manual states have recovery;
- generated code and tool content cannot widen policy or request secrets;
- privacy-safe receipts contain no raw code or tool/customer data;
- official provider mappings and support limits are current;
- the final decision and next action remain human-owned.
