# Compact Value AI Mini PCs — 2026-08-26

This research pass adds two compact systems that fill different gaps in the local-AI catalog: the crowdfunded **Piston V** based on AMD Ryzen AI 9 365, and the entry-level **MINIX N304-AI** based on Intel Core 3 304 / Wildcat Lake.

## Comparison

| System | CPU / accelerator | Memory | Processor power | Networking / expansion | Observed price | LLM role |
|---|---|---:|---:|---|---:|---|
| Piston V | Ryzen AI 9 365; Radeon 880M; 50-TOPS XDNA 2 NPU | 16GB base, up to 64GB DDR5-5600 | 28W default, 15-54W cTDP | 2x 2.5GbE, USB4, OCuLink | US$589 active crowdfunding tier | Flexible small/medium-model node; 64GB configuration can hold larger quantized models, but DDR5 bandwidth limits decode speed |
| MINIX N304-AI | Core 3 304; 1-Xe-core Intel Graphics; 15-TOPS NPU | 16GB LPDDR5X fixed | 15W base, 10W minimum assured, 35W max turbo | 2x 1GbE, USB-C, HDMI, DP | €749.99 EU channel listing, out of stock | Lightweight assistants, embeddings, OCR, speech, small RAG and always-on edge tasks |

## Piston V

Piston V is currently a successfully funded crowdfunding product rather than a shipping retail system. Its base reward includes 16GB RAM and a 500GB SSD; the campaign FAQ states memory can be upgraded to 64GB and storage to 4TB. Current reporting places the active early-bird tier at US$589 after the US$559 super-early-bird allocation sold out.

The underlying Ryzen AI 9 365 is a known Strix Point platform: 10 CPU cores / 20 threads, Radeon 880M with 12 RDNA 3.5 compute units, a 50-TOPS XDNA 2 NPU, up to 73 total vendor AI TOPS, and a 15-54W configurable processor envelope. AMD supports DDR5-5600 and LPDDR5X-8000 at the processor level.

For local LLM work, the interesting differentiator is **OCuLink**. The integrated Radeon 880M is not a substitute for a high-bandwidth discrete GPU, but OCuLink provides a direct PCIe-class path for adding one later. A 64GB DDR5 configuration can also hold many quantized models that do not fit in ordinary 16-32GB mini PCs, though system-memory bandwidth will make large-model decode much slower than high-bandwidth VRAM or HBM systems.

The XDNA 2 NPU should be treated separately from generic GGUF inference. CPU/Vulkan llama.cpp paths can use common GGUF quantizations, while NPU acceleration depends on supported Ryzen AI / ONNX workflows.

## MINIX N304-AI

MINIX's N304-AI is one of the first compact systems using Intel's entry-level Wildcat Lake Core 3 304. Intel documents one Performance-core plus four Low Power Efficient-cores, five threads total, 15W processor base power, 35W maximum turbo power, a 9-TOPS Intel GPU and 15-TOPS NPU. MINIX markets 24 TOPS for the combined platform.

The system is constrained by 16GB fixed LPDDR5X memory and a very small integrated GPU. That makes it more credible for small local assistants, embeddings, OCR, audio, computer-vision support tasks, and compact RAG services than for large autoregressive LLMs. Intel documents OpenVINO, WindowsML, DirectML, ONNX Runtime and WebNN support across the CPU/GPU/NPU stack.

An authorized European channel currently lists the 16GB/512GB Windows 11 Pro configuration at €749.99 but out of stock. That price is retained as an availability-aware observation, not as a claim that the system can presently be ordered.

## Power and off-grid notes

Neither vendor currently publishes defensible whole-system LLM tokens-per-watt measurements. Processor power figures should therefore not be substituted for wall power. Piston V has the more capable compute platform but still lacks a published DC-input/whole-system power profile. N304-AI's 10-35W processor envelope is attractive for always-on use, but its complete-system idle/load draw should be measured before off-grid sizing.

## Sources

- AMD Ryzen AI 9 365: https://www.amd.com/en/products/processors/laptop/ryzen/ai-300-series/amd-ryzen-ai-9-365.html
- Piston V campaign: https://www.kickstarter.com/projects/pistonv/pistonv-dual-os-gaming-beast-in-a-gadget-form-factor
- Piston V campaign FAQ: https://www.kickstarter.com/projects/pistonv/pistonv-dual-os-gaming-beast-in-a-gadget-form-factor/faqs
- Intel Core 3 304 specifications: https://www.intel.com/content/www/us/en/products/sku/246020/intel-core-3-processor-304-6m-cache-up-to-4-30-ghz/specifications.html
- MINIX N304-AI announcement: https://www.minix.com.hk/blogs/blog-center/n304-ai-brings-ai-computing
- EU authorized channel listing: https://www.pepper-jobs.eu/en/n304-ai.html
