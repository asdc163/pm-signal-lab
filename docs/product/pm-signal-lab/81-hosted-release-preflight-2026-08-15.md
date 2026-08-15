# PM Signal Lab — Hosted Release Preflight — 2026-08-15

## Release decision

**HOLD — ready for explicit approval, not merged or deployed.**

This preflight separates the reviewable English-first editorial case-sheet
change from the currently deployed GitHub Pages bundle. It is intentionally a
release gate, not a deployment claim. The public action changes `main` and
publishes a new GitHub Pages artifact, so it requires an explicit approval at
the point of action.

## Candidate release identity

| Item | Current evidence |
|---|---|
| Repository | `asdc163/pm-signal-lab` |
| Branch | `codex/less-ai-editorial-sheet` |
| Candidate commit | `d6cceaa` — `Reduce repeated case-sheet chrome` |
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
commit `d6cceaa`:

| Check | Observed result |
|---|---|
| Canonical transport | HTTP/2 200; HTTPS and HSTS present |
| Last modified | `Sat, 15 Aug 2026 11:24:21 GMT` |
| Served JavaScript | `assets/index-Dsf3PwUA.js` |
| Served CSS | `assets/index-DS1sFMTX.css` |
| Hosted verifier | **FAIL as expected** — current hosted JavaScript is missing `Start with a source line` |
| Interpretation | The deployed site is an older valid release; the candidate is not live |

The failed hosted verifier is evidence of version skew, not evidence of a
candidate product defect. It must become a PASS only after the candidate is
merged, Pages deploy completes, caches settle, and the canonical URL is checked
again.

## Preconditions before merge or deploy

All of the following must be true at the moment of release:

- [x] Candidate is isolated on `codex/less-ai-editorial-sheet`.
- [x] Local tests, typecheck, production build, diff check, and local static
  verifier pass for `d6cceaa`.
- [x] Fresh owner-run Chrome evidence covers blank → sample → source → claim →
  test → Ship, keyboard skip link, mobile fixed action, and Chrome AX tree.
- [x] The public/private boundary is preserved; the private star plan is not
  staged or published.
- [ ] PR #44 CI is green for the final pushed candidate commit.
- [ ] The user explicitly approves the public merge/deploy action.

The last two items are intentionally unresolved. A local pass does not
authorize a public release or prove hosted behavior.

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

1. Confirm the PR head is `d6cceaa` and PR #44 is open, clean, and CI-green.
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
   checks, and Chrome accessibility tree.
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
