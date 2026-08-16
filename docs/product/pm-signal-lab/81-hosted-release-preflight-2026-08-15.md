# PM Signal Lab — Hosted Release Preflight — 2026-08-16

## Release decision

**HOLD — ready for explicit approval, not merged or deployed.**

This preflight separates the reviewable English-first quiet-workpaper and
Less-AI margin-note/evidence-state slice from the currently deployed GitHub Pages
bundle. It is intentionally a release gate, not a deployment claim. The
public action changes `main` and publishes a new GitHub Pages artifact, so it
requires an explicit approval at the point of action.

## Candidate release identity

| Item | Current evidence |
|---|---|
| Repository | `asdc163/pm-signal-lab` |
| Branch | `codex/less-ai-editorial-sheet` |
| Candidate code commit | `190b56d` — `Reduce remaining dashboard status chrome` |
| CI-verified product/evidence head | `190b56d` — the reviewed Less-AI margin-note/evidence-state surface plus the built-hosted-surface gate; CI run `31930211008` is green |
| Pull request | [#44 — Reframe PM Signal Lab as an editorial case sheet](https://github.com/asdc163/pm-signal-lab/pull/44) |
| Base reference | `origin/main` at `040c7a4` when this slice was scoped |
| Release surface | `https://asdc163.github.io/pm-signal-lab/` |
| Locale | English-first `en-US` |
| New external dependency/provider | None |
| New account, API key, telemetry, upload, or GitHub mutation | None |

The private growth plan at `docs/github-star-growth-plan.md` is intentionally
not part of this candidate and remains untracked/private.

## Current hosted baseline — observed before release

The canonical URL currently returns HTTP 200, but it does not serve candidate
commit `190b56d`:

| Check | Observed result |
|---|---|
| Canonical transport | HTTP/2 200; HTTPS and HSTS present |
| Last modified | `Sat, 15 Aug 2026 11:24:21 GMT` |
| Served JavaScript | `assets/index-Dsf3PwUA.js` |
| Served CSS | `assets/index-DS1sFMTX.css` |
| Hosted verifier | **FAIL as expected** — readback at `2026-08-16T05:57:44Z`; current hosted JavaScript is missing `Start with a source line` |
| Interpretation | The deployed site is an older valid release; the candidate is not live |

The failed hosted verifier is evidence of version skew, not evidence of a
candidate product defect. It must become a PASS only after the candidate is
merged, Pages deploy completes, caches settle, and the canonical URL is checked
again.

## Preconditions before merge or deploy

All of the following must be true at the moment of release:

- [x] Candidate is isolated on `codex/less-ai-editorial-sheet`.
- [x] Local tests, typecheck, production build, diff check, and local static
  verifier pass for `190b56d` — 4 files / 11 tests; current assets
  `index-BIy0pwdG.js` and `index-CoOWk135.css`.
- [x] The machine-readable QA evidence manifest validates, and it keeps local
  pass, hosted blocked, native AT out of scope, and participant/adoption gaps
  separate.
- [x] Experiment drafting is blocked until at least one claim has an explicit
  human review state; accepted, edited, hypothesis, and missing-evidence
  outcomes remain visible.
- [x] Owner-run Chrome evidence covers the pre-fix blank → sample → source →
  claim → test → Ship path, keyboard skip link, mobile fixed action, and
  Chrome AX tree.
- [x] Fresh headless Chrome CDP fallback evidence confirms the current
  Less-AI margin-note/evidence-state surface at `390×844`, the tablet
  `1024×900` state, and the desktop `1440×900` composition; the local fallback
  flow, edge recovery, source disclosure, keyboard first Tab, screenshot,
  semantic, and same-origin resource checks are recorded in
  `103-less-ai-margin-note-and-evidence-state-local-qa-2026-08-16.md`.
- [ ] Fresh preferred Chrome Extension evidence must still confirm the same
  current candidate in the existing Chrome session; the Mac was locked, so
  this route remains `未驗證`.
- [x] The public/private boundary is preserved; the private star plan is not
  staged or published.
- [x] PR #44 CI is green for the reviewed product/evidence head `190b56d`; run `31930211008`
  completed Test, Typecheck, Build, and the built hosted-surface verifier
  successfully.
- [ ] The user explicitly approves the public merge/deploy action.

The unresolved items are intentionally kept separate. A local fallback pass
does not authorize a public release or prove hosted behavior.

## Impact and rollback

### Impact

Merging PR #44 into `main` will trigger the repository's GitHub Pages deploy
workflow. Visitors may receive the new editorial copy and layout after the
deploy and cache window. The candidate does not introduce a provider, login,
database, telemetry, external submission, or automatic GitHub write.

### Rollback

If the canonical smoke or hosted browser trace fails after release:

1. Stop promotion and record the failing URL, served asset hash, browser state,
   and workflow run.
2. Revert the merge on `main` with the merge commit as the target; do not
   rewrite history or delete the branch.
3. Wait for the Pages deploy to complete.
4. Rerun the canonical verifier and the hosted Chrome desktop/mobile trace.
5. Keep the candidate branch open until the failure is understood.

No rollback action has been performed in this preflight.

## Post-approval release runbook

After explicit approval, execute these steps in order and retain raw output:

1. Confirm PR #44 is open, clean, and CI-green at action time, and that its
   current head contains the reviewed product candidate `190b56d` plus the
   built-hosted-surface gate. Treat the CI run recorded above as evidence for
   this reviewed product surface, not as a substitute for the action-time
   release check.
2. Merge PR #44 into `main` using the repository's normal review path.
3. Watch the merge CI and Pages deployment workflows to successful completion.
4. Run:

   ```bash
   HOSTED_URL=https://asdc163.github.io/pm-signal-lab/ npm run verify:hosted
   ```

5. Confirm the canonical HTML serves the candidate hashed assets, all current
   strings are present, all stale strings are absent, and the result reports
   `canonical_https=true`.
6. Use a fresh Codex Chrome Extension tab against the canonical URL at desktop
   and `390×844` mobile sizes. Re-run the blank → sample → source → Verify →
   Decide → Ship path, keyboard skip link, mobile action, console/request
   checks, and Chrome accessibility tree. Include the post-fix mobile status
   measurement; do not reuse the pre-fix screenshot as proof.
7. Only after those checks pass, update a new hosted release audit with the
   merge SHA, Pages run, verifier timestamp, served asset hashes, and exact
   browser evidence.

The release is not `live`, `verified`, or `ready` until steps 4–7 have current
canonical evidence. A GitHub Actions `success` state alone is insufficient.

## Not covered by this gate

- Native VoiceOver, NVDA, TalkBack, real-device touch, zoom, or reduced-motion
  certification.
- Non-owner international PM comprehension or five completed pilot sessions.
- Live model quality, retrieval freshness, prompt-injection resistance,
  provider failure, cost, latency, or safety evaluation.
- Adoption, traffic quality, retention, referrals, or GitHub-star movement.
- Any claim that the project is viral or guaranteed to reach 10,000 stars.

The next learning gate remains five unguided international sessions and at
least three concrete, privacy-safe field notes. The existing English-first
session kit and public pilot issue are prepared; no participant evidence is
invented here.
