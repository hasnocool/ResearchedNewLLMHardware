# NVIDIA Groq 3 LPX

Last updated: **2026-08-26**

NVIDIA Groq 3 LPX is a rack-scale interactive-inference accelerator built around the third-generation Groq Language Processing Unit (LPU). NVIDIA announced on August 24, 2026 that LPX is now in **full production** and positions it as a low-latency token-generation extension to the Vera Rubin platform.

This belongs in the catalog as a distinct inference architecture. It should not be counted as another Rubin GPU, because the LPU memory hierarchy, execution model and workload role are different.

## Current manufacturer specifications

**Category:** rack-scale interactive inference / LPU  
**Status:** full production  
**Primary role:** extremely low-latency autoregressive token generation  
**LPUs per rack:** **256**  
**SRAM per LPU:** **500 MB**  
**SRAM bandwidth per LPU:** **150 TB/s**  
**Scale-up bandwidth per LPU:** **2.5 TB/s**  
**Rack SRAM:** **128 GB**  
**Rack DDR5:** **12 TB**  
**Rack SRAM bandwidth:** **40 PB/s**  
**Rack scale-up bandwidth:** **640 TB/s**  
**Price:** no stable public standalone hardware price captured

The architecture is explicitly designed to complement Vera Rubin NVL72 systems. Rubin GPUs can handle high-throughput compute and large model phases while LPX targets the latency-sensitive token-generation path.

## Why the memory hierarchy matters

The headline 150 TB/s per-LPU bandwidth is SRAM bandwidth, not HBM bandwidth. Each LPU has only 500 MB of local SRAM, while the rack provides 12 TB of DDR5 for larger model and workload capacity.

That means LPX should not be ranked against HBM GPUs by simply dividing bandwidth by watts or price. Practical performance depends on how weights, KV cache and execution state are partitioned across the rack hierarchy.

## Independent benchmark evidence

NVIDIA cites **Artificial Analysis** testing of Groq 3 LPX with **Gemma 4 31B** at a **100,000-token context**. The reported result is:

- **3,400 output tokens/sec**;
- NVIDIA summarizes the result as **4x faster than the nearest alternative platform** in that test.

The 3,400 tok/s figure is useful because it is tied to a named model, long context and an independent benchmarking organization. The 4x comparison should still be traced to the exact Artificial Analysis comparison set and methodology before using it in normalized rankings.

## Availability

NVIDIA says Groq 3 LPX is now in full production.

Announced adopters/deployment partners include:

- **Nebius** — first announced adopter;
- **Groq** — plans to deploy LPX with Vera Rubin NVL72 in its inference cloud;
- **Dell Technologies** — working with Groq on deployment.

This is therefore no longer an announcement-only watch item. The next major evidence gaps are delivered system price, power, model-placement behavior and broader independent throughput/latency measurements.

## Research questions

Track:

- rack and per-LPU power;
- delivered rack/system pricing;
- tokens/sec/watt and cost/token;
- performance across Qwen, Llama, GPT-OSS, DeepSeek and larger MoE models;
- DDR5-to-SRAM placement behavior;
- how prefill is divided between Rubin GPUs and LPX;
- latency and throughput as context/KV cache grows;
- scaling beyond one LPX rack;
- software/runtime interfaces exposed to customers.

## Sources

Manufacturer:

- https://www.nvidia.com/en-us/data-center/lpx/
- https://nvidianews.nvidia.com/news/nvidia-groq-3-lpx-now-in-full-production-with-world-class-speed-for-agentic-ai
- https://blogs.nvidia.com/blog/vera-rubin-lpx-spectrum-x-nvlink-fusion/

Deployment partner:

- https://groq.com/blog/groq-among-the-first-to-bring-nvidia-groq-3-lpx-and-vera-rubin-nvl72-to-market

## Catalog treatment

**Tier:** Datacenter specialist / high-interest architecture.  
**Buying relevance:** not a local-retail candidate.  
**Research relevance:** very high for deterministic low-latency generation, unusual memory hierarchies and GPU+LPU heterogeneous serving.
