# Lenovo ThinkSystem SR650a V4 — heterogeneous LLM inference host

**Research date:** 2026-08-31

## Why it matters

Lenovo's current Edge AI Partner Spotlight identifies the ThinkSystem SR650a V4 as a 2U host for dense accelerator deployments. It is relevant to distributed/local inference when the bottleneck is host memory, PCIe connectivity, accelerator density, or CPU-side orchestration rather than standalone CPU token generation.

## Captured specifications

- 2-socket 2U rack server
- Up to one or two Intel Xeon 6 processors, up to 86 cores and 350 W TDP per CPU (Lenovo partner listing)
- Up to four double-wide GPUs or eight single-wide GPUs at the front of the chassis
- PCIe 5.0 throughout
- Optional Neptune Core liquid cooling
- Purpose-built SR650i V4 Inference Model with dual Xeon 6530P processors and 512 GB system memory
- Intel AMX available on supported Xeon 6 processors

## LLM-inference assessment

This is a host/platform record, not a new accelerator architecture. It can be a practical chassis for NVIDIA, AMD, Intel or other PCIe accelerators, and the 512 GB inference configuration is relevant for CPU-side KV-cache staging, retrieval, batching and multi-accelerator orchestration. No standalone LLM tok/s result, whole-system power figure, or public street price was found in the captured sources, so those fields remain unknown.

## Evidence quality

- **Manufacturer/partner evidence:** chassis density, PCIe 5.0, cooling and inference-model configuration.
- **Not yet captured:** independent end-to-end LLM benchmarks, wall power, exact GPU SKU combinations, pricing and availability by region.

## Sources

- Intel Industry Solution Builders partner spotlight (updated 2026-08-25): https://builders.intel.com/ecosystem-engagement/solution-hub/edge-ai-catalog/partner-spotlight/lenovo-thinksystem-sr650a-v4-279
- Lenovo ThinkSystem SR650a V4 product brief: https://lenovopress.lenovo.com/lp2124-thinksystem-sr650a-v4

## Promotion/watch criteria

Promote from host/platform watch status when a Lenovo configuration has a public price or quote, a named accelerator configuration, and reproducible LLM throughput or power data.
