# HyperAccel Bertha LPU family

Research snapshot: 2026-08-28.

## Bertha 500

HyperAccel's Bertha 500 is a purpose-built LLM inference accelerator based on the company's LPU architecture. The current manufacturer specification lists 384 TFLOPS FP16, 768 TFLOPS FP8, 128 GB LPDDR5X with configurations up to 256 GB, 546 GB/s memory bandwidth, 256 MB SRAM, PCIe Gen5, a 250 W TDP, batch sizes from 1 to 1024, and a dual-slot form factor.

HyperDex is the software path, with the product page explicitly listing PyTorch, ONNX and vLLM support. Supported arithmetic includes FP16/FP8/FP4 and INT8/INT4.

The large LPDDR5X pool is the most unusual local/on-prem inference characteristic. At the 128 GB base capacity, a simple specification-derived capacity ratio is 0.512 GB/W; at 256 GB it is 1.024 GB/W. These are memory-capacity-per-TDP ratios only, not measured inference efficiency.

HyperAccel publishes comparisons against NVIDIA H100 showing higher throughput, cost efficiency and power efficiency. The public chart does not disclose enough workload, quantization, serving, pricing and system metadata for normalized cross-vendor ranking, so those figures remain vendor evidence rather than independent benchmark data.

## Bertha 100

Bertha 100 is the edge-oriented member of the family. HyperAccel lists a 4 nm LPU design, 16 GB LPDDR5X, 64 GB/s memory bandwidth, 1.0 GHz target frequency, 32.768 TFLOPS FP8 and an M.2 form factor. Supported number formats include BF16, FP8, FP4, INT8 and INT4, while HyperDex lists PyTorch, ONNX and vLLM support.

The product page states `Coming Q4, 2026`. No final public board TDP or numeric MSRP is currently listed, so both remain unknown in the normalized record. A marketing paragraph references a rounded 48 TFLOPS figure while the formal specification table lists 32.768 TFLOPS FP8; the dataset uses the explicit table value and preserves this discrepancy as a source caveat.

By raw capacity, 16 GB is most appropriate for smaller quantized local models, roughly the 7B-14B tier depending on context, KV cache, model format and runtime overhead. This is a capacity screen, not a guarantee of model support or token throughput.

## Availability and pricing

Neither Bertha product has a verified public numeric retail price as of this snapshot. Bertha 500 remains inquiry/sampling oriented, with company material pointing to mass production in 2027. Bertha 100 is announced for Q4 2026. The repository therefore records both as quote-only rather than inventing price estimates.

## Primary sources

- https://hyperaccel.ai/ha_product/bertha-500/
- https://hyperaccel.ai/ha_product/bertha-100/
- https://hyperaccel.ai/ha_product/lpu-ip/
- https://docs.hyperaccel.ai/
