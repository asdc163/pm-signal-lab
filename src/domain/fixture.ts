import type { EvidencePack } from "./types";

export const SAMPLE_PACK: EvidencePack = {
  id: "signal-review-next-action-v1",
  title: "Signal review: deciding what to test next",
  description:
    "Four de-identified signals from discovery, support, product observation, and a competitor review. Keep the observed line separate from the decision it may support.",
  evidence: [
    {
      id: "evidence-interview-01",
      title: "Interview: why the first action stalls",
      source: "Interview notes · PM-07",
      type: "interview",
      observedAt: "2026-08-07T10:20:00+08:00",
      content:
        "I can find the notes after a customer call, but when the team asks what to act on first, I do not have one place that shows the original line and the reason it matters.",
    },
    {
      id: "evidence-support-01",
      title: "Support: imported data, no next step",
      source: "Support inbox · Ticket #1842",
      type: "support",
      observedAt: "2026-08-06T16:45:00+08:00",
      content:
        "I imported the workspace data, saw the empty state, and still did not know what to do first. I refreshed twice before leaving.",
    },
    {
      id: "evidence-analytics-01",
      title: "Product observation: handoff stops at copy",
      source: "Product observation · Week 32",
      type: "analytics",
      observedAt: "2026-08-05T09:00:00+08:00",
      content:
        "During five observed trial sessions, people copied a result into their notes, but we did not observe a follow-up task or experiment. Copying is a handoff action, not evidence that the decision improved.",
    },
    {
      id: "evidence-competitor-01",
      title: "Competitive scan: rationale is separated from source",
      source: "Competitive teardown · 2026-08-04",
      type: "competitor",
      observedAt: "2026-08-04T14:10:00+08:00",
      content:
        "Three research workbenches show a conclusion first and tuck the supporting line behind a secondary action. That may slow a reviewer who needs to challenge the conclusion; this is a design hypothesis, not market-size evidence.",
    },
  ],
};

export function cloneSamplePack(): EvidencePack {
  return {
    ...SAMPLE_PACK,
    evidence: SAMPLE_PACK.evidence.map((item) => ({ ...item })),
  };
}
