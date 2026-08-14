# UX Spec — PM Signal Lab

## UX north star

PM Signal Lab 是一個「證據工作台」，不是聊天頁。使用者第一眼應該理解：

1. 我現在有一包什麼訊號；
2. 哪些結論有證據、哪些還要審核；
3. 我下一個可以做的 PM 行動是什麼；
4. AI 在哪裡只是協助，最後決策仍由我負責。

## Composition Brief

- First read: `把訊號變成下一步` + current step + sample pack status。
- Second read: 中央 evidence/claim workbench 中的 source、status、uncertainty；不是抽象 AI 文案。
- Primary action: 依目前 step 顯示唯一主 CTA：`載入範例` → `開始審核` → `草擬實驗` → `匯出決策 brief`。
- Content relationship: 這是「流程 + 證據 + 決策」的工作台；不是 card grid、pricing page 或 chat transcript。
- Density: desktop medium-high；evidence rows 與 metadata 可掃描，決策 brief 保持低密度；mobile 以單欄、分段與 sticky action 為主。
- Alignment spine: 左側 workflow rail、中央 content column、右側 decision context；所有標題與 rows 沿中央 12-column grid 對齊。
- Layout archetype: desktop `sidebar + workbench split-pane + decision rail`；tablet `top stepper + 2-column`; mobile `top stepper + stacked sections + bottom action`。
- Responsive reflow: 1024px 以下收起左 rail，右側 decision context 移到中央下方；640px 以下所有 row 變成 stacked row，primary action sticky 到底部安全區。
- What not to use: 大面積 gradient、glass、orb/blob、裝飾 bento、無語意的 spinner、過多 nested cards、只靠顏色傳遞 claim status。

## Product design direction

- Selected DNA: `Orclaw / ALPHA_INTELLIGENCE` 的技術訊號與密度 + `Pillow Fit` 的專業信任與低焦慮狀態。
- Project personality: precise、calm、evidence-first、slightly editorial。
- Surfaces: 深 graphite app shell + warm neutral workspace + solid white/ink panels；不用純黑與全螢幕漸層。
- Signature detail: `Evidence spine`：每一個 claim 左側有與 source 對應的細線/節點，讓「結論從哪裡來」成為視覺骨架。
- Accent: amber/orange 只用於 primary action、當前 step 與少量 attention state；blue/teal 用於 source/trust；success/warning/error 各自有文字 label。
- Motion: 150–200ms micro feedback；synthesis 只用有語意的 progress rows，不用打字機或假 thinking animation；支援 `prefers-reduced-motion`。

## Primary flows

### Flow F1 — First-time sample pack

Entry point: direct app load with no session state。

1. User sees app shell、產品 literal promise、4-step progress、`未建立工作區` empty state。
2. User chooses `載入範例資料`。
3. System loads deterministic fixture (latency class: instant) and shows three evidence rows plus pack summary。
4. System focuses `開始審核` as the next action; no API key or sign-in request appears。

Success end-state: sample pack title、evidence count、first source row 與 `開始審核` 可見。

Abandon points: user may inspect the sample explanation or leave; current state remains empty and safe。

### Flow F2 — Add evidence

Entry points: `Collect` step or `新增 evidence` button。

1. User opens inline form/drawer。
2. User enters title、source、type、content。
3. Client validates required fields and content length before mutation。
4. On success, new row appears at top with `剛加入` label and count updates。
5. On failure, form keeps all input and places focus on the first invalid field。

Success end-state: evidence row has stable session id、source metadata、content preview。

Abandon points: user closes form; unsaved text is either preserved in an explicit draft state or a clear discard action is shown。

### Flow F3 — Verify claims

Entry points: `開始審核` from Collect or `Verify` in stepper。

1. User sees claim list grouped by status: `Supported`、`Needs review`、`Missing evidence`。
2. Each claim shows claim text、source ids、evidence type、freshness、limitation。
3. User expands a claim to inspect source excerpt。
4. User chooses `接受`、`標記待確認` or `編輯 claim`。
5. System persists status in session and updates evidence spine。

Success end-state: at least one opportunity is reviewed and `草擬實驗` becomes available；missing evidence stays visible。

Abandon points: user can return to Collect without losing review status。

### Flow F4 — Draft experiment

Entry points: `草擬實驗` from Verify or an opportunity row action。

1. User selects opportunity。
2. System shows synthesis activity summary: `正在整理支持訊號` → `正在檢查缺口` → `草擬最小驗證` (latency class: deterministic instant; future provider may be async)。
3. Experiment brief renders hypothesis、primary metric、guardrail、smallest test、decision rule、owner。
4. If evidence is missing, a visible `Needs validation` banner lists the gap。
5. User edits fields and chooses `保留為假設` or `確認 brief`。

Success end-state: experiment brief has an explicit readiness state and a clear next action。

Abandon points: user returns to Verify; reviewed claims remain unchanged。

### Flow F5 — Export decision brief

Entry points: `Ship` step or `匯出決策 brief` button。

1. User sees final memo preview with decision、evidence、limits、experiment、guardrails、next action、not covered。
2. System shows `Demo engine · no API key` when deterministic synthesis was used。
3. User chooses `複製 Markdown` or `下載 .md`。
4. System shows success toast with next action `開啟檔案內容` / `再編輯`。

Success end-state: complete memo is available as copied/downloaded text and stays visible。

Abandon points: incomplete memo cannot silently export as ready；user can return to Verify or Decide。

### Personas / stress walk

| Archetype | Likely behavior | Break risk | Design response |
|---|---|---|---|
| First-time user who reads nothing | Looks for immediate value and asks “這是什麼？” | Empty screen or generic AI copy | Sample pack CTA、literal promise、current step、no key required |
| Impatient expert | Skims rows, wants to jump to output and edit quickly | Too much explanation blocks work | Stepper jump、keyboard focus、compact metadata、editable brief |
| Phone / weak network | Uses small viewport and may lose connection later when provider is added | Desktop columns, horizontal overflow, async black box | Single-column reflow、sticky CTA、fixture fallback、no data loss、explicit provider state |

## State matrix

| Surface | First-time | Empty | Loading | Error | Recovery | Mobile | A11y | Trust |
|---|---|---|---|---|---|---|---|---|
| App shell / workflow rail | Literal promise、4 steps、`未建立工作區` | Explain sample pack and `載入範例資料` | Step item shows active/processing label; no blank rail | “工作區載入失敗，原始內容未被刪除。” | `重設 demo 資料` / return to previous step | Rail becomes horizontal top stepper; no hidden current step | `nav`、`aria-current=step`、keyboard order、focus ring | Current step、engine label、local-only note visible |
| Collect / evidence list | Sample pack explanation + 3 representative rows | “還沒有 evidence；先載入範例或新增一筆。” | Row skeleton only if async provider introduced | “這筆 evidence 暫時無法解析；原文仍保留。” | Edit raw text、retry parse、remove draft | Rows stack; source metadata wraps; add button ≥44px | Labels connected to fields; list items have headings | source、type、timestamp、freshness never hidden |
| Add evidence form | Inline helper explains what counts as evidence | Empty form with examples | Submit button changes to `儲存中` and disables double submit | Field-level messages: “請補上來源” / “請補上內容” / “內容太長” | Preserve values; focus first invalid; cancel safely | Full-width fields; bottom sheet/drawer not required for v0 | `label`、`aria-describedby`、`aria-invalid` | Explain no external upload in v0 |
| Verify / claim list | First claim with “先看這一筆怎麼來” hint | “目前沒有可審核 claim；回 Collect 新增 evidence。” | `整理支持訊號` / `檢查缺口` activity rows | “候選 claim 產生失敗；你仍可手動建立 brief。” | Retry, manual edit, back to evidence | Status filters become horizontal scroll; source excerpt below claim | Status text + icon; expandable rows announce state | source chips、evidence type、limitation、confidence language |
| Claim detail / source panel | First expanded source shows mapping | No source: `Missing evidence` with gap explanation | Source excerpt skeleton | “來源內容讀取失敗；claim 維持待確認。” | Retry source / keep status / edit claim | Detail panel moves below claim; no hover-only affordance | Disclosure button with expanded state; heading hierarchy | Original excerpt and timestamp visible beside claim |
| Decide / experiment brief | Brief template explains each field | No reviewed opportunity: CTA returns to Verify | Activity summary plus field skeleton; no fake percent | “brief 草擬未完成；已保留審核結果。” | Retry, manual edit, save as hypothesis | Sections stack; primary action sticky | Form labels, required status, error summary | `Needs validation` banner; metric/guardrail explicit |
| Ship / decision preview | Preview includes example output structure | “尚未準備好匯出；請先完成一個 claim 與 brief。” | Export button progress only during actual copy/download | “下載未完成，但內容已準備好；請複製文字。” | Copy fallback, re-edit, back | Preview readable with horizontal code block avoided | `role=status` for copy result; text remains selectable | Not-covered section; engine/provider note; human owner |
| Toast / inline alert | Not shown until action | Not applicable | `role=status` for non-blocking progress | Specific message, no raw stack/error code | Action button when needed; timeout never hides critical error | Full-width near bottom, safe area | Live region priority matched to severity | Never imply external action succeeded |

## AI-native interaction contract

```text
compose / discover
  → accepted / queued
  → working / activity summary
  → partial output
  → human decision boundary
  → change preview (memo/export content)
  → completed / continuation
  → failed / repair
```

- `Compose`: examples and sample data reduce blank prompt burden。
- `Working`: display meaningful activity summary only; do not show chain-of-thought。
- `Partial output`: show claims as candidates, not facts。
- `Decision boundary`: `接受` / `標記待確認` / `編輯` / `保留為假設`。
- `Completed`: show export/copy plus edit/reopen path。
- `Recovery`: preserve input and reviewed claims when synthesis/export fails。

## Microcopy contract

| Context | Copy |
|---|---|
| Product title | `PM Signal Lab` |
| Hero / first read | `把訊號變成下一步` |
| Hero support | `把訪談、客服、埋點與競品觀察，整理成有來源、可審核的產品決策。` |
| Engine note | `Demo engine · 不需要 API key；這份結果只示範工作流，不代表外部模型品質。` |
| Empty workspace | `還沒有工作區。先載入一組範例資料，看看一個 claim 如何回到來源。` |
| Primary empty CTA | `載入範例資料` |
| Secondary empty CTA | `自己新增一筆 evidence` |
| Evidence add CTA | `新增 evidence` |
| Verify CTA | `開始審核` |
| Status supported | `有來源支持` |
| Status needs review | `需要你確認` |
| Status missing | `缺少證據` |
| Accept claim | `接受這個 claim` |
| Keep hypothesis | `保留為假設` |
| Draft experiment | `草擬最小實驗` |
| Needs validation | `這份 brief 還不能當成結論；先補上列出的證據。` |
| Export CTA | `匯出決策 brief` |
| Copy success | `Markdown 已複製；你可以貼到 GitHub issue 或 PRD。` |
| Download fallback | `下載沒有完成，但內容仍在這裡；請複製文字繼續。` |
| Invalid source | `請補上來源，讓其他人能回看這個觀察。` |
| Invalid content | `請補上 evidence 內容，不要只留下標題。` |
| Too long | `內容超過 v0 上限；文字已保留，請縮短後再儲存。` |
| Fixture failure | `範例資料載入失敗，原始工作區仍安全。` |
| Provider unavailable | `外部 AI 目前不可用；已切回手動/示範模式。` |
| Human ownership | `這是建議，不是決策。最後由你確認。` |

## Interaction contract: PRD coverage

| PRD AC | UX home / state |
|---|---|
| AC-1–3 | App shell first-time/empty/error/recovery + F1 |
| AC-4–6 | Collect add evidence form + invalid/too-long/recovery |
| AC-7–9 | Verify claim list + source detail + edit/status persistence |
| AC-10–12 | Decide experiment brief + `Needs validation` + failed synthesis recovery |
| AC-13–15 | Ship preview + complete/incomplete export + copy fallback |
| AC-16–18 | Engine note、activity summary、claim status、human decision boundary |
| AC-19–21 | Responsive layout、keyboard focus、loading/empty/error/success states |

Every PRD acceptance criterion has a screen/state home; none are intentionally orphaned.

## Visual QA plan

- Viewports: 390×844、768×1024、1440×900。
- Screenshot states: first-time empty、sample loaded、claim needs review、missing evidence、experiment needs validation、export success、input error、provider fallback。
- Layout audit: grayscale hierarchy、alignment spine、container count、long Traditional Chinese、English/URL wrapping、status not conveyed by color alone。
- Behavior audit: first-time, impatient expert, mobile; keyboard path through add evidence → review claim → export。
- Second polish: reduce unnecessary panel/card wrappers, normalize type/spacing, verify sticky action does not cover content, confirm focus and reduced motion。
