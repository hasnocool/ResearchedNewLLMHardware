# NVIDIA BlueField-4 STX / CMX Context Memory Storage

Last updated: **2026-08-29**

## Summary

BlueField-4 STX is a rack-scale accelerated-storage architecture for long-context and agentic inference. It is not a general-purpose LLM accelerator; it is tracked because it changes the memory/storage path around accelerators by providing an RDMA- and DPU-assisted context-memory tier for KV cache and related state.

## Architecture

- **Processor:** NVIDIA BlueField-4, combining Vera CPU and ConnectX-9 SuperNIC
- **Networking:** NVIDIA Spectrum-X Ethernet; up to 800Gb/s policy/data-path enforcement is cited for the secure STX implementation
- **Software:** NVIDIA DOCA, DOCA Memos, NVIDIA AI Enterprise
- **Reference system:** NVIDIA CMX context memory storage platform
- **Target use:** long-context inference, agent memory, KV-cache reuse, storage-side preprocessing and data movement

## Published benefits

NVIDIA claims up to **5x token throughput**, up to **4x energy efficiency** versus traditional CPU-based storage architectures, and **2x faster page ingestion**. These are architecture/vendor claims and are not treated as normalized end-to-end LLM benchmarks.

## Availability and pricing

NVIDIA announced BlueField-4 STX on **2026-03-16** and says partner platforms are expected in the **second half of 2026**. No public retail price or standalone BlueField-4 STX card specification was captured; pricing remains quote-only/unknown.

## Evidence and limitations

The repository tracks STX as infrastructure that improves accelerator utilization and context handling, not as a replacement for GPU/ASIC compute. Exact flash media, usable context-memory capacity, latency distributions, host integration, and real workload power are still vendor/system dependent.

## Sources

- NVIDIA announcement: https://nvidianews.nvidia.com/news/nvidia-launches-bluefield-4-stx-storage-architecture-with-broad-industry-adoption
- NVIDIA investor release: https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Launches-BlueField-4-STX-Storage-Architecture-With-Broad-Industry-Adoption/default.aspx
- NVIDIA technical blog: https://developer.nvidia.com/blog/introducing-nvidia-bluefield-4-powered-inference-context-memory-storage-platform-for-the-next-frontier-of-ai/
- NVIDIA security architecture: https://nvidianews.nvidia.com/news/nvidia-vera-bluefield-4-stx-brings-agentic-ai-storage-processing-with-in-silicon-security
