# First run: a bounded repository test request

This is a **fictional fixture** for learning the skill. It is not an executed command, not a provider trace, and not evidence that a sandbox or artifact is safe.

## Request

A fictional PM says: “Our agent writes a small change and should run the repository test suite before showing the patch to a reviewer.”

## Contract

- `job`: check whether the generated change passes the repository's declared test contract.
- `route`: `hosted_run` only if a named host and runtime policy are supplied; otherwise `manual`.
- `environment`: host `Unknown`; provider/model `Unknown`; runtime `Unknown`; image/version `Unknown`; policy version `Not provided`.
- `authority`: actor `fictional-release-agent`; workspace `fictional-repository`; approver `human reviewer`; kill owner `Not assigned`; expiry `Not provided`.
- `filesystem`: generated patch and a disposable checkout only; host home, credentials, and unrelated repositories are not in scope.
- `network`: deny by default. Package installation and registry access are not part of this first request.
- `secrets`: none. Environment variables and metadata endpoints are denied.
- `side effects`: no publish, send, delete, migration, permission change, or payment; only a disposable test result may be produced.
- `limits`: time, memory, process, disk, concurrency, and output limits are `Not provided` and must be supplied before approval.
- `artifact`: a test receipt and a candidate patch may be produced, but their hash, owner, retention, and provenance are `Not run`.
- `verification`: the repository's test oracle is `Not provided`; a zero exit would still be `succeeded_unverified` until the expected test set and freshness are checked.
- `decision`: `hold` until the environment, policy, budget, and artifact oracle are named.

## Reviewer prompt

Before approval, ask the implementation owner to provide the host/runtime, checkout boundary, exact write roots, network/package policy, limits, cancellation and descendant-kill behavior, log redaction, artifact cleanup, and the test-set oracle. If any answer is missing, keep the route `manual` or `blocked`.

## Not run

No model, shell, Python interpreter, container, repository, command, package registry, network request, approval, cancellation, artifact, or browser session was executed for this fixture.

## Not covered

Runtime isolation, host filesystem escape, network egress, package supply chain, secret exposure, resource exhaustion, prompt injection, mobile/accessibility behavior, provider compatibility, production readiness, adoption, and user outcome are not established.
