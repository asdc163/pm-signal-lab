import type { EvidencePack } from "./types";

export const SAMPLE_PACK: EvidencePack = {
  id: "ai-support-copilot-eval-v1",
  title: "Support draft review: deciding what to test next",
  description:
    "Four fictional signals from a support-draft review. Keep the user's line separate from the decision it may support.",
  evidence: [
    {
      id: "evidence-interview-01",
      title: "Interview: the draft looks finished before I can trust it",
      source: "Demo interview · PM-07",
      type: "interview",
      observedAt: "2026-08-07T10:20:00+08:00",
      content:
        "The support draft gives me a polished reply, but I still have to check whether the cited policy is current. The sentence looks finished before I know what it is grounded in.",
    },
    {
      id: "evidence-support-01",
      title: "Support: a wrong answer has no repair path",
      source: "Demo support note · Case 1842",
      type: "support",
      observedAt: "2026-08-06T16:45:00+08:00",
      content:
        "When the draft is wrong, I can regenerate it, but I cannot point it at the source that needs correcting. I end up starting the lookup again.",
    },
    {
      id: "evidence-analytics-01",
      title: "Product observation: copy is not resolution",
      source: "Demo observation · Five runs",
      type: "analytics",
      observedAt: "2026-08-05T09:00:00+08:00",
      content:
        "During five demo runs, people copied the draft response, but we did not observe a sent reply or a resolved case. Copying is a handoff action, not evidence that the outcome improved.",
    },
    {
      id: "evidence-evaluation-01",
      title: "Evaluation review: coverage misses the stop condition",
      source: "Demo evaluation review · 24 cases",
      type: "evaluation",
      observedAt: "2026-08-04T14:10:00+08:00",
      content:
        "The happy-path set checks whether the answer matches a reference, but it does not include missing-source cases or a review/refusal path. A higher score here would not show whether the draft knows when to stop.",
    },
  ],
};

export function cloneSamplePack(): EvidencePack {
  return {
    ...SAMPLE_PACK,
    evidence: SAMPLE_PACK.evidence.map((item) => ({ ...item })),
  };
}
