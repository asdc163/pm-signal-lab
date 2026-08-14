export const EVIDENCE_TYPES = [
  "interview",
  "support",
  "analytics",
  "competitor",
  "market",
  "expert",
] as const;

export type EvidenceType = (typeof EVIDENCE_TYPES)[number];

export type ClaimStatus = "supported" | "review" | "missing";

export type WorkflowStep = "collect" | "verify" | "decide" | "ship";

export interface Evidence {
  id: string;
  title: string;
  source: string;
  type: EvidenceType;
  observedAt: string;
  content: string;
  added?: boolean;
}

export interface EvidencePack {
  id: string;
  title: string;
  description: string;
  evidence: Evidence[];
}

export interface Claim {
  id: string;
  text: string;
  status: ClaimStatus;
  evidenceIds: string[];
  limitation: string;
  edited: boolean;
  reviewed: boolean;
}

export interface ExperimentBrief {
  opportunity: string;
  hypothesis: string;
  primaryMetric: string;
  guardrail: string;
  smallestTest: string;
  decisionRule: string;
  owner: string;
  readiness: "ready" | "needs-validation";
}

export interface DecisionMemo {
  decision: string;
  evidenceSummary: string[];
  knownLimits: string[];
  experiment: ExperimentBrief;
  nextAction: string;
  notCovered: string[];
}

export type ProductEventName =
  | "sample_pack_loaded"
  | "evidence_added"
  | "claim_reviewed"
  | "experiment_drafted"
  | "decision_exported"
  | "feedback_drafted"
  | "feedback_copied"
  | "recovery_used";

export interface ProductEvent {
  name: ProductEventName;
  properties: Record<string, string | number | boolean>;
  at: string;
}
