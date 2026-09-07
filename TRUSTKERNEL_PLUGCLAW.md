# TrustKernel PlugClaw

## Summary

TrustKernel PlugClaw is a thumb-sized USB-C computer marketed as a privacy-hardened local agent runtime. The September 4, 2026 shipping announcement describes a 50 × 19 × 8 mm, 15 g device based on a MediaTek Helio G80, with up to 6 GB of memory and 128 GB encrypted storage. It runs PlugOS (Android-based) and Ubuntu as the agent runtime, using the host device for display and input.

This is tracked as an **unusual specialty edge-computing candidate**, not as a serious large-model inference accelerator. The published memory ceiling is too small for most general-purpose local LLM workloads, but the device is relevant for private orchestration, lightweight models, offline tools, and secure edge-agent deployments where a self-contained runtime matters more than throughput.

## Hardware and inference relevance

- **SoC:** MediaTek Helio G80 (manufacturer announcement)
- **Memory:** up to 6 GB (configuration detail not further specified)
- **Storage:** up to 128 GB encrypted storage
- **Form factor:** 50 × 19 × 8 mm; 15 g
- **Host interface:** USB-C; host provides display and input
- **Software:** PlugOS plus Ubuntu agent runtime
- **LLM evidence:** no named-model tok/s, quantization, context, runtime version, or wall-power benchmark published in the announcement

## Availability and price

TrustKernel stated on September 4, 2026 that PlugClaw had moved from pre-order to general availability and had begun shipping worldwide. No public price was captured in the announcement source used for this record.

## Evidence quality and research gaps

The available information is a company-provided release carried by PR Newswire. Treat product claims as **manufacturer/press-release evidence** until an independent review, full specification sheet, or reproducible benchmark appears.

Open questions:

- Exact RAM configuration and usable memory after PlugOS/Ubuntu overhead
- CPU/GPU/NPU details exposed to Linux and available acceleration APIs
- Supported local LLM backends and model sizes
- Sustained power draw and thermal behavior under continuous inference
- Retail price, regional stock, warranty, and replacement policy
- Independent benchmark evidence

## Sources

- TrustKernel / PR Newswire announcement (September 4, 2026): https://www.prnewswire.com/news-releases/trustkernel-ships-plugclaw-a-thumb-sized-private-ai-computer-and-opens-free-confidential-inference-302869347.html
