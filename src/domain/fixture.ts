import type { EvidencePack } from "./types";

export const SAMPLE_PACK: EvidencePack = {
  id: "pm-signal-onboarding-v1",
  title: "產品探索入門：第一次把訊號整理成決策",
  description:
    "這組資料混合訪談、客服與產品觀察，示範每個判斷如何保留來源、限制與下一個可驗證的行動。",
  evidence: [
    {
      id: "evidence-interview-01",
      title: "訪談：第一次整理產品訊號",
      source: "訪談紀錄 · PM-07",
      type: "interview",
      observedAt: "2026-08-07T10:20:00+08:00",
      content:
        "我有訪談、客服和埋點資料，但每次都先丟進聊天工具。最後得到一段摘要，卻很難回頭確認哪一句是使用者真的說過的。",
    },
    {
      id: "evidence-support-01",
      title: "客服：找不到下一步",
      source: "客服信箱 · 工單 #1842",
      type: "support",
      observedAt: "2026-08-06T16:45:00+08:00",
      content:
        "使用者完成匯入後問：『我現在應該先看哪一個問題？』他重新整理頁面兩次，最後離開，沒有建立後續任務。",
    },
    {
      id: "evidence-analytics-01",
      title: "產品觀察：輸出被複製，沒有被採用",
      source: "產品觀察 · 第 32 週",
      type: "analytics",
      observedAt: "2026-08-05T09:00:00+08:00",
      content:
        "目前只知道試用者常複製摘要文字；尚未連到後續 issue 或 experiment 的完成資料，因此不能把複製視為決策品質提升。",
    },
    {
      id: "evidence-competitor-01",
      title: "競品觀察：來源被藏在結果後面",
      source: "競品拆解 · 2026-08-04",
      type: "competitor",
      observedAt: "2026-08-04T14:10:00+08:00",
      content:
        "多數 AI 筆記工具把引用收在展開層；使用者必須先相信摘要，再花力氣追來源。這是可驗證的設計假設，不是市場規模證據。",
    },
  ],
};

export function cloneSamplePack(): EvidencePack {
  return {
    ...SAMPLE_PACK,
    evidence: SAMPLE_PACK.evidence.map((item) => ({ ...item })),
  };
}
