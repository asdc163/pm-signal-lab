# First run: choose a route for an AI support-draft job

This is a fictional fixture. It contains no real customer, provider, model
availability, price, quota, policy, account, prompt, credential, or production
evidence.

Copy the input below into an AI PM workflow:

> We are designing an English-language support assistant that drafts replies to
> billing questions. The normal path needs a short, structured answer from a
> fast model. Ambiguous refund questions may need a stronger model and a human
> billing review. The team is considering Model A and Model B from two different
> providers. Model A is described as faster and cheaper; Model B is described as
> stronger on complex reasoning. We have no frozen model versions, task-slice
> quality results, endpoint/region record, current price snapshot, route
> receipt, or fallback test. The assistant must not decide eligibility, move
> money, or send a reply without human review.
>
> Design the model-to-route contract. Define the candidate matrix, hard
> eligibility rules, manual or automatic route policy, route receipt, normal
> and ambiguous task slices, cost/latency and quality guardrails, unsupported
> and provider-outage paths, privacy/tenant checks, human fallback, rollback,
> and the release decision. Keep “faster”, “cheaper”, and “stronger” as supplied
> claims until they have source and task-level evidence.

Expected output shape:

1. `## Decision on the desk`
2. `## User/job and route boundary`
3. `## Candidate and capability matrix`
4. `## Route eligibility and selection policy`
5. `## Evaluation and evidence plan`
6. `## Negative routing and fallback`
7. `## Cost, latency, reliability, and data boundary`
8. `## Release, rollback, and writeback`
9. `## Not covered`
10. `## Review ask`

Minimum evidence boundary:

- Treat Model A, Model B, and all performance descriptions as fictional
  supplied candidates, not a current leaderboard or provider fact.
- Do not select a route from reputation, price, or one aggregate score.
- A reasonable first decision is `Hold`, `Pilot`, or `Need evidence` until
  model/version identity, task slices, data/tenant scope, cost/latency
  denominators, fallback behavior, and rollback are verified.
- Do not include real prompts, customer text, names, emails, tokens, private
  URLs, API keys, or account limits in the output.

## Not covered

- No live model call, provider availability, price, quota, route receipt,
  quality result, latency result, privacy review, human review, or external
  state was supplied.
- No model ranking, provider recommendation, production route change, legal or
  compliance result, adoption, traffic, retention, or star outcome is proven.
- The fixture is not an instruction to send data to either provider.

## Review ask

Ask the AI product and platform owners to provide frozen candidate IDs, a
versioned data/tenant boundary, a small paired task set, cost/latency sources,
route receipt fields, and a tested human fallback before promotion.
