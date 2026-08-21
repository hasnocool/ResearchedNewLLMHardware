# RISC-V and robotics local-AI nodes — 2026-08-21

This note tracks three systems that are easy to miss if local-AI hardware is viewed only through CUDA, ROCm, Apple unified memory, or conventional x86 mini PCs. They are not interchangeable: one is a RISC-V Pico-ITX development platform, one is a shipping RISC-V LLM appliance, and one is a Qualcomm/Arduino robotics SBC that is still coming soon.

| Hardware | Memory | AI compute | Networking | Power evidence | Availability / price | LLM evidence |
|---|---:|---:|---|---|---|---|
| Sipeed K3 Pico-ITX 32GB | 32GB LPDDR5-6400, 51GB/s | 60 INT4 TOPS vendor figure | 10GbE + 1GbE | No defensible whole-board measurement stored | Channel-dependent; recent 32GB observation US$639 | Vendor claims 30B models at >10 tok/s; insufficient runtime/quantization/context detail for normalized comparison |
| PINE64 ALPHA-One | 32GB LPDDR5-6400 | 19.95 INT8 TOPS NPU | dual 1GbE + Wi-Fi 6 | PINE64 claims below 30W system consumption | In stock, US$329.99 on 2026-08-21 | Ships with Qwen2 7B / DeepSeek-R1-Distill-Qwen 7B support; store reports 4.x tok/s for 7B use |
| Arduino VENTUNO Q | 16GB LPDDR5 | 40 dense TOPS Hexagon NPU | 2.5GbE + Wi-Fi 6 | Multiple direct-DC inputs; no workload measurement stored | Coming soon; no stable retail price yet | Arduino explicitly supports local LLM/VLM/ASR/TTS deployment through Qualcomm AI Hub, Edge Impulse and App Lab |

## Sipeed K3 Pico-ITX

The K3 is interesting because the platform combines 32GB of unified LPDDR5, 10GbE and dedicated AI hardware in a compact RISC-V system. Sipeed advertises 60 TOPS at INT4 and supports BF16, FP16 and INT4. It also advertises 30B-class local LLM inference at more than 10 tokens/s.

That throughput figure is retained as **vendor evidence only**. The public product page does not expose enough model, quantization, runtime, context, batching, or power metadata to make it comparable with normalized llama.cpp, vLLM, MLX, CUDA or ROCm measurements. The 32GB capacity itself is useful: many 20B-30B-class 4-bit models are capacity-plausible, but software maturity and operator coverage remain gating factors.

The board has PCIe Gen3 x4 NVMe support, USB 3.0, dual USB-C with USB-PD/DisplayPort Alt Mode, Bianbu OS, Docker and RISC-V virtualization support. Sipeed also advertises Ubuntu 26.04 and ROS support. A recent third-party channel observation put the 32GB Pico-ITX around US$639, but the manufacturer product page currently does not provide a stable public storefront price, so that figure is deliberately stored as dated market evidence rather than MSRP.

## PINE64 ALPHA-One

ALPHA-One is more concrete for LLM research because PINE64 sells it as a finished local-AI appliance rather than only publishing accelerator TOPS. It uses the StarPro64 / ESWIN EIC7700X platform with 32GB LPDDR5-6400, an approximately 20-TOPS INT8 NPU, passive heat-pipe cooling and a preinstalled 64GB eMMC image containing supported 7B models.

PINE64 currently lists the US version at **US$329.99 and in stock**. The store page reports **4.x tok/s for 7B LLM use** and **below-30W system consumption**. Those are manufacturer claims, but they are still more operationally useful than a TOPS figure alone. PINE64's documentation separately records roughly 3.5 tok/s for its Docker path and presents higher native-mode rates and 15B support as possible future optimization, so those future values are not stored as verified current performance.

For off-grid or always-on experiments this is unusually interesting: passive cooling, a 12V 3A supply, 32GB memory and a real shipped LLM image make it a practical test node. The tradeoff is software portability: its NPU path is ESWIN-specific, and arbitrary GGUF/llama.cpp acceleration should not be assumed.

## Arduino VENTUNO Q

VENTUNO Q targets a different workload. It combines a Qualcomm Dragonwing IQ-8275 with an STM32H5F5 real-time MCU. Arduino specifies 16GB LPDDR5, a 40-dense-TOPS Hexagon NPU, 2.5GbE, Wi-Fi 6, NVMe Gen4 expansion, three camera interfaces, CAN-FD and broad robotics I/O.

The strongest reason to track it is not the TOPS number. Arduino explicitly positions VENTUNO Q for local LLMs, VLMs, speech and multimodal workloads through Qualcomm AI Hub, Edge Impulse and Arduino App Lab while retaining deterministic actuation through the separate MCU. It also supports standard Ubuntu/Debian development, Docker and ROS 2.

Arduino currently marks the board **coming soon** and has not exposed a stable retail price. No token-rate benchmark or whole-board workload power measurement is stored yet. Its direct 5V USB-C and 7-24V / 12-24V DC input options make it promising for field and battery-powered robotics, but performance-per-watt should wait for measurements rather than being inferred from NPU TOPS.

## Research priorities

1. Reproduce the K3 30B claim with named model, quantization, runtime, context, prompt/decode split and wall power.
2. Independently measure ALPHA-One idle and sustained generation power, and reproduce its 7B token rate.
3. Capture VENTUNO Q launch price, idle/load power and a named local LLM/VLM benchmark when retail hardware ships.
4. Determine whether K3 and ESWIN NPU paths gain portable GGUF/llama.cpp integrations or remain model-conversion ecosystems.

Sources and provenance are normalized in `data/riscv_robotics_llm_2026.json`; dated prices are kept separately in `data/price-observations-2026-08-21-riscv-robotics.jsonl`.
