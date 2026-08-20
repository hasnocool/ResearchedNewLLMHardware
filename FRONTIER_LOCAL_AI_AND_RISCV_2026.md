# Frontier Local AI and RISC-V Hardware — 2026-08-20

This research slice covers three very different local-AI directions: a shipping 128 GB unified-memory developer PC, an announced 748 GB coherent-memory deskside system, and an obscure 32 GB RISC-V Mini-ITX board with an integrated NPU.

## AMD Ryzen AI Halo Developer Platform

**Status:** available in the United States through AMD's launch partner Micro Center.  
**Current observed price:** US$3,999.99 for 128 GB LPDDR5X-8000 + 2 TB SSD configurations; store inventory varies.

Key verified specifications:

- Ryzen AI Max+ 395, 16 Zen 5 cores / 32 threads
- Radeon 8060S, 40 RDNA 3.5 compute units
- 128 GB LPDDR5X-8000 unified memory
- 256 GB/s memory bandwidth
- 60 FP16 TFLOPS vendor GPU figure
- XDNA 2 NPU, up to 50 TOPS
- 120 W platform TDP
- 10GbE, Wi-Fi 7 and Bluetooth 5.4
- Linux or Windows 11
- 150 × 150 × 45.4 mm, under 1.2 kg

AMD explicitly positions the system for PyTorch, vLLM, llama.cpp, Ollama, ComfyUI and LM Studio workflows and claims support for models up to 200B parameters. Those model-capacity and comparative performance claims are vendor evidence, not independent benchmarks.

For local LLM work, the main attraction is capacity per watt: 128 GB is enough for 70B-class quantized models and selected larger low-bit or MoE workloads without a discrete multi-GPU configuration. The 120 W figure is TDP rather than measured wall power, so tokens/joule should remain unranked until independent measurements are available.

Sources:

- https://www.amd.com/en/products/processors/desktops/ryzen/ryzen-ai-halo.html
- https://www.amd.com/en/products/processors/desktops/ryzen/ryzen-ai-halo/ryzen-ai-max-plus-395.html
- https://www.amd.com/en/blogs/2026/amd-ryzen-ai-halo-now-available-at-micro-center.html
- https://www.microcenter.com/product/711962/amd-ryzen-ai-halo-developer-platform-windows-11-pro

## NVIDIA DGX Station for Windows / GB300

**Status:** announced; NVIDIA's product page says coming in Q4 2026.  
**Current price:** no defensible public numeric price verified.

Key verified specifications:

- GB300 Grace Blackwell Ultra Desktop Superchip
- 72-core NVIDIA Grace CPU
- NVIDIA Blackwell Ultra GPU
- NVLink-C2C CPU/GPU interconnect
- up to 748 GB coherent memory
- up to 20 PFLOPS FP4 Tensor Core performance with sparsity
- ConnectX-8 SuperNIC up to 800Gb/s
- optional RTX PRO 6000 Blackwell Workstation GPU
- Windows with WSL and NVIDIA AI software stack
- NVIDIA claims support for models up to 1 trillion parameters

This is a capacity reference point rather than a cost-effective recommendation. Its 748 GB coherent pool is large enough to change the practical boundary of what can be considered a single local workstation, but no public whole-system power or retail price was stored because neither was defensibly exposed in the sources checked in this pass.

Sources:

- https://www.nvidia.com/en-us/products/workstations/dgx-station-for-windows/
- https://nvidianews.nvidia.com/news/nvidia-dgx-station-for-windows-puts-a-trillion-parameter-ai-supercomputer-on-every-enterprise-desk

## Milk-V Megrez 32 GB

**Status:** official product page remains live, but current numeric price and dependable new-stock availability were not verified. Treat it as limited or secondary-market hardware rather than assuming launch availability still applies.

Key verified specifications:

- ESWIN EIC7700X SoC
- four SiFive P550 RISC-V cores up to 1.8 GHz
- Imagination IMG AXM-8-256 GPU
- 19.95 TOPS INT8 NPU; INT16 and FP16 support also listed
- 32 GB LPDDR5-6400 option
- PCIe Gen3 x4 through an x8 physical connector
- M.2 SATA, SATA3, eMMC connector, microSD and SPI flash
- dual Gigabit Ethernet
- 12 V DC barrel input or standard 24-pin ATX power
- 170 × 170 mm Mini-ITX form factor
- RockOS/Debian ecosystem, ESWIN NPU Runtime/ENNP SDK, Vulkan and OpenCL paths

The 32 GB memory capacity makes the board interesting for RISC-V AI experiments, but the NPU should not be treated like a general GGUF accelerator. Milk-V's public NPU examples use the ESWIN compiled-model runtime and are primarily vision-oriented. No sufficiently detailed public LLM benchmark was found that would justify converting the 19.95-TOPS figure into tokens/sec or tokens/joule.

Historical launch-channel pricing was reported at US$269 for the 32 GB version, but that value is retained only as historical context and is **not** a current price.

Sources:

- https://milkv.io/megrez
- https://milkv.io/docs/megrez/overview
- https://milkv.io/zh/docs/megrez/development-guide/runtime-sample/yolov3

## Practical ranking

| Platform | Capacity | LLM software maturity | Power relevance | Buying status |
|---|---:|---|---|---|
| AMD Ryzen AI Halo | 128 GB unified | High and improving; ROCm + common local runtimes | Strong capacity/TDP potential; wall testing needed | Shipping US$3,999.99 |
| NVIDIA DGX Station for Windows | up to 748 GB coherent | Expected very high NVIDIA-stack maturity | Unknown whole-system power in checked sources | Coming Q4; price unverified |
| Milk-V Megrez | 32 GB LPDDR5 | Experimental for general LLM acceleration | Attractive 12 V input; actual LLM wall power unverified | Limited/secondary-market |

The structured records are in `data/frontier_local_ai_and_riscv_2026.json`; dated availability and price observations are in `data/price-observations-2026-08-20-frontier-riscv.jsonl`.