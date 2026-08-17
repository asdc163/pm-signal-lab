# Vision-to-decision contract reference

This fictional fixture keeps provider capability facts and product decisions
separate. Refresh the links and current behavior before making a live decision.

## Official source ledger

| Source | What it supports | What it does not prove |
| --- | --- | --- |
| [OpenAI images and vision](https://developers.openai.com/api/docs/guides/images-vision) | image input types, detail choices, image processing, and token/cost considerations | visual accuracy, OCR quality, chart correctness, or user outcome |
| [OpenAI file inputs](https://developers.openai.com/api/docs/guides/file-inputs) | file-type handling, PDF text plus page images, non-PDF extraction limits, PDF detail, and file-size/cost boundaries | complete document coverage, layout fidelity, source authority, or privacy compliance |
| [OpenAI model catalog](https://developers.openai.com/api/docs/models) | current model families and the documented support for image input/vision | stable model names, cross-provider parity, accuracy, or production readiness |
| [OpenAI model guidance](https://developers.openai.com/api/docs/guides/latest-model) | current guidance about image detail, original dimensions, resizing, and representative-task comparison | a universal best detail setting, cost/latency for this product, or visual quality |
| [OpenAI data guidance](https://developers.openai.com/api/docs/guides/your-data) | current provider data-handling considerations to refresh before a live route | the application's consent, legal basis, retention, access, or privacy review |

## Provider-neutral artifact record

```yaml
artifact_id: A-001
hash_or_version: "Not provided"
modality: "Not provided"
mime_type: "Not provided"
source_owner: "Not provided"
received_at: "Not run"
pages_or_frames: "Not provided"
selected_pages_or_regions: []
original_dimensions: "Not provided"
rendered_dimensions: "Not provided"
coordinate_system: "Not provided"
quality_observations: ["Not provided"]
data_class: "Not provided"
retention_delete: "Not provided"
```

Do not turn an accepted file into a coverage claim. A missing page, failed
render, unreadable crop, or absent source timestamp stays visible.

## Field and anchor record

```yaml
field_id: F-001
label: "Not provided"
value: "Not provided"
value_type: "Not provided"
unit_or_format: "Not provided"
source_anchor:
  artifact_id: "Not provided"
  page: "Not provided"
  region: "Not provided"
  frame_or_cell: "Not provided"
  coordinate_system: "Not provided"
route_version: "Not provided"
status: "candidate"
oracle: "Not provided"
reviewer: "Not provided"
revision: "Not provided"
```

The anchor must refer to the original or declare the transformation. If a
returned coordinate cannot be mapped back, the field is not evidence for a
durable action.

## Safe visual receipt

The minimum receipt contains:

- artifact IDs/hashes, source and processing timestamps, modality, pages,
  regions, dimensions, quality observations, and route/config version;
- field IDs, values/types/units, source anchors, status, corrections, reviewer,
  oracle, revision, and commit decision;
- page coverage, missing/illegible/ambiguous fields, table/chart/layout checks,
  privacy and accessibility disposition, and fallback;
- latency/cost only when measured, plus a rollback or manual-review path;
- no raw private image, document, customer text, credential, token, private URL,
  sensitive screenshot, or hidden chain-of-thought.

For a public pilot receipt, use `Not provided`, `Not run`, `Not measured`, or
`Not covered` for unavailable evidence.

## Visual failure taxonomy

- `crop_mismatch`: result or coordinate belongs to a different crop;
- `rotation_skew`: orientation changes reading or geometry;
- `low_resolution`: detail is insufficient for the requested field;
- `small_text`: a critical character, decimal, unit, or label is not legible;
- `table_loss`: row, column, merged-cell, header, blank, or total structure changes;
- `chart_loss`: axis, legend, unit, mark, range, or chart relation is missing;
- `page_region_mismatch`: citation does not support the extracted field;
- `missing_page`: required document coverage is incomplete;
- `visual_ambiguity`: multiple readings remain plausible;
- `prompt_injection`: embedded visual text tries to change authority or scope;
- `private_data`: sensitive content crosses an unauthorized boundary;
- `accessibility`: result cannot be inspected through a non-visual or keyboard path;
- `config_drift`: provider/model/parser/detail/preprocessing/prompt changed;
- `not_scoreable`: no trusted source, denominator, or oracle exists.

## Not covered

This fictional fixture does not prove a provider's visual accuracy, OCR, chart
or table quality, file coverage, source authority, expert/legal/medical
approval, privacy compliance, accessibility execution, user outcome, adoption,
traffic, or stars.
