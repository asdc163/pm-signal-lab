# First run: release-notes-check skill package

This is a fictional fixture showing how to review a reusable skill before
distribution. It is not an installed package, a live agent run, a compatibility
result, a security certification, or adoption evidence.

## Package decision on the desk

**Decision:** `Pilot` the fictional `release-notes-check` package only on one
declared local filesystem surface after the resource and trigger checks pass.
Do not claim support for hosted API or coding-agent surfaces yet.

**User/job:** A product manager needs to turn a dated release note into a short
change summary, affected-user question, and one follow-up check without losing
the source date or inventing a product claim.

**Current workaround:** The PM pastes release notes into a general chat prompt.
The prompt is not versioned, the output format drifts, and nobody records which
source or package version produced the summary.

**Owner:** Product operations PM. Engineering owns package validation;
security/release engineering owns the permission and provenance review.

**Success oracle:** The skill is complete only when the intended surface finds
the package for a matching job, loads its main instructions, reads the declared
reference when asked, returns the required fields, and keeps unsupported claims
visible as `Not provided` or `Not covered`.

**Evidence boundary:** The package map and fixture expectations are proposed.
No skill was installed, uploaded, executed, or measured on a live surface.

## Identity and provenance ledger

| Field | Value | Evidence status |
| --- | --- | --- |
| `skill_id` | `release-notes-check` | Proposed fixture |
| Version | `0.1.0` | Proposed fixture |
| Owner | Product operations PM | Proposed |
| Source | Internal Git repository, commit `Not provided` | Not verified |
| License | MIT for original files; bundled source rights `Not provided` | Hold for review |
| Compatibility | Local filesystem skill host only | Proposed, not run |
| Last known good | `Not provided` | Not provided |
| Status | `pilot` | Fixture decision |

## Discovery contract

### Positive cases

| Case | Request | Required input | Expected route |
| --- | --- | --- | --- |
| `RN-001` | "Review these dated release notes and give me one follow-up check." | Release note text and date | `release-notes-check` |
| `RN-002` | "Which user impact is supported by this changelog entry?" | Changelog entry and source date | `release-notes-check` |

### Negative cases

| Case | Request | Route instead |
| --- | --- | --- |
| `RN-003` | "Change the deployment flag and publish the release." | `pm-ai-approval-to-flow` or a human release owner |
| `RN-004` | "Compare two prompt versions and decide whether to canary." | `pm-ai-prompt-to-version` |
| `RN-005` | "Summarize a private incident trace." | `pm-ai-trace-to-regression` or a private incident route |
| `RN-006` | "Write a general product launch plan." | `pm-release-to-learn` or another PM route |

If `RN-001` and `RN-004` both match, ask whether the user wants source review
or prompt release control. Do not load both just because both mention AI.

## Progressive disclosure map

| Stage | File | Load condition | Cost/boundary | Evidence |
| --- | --- | --- | --- | --- |
| Metadata | `SKILL.md` frontmatter | Always visible to routing | Short description only | Proposed |
| Instructions | `SKILL.md` body | Positive trigger | Under 500-line target | Proposed |
| Reference | `references/release-note-fields.md` | User asks for field definitions | Read-only reference | Path not created in fixture |
| Example | `examples/first-run.md` | Maintainer or user needs a template | Fictional data only | Current file |
| Script | None | Not applicable | No execution surface | Proposed |

The missing reference is intentional in this fixture. The package cannot move
past `Hold` until the reference is created or the skill removes the link.

## Capability and permission inventory

| Surface | Capability | Data | Permission | Status |
| --- | --- | --- | --- | --- |
| Main instructions | Read and guide a review | User-provided release notes | Context read | Proposed |
| Reference | Read field definitions | Public or approved docs | Filesystem read | Not available |
| Scripts | None | None | No execute | Proposed |
| Network | None declared | None | No network | Proposed, not scanned |
| Browser/session | None declared | None | No browser | Proposed |
| Secrets | None allowed | Credentials excluded | No secret access | Required gate |
| External write | None allowed | No deployment or publishing | Human-owned only | Required gate |

## Surface compatibility matrix

| Surface | Package location | Version behavior | Load evidence | Result |
| --- | --- | --- | --- | --- |
| Local filesystem host | Project skill directory | Pinned `0.1.0` proposed | Not run | Pilot candidate |
| Hosted API | Upload or skill ID not specified | Not provided | Not run | Not verified |
| Coding agent | Repository skill path not specified | Checkout behavior unknown | Not run | Not verified |
| Mobile host | No package loader declared | Not applicable | Not run | Not covered |

## Verification register

| Check | Owner | Expected oracle | Status |
| --- | --- | --- | --- |
| Frontmatter and file layout | Engineering | Required file and metadata fields parse | Proposed, not run |
| Positive trigger cases | Product operations | `RN-001` and `RN-002` route only to this skill | Proposed, not run |
| Negative trigger cases | Product operations | `RN-003` to `RN-006` do not route here | Proposed, not run |
| Reference path | Engineering | Every linked file exists and is readable | Fail: reference missing |
| Security inventory | Security/release | No undeclared execute/network/secret/write surface | Proposed, not run |
| Task oracle | Product operations | Required summary, source date, impact question, and follow-up check | Not run |
| Disable/rollback | Owner | Remove package from routing and restore last-known-good | Not provided |

## Version and pilot plan

The package stays `Hold` until the missing reference is fixed and the static,
positive, negative, and security checks pass. After that, run a limited local
pilot with sanitized release notes. Stop if a non-trigger routes here, a source
date is invented, a private note enters the receipt, or the package cannot be
disabled. The rollback target is `Not provided`, so a release is not approved.

## Privacy-safe package receipt

```text
receipt_type: skill-package-review
skill_id: release-notes-check
version: 0.1.0
surface: local-filesystem-host
discovery_state: Proposed
load_state: Not run
reference_state: Missing reference, Hold
execute_surface: None declared
network: None declared
secrets: prohibited
external_write: prohibited
license_state: Not verified
rollback_target: Not provided
raw_release_notes: excluded
customer_content: excluded
```

## Not covered

- actual trigger precision or false activation rate;
- loading behavior on a hosted API, coding agent, or mobile surface;
- task quality, source fidelity, user comprehension, cost, and latency;
- license rights for bundled references and the real source commit;
- runtime security, dependency scan, external writes, and disable execution;
- adoption, production reliability, traffic, and GitHub stars.

## Next action

Engineering should either create `references/release-note-fields.md` with an
authorized source or remove the reference link, then run `RN-001` through
`RN-006` against the declared local surface. Product operations should own the
task oracle. The decision can move from `Hold` only after the missing-path and
negative-routing gates have current evidence.
