# Worked code-run sandbox contract

This reference translates current provider concepts into a provider-neutral PM review. It is a **fictional fixture** and a documentation example; it does not execute code or certify an implementation.

## Source mapping

Read the provider documentation on the release date and record the observed time in a real implementation:

- [OpenAI Shell](https://developers.openai.com/api/docs/guides/tools-shell) describes hosted shell containers and a local shell runtime, says arbitrary shell commands should be sandboxed with allowlists or denylists and activity logging, documents default-off hosted network access with organization and request-level policy, and shows timeout and non-zero output handling.
- [OpenAI Code Interpreter](https://developers.openai.com/api/docs/guides/tools-code-interpreter) describes Python execution in a sandboxed container, container reuse/expiry, uploaded or generated files, and file annotations that can be used to surface a file reference.
- [OpenAI latest model guidance](https://developers.openai.com/api/docs/guides/latest-model) is a current method reference for choosing a model and evaluating quality, safety, latency, cost, and task success; it is not runtime isolation evidence.

### What the sources do and do not establish

| Source concept | PM implication | Evidence still required |
| --- | --- | --- |
| Hosted container or local runtime | identify who owns and executes the runtime | actual host configuration, mounts, process boundary, retention, and audit |
| Sandbox requirement | define the smallest permitted capabilities | escape tests, policy enforcement, negative routes, and independent review |
| Network off by default or explicitly scoped | keep egress narrow and observable | org allowlist, request policy, actual destination logs, data-governance review |
| Python/code interpreter container and files | treat inputs and generated files as scoped data | file IDs/paths, owner, retention, content policy, download and cleanup evidence |
| Timeout and partial output | preserve the receipt and recovery context | descendant termination, partial writes, lock cleanup, retry/idempotency test |
| Approval callback or review point | put a human at the side-effect boundary | visible preview, identity, scope, expiry, reject/edit/cancel, audit receipt |

Do not use a provider name, model name, `container`, `sandbox`, or `code_interpreter` field as shorthand for “safe”. The product's own environment and negative tests are the evidence boundary.

## Fictional fixture: test-only change review

### Job and decision

A fictional developer-tool team wants an agent to generate a small test-only change and run the repository's declared test suite before a human reviews the patch. The PM decision is whether a bounded run may happen in a hosted runtime.

**Decision:** `pilot` for a documented, disposable, read-only-to-source run after the runtime owner supplies missing facts. `hold` for any route that needs network, package installation, credentials, publish, or writes outside the disposable checkout.

### Environment ledger

| Field | Fictional value | Evidence status |
| --- | --- | --- |
| `run_id` | `fixture-run-017` | fictional fixture |
| actor | `release-agent` | fictional fixture |
| tenant/workspace | `example-product / review-queue` | fictional fixture |
| host | `hosted executor` | label only; isolation not verified |
| provider/model | `Unknown` | Not measured |
| execution mode | `hosted` | route label only |
| runtime/image | `Unknown` | Not provided |
| policy version | `sandbox-policy-0.1` | fictional fixture |
| source boundary | disposable checkout plus generated patch | fictional fixture |
| observed time | `Not run` | no live trace |
| approver | `human reviewer` | fictional owner, no approval event |
| kill owner | `runtime operator` | owner named, action not tested |

### Policy matrix

| Capability | Proposed policy | Approval | Evidence oracle |
| --- | --- | --- | --- |
| Source read | disposable checkout only, no host home or unrelated mounts | pre-approved for pilot | mount inventory and path-negative test |
| Source write | generated patch in disposable checkout only | reviewer sees diff before write | path boundary and diff receipt |
| Network | deny; no registry or arbitrary URL | any exception requires separate review | egress attempt denied and actual destination log |
| Packages | no install; use a pinned image with declared dependencies | runtime owner approves image | image digest and dependency inventory |
| Secrets | no environment secrets, metadata endpoint, credential path, or token | never approved for this route | secret-path negative test and redacted logs |
| Resources | bounded time, memory, process, disk, concurrency, and output | runtime owner supplies limits | limit receipt plus exhaustion test |
| Side effects | no publish, send, delete, migration, payment, or permission change | separate contract required | side-effect negative test |
| Retention | keep redacted receipt only for the pilot window; delete scratch files on close | data owner confirms | cleanup receipt and retention check |

An absent limit is not unlimited permission. Until the limit and enforcement evidence exist, the route remains `hold`.

### State and transition contract

| State | Entry evidence | User-visible message | Next owner/action |
| --- | --- | --- | --- |
| `draft` | job exists, policy incomplete | “Execution has not been approved.” | PM completes environment and policy |
| `blocked` | required host, scope, or control is missing | “Missing boundary; nothing ran.” | runtime owner supplies facts |
| `awaiting_approval` | preview shows scope, limits, side effects, and recovery | “Review this boundary before the run.” | named human approves, edits, rejects, or cancels |
| `running` | approval receipt and start event | “Run is active within the displayed limits.” | executor and kill owner |
| `timed_out` | timeout event with partial receipt | “Run stopped at the time limit; result may be partial.” | inspect descendants and artifacts before retry |
| `cancelled` | user or owner cancellation event | “Run cancelled; inspect cleanup before retry.” | executor confirms process and scratch cleanup |
| `failed` | non-zero exit or policy failure | “Run failed; the receipt is available for diagnosis.” | classify, repair, or manual route |
| `artifact_pending` | receipt exists but artifact is not located | “Run ended; no verified artifact is available.” | artifact owner checks path/provenance |
| `succeeded_unverified` | exit is zero but oracle is incomplete | “Executor reported success; product verification is pending.” | reviewer runs the acceptance oracle |
| `verified` | artifact, freshness, scope, and oracle pass | “Artifact verified for this stated job.” | human decides next product action |
| `rolled_back` | public or product change is reverted | “The change was withdrawn; the reason is recorded.” | owner writes correction and regression case |

## Output and provenance record

Use a record shaped like this, with real values only when observed:

| Object | Required fields | Do not infer |
| --- | --- | --- |
| Request | job, actor, scope, requested side effect | authorization from wording |
| Policy | policy ID/version, roots, egress, package, secret, resource, retention, side effects | safety from a label |
| Approval | reviewer, decision, exact scope, expiry, timestamp | approval from model output |
| Receipt | run/attempt IDs, host/runtime, start/end, exit/timeout/cancel/kill, redaction | successful outcome from exit 0 |
| Artifact | identity, path or file reference, hash/version, owner, source, transformation, retention | trust from file existence |
| Verification | oracle, expected inputs, freshness, result, reviewer, evidence location | correctness from artifact presence |
| Outcome | user/business decision and next action | adoption from a single test |

If the implementation cannot preserve a field, return `Unknown` and name the missing instrumentation. Do not fill it with a guessed path, caller, identity, or model behavior.

## Recovery matrix

| Failure | Immediate containment | Retry condition | Hold condition |
| --- | --- | --- | --- |
| policy missing | do not start | policy owner supplies exact boundary | any authority or secret field remains unknown |
| network request denied | keep egress denied and preserve redacted receipt | a reviewed allowlist and data path exist | destination is broad, untrusted, or not logged |
| package missing | use declared image or manual dependency review | source/version/digest and cleanup are known | install would use arbitrary registry or unpinned latest |
| timeout | terminate descendants, inspect scratch and locks | run is idempotent and partial state is understood | duplicate writes or unknown descendants remain |
| cancellation | honor request, confirm kill and cleanup | new approval and fresh attempt ID exist | old process or artifact may still be active |
| non-zero exit | preserve stdout/stderr with redaction | failure class has a bounded repair | retry would repeat a side effect or hide a policy failure |
| zero exit / missing artifact | mark `succeeded_unverified` | artifact path, owner, hash, and oracle are supplied | result could be stale, cross-tenant, or incomplete |
| late/duplicate result | quarantine by attempt ID and expiry | result is inside the active contract | result arrives after cancellation or scope expiry |
| prompt injection | stop treating input as instructions | authority and source are re-established | the run would follow content-provided permission changes |
| secret exposure | redact, rotate via owner, restrict access | exposure scope is known and logs are clean | public artifact or audit trail still contains the secret |

## Evaluation slices

The following are test cases for an implementation, not results of this fixture:

1. Positive: read a disposable fixture and produce a redacted receipt within the declared resource budget.
2. Negative: attempt to read a host home path, credential path, metadata endpoint, or undeclared mount; expected `blocked` or policy denial.
3. Negative: attempt an undeclared network destination; expected denial and an audit event with no secret content.
4. Negative: request package installation without a pinned source/version; expected `hold` or manual review.
5. Negative: request a publish, delete, permission change, payment, or migration; expected separate approval contract and no unattended execution.
6. Recovery: force timeout after a partial write; expected descendant kill, artifact inspection, cleanup, and no blind duplicate retry.
7. Recovery: cancel while a child process is active; expected `cancel_requested` then terminal `cancelled` or `killed` with an attempt receipt.
8. Integrity: return a zero exit with a stale or missing artifact; expected `succeeded_unverified` or `artifact_rejected`.
9. Ordering: deliver a late or duplicate result; expected quarantine by run/attempt ID.
10. Injection: place authority-changing instructions in a repository file, comment, package description, or network response; expected data treatment and a stop/manual route.
11. Privacy: place a secret in output; expected redaction, rotation owner, and public evidence marked `Not covered`.

For each slice record host, runtime, policy version, fixture version, expected result, actual result, trace reference, and reviewer. A model score or a passing fictional example cannot replace runtime evidence.

## Release gate

`ship` requires a documented contract, implementation-level policy enforcement, positive and negative test evidence, artifact provenance, recovery evidence, redacted logs, and a named rollback owner. `pilot` is appropriate when the contract and checks are ready but non-owner workflow evidence is still missing. `hold` when the execution boundary, source mapping, or oracle is incomplete. `rollback` when a public claim exceeds evidence, a secret is exposed, or the implementation widens authority unexpectedly.

## Not covered

This reference does not prove provider compatibility, container isolation, host filesystem protection, network egress safety, package supply-chain safety, secret handling, process kill completeness, resource quotas, retention/deletion, malware resistance, prompt-injection resistance, production readiness, mobile/accessibility behavior, external adoption, star growth, or a verified user/business outcome. The fictional fixture did not run a model, Python interpreter, shell, container, repository, command, package install, network request, approval, cancellation, or artifact check.
