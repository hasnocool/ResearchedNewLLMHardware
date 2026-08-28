# Vite Hardware Explorer

The repository now includes a React + TypeScript frontend built with Vite. It is intentionally data-driven: **do not maintain a hard-coded product list in the UI**.

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

### Benchmarks

Displays structured benchmark observations when a JSON file contains a `results` array with the current benchmark-observation shape. Vendor evidence is kept visible rather than silently normalized into independent results.

### Data health

Shows discovered files, record counts, schema versions, latest data date, malformed JSONL rows, duplicate IDs, orphan catalog updates, and the exact files included in the build.

## Design rule for new data

Prefer adding research to `data/` using the repository's normalized fields. The frontend will ingest new fields without code changes, but the common fields below give the best browsing experience:

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
  "pricing": [{"amount": 999, "currency": "USD", "observed_at": "2026-08-28"}]
}
```

These fields are recommendations for presentation, not a new schema requirement. The repository's existing validator remains authoritative for data governance.
