# NVIDIA Personal AI Router (PAIR)

Last updated: **2026-09-03**

## Why this belongs in the hardware catalog

NVIDIA Personal AI Router (PAIR) is a software layer that materially changes the practical value of an existing mixed local-inference fleet. It routes independent inference requests across compatible machines on a local network, exposing Ollama-compatible and OpenAI-compatible endpoints to applications and agents.

PAIR is not a pooled-memory fabric: it does **not** combine GPU memory, shard one model across machines, or split one in-flight request. The benefit is higher concurrent throughput for multi-agent or multi-request workloads, not lower latency for one request.

## Current supported scope

- Operating systems: Windows 11, Linux and macOS.
- Architectures: x64 and arm64; Windows on ARM is experimental.
- Engines: Ollama and LM Studio.
- Supported hardware called out by NVIDIA: GeForce RTX 20-series and newer, RTX PRO workstation GPUs, DGX Spark systems and Apple M4 or newer silicon.
- Networking/security: local-network discovery, six-digit PIN pairing and mTLS-secured cluster communication.
- Mixed nodes: Windows, Linux and macOS nodes may be paired together when each node can run a compatible engine/model.

## Published evidence

In NVIDIA's September 3, 2026 technical-blog demonstration, a five-subagent Hermes Desktop + Ollama workload completed in **8 minutes 48 seconds on a three-device PAIR cluster**, versus **18 minutes on a single RTX Spark laptop**. This is a manufacturer demonstration with workload-specific results, not a normalized benchmark. It should be stored as evidence of concurrency scaling only.

## Practical implications

PAIR makes otherwise heterogeneous hardware more useful as a distributed local inference pool, including older RTX systems, DGX Spark-class nodes and Apple Silicon Macs. It is most relevant when workloads consist of independent agent calls, queued requests or background tasks. It does not solve model placement, insufficient per-node memory, or cross-node tensor parallelism.

## Sources

- NVIDIA Personal AI Router repository: https://github.com/NVIDIA/Personal-AI-Router
- NVIDIA technical blog (2026-09-03): https://developer.nvidia.com/blog/nvidia-pair-virtual-inference-router-expands-available-compute-on-your-local-network/
- NVIDIA product page: https://www.nvidia.com/en-gb/ai-on-rtx/personal-ai-router/
- PAIR overview documentation: https://github.com/NVIDIA/Personal-AI-Router/blob/main/docs/overview.mdx

## Evidence quality and gaps

Evidence quality: **manufacturer + open-source documentation**.

Open gaps: independent mixed-node scaling, network overhead under realistic agent workloads, failure/rejoin behavior, model warmness effects, and comparisons with Ray, vLLM multi-node serving, llama.cpp RPC or Kubernetes-based schedulers.
