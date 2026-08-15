import type { Claim, Evidence, ExperimentBrief } from "./types";

export function buildClaims(evidence: Evidence[]): Claim[] {
  const ids = evidence.map((item) => item.id);
  const interviewIds = evidence
    .filter((item) => item.type === "interview" || item.type === "support")
    .map((item) => item.id);
  const observationIds = evidence
    .filter((item) => item.type === "analytics" || item.type === "competitor")
    .map((item) => item.id);
  const hasDirectSignal = interviewIds.length >= 2;
  const hasObservedPattern = observationIds.length >= 1;

  const claims: Claim[] = [
    {
      id: "claim-next-step-friction",
      text: "When signals arrive from different places, the first bottleneck may be choosing a defensible next action rather than finding another source.",
      status: hasDirectSignal ? "supported" : "review",
      evidenceIds: interviewIds,
      limitation: hasDirectSignal
        ? "Supported by one interview and one support signal; not yet tested across different product types."
        : "We need two direct signals from different sources before treating this as supported.",
      edited: false,
      reviewed: false,
    },
    {
      id: "claim-source-trust",
      text: "Keeping the observed line beside the working claim may make review easier than presenting the conclusion first.",
      status: hasObservedPattern ? "review" : "missing",
      evidenceIds: observationIds,
      limitation: hasObservedPattern
        ? "This is a design direction informed by a competitive observation, not a measured preference or outcome."
        : "No competitive or product observation currently supports this design hypothesis.",
      edited: false,
      reviewed: false,
    },
    {
      id: "claim-decision-adoption",
      text: "A copied result will lead to an adopted product decision.",
      status: "missing",
      evidenceIds: [],
      limitation: "There is no issue, experiment, or decision-adoption trace; copying cannot stand in for the outcome.",
      edited: false,
      reviewed: false,
    },
  ];

  return ids.length === 0 ? [] : claims;
}

export function draftExperiment(
  claims: Claim[],
  opportunityId: string,
): ExperimentBrief {
  const opportunity = claims.find((claim) => claim.id === opportunityId);
  const needsValidation =
    !opportunity || opportunity.status !== "supported" || !opportunity.reviewed;
  const limitation = opportunity?.limitation ?? "No source-backed direction has been selected yet.";

  return {
    opportunity:
      opportunity?.text ?? "Choose a source-backed direction before drafting.",
    hypothesis: opportunity
      ? `If "${opportunity.text.replace(/[.!?]$/, "")}" is kept in a review workflow, PMs will identify a testable next action faster.`
      : "There is not enough signal to form a hypothesis yet.",
    primaryMetric: needsValidation
      ? "Needs validation: define an observable event for completing one decision brief."
      : "Completion rate from loading a signal pack to confirming one next action.",
    guardrail: "Do not make sources harder to review; every accepted claim must keep its source.",
    smallestTest:
      "Ask 5 PMs to run the same signal pack through Collect → Verify → Decide, and record whether anyone needs help.",
    decisionRule: `Move to the next round only if at least 4 of 5 finish without treating missing evidence as a conclusion; current limit: ${limitation}`,
    owner: "Experiment owner · TBD",
    readiness: needsValidation ? "needs-validation" : "ready",
  };
}
