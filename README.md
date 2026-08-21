# Researched New LLM Hardware

A curated research catalog for newly announced, newly available, unusually efficient, or newly affordable hardware that may be useful for **local and distributed LLM inference**.

The project tracks GPUs, NPUs, TPUs, AI ASICs, unified-memory APUs, mini PCs, compact AI workstations, embedded boards and SOMs, SBCs, Apple Silicon, FPGA/adaptive-SoC platforms, secondary-market datacenter accelerators, heterogeneous systems, rack-scale inference accelerators, and high-speed interconnect hardware.

## What makes hardware interesting here?

A device is not ranked from TOPS alone. Priority is given to:

1. **Usable memory capacity** — can useful quantized models actually fit?
2. **Memory bandwidth** — especially important for autoregressive decode.
3. **Performance per watt** — chip power and, where known, whole-system wall power.
4. **Real LLM evidence** — named model, quantization, engine, context and measured tok/s are preferred over synthetic TOPS.
5. **Software support** — llama.cpp, ROCm, CUDA, TensorRT, Vulkan, OpenVINO, PyTorch, vLLM, MLX or a credible vendor runtime.
6. **Price and availability** — attractive hardware that cannot be bought is tracked separately from purchasing candidates.
7. **Clusterability** — 10/25/200/400GbE, RDMA-class networking, PCIe, Infinity Fabric or other useful interconnects.
8. **Operational practicality** — cooling, power supply, host requirements, architecture compatibility and driver maturity.

## Evidence labels

| Label | Meaning |
|---|---|
| `manufacturer` | Specification or availability comes directly from the manufacturer. |
| `vendor_benchmark` | Benchmark was published by the system/runtime vendor and should not be treated as independent validation. |
| `community` | Reproducible or reported community result, useful but configuration-dependent. |
| `independent` | Third-party test with enough methodology to compare meaningfully. |
| `unverified` | Claim is interesting but lacks enough public evidence. |

## Current high-interest shortlist

| Hardware | Type | Memory | Bandwidth | Power | Status | Why it matters |
|---|---|---:|---:|---:|---|---|
| AMD Ryzen AI Max PRO 400 family | unified-memory APU | up to 192 GB | TBD by SKU/system | 45–120 W class | announced | Up to 160 GB graphics-addressable memory creates a new compact capacity tier. |
| NVIDIA RTX Spark N1X systems | Windows unified-memory AI PC | up to 128 GB | not yet public | system dependent | announced / prelaunch | Brings native CUDA and Blackwell to Windows laptops and mini PCs with unusually large unified memory. |
| AMD Ryzen AI Max+ 395 systems | unified-memory APU | up to 128 GB LPDDR5X | ~256 GB/s class | system dependent | available | Strong current high-capacity x86 platform with increasingly practical ROCm/Vulkan paths. |
| Apple M5 Max MacBook Pro | portable unified-memory workstation | up to 128 GB | up to 614 GB/s | portable system | available | Very high memory bandwidth for a portable system; Metal/MLX/BaseRT software paths are improving. |
| NVIDIA GB10 / DGX Spark class | compact AI supercomputer | 128 GB LPDDR5X | 273 GB/s | 140 W SoC; OEM PSU varies | available | Mature CUDA stack, coherent memory and ConnectX-7 make it unusually cluster-friendly; current DGX Spark software adds improved unified-memory handling and NVIDIA advertises up to 1.9x inference speedups. |
| Qualcomm Dragonfly AI200 | rack-scale inference accelerator | 768 GB LPDDR5X/card; 43 TB/rack | 0.414 PB/s/rack | 140 kW/rack | deployments begin 2026 | Extreme per-card memory capacity makes it notable for very large-model inference even before independent throughput data is available. |
| AMD Kria AI SOM / Ryzen AI Embedded X100 | embedded SOM | up to 128 GB LPDDR5X | TBD | TBD | announced/sampling | CPU + RDNA 3.5 GPU + XDNA 2 NPU in an embedded form factor. |
| Qualcomm Dragonwing IQ-9075 EVK | embedded/industrial AI kit | 36 GB LPDDR5 ECC | platform-specific | 3.8–20 W SoC | available/channel-dependent | Qualcomm publishes named LLM results up to 22 tok/s for Llama 2 7B and 12 tok/s for 13B, making it unusually measurable for edge inference. |
| NVIDIA Jetson T3000 | embedded AI module | 32 GB LPDDR5X | 273 GB/s | platform dependent | announced | Strong CUDA/TensorRT ecosystem and 25GbE for an embedded node. |
| AMD Instinct MI210 | datacenter GPU | 64 GB HBM2e | 1.6 TB/s | 300 W | secondary market | Excellent bandwidth/capacity when used pricing and integration cost are favorable. |

## Current purchasable-system observations

The project separates **compute platform** from **OEM system variant**. Systems sharing GB10, RTX Spark N1X or Ryzen AI Max+ 395 are not counted as independent silicon architectures.

As of **2026-08-20**, notable captured variants include:

- **Dell Pro Max with GB10 (FCM1253)** — 128 GB LPDDR5X, DGX OS 7; a 4 TB Canadian configuration was listed at CA$8,703.69.
- **Acer Veriton GN100 (GN100-UD11)** — GB10, 128 GB LPDDR5X, 4 TB, 10GbE and ConnectX-7; Acer publishes a 170 W maximum PSU figure and a North American launch price from US$3,999.
- **GMKtec EVO-X2 / EVO-X3** — Ryzen AI Max+ 395 systems with high-capacity LPDDR5X; vendor LLM results remain tagged as vendor evidence until independently reproduced.
- **ASUS ProArt P14 / P16 RTX Spark** — prelaunch Windows laptops with RTX Spark N1X and configurations up to 128 GB unified memory.
- **ASUS ProArt Mini PC RTX Spark** — announced compact 128 GB-class implementation with 10GbE and 140 W thermal headroom.

See [`data/current_system_variants.json`](data/current_system_variants.json) and [`data/nvidia_rtx_spark.json`](data/nvidia_rtx_spark.json) for normalized records.

## Major platform families

### AMD unified-memory / Strix Halo and successors

Ryzen AI Max systems let model weights live in a large unified LPDDR5X pool rather than being limited to conventional discrete-GPU VRAM. This trades HBM/GDDR bandwidth for much larger capacity at relatively modest power. The next-generation Ryzen AI Max PRO 400 platform raises the ceiling to 192 GB system memory and up to 160 GB graphics allocation.

### Apple Silicon

Apple Silicon should be scored on unified-memory capacity, bandwidth, GPU/runtime support, measured tokens per second, whole-system power and delivered price. The M5 Pro reaches 307 GB/s and 64 GB, while the high-end M5 Max reaches 614 GB/s and 128 GB. See [`APPLE_M5.md`](APPLE_M5.md), [`SBC_AND_APPLE_SILICON.md`](SBC_AND_APPLE_SILICON.md), and the corresponding data files.

### NVIDIA RTX Spark

RTX Spark is a separate Windows-focused Blackwell/Grace platform from GB10/DGX Spark. NVIDIA documents up to 6,144 CUDA cores, a 20-core Grace CPU, 1 PFLOP FP4 and up to 128 GB unified memory with native CUDA. ASUS has published RTX Spark ProArt P14/P16 laptop configurations and a compact ProArt Mini PC. Exact memory bandwidth, retail pricing and independent LLM throughput remain open research items. See [`NVIDIA_RTX_SPARK.md`](NVIDIA_RTX_SPARK.md) and [`data/nvidia_rtx_spark.json`](data/nvidia_rtx_spark.json).

### NVIDIA GB10 Grace Blackwell

GB10 systems combine 128 GB coherent LPDDR5X, 273 GB/s memory bandwidth, Blackwell tensor hardware, CUDA tooling and ConnectX-7-class networking. OEM boxes should be compared by price, storage, cooling, warranty, PSU and exposed networking rather than counted as different compute architectures.

The software side is still changing materially. NVIDIA's current DGX Spark product page advertises **up to 1.9x inference speedups** from its latest software update, while the current DGX Spark release notes list DGX OS 7.5.0, CUDA 13.0.2 and improved unified-memory OOM handling. NemoClaw also now exposes managed single- and experimental dual-Spark vLLM paths plus operator-managed llama.cpp attachment. These are manufacturer software claims/capabilities, not normalized model-specific benchmarks. See [`data/software-updates-2026-08-21.json`](data/software-updates-2026-08-21.json).

### Qualcomm Dragonwing edge AI

Qualcomm Dragonwing IQ8/IQ9 platforms are tracked as low-power embedded/industrial LLM candidates. The IQ-9075 platform reaches 36 GB ECC memory and Qualcomm publishes both SoC power (3.8–20 W) and named Llama 2 throughput; IQ-8275 reaches up to 32 GB platform memory and is also used by Arduino's VENTUNO Q. See [`QUALCOMM_EDGE_AI.md`](QUALCOMM_EDGE_AI.md) and [`data/qualcomm_edge.json`](data/qualcomm_edge.json).

### Qualcomm Dragonfly data-center inference

Dragonfly is tracked separately from Dragonwing. **AI200** provides 768 GB LPDDR5X per card and 43 TB per 56-card rack. **AI250** introduces HBC Gen 1 near-memory compute and Qualcomm publishes 133 TB/s effective bandwidth per card; **AI300** is the HBC Gen 2 roadmap platform. Qualcomm's 18x/54x effective-bandwidth and 4x–8x efficiency statements are manufacturer claims and are not treated as physical-bandwidth or independent tokens/watt measurements. See [`QUALCOMM_DRAGONFLY.md`](QUALCOMM_DRAGONFLY.md) and [`data/qualcomm_dragonfly.json`](data/qualcomm_dragonfly.json).

### Embedded and edge

Embedded hardware is promoted when it has enough memory and software support to be relevant to language models. Many edge NPUs have excellent TOPS/W but too little accessible memory for general LLM use.

### FPGA / adaptive SoC

FPGAs and adaptive SoCs remain experimental for general LLM inference, but they can be attractive for deterministic kernels, preprocessing, sparse workloads, custom quantization and ultra-low-latency pipelines. The main limitation is software effort and external-memory bandwidth rather than raw integer TOPS.

### Decommissioned datacenter accelerators

Used datacenter cards can offer exceptional memory bandwidth per dollar, but often require server airflow, unusual power delivery and Linux-centric software. Secondary-market pricing is tracked separately from theoretical performance.

## Benchmarking rules

Whenever possible, record the exact hardware SKU and memory configuration, runtime/version, model, quantization/datatype, context length, prefill tok/s, decode tok/s, batch/concurrency, wall power, driver version, source URL and observation date. A benchmark without enough metadata should remain approximate/vendor/community evidence rather than being merged into comparable performance rankings.

## Project structure

```text
.
├── README.md
├── CATALOG.md
├── METHODOLOGY.md
├── PRICING_AND_SOURCES.md
├── WATCHLIST.md
├── APPLE_M5.md
├── NVIDIA_RTX_SPARK.md
├── QUALCOMM_DRAGONFLY.md
├── QUALCOMM_EDGE_AI.md
├── SBC_AND_APPLE_SILICON.md
├── SPECIALTY_EDGE_AI.md
├── data/
│   ├── hardware.json
│   ├── current_system_variants.json
│   ├── nvidia_rtx_spark.json
│   ├── apple_m5.json
│   ├── qualcomm_dragonfly.json
│   ├── qualcomm_edge.json
│   ├── sbc_apple.json
│   ├── specialty_edge.json
│   ├── software-updates-2026-08-21.json
│   ├── cost_effective_hardware.json
│   ├── low_power_nvidia.json
│   ├── workstation_gpus.json
│   ├── secondary_market_legacy.json
│   ├── refurbished_apple_volta.json
│   └── price-history.jsonl
└── scripts/
    └── validate_catalog.py
```

## Research dates

Initial structured catalog assembled **2026-08-15**. Current maintenance pass: **2026-08-21**. Prices and availability are snapshots and can change rapidly.

## Scope note

This repository is a research index, not an endorsement. Manufacturer TOPS figures across architectures and datatypes are not directly comparable, and vendor benchmarks should never be presented as independent measurements.
