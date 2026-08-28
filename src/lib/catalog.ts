// src/lib/catalog.ts
export type JsonRecord = Record<string, unknown>;

export interface CatalogUpdate extends JsonRecord {
  target_ids: string[];
  verified_status?: string;
  price?: JsonRecord;
}

export interface HardwareRecord extends JsonRecord {
  id: string;
  manufacturer: string;
  product: string;
  category: string;
  status: string;
  __source: string;
  __search: string;
  __update?: CatalogUpdate;
}

export interface Observation extends JsonRecord {
  __source: string;
  __line?: number;
}

export interface BenchmarkObservation extends JsonRecord {
  __source: string;
  product?: string;
  runtime?: string;
  evidence_quality?: string;
  model?: string;
}

export interface CatalogIssue {
  level: 'warning' | 'error';
  message: string;
  source?: string;
}

export interface CatalogData {
  hardware: HardwareRecord[];
  observations: Observation[];
  benchmarks: BenchmarkObservation[];
  updates: CatalogUpdate[];
  files: string[];
  issues: CatalogIssue[];
  schemaVersions: string[];
  lastUpdated?: string;
}

const jsonModules = import.meta.glob('../../data/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>;

const jsonlModules = import.meta.glob('../../data/*.jsonl', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isHardwareLike(value: unknown): value is JsonRecord {
  if (!isRecord(value)) return false;
  return ['id', 'manufacturer', 'product', 'category', 'status'].every(
    (key) => typeof value[key] === 'string' && String(value[key]).trim().length > 0,
  );
}

export function collectHardware(value: unknown, output: JsonRecord[] = []): JsonRecord[] {
  if (isHardwareLike(value)) {
    output.push(value);
    return output;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectHardware(item, output);
    return output;
  }
  if (isRecord(value)) {
    for (const child of Object.values(value)) collectHardware(child, output);
  }
  return output;
}

export function collectUpdates(value: unknown, output: CatalogUpdate[] = []): CatalogUpdate[] {
  if (isRecord(value) && Array.isArray(value.catalog_updates)) {
    for (const item of value.catalog_updates) {
      if (isRecord(item) && Array.isArray(item.target_ids)) {
        output.push({ ...item, target_ids: item.target_ids.filter((id): id is string => typeof id === 'string') });
      }
    }
  }
  if (Array.isArray(value)) {
    for (const item of value) collectUpdates(item, output);
  } else if (isRecord(value)) {
    for (const [key, child] of Object.entries(value)) {
      if (key !== 'catalog_updates') collectUpdates(child, output);
    }
  }
  return output;
}

export function collectBenchmarks(value: unknown, source: string): BenchmarkObservation[] {
  if (!isRecord(value) || !Array.isArray(value.results)) return [];
  const product = typeof value.product === 'string' ? value.product : undefined;
  const runtime = typeof value.runtime === 'string' ? value.runtime : undefined;
  const evidence = typeof value.evidence_quality === 'string' ? value.evidence_quality : undefined;
  return value.results
    .filter(isRecord)
    .map((result) => ({ ...result, product, runtime, evidence_quality: evidence, __source: source }));
}

export function parseJsonl(raw: string, source: string): { rows: Observation[]; issues: CatalogIssue[] } {
  const rows: Observation[] = [];
  const issues: CatalogIssue[] = [];
  raw.split(/\r?\n/).forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    try {
      const parsed: unknown = JSON.parse(trimmed);
      if (isRecord(parsed)) rows.push({ ...parsed, __source: source, __line: index + 1 });
      else issues.push({ level: 'warning', source, message: `JSONL line ${index + 1} is not an object.` });
    } catch (error) {
      issues.push({
        level: 'error',
        source,
        message: `JSONL line ${index + 1} failed to parse: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  });
  return { rows, issues };
}

function maxDate(values: string[]): string | undefined {
  const dates = values.filter(Boolean).sort((a, b) => a.localeCompare(b));
  return dates.at(-1);
}

export function numericMax(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (Array.isArray(value)) {
    const numbers = value.map(numericMax).filter((entry): entry is number => entry !== undefined);
    return numbers.length ? Math.max(...numbers) : undefined;
  }
  if (isRecord(value)) {
    const numbers = Object.values(value).map(numericMax).filter((entry): entry is number => entry !== undefined);
    return numbers.length ? Math.max(...numbers) : undefined;
  }
  return undefined;
}

function metric(record: JsonRecord, keys: string[]): number | undefined {
  for (const key of keys) {
    const result = numericMax(record[key]);
    if (result !== undefined) return result;
  }
  return undefined;
}

export function memoryGb(record: JsonRecord): number | undefined {
  return metric(record, [
    'memory_gb', 'memory_gb_max', 'vram_gb', 'vram_gb_max', 'gpu_memory_gb',
    'gpu_addressable_memory_gb_max', 'discrete_vram_gb', 'apu_memory_gb', 'unified_memory_gb',
  ]);
}

export function memoryBandwidthGbps(record: JsonRecord): number | undefined {
  return metric(record, [
    'memory_bandwidth_gbps', 'memory_bandwidth_gb_s', 'discrete_memory_bandwidth_gbps',
    'apu_memory_bandwidth_gbps', 'hbm_bandwidth_gbps', 'bandwidth_gbps',
  ]);
}

export function powerWatts(record: JsonRecord): number | undefined {
  return metric(record, [
    'board_power_w', 'tdp_w', 'soc_tdp_w', 'tbp_w', 'peak_power_w_vendor', 'processor_power_w',
    'power_modes_w', 'power_w', 'system_sustained_w_vendor',
  ]);
}

export function primaryPrice(record: HardwareRecord, observations: Observation[] = []): JsonRecord | undefined {
  if (record.__update && isRecord(record.__update.price) && typeof record.__update.price.amount === 'number') {
    return record.__update.price;
  }
  const matching = observations
    .filter((entry) => entry.hardware_id === record.id || entry.product === record.product)
    .filter((entry) => typeof entry.amount === 'number')
    .sort((a, b) => String(a.observed_at ?? '').localeCompare(String(b.observed_at ?? '')));
  if (matching.length) return matching.at(-1);
  if (Array.isArray(record.pricing)) {
    return [...record.pricing].reverse().find((entry): entry is JsonRecord => isRecord(entry) && typeof entry.amount === 'number');
  }
  return undefined;
}

function searchText(record: JsonRecord): string {
  try {
    return JSON.stringify(record).toLowerCase();
  } catch {
    return `${String(record.manufacturer ?? '')} ${String(record.product ?? '')}`.toLowerCase();
  }
}

export function buildCatalog(
  jsonFiles: Record<string, unknown>,
  jsonlFiles: Record<string, string>,
): CatalogData {
  const issues: CatalogIssue[] = [];
  const updates: CatalogUpdate[] = [];
  const benchmarks: BenchmarkObservation[] = [];
  const observations: Observation[] = [];
  const schemaVersions = new Set<string>();
  const dates: string[] = [];
  const rawHardware: Array<{ record: JsonRecord; source: string }> = [];

  for (const [source, payload] of Object.entries(jsonFiles)) {
    if (isRecord(payload)) {
      if (typeof payload.schema_version === 'string') schemaVersions.add(payload.schema_version);
      if (typeof payload.last_updated === 'string') dates.push(payload.last_updated);
      if (typeof payload.observed_at === 'string') dates.push(payload.observed_at);
    }
    for (const record of collectHardware(payload)) rawHardware.push({ record, source });
    updates.push(...collectUpdates(payload));
    benchmarks.push(...collectBenchmarks(payload, source));
  }

  for (const [source, raw] of Object.entries(jsonlFiles)) {
    const parsed = parseJsonl(raw, source);
    observations.push(...parsed.rows);
    issues.push(...parsed.issues);
    for (const row of parsed.rows) if (typeof row.observed_at === 'string') dates.push(row.observed_at);
  }

  const updateById = new Map<string, CatalogUpdate>();
  for (const update of updates) {
    for (const id of update.target_ids) updateById.set(id, update);
  }

  const seen = new Map<string, string>();
  const hardware: HardwareRecord[] = [];
  for (const { record, source } of rawHardware) {
    const id = String(record.id);
    if (seen.has(id)) {
      issues.push({ level: 'warning', source, message: `Duplicate hardware id ${id}; first seen in ${seen.get(id)}.` });
      continue;
    }
    seen.set(id, source);
    const update = updateById.get(id);
    const merged: HardwareRecord = {
      ...record,
      id,
      manufacturer: String(record.manufacturer),
      product: String(record.product),
      category: String(record.category),
      status: update?.verified_status ?? String(record.status),
      __source: source,
      __search: '',
      ...(update ? { __update: update } : {}),
    };
    merged.__search = searchText(merged);
    hardware.push(merged);
  }

  for (const update of updates) {
    if (!update.target_ids.some((id) => seen.has(id))) {
      issues.push({ level: 'warning', message: `Catalog update targets unknown ids: ${update.target_ids.join(', ')}` });
    }
  }

  return {
    hardware,
    observations,
    benchmarks,
    updates,
    files: [...Object.keys(jsonFiles), ...Object.keys(jsonlFiles)].sort(),
    issues,
    schemaVersions: [...schemaVersions].sort(),
    lastUpdated: maxDate(dates),
  };
}

export const catalog = buildCatalog(jsonModules, jsonlModules);
