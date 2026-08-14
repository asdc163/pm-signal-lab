import type { Claim, DecisionMemo, ExperimentBrief } from "./types";

export type ExportResult =
  | { ok: true; memo: DecisionMemo }
  | { ok: false; error: string };

export function buildDecisionMemo(
  claims: Claim[],
  experiment?: ExperimentBrief,
): ExportResult {
  const reviewedClaims = claims.filter(
    (claim) => claim.status === "supported" && claim.reviewed,
  );

  if (reviewedClaims.length === 0) {
    return {
      ok: false,
      error: "尚未有被你採用的判斷；先到核對處理至少一個有來源的結論。",
    };
  }

  if (!experiment) {
    return {
      ok: false,
      error: "還沒有 experiment brief；先在安排草擬一個最小實驗。",
    };
  }

  return {
    ok: true,
    memo: {
      decision: reviewedClaims[0].text,
      evidenceSummary: reviewedClaims.map(
        (claim) => `${claim.text}（來源：${claim.evidenceIds.join(", ") || "無"}）`,
      ),
      knownLimits: claims
        .filter((claim) => claim.status !== "supported")
        .map((claim) => `${claim.text}：${claim.limitation}`),
      experiment,
      nextAction: "由產品負責人確認最小測試的參與者與執行時間，再開始驗證。",
      notCovered: [
        "尚未驗證真實使用者是否完成這個流程、長期留存或轉換提升。",
        "尚未連接 GitHub、MCP、issue mutation 或外部 telemetry。",
        "這份 memo 是本機預覽輸出，不代表外部使用者採用。",
      ],
    },
  };
}

export function toMarkdown(memo: DecisionMemo): string {
  const evidence = memo.evidenceSummary.map((item) => `- ${item}`).join("\n");
  const limits = memo.knownLimits.length
    ? memo.knownLimits.map((item) => `- ${item}`).join("\n")
    : "- 目前沒有額外標記的限制。";
  const notCovered = memo.notCovered.map((item) => `- ${item}`).join("\n");

  return `# Decision brief

> 資料邊界 · 內容只留在目前這個頁面；重新整理會重設，沒有登入或外部傳送。這份 brief 保留來源、判斷與限制，最後由你決定是否採用。

## Decision

${memo.decision}

## Evidence summary

${evidence}

## Known limits

${limits}

## Experiment

- Opportunity: ${memo.experiment.opportunity}
- Hypothesis: ${memo.experiment.hypothesis}
- Primary metric: ${memo.experiment.primaryMetric}
- Guardrail: ${memo.experiment.guardrail}
- Smallest test: ${memo.experiment.smallestTest}
- Decision rule: ${memo.experiment.decisionRule}
- Owner: ${memo.experiment.owner}
- Readiness: ${memo.experiment.readiness}

## Next action

${memo.nextAction}

## Not covered

${notCovered}
`;
}
