# Used Ampere Workstation Value — 2026

Research snapshot: **2026-08-26**.

This note covers two Ampere workstation GPUs that were missing from the normalized catalog but remain relevant to local LLM inference because they combine active cooling, ECC VRAM, current CUDA support and much lower power than many older 24–32 GB datacenter cards.

## Comparison

| GPU | VRAM | Bandwidth | Board power | Form factor | Observed used price | Primary local-LLM value |
|---|---:|---:|---:|---|---:|---|
| NVIDIA RTX A4000 | 16 GB ECC GDDR6 | 448 GB/s | 140 W | single-slot, active | CA$1,169 | Compact 16 GB CUDA node with unusually practical power and cooling. |
| NVIDIA RTX A4500 | 20 GB ECC GDDR6 | 640 GB/s | 200 W | dual-slot, active | CA$1,475 | More model/context headroom and 43% more memory bandwidth than A4000; optional NVLink. |

The simple specification-derived bandwidth/power ratio is **3.2 GB/s/W for both cards**. This is not a measured LLM efficiency result.

## RTX A4000 16 GB

NVIDIA specifies 6,144 Ampere CUDA cores, 192 third-generation Tensor Cores, 19.2 FP32 TFLOPS, 16 GB ECC GDDR6 and 448 GB/s of memory bandwidth at a 140 W maximum board power. The reference card is actively cooled and only one slot wide.

For local LLM use, 16 GB is a practical tier for many 7B–14B quantized models and smaller multi-model pipelines. Selected larger models can run with aggressive quantization or CPU offload, but a normal 30B-class model generally should not be assumed to fit entirely in 16 GB after runtime and KV-cache overhead.

The A4000 is particularly useful when chassis space, power budget and noise/airflow complexity matter more than maximum model capacity.

## RTX A4500 20 GB

NVIDIA specifies 7,168 Ampere CUDA cores, 224 third-generation Tensor Cores, 23.7 FP32 TFLOPS, 20 GB ECC GDDR6 and 640 GB/s at 200 W. It is an actively cooled dual-slot card.

The additional 4 GB over A4000 can materially improve context/KV-cache headroom, while the 640 GB/s memory subsystem is substantially faster. It is a strong 7B–14B card and can accommodate many approximately 20B-class quantized workloads, depending on quantization, context and runtime overhead.

A4500 supports NVLink with 112.5 GB/s bidirectional link bandwidth. NVIDIA notes that two cards can scale to 40 GB for applications that explicitly support NVLink. This must not be interpreted as one automatically unified 40 GB VRAM pool: LLM runtimes still need explicit multi-GPU model placement/sharding support.

## CUDA and quantization status

NVIDIA currently lists RTX A4000 in compute capability 8.6, and NVIDIA's current CUDA architecture matrix marks Ampere 8.0/8.6 toolkit and driver support as **ongoing**.

Practical local-AI paths include CUDA-backed `llama.cpp`, PyTorch, TensorRT, vLLM and Ollama. GGUF Q4/Q5/Q6/Q8, GPTQ/AWQ and INT8/INT4 paths are runtime-dependent. Hardware Tensor Core datatype support does not mean every quantization format receives an optimized kernel in every framework.

## Current used-market observations

The 2026-08-26 Canadian marketplace snapshot found:

- RTX A4000 16 GB: representative active used listing around **CA$1,169**.
- RTX A4500 20 GB: representative active pre-owned listing around **CA$1,475**.

These are asking-price observations rather than a claim about fair market value. Seller location, OEM variant, condition, warranty, shipping and taxes can materially change effective cost.

## Off-grid / compact deployment

RTX A4000 is the more compelling off-grid candidate because its 140 W board limit, single-slot design and active cooler simplify integration. RTX A4500's 200 W limit is still moderate compared with 250–350 W enthusiast/datacenter alternatives but needs a larger chassis and auxiliary PCIe power.

For either card, complete-system wall power will exceed GPU board power. CPU, motherboard, storage, conversion losses and idle behavior must be included in real energy budgets.

## Sources

- NVIDIA RTX A4000 product page: https://www.nvidia.com/en-gb/products/workstations/rtx-a4000/
- NVIDIA RTX A4000 datasheet: https://www.nvidia.com/content/dam/en-zz/Solutions/gtcs21/rtx-a4000/nvidia-rtx-a4000-datasheet.pdf
- NVIDIA RTX A4500 product page: https://www.nvidia.com/en-au/products/workstations/rtx-a4500/
- NVIDIA RTX A4500 datasheet: https://www.nvidia.com/content/dam/en-zz/Solutions/products/workstations/nvidia-rtx-a4500-datasheet.pdf
- NVIDIA current CUDA compute-capability table: https://developer.nvidia.com/cuda/gpus
- NVIDIA CUDA toolkit/driver/architecture matrix: https://docs.nvidia.com/datacenter/tesla/drivers/latest/cuda-toolkit-driver-and-architecture-matrix.html
- Current Canadian marketplace observations are stored separately under `data/price-observations-2026-08-26-ampere-workstation.jsonl`.
