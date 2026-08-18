# Qualcomm Dragonwing Edge AI Hardware

Last updated: **2026-08-18**

This page tracks Qualcomm Dragonwing embedded/industrial AI platforms that have enough memory, Linux support, and public LLM evidence to matter to the local/distributed inference catalog.

## Why this family matters

Qualcomm's IQ8/IQ9 platforms are not high-capacity workstation replacements. Their value is in **low SoC power, integrated NPU acceleration, industrial longevity, Linux support, and unusually explicit manufacturer LLM throughput claims**.

TOPS figures here are dense INT8 NPU figures and must not be compared directly with NVIDIA FP4/FP8, AMD GPU TFLOPS, or Apple GPU bandwidth-based results.

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

### Why it is interesting

A 36 GB industrial platform running 7B–13B-class models at a SoC envelope below 20 W is a materially different operating point from conventional GPUs. It is potentially useful for always-on agents, robotics, industrial inference, remote/off-grid nodes, and distributed helper roles.

### Pricing

No stable defensible public price was captured in this maintenance pass. Qualcomm exposes a **Buy now** path for the EVK, but the catalog should not invent a numeric price when the public page does not present one consistently.

### Vendor / technical documentation

- https://www.qualcomm.com/developer/hardware/qualcomm-iq-9075-evaluation-kit-evk
- https://www.qualcomm.com/internet-of-things/products/iq9-series/iq-9075
- https://docs.qualcomm.com/doc/87-97354-1/87-97354-1_REV_C_Qualcomm_Dragonwing_IQ-9075_Module_Product_Brief.pdf
- https://docs.qualcomm.com/doc/87-83840-1/87-83840-1_REV_A_Qualcomm_IQ9_Series_Product_Brief.pdf

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

The platform is more interesting when packaged with larger memory configurations.

### Vendor / technical documentation

- https://www.qualcomm.com/developer/hardware/qualcomm-iq-8275-evaluation-kit-evk
- https://www.qualcomm.com/internet-of-things/products/iq8-series/iq-8275

---

## Arduino VENTUNO Q

**Category:** SBC / robotics edge-AI board  
**Compute:** Dragonwing IQ-8275 + STM32H5 real-time MCU  
**NPU:** up to 40 dense INT8 TOPS  
**RAM:** 16 GB  
**Storage:** 64 GB eMMC plus M.2 NVMe Gen4 expansion  
**Networking:** 2.5GbE, Wi-Fi 6, Bluetooth 5.3  
**Software:** Linux, ROS 2, Qualcomm AI ecosystem, Arduino ecosystem

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

## Current assessment

| Platform | Capacity | Public LLM evidence | Power evidence | Software maturity | Catalog role |
|---|---:|---|---|---|---|
| IQ-9075 EVK | 36 GB | Strong manufacturer evidence: 7B/13B named results | Strong SoC-level evidence | Good industrial Linux stack | High-priority edge candidate |
| IQ-8275 EVK | 12 GB EVK / 32 GB platform | Manufacturer 13B / 9 tok/s claim | Platform designed for low-power edge use | Good industrial Linux stack | Medium/high edge candidate |
| VENTUNO Q | 16 GB | Inherits IQ-8275 platform capability; board-specific results needed | Board-level data needed | Promising Linux/ROS/Arduino stack | Watch / SBC candidate |

The next useful evidence is **wall-power + decode testing with named quantized models**, because that would allow direct tokens/watt comparison against Hailo-10H, RK3588 NPU paths, Jetson, Raspberry Pi CPU, and low-power x86 APUs.
