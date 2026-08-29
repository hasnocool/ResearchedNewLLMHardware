# Apple M6 and M5 Ultra

Last updated: **2026-08-29**

## Summary

Apple announced the **M6** in the new Mac mini and **M5 Ultra** in the new Mac Studio on **August 25, 2026**. These are materially new Apple Silicon inference platforms and should be tracked separately from the repository's existing M4/M5 records.

## Apple M6

- **Form factor:** Mac mini
- **CPU:** 12-core
- **GPU:** 12-core
- **Neural Engine:** dual 16-core
- **Unified memory:** up to 32GB
- **Unified-memory bandwidth:** up to 170GB/s
- **Availability:** pre-order; Apple Canada says available starting **September 22, 2026**
- **Canadian starting price:** **CA$1,249**
- **Software:** Core AI, Core ML, Metal, MLX, llama.cpp

### LLM relevance

M6 is an efficient always-on local inference and agent node, but the 32GB maximum memory makes it more suitable for small-to-medium quantized models than for the largest local models. No independent LLM decode/prefill result or whole-system power measurement was captured in this run.

## Apple M5 Ultra

- **Form factor:** Mac Studio
- **CPU:** up to 36-core
- **GPU:** up to 80-core with Neural Accelerators
- **Neural Engine:** 32-core
- **Unified memory:** up to 512GB
- **Unified-memory bandwidth:** up to 1.2TB/s
- **Availability:** pre-order; Apple Canada says available starting **September 22, 2026**; 512GB configuration expected **late October 2026**
- **Canadian starting price:** **CA$7,799**
- **Observed Canadian configuration:** 36-core CPU / 80-core GPU / 256GB / 1TB at **CA$15,749**
- **Software:** Core AI, Core ML, Metal, MLX, llama.cpp
- **Clusterability:** Apple states multi-Mac Studio clustering can use Thunderbolt 5 and RDMA-capable software; it reports up to 3x AI inference on four systems versus one system.

### LLM relevance

M5 Ultra creates a major new coherent-memory tier for local inference. Apple states that up to 512GB unified memory and 1.2TB/s bandwidth can run very large models entirely on-device. The repository records these as manufacturer claims until independent model-specific throughput, power, and multi-node measurements are available.

## Sources

- [Apple M6 and M5 Ultra announcement](https://www.apple.com/ca/newsroom/2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute/)
- [Apple Mac Studio M5 Max and M5 Ultra](https://www.apple.com/ca/newsroom/2026/08/apple-introduces-new-mac-studio-with-m5-max-and-m5-ultra/)
- [Apple Canada Mac mini M6 store](https://www.apple.com/ca/shop/buy-mac/mac-mini/m6-chip-12-core-cpu-12-core-gpu-16gb-memory-512gb-storage)
- [Apple Canada Mac Studio M5 Ultra store](https://www.apple.com/ca/shop/buy-mac/mac-studio/m5-ultra-chip-36-core-cpu-80-core-gpu-256gb-memory-1tb-storage)

## Open research items

- Independent M6 and M5 Ultra LLM throughput by model and quantization
- Whole-system wall power and idle power
- Practical MLX/llama.cpp/Core AI support for the new Neural Accelerator paths
- 512GB M5 Ultra street availability and delivered Canadian pricing
- Reproducible multi-Mac Studio RDMA scaling
