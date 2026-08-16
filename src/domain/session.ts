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
    "## Actions on this page",
    ...events,
    "",
    "## Boundary",
    "- This record only reflects actions on this page; it does not show external adoption.",
    "- Original evidence text is intentionally excluded from this receipt.",
    "- Share only after checking that the receipt contains no private customer information.",
    "",
  ].join("\n");
}
