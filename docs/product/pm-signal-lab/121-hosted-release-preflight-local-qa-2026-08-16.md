# Hosted release preflight local QA

Date: 2026-08-16
Candidate: `959a161702e2598f1c3f2d2c8187bd9e5e8754fa`
Branch: `codex/less-ai-editorial-sheet`
PR: [#44](https://github.com/asdc163/pm-signal-lab/pull/44)
Status: preflight evidence recorded; merge and public deployment not approved

## Result

The candidate is internally consistent through the Pages artifact layer. The
same code was built with the workflow's `VITE_BASE_PATH=/pm-signal-lab/`, then
served from a temporary static root that maps `/pm-signal-lab` to `dist`. The
hosted verifier found HTTP 200 HTML, the current English-first copy, and both
hashed assets at the project-site path.

This is not yet canonical hosted evidence. The real Pages URL still serves the
previous `main` bundle because PR #44 has not been merged. The canonical check
continues to fail with:

```text
Hosted demo verification failed: Current hosted JavaScript is missing: Start with a source line
```

## Evidence

| Layer | Command / observation | Result |
| --- | --- | --- |
| PR state | `gh pr view 44` | Open, Draft, `mergeStateStatus=CLEAN`, head `959a161`, CI `verify` success |
| Main/runtime divergence | GitHub API `commits/main` | `main` remains `040c7a4`; canonical is expected to be the prior bundle |
| Pages workflow | `.github/workflows/deploy-pages.yml` | Push to `main` triggers build with `VITE_BASE_PATH=/pm-signal-lab/`, upload, and deploy |
| Pages artifact build | `VITE_BASE_PATH=/pm-signal-lab/ npm run build` | Vite 7.3.6 passed; `index-BDhoeK6X.js` and `index-DAgo-i-P.css` emitted |
| Project-site static readback | Temporary static root `/pm-signal-lab → dist` plus `HOSTED_URL=http://127.0.0.1:4181/pm-signal-lab/ npm run verify:hosted` | HTTP 200; JS/CSS both 200; current copy present; stale copy absent; `canonical_https=false` only because this is local |
| Vite preview diagnostic | `HOSTED_URL=http://127.0.0.1:4180/pm-signal-lab/ npm run verify:hosted` | Failed because Vite preview served `/pm-signal-lab/assets/...` as fallback HTML; this is a test-harness mapping limitation, not the Pages artifact result |
| Canonical readback | `HOSTED_URL=https://asdc163.github.io/pm-signal-lab/ npm run verify:hosted` | Blocked/stale: current JS missing `Start with a source line` |
| Local behavior baseline | Existing local QA artifacts for `959a161` | Source record, keyboard workflow, recovery, responsive, semantic, and visual gates remain locally passed |
| Chrome Extension route | Current tool surface inspection | Blocked: no callable Codex Chrome Extension control surface in this runtime; no tab was claimed or opened |

## Release approval boundary

Merging PR #44 changes `main` and triggers a public GitHub Pages deployment.
That is a public, externally visible action. It has a clear rollback path by
reverting the merge commit and redeploying, but it still requires current
explicit approval before execution.

The following are ready as preconditions:

- exact candidate SHA and PR recorded;
- CI success on the exact head;
- root-path local code gates previously passed;
- Pages-base-path artifact build passed;
- project-site path static asset mapping passed;
- current canonical stale failure recorded;
- release/rollback contract written.

The following must happen after approval:

1. Merge PR #44.
2. Capture merge SHA and Pages deploy run.
3. Wait for Pages deployment success.
4. Run the canonical HTTPS verifier until it passes against the deployed copy.
5. Run the canonical browser flow and record exact URL, viewport, visible
   result, console errors, request failures, and screenshots.
6. Update the release manifest and pilot distribution status from that evidence.

## Not covered by this preflight

- Codex Chrome Extension behavior: blocked before tab control was available.
- Native VoiceOver/NVDA/TalkBack speech and assistive-technology task
  completion: not executed.
- Five unguided non-owner international PM sessions: no participant evidence
  collected.
- Adoption, traffic, retention, referrals, forks, issues from real users, and
  GitHub stars: not inferred from CI, local screenshots, or repository commits.
- Whether the latest visual direction feels less AI-like to target PMs: local
  design inspection passed its stated composition guard, but real preference
  evidence is still missing.

## Next gate

Keep PR #44 Draft and keep the international pilot on hold until the merge /
deploy action is explicitly approved. Once canonical hosted evidence exists,
the next product gate is not another speculative feature; it is five unguided
PM sessions plus a separate Chrome Extension/AT evidence pass.
