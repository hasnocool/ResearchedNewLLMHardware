# Overlooked Virtualization GPUs for Local LLMs — 2026-08-25

This comparison covers server GPUs that can look unusually attractive on paper but require careful interpretation of memory topology, cooling, software support, and market price.

| Hardware | Usable memory topology | Bandwidth | Board power | Current software position | Observed market state | Local-LLM take |
|---|---:|---:|---:|---|---|---|
| AMD Radeon PRO V710 | 28 GB single pool | 448 GB/s | 158 W | Current ROCm support (`gfx1101`) | ~CA$1,787 used; ~CA$2,000 new | Strongest balance here if passive cooling and ROCm are acceptable. |
| AMD Radeon PRO V620 | 32 GB single pool | 512 GB/s | 300 W | Current ROCm support (`gfx1030`) | ~CA$1,238 used in current listing | More capacity and cheaper per GB, but much worse power/thermal profile. |
| NVIDIA A16 | 4 × 16 GB independent pools | 4 × 200 GB/s | 250 W | Current CUDA CC 8.6 | ~CA$4,037 used representative listing | Best viewed as four Ampere GPUs on one board for concurrency or explicit sharding—not a 64 GB single-GPU alternative. |

## Radeon PRO V710

AMD specifies 54 RDNA 3 compute units, 28 GB ECC GDDR6, 448 GB/s memory bandwidth, 55.3 INT8 TOPS, 110.59 INT4 TOPS, and 158 W TBP. It is a passive, full-height 10.5-inch **single-slot** PCIe 4.0 x16 card.

Current ROCm documentation lists V710 (`gfx1101`) as supported, and ROCm 7.14 adds KVM SR-IOV support. For local AI, the important advantage is the combination of a single 28 GB pool and current software support. Many 20B-32B 4-bit-class models can fit, although context/KV cache still determines practical headroom.

The specification-derived memory-bandwidth/TBP ratio is about **2.84 GB/s/W**. This is not measured tokens-per-watt.

## Radeon PRO V620

V620 provides 32 GB ECC GDDR6 in one pool, 512 GB/s bandwidth, 72 RDNA 2 compute units and 300 W TBP. AMD's current ROCm support matrix continues to list V620 (`gfx1030`) as supported.

The current marketplace observation is volatile: the same large-volume eBay listing changed substantially over the prior week and was approximately **CA$1,238** when checked. Treat that as a point-in-time asking price, not a stable fair value.

At 300 W with passive cooling, V620 is poor for off-grid use compared with newer 28-32 GB options. Its main attraction is inexpensive single-pool VRAM if the price falls sufficiently.

## NVIDIA A16: the 64 GB topology trap

NVIDIA markets A16 with **64 GB total board memory**, but the board contains **four independent Ampere GPUs with 16 GB GDDR6 ECC each**. Each GPU has 200 GB/s of memory bandwidth. NVIDIA documents 4 × 1,280 CUDA cores, 4 × 40 third-generation Tensor Cores, 250 W board power, and passive FHFL dual-slot cooling.

This means 64 GB should **not** be compared directly with a 64 GB A100, MI210, unified-memory APU, or other single-address-space accelerator. A single process does not automatically see one 64 GB VRAM pool. Larger models require a runtime that deliberately shards layers/tensors across the four GPUs, and cross-GPU communication adds overhead.

A16 is more naturally suited to:

- four concurrent small-model workers;
- embeddings/reranking services split across GPUs;
- VDI plus opportunistic compute;
- explicit tensor-parallel or layer-sharded inference experiments.

For ordinary single-GPU model-fit comparisons, treat it as **16 GB per GPU**, not 64 GB.

## Buying and deployment caveats

All three cards are datacenter-oriented and passively cooled. They need deliberate front-to-back airflow rather than relying on ordinary desktop case convection. Market prices are dynamic and should be stored as dated observations. TOPS figures should never be substituted for measured LLM tokens/sec, and low-bit hardware support does not guarantee that a specific GGUF/GPTQ/AWQ runtime has optimized kernels for the card.

## Sources

- AMD Radeon PRO V710 product page: https://www.amd.com/en/products/accelerators/radeon-pro/amd-radeon-pro-v710.html
- AMD V710 announcement: https://www.amd.com/en/blogs/2024/amd-introduces-the-radeon-pro-v710-to-microsoft-az.html
- AMD ROCm GPU specifications: https://rocm.docs.amd.com/en/latest/reference/gpu-specs.html
- AMD ROCm release notes: https://rocm.docs.amd.com/en/latest/about/release-notes.html
- AMD Radeon PRO V620 product page: https://www.amd.com/en/products/accelerators/radeon-pro/amd-radeon-pro-v620.html
- ROCm 7.2.2 system requirements: https://rocm.docs.amd.com/projects/install-on-linux/en/docs-7.2.2/reference/system-requirements.html
- NVIDIA A16 product page: https://www.nvidia.com/en-us/data-center/products/a16-gpu/
- NVIDIA A16 datasheet: https://images.nvidia.com/content/Solutions/data-center/vgpu-a16-datasheet.pdf
- NVIDIA CUDA compute capability table: https://developer.nvidia.com/cuda/gpus
