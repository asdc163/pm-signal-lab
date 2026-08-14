# PM Signal Lab：Inline Claim Editor Release Audit — 2026-08-15

## Release decision

結論：`public preview slice` 通過；`Chrome Extension sign-off`、assistive technology、真人 usability、adoption、model quality 與 GitHub growth **不通過／未宣稱**。

本輪把 claim 編輯從瀏覽器原生 prompt 改成來源旁的 inline editor，並把 local-first 的保存邊界改成使用者看得懂的 literal copy：`只留在目前頁面；重新整理會重設`。編輯後仍回到 `需要你確認`，不會自動採用。

- Audited behavior commit：`0d9ca4918be529075ef23726aa177431eb78069d` (`Replace native claim prompt with inline editor`)
- Documentation / current branch head：`d7cc11e09496add9ecb43886afe3a1f552c56feb` (`Document inline editor release evidence`)
- Repository：<https://github.com/asdc163/pm-signal-lab>
- Canonical demo：<https://asdc163.github.io/pm-signal-lab/>
- QA blocker report：[`18-chrome-extension-a11y-blocked-qa-report-2026-08-15.md`](./18-chrome-extension-a11y-blocked-qa-report-2026-08-15.md)
- Scope：`src/App.tsx`、`src/styles.css`、`src/domain/export.ts`、公開說明文件、inline editor contract、fresh screenshot 與 blocked QA report

## Product change

- `編輯判斷` 由 `window.prompt` 改為 inline labelled textarea。
- 儲存前提供 helper；空白輸入顯示 field-level error 並保留 editor；取消不改變 claim。
- 有效儲存只修改 claim text，保留 source mapping／limitation，並將 `edited: true`、`reviewed: true`、`status: review` 留在 domain state。
- UI 與 decision memo 都明示內容只留目前頁面，重新整理會重設；沒有登入、外部 provider、telemetry、GitHub mutation 或自動送出。
- 未新增 AI rewrite、confidence、provider、批次編輯、autosave、auth 或外部同步。

## Completion Evidence Packet

### 1. Static and documentation gates

Fresh run in the audited worktree before push:

| Gate | Result |
| --- | --- |
| `npm test -- --run` | exit 0；4 test files、9 tests passed |
| `npm run lint` | exit 0；TypeScript no-emit clean |
| `npm run build` | exit 0；Vite production bundle built |
| `git diff --check` | exit 0 |
| Product QA report score | `100.0 / 100`；strong；blocked and untested layers explicitly labelled |
| Private boundary | `docs/github-star-growth-plan.md` remained untracked and was not staged or pushed |

### 2. Local fallback browser evidence

Fresh owner-run fallback with Playwright 1.62.1 against `http://127.0.0.1:5175/`. This is engineering/browser evidence, not Codex Chrome Extension or screen-reader evidence.

| Path | Observed evidence |
| --- | --- |
| Normal | `先看來源，再決定下一步`；inline form count `1`；label `編輯判斷文字`；focus `claim-edit-claim-next-step-friction` |
| Empty | error `判斷不能是空白；請保留一句可以被回看的說法。`；form remains `1`；original claim remains visible |
| Valid save | edited text visible；status still `需要你確認`；mapped source count `2`；limitation remains visible |
| Reopen / cancel | textarea reopens with saved text；cancel closes editor；saved text remains |
| Keyboard | textarea → `取消` → `儲存判斷` via Tab |
| Desktop | `scrollWidth 1440 / clientWidth 1440`；console/page errors `0 / 0` |
| Mobile 390 | `scrollWidth 390 / clientWidth 390`；buttons `266 × 44px` each；stable label/helper relation；console/page errors `0 / 0` |
| Refresh | first-run returns；sample button count `1`；edited claim count `0`；boundary copy visible |

Fresh visual artifacts:

- [`inline editor 1440`](./assets/qa/inline-editor-1440.png)
- [`inline editor 390`](./assets/qa/inline-editor-390.png)

These screenshots prove rendered states in the local fallback runtime. They do not prove cross-device rendering, spoken output, general usability or Chrome profile behavior.

### 3. GitHub and Pages evidence

The public pushes were read back after `git push origin main`:

- Push: `03cc873..0d9ca49 main -> main` succeeded.
- CI run `31835005257`: `success` for behavior commit `0d9ca4918be529075ef23726aa177431eb78069d`.
- Deploy hosted demo run `31835005188`: `success`; deploy job `94879239449` completed all steps for the behavior commit.
- Push: `0d9ca49..d7cc11e main -> main` succeeded.
- CI run `31835217935`: `success` for documentation commit `d7cc11e09496add9ecb43886afe3a1f552c56feb`.
- Deploy hosted demo run `31835217895`: `success`; deploy job `94879908433` completed all steps for the current branch head.
- Canonical HTTP: `HTTP/2 200`。
- Pages `Last-Modified`: `Fri, 14 Aug 2026 19:49:47 GMT`。
- Hosted HTML bundle: `/pm-signal-lab/assets/index-Cm2JtHi8.js` and `/pm-signal-lab/assets/index-CxD14fWd.css`。
- Hosted bundle readback contains `編輯判斷文字`、`來源與限制會保留`、`只留在目前頁面；重新整理會重設` 與 `內容只留在目前這個頁面；重新整理會重設`。

### 4. Hosted fallback browser evidence

Fresh owner-run fallback browser against the canonical URL after Pages deploy:

- Title：`PM Signal Lab — 產品訊號到決策`。
- Hero：`先看來源，再決定下一步`。
- Desktop normal → empty save → valid save → reload completed；empty error exact text matched；saved claim visible；mapped source count `2`；reload removed edited claim as designed。
- Desktop `scrollWidth 1440 / clientWidth 1440`；console/page errors `0 / 0`。
- Mobile hosted viewport `390 × 844`；`scrollWidth 390 / clientWidth 390`；editor focus entered stable textarea；both controls `44px` high；console/page errors `0 / 0`。

Hosted fallback evidence still does not equal a Chrome Extension sign-off. The separate blocked report records that route boundary.

### 5. Public repository snapshot after push

Read from GitHub API after the push:

- Stars：`0`
- Forks：`0`
- Open issues：`4`
- Default branch latest commit：`d7cc11e09496add9ecb43886afe3a1f552c56feb`；產品行為仍由上一個 audited behavior commit `0d9ca4918be529075ef23726aa177431eb78069d` 提供。

This is a current snapshot, not a growth metric or forecast. No one was auto-starred, followed, messaged, liked, mass-replied to or represented as an adopter.

## Verified in this audit

- Current code and public docs are aligned on inline editing and refresh reset.
- Domain tests, typecheck, production build, whitespace gate and QA report score.
- Local fallback browser normal／empty／save／cancel／reopen／keyboard／390px／refresh paths.
- GitHub commit, CI, Pages deployment, canonical HTTP, bundle readback and hosted fallback browser paths.
- Fresh local visual captures for desktop and mobile editor states.

## Not verified / not a release claim

- Codex Chrome Extension tab control；本輪 control surface unavailable，見 blocked report。
- VoiceOver、NVDA、TalkBack、browser zoom 200%、high contrast 與 spoken live-region behavior。
- iOS／Android physical-device behavior、virtual keyboard、native share 或 low-bandwidth behavior。
- Five non-owner PM／founder／designer／engineer sessions and three triageable feedback reports。
- General usability、retention、conversion、traffic、adoption、viral distribution 或 GitHub star growth。
- External AI provider、model quality、prompt quality、RAG groundedness、latency、cost 或 observability；v0 intentionally has no provider。
- Formal security／supply-chain review beyond the existing repo and CI boundary。

## Release / learning decision

保持 public preview，讓這個 slice 先被真實 PM 使用。下一個 promotion gate 是：

1. 至少 5 位非 owner 目標使用者完成 hosted session。
2. 至少 3 份 feedback 能指出 hesitation、trust 或 recovery 問題。
3. 依回報決定只修一個最常卡住的地方，再重新跑相同 evidence packet。
4. 在這些證據出現以前，不加入 provider、analytics、登入、外部 mutation、auto-operation 或為了星數而做的空泛功能。

## Rollback

本輪是單一可逆 commit。若非 owner sessions 顯示 inline editor 造成理解或完成率下降，可 `git revert 0d9ca4918be529075ef23726aa177431eb78069d`，再重新執行 static、local fallback、hosted smoke 與 feedback gate；Chrome／AT blocker 不會因 rollback 自動解除。
