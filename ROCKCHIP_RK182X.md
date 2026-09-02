# Rockchip RK182X companion accelerators

_Last reviewed: 2026-09-01_

## Why this matters

RK1820 and RK1828 are unusual low-power AI companion devices intended to pair with RK3576/RK3588-class hosts instead of replacing them. The design targets the memory-bandwidth bottleneck in small local language and vision-language models by placing dedicated 3D-stacked DRAM beside the accelerator.

## Publicly reported hardware

| Device | Peak AI compute | On-device memory | Reported deployment | Current evidence |
|---|---:|---:|---|---|
| RK1820 | 20 TOPS INT8 | 2.5GB 3D DRAM | PCIe/USB companion module | Rockchip design-partner catalog |
| RK1828 | 20 TOPS INT8 | 5GB 3D DRAM | M.2 / SO-DIMM-style companion module | Rockchip design-partner catalog |

BesTom, a Rockchip AIoT design partner, lists INT4/FP8/FP16/BF16 support, PCIe 2.1, RGMII and USB 3.1 connectivity, and mass-production status for RK1820/RK1828. Exact primary Rockchip datasheets and public retail pricing were not located in this review.

## LLM evidence

BesTom publishes a partner-reported SDK 1.1.0 performance summary using 1024-token context and 128 input / 128 output tokens. On RK1828, it reports:

- Qwen3-1.7B W4A16: 53.6 ms TTFT, 2,387.5 tok/s prefill, 137.98 tok/s decode.
- Qwen3-4B W4A16: 107.8 ms TTFT, 1,187.5 tok/s prefill, 84.10 tok/s decode.

These are not independent reproductions and should not be compared directly with GPU benchmarks without matching quantization, context, batch and runtime conditions. The same partner page reports much lower RK3588 decode rates under a different W8A8-3 path, which is useful as directional evidence only.

## Practical fit

The strongest use case is a tiny distributed edge node where an RK3588 or RK3576 host handles application logic, networking and orchestration while the RK182X module handles small LLM/VLM inference. The low reported power and compact module formats are attractive for robotics, industrial gateways and offline assistants. The main risks are limited onboard memory, immature public documentation, partner-only availability and uncertain model portability outside the supplied SDK/runtime.

## Sources

- BesTom Rockchip platform matrix: https://bestom.net/platforms.html
- BesTom edge AI host and benchmark summary: https://bestom.net/solutions/edge-ai-host.html
- Rockchip: https://www.rock-chips.com/

## Open research items

1. Locate and archive primary Rockchip RK1820/RK1828 datasheets and SDK documentation.
2. Verify exact memory technology, bandwidth and interface mapping per module revision.
3. Find a public board-level price and stock source.
4. Reproduce Qwen3 benchmarks with measured whole-system power.
5. Determine whether multiple RK1828 devices can be used concurrently for larger models or replicas.
