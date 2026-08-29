# Tenstorrent Blackhole local AI hardware — 2026-08-28

This research slice adds the currently orderable Blackhole PCIe cards and the TT-QuietBox 2 workstation to the normalized hardware catalog. Specifications and prices are taken from Tenstorrent's current product and hardware documentation rather than older launch summaries.

## Current hardware

| Product | Part number | Accelerator memory | Bandwidth | BlockFP8 | Board/system power reference | Current manufacturer price | Availability |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| Blackhole p100a | TC-03008 | 28 GB GDDR6 | 448 GB/s | 664 TFLOPS | 300 W TBP | US$999 | In stock; ships in about 2 weeks |
| Blackhole p150a | TC-03003 | 32 GB GDDR6 | 512 GB/s | 664 TFLOPS | 300 W TBP | US$1,399 | In stock; ships in about 2 weeks |
| Blackhole p150b | TC-03002 | 32 GB GDDR6 | 512 GB/s | 664 TFLOPS | 300 W TBP | US$1,399 | In stock; ships in about 2 weeks |
| TT-QuietBox 2 Blackhole | TW-04003 | 128 GB GDDR6 across four chips | about 2 TB/s aggregate across two p300c cards | not normalized as one flat chip metric | up to 1.5 kW published system peak reference | US$9,999 | Orderable; ships in 10–12 weeks |

## Why the p150 is different

p150a and p150b add four passive QSFP-DD 800G links used specifically for Blackhole-to-Blackhole connectivity. That makes them materially more interesting for larger local models than p100a: multiple cards can be linked for pooled capacity and parallel execution. These ports are accelerator-fabric links and are not recorded as ordinary 800GbE host networking.

The two p150 models have the same compute, memory and board-power specifications. p150a is active-cooled for workstation use; p150b is passive and expects server/rack airflow. The passive card therefore has additional chassis-fan requirements that matter for total power and off-grid deployments.

## Software and model support

Tenstorrent's open-source stack includes TT-Forge, TT-NN, TT-Metalium and TT-LLK. TT-Forge provides higher-level paths for frameworks such as PyTorch, JAX and ONNX. Blackhole natively exposes FP8, FP16/BF16, block-float formats including BLOCKFP2/BLOCKFP4/BLOCKFP8, INT8 and other formats documented by Tenstorrent.

These hardware formats should not be confused with drop-in compatibility for arbitrary GGUF, GPTQ, AWQ or EXL2 files. A model still needs a supported Tenstorrent compiler/runtime path.

For rough capacity planning, a single 28–32 GB card is strongest for small-to-mid-size quantized LLMs. Tenstorrent documents networked Blackhole configurations for larger models, including 70B-class deployments. Capacity guidance in the JSON remains deliberately conservative because KV cache, context, runtime overhead, tensor parallelism and current model implementation all affect real fit.

## TT-QuietBox 2

QuietBox 2 uses two liquid-cooled p300c cards. Each p300c contains two Blackhole chips, giving four chips and 128 GB total GDDR6. Tenstorrent's current guide states 1,024 GB/s per p300c card, while its workstation welcome page summarizes the four-chip system as 2 TB/s. The catalog records 2,048 GB/s as an aggregate topology figure and explicitly warns that it is not equivalent to one flat 2 TB/s memory pool.

The workstation also includes a Ryzen 7 9700X, 256 GB DDR5-5600 host memory, 4 TB NVMe storage and Ubuntu 24.04. Tenstorrent ships Qwen3-32B preloaded and positions the system for private 32B/70B-scale LLM inference. Its preinstalled TT-Inference-Server provides an OpenAI-compatible API path.

Power needs are the major drawback for off-grid use. Tenstorrent's specification table lists a 1,500 W peak system figure, while accompanying operating guidance says up to about 1,300 W at peak load. Neither is treated as measured average inference power.

## Source and version caveats

Current Tenstorrent product and hardware pages list **120 Tensix cores per Blackhole chip**. Some older Tenstorrent lesson pages still show 140. The normalized records follow the current product/specification pages and preserve the discrepancy as provenance rather than mixing the figures.

The records also avoid turning manufacturer peak compute into an LLM throughput estimate. No independent cross-platform tokens/s value is added unless model, quantization, context, batching, runtime version and system configuration are adequately disclosed.

## Primary sources

- Tenstorrent Blackhole cards: https://tenstorrent.com/en/hardware/cards
- Blackhole hardware documentation: https://docs.tenstorrent.com/aibs/blackhole/
- QuietBox 2 product page: https://tenstorrent.com/en/hardware/tt-quietbox
- QuietBox 2 specifications: https://docs.tenstorrent.com/systems/quietbox/quietbox-bh-2/specifications.html
- QuietBox 2 guide: https://docs.tenstorrent.com/tt-quietbox2-guide/
- p300c specification: https://docs.tenstorrent.com/aibs/blackhole/p300.html
- TT-Metal open-source stack: https://github.com/tenstorrent/tt-metal
