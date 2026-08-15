import type { Claim, DecisionMemo, ExperimentBrief } from "./types";

export type ExportResult =
  | { ok: true; memo: DecisionMemo }
  | { ok: false; error: string };

export function buildDecisionMemo(
  claims: Claim[],
  experiment?: ExperimentBrief,
): ExportResult {
  const reviewedClaims = claims.filter(
    (claim) => claim.status === "supported" && claim.reviewed,
  );

  if (reviewedClaims.length === 0) {
    return {
      ok: false,
      error: "No accepted claim yet. Go to Verify and accept at least one source-backed claim.",
    };
  }

  if (!experiment) {
    return {
      ok: false,
      error: "There is no experiment brief yet. Draft the smallest experiment in Decide.",
    };
  }

  return {
    ok: true,
    memo: {
      decision: reviewedClaims[0].text,
      evidenceSummary: reviewedClaims.map(
        (claim) => `${claim.text} (Sources: ${claim.evidenceIds.join(", ") || "none"})`,
      ),
      knownLimits: claims
        .filter((claim) => claim.status !== "supported")
        .map((claim) => `${claim.text}: ${claim.limitation}`),
      experiment,
      nextAction: "The product owner confirms the smallest test's participants and timing before the test begins.",
      notCovered: [
        "We have not tested whether real users complete this workflow, return over time, or improve conversion.",
        "GitHub, MCP, issue mutation, and external telemetry are not connected.",
        "This memo was prepared in a local-first hosted demo; it does not show external adoption.",
      ],
    },
  };
}

export function toMarkdown(memo: DecisionMemo): string {
  const evidence = memo.evidenceSummary.map((item) => `- ${item}`).join("\n");
  const limits = memo.knownLimits.length
    ? memo.knownLimits.map((item) => `- ${item}`).join("\n")
    : "- No additional limits marked.";
  const notCovered = memo.notCovered.map((item) => `- ${item}`).join("\n");

  return `# Decision brief

> Handling note · This content stays on this page; refresh clears the sheet. There is no login or external transfer. This brief keeps the source, claim, and limitation visible. You decide whether to use it.

## Decision

${memo.decision}

## Evidence summary

${evidence}

## Known limits

${limits}

## Experiment

- Opportunity: ${memo.experiment.opportunity}
- Hypothesis: ${memo.experiment.hypothesis}
- Primary metric: ${memo.experiment.primaryMetric}
- Guardrail: ${memo.experiment.guardrail}
- Smallest test: ${memo.experiment.smallestTest}
- Decision rule: ${memo.experiment.decisionRule}
- Owner: ${memo.experiment.owner}
- Readiness: ${memo.experiment.readiness}

## Next action

${memo.nextAction}

## Not covered

${notCovered}
`;
}
