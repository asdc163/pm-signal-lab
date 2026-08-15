import { describe, expect, it } from "vitest";
import { cloneSamplePack, SAMPLE_PACK } from "./fixture";
import { buildClaims, draftExperiment } from "./synthesis";

describe("PM Signal Lab synthesis", () => {
  it("keeps the public fixture grounded in a PM signal-review job", () => {
    const fixtureText = [SAMPLE_PACK.title, SAMPLE_PACK.description, ...SAMPLE_PACK.evidence.map((item) => `${item.title} ${item.content}`)].join(" ");

    expect(SAMPLE_PACK.title).toBe("Signal review: deciding what to test next");
    expect(fixtureText).not.toMatch(/chat tool|AI note tools|copying a summary/i);
    expect(buildClaims(SAMPLE_PACK.evidence)[0].text).toContain("defensible next action");
  });

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
    expect(brief.primaryMetric).toContain("Needs validation");
  });
});
