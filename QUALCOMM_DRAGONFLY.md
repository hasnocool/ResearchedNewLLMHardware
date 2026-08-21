# Qualcomm Dragonfly Data-Center AI Inference

Last updated: **2026-08-21**

This page tracks Qualcomm's Dragonfly rack-scale inference accelerator roadmap separately from the low-power Dragonwing embedded family. Dragonfly is relevant to this repository because it is purpose-built for distributed LLM/LMM inference and places unusual emphasis on **memory capacity, decode bandwidth, tokens per watt, and disaggregated inference** rather than training-oriented peak FLOPS.

## Platform summary

| Platform | Memory | Bandwidth | Rack power | Availability | Evidence state |
|---|---:|---:|---:|---|---|
| Dragonfly AI200 | 768 GB LPDDR5X per card; 43 TB/rack | 0.414 PB/s aggregate rack bandwidth | 140 kW/rack | deployments begin 2026 | manufacturer specs + deployment/demo claims |
| Dragonfly AI250 | 768 GB/card; 43 TB/rack | 133 TB/s effective per card; 7.455 PB/s effective per rack | 140 kW/rack | HBC Gen 1 commercial sampling expected mid-2027 | manufacturer specs + forward-looking efficiency claims |
| Dragonfly AI300 | capacity not yet publicly quantified on current product page | HBC Gen 2; Qualcomm says 54x AI200 effective bandwidth | not yet publicly quantified | commercial sampling expected 2028 | roadmap / forward-looking manufacturer claims |

Do **not** compare Qualcomm's HBC effective-bandwidth figures directly with physical HBM/LPDDR bandwidth without understanding the workload and operations being accelerated near memory.

## Dragonfly AI200

**Category:** rack-scale inference accelerator  
**Memory:** 768 GB LPDDR5X per card  
**Rack:** 56 cards / 43 TB total memory  
**Aggregate rack bandwidth:** 0.414 PB/s  
**Scale-up:** PCIe Gen6  
**Scale-out:** Ethernet with RoCE  
**Cooling:** direct liquid or air  
**Rack TDP:** 140 kW  
**Software:** Qualcomm AI Inference Suite

Qualcomm positions AI200 as a capacity-first accelerator. Its current product page states that one rack can support models up to **10 trillion parameters** and context lengths up to **128K**. In March 2026 Qualcomm also described a demonstration of a **350B generative model on one AI200 card** and stated that the card is designed for models up to roughly **1T parameters**.

The 768 GB/card capacity is the most important property for this catalog: even before throughput is independently characterized, it represents an unusually large memory domain per accelerator for inference.

**Pricing:** sales-led / no stable public numeric price captured.

## Dragonfly AI250 + HBC Gen 1

AI250 keeps the capacity emphasis while introducing **Qualcomm High Bandwidth Compute (HBC) Gen 1**, a near-memory-compute architecture intended to reduce data movement during memory-bound decode.

Qualcomm currently publishes:

- **768 GB per card**;
- **133 TB/s effective bandwidth per card**;
- **18x effective bandwidth versus AI200**;
- **43 TB memory per rack**;
- **7.455 PB/s effective bandwidth per rack**;
- context lengths up to **1M tokens**;
- PCIe Gen6 scale-up and Ethernet/RoCE scale-out;
- 140 kW rack power;
- commercial sampling expected **mid-2027**.

Qualcomm claims **4x–8x better performance per watt** than contemporary GPU-based architectures on a memory-bandwidth-per-watt-per-card basis. This remains a **manufacturer estimate**, not an independent tokens/watt result, and should not be merged into normalized benchmark rankings yet.

## Dragonfly AI300 + HBC Gen 2

AI300 is the third-generation roadmap platform. Qualcomm says HBC Gen 2 is designed for **54x AI200 effective bandwidth**, all-to-all rack scale-up, higher-bandwidth scale-out and full prefill/decode disaggregation. It is also intended to pair with the Dragonfly C1000 CPU in validated pod configurations.

Current public information is still incomplete. Exact per-card memory capacity, physical bandwidth, card power and pricing should remain unknown until Qualcomm publishes stable specifications.

**Commercial sampling:** expected **2028**.

## Software and deployment

Qualcomm's AI Inference Suite is part of the value proposition and should be scored separately from silicon claims. Public material describes:

- Hugging Face model onboarding;
- Efficient Transformers Library;
- bare-metal deployment;
- cloud VM deployment;
- inference-as-a-service;
- OpenAI-compatible APIs in Qualcomm's inference software material;
- infrastructure management for provisioning, monitoring, orchestration and fault handling.

Software maturity should be revisited as production AI200 deployments appear and independent operators report model coverage, conversion friction and serving reliability.

## Research / promotion triggers

Track the family aggressively when any of the following become public:

- delivered card or rack pricing;
- per-card electrical power and measured wall power;
- reproducible prefill/decode tokens/sec for named models;
- independent tokens/watt and tokens/dollar comparisons;
- actual AI200 deployment results during 2026;
- AI250 sampling hardware and physical-vs-effective HBC bandwidth characterization;
- AI300 card capacity and power;
- software compatibility matrices for vLLM, SGLang, PyTorch and common Hugging Face models;
- evidence of disaggregated prefill/decode scaling efficiency.

## Official sources

- https://www.qualcomm.com/data-center/products/qualcomm-dragonfly-ai200
- https://www.qualcomm.com/data-center/products/qualcomm-dragonfly-ai250
- https://www.qualcomm.com/data-center/products/qualcomm-dragonfly-ai300
- https://www.qualcomm.com/data-center/expertise/ai-accelerators
- https://www.qualcomm.com/news/releases/2026/06/qualcomm-unveils-comprehensive-data-center-roadmap-for-the-agent
- https://www.qualcomm.com/news/onq/2026/03/ai-inference-that-scales-qualcomm-ai200-infrastructure-management-suite
