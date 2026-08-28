# Vite Hardware Explorer

The repository includes a React + TypeScript frontend built with Vite. It is intentionally data-driven: **do not maintain a hard-coded product list in the UI**.

## Run locally

```bash
npm install
npm run dev
```

Production checks/build:

```bash
npm run typecheck
npm test
npm run build
npm run preview
```

Vite 8 requires Node.js 20.19+ (or a compatible newer release).

## How future data is incorporated

`src/lib/catalog.ts` uses Vite `import.meta.glob` against:

- `data/*.json`
- `data/*.jsonl`

Every build therefore re-discovers the repository's current data files automatically. No frontend registry needs updating when a new hardware slice or price-observation file is added.

Hardware discovery is deliberately schema-tolerant. Any nested object with non-empty `id`, `manufacturer`, `product`, `category`, and `status` fields is treated as a hardware record, regardless of which container key a future dataset uses. Unknown fields remain attached to the record and are rendered by the generic record inspector.

The loader also:

- parses JSONL observation history;
- applies `catalog_updates` overlays without duplicating the underlying hardware record;
- discovers benchmark-result files that use the repository's existing `results` format;
- reports duplicate hardware IDs, malformed JSONL rows, and updates targeting missing hardware;
- tracks schema versions and the latest dated data it can identify.

## Frontend views

### Explore

Searches across the full serialized record so new fields automatically become searchable. Filters are derived from current manufacturers, categories, and statuses. Cards normalize common memory, bandwidth, power, price, and runtime fields while the detail dialog exposes the complete source record.

Each card can also be added to the persistent comparison selection. The selection survives tab switches and accepts up to ten devices.

### Compare

The comparison workbench supports 2–10 devices selected either from Explore or with its own catalog search. The side-by-side matrix derives:

- normalized memory capacity;
- memory bandwidth;
- normalized board/TDP/system power reference;
- latest observed price;
- cost per GB of memory;
- bandwidth per currency unit;
- memory capacity per watt;
- memory bandwidth per watt;
- estimated kWh/day for a configurable number of active hours;
- a conservative capacity-only model-fit tier;
- explicitly declared runtimes/frameworks;
- quantization notes;
- repository-provided LLM and off-grid suitability fields.

Derived price metrics retain the source currency. **Do not compare CAD-per-GB directly with USD-per-GB or mix new/refurbished/used observations without accounting for condition and configuration.** Power-based metrics likewise use whatever normalized power field the source record provides; they are not automatically equivalent to measured wall power.

`src/lib/comparison.ts` contains the pure derivation helpers and deliberately uses explicit runtime/framework fields rather than scanning prose for technology names. This avoids treating a note such as “CUDA unsupported” as CUDA compatibility.

The model-fit tier is only a rough capacity screen. It does not account for KV cache, context length, batching, runtime overhead, memory topology, host offload, or whether all stated system memory is accelerator-addressable.

### Benchmarks

Displays structured benchmark observations when a JSON file contains a `results` array with the current benchmark-observation shape. Vendor evidence is kept visible rather than silently normalized into independent results.

### Data health

Shows discovered files, record counts, schema versions, latest data date, malformed JSONL rows, duplicate IDs, orphan catalog updates, and the exact files included in the build.

## Design rule for new data

Prefer adding research to `data/` using the repository's normalized fields. The frontend will ingest new fields without code changes, but the common fields below give the best browsing and comparison experience:

```json
{
  "id": "vendor-product-id",
  "manufacturer": "Vendor",
  "product": "Product",
  "category": "category_name",
  "status": "available",
  "memory_gb": 32,
  "memory_bandwidth_gbps": 640,
  "board_power_w": 150,
  "software": ["llama.cpp", "ROCm"],
  "quantization_compatibility": ["GGUF Q4_K_M", "GGUF Q8_0"],
  "llm_inference_suitability": "high",
  "off_grid_suitability": "moderate",
  "pricing": [{"amount": 999, "currency": "USD", "observed_at": "2026-08-28"}]
}
```

These fields are recommendations for presentation, not a new schema requirement. The repository's existing validator remains authoritative for data governance.
