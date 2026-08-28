# Skymizer HTX301 / HyperThought — 384 GB LLM accelerator

_Last verified: 2026-08-28_

Skymizer's HTX301 is an early-access, purpose-built LLM inference reference platform rather than a general-purpose GPU. The current product page describes a single PCIe card populated with six HTX301 Language Processing Unit (LPU) chips, 384 GB of LPDDR-class memory, and approximately 240 W total board power. Skymizer markets the card for 4B–700B-parameter inference.

## Why it matters

The unusual part is capacity per board watt. Using only the published reference-card specifications, 384 GB / ~240 W is about **1.6 GB of on-card memory per board watt**. That is a capacity ratio, not tokens/joule, and it excludes the host, cooling system, and power-supply losses.

If independently validated, a 384 GB PCIe inference card at roughly 240 W would occupy a very different deployment niche from high-power HBM accelerators and multi-GPU systems. It could be relevant where model capacity, data sovereignty, and predictable power matter more than broad framework portability.

## Architecture and software

HTX301 is built around Skymizer's HyperThought platform and LISA v3 instruction-set architecture. The design is explicitly decode-first and disaggregates prefill and decode through a proprietary compiler/runtime orchestration stack.

Do **not** assume CUDA, ROCm/HIP, MLX, native vLLM, TensorRT-LLM, OpenVINO, or direct GGUF/GPTQ/AWQ compatibility. Skymizer states that HyperThought supports quantized LLMs plus proprietary weight and KV-cache compression, but current public material does not publish a drop-in model-file compatibility matrix.

## Performance claims: keep them separate

Skymizer currently publishes three distinct classes of claims:

| Claim | Scope | How the catalog treats it |
|---|---|---|
| 4B–700B inference, 384 GB, ~240 W | Six-chip HTX301 PCIe reference card | Manufacturer capacity/power claim; no independent benchmark yet |
| 240 tok/s Llama 2 7B prefill | Octa-core HTX301/HyperThought platform | Platform-level prefill claim, not six-chip-card decode throughput |
| Up to 1200 tok/s Llama 7B prefill | Multi-chip HyperThought | Platform scaling claim; configuration metadata is incomplete |
| 30 tok/s at 100 GB/s and 0.5 TOPS | HyperThought efficiency point | Architecture-level vendor claim, not identified as the 384 GB card |

The 700B statement is therefore **not** converted into an estimated tokens/second value.

## Important unknowns

As of this verification pass, Skymizer has not publicly specified the six-chip card's aggregate memory bandwidth, exact LPDDR generation/mix, PCIe generation and lane width, dimensions, slot width, cooling requirement, auxiliary-power connectors, public price, independent decode throughput, exact 700B model, quantization, context length, or end-to-end system power.

There is also a public-source discrepancy: the HTX301 product page currently says 4B–700B for the six-chip reference platform, while the broader HyperThought page says model reach up to 600B. The catalog preserves both facts and uses the product-specific 700B statement only as a vendor claim.

## Availability and pricing

The card is in **early access**. Skymizer provides a request-preview/contact path but no public MSRP or defensible retail/distributor price. It should therefore not yet be ranked on cost-per-token or cost-per-GB against purchasable GPUs.

## Off-grid / low-power assessment

At card level, ~240 W for 384 GB is notable. At system level, suitability is only **low to moderate** until host and cooling overhead are known. A realistic deployment needs the accelerator, host CPU/memory/storage, PCIe platform, cooling, and conversion losses included in the energy budget.

## Primary sources

- Skymizer HTX301 product page: https://skymizer.com/products/htx301/
- Skymizer HTX301 announcement (2026-04-23): https://skymizer.com/announcements/htx301-on-prem-ai-inference/
- Skymizer HyperThought platform: https://skymizer.com/products/hyperthought/

## Follow-up research targets

The highest-value missing measurements are independent decode/prefill benchmarks, aggregate memory bandwidth, supported quantization/model formats, actual host/runtime requirements, full-card dimensions and cooling, wall-power under representative 70B/120B/700B workloads, and public pricing.
