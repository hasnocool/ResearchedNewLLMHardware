# Qualcomm Dragonwing Edge AI Hardware

Last updated: **2026-08-27**

This page tracks Qualcomm Dragonwing embedded/industrial AI platforms that have enough memory, Linux support, and public LLM evidence to matter to the local/distributed inference catalog.

## Why this family matters

Qualcomm's IQ8/IQ9 platforms are not high-capacity workstation replacements. Their value is in **low SoC power, integrated NPU acceleration, industrial longevity, Linux support, and unusually explicit manufacturer LLM throughput claims**.

TOPS figures here are dense INT8 NPU figures and must not be compared directly with NVIDIA FP4/FP8, AMD GPU TFLOPS, or Apple GPU bandwidth-based results.

## August 2026 software-maturity update

Qualcomm now documents a substantially clearer end-to-end GenAI path for Dragonwing IQ8/IQ9 systems:

- **Qualcomm AI Hub** for optimized model discovery, including LLM, VLM and multimodal models;
- **Qualcomm AI Runtime (QAIRT)** for heterogeneous CPU/GPU/DSP/Hexagon NPU execution;
- **GenieX** in developer preview, with CLI, Python SDK, Android SDK, Docker and OpenAI-compatible API interfaces;
- **QAIRT-backed GenieX** for maximum Qualcomm hardware/NPU optimization;
- **llama.cpp-backed GenieX** for broader GGUF/open-source compatibility;
- **Qualcomm IMSDK 2.0**, released August 26, for integrated GenAI + multimedia + deployment pipelines.

### IMSDK 2.0 changes the deployment story

Qualcomm IMSDK 2.0 is explicitly designed across Dragonwing platforms and adds several capabilities that matter for deployable local AI systems:

- GenAI, LLM and VLM inferencing microservices;
- OpenAI-compatible **chat-completion** microservices;
- Python and C++ Pipeline APIs/app builders;
- memory-optimized Docker deployment;
- QAIRT, ONNX Runtime and TFLite inference routes that can map to CPU, GPU or NPU;
- camera, video, audio, preprocessing, analytics and platform services in the same pipeline architecture;
- model sourcing through Qualcomm AI Hub, Hugging Face, Edge Impulse or bring-your-own-model workflows;
- Kafka, MQTT, AWS IoT, Azure IoT and other edge/cloud integration paths.

This improves **productization and integration maturity**, not raw LLM throughput. Qualcomm has not published new normalized token-generation results showing that IMSDK 2.0 itself makes a model faster. Features Qualcomm says are planned for a later release, including Responses API and model lifecycle management, are not counted as currently available.

Qualcomm also published a real IQ-9075 application showing **Llama 3.2 Instruct 3B + BAAI BGE-large embeddings + Whisper-small ASR** running on-device for LLM+RAG+speech workloads, distributed across the IQ-9075's two Hexagon HTP cores. Qualcomm did not publish a normalized tok/s or wall-power number for this combined workload, so this evidence improves the software/deployment score rather than the performance score.

Official references:

- https://www.qualcomm.com/developer/blog/2026/08/introducing-qimsdk2-unified-framework-multmedia-ai
- https://www.qualcomm.com/developer/blog/2026/08/from-models-to-ai-native-applications--building-intelligent-edge
- https://www.qualcomm.com/developer/blog/2026/07/genai-rag-iq9075-factorypulse
- https://www.qualcomm.com/developer/artificial-intelligence

## Dragonwing IQ-9075 Evaluation Kit

**Category:** industrial edge-AI evaluation kit  
**Processor:** Dragonwing IQ-9075  
**CPU:** 8-core Qualcomm Kryo, up to 2.36 GHz  
**GPU:** Adreno 663  
**NPU:** dual Hexagon Tensor Processors  
**AI performance:** up to 100 dense INT8 TOPS  
**Memory:** 36 GB LPDDR5 with link ECC  
**Platform memory interface:** 6×16-bit LPDDR5 @ 3200 MHz  
**Storage:** 128 GB UFS  
**Networking:** 2.5GbE-class industrial networking; platform supports dual 2.5GbE with TSN  
**Expansion:** PCIe Gen4  
**OS:** Ubuntu and upstream Linux with Yocto support  
**SoC power:** Qualcomm lists approximately **3.8–20 W SoC-only** for the IQ9 platform.

### LLM evidence

Qualcomm publishes two especially useful reference points:

- **Llama 2 7B:** up to **22 tokens/s** in the IQ9 Series product brief.
- **Llama 2 13B:** **12 tokens/s** in the IQ-9075 module product brief.

These are manufacturer results. The public pages do not provide enough detail about quantization, context, batching, or wall power to turn them into normalized tokens/joule rankings yet.

The newer FactoryPulse application adds deployment evidence for **Llama 3.2 Instruct 3B with RAG and Whisper-small ASR simultaneously on-device**. Because Qualcomm does not publish a comparable decode/prefill benchmark for that combined workload, it is recorded as software/application evidence only.

### Why it is interesting

A 36 GB industrial platform running 7B–13B-class models at a SoC envelope below 20 W is a materially different operating point from conventional GPUs. It is potentially useful for always-on agents, robotics, industrial inference, remote/off-grid nodes, and distributed helper roles.

QAIRT, GenieX, llama.cpp/GGUF and now IMSDK 2.0 reduce the software-risk penalty substantially. IMSDK 2.0 is especially relevant when the product needs to combine a local LLM/VLM with cameras, audio, analytics and OpenAI-compatible service interfaces.

### Pricing

No stable defensible public price was captured in this maintenance pass. Qualcomm exposes a **Buy now** path for the EVK, but the catalog should not invent a numeric price when the public page does not present one consistently.

### Vendor / technical documentation

- https://www.qualcomm.com/developer/hardware/qualcomm-iq-9075-evaluation-kit-evk
- https://www.qualcomm.com/internet-of-things/products/iq9-series/iq-9075
- https://docs.qualcomm.com/doc/87-97354-1/87-97354-1_REV_C_Qualcomm_Dragonwing_IQ-9075_Module_Product_Brief.pdf
- https://docs.qualcomm.com/doc/87-83840-1/87-83840-1_REV_A_Qualcomm_IQ9_Series_Product_Brief.pdf
- https://www.qualcomm.com/developer/blog/2026/08/introducing-qimsdk2-unified-framework-multmedia-ai
- https://www.qualcomm.com/developer/blog/2026/08/from-models-to-ai-native-applications--building-intelligent-edge
- https://www.qualcomm.com/developer/blog/2026/07/genai-rag-iq9075-factorypulse

---

## Dragonwing IQ-8275 Evaluation Kit

**Category:** lower-power industrial edge-AI evaluation kit  
**CPU:** 8-core Kryo Gen 6  
**GPU:** Adreno 623  
**NPU:** Qualcomm Hexagon  
**AI performance:** 20–40 dense INT8 TOPS  
**EVK memory:** 12 GB LPDDR5 with link ECC  
**Platform memory ceiling:** up to 32 GB  
**Storage:** 128 GB UFS  
**Networking:** 2.5GbE, optional Wi-Fi/Bluetooth companion module  
**OS:** Ubuntu and upstream Linux/Yocto

Qualcomm states that the IQ-8275 EVK can run **13B-parameter models at approximately 9 tokens/s**. The EVK's 12 GB memory is restrictive, so this should be interpreted as architecture/runtime evidence rather than proof that every arbitrary 13B model configuration fits locally.

Qualcomm IMSDK 2.0 is designed across Dragonwing platforms, so IQ-8275 now inherits a clearer deployable path for GenAI/LLM/VLM microservices, OpenAI-compatible chat completion, Python/C++ pipelines and QAIRT/ONNX/TFLite runtime selection. The strongest public multi-workload GenAI demo located remains on IQ-9075, not this EVK.

### Vendor / technical documentation

- https://www.qualcomm.com/developer/hardware/qualcomm-iq-8275-evaluation-kit-evk
- https://www.qualcomm.com/internet-of-things/products/iq8-series/iq-8275
- https://www.qualcomm.com/developer/blog/2026/08/introducing-qimsdk2-unified-framework-multmedia-ai
- https://www.qualcomm.com/developer/blog/2026/08/from-models-to-ai-native-applications--building-intelligent-edge

---

## Arduino VENTUNO Q

**Category:** SBC / robotics edge-AI board  
**Compute:** Dragonwing IQ-8275 + STM32H5 real-time MCU  
**NPU:** up to 40 dense INT8 TOPS  
**RAM:** 16 GB  
**Storage:** 64 GB eMMC plus M.2 NVMe Gen4 expansion  
**Networking:** 2.5GbE, Wi-Fi 6, Bluetooth 5.3  
**Software:** Linux, ROS 2, QAIRT, AI Hub, GenieX developer preview, llama.cpp/GGUF path, IMSDK 2.0, Arduino ecosystem

VENTUNO Q is notable because it packages IQ-8275 in a practical SBC-like platform with more memory than the 12 GB Qualcomm EVK and useful storage/networking expansion. IMSDK 2.0 strengthens its potential as a robotics/multimodal appliance because Qualcomm now documents local LLM/VLM inference services that can be composed with camera, audio, analytics and message-bus/cloud connectors.

### Promotion criteria

Keep board-specific ranking dependent on:

- stable current orderability and dated pricing observations;
- exact board-level wall power under LLM load;
- reproducible model/quantization/context benchmark data;
- supported-model conversion/deployment workflow on the board image;
- measured performance relative to Raspberry Pi + Hailo, RK3588, Jetson and low-power x86 nodes.

### Vendor / platform documentation

- https://www.qualcomm.com/developer/iot
- https://www.qualcomm.com/developer/hardware
- https://www.qualcomm.com/internet-of-things/products/iq8-series/iq-8275
- https://www.qualcomm.com/developer/blog/2026/08/introducing-qimsdk2-unified-framework-multmedia-ai
- https://www.qualcomm.com/developer/blog/2026/08/from-models-to-ai-native-applications--building-intelligent-edge

## Current assessment

| Platform | Capacity | Public LLM evidence | Power evidence | Software maturity | Catalog role |
|---|---:|---|---|---|---|
| IQ-9075 EVK | 36 GB | Named 7B/13B throughput + LLM/RAG/ASR application demo | Strong SoC-level evidence | **Good:** QAIRT + GenieX preview + llama.cpp/GGUF + IMSDK 2.0 deployment stack | High-priority edge candidate |
| IQ-8275 EVK | 12 GB EVK / 32 GB platform | Manufacturer 13B / 9 tok/s claim | Platform designed for low-power edge use | **Good:** shared Dragonwing GenAI stack + IMSDK 2.0 | Medium/high edge candidate |
| VENTUNO Q | 16 GB | Inherits IQ-8275 platform capability; board-specific results needed | Board-level data needed | Promising Linux/ROS/Arduino + Dragonwing GenAI + IMSDK 2.0 | Watch / SBC candidate |

The next useful evidence is **wall-power + decode testing with named quantized models**, because that would allow direct tokens/watt comparison against Hailo-10H, RK3588 NPU paths, Jetson, Raspberry Pi CPU, and low-power x86 APUs.
