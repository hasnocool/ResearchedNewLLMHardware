# RDNA 4 32GB efficiency and Ryzen AI 9 HX 470 — 2026-08-23

This research pass adds two AMD Radeon AI PRO RDNA 4 variants and a current Ryzen AI 400 mini-PC that were not already normalized in the repository.

## Quick comparison

| Hardware | Memory | Bandwidth | Board / processor power | Cooling | Local-AI significance |
|---|---:|---:|---:|---|---|
| AMD Radeon AI PRO R9600 | 32 GB GDDR6 | 640 GB/s | 150 W TBP | Active, single-slot | Unusually strong 32 GB memory-bandwidth-per-watt profile with current AMD drivers/ROCm targeting. |
| AMD Radeon AI PRO R9700S | 32 GB GDDR6 | 640 GB/s | 300 W TBP | Passive, double-slot | Higher matrix/vector compute than R9600, intended for airflow-managed workstation/server-style deployment. |
| MINISFORUM AI X1 Pro-470 | up to 128 GB DDR5-5600 in system | dual-channel DDR5 | HX 470: 28 W default, 15–54 W cTDP | Integrated mini-PC cooling | Cheap, expandable high-capacity host for CPU/Vulkan/NPU-compatible workflows; capacity exceeds bandwidth for very large LLMs. |

## Radeon AI PRO R9600

AMD lists the R9600 as RDNA 4 / `gfx1201` with 48 CUs, 96 AI accelerators, 32 GB GDDR6 on a 256-bit bus, 640 GB/s peak memory bandwidth and 150 W TBP. It is an active, single-slot PCIe 5.0 x16 design.

Peak matrix figures include 99 FP16 TFLOPS, 199 FP8 TFLOPS, 199 INT8 TOPS and 397 INT4 TOPS without structured sparsity. These are architecture capabilities, not LLM tokens/sec measurements.

For autoregressive inference, the particularly interesting specification is memory bandwidth versus board power: `640 / 150 ≈ 4.27 GB/s/W`. This ratio is derived from manufacturer specifications and should not be confused with measured wall-power efficiency.

The 32 GB VRAM class is practical for many 20B–32B quantized models, depending on quantization, context length, KV-cache allocation and runtime overhead. Current AMD product/driver pages are live; a defensible standalone retail price was not verified in this pass.

## Radeon AI PRO R9700S

R9700S uses 64 RDNA 4 CUs, 128 AI accelerators and the same 32 GB / 640 GB/s memory subsystem as R9700, but AMD specifies passive cooling and a 300 W TBP. AMD's current PRO Edition 26.Q3 release notes added explicit support for R9700S.

The card is therefore more naturally treated as an airflow-managed workstation/server accelerator than an off-grid desktop card. Its specification-derived memory-bandwidth-per-watt ratio is about `640 / 300 ≈ 2.13 GB/s/W`.

The higher compute figures — 191 FP16 matrix TFLOPS, 383 FP8 TFLOPS, 383 INT8 TOPS and 766 INT4 TOPS dense — can matter for prefill, batched inference and supported matrix-heavy kernels, while token-by-token decode remains strongly dependent on memory behavior and runtime implementation.

## Ryzen AI 9 HX 470 and MINISFORUM AI X1 Pro-470

AMD launched the Ryzen AI 9 HX 470 on January 5, 2026. It combines 4 Zen 5 cores and 8 Zen 5c cores for 12C/24T, a 16-CU Radeon 890M at up to 3.1 GHz and XDNA 2 AI acceleration.

Two AI numbers must remain distinct:

- AMD specifies **up to 86 total platform TOPS**.
- AMD specifies **up to 55 NPU TOPS**.

The processor supports up to 256 GB memory at the silicon level, while the current MINISFORUM AI X1 Pro-470 system page advertises up to 128 GB DDR5-5600 SO-DIMM memory. The system limit is therefore the relevant value for this catalog entry.

MINISFORUM also provides three M.2 NVMe slots, dual 2.5GbE, dual USB4 and OCuLink. The internal power supply is rated at 134.9 W; that is not a measured inference wall draw. AMD specifies the HX 470 itself at 28 W default TDP with a 15–54 W cTDP range.

The system is interesting for large-memory CPU/Vulkan experiments and for workloads supported by Ryzen AI Software. Arbitrary GGUF models should not be assumed to execute on the XDNA 2 NPU merely because the processor has a 55-TOPS NPU.

On 2026-08-23, the MINISFORUM Canada page displayed a CA$1,040 barebone sale price. Configured memory/storage variants cost more and stock state can vary.

## Model-fit and quantization caveats

Memory capacity only determines whether a model can plausibly fit. Practical model size also depends on runtime allocations, context length, KV-cache format, batch size and quantization. For AMD GPUs, GGUF/llama.cpp, ROCm/PyTorch and Vulkan paths have different support/performance characteristics. FP8/INT8/INT4 peak hardware figures should not be treated as universal quantization compatibility claims.

## Sources

- AMD Radeon AI PRO R9600 product and driver pages
- AMD Radeon AI PRO R9700S product and driver pages
- AMD ROCm GPU specification reference
- AMD Software: PRO Edition 26.Q3 release notes
- AMD Ryzen AI 9 HX 470 product specification
- MINISFORUM AI X1 Pro-470 product/store pages

See `data/rdna4_32gb_efficiency_and_hx470_2026.json` for normalized records and `data/price-observations-2026-08-23-rdna4-hx470.jsonl` for dated market/availability observations.
