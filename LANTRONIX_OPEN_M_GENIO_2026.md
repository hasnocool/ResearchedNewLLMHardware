# Lantronix Open-M Genio edge GenAI modules — 2026-08-26

Lantronix's new Open-M 720G and 520G SOMs are production-ready low-power edge-AI modules based on MediaTek Genio 720/520. They are relevant to this catalog because MediaTek now documents an NPU-backed Generative AI path on these SoCs, while Lantronix packages the silicon into a 43 x 44 x 2.95 mm LGA module with battery-oriented power management.

## Comparison

| Platform | Memory | AI accelerator | Vendor module power | CPU | Local-LLM practicality |
|---|---:|---:|---:|---|---|
| Open-M 720G | 8 GB LPDDR5X | up to 10 TOPS | <4 W | 2x Cortex-A78 2.6 GHz + 6x Cortex-A55 2.0 GHz | Best member of the pair for compact supported GenAI; safest target is 1B-3B class, with selected aggressively quantized 7B experiments depending on model/runtime/context overhead. |
| Open-M 520G | 4 GB LPDDR5X | up to 10 TOPS | <4 W | 2x Cortex-A78 2.2 GHz + 6x Cortex-A55 2.0 GHz | Strongly memory constrained; best suited to sub-3B models, embeddings, speech, vision and task-specific GenAI. |

The `<4 W` figure is Lantronix's SOM-family power statement, **not** complete system wall power. Carrier board, radios, storage, cameras and other peripherals must be added for a deployable system.

## Why the 720G is interesting

The 720G combines 8 GB LPDDR5X, an 8th-generation MediaTek NPU rated at up to 10 TOPS, a Mali-G57 MC2 GPU, UFS storage and a nominal 3.7 V module input. That makes it much closer to a battery-native GenAI building block than a conventional mini PC or PCIe accelerator.

Lantronix's development kit can also take 12 V DC or an external battery, giving the platform a straightforward path into robotics, drones, autonomous sensors and other off-grid deployments.

The main limitation is memory. Eight gigabytes is enough to make small language-model deployment plausible, but it does not make this a general 7B/14B/30B local-LLM box. Model weights, KV cache, activations, operating system and application memory all compete for the same small pool.

## Runtime reality

MediaTek's current IoT AI Hub documents the following for Genio 520/720 under Android and Yocto:

- TensorFlow Lite / LiteRT analytical AI on CPU + GPU + NPU;
- offline analytical inference on the NPU;
- **TensorFlow Lite Generative AI on the NPU**;
- ONNX Runtime analytical AI on CPU + NPU.

This distinction matters. The platform should **not** be represented as an arbitrary GGUF/llama.cpp accelerator merely because it has a 10-TOPS NPU.

MediaTek's supported Generative AI path is built around the NeuroPilot GAI Toolkit/TFLite stack. The full NeuroPilot 8 bundle is access-controlled, although public NPU acceleration is available through supported LiteRT delegate paths. Operator coverage, precision support and model conversion requirements must therefore be checked for every target model.

## Quantization and model fit

No universal INT4, GGUF, GPTQ or AWQ compatibility is claimed in the structured records. A model may fit in 8 GB yet still fail to compile or accelerate if its operators or precision path are not supported by the MediaTek toolchain.

For planning purposes:

- **1B-3B models:** the most realistic LLM class for Open-M 720G;
- **selected 7B models:** possible capacity experiments only with aggressive low-bit quantization, limited context and sufficient runtime support;
- **Open-M 520G / 4 GB:** primarily very small models and task-specific pipelines;
- **larger models:** generally better served by a higher-memory platform or a heterogeneous host/accelerator design.

These are capacity/practicality guidelines, not measured performance claims.

## Interfaces and integration

The SOM family exposes PCIe Gen2 x1, Gigabit Ethernet, USB 3.2/2.0, MIPI CSI, display interfaces, SD/SDIO and common embedded buses. Lantronix also advertises Wi-Fi/Bluetooth options and onboard power-management/battery-charging support.

The Open-M 720G development kit (`LOM-720-EVK`) expands this into a 170 x 170 mm carrier with Ethernet, M.2 B/E key, USB, display and camera interfaces and a 12 V DC/external-battery input.

## Pricing and availability

Lantronix lists the SOMs as new/production-ready, with the following identifiers:

- `MT0720-1WN-DL` — Open-M 720G, 8 GB LPDDR5X + 64 GB UFS;
- `MT0520-1WN-BL` — Open-M 520G, 4 GB LPDDR5X + 64 GB UFS;
- `LOM-720-EVK` — Open-M 720G development kit.

All three are currently **Contact Us / quote-only**. No defensible public unit price was found on 2026-08-26, so the catalog does not invent an MSRP.

## Source quality

Primary specifications come from Lantronix's product page/product brief and MediaTek's Genio/IoT AI Hub documentation. Third-party reporting was used only as a discovery signal and is not required to support the normalized hardware facts.

### Primary references

- https://www.lantronix.com/products/open-m-720g-520g-som-system-on-module/
- https://www.lantronix.com/products/open-m-720g-som-development-kit/
- https://cdn.lantronix.com/wp-content/uploads/pdf/Open-M-520G-720G-PB.pdf
- https://genio.mediatek.com/genio-720
- https://genio.mediatek.com/doc/iot-aihub/ai_hub/related_resource.html
- https://genio.mediatek.com/doc/iot-aihub/ai_hub/supported_os/yocto.html
- https://genio.mediatek.com/doc/iot-aihub/ai_hub/software_architecture.html
