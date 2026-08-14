import { describe, expect, it } from "vitest";
import { cloneSamplePack } from "./fixture";
import { buildDecisionMemo, toMarkdown } from "./export";
import { buildClaims, draftExperiment } from "./synthesis";

describe("decision memo export", () => {
  it("blocks export when the human has not accepted a claim", () => {
    const claims = buildClaims(cloneSamplePack().evidence).map((claim) => ({
      ...claim,
      status: "review" as const,
    }));
    const result = buildDecisionMemo(claims);

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("Verify");
  });

  it("includes evidence, uncertainty, experiment and not-covered sections", () => {
    const claims = buildClaims(cloneSamplePack().evidence).map((claim, index) =>
      index === 0
        ? { ...claim, status: "supported" as const, reviewed: true }
        : claim,
    );
    const experiment = draftExperiment(claims, claims[0].id);
    const result = buildDecisionMemo(claims, experiment);

    expect(result.ok).toBe(true);
    if (result.ok) {
      const markdown = toMarkdown(result.memo);
      expect(markdown).toContain("## Evidence summary");
      expect(markdown).toContain("## Known limits");
      expect(markdown).toContain("## Experiment");
      expect(markdown).toContain("## Not covered");
      expect(markdown).toContain("evidence-interview-01");
    }
  });
});
