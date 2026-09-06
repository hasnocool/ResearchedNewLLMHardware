# Minisforum N5 MAX AI NAS (Ryzen AI Max+ Pro 495)

**Research status:** announced / exhibited at IFA 2026; pricing and availability not yet published at time of capture.

## Why it matters

The N5 MAX P495 is a newly announced AI-oriented NAS/workstation variant built around AMD's Ryzen AI Max+ Pro 495 (Gorgon Halo) platform. It combines a large unified-memory pool with NAS-oriented storage expansion and is marketed for local agentic AI workloads. It is tracked as an OEM system variant rather than new silicon.

## Evidence-backed specifications

- **CPU / SoC:** AMD Ryzen AI Max+ Pro 495 (manufacturer/platform reporting)
- **Integrated GPU:** Radeon 8065S (platform family reporting)
- **Memory:** up to 192 GB unified memory (partner reporting; exact N5 MAX configurations not fully published)
- **Storage:** up to 200 TB local storage capacity claimed in launch coverage; exact bay/NVMe/SATA configuration requires product documentation
- **Use case:** local AI agents, NAS, long-running inference and storage-heavy workflows
- **Availability:** shown at IFA 2026, September 4–8, 2026; launch timing and regional channel availability not published
- **Public price:** not found; do not infer from other Minisforum models

## LLM relevance

The value proposition is the combination of a high-capacity unified-memory APU and a storage-centric chassis. This may be useful for quantized models that exceed discrete-GPU VRAM, but no reproducible independent token-throughput result or whole-system wall-power measurement was located in this pass. Treat vendor/press model-size claims as capability marketing until validated.

## Software / runtime

- Windows and Linux support reported for the Ryzen AI Max family
- AMD Ryzen AI Software / ROCm / Vulkan are the relevant software paths, but N5 MAX-specific enablement and supported backends require confirmation from final product documentation

## Research gaps

- Exact memory configurations and bandwidth for the N5 MAX P495
- Sustained wall power and thermals under LLM inference
- Independent llama.cpp / vLLM / Ollama / ROCm benchmark results
- Final storage topology and expansion details
- Regional pricing, stock, warranty, and ship dates

## Sources

- Minisforum / IFA 2026 coverage: https://www.tomshardware.com/pc-components/nas/minisforum-launches-local-ai-solutions-at-ifa-2026-ai-agent-nas-n5-and-ai-mini-workstation-ms-s1-use-amd-ryzen-ai-max-pro-495-processors-designed-to-run-models-locally
- AMD Ryzen AI Software documentation: https://ryzenai.docs.amd.com/en/latest/
- AMD Ryzen AI Max platform family context: https://www.amd.com/

**Evidence quality:** manufacturer/partner announcement plus reputable secondary coverage; not independently benchmarked.
