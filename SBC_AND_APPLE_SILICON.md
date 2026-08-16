# SBC and Apple Silicon LLM Hardware

Last updated: **2026-08-15**

This section expands the catalog to cover **single-board computers (SBCs), compute modules, compact ARM systems, and Apple Silicon desktops** that may be useful for local or distributed LLM inference.

The same rules used elsewhere in the project apply here: memory capacity and bandwidth matter more than headline TOPS alone; prices are point-in-time observations; and software maturity is part of the score.

## Why these platforms matter

SBCs are usually not competitive with large GPUs for single-node model throughput, but they can be excellent for low-power routing, embeddings, small models, speculative-decoding helpers, API gateways, distributed preprocessing, storage/control nodes, and always-on inference.

Apple Silicon is a different class: large unified-memory configurations and high memory bandwidth make Mac mini and Mac Studio systems genuinely capable LLM hosts, particularly through Metal-enabled runtimes such as llama.cpp and MLX.

---

## Raspberry Pi family

### Raspberry Pi 5

**Category:** SBC / low-power ARM node  
**CPU:** 4-core Arm Cortex-A76 at 2.4 GHz  
**GPU:** VideoCore VII  
**GPU APIs:** OpenGL ES 3.1, Vulkan 1.2 class support  
**RAM:** current family includes 1 GB through 16 GB variants  
**Networking:** 1GbE, Wi-Fi 5, Bluetooth 5  
**Expansion:** PCIe 2.0 x1 exposed via FFC, USB 3, microSD  
**Software:** Raspberry Pi OS, Debian/Ubuntu ecosystem, llama.cpp CPU builds, Vulkan experimentation  
**LLM role:** small quantized models, embeddings, routing, preprocessing, orchestration, distributed helper node

### Pricing

Raspberry Pi pricing has changed materially during 2026 because of memory-cost increases. The official product family currently starts at **US$45-class pricing for the lowest-memory model**, while high-memory variants have risen sharply. The official Raspberry Pi product page has displayed a substantially higher current price for the 16 GB model than its original US$120 launch price, so price history should be stored rather than replacing older observations.

**Vendor / purchase:**

- https://www.raspberrypi.com/products/raspberry-pi-5/

**Technical documentation:**

- https://www.raspberrypi.com/documentation/computers/raspberry-pi.html
- https://www.raspberrypi.com/documentation/computers/processors.html
- https://www.raspberrypi.com/documentation/computers/configuration.html

**Research note:** the 16 GB model is the most interesting Pi 5 for local LLM experimentation because memory, not raw CPU speed, is normally the first hard limit.

---

### Raspberry Pi Compute Module 5

**Category:** embedded compute module / cluster building block  
**CPU:** 4-core Arm Cortex-A76 at 2.4 GHz  
**GPU:** VideoCore VII  
**RAM:** 2/4/8 GB originally, with 16 GB variants added to the family  
**Storage:** optional eMMC depending SKU  
**Networking:** carrier-dependent; Gigabit Ethernet available  
**Expansion:** PCIe 2.0 x1 plus USB/MIPI/GPIO through carrier board  
**Software:** Raspberry Pi OS / Linux / llama.cpp CPU path  
**Original launch price:** from **US$45**; current prices are higher for memory-heavy SKUs after 2026 memory-price increases

**Why it matters:** CM5 is more interesting than the normal Pi 5 for dense multi-node designs because custom carrier boards can integrate power delivery, storage and networking more efficiently.

**Vendor / purchase:**

- https://www.raspberrypi.com/products/compute-module-5/

**Technical documentation:**

- https://www.raspberrypi.com/documentation/computers/compute-module.html
- https://pip.raspberrypi.com/categories/1098-cm5

---

### Raspberry Pi 500 / 500+

These are Pi 5-class all-in-one systems rather than ideal cluster modules. They are worth recording because the 500+ includes **16 GB RAM and NVMe storage**, but cost-per-node is generally worse than a bare Pi 5/CM5 for inference clusters.

**Best use:** convenient low-power desktop inference/test system rather than dense cluster node.

---

## RK3588-class SBCs

### Orange Pi 5 Plus

**Category:** ARM SBC with integrated NPU  
**SoC:** Rockchip RK3588  
**CPU:** 4× Cortex-A76 + 4× Cortex-A55, up to 2.4 GHz  
**GPU:** Mali-G610  
**NPU:** up to 6 TOPS; INT4/INT8/INT16/FP16 support  
**RAM:** versions up to **32 GB LPDDR5/LPDDR5X** on newer board revisions  
**Storage:** microSD, optional eMMC, M.2 2280 NVMe PCIe 3.0 x4  
**Networking:** dual 2.5GbE on the 5 Plus family  
**Software:** Linux/Android, Rockchip RKNN ecosystem, Vulkan/OpenCL paths

**Why it matters:** compared with Raspberry Pi 5, the high-memory variants, 6-TOPS NPU and dual 2.5GbE make it a more interesting experimental inference/cluster node, although software support is less polished.

**Vendor / purchase and specification:**

- https://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-5-plus.html
- https://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-5-plus-v1.5.1.html

**Research priority:** medium/high for very-low-power distributed inference.

---

### Radxa ROCK 5B / ROCK 5B+

**Category:** ARM SBC with integrated NPU  
**SoC:** Rockchip RK3588  
**CPU:** 4× Cortex-A76 + 4× Cortex-A55  
**GPU:** Mali-G610MP4  
**NPU:** up to 6 TOPS  
**RAM:** ROCK 5B up to 16/24 GB depending revision; ROCK 5B+ up to **32 GB LPDDR5**  
**Storage:** microSD/eMMC/NVMe depending board/revision  
**Software:** Debian/Ubuntu-class Linux, Vulkan/OpenCL, Rockchip NPU toolchain

**Technical documentation:**

- https://docs.radxa.com/en/rock5/rock5b/getting-started/introduction
- https://dl.radxa.com/rock5/hw/datasheet/radxa_rock5b_product_brief_Revision_1.1_g171c751.pdf

**Research note:** the 32 GB ROCK 5B+ is more interesting for language models than lower-memory RK3588 boards; software/runtime maturity remains the major caveat.

---

## Apple Silicon

Apple systems should be scored primarily on **unified-memory capacity, memory bandwidth, GPU-core count, wall power, purchase price and Metal/MLX software support**. Neural Engine TOPS alone should not drive the LLM score.

### Mac mini M4

**Category:** compact unified-memory desktop  
**CPU:** 10-core  
**GPU:** 10-core  
**Neural Engine:** 16-core  
**Memory bandwidth:** **120 GB/s**  
**Unified memory:** 16 GB standard; selected configurations support 24 GB  
**Networking:** Gigabit Ethernet, configurable 10GbE  
**Software:** macOS, Metal, MLX, llama.cpp, Ollama-compatible ecosystem  
**Canadian launch price:** **CA$799**

**Best role:** efficient small/medium-model node, development machine, embeddings, routing and light local inference.

**Vendor / purchase:**

- https://www.apple.com/ca/mac-mini/
- https://www.apple.com/ca/shop/buy-mac/mac-mini

**Technical documentation:**

- https://www.apple.com/ca/mac-mini/specs/
- https://developer.apple.com/metal/
- https://ml-explore.github.io/mlx/build/html/index.html

---

### Mac mini M4 Pro

**Category:** compact high-bandwidth unified-memory desktop  
**CPU:** 12-core standard, configurable 14-core  
**GPU:** 16-core standard, configurable 20-core  
**Neural Engine:** 16-core  
**Memory bandwidth:** **273 GB/s**  
**Unified memory:** 24 GB standard; configurable to **48 GB** on current Canadian specification  
**Networking:** Gigabit Ethernet, optional 10GbE  
**I/O:** Thunderbolt 5  
**Canadian launch price:** **CA$1,899**

**Why it matters:** 273 GB/s puts the M4 Pro Mac mini in the same memory-bandwidth class as GB10 and high-end unified-memory APUs, although its maximum RAM is much lower.

**Tier:** strong compact node for ≤~30B-class quantized workloads, depending context/KV-cache requirements.

---

### Mac Studio M4 Max

**Category:** high-performance unified-memory workstation  
**CPU:** 14-core standard; up to 16-core  
**GPU:** 32-core standard; up to 40-core  
**Neural Engine:** 16-core  
**Memory bandwidth:** **410 GB/s standard**, up to **546 GB/s** with the higher M4 Max configuration  
**Unified memory:** 36 GB standard; configurable to **64 GB** with the high-end M4 Max  
**Networking:** 10GbE standard  
**I/O:** Thunderbolt 5  
**Canadian starting price:** **CA$2,699**

**Why it matters:** high memory bandwidth plus Metal/MLX makes it a strong efficient single-node LLM system, particularly when 64 GB is enough for the target model.

---

### Mac Studio M3 Ultra

**Category:** ultra-high-capacity unified-memory workstation  
**CPU:** 28-core standard; up to 32-core  
**GPU:** 60-core standard; up to 80-core  
**Neural Engine:** 32-core  
**Memory bandwidth:** **819 GB/s**  
**Unified memory:** starts at 96 GB and can be configured up to **512 GB**  
**Networking:** 10GbE standard  
**I/O:** Thunderbolt 5  
**Canadian M3 Ultra starting configuration:** Apple lists the M3 Ultra option from approximately **CA$5,499**

**Why it matters for LLMs:** this is one of the most unusual consumer-accessible memory systems in the catalog. Up to 512 GB of coherent unified memory enables quantized models that cannot fit on most single GPUs or compact PCs. Apple states that suitable configurations can hold LLMs above 600B parameters in memory; actual usable speed depends heavily on quantization, runtime and model architecture.

**Tier:** S for model capacity, A/S depending value and workload.

**Vendor / purchase:**

- https://www.apple.com/ca/mac-studio/
- https://www.apple.com/ca/shop/buy-mac/mac-studio

**Technical documentation:**

- https://www.apple.com/ca/mac-studio/specs/
- https://developer.apple.com/metal/
- https://ml-explore.github.io/mlx/build/html/index.html

---

## Suggested scoring roles

| Platform | Model-capacity role | Power/value role | Distributed role | Software maturity |
|---|---|---|---|---|
| Raspberry Pi 5 16 GB | small | excellent idle/low-load potential | helper/control node | high for Linux CPU; moderate for accelerated LLMs |
| Compute Module 5 | small | excellent for embedded clusters | very good with custom carrier | high Linux maturity |
| Orange Pi 5 Plus 32 GB | small/medium experimental | potentially strong | good due to dual 2.5GbE | moderate/experimental |
| ROCK 5B+ 32 GB | small/medium experimental | potentially strong | good | moderate/experimental |
| Mac mini M4 | small/medium | strong | moderate; 10GbE optional | excellent Metal/MLX |
| Mac mini M4 Pro | medium | strong | good with 10GbE | excellent Metal/MLX |
| Mac Studio M4 Max 64 GB | medium/large | strong performance-per-watt potential | good, 10GbE | excellent Metal/MLX |
| Mac Studio M3 Ultra 96–512 GB | very large | expensive but exceptional capacity | good, 10GbE | excellent Metal/MLX |

## Additional SBC families to add next

The catalog should continue with NVIDIA Jetson Orin Nano/NX, Khadas, Banana Pi, NanoPi, BeagleBone/BeagleV, Milk-V/RISC-V boards, Qualcomm RB-class boards, Intel N-series SBCs, and other RK3588/RK3576 designs when they have enough memory, usable accelerator software, or compelling pricing to matter for LLM work.
