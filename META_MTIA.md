# Meta MTIA 300–500

Last updated: **2026-08-28**

Meta's Training and Inference Accelerator (MTIA) roadmap is now tracked as a distinct internal datacenter AI-accelerator family. These parts are **not commercially sold**, so they should be compared as architecture/runtime references rather than buying candidates.

## Why MTIA matters for LLM inference

Meta's roadmap is unusually inference-oriented. MTIA 400 expands the platform to general GenAI workloads, while MTIA 450 and MTIA 500 are explicitly optimized for GenAI inference. The roadmap emphasizes very large HBM capacity and bandwidth, low-precision MX formats, FlashAttention/MoE acceleration, and a software stack built around PyTorch, vLLM and Triton.

Meta says it has already deployed hundreds of thousands of earlier MTIA devices and has tested MTIA with Llama-family LLMs. MTIA 400 has completed lab testing and is moving toward datacenter deployment; MTIA 450 is planned for mass deployment in early 2027 and MTIA 500 later in 2027.

## Current normalized specifications

| Accelerator | Main role | HBM | HBM bandwidth | MX4 | FP8/MX8 | BF16 | Module TDP | Scale-up domain |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| MTIA 300 | R&R training / baseline | 216 GB | 6.1 TB/s | — | 1.2 PFLOPS | 0.6 PFLOPS | 800 W | 16 |
| MTIA 400 | General AI / GenAI | 288 GB | 9.2 TB/s | 12 PFLOPS | 6 PFLOPS | 3 PFLOPS | 1,200 W | 72 |
| MTIA 450 | GenAI inference | 288 GB | 18.4 TB/s | 21 PFLOPS | 7 PFLOPS | 3.5 PFLOPS | 1,400 W | 72 |
| MTIA 500 | GenAI inference | 384–512 GB | 27.6 TB/s | 30 PFLOPS | 10 PFLOPS | 5 PFLOPS | 1,700 W | 72 |

The bandwidth figures above are the one-direction figures used in Meta's published roadmap. Do not silently double them when comparing against vendors that quote bidirectional fabric bandwidth.

## Architecture and scaling

MTIA uses modular compute, networking and I/O chiplets. MTIA 400 combines two compute chiplets and forms a 72-accelerator scale-up domain through a switched backplane. MTIA 450 keeps the shared chassis/rack/network infrastructure while doubling HBM bandwidth and adding inference-specific acceleration. MTIA 500 moves to a 2×2 arrangement of smaller compute chiplets around HBM, network chiplets and an SoC chiplet for PCIe/scale-out connectivity.

Published roadmap network figures are:

- MTIA 300: 1 TB/s scale-up and 200 GB/s scale-out, 16-device scale-up domain.
- MTIA 400/450/500: 1.2 TB/s scale-up and 100 GB/s scale-out, 72-device scale-up domain.

Meta's reuse of the same chassis, rack and networking infrastructure across MTIA 400/450/500 is important: these should be treated as successive generations of one internal platform family, not independent OEM systems.

## Software/runtime maturity

Meta describes MTIA as **PyTorch-native** rather than requiring model rewrites. Publicly described paths include:

- PyTorch eager and graph execution;
- `torch.compile` and `torch.export` integration;
- TorchInductor-based graph compilation;
- Triton, MLIR and LLVM lower-level compilation;
- C++ and Triton kernel authoring;
- vLLM plugin support, including continuous batching and prefill/decode disaggregation;
- HCCL collective communications;
- Rust user-space driver and bare-metal Rust firmware.

This is substantially stronger software evidence than a synthetic TOPS-only announcement, but public external access is not available because MTIA is an internal Meta platform.

## Evidence quality

The architecture, roadmap status and software-stack claims come from Meta's official March 11, 2026 MTIA technical post. Numerical roadmap values are also cross-checked against reputable independent coverage of Meta's published specification table. Hot Chips 2026 coverage in August provides a fresh confirmation that MTIA 400 is a serious current datacenter architecture rather than a canceled roadmap item.

No public retail pricing exists. `pricing` is therefore intentionally empty in the machine-readable catalog. Do not infer a card price from Meta capex, Broadcom contracts, or comparable NVIDIA/AMD accelerators.

## Research gaps / watch criteria

Promote or update the family when any of the following becomes public:

- named-model prefill/decode throughput with model, datatype, context and batch metadata;
- measured tokens/watt or system wall power rather than module TDP alone;
- real MTIA 400 production deployment results;
- MTIA 450 production silicon and software results;
- MTIA 500 final HBM capacity SKU(s) within the published 384–512 GB range;
- external/cloud access, if Meta ever exposes MTIA beyond internal infrastructure;
- independently reproducible LLM serving results;
- more precise physical interconnect topology and realized multi-device scaling efficiency.

## Sources

### Manufacturer / primary

- Meta AI, **Four MTIA Chips in Two Years: Scaling AI Experiences for Billions**, March 11, 2026: https://ai.meta.com/blog/meta-mtia-scale-ai-chips-for-billions/
- Meta Newsroom, **Expanding Meta's Custom Silicon to Power Our AI Workloads**, March 2026: https://about.fb.com/news/2026/03/expanding-metas-custom-silicon-to-power-our-ai-workloads/

### Independent / secondary

- Tom's Hardware, MTIA 300/400/450/500 specification table and roadmap coverage: https://www.tomshardware.com/tech-industry/semiconductors/metas-mtia-chip-lineup-joins-hyperscaler-push-to-replace-nvidia-at-inference
- The Quantum Dispatch, Hot Chips 2026 MTIA 400 coverage: https://thequantumdispatch.com/articles/meta-mtia-400-fp4-inference-accelerator
