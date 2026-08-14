import { describe, expect, it } from "vitest";
import { buildSessionFeedbackReport } from "./feedback";

describe("session feedback field note", () => {
  it("requires the privacy confirmation before generating a report", () => {
    const result = buildSessionFeedbackReport({
      role: "pm",
      environment: "Chrome · desktop",
      result: "completed",
      expectation: "看見來源如何影響下一步",
      hesitation: "找不到回到上一個判斷的位置",
      trust: "限制和來源一起出現",
      recovery: "重新整理後沒有繼續",
      oneChange: "保留目前的工作位置",
      privacyConfirmed: false,
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toContain("私密內容");
  });

  it("keeps the report specific and excludes workspace evidence", () => {
    const result = buildSessionFeedbackReport({
      role: "designer",
      environment: "Safari · mobile",
      result: "partially-completed",
      expectation: "想知道哪一句值得再查",
      hesitation: "",
      trust: "原文仍然看得到",
      recovery: "按返回後重新選了一次",
      oneChange: "讓回報更靠近匯出結果",
      privacyConfirmed: true,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.markdown).toContain("Tester role: Designer");
    expect(result.markdown).toContain("Task result: partially completed");
    expect(result.markdown).toContain("Not provided");
    expect(result.markdown).toContain("讓回報更靠近匯出結果");
    expect(result.markdown).not.toContain("customer evidence");
    expect(result.markdown).not.toContain("session title");
  });
});

