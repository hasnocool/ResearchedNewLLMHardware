# SiMa.ai Modalix — Low-Power GenAI / LLM Edge Hardware

Last updated: **2026-08-27**

SiMa.ai's Modalix family is a purpose-built edge inference platform that deserves a separate entry from vision-only NPUs because the current software stack explicitly supports **LLMs, VLMs, GGUF models, Qwen VL, LFM2, Whisper pipelines, and on-device GenAI**.

## Why it matters

The key attraction is not raw TOPS alone. Modalix combines:

- **50 TOPS** machine-learning acceleration with BF16 / INT8 / INT16 support;
- an 8-core Arm Cortex-A65 application CPU;
- LPDDR5 local system memory;
- sub-10-watt vendor positioning for Modalix-class Physical AI workloads;
- a production SoM, purchasable development kit, and a PCIe HHHL accelerator form factor;
- SiMa.ai Palette / LLiMa software with GGUF-oriented LLM deployment paths.

This makes Modalix relevant to low-power local agents, multimodal edge pipelines, robotics, industrial inference, speech + LLM pipelines, and helper nodes where a large workstation GPU would be operationally excessive.

## Modalix HHHL PCIe Card

**Category:** low-power PCIe GenAI / Physical AI accelerator  
**Compute:** 50 TOPS MLA; BF16, INT8 and INT16  
**CPU:** 8× Arm Cortex-A65 at approximately 1.4 GHz  
**Current documented memory:** **16 GB or 32 GB LPDDR5** in SiMa.ai's current developer documentation  
**Launch product brief memory:** 8 GB or 16 GB LPDDR5  
**Power:** vendor states **under 10 W** for the Modalix PCIe card / Physical AI workload class  
**Cooling:** passive / fanless  
**Host integration:** PCIe Gen5  
**Networking:** 10GbE  
**Edge I/O:** dual GMSL2 camera interfaces, microSD, UART/debug interfaces  
**Software:** Palette, LLiMa, GGUF deployment support, Qwen VL, LFM2, Whisper + LLM pipelines

### Documentation discrepancy to preserve

SiMa.ai's March 2026 product brief describes **8/16 GB memory** and a PCIe Gen5 x8 interface, while newer developer documentation describes **16/32 GB LPDDR5** and a PCIe Gen5 x4 host link. The catalog therefore records both rather than silently choosing one specification. The likely explanation is a hardware/revision/configuration change, but that should not be assumed until SiMa.ai publishes an explicit revision mapping.

### Price / availability

The card is currently presented on SiMa.ai's product-family page through **Product Inquiry / contact sales**. No stable public numeric card price was found, so the repository intentionally records quote-only pricing.

## Modalix SoM

The production Modalix SoM provides the same 50-TOPS platform in a compact module. SiMa.ai's current product-family page advertises **pricing from US$449**, while older 2025 launch material documented volume reference pricing of US$349 for an 8GB SoM and US$599 for a 32GB SoM at 1,000-unit quantities. Those older values should remain historical observations rather than replacing current storefront/product-page pricing.

The SoM is particularly interesting for dense low-power edge clusters or custom carrier boards because it can remove the overhead of a conventional x86 host.

## Modalix DevKit 3.0

SiMa.ai's official store currently lists **US$1,499** for DevKit 3.0 and shows it in stock. The kit includes a Modalix SoM, carrier board, enclosure, universal 12V/5A adapter, and 500GB M.2 NVMe storage.

For research and benchmarking, the DevKit is the easiest reproducible entry point because it is a complete orderable system rather than a volume SoM or quote-only PCIe card.

## Software maturity

Palette SDK 2.0 added GGUF support and automated LLM compilation through SiMa.ai's LLiMa framework. Palette 2.1 subsequently added GA support for LFM2 and Qwen VL runtimes, Ubuntu 24.04 host-driver support, Linux kernel 6.18, 16GB SoM support, and sequential/asynchronous multi-model execution.

This is enough software evidence to move Modalix beyond a generic vision-NPU entry, but it is still not as turnkey or broadly model-compatible as CUDA, ROCm, Metal/MLX, or mainstream llama.cpp GPU backends.

## Research gaps / promotion triggers

- reproducible named-model **prefill and decode tok/s**;
- exact quantization, context length and runtime version for LLM measurements;
- whole-system wall power for DevKit and PCIe-host configurations;
- clarification of the PCIe x4/x8 and 8/16GB vs 16/32GB documentation differences;
- public PCIe-card pricing;
- broader independent LLM/VLM benchmarks;
- model conversion friction and supported-model matrix;
- multi-card scaling behavior.

## Official sources

- Product family: https://sima.ai/mlsoc-family/
- Modalix PCIe announcement: https://sima.ai/press-release/sima-ai-launches-modalix-pcie-card-for-industrial-edge-ai-llms/
- Current PCIe documentation: https://developer.sima.ai/hardware/devkit/modalix-pcie-card
- Modalix product brief: https://sima.ai/wp-content/uploads/2026/03/Modalix-HHHL-PCIe-Product-Brief_01.2-1.pdf
- Palette 2.1 release notes: https://docs.sima.ai/v2.1.2/pages/release_notes/2.1.html
- Palette 2.0 release notes: https://docs.sima.ai/pages/release_notes/2.0.html
- Official DevKit store: https://devkit.sima.ai/products/development-kit-3-0
