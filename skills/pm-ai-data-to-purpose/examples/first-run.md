# First run: review data use for an AI support-draft feature

This is a fictional fixture. It contains no real customer, provider,
configuration, account, policy, transcript, credential, or production evidence.

Copy the input below into an AI PM workflow:

> We are designing an English-language support assistant that drafts replies to
> refund questions. It reads a customer message and an authorized plan-date
> field. A hosted model generates a draft. The product team wants to keep the
> prompt and response for 30 days for debugging, send weekly aggregate usage
> counts to analytics, and reuse reviewed examples for an evaluation set. A
> connector may send selected context to a billing system. The plan date is
> sometimes missing. A user can ask to delete their support data. We have not
> confirmed the provider's endpoint retention, connector policy, tenant
> boundary, or whether deletion reaches logs, caches, and evaluation copies.
>
> Review the data-purpose and lifecycle contract. Decide what each data class is
> for, what may enter runtime, what may be logged or reused, what must be
> redacted, who may access it, what deletion and correction must cover, which
> negative routes block release, and whether the feature should Ship, Pilot,
> Hold, Rollback, or Need evidence. Keep provider facts, product proposals,
> legal conclusions, and adoption evidence separate.

Expected output shape:

1. `## Decision on the desk`
2. `## User/job and data boundary`
3. `## Data and purpose ledger`
4. `## Source, authority, and boundary`
5. `## Use-stage and lifecycle map`
6. `## Data-use contract`
7. `## Negative routes and user controls`
8. `## Verification and retention/deletion`
9. `## Release, rollback, and writeback`
10. `## Not covered`
11. `## Review ask`

Minimum evidence boundary:

- Treat the prompt as a fictional product proposal, not proof that a provider,
  connector, deletion job, analytics pipeline, or evaluation set exists.
- Keep customer message, plan date, generated draft, logs, analytics, and
  evaluation examples as separate data classes and purposes.
- A sensible first decision is `Hold` or `Need evidence` until endpoint,
  connector, tenant, minimization, retention, and deletion-propagation
  evidence is supplied.
- Do not include a real user name, email, ticket, payment detail, private URL,
  token, or raw prompt in the output.

## Not covered

- No real provider, endpoint, connector, data store, user request, deletion
  receipt, eval result, access review, or legal basis was supplied.
- No production retention, deletion, privacy, security, quality, adoption,
  traffic, or star outcome is established.
- The example is not an instruction to collect or retain customer content.

## Review ask

Ask the product, privacy/security, data, and support owners to provide a
versioned data-flow diagram and endpoint/connector retention snapshot, then
decide whether a reduced-data draft-only pilot can proceed.
