# Tenstorrent Blackhole LLM Hardware

Last updated: **2026-08-20**

Tenstorrent Blackhole is tracked as a **distinct compute platform from Wormhole**. The most relevant current products are the p100a and p150 PCIe cards plus the TT-QuietBox 2 workstation.

## Why Blackhole matters

Blackhole increases per-card memory capacity and bandwidth over Tenstorrent's Wormhole generation while retaining an open software direction and strong accelerator-to-accelerator fabric options. For local and distributed LLM inference, the important characteristics are:

- up to **32 GB GDDR6 per Blackhole ASIC/card**;
- up to **512 GB/s memory bandwidth** on p150 cards;
- **664 TFLOPS BLOCKFP8** vendor specification per p100a/p150 card;
- **PCIe 5.0 x16** host interface;
- p150 cards expose **4x QSFP-DD 800G** Blackhole fabric ports;
- fully open-source Tenstorrent software stack;
- current manufacturer storefront pricing starting at **US$999**.

Synthetic BLOCKFP8 throughput is not treated as a direct predictor of LLM tokens/sec. Model support, memory placement, compiler/runtime maturity, inter-card sharding efficiency and actual decode/prefill performance remain more important.

## Blackhole p100a

**Price observed:** US$999, manufacturer store, in stock/ready to ship on 2026-08-20  
**Memory:** 28 GB GDDR6  
**Bandwidth:** 448 GB/s  
**Tensix cores:** 120  
**Big RISC-V cores:** 16  
**SRAM:** 180 MB  
**BLOCKFP8:** 664 TFLOPS vendor specification  
**Board power:** 300 W  
**Interface:** PCIe 5.0 x16  
**Cooling:** active

The p100a is the lowest-cost Blackhole entry. Its 28 GB memory capacity is the principal limitation for larger local LLMs, but the combination of newer architecture, open software and US$999 pricing makes it an important accelerator to benchmark against consumer GPUs and older datacenter cards.

## Blackhole p150a / p150b

**Price observed:** US$1,399 each, manufacturer store, in stock/ready to ship on 2026-08-20  
**Memory:** 32 GB GDDR6  
**Bandwidth:** 512 GB/s  
**Tensix cores:** 120  
**Big RISC-V cores:** 16  
**SRAM:** 180 MB  
**BLOCKFP8:** 664 TFLOPS vendor specification  
**Board power:** 300 W  
**Interface:** PCIe 5.0 x16  
**Fabric:** 4x QSFP-DD 800G passive Blackhole fabric ports

The p150a is active-cooled for workstations; p150b is passive and intended for rack/server airflow.

### Why p150 is more interesting for distributed LLMs

The 800G fabric ports are the key differentiator. Tenstorrent explicitly positions p150 cards for multi-card scaling and memory pooling. The catalog should still avoid assuming that pooled accelerator memory behaves like one coherent VRAM address space unless a particular runtime/model configuration demonstrates that behavior.

## TT-QuietBox 2

Tenstorrent's current Blackhole desktop workstation combines **two p300c cards / four Blackhole ASICs**.

**Price:** US$9,999  
**Accelerator memory:** 128 GB aggregate GDDR6  
**Tensix cores:** 480 total  
**Accelerator SRAM:** 720 MB total  
**Host memory:** 256 GB DDR5-5600  
**CPU:** AMD Ryzen 7 9700X  
**Storage:** 4 TB NVMe  
**Cooling:** liquid  
**PSU:** 1600 W  
**OS:** Ubuntu 24.04.3 LTS

Each internal p300c contains two Blackhole ASICs and provides 64 GB GDDR6 with 1,024 GB/s aggregate card bandwidth. Two p300c cards provide 128 GB accelerator memory total.

Tenstorrent's getting-started material says QuietBox 2 ships with **Qwen3-32B pre-loaded**, which is useful software-readiness evidence but is not a cross-platform performance benchmark.

## Current buying/value view

| Product | Memory | Bandwidth | Board/system power | Price observed | Research role |
|---|---:|---:|---:|---:|---|
| Blackhole p100a | 28 GB | 448 GB/s | 300 W board | US$999 | Lowest-cost Blackhole development card |
| Blackhole p150a | 32 GB | 512 GB/s | 300 W board | US$1,399 | Workstation multi-card / fabric experiments |
| Blackhole p150b | 32 GB | 512 GB/s | 300 W board | US$1,399 | Rack/server multi-card deployments |
| TT-QuietBox 2 | 128 GB aggregate accelerator memory | 1,024 GB/s per p300c card | 1,600 W PSU | US$9,999 | Large-model/open-stack workstation research |

## What to benchmark next

Blackhole should be promoted or demoted primarily from reproducible LLM evidence, not BLOCKFP8 numbers. High-value measurements include:

- llama/Qwen/Gemma decode tokens/sec at fixed quantization and context;
- prefill tokens/sec and time-to-first-token;
- single-card versus 2/4-card scaling efficiency;
- power at idle, prefill and sustained decode;
- usable pooled-memory behavior across p150 fabric links;
- TT-Metalium / TT-NN model coverage and conversion friction;
- tokens/sec per dollar versus AMD MI210, GB10, Strix Halo and current consumer GPUs.

## Official sources

- Cards / current pricing: https://tenstorrent.com/en/hardware/cards
- Blackhole PCIe specifications: https://docs.tenstorrent.com/aibs/blackhole/index.html
- Blackhole system firmware documentation: https://docs.tenstorrent.com/tt-system-firmware/boards/tenstorrent/tt_blackhole/doc/index.html
- QuietBox 2 specifications: https://docs.tenstorrent.com/systems/quietbox/quietbox-bh-2/specifications.html
- QuietBox 2 guide: https://docs.tenstorrent.com/tt-quietbox2-guide/
- p300c specifications: https://docs.tenstorrent.com/aibs/blackhole/p300.html
