# PM Signal Lab — Static loading marker contract — 2026-08-16

## Problem Frame

- **Decision:** Replace the rotating loading icon with a static worksheet
  marker and keep the literal loading boundary.
- **User/job:** An international PM should know that a deterministic worksheet
  is opening without reading the interface as a model-thinking surface.
- **Outcome metric:** The loading state is understandable, non-animated, and
  recoverable; the sample action is disabled during the transition and the
  resolved worksheet is clean.
- **Evidence:** The current source uses a generic rotating `Activity` icon for
  a fixed local fixture transition; current browser evidence will verify the
  static marker, clean transition, and absence of browser errors.
- **Unknowns:** Real-user interpretation, native assistive-technology output,
  and canonical Pages behavior remain unverified in this local slice.

## Decision

Use a static worksheet marker while the deterministic sample pack opens. Keep
the literal loading message, `aria-busy` state, and disabled sample action;
remove the rotating `Activity` icon and its animation because the product has
no model generation or measurable progress to represent.

This is a small trust and visual-language correction. It does not add a
feature, provider, dependency, data path, telemetry, persistence, or external
action.

## Product contract

- **User/job:** An international PM should understand that the sample worksheet
  is opening, without interpreting the interface as a model thinking or
  generation surface.
- **Problem:** The previous loading state used a continuously rotating generic
  activity icon during a fixed 260ms local fixture transition. The motion did
  not communicate progress, cancellation, or model work.
- **Outcome:** The loading state reads as a worksheet transition and remains
  honest about what the product is doing.
- **Success signal:** A fresh browser trace sees the named loading heading, a
  disabled sample action, and a clean transition to the source record; the
  loading marker has no animation class or animation rule.
- **Constraints:** English-first, local-first, deterministic fixture, no
  external model, no upload, no login, no backend, no telemetry, no automatic
  GitHub action, and no deployment or merge in this slice.
- **Out of scope:** New PM features, provider integration, progress reporting,
  visual redesign of the source record, native assistive-technology sign-off,
  real-device sign-off, hosted Pages verification, and adoption evidence.

## KB Application Contract

- **Relevant KB:** The design, anti-AI, and behavioral-QA principles below are
  applied because this change affects a trust-critical loading state, not just
  a decorative icon.

- **Product truth before decoration:** the visual marker names the actual
  object being opened — a worksheet — rather than implying invisible model
  activity.
- **Design rule hierarchy:** trust, state completeness, accessibility, and
  recovery remain intact; motion is removed only where it has no product
  meaning.
- **Anti-AI-slop rule:** no simulated thinking, generated progress, or generic
  activity theatre. The source rows and review boundary remain the product
  signature.
- **Composition rule:** loading remains a short state panel in the existing
  workpaper spine; it does not become a new status card or progress dashboard.
- **Behavioral QA rule:** verify normal loading, repeated-click friction,
  recovery to a clean worksheet, keyboard-visible controls, and the absence of
  browser errors at the local production preview.
- **Why it applies:** this slice changes a trust-sensitive state where a
  generic animation can imply a capability the deterministic fixture does not
  have; a static worksheet marker makes the visible behavior match the actual
  local transition.

## Scope and acceptance criteria

### Files/surfaces

- **Create:** no new runtime surface; create the contract and focused QA record
  under `docs/product/pm-signal-lab/`.
- **Modify:** `src/App.tsx`, `src/styles.css`, `scripts/verify-session-boundary.py`,
  `README.md`, and `DESIGN.md` as needed to record the current candidate.
- **Test:** local production preview, the focused browser oracle, normal and
  edge browser traces, Vitest, TypeScript lint, Vite build, and hosted-copy
  verifier.
- **Observe:** fresh empty sheet → sample loading → loaded source record;
  mobile `390×844`, tablet `1024×900`, and desktop `1440×900`; loading marker
  visibility, CSS animation name, disabled action, focus, overflow, and
  browser/request errors.

### Task sequence

#### Step 1 — Replace the loading marker

- [ ] Replace the loading-only `Activity` icon with the existing static
  `ClipboardList` worksheet icon in `src/App.tsx`.
- **Expected:** the loading DOM has a visible worksheet marker, the literal
  heading, and no `spin` class.

#### Step 2 — Remove unused animation

- [ ] Remove the `.spin` rule and `@keyframes spin` from `src/styles.css`.
- **Expected:** the computed animation name for the loading marker is `none`;
  the rest of the motion/reduced-motion rules remain unchanged.

#### Step 3 — Pin the browser oracle

- [ ] Extend `scripts/verify-session-boundary.py` to assert marker visibility,
  the marker class, and the computed animation name while loading.
- **Expected:** the oracle fails if the generic rotating marker returns, and
  passes with `loading_marker_animation: "none"`.

#### Step 4 — Record current evidence

- [ ] Add the focused QA report and point the current README and design notes
  at the contract and report.
- **Expected:** a reader can distinguish local evidence from the stale
  canonical Pages bundle and from real-user/adoption evidence.

### Acceptance criteria

- The loading state contains `Opening the sample worksheet` and the literal
  local-boundary explanation.
- The sample action is disabled while the transition is active.
- The manual form is hidden during and after the sample transition.
- The source record opens with no stale disclosure or claim selection.
- The loading marker is static; no `spin` class, `@keyframes spin`, or loading
  animation is present in the built surface.
- The focused browser oracle, normal flow, edge flow, tests, lint, build, and
  local hosted verifier pass.
- No claim is made about the canonical Pages URL until it serves this
  candidate, and no claim is made about real PM comprehension or adoption.

## UX state matrix

| State | User sees | Required behavior |
| --- | --- | --- |
| Fresh empty sheet | `Open the sample worksheet` | Action is enabled; no loading marker is present. |
| Loading | Static worksheet marker, `Opening the sample worksheet`, local boundary | Action is disabled; manual form is closed; repeated clicks do not create duplicate transitions. |
| Loaded | Four source rows and `Start review` | Source record is the visual anchor; no loading marker remains. |
| Reset | Empty sheet and `Sheet cleared` | Previous form, expanded source, claim selection, and brief state are gone. |
| Error fallback | Named error and usable empty sheet | No blank screen; the user can retry or add a signal. |

This covers the first-time, empty, loading, error, recovery, mobile,
accessibility, and trust states. The loading marker has no progress claim; the
existing live-region and disabled-action semantics remain the user-facing
gate.

## UX/AI/security gate

The product has no model/provider action in this slice. The user-facing gate is
the first-time, empty, loading, error, recovery, mobile, accessibility, and
trust state behavior described above.

- Keep `aria-live="polite"`, `aria-busy="true"`, the named loading heading,
  and the disabled sample action.
- Do not introduce a secret, permission, network call, external transfer,
  progress claim, model-quality claim, or automatic GitHub action.
- Preserve the existing form-close, reset, focus, and source-disclosure
  recovery behavior.

## Verification plan

- Static checks: `rg` for `Activity`, `.spin`, and `@keyframes spin`; inspect
  the rendered loading DOM.
- Browser: local production preview at `390×844`, including manual-form →
  sample loading, repeated-click guard, loaded source record, expanded source
  → reset → clean sample, and the full Collect → Verify → Decide → Ship flow.
- Responsive: rerun the existing 390px, 1024px, and 1440px traces for overflow,
  focus, named controls, and one mobile primary action.
- Build gates: Vitest, lint, production build, diff check, and local hosted
  verifier.

## Evidence boundary

This contract can prove that the local deterministic loading state is honest
and stable. It cannot prove the canonical GitHub Pages bundle, Chrome
Extension behavior, native screen-reader output, physical-device behavior,
real-user comprehension, adoption, traffic quality, or progress toward 10,000
GitHub stars.

## Rollback

Revert the focused commit. No migration, dependency change, permission change,
provider call, or external state change is involved.
