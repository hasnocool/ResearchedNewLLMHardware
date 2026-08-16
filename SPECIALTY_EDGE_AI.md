# Specialty Edge AI Systems

Last updated: **2026-08-15**

This file tracks unusual purpose-built edge AI systems that are relevant to local LLM inference but do not yet have enough public information to rank alongside mature CUDA, ROCm, Apple Silicon, or mainstream SBC platforms.

## Acrab Agent Box / GΞLIX 1

**Status:** announced / early rollout  
**Category:** purpose-built edge AI system  
**Research priority:** very high  
**Evidence level:** manufacturer specifications + vendor benchmark

Acrab announced its first-generation **GΞLIX 1** edge-AI SoC and the **Agent Box** reference system in July 2026. The public manufacturer material describes a 5 nm heterogeneous SoC designed specifically for local agentic AI and large-model inference.

### Publicly supported specifications

| Field | Current evidence |
|---|---|
| CPU | 20-core Arm |
| Accelerators | Integrated GPU + multicore NPU |
| Memory architecture | Unified memory |
| Memory bandwidth | **273 GB/s** |
| Process | 5 nm |
| Claimed model class | Up to **100B-parameter-class** open-source models |
| Exact memory capacity | **Not publicly verified** |
| System power | **Not publicly verified** |
| Retail price | **Not publicly verified** |
| Shipping availability | Early/unclear; do not assume broad retail availability |

### Vendor benchmark

Acrab reports **1,416.8 prefill tokens/sec** on **Gemma 26B A4B** with a **40K KV cache** and **10K-token input**. Acrab compares that result with 188.9 tok/s on a Mac mini M4 Pro under its stated test configuration.

This belongs in the evidence database as a **vendor benchmark**, not as an independent cross-platform ranking. Decode speed is still needed because autoregressive decode is often more important than prefill for interactive local LLM use.

### Why it matters

A purpose-built system combining high unified-memory bandwidth with an LLM-specific runtime could become a strong low-power alternative to general-purpose GPU systems if the missing capacity, power, price and software details are favorable. The **273 GB/s** memory bandwidth puts the public specification in the same broad bandwidth class as several compact unified-memory AI systems, while the vendor's 100B-class positioning suggests a memory subsystem much larger than ordinary edge NPUs.

### What must be verified before promotion

- exact installed and maximum unified-memory capacity;
- retail/channel pricing by region;
- actual orderability and shipping dates;
- idle and sustained wall power;
- decode tok/s across named quantized models;
- context-length and KV-cache scaling;
- supported model and quantization matrix;
- public SDK/runtime/toolchain documentation;
- Linux distribution and driver details;
- independent benchmark reproduction;
- networking and multi-node capabilities.

### Vendor and documentation URLs

- Product/company: https://www.acrab.ai/
- Product launch/news: https://www.acrab.ai/news.html
- Vendor press release with technical details: https://www.prnewswire.com/news-releases/acrab-unveils-glix-1-soc-and-agent-box-bringing-state-of-the-art-ai-to-the-edge-302833081.html

### Catalog rule

Do **not** import third-party claims for exact TOPS, memory capacity, price or power into the normalized catalog unless they can be traced to Acrab documentation or independently reproduced. Unknown fields should remain `null` rather than being guessed.
