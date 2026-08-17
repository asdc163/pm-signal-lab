# First run: bound a support-draft workflow

This is a fictional fixture. It contains no real customer, provider, model,
prompt, trace, price, quota, policy, permission, credential, receipt, or
production evidence.

Copy the input below into an AI PM workflow:

> We are designing an English-language support workflow for billing questions.
> A triage step should identify whether the request is ordinary, ambiguous, or
> high impact. An evidence step should retrieve the current support policy. A
> drafting specialist may prepare a reply, but a human billing owner must
> decide eligibility and approve any message. The team is considering a manager
> that calls specialists as tools and a handoff chain where a specialist takes
> over the conversation. Some policy lookups may run in parallel, but a stale
> policy must block the draft. We have no frozen workflow version, state model,
> retry or loop budget, tool receipt, join rule, approval expiry, timeout
> recovery, trace schema, or executed evaluation.
>
> Produce an orchestration contract. Choose the smallest topology, define
> model-controlled versus code-controlled decisions, step ownership, source
> and data boundaries, states, transitions, tool and human controls, retries,
> parallel joins, unknown outcomes, negative routes, evaluation slices,
> rollback, and one review ask. Keep all supplied workflow behavior as
> proposed until it has evidence.

Expected output shape:

1. `## Decision on the desk`
2. `## User/job and workflow boundary`
3. `## Workflow topology and ownership`
4. `## Step contract`
5. `## State and transition map`
6. `## Control budget and side-effect boundary`
7. `## Failure, recovery, and escalation`
8. `## Evaluation and release gate`
9. `## Not covered`
10. `## Implementation handoff`
11. `## Review ask`

Minimum evidence boundary:

- Treat the manager, handoff chain, specialists, policy source, and all
  performance descriptions as fictional supplied candidates, not runtime or
  provider facts.
- Keep orchestration topology separate from model/provider selection,
  individual tool contracts, human task allocation, and observability
  implementation.
- A reasonable first decision is `Hold`, `Pilot`, or `Need evidence` until
  workflow version, state transitions, owner permissions, stop conditions,
  receipts, timeout behavior, and evaluation oracles are verified.
- Do not include real prompts, customer text, names, emails, private URLs,
  tokens, API keys, hidden reasoning, or account limits.

## Not covered

- No agent run, model call, tool call, handoff, trace, receipt, policy lookup,
  latency, cost, quality, reliability, safety, or human approval was executed.
- No topology is proven better than another, and no provider, model, framework,
  production architecture, or autonomous behavior is recommended.
- The fixture does not establish adoption, traffic, retention, reliability,
  production readiness, or star growth.

## Review ask

Ask the AI product and platform owners to provide a versioned workflow/state
model, step owners, allowed destinations, control budgets, safe receipt and
reconciliation rules, a policy freshness boundary, and a small normal/negative
evaluation set before promotion.
