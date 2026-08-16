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
  Menu,
  Pencil,
  Plus,
  RotateCcw,
  ShieldCheck,
  Target,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  buildSessionFeedbackReport,
  FEEDBACK_RESULT_LABELS,
  FEEDBACK_RESULTS,
  FEEDBACK_ROLE_LABELS,
  FEEDBACK_ROLES,
  type SessionFeedbackDraft,
} from "./domain/feedback";
import { buildDecisionMemo, toMarkdown } from "./domain/export";
import { cloneSamplePack, SAMPLE_PACK } from "./domain/fixture";
import { buildClaims, draftExperiment, getReviewedClaimForExperiment } from "./domain/synthesis";
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
  { id: "collect", number: "01", label: "Collect", description: "Write down the source line" },
  { id: "verify", number: "02", label: "Verify", description: "Challenge what the line supports" },
  { id: "decide", number: "03", label: "Decide", description: "Name the smallest test" },
  { id: "ship", number: "04", label: "Ship", description: "Carry the brief forward" },
];

const EVIDENCE_LABELS: Record<EvidenceType, string> = {
  interview: "Interview",
  support: "Support",
  analytics: "Product observation",
  competitor: "Competitive scan",
  market: "Market scan",
  evaluation: "Evaluation review",
  expert: "Expert",
};

const STATUS_META: Record<
  ClaimStatus,
  { label: string; className: string; Icon: typeof BadgeCheck }
> = {
  supported: { label: "Source-backed", className: "status-supported", Icon: BadgeCheck },
  review: { label: "Needs your review", className: "status-review", Icon: CircleAlert },
  missing: { label: "Missing evidence", className: "status-missing", Icon: CircleAlert },
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

const EMPTY_FEEDBACK: SessionFeedbackDraft = {
  role: "pm",
  environment: "",
  result: "completed",
  expectation: "",
  hesitation: "",
  trust: "",
  recovery: "",
  oneChange: "",
  privacyConfirmed: false,
};

const SESSION_FEEDBACK_URL = "https://github.com/asdc163/pm-signal-lab/issues/new?template=pm-session-feedback.md";
const SESSION_BOUNDARY_SHORT = "Stays in this tab; refresh clears the sheet";
const SESSION_BOUNDARY_LONG = "Your notes stay on this page; refresh clears the sheet. There is no login or external transfer.";

const EVENT_LABELS: Record<ProductEventName, string> = {
  sample_pack_loaded: "Opened sample worksheet",
  evidence_added: "Added an evidence row",
  claim_reviewed: "Reviewed a claim",
  experiment_drafted: "Drafted the smallest experiment",
  decision_exported: "Prepared a decision brief",
  feedback_drafted: "Drafted session feedback",
  feedback_copied: "Copied session feedback",
  recovery_used: "Used a recovery action",
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
  const [editingClaimId, setEditingClaimId] = useState<string>();
  const [editingClaimText, setEditingClaimText] = useState("");
  const [claimEditError, setClaimEditError] = useState("");
  const [expandedEvidenceId, setExpandedEvidenceId] = useState<string>();
  const [notice, setNotice] = useState<Notice>();
  const [events, setEvents] = useState<ProductEvent[]>([]);
  const [feedbackDraft, setFeedbackDraft] = useState<SessionFeedbackDraft>(EMPTY_FEEDBACK);
  const [feedbackMarkdown, setFeedbackMarkdown] = useState("");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const sourceRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const claimEditRef = useRef<HTMLTextAreaElement>(null);
  const previousPackRef = useRef(Boolean(pack));
  const previousStepRef = useRef(currentStep);

  const reviewedCount = claims.filter((claim) => claim.reviewed).length;
  const supportedCount = claims.filter(
    (claim) => claim.status === "supported" && claim.reviewed,
  ).length;

  const logEvent = (
    name: ProductEventName,
    properties: Record<string, string | number | boolean>,
  ) => {
    setEvents((previous) => [
      ...previous,
      { name, properties, at: new Date().toISOString() },
    ]);
  };

  const resetFeedbackState = () => {
    setFeedbackDraft(EMPTY_FEEDBACK);
    setFeedbackMarkdown("");
    setIsFeedbackOpen(false);
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

  useEffect(() => {
    if (editingClaimId) claimEditRef.current?.focus();
  }, [editingClaimId]);

  useEffect(() => {
    if (claimEditError) claimEditRef.current?.focus();
  }, [claimEditError]);

  useEffect(() => {
    if (feedbackMarkdown) {
      requestAnimationFrame(() => document.getElementById("feedback-output")?.focus());
    }
  }, [feedbackMarkdown]);

  useEffect(() => {
    const packBecameReady = Boolean(pack) && !previousPackRef.current;
    const stepChanged = previousStepRef.current !== currentStep;

    if (packBecameReady) {
      requestAnimationFrame(() => document.getElementById("main-content")?.focus({ preventScroll: true }));
    } else if (stepChanged && currentStep !== "collect") {
      requestAnimationFrame(() => {
        const isCompactViewport = window.matchMedia("(max-width: 700px)").matches;
        const preferredSelector = isCompactViewport
          ? ".mobile-action-bar [data-current-action]"
          : ".context-next [data-current-action]";
        const preferredAction = document.querySelector<HTMLButtonElement>(preferredSelector);
        const visibleAction = preferredAction && preferredAction.offsetParent !== null && !preferredAction.disabled
          ? preferredAction
          : Array.from(document.querySelectorAll<HTMLButtonElement>("[data-current-action]"))
            .find((button) => button.offsetParent !== null && !button.disabled);
        visibleAction?.focus();
      });
    }

    previousPackRef.current = Boolean(pack);
    previousStepRef.current = currentStep;
  }, [currentStep, pack]);

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
        resetFeedbackState();
        setEditingClaimId(undefined);
        setEditingClaimText("");
        setClaimEditError("");
        setCurrentStep("collect");
        setIsLoading(false);
        showNotice("success", "Sample worksheet is open. Next, trace each claim back to its source.");
        logEvent("sample_pack_loaded", { pack_id: nextPack.id, source: "fixture" });
      } catch {
        setIsLoading(false);
        showNotice("error", "The sample worksheet could not open. Your original workspace is still safe.");
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
    resetFeedbackState();
    setEditingClaimId(undefined);
    setEditingClaimText("");
    setClaimEditError("");
    setCurrentStep("collect");
    setIsFormOpen(false);
    setForm(EMPTY_FORM);
    setFormErrors({});
    showNotice("info", "Workspace reset. Open the sample worksheet or add your own signal.");
    logEvent("recovery_used", { state: "workspace", action: "reset_demo_data" });
  };

  const updateEvidence = (nextEvidence: Evidence[]) => {
    setEvidence(nextEvidence);
    setClaims(buildClaims(nextEvidence));
    setExperiment(undefined);
    setMemo(undefined);
    setMarkdown("");
    setFeedbackMarkdown("");
    setIsFeedbackOpen(false);
    setEditingClaimId(undefined);
    setEditingClaimText("");
    setClaimEditError("");
  };

  const submitEvidence = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: Partial<Record<keyof EvidenceFormState, string>> = {};
    if (!form.title.trim()) errors.title = "Add a signal title so someone else can understand the observation.";
    if (!form.source.trim()) errors.source = "Add a source so someone else can trace this observation.";
    if (!form.content.trim()) errors.content = "Add the signal itself; do not leave only a title.";
    if (form.content.length > 600) {
      errors.content = "This is over the v0 limit. Your text is preserved; shorten it before saving.";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      showNotice("warning", "Some fields need attention. Your text is still preserved.");
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
        title: "My PM signal workspace",
        description: SESSION_BOUNDARY_LONG,
        evidence: [],
      },
    );
    setForm(EMPTY_FORM);
    setFormErrors({});
    setIsFormOpen(false);
    showNotice("success", "Signal added. The draft claims were rebuilt; go to Verify to review them.");
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
    showNotice("success", "Claim accepted. Its source and limitation will stay in the decision brief.");
    logEvent("claim_reviewed", {
      claim_status: "supported",
      source_count: claim.evidenceIds.length,
      edited: claim.edited,
    });
  };

  const keepAsHypothesis = (claim: Claim) => {
    updateClaim(claim.id, { status: "review", reviewed: true });
    setActiveClaimId(claim.id);
    showNotice("warning", "Kept as a hypothesis. It will not be treated as a validated conclusion.");
    logEvent("claim_reviewed", {
      claim_status: "review",
      source_count: claim.evidenceIds.length,
      edited: claim.edited,
    });
  };

  const markMissing = (claim: Claim) => {
    updateClaim(claim.id, { status: "missing", reviewed: true });
    setActiveClaimId(claim.id);
    showNotice("warning", "Marked as missing evidence. The gap will stay visible in the next brief.");
    logEvent("claim_reviewed", {
      claim_status: "missing",
      source_count: claim.evidenceIds.length,
      edited: claim.edited,
    });
  };

  const activateClaim = (claimId: string) => {
    setActiveClaimId(claimId);
    if (editingClaimId && editingClaimId !== claimId) {
      setEditingClaimId(undefined);
      setEditingClaimText("");
      setClaimEditError("");
    }
  };

  const editClaim = (claim: Claim) => {
    setActiveClaimId(claim.id);
    setEditingClaimId(claim.id);
    setEditingClaimText(claim.text);
    setClaimEditError("");
    showNotice("info", "Claim editing is open. The source and limitation stay attached; you will review it again after saving.");
  };

  const cancelClaimEdit = () => {
    setEditingClaimId(undefined);
    setEditingClaimText("");
    setClaimEditError("");
  };

  const saveClaimEdit = (claim: Claim) => {
    if (!editingClaimText.trim()) {
      setClaimEditError("A claim cannot be blank. Keep one sentence that someone can trace back.");
      showNotice("warning", "A claim cannot be blank. The original text is still preserved.");
      return;
    }
    updateClaim(claim.id, { text: editingClaimText.trim(), status: "review", reviewed: true, edited: true });
    setEditingClaimId(undefined);
    setEditingClaimText("");
    setClaimEditError("");
    setActiveClaimId(claim.id);
    showNotice("success", "Claim edited and kept for review. Decide whether to accept it next.");
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
      showNotice("info", "Open the sample worksheet or add a signal before opening Verify.");
      setCurrentStep("collect");
      return;
    }
    if (nextStep === "decide" && claims.length === 0) {
      showNotice("info", "There are no claims to review yet. Go to Collect and add a signal.");
      setCurrentStep("collect");
      return;
    }
    if (nextStep === "decide" && !claims.some((claim) => claim.reviewed)) {
      showNotice("info", "Review one claim before opening Decide. Keep it supported, a hypothesis, or missing evidence.");
      setCurrentStep("verify");
      setActiveClaimId(claims[0]?.id);
      return;
    }
    if (nextStep === "ship" && !experiment) {
      showNotice("info", "Export is not ready yet. Draft the smallest experiment in Decide first.");
      setCurrentStep(experiment ? "ship" : "decide");
      return;
    }
    setCurrentStep(nextStep);
  };

  const startReview = () => {
    if (claims.length === 0) {
      showNotice("info", "There are no claims to review yet. Go to Collect and add a signal.");
      return;
    }
    setCurrentStep("verify");
    setActiveClaimId(claims[0].id);
  };

  const startExperiment = (claimId?: string) => {
    const gate = getReviewedClaimForExperiment(claims, claimId ?? activeClaimId);
    if (!gate.ok) {
      showNotice("warning", gate.message);
      setCurrentStep(claims.length > 0 ? "verify" : "collect");
      setActiveClaimId(claims[0]?.id);
      return;
    }
    const selectedId = gate.claimId;
    const nextExperiment = draftExperiment(claims, selectedId);
    setActiveClaimId(selectedId);
    setExperiment(nextExperiment);
    setMemo(undefined);
    setMarkdown("");
    setCurrentStep("decide");
    showNotice(
      nextExperiment.readiness === "ready" ? "success" : "warning",
      nextExperiment.readiness === "ready"
        ? "Smallest experiment brief drafted. Confirm the test details and decision rule."
        : "This brief is not a conclusion yet. Fill the evidence gaps listed here.",
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
    setFeedbackMarkdown("");
    setIsFeedbackOpen(false);
    setCurrentStep("ship");
    showNotice("success", "Decision brief is ready. You can copy or download the Markdown.");
    logEvent("decision_exported", { format: "markdown", copy_or_download: "prepared", complete: true });
  };

  const copyMarkdown = async () => {
    if (!markdown) {
      exportMemo();
      return;
    }
    try {
      await navigator.clipboard.writeText(markdown);
      showNotice("success", "Markdown copied. You can paste it into a GitHub issue or PRD.");
      logEvent("decision_exported", { format: "markdown", copy_or_download: "copy", complete: true });
    } catch {
      showNotice("warning", "Clipboard access was blocked. The content is still here; copy it from the text area.");
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
      showNotice("success", "Session receipt copied. Check it for private content before sharing.");
    } catch {
      showNotice("warning", "Clipboard access was blocked. Use the feedback form to record this session manually.");
    }
  };

  const updateFeedback = (field: keyof SessionFeedbackDraft, value: string | boolean) => {
    setFeedbackDraft((previous) => ({ ...previous, [field]: value } as SessionFeedbackDraft));
    setFeedbackMarkdown("");
  };

  const prepareFeedback = () => {
    const result = buildSessionFeedbackReport(feedbackDraft);
    if (!result.ok) {
      showNotice("warning", result.error);
      return;
    }
    setFeedbackMarkdown(result.markdown);
    showNotice("success", "Session feedback is ready. Read it yourself before opening GitHub.");
    logEvent("feedback_drafted", {
      role: feedbackDraft.role,
      task_result: feedbackDraft.result,
      privacy_confirmed: true,
    });
  };

  const copyFeedback = async () => {
    if (!feedbackMarkdown) {
      prepareFeedback();
      return;
    }
    try {
      await navigator.clipboard.writeText(feedbackMarkdown);
      showNotice("success", "Session feedback copied. Check it again for private content before sharing.");
      logEvent("feedback_copied", { format: "markdown", manual_submit_required: true });
    } catch {
      showNotice("warning", "Clipboard access was blocked. The feedback remains in the text area below.");
      logEvent("recovery_used", { state: "feedback_clipboard_blocked", action: "use_feedback_textarea" });
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
      showNotice("success", "Markdown downloaded. The content is still available on this page.");
      logEvent("decision_exported", { format: "markdown", copy_or_download: "download", complete: true });
    } catch {
      showNotice("warning", "Download did not complete. The content is still here; copy the text to continue.");
      logEvent("recovery_used", { state: "download_blocked", action: "use_textarea" });
    }
  };

  const nextAction = (() => {
    if (!pack) return { label: "Open the sample worksheet", action: loadSample };
    if (currentStep === "collect") {
      return claims.length > 0
        ? { label: "Start review", action: startReview }
        : { label: "Add a signal", action: () => setIsFormOpen(true) };
    }
    if (currentStep === "verify") return { label: "Draft smallest experiment", action: () => startExperiment() };
    if (currentStep === "decide") return { label: "Export decision brief", action: exportMemo };
    return { label: "Copy Markdown", action: copyMarkdown };
  })();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Sidebar currentStep={currentStep} onSelectStep={selectStep} />
      <div className="app-body">
        <header className="topbar">
          <div className="topbar-mobile-brand">
            <span className="brand-mark" aria-hidden="true">01</span>
            <span>PM Signal Lab</span>
          </div>
          <div className="topbar-context">
            <span className="topbar-kicker">Working sheet</span>
            <span className="topbar-divider" aria-hidden="true" />
            <span>{pack?.title ?? "Blank sheet"}</span>
          </div>
          <button className="icon-button topbar-menu" type="button" aria-label="Jump to workflow" aria-controls="mobile-workflow" title="Jump to workflow" onClick={() => document.getElementById("mobile-workflow")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" })}>
            <Menu size={18} aria-hidden="true" />
          </button>
        </header>

        <div id="mobile-workflow" className="mobile-stepper" role="navigation" aria-label="Workflow">
          <WorkflowStepper currentStep={currentStep} onSelectStep={selectStep} mobile />
        </div>

        <main id="main-content" className="workspace" tabIndex={-1} aria-label="PM Signal Lab worksheet" aria-busy={isLoading}>
          <section className={`workbench${pack ? " is-loaded" : ""}`} aria-labelledby="page-title">
            <div className="desktop-stepper-wrap">
              <WorkflowStepper currentStep={currentStep} onSelectStep={selectStep} />
            </div>

            <div className="hero-block">
              <div>
                <div className="hero-folio" aria-label={pack ? "Current work, collect step" : "New worksheet, collect step"}>
                  <span className="hero-folio-index">{pack ? "01" : "—"}</span>
                  <span className="eyebrow">{pack ? "Current work" : "New worksheet"}</span>
                </div>
                <h1 id="page-title">{pack ? "Support draft review" : "Start with a source line"}</h1>
                <p className="hero-copy">
                  {pack ? "Four source lines. One decision to test next." : "A source-first working paper for moving from a product observation to a defensible test."}
                </p>
              </div>
              <div className="hero-status" role="status" aria-label="Review state" aria-live="polite" aria-atomic="true">
                <div className="hero-status-heading">
                  <span className="section-eyebrow">Review state</span>
                  <span className="hero-status-step">{WORKFLOW.find((item) => item.id === currentStep)?.number} · {WORKFLOW.find((item) => item.id === currentStep)?.label}</span>
                </div>
                <strong>{pack ? `${evidence.length} ${evidence.length === 1 ? "source line" : "source lines"}` : "No source line yet"}</strong>
                <p>{pack ? `${reviewedCount} of ${claims.length} claims reviewed · ${supportedCount} accepted.` : "Start with the sample or write down one real line from the work."}</p>
                <span className="hero-status-boundary"><ShieldCheck size={14} aria-hidden="true" />{pack ? "On this page · refresh clears the sheet" : SESSION_BOUNDARY_SHORT}</span>
                {!pack && <div className="hero-status-actions"><button className="button button-primary" type="button" onClick={loadSample}><ClipboardList size={16} aria-hidden="true" />Open the sample worksheet<ArrowRight size={15} aria-hidden="true" /></button></div>}
              </div>
            </div>

            {notice && (
              <div className={`notice notice-${notice.tone}`} role={notice.tone === "error" ? "alert" : "status"} aria-atomic="true">
                <NoticeIcon tone={notice.tone} />
                <span>{notice.message}</span>
                <button className="notice-close" type="button" onClick={() => setNotice(undefined)} aria-label="Dismiss notice">
                  <X size={15} aria-hidden="true" />
                </button>
              </div>
            )}

            {currentStep === "collect" && (
              <CollectView
                pack={pack}
                evidence={evidence}
                isLoading={isLoading}
                isFormOpen={isFormOpen}
                claimCount={claims.length}
                form={form}
                formErrors={formErrors}
                titleRef={titleRef}
                sourceRef={sourceRef}
                contentRef={contentRef}
                expandedEvidenceId={expandedEvidenceId}
                onReset={resetDemo}
                onOpenForm={() => setIsFormOpen(true)}
                onCloseForm={() => { setIsFormOpen(false); setFormErrors({}); }}
                onChangeForm={(field, value) => setForm((previous) => ({ ...previous, [field]: value }))}
                onSubmitForm={submitEvidence}
                onToggleEvidence={(id) => setExpandedEvidenceId((previous) => previous === id ? undefined : id)}
                onStartReview={startReview}
              />
            )}

            {currentStep === "verify" && (
              <VerifyView
                claims={claims}
                evidence={evidence}
                activeClaimId={activeClaimId}
                editingClaimId={editingClaimId}
                editingClaimText={editingClaimText}
                claimEditError={claimEditError}
                claimEditRef={claimEditRef}
                onActivate={activateClaim}
                onAccept={acceptClaim}
                onKeep={keepAsHypothesis}
                onMissing={markMissing}
                onEdit={editClaim}
                onEditText={(value) => { setEditingClaimText(value); setClaimEditError(""); }}
                onSaveEdit={saveClaimEdit}
                onCancelEdit={cancelClaimEdit}
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
                onBack={() => setCurrentStep("collect")}
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
                feedbackDraft={feedbackDraft}
                feedbackMarkdown={feedbackMarkdown}
                isFeedbackOpen={isFeedbackOpen}
                onOpenFeedback={() => setIsFeedbackOpen(true)}
                onCloseFeedback={() => setIsFeedbackOpen(false)}
                onChangeFeedback={updateFeedback}
                onPrepareFeedback={prepareFeedback}
                onCopyFeedback={copyFeedback}
                feedbackUrl={SESSION_FEEDBACK_URL}
              />
            )}

            <div className="boundary-note">
              <ShieldCheck size={16} aria-hidden="true" />
              <span><strong>Handling note</strong> · {SESSION_BOUNDARY_LONG} The source, claim, and next action stay visible. You decide whether to accept the claim.</span>
            </div>
          </section>

          <DecisionContext
            pack={pack}
            evidenceCount={evidence.length}
            claimCount={claims.length}
            reviewedCount={reviewedCount}
            supportedCount={supportedCount}
            currentStep={currentStep}
            nextAction={nextAction}
            events={events}
            onCopyReceipt={copySessionReceipt}
            feedbackUrl={SESSION_FEEDBACK_URL}
          />
        </main>

        {!isFeedbackOpen && (
          <div className={`mobile-action-bar ${!pack ? "is-empty" : ""}`} role="region" aria-label="Next action">
            <span>{WORKFLOW.find((item) => item.id === currentStep)?.description}</span>
            <button className="button button-primary" type="button" onClick={nextAction.action} disabled={isLoading} data-current-action>
              {nextAction.label}<ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Sidebar({ currentStep, onSelectStep }: { currentStep: WorkflowStep; onSelectStep: (step: WorkflowStep) => void }) {
  return (
    <aside className="sidebar" aria-label="PM Signal Lab workflow navigation">
      <div className="sidebar-brand">
        <span className="brand-mark" aria-hidden="true">01</span>
        <div>
          <strong>PM Signal Lab</strong>
          <span>Evidence workpaper</span>
        </div>
      </div>
      <div className="sidebar-rule" />
      <nav className="workflow-nav" aria-label="Workflow">
        <span className="sidebar-section-label">Workflow</span>
        <WorkflowStepper currentStep={currentStep} onSelectStep={onSelectStep} />
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-rule" />
        <span className="sidebar-section-label">Handling</span>
        <p>{SESSION_BOUNDARY_LONG} No automatic changes are made.</p>
        <a className="sidebar-link" href={SESSION_FEEDBACK_URL} target="_blank" rel="noreferrer">Report a session</a>
        <span className="version-label">Public preview · refresh clears the sheet</span>
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
              <span className="step-number">{isPast ? <Check size={14} aria-hidden="true" /> : item.number}</span>
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
  claimCount, onReset, onOpenForm, onCloseForm, onChangeForm, onSubmitForm, onToggleEvidence, onStartReview,
}: {
  pack: EvidencePack | null;
  evidence: Evidence[];
  isLoading: boolean;
  isFormOpen: boolean;
  claimCount: number;
  form: EvidenceFormState;
  formErrors: Partial<Record<keyof EvidenceFormState, string>>;
  titleRef: React.RefObject<HTMLInputElement | null>;
  sourceRef: React.RefObject<HTMLInputElement | null>;
  contentRef: React.RefObject<HTMLTextAreaElement | null>;
  expandedEvidenceId?: string;
  onReset: () => void;
  onOpenForm: () => void;
  onCloseForm: () => void;
  onChangeForm: (field: keyof EvidenceFormState, value: string) => void;
  onSubmitForm: (event: FormEvent<HTMLFormElement>) => void;
  onToggleEvidence: (id: string) => void;
  onStartReview: () => void;
}) {
  if (isLoading) {
    return <section className="state-panel loading-state" aria-live="polite" aria-busy="true"><Activity size={22} className="spin" aria-hidden="true" /><div><h2>Opening the sample worksheet</h2><p>The local boundary stays in place; you can trace each source after it opens.</p></div></section>;
  }

  return (
    <section className="content-section" aria-labelledby="collect-title">
      {!pack && (
          <div className="empty-panel">
            <div className="empty-index" aria-hidden="true">01</div>
            <div className="empty-copy">
              <p className="section-eyebrow">Blank sheet</p>
              <h2 id="collect-title">Write down one line from the work</h2>
              <p>Keep the words someone actually used. The source stays attached while you decide what the line can support.</p>
              <blockquote className="sample-quote">
                <span>Sample note · {EVIDENCE_LABELS[SAMPLE_PREVIEW.type]} · {SAMPLE_PREVIEW.source}</span>
                <p>“{SAMPLE_PREVIEW.content}”</p>
                <small>Local fixture only · no external research is attached.</small>
              </blockquote>
              <div className="first-run-note">
                <span>Start with one line</span>
                <strong>Write down one line you can defend.</strong>
                <div className="first-run-sequence" aria-label="The path this worksheet keeps"><b>Source line</b><span>→</span><b>Claim</b><span>→</span><b>Smallest test</b></div>
                <small>Every step stays editable, reviewable, and local.</small>
              </div>
              <div className="empty-actions">
                <button className="button button-secondary" type="button" onClick={onOpenForm}><Plus size={16} aria-hidden="true" />Add your own signal</button>
              </div>
            </div>
          </div>
      )}

      {pack && (
        <>
          <div className="pack-header">
            <div>
            <p className="section-eyebrow">Source lines</p>
              <h2 id="collect-title">{pack.title}</h2>
              <div className="pack-subject" aria-label="Review subject: support draft, fictional worksheet">
                <span className="pack-subject-label">Review subject</span>
                <span>support draft</span>
                <span className="pack-subject-note">fictional worksheet</span>
              </div>
              <p className="pack-description">{pack.description}</p>
            </div>
            <div className="pack-actions">
              <span className="count-badge"><strong>{evidence.length}</strong> source lines</span>
              <button className="button button-secondary" type="button" onClick={onOpenForm} aria-label="Add a source signal" title="Add a source signal"><Plus size={16} aria-hidden="true" /><span className="button-label">Add signal</span></button>
            </div>
          </div>
          <div className="section-heading-row source-ledger-heading">
            <div>
              <h3>The source comes first</h3>
              <p>Each row keeps the original line, source, date, and limit together.</p>
            </div>
            <span className="micro-status"><strong>01–{formatFolioNumber(evidence.length)}</strong> source rows</span>
          </div>
          <div className="evidence-list">
            {evidence.map((item) => (
              <EvidenceRow key={item.id} evidence={item} sourceIndex={evidence.findIndex((candidate) => candidate.id === item.id) + 1} expanded={expandedEvidenceId === item.id} onToggle={() => onToggleEvidence(item.id)} />
            ))}
          </div>
          <div className="next-action-card">
            <div className="next-action-icon"><ArrowRight size={18} aria-hidden="true" /></div>
            <div className="next-action-copy"><span className="card-eyebrow">Next step</span><h3>{claimCount === 1 ? "One claim is waiting for a human source check." : claimCount > 1 ? `${claimCount} claims are waiting for a human source check.` : "No claim is ready for review yet."}</h3><p>Accept, edit, or keep the claim open. Gaps stay visible.</p>{claimCount > 0 ? <button className="button button-primary" type="button" onClick={onStartReview} data-current-action>Start review<ArrowRight size={16} aria-hidden="true" /></button> : <button className="button button-secondary" type="button" onClick={onOpenForm}>Add a signal<Plus size={16} aria-hidden="true" /></button>}</div>
          </div>
          <button className="text-button reset-button" type="button" onClick={onReset}><RotateCcw size={14} aria-hidden="true" />Reset this set</button>
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
      <div className="form-header"><div><p className="section-eyebrow">Add a source line</p><h3>Write down one real observation</h3><p>This public preview handles content on this page only; it does not upload your text.</p></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close add source line form"><X size={18} aria-hidden="true" /></button></div>
      <div className="form-grid">
        <Field label="Signal title" error={errors.title} htmlFor="evidence-title"><input ref={titleRef} id="evidence-title" value={form.title} onChange={(event) => onChange("title", event.target.value)} aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "evidence-title-error" : undefined} placeholder="e.g. Interview: users cannot find the next step" /></Field>
        <Field label="Source" error={errors.source} htmlFor="evidence-source"><input ref={sourceRef} id="evidence-source" value={form.source} onChange={(event) => onChange("source", event.target.value)} aria-invalid={Boolean(errors.source)} aria-describedby={errors.source ? "evidence-source-error" : undefined} placeholder="e.g. Interview notes · PM-08" /></Field>
        <Field label="Type" htmlFor="evidence-type"><select id="evidence-type" value={form.type} onChange={(event) => onChange("type", event.target.value)}>{EVIDENCE_TYPES.map((type) => <option key={type} value={type}>{EVIDENCE_LABELS[type]}</option>)}</select></Field>
        <Field label="Source line" error={errors.content} htmlFor="evidence-content" className="field-wide" helper={`${form.content.length} / 600 characters`}><textarea ref={contentRef} id="evidence-content" rows={4} value={form.content} onChange={(event) => onChange("content", event.target.value)} aria-invalid={Boolean(errors.content)} aria-describedby={errors.content ? "evidence-content-error" : "evidence-content-help"} placeholder="Keep the words someone else can trace; do not write only a conclusion." /></Field>
      </div>
      <div className="form-footer"><span><Info size={14} aria-hidden="true" />The source, limit, and owner stay with the claim review.</span><div><button className="button button-secondary" type="button" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit"><Plus size={16} aria-hidden="true" />Save line</button></div></div>
    </form>
  );
}

function Field({ label, error, htmlFor, children, helper, className = "" }: { label: string; error?: string; htmlFor: string; children: React.ReactNode; helper?: string; className?: string }) {
  return <div className={`field ${className}`}><div className="field-label-row"><label htmlFor={htmlFor}>{label}</label>{helper && <span id={`${htmlFor}-help`}>{helper}</span>}</div>{children}{error && <span className="field-error" id={`${htmlFor}-error`} role="alert">{error}</span>}</div>;
}

function EvidenceRow({ evidence, sourceIndex, expanded, onToggle }: { evidence: Evidence; sourceIndex: number; expanded: boolean; onToggle: () => void }) {
  return (
    <article className={`evidence-row ${expanded ? "is-expanded" : ""}`}>
      <div className="evidence-spine" aria-hidden="true"><span className="evidence-index"><small>Source</small><strong>{formatFolioNumber(sourceIndex)}</strong></span><span className="evidence-node" /></div>
      <div className="evidence-main">
        <div className="evidence-row-top"><span className="evidence-type">{EVIDENCE_LABELS[evidence.type]}</span>{evidence.added && <span className="just-added">Just added</span>}<time dateTime={evidence.observedAt}>{formatDate(evidence.observedAt)}</time></div>
        <h4>{evidence.title}</h4>
        <p className="evidence-source"><Link2 size={14} aria-hidden="true" />{evidence.source}</p>
        <p className="evidence-preview"><span className="preview-label">Source line</span>{evidence.content}</p>
        {expanded && <div id={`source-${evidence.id}`} className="source-detail" role="region" aria-label={`Source excerpt: ${evidence.title}`}><span className="detail-label">Source excerpt</span><p>{evidence.content}</p><span className="detail-meta">Original content stays in this session · Source {formatFolioNumber(sourceIndex)}</span></div>}
      </div>
      <button className="row-toggle" type="button" onClick={onToggle} aria-expanded={expanded} aria-controls={expanded ? `source-${evidence.id}` : undefined}>{expanded ? "Hide source" : "View source"}<ChevronDown size={15} aria-hidden="true" className={expanded ? "rotate-180" : ""} /></button>
    </article>
  );
}

function VerifyView({ claims, evidence, activeClaimId, editingClaimId, editingClaimText, claimEditError, claimEditRef, onActivate, onAccept, onKeep, onMissing, onEdit, onEditText, onSaveEdit, onCancelEdit, onDraft }: { claims: Claim[]; evidence: Evidence[]; activeClaimId?: string; editingClaimId?: string; editingClaimText: string; claimEditError: string; claimEditRef: React.RefObject<HTMLTextAreaElement | null>; onActivate: (id: string) => void; onAccept: (claim: Claim) => void; onKeep: (claim: Claim) => void; onMissing: (claim: Claim) => void; onEdit: (claim: Claim) => void; onEditText: (value: string) => void; onSaveEdit: (claim: Claim) => void; onCancelEdit: () => void; onDraft: () => void }) {
  return (
    <section className="content-section" aria-labelledby="verify-title">
      <div className="section-intro"><div><p className="section-eyebrow">Review claim</p><h2 id="verify-title">Check the claim against the line</h2><p>A draft claim is not a fact. Check the source, date, and limitation before you carry it into a decision.</p></div><span className="human-label">You make the call</span></div>
      {claims.length === 0 ? <div className="state-panel"><CircleAlert size={22} aria-hidden="true" /><div><h3>Nothing to review yet</h3><p>Return to Collect and add a signal before reviewing claims.</p></div></div> : <>
        <div className="claim-summary"><span><strong>{claims.length}</strong> draft claims</span><span><BadgeCheck size={14} aria-hidden="true" />{claims.filter((claim) => claim.status === "supported").length} source-backed</span><span><CircleAlert size={14} aria-hidden="true" />{claims.filter((claim) => claim.status !== "supported").length} need your review</span></div>
        <div className="claim-list">
          {claims.map((claim, index) => <ClaimRow key={claim.id} claim={claim} claimIndex={index + 1} evidence={evidence} expanded={activeClaimId === claim.id} isEditing={editingClaimId === claim.id} editText={editingClaimText} editError={claimEditError} editRef={claimEditRef} onActivate={() => onActivate(claim.id)} onAccept={() => onAccept(claim)} onKeep={() => onKeep(claim)} onMissing={() => onMissing(claim)} onEdit={() => onEdit(claim)} onEditText={onEditText} onSaveEdit={() => onSaveEdit(claim)} onCancelEdit={onCancelEdit} />)}
        </div>
        <div className="human-boundary"><ShieldCheck size={17} aria-hidden="true" /><div><strong>This is a suggestion, not a decision.</strong><span>The next brief records a claim only after you accept it or keep it as a hypothesis.</span></div><button className="button button-secondary" type="button" onClick={onDraft}>Go to Decide<ArrowRight size={15} aria-hidden="true" /></button></div>
      </>}
    </section>
  );
}

function ClaimRow({ claim, claimIndex, evidence, expanded, isEditing, editText, editError, editRef, onActivate, onAccept, onKeep, onMissing, onEdit, onEditText, onSaveEdit, onCancelEdit }: { claim: Claim; claimIndex: number; evidence: Evidence[]; expanded: boolean; isEditing: boolean; editText: string; editError: string; editRef: React.RefObject<HTMLTextAreaElement | null>; onActivate: () => void; onAccept: () => void; onKeep: () => void; onMissing: () => void; onEdit: () => void; onEditText: (value: string) => void; onSaveEdit: () => void; onCancelEdit: () => void }) {
  const meta = STATUS_META[claim.status];
  const StatusIcon = meta.Icon;
  const sourceItems = evidence.filter((item) => claim.evidenceIds.includes(item.id));
  return (
    <article className={`claim-row ${expanded ? "is-expanded" : ""} ${claim.reviewed ? "is-reviewed" : ""}`}>
      <div className="claim-spine" aria-hidden="true"><span className={`claim-node ${meta.className}`} /></div>
      <div className="claim-body">
        <div className="claim-topline"><span className={`status-badge ${meta.className}`}><StatusIcon size={14} aria-hidden="true" />{meta.label}</span>{claim.reviewed && <span className="reviewed-label"><Check size={12} aria-hidden="true" />Reviewed</span>}<span className="claim-id"><small>Claim</small> {formatFolioNumber(claimIndex)}</span></div>
        <button id={`claim-title-${claim.id}`} className="claim-title-button" type="button" onClick={onActivate} aria-expanded={expanded} aria-controls={expanded ? `claim-${claim.id}-detail` : undefined}><span>{claim.text}</span><ChevronRight size={17} aria-hidden="true" className={expanded ? "rotate-90" : ""} /></button>
        <div className="claim-meta"><span><Link2 size={13} aria-hidden="true" />{sourceItems.length ? `${sourceItems.length} sources` : "No source"}</span><span><Info size={13} aria-hidden="true" />{claim.limitation}</span></div>
        {expanded && <div id={`claim-${claim.id}-detail`} className="claim-detail" role="region" aria-labelledby={`claim-title-${claim.id}`}>
          <div className="detail-block"><span className="detail-label">Source mapping</span>{sourceItems.length ? sourceItems.map((item) => { const sourceIndex = evidence.findIndex((candidate) => candidate.id === item.id) + 1; return <div className="mapped-source" key={item.id}><span className="mapped-source-index">Source {formatFolioNumber(sourceIndex)}</span><div><strong>{item.source}</strong><span>{EVIDENCE_LABELS[item.type]} · {formatDate(item.observedAt)}</span><p>{item.content}</p></div></div>; }) : <p className="missing-copy">This claim has no traceable source; keep it as a hypothesis until a line is added.</p>}</div>
          <div className="detail-block limitation-block"><span className="detail-label">Current limitation</span><p>{claim.limitation}</p></div>
          {isEditing ? (
            <form className="claim-edit-form" onSubmit={(event) => { event.preventDefault(); onSaveEdit(); }}>
              <label className="claim-edit-field" htmlFor={`claim-edit-${claim.id}`}>
                <span>Edit claim text</span>
                <textarea ref={editRef} id={`claim-edit-${claim.id}`} value={editText} onChange={(event) => onEditText(event.target.value)} aria-invalid={Boolean(editError)} aria-describedby={editError ? `claim-edit-${claim.id}-error` : `claim-edit-${claim.id}-help`} rows={3} />
              </label>
              <p className="claim-edit-help" id={`claim-edit-${claim.id}-help`}>The source and limitation stay attached; review this claim again after saving.</p>
              {editError && <p className="claim-edit-error" id={`claim-edit-${claim.id}-error`} role="alert">{editError}</p>}
              <div className="claim-edit-actions"><button className="button button-secondary" type="button" onClick={onCancelEdit}>Cancel</button><button className="button button-primary" type="submit"><Check size={15} aria-hidden="true" />Save claim</button></div>
            </form>
          ) : (
            <div className="claim-actions"><button className="button button-primary" type="button" onClick={onAccept}><Check size={15} aria-hidden="true" />Accept claim</button><button className="button button-secondary" type="button" onClick={onKeep}><Flag size={15} aria-hidden="true" />Keep as hypothesis</button><button className="button button-quiet" type="button" onClick={onEdit}><Pencil size={14} aria-hidden="true" />Edit claim</button>{claim.status !== "missing" && <button className="button button-quiet danger-text" type="button" onClick={onMissing}><CircleAlert size={14} aria-hidden="true" />Mark missing evidence</button>}</div>
          )}
        </div>}
      </div>
    </article>
  );
}

function DecideView({ claims, activeClaimId, experiment, onSelectClaim, onDraft, onUpdate, onExport, onBack }: { claims: Claim[]; activeClaimId?: string; experiment?: ExperimentBrief; onSelectClaim: (id: string) => void; onDraft: (id?: string) => void; onUpdate: (field: keyof ExperimentBrief, value: string) => void; onExport: () => void; onBack: () => void }) {
  const availableClaims = claims.filter((claim) => claim.reviewed);
  return (
    <section className="content-section" aria-labelledby="decide-title">
      <div className="section-intro"><div><p className="section-eyebrow">Test brief</p><h2 id="decide-title">Name the smallest test</h2><p>Write the metric, guardrail, and stop rule before the team spends time.</p></div><span className="human-label"><Target size={14} aria-hidden="true" />You still own the stop rule</span></div>
      {claims.length === 0 ? <div className="state-panel"><CircleAlert size={22} aria-hidden="true" /><div><h3>No usable claims yet</h3><p>Open the sample worksheet or add a signal in Collect, then review a claim before drafting a brief.</p></div><button className="button button-secondary" type="button" onClick={onBack}>Back to Collect</button></div> : <>
        <div className="opportunity-picker"><div><span className="card-eyebrow">Choose a direction to test</span><p>{availableClaims.length ? "Choose a claim you reviewed; missing-evidence items can still become a needs-validation brief." : "No claims have been reviewed yet. Return to Verify to accept one or keep a hypothesis."}</p></div><div className="opportunity-options">{claims.map((claim) => <button key={claim.id} type="button" className={`opportunity-option ${activeClaimId === claim.id ? "is-selected" : ""}`} onClick={() => onSelectClaim(claim.id)}><span className={`mini-node ${STATUS_META[claim.status].className}`} /><span>{claim.text}</span><span className="option-status">{STATUS_META[claim.status].label}</span></button>)}</div><button className="button button-secondary" type="button" onClick={() => onDraft(activeClaimId)} disabled={!activeClaimId && !availableClaims.length}><Target size={15} aria-hidden="true" />Draft smallest experiment</button></div>
        {experiment ? <ExperimentEditor experiment={experiment} onUpdate={onUpdate} onExport={onExport} /> : <div className="state-panel state-panel-soft"><Lightbulb size={22} aria-hidden="true" /><div><h3>Choose a direction to test</h3><p>This will become a hypothesis, primary metric, guardrail, and smallest test. You still decide whether it is worth doing.</p></div></div>}
      </>}
    </section>
  );
}

function ExperimentEditor({ experiment, onUpdate, onExport }: { experiment: ExperimentBrief; onUpdate: (field: keyof ExperimentBrief, value: string) => void; onExport: () => void }) {
  return <div className="experiment-editor">
    <div className={`readiness-banner ${experiment.readiness === "ready" ? "is-ready" : "is-needs-validation"}`}><span className="readiness-icon">{experiment.readiness === "ready" ? <BadgeCheck size={17} aria-hidden="true" /> : <CircleAlert size={17} aria-hidden="true" />}</span><div><strong>{experiment.readiness === "ready" ? "Ready for confirmation" : "Needs validation"}</strong><p>{experiment.readiness === "ready" ? "This direction has a source-backed claim you accepted; confirm the experiment details." : "This brief is not a conclusion yet. Fill the evidence gaps listed here."}</p></div></div>
    <div className="brief-heading"><div><span className="section-eyebrow">Draft / edit as needed</span><h3>Smallest experiment brief</h3></div><span className="human-label">Start small, then decide whether to run it</span></div>
    <div className="brief-fields"><BriefField label="Direction to test" value={experiment.opportunity} onChange={(value) => onUpdate("opportunity", value)} wide /><BriefField label="Hypothesis" value={experiment.hypothesis} onChange={(value) => onUpdate("hypothesis", value)} wide /><BriefField label="Primary metric" value={experiment.primaryMetric} onChange={(value) => onUpdate("primaryMetric", value)} /><BriefField label="Guardrail" value={experiment.guardrail} onChange={(value) => onUpdate("guardrail", value)} /><BriefField label="Smallest test" value={experiment.smallestTest} onChange={(value) => onUpdate("smallestTest", value)} wide textarea /><BriefField label="Decision rule" value={experiment.decisionRule} onChange={(value) => onUpdate("decisionRule", value)} wide textarea /><BriefField label="Owner" value={experiment.owner} onChange={(value) => onUpdate("owner", value)} /></div>
    <div className="brief-footer"><span><ShieldCheck size={14} aria-hidden="true" />You can edit everything before export; this does not send an issue or notification.</span><button className="button button-primary" type="button" onClick={onExport}>Export decision brief<ArrowRight size={16} aria-hidden="true" /></button></div>
  </div>;
}

function BriefField({ label, value, onChange, wide = false, textarea = false }: { label: string; value: string; onChange: (value: string) => void; wide?: boolean; textarea?: boolean }) {
  return <label className={`brief-field ${wide ? "field-wide" : ""}`}><span>{label}</span>{textarea ? <textarea value={value} rows={3} onChange={(event) => onChange(event.target.value)} /> : <input value={value} onChange={(event) => onChange(event.target.value)} />}</label>;
}

function ShipView({
  memo,
  markdown,
  onExport,
  onCopy,
  onDownload,
  onBack,
  feedbackDraft,
  feedbackMarkdown,
  isFeedbackOpen,
  onOpenFeedback,
  onCloseFeedback,
  onChangeFeedback,
  onPrepareFeedback,
  onCopyFeedback,
  feedbackUrl,
}: {
  memo?: DecisionMemo;
  markdown: string;
  onExport: () => void;
  onCopy: () => void;
  onDownload: () => void;
  onBack: () => void;
  feedbackDraft: SessionFeedbackDraft;
  feedbackMarkdown: string;
  isFeedbackOpen: boolean;
  onOpenFeedback: () => void;
  onCloseFeedback: () => void;
  onChangeFeedback: (field: keyof SessionFeedbackDraft, value: string | boolean) => void;
  onPrepareFeedback: () => void;
  onCopyFeedback: () => void;
  feedbackUrl: string;
}) {
  return (
    <section className="content-section" aria-labelledby="ship-title">
      <div className="section-intro">
        <div>
          <p className="section-eyebrow">Decision brief</p>
          <h2 id="ship-title">Take a brief someone can challenge</h2>
          <p>Carry the source, limitation, next action, and not-covered list into the next product conversation.</p>
        </div>
        <span className="human-label"><FileText size={14} aria-hidden="true" />Portable Markdown</span>
      </div>
      {!memo ? (
        <div className="state-panel">
          <CircleAlert size={22} aria-hidden="true" />
          <div><h3>Export is not ready</h3><p>Accept at least one source-backed claim in Verify, then draft the smallest experiment in Decide.</p></div>
          <button className="button button-secondary" type="button" onClick={onBack}>Back to Decide</button>
        </div>
      ) : (
        <>
          <div className="memo-preview">
            <div className="memo-toolbar">
              <div><span className="section-eyebrow">Decision brief / Preview</span><h3>Shareable, but not a completion guarantee</h3></div>
              <span className="status-badge status-supported"><BadgeCheck size={14} aria-hidden="true" />Ready to inspect</span>
            </div>
            <div className="memo-content">
              <MemoSection title="Decision"><p>{memo.decision}</p></MemoSection>
              <MemoSection title="Evidence summary"><ul>{memo.evidenceSummary.map((item) => <li key={item}>{item}</li>)}</ul></MemoSection>
              <MemoSection title="Known limits"><ul>{(memo.knownLimits.length ? memo.knownLimits : ["No additional limits marked."]).map((item) => <li key={item}>{item}</li>)}</ul></MemoSection>
              <MemoSection title="Smallest experiment"><dl className="memo-definition-list"><dt>Hypothesis</dt><dd>{memo.experiment.hypothesis}</dd><dt>Primary metric</dt><dd>{memo.experiment.primaryMetric}</dd><dt>Guardrail</dt><dd>{memo.experiment.guardrail}</dd><dt>Smallest test</dt><dd>{memo.experiment.smallestTest}</dd><dt>Decision rule</dt><dd>{memo.experiment.decisionRule}</dd></dl></MemoSection>
              <MemoSection title="Not covered"><ul className="not-covered-list">{memo.notCovered.map((item) => <li key={item}>{item}</li>)}</ul></MemoSection>
            </div>
            <div className="export-actions">
              <button className="button button-secondary" type="button" onClick={onCopy}><FileText size={16} aria-hidden="true" />Copy Markdown</button>
              <button className="button button-primary" type="button" onClick={onDownload}><Download size={16} aria-hidden="true" />Download .md</button>
            </div>
            <label className="markdown-fallback"><span>Text fallback · select this if download is blocked</span><textarea value={markdown} readOnly rows={7} aria-label="Decision brief Markdown content" /></label>
            <button className="text-button" type="button" onClick={onExport}><RotateCcw size={14} aria-hidden="true" />Refresh brief</button>
          </div>
          <SessionFeedback
            draft={feedbackDraft}
            markdown={feedbackMarkdown}
            isOpen={isFeedbackOpen}
            feedbackUrl={feedbackUrl}
            onOpen={onOpenFeedback}
            onClose={onCloseFeedback}
            onChange={onChangeFeedback}
            onPrepare={onPrepareFeedback}
            onCopy={onCopyFeedback}
          />
        </>
      )}
    </section>
  );
}

function SessionFeedback({
  draft,
  markdown,
  isOpen,
  feedbackUrl,
  onOpen,
  onClose,
  onChange,
  onPrepare,
  onCopy,
}: {
  draft: SessionFeedbackDraft;
  markdown: string;
  isOpen: boolean;
  feedbackUrl: string;
  onOpen: () => void;
  onClose: () => void;
  onChange: (field: keyof SessionFeedbackDraft, value: string | boolean) => void;
  onPrepare: () => void;
  onCopy: () => void;
}) {
  return (
    <section className={`feedback-field-note ${isOpen ? "is-open" : ""}`} aria-labelledby="feedback-title">
      <div className="feedback-heading">
        <div>
          <span className="section-eyebrow">Pilot note / After the task</span>
          <h3 id="feedback-title">Help decide what to fix next</h3>
          <p>Three concrete lines are enough: what you expected, where you hesitated, and one change you would make. Add trust or recovery detail if it matters.</p>
        </div>
        {isOpen ? <button className="text-button" type="button" onClick={onClose}>Collapse</button> : <button className="button button-secondary" type="button" onClick={onOpen}>Open pilot note<ArrowRight size={15} aria-hidden="true" /></button>}
      </div>
      {isOpen && (
        <form className="feedback-form" onSubmit={(event) => { event.preventDefault(); onPrepare(); }}>
          <div className="feedback-boundary"><ShieldCheck size={16} aria-hidden="true" /><span>This creates local Markdown only. It does not read raw signals or submit a GitHub issue.</span></div>
          <div className="feedback-fields">
            <label className="feedback-control"><span>Your role</span><select value={draft.role} onChange={(event) => onChange("role", event.target.value)}>{FEEDBACK_ROLES.map((role) => <option key={role} value={role}>{FEEDBACK_ROLE_LABELS[role]}</option>)}</select></label>
            <label className="feedback-control"><span>Browser / device (optional)</span><input value={draft.environment} onChange={(event) => onChange("environment", event.target.value)} placeholder="e.g. Chrome · desktop" /></label>
            <label className="feedback-control"><span>Task result</span><select value={draft.result} onChange={(event) => onChange("result", event.target.value)}>{FEEDBACK_RESULTS.map((result) => <option key={result} value={result}>{FEEDBACK_RESULT_LABELS[result]}</option>)}</select></label>
            <label className="feedback-control feedback-control-wide"><span>What did you expect?</span><textarea value={draft.expectation} onChange={(event) => onChange("expectation", event.target.value)} rows={2} placeholder="e.g. Know which signal was worth checking next." /></label>
            <label className="feedback-control feedback-control-wide"><span>Where did you hesitate?</span><textarea value={draft.hesitation} onChange={(event) => onChange("hesitation", event.target.value)} rows={2} placeholder="Name the step or text that made you pause." /></label>
            <label className="feedback-control"><span>What made you trust or doubt it?</span><textarea value={draft.trust} onChange={(event) => onChange("trust", event.target.value)} rows={3} placeholder="e.g. I could trace the source, but I was unsure about…" /></label>
            <label className="feedback-control"><span>What happened when you went back or hit an error?</span><textarea value={draft.recovery} onChange={(event) => onChange("recovery", event.target.value)} rows={3} placeholder="Write “none” if you did not hit one." /></label>
            <label className="feedback-control feedback-control-wide"><span>One change that would make you try again</span><textarea value={draft.oneChange} onChange={(event) => onChange("oneChange", event.target.value)} rows={2} placeholder="Name the one change that matters most." /></label>
          </div>
          <label className="feedback-privacy"><input type="checkbox" aria-label="Confirm this session report contains no private data" checked={draft.privacyConfirmed} onChange={(event) => onChange("privacyConfirmed", event.target.checked)} /><span>I confirm that this report contains no customer names, private tickets, API keys, tokens, or confidential roadmap material.</span></label>
          <div className="feedback-footer"><span><ShieldCheck size={14} aria-hidden="true" />A short note is enough; blank fields become Not provided.</span><div><button className="button button-secondary" type="button" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit"><ClipboardList size={16} aria-hidden="true" />Prepare field note</button></div></div>
          {markdown && <div id="feedback-output" className="feedback-output" role="region" aria-labelledby="feedback-output-title" tabIndex={-1}><div className="feedback-output-heading"><div><span className="section-eyebrow">Field note / Inspect before sharing</span><strong id="feedback-output-title">This is a field note, not a validation result.</strong></div><span className="status-badge status-supported"><BadgeCheck size={14} aria-hidden="true" />Ready to inspect</span></div><textarea value={markdown} readOnly rows={12} aria-label="Session feedback Markdown content" /><div className="feedback-output-actions"><button className="button button-primary" type="button" onClick={onCopy}><FileText size={16} aria-hidden="true" />Copy field note</button><a className="button button-secondary" href={feedbackUrl} target="_blank" rel="noreferrer" aria-label="Open GitHub feedback page in a new tab for manual review">Open feedback page<Link2 size={15} aria-hidden="true" /></a></div><p>GitHub opens a new page only. Review the content yourself before deciding whether to submit.</p></div>}
        </form>
      )}
    </section>
  );
}

function MemoSection({ title, children }: { title: string; children: React.ReactNode }) { return <section className="memo-section"><h4>{title}</h4>{children}</section>; }

function DecisionContext({ pack, evidenceCount, claimCount, reviewedCount, supportedCount, currentStep, nextAction, events, onCopyReceipt, feedbackUrl }: { pack: EvidencePack | null; evidenceCount: number; claimCount: number; reviewedCount: number; supportedCount: number; currentStep: WorkflowStep; nextAction: { label: string; action: () => void }; events: ProductEvent[]; onCopyReceipt: () => void; feedbackUrl: string }) {
  const contextRecord = pack
    ? `${evidenceCount} ${evidenceCount === 1 ? "source line" : "source lines"} · ${claimCount} candidate claims · ${reviewedCount} reviewed · ${supportedCount} accepted.`
    : "No source lines yet. Start with one line you can trace.";
  const contextQuestion = !pack
    ? "Which source line can you defend?"
    : currentStep === "collect"
      ? "Which line earns a closer look?"
      : currentStep === "verify"
        ? "Which claim survives the source check?"
        : currentStep === "decide"
          ? "What would change the next move?"
          : "What should the team carry forward?";
  const contextRule = pack ? "No claim travels without its source." : "The source line stays attached to the claim.";
  return (
    <aside className="decision-context" aria-label="Worksheet context">
      <div className="context-heading">
        <div><p className="section-eyebrow">Work note</p><h2>{pack ? "Keep the source in frame" : "Start with a source"}</h2></div>
        <span className="context-boundary"><span className={`status-dot ${pack ? "" : "status-dot-neutral"}`} aria-hidden="true" />{pack ? "On this page" : "Blank sheet"}</span>
      </div>
      <div className="context-middle">
        <div className="context-project"><span className="card-eyebrow">Working set · {pack ? "active" : "empty"}</span><strong>{pack?.title ?? "No source pack"}</strong><span>{pack ? "These source lines stay on this page." : "Start with one source line."}</span></div>
        <p className="context-record"><span className="card-eyebrow">Record</span>{contextRecord}</p>
        <div className="context-list"><ContextItem label="Question on the desk" value={contextQuestion} /><ContextItem label="Rule" value={contextRule} /></div>
      </div>
      <div className="context-next"><span className="card-eyebrow">Next step</span><div className="next-action-title"><strong>{nextAction.label}</strong></div><p>{contextNextCopy(currentStep, pack)}</p>{pack && currentStep === "collect" ? <span className="context-next-static">Use the review mark in the workpaper.</span> : pack ? <button className="button button-primary button-full" type="button" onClick={nextAction.action} data-current-action>{nextAction.label}<ArrowRight size={16} aria-hidden="true" /></button> : <span className="context-next-static">Start with the source line in the center.</span>}</div>
      <div className="context-trace"><div className="trace-header"><span className="card-eyebrow">Session trace</span><span>{events.length ? "Last action below" : "No action yet"}</span></div>{events.length === 0 ? <p>Session actions stay on this page and do not include raw signal content.</p> : <><p>Last action: {EVENT_LABELS[events[events.length - 1].name]}</p><div className="context-trace-actions"><button className="text-button" type="button" onClick={onCopyReceipt}>Copy session receipt</button><a className="text-button" href={feedbackUrl} target="_blank" rel="noreferrer" aria-label="Report this session in a new tab for manual review">Report this session<ArrowRight size={13} aria-hidden="true" /></a></div></>}</div>
    </aside>
  );
}

function ContextItem({ label, value }: { label: string; value: string }) { return <div className="context-item"><span className="context-item-rule" aria-hidden="true" /><div><span>{label}</span><strong>{value}</strong></div></div>; }

function NoticeIcon({ tone }: { tone: NoticeTone }) { if (tone === "success") return <CheckCircle2 size={16} aria-hidden="true" />; if (tone === "warning") return <CircleAlert size={16} aria-hidden="true" />; if (tone === "error") return <CircleAlert size={16} aria-hidden="true" />; return <Info size={16} aria-hidden="true" />; }

function formatDate(value: string) { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(value)); }
function formatFolioNumber(value: number) { return String(value).padStart(2, "0"); }

function contextNextCopy(step: WorkflowStep, pack: EvidencePack | null) {
  if (!pack) return "Open the sample worksheet or add a source line.";
  if (step === "collect") return "Bring in the lines before asking what they mean.";
  if (step === "verify") return "Accept, edit, or keep the claim open; do not skip the source check.";
  if (step === "decide") return "Write the metric, guardrail, and stop rule.";
  return "Carry the brief out of this page; nothing is submitted for you.";
}

export default App;
