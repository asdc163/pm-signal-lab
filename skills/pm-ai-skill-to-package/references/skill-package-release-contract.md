# Fictional worked example: skill package release contract

This reference is a fictional fixture for a reusable skill package. It shows
the contract a PM can use before publishing a bundle. It is not a live install,
provider configuration, runtime result, security audit, or adoption claim.

## Contents

- [Decision and boundary](#decision-and-boundary)
- [Package identity](#package-identity)
- [Discovery and routing](#discovery-and-routing)
- [Progressive disclosure](#progressive-disclosure)
- [Capability and trust](#capability-and-trust)
- [Surface compatibility](#surface-compatibility)
- [Verification and release](#verification-and-release)
- [Receipt and writeback](#receipt-and-writeback)
- [Edge cases](#edge-cases)
- [Not covered](#not-covered)

## Decision and boundary

**Decision on the desk:** `Hold` the fictional `release-notes-check` package
until its referenced resource exists, positive and negative trigger cases are
run, and its source/license/permission ledger has an owner.

**User/job:** A product manager wants a source-bounded review of dated release
notes, not deployment control, prompt release management, or incident replay.

**Current workaround:** A general chat prompt is reused without a stable skill
identity, trigger boundary, version, or disable path.

**Success oracle:** On a declared surface, the package is found for a matching
job, not found for nearby non-matching jobs, loads only the needed instructions
and resources, produces the required artifact, and records an honest fallback
when a source or resource is missing.

**Evidence boundary:** Every runtime, compatibility, security, and adoption
field in this fixture is `Proposed`, `Not run`, `Not verified`, or `Not
provided`.

## Package identity

| Field | Value | Evidence status |
| --- | --- | --- |
| Name | `release-notes-check` | Proposed |
| Version | `0.1.0` | Proposed |
| Owner | Product operations PM | Proposed |
| Source commit | `Not provided` | Not verified |
| License | MIT for original files; source rights pending | Hold |
| Supported surface | Local filesystem host | Proposed |
| Unsupported surface | Hosted API, coding agent, mobile | Not verified |
| Dependencies | None declared; reference path pending | Not verified |
| Data boundary | User-provided release notes; no secrets or customer data | Proposed |
| Last known good | `Not provided` | Not provided |
| Package state | `Hold` | Fixture state |

The package name is a routing identity, not a product promise. A real release
must attach an exact commit, license evidence, maintainer, compatibility note,
and a version that a user can restore.

## Discovery and routing

### Positive route contract

| ID | User job language | Required input | Expected skill | Oracle |
| --- | --- | --- | --- | --- |
| `RN-001` | Review dated release notes and name one follow-up check | Notes and source date | `release-notes-check` | Route is specific and output keeps the date |
| `RN-002` | Identify supported user impact from a changelog entry | Entry and source date | `release-notes-check` | No unsupported impact claim |

### Negative route contract

| ID | Nearby request | Expected route | Why this skill must not trigger |
| --- | --- | --- | --- |
| `RN-003` | Change a deployment flag | Approval/release owner | It requests an external side effect |
| `RN-004` | Compare prompt versions for canary | `pm-ai-prompt-to-version` | It is prompt release control |
| `RN-005` | Turn a failed trace into a regression | `pm-ai-trace-to-regression` | It is concrete failure writeback |
| `RN-006` | Plan a broad product release | `pm-release-to-learn` | It is rollout learning, not source review |

If the metadata cannot distinguish `RN-001` from a neighbor, the maintainer
must narrow the description or add a clarification route. Loading multiple
skills is not a substitute for a routing boundary.

### Trigger evidence

| Measure | Definition | Status |
| --- | --- | --- |
| Positive match | Intended job selects this skill | Not run |
| Negative abstention | Neighbor job does not select this skill | Not run |
| Ambiguity | Conflicting matches are surfaced for clarification | Not run |
| User comprehension | Maintainer can explain when not to use it | Not run |

Do not turn these rows into precision/recall numbers until there is a defined
test set, evaluator, denominator, host, and observation window.

## Progressive disclosure

| Level | Package content | When loaded | What it must contain | Cost/risk |
| --- | --- | --- | --- | --- |
| Metadata | Frontmatter name/description | Startup or registry scan | Short, specific routing signal | Over-trigger/context tax |
| Instructions | Main `SKILL.md` body | After a match | Bounded workflow and output contract | Wrong guidance if stale |
| References | Field definitions and source notes | When the task needs them | Versioned, authorized facts | Stale or unlicensed content |
| Examples | Fictional first run | Maintainer/user asks for a template | Clear evidence boundary | Users may mistake it for proof |
| Scripts | None in this package | Not applicable | No undeclared execution | Not applicable |

Every reference link must resolve within the package or be marked unavailable.
The package should not force all deep material into always-loaded metadata or
the main instructions. A resource that is never needed should not increase the
default context or permission surface.

## Capability and trust

### Capability inventory

| Surface | Class | Allowed | Denied | Evidence |
| --- | --- | --- | --- | --- |
| Instructions | Read/guidance | Read declared release-note input | Do not mutate systems | Proposed |
| References | Read | Read authorized field definitions | No remote fetch without review | Missing resource |
| Scripts | None | No execute surface | Shell, code, install, postinstall | Proposed |
| Network | None | No network | External endpoints and telemetry | Not scanned |
| Browser/session | None | No browser | Cookies, sessions, CAPTCHA, private URLs | Proposed |
| Secrets | None | No secrets | Env, keychain, tokens, credentials | Required gate |
| External write | None | No deployment, publish, issue, or message | Any side effect | Human-owned only |

### Provenance and license ledger

| Field | Requirement | Status |
| --- | --- | --- |
| Publisher | Named owner and contact | Proposed |
| Source | Repository and exact commit | Not provided |
| License | Covers original files and all bundled materials | Hold |
| Dependencies | Lockfile or explicit none | Not verified |
| Dynamic fetch | None or reviewed endpoint and data boundary | Not run |
| Hooks/MCP | Inventory and permission review | Proposed none |
| Secret access | Explicitly none | Proposed |
| Rollback | Version and disable owner | Not provided |

Popularity, a repository star count, or a vendor claim cannot fill an unknown
provenance or permission field.

## Surface compatibility

| Surface | Discovery source | Version/checkout | Resource access | Sharing/retention | Result |
| --- | --- | --- | --- | --- | --- |
| Local filesystem host | Project skill directory | Pinned `0.1.0` proposed | Read local files | Project-specific, not measured | Pilot candidate |
| Hosted API | Upload/skill ID not specified | Version behavior unknown | Not run | Not provided | Not verified |
| Coding agent | Repository path not specified | Branch/commit behavior unknown | Not run | Not provided | Not verified |
| Mobile host | No loader declared | Not applicable | Not run | Not provided | Not covered |

If a host scans only at session start, a mid-session commit is not evidence of
new availability. A real matrix should record the exact checkout, load time,
skill ID/version, resource paths, and runtime result.

## Verification and release

### Definition of Done

Acceptance criteria ask whether this package shape is correct. Definition of
Done also requires a current evidence record for each declared surface:

- static structure and frontmatter pass;
- positive and negative routing cases have an oracle and result;
- every reference path resolves or is removed;
- scripts/hooks/MCP/network/browser/secrets/external writes are inventoried;
- source commit, license, bundled-content rights, and version are reviewed;
- a declared surface loads the package and runs a safe task oracle;
- user-visible fallback, pause, disable, and rollback are owned;
- no public receipt includes raw private content or unsupported claims.

### Verification register

| Check | Evidence required | Owner | Result |
| --- | --- | --- | --- |
| Structure | Required files and metadata parse | Engineering | Proposed, not run |
| Routing | `RN-001` to `RN-006` results | PM/maintainer | Not run |
| Paths | All referenced files exist | Engineering | Fail: one missing reference |
| Security | Capability and supply-chain inventory | Security/release | Not run |
| Runtime | Load plus task oracle on declared host | Host owner | Not run |
| UX | First-use, empty, error, recovery, manual route | PM/UX | Not run |
| Disable | Remove from routing/attachment safely | Maintainer | Not provided |
| Rollback | Restore last-known-good version | Release owner | Not provided |

### Release route

1. **Hold:** fix the missing reference and establish provenance.
2. **Pilot:** use one narrow local surface, a sanitized fixture, and a human
   owner. Do not enable scripts or external writes.
3. **Release:** publish a pinned version with compatibility and disable notes.
4. **Pause/disable:** stop new loads or remove attachment while preserving a
   manual route and receipt.
5. **Retire:** announce migration and keep the source/version record.

### Stop rules

- description routes a neighboring job without clarification;
- a resource is missing, stale, private, or unlicensed;
- executable, network, browser, secret, or external-write behavior is unknown;
- version cannot be pinned or rolled back;
- target surface is described but not verified;
- a fictional example is presented as runtime or adoption evidence.

## Receipt and writeback

### Privacy-safe package receipt

```text
receipt_type: skill-package-release
skill_id: release-notes-check
version: 0.1.0
source_commit: Not provided
surface: local-filesystem-host
decision: Hold
trigger_state: Not run
load_state: Not run
resource_state: Missing reference
security_state: Not run
license_state: Hold
rollback_target: Not provided
disable_owner: Product operations PM
raw_instructions: excluded
customer_content: excluded
secrets_tokens_cookies: excluded
private_urls: excluded
```

### Learning writeback

After a real pilot, write only skill/version, surface, case IDs, state, oracle
result, failure class, owner, and next action. Keep raw input and access-
controlled security evidence outside the public package. A load receipt,
successful task, user correction, and adoption signal remain separate facts.

## Edge cases

- **Two matches:** preserve the conflict and require clarification.
- **Missing resource:** hold or use the declared fallback, never fabricate it.
- **Host update lag:** record stale checkout and reload from an exact branch or
  version according to host rules.
- **License dispute:** remove the material or route to the rights owner.
- **Script added later:** re-run capability and supply-chain review; do not
  treat a markdown-only review as sufficient.
- **`latest` drift:** compare the resolved version with the pinned baseline.
- **Partial task:** keep load and task states separate and offer manual help.
- **Synthetic example:** label it fictional and limit the claim to structure.

## Not covered

This reference does not prove trigger accuracy, model quality, runtime safety,
cross-surface compatibility, license clearance, user comprehension, cost,
latency, provider retention, external contribution, production reliability,
adoption, traffic, or GitHub stars.
