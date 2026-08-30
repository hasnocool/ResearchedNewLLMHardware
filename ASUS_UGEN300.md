# ASUS UGen300 USB / M.2 AI Accelerator

Last updated: **2026-08-29**

## Summary

ASUS UGen300 is a host-attached edge AI accelerator family based on the Hailo-10H. It is relevant to low-power local inference because it adds dedicated accelerator memory and GenAI support to systems that lack a useful NPU/GPU, including older laptops, SBCs and compact x86 hosts.

## Hardware

- **Accelerator:** Hailo-10H
- **Peak AI compute:** 40 TOPS (vendor INT4 claim)
- **Dedicated memory:** 8GB LPDDR4
- **Form factors:** USB-C device and M.2 variant
- **Host compatibility:** Windows, Linux and Android
- **Frameworks:** TensorFlow, PyTorch and ONNX; Hailo GenAI runtime path
- **Target workloads:** LLMs, VLMs and classic edge AI

## LLM relevance

The 8GB dedicated memory is useful for small quantized models and for keeping inference memory pressure off the host. It should not be compared directly with unified-memory systems because the accelerator is host-attached and model/runtime support is more constrained.

## Availability and price

ASUS announced UGen300 on **2026-04-01**. No defensible current public retail price was captured in this run; pricing remains `unknown` until a stable manufacturer or reputable reseller listing is found.

## Evidence and limitations

All hardware and compatibility claims in this file are manufacturer evidence. The 40-TOPS figure is not a normalized LLM throughput metric. Independent decode benchmarks, sustained power, host-bus overhead and supported-model coverage remain open research items.

## Sources

- Product announcement: https://press.asus.com/news/press-releases/asus-ugen300-usb-ai-accelerator-generative-ai-edge/
- ASUS product family: https://www.asus.com/networking-iot-servers/ai-accelerator/
- Hailo-10H documentation: https://hailo.ai/products/ai-accelerators/hailo-10h/
