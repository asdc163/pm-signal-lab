import { describe, expect, it } from "vitest";
import { buildSessionFeedbackReport } from "./feedback";

describe("session feedback field note", () => {
  it("requires the privacy confirmation before generating a report", () => {
    const result = buildSessionFeedbackReport({
      role: "pm",
      environment: "Chrome · desktop",
      result: "completed",
      expectation: "See how a source affects the next step",
      hesitation: "Could not find how to return to the previous claim",
      trust: "The limitation appears beside the source",
      recovery: "The workflow did not continue after a refresh",
      oneChange: "Keep the current place in the worksheet",
      privacyConfirmed: false,
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toContain("private content");
  });

  it("keeps the report specific and excludes workspace evidence", () => {
    const result = buildSessionFeedbackReport({
      role: "designer",
      environment: "Safari · mobile",
      result: "partially-completed",
      expectation: "Know which line is worth checking next",
      hesitation: "",
      trust: "The original line stays visible",
      recovery: "I used Back and selected it again",
      oneChange: "Bring the feedback closer to the exported result",
      privacyConfirmed: true,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.markdown).toContain("Tester role: Designer");
    expect(result.markdown).toContain("Task result: partially completed");
    expect(result.markdown).toContain("Not provided");
    expect(result.markdown).toContain("Bring the feedback closer to the exported result");
    expect(result.markdown).not.toContain("model quality");
    expect(result.markdown).not.toContain("customer evidence");
    expect(result.markdown).not.toContain("session title");
  });
});
