export const FEEDBACK_ROLES = [
  "pm",
  "founder",
  "designer",
  "engineer",
  "other",
] as const;

export type FeedbackRole = (typeof FEEDBACK_ROLES)[number];

export const FEEDBACK_RESULTS = [
  "completed",
  "partially-completed",
  "stopped",
] as const;

export type FeedbackResult = (typeof FEEDBACK_RESULTS)[number];

export interface SessionFeedbackDraft {
  role: FeedbackRole;
  environment: string;
  result: FeedbackResult;
  expectation: string;
  hesitation: string;
  trust: string;
  recovery: string;
  oneChange: string;
  privacyConfirmed: boolean;
}

export type FeedbackReportResult =
  | { ok: true; markdown: string }
  | { ok: false; error: string };

export const FEEDBACK_ROLE_LABELS: Record<FeedbackRole, string> = {
  pm: "PM",
  founder: "Founder",
  designer: "Designer",
  engineer: "Engineer",
  other: "Other",
};

export const FEEDBACK_RESULT_LABELS: Record<FeedbackResult, string> = {
  completed: "completed",
  "partially-completed": "partially completed",
  stopped: "stopped",
};

function valueOrNotProvided(value: string) {
  const trimmed = value.trim();
  return trimmed || "Not provided";
}

export function buildSessionFeedbackReport(
  draft: SessionFeedbackDraft,
): FeedbackReportResult {
  if (!draft.privacyConfirmed) {
    return {
      ok: false,
      error: "請先確認這份回報沒有客戶資料、私密內容、API key 或 token。",
    };
  }

  return {
    ok: true,
    markdown: [
      "# PM Signal Lab session feedback",
      "",
      "## Session",
      `Tester role: ${FEEDBACK_ROLE_LABELS[draft.role]}`,
      `Environment: ${valueOrNotProvided(draft.environment)}`,
      `Task result: ${FEEDBACK_RESULT_LABELS[draft.result]}`,
      "",
      "## What I expected",
      valueOrNotProvided(draft.expectation),
      "",
      "## Where I hesitated",
      valueOrNotProvided(draft.hesitation),
      "",
      "## What I trusted or did not trust",
      valueOrNotProvided(draft.trust),
      "",
      "## What happened when I went back or made a mistake",
      valueOrNotProvided(draft.recovery),
      "",
      "## One change that would make me try again",
      valueOrNotProvided(draft.oneChange),
      "",
      "## Privacy confirmation",
      "- I confirm that this report contains no customer names, private tickets, API keys, tokens, or confidential roadmap material.",
      "",
      "## Boundary",
      "- This is one self-reported session in one environment; it does not prove general usability, retention, model quality, adoption, or GitHub growth.",
      "- The report was prepared locally; the user must review it and submit it manually.",
      "",
    ].join("\n"),
  };
}
