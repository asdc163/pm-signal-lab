import { describe, expect, it } from "vitest";
import { cloneSamplePack } from "./fixture";
import { buildClaims, draftExperiment } from "./synthesis";

describe("PM Signal Lab synthesis", () => {
  it("builds a deterministic claim set from the sample pack", () => {
    const first = buildClaims(cloneSamplePack().evidence);
    const second = buildClaims(cloneSamplePack().evidence);

    expect(first).toEqual(second);
    expect(first).toHaveLength(3);
    expect(first.some((claim) => claim.status === "supported")).toBe(true);
    expect(first.some((claim) => claim.status === "missing")).toBe(true);
    expect(first[0].evidenceIds.length).toBeGreaterThan(0);
  });

  it("does not invent a supported conclusion without enough direct evidence", () => {
    const claims = buildClaims([
      {
        ...cloneSamplePack().evidence[0],
        id: "single-observation",
      },
    ]);

    expect(claims[0].status).toBe("review");
    expect(claims[2].status).toBe("missing");
  });

  it("marks an experiment as needs-validation when the selected claim is not supported", () => {
    const claims = buildClaims(cloneSamplePack().evidence);
    const brief = draftExperiment(claims, "claim-decision-adoption");

    expect(brief.readiness).toBe("needs-validation");
    expect(brief.primaryMetric).toContain("需要再驗證");
  });
});
