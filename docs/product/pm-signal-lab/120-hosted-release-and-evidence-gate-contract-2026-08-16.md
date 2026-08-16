# Hosted release and evidence gate contract

Status: local preflight contract for PR #44; merge and Pages deployment require
current explicit approval.

## Problem frame

**Decision:** Move the current candidate from a pushed draft branch to a formal
hosted demo only after the exact Pages artifact, canonical HTTPS readback, and
browser evidence agree on the same commit. In parallel, keep Chrome Extension,
native assistive technology, real PM sessions, and adoption evidence as
separate gates instead of treating a deployment as proof of any of them.

**User/job:** An international PM should open the canonical URL and see the
same English-first source-linked worksheet that was locally verified. The
maintainer should be able to point to the exact commit, Pages run, browser
trace, and known limits without overstating product quality or adoption.

**Current workaround:** PR #44 contains the intended candidate at `959a161`,
but `main` and the canonical Pages URL still serve the previous bundle. A
fresh canonical copy check fails because the hosted JavaScript is missing
`Start with a source line`.

**Outcome metric:** After an approved merge, the canonical URL returns HTTP
200 over HTTPS, loads the exact candidate copy and hashed assets, and passes
the hosted static verifier. A release receipt ties `main`, the Pages deploy,
canonical HTML/assets, and the post-deploy browser run to one SHA.

**Evidence boundary:** This can prove release-path consistency and public
runtime behavior. It cannot prove real PM comprehension, reduced AI feel,
accessibility for native screen readers, adoption, or GitHub-star growth.

## KB Application Contract

### Relevant KB

The following sources were read for this release and QA decision:

Each source below states why it applies to the release decision and what
tradeoff it introduces.

- `foundations/design-brain.md` and `foundations/design-rule-hierarchy.md`:
  keep product truth, hierarchy, and explicit state ahead of visual polish.
  The release receipt must distinguish local candidate, hosted runtime, and
  user evidence rather than collapsing them into one status.
- `foundations/product-craft-anti-ai-slop-operating-system.md`:
  concrete source objects and restrained workpaper composition are part of the
  product promise; deployment must not promote an AI-looking shell or claims
  that outrun evidence.
- `foundations/ai-native-ux-operating-system.md`:
  provenance, control, uncertainty, recovery, and human approval remain
  explicit. No provider/model quality is implied by a static fixture release.
- `foundations/behavioral-ux-qa-evidence-gate.md`:
  release evidence must cover normal, friction, mismatch, recovery, mobile,
  accessibility, trust, and regression states at the correct layer.
- `product-qa-specialist` defect patterns DP-001, DP-006, DP-007, DP-011,
  and DP-012:
  verify runtime truth rather than docs, repeat interaction after visual
  changes, verify the actual Pages traffic path, exclude local-only bypasses,
  and keep source/freshness boundaries visible.
- `chrome-extension-web-qa` and `product-qa-specialist` UX QA references:
  the preferred Chrome Extension route must be confirmed as callable before
  any extension claim; otherwise produce a blocked report with a behavior
  matrix and exact acceptance criteria.

**Tradeoff:** Waiting for a real canonical readback and separate user/AT
evidence delays distribution, but prevents a public release from borrowing
confidence from a local build or a polished screenshot.

## Product craft and release scope

### In scope

- Verify the current PR #44 candidate at exact SHA `959a161702e2598f1c3f2d2c8187bd9e5e8754fa`.
- Reproduce the Pages workflow build with `VITE_BASE_PATH=/pm-signal-lab/`.
- Verify the artifact under a project-site path, not only at `/`.
- Obtain explicit approval before merging PR #44 into `main`.
- After approval, verify the Pages deploy, canonical HTTPS copy/assets, and
  post-deploy browser path.
- Keep the release manifest and README aligned with the observed layer.
- Produce a separate blocked Chrome Extension report when its control surface
  is unavailable.

### Out of scope for this merge gate

- Adding a provider, model, telemetry, persistence, login, analytics, or
  GitHub mutation.
- Claiming screen-reader certification from DOM semantics or Playwright.
- Recruiting or messaging participants without a reviewed invitation and
  explicit channel authorization.
- Buying, exchanging, automating, or fabricating GitHub stars, traffic, or
  adoption.
- Treating the 1,000+ repository reference corpus as user research or PMF.

## Constraints / out of scope

Keep this release gate English-first, local-first until approval, reversible,
and evidence-backed. Do not modify product behavior, source data, the AI/data
model, authentication, provider integrations, telemetry, or user-facing copy
as part of the release action. Do not distribute the pilot, open a public
campaign, or infer adoption/stars from the deploy. Chrome Extension, native AT,
participant sessions, and adoption remain separate evidence layers.

## Preconditions and rollback

### Preconditions

- PR #44 is open, clean, and CI success is attached to the same head SHA.
- Local root-path tests pass.
- Pages-base-path build passes with the same workflow environment.
- A static artifact-root readback returns the current JS/CSS assets.
- Current canonical failure is recorded before merge.
- User explicitly approves the merge and the resulting Pages deployment.

### Impact

Merging changes `main` and triggers the repository's `deploy-pages.yml` workflow,
which publishes the built `dist` artifact to the public GitHub Pages URL. The
change is public and reversible by reverting the merge commit and redeploying
the reverted `main` state.

### Rollback

If post-deploy canonical verification fails, stop pilot distribution, preserve
the failing receipt, revert the merge commit, wait for the rollback Pages run,
and rerun the canonical verifier. Do not patch around a wrong target by
claiming the local branch is hosted.

## Execution contract

### Files/surfaces

- **Inspect:** `.github/workflows/deploy-pages.yml`,
  `.github/workflows/hosted-demo-smoke.yml`, PR #44, `main`, canonical Pages,
  `dist`, and the current QA manifest.
- **Create:** this contract and the local preflight report.
- **Modify:** the QA manifest, release receipt, README, and PR evidence only
  after the observed layer changes.
- **Test:** root-path local build, Pages-base-path artifact, project-site
  static mapping, canonical HTTPS URL, preferred Chrome Extension tab,
  keyboard/focus path, native AT profile, and five real PM sessions as
  separate gates.
- **Observe:** deployed URL, hashed assets, current copy, visible user flow,
  console/request failures, focus/AT result, participant field notes, and
  public adoption signals.
- **Protect:** private growth notes, secrets, participant privacy, current
  `main`, and public distribution status until the release preconditions pass.

### Task sequence

- [x] Step 1 — Reconcile PR, `main`, Pages workflow, canonical URL, and current
  stale readback. **Expected:** exact SHA and runtime divergence recorded.
- [x] Step 2 — Build with `VITE_BASE_PATH=/pm-signal-lab/` and serve the
  artifact under a project-site path. **Expected:** HTML, JS, CSS, and current
  copy all pass the verifier.
- [x] Step 3 — Write the approval/rollback boundary and requirement-to-evidence
  matrix. **Expected:** merge/deploy is explicit and no blocked layer is
  silently promoted.
- [ ] Step 4 — Obtain current explicit approval, merge PR #44, and capture the
  Pages deploy receipt. **Expected:** public `main` and Pages refer to one
  release SHA.
- [ ] Step 5 — Run canonical HTTPS verification and the preferred Chrome
  Extension/browser/AT gates. **Expected:** each layer is pass or remains a
  labelled blocked/out-of-scope result with evidence.
- [ ] Step 6 — Conduct five unguided PM sessions and record safe field notes;
  then update pilot/adoption evidence. **Expected:** no preference or adoption
  claim before real observations exist.

## Verification gate

```text
python3 /Users/tommy/.codex/skills/kb-task-compiler/scripts/score_kb_plan.py docs/product/pm-signal-lab/120-hosted-release-and-evidence-gate-contract-2026-08-16.md --min-score 85
VITE_BASE_PATH=/pm-signal-lab/ npm run build
HOSTED_URL=http://127.0.0.1:4181/pm-signal-lab/ npm run verify:hosted
HOSTED_URL=https://asdc163.github.io/pm-signal-lab/ npm run verify:hosted
gh pr view 44 --repo asdc163/pm-signal-lab
gh run view <deploy-run-id> --repo asdc163/pm-signal-lab
git diff --check
python3 /Users/tommy/.codex/skills/product-qa-specialist/scripts/validate_qa_evidence_manifest.py docs/product/pm-signal-lab/qa-evidence-manifest-2026-08-16.json
```

**Expected:** the local Pages artifact verifier passes; the canonical verifier
passes only after an approved deploy; the deploy receipt and canonical browser
trace identify the same SHA; blocked Chrome Extension/AT/session/adoption
layers remain explicit; no private file or secret is published.

## UX/AI/security gate

- **First-time / empty:** the canonical first read keeps the source line,
  local fixture boundary, first action, and refresh boundary visible.
- **Loaded / recovery:** source disclosure, claim review, smallest test,
  export/copy, reset, refresh clear, and missing-evidence recovery remain
  observable after deployment.
- **Mobile:** the fixed bottom action remains the only current primary action;
  the project-site path introduces no overflow or broken asset loading.
- **Accessibility:** existing keyboard/focus evidence stays separate from
  native screen-reader claims; the canonical route must still expose landmarks,
  headings, labels, and visible focus before any AT conclusion.
- **Trust / AI:** the deterministic fixture does not imply model quality,
  confidence, freshness, adoption, or invisible agent work. Source provenance,
  limits, and local-only boundaries remain literal.
- **Security / permission:** no secret, token, login, provider, upload,
  telemetry, external mutation, participant data, or public message is added
  by the merge/deploy preflight.

## Evidence matrix and acceptance criteria

| Gate | Required evidence | Current status | Pass condition |
| --- | --- | --- | --- |
| Candidate integrity | exact SHA, clean diff, no local-only secret/bypass | pass for `959a161`; private growth plan untracked | release receipt names the SHA and excluded private file |
| Code/CI | tests, typecheck, build, CI | pass | same SHA has successful CI |
| Pages artifact | `VITE_BASE_PATH=/pm-signal-lab/ npm run build` plus project-site static readback | pass locally | `/pm-signal-lab/` HTML and both hashed assets return 200 and current copy exists |
| Canonical HTTPS | `HOSTED_URL=https://asdc163.github.io/pm-signal-lab/ npm run verify:hosted` | blocked until merge/deploy; current readback fails on stale bundle | verifier exits 0 and `canonical_https=true` |
| Browser hosted flow | visible first run, sample, source disclosure, Verify → Decide → Ship, recovery | not executed against the new canonical SHA | controlled browser evidence names canonical URL, viewport, SHA, and observed results |
| Chrome Extension | Codex Chrome Extension controlled tab, no foreground theft | blocked: no callable control surface in this runtime | Extension route is confirmed available and the behavior matrix is executed |
| Keyboard fallback | local Playwright keyboard path | pass locally | remains regression evidence, never promoted to Extension or native AT evidence |
| Native AT | VoiceOver/NVDA/TalkBack or equivalent profile | not executed | representative AT user completes the core job and speech/focus evidence is recorded |
| Real PM sessions | five unguided target-user task sessions | blocked/pending participants | each session has task result, hesitation, trust, recovery, and requested change |
| Adoption | repeat visits, exports, issues/PRs, referrals, traffic/stars | unverified | public signals are collected from real users and reported with source/time window |

## Chrome Extension blocked behavior matrix

| User archetype | Job | Starting state | Success signal | Failure signal |
| --- | --- | --- | --- | --- |
| First-time international PM | understand the product and start one source-linked review | fresh canonical tab | can name what the sheet does and open the intended first action | cannot identify value or clicks an unrelated status/rail |
| Low-trust reviewer | inspect source, claim, limitation, and next test | sample worksheet loaded | expands a source and can state what remains unverified | treats fixture output or status copy as model proof |
| Keyboard-only PM | complete Collect → Verify → Decide → Ship without pointer | fresh tab, keyboard focus | no trap, visible focus, correct action ownership, export/copy works | focus loss, hidden CTA, duplicate action, or recovery dead end |
| Assistive-technology PM | complete the same job with semantic names and announcements | screen-reader/keyboard profile | headings, landmarks, state changes, and errors are understandable | speech/state mismatch or inaccessible recovery |

**Current route result:** the Codex Chrome Extension control surface is not
callable in this runtime, so no tab was claimed or opened and no Chrome result
is asserted. The existing Playwright fallback remains a separate local
regression layer.

## Release sequence

1. Record this preflight and the current stale canonical failure.
2. Obtain explicit merge/deploy approval.
3. Merge PR #44; capture merge SHA and Pages run URL.
4. Wait for Pages deploy success; capture deployed URL and artifact status.
5. Run the canonical static verifier against the HTTPS URL.
6. Run the preferred Chrome Extension path if the control surface is
   available; otherwise keep the blocked report and do not upgrade the claim.
7. Run native AT and real PM session gates separately.
8. Update README, QA manifest, PR, and pilot distribution status only from
   the observed evidence.

## Completion rule

This contract is not a release approval. The hosted release gate remains open
until the user authorizes the public merge/deploy and the resulting canonical
readback passes. The overall 10,000-star objective remains a long-term outcome,
not a completion criterion that can be inferred from this preflight.
