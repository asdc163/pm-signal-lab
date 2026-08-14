# Release Decision — PM Signal Lab v0

## Decision

**Public preview: GO WITH LIMITS. Production launch and adoption claim: HOLD.**

The product is coherent enough to use as the first AI PM portfolio artifact and public preview. The canonical GitHub Pages route has been browser-tested for the covered workflow, but desirability, real AI quality, accessibility depth, long-term hosting behavior, and real-user outcomes remain unverified.

## What is releasable now

- A no-key, deterministic evidence-to-decision workbench that a reviewer can run locally.
- A visible `收集 → 核對 → 安排 → 帶走` workflow。
- Source-linked candidate claims with explicit uncertainty and a human review boundary.
- A minimal experiment brief with metric, guardrail, smallest test, and decision rule.
- A Markdown decision memo that can be manually copied into a GitHub issue or PRD.
- Product, research, UX, technical, and QA handoff documents under [`docs/product/pm-signal-lab/`](.)。

## What is deliberately not claimed

- No production readiness, adoption, virality, or 10,000-star outcome.
- No in-product GitHub write, issue mutation, release automation, MCP write, or account operation beyond the separately authorized repository push and static Pages deployment.
- No provider SDK or API key handling.
- No database, login, team collaboration, telemetry, billing, or private evidence upload.
- No claim that the project is viral, validated, adopted, or likely to reach 10,000 stars.

## Rollout sequence

1. **Public preview** — keep the fixture flow, hosted demo, README, and issue #4 easy to try and report against.
2. **Evidence gate** — only promote the next slice if at least 4/5 target users complete the core flow without facilitator rescue and guardrails remain intact.
3. **Provider pilot** — implement one provider-neutral adapter behind `SynthesisEngine`; run offline evals, cost/latency checks, red-team inputs, and explicit fallback tests.
4. **Portable workflow** — consider JSON import/export only after external users demonstrate that the Markdown path is insufficient.
5. **External integrations** — consider read-only GitHub/MCP or telemetry only after source provenance, permission, rollback, and measurement contracts are approved.

## Rollback

All current work is local and reversible. If a task session exposes trust or workflow failure:

- keep the public preview at the current deterministic workflow;
- disable or remove the failing UI slice;
- preserve the raw evidence and reviewed state in the active session;
- rerun the QA manifest before adding provider, persistence, or GitHub integration.

The repository push and static Pages deployment are already recorded as authorized public-preview actions. No in-product external mutation has been enabled.

## Learning loop

For every pilot session, record only the minimum event-level observations needed to answer:

- Did the user understand the product promise in five seconds?
- Could they trace a claim to a source without explanation?
- Did `Needs validation` change behavior or merely look like warning decoration?
- Could they produce a next action they were willing to run?
- Where did they hesitate, distrust, or ask for a missing integration?

Do not convert these observations into adoption, quality, or star claims until they are backed by a defined sample, measurement window, and reproducible artifact.
