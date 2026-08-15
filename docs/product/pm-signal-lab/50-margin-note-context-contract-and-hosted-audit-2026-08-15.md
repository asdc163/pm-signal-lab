# PM Signal Lab — margin-note context contract and hosted audit

**Date:** 2026-08-15
**Canonical surface:** https://asdc163.github.io/pm-signal-lab/
**Published main SHA:** `9de8dd268414fea5c4b2d4dde0ad67ee2c825da9`
**Pull request:** [#20](https://github.com/asdc163/pm-signal-lab/pull/20)
**Browser route:** Codex Chrome Extension, fresh agent-created tabs, background execution without stealing foreground focus

## Decision

`SCOPED HOSTED PASS / CACHE VERIFIED / LEARNING GATE OPEN`.

The loaded context rail now behaves like a margin note instead of a generic dashboard strip. It keeps the source-to-decision question, the actual work-set record, evidence rule, carry-forward state, and next action close to the workpaper without presenting a row of KPI-like counters. The central workbench still owns the `Start review` action.

This is evidence for one product and visual slice. It is not evidence of external adoption, qualified stars, general usability, AI quality, or a completed 10,000-star outcome.

## Problem frame

### User job

An international PM or product builder has a few raw signal lines and needs to move from source inspection to a reviewable claim without losing the limitation or handing the decision to an opaque system.

### Product problem

The first version of the loaded context rail showed real counts, but the presentation looked like a small SaaS dashboard: `Sources`, `Claims`, and `Reviewed` were visually detached from the source-ledger reading task. That made a deterministic, human-reviewed worksheet feel more AI-product-like than the domain warranted.

### Decision

Use a quiet editorial margin note for orientation and keep the actual counts in one literal `Desk record` sentence. The rail should answer four questions a PM has while reading:

1. What am I looking at?
2. Which source or claim should I challenge next?
3. What rule keeps the evidence honest?
4. Where do I continue the work?

The visual change is deliberately small. It removes unsupported dashboard theatre while preserving the underlying domain state and next action.

### Unknowns kept open

- Whether an external PM understands the product in five seconds without maintainer guidance.
- Whether the margin-note language reduces hesitation in an unguided session.
- Whether the product earns repeat use, referrals, qualified stars, or adoption.
- Whether native assistive technology announces the complete experience as intended.

## Product and design contract

### In scope

- Replace the loaded right-rail count strip with a `Margin note` treatment.
- Keep the true loaded state visible as `Working set active` and `Desk record`.
- Preserve the source-ledger review docket and its central `Start review` action.
- Preserve the visible question, evidence rule, carry-forward state, next move, local boundary, and session trail.
- Keep the English-first, source-adjacent, human-owned wording.
- Verify desktop, mobile, keyboard, refresh recovery, and canonical hosted behavior.

### Out of scope

- Adding an external model provider, chat surface, login, telemetry, or automatic GitHub mutation.
- Replacing the deterministic fixture with invented customer evidence.
- Adding gradients, glass panels, decorative AI activity, confidence scores, or an inflated capability claim.
- Claiming native VoiceOver/NVDA/TalkBack sign-off or real-user research.

### Acceptance criteria

1. Loaded state has one readable margin-note heading: `Keep the source in frame`.
2. The rail reports actual work-set state and counts as prose, not as a detached KPI grid.
3. The central source ledger still ends with `Review docket` and the real `Start review` action.
4. Mobile retains the sticky `Start review` action without horizontal overflow.
5. Enter on the review action performs the same Collect → Verify transition.
6. Refresh returns the local preview to the empty state and does not imply persistence.
7. Local gates, CI, Pages, canonical HTTP, and fresh hosted Chrome behavior are all separately recorded.

## Why this is less AI-like

The product does not need to look more intelligent. It needs to make the PM's responsibility and the evidence boundary easier to see.

- The source ledger remains the dominant visual object.
- The right rail is a reading aid, not a performance dashboard.
- Counts remain available because they describe real session objects, but they are written as a `Desk record` rather than promoted as product proof.
- `Keep the source in frame`, `Which line earns a closer look?`, and `No claim travels without its source.` describe a concrete PM task and evidence rule.
- No fake model activity, generated-confidence language, progress theatre, or automatic decision is introduced.

## Product QA Report

### Environment

- Hosted QA surface: `https://asdc163.github.io/pm-signal-lab/`.
- Browser route: Codex Chrome Extension.
- Chrome context: fresh agent-created tabs; no foreground stealing.
- Browser disabled: not applicable; the configured Chrome Extension route was available.
- Computer Use fallback: not used.
- Forbidden-route check: no Safari, Browser Use, Browserbase/browse.sh, or alternate Chrome DevTools bridge was used.
- Temporary viewports: desktop `1280×900`, mobile `390×844`.
- Fresh shell response: `HTTP/2 200`, document language `en-US`, assets `assets/index-BaHjNzoP.js` and `assets/index-C_8ph3iF.css`.

### Behavior matrix

| user archetype | starting state / job | action performed | success signal | failure signal / recovery |
| --- | --- | --- | --- | --- |
| International PM, first visit | Fresh canonical page; identify what the product is for | Opened a fresh hosted tab and inspected the empty state | `Start with a source`, `Load sample data`, and `Source line → Claim → Smallest test` were present | No external comprehension claim; the visible recovery is to load sample data or add a signal. |
| PM reading a loaded workpaper | Sample loaded; keep source and decision context together | Loaded sample data and inspected the source ledger and right rail | Four source lines, three candidate claims, `Margin note`, `Keep the source in frame`, `Working set active`, and `Desk record` were visible; the old KPI strip was absent | Fixture content is deterministic, not customer evidence. |
| PM starting a claim review | Loaded Collect; begin the next step where the source reading ends | Selected the central `Start review` action | `02 · Verify` and `Check the claim against the line` appeared; focus landed on `Draft smallest experiment` | If no claims exist, the product offers `Add a signal`; it does not imply that an export is ready. |
| Keyboard user | Loaded Collect with the central review action available | Used `locator.press("Enter")` on `Start review` | Enter produced the same Collect → Verify transition and the next action remained focusable | Native screen-reader announcement remains unverified. |
| Mobile PM | Fresh hosted page at `390×844`; load and start the work | Loaded sample, inspected metrics, and selected the sticky `Start review` action | `clientWidth=375`, `scrollWidth=375`, `overflowX=false`; the sticky action opened Verify and focus moved to `Draft smallest experiment` | Native device behavior and assistive technology remain unverified. |
| Low-persistence / privacy-conscious tester | Loaded or reviewed session; test the stated refresh boundary | Reloaded the canonical tab after moving into Verify | The page returned to `No evidence on the desk`; `refresh resets it` remained visible and the old KPI heading was absent | Copy or download remains the recovery path before refresh; no server persistence is implied. |

### Findings

No blocker or high-severity finding was observed for this scoped slice.

#### Resolved cache observation — low / release hygiene

- **Likely user interpretation:** a previously open tab could still look like the prior release even though Pages had deployed the new commit.
- **Hesitation/friction:** the first already-open hosted tab showed the old context copy, so it was not accepted as release evidence.
- **Recovery:** opened a fresh cache-busted tab, then a fresh canonical no-query tab; both loaded the new asset hashes and new margin-note DOM. A fresh shell request also returned the new assets.
- **Trust:** the stale tab was treated as an evidence mismatch, not silently reported as a pass.
- **Severity:** low; GitHub Pages returned `cache-control: max-age=600`, so a previously cached document can briefly lag a successful deployment.
- **Evidence:** fresh canonical browser asset source `assets/index-BaHjNzoP.js`, fresh DOM containing `Keep the source in frame`, no `.context-stats`, and shell `HTTP/2 200` readback on 2026-08-15.
- **Fix brief:** keep hashed assets and re-check a fresh canonical tab after each release; consider a future hosting/cache policy improvement if release propagation becomes a repeated tester complaint.

### Repro Steps

1. Open the canonical URL in a fresh Codex Chrome Extension tab.
2. Select `Load sample data`.
3. Confirm the central source ledger shows four source lines and a `Review docket` with three candidate claims.
4. Confirm the right rail reads `Margin note`, `Keep the source in frame`, `Working set active`, and `Desk record`; confirm there is no `.context-stats` block and no `What needs your attention` heading.
5. Select the central `Start review` button and confirm `Check the claim against the line` appears.
6. Open a fresh `390×844` tab, repeat sample loading, and use the sticky `Start review` action.
7. On a fresh loaded desktop tab, send Enter to the central `Start review` locator and confirm the same Verify transition.
8. Reload a tab after the transition and confirm the empty state and local-only reset boundary.

### Expected vs Actual

| check | expected | actual |
| --- | --- | --- |
| Loaded context | A margin note supports the workpaper without dashboard chrome | `Margin note / Keep the source in frame` appeared; the prior numeric KPI strip was absent. |
| Work-set truth | Counts remain available without being overstated as proof | `Desk record` showed `4 source lines · 3 candidate claims · 0 reviewed.` |
| Central review action | The source ledger owns the next work action | `Review docket` showed `3 candidate claims are waiting for a source check.` and `Start review` worked. |
| Mobile action | The same task remains reachable in the thumb zone | The sticky `Start review` was visible in the `390×844` screenshot and opened Verify. |
| Keyboard | Enter performs the same transition | Verify opened and focus readback was the `Draft smallest experiment` button. |
| Refresh boundary | A local preview resets rather than implying persistence | Reload returned to `No evidence on the desk`; the boundary copy remained visible. |
| Canonical release | The public URL serves the published bundle | Fresh shell and fresh no-query Chrome tab returned the new JavaScript/CSS assets and current DOM. |

## Code, CI, and hosted evidence

| check | result | evidence |
| --- | --- | --- |
| Product tests | PASS | `npm test -- --run`: 4 files, 10 tests passed. |
| Type/lint gate | PASS | `npm run lint`: exit 0. |
| Production build | PASS | `npm run build`: Vite production build completed. |
| Diff hygiene | PASS | `git diff --check`: exit 0 before the public commit. |
| Pull request verification | PASS | [PR #20](https://github.com/asdc163/pm-signal-lab/pull/20), CI run [31863107977](https://github.com/asdc163/pm-signal-lab/actions/runs/31863107977). |
| Main CI | PASS | [Run 31863139578](https://github.com/asdc163/pm-signal-lab/actions/runs/31863139578), main head `9de8dd2…`. |
| Pages deploy | PASS | [Run 31863139562](https://github.com/asdc163/pm-signal-lab/actions/runs/31863139562), deployment completed successfully. |
| Weekly growth pulse | PASS | Read-only dispatch [31863707013](https://github.com/asdc163/pm-signal-lab/actions/runs/31863707013), artifact [`weekly-growth-pulse-31863707013`](https://github.com/asdc163/pm-signal-lab/actions/runs/31863707013/artifacts/9241348904); snapshot remained `1` star, `0` forks, `1` actual open issue, `external_sessions=not_verified`, `adoption=not_verified`, `star_quality=not_inferred`, mode `iterate_recruit`. |
| Canonical HTTP | PASS | Fresh shell response returned HTTP/2 `200`, `en-US`, and the current asset hashes. |
| Hosted browser | PASS | Fresh Codex Chrome Extension tabs passed empty, loaded margin-note, central review, mobile, keyboard, and refresh checks. |

The Pages log contains a non-blocking runner annotation about Node 20 being deprecated and the runner selecting Node 24. The build and deployment completed successfully; the annotation remains a maintenance item rather than being silently ignored.

## Current public growth boundary

The latest direct public repository readback is `1` star, `0` forks, and one actual open pilot issue after excluding pull requests. The profile homepage now points to the hosted preview: https://asdc163.github.io/pm-signal-lab/.

The next meaningful gate remains five unguided international sessions and concrete issue evidence. The repository still does not claim traffic, adoption, retention, referrals, star quality, or a completed 10,000-star outcome. The weekly growth pulse remains read-only and must not be used to manufacture activity.

## Not covered

- Real international PM sessions, five-second comprehension, retention, conversion, referrals, adoption, traffic, and return behavior.
- Native VoiceOver, NVDA, TalkBack, or a formal screen-reader sign-off.
- External AI-provider behavior; the preview remains local-first and provider-free.
- Full decision-brief, download, privacy-gated field-note, and manual GitHub handoff replay in this specific margin-note audit; those paths remain covered by the prior hosted release audit [`48-signal-review-growth-pulse-hosted-release-audit-2026-08-15.md`](./48-signal-review-growth-pulse-hosted-release-audit-2026-08-15.md).
- Any claim that the current repository has 10,000 stars or that the current star represents qualified adoption.

## Next evidence gate

Keep the release in `Iterate / recruit`. Ask five people outside the maintainer account to run the English session kit without a walkthrough. Triage the first concrete hesitation, trust/recovery observation, or requested change, then re-verify the fix at local and hosted layers before promoting the next slice.
