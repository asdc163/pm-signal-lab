# PM Signal Lab — Single-primary-action ownership contract — 2026-08-16

## Problem frame

- **Decision:** Make one visible control own the current workflow action at a
  time. Loaded desktop should act from the source record; loaded mobile should
  act from the fixed bottom bar.
- **User/job:** An international PM should know where to act after reading the
  source lines without comparing identical `Start review` buttons.
- **Current workaround:** The worksheet already exposed a source-row next-step
  action, a loaded hero action, and a mobile fixed action. The controls invoked
  the same state transition, but their repetition made the page read like a
  dashboard rather than a working source sheet.
- **Outcome metric:** In loaded `Collect`, the browser exposes exactly one
  visible `[data-current-action]` control at `390px` and `1440px`; the source
  record remains the visual and action anchor.
- **Evidence:** Fresh local screenshots showed two visible `Start review`
  buttons in the loaded mobile path and two in the loaded desktop path. The
  existing design rule already called for one primary action, so this was a
  concrete implementation mismatch rather than a preference-only change.
- **Unknowns:** Whether source-row placement is the best location for every
  non-owner PM remains unverified until the international pilot runs against a
  current hosted candidate.

## Decision

1. Remove the loaded `Start review` button from the hero `Sheet tally`. The
   tally remains status and trust context only.
2. Keep the desktop `Start review` button in the source-row `Next step` block,
   next to the source object it advances.
3. On viewports at or below `700px`, keep the fixed bottom bar as the only
   primary control. The source-row block keeps its explanation and count, but
   its duplicate button is hidden.
4. Keep the lower `Sheet note` as a text-only next-step reminder on mobile;
   this preserves the question/rule context without adding another action.

This is a layout and action-ownership correction. It does not add a feature,
provider, persistence, analytics, dependency, external mutation, or workflow
step.

## Product and messaging contract

- **Message job:** Tell the PM what the source record is ready for next.
- **Source truth:** The sample is deterministic and local-first; the current
  action only changes local worksheet state.
- **Positioning:** A source-linked workpaper, not an AI activity console.
- **Copy architecture:** `Sheet tally` reports state → source rows provide the
  evidence → `Next step` provides the one action.
- **No-AI copy guard:** Do not replace the removed button with progress,
  confidence, assistant, agent, or activity language. The reduction is the
  product signal.

## UX state matrix

| State | Desktop / tablet | Mobile | Acceptance rule |
| --- | --- | --- | --- |
| Blank worksheet | Existing sample and own-signal entry paths | Existing fixed first action | No loaded action rule changes the empty state. |
| Loaded Collect | One `Start review` in source-row `Next step`; hero tally is status only | One `Start review` in fixed bottom bar; source-row copy is explanatory | Exactly one visible current action; source line remains readable. |
| Verify / Decide / Ship | Existing step-specific action ownership remains | Existing fixed bar owns the current action; lower context remains text-only | No new duplicate action is introduced in later steps. |
| Reset / refresh | Existing clean empty state | Existing clean empty state | No stale action or hidden duplicate remains after recovery. |

## Engineering boundary

- **Changed surfaces:** `src/App.tsx`, `src/styles.css`, and the committed
  `scripts/verify-source-sheet-truth.py` browser oracle.
- **State flow:** Existing `nextAction` and state transitions remain the source
  of truth. Only render ownership changes; no callback or domain model is
  duplicated.
- **Responsive rule:** The existing `700px` breakpoint owns the mobile
  duplicate suppression. The desktop source-row control remains visible.
- **Accessibility:** Hidden duplicate controls are removed from the rendered
  accessibility tree by `display: none`; the remaining visible control keeps
  its existing label, focus path, and `data-current-action` marker.
- **Out of scope:** native VoiceOver/NVDA/TalkBack speech, physical-device
  touch behavior, hosted deployment, participant comprehension, telemetry,
  adoption, and star movement.

## Verification gate

- Keep the existing Vitest, TypeScript, build, local hosted-copy, session
  boundary, responsive, semantic, edge, and source-truth checks green.
- Extend the source-truth browser oracle to assert one visible current action
  at `390×844` and `1440×1000`.
- Inspect fresh custom mobile and sample desktop screenshots for a single red
  action, clear source-row anchoring, no overflow, and no new AI-like status
  layer.
- Record the canonical hosted URL as blocked until an explicitly approved
  merge/deploy and a fresh HTTPS readback.

## Risk and rollback

- **Risk:** A user may prefer the upper action for quick access, or a hidden
  mobile source-row control may be mistaken for a missing feature.
- **Mitigation:** The source-row action remains prominent on desktop; the
  fixed mobile bar stays visible and names the action; the source-row text
  still explains why the action is next.
- **Rollback:** Revert the focused App/CSS/oracle commit. No migration,
  permission, dependency, or external-state cleanup is needed.

## Evidence boundary

This contract can prove action-count and placement invariants in the local
browser candidate. It cannot prove that all non-owner PMs prefer the selected
placement, that the hosted Pages bundle is current, that native assistive
technology announces the same behavior, or that the product will gain users or
GitHub stars.
