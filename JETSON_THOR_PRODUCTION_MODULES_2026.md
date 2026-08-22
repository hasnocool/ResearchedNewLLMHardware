# Jetson Thor Production Modules — 2026

This note separates NVIDIA's **Jetson T4000** and **Jetson T5000 production modules** from the already tracked Jetson AGX Thor Developer Kit. The module SKUs matter independently because buyers integrating production, robotics, battery-powered, or embedded systems must provide their own carrier, storage, cooling, and power subsystem.

## Comparison

| Platform | Unified memory | Memory bandwidth | Vendor AI metric | Module power | Networking exposed by module | Current market observation |
|---|---:|---:|---:|---:|---|---|
| Jetson T4000 | 64 GB LPDDR5X | 273 GB/s | 1,200 FP4 sparse TFLOPS | 40–70 W | 3× 25GbE | US$3,599 observed, out of stock |
| Jetson T5000 | 128 GB LPDDR5X | 273 GB/s | 2,070 FP4 sparse TFLOPS | 40–130 W | 4× 25GbE | US$6,419 observed retailer listing |
| Seeed reComputer J601 carrier platform | depends on T4000/T5000 | depends on module | depends on module | system dependent | up to 3×/4× 10GbE RJ45 | configuration-dependent bundle |

The FP4 figures are NVIDIA sparse Tensor Core metrics. They should **not** be interpreted as tokens per second and should not be directly compared with dense FP16/FP32 throughput from other architectures.

## Why T4000 is unusually interesting

T4000 keeps the same **273 GB/s** memory bandwidth as T5000 while reducing capacity to **64 GB** and NVIDIA's configurable module envelope to **40–70 W**. For local LLM inference this is an important tradeoff: autoregressive decode is often memory-bandwidth-sensitive, so T4000 preserves the memory subsystem while substantially reducing maximum module power.

At the 70 W module ceiling, 273 GB/s corresponds to a simple ratio of about **3.90 GB/s per watt**. That is not a benchmark, but it helps explain why T4000 deserves separate treatment from the 128 GB T5000.

64 GB unified memory is enough for many 30B-class quantized models and selected larger low-bit workloads. The exact usable model size depends on quantization, KV cache, context length, runtime overhead, and whether other workloads share memory.

NVIDIA lists T4000 as a production module and currently shows product lifecycle availability through **January 2036**.

## T5000: capacity first

T5000 doubles unified memory to **128 GB** and raises the maximum module power to **130 W**. It is therefore much better suited to 70B-class quantized models with generous context/KV-cache headroom and selected larger low-bit or MoE experiments.

The tradeoff is that memory bandwidth remains **273 GB/s**. A model may fit in 128 GB while still generating more slowly than on a discrete accelerator with much faster HBM or GDDR. T5000's advantage is capacity, CUDA/JetPack software maturity, embedded I/O, networking, and deployability rather than HBM-class decode bandwidth.

NVIDIA currently lists T5000 lifecycle availability through **August 2035**.

## Production integration versus the developer kit

Both modules use a **100 × 87 mm**, 699-pin module form factor and expose PCIe Gen5 plus high-speed Ethernet interfaces. They require a carrier board and thermal solution.

Seeed Studio's **reComputer J601** is a useful production-oriented example because it adds:

- 19–48 V DC input over XT30;
- up to four 10GbE RJ45 ports with T5000 or three with T4000;
- PCIe Gen4 NVMe storage;
- M.2 wireless/4G/5G expansion;
- CAN and RS-232/422/485;
- up to eight GMSL2 cameras;
- a 168 × 155 mm carrier footprint;
- JetPack 7.1 deployment images for both J6014/T4000 and J6015/T5000 configurations.

That makes J601 materially more attractive than a desktop-style dev kit for vehicles, robots, battery/DC-bus installations, and remote edge appliances. Complete system draw will be higher than NVIDIA's module-power figures once storage, carrier losses, networking, cameras, cooling, and peripherals are included.

## Software and quantization

Both Thor modules use NVIDIA Blackwell GPUs and the JetPack/CUDA/TensorRT stack. NVIDIA also targets them with Isaac, Holoscan, and Jetson AI Lab workflows. Blackwell provides low-precision Tensor Core paths including FP4, but the practical quantization path still depends on the inference engine and model.

For local LLM use, treat these separately:

- **TensorRT / TensorRT-LLM**: preferred for NVIDIA-optimized low-precision execution when the model/runtime is supported;
- **PyTorch**: broad framework compatibility, but model-specific kernels matter;
- **llama.cpp / GGUF**: CUDA-backed support depends on the current Jetson/ARM64 build and model features; FP4 headline figures do not automatically translate into GGUF performance;
- **AWQ/GPTQ/FP8/FP4**: support is runtime- and model-dependent and should be recorded with exact engine/version in future benchmark entries.

## Pricing caveat

Retail module pricing is volatile. On **2026-08-22**, Waveshare's shared product selector showed **US$3,599** with an out-of-stock state for the lower-cost option, while a current T5000 product result showed **US$6,419**. These are retailer observations, not NVIDIA MSRP.

Seeed sells the J601 as a configurable bundle. Because the selected module, SSD, cooling, power supply, and wireless options change the total, the catalog intentionally records it as `configuration_dependent` rather than inventing a single system price.

## Sources

- NVIDIA Jetson Thor family: https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-thor/
- NVIDIA Jetson module lineup: https://developer.nvidia.com/embedded/jetson-modules
- NVIDIA Jetson lifecycle: https://developer.nvidia.com/embedded/lifecycle
- NVIDIA Jetson FAQ / part numbers: https://developer.nvidia.com/embedded/faq
- NVIDIA T4000 / JetPack 7.1 technical blog: https://developer.nvidia.com/blog/accelerate-ai-inference-for-edge-and-robotics-with-nvidia-jetson-t4000-and-nvidia-jetpack-7-1/
- Seeed J601 documentation: https://wiki.seeedstudio.com/ai_robotics_recomputer_robotics_j601_carrier_board_getting_started/
- Connect Tech T5000 module page: https://connecttech.com/product/nvidia-jetson-t5000-module-900-13834-0080-000/
- Waveshare T4000/T5000 listing: https://www.waveshare.com/jetson-thor-t5000.htm?sku=32815
