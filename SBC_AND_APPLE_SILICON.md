# SBC and Apple Silicon LLM Hardware

Last updated: **2026-08-17**

This section covers **single-board computers (SBCs), compute modules, compact ARM systems, SBC-attached accelerators, and Apple Silicon desktops** that may be useful for local or distributed LLM inference.

The same rules used elsewhere in the project apply here: memory capacity and bandwidth matter more than headline TOPS alone; prices are dated point-in-time observations; and software/runtime maturity is part of the score.

## Why these platforms matter

SBCs are usually not competitive with large GPUs for single-node model throughput, but they can be excellent low-power nodes for routing, embeddings, small models, speculative helpers, API gateways, preprocessing, storage/control, monitoring, and always-on inference.

Apple Silicon is a different class. Large unified-memory configurations and high memory bandwidth make Mac mini and Mac Studio systems genuinely capable LLM hosts through Metal-enabled runtimes such as **llama.cpp** and **MLX**.

---

## Raspberry Pi family

### Raspberry Pi 5 16GB

**Category:** SBC / low-power ARM node  
**CPU:** 4-core Arm Cortex-A76 at 2.4 GHz  
**GPU:** VideoCore VII  
**Memory:** 16 GB LPDDR4X  
**Networking:** 1GbE, Wi-Fi, Bluetooth  
**Expansion:** PCIe 2.0 x1 exposed via FFC, USB 3, microSD  
**Software:** Raspberry Pi OS, Debian/Ubuntu, llama.cpp CPU builds, Vulkan experimentation  
**LLM role:** small models, embeddings, routing, preprocessing, control node

**Pricing history:**

- Launch: **US$120** on 2025-01-09.
- Current manufacturer display checked 2026-08-15: **US$305** for the 16GB model.

The increase is material and should be treated as a dated market observation, not as a permanent hardware specification. Raspberry Pi has explicitly attributed 2026 increases to sharply higher LPDDR memory costs.

**Vendor / purchase:**

- https://www.raspberrypi.com/products/raspberry-pi-5/

**Technical documentation:**

- https://www.raspberrypi.com/documentation/computers/raspberry-pi.html
- https://www.raspberrypi.com/documentation/computers/processors.html
- https://www.raspberrypi.com/documentation/computers/configuration.html

### Raspberry Pi AI HAT+ 2 / Hailo-10H

**Category:** SBC-attached generative-AI accelerator  
**Host:** Raspberry Pi 5  
**Accelerator:** Hailo-10H  
**Compute:** **40 TOPS INT4 / 20 TOPS INT8**  
**Dedicated accelerator memory:** **8 GB LPDDR4X**  
**Model capacity:** Raspberry Pi documents LLM/VLM support up to roughly **6B parameters**  
**Typical accelerator-module power:** **2.5 W** for Hailo's Hailo-10H M.2 module; whole Pi + HAT wall power is higher  
**Software:** HailoRT, hailo-ollama, Hailo Model Zoo, Raspberry Pi OS integration  
**Current official price checked 2026-08-17:** **US$200**  
**Status:** available

**Why it matters:** this is one of the clearest genuinely low-power generative-AI accelerators in the SBC category because it has its own memory rather than relying entirely on host RAM. It can free the Pi CPU and RAM for orchestration while the Hailo device handles supported LLM/VLM work.

**Important benchmark nuance:** TOPS does not translate directly into decoder speed. Raspberry Pi/Hailo publish a Qwen2.5 1.5B 4-bit **96-token time-to-first-token result of about 320 ms on Hailo-10H versus 2039 ms on Pi 5 CPU**, which is a strong prefill/latency result. Independent CNX Software testing, however, measured lower token-generation rates on Hailo-10H than on the Pi 5 CPU for several 1.5B-3B models. The current evidence therefore suggests the HAT is strongest for **TTFT/prefill, VLM pipelines, CPU offload, host-memory relief, and always-on edge-agent workloads**, not universally faster autoregressive decode.

**Vendor / purchase:**

- https://www.raspberrypi.com/products/ai-hat-plus-2/
- https://hailo.ai/products/ai-accelerators/hailo-10h-m-2-ai-acceleration-module/

**Technical documentation:**

- https://www.raspberrypi.com/documentation/accessories/ai-hat-plus.html
- https://www.raspberrypi.com/documentation/computers/ai.html
- https://pip.raspberrypi.com/categories/1319-raspberry-pi-ai-hat-2
- https://hailo.ai/products/ai-accelerators/hailo-10h-ai-accelerator/

### Raspberry Pi Compute Module 5

**Category:** embedded compute module / cluster building block  
**CPU/GPU:** Pi 5-class BCM2712 + VideoCore VII  
**Memory:** up to 16 GB  
**Expansion:** PCIe 2.0 x1, USB/MIPI/GPIO through carrier  
**Software:** Linux / Raspberry Pi OS / llama.cpp CPU path

**Pricing history:**

- Launch family pricing: **from US$45**.
- Current manufacturer family pricing checked 2026-08-15: **from US$67.50**.

CM5 is more interesting than the normal Pi 5 for dense embedded clusters because a custom carrier can integrate power, storage and networking efficiently.

**Vendor / purchase:**

- https://www.raspberrypi.com/products/compute-module-5/

**Technical documentation:**

- https://www.raspberrypi.com/documentation/computers/compute-module.html
- https://pip.raspberrypi.com/categories/1098-cm5

### Raspberry Pi 500 / 500+

Pi 5-class all-in-one systems are useful as convenient low-power development/test machines, but generally score worse than bare Pi 5 or CM5 boards for dense inference clusters.

---

## RK3588-class SBCs

### Orange Pi 5 Plus

**SoC:** Rockchip RK3588  
**CPU:** 4x Cortex-A76 + 4x Cortex-A55  
**GPU:** Mali-G610  
**NPU:** up to 6 vendor TOPS  
**Memory:** up to 32 GB LPDDR5/LPDDR5X on newer revisions  
**Storage:** microSD, eMMC, M.2 2280 NVMe PCIe 3.0 x4  
**Networking:** dual 2.5GbE  
**Software:** Linux/Android, RKNN, Vulkan/OpenCL

The combination of up to 32 GB memory, dual 2.5GbE and an integrated NPU makes this more interesting than ordinary SBCs for experimental distributed inference, although software maturity remains below mainstream x86/Apple/NVIDIA platforms.

**Vendor / specification:**

- https://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-5-plus-v1.5.1.html
- https://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-5-plus.html

### Radxa ROCK 5B / ROCK 5B+

**SoC:** Rockchip RK3588  
**CPU:** 4x Cortex-A76 + 4x Cortex-A55  
**GPU:** Mali-G610MP4  
**NPU:** up to 6 vendor TOPS  
**Memory:** up to 32 GB LPDDR5 on ROCK 5B+  
**Software:** Linux, Vulkan, OpenCL, Rockchip NPU toolchain

**Vendor / documentation:**

- https://radxa.com/products/rock5/5b/
- https://docs.radxa.com/en/rock5/rock5b/getting-started/introduction
- https://dl.radxa.com/rock5/hw/datasheet/radxa_rock5b_product_brief_Revision_1.1_g171c751.pdf

---

## Apple Silicon

Apple systems should be scored primarily on **unified-memory capacity, memory bandwidth, GPU-core count, whole-system power, purchase price and Metal/MLX software support**. Neural Engine TOPS alone should not drive the LLM score.

### Current Apple Canada family pricing

Checked **2026-08-15**:

- **Mac mini from CA$1,099**.
- **Mac Studio from CA$3,499**.

These values replace older prices as the current observations while the original launch prices remain preserved in `data/sbc_apple.json` and `data/price-history.jsonl` where applicable.

Official store: https://www.apple.com/ca/shop/buy-mac

### Mac mini M4

**CPU/GPU:** 10-core CPU / 10-core GPU  
**Neural Engine:** 16-core  
**Memory bandwidth:** **120 GB/s**  
**Unified memory:** up to 24 GB in the tracked configuration family  
**Networking:** 1GbE; 10GbE configurable  
**Software:** Metal, MLX, llama.cpp, Ollama-compatible ecosystem

**Historical launch-from price:** CA$799.  
**Current family-from price:** CA$1,099 as of 2026-08-15.

### Mac mini M4 Pro

**CPU:** 12-core standard, up to 14-core  
**GPU:** 16-core standard, up to 20-core  
**Memory bandwidth:** **273 GB/s**  
**Unified memory:** 24 GB standard, up to **48 GB**  
**Networking:** 1GbE; optional 10GbE  
**I/O:** Thunderbolt 5

**Historical launch-from price:** CA$1,899.

Apple Canada currently confirms the M4 Pro configuration remains orderable, but the static page retrieved during this run did not expose a defensible exact current Canadian price. The catalog therefore leaves the current exact amount unknown instead of inferring from another region.

### Mac Studio M4 Max

**CPU:** 14-core standard, up to 16-core  
**GPU:** 32-core standard, up to 40-core  
**Memory bandwidth:** **410 GB/s standard**, up to **546 GB/s**  
**Unified memory:** 36 GB standard; up to **64 GB** in the tracked family  
**Networking:** 10GbE  
**I/O:** Thunderbolt 5

**Historical launch-from price:** CA$2,699.  
**Current price checked 2026-08-15:** **CA$3,499** for the Mac Studio family; Apple's base listed Mac Studio is the M4 Max 14-core CPU / 32-core GPU / 36GB / 512GB configuration.

### Mac Studio M3 Ultra

**CPU:** 28-core standard, up to 32-core  
**GPU:** 60-core standard, up to 80-core  
**Neural Engine:** 32-core  
**Memory bandwidth:** **819 GB/s**  
**Unified memory:** 96 GB standard; up to **512 GB**  
**Networking:** 10GbE  
**I/O:** Thunderbolt 5

**Historical launch-from price:** CA$5,499.

Apple Canada confirms the M3 Ultra 28-core CPU / 60-core GPU / 96GB / 1TB configuration remains orderable. The current exact Canadian amount was not exposed in the static page retrieved during this run, so it remains intentionally unspecified rather than guessed.

The M3 Ultra remains exceptional for model capacity: up to 512 GB coherent unified memory can fit quantized models that are impossible on most single GPUs or compact PCs. Real throughput still depends heavily on quantization, context length, runtime and model architecture.

**Vendor / purchase:**

- https://www.apple.com/ca/mac-mini/
- https://www.apple.com/ca/shop/buy-mac/mac-mini
- https://www.apple.com/ca/mac-studio/
- https://www.apple.com/ca/shop/buy-mac/mac-studio

**Technical documentation:**

- https://www.apple.com/ca/mac-mini/specs/
- https://www.apple.com/ca/mac-studio/specs/
- https://developer.apple.com/metal/
- https://ml-explore.github.io/mlx/build/html/index.html

---

## Suggested roles

| Platform | Model-capacity role | Distributed role | Software maturity |
|---|---|---|---|
| Raspberry Pi 5 16GB | small | helper/control node | high Linux maturity; limited acceleration |
| Raspberry Pi AI HAT+ 2 | small (~6B max vendor guidance) | low-power edge inference / prefill / VLM helper | moderate/high for supported Hailo models; constrained model compatibility |
| Compute Module 5 | small | embedded/control cluster | high Linux maturity |
| Orange Pi 5 Plus 32GB | small/medium experimental | good due to dual 2.5GbE | moderate/experimental |
| ROCK 5B+ 32GB | small/medium experimental | good | moderate/experimental |
| Mac mini M4 | small/medium | moderate; optional 10GbE | excellent Metal/MLX |
| Mac mini M4 Pro | medium | good with 10GbE | excellent Metal/MLX |
| Mac Studio M4 Max | medium/large | good; 10GbE | excellent Metal/MLX |
| Mac Studio M3 Ultra | very large | good; 10GbE | excellent Metal/MLX |

## Next SBC families to research

Continue expanding with NVIDIA Jetson Orin Nano/NX, Khadas, Banana Pi, NanoPi, BeagleBone/BeagleV, Milk-V/RISC-V boards, Qualcomm RB-class boards, Intel N-series SBCs, and other RK3588/RK3576 designs when they have enough memory, usable accelerator software, strong networking, or compelling pricing to matter for LLM work.
