# PM Signal Lab — Current-head release preflight

Date: 2026-08-16 17:39 +08:00
Code candidate under test: `18fcac8a3779d3ff206a4c366b39d4894a4692e8`
Branch: `codex/less-ai-editorial-sheet`
PR: [#44](https://github.com/asdc163/pm-signal-lab/pull/44)
Base `main`: `040c7a4415faf27a881469100c6bb4bcc5076402`
Status: code-candidate local preflight passed; merge, Pages deployment, and pilot distribution remain approval-gated

## Why this receipt exists

The earlier hosted preflight documents [120](./120-hosted-release-and-evidence-gate-contract-2026-08-16.md)
and [121](./121-hosted-release-preflight-local-qa-2026-08-16.md) were recorded
against an earlier PR #44 head, `959a161`. They remain historical evidence for
that point in the branch history. This receipt is the current source of truth
for the tested code candidate `18fcac8`, which includes the first-run
choice-clarity implementation plus its bound QA metadata. The live PR link is
the authority for any later documentation-only head or CI run.

## Current external state

| Surface | Current evidence | Result |
| --- | --- | --- |
| PR #44 | Open, Draft, `mergeStateStatus=CLEAN` at the readback; the live PR link remains authoritative for the moving branch head | PASS |
| Code-candidate CI | [Run 31938819160](https://github.com/asdc163/pm-signal-lab/actions/runs/31938819160), head SHA matches `18fcac8` | PASS |
| Evidence-only follow-up CI | [Run 31939698038](https://github.com/asdc163/pm-signal-lab/actions/runs/31939698038), head `bcfa725` | PASS |
| `main` | `040c7a4415faf27a881469100c6bb4bcc5076402` | Prior release |
| Canonical Pages | `https://asdc163.github.io/pm-signal-lab/` serves the prior bundle | STALE / BLOCKED |
| Private growth plan | `docs/github-star-growth-plan.md` remains untracked | PROTECTED |

## Fresh local evidence

The commands below were run from the code-candidate worktree on 2026-08-16.
The subsequent branch update only changed README/evidence documentation; it
did not change the tested product artifact. These commands prove the local
candidate and the project-site artifact, not the public Pages runtime.

| Layer | Command or observation | Result |
| --- | --- | --- |
| Unit tests | `npm test -- --run` | 4 files, 11 tests passed |
| Typecheck | `npm run lint` | `tsc --noEmit` passed |
| Root build | `npm run build` | Vite 7.3.6 passed; `index-BE5ncM4S.js`, `index-BQbprnIL.css` |
| Root preview | `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` | HTTP 200, `en-US`, current copy present, stale copy absent, assets 200 |
| Pages-path build | `VITE_BASE_PATH=/pm-signal-lab/ npm run build` | Vite 7.3.6 passed; same hashed JS/CSS assets |
| Pages-path static readback | `HOSTED_URL=http://127.0.0.1:4181/pm-signal-lab/ npm run verify:hosted` | HTTP 200, current copy present, stale copy absent, assets 200 |
| Canonical readback | `HOSTED_URL=https://asdc163.github.io/pm-signal-lab/ npm run verify:hosted` | Exit 1, expected stale-bundle failure |

The canonical failure is:

```text
Hosted demo verification failed: Current hosted JavaScript is missing: Start with a source line
```

## Release decision

The candidate is ready for a human merge decision, but it is not a completed
hosted release. Merging PR #44 will change `main` and trigger the Pages deploy
workflow. It requires current explicit approval because it changes public
runtime state.

If approved, the action-time sequence is:

1. Merge PR #44 and record the merge SHA.
2. Wait for the Pages deploy run to succeed.
3. Run the canonical HTTPS verifier against the deployed URL.
4. Run the hosted browser flow at the canonical URL and record URL, viewport,
   console errors, request failures, and screenshots.
5. Update the release manifest and pilot status only from that evidence.

Rollback is a revert of the merge commit followed by a new Pages deploy and a
fresh canonical readback. No database migration, provider, login, telemetry,
upload, or external GitHub mutation is part of this release candidate.

## Evidence that this receipt does not cover

- Chrome Extension behavior: blocked because no callable Extension control
  surface is available in the current runtime.
- Native VoiceOver, NVDA, TalkBack, or equivalent screen-reader speech:
  not executed.
- Physical-device behavior and assistive-technology task completion: not
  executed.
- Five unguided non-owner PM sessions: not executed.
- Adoption, retention, referrals, traffic quality, and GitHub star growth:
  unverified.
- Third-party Agent Skills-compatible client loading: not executed for the
  separate `pm-source-to-test` candidate in PR #43.

This receipt intentionally keeps the local, hosted, browser, accessibility,
participant, and growth evidence layers separate.
