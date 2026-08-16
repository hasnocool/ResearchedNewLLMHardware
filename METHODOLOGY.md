# Research and Ranking Methodology

Last updated: **2026-08-15**

This project evaluates hardware for **real local and distributed language-model inference**, not generic AI marketing performance.

## 1. Core principle

A hardware candidate is useful only when the full system can execute useful models at acceptable speed, power, cost and operational complexity.

Consequently:

> **TOPS is metadata, not the ranking.**

TOPS values can differ by datatype, sparsity assumptions, matrix shape and vendor counting method. They should never be directly compared without those qualifiers.

## 2. Primary scoring dimensions

### 2.1 Usable model memory — 25%

Questions:

- How much memory can the inference engine actually allocate?
- Is memory unified, dedicated, host-shared or partitioned?
- Is there a GPU/NPU carveout limit?
- Is ECC available?
- Can multiple devices expose model memory effectively to one workload?

Suggested normalization tiers:

| Usable memory | Capacity score |
|---:|---:|
| < 8 GB | 10 |
| 8–15 GB | 25 |
| 16–31 GB | 45 |
| 32–47 GB | 60 |
| 48–63 GB | 72 |
| 64–95 GB | 82 |
| 96–127 GB | 90 |
| 128–159 GB | 96 |
| >= 160 GB | 100 |

This is deliberately nonlinear because crossing model-fit thresholds can matter more than a small compute increase.

### 2.2 Memory bandwidth — 20%

Autoregressive decode is frequently memory-bandwidth constrained. Record **measured sustained bandwidth** when available and theoretical peak separately.

Examples of useful classes:

- ordinary dual-channel DDR: low
- wide LPDDR5X unified memory: medium
- GDDR6: high
- HBM2e/HBM3: very high

Bandwidth must be interpreted together with model placement. A 1.6 TB/s 64 GB card and a 256 GB/s 128 GB unified-memory APU solve different problems.

### 2.3 Real LLM performance per watt — 20%

Preferred metric:

```text
LLM_decode_efficiency = measured_decode_tokens_per_second / measured_wall_watts
```

Also retain:

```text
prefill_efficiency = measured_prefill_tokens_per_second / measured_wall_watts
```

Never substitute vendor TOPS/W for measured tokens/joule when a real LLM result exists.

### 2.4 Software maturity — 15%

Suggested scoring inputs:

- stable Linux support
- llama.cpp backend
- PyTorch support
- vLLM or equivalent serving path
- CUDA / ROCm / OpenVINO / Vulkan maturity
- quantization support
- flash-attention or architecture-specific optimized kernels
- multi-device support
- reproducible installation
- current driver maintenance

A theoretically efficient ASIC with poor model coverage can score below a slower GPU with mature software.

### 2.5 Acquisition value — 10%

Use delivered system cost where possible, not only accelerator MSRP.

Useful derived values:

```text
usd_per_usable_gb
usd_per_measured_decode_tps
usd_per_gb_per_gbps_bandwidth
```

Secondary-market pricing should include expected host/cooling/power-adapter costs.

### 2.6 Clusterability — 5%

Consider:

- Ethernet speed
- RDMA / RoCE / InfiniBand-class capabilities
- ConnectX
- Infinity Fabric links
- accelerator-native fabric
- PCIe generation and lane count
- peer-to-peer support
- software support for tensor/model/pipeline parallelism

### 2.7 Operational practicality — 5%

Penalties include:

- passive server cooling requirement
- unusual PSU/connectors
- proprietary host
- architecture incompatibility
- excessive idle power
- poor driver support
- fragile installation
- unavailable replacement parts

## 3. Evidence confidence

Each important field should retain provenance.

### Level A — manufacturer specification

Good for physical specifications, memory size, interfaces, advertised availability and official software support.

Not sufficient by itself for independent performance claims.

### Level B — independent measurement

Best evidence when methodology includes exact model, quantization, runtime, versions, context and power.

### Level C — community measurement

Useful for identifying real support and approximate performance. Configuration must be preserved.

### Level D — vendor benchmark

Useful evidence but may be highly optimized for the vendor's product. Keep separate from independent rankings.

### Level E — unverified claim

Track only in watch status.

## 4. Benchmark record schema

Each benchmark should eventually have a machine-readable record similar to:

```json
{
  "hardware_id": "amd-ryzen-ai-max-plus-395-128gb",
  "model": "example/model",
  "parameters_b": 32,
  "quantization": "Q4_K_M",
  "runtime": "llama.cpp",
  "runtime_commit": null,
  "backend": "ROCm",
  "context_tokens": 8192,
  "batch": 1,
  "prefill_tps": null,
  "decode_tps": null,
  "wall_power_w": null,
  "source_type": "independent",
  "source_url": null,
  "measured_at": null
}
```

## 5. Product record requirements

A normal hardware record should capture:

- stable ID
- manufacturer
- product
- compute platform
- category
- lifecycle/availability status
- architecture
- CPU architecture
- accelerator type
- native compute topology where meaningful
- memory capacity
- memory type
- memory bandwidth
- power/TDP/TBP
- measured wall idle/load when known
- host interface
- cluster interconnect
- software backends
- current observed price
- currency
- region
- date observed
- evidence/confidence
- caveats
- source URLs

## 6. Platform-family normalization

Do not duplicate benchmark evidence simply because the same silicon ships in different OEM enclosures.

Example:

```text
compute_platform = nvidia-gb10-grace-blackwell
products = [DGX Spark, ASUS Ascent GX10, HP ZGX Nano, Lenovo PGX, ...]
```

Benchmark inheritance should distinguish:

- **silicon/platform evidence** — may generalize cautiously
- **exact system evidence** — thermals, power and performance belong to the tested OEM box

The same rule applies to Ryzen AI Max+ 395 systems.

## 7. Power accounting

Store these separately:

- chip TDP/TBP
- configured package power
- PSU rating
- wall idle
- wall inference load
- wall maximum

A 240 W power adapter does **not** mean a system continuously consumes 240 W.

## 8. Price tracking

Every price observation should include:

```text
price
currency
region
configuration
availability
observed_at
source
```

Significant-change alert guideline:

- >= 15% price drop on a high-interest candidate
- a previously unavailable high-memory SKU becomes orderable
- a product moves from announcement/sampling to retail
- used datacenter hardware crosses a predefined value threshold

## 9. Promotion rules

### Promote from watch to catalog when:

- hardware has a credible public specification,
- memory and power are known well enough to assess suitability,
- there is a plausible software path,
- and price/availability or benchmark evidence makes it actionable.

### Promote to high-interest shortlist when:

- it offers a meaningful improvement in capacity, bandwidth, performance-per-watt, price, software support or clusterability.

### Demote when:

- availability disappears for a long period,
- software is abandoned,
- independent tests materially contradict vendor claims,
- or better hardware makes the candidate economically irrelevant.

## 10. What not to do

Avoid rankings built from:

- TOPS alone
- TFLOPS alone
- NPU marketing totals that combine unlike compute engines
- PSU wattage as actual consumption
- model parameter capacity without stating quantization
- benchmark results copied from a different OEM system without labeling them platform-family evidence
- price comparisons that omit RAM/storage configuration
