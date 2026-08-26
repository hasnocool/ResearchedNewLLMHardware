# OpenAI / Broadcom Jalapeño Intelligence Processor

Last updated: **2026-08-26**

Jalapeño is OpenAI's first custom Intelligence Processor, co-developed with Broadcom for large-scale LLM inference. It is relevant to this catalog as a purpose-built inference ASIC and architectural comparison point, not as a retail/local purchasing candidate.

## Current verified state

**Category:** LLM inference ASIC  
**Status:** production qualification / predeployment  
**Target:** datacenter-scale interactive LLM inference  
**Initial deployment:** planned inside OpenAI infrastructure by the end of 2026  
**Partners:** OpenAI, Broadcom and Celestica  
**Price:** not public / not a retail product  
**HBM:** **216 GiB HBM4** across six stacks, per Hot Chips reporting  
**Memory bandwidth:** **15.4 TB/s** per accelerator, per Hot Chips reporting  
**Peak compute:** **13.4 PFLOPS MXFP4** per accelerator, per Hot Chips reporting  
**Package TDP:** **700 W**  
**Measured sustained power in OpenAI's published tests:** **<=550 W**

OpenAI's August 25 benchmark publication is a major evidence upgrade. Jalapeño is no longer only an engineering-sample watch item: OpenAI has published named-model InferenceX results and a detailed explanation of how the architecture targets prefill, decode, KV-cache locality and network communication.

## Rack-scale architecture

Technical reporting from OpenAI's Hot Chips presentation describes:

- **128 Jalapeño accelerators per rack-scale local domain**;
- roughly **27 TB-class HBM4 per 128-chip deployment**;
- **2,048 accelerators** in the larger global domain;
- a spatial architecture designed to keep model state and KV cache local;
- integrated networking intended to reduce stalls between compute, memory and communication phases.

The important design idea is not merely raw bandwidth. OpenAI says Jalapeño is designed to expose and utilize aggregate HBM bandwidth while minimizing movement of model state between prefill and decode phases.

## First public InferenceX results

OpenAI tested Jalapeño using SemiAnalysis' public **InferenceX** benchmark against commercially available NVIDIA Blackwell systems. Across GPT-OSS 120B, DeepSeek R1 670B and Kimi K2.5 1T, OpenAI reports:

- **1.5x-1.9x more peak AI work per watt**;
- **1.7x-3.6x lower end-to-end latency**;
- up to **4.1x higher performance** in highly interactive operating points.

### GPT-OSS 120B

**Method:** nominal 8k input / 1k output, single-token prediction.  
**Jalapeño package rating:** 700 W.  
**Comparison:** NVIDIA GB200, 1,200 W published package rating.

OpenAI reports:

- **85,448 mixed TPS/kW** vs 44,960 for GB200 (~1.9x);
- **1.03 s** end-to-end latency vs 1.80 s;
- **0.69 ms** minimum time-between-tokens;
- **1,459 tok/s/user** at that minimum-TBT point.

### DeepSeek R1 670B MXFP4

**Method:** nominal 8k input / 1k output, single-token prediction.  
**Comparison:** NVIDIA GB300, 1,400 W published package rating.

OpenAI reports:

- **19,641 mixed TPS/kW** vs 11,781 (~1.7x);
- **1.65 s** end-to-end latency vs 5.99 s;
- **1.43 ms** minimum TBT;
- **700 tok/s/user** at minimum TBT.

### Kimi K2.5 1T MXFP4

**Method:** nominal 8k input / 1k output, single-token prediction.  
**Comparison:** NVIDIA GB300.

OpenAI reports:

- **18,195 mixed TPS/kW** vs 11,862 (~1.5x);
- **1.56 s** end-to-end latency vs 5.31 s;
- **1.44 ms** minimum TBT;
- **694 tok/s/user** at minimum TBT.

## Benchmark caveats

These results are important but should not be treated as a universal production-serving ranking.

- OpenAI normalizes the published comparison using package TDP.
- The major comparisons use **single-token prediction (STP)**.
- Production serving systems can use speculative decoding, multi-token prediction and other techniques that change system-level throughput and latency.
- Jalapeño is not yet broadly deployed, so operational uptime, yield, software maturity and production-scale behavior still need evidence.

The evidence label for these results is **manufacturer public benchmark using a public benchmark suite**, with technical reporting from Hot Chips as secondary corroboration for specifications.

## Software significance

OpenAI says AI was used both to design and program the accelerator. Using Codex with GPT-Astra, engineers brought three open-weight model families to high performance within two months. For selected GPT-OSS attention and MoE blocks, AI-generated implementations ran **1.5x-1.8x faster** than the existing expert-written implementations. Those are kernel/block results, not full-model speedups.

## Roadmap

OpenAI says:

- first deployment begins by the end of 2026;
- **Gen 2** is already deep in development;
- **Gen 3** is taking shape;
- NVIDIA and other partner accelerators will continue to be deployed alongside Jalapeño.

## Official and technical sources

- https://openai.com/index/openai-broadcom-jalapeno-inference-chip/
- https://openai.com/index/jalapeno-first-results/
- https://openai.com/index/the-full-stack-behind-abundant-intelligence/
- https://investors.broadcom.com/news-releases/news-release-details/openai-and-broadcom-unveil-llm-optimized-intelligence-processor

Secondary technical reporting used for Hot Chips package specifications:

- https://www.servethehome.com/openai-jalapeno-asic-at-hot-chips-2026/
- https://www.datacenterdynamics.com/en/news/openai-details-jalape%C3%B1o-ai-chip-with-700w-tdp/

## Watch triggers

Update immediately when:

- OpenAI begins production deployment;
- a full Hot Chips slide deck or formal architecture document is publicly downloadable;
- independent production-system results reproduce the InferenceX advantage;
- pricing/cost-per-token information becomes public;
- a second-generation Jalapeño accelerator is disclosed with concrete specifications;
- production software/runtime interfaces become public.
