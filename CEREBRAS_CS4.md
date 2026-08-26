# Cerebras CS-4 / Nexus

Last updated: **2026-08-26**

Cerebras CS-4 is a rack-scale wafer-scale inference system built on the new **Nexus** architecture and three **WSE-3 Turbo** processors.

## Why it matters

CS-4 is not comparable to a normal PCIe GPU. Each wafer integrates compute and SRAM at wafer scale, and the complete system uses three wafers connected through low-latency Direct Wafer Links.

Cerebras positions the platform around very low token latency, frontier-model inference and heterogeneous/disaggregated serving.

## Manufacturer specifications

### Per WSE-3 Turbo wafer

- **4 trillion transistors**
- **900,000 AI cores**
- **44 GB on-wafer SRAM**
- **250 PFLOPS AI compute**
- **43.2 PB/s memory bandwidth**

### CS-4 system

- **3 WSE-3 Turbo wafers**
- **750 PFLOPS AI compute**
- **129.6 PB/s aggregate on-wafer memory bandwidth**
- **160.5 PB/s compute-fabric bandwidth**
- **7.2 Tbit/s system I/O**
- wafer-to-wafer latency as low as **2 microseconds**
- manufacturer positioning for models above **50 trillion parameters** through large-scale clustering

## LLM evidence

Cerebras reports **more than 4,400 tokens/s/user on GPT-OSS-120B** in its published comparison and claims up to 30× the inference speed of the compared GPU systems.

This remains **manufacturer benchmark evidence**. The repo does not convert that claim into an independent cross-platform ranking until the methodology can be independently reproduced.

Cerebras also advertises up to **10× higher throughput per watt than CS-3**. That is a same-vendor generational claim, not a measured cross-vendor tokens/watt result.

## Disaggregated inference

A particularly interesting feature is Direct Wafer Links and programmable low-latency I/O. Cerebras explicitly describes heterogeneous inference where a purpose-built prefill engine can hand work to CS-4 for low-latency decode, including partner architectures such as AMD Helios and AWS Trainium.

This makes CS-4 relevant to the repository even though it is far outside the low-power/consumer category: it represents a useful architectural extreme for separating prefill and decode.

## Pricing and availability

Cerebras says **first CS-4 shipments begin in Q3 2026**.

No stable public numeric purchase price is captured; the platform remains enterprise quote-based.

## Open questions

- full system/rack power;
- delivered enterprise pricing;
- independent GPT-OSS-120B reproduction;
- performance at realistic context lengths and concurrency;
- model-weight residency outside the on-wafer SRAM tier;
- real heterogeneous prefill/decode handoff efficiency.

## Primary sources

- https://www.cerebras.ai/cs4
- https://www.cerebras.ai/cs4-datasheet
- https://www.cerebras.ai/blog/introducing-cerebras-cs-4
- https://www.cerebras.ai/blog/ultrafast-frontier-inference-cerebras-deep-dive-at-hot-chips-2026
- https://investors.cerebras.ai/news-releases/news-release-details/cerebras-unveils-cs-4-30-times-faster-gpu-based-solutions
