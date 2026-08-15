import type { Claim, Evidence, ExperimentBrief } from "./types";

export type ExperimentReviewGate =
  | { ok: true; claimId: string }
  | { ok: false; message: string };

export function getReviewedClaimForExperiment(
  claims: Claim[],
  selectedId?: string,
): ExperimentReviewGate {
  const selected = selectedId
    ? claims.find((claim) => claim.id === selectedId)
    : undefined;

  if (selectedId && !selected) {
    return {
      ok: false,
      message: "Choose a claim from Verify before drafting the smallest experiment.",
    };
  }

  if (selected && !selected.reviewed) {
    return {
      ok: false,
      message: "Review the selected claim before drafting the smallest experiment.",
    };
  }

  const reviewed = claims.find((claim) => claim.reviewed);
  if (!reviewed) {
    return {
      ok: false,
      message: "Review one claim before drafting the smallest experiment. Accept it, keep it as a hypothesis, or mark the evidence missing.",
    };
  }

  return { ok: true, claimId: selected?.id ?? reviewed.id };
}

export function buildClaims(evidence: Evidence[]): Claim[] {
  const ids = evidence.map((item) => item.id);
  const interviewIds = evidence
    .filter((item) => item.type === "interview" || item.type === "support")
    .map((item) => item.id);
  const observationIds = evidence
    .filter(
      (item) =>
        item.type === "analytics" ||
        item.type === "competitor" ||
        item.type === "evaluation",
    )
    .map((item) => item.id);
  const hasDirectSignal = interviewIds.length >= 2;
  const hasObservedPattern = observationIds.length >= 1;

  const claims: Claim[] = [
    {
      id: "claim-next-step-friction",
      text: "When a support draft presents a polished answer before its source or freshness, the operator may spend the review time checking the draft instead of deciding what to do next.",
      status: hasDirectSignal ? "supported" : "review",
      evidenceIds: interviewIds,
      limitation: hasDirectSignal
        ? "Supported by two demo signals; not tested with a live model, support queue, or different product types."
        : "We need two direct signals from different sources before treating this as supported.",
      edited: false,
      reviewed: false,
    },
    {
      id: "claim-source-trust",
      text: "Keeping the source, freshness, and missing-evidence state beside a support draft may make human review easier than showing the conclusion first.",
      status: hasObservedPattern ? "review" : "missing",
      evidenceIds: observationIds,
      limitation: hasObservedPattern
        ? "This is a design hypothesis informed by one demo product observation and one demo evaluation review; no preference or completion measure is attached."
        : "No product observation or evaluation review currently supports this design hypothesis.",
      edited: false,
      reviewed: false,
    },
    {
      id: "claim-decision-adoption",
      text: "A copied draft response will resolve a support case.",
      status: "missing",
      evidenceIds: [],
      limitation: "There is no outcome trace for a resolved case; copying is not resolution, and no production result is represented.",
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
      ? `If "${opportunity.text.replace(/[.!?]$/, "")}" is shown in a support-draft review flow, reviewers will identify a source or uncertainty issue before accepting the draft.`
      : "There is not enough signal to form a hypothesis yet.",
    primaryMetric: needsValidation
      ? "Needs validation: define an observable event for naming one source, one uncertainty, and one next action."
      : "Completion rate from opening the support-draft worksheet to confirming one source-linked next action.",
    guardrail: "Do not make the support draft look complete before its source and freshness are reviewable.",
    smallestTest:
      "Ask 5 PMs to review the same support-draft worksheet through Collect → Verify → Decide; record whether each can name the source, uncertainty, and next test without help.",
    decisionRule: `Move to the next round only if at least 4 of 5 finish without treating missing evidence as a conclusion; current limit: ${limitation}`,
    owner: "Experiment owner · TBD",
    readiness: needsValidation ? "needs-validation" : "ready",
  };
}
