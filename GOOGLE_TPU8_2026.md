# Google TPU 8i / TPU 8t — 2026 research note

Google's eighth-generation TPU family splits the prior unified TPU role into two specialized systems: **TPU 8i** for post-training, inference, reinforcement learning and reasoning, and **TPU 8t** for large-scale pre-training and embedding-heavy workloads.

## TPU 8i

Google's current architecture deep dive specifies:

- 288 GB HBM per chip;
- 8,601 GB/s HBM bandwidth;
- 384 MB on-chip SRAM;
- 10.1 peak FP4 PFLOPS;
- two Tensor Core dies plus a Collectives Acceleration Engine (CAE);
- Boardfly ICI topology;
- 19.2 Tb/s ICI bandwidth;
- up to 1,152 chips connected in a pod-level system, with the detailed Boardfly example describing up to 1,024 active chips;
- Arm Axion CPU headers;
- JAX, native PyTorch/TorchTPU preview, Keras, XLA, vLLM, Pathways, Pallas and Mosaic software paths.

The unusual part for LLM inference is not just the 288 GB HBM capacity. Google increased on-chip SRAM to 384 MB and added CAE specifically to reduce collective/synchronization latency during autoregressive decoding and reasoning workloads. Google says Boardfly reduces worst-case network diameter from 16 hops in a comparable 3D torus to seven hops.

Google claims up to 80% better inference performance per dollar versus Ironwood and up to 2x better generation-level performance per watt. These are vendor-relative claims. Google has not published a defensible absolute per-chip TPU 8i TDP or public TPU 8i hourly price yet, so no absolute tokens-per-watt or dollar-efficiency metric is calculated in the catalog.

## TPU 8t

Google's current specification lists:

- 216 GB HBM per chip;
- 6,528 GB/s HBM bandwidth;
- 128 MB on-chip SRAM;
- 12.6 peak FP4 PFLOPS;
- SparseCore plus an LLM Decoder Engine;
- native FP4;
- 3D-torus ICI;
- 9,600 chips per superpod;
- Virgo scale-out networking capable of linking more than 134,000 TPU 8t chips with up to 47 Pb/s non-blocking bisection bandwidth;
- TPUDirect RDMA and TPU Direct Storage;
- Arm Axion CPU headers.

TPU 8t is therefore relevant to the repository mainly as a large-memory, high-bandwidth datacenter training architecture and as a comparison point for specialized inference accelerators. It is not positioned as a local desktop device.

## LLM practicality and quantization

Both chips support Google's TPU software stack rather than CUDA/ROCm/MLX. Google explicitly documents native FP4 support for the eighth generation. Model deployment should be treated as XLA/JAX/PyTorch/vLLM/compiler-dependent; arbitrary GGUF, GPTQ, AWQ or EXL2 artifacts should not be assumed to run unchanged.

The 288 GB HBM capacity of TPU 8i is large enough in principle to contain very large quantized model weight sets on one accelerator, but real deployments may still shard for throughput, KV cache, MoE routing, reliability and serving concurrency. Capacity is not equivalent to single-chip interactive throughput.

## Availability and pricing

As of 2026-08-28, Google's TPU product page lists **TPU 8i** and **TPU 8t** as **coming soon**. No retail hardware price is applicable, and no public Cloud hourly price for either eighth-generation TPU was verified during this pass.

## Why this matters to this repository

TPU 8i is a useful upper-bound reference for inference-focused memory systems: **288 GB HBM at 8.601 TB/s plus 384 MB SRAM**. It is not a local-buy recommendation, but it provides a strong architectural comparison against HBM GPUs, unified-memory workstations, flash-backed memory systems and specialized inference ASICs.

## Primary sources

- Google Cloud TPU 8t / TPU 8i architecture deep dive: https://cloud.google.com/blog/products/compute/tpu-8t-and-tpu-8i-technical-deep-dive
- Google Cloud TPU product page: https://cloud.google.com/tpu
- Google Cloud Next 2026 AI infrastructure announcement: https://cloud.google.com/blog/products/compute/ai-infrastructure-at-next26
