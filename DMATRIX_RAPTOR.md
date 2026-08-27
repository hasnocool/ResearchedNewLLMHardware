# d-Matrix Raptor / 3DIMC

Last updated: **2026-08-27**

## Status

**High-priority preproduction inference accelerator.** Raptor is d-Matrix's next-generation inference platform and the planned commercial debut of its 3DIMC stacked-DRAM technology. It is not yet a normal purchase candidate because stable pricing, production power, and a firm public shipment date have not been captured.

## Why it matters

Raptor attacks the memory wall differently from HBM-based GPUs. d-Matrix stacks custom DRAM directly with compute and performs digital in-memory computation, reducing the energy and latency of moving weights into the compute fabric.

At Hot Chips 2026, independent reporting described a Raptor card with **32 GB of custom stacked DRAM and 100 TB/s card-level bandwidth**. The same report attributes a measured **0.37 pJ/bit** memory-movement figure to working silicon. d-Matrix's own Pavehawk test-chip material reports approximately **0.3-0.4 pJ/bit** across tested conditions, giving useful manufacturer confirmation of the underlying 3DIMC energy target.

These figures should not be compared naively with HBM bandwidth on GPUs: Raptor's architecture places compute next to/inside the memory hierarchy, so the effective dataflow is different.

## Architecture

- **Accelerator family:** d-Matrix Raptor
- **Core concept:** 3DIMC stacked DRAM + digital in-memory compute
- **Reported memory:** 32 GB per card in the Hot Chips 2026 configuration
- **Reported card bandwidth:** 100 TB/s
- **Measured early-silicon memory movement:** about 0.37 pJ/bit in Hot Chips reporting; d-Matrix separately reports roughly 0.3-0.4 pJ/bit on Pavehawk
- **Control/vector CPU IP:** AndesCore AX46MPV RISC-V
- **Scale strategy:** PCIe/standard Ethernet plus d-Matrix scale-up/scale-out architecture
- **Software direction:** PyTorch, MLIR, Triton DSL, and d-Matrix Aviator

## LLM evidence

Hot Chips reporting cites a d-Matrix projection of roughly **988 tokens/s/user on Kimi K3 2.8T at 1M-token context**. Treat this as a **vendor projection based on early silicon/architecture**, not as an independently reproduced production benchmark.

The repository should therefore avoid ranking Raptor against production GB300, MI400, Groq 3 LPX, or other shipping systems by this number alone.

## Pricing and availability

- **Public stable price:** not captured
- **Firm public production shipment date:** not captured
- **Commercial intent:** d-Matrix states that 3DIMC will debut commercially with Raptor
- **Current evidence state:** working Pavehawk test silicon + Hot Chips 2026 Raptor disclosure

## Software maturity

d-Matrix describes an open-software-first stack using PyTorch, MLIR and Triton DSL, with its Aviator software layer and chiplet/PCIe/Ethernet scaling. Production model coverage and conversion friction for Raptor still need direct measurement.

## Promotion triggers

Raptor should move from `S-potential` to a normal ranked accelerator only after several of these are available:

1. firm production card power/TDP;
2. stable list or channel pricing;
3. a firm shipment/volume-production date;
4. production memory-capacity variants;
5. independent named-model prefill/decode benchmarks;
6. multi-card scaling and usable model/KV-memory behavior;
7. a production runtime/model compatibility matrix.

## Sources

### Manufacturer

- https://www.d-matrix.ai/
- https://www.d-matrix.ai/technology/
- https://www.d-matrix.ai/announcements/d-matrix-and-alchip-announce-collaboration-on-worlds-first-3d-dram-solution-to-supercharge-ai-inference/
- https://www.d-matrix.ai/going-vertical-why-we-created-a-3d-dram-solution-to-advance-low-latency-ai-inference/
- https://www.d-matrix.ai/announcements/d-matrix-and-andes-team-on-worlds-highest-performing-most-efficient-accelerator-for-ai-inference-at-scale/

### Independent / event reporting

- https://www.tomshardware.com/tech-industry/semiconductors/d-matrix-stacks-its-ai-accelerator-directly-on-custom-dram-for-100-tbs-per-card
- https://www.hotchips.org/
