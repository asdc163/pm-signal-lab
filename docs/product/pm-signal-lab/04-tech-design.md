# Tech Design — PM Signal Lab v0

## Repo truth

- Workspace: current repository root。
- Existing files before implementation: product/research/design documents only；沒有 `package.json`、`src/`、`tests/`、CI、auth、database、deploy config 或既有 frontend convention。
- Private account-growth planning is intentionally excluded from the public preview commit。
- Git state before public bootstrap: no commits yet on `main`；public preview files are staged explicitly, while private planning material remains excluded。
- Product constraint: v0 is local-first, fixture-driven, no external API key, no auth, no server mutation, and no in-product GitHub/MCP write。Repository publication is an operator action outside the product。

## Architecture contract

- Decision: 以 React + TypeScript + Vite 建立一個 client-only modular monolith，把 domain logic 與 UI 分離，先用 deterministic engine 完成可驗證 workflow。
- User/job: AI PM 從 evidence pack 走到 claim review、experiment brief、decision memo、Markdown export。
- Door: local UI/domain is two-way；provider adapter、persistence、GitHub/MCP、deployment are one-way doors and explicitly deferred。
- Existing pattern to follow: new repo，無既有 pattern；採少依賴、typed domain、semantic HTML、CSS tokens、local state。
- Boundary:
  - UI: `src/App.tsx`, `src/components/*`, `src/styles.css`。
  - domain/service: `src/domain/types.ts`, `src/domain/fixture.ts`, `src/domain/synthesis.ts`, `src/domain/export.ts`。
  - data: in-memory React state only；fixture is source for demo session；no database。
  - external tools: none in v0；future provider/MCP must implement a typed adapter port。
- Data contract: `Evidence → Claim → ExperimentBrief → DecisionMemo`; all relations use stable string ids；source references are explicit `evidenceIds`。
- Auth/security: no authenticated actor；input is local in browser；never send evidence or secrets；no API token in client bundle。
- Observability: local `ProductEvent` array only for QA/demo；no external telemetry；event payloads exclude raw evidence content。
- Verification: Vitest domain tests + TypeScript build/lint + manual browser operation/screenshot at 390/768/1440 widths；screen-reader full audit remains unverified unless tooling is available。

## Architecture decisions

### Decision 1 — Vite React vs Next.js

- Option A: Next.js + Tailwind + shadcn/ui。Pros: future server/provider route、SEO、ecosystem；5-year regret risk: v0 gains server/cache/dependency surface it does not need，and the local-first boundary becomes less obvious。Escape hatch: move provider adapters to a Next route later。
- Option B: Vite + React + TypeScript + CSS tokens。Pros: static/local-first boundary、fast build、no server/auth assumptions、easy GitHub Pages/preview later；5-year regret risk: if server rendering or authenticated data becomes core，migration is required。Escape hatch: domain modules are framework-independent and can be imported into a Next app。
- Chosen: **Option B**，because PRD requires no API key, no persistence, no auth, and a working local prototype；the immediate value is a product/UX evidence surface, not server infrastructure。

### Decision 2 — In-memory state vs localStorage

- Option A: localStorage persistence。Pros: refresh continuity；risk: evidence may contain confidential or personal content and persistence is invisible to a first-time user。
- Option B: in-memory session state。Pros: privacy-safe default, simple reset, no migration；risk: refresh loses work。
- Chosen: **Option B**；v0 explicitly says session-local. Export is the user-controlled persistence path. Promotion trigger for localStorage: real users ask for refresh continuity and a data-use notice/clear action is designed first。

### Decision 3 — Real LLM first vs deterministic engine first

- Option A: real provider integration first。Pros: visible AI capability；risk: API keys, cost, latency, model drift, privacy and untestable demo path.
- Option B: deterministic engine with provider port。Pros: no secret, stable test oracle, honest demo, reversible adapter boundary；risk: not yet evidence of model quality.
- Chosen: **Option B**；the UI exposes the session-local `資料邊界` and source context instead of naming a fixed rule as an engine. A future provider must preserve the same `Claim`/`ExperimentBrief` contract and pass offline eval cases before being enabled。

### Two-way doors

- CSS tokens instead of Tailwind: chosen for a new repo with one surface; easy to migrate later。
- React local `useState` instead of Zustand/Redux: chosen because state is one workbench and no server state exists；promote only after a third independent workflow needs shared state。
- Lucide icons: chosen for semantic controls; replaceable without changing domain logic。

## Data model

```ts
type EvidenceType = "interview" | "support" | "analytics" | "competitor" | "market" | "expert";
type ClaimStatus = "supported" | "review" | "missing";
type WorkflowStep = "collect" | "verify" | "decide" | "ship";

interface Evidence {
  id: string;
  title: string;
  source: string;
  type: EvidenceType;
  observedAt: string;
  content: string;
}

interface Claim {
  id: string;
  text: string;
  status: ClaimStatus;
  evidenceIds: string[];
  limitation: string;
  edited: boolean;
  reviewed: boolean;
}

interface ExperimentBrief {
  opportunity: string;
  hypothesis: string;
  primaryMetric: string;
  guardrail: string;
  smallestTest: string;
  decisionRule: string;
  owner: string;
  readiness: "ready" | "needs-validation";
}

interface DecisionMemo {
  decision: string;
  evidenceSummary: string[];
  knownLimits: string[];
  experiment: ExperimentBrief;
  nextAction: string;
  notCovered: string[];
}
```

No database schema or migration exists in v0. `Evidence` is the only user-entered object; all derived objects can be rebuilt from the current session and fixture rules.

## Domain contracts

### `synthesis.ts`

- `buildClaims(evidence: Evidence[]): Claim[]`
- `draftExperiment(claims: Claim[], opportunityId: string): ExperimentBrief`
- No network calls, no random output, no hidden side effects。
- Unsupported/missing evidence produces `review`/`missing`, never silently `supported`。

### `export.ts`

- `buildDecisionMemo(claims, experiment): DecisionMemo | ExportReadinessError`
- `toMarkdown(memo): string`
- Export refuses a memo with no reviewed claim or no experiment; it returns an actionable error and preserves state。

### Future provider port

```ts
interface SynthesisEngine {
  readonly mode: "demo" | "provider";
  buildClaims(evidence: Evidence[]): Promise<Claim[]>;
  draftExperiment(claims: Claim[], opportunityId: string): Promise<ExperimentBrief>;
}
```

No provider implementation is included in v0. This prevents a UI promise from outrunning privacy, cost, eval, and approval design.

## File / module plan

```text
index.html
package.json
tsconfig.json
vite.config.ts
src/
  main.tsx
  App.tsx
  styles.css
  domain/
    types.ts
    fixture.ts
    synthesis.ts
    export.ts
    synthesis.test.ts
    export.test.ts
```

No component library is added yet. The interface has a small number of product-specific components and CSS tokens; adding shadcn would be a future decision only if a third surface needs the same primitives.

## Task plan

### T1 — Bootstrap the local React product and domain fixture

- Goal: a fresh user can open the local app and load a deterministic evidence pack without an API key。
- Satisfies: AC-1, AC-2, AC-3, AC-16, AC-17；UX: app shell first-time/empty/loading/error/recovery。
- Touches: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles.css`, `src/domain/types.ts`, `src/domain/fixture.ts`, `src/domain/synthesis.ts`。
- Approach: create Vite React TS shell；define typed domain objects and fixture rows；keep the fixture workflow deterministic；render the four-step shell and 收集 state first。
- Verification oracle: `npm run lint && npm run build` exits 0；`npm test -- --run` asserts fixture has ≥3 evidence rows and `buildClaims` is deterministic for the same fixture。
- Depends on: none。

### T2 — Implement evidence collection and claim review

- Goal: user can add valid evidence, recover from invalid input, and review claims with source/uncertainty/status。
- Satisfies: AC-4, AC-5, AC-6, AC-7, AC-8, AC-9；UX: Collect form、Verify list、source detail、validation/recovery。
- Touches: `src/App.tsx`, `src/domain/synthesis.ts`, `src/domain/synthesis.test.ts`, `src/styles.css`。
- Approach: add controlled evidence form with length guard and preserved input；derive claims from evidence；implement status/edit actions with explicit source mapping and non-color labels。
- Verification oracle: `npm test -- --run` covers valid add, blank source/content, long content preservation, missing evidence status, claim edit/status persistence；manual path `載入範例資料 → 開始核對 → expand source → 標記待確認` shows source ids and limitation。
- Depends on: T1。

### T3 — Implement experiment brief, decision memo, and export fallback

- Goal: user can turn a reviewed opportunity into an experiment brief and copy/download an honest Markdown decision memo。
- Satisfies: AC-10, AC-11, AC-12, AC-13, AC-14, AC-15, AC-18；UX: Decide/Ship states, needs-validation, incomplete export, copy fallback。
- Touches: `src/domain/export.ts`, `src/domain/export.test.ts`, `src/App.tsx`, `src/styles.css`。
- Approach: derive brief with primary metric/guardrail/smallest test/decision rule；block incomplete memo；render a preview with `not covered`；use clipboard API when available and text fallback otherwise；all generated output requires human action before ready。
- Verification oracle: `npm test -- --run` asserts complete memo contains all required sections and incomplete memo returns an error；manual path `Verify → 草擬最小實驗 → 確認 brief → Ship → 複製 Markdown` shows success feedback and copy fallback state。
- Depends on: T2。

### T4 — Apply evidence-workbench visual system and responsive state layout

- Goal: the full workflow is readable and operable at desktop/tablet/mobile widths, including keyboard focus and all designed states。
- Satisfies: AC-19, AC-20, AC-21；UX: all state matrix surfaces；Design: `DESIGN.md` and `03-ux-spec.md`。
- Touches: `src/App.tsx`, `src/styles.css`, `DESIGN.md` (already created; update only if implementation changes the contract)。
- Approach: implement graphite shell + neutral workspace, stepper, evidence spine, decision rail, responsive reflow, status text/icons, focus ring, sticky mobile CTA, skeleton/activity summaries, alerts/toasts without high-risk decoration。
- Verification oracle: `npm run lint && npm run build` exits 0；manual screenshot/operation at 390×844, 768×1024, 1440×900 confirms no horizontal overflow, CTA remains visible, focus is visible, long CJK/URL content wraps；run `npm test -- --run` after UI changes。
- Depends on: T3。

### T5 — Fresh QA evidence and release decision

- Goal: verify the real primary task and record what is and is not covered before calling v0 a pilot candidate。
- Satisfies: all AC-1–AC-21 via regression matrix；UX: normal/friction/mismatch and AI trust/recovery evidence。
- Touches: `docs/product/pm-signal-lab/06-qa-manifest.md`, `docs/product/pm-signal-lab/07-release.md`。
- Approach: run clean install/build/lint/test; operate fresh local app; test first-time, invalid evidence, missing evidence, provider fallback, export fallback, mobile/keyboard; decide `pilot`/`hold` based on evidence。
- Verification oracle: QA manifest records exact commands, exit codes, observed paths, screenshot paths if captured, remaining risks, and a not-covered list；release file has ship/hold/pilot and rollback。
- Depends on: T4。

## Implementation status — 2026-08-15

- **T1 completed**：Vite + React + TypeScript shell、fixture pack、deterministic workflow、first-run/loading/empty states。
- **T2 completed**：controlled evidence form、field validation with input preservation、claim/source mapping、`Supported` / `Needs review` / `Missing evidence`、human review state。
- **T3 completed**：experiment brief、`Needs validation` path、decision memo preview、Markdown copy/download fallback、incomplete-export gate。
- **T4 completed**：graphite shell + neutral workbench、evidence spine、decision rail、responsive reflow at 390/768/1440、visible status labels、mobile action bar、reduced-motion CSS。
- **T5 completed for the local verification gate**：automated checks and real browser operation have been run; the durable results are recorded in [`06-qa-manifest.md`](./06-qa-manifest.md)、[`07-release.md`](./07-release.md) and the later [`11-editorial-evidence-desk-release-2026-08-15.md`](./11-editorial-evidence-desk-release-2026-08-15.md)。

### Deliberate v0 divergences

- `Claim.reviewed` is separate from `Claim.status`：有來源的 candidate 不等於使用者已批准；只有 human review 才能讓 export gate 通過。
- No provider failure path can be exercised end-to-end yet because v0 intentionally ships no external provider adapter；the UI/domain contract and recovery copy remain defined for the next adapter pilot。
- Full Chrome Extension QA、完整 keyboard-only traversal、screen-reader audit、真實 provider quality、GitHub write/traffic/adoption remain outside the current evidence；GitHub Pages deployment has separate hosted evidence and must not be confused with production readiness。

## Verification matrix

| Risk | Minimum evidence |
|---|---|
| Domain correctness | Vitest fixture/claim/experiment/export tests |
| UI build correctness | TypeScript/lint/build |
| Evidence trust | Source id, timestamp, limitation, status, data boundary visible in UI and export |
| Recovery | Invalid form, missing evidence, synthesis failure, blocked download all preserve state and expose next action |
| Responsive | 390/768/1440 manual screenshots and no overflow/overlap |
| Accessibility | semantic headings/labels, keyboard focus, status text/icon, touch target; screen reader full test `未驗證` if no tool |
| Security/privacy | no API key, no network provider, no raw evidence telemetry, no external side effect |
| Maintainability | domain modules separate from UI; no one-file hidden business rules; minimal dependencies |

## Top technical risks and mitigations

1. **UI monolith / state drift**：keep `types`, `fixture`, `synthesis`, `export` independent；tests target domain behavior rather than CSS implementation。
2. **False AI impression**：render the data boundary, source mapping, and limitations in the primary UI；provider adapter is not in v0。
3. **Responsive density collapse**：design mobile reflow before styling；test long CJK, URL, status labels and sticky action at 390px。

## Rollback

- All v0 changes are local and reversible; revert or remove the new `src/`/config files without touching existing docs.
- No data migration, auth, external API, GitHub write, package publish, or provider deployment exists in v0；the static GitHub Pages preview is tracked separately in the release audit。
- If the workflow fails UX QA, hold at local pilot, adjust the smallest UI/domain slice, and rerun T5；do not broaden scope to compensate。

## Dependencies added

- Runtime: `react`, `react-dom`, `lucide-react`。
- Tooling: `vite`, `typescript`, `@vitejs/plugin-react`, `vitest`。
- No provider SDK, analytics SDK, database, auth SDK, CSS framework, or remote MCP/CLI dependency in v0。
