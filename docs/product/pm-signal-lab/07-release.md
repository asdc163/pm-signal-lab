# Release Decision — PM Signal Lab v0

## Decision

**Local pilot: GO. Public launch: HOLD.**

The local product is coherent enough to use as the first AI PM portfolio artifact and to bring into controlled interviews or task sessions. It is not yet a public production release because desirability, real AI quality, accessibility depth, hosting behavior, and external-account authorization are unverified.

## What is releasable now

- A no-key, deterministic evidence-to-decision workbench that a reviewer can run locally.
- A visible `Collect → Verify → Decide → Ship` workflow.
- Source-linked candidate claims with explicit uncertainty and a human review boundary.
- A minimal experiment brief with metric, guardrail, smallest test, and decision rule.
- A Markdown decision memo that can be manually copied into a GitHub issue or PRD.
- Product, research, UX, technical, and QA handoff documents under [`docs/product/pm-signal-lab/`](.)。

## What is deliberately not released

- No public URL or deployment.
- No GitHub write, repository creation, push, release, issue automation, MCP write, or account operation.
- No provider SDK or API key handling.
- No database, login, team collaboration, telemetry, billing, or private evidence upload.
- No claim that the project is viral, validated, adopted, or likely to reach 10,000 stars.

## Rollout sequence

1. **Private/local pilot** — use the current fixture flow and collect structured task-session notes.
2. **Evidence gate** — only promote the next slice if at least 4/5 target users complete the core flow without facilitator rescue and guardrails remain intact.
3. **Provider pilot** — implement one provider-neutral adapter behind `SynthesisEngine`; run offline evals, cost/latency checks, red-team inputs, and explicit fallback tests.
4. **Public repository pilot** — after Tommy confirms repository name, license, maintainer identity, and public-release scope; add README/community health/release checklist.
5. **Hosted demo** — only after explicit deploy authorization; verify canonical HTTP, browser interaction, mobile behavior, and rollback path.

## Rollback

All current work is local and reversible. If a task session exposes trust or workflow failure:

- keep the local pilot at the current deterministic engine;
- disable or remove the failing UI slice;
- preserve the raw evidence and reviewed state in the active session;
- rerun the QA manifest before adding provider, persistence, or GitHub integration.

No irreversible external action has been taken in this turn.

## Learning loop

For every pilot session, record only the minimum event-level observations needed to answer:

- Did the user understand the product promise in five seconds?
- Could they trace a claim to a source without explanation?
- Did `Needs validation` change behavior or merely look like warning decoration?
- Could they produce a next action they were willing to run?
- Where did they hesitate, distrust, or ask for a missing integration?

Do not convert these observations into adoption, quality, or star claims until they are backed by a defined sample, measurement window, and reproducible artifact.
