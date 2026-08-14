import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  ClipboardList,
  Download,
  FileText,
  Flag,
  Info,
  Lightbulb,
  Link2,
  ListChecks,
  Menu,
  Pencil,
  Plus,
  RotateCcw,
  ShieldCheck,
  Target,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { buildDecisionMemo, toMarkdown } from "./domain/export";
import { cloneSamplePack, SAMPLE_PACK } from "./domain/fixture";
import { buildClaims, draftExperiment } from "./domain/synthesis";
import { buildSessionReceipt } from "./domain/session";
import type {
  Claim,
  ClaimStatus,
  DecisionMemo,
  Evidence,
  EvidencePack,
  EvidenceType,
  ExperimentBrief,
  ProductEvent,
  ProductEventName,
  WorkflowStep,
} from "./domain/types";
import { EVIDENCE_TYPES } from "./domain/types";

const WORKFLOW: Array<{
  id: WorkflowStep;
  number: string;
  label: string;
  description: string;
}> = [
  { id: "collect", number: "01", label: "收集", description: "把訊號放上桌" },
  { id: "verify", number: "02", label: "核對", description: "回看來源與限制" },
  { id: "decide", number: "03", label: "安排", description: "寫下最小驗證" },
  { id: "ship", number: "04", label: "帶走", description: "匯出決策 brief" },
];

const EVIDENCE_LABELS: Record<EvidenceType, string> = {
  interview: "訪談",
  support: "客服",
  analytics: "產品觀察",
  competitor: "競品",
  market: "市場",
  expert: "專家",
};

const STATUS_META: Record<
  ClaimStatus,
  { label: string; className: string; Icon: typeof BadgeCheck }
> = {
  supported: { label: "有來源支持", className: "status-supported", Icon: BadgeCheck },
  review: { label: "需要你確認", className: "status-review", Icon: CircleAlert },
  missing: { label: "缺少證據", className: "status-missing", Icon: CircleAlert },
};

type NoticeTone = "success" | "warning" | "error" | "info";

interface Notice {
  tone: NoticeTone;
  message: string;
}

interface EvidenceFormState {
  title: string;
  source: string;
  type: EvidenceType;
  content: string;
}

const EMPTY_FORM: EvidenceFormState = {
  title: "",
  source: "",
  type: "interview",
  content: "",
};

const SESSION_FEEDBACK_URL = "https://github.com/asdc163/pm-signal-lab/issues/new?template=pm-session-feedback.md";

const EVENT_LABELS: Record<ProductEventName, string> = {
  sample_pack_loaded: "載入範例資料",
  evidence_added: "新增一筆訊號",
  claim_reviewed: "處理一個判斷",
  experiment_drafted: "草擬最小實驗",
  decision_exported: "準備決策 brief",
  recovery_used: "使用恢復動作",
};

const SAMPLE_PREVIEW = SAMPLE_PACK.evidence[0];

function App() {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>("collect");
  const [pack, setPack] = useState<EvidencePack | null>(null);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [experiment, setExperiment] = useState<ExperimentBrief>();
  const [memo, setMemo] = useState<DecisionMemo>();
  const [markdown, setMarkdown] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState<EvidenceFormState>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof EvidenceFormState, string>>>({});
  const [activeClaimId, setActiveClaimId] = useState<string>();
  const [expandedEvidenceId, setExpandedEvidenceId] = useState<string>();
  const [notice, setNotice] = useState<Notice>();
  const [events, setEvents] = useState<ProductEvent[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const sourceRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const reviewedCount = claims.filter((claim) => claim.reviewed).length;
  const supportedCount = claims.filter(
    (claim) => claim.status === "supported" && claim.reviewed,
  ).length;
  const progress = Math.min(evidence.length, 4);

  const logEvent = (
    name: ProductEventName,
    properties: Record<string, string | number | boolean>,
  ) => {
    setEvents((previous) => [
      ...previous,
      { name, properties, at: new Date().toISOString() },
    ]);
  };

  useEffect(() => {
    const firstInvalid = formErrors.title
      ? titleRef.current
      : formErrors.source
        ? sourceRef.current
        : formErrors.content
          ? contentRef.current
          : null;
    firstInvalid?.focus();
  }, [formErrors]);

  const showNotice = (tone: NoticeTone, message: string) => {
    setNotice({ tone, message });
  };

  const loadSample = () => {
    setIsLoading(true);
    setNotice(undefined);
    window.setTimeout(() => {
      try {
        const nextPack = cloneSamplePack();
        setPack(nextPack);
        setEvidence(nextPack.evidence);
        setClaims(buildClaims(nextPack.evidence));
        setExperiment(undefined);
        setMemo(undefined);
        setMarkdown("");
        setCurrentStep("collect");
        setIsLoading(false);
        showNotice("success", "範例資料已載入；下一步是看每個判斷如何回到來源。 ");
        logEvent("sample_pack_loaded", { pack_id: nextPack.id, source: "fixture" });
      } catch {
        setIsLoading(false);
        showNotice("error", "範例資料載入失敗，原始工作區仍安全。 ");
        logEvent("recovery_used", { state: "fixture_error", action: "reset_demo_data" });
      }
    }, 260);
  };

  const resetDemo = () => {
    setPack(null);
    setEvidence([]);
    setClaims([]);
    setExperiment(undefined);
    setMemo(undefined);
    setMarkdown("");
    setCurrentStep("collect");
    setIsFormOpen(false);
    setForm(EMPTY_FORM);
    setFormErrors({});
    showNotice("info", "工作區已重設；你可以重新載入範例資料或自己新增一筆訊號。 ");
    logEvent("recovery_used", { state: "workspace", action: "reset_demo_data" });
  };

  const updateEvidence = (nextEvidence: Evidence[]) => {
    setEvidence(nextEvidence);
    setClaims(buildClaims(nextEvidence));
    setExperiment(undefined);
    setMemo(undefined);
    setMarkdown("");
  };

  const submitEvidence = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: Partial<Record<keyof EvidenceFormState, string>> = {};
    if (!form.title.trim()) errors.title = "請補上訊號標題，讓其他人知道這筆觀察在說什麼。";
    if (!form.source.trim()) errors.source = "請補上來源，讓其他人能回看這個觀察。";
    if (!form.content.trim()) errors.content = "請補上訊號內容，不要只留下標題。";
    if (form.content.length > 600) {
      errors.content = "內容超過 v0 上限；文字已保留，請縮短後再儲存。";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      showNotice("warning", "表單還有需要修正的欄位；你的文字已保留。 ");
      return;
    }

    const newEvidence: Evidence = {
      id: `evidence-local-${Date.now()}`,
      title: form.title.trim(),
      source: form.source.trim(),
      type: form.type,
      observedAt: new Date().toISOString(),
      content: form.content.trim(),
      added: true,
    };
    const nextEvidence = [newEvidence, ...evidence];
    updateEvidence(nextEvidence);
    setPack((previous) =>
      previous ?? {
        id: "pm-signal-local-session",
        title: "我的 PM signal workspace",
        description: "這是一組只存在於目前瀏覽器工作階段的產品訊號。",
        evidence: [],
      },
    );
    setForm(EMPTY_FORM);
    setFormErrors({});
    setIsFormOpen(false);
    showNotice("success", "訊號已加入；暫定判斷已重新整理，請回到核對處理。 ");
    logEvent("evidence_added", {
      evidence_type: form.type,
      source_kind: form.source.includes("·") ? "structured" : "manual",
      content_length_bucket: form.content.length <= 120 ? "short" : "long",
    });
  };

  const updateClaim = (claimId: string, changes: Partial<Claim>) => {
    setClaims((previous) =>
      previous.map((claim) => (claim.id === claimId ? { ...claim, ...changes } : claim)),
    );
    setMemo(undefined);
    setMarkdown("");
  };

  const acceptClaim = (claim: Claim) => {
    updateClaim(claim.id, { status: "supported", reviewed: true });
    setActiveClaimId(claim.id);
    showNotice("success", "這個判斷已採用；來源與限制仍會保留在 decision brief。 ");
    logEvent("claim_reviewed", {
      claim_status: "supported",
      source_count: claim.evidenceIds.length,
      edited: claim.edited,
    });
  };

  const keepAsHypothesis = (claim: Claim) => {
    updateClaim(claim.id, { status: "review", reviewed: true });
    setActiveClaimId(claim.id);
    showNotice("warning", "已保留為假設；它不會被當成已驗證結論。 ");
    logEvent("claim_reviewed", {
      claim_status: "review",
      source_count: claim.evidenceIds.length,
      edited: claim.edited,
    });
  };

  const markMissing = (claim: Claim) => {
    updateClaim(claim.id, { status: "missing", reviewed: true });
    setActiveClaimId(claim.id);
    showNotice("warning", "已標記缺少證據；下一份 brief 會保留這個缺口。 ");
    logEvent("claim_reviewed", {
      claim_status: "missing",
      source_count: claim.evidenceIds.length,
      edited: claim.edited,
    });
  };

  const editClaim = (claim: Claim) => {
    const editedText = window.prompt("編輯判斷（來源與限制會保留）", claim.text);
    if (editedText === null) return;
    if (!editedText.trim()) {
      showNotice("warning", "判斷不能是空白；原本的內容仍保留。 ");
      return;
    }
    updateClaim(claim.id, { text: editedText.trim(), status: "review", reviewed: true, edited: true });
    setActiveClaimId(claim.id);
    showNotice("success", "判斷已編輯並保留為待確認；請再決定是否採用。 ");
    logEvent("claim_reviewed", {
      claim_status: "review",
      source_count: claim.evidenceIds.length,
      edited: true,
    });
  };

  const selectStep = (nextStep: WorkflowStep) => {
    if (nextStep === "collect") {
      setCurrentStep(nextStep);
      return;
    }
    if (nextStep === "verify" && evidence.length === 0) {
      showNotice("info", "先載入範例資料或新增一筆訊號，才有內容可以核對。 ");
      setCurrentStep("collect");
      return;
    }
    if (nextStep === "decide" && claims.length === 0) {
      showNotice("info", "目前沒有可核對的判斷；回收集新增訊號。 ");
      setCurrentStep("collect");
      return;
    }
    if (nextStep === "ship" && !experiment) {
      showNotice("info", "尚未準備好匯出；先在安排這一步草擬最小實驗。 ");
      setCurrentStep(experiment ? "ship" : "decide");
      return;
    }
    setCurrentStep(nextStep);
  };

  const startReview = () => {
    if (claims.length === 0) {
      showNotice("info", "目前沒有可核對的判斷；回收集新增訊號。 ");
      return;
    }
    setCurrentStep("verify");
    setActiveClaimId(claims[0].id);
  };

  const startExperiment = (claimId?: string) => {
    const selectedId = claimId ?? activeClaimId ?? claims.find((claim) => claim.reviewed)?.id ?? claims[0]?.id;
    if (!selectedId) {
      showNotice("warning", "先處理至少一個判斷，再草擬最小實驗。 ");
      setCurrentStep("verify");
      return;
    }
    const nextExperiment = draftExperiment(claims, selectedId);
    setActiveClaimId(selectedId);
    setExperiment(nextExperiment);
    setMemo(undefined);
    setMarkdown("");
    setCurrentStep("decide");
    showNotice(
      nextExperiment.readiness === "ready" ? "success" : "warning",
      nextExperiment.readiness === "ready"
        ? "最小實驗 brief 已草擬；請確認測試內容與判定規則。 "
        : "這份 brief 還不能當成結論；先補上列出的證據。 ",
    );
    logEvent("experiment_drafted", {
      needs_validation: nextExperiment.readiness === "needs-validation",
      metric_present: Boolean(nextExperiment.primaryMetric),
      guardrail_present: Boolean(nextExperiment.guardrail),
    });
  };

  const updateExperiment = (field: keyof ExperimentBrief, value: string) => {
    setExperiment((previous) => (previous ? { ...previous, [field]: value } : previous));
    setMemo(undefined);
    setMarkdown("");
  };

  const exportMemo = () => {
    const result = buildDecisionMemo(claims, experiment);
    if (!result.ok) {
      showNotice("warning", result.error);
      setCurrentStep(result.error.includes("experiment") ? "decide" : "verify");
      logEvent("recovery_used", { state: "export_incomplete", action: "return_to_fix" });
      return;
    }
    const nextMarkdown = toMarkdown(result.memo);
    setMemo(result.memo);
    setMarkdown(nextMarkdown);
    setCurrentStep("ship");
    showNotice("success", "決策 brief 已準備好；你可以複製或下載 Markdown。 ");
    logEvent("decision_exported", { format: "markdown", copy_or_download: "prepared", complete: true });
  };

  const copyMarkdown = async () => {
    if (!markdown) {
      exportMemo();
      return;
    }
    try {
      await navigator.clipboard.writeText(markdown);
      showNotice("success", "Markdown 已複製；你可以貼到 GitHub issue 或 PRD。 ");
      logEvent("decision_exported", { format: "markdown", copy_or_download: "copy", complete: true });
    } catch {
      showNotice("warning", "下載沒有完成，但內容仍在這裡；請複製文字繼續。 ");
      logEvent("recovery_used", { state: "clipboard_blocked", action: "use_textarea" });
    }
  };

  const copySessionReceipt = async () => {
    const receipt = buildSessionReceipt({
      currentStep,
      evidenceCount: evidence.length,
      reviewedCount,
      supportedCount,
      events,
    });

    try {
      await navigator.clipboard.writeText(receipt);
      showNotice("success", "試用摘要已複製；送出前請先確認沒有私密內容。 ");
    } catch {
      showNotice("warning", "剪貼簿被瀏覽器擋住；請到回饋頁手動整理這次試用。 ");
    }
  };

  const downloadMarkdown = () => {
    if (!markdown) {
      exportMemo();
      return;
    }
    try {
      const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "pm-signal-decision-brief.md";
      anchor.click();
      URL.revokeObjectURL(url);
      showNotice("success", "Markdown 已下載；內容也仍保留在頁面上。 ");
      logEvent("decision_exported", { format: "markdown", copy_or_download: "download", complete: true });
    } catch {
      showNotice("warning", "下載沒有完成，但內容仍在這裡；請複製文字繼續。 ");
      logEvent("recovery_used", { state: "download_blocked", action: "use_textarea" });
    }
  };

  const nextAction = (() => {
    if (!pack) return { label: "載入範例資料", action: loadSample };
    if (currentStep === "collect" && claims.length > 0) return { label: "開始核對", action: startReview };
    if (currentStep === "verify") return { label: "草擬最小實驗", action: () => startExperiment() };
    if (currentStep === "decide") return { label: "匯出決策 brief", action: exportMemo };
    return { label: "複製 Markdown", action: copyMarkdown };
  })();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">跳到主要內容</a>
      <Sidebar currentStep={currentStep} onSelectStep={selectStep} />
      <div className="app-body">
        <header className="topbar">
          <div className="topbar-mobile-brand">
            <span className="brand-mark" aria-hidden="true">PS</span>
            <span>PM Signal Lab</span>
          </div>
          <div className="topbar-context">
            <span className="topbar-kicker">證據工作頁</span>
            <span className="topbar-divider" aria-hidden="true" />
            <span>{pack?.title ?? "未建立工作區"}</span>
          </div>
          <button className="icon-button topbar-menu" type="button" aria-label="跳到工作流程" aria-controls="mobile-workflow" title="跳到工作流程" onClick={() => document.getElementById("mobile-workflow")?.scrollIntoView({ behavior: "smooth", block: "center" })}>
            <Menu size={18} />
          </button>
          <div className="topbar-status"><span>資料不上傳</span></div>
        </header>

        <div id="mobile-workflow" className="mobile-stepper" aria-label="工作流程">
          <WorkflowStepper currentStep={currentStep} onSelectStep={selectStep} mobile />
        </div>

        <main id="main-content" className="workspace" tabIndex={-1}>
          <section className="workbench" aria-labelledby="page-title">
            <div className="hero-block">
              <div>
                <p className="eyebrow">產品訊號／工作頁</p>
                <h1 id="page-title">先看來源，再決定下一步</h1>
                <p className="hero-copy">
                  把原文留在眼前，逐筆確認哪句可以採用、哪句還要再查。最後只帶走一個最小實驗。
                </p>
              </div>
              <div className="hero-action-stack">
                <span className="progress-label"><span>{pack ? `${progress} / 4` : "第一步"}</span>{pack ? " 範例訊號" : " 先看一組範例"}</span>
                <div className="progress-track" role="progressbar" aria-label="範例訊號載入進度" aria-valuemin={0} aria-valuemax={4} aria-valuenow={progress}>
                  <span style={{ width: `${(progress / 4) * 100}%` }} />
                </div>
              </div>
            </div>

            {notice && (
              <div className={`notice notice-${notice.tone}`} role={notice.tone === "error" ? "alert" : "status"}>
                <NoticeIcon tone={notice.tone} />
                <span>{notice.message}</span>
                <button className="notice-close" type="button" onClick={() => setNotice(undefined)} aria-label="關閉提示">
                  <X size={15} />
                </button>
              </div>
            )}

            <div className="desktop-stepper-wrap">
              <WorkflowStepper currentStep={currentStep} onSelectStep={selectStep} />
            </div>

            {currentStep === "collect" && (
              <CollectView
                pack={pack}
                evidence={evidence}
                isLoading={isLoading}
                isFormOpen={isFormOpen}
                form={form}
                formErrors={formErrors}
                titleRef={titleRef}
                sourceRef={sourceRef}
                contentRef={contentRef}
                expandedEvidenceId={expandedEvidenceId}
                onLoadSample={loadSample}
                onReset={resetDemo}
                onOpenForm={() => setIsFormOpen(true)}
                onCloseForm={() => { setIsFormOpen(false); setFormErrors({}); }}
                onChangeForm={(field, value) => setForm((previous) => ({ ...previous, [field]: value }))}
                onSubmitForm={submitEvidence}
                onToggleEvidence={(id) => setExpandedEvidenceId((previous) => previous === id ? undefined : id)}
              />
            )}

            {currentStep === "verify" && (
              <VerifyView
                claims={claims}
                evidence={evidence}
                activeClaimId={activeClaimId}
                onActivate={setActiveClaimId}
                onAccept={acceptClaim}
                onKeep={keepAsHypothesis}
                onMissing={markMissing}
                onEdit={editClaim}
                onDraft={() => startExperiment()}
              />
            )}

            {currentStep === "decide" && (
              <DecideView
                claims={claims}
                activeClaimId={activeClaimId}
                experiment={experiment}
                onSelectClaim={setActiveClaimId}
                onDraft={startExperiment}
                onUpdate={updateExperiment}
                onExport={exportMemo}
                onBack={() => setCurrentStep("verify")}
              />
            )}

            {currentStep === "ship" && (
              <ShipView
                memo={memo}
                markdown={markdown}
                onExport={exportMemo}
                onCopy={copyMarkdown}
                onDownload={downloadMarkdown}
                onBack={() => setCurrentStep("decide")}
              />
            )}

            <div className="boundary-note">
              <ShieldCheck size={16} />
              <span><strong>資料邊界</strong> · 內容只留在這個瀏覽器工作階段；這是一條可回看的工作流，不是模型品質證明。</span>
            </div>
          </section>

          <DecisionContext
            pack={pack}
            evidenceCount={evidence.length}
            reviewedCount={reviewedCount}
            supportedCount={supportedCount}
            currentStep={currentStep}
            nextAction={nextAction}
            events={events}
            onCopyReceipt={copySessionReceipt}
            feedbackUrl={SESSION_FEEDBACK_URL}
          />
        </main>

        <div className={`mobile-action-bar ${!pack ? "is-empty" : ""}`}>
          <span>{WORKFLOW.find((item) => item.id === currentStep)?.description}</span>
          <button className="button button-primary" type="button" onClick={nextAction.action} disabled={isLoading}>
            {nextAction.label}<ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ currentStep, onSelectStep }: { currentStep: WorkflowStep; onSelectStep: (step: WorkflowStep) => void }) {
  return (
    <aside className="sidebar" aria-label="PM Signal Lab 導覽">
      <div className="sidebar-brand">
        <span className="brand-mark" aria-hidden="true">PS</span>
        <div>
          <strong>PM Signal Lab</strong>
          <span>產品證據工作台</span>
        </div>
      </div>
      <div className="sidebar-rule" />
      <nav className="workflow-nav" aria-label="工作流程">
        <span className="sidebar-section-label">工作流程</span>
        <WorkflowStepper currentStep={currentStep} onSelectStep={onSelectStep} />
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-rule" />
        <span className="sidebar-section-label">資料邊界</span>
        <p>資料只留在目前瀏覽器工作階段。沒有登入、外部傳送或自動修改。</p>
        <a className="sidebar-link" href={SESSION_FEEDBACK_URL} target="_blank" rel="noreferrer">回報一次試用</a>
        <span className="version-label">預覽版 0.1 · 內容只在瀏覽器保存</span>
      </div>
    </aside>
  );
}

function WorkflowStepper({ currentStep, onSelectStep, mobile = false }: { currentStep: WorkflowStep; onSelectStep: (step: WorkflowStep) => void; mobile?: boolean }) {
  const currentIndex = WORKFLOW.findIndex((item) => item.id === currentStep);
  return (
    <ol className={`stepper ${mobile ? "stepper-mobile" : ""}`}>
      {WORKFLOW.map((item, index) => {
        const isCurrent = item.id === currentStep;
        const isPast = index < currentIndex;
        return (
          <li key={item.id} className={`stepper-item ${isCurrent ? "is-current" : ""} ${isPast ? "is-past" : ""}`}>
            <button type="button" onClick={() => onSelectStep(item.id)} aria-current={isCurrent ? "step" : undefined}>
              <span className="step-number">{isPast ? <Check size={14} /> : item.number}</span>
              <span className="step-copy"><strong>{item.label}</strong><small>{item.description}</small></span>
            </button>
            {index < WORKFLOW.length - 1 && <span className="step-connector" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}

function CollectView({
  pack, evidence, isLoading, isFormOpen, form, formErrors, titleRef, sourceRef, contentRef, expandedEvidenceId,
  onLoadSample, onReset, onOpenForm, onCloseForm, onChangeForm, onSubmitForm, onToggleEvidence,
}: {
  pack: EvidencePack | null;
  evidence: Evidence[];
  isLoading: boolean;
  isFormOpen: boolean;
  form: EvidenceFormState;
  formErrors: Partial<Record<keyof EvidenceFormState, string>>;
  titleRef: React.RefObject<HTMLInputElement | null>;
  sourceRef: React.RefObject<HTMLInputElement | null>;
  contentRef: React.RefObject<HTMLTextAreaElement | null>;
  expandedEvidenceId?: string;
  onLoadSample: () => void;
  onReset: () => void;
  onOpenForm: () => void;
  onCloseForm: () => void;
  onChangeForm: (field: keyof EvidenceFormState, value: string) => void;
  onSubmitForm: (event: FormEvent<HTMLFormElement>) => void;
  onToggleEvidence: (id: string) => void;
}) {
  if (isLoading) {
    return <section className="state-panel loading-state" aria-live="polite"><Activity size={22} className="spin" /><div><h2>正在整理範例資料</h2><p>保留工作區邊界，載入完成後你仍可逐筆回看來源。</p></div></section>;
  }

  return (
    <section className="content-section" aria-labelledby="collect-title">
      {!pack && (
          <div className="empty-panel">
            <div className="empty-index" aria-hidden="true">01</div>
            <div className="empty-copy">
              <p className="section-eyebrow">第一頁／先看一筆訊號</p>
              <h2 id="collect-title">先把一個問題放上桌</h2>
              <p>給自己五分鐘：載入幾筆產品訊號，找出一個能回到來源、也值得再驗證的下一步。</p>
              <blockquote className="sample-quote">
                <span>{EVIDENCE_LABELS[SAMPLE_PREVIEW.type]} · {SAMPLE_PREVIEW.source}</span>
                <p>「{SAMPLE_PREVIEW.content}」</p>
              </blockquote>
              <div className="first-run-note"><span>今天先做一件事</span><strong>哪一句話值得帶進下一次產品討論？</strong><small>來源 → 判斷 → 最小驗證</small></div>
              <div className="empty-actions">
                <button className="button button-primary" type="button" onClick={onLoadSample}><ClipboardList size={16} />載入範例資料</button>
                <button className="button button-secondary" type="button" onClick={onOpenForm}><Plus size={16} />自己新增一筆訊號</button>
              </div>
            </div>
          </div>
      )}

      {pack && (
        <>
          <div className="pack-header">
            <div>
              <p className="section-eyebrow">目前的產品訊號</p>
              <h2 id="collect-title">{pack.title}</h2>
              <p>{pack.description}</p>
            </div>
            <div className="pack-actions">
              <span className="count-badge"><strong>{evidence.length}</strong> 筆訊號</span>
              <button className="button button-secondary" type="button" onClick={onOpenForm}><Plus size={16} />新增訊號</button>
            </div>
          </div>
          <div className="section-heading-row">
            <div><h3>訊號來源</h3><p>先看原文，再讓暫定判斷往下一步走。</p></div>
            <span className="micro-status">資料不上傳</span>
          </div>
          <div className="evidence-list">
            {evidence.map((item) => (
              <EvidenceRow key={item.id} evidence={item} expanded={expandedEvidenceId === item.id} onToggle={() => onToggleEvidence(item.id)} />
            ))}
          </div>
          <div className="next-action-card">
            <div className="next-action-icon"><ArrowRight size={18} /></div>
            <div><span className="card-eyebrow">下一步</span><h3>來源先準備好了，現在逐個處理判斷。</h3><p>你可以採用、編輯，或把它保留為假設；缺少的證據不會被藏起來。</p></div>
          </div>
          <button className="text-button reset-button" type="button" onClick={onReset}><RotateCcw size={14} />重設這組資料</button>
        </>
      )}

      {isFormOpen && (
        <EvidenceForm form={form} errors={formErrors} titleRef={titleRef} sourceRef={sourceRef} contentRef={contentRef} onChange={onChangeForm} onSubmit={onSubmitForm} onClose={onCloseForm} />
      )}
    </section>
  );
}

function EvidenceForm({ form, errors, titleRef, sourceRef, contentRef, onChange, onSubmit, onClose }: {
  form: EvidenceFormState;
  errors: Partial<Record<keyof EvidenceFormState, string>>;
  titleRef: React.RefObject<HTMLInputElement | null>;
  sourceRef: React.RefObject<HTMLInputElement | null>;
  contentRef: React.RefObject<HTMLTextAreaElement | null>;
  onChange: (field: keyof EvidenceFormState, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  return (
    <form className="evidence-form" onSubmit={onSubmit} noValidate>
      <div className="form-header"><div><p className="section-eyebrow">新增產品訊號</p><h3>把一個真實觀察放進來</h3><p>這份預覽只在目前頁面處理，不會上傳你的內容。</p></div><button className="icon-button" type="button" onClick={onClose} aria-label="關閉新增產品訊號表單"><X size={18} /></button></div>
      <div className="form-grid">
        <Field label="訊號標題" error={errors.title} htmlFor="evidence-title"><input ref={titleRef} id="evidence-title" value={form.title} onChange={(event) => onChange("title", event.target.value)} aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "evidence-title-error" : undefined} placeholder="例如：訪談：使用者找不到下一步" /></Field>
        <Field label="來源" error={errors.source} htmlFor="evidence-source"><input ref={sourceRef} id="evidence-source" value={form.source} onChange={(event) => onChange("source", event.target.value)} aria-invalid={Boolean(errors.source)} aria-describedby={errors.source ? "evidence-source-error" : undefined} placeholder="例如：Interview note · PM-08" /></Field>
        <Field label="類型" htmlFor="evidence-type"><select id="evidence-type" value={form.type} onChange={(event) => onChange("type", event.target.value)}>{EVIDENCE_TYPES.map((type) => <option key={type} value={type}>{EVIDENCE_LABELS[type]}</option>)}</select></Field>
        <Field label="觀察內容" error={errors.content} htmlFor="evidence-content" className="field-wide" helper={`最多 600 字 · 目前 ${form.content.length} 字`}><textarea ref={contentRef} id="evidence-content" rows={4} value={form.content} onChange={(event) => onChange("content", event.target.value)} aria-invalid={Boolean(errors.content)} aria-describedby={errors.content ? "evidence-content-error" : "evidence-content-help"} placeholder="保留可以被其他人回看的原文或觀察，不要只寫結論。" /></Field>
      </div>
      <div className="form-footer"><span><Info size={14} />來源與限制會一起進入後面的判斷核對。</span><div><button className="button button-secondary" type="button" onClick={onClose}>取消</button><button className="button button-primary" type="submit"><Plus size={16} />儲存訊號</button></div></div>
    </form>
  );
}

function Field({ label, error, htmlFor, children, helper, className = "" }: { label: string; error?: string; htmlFor: string; children: React.ReactNode; helper?: string; className?: string }) {
  return <div className={`field ${className}`}><div className="field-label-row"><label htmlFor={htmlFor}>{label}</label>{helper && <span id={`${htmlFor}-help`}>{helper}</span>}</div>{children}{error && <span className="field-error" id={`${htmlFor}-error`} role="alert">{error}</span>}</div>;
}

function EvidenceRow({ evidence, expanded, onToggle }: { evidence: Evidence; expanded: boolean; onToggle: () => void }) {
  return (
    <article className={`evidence-row ${expanded ? "is-expanded" : ""}`}>
      <div className="evidence-spine" aria-hidden="true"><span /></div>
      <div className="evidence-main">
        <div className="evidence-row-top"><span className="evidence-type">{EVIDENCE_LABELS[evidence.type]}</span>{evidence.added && <span className="just-added">剛加入</span>}<time dateTime={evidence.observedAt}>{formatDate(evidence.observedAt)}</time></div>
        <h4>{evidence.title}</h4>
        <p className="evidence-source"><Link2 size={14} />{evidence.source}</p>
        <p className="evidence-preview">{evidence.content}</p>
        {expanded && <div id={`source-${evidence.id}`} className="source-detail" role="region" aria-label={`原文摘錄：${evidence.title}`}><span className="detail-label">原文摘錄</span><p>{evidence.content}</p><span className="detail-meta">原始內容保留於目前試用 · {evidence.id}</span></div>}
      </div>
      <button className="row-toggle" type="button" onClick={onToggle} aria-expanded={expanded} aria-controls={`source-${evidence.id}`}>{expanded ? "收起來源" : "查看來源"}<ChevronDown size={15} className={expanded ? "rotate-180" : ""} /></button>
    </article>
  );
}

function VerifyView({ claims, evidence, activeClaimId, onActivate, onAccept, onKeep, onMissing, onEdit, onDraft }: { claims: Claim[]; evidence: Evidence[]; activeClaimId?: string; onActivate: (id: string) => void; onAccept: (claim: Claim) => void; onKeep: (claim: Claim) => void; onMissing: (claim: Claim) => void; onEdit: (claim: Claim) => void; onDraft: () => void }) {
  return (
    <section className="content-section" aria-labelledby="verify-title">
      <div className="section-intro"><div><p className="section-eyebrow">第二步／核對來源</p><h2 id="verify-title">先確認這個判斷從哪裡來</h2><p>暫定判斷不是事實。採用前，請看來源、時間和限制；你也可以把它留在假設區。</p></div><span className="human-label">來源在旁邊，你自己決定</span></div>
      {claims.length === 0 ? <div className="state-panel"><CircleAlert size={22} /><div><h3>目前沒有可核對的判斷</h3><p>回收集新增訊號，系統才有內容可以整理。</p></div></div> : <>
        <div className="claim-summary"><span><strong>{claims.length}</strong> 個暫定判斷</span><span><BadgeCheck size={14} />{claims.filter((claim) => claim.status === "supported").length} 有支持來源</span><span><CircleAlert size={14} />{claims.filter((claim) => claim.status !== "supported").length} 等你判斷</span></div>
        <div className="claim-list">
          {claims.map((claim) => <ClaimRow key={claim.id} claim={claim} evidence={evidence} expanded={activeClaimId === claim.id} onActivate={() => onActivate(claim.id)} onAccept={() => onAccept(claim)} onKeep={() => onKeep(claim)} onMissing={() => onMissing(claim)} onEdit={() => onEdit(claim)} />)}
        </div>
        <div className="human-boundary"><ShieldCheck size={17} /><div><strong>這是建議，不是決策。</strong><span>只有你按下採用或保留為假設後，下一步 brief 才會記錄這個判斷。</span></div><button className="button button-secondary" type="button" onClick={onDraft}>前往安排<ArrowRight size={15} /></button></div>
      </>}
    </section>
  );
}

function ClaimRow({ claim, evidence, expanded, onActivate, onAccept, onKeep, onMissing, onEdit }: { claim: Claim; evidence: Evidence[]; expanded: boolean; onActivate: () => void; onAccept: () => void; onKeep: () => void; onMissing: () => void; onEdit: () => void }) {
  const meta = STATUS_META[claim.status];
  const StatusIcon = meta.Icon;
  const sourceItems = evidence.filter((item) => claim.evidenceIds.includes(item.id));
  return (
    <article className={`claim-row ${expanded ? "is-expanded" : ""} ${claim.reviewed ? "is-reviewed" : ""}`}>
      <div className="claim-spine" aria-hidden="true"><span className={`claim-node ${meta.className}`} /></div>
      <div className="claim-body">
        <div className="claim-topline"><span className={`status-badge ${meta.className}`}><StatusIcon size={14} />{meta.label}</span>{claim.reviewed && <span className="reviewed-label"><Check size={12} />已處理</span>}<span className="claim-id">{claim.id}</span></div>
        <button id={`claim-title-${claim.id}`} className="claim-title-button" type="button" onClick={onActivate} aria-expanded={expanded} aria-controls={`claim-${claim.id}-detail`}><span>{claim.text}</span><ChevronRight size={17} className={expanded ? "rotate-90" : ""} /></button>
        <div className="claim-meta"><span><Link2 size={13} />{sourceItems.length ? `${sourceItems.length} 個來源` : "沒有來源"}</span><span><Info size={13} />{claim.limitation}</span></div>
        {expanded && <div id={`claim-${claim.id}-detail`} className="claim-detail" role="region" aria-labelledby={`claim-title-${claim.id}`}>
          <div className="detail-block"><span className="detail-label">來源對照</span>{sourceItems.length ? sourceItems.map((item) => <div className="mapped-source" key={item.id}><span className="source-dot" /><div><strong>{item.source}</strong><span>{EVIDENCE_LABELS[item.type]} · {formatDate(item.observedAt)}</span><p>{item.content}</p></div></div>) : <p className="missing-copy">這個判斷沒有可回看的來源；請保留為假設，直到補上訊號。</p>}</div>
          <div className="detail-block limitation-block"><span className="detail-label">目前限制</span><p>{claim.limitation}</p></div>
          <div className="claim-actions"><button className="button button-primary" type="button" onClick={onAccept}><Check size={15} />採用這個判斷</button><button className="button button-secondary" type="button" onClick={onKeep}><Flag size={15} />保留為假設</button><button className="button button-quiet" type="button" onClick={onEdit}><Pencil size={14} />編輯判斷</button>{claim.status !== "missing" && <button className="button button-quiet danger-text" type="button" onClick={onMissing}><CircleAlert size={14} />標記缺少證據</button>}</div>
        </div>}
      </div>
    </article>
  );
}

function DecideView({ claims, activeClaimId, experiment, onSelectClaim, onDraft, onUpdate, onExport, onBack }: { claims: Claim[]; activeClaimId?: string; experiment?: ExperimentBrief; onSelectClaim: (id: string) => void; onDraft: (id?: string) => void; onUpdate: (field: keyof ExperimentBrief, value: string) => void; onExport: () => void; onBack: () => void }) {
  const availableClaims = claims.filter((claim) => claim.reviewed);
  return (
    <section className="content-section" aria-labelledby="decide-title">
      <div className="section-intro"><div><p className="section-eyebrow">第三步／安排驗證</p><h2 id="decide-title">把判斷縮成最小驗證</h2><p>一個好的 brief 不會假裝資料完整；它會說清楚要測什麼、怎麼停、還缺什麼。</p></div><span className="human-label"><Target size={14} />判斷留在人手上</span></div>
      {claims.length === 0 ? <div className="state-panel"><CircleAlert size={22} /><div><h3>還沒有可用的判斷</h3><p>先回收集載入資料，再到核對做一次人為判斷。</p></div><button className="button button-secondary" type="button" onClick={onBack}>回到核對</button></div> : <>
        <div className="opportunity-picker"><div><span className="card-eyebrow">選一個要驗證的方向</span><p>{availableClaims.length ? "選一個已由你處理的判斷；缺少證據的項目仍可做成需要再驗證的 brief。" : "目前沒有已處理的判斷，先回核對採用或保留一個假設。"}</p></div><div className="opportunity-options">{claims.map((claim) => <button key={claim.id} type="button" className={`opportunity-option ${activeClaimId === claim.id ? "is-selected" : ""}`} onClick={() => onSelectClaim(claim.id)}><span className={`mini-node ${STATUS_META[claim.status].className}`} /><span>{claim.text}</span><span className="option-status">{STATUS_META[claim.status].label}</span></button>)}</div><button className="button button-secondary" type="button" onClick={() => onDraft(activeClaimId)} disabled={!activeClaimId && !availableClaims.length}><Target size={15} />草擬最小實驗</button></div>
        {experiment ? <ExperimentEditor experiment={experiment} onUpdate={onUpdate} onExport={onExport} /> : <div className="state-panel state-panel-soft"><Lightbulb size={22} /><div><h3>先選一個要驗證的方向</h3><p>這裡會把它整理成假設、主要指標、護欄與最小測試；你仍要確認是否值得做。</p></div></div>}
      </>}
    </section>
  );
}

function ExperimentEditor({ experiment, onUpdate, onExport }: { experiment: ExperimentBrief; onUpdate: (field: keyof ExperimentBrief, value: string) => void; onExport: () => void }) {
  return <div className="experiment-editor">
    <div className={`readiness-banner ${experiment.readiness === "ready" ? "is-ready" : "is-needs-validation"}`}><span className="readiness-icon">{experiment.readiness === "ready" ? <BadgeCheck size={17} /> : <CircleAlert size={17} />}</span><div><strong>{experiment.readiness === "ready" ? "可以進一步確認" : "需要再驗證"}</strong><p>{experiment.readiness === "ready" ? "這個方向有你採用的來源支持；請再確認實驗細節。" : "這份 brief 還不能當成結論；先補上列出的證據。"}</p></div></div>
    <div className="brief-heading"><div><span className="section-eyebrow">草稿／可自行修改</span><h3>最小實驗 brief</h3></div><span className="human-label">先寫小，再決定要不要做</span></div>
    <div className="brief-fields"><BriefField label="要驗證的方向" value={experiment.opportunity} onChange={(value) => onUpdate("opportunity", value)} wide /><BriefField label="假設" value={experiment.hypothesis} onChange={(value) => onUpdate("hypothesis", value)} wide /><BriefField label="主要指標" value={experiment.primaryMetric} onChange={(value) => onUpdate("primaryMetric", value)} /><BriefField label="護欄指標" value={experiment.guardrail} onChange={(value) => onUpdate("guardrail", value)} /><BriefField label="最小測試" value={experiment.smallestTest} onChange={(value) => onUpdate("smallestTest", value)} wide textarea /><BriefField label="判定規則" value={experiment.decisionRule} onChange={(value) => onUpdate("decisionRule", value)} wide textarea /><BriefField label="負責人" value={experiment.owner} onChange={(value) => onUpdate("owner", value)} /></div>
    <div className="brief-footer"><span><ShieldCheck size={14} />送出前都能修改；這裡不會自動發出 issue 或通知。</span><button className="button button-primary" type="button" onClick={onExport}>匯出決策 brief<ArrowRight size={16} /></button></div>
  </div>;
}

function BriefField({ label, value, onChange, wide = false, textarea = false }: { label: string; value: string; onChange: (value: string) => void; wide?: boolean; textarea?: boolean }) {
  return <label className={`brief-field ${wide ? "field-wide" : ""}`}><span>{label}</span>{textarea ? <textarea value={value} rows={3} onChange={(event) => onChange(event.target.value)} /> : <input value={value} onChange={(event) => onChange(event.target.value)} />}</label>;
}

function ShipView({ memo, markdown, onExport, onCopy, onDownload, onBack }: { memo?: DecisionMemo; markdown: string; onExport: () => void; onCopy: () => void; onDownload: () => void; onBack: () => void }) {
  return <section className="content-section" aria-labelledby="ship-title">
    <div className="section-intro"><div><p className="section-eyebrow">第四步／帶走決策 brief</p><h2 id="ship-title">帶走一份誠實的 brief</h2><p>可貼到 GitHub issue、PRD 或團隊討論；未涵蓋的部分也會一起出去。</p></div><span className="human-label"><FileText size={14} />可帶走的 Markdown</span></div>
    {!memo ? <div className="state-panel"><CircleAlert size={22} /><div><h3>尚未準備好匯出</h3><p>請先在核對採用至少一個有來源的判斷，再到安排草擬最小實驗。</p></div><button className="button button-secondary" type="button" onClick={onBack}>回到安排</button></div> : <div className="memo-preview"><div className="memo-toolbar"><div><span className="section-eyebrow">決策 brief／預覽</span><h3>可以分享，但不是完成保證</h3></div><span className="status-badge status-supported"><BadgeCheck size={14} />內容已準備</span></div><div className="memo-content"><MemoSection title="決定"><p>{memo.decision}</p></MemoSection><MemoSection title="來源摘要"><ul>{memo.evidenceSummary.map((item) => <li key={item}>{item}</li>)}</ul></MemoSection><MemoSection title="已知限制"><ul>{(memo.knownLimits.length ? memo.knownLimits : ["目前沒有額外標記的限制。"]).map((item) => <li key={item}>{item}</li>)}</ul></MemoSection><MemoSection title="最小實驗"><dl className="memo-definition-list"><dt>假設</dt><dd>{memo.experiment.hypothesis}</dd><dt>主要指標</dt><dd>{memo.experiment.primaryMetric}</dd><dt>護欄指標</dt><dd>{memo.experiment.guardrail}</dd><dt>最小測試</dt><dd>{memo.experiment.smallestTest}</dd><dt>判定規則</dt><dd>{memo.experiment.decisionRule}</dd></dl></MemoSection><MemoSection title="未涵蓋"><ul className="not-covered-list">{memo.notCovered.map((item) => <li key={item}>{item}</li>)}</ul></MemoSection></div><div className="export-actions"><button className="button button-secondary" type="button" onClick={onCopy}><FileText size={16} />複製 Markdown</button><button className="button button-primary" type="button" onClick={onDownload}><Download size={16} />下載 .md</button></div><label className="markdown-fallback"><span>內容備援 · 下載被阻擋時仍可選取</span><textarea value={markdown} readOnly rows={7} aria-label="Decision brief Markdown 內容" /></label><button className="text-button" type="button" onClick={onExport}><RotateCcw size={14} />重新整理 brief</button></div>}
  </section>;
}

function MemoSection({ title, children }: { title: string; children: React.ReactNode }) { return <section className="memo-section"><h4>{title}</h4>{children}</section>; }

function DecisionContext({ pack, evidenceCount, reviewedCount, supportedCount, currentStep, nextAction, events, onCopyReceipt, feedbackUrl }: { pack: EvidencePack | null; evidenceCount: number; reviewedCount: number; supportedCount: number; currentStep: WorkflowStep; nextAction: { label: string; action: () => void }; events: ProductEvent[]; onCopyReceipt: () => void; feedbackUrl: string }) {
  return <aside className="decision-context" aria-label="這次工作"><div className="context-heading"><div><p className="section-eyebrow">工作頁</p><h2>這次怎麼走</h2></div><span className="context-boundary">資料不上傳</span></div><div className="context-project"><span className="card-eyebrow">這頁正在處理</span><strong>{pack?.title ?? "還沒有訊號"}</strong><span>{pack ? "資料只留在這個瀏覽器工作階段" : "先放一組可回看的訊號"}</span></div><div className="context-list"><ContextItem Icon={Target} label="要回答" value={pack ? "找出一個可驗證的 PM 下一步" : "哪一句訊號值得再查"} /><ContextItem Icon={ListChecks} label="要帶走" value={pack ? "一份能回到來源的 brief" : "一個最小驗證"} /><ContextItem Icon={ShieldCheck} label="現在知道" value={pack ? "來源可回看，不代表模型品質" : "來源會跟著判斷"} /></div>{pack && <div className="context-counts"><span><strong>{evidenceCount}</strong><small>訊號</small></span><span><strong>{reviewedCount}</strong><small>已判斷</small></span><span><strong>{supportedCount}</strong><small>可採用</small></span></div>}<div className="context-next"><span className="card-eyebrow">下一個動作</span><div className="next-action-title"><strong>{nextAction.label}</strong></div><p>{contextNextCopy(currentStep, pack)}</p>{pack ? <button className="button button-primary button-full" type="button" onClick={nextAction.action}>{nextAction.label}<ArrowRight size={16} /></button> : <span className="context-next-static">先從中央的試用任務開始。</span>}</div><div className="context-trace"><div className="trace-header"><span className="card-eyebrow">這次試用</span><span>{events.length} 筆操作</span></div>{events.length === 0 ? <p>操作紀錄只留在這次試用，不含原始訊號內容。</p> : <><p>最近一次：{EVENT_LABELS[events[events.length - 1].name]}</p><div className="context-trace-actions"><button className="text-button" type="button" onClick={onCopyReceipt}>複製試用摘要</button><a className="text-button" href={feedbackUrl} target="_blank" rel="noreferrer">回報這次試用<ArrowRight size={13} /></a></div></>}</div></aside>;
}

function ContextItem({ Icon, label, value }: { Icon: typeof Target; label: string; value: string }) { return <div className="context-item"><Icon size={17} /><div><span>{label}</span><strong>{value}</strong></div></div>; }

function NoticeIcon({ tone }: { tone: NoticeTone }) { if (tone === "success") return <CheckCircle2 size={16} />; if (tone === "warning") return <CircleAlert size={16} />; if (tone === "error") return <CircleAlert size={16} />; return <Info size={16} />; }

function formatDate(value: string) { return new Intl.DateTimeFormat("zh-TW", { month: "short", day: "numeric" }).format(new Date(value)); }

function contextNextCopy(step: WorkflowStep, pack: EvidencePack | null) {
  if (!pack) return "先載入資料，讓這裡出現一條可以回看的工作路徑。";
  if (step === "collect") return "訊號先進來，下一步才有東西可以被核對。";
  if (step === "verify") return "採用一個判斷，或保留為假設；兩者都比默認相信更好。";
  if (step === "decide") return "把要驗證的方向、指標、護欄和停損規則寫清楚。";
  return "把內容複製到你的工作流程；外部動作仍由你決定。";
}

export default App;
