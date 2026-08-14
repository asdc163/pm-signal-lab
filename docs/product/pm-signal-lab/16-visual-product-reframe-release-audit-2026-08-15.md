# PM Signal Lab：Visual Product Reframe Release Audit — 2026-08-15

## Release decision

結論：`public preview deploy` 通過；`production-ready`、`完全無 bug`、真人 usability、adoption、model quality 與 GitHub growth **不通過／未宣稱**。

本輪交付的是一個可回看的視覺／產品切片：把 PM Signal Lab 從「看起來像工具」收斂成一張有明確任務、來源、判斷與下一步的 `PM 工作紙`。它保留 local-first、deterministic fixture、人工採用與手動 GitHub handoff 的邊界。

- Audited commit：`d5c81d8f9f7aaaa224c80742b99dc9f5aceea8fe` (`Refine PM worksheet visual hierarchy`)
- Repository：<https://github.com/asdc163/pm-signal-lab>
- Canonical demo：<https://asdc163.github.io/pm-signal-lab/>
- Audit scope：`src/App.tsx`、`src/styles.css`、公開 README／DESIGN／CHANGELOG、visual reframe contract 與 fresh QA captures

## What changed

- 首屏改成 `PM 工作紙／第一頁`，以 `來源 → 判斷 → 驗證` 說清楚工作路徑。
- Hero 的右側狀態改成 literal `這一頁的進度`、目前 step、桌上訊號數與 local-only boundary。
- First-run sheet 保留真實 fixture quote、來源型別與「今天先做一件事」；開始動作只有一個主要 CTA。
- Loaded workflow 保留 source rows、claim mapping、human decision boundary 與 decision brief；next action 改成較輕的 ledger row，不用重複卡片堆疊。
- Mobile／tablet 只重排既有內容：top stepper、單欄 evidence、context rail 下移、sticky primary action；沒有加入 provider、telemetry、auth、GitHub mutation 或 star automation。

## Completion Evidence Packet

### 1. Static and domain gates

Fresh local run in the audited worktree:

| Gate | Result |
| --- | --- |
| `npm test -- --run` | exit 0；4 test files、9 tests passed |
| `npm run lint` | exit 0；TypeScript no-emit clean |
| `npm run build` | exit 0；Vite production bundle built |
| `git diff --check` | exit 0；no whitespace error |
| KB contract score | `100/100`；all 10 checks passed |

The domain layer and privacy-gated feedback logic were not changed in this visual slice. The private, untracked `docs/github-star-growth-plan.md` was intentionally not staged or published.

### 2. Local browser behavior evidence

Browser fallback run with Playwright 1.62.1 against `http://127.0.0.1:5175/` after the final CSS change. The local Vite process was the only local runtime dependency; no API key or external provider was used.

#### Normal workflow

Executed on a fresh 1440px page:

`載入範例資料 → 查看來源 → 開始核對 → 採用這個判斷 → 前往安排 → 草擬最小實驗 → 匯出決策 brief`

Observed:

- first-run `h1`：`先看來源，再決定下一步`
- route：`01 來源 / 02 判斷 / 03 驗證`
- loaded evidence rows：4
- accepted claim and experiment brief were present before export
- final decision memo included its `Not covered` boundary
- local page width：`scrollWidth 1440 / clientWidth 1440`
- browser console errors：`0`
- page errors：`0`

#### Friction, trust and recovery

- Privacy gate：未勾選確認就按 `產生回報內容`，頁面保留空 output 並顯示「請先確認這份回報沒有客戶資料、私密內容、API key 或 token。」
- Feedback report：勾選後產生 755-character editable Markdown；報告不包含 `evidence-*` ID、sample quote 或原始訊號內容。
- Manual handoff：output visible text includes `請你自己檢查內容，再決定是否按下送出`；GitHub link 只開新頁，不自動提交 issue。
- Clipboard failure：人為讓 `navigator.clipboard.writeText` reject，頁面顯示「剪貼簿被瀏覽器擋住」且 Markdown textarea 仍保留內容。
- Add-evidence recovery：空白送出顯示 3 個 field errors，focus 回到 `#evidence-title`；填入標題、來源與內容後，訊號出現在清單並標示 `剛加入`。
- Keyboard path：從最後一個 feedback textarea 按 Tab 依序到 privacy checkbox、`取消`、`產生回報內容`、`複製 Markdown`；console/page errors 都是 0。

#### Responsive evidence

| Viewport | Width check | Touch / layout evidence | Console / page errors |
| --- | --- | --- | --- |
| 390 × 844 | `390 / 390` | source buttons all `44px`；mobile stepper `block`；sticky action `flex` | `0 / 0` |
| 768 × 1024 | `768 / 768` | source buttons all `44px`；mobile stepper `block`；mobile action bar `none` | `0 / 0` |
| 1440 × 1100 | `1440 / 1440` | persistent rail + workbench + decision rail；no horizontal overflow | `0 / 0` |

Fresh captures reviewed visually and committed with this release:

- [`first-run 1440`](./assets/qa/visual-reframe-first-run-1440.png)
- [`first-run 390`](./assets/qa/visual-reframe-first-run-390.png)
- [`loaded 1440`](./assets/qa/visual-reframe-loaded-1440.png)
- [`loaded 390`](./assets/qa/visual-reframe-loaded-390.png)
- [`loaded 768`](./assets/qa/visual-reframe-loaded-768.png)

These screenshots prove the rendered states at those viewports. They do not prove cross-device rendering, assistive technology behavior or general usability.

### 3. Hosted / GitHub evidence

The public push and hosted release were read back against the audited SHA:

- `git push origin main` succeeded: `bfafa36..d5c81d8 main -> main`.
- GitHub `CI` run `31832783399` completed `success` for the audited SHA.
- GitHub `Deploy hosted demo` run `31832783602` completed `success`; deploy job `94872169094` completed all steps.
- Canonical HTTP response: `HTTP/2 200`.
- Pages `Last-Modified`: `Fri, 14 Aug 2026 19:20:30 GMT`.
- Hosted HTML points to `/pm-signal-lab/assets/index-CC0NpM0K.js`; bundle readback contains `PM 工作紙`、`這一頁的進度` 與 `資料只留在這個瀏覽器工作階段`。

Fresh hosted browser run against the canonical URL executed the same core path through decision export and feedback preparation. Observed:

- title：`PM Signal Lab — 產品訊號到決策`
- first-run `h1`：`先看來源，再決定下一步`
- topbar：`PM 工作紙`
- privacy gate blocked the first report attempt
- editable session feedback Markdown generated after confirmation
- manual GitHub submission boundary remained visible
- hosted `scrollWidth 1440 / clientWidth 1440`
- hosted console errors：`0`
- hosted page errors：`0`

## Coverage boundary

### Verified in this audit

- Current source／code／docs diff was inspected before commit.
- Deterministic domain tests, TypeScript lint, production build and whitespace gate.
- Fresh first-run, loaded workflow, privacy block, manual-submit boundary, clipboard fallback, add-evidence validation/recovery and keyboard focus path.
- Fresh local 390／768／1440 layout checks and screenshot review.
- Public repo commit, CI, Pages deploy, canonical HTTP, hosted bundle readback and hosted core workflow.

### Not verified / not a release claim

- No five non-owner PM／founder／product engineer sessions yet; current browser runs are owner-run QA.
- No real adoption, retention, conversion, traffic, star growth or viral distribution evidence. Current public snapshot after push: `0 stars`、`0 forks`、`4 open issues`.
- No Chrome Extension sign-off, screen reader／VoiceOver／NVDA／TalkBack audit, real iOS／Android device pass, low-bandwidth pass or full multi-browser matrix.
- No external AI provider, model quality, prompt quality, RAG quality, latency, cost or observability evidence; v0 intentionally has no provider.
- No formal security review or dependency supply-chain audit in this release audit beyond the existing local build/test boundary.
- Hosted responsive behavior was not independently run on real mobile hardware; local browser responsive evidence does not stand in for that proof.
- No automated Playwright suite is published in CI; browser evidence here is a fresh owner-run fallback session and must not be confused with continuous E2E coverage.

## Release / learning decision

保持 public preview，不再因追求 star 數追加 dashboard、AI chat、auto-star、mass outreach、登入或外部 mutation。下一個 promotion gate 是：

1. 至少 5 位非 owner 目標使用者完成 hosted session。
2. 至少 3 份可 triage 的回報能指出 hesitation、trust 或 recovery。
3. 再依回報集中處理一個最常卡住的步驟；若沒有人完成，先修 copy／trust，不加功能。

目前的正確行動不是宣稱「爆紅」，而是把每一次真實試用變成可檢查、可修正、可重新驗證的產品證據。這是信用優先的運營邊界。

## Rollback

本輪是單一可逆 commit。若 fresh external sessions 證明新的資訊階層造成理解或完成率下降，可先 `git revert d5c81d8`，再保留前一版 session feedback 與 domain behavior；任何 rollback 前仍需重新跑上述 static 與 browser gates。
