# Microsoft Maia 200

## Summary

Microsoft Maia 200 is a hyperscaler-designed inference accelerator deployed in Azure. It is relevant to this catalog as a cloud-only, rack-scale inference platform with unusually large HBM capacity, native low-precision support, and Ethernet-based scale-up.

## Published specifications

| Attribute | Value | Evidence |
|---|---:|---|
| Process | TSMC 3 nm | Microsoft manufacturer disclosure |
| Memory | 216 GB HBM3e | Microsoft manufacturer disclosure |
| HBM bandwidth | 7 TB/s | Microsoft manufacturer disclosure |
| On-chip SRAM | 272 MB | Microsoft manufacturer disclosure |
| Compute | >10 PFLOPS FP4; >5 PFLOPS FP8 | Microsoft manufacturer disclosure |
| SoC TDP | 750 W | Microsoft manufacturer disclosure |
| Scale-up bandwidth | 2.8 TB/s bidirectional per accelerator | Microsoft manufacturer disclosure |
| Cluster scale | Up to 6,144 accelerators | Microsoft manufacturer disclosure |
| Availability | Azure US Central deployed; additional regions planned | Microsoft manufacturer disclosure |
| Public price | Not disclosed | No defensible public price found |

## Software and deployment

Microsoft documents a Maia SDK preview with PyTorch integration, a Triton compiler, optimized kernel libraries, Maia's NPL low-level language, simulator, and cost calculator. Maia 200 is intended for Azure-hosted inference and is not presented as a retail PCIe accelerator.

## LLM evidence

Microsoft positions Maia 200 for GPT-5.2 and large-scale token generation, but the cited announcement does not provide a normalized named-model tokens/second result with enough methodology for direct comparison. The repository therefore records the platform as manufacturer-specification evidence, not as independently benchmarked local hardware.

## Research gaps

- Independent end-to-end prefill/decode measurements
- Model/quantization-specific tokens per second and latency
- Whole-system power and cooling measurements
- Tenant-visible availability, regions, and pricing
- Practical framework/runtime access outside Azure

## Sources

- [Microsoft Maia 200 announcement](https://blogs.microsoft.com/blog/2026/01/26/maia-200-the-ai-accelerator-built-for-inference/)
- [Microsoft Maia product/resources](https://www.microsoft.com/en-us/maia)
