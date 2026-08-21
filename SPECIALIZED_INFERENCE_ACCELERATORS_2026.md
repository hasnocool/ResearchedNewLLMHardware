# Specialized Inference Accelerators — 2026-08-21

This research note covers three accelerators that are easy to mis-rank if headline TOPS are compared without considering memory architecture and software constraints.

| Hardware | Memory | Bandwidth | Power | Current availability | Practical role |
|---|---:|---:|---:|---|---|
| FuriosaAI RNGD | 48 GB HBM3 | 1.5 TB/s | 180 W | Mass production / quote | High-throughput LLM inference on Furiosa-LLM |
| Qualcomm Cloud AI 100 Ultra | 128 GB LPDDR4X ECC | 548 GB/s | 150 W | Contact sales / OEM appliances | Large-model on-prem inference |
| MemryX MX3 M.2 (4-chip) | on-chip weights, no external DRAM | n/a | ~8 W typical, 10 W average max | Backorder at Mouser | Edge CV and small transformer subgraphs |

## FuriosaAI RNGD

RNGD is unusually compelling on raw memory efficiency: 48 GB of HBM3 at 1.5 TB/s and 180 W works out to about 8.33 GB/s of memory bandwidth per board watt. Furiosa's current public specifications list 256 BF16 TFLOPS, 512 FP8 TFLOPS, 512 INT8 TOPS and 1024 INT4 TOPS.

The software story is stronger than for many obscure accelerators. Furiosa's 2026 model matrix covers Llama 3.1/3.3, Qwen 2.5/3, Qwen 3 MoE/VL, EXAONE 4.0, GPT-OSS and Solar Open. The key caveat is portability: this is a Furiosa compilation/runtime target, not a drop-in CUDA or GGUF accelerator.

Older Furiosa developer pages have shown a 150 W TDP while the current public product/specification pages and April 2026 mass-production announcement say 180 W. The normalized record uses the current 180 W product figure and preserves that discrepancy.

## Qualcomm Cloud AI 100 Ultra

Cloud AI 100 Ultra combines 128 GB ECC LPDDR4X with 548 GB/s and a 150 W envelope. Qualcomm currently specifies up to 870 INT8 TOPS and 288 FP16 TFLOPS for the AI 100 Ultra SKU.

The 128 GB capacity is the standout characteristic. Qualcomm's current on-prem material says the platform supports models up to 120B parameters and advertises up to 300 tok/s for Llama 3.1 8B. Those numbers are retained strictly as vendor evidence; exact model precision, batching, context and appliance configuration matter.

The deployment path is Qualcomm's AI Inference Suite / Cloud AI SDK and optimized model ecosystem, with OpenAI-compatible service APIs. It should not be treated as a transparent replacement for CUDA, ROCm, MLX, GGUF, AWQ or GPTQ workflows.

## MemryX MX3 M.2

The four-chip MX3 module is almost the opposite of the two large-memory cards above. It operates around 8 W typical and 10 W average maximum, but stores only about 80 million 4-bit or 40 million 8-bit weight parameters on-chip. That is far below modern billion-parameter chat models.

MemryX SDK 2.2 now supports Attention, MultiHeadAttention and GroupedQueryAttention, but MemryX explicitly describes transformer support as limited and expanding. The module is therefore best cataloged as an excellent low-power edge/CV accelerator with experimental language-model relevance, not as a tiny 24-TFLOPS LLM GPU.

Mouser's current listing showed US$201.56 for one `MX3-2280-M-4-I`, with zero stock, 64 units on order and an expected 2026-08-28 replenishment date when checked.

## Ranking guidance

Do not rank these three by TOPS alone.

- **RNGD** is the strongest high-bandwidth LLM-specific accelerator in this set.
- **Cloud AI 100 Ultra** is the capacity-per-watt standout at 128 GB / 150 W.
- **MX3** is the off-grid/embedded power winner, but its model-weight capacity makes it unsuitable for general billion-parameter local chat models.

For all three, software compatibility and supported model compilation are at least as important as arithmetic throughput.
