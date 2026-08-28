// src/lib/catalog.test.ts
import { describe, expect, it } from 'vitest';
import { buildCatalog, collectHardware, memoryGb, parseJsonl } from './catalog';

describe('catalog ingestion', () => {
  it('finds hardware recursively without relying on a fixed container key', () => {
    const input = {
      future_schema: {
        devices: [{ id: 'x', manufacturer: 'Acme', product: 'X', category: 'gpu', status: 'available' }],
      },
    };
    expect(collectHardware(input)).toHaveLength(1);
  });

  it('applies verified catalog updates without duplicating hardware', () => {
    const data = buildCatalog({
      'hardware.json': {
        hardware: [{ id: 'x', manufacturer: 'Acme', product: 'X', category: 'gpu', status: 'announced' }],
      },
      'updates.json': {
        catalog_updates: [{ target_ids: ['x'], verified_status: 'available', price: { amount: 99, currency: 'USD' } }],
      },
    }, {});
    expect(data.hardware).toHaveLength(1);
    expect(data.hardware[0].status).toBe('available');
  });

  it('keeps parsing valid JSONL rows when a later row is malformed', () => {
    const result = parseJsonl('{"hardware_id":"x","amount":99}\nnot-json', 'prices.jsonl');
    expect(result.rows).toHaveLength(1);
    expect(result.issues).toHaveLength(1);
  });

  it('extracts maximum usable memory from scalar and structured fields', () => {
    expect(memoryGb({ memory_gb: 32 })).toBe(32);
    expect(memoryGb({ memory_gb: { base: 64, configurable: [128, 512] } })).toBe(512);
  });
});
