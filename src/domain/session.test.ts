import { describe, expect, it } from "vitest";
import { buildSessionReceipt } from "./session";

describe("session receipt", () => {
  it("records observable counts and the local boundary without raw evidence", () => {
    const receipt = buildSessionReceipt({
      currentStep: "decide",
      evidenceCount: 4,
      reviewedCount: 2,
      supportedCount: 1,
      events: [
        {
          name: "sample_pack_loaded",
          properties: { pack_id: "fixture" },
          at: "2026-08-14T10:00:00.000Z",
        },
      ],
    });

    expect(receipt).toContain("Evidence rows: 4");
    expect(receipt).toContain("Accepted claims: 1");
    expect(receipt).toContain("sample pack loaded");
    expect(receipt).toContain("Original evidence text is intentionally excluded");
    expect(receipt).not.toContain("私密內容");
  });

  it("does not copy a user-provided workspace title and preserves an empty trace", () => {
    const receipt = buildSessionReceipt({
      currentStep: "collect",
      evidenceCount: 0,
      reviewedCount: 0,
      supportedCount: 0,
      events: [],
    });

    expect(receipt).toContain("Workspace: local session");
    expect(receipt).not.toContain("A B");
    expect(receipt).toContain("- no recorded actions");
  });
});
