# M5Stack LLM-8850 / Axera AX8850 Edge Accelerator

Last updated: **2026-08-23**

M5Stack's **LLM-8850 Kit** is a low-power M.2 edge-AI accelerator built around the **Axera AX8850**. It is unusually relevant to this repository because it combines dedicated accelerator memory, explicit transformer/LLM runtime support, Raspberry Pi 5 and RK3588 compatibility, and a manufacturer-specified **7 W card power** envelope.

## Hardware

| Field | LLM-8850 Kit 4GB | LLM-8850 Kit 8GB |
|---|---:|---:|
| SoC | Axera AX8850 | Axera AX8850 |
| CPU | 8× Cortex-A55 @ 1.7 GHz | 8× Cortex-A55 @ 1.7 GHz |
| NPU | 24 TOPS INT8 | 24 TOPS INT8 |
| Dedicated memory | 4 GB LPDDR4X-4266 | 8 GB LPDDR4X-4266 |
| Memory interface | 64-bit | 64-bit |
| Host interface | M.2 M-Key 2242, PCIe 2.0 ×2 | same |
| Card power | **7 W** | **7 W** |
| Cooling | active blower + CNC aluminum heatsink | same |
| Official-store price observed 2026-08-23 | **US$185** | **US$215** |
| Stock observed 2026-08-23 | 10+ in stock | out of stock |

The PiHat kit accepts USB-C PD and requires more than 9 V @ 3 A (27 W) because it can power both the accelerator and a Raspberry Pi 5. Do not confuse that adapter requirement with the accelerator card's own 7 W specification.

## Software and model support

M5Stack documents **AXCL Runtime** with C and Python APIs and specifically lists transformer/LLM and multimodal examples including:

- Llama 3.2
- Qwen3
- InternVL3
- CLIP
- Whisper
- YOLO-v8/11

The software stack also exposes the AX8850 video engine for 8K H.264/H.265 processing and ffmpeg integration. This makes the card potentially more valuable as a mixed multimodal/video/LLM edge node than its raw TOPS figure alone suggests.

Supported host operating systems in M5Stack's current documentation include Ubuntu 20.04/22.04/24.04, Debian 12/13, Windows 10 and Windows 11. macOS, WSL and common desktop virtual-machine paths are explicitly unsupported.

## LLM assessment

### Strengths

- **Very low accelerator power:** 7 W manufacturer specification.
- **Dedicated model memory:** avoids consuming all host RAM for supported workloads.
- **Native transformer support:** more relevant than a vision-only NPU with the same TOPS figure.
- **Broad edge-host compatibility:** Raspberry Pi 5, RK3588 SBCs and x86 PCs are explicitly targeted.
- **Low acquisition cost:** US$185–215 for the current kit variants is unusually inexpensive for a dedicated LLM-capable accelerator.

### Limits

- **4/8 GB is the hard capacity limit** for accelerator-resident models and runtime state.
- PCIe 2.0 ×2 is modest by workstation standards; Raspberry Pi 5 integrations may expose only one usable PCIe lane depending on the adapter/topology.
- AXCL is a substantially smaller ecosystem than CUDA, ROCm, Metal/MLX or generic llama.cpp CPU/GPU paths.
- Vendor model compatibility does not imply arbitrary GGUF/AWQ/GPTQ models can be loaded without conversion.
- No independent normalized tokens/s and tokens/W results were captured in this research pass, so the device should not yet receive a high throughput ranking.

## Best likely roles

The LLM-8850 is most compelling as an **always-on low-power helper accelerator** rather than as a large-model primary node. Likely roles include small local assistants, speech/Whisper, embeddings, multimodal/VLM processing, vision + language pipelines, preprocessing, classification, routing, and inexpensive Raspberry Pi/RK3588 accelerator experiments.

For this repository, the **8GB model is the higher-priority benchmark target** because its additional memory materially changes which quantized models can fit, even though it was out of stock when checked.

## Pricing and availability

Observed from the official M5Stack store on **2026-08-23**:

- LLM-8850 Kit 4GB (`AI-002-4G`): **US$185**, 10+ in stock.
- LLM-8850 Kit 8GB (`AI-002-8G`): **US$215**, out of stock.
- The older stand-alone 8GB `AI-001` card is marked **EOL** and replaced by the current kit.

Pricing observations are stored separately from hardware specifications because stock and storefront prices can change quickly.

## Sources

- Kit documentation: https://docs.m5stack.com/en/ai_hardware/LLM-8850_Kit
- Card documentation: https://docs.m5stack.com/en/ai_hardware/LLM-8850_Card
- 4GB official store: https://shop.m5stack.com/products/ai-8850-llm-acceleration-m-2-kit-4gb-version-ax8850
- 8GB official store: https://shop.m5stack.com/products/ai-8850-llm-accelerator-m-2-kit-8gb-version-ax8850
- Legacy/EOL card: https://shop.m5stack.com/products/ai-8850-llm-accleration-m-2-module-ax8850
