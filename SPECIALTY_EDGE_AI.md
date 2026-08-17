# Specialty Edge AI Systems

Last updated: **2026-08-17**

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

---

## Hailo-10H / Raspberry Pi AI HAT+ 2

**Status:** available  
**Category:** ultra-low-power GenAI accelerator  
**Research priority:** high  
**Evidence level:** manufacturer documentation + authorized reseller pricing

Hailo-10H is one of the most interesting genuinely low-power local-GenAI accelerators currently shipping. Hailo specifies **40 TOPS INT4 / 20 TOPS INT8**, **4 GB or 8 GB LPDDR4/LPDDR4X**, PCIe Gen3 x4 and approximately **2.5 W typical accelerator power**. Raspberry Pi packages the 8 GB version as the **AI HAT+ 2 (SC2166)** for Raspberry Pi 5.

Raspberry Pi documentation states that AI HAT+ 2 can run LLM/VLM workloads up to roughly **6B parameters**, while Hailo's public GenAI model catalog currently centers on smaller models such as Llama 3.2 1B, Qwen2/Qwen2.5 1.5B, Qwen2-VL 2B and DeepSeek-R1-Distill-Qwen 1.5B.

### Current pricing and lifecycle

| Product | Current observation | Notes |
|---|---:|---|
| Raspberry Pi AI HAT+ 2 | **US$200** | Current Raspberry Pi product-page price on 2026-08-17; older US$130 launch references are stale. |
| Raspberry Pi AI HAT+ 2, Canada | **CA$252** | PiShop.ca current listing observed 2026-08-17. |
| Hailo-10H M.2 8 GB | Channel dependent | Hailo now has global Mouser distribution, but a stable public 8 GB module price was not captured in this pass. |

### LLM suitability

The important caveat is software flexibility. Hailo-10H is **not a generic GGUF/llama.cpp GPU replacement**. Models are compiled into Hailo's execution format and depend on the Hailo runtime/model ecosystem. That makes it excellent for a fixed offline assistant, VLM, speech or appliance workload where a supported model is known in advance, but less convenient for experimenting with arbitrary Hugging Face/GGUF checkpoints.

For power-constrained and off-grid deployments, however, the accelerator's ~2.5 W typical draw is exceptional. Host power still needs to be included when comparing complete systems.

Sources:

- https://www.raspberrypi.com/products/ai-hat-plus-2/
- https://www.raspberrypi.com/documentation/accessories/ai-hat-plus.html
- https://hailo.ai/products/ai-accelerators/hailo-10h-m-2-ai-acceleration-module/
- https://hailo.ai/products/hailo-software/model-explorer/generative-ai/type/llm/
- https://www.pishop.ca/product/raspberry-pi-ai-hat-2/

---

## Axelera Metis

**Status:** available  
**Category:** very-low-power edge inference accelerator  
**Research priority:** medium for LLMs, high for vision/edge AI  
**Evidence level:** manufacturer documentation and store pricing

Axelera's Metis M.2 card advertises **214 INT8 TOPS** at roughly **3.5–9 W typical power** in an M.2 2280 card. The current store price begins at **EUR 229.95**. The card has only **1 GB LPDDR4X**, which is the key fact for LLM evaluation: despite the very high TOPS/W figure, that memory capacity makes it unsuitable for general model-weight residency.

Axelera also sells a Metis Compute Board pairing an RK3588 host with the Metis AIPU. The **16 GB accelerator-memory** configuration is currently listed at **EUR 965.95**, with **9–20 W** typical board power and dual Gigabit Ethernet.

### Why it is not ranked as a general LLM accelerator

Axelera currently markets Metis primarily for computer vision, multi-stream inference and supported neural-network pipelines through the Voyager SDK. The catalog therefore does **not** infer broad LLM support from either the 214 TOPS number or the larger Compute Board memory option. These devices become stronger LLM candidates only if Axelera publishes a supported generative-model workflow with model/quantization coverage and reproducible token-generation benchmarks.

Sources:

- https://store.axelera.ai/products/metis-m-2-card-the-most-performant-m-2-edge-ai-accelerator
- https://docs.axelera.ai/assets/files/metis-m2-datasheet-7aaabc0fd72cba4edff377cbbe276c09.pdf
- https://store.axelera.ai/products/metis-compute-board
- https://axelera.ai/hubfs/Axelera_February2025/pdfs/axelera-metis-compute-board-product-brief.pdf?hsLang=en

---

## Orange Pi 6 Plus 64 GB

**Status:** available, configuration/region dependent  
**Category:** high-memory Arm SBC with NPU  
**Research priority:** high  
**Evidence level:** manufacturer specifications + market observation

Orange Pi 6 Plus uses the CIX CD8180/CD8160 platform with a 12-core Arm CPU, Immortalis-G720 MC10 GPU, dedicated **28.8 TOPS NPU**, and up to **64 GB of 128-bit LPDDR5-6000**. The theoretical peak memory bandwidth from the published bus width and data rate is approximately **96 GB/s**. The board also provides **two PCIe 4.0 x4 NVMe slots** and **dual 5GbE**, making it more cluster- and storage-friendly than most SBCs.

The manufacturer advertises **45 TOPS combined CPU+GPU+NPU**, but that combined figure must not be compared directly with a single-accelerator INT4/INT8 TOPS number. For LLM work, the 64 GB memory capacity is more important: it makes roughly 22B–30B-class quantized CPU/GPU inference plausible by capacity, while NPU acceleration remains dependent on CIX runtime/model support.

A recent AliExpress listing tracked on 2026-08-01 was about **US$458.57 for the listing's cheapest selectable configuration**. Because the tracker does not prove that price corresponds to the 64 GB variant, the normalized catalog intentionally does **not** label it as a verified 64 GB price.

The board ships with a 100 W USB-C PD adapter specification; actual idle and sustained LLM inference wall power still needs independent measurement before assigning a strong off-grid score.

Sources:

- https://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-6-Plus.html
- https://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/service-and-support/Orange-Pi-6-Plus.html
- https://orangepi.net/wp-content/uploads/2026/01/OrangePi_6_Plus_Cix_Linux-System_User-Manual_v0.7.pdf
- https://www.pricearchive.org/aliexpress.com/item/1005010193448725
