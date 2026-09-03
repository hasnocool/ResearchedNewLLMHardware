# Acer Veriton RI110 AI Mini Workstation

## Summary

A compact Acer workstation announced on 2026-09-02 for local and hybrid AI workloads. It is notable primarily for combining up to 96 GB of LPDDR5X with Intel Arc B390 graphics, OCuLink expansion, and 10GbE/2.5GbE networking in a sub-liter-class chassis.

## Confirmed specifications

- Processor: Intel Core Ultra X7 processor 358H
- Graphics: Intel Arc B390
- Memory: up to 96 GB dual-channel LPDDR5X
- Storage: up to 4 TB M.2 2280 PCIe Gen 4 SSD
- Networking: 10GbE + 2.5GbE, Wi-Fi 7, Bluetooth 5.4
- Expansion: OCuLink, documented by Acer as PCIe 4.0 x4
- Power adapter: 120 W
- Dimensions: 138.5 x 131.3 x 52.1 mm; approximately 0.63 kg
- OS: Windows 11 Home/Pro

## LLM relevance

Acer markets support for models up to 120B parameters. This is a vendor capability statement, not a measured throughput result. With 96 GB shared system memory, the system may be useful for quantized models that exceed discrete-GPU VRAM limits, but actual decode speed will depend on Arc driver maturity, backend support, memory allocation, and whether workloads execute on GPU, NPU, or CPU.

## Software and runtime status

- Windows-first launch positioning
- Intel Arc software stack should be evaluated through the current Intel GPU compute/runtime support, OpenVINO, Vulkan and related tooling
- No reproducible LLM benchmark with model, quantization, context, runtime and wall power was found in the launch material

## Availability and pricing

- North America: expected Q4 2026
- EMEA: expected Q1 2027
- Price: not published; region and configuration dependent

## Evidence quality

- Manufacturer: Acer launch announcement and regional product page
- Unverified: 120B model-size claim as a practical throughput/capability benchmark
- Missing: independent LLM tok/s, sustained wall power, memory bandwidth, exact Arc B390 compute specifications and Linux support

## Sources

- https://news.acer.com/acer-introduces-veriton-ri110-ai-mini-workstation-for-powering-hybrid-agentic-ai-workloads
- https://www.acer.com/ca-fr/desktops-and-all-in-ones/veriton-workstations/acer-veriton-ri110-ai-mini-workstation
