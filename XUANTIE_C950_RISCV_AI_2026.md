# XuanTie C950 RISC-V AI Research — 2026-08-27

## Why it belongs in the catalog

Alibaba DAMO Academy announced XuanTie C950 in March 2026 as a high-performance RISC-V CPU/IP platform for cloud, generative-AI, robotics and edge workloads. It is materially different from a conventional GPU: the interesting part is CPU-centric inference using RISC-V vector/matrix extensions plus XuanTie software kernels rather than a CUDA/ROCm-style discrete accelerator stack.

The platform is still not a normal retail local-AI purchase. No broadly orderable C950 board/server, stable price, complete-system power figure, absolute memory-capacity figure or defensible absolute memory-bandwidth figure was verified in this pass.

## Public architecture details

Public March 2026 material and technical reporting describe:

- 5 nm implementation target;
- up to 3.2 GHz;
- 8-instruction decode;
- 16-stage pipeline;
- >1000-instruction out-of-order window;
- RVA23.1-class RISC-V support;
- RISC-V Vector plus XuanTie matrix/AI acceleration;
- up to 8 C950 cores per reported cluster configuration;
- Linux/GNU/LLVM/QEMU software support.

Alibaba also said memory bandwidth improved by more than four times versus C920, but no absolute GB/s figure for the August 64-core benchmark target was publicly disclosed. The catalog therefore leaves absolute memory bandwidth unset.

## Fresh August 2026 LLM evidence

A XUANTIE-branded slide reported by independent press in August describes a **64-core C950 target configuration** running:

| Model | Reported decode | Reported TTFT | Evidence quality |
|---|---:|---:|---|
| Qwen3.8-27B | >30 tok/s | 1.9 s | vendor slide, not independently reproduced |
| Qwen3.8-2.4T-A95B | 7.2 tok/s | 8.5 s | vendor slide, not independently reproduced |

These numbers are interesting but are **not normalized benchmarks**. The public material does not disclose enough of the following to compare fairly with GPUs, Apple Silicon or other CPUs:

- quantization / datatype;
- system RAM capacity and memory type;
- absolute memory bandwidth;
- prompt/context length;
- batch/concurrency;
- wall power;
- exact production board/server implementation.

The 27B result is therefore stored as vendor-slide evidence rather than independent performance.

## Runtime and quantization caveats

Public reporting attributes optimization to XuanTie SHL and dedicated kernels for operations such as MatMul/Linear, Softmax and RMSNorm. That is meaningful evidence of a real model-optimization stack, but it does **not** prove drop-in compatibility with CUDA, ROCm, MLX, vLLM, GGUF or generic llama.cpp builds.

Likewise, the benchmark does not disclose the precision/quantization used. The catalog therefore does not infer INT4, GPTQ, AWQ or GGUF compatibility merely from the model sizes or token rates.

## Local/off-grid practicality

Current practicality is primarily research/server-oriented:

- **Purchasability:** no stable retail system verified;
- **Power:** unknown at complete-system level;
- **Cost efficiency:** unknown because no defensible system price is public;
- **Off-grid suitability:** cannot be scored responsibly until complete-system power and platform availability are known;
- **Research value:** high, because it demonstrates a credible non-x86/non-Arm CPU path for transformer inference.

## Sources

- XuanTie / T-Head official site: https://www.t-head.cn/
- Reuters March 24, 2026 announcement coverage: https://www.reuters.com/world/asia-pacific/alibaba-develops-next-gen-chip-agentic-ai-chinese-media-says-2026-03-24/
- XenoSpectrum August 19, 2026 benchmark analysis: https://xenospectrum.com/en/xuantie-c950-qwen38-27b-shl-inference/
- Science and Technology Daily announcement coverage: https://www.stdaily.com/web/gdxw/2026-03/24/content_491691.html
- CNX Software technical summary: https://th.cnx-software.com/2026/03/26/alibaba-xuantie-c950-powerful-rva23-complaint-64-bit-risc-v-core-edge-ai-computing/

## Follow-up research targets

1. Identify the exact 64-core server/SoC implementation behind the August slide.
2. Capture memory capacity, memory technology and absolute bandwidth.
3. Capture system power at idle, prefill and decode.
4. Determine benchmark precision/quantization and context.
5. Verify whether SHL/model kernels are publicly downloadable for C950.
6. Track production silicon, OEM servers, licensing/pricing and availability.
7. Seek independently reproduced Qwen/DeepSeek benchmark results.
