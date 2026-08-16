# Researched New LLM Hardware

A curated research catalog for newly announced, newly available, unusually efficient, or newly affordable hardware that may be useful for **local and distributed LLM inference**.

The project is intentionally broader than GPUs. It tracks:

- NPUs and neural accelerators
- TPUs and AI ASICs
- integrated AI APUs / unified-memory systems
- mini PCs and compact AI workstations
- embedded boards and SOMs
- FPGA and adaptive-SoC platforms
- datacenter accelerators that may become attractive on the secondary market
- unusual heterogeneous systems
- high-speed interconnect hardware useful for distributed inference

## What makes hardware interesting here?

A device is not ranked from TOPS alone. The useful question is whether it can run real language models efficiently and practically.

Priority is given to:

1. **Usable memory capacity** — can useful quantized models actually fit?
2. **Memory bandwidth** — especially important for autoregressive decode.
3. **Performance per watt** — chip power and, where known, whole-system wall power.
4. **Real LLM evidence** — named model, quantization, engine, context and measured tok/s are preferred over synthetic TOPS.
5. **Software support** — llama.cpp, ROCm, CUDA, TensorRT, Vulkan, OpenVINO, PyTorch, vLLM or a credible vendor runtime.
6. **Price and availability** — attractive hardware that cannot be bought is tracked separately from purchasing candidates.
7. **Clusterability** — 10/25/200/400GbE, RDMA-class networking, PCIe, Infinity Fabric or other useful interconnects.
8. **Operational practicality** — cooling, power supply, host requirements, architecture compatibility and driver maturity.

## Evidence labels

| Label | Meaning |
|---|---|
| `manufacturer` | Specification or availability comes directly from the manufacturer. |
| `vendor-benchmark` | Benchmark was published by the system/runtime vendor and should not be treated as independent validation. |
| `community` | Reproducible or reported community result, useful but configuration-dependent. |
| `independent` | Third-party test with enough methodology to compare meaningfully. |
| `unverified` | Claim is interesting but lacks enough public evidence. |

## Availability labels

| Status | Meaning |
|---|---|
| `available` | Publicly purchasable or actively shipping. |
| `limited` | Allocation, waitlist or constrained batches. |
| `announced` | Officially announced but not yet generally purchasable. |
| `sampling` | Primarily developer/OEM sampling. |
| `secondary-market` | Older accelerator whose value depends largely on used-market pricing. |
| `watch` | Interesting, but software, price, evidence or availability is not mature enough. |

## Current high-interest shortlist

| Hardware | Type | Memory | Bandwidth | Power | Status | Why it matters |
|---|---|---:|---:|---:|---|---|
| AMD Ryzen AI Max PRO 400 family | unified-memory APU | up to 192 GB | TBD by SKU/system | 45–120 W class | announced | Up to 160 GB graphics-addressable memory makes very large local models plausible at workstation power levels. |
| AMD Ryzen AI Max+ 395 systems | unified-memory APU | up to 128 GB LPDDR5X | ~256 GB/s class | system dependent | available | Probably the most important current high-capacity low-power x86 platform; active ROCm/Vulkan optimization work. |
| NVIDIA GB10 / DGX Spark class | compact AI supercomputer | 128 GB LPDDR5X | 273 GB/s | 140 W SoC, 240 W PSU | available | Mature CUDA stack, coherent memory and 200 Gb/s ConnectX-7 make it unusually cluster-friendly. |
| AMD Kria AI SOM / Ryzen AI Embedded X100 | embedded SOM | up to 128 GB LPDDR5X | TBD | TBD | announced/sampling | CPU + RDNA 3.5 GPU + XDNA 2 NPU + 10GbE in an embedded COM-HPC form factor. |
| NVIDIA Jetson T3000 | embedded AI module | 32 GB LPDDR5X | 273 GB/s | lower than T5000; final platform dependent | announced | 865 FP4 TFLOPS, CUDA ecosystem and 25GbE in a compact Thor platform. |
| Lucebox | heterogeneous workstation | 128 GB unified + 32 GB GDDR6 | 256 + 640 GB/s | ~500 W sustained system | limited | Interesting proof that asymmetric fast-VRAM + large-unified-memory inference can outperform either domain alone. |
| AMD Instinct MI210 | datacenter GPU | 64 GB HBM2e | 1.6 TB/s | 300 W | secondary-market | Older but still unusually compelling when used pricing is low: 64 GB ECC HBM and mature ROCm. |
| Tenstorrent Wormhole n150 | AI ASIC PCIe card | 12 GB GDDR6 | 288 GB/s | 160 W | available/watch | Open software direction and excellent fabric connectivity make it worth watching despite modest per-card memory. |

See [CATALOG.md](CATALOG.md) for the detailed human-readable list and [data/hardware.json](data/hardware.json) for normalized machine-readable records.

## Major platform families

### AMD unified-memory / Strix Halo and successors

Ryzen AI Max systems are notable because model weights can live in a large unified LPDDR5X pool rather than being limited to conventional discrete-GPU VRAM. This trades HBM/GDDR bandwidth for much larger capacity at relatively modest power.

The next-generation Ryzen AI Max PRO 400 platform raises the ceiling to **192 GB system memory and up to 160 GB VRAM allocation**, making it one of the highest-priority platforms to benchmark when OEM systems ship.

### NVIDIA GB10 Grace Blackwell

GB10 systems such as DGX Spark and OEM derivatives combine **128 GB coherent LPDDR5X**, **273 GB/s memory bandwidth**, Blackwell tensor hardware, a mature CUDA software stack and **ConnectX-7 200 Gb/s** networking. Different OEM boxes should not be counted as different compute architectures; they share the same underlying GB10 platform and should be compared by price, storage, cooling, warranty and availability.

### Embedded and edge

Embedded AI hardware is only promoted when it has enough memory and software support to be relevant to language models. Many edge NPUs have impressive TOPS/W but only a few GB of accessible memory, which makes them excellent vision accelerators but poor general LLM candidates.

### FPGA / adaptive SoC

FPGAs and adaptive SoCs remain experimental for general LLM inference, but they can be attractive for deterministic kernels, preprocessing, sparse workloads, custom quantization and ultra-low-latency pipelines. The main limitation is software effort and external-memory bandwidth rather than raw integer TOPS.

### Decommissioned datacenter accelerators

Used datacenter cards can offer exceptional memory bandwidth per dollar, but often require server airflow, unusual power connectors and Linux-centric software. Secondary-market pricing therefore needs to be tracked separately from theoretical performance.

## Benchmarking rules

Whenever possible, record all of the following:

- exact hardware SKU and memory configuration
- runtime/engine and version
- model name and parameter count
- quantization / datatype
- context length
- prompt processing / prefill tok/s
- generation / decode tok/s
- batch or concurrency
- wall power during the measurement
- software/driver version
- source URL and date checked

A benchmark without enough metadata should be tagged as approximate rather than merged into comparable performance rankings.

## Project structure

```text
.
├── README.md
├── CATALOG.md
├── METHODOLOGY.md
├── WATCHLIST.md
└── data/
    └── hardware.json
```

## Research date

Initial structured catalog assembled **2026-08-15**. Prices and availability are snapshots and can change rapidly.

## Scope note

This repository is a research index, not an endorsement. Manufacturer TOPS figures across architectures and datatypes are not directly comparable, and vendor benchmarks should never be presented as independent measurements.
