# Low-power AM5 AI desktop platforms — 2026

Research snapshot: **2026-08-20**.

AMD's Ryzen AI 400 desktop family fills an unusual niche for local AI: socketed AM5 processors with Zen 5 CPU cores, RDNA 3.5 integrated graphics, an XDNA 2 NPU, standard DDR5 UDIMMs, and low-power 35 W `GE` variants. These are most interesting as expandable AI hosts rather than as substitutes for high-bandwidth discrete GPUs.

## 35 W Ryzen AI 400 GE comparison

| Processor | CPU | iGPU | NPU | Memory ceiling | Official memory speed | TDP | Local-LLM role |
|---|---:|---|---:|---:|---:|---:|---|
| Ryzen AI 7 450GE | 8C/16T | Radeon 860M, 8 CUs | up to 50 TOPS | 256 GB DDR5 | DDR5-5600 with 2 DIMMs | 35 W | Best GE variant for CPU-heavy inference and mixed host workloads. |
| Ryzen AI 5 440GE | 6C/12T | Radeon 840M, 4 CUs | up to 50 TOPS | 256 GB DDR5 | DDR5-5600 with 2 DIMMs | 35 W | Lower-cost/low-power host candidate when NPU capability matters more than iGPU throughput. |
| Ryzen AI 5 435GE | 6C/12T | Radeon 840M, 4 CUs | up to 50 TOPS | 256 GB DDR5 | DDR5-5600 with 2 DIMMs | 35 W | Entry GE option; fewer PCIe lanes than 440GE/450GE should be considered for expansion-heavy builds. |

All three support AM5, DDR5 UDIMMs, ECC with suitable motherboard support, native USB4, and Linux/Windows operating systems according to AMD. The 450GE and 440GE expose 16 native PCIe 4.0 lanes (12 usable), while the 435GE exposes 14 (10 usable).

## What the 50 TOPS number does and does not mean

The XDNA 2 figure is a peak NPU metric. It should **not** be converted into tokens/sec or compared directly with CUDA/ROCm GPU TOPS. Arbitrary GGUF models do not automatically execute on the NPU; NPU acceleration depends on Ryzen AI-supported models, operators, execution providers, and quantization paths.

For general local LLM work, the safe assumptions are:

- CPU inference through llama.cpp-family runtimes is available;
- Vulkan-capable GPU paths may use the integrated Radeon GPU where supported;
- XDNA 2 acceleration requires the Ryzen AI software stack and compatible model graphs;
- 7B–14B quantized models are a reasonable capacity target with sufficient RAM;
- much larger models can fit in system RAM, but dual-channel DDR5 bandwidth will usually make decode far slower than high-bandwidth unified-memory or discrete-GPU systems.

## Why the 35 W parts matter for off-grid nodes

A 35 W socketed processor supporting up to 256 GB DDR5 is unusual. It enables a system to prioritize RAM capacity, storage, networking, and serviceability without committing to the 120–600 W processor/GPU envelopes common in larger local-AI workstations.

However, **35 W TDP is not whole-system wall power**. Motherboard losses, DIMMs, NVMe drives, networking, fans, and PSU efficiency all matter. A future useful benchmark is therefore wall-power-at-idle and wall-power-during-GGUF-decode for a minimal 450GE/440GE system.

## Shipping OEM reference: HP EliteDesk 8 SFF G2a

HP's EliteDesk 8 SFF G2a is a current real-world Ryzen AI 400 desktop implementation. HP documents support for Ryzen AI 7 450G and Ryzen AI 5 435G/440G variants, two DDR5-5600 UDIMM slots, up to 64 GB in this chassis, two M.2 2280 storage slots, PCIe x16 expansion, DisplayPort 2.1, HDMI 2.1, and 180 W or 280 W internal PSU options.

A current US channel listing for HP part **E13LKAT#ABA** showed **US$1,296** for a Ryzen AI 5 / 16 GB / 512 GB configuration. A separate reseller maps the same HP manufacturer part to Ryzen AI 5 435G; because that exact CPU mapping is not exposed directly on the CDW page, the structured record retains the mapping provenance instead of presenting it as manufacturer-direct evidence.

The chassis is more useful as a practical deployment reference than as the maximum-memory implementation: HP caps it at 64 GB even though the underlying Ryzen AI 400 desktop processors support up to 256 GB.

## Sources

- AMD Ryzen AI 7 450GE: https://www.amd.com/en/products/processors/desktops/ryzen/ai-400-series/amd-ryzen-ai-7-450ge.html
- AMD Ryzen AI 5 440GE: https://www.amd.com/en/products/processors/desktops/ryzen/ai-400-series/amd-ryzen-ai-5-440ge.html
- AMD Ryzen AI 5 435GE: https://www.amd.com/en/products/processors/desktops/ryzen/ai-400-series/amd-ryzen-ai-5-435ge.html
- AMD Ryzen AI 400 desktop announcement: https://newsroom.amd.com/news/amd-gives-consumers-and-businesses-more-ai-pc-opti/
- AMD Ryzen AI documentation: https://ryzenai.docs.amd.com/en/latest/
- HP EliteDesk 8 SFF G2a specifications: https://support.hp.com/se-sv/document/ish_15153543-15153663-16?fallbackLocale=us-en&validated=true
- HP EliteDesk 8 SFF G2a support/manuals: https://support.hp.com/us-en/product/setup-user-guides/hp-elitedesk-8-sff-g2a-desktop-next-gen-ai-pc/2103559103
- Current CDW listing: https://www.cdw.com/product/hp-elitedesk-8-sff-g2a-desktop-next-gen-ai-pc-wolf-pro-security-edition/9193257
