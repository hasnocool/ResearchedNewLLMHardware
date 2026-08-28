// src/App.tsx
import { useMemo, useState } from 'react';
import {
  catalog,
  HardwareRecord,
  JsonRecord,
  memoryBandwidthGbps,
  memoryGb,
  powerWatts,
  primaryPrice,
} from './lib/catalog';
import { comparisonMetrics } from './lib/comparison';

type Tab = 'explore' | 'compare' | 'benchmarks' | 'health';
type Sort = 'name' | 'memory' | 'bandwidth' | 'power';

function titleCase(value: string): string {
  return value.replaceAll('_', ' ').replaceAll('-', ' ').replace(/\b\w/g, (match) => match.toUpperCase());
}

function formatNumber(value?: number, suffix = '', maximumFractionDigits = 1): string {
  return value === undefined
    ? '—'
    : `${new Intl.NumberFormat('en-CA', { maximumFractionDigits }).format(value)}${suffix}`;
}

function formatPrice(price?: JsonRecord): string {
  if (!price || typeof price.amount !== 'number') return 'No public price';
  const currency = typeof price.currency === 'string' ? price.currency : '';
  try {
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency, maximumFractionDigits: 2 }).format(price.amount);
  } catch {
    return `${currency} ${price.amount}`.trim();
  }
}

function formatPerCurrency(value: number | undefined, currency: string | undefined, unit: string): string {
  if (value === undefined || !currency) return '—';
  return `${currency} ${formatNumber(value, ` ${unit}`, 3)}`;
}

function unique(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function software(record: HardwareRecord): string[] {
  const value = record.software ?? record.frameworks ?? record.runtimes;
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === 'string').slice(0, 5) : [];
}

function textValue(value: unknown): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return '—';
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="metric"><span>{label}</span><strong>{value}</strong></div>;
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return <div className="stat"><strong>{value}</strong><span>{label}</span></div>;
}

function HardwareCard({
  record,
  onOpen,
  compared,
  onToggleCompare,
  compareDisabled,
}: {
  record: HardwareRecord;
  onOpen: () => void;
  compared: boolean;
  onToggleCompare: () => void;
  compareDisabled: boolean;
}) {
  const price = primaryPrice(record, catalog.observations);
  return (
    <article className={`hardware-card${compared ? ' compared' : ''}`}>
      <div className="card-topline">
        <span className="eyebrow">{record.manufacturer}</span>
        <span className="status-chip">{titleCase(record.status)}</span>
      </div>
      <h3>{record.product}</h3>
      <p className="category">{titleCase(record.category)}</p>
      <div className="metric-grid">
        <Metric label="Memory" value={formatNumber(memoryGb(record), ' GB')} />
        <Metric label="Bandwidth" value={formatNumber(memoryBandwidthGbps(record), ' GB/s')} />
        <Metric label="Power" value={formatNumber(powerWatts(record), ' W')} />
        <Metric label="Price" value={formatPrice(price)} />
      </div>
      <div className="chips">
        {software(record).map((item) => <span key={item}>{item}</span>)}
      </div>
      <div className="card-footer">
        <small>{record.__source.split('/').at(-1)}</small>
        <div className="card-actions">
          <button
            type="button"
            className={compared ? 'selected-action' : ''}
            onClick={onToggleCompare}
            disabled={compareDisabled && !compared}
          >
            {compared ? 'Compared' : 'Compare'}
          </button>
          <button type="button" onClick={onOpen}>Inspect</button>
        </div>
      </div>
    </article>
  );
}

function LinkValue({ value }: { value: unknown }) {
  if (typeof value === 'string' && /^https?:\/\//.test(value)) {
    return <a href={value} target="_blank" rel="noreferrer">{value}</a>;
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return <>{String(value)}</>;
  }
  return <pre>{JSON.stringify(value, null, 2)}</pre>;
}

function DetailDialog({ record, onClose }: { record: HardwareRecord; onClose: () => void }) {
  const hidden = new Set(['__search']);
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="dialog" role="dialog" aria-modal="true" aria-label={`${record.product} details`}>
        <div className="dialog-header">
          <div><span className="eyebrow">{record.manufacturer}</span><h2>{record.product}</h2></div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="detail-hero">
          <Metric label="Memory" value={formatNumber(memoryGb(record), ' GB')} />
          <Metric label="Bandwidth" value={formatNumber(memoryBandwidthGbps(record), ' GB/s')} />
          <Metric label="Power" value={formatNumber(powerWatts(record), ' W')} />
          <Metric label="Current price" value={formatPrice(primaryPrice(record, catalog.observations))} />
        </div>
        <div className="record-table">
          {Object.entries(record).filter(([key]) => !hidden.has(key)).map(([key, value]) => (
            <div className="record-row" key={key}>
              <dt>{titleCase(key.replace(/^__/, ''))}</dt>
              <dd><LinkValue value={value} /></dd>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Explore({
  compareIds,
  onToggleCompare,
}: {
  compareIds: string[];
  onToggleCompare: (id: string) => void;
}) {
  const [search, setSearch] = useState('');
  const [manufacturer, setManufacturer] = useState('all');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState<Sort>('name');
  const [selected, setSelected] = useState<HardwareRecord | null>(null);

  const manufacturers = useMemo(() => unique(catalog.hardware.map((item) => item.manufacturer)), []);
  const categories = useMemo(() => unique(catalog.hardware.map((item) => item.category)), []);
  const statuses = useMemo(() => unique(catalog.hardware.map((item) => item.status)), []);
  const compareSet = useMemo(() => new Set(compareIds), [compareIds]);

  const records = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = catalog.hardware.filter((item) =>
      (!query || item.__search.includes(query)) &&
      (manufacturer === 'all' || item.manufacturer === manufacturer) &&
      (category === 'all' || item.category === category) &&
      (status === 'all' || item.status === status),
    );
    return filtered.sort((a, b) => {
      if (sort === 'memory') return (memoryGb(b) ?? -1) - (memoryGb(a) ?? -1);
      if (sort === 'bandwidth') return (memoryBandwidthGbps(b) ?? -1) - (memoryBandwidthGbps(a) ?? -1);
      if (sort === 'power') return (powerWatts(a) ?? Number.MAX_SAFE_INTEGER) - (powerWatts(b) ?? Number.MAX_SAFE_INTEGER);
      return `${a.manufacturer} ${a.product}`.localeCompare(`${b.manufacturer} ${b.product}`);
    });
  }, [search, manufacturer, category, status, sort]);

  return (
    <>
      <section className="stats-grid">
        <Stat value={catalog.hardware.length} label="hardware records" />
        <Stat value={manufacturers.length} label="manufacturers" />
        <Stat value={categories.length} label="categories" />
        <Stat value={catalog.observations.length} label="market observations" />
      </section>
      <section className="filters" aria-label="Catalog filters">
        <input aria-label="Search hardware" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products, runtimes, notes, model fit…" />
        <select aria-label="Manufacturer" value={manufacturer} onChange={(event) => setManufacturer(event.target.value)}>
          <option value="all">All manufacturers</option>{manufacturers.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select aria-label="Category" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="all">All categories</option>{categories.map((item) => <option key={item} value={item}>{titleCase(item)}</option>)}
        </select>
        <select aria-label="Status" value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="all">All statuses</option>{statuses.map((item) => <option key={item} value={item}>{titleCase(item)}</option>)}
        </select>
        <select aria-label="Sort" value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
          <option value="name">Sort: name</option><option value="memory">Sort: memory</option><option value="bandwidth">Sort: bandwidth</option><option value="power">Sort: lowest power</option>
        </select>
      </section>
      <div className="results-line"><strong>{records.length}</strong> matching records · <strong>{compareIds.length}/10</strong> selected to compare</div>
      <section className="catalog-grid">
        {records.map((record) => <HardwareCard
          key={record.id}
          record={record}
          compared={compareSet.has(record.id)}
          compareDisabled={compareIds.length >= 10}
          onToggleCompare={() => onToggleCompare(record.id)}
          onOpen={() => setSelected(record)}
        />)}
      </section>
      {selected && <DetailDialog record={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

function CompareWorkbench({
  compareIds,
  onToggleCompare,
  onClear,
}: {
  compareIds: string[];
  onToggleCompare: (id: string) => void;
  onClear: () => void;
}) {
  const [search, setSearch] = useState('');
  const [activeHours, setActiveHours] = useState(8);
  const selected = useMemo(
    () => compareIds.map((id) => catalog.hardware.find((record) => record.id === id)).filter((record): record is HardwareRecord => Boolean(record)),
    [compareIds],
  );
  const selectedSet = useMemo(() => new Set(compareIds), [compareIds]);
  const candidates = useMemo(() => {
    const query = search.trim().toLowerCase();
    return catalog.hardware
      .filter((record) => !selectedSet.has(record.id))
      .filter((record) => !query || record.__search.includes(query))
      .sort((a, b) => `${a.manufacturer} ${a.product}`.localeCompare(`${b.manufacturer} ${b.product}`))
      .slice(0, 12);
  }, [search, selectedSet]);
  const metrics = useMemo(
    () => new Map(selected.map((record) => [record.id, comparisonMetrics(record, catalog.observations, activeHours)])),
    [selected, activeHours],
  );

  const row = (label: string, render: (record: HardwareRecord) => React.ReactNode) => (
    <tr key={label}><th>{label}</th>{selected.map((record) => <td key={record.id}>{render(record)}</td>)}</tr>
  );

  return (
    <div className="compare-workbench">
      <section className="panel compare-picker-panel">
        <div className="section-heading">
          <div><span className="eyebrow">Workbench</span><h2>Compare 2–10 devices</h2></div>
          <button type="button" className="secondary-button" onClick={onClear} disabled={!compareIds.length}>Clear selection</button>
        </div>
        <p className="compare-note">Derived value metrics are only directly comparable when prices use the same currency and equivalent condition/configuration. Power-based estimates use the repository's normalized board/TDP/system power field, not measured wall power.</p>
        <div className="compare-controls">
          <label>
            <span>Find hardware</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search catalog to add…" />
          </label>
          <label>
            <span>Active hours/day for energy estimate</span>
            <input
              type="number"
              min="1"
              max="24"
              value={activeHours}
              onChange={(event) => setActiveHours(Math.min(24, Math.max(1, Number(event.target.value) || 1)))}
            />
          </label>
        </div>
        <div className="compare-candidates">
          {candidates.map((record) => (
            <button key={record.id} type="button" onClick={() => onToggleCompare(record.id)} disabled={compareIds.length >= 10}>
              <span>{record.manufacturer}</span><strong>{record.product}</strong><small>{formatNumber(memoryGb(record), ' GB')} · {formatNumber(powerWatts(record), ' W')}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="selected-tray" aria-label="Selected comparison hardware">
        {selected.map((record) => (
          <button type="button" key={record.id} onClick={() => onToggleCompare(record.id)} title="Remove from comparison">
            <span>{record.manufacturer}</span><strong>{record.product}</strong><b>×</b>
          </button>
        ))}
        {!selected.length && <p>Select hardware from Explore or use the search above.</p>}
      </section>

      {selected.length < 2 && <section className="panel compare-empty"><strong>Select at least two devices</strong><span>The workbench will calculate capacity, bandwidth, value, energy, model-fit, and runtime comparisons.</span></section>}

      {selected.length >= 2 && (
        <section className="panel comparison-panel">
          <div className="section-heading"><div><span className="eyebrow">Side by side</span><h2>Comparison matrix</h2></div><span>{selected.length} devices</span></div>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead><tr><th>Metric</th>{selected.map((record) => <th key={record.id}><span>{record.manufacturer}</span><strong>{record.product}</strong></th>)}</tr></thead>
              <tbody>
                {row('Status', (record) => titleCase(record.status))}
                {row('Category', (record) => titleCase(record.category))}
                {row('Memory', (record) => formatNumber(metrics.get(record.id)?.memoryGb, ' GB'))}
                {row('Memory bandwidth', (record) => formatNumber(metrics.get(record.id)?.bandwidthGbps, ' GB/s'))}
                {row('Power reference', (record) => formatNumber(metrics.get(record.id)?.powerWatts, ' W'))}
                {row('Latest observed price', (record) => formatPrice(metrics.get(record.id)?.price))}
                {row('Cost per GB', (record) => {
                  const metric = metrics.get(record.id);
                  return formatPerCurrency(metric?.costPerGb, metric?.priceCurrency, '/GB');
                })}
                {row('Bandwidth per currency unit', (record) => {
                  const metric = metrics.get(record.id);
                  return formatPerCurrency(metric?.bandwidthPerCurrencyUnit, metric?.priceCurrency, 'GB/s per unit');
                })}
                {row('Memory per watt', (record) => formatNumber(metrics.get(record.id)?.memoryPerWatt, ' GB/W', 3))}
                {row('Bandwidth per watt', (record) => formatNumber(metrics.get(record.id)?.bandwidthPerWatt, ' GB/s/W', 3))}
                {row(`Energy at ${activeHours} active h/day`, (record) => formatNumber(metrics.get(record.id)?.activeEnergyKwhDay, ' kWh/day', 3))}
                {row('Capacity-only model-fit estimate', (record) => metrics.get(record.id)?.modelFit ?? '—')}
                {row('Explicit runtimes/frameworks', (record) => {
                  const values = metrics.get(record.id)?.runtimes ?? [];
                  return values.length ? <div className="comparison-chips">{values.map((value) => <span key={value}>{value}</span>)}</div> : '—';
                })}
                {row('Quantization notes', (record) => {
                  const values = metrics.get(record.id)?.quantization ?? [];
                  return values.length ? <div className="comparison-chips">{values.map((value) => <span key={value}>{value}</span>)}</div> : '—';
                })}
                {row('LLM suitability', (record) => textValue(record.llm_inference_suitability))}
                {row('Off-grid suitability', (record) => textValue(record.off_grid_suitability))}
              </tbody>
            </table>
          </div>
          <p className="comparison-disclaimer">Model-fit tiers are rough weight-memory guidance only. They do not account for KV cache, context length, batching, runtime overhead, split memory topologies, host RAM offload, or whether the stated memory is fully accelerator-addressable.</p>
        </section>
      )}
    </div>
  );
}

function Benchmarks() {
  return (
    <section className="panel">
      <div className="section-heading"><div><span className="eyebrow">Evidence</span><h2>Benchmark observations</h2></div><span>{catalog.benchmarks.length} rows</span></div>
      <div className="table-wrap"><table><thead><tr><th>Product</th><th>Model</th><th>Quantization</th><th>Generation</th><th>Prompt</th><th>Runtime</th><th>Evidence</th></tr></thead>
        <tbody>{catalog.benchmarks.map((row, index) => <tr key={`${row.__source}-${index}`}><td>{String(row.product ?? '—')}</td><td>{String(row.model ?? '—')}</td><td>{String(row.quantization ?? '—')}</td><td>{row.text_generation_tps ? `${row.text_generation_tps} tok/s` : '—'}</td><td>{row.prompt_processing_tps ? `${row.prompt_processing_tps} tok/s` : '—'}</td><td>{String(row.runtime ?? '—')}</td><td>{String(row.evidence_quality ?? '—')}</td></tr>)}</tbody>
      </table></div>
      {!catalog.benchmarks.length && <p className="empty">No benchmark observation files matched the current ingestion rules.</p>}
    </section>
  );
}

function Health() {
  return (
    <div className="health-grid">
      <section className="panel"><span className="eyebrow">Ingestion</span><h2>Data health</h2><div className="health-list">
        <div><span>Files discovered</span><strong>{catalog.files.length}</strong></div>
        <div><span>Hardware records</span><strong>{catalog.hardware.length}</strong></div>
        <div><span>Catalog updates</span><strong>{catalog.updates.length}</strong></div>
        <div><span>JSONL observations</span><strong>{catalog.observations.length}</strong></div>
        <div><span>Schema versions</span><strong>{catalog.schemaVersions.join(', ') || 'unversioned'}</strong></div>
        <div><span>Latest dated data</span><strong>{catalog.lastUpdated ?? 'unknown'}</strong></div>
      </div></section>
      <section className="panel"><span className="eyebrow">Diagnostics</span><h2>Issues</h2>{catalog.issues.length ? <ul className="issues">{catalog.issues.map((issue, index) => <li key={index} className={issue.level}><strong>{issue.level}</strong> {issue.message}{issue.source ? <small>{issue.source}</small> : null}</li>)}</ul> : <p className="healthy">No ingestion issues detected.</p>}</section>
      <section className="panel files-panel"><span className="eyebrow">Auto-discovery</span><h2>Included data files</h2><div className="file-list">{catalog.files.map((file) => <code key={file}>{file.replace('../../', '')}</code>)}</div></section>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>('explore');
  const [compareIds, setCompareIds] = useState<string[]>([]);

  function toggleCompare(id: string) {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((entry) => entry !== id);
      if (current.length >= 10) return current;
      return [...current, id];
    });
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div><span className="eyebrow">ResearchedNewLLMHardware</span><h1>LLM Hardware Explorer</h1><p>Search, compare, and inspect the repository's entire hardware catalog. New JSON and JSONL files under <code>data/</code> are discovered automatically at build time.</p></div>
        <div className="freshness"><span>Catalog date</span><strong>{catalog.lastUpdated ?? 'unknown'}</strong><small>{catalog.files.length} data files loaded</small></div>
      </header>
      <nav className="tabs" aria-label="Views">
        {([
          ['explore', 'Explore'],
          ['compare', `Compare${compareIds.length ? ` (${compareIds.length})` : ''}`],
          ['benchmarks', 'Benchmarks'],
          ['health', 'Data health'],
        ] as const).map(([key, label]) => <button key={key} type="button" className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>{label}</button>)}
      </nav>
      <main>
        {tab === 'explore' && <Explore compareIds={compareIds} onToggleCompare={toggleCompare} />}
        {tab === 'compare' && <CompareWorkbench compareIds={compareIds} onToggleCompare={toggleCompare} onClear={() => setCompareIds([])} />}
        {tab === 'benchmarks' && <Benchmarks />}
        {tab === 'health' && <Health />}
      </main>
      <footer>Built directly from repository data. Unknown future fields remain visible in the record inspector instead of being discarded.</footer>
    </div>
  );
}
