import type { ProductEvent, WorkflowStep } from "./types";

export interface SessionReceiptInput {
  currentStep: WorkflowStep;
  evidenceCount: number;
  reviewedCount: number;
  supportedCount: number;
  events: ProductEvent[];
}

export function buildSessionReceipt(input: SessionReceiptInput): string {
  const events = input.events.length
    ? input.events.map((event) => `- ${event.name.replaceAll("_", " ")} (${event.at})`)
    : ["- no recorded actions"];

  return [
    "# PM Signal Lab session receipt",
    "",
    "Workspace: local session",
    `Current step: ${input.currentStep}`,
    `Evidence rows: ${input.evidenceCount}`,
    `Reviewed claims: ${input.reviewedCount}`,
    `Accepted claims: ${input.supportedCount}`,
    "",
    "## Event trace",
    ...events,
    "",
    "## Boundary",
    "- 這份紀錄只反映目前頁面的操作，不代表外部使用者已採用。",
    "- Original evidence text is intentionally excluded from this receipt.",
    "- Share only after checking that the receipt contains no private customer information.",
    "",
  ].join("\n");
}
