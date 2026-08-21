# AMD Instinct MI400 Series

Last updated: **2026-08-21**

AMD Instinct MI400 is a new CDNA 5 datacenter accelerator family aimed at frontier-model inference/training, sovereign AI and HPC. It belongs in this catalog because its published memory capacity and bandwidth create a materially new accelerator tier, even though it is not a local-desktop product.

## MI455X

**Category:** rack-scale/datacenter AI accelerator  
**Architecture:** AMD CDNA 5  
**Compute:** 256 WGP; up to 40.3 PFLOPS FP4 and 20.1 PFLOPS FP8  
**Memory:** **432 GB HBM4**  
**Memory bandwidth:** **23.3 TB/s** peak theoretical  
**Scale-up:** up to **3.6 TB/s per GPU**  
**Scale-out:** up to **600 GB/s per GPU**  
**Form factor:** Enhanced Accelerator Module (EAM)  
**Cooling:** direct liquid cooling in AMD Helios reference implementation  
**Software:** ROCm with PyTorch, TensorFlow, JAX, ONNX Runtime, vLLM, SGLang and Triton paths  
**Availability:** AMD states MI400/Helios production shipments and volume deployments begin in the second half of 2026  
**Standalone public price:** not captured  
**Per-GPU power:** not captured from defensible manufacturer material in this pass

### Why it matters

A single MI455X exposes 432 GB of HBM4 at 23.3 TB/s, making it unusually relevant to very large-model inference, large KV caches and high-concurrency serving. The project should not compare this directly with compact systems on acquisition cost or power until OEM/server pricing and per-device power are public.

AMD also claims MI455X delivers 34× higher token throughput than MI355X in its Advancing AI 2026 materials. That remains **manufacturer benchmark evidence** pending independently reproducible workload details.

### Official sources

- https://www.amd.com/en/products/accelerators/instinct/mi400.html
- https://www.amd.com/en/products/specifications/accelerators.html
- https://www.amd.com/content/dam/amd/en/documents/products/accelerators/instinct/amd-instinct-mi455x_brochure.pdf
- https://www.amd.com/content/dam/amd/en/documents/products/technologies/cdna/amd-cdna5-whitepaper.pdf
- https://rocm.docs.amd.com/

## MI430X

**Category:** AI/HPC accelerator  
**Architecture:** AMD CDNA 5  
**Compute:** up to 288 TFLOPS hardware FP64 and 9.2 PFLOPS FP4  
**Memory:** **432 GB HBM4**  
**Memory bandwidth:** **23.3 TB/s** peak theoretical  
**Availability:** AMD says expected in **2027**  
**Public price:** not captured  
**Power:** not captured

MI430X is optimized more heavily for high-precision HPC and AI-for-science than MI455X, but its memory subsystem still makes it relevant to large inference workloads. It should remain a future/watch candidate until real systems, power figures, pricing and AI-serving benchmarks appear.

### Official sources

- https://www.amd.com/en/products/accelerators/instinct/mi400/mi430x.html
- https://www.amd.com/en/products/accelerators/instinct/mi400.html
- https://www.amd.com/content/dam/amd/en/documents/products/technologies/cdna/amd-cdna5-whitepaper.pdf

## Research triggers

Promote or materially update these records when any of the following appear:

- OEM/server pricing or public cloud instance pricing;
- per-GPU/module and whole-system power;
- independent prefill/decode tokens/sec and tokens/watt;
- vLLM/SGLang production results with named models, datatypes and concurrency;
- practical partitioning and rack-wide memory behavior;
- MI455X availability in partner systems beyond reference deployments;
- MI430X final production specifications in 2027.
