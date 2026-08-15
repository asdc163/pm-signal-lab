# First-run action visibility — hosted release audit

Date: 2026-08-15
Product: PM Signal Lab
Canonical URL: https://asdc163.github.io/pm-signal-lab/
Release SHA: `d7142a53b401de6fda015b4b0cf3a7f337c99326`
CI run: [CI #31856128465](https://github.com/asdc163/pm-signal-lab/actions/runs/31856128465)
Deploy run: [Deploy hosted demo #31856128459](https://github.com/asdc163/pm-signal-lab/actions/runs/31856128459)
Browser route: Codex In-app Browser / Playwright API fallback; the configured Codex Chrome Extension route was not available in this run

## Release decision

`HOSTED PASS for the changed first-run action surface.`

The canonical Pages URL serves the merge commit, and the new desktop and mobile actions work against the hosted application. This is a release-layer result for the changed surface, not a real-user usability, adoption, screen-reader, or star-growth result.

## Deployment evidence

- `git ls-remote origin refs/heads/main` returned `d7142a53b401de6fda015b4b0cf3a7f337c99326`.
- `curl -fsSIL https://asdc163.github.io/pm-signal-lab/` returned `HTTP/2 200` after the Pages deploy; the hosted response last-modified timestamp advanced to the new deploy.
- Hosted HTML returned `lang="en-US"`, title `PM Signal Lab — Product signals to decisions`, and the expected refreshed assets `index-B8jNbZns.css` and `index-D-7VLhXb.js`.
- CI run `31856128465` completed successfully.
- Deploy run `31856128459` completed successfully.

## Fresh hosted browser evidence

### Desktop empty and loaded state

- Opened the canonical URL in a fresh browser tab.
- The empty `Current worksheet status` block exposed a visible `Load sample data` button before the central empty case panel.
- The title remained `PM Signal Lab — Product signals to decisions`.
- Clicking the visible sample action produced 4 `.evidence-row` elements.
- The loaded case showed the existing `Source line → Claim → Smallest test` path and the local-case boundary.
- Browser console inspection returned 0 error/warning messages.

### Mobile 390×844 empty and loaded state

- Set a temporary 390×844 viewport and opened the canonical URL in a fresh state.
- `.mobile-action-bar.is-empty` was visible and contained `Load sample data`.
- Clicking it produced 4 source rows.
- The bottom action changed to `Start review`, preserving the existing next-step behavior.
- Browser console inspection returned 0 error/warning messages for both the empty and loaded states.
- The visual state showed no clipped horizontal action or source content at the tested viewport.

## What this release proves

- The first-run action is reachable at the hosted desktop and mobile breakpoints tested.
- The existing deterministic fixture and local-only boundary survive the new action placement.
- The mobile action transitions from an empty-case start to the existing `Start review` next move.

## What this release does not prove

- No unguided international PM session, native-speaker comprehension, retention, conversion, adoption, or GitHub star growth.
- No formal Codex Chrome Extension QA or native VoiceOver, NVDA, or TalkBack sign-off; this run used the in-app browser fallback.
- No provider quality, latency, cost, model reliability, or external AI behavior; the preview remains deterministic and provider-free.
- No guarantee that moving the action above the fold will increase stars or completion until real user data exists.

## Next evidence gate

Recruit five target users through the pinned [public pilot issue #4](https://github.com/asdc163/pm-signal-lab/issues/4). Record one task result, hesitation, trust signal, recovery observation, and one requested change per session before deciding whether to scale distribution or add another product capability.
