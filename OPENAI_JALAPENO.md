# OpenAI / Broadcom Jalapeño Intelligence Processor

Last updated: **2026-08-21**

Jalapeño is OpenAI's first publicly named custom Intelligence Processor, co-developed with Broadcom for large-scale LLM inference. It is relevant to this catalog as a purpose-built inference ASIC and a useful architectural comparison point, not as a retail/local purchasing candidate.

## Current verified state

**Category:** LLM inference ASIC  
**Status:** engineering samples / predeployment  
**Target:** datacenter-scale interactive LLM inference  
**Initial deployment:** planned by the end of 2026  
**Partners:** OpenAI, Broadcom and Celestica  
**Networking:** Broadcom technologies including Tomahawk are part of the wider platform  
**Price:** not public / not a retail product  
**Memory capacity:** not public  
**Memory bandwidth:** not public  
**Power:** not public  
**Peak compute:** not public

OpenAI says engineering samples are running ML workloads at production target frequency and power, including GPT-5.3-Codex-Spark. OpenAI and Broadcom also state that early testing shows performance per watt substantially better than current state-of-the-art, but they have not yet published enough methodology or numerical detail for normalized comparison.

## Architectural significance

Unlike general-purpose accelerators adapted to inference, Jalapeño is described as a blank-slate design around modern LLM serving. OpenAI says the architecture reduces data movement and balances compute, memory and networking to increase realized utilization relative to theoretical peak performance.

That makes the future technical report especially important for this repository. Useful details would include:

- memory technology, capacity and bandwidth;
- compute datatypes and peak/realized throughput;
- board/rack power;
- interconnect topology and bandwidth;
- prefill and decode throughput for named models;
- latency at different batch/concurrency levels;
- tokens/watt and tokens/dollar;
- deployment form factor and rack density.

## Evidence policy

The current efficiency statement is recorded as **manufacturer early-testing evidence**, not an independent benchmark. No synthetic performance number, price, memory specification or power value should be inferred until OpenAI/Broadcom publish them.

## Official sources

- https://openai.com/index/openai-broadcom-jalapeno-inference-chip/
- https://investors.broadcom.com/news-releases/news-release-details/openai-and-broadcom-unveil-llm-optimized-intelligence-processor
- https://openai.com/index/openai-and-broadcom-announce-strategic-collaboration/

## Watch triggers

Update immediately when:

- OpenAI publishes the promised detailed technical report;
- concrete memory/power/interconnect specifications appear;
- deployment begins in production by the end of 2026;
- independent or customer workload results become public;
- a second-generation Jalapeño-family accelerator is disclosed.
