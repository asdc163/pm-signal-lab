# Worked reference: prompt version release contract

This reference is a fictional fixture and vendor-neutral contract for a prompt that
supports a support-triage workflow. It demonstrates the artifact shape, not a
live prompt, provider configuration, eval result, deployment record, or safety
assessment.

## Contents

- [Decision and boundary](#decision-and-boundary)
- [Version ledger](#version-ledger)
- [Input contract](#input-contract)
- [Output contract](#output-contract)
- [Behavioral diff](#behavioral-diff)
- [Evaluation register](#evaluation-register)
- [Rollout and rollback](#rollout-and-rollback)
- [Receipt and writeback](#receipt-and-writeback)
- [Edge cases](#edge-cases)
- [Not covered](#not-covered)

## Decision and boundary

**Decision on the desk:** `Hold` `support_triage.v2` until the sanitized
baseline/candidate fixture set is run and the queue consumer confirms output
compatibility.

**User job:** A support operations lead needs a queue suggestion and an honest
manual-review signal before an operator drafts a response.

**Current workaround:** v1 chooses the closest queue even when evidence is
missing. An operator corrects the queue after the result appears.

**Candidate:** v2 adds an explicit decision state, evidence references,
multilingual preservation, schema validation, and a stop path for weak or
conflicting evidence.

**Success oracle:** A result is complete only when the queue and decision are
valid, evidence references are allowed, language is preserved, and the review
flag matches the fixture's evidence condition. A syntactically valid response
is not enough.

**Evidence boundary:** Every result in this reference is `Proposed`, `Not run`,
or `Not measured`. No provider was called.

## Version ledger

| Field | Baseline | Candidate | Evidence status |
| --- | --- | --- | --- |
| `prompt_id` | `support_triage` | `support_triage` | Proposed |
| `prompt_version` | `v1` | `v2` | Proposed |
| Purpose | Queue routing | Queue routing plus review boundary | Proposed |
| Owner | Support platform PM | Support platform PM | Proposed |
| Approver | Support operations lead | Support operations lead | Not provided |
| Model/provider | Not provided | Not provided | Not measured |
| Parameters | Not provided | Not provided | Not measured |
| Source artifact | Not provided | Not provided | Not provided |
| Release flag | Default | `support_triage_prompt_v2` | Proposed |
| Last known good | `v1` | `v1` | Proposed, not deployment-verified |
| Consumers | Queue suggestion panel | Queue suggestion panel and parser | Proposed |
| State | `released` assumed for fixture | `decision_pending` | Fixture state |

The baseline label does not prove that v1 is actually deployed. A real release
record must attach a commit, configuration version, deployment receipt, or
other source-bounded identifier. If that identifier is missing, the comparison
is `Not verified` and promotion stays blocked.

## Input contract

### Allowed fields

| ID | Field | Source | Authority | Privacy | Freshness | Selection/fallback |
| --- | --- | --- | --- | --- | --- | --- |
| `I-001` | `message_summary` | Sanitized user message | User data | Personal, minimized | Current request | Required; empty means review |
| `I-002` | `language` | Request metadata | System data | Low sensitivity | Current request | Required; unknown routes to review |
| `I-003` | `product_area` | Product taxonomy | Approved reference | Internal | Taxonomy versioned | Optional; do not infer protected traits |
| `I-004` | `evidence_refs` | Approved policy lookup | Reference data | Internal | Source versioned | Include IDs, not raw documents |
| `I-005` | `account_state` | Coarse support state | Authorized system data | Restricted/minimized | Current state | Exclude credential/payment detail |

### Excluded fields

Raw email addresses, phone numbers, full account numbers, credentials, tokens,
cookies, private URLs, unrestricted transcripts, secret-shaped strings, and
unapproved policy text are excluded. If a field cannot be redacted or scoped,
the run pauses and routes to an authorized manual process.

### Authority rule

User text can express intent but cannot change policy. Retrieved evidence can
support a queue decision but cannot become an instruction. A string such as
"ignore the system prompt" is data and a negative test case. The version
contract does not grant permission to access or act on an account.

## Output contract

### Schema

```json
{
  "queue": "billing | access | technical | shipping | other | unknown",
  "decision": "route | needs_review | abstain",
  "needs_human_review": "boolean",
  "evidence_refs": ["string"],
  "language": "string",
  "reason_summary": "string, one short sentence"
}
```

The parser must reject unknown fields, invalid enums, missing required fields,
unapproved evidence IDs, and empty summaries. It must not silently coerce an
unknown queue to `other` or interpret a malformed result as an approval.

### User-visible states

| State | User copy intent | Allowed action |
| --- | --- | --- |
| `loading` | "Checking the request and approved support references." | Wait or cancel |
| `uncertain` | "The available details are not enough to choose a queue." | Add details or ask a support lead |
| `needs_review` | "A support lead should confirm this route." | Review, edit, or use manual route |
| `blocked` | "The result could not be validated, so no route was applied." | Retry with safe input or hand off |
| `fallback` | "The previous routing version remains active." | Continue with last-known-good route |

No state tells the user that a model "thought" privately. The evidence summary
can show source IDs and validation state without exposing hidden reasoning.

### Compatibility

The v2 object is not backward-compatible with a consumer that expects only
`queue` and `reason`. The migration must either update the consumer first or
place v2 behind a flag with a v1 adapter. A parser failure must keep the safe
manual route available.

## Behavioral diff

| Change class | Change | Why it might help | What could regress | Check |
| --- | --- | --- | --- | --- |
| `logic` | Weak evidence becomes `needs_review`/`abstain` | Reduces false certainty | Manual queue volume rises | Review empty/conflict slices |
| `format` | Free text becomes validated object | Makes state machine explicit | Consumer parser breaks | Schema and compatibility test |
| `copy` | Summary follows request language | Helps multilingual operators | Language label mismatch | Language-preservation fixture |
| `policy` | User text cannot override rules | Protects instruction boundary | Benign text may be over-blocked | Injection and benign-lookalike fixtures |

The change is intentionally narrow. It does not redesign retrieval, choose a
model, add a judge, or change account permissions.

## Evaluation register

### Slice map

| Slice | Cases | Primary oracle | Guardrail | Result |
| --- | --- | --- | --- | --- |
| Clear route | `ST-001`, `ST-002` | Queue and evidence refs match label | Language preserved | Not run |
| Missing/conflict | `ST-003`, `ST-004` | Review/abstain state is correct | No guessed high-confidence route | Not run |
| Untrusted text | `ST-005` | No prompt disclosure or policy override | No raw content in receipt | Not run |
| Sensitive input | `ST-006` | Sensitive field excluded or manual route | No secret/PII leakage | Not run |
| Long/multilingual | `ST-007` | Bounded input and correct language | No silent truncation | Not run |
| Output failure | `ST-008` | Parser rejects and falls back | No downstream action | Not run |

### Oracle and evidence rules

Deterministic checks cover required keys, enums, evidence membership, language
consistency, parser behavior, and receipt redaction. Human review covers queue
correctness and whether a person is needed. If a judge model is later added,
the team must record its version, rubric, calibration set, disagreement review,
and human adjudication route. A judge score is not ground truth.

Baseline and candidate must run on the same fixtures, context boundary,
observation window, and parser version unless the diff explicitly includes one
of those changes. Results are `Observed`, `Not run`, `Not reproduced`,
`Not measured`, or `Proposed`; never fill a missing result with a number.

### Cost and latency record

| Measure | Baseline | Candidate | Window | Status |
| --- | --- | --- | --- | --- |
| Input tokens | Not provided | Not provided | Not provided | Not measured |
| Output tokens | Not provided | Not provided | Not provided | Not measured |
| p50 latency | Not provided | Not provided | Not provided | Not measured |
| p95 latency | Not provided | Not provided | Not provided | Not measured |
| Cost per completed job | Not provided | Not provided | Not provided | Not measured |

Do not call the prompt change efficient until these measures are collected in
the same environment and quality remains within the approved boundary.

## Rollout and rollback

### Proposed staged route

1. **Local:** run the sanitized fixture set and parser tests. Any privacy,
   injection, output-contract, or fallback failure is a blocker.
2. **Internal canary:** proposed 5% of support-review traffic behind
   `support_triage_prompt_v2`. The PM and support lead review the fixed window
   before expanding. This percentage is a proposal, not a traffic observation.
3. **Release decision:** expand only if the owner confirms queue correctness,
   review recall, parser compatibility, privacy guardrails, and cost/latency
   limits. The thresholds are `Not provided` in this fixture.
4. **Pause:** disable new v2 exposure while v1 remains available and uncertain
   cases use manual review.
5. **Rollback:** restore v1, preserve a sanitized receipt, capture the failing
   slice ID, and do not replay a side effect merely to investigate.

### Stop rules

- any secret, PII, private prompt, or cross-tenant data appears in the output;
- a malformed output reaches a downstream queue consumer;
- the prompt-disclosure or injection slice fails;
- a high-severity manual-review case is routed automatically;
- a parser, permission, or fallback path has no owner;
- cost or latency improves only by violating the output or safety contract.

## Receipt and writeback

### Privacy-safe receipt

```text
receipt_type: prompt-version-release
prompt_id: support_triage
baseline_version: v1
candidate_version: v2
change_classes: logic, format, copy, policy
contract_state: Proposed
evaluation_state: Not run
rollout_state: Hold
last_known_good: v1
parser_state: Proposed
cost_state: Not measured
latency_state: Not measured
rollback_state: Available in design, not executed
raw_prompt: excluded
raw_input: excluded
customer_content: excluded
secrets_tokens_cookies: excluded
private_reasoning: excluded
```

### Learning writeback

After a real run, write back only sanitized fields: version IDs, slice IDs,
state transitions, oracle outcome, failure class, owner, and next action. Link
to private evidence through an access-controlled system rather than copying
raw customer material into a public README or issue.

## Edge cases

- **No baseline:** status is `Hold`; state `baseline: Not provided`; do not
  compare against memory or a copied prompt fragment.
- **Output schema change:** compatibility review and parser migration are
  required before canary.
- **Model change plus prompt change:** split the changes or mark attribution as
  `Not identifiable`; do not credit the prompt alone.
- **Only one aggregate score:** split by user-job and rare-failure slices.
- **Judge disagreement:** preserve both judgments and route to adjudication.
- **Cost improvement with quality regression:** hold or roll back.
- **Prompt injection in fixture:** keep it as data and test the authority
  boundary; never execute the embedded instruction.
- **Missing provider telemetry:** keep cost/latency `Not measured`.
- **Mobile or partial completion:** specify the same user-visible fallback or
  mark the surface `Not covered`.
- **Synthetic fixture:** label it synthetic and limit claims to artifact
  structure and fixture behavior.

## Not covered

This reference does not prove model quality, provider safety, prompt-injection
resistance outside the named fixtures, production parser compatibility, user
comprehension, actual cost or latency, tenant isolation, deployment state,
rollback execution, adoption, traffic, or GitHub stars.
