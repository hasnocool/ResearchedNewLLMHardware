# Detailed Hardware Catalog

Last updated: **2026-08-15**

This catalog separates hardware by role rather than treating every TOPS number as comparable. The most useful LLM hardware generally needs a combination of **memory capacity, bandwidth, suitable kernels/runtime support, acceptable power and attainable price**.

## Tier guide

- **S — priority benchmark/buy candidate:** unusually compelling for serious local LLM inference.
- **A — strong candidate:** useful today, but with a meaningful tradeoff in price, power, memory or software.
- **B — situational:** good for particular cluster, edge or secondary-market use cases.
- **Experimental — research/watch:** architecture is interesting but not sufficiently proven for general local LLM use.

---

## 1. High-capacity unified-memory systems

### AMD Ryzen AI Max PRO 400 series — S / announced

**Category:** unified-memory APU / compact workstation platform  
**Architecture:** Zen 5 + RDNA 3.5 + XDNA 2  
**Memory:** up to 192 GB unified system memory  
**GPU-addressable allocation:** up to 160 GB  
**NPU:** XDNA 2  
**Power:** platform/SKU dependent; mobile/workstation-class configurable envelope  
**Availability:** AMD says next-generation Ryzen AI Halo developer systems begin in Q3 2026.

**Why it matters:**

The 192 GB ceiling attacks the primary limitation of current Strix Halo systems: capacity. A 160 GB graphics-addressable allocation should permit substantially larger quantized dense and MoE models without immediately requiring multiple machines.

**What remains to verify:**

- exact memory bandwidth by OEM implementation
- ROCm support matrix at launch
- actual GPU clocks and compute topology by SKU
- sustained package and whole-system power
- llama.cpp / vLLM / PyTorch decode and prefill results
- street pricing

**Research priority:** **very high**.

---

### Ryzen AI Max+ 395 / Radeon 8060S systems — S / available

**Category:** unified-memory APU  
**CPU:** 16C / 32T Zen 5  
**GPU:** Radeon 8060S, 40 CUs  
**Memory:** commonly 64 or 128 GB LPDDR5X depending on system  
**Memory interface:** 256-bit unified memory  
**Typical platform power:** configurable by OEM; examples span quiet/balanced/performance modes  
**Software:** ROCm, HIP, Vulkan and llama.cpp ecosystem increasingly useful

This is the baseline high-capacity AMD platform against which the next Max PRO 400 generation should be measured.

#### Minisforum MS-S1 MAX

- 64 GB and 128 GB configurations
- Radeon 8060S / 40 CUs
- up to 50 TOPS NPU / 126 TOPS vendor total-AI figure
- 60 W quiet, 95 W balanced and 130 W performance modes listed by Minisforum
- dual 10GbE
- 128 GB configuration is particularly useful for distributed inference experiments

**Tier:** S for 128 GB; A for 64 GB.

#### Minisforum N5 MAX AI NAS

- Ryzen AI Max+ 395
- Radeon 8060S
- 64 GB LPDDR5X standard current listing
- 128 GB variant exists but availability varies
- 70–90 W listed CPU TDP range
- dual 10GbE
- unusually large local storage capacity

**Interesting use:** combined inference node + model/data store in a small cluster.

**Caution:** do not assume the 128 GB variant is in stock simply because it appears in the selector.

---

### ASUS NUC 16 Pro — A / available

**Category:** compact Intel AI mini PC  
**Processor family:** Intel Core Ultra Series 3  
**NPU:** up to 50 TOPS  
**GPU:** next-generation Intel Arc, up to 12 Xe cores depending on configuration  
**Memory:** up to 96 GB LPDDR5X in soldered-memory versions  
**Vendor total AI compute:** up to 180 TOPS  
**Software paths:** OpenVINO, Intel GPU/SYCL ecosystem, Vulkan and general llama.cpp paths

**Why it matters:**

The headline NPU figure is less important than the combination of up to 96 GB memory and compact power consumption. It is a useful Intel comparison node against AMD unified-memory systems.

**Open questions:**

- how much of 96 GB is efficiently usable by the GPU path
- measured memory bandwidth
- sustained wall power
- real llama.cpp/OpenVINO LLM throughput

---

## 2. NVIDIA GB10 Grace Blackwell family

### Shared GB10 compute platform — S / available

**Category:** compact AI workstation / cluster node  
**CPU:** 20-core Arm  
**GPU:** Blackwell generation  
**AI performance:** up to 1 PFLOP FP4 using sparsity  
**Memory:** 128 GB coherent LPDDR5X  
**Memory interface:** 256-bit  
**Bandwidth:** 273 GB/s  
**GB10 TDP:** 140 W  
**Typical PSU:** 240 W  
**Networking:** 10GbE + ConnectX-7 up to 200 Gb/s on reference DGX Spark platform  
**Software:** CUDA, TensorRT ecosystem, DGX OS, PyTorch and broad NVIDIA tooling

The critical modeling rule is to treat **GB10 as one compute platform**. DGX Spark and partner boxes are not independent silicon architectures.

### NVIDIA DGX Spark

**Tier:** S  
**Storage:** 4 TB reference configuration  
**Interconnect:** ConnectX-7 200 Gb/s  
**Strength:** best-defined reference software stack and official specifications.

### ASUS Ascent GX10

**Tier:** A/S depending price  
**Platform:** GB10 / 128 GB unified memory  
**Cluster feature:** ConnectX-7 is intended to link two systems for larger model workflows.

### HP ZGX Nano G1n

**Tier:** A  
**Platform:** GB10 / 128 GB coherent unified memory  
**Power supply:** 240 W USB-C adapter  
**Useful manufacturer power data:** HP QuickSpecs publishes roughly mid-30-watt idle and roughly 224–229 W busy-max AC consumption for one tested configuration.

This is especially valuable because it gives the catalog whole-system electrical data rather than only SoC TDP.

### Lenovo ThinkStation PGX

**Tier:** A  
**Platform:** GB10  
**Memory:** 128 GB LPDDR5X-8533 unified memory  
**Example storage:** 1 TB NVMe  
**Power supply:** 240 W  
**OS:** NVIDIA DGX OS

**Buying rule for GB10 systems:** rank OEM variants mostly on delivered price, storage, networking exposure, thermals, warranty and regional availability.

---

## 3. Embedded boards and SOMs

### AMD Kria AI SOM / Ryzen AI Embedded X100 — S-potential / announced or sampling

**Category:** COM-HPC embedded SOM  
**CPU:** up to 16 Zen 5 cores  
**GPU:** RDNA 3.5 integrated GPU  
**NPU:** XDNA 2  
**Memory:** up to 128 GB LPDDR5X unified memory  
**Networking/I/O:** includes industrial connectivity and 10GbE-class options in the platform ecosystem

**Why it matters:**

Most embedded boards become uninteresting for serious LLM inference because they run out of memory. A 128 GB embedded unified-memory platform changes that. It could become an excellent 24/7 distributed node if AMD exposes sufficiently mature Linux GPU/NPU support.

**Watch for:** developer kit price, idle power, memory bandwidth and ROCm support.

---

### NVIDIA Jetson T3000 — A-potential / announced

**Category:** embedded Thor module  
**GPU compute:** 865 FP4 TFLOPS vendor figure  
**CPU:** 8-core Neoverse Arm CPU  
**Memory:** 32 GB LPDDR5X  
**Bandwidth:** 273 GB/s  
**Networking:** 25GbE  
**Positioning:** smaller/lower-power Thor tier

**Strengths:** strong CUDA/TensorRT ecosystem and excellent bandwidth for a 32 GB embedded device.

**Limitation:** 32 GB capacity limits the largest models even though compute is high.

---

### NVIDIA Jetson T2000 — B / announced

Lower tier of the same Thor family. Worth tracking for smaller models, speculative decoding helpers, embeddings and edge-agent workloads where power is more important than maximum model size.

---

## 4. Heterogeneous specialty systems

### Lucebox — A / limited allocation

**Category:** heterogeneous local-inference workstation  
**APU:** Ryzen AI Max+ 395  
**Unified memory:** 128 GB LPDDR5X-8000, approximately 256 GB/s  
**APU GPU:** Radeon 8060S / 40 CUs  
**Discrete accelerator:** Radeon AI PRO R9700  
**VRAM:** 32 GB GDDR6  
**R9700 bandwidth:** 640 GB/s  
**R9700 compute units:** 64 CUs  
**System sustained power:** vendor reports approximately 500 W  
**Idle:** vendor reports approximately 40 W  
**Launch price:** US$6,499 through 2026-08-31; vendor states US$7,900 afterward  
**Availability:** limited allocation

**Why it is technically important:**

It demonstrates a useful architecture for very large models: put latency-sensitive/hot portions in fast discrete VRAM while retaining the capacity of large unified memory for colder weights.

**Published vendor evidence:**

The vendor reports DeepSeek V4 Flash 284B results including approximately 50.65 tok/s median decode in its heterogeneous serving setup. Treat this as **vendor benchmark evidence**, not an independent cross-platform result.

**Research value:** high even if the machine itself is too expensive for a low-power shortlist, because the scheduling technique can inform custom builds.

---

### NYMPH AX1 — Experimental / watch

**Category:** specialty AI ASIC accelerator  
**Vendor claims:** 54 TOPS, 16 GB dedicated AI memory, 16 W peak, US$1,190  
**Advertised model capacity:** approximately 26B class  
**Evidence status:** vendor claim / insufficient independent LLM benchmarking

**Why it is interesting:** claimed compute and memory at 16 W would be excellent for small/medium local models.

**Why it stays experimental:**

- proprietary/unclear runtime maturity
- insufficient independent benchmarks
- limited public architectural detail
- fixed 16 GB memory

Do not rank its 54 TOPS directly against NVIDIA, AMD or Intel TOPS figures.

---

## 5. AI ASIC accelerator cards

### Tenstorrent Wormhole n150 — B / available-watch

**Category:** PCIe AI ASIC  
**Tensix cores:** 72  
**Memory:** 12 GB GDDR6  
**Bandwidth:** 288 GB/s  
**FP8:** 262 TFLOPS vendor specification  
**FP16:** 74 TFLOPS  
**Board power:** 160 W  
**Host:** PCIe 4.0 x16  
**Fabric:** high-speed QSFP-DD / Warp interconnect options

**Strengths:** architecture designed for scalable AI compute and unusually strong accelerator-to-accelerator connectivity.

**Weakness:** only 12 GB of local memory per n150 card. Software compatibility and model coverage matter more than synthetic compute.

### Tenstorrent Wormhole n300 — B / cluster-specialist

**Memory:** 24 GB GDDR6  
**Bandwidth:** 576 GB/s  
**FP8:** 466 TFLOPS  
**FP16:** 131 TFLOPS  
**Board power:** 300 W

More useful than n150 for LLMs because capacity and bandwidth double, but total power moves out of the strict low-power range.

---

## 6. Secondary-market datacenter accelerators

### AMD Instinct MI210 — A when cheap / secondary market

**Category:** datacenter PCIe GPU  
**Architecture:** CDNA 2  
**Compute units:** 104  
**Memory:** 64 GB HBM2e ECC  
**Bandwidth:** 1.6 TB/s  
**FP16/BF16 peak:** 181 TFLOPS  
**Board power:** 300 W  
**Interface:** PCIe 4.0 x16  
**GPU fabric:** up to three Infinity Fabric links  
**Software:** ROCm

**Why it remains compelling:**

64 GB of HBM2e at 1.6 TB/s is an enormous memory subsystem compared with consumer unified-memory systems. If secondary-market prices fall far enough, tokens/sec per dollar can be excellent.

**Operational penalty:** passive server cooling, 300 W board power, host/platform requirements and a less convenient form factor.

**Price trigger to monitor:** add alerts for substantial drops rather than assuming old datacenter GPUs are automatically bargains.

---

## 7. FPGA and adaptive SoC platforms

### AMD Versal AI Edge Series Gen 2 — Experimental

**Category:** adaptive SoC  
**Compute fabric:** programmable logic + AIE-ML v2 engines + Arm processing system  
**Top family AI figures:** up to 184 dense INT8 TOPS / 369 sparse INT8 TOPS depending on SKU  
**Efficiency claim:** AMD advertises up to 3× TOPS/W versus previous-generation AI Engine architecture

**Potential LLM roles:**

- custom quantized matrix kernels
- deterministic token pipeline stages
- preprocessing/postprocessing
- sparse or recurrent specialty models
- network/stream processing in a distributed inference appliance

**Main issue:** general-purpose LLM software is dramatically less turnkey than CUDA/ROCm/llama.cpp.

---

### Altera Agilex + FPGA AI Suite 2026.1.1 — Experimental

Altera's 2026.1.1 software introduces a beta spatial compiler that maps neural-network dataflow directly onto FPGA fabric, including MLP-oriented support. This is technically interesting for deterministic and streaming inference.

**Do not promote to main LLM buying rankings yet** without:

- transformer/LLM benchmark fixtures
- memory-capacity and bandwidth characterization
- power measurements
- reproducible runtime path for modern decoder models

---

## 8. Ranking observations

### Best capacity-per-watt direction

1. Ryzen AI Max PRO 400 / 192 GB class — pending real measurements.
2. 128 GB Ryzen AI Max+ 395 systems — current practical AMD baseline.
3. GB10 / 128 GB systems — stronger software and cluster fabric, generally higher acquisition cost.

### Best bandwidth-first used candidate

**AMD Instinct MI210**: 64 GB HBM2e at 1.6 TB/s is difficult for compact consumer hardware to match. The tradeoff is 300 W plus server-style integration.

### Best cluster-oriented compact platform

**GB10 / DGX Spark class** because of coherent 128 GB memory, CUDA software support and ConnectX-7-class networking.

### Most interesting embedded platform

**AMD Kria AI SOM / Ryzen AI Embedded X100**, primarily because 128 GB is exceptionally large for an embedded SOM.

### Most interesting unconventional architecture

**Lucebox's heterogeneous R9700 + Strix Halo approach**, because it demonstrates explicit placement across a fast small memory domain and a slower large memory domain.

---

## 9. Hardware intentionally not over-ranked

Small edge NPUs can show excellent TOPS/W while being poor LLM devices. A 1–8 GB accelerator may be excellent for vision, speech, embeddings or always-on classifiers but cannot compete with a 64–192 GB system for general large-model inference.

Therefore, the catalog should never let `TOPS / watts` alone dominate the score. Memory capacity, bandwidth and software support are gating factors.
