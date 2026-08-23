# Beelink GTR9 Pro — Local LLM System Notes

Research date: **2026-08-23**

The Beelink GTR9 Pro is a **system-level variant** of the already tracked AMD Ryzen AI Max+ 395 / Radeon 8060S platform. It should not be counted as a new compute architecture. Its main differentiators are **128 GB LPDDR5X-8000 unified memory, dual 10GbE, dual USB4, dual NVMe, and a large cooling system with an integrated 230 W PSU**.

## Key specifications

| Field | GTR9 Pro |
|---|---|
| CPU | AMD Ryzen AI Max+ 395, 16C/32T Zen 5 |
| GPU | Radeon 8060S, 40 RDNA 3.5 CUs |
| NPU | XDNA 2, 50 TOPS vendor figure |
| Vendor total AI figure | 126 TOPS |
| Memory | 128 GB LPDDR5X-8000 unified, soldered |
| Platform memory bandwidth | ~256 GB/s class |
| Storage | 2 TB included; 2x M.2 2280 PCIe 4.0 x4; vendor states up to 16 TB total |
| Networking | **2x 10GbE**, Wi-Fi 7, Bluetooth 5.4 |
| High-speed I/O | 2x USB4 40 Gb/s, DP 2.1, HDMI 2.1 |
| Chassis | 180 x 180 x 90.8 mm, ~2.34 kg |
| Cooling | Dual fans, full-surface vapor chamber, 137 mm heat fins |
| PSU | Integrated 230 W AC PSU |
| AMD default processor TDP | 120 W |
| Beelink full-performance setting | 140 W |

The 120 W / 140 W values are processor/platform power settings, **not verified whole-system wall power**.

## LLM relevance

The main reason to track this system is not its NPU TOPS figure. It is the combination of a **128 GB unified memory pool and two 10GbE ports** in a compact x86 machine.

Practical roles include:

- 32B-class models at higher-bit quantization;
- 70B-class models at common 4-bit/5-bit quantizations with useful context headroom;
- selected larger or MoE experiments where weights fit in 128 GB;
- networked model serving and distributed experiments over dual 10GbE;
- local RAG/model storage using dual NVMe slots.

Capacity does not imply fast decode. Strix Halo's memory subsystem is much slower than HBM-equipped datacenter accelerators, and backend/runtime maturity still matters.

## Vendor benchmark evidence

Beelink currently publishes **6.23 tok/s for Qwen 32B Q8 in LM Studio** on the GTR9 Pro product page.

This is retained as **vendor benchmark evidence only**. The public page does not provide enough context length, prompt/prefill split, batch/concurrency, exact LM Studio/backend version, or wall-power metadata for normalized cross-platform comparison.

## Software paths

Useful paths include:

- Windows 11 Pro and Ubuntu;
- ROCm-capable Radeon software where supported by the exact OS/runtime version;
- Vulkan;
- LM Studio;
- Ollama;
- llama.cpp-family CPU/Vulkan/ROCm paths.

Do not infer arbitrary XDNA 2 NPU support from the 50-TOPS figure. Large GGUF workloads are typically more dependent on the GPU/CPU memory path and runtime support.

## Power / off-grid assessment

**Off-grid suitability: moderate.** The processor can offer attractive capacity per watt compared with large discrete-GPU workstations, but this GTR9 Pro implementation has an integrated AC PSU rather than a DC-native input and is configured for up to 140 W processor performance.

The manufacturer-hosted review section contains a user report of approximately **15 W idle and up to 180 W during an AI workload on Ubuntu**. That is useful anecdotal evidence, but it is not a controlled manufacturer measurement and therefore is **not stored as verified wall power**.

## Current pricing

On **2026-08-23**, Beelink's official storefront showed:

- **US$4,349 sale price**;
- US$4,699 reference price;
- 128 GB LPDDR5X-8000 + 2 TB SSD;
- add-to-cart / pre-sale state, with the page saying orders ship within 35 days.

At US$4,349, the simple capacity metric is approximately **US$33.98 per GB of unified memory**. This ignores the value of storage, dual 10GbE, warranty, taxes, shipping, and actual inference performance.

This price is materially higher than some other 128 GB Strix Halo systems already tracked in the repository, so the GTR9 Pro's strongest justification is **dual 10GbE plus system integration**, not lowest acquisition cost.

## Primary sources

- Beelink product page: https://www.bee-link.com/products/beelink-gtr9-pro-amd-ryzen-ai-max-395
- Beelink OpenClaw/local-LLM product page: https://www.bee-link.com/products/beelink-gtr9-pro-amd-ryzen-ai-max-395-processor-openclaw
- AMD Ryzen AI Max+ 395: https://www.amd.com/en/products/processors/laptop/ryzen/ai-300-series/amd-ryzen-ai-max-plus-395.html
- AMD developer playbooks: https://developer.amd.com/playbooks/user-guide/

Normalized data: `data/beelink_gtr9_pro_2026.json`  
Price history: `data/price-observations-2026-08-23-beelink-gtr9-pro.jsonl`
