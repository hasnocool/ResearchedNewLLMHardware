# NVIDIA Vera CPU

## Summary

NVIDIA Vera is a datacenter Arm CPU platform designed for agentic AI orchestration, inference control-plane work, reinforcement-learning environments, analytics, and CPU/GPU-coherent serving infrastructure. It is not a standalone LLM accelerator, but it is relevant to heterogeneous inference because it combines high memory bandwidth, large memory capacity, and NVLink-C2C attachment to NVIDIA GPUs.

## Published specifications

- **CPU:** 88 custom NVIDIA Olympus cores; 176 threads via Spatial Multithreading.
- **Memory:** up to 1.5 TB LPDDR5X via SOCAMM.
- **Memory bandwidth:** up to 1.2 TB/s.
- **NVLink-C2C:** up to 1.8 TB/s coherent CPU↔GPU bandwidth.
- **CPU fabric:** 3.4 TB/s bisectional bandwidth.
- **I/O:** up to 88 PCIe Gen6 lanes on CPU-only configurations; CXL 3.1 support is listed for Vera platforms.
- **TDP:** 250–450 W configurable, depending on server implementation.
- **Rack scale:** NVIDIA describes a 256-CPU Vera rack with up to 400 TB aggregate LPDDR5X and 300 TB/s aggregate peak memory bandwidth.

## Why it matters for LLM inference

Vera should be evaluated as a **heterogeneous inference host and orchestration CPU**, not as a replacement for GPU compute. The most relevant workloads are:

- agent/tool execution and sandboxed code runtimes;
- KV-cache management and CPU-side data movement;
- preprocessing, retrieval, analytics and scheduling around accelerators;
- GPU-attached memory expansion through coherent NVLink-C2C;
- high-density multi-tenant inference control planes.

The 1.2 TB/s LPDDR5X subsystem is unusually high for a CPU and may reduce CPU-side bottlenecks in disaggregated or partially offloaded serving, but public model-specific tok/s data is not yet sufficient for normalized rankings.

## Software and ecosystem

NVIDIA positions Vera for Arm-compatible Linux environments and the broader NVIDIA AI software stack, including CUDA-adjacent runtimes, inference orchestration, CXL, NVLink-C2C, and Dynamo/TensorRT-LLM integrated deployments. Public product material emphasizes agentic AI, analytics, orchestration and GPU utilization rather than standalone LLM decode benchmarks.

## Evidence quality and gaps

- **Manufacturer evidence:** published core count, memory capacity, bandwidth, interconnect and TDP.
- **Independent evidence:** Phoronix reports Vera sustaining about 90% of rated STREAM TRIAD bandwidth in its testing; this is a CPU memory-bandwidth result, not an LLM throughput result.
- **Open gaps:** retail/OEM pricing, exact memory configurations by SKU, sustained wall power, model-specific prefill/decode throughput, and practical CPU-only LLM performance.

## Sources

- https://www.nvidia.com/en-us/data-center/vera-cpu/
- https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Launches-Vera-CPU-Purpose-Built-for-Agentic-AI/default.aspx
- https://www.phoronix.com/review/nvidia-vera-cpu

## Catalog status

Tracked as a **heterogeneous inference host / agentic AI CPU platform**. It should not be counted as a discrete accelerator architecture and should be compared separately from Vera Rubin GPU systems.
