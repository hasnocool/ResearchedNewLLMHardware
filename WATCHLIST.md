# Hardware Watchlist

Last updated: **2026-08-22**

This file tracks hardware that could become important to local or distributed LLM inference after a price, availability, software or benchmark milestone.

## Highest-priority watches

| Candidate | Current state | Trigger for promotion / alert |
|---|---|---|
| NVIDIA GB300 DGX Station class | Ubuntu DGX Station orderable; ASUS ET900N orderable; Dell shipping/call-to-order; HP ZGX Fury pre-order | Stable delivered pricing, named-model decode/prefill results, measured wall power under inference, HBM3e-vs-LPDDR5X placement behavior and two-node ConnectX-8 scaling. |
| NVIDIA RTX Spark N1X systems | Announced / prelaunch for fall-Q4 2026 | First stable retail prices, exact memory bandwidth, sustained power, independent LLM decode/prefill results, and shipping availability for 128 GB systems. |
| AMD Ryzen AI Max PRO 400 systems | Announced for Q3 2026 platform rollout | First orderable 192 GB systems; exact memory bandwidth; ROCm support; measured wall power; real decode benchmarks; street price. |
| Qualcomm Dragonfly AI200 / AI250 / AI300 | AI200 deployment in 2026; AI250 sampling planned mid-2027; AI300 sampling planned 2028 | Public pricing, per-card power, independent tokens/watt, production AI200 results, HBC physical/effective bandwidth characterization and AI250/AI300 sampling data. |
| Tenstorrent Blackhole p100/p150 / QuietBox 2 | Available / shipping | Independent model benchmarks, tokens/watt, usable multi-card memory behavior, 2/4-card scaling efficiency and broader TT-NN model coverage. |
| Qualcomm Dragonwing IQ-9075 / IQ-8275 | Available through developer/partner channels | Stable public EVK/module pricing, wall-power measurements, exact quantization/context for published LLM results, and independent tokens/watt reproduction. |
| Acrab Agent Box / GΞLIX 1 | Announced / early product rollout | Public exact memory capacity, orderable price, system power, decode throughput, developer/runtime documentation, supported-model matrix and independent validation. |
| AMD Kria AI SOM / Ryzen AI Embedded X100 | Announced / ecosystem rollout | Developer kit/SOM pricing, Linux GPU/NPU software details, memory bandwidth and measured LLM throughput. |
| NVIDIA Jetson T3000 | Announced | Retail/dev-kit pricing, module power envelope and real TensorRT/llama.cpp LLM results. |
| NYMPH AX1 | Vendor-announced specialty ASIC | Independent benchmark, public runtime documentation, shipping confirmation and supported-model matrix. |
| Used AMD Instinct MI210 | Mature hardware / secondary market | Meaningful price drops; especially listings where total integration cost makes 64 GB HBM2e attractive versus new unified-memory systems. |
| Tenstorrent Wormhole | Available previous-generation specialist ASIC | Meaningful price reduction, broader transformer support or unusually strong low-cost cluster results versus Blackhole. |
| AMD Versal AI Edge Gen 2 | Adaptive SoC | Reproducible decoder-transformer/LLM deployment with external-memory and wall-power measurements. |
| Altera FPGA AI Suite / Agilex | FPGA | Modern transformer benchmark from spatial compiler path and measured energy efficiency. |

## NVIDIA GB300 deskside watch

NVIDIA's current DGX Station documentation moves GB300 from announcement-only status into an orderable deskside platform class.

Current manufacturer data captured on 2026-08-22:

- **GB300 Grace Blackwell Ultra Desktop:** 72-core Grace CPU + Blackwell Ultra GPU, 252 GB HBM3e at 7.1 TB/s, 496 GB LPDDR5X at 396 GB/s and **748 GB coherent memory**.
- **NVLink-C2C:** 900 GB/s.
- **Reference DGX Station:** up to 20 PFLOPS sparse FP4, ConnectX-8 up to 800 Gb/s, four M.2 Gen5 slots and **1,600 W total system power**.
- **NVIDIA DGX Station (Ubuntu):** NVIDIA now exposes **Order Now** through partner channels; no stable public numeric reference price captured.
- **DGX Station for Windows:** remains a distinct Q4 2026 software/OS variant and should not be used to mark the Ubuntu system unavailable.
- **ASUS ExpertCenter Pro ET900N G3:** ASUS says it is available to order worldwide; 1,600 W Titanium PSU; quote-based pricing in captured manufacturer material.
- **Dell Pro Max with GB300:** shipping/call-to-order by region. Dell Canada's storefront displayed CA$372,895.28 for an indexed configuration on 2026-08-22; preserve this unusual dynamic storefront value as an observation, not platform MSRP.
- **HP ZGX Fury:** pre-order / notify-me rollout with 748 GB coherent memory.

Promotion / alert triggers:

- stable delivered prices from NVIDIA/OEM channels;
- named-model prefill/decode benchmarks with runtime, datatype/quantization, context and batch metadata;
- wall-power measurements at idle, prefill and decode rather than only the 1,600 W system rating;
- evidence explaining practical placement of model weights and KV cache between 252 GB HBM3e and 496 GB LPDDR5X;
- one-versus-two-node scaling over ConnectX-8;
- production Windows availability and any Windows-vs-Ubuntu performance differences;
- OEM cooling/noise/reliability comparisons.

See `NVIDIA_GB300_DESKSIDE.md` and `data/nvidia_gb300_deskside.json`.

## Qualcomm Dragonfly datacenter watch

Dragonfly is a separate rack-scale inference family from Qualcomm's Dragonwing edge hardware.

Current manufacturer data captured on 2026-08-21:

- **AI200:** 768 GB LPDDR5X per card; 56 cards and 43 TB memory per rack; 0.414 PB/s aggregate rack bandwidth; PCIe Gen6 scale-up; Ethernet/RoCE scale-out; 140 kW rack power; deployments begin in 2026.
- **AI250:** 768 GB per card with HBC Gen 1 near-memory compute; Qualcomm publishes 133 TB/s effective bandwidth per card, 7.455 PB/s effective per rack and 1M-token context support; commercial sampling expected mid-2027.
- **AI300:** HBC Gen 2 roadmap platform with all-to-all scale-up and expanded scale-out; Qualcomm states a 54x effective-bandwidth increase versus AI200; commercial sampling expected 2028.

Important evidence rule: Qualcomm's **18x/54x effective-bandwidth** and **4x-8x performance-per-watt** statements are manufacturer estimates based on its HBC architecture. Do not compare those figures directly with physical HBM/LPDDR bandwidth or independent tokens/watt results.

Promotion / alert triggers:

- public delivered card or rack pricing;
- AI200 per-card power and wall-power measurements;
- reproducible prefill/decode results for named models;
- independent tokens/sec/watt and tokens/dollar comparisons;
- production AI200 deployment results during 2026;
- physical-versus-effective HBC bandwidth analysis when AI250 samples;
- AI300 per-card capacity, bandwidth and power;
- vLLM/SGLang/PyTorch/Hugging Face compatibility matrices;
- disaggregated prefill/decode scaling measurements.

See `QUALCOMM_DRAGONFLY.md` and `data/qualcomm_dragonfly.json`.

## Tenstorrent Blackhole watch

Blackhole is now a distinct tracked platform rather than an extension of Wormhole.

Current manufacturer data captured on 2026-08-20:

- **p100a:** 28 GB GDDR6, 448 GB/s, 664 BLOCKFP8 TFLOPS, 300 W, PCIe 5.0 x16, active cooling, **US$999**.
- **p150a:** 32 GB GDDR6, 512 GB/s, 664 BLOCKFP8 TFLOPS, 300 W, PCIe 5.0 x16, 4x QSFP-DD 800G fabric ports, active cooling, **US$1,399**.
- **p150b:** same compute/memory/fabric profile as p150a with passive server cooling, **US$1,399**.
- **TT-QuietBox 2:** four Blackhole ASICs across two p300c cards, 128 GB aggregate accelerator GDDR6, 256 GB host DDR5, 4 TB NVMe and a 1600 W PSU, **US$9,999**.

The main research question is no longer availability; it is whether the open Tenstorrent stack can turn the hardware and fabric into competitive real LLM performance.

Promotion / alert triggers:

- reproducible decode and prefill results for Qwen, Llama, Gemma or comparable models;
- tokens/sec per watt measured at the wall;
- clear single-card versus 2/4-card scaling curves;
- evidence showing how much p150 fabric-linked memory is practically usable for model weights/KV cache;
- broader TT-NN / TT-Metalium model coverage with low conversion friction;
- price drops of roughly 15% or more;
- strong comparison results versus MI210, GB10, Strix Halo or current consumer GPUs.

See `TENSTORRENT_BLACKHOLE.md` and `data/tenstorrent_blackhole.json`.

## NVIDIA RTX Spark watch

NVIDIA introduced RTX Spark as a Windows-focused Blackwell/Grace AI PC platform with native CUDA, up to **6,144 CUDA cores**, a **20-core Grace CPU**, **1 PFLOP FP4** vendor performance and up to **128 GB unified memory**. NVIDIA says partner systems arrive in fall 2026.

ASUS has already published detailed configurations for:

- **ProArt P16 (H7607):** 64 GB or 128 GB LPDDR5X unified memory;
- **ProArt P14 (H7407):** 48 GB, 64 GB or 128 GB LPDDR5X unified memory;
- **ProArt Mini PC:** up to 128 GB unified memory, 10GbE, PCIe Gen5 NVMe expansion and 140 W thermal headroom.

Track RTX Spark as the shared `nvidia-rtx-spark-n1x` platform, not as separate silicon for each OEM system.

Promotion / alert triggers:

- first stable orderable price for a 128 GB configuration;
- exact memory bandwidth;
- measured SoC and whole-system wall power;
- battery-versus-AC performance on laptop implementations;
- reproducible llama.cpp, TensorRT-LLM, PyTorch or vLLM LLM benchmarks;
- shipping confirmation by region;
- materially cheaper OEM implementation or a 10GbE desktop implementation becoming broadly available.

See `NVIDIA_RTX_SPARK.md` and `data/nvidia_rtx_spark.json`.

## Qualcomm Dragonwing watch

Qualcomm now publishes unusually useful edge-LLM evidence for its industrial Dragonwing platforms:

- **IQ-9075:** up to 36 GB LPDDR5 with ECC, 50/100 dense INT8 TOPS variants, 3.8–20 W SoC-only range, and manufacturer results up to 22 tok/s for Llama 2 7B plus 12 tok/s for Llama 2 13B.
- **IQ-8275:** up to 32 GB platform memory, 20/40 dense INT8 TOPS, with the 12 GB EVK advertised for 13B-class models at about 9 tok/s.
- **Arduino VENTUNO Q:** IQ-8275 + STM32H5, 16 GB RAM, 64 GB eMMC, NVMe Gen4 expansion and 2.5GbE in an SBC/robotics form factor.

These are not normal workstation-class capacity devices, but they are strong candidates for always-on local agents, robotics, industrial edge inference and low-power distributed helpers.

Track:

- public delivered EVK/module/VENTUNO pricing;
- exact board/system wall power;
- model quantization, context and runtime details behind vendor token rates;
- independent reproducible LLM/VLM benchmarks;
- software support changes in Qualcomm AI Stack, ONNX Runtime and Linux tooling;
- availability of 32–36 GB production modules and systems.

See `QUALCOMM_EDGE_AI.md` and `data/qualcomm_edge.json`.

## Acrab Agent Box / GΞLIX 1 watch

Acrab publicly announced GΞLIX 1 and Agent Box in July 2026. Manufacturer material describes a 5 nm heterogeneous edge-AI SoC with a 20-core Arm CPU, GPU/NPU resources, unified memory architecture and **273 GB/s memory bandwidth**, targeting local models in the **100B-parameter class**.

The vendor also reports **1,416.8 tok/s prefill** for Gemma 26B A4B with a 40K KV cache and 10K-token input. This is useful evidence but remains a vendor benchmark and should not be treated as an independent cross-platform result.

Do not assign a normal buying rank until the following are public and defensible:

- exact installed/maximum unified-memory capacity;
- retail or channel price;
- measured whole-system idle and inference power;
- decode tokens/sec as well as prefill;
- supported quantization/model/runtime matrix;
- developer SDK/runtime documentation;
- independent reproducible testing;
- orderable/shipping status by region.

Official sources:

- https://www.acrab.ai/
- https://www.acrab.ai/news.html

## Price and availability watches

### Apple Silicon

Apple Canada currently advertises **Mac mini from CA$1,099** and **Mac Studio from CA$3,499**. Preserve older launch observations separately because 2026 memory/storage price changes have materially moved acquisition cost.

Alert when:

- Apple changes the maximum unified-memory configurations;
- Mac mini or Mac Studio pricing changes by >=15%;
- refurbished/official-channel high-memory systems materially improve RAM-per-dollar;
- new Apple Silicon generations materially increase unified-memory capacity or bandwidth;
- MLX/Metal/llama.cpp changes materially improve large-model inference.

### Ryzen AI Max+ 395 / 128 GB

Alert when:

- a complete 128 GB system falls substantially below the current premium workstation pricing,
- a compact 128 GB node with dual 10GbE becomes broadly available,
- or a 128 GB system shows a >=15% verified price reduction.

### NVIDIA GB10 systems

Track the following under a shared `nvidia-gb10-grace-blackwell` compute platform:

- NVIDIA DGX Spark
- ASUS Ascent GX10
- HP ZGX Nano G1n
- Lenovo ThinkStation PGX
- other OEM GB10 systems as they become orderable

Current software watch note (2026-08-21): NVIDIA now advertises **up to 1.9x inference speedups** from the latest DGX Spark software update. DGX Spark release notes also document improved unified-memory OOM handling, while NemoClaw has added managed single-Spark and experimental dual-Spark vLLM paths. Treat the 1.9x figure as manufacturer evidence until a model/runtime-specific reproducible comparison is available.

Alert for:

- >=15% delivered-price reduction,
- materially cheaper OEM SKU with the same 128 GB GB10 platform,
- meaningful storage/networking difference,
- exact-system wall-power measurements,
- major CUDA/DGX OS improvements affecting large-model reliability,
- model-specific evidence explaining the new up-to-1.9x software performance claim.

### Decommissioned datacenter accelerators

Watch for unusually low delivered prices on:

- AMD Instinct MI210 — 64 GB HBM2e
- other PCIe accelerators with >=48 GB usable memory
- accelerators with >=1 TB/s bandwidth that have current Linux inference support

Do not promote a used accelerator on purchase price alone. Include the cost and difficulty of:

- active airflow if the card is passive
- PSU and cabling
- host PCIe lanes
- CPU/RAM requirements
- rack/server noise where relevant
- software support

## New-category discovery queries

Future research should actively look for:

- new NPUs with >=32 GB directly usable memory
- low-power AI ASIC cards with >=32 GB memory
- PCIe accelerators under ~200 W with strong transformer software
- mini PCs with >=96 GB high-bandwidth unified memory
- embedded boards/SOMs with >=64 GB memory and >=10GbE
- rack-scale inference accelerators with unusually high memory capacity per card
- affordable HBM-equipped used accelerators
- new FPGA/adaptive SoC transformer compilers
- open-source inference accelerators
- high-bandwidth multi-node interconnect devices
- heterogeneous memory-tier runtimes that combine discrete VRAM with system/unified memory

## Alert significance rule

A discovery should generate a project update only if at least one of these is true:

1. **Capacity:** a new practical memory-capacity tier becomes available.
2. **Efficiency:** credible LLM throughput/watt materially improves over comparable hardware.
3. **Price:** a high-interest candidate drops about 15% or crosses a strategically important value threshold.
4. **Availability:** announced hardware becomes genuinely orderable/shipping.
5. **Software:** previously impractical silicon gains a real mainstream LLM runtime.
6. **Interconnect:** a compact device gains unusually strong distributed-inference networking.
7. **Evidence:** an important vendor claim receives strong independent validation or contradiction.

Routine product announcements with tiny TOPS changes, small NPUs with insufficient memory and generic vision accelerators should not create noise.
