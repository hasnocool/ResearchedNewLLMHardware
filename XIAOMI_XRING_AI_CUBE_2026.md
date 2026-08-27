# Xiaomi XRING AI Cube Prototype (2026)

## Why it matters

Xiaomi demonstrated the AI Cube engineering prototype at its August 24, 2026 XRING chip event. The system combines three Xiaomi-designed processors—XRING O3, O100, and D100—and is explicitly aimed at local AI workloads ranging from small models to a demonstrated 120B-class configuration.

The prototype is high-interest research hardware, but it is **not a shipping product** and several widely repeated claims need careful separation.

## Three compute and memory domains

| Component | Role | Publicly reported memory detail | Important caveat |
|---|---|---|---|
| XRING O3 | General-purpose/mobile SoC | LPDDR6; ~113.8 GB/s reported system-memory bandwidth | This is not the O100 near-memory bandwidth and not the large D100 model-memory bandwidth. |
| XRING O100 | Near-memory AI accelerator | 1.22 TB/s vendor-reported near-memory bandwidth | The 1.22 TB/s figure belongs to O100's local stacked-memory domain; it must not be attached to a 120B model's full weight-storage memory pool. |
| XRING D100 | Large-memory AI / intelligent-driving processor | Up to 160 GB unified memory; Xiaomi claims support for models up to 200B parameters | Bandwidth of the large unified-memory pool has not been publicly established in a defensible way. |

## LLM relevance

Xiaomi showed the AI Cube with local model configurations including 3B and 120B workloads and reports up to 150 W sustained system operation. That combination makes the architecture notable as a potential compact large-memory inference system.

However, the public material does not provide enough metadata to normalize the 120B workload against DGX Spark, Ryzen AI Max, Apple Silicon, or workstation GPUs. Missing data includes the exact 120B model, quantization, context length, prompt-processing rate, decode rate, KV-cache requirements, large-memory bandwidth, and whole-system wall power during inference.

A separate O3+O100 mobile engineering prototype was reported at 295 output tokens/s on a Xiaomi MiMo edge model. That result is retained only as a vendor benchmark because the model size, quantization, context, prefill throughput, and complete power data are not sufficiently disclosed.

## Software and quantization

No public evidence found in this research pass establishes general support for CUDA, ROCm, MLX, OpenVINO, llama.cpp/GGUF, vLLM, GPTQ, or AWQ. The system should therefore be treated as using a proprietary XRING/Xiaomi software stack until an SDK or supported framework matrix is published.

Likewise, model-capacity and TOPS claims do not establish INT4 or GGUF compatibility.

## Availability and pricing

As of August 27, 2026, AI Cube is an engineering prototype with no announced retail SKU, preorder, or numeric price. Reporting indicates O100 and D100 target commercial use in 2027, but that does not guarantee a retail AI Cube product.

## Research priorities

The highest-value follow-up data is:

- D100 unified-memory type and bandwidth;
- exact AI Cube memory topology;
- O100 near-memory capacity;
- 120B model identity, quantization, context, prefill, and decode performance;
- public SDK/framework support;
- idle and loaded wall power;
- shipping product status, price, and regions.

## Sources

- https://www.notebookcheck.net/Xiaomi-unveils-AI-Cube-mini-PC-with-three-Xring-chips-and-150-W-performance.1376717.0.html
- https://videocardz.com/newz/xiaomi-shows-150w-ai-cube-mini-pc-with-xring-processor-lpddr6-memory-and-16-core-g2-ultra-nx-gpu
- https://cnevpost.com/2026/08/24/xiaomi-unveils-xring-d100-smart-driving-chip/
- https://tech.sina.cn/2026-08-25/detail-inippmes5518808.d.html
