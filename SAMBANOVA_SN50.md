# SambaNova SN50 / SambaRack SN50

Last updated: **2026-08-28**

SambaNova's **SN50** is the company's fifth-generation Reconfigurable Dataflow Unit (RDU), purpose-built for large-scale and agentic AI inference. It is materially different from GPU-style accelerators because its dataflow architecture maps model operations onto programmable compute and memory units and uses a three-tier memory hierarchy to reduce repeated off-chip movement.

## Why it belongs in this catalog

SN50 now has enough public architecture, deployment, software, power, and third-party performance evidence to warrant first-class tracking. It is not a local desktop accelerator, but it is relevant to distributed inference because it targets the decode-heavy portion of large-model serving and can be paired with conventional GPU infrastructure for prefill.

## SN50 RDU

**Category:** datacenter AI inference accelerator  
**Generation:** fifth-generation SambaNova RDU  
**Architecture:** Reconfigurable Dataflow / software-managed streaming execution  
**Memory hierarchy:** on-chip SRAM + HBM2e + large-capacity DDR  
**Scale-up:** up to 256 RDUs  
**Scale-out:** SambaNova currently advertises scale-out up to 32K RDUs  
**Software:** SambaStack, vLLM, SGLang  
**Availability:** SambaNova says customer shipments begin in the second half of 2026  
**Standalone price:** no stable public price captured

SambaNova states that SN50 delivers about **5× the compute per accelerator** and **4× the network bandwidth** of the previous generation. Those are manufacturer generation-over-generation claims, not cross-vendor normalized benchmarks.

### Important unknowns

Do not infer the following from older SN40 specifications or generic HBM2e characteristics:

- exact SRAM capacity per SN50;
- exact HBM2e capacity per SN50;
- attached DDR capacity per SN50;
- physical HBM bandwidth per SN50;
- production board/RDU power;
- standalone or delivered system price.

These remain intentionally unset in `data/sambanova_sn50.json`.

## SambaRack SN50

**Accelerators:** 16 SN50 RDUs per rack  
**Cooling:** air cooled  
**Average rack power:** approximately **20 kW**, manufacturer figure  
**Scale-up domain:** up to 256 RDUs  
**Model-size claim:** up to 10-trillion-parameter models  
**Context claim:** up to 10 million tokens  
**Pricing:** quote based / no stable public price captured

The 20 kW number is useful because it places SambaRack in conventional air-cooled datacenter territory, but it should not be confused with a measured maximum input-power specification.

## Hot Chips 2026 architecture/scaling evidence

ServeTheHome's August 25, 2026 Hot Chips coverage adds several useful details that were not present in the original February announcement:

- SN50 continues to use **HBM2e** alongside SRAM and larger-capacity memory tiers;
- the rack contains **16 RDUs** across two nodes;
- model-bandwidth utilization was shown remaining around **45% at 256 RDUs**;
- a **512-RDU** scale-out example exceeds **350 TB/s aggregate model bandwidth**;
- SambaNova demonstrated heterogeneous serving in which GPUs perform prefill and SN50 performs decode.

The 512-RDU bandwidth figure is a large multi-rack scale-out example, not a single-rack specification.

## MiniMax M2.7 benchmark evidence

The strongest public SN50 result so far is a **heterogeneous disaggregated-inference** setup:

- **Prefill:** four NVIDIA H200 GPUs
- **Decode:** one 16-RDU SambaRack SN50
- **Runtime:** vLLM
- **Model:** MiniMax M2.7

Artificial Analysis reporting cited by independent press measured about **763 output tok/s at a 10k-token workload**. SambaNova's July preview summarized results up to **850 tok/s on shorter-context workloads** and over **450 tok/s on longer-context workloads**. SambaNova later reported that SemiAnalysis independently benchmarked two 16-RDU configurations at roughly **800 tok/s** for maximum interactivity and roughly **400 tok/s** for a higher-throughput configuration.

### Benchmark interpretation

These results are important but must not be entered as `SN50-only end-to-end tok/s` because H200 GPUs perform the prefill stage. They are best classified as evidence for **SN50 decode acceleration inside a heterogeneous serving pipeline**.

## Software maturity

SambaNova says the current SN50 demonstration path uses **vLLM**, and that RDUs fit into both **vLLM and SGLang** serving environments. This meaningfully improves deployability compared with proprietary accelerator stacks that require completely custom application interfaces.

What still needs independent verification:

- model-conversion friction and unsupported operators;
- exact vLLM/SGLang feature parity;
- quantization coverage;
- KV-cache behavior across memory tiers;
- production multi-rack reliability and scaling efficiency.

## Research priority

**Very high** for rack-scale inference and disaggregated prefill/decode research.

Promotion criteria for a stronger ranking:

1. exact SN50 memory capacities and physical bandwidth;
2. production RDU/rack maximum power;
3. delivered system pricing;
4. independent prefill + decode methodology on named open models;
5. tokens/watt under comparable workloads;
6. independent 16 → 64 → 128 → 256 RDU scaling results;
7. broader production model/runtime compatibility data.

## Sources

### Manufacturer

- https://sambanova.ai/blog/introducing-the-sn50-rdu-purpose-built-for-agentic-inference
- https://sambanova.ai/products/rdu-ai-chips
- https://sambanova.ai/products/sambarack
- https://sambanova.ai/products/dataflow-architecture
- https://sambanova.ai/blog/semianalysis-benchmarks-sambarack-sn50-with-fast-inference-on-minimax-m2.7
- https://sambanova.ai/blog/sn50-runs-fastest-minimax-speeds-in-the-world

### Independent / third-party

- https://www.servethehome.com/sambanovas-sn50-rdu-for-ai-at-hot-chips-2026/
- https://www.theregister.com/ai-and-ml/2026/07/08/intel-backed-ai-chip-startup-sambanova-breathes-new-life-into-aging-nvidia-gpus-in-latest-benchmarks/5268721
- https://artificialanalysis.ai/models/minimax-m2-7/providers
