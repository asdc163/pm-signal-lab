import type { EvidencePack } from "./types";

export const SAMPLE_PACK: EvidencePack = {
  id: "pm-signal-onboarding-v1",
  title: "Product discovery starter: from raw signal to next decision",
  description:
    "A small mix of interview, support, and product observations. Each claim keeps its source, limitation, and next testable action in view.",
  evidence: [
    {
      id: "evidence-interview-01",
      title: "Interview: sorting the first product signals",
      source: "Interview notes · PM-07",
      type: "interview",
      observedAt: "2026-08-07T10:20:00+08:00",
      content:
        "I have interview notes, support tickets, and product analytics, but I still drop everything into a chat tool first. I get a summary, then struggle to tell which line a user actually said.",
    },
    {
      id: "evidence-support-01",
      title: "Support: no clear next step",
      source: "Support inbox · Ticket #1842",
      type: "support",
      observedAt: "2026-08-06T16:45:00+08:00",
      content:
        "After importing their data, the user asked, \"Which problem should I look at first?\" They refreshed twice and left without creating a follow-up task.",
    },
    {
      id: "evidence-analytics-01",
      title: "Product observation: copied, not adopted",
      source: "Product observation · Week 32",
      type: "analytics",
      observedAt: "2026-08-05T09:00:00+08:00",
      content:
        "We only know that trial users often copy the summary. We have not connected that action to completed issues or experiments, so copying is not evidence of better decisions.",
    },
    {
      id: "evidence-competitor-01",
      title: "Competitive scan: sources are hidden behind the result",
      source: "Competitive teardown · 2026-08-04",
      type: "competitor",
      observedAt: "2026-08-04T14:10:00+08:00",
      content:
        "Many AI note tools put citations behind an expand action. People have to trust the summary first, then spend time tracing the source. This is a testable design hypothesis, not market-size evidence.",
    },
  ],
};

export function cloneSamplePack(): EvidencePack {
  return {
    ...SAMPLE_PACK,
    evidence: SAMPLE_PACK.evidence.map((item) => ({ ...item })),
  };
}
