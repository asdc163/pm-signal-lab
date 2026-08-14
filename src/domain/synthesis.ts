import type { Claim, Evidence, ExperimentBrief } from "./types";

export function buildClaims(evidence: Evidence[]): Claim[] {
  const ids = evidence.map((item) => item.id);
  const interviewIds = evidence
    .filter((item) => item.type === "interview" || item.type === "support")
    .map((item) => item.id);
  const observationIds = evidence
    .filter((item) => item.type === "analytics" || item.type === "competitor")
    .map((item) => item.id);
  const hasDirectSignal = interviewIds.length >= 2;
  const hasObservedPattern = observationIds.length >= 1;

  const claims: Claim[] = [
    {
      id: "claim-next-step-friction",
      text: "第一次整理產品訊號時，使用者最容易卡在「下一步要看什麼」而不是資料本身。",
      status: hasDirectSignal ? "supported" : "review",
      evidenceIds: interviewIds,
      limitation: hasDirectSignal
        ? "目前由訪談與客服各一筆直接訊號支持；尚未驗證不同產品類型是否相同。"
        : "目前缺少兩筆不同來源的直接訊號，先保留為待確認假設。",
      edited: false,
      reviewed: false,
    },
    {
      id: "claim-source-trust",
      text: "把來源放在 claim 旁邊，可能比把引用藏在摘要後面更容易讓 PM 回看判斷。",
      status: hasObservedPattern ? "review" : "missing",
      evidenceIds: observationIds,
      limitation: hasObservedPattern
        ? "這是設計方向與競品觀察，不等同於可量化的使用者偏好或成效證據。"
        : "目前沒有競品或產品觀察可支持這個設計假設。",
      edited: false,
      reviewed: false,
    },
    {
      id: "claim-decision-adoption",
      text: "把摘要複製出去，會讓後續產品決策真的被採用。",
      status: "missing",
      evidenceIds: [],
      limitation: "沒有 issue、experiment 或決策採用的追蹤資料；不可把複製行為當成結果。",
      edited: false,
      reviewed: false,
    },
  ];

  return ids.length === 0 ? [] : claims;
}

export function draftExperiment(
  claims: Claim[],
  opportunityId: string,
): ExperimentBrief {
  const opportunity = claims.find((claim) => claim.id === opportunityId);
  const needsValidation =
    !opportunity || opportunity.status !== "supported" || !opportunity.reviewed;
  const limitation = opportunity?.limitation ?? "尚未選擇有來源的 opportunity。";

  return {
    opportunity:
      opportunity?.text ?? "先選擇一個有來源的 opportunity，再開始草擬。",
    hypothesis: opportunity
      ? `如果把 ${opportunity.text.replace(/[。！？]$/, "")} 放進可回看的工作流，PM 會更快找到下一個可驗證行動。`
      : "尚未有足夠 evidence 形成 hypothesis。",
    primaryMetric: needsValidation
      ? "Needs validation：先定義完成一次決策 brief 的可觀測事件。"
      : "從載入 evidence 到確認一個下一步的完成率。",
    guardrail: "不能降低 source visibility；每個支持 claim 必須保留可回看的來源。",
    smallestTest:
      "找 5 位 PM，用同一組 evidence 完成一次 Collect → Verify → Decide，記錄是否需要人工救援。",
    decisionRule: `若至少 4/5 位能完成且不把缺少的證據當成結論，才進入下一輪；目前限制：${limitation}`,
    owner: "產品負責人／待指定",
    readiness: needsValidation ? "needs-validation" : "ready",
  };
}
