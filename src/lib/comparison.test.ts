// src/lib/comparison.test.ts
import { describe, expect, it } from 'vitest';
import { HardwareRecord, Observation } from './catalog';
import { comparisonMetrics, modelFitTier, quantizationLabels, runtimeLabels } from './comparison';

function hardware(overrides: Partial<HardwareRecord> = {}): HardwareRecord {
  return {
    id: 'acme-x',
    manufacturer: 'Acme',
    product: 'X',
    category: 'gpu',
    status: 'available',
    __source: 'data/x.json',
    __search: '',
    memory_gb: 32,
    memory_bandwidth_gbps: 640,
    board_power_w: 160,
    software: ['llama.cpp', 'Vulkan'],
    quantization_compatibility: ['GGUF Q4', 'GGUF Q8'],
    ...overrides,
  };
}

describe('comparison workbench metrics', () => {
  it('derives value, efficiency, and active energy metrics', () => {
    const observations: Observation[] = [{
      hardware_id: 'acme-x',
      amount: 800,
      currency: 'CAD',
      observed_at: '2026-08-28',
      __source: 'prices.jsonl',
    }];
    const metrics = comparisonMetrics(hardware(), observations, 8);

    expect(metrics.costPerGb).toBe(25);
    expect(metrics.bandwidthPerCurrencyUnit).toBe(0.8);
    expect(metrics.memoryPerWatt).toBe(0.2);
    expect(metrics.bandwidthPerWatt).toBe(4);
    expect(metrics.activeEnergyKwhDay).toBe(1.28);
    expect(metrics.priceCurrency).toBe('CAD');
  });

  it('extracts only explicitly declared runtime/framework fields', () => {
    const record = hardware({
      software: ['ROCm', 'Vulkan'],
      notes: 'CUDA is not supported.',
      frameworks: ['PyTorch'],
    });
    expect(runtimeLabels(record)).toEqual(['ROCm', 'Vulkan', 'PyTorch']);
  });

  it('collects quantization fields without requiring a fixed schema key', () => {
    const record = hardware({
      quantization_compatibility: ['GGUF Q4'],
      supported_quantization: { weights: ['INT8', 'INT4'] },
    });
    expect(quantizationLabels(record)).toEqual(['GGUF Q4', 'INT8', 'INT4']);
  });

  it('keeps model-fit language capacity-only and conservative', () => {
    expect(modelFitTier(8)).toContain('1B–7B');
    expect(modelFitTier(32)).toContain('20B–32B');
    expect(modelFitTier(64)).toContain('70B-class');
    expect(modelFitTier(undefined)).toContain('Unknown');
  });
});
