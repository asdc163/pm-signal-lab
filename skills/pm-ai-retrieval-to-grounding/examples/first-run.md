# First run: support-policy retrieval contract

This is a **fictional fixture**. Run the skill against it to practice the
decision packet; do not infer live retrieval, source quality, or provider
behavior from the example.

## Request

> We want an AI support assistant to answer whether an annual-plan customer
> qualifies for a cancellation credit. We have a current policy, an old FAQ,
> a support ticket, and a ticket from another tenant. Define the retrieval and
> grounding contract before engineering chooses a search provider.

## Work the packet

Use `$pm-ai-retrieval-to-grounding` and return:

1. one user/job and answerability boundary;
2. a source and authority ledger with current, stale, public, tenant-scoped,
   and other-tenant sources;
3. original query, safe rewrite rule, tenant/version filters, retrieval
   method, ranking, top-k, chunk, budget, and receipt fields;
4. claim-to-source relations for supported, partial, contradictory,
   unauthorized, and no-source outcomes;
5. user-visible grounded, partial, stale, conflict, permission, injection,
   and abstention states;
6. evaluation slices with retrieval, grounding, citation, freshness, privacy,
   latency, and fallback measures;
7. one release decision, rollback path, owner, and next evidence action;
8. an explicit `## Not covered` section.

Keep all provider, embedding, live-quality, adoption, and production claims
`Not run` unless the user supplies direct evidence. Do not expose raw ticket
text or invent policy windows, dates, scores, or locators.

## Not covered

- No live source pack, vector store, search API, model, or account data is
  available in this fixture.
- No retrieval result, support relation, citation score, latency, cost, or
  user session has been observed.
- No provider or implementation choice is implied.

