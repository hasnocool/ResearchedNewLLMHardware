// src/lib/comparison.ts
import {
  HardwareRecord,
  JsonRecord,
  Observation,
  isRecord,
  memoryBandwidthGbps,
  memoryGb,
  powerWatts,
  primaryPrice,
} from './catalog';

export interface ComparisonMetrics {
  memoryGb?: number;
  bandwidthGbps?: number;
  powerWatts?: number;
  price?: JsonRecord;
  priceAmount?: number;
  priceCurrency?: string;
  costPerGb?: number;
  bandwidthPerCurrencyUnit?: number;
  memoryPerWatt?: number;
  bandwidthPerWatt?: number;
  activeEnergyKwhDay?: number;
  modelFit: string;
  runtimes: string[];
  quantization: string[];
}

function stringsFrom(value: unknown, output: string[] = []): string[] {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed) output.push(trimmed);
    return output;
  }
  if (Array.isArray(value)) {
    for (const child of value) stringsFrom(child, output);
    return output;
  }
  if (isRecord(value)) {
    for (const child of Object.values(value)) stringsFrom(child, output);
  }
  return output;
}

function valuesForMatchingKeys(record: JsonRecord, pattern: RegExp): string[] {
  const output: string[] = [];
  for (const [key, value] of Object.entries(record)) {
    if (pattern.test(key)) stringsFrom(value, output);
  }
  return [...new Set(output)];
}

export function runtimeLabels(record: JsonRecord): string[] {
  return valuesForMatchingKeys(record, /^(software|frameworks?|runtimes?|software_stack|supported_frameworks?)$/i)
    .slice(0, 12);
}

export function quantizationLabels(record: JsonRecord): string[] {
  return valuesForMatchingKeys(record, /quantization/i).slice(0, 10);
}

export function modelFitTier(memory?: number): string {
  if (memory === undefined) return 'Unknown — no normalized accelerator/system memory field.';
  if (memory >= 192) return 'Very large capacity: many 70B–200B quantized models can fit; selected larger/MoE workloads may fit.';
  if (memory >= 96) return 'Large capacity: 70B-class 4-bit models generally have useful headroom; larger/MoE experiments are plausible.';
  if (memory >= 64) return '70B-class 4-bit models may fit, depending on KV cache, context, runtime overhead, and memory topology.';
  if (memory >= 48) return 'Strong 30B–40B capacity; selected 70B-class 4-bit models may be tight.';
  if (memory >= 32) return 'Good 20B–32B 4-bit capacity with room varying by context and runtime.';
  if (memory >= 24) return 'Good 14B–24B capacity; selected ~30B 4-bit models may fit tightly.';
  if (memory >= 16) return 'Comfortable 7B–14B quantized tier; some larger models may require aggressive settings/offload.';
  if (memory >= 12) return 'Strong 7B–8B tier; selected 12B–14B 4-bit models may fit.';
  if (memory >= 8) return 'Small-model tier: roughly 1B–7B quantized workloads, depending on context/runtime.';
  return 'Tiny-model tier: best suited to sub-3B models, embeddings, rerankers, vision/speech, or specialized workloads.';
}

export function comparisonMetrics(
  record: HardwareRecord,
  observations: Observation[],
  activeHoursPerDay: number,
): ComparisonMetrics {
  const memory = memoryGb(record);
  const bandwidth = memoryBandwidthGbps(record);
  const power = powerWatts(record);
  const price = primaryPrice(record, observations);
  const priceAmount = typeof price?.amount === 'number' ? price.amount : undefined;
  const priceCurrency = typeof price?.currency === 'string' ? price.currency : undefined;

  return {
    memoryGb: memory,
    bandwidthGbps: bandwidth,
    powerWatts: power,
    price,
    priceAmount,
    priceCurrency,
    costPerGb: memory && priceAmount ? priceAmount / memory : undefined,
    bandwidthPerCurrencyUnit: bandwidth && priceAmount ? bandwidth / priceAmount : undefined,
    memoryPerWatt: memory && power ? memory / power : undefined,
    bandwidthPerWatt: bandwidth && power ? bandwidth / power : undefined,
    activeEnergyKwhDay: power ? (power * activeHoursPerDay) / 1000 : undefined,
    modelFit: modelFitTier(memory),
    runtimes: runtimeLabels(record),
    quantization: quantizationLabels(record),
  };
}
