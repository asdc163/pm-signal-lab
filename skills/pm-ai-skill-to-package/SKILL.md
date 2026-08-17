---
name: pm-ai-skill-to-package
description: Use when an AI capability may be packaged as a reusable agent skill. Produce a source-bounded package contract covering identity, discovery triggers, progressive disclosure, resources and scripts, permissions, surface compatibility, provenance, versioning, verification, disablement, rollback, and a truthful release decision.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Skill to Package

Use this skill when a team wants to turn a repeatable AI workflow into a
portable skill bundle that an agent can discover, load, and use. Treat the
bundle as a product surface with a routing contract, capability boundary,
version, and recovery path.

The output is a package and release decision packet. It is not an installer,
registry, runtime, provider recommendation, security certification, or proof
that a skill triggered or completed a live task.

## When to use

Use it when:

- a team wants to publish a reusable `SKILL.md` with references, scripts,
  templates, or other support files;
- a prompt or workflow is being moved from a one-off conversation into a
  discoverable skill package;
- a skill description may overlap with other skills and needs positive and
  negative routing boundaries;
- a package has different behavior across local files, a hosted API, a coding
  agent, or another target surface;
- a maintainer needs to decide what is always visible as metadata, what loads
  only after a trigger, and what runs or reads on demand;
- a package update needs a pinned version, migration note, disable route,
  rollback, provenance, license, or permission review.

Use `pm-ai-tool-to-contract` when the main decision is a tool schema or side
effect. Use `pm-ai-prompt-to-version` when the main decision is a prompt
revision inside an existing product. Use `pm-ai-context-to-contract` when the
main decision is runtime context selection. Use
`pm-ai-first-use-to-activation` when a packaged capability already exists and
the question is user activation or value.

## Do not use

Do not use this skill to:

- install, upload, execute, enable, delete, or distribute a third-party
  package;
- hide shell, network, browser, filesystem, secret, hook, MCP, or external
  write capability behind a friendly description;
- claim universal compatibility across agent products or versions;
- copy private prompts, customer content, credentials, tokens, cookies,
  private URLs, or unlicensed references/assets into a public bundle;
- infer trigger quality, security, reliability, adoption, or star growth from
  file existence, one fixture, or a vendor description.

Write `Not provided`, `Not verified`, `Not measured`, `Not run`, or
`Not covered` when evidence is missing.

## Workflow

### 1. Frame the package decision

Write one sentence:

> We need to decide whether capability `...` can be packaged as skill `...`
> for surface `...` and user job `...` within `...` routing, permission,
> provenance, compatibility, and recovery boundaries.

Record the job, current workaround, package owner, target surface, consequence,
success oracle, last-known-good version, and what would make the package
unsafe or unusable.

### 2. Build the package identity ledger

Record stable metadata before writing marketing copy:

| Field | Question |
| --- | --- |
| `skill_id` / `name` | Can an agent and maintainer identify it unambiguously? |
| `version` | What exact package state is under review? |
| Owner and maintainer | Who answers routing, security, and breakage reports? |
| Source and commit | Can the bundle and its dependencies be traced? |
| License | Does it cover the actual instructions and bundled assets? |
| Compatibility | Which host, runtime, and prerequisites are supported? |
| Data boundary | What data may the skill read, write, or retain? |
| Last known good | Which version can be restored? |
| Status | `draft`, `discoverable`, `loadable`, `verified`, `pilot`, `released`, `paused`, `disabled`, or `retired` |

Do not use `latest` as a release receipt. If the target surface resolves a
floating version, record the resolved version and the risk of drift.

### 3. Define discovery and non-discovery

Write the job language that should trigger the skill and the nearby jobs that
must not trigger it. Test the description as routing metadata, not as a full
instruction manual.

For each positive case record user intent, required input, expected skill, and
why the match is specific. For each negative case record the neighboring skill
or manual route. If two skills match equally, ask for clarification or narrow
the description; do not load every candidate.

### 4. Map progressive disclosure

Separate the package into load stages:

1. **Metadata:** name and description used for discovery.
2. **Instructions:** the smallest `SKILL.md` workflow loaded after a match.
3. **Resources:** references, templates, examples, and assets read only when
   the current job needs them.
4. **Scripts:** deterministic code run only with a named purpose, input,
   output, permission, and verification oracle.

For each file record load condition, expected context or permission cost,
owner, freshness, and fallback. A file path in prose is not proof that the
resource exists or can be read.

### 5. Inventory capability and permissions

Classify every package surface as `none`, `read`, `write`, `execute`, or
`external`. Record filesystem scope, shell commands, network destinations,
browser/session access, secrets, data classes, external side effects, rate or
cost caps, and human approval.

Treat skill instructions, scripts, references, tool results, and remote content
as untrusted until reviewed. Unknown executable or secret surfaces are `Hold`.
Do not let a package description silently grant permission.

### 6. Check provenance, license, and supply chain

Record source owner, exact commit or release, dependency lock state, license,
bundled-content rights, install instructions, dynamic fetches, hooks, MCP,
postinstall, telemetry, and secret access. Use `reference`, `scoped pilot`,
`enabled`, `hold`, or `reject` as the adoption decision.

Popularity is a discovery signal, not a security or quality result. A wrapper
license does not prove redistribution rights for a copied prompt, asset,
template, font, or dataset.

### 7. Compare target surfaces

Make a row for every declared surface. Record package location or upload mode,
checkout/branch/version behavior, when discovery runs, how the main file and
resources are loaded, runtime prerequisites, sharing scope, data retention,
network policy, and the evidence status.

If a repository scan happens only at session start, a later commit is not
automatically visible. If a surface is not tested, mark it `Not verified`.

### 8. Define verification and pilot

Use separate checks for:

- package structure and frontmatter;
- positive and negative discovery cases;
- referenced path and resource availability;
- script input/output and permission boundaries;
- provenance, license, and secret scan;
- target-surface load and runtime task oracle;
- user comprehension, fallback, disable, and rollback.

Keep static validation, load evidence, task success, security review, and
adoption evidence as different layers. A successful `SKILL.md` read is not a
completed task.

### 9. Set version, update, and disable rules

Choose a pinned version or an explicitly governed floating route. Name the
consumer compatibility window, migration steps, deprecation notice, rollback
target, disable owner, and manual fallback. If an update changes triggers,
permissions, scripts, or output shape, require a new review instead of a silent
patch.

### 10. Write the receipt and decision

Return one status:

`Ship | Pilot | Hold | Disable | Retire | Need evidence`

The receipt includes package identity, source/version, surface, capability
class, evidence status, decision owner, rollback target, and limitations. Never
include secrets, private raw instructions, customer content, or hidden
reasoning. End with the smallest next observation that could change the
decision.

## Output contract

Return a `PM AI Skill to Package Contract` in this order:

1. **Package decision on the desk:** job, workaround, owner, target surface,
   success oracle, status, and evidence boundary.
2. **Identity and provenance ledger:** name, skill ID, version, source commit,
   owner, license, compatibility, dependencies, data boundary, and
   last-known-good.
3. **Discovery contract:** positive triggers, required inputs, negative routes,
   neighboring skills, ambiguity behavior, and trigger evidence.
4. **Progressive disclosure map:** metadata, instructions, references,
   templates/assets, scripts, load conditions, and context/permission cost.
5. **Capability inventory:** read/write/execute/external surfaces, data classes,
   network, browser, secrets, side effects, caps, approval, and fallback.
6. **Surface compatibility matrix:** location/upload, checkout/version, load
   timing, sharing, retention, prerequisites, evidence, and unknowns.
7. **Verification register:** static, routing, path, security, runtime, UX,
   disable, rollback, and adoption checks with owners and status.
8. **Version and release plan:** pin/latest choice, migration, pilot audience,
   stop rule, disable, rollback, and deprecation.
9. **Privacy-safe package receipt:** sanitized metadata only.
10. **Not covered:** unresolved trigger, runtime, security, compatibility,
    licensing, user, cost, and adoption questions.
11. **Next action:** one owner, one smallest observation, and the decision rule.

## Common rationalizations and red flags

| Rationalization | Required response |
| --- | --- |
| "It is only a markdown file." | Check routing, data, license, and linked resources. |
| "The description is obvious." | Run positive and negative trigger cases. |
| "The script is optional." | Inventory it or remove it from the package. |
| "`latest` is easier." | Record resolved version and a rollback target. |
| "The vendor says it works." | Treat the statement as a source claim, not runtime evidence. |
| "A popular repo is safe." | Run provenance, permission, and supply-chain review. |
| "One successful load proves it." | Require a task oracle and failure/recovery case. |

Red flags include unknown remote fetches, hidden instructions in references,
unscoped shell/network/browser access, secret-shaped input, ambiguous
descriptions, missing resources, unpinned updates, no disable owner, and a
release note that says "works everywhere" without surface evidence.

## Edge cases

- **Two skills match:** clarify the job or narrow metadata; do not chain both by
  default.
- **Missing reference:** stop or use an explicitly named fallback; never invent
  the missing content.
- **Unknown executable surface:** `Hold` until scripts, hooks, MCP, network,
  and secret access are reviewed.
- **License mismatch:** do not publish copied content; route to the rights
  owner or replace it with an authorized source.
- **Stale repository checkout:** record the branch/commit and start a fresh
  session or re-upload according to the host's documented behavior.
- **Floating version drift:** compare the resolved package with the pinned
  last-known-good before allowing a pilot.
- **Partial task success:** record the load and task states separately; offer a
  manual route rather than calling the skill complete.
- **Mobile or unavailable host:** mark the surface `Not verified` or define a
  manual fallback; do not infer portability.
- **Synthetic fixture:** label it fictional and limit claims to package shape
  and the named fixture behavior.

## Final check

Before returning the contract, confirm:

- package identity, owner, source version, license, compatibility, and
  last-known-good are visible or explicitly marked missing;
- positive and negative discovery cases have specific jobs and owners;
- metadata, instructions, resources, and scripts have load stages and paths;
- every executable, network, browser, secret, data, and external-write surface
  is inventoried or marked `Not applicable`;
- each target surface has a compatibility row and current evidence status;
- provenance, licensing, security, user, runtime, disable, and rollback checks
  are separate from file existence;
- no raw sensitive material, unlicensed content, hidden reasoning, or fabricated
  metric entered the receipt;
- the status is one of `Ship | Pilot | Hold | Disable | Retire | Need evidence`
  and the next decision-changing observation is named.
