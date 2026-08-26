# Intel Crescent Island

Last updated: **2026-08-26**

Intel Crescent Island is a purpose-built **Xe3P inference GPU** aimed at large-model and agentic AI workloads in conventional air-cooled enterprise servers.

## Why it matters

The most important new Hot Chips 2026 disclosure is memory capacity: Intel now specifies **up to 480 GB LPDDR5X on a 350 W air-cooled PCIe card**. That is an unusually large single-card memory pool for an accelerator that does not require liquid cooling.

Intel positions Crescent Island around sustained token throughput, larger models, longer context windows and higher concurrent-agent density rather than training-first peak FLOPS.

## Manufacturer specifications

- Architecture: **Xe3P**
- Xe cores: **32**
- XMX engines: **256**
- Memory: **up to 480 GB LPDDR5X**
- Power: **350 W**
- Form factor: PCIe accelerator
- Cooling: air cooled
- Intended workload: large-scale inference / agentic AI

Intel's original October 2025 announcement described a 160 GB target. Its May and August 2026 disclosures supersede that capacity figure with **up to 480 GB**, so the repository treats 480 GB as the current manufacturer specification while preserving the older announcement as historical context.

## Software maturity

Intel oneAPI 2026.1 explicitly lists **Crescent Island** GPU support for Ubuntu Server 24.04 and 26.04. Relevant software paths include:

- stock PyTorch through `torch.xpu`;
- oneDNN;
- oneCCL for distributed workloads;
- SYCL / oneAPI tooling.

This is important because high memory capacity only becomes useful when models can be deployed through a practical framework stack.

## Pricing and availability

No defensible public standalone price is captured yet.

Intel previously targeted customer sampling in the **second half of 2026**. The Hot Chips disclosure materially improves the specification picture, but it does not by itself establish broad production availability.

## Current ranking

**S-potential / watch.**

Crescent Island could become one of the most interesting inference cards in the catalog if its physical memory bandwidth, price and real token throughput are competitive. The 480 GB capacity at 350 W is already significant enough to warrant a dedicated record.

## Open questions

- physical LPDDR5X bandwidth;
- exact low-precision peak/sustained compute;
- standalone/OEM pricing;
- production shipment dates;
- independent prefill/decode results;
- whole-system tokens per watt;
- multi-card scale-up topology and efficiency.

## Primary sources

- https://newsroom.intel.com/client-computing/intel-outlines-architectures-for-agentic-ai-at-hot-chips-2026
- https://newsroom.intel.com/data-center/intel-puts-agentic-ai-xeon-6-networking-ai-systems
- https://newsroom.intel.com/artificial-intelligence/intel-to-expand-ai-accelerator-portfolio-with-new-gpu
- https://www.intel.com/content/www/us/en/developer/articles/release-notes/oneapi-toolkit/2026.html
- https://www.intel.com/content/www/us/en/developer/tools/oneapi/optimization-for-pytorch.html
