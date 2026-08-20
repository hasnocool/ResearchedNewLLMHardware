# NVIDIA RTX Spark for Local LLM Inference

Last updated: **2026-08-20**

NVIDIA RTX Spark is a distinct Windows-oriented unified-memory AI PC platform and should not be confused with the GB10-based DGX Spark family. The repository models RTX Spark as one shared compute platform with multiple OEM implementations.

## Shared RTX Spark N1X platform

**Platform:** NVIDIA RTX Spark N1X  
**CPU:** up to 20-core NVIDIA Grace CPU  
**GPU:** NVIDIA Blackwell RTX, up to 6,144 CUDA cores  
**AI compute:** up to 1 PFLOP FP4 vendor figure  
**Unified memory:** up to 128 GB  
**Process:** TSMC 3 nm  
**Transistors:** 70 billion  
**Software:** Windows 11, native CUDA, TensorRT and the wider RTX software ecosystem  
**Availability:** NVIDIA says partner systems arrive in fall 2026

NVIDIA positions RTX Spark for local agents, creative AI and development. Its public material claims support for local LLMs up to roughly 120B parameters and context windows up to one million tokens. Those are product-positioning claims rather than normalized performance benchmarks.

### Why it matters

The combination of 128 GB unified memory and CUDA in portable and mini-PC form factors creates a new category between conventional high-end laptops and GB10/DGX Spark-class development systems. It is particularly interesting for users who need large local model capacity but also require Windows-native software or a battery-powered workstation.

### Unknowns that remain important

- exact memory bandwidth;
- sustained SoC and whole-system power;
- price by OEM/configuration/region;
- real decode and prefill performance in llama.cpp, TensorRT-LLM, PyTorch and other runtimes;
- whether unplugged laptop performance materially differs from AC-powered performance;
- thermals under long-running local inference.

Until those are known, RTX Spark should be ranked as **high-priority / S-potential**, not as a proven value or tokens-per-watt leader.

## ASUS ProArt P16 (H7607)

ASUS publishes an RTX Spark N1X configuration with a 20-core CPU, 6,144-core Blackwell RTX GPU and **64 GB or 128 GB LPDDR5X unified memory**. The 16-inch system is one of the first fully specified RTX Spark laptops and is therefore a priority independent-benchmark target.

Official pages:

- https://www.asus.com/ca-en/laptops/for-creators/proart/proart-p16-h7607/
- https://www.asus.com/laptops/for-creators/proart/proart-p16-h7607/techspec/

## ASUS ProArt P14 (H7407)

The smaller ProArt P14 uses the same RTX Spark N1X platform and ASUS lists **48 GB, 64 GB and 128 GB LPDDR5X** memory configurations. The 128 GB configuration is especially unusual for a 14-inch laptop and makes the P14 interesting for portable large-model inference research.

Official pages:

- https://www.asus.com/ca-en/laptops/for-creators/proart/proart-p14-h7407/
- https://www.asus.com/laptops/for-creators/proart/proart-p14-h7407/techspec/

## ASUS ProArt Mini PC

ASUS also announced a compact desktop implementation using RTX Spark. Manufacturer material specifies:

- up to 128 GB unified memory;
- up to 140 W thermal headroom;
- 10GbE;
- M.2 PCIe Gen5 x4 expansion;
- approximately 150 × 150 × 51 mm chassis dimensions.

This may become the most relevant RTX Spark implementation for always-on or distributed inference because it avoids laptop battery/display overhead and includes 10GbE. Retail pricing and full production specifications are not yet public enough to score it as a purchase candidate.

Official announcement:

- https://www.asus.com/us/business/resources/news/computex-2026-proart-pcs/

## Deduplication rule

Do not count ProArt P14, ProArt P16, ProArt Mini PC, Surface or future Dell/HP/Lenovo/MSI systems as separate accelerator architectures. They are OEM implementations of the **`nvidia-rtx-spark-n1x`** compute platform. Compare those systems on delivered price, memory configuration, cooling, battery behavior, storage, networking, warranty and measured wall power.

## Evidence status

Current core specifications are manufacturer evidence from NVIDIA and ASUS. No independent LLM benchmark has yet been promoted into the catalog for RTX Spark because the required model/runtime/quantization/context/power metadata is not yet available in a sufficiently comparable form.
