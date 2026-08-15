# First-run action visibility contract

Date: 2026-08-15
Product: PM Signal Lab
Audience: international PMs, founders, product designers, and product engineers
Status: local implementation complete; hosted verification pending

## Problem frame

The case-file direction made the product job legible, but the first useful action was still too far down the page in a normal 1280×720 laptop viewport. On the empty mobile state, the sticky action bar was intentionally hidden, so a first-time visitor had to scroll to find the sample path.

- User/job: a first-time international visitor needs to understand the worksheet and start a five-minute sample run without a maintainer walkthrough.
- Friction: the page communicates the job before it exposes the first action.
- Decision: put `Load sample data` in the empty case-status block on desktop and keep it in the mobile bottom action bar at responsive widths.
- Secondary path: keep `Add your own signal` in the central empty case file; it remains available without competing with the sample path.
- Boundary: this improves reachability, not comprehension or adoption. Real user sessions remain required.

## Design and product rules applied

- First read: product job, current case state, and one primary action.
- State before decoration: the action belongs to the empty case status, not a generic hero CTA.
- One next action: desktop exposes one visible sample CTA; the central case keeps only the manual alternative.
- Responsive reflow: the same action remains available in the mobile sticky action bar.
- No-AI guard: no assistant language, fake progress, model status, or inferred recommendation was added.

Relevant knowledge-base principles:

- `foundations/design-composition-layout.md`: first read, primary action, and breakpoint reflow.
- `foundations/design-rule-hierarchy.md`: accessibility and operation outrank visual preference.
- `foundations/product-craft-anti-ai-slop-operating-system.md`: product truth and state completeness matter more than AI decoration.
- `foundations/product-messaging-copy-operating-system.md`: use concrete job language and a single next move.
- `foundations/anti-ai-writing-tells.md`: remove generic promotional framing from the action surface.

## Acceptance criteria

1. At a normal desktop viewport, a visible `Load sample data` button appears in the empty case-status block before the central empty panel.
2. At 390×844, the empty state exposes a visible bottom action bar with `Load sample data`.
3. `Add your own signal` remains available as the secondary manual route.
4. Activating either sample action loads the existing deterministic fixture and produces four source rows without changing the local-only boundary.
5. The action remains a native, named button and works through keyboard activation.
6. The changed surface has no horizontal overflow and does not add a provider, telemetry, login, or external mutation.

## Out of scope

- Real-user comprehension or conversion.
- Formal Codex Chrome Extension, VoiceOver, NVDA, or TalkBack sign-off.
- Any new AI provider, persistence layer, analytics event, or public submission behavior.

## Rollback

Revert the small action-visibility commit. The previous case-file shell and hosted release remain the fallback surface.
