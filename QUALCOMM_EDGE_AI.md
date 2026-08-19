# Qualcomm Dragonwing Edge AI Hardware

Last updated: **2026-08-19**

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
- **Qualcomm Intelligent Multimedia SDK** for camera, media and GStreamer-oriented edge applications.

This is a meaningful software-maturity improvement for local/edge LLM use because it provides both a highly optimized NPU path and a familiar llama.cpp/GGUF compatibility path. GenieX is still a **developer preview**, so production maturity should not be overstated.

Qualcomm also published a real IQ-9075 application showing **Llama 3.2 Instruct 3B + BAAI BGE-large embeddings + Whisper-small ASR** running on-device for LLM+RAG+speech workloads, distributed across the IQ-9075's two Hexagon HTP cores. Qualcomm did not publish a normalized tok/s or wall-power number for this combined workload, so this evidence improves the software/deployment score rather than the performance score.

Official references:

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

The addition of QAIRT, GenieX and llama.cpp/GGUF deployment paths materially reduces the previous software-risk penalty, although independent benchmark coverage is still weak.

### Pricing

No stable defensible public price was captured in this maintenance pass. Qualcomm exposes a **Buy now** path for the EVK, but the catalog should not invent a numeric price when the public page does not present one consistently.

### Vendor / technical documentation

- https://www.qualcomm.com/developer/hardware/qualcomm-iq-9075-evaluation-kit-evk
- https://www.qualcomm.com/internet-of-things/products/iq9-series/iq-9075
- https://docs.qualcomm.com/doc/87-97354-1/87-97354-1_REV_C_Qualcomm_Dragonwing_IQ-9075_Module_Product_Brief.pdf
- https://docs.qualcomm.com/doc/87-83840-1/87-83840-1_REV_A_Qualcomm_IQ9_Series_Product_Brief.pdf
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

The platform is more interesting when packaged with larger memory configurations. Qualcomm's August 2026 Dragonwing guidance explicitly covers IQ8 as part of the same QAIRT + AI Hub + GenieX + llama.cpp software journey, though the strongest multi-workload GenAI demo located in this pass is on IQ-9075.

### Vendor / technical documentation

- https://www.qualcomm.com/developer/hardware/qualcomm-iq-8275-evaluation-kit-evk
- https://www.qualcomm.com/internet-of-things/products/iq8-series/iq-8275
- https://www.qualcomm.com/developer/blog/2026/08/from-models-to-ai-native-applications--building-intelligent-edge

---

## Arduino VENTUNO Q

**Category:** SBC / robotics edge-AI board  
**Compute:** Dragonwing IQ-8275 + STM32H5 real-time MCU  
**NPU:** up to 40 dense INT8 TOPS  
**RAM:** 16 GB  
**Storage:** 64 GB eMMC plus M.2 NVMe Gen4 expansion  
**Networking:** 2.5GbE, Wi-Fi 6, Bluetooth 5.3  
**Software:** Linux, ROS 2, QAIRT, AI Hub, GenieX developer preview, llama.cpp/GGUF path, Arduino ecosystem

VENTUNO Q is notable because it packages IQ-8275 in a practical SBC-like platform with more memory than the 12 GB Qualcomm EVK and useful storage/networking expansion.

### Promotion criteria

Do not give VENTUNO Q a normal buy ranking until the following are confirmed:

- stable public retail price;
- broad orderable availability;
- exact board-level wall power under LLM load;
- reproducible model/quantization/context benchmark data;
- supported-model conversion/deployment workflow;
- measured performance relative to Raspberry Pi + Hailo, RK3588, Jetson and low-power x86 nodes.

### Vendor / platform documentation

- https://www.qualcomm.com/developer/iot
- https://www.qualcomm.com/developer/hardware
- https://www.qualcomm.com/internet-of-things/products/iq8-series/iq-8275
- https://www.qualcomm.com/developer/blog/2026/08/from-models-to-ai-native-applications--building-intelligent-edge

## Current assessment

| Platform | Capacity | Public LLM evidence | Power evidence | Software maturity | Catalog role |
|---|---:|---|---|---|---|
| IQ-9075 EVK | 36 GB | Named 7B/13B throughput + LLM/RAG/ASR application demo | Strong SoC-level evidence | **Good and improving:** QAIRT + GenieX preview + llama.cpp/GGUF | High-priority edge candidate |
| IQ-8275 EVK | 12 GB EVK / 32 GB platform | Manufacturer 13B / 9 tok/s claim | Platform designed for low-power edge use | **Good and improving:** shared Dragonwing GenAI stack | Medium/high edge candidate |
| VENTUNO Q | 16 GB | Inherits IQ-8275 platform capability; board-specific results needed | Board-level data needed | Promising Linux/ROS/Arduino + Dragonwing GenAI stack | Watch / SBC candidate |

The next useful evidence is **wall-power + decode testing with named quantized models**, because that would allow direct tokens/watt comparison against Hailo-10H, RK3588 NPU paths, Jetson, Raspberry Pi CPU, and low-power x86 APUs.
