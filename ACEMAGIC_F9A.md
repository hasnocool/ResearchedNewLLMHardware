# ACEMAGIC F9A

Last updated: **2026-08-22**

The **ACEMAGIC F9A** is a compact Ryzen AI Max+ 395 system variant that belongs to the existing `amd-strix-halo-ryzen-ai-max-plus-395` compute platform. It is tracked as a materially different OEM implementation, not as a new silicon architecture.

## Why it matters

The F9A combines the current Strix Halo capacity ceiling with unusually useful expansion and networking for a roughly 2 L system:

- AMD Ryzen AI Max+ 395, 16C/32T Zen 5
- Radeon 8060S / RDNA 3.5 integrated GPU
- XDNA 2 NPU, up to 50 TOPS
- vendor total-AI figure: up to 126 TOPS
- up to **128 GB LPDDR5X-8000 unified memory**
- up to **140 W** peak package-performance mode reported by ACEMAGIC
- dual M.2 PCIe 4.0 x4 NVMe slots
- **OCuLink PCIe 4.0 x4**
- **2x USB4 40 Gb/s**
- **2x 2.5GbE**
- Wi-Fi 7 + Bluetooth 5.4
- SD 4.0 / UHS-II reader
- 158 x 158 x 85 mm chassis, approximately 2 L

For local LLM work, the important properties are the 128 GB unified-memory ceiling and the ability to attach additional PCIe accelerators through OCuLink. Dual 2.5GbE is useful for small distributed experiments, although it is far below 10/25/200GbE-class cluster fabrics.

## Availability and pricing

ACEMAGIC's current product page still says **pricing and availability coming soon**. No retail price, stable launch price, or shipping date is recorded in this repository until the manufacturer or a defensible channel listing publishes one.

Do not infer the F9A price from other Ryzen AI Max+ 395 systems.

## LLM evidence

ACEMAGIC states that 128 GB configurations can run models up to the **120B-parameter class** locally. Treat that as a vendor capability claim, not a benchmark. No sufficiently specified prefill/decode result was found for the F9A itself in this maintenance pass.

Useful future evidence should include:

- exact memory allocation available to the Radeon 8060S path;
- llama.cpp / ROCm / Vulkan runtime and version;
- model and quantization;
- context length and KV-cache settings;
- prefill and decode tokens/sec;
- sustained package power and whole-system wall power;
- fan/noise behavior at long-duration inference load.

## Promotion / buying triggers

Promote the F9A from prelaunch-watch to a normal buying candidate when at least the following are known:

1. stable orderable 64/128 GB configurations;
2. delivered price by region;
3. exact storage configuration included in that price;
4. measured wall power;
5. reproducible LLM throughput;
6. Linux/ROCm compatibility details for the shipping firmware/BIOS.

## Vendor and technical sources

- Product / launch page: https://acemagic.co/pages/f9a-ai-workstation
- ACEMAGIC technical announcement: https://acemagic.net/blogs/news/official-announcement-introducing-the-acemagic-f9a-2l-flagship-mini-ai-workstation-with-amd-ryzen-ai-max-395-oculink-amp-50-tops-npu
- UK product/specification page: https://acemagic.uk/products/acemagic-minipc-f9a
- AMD Ryzen AI software documentation: https://ryzenai.docs.amd.com/en/latest/

## Evidence status

`manufacturer`

The platform specifications above come from ACEMAGIC's own product material. Price, shipping status, independent throughput, and measured wall power remain unknown rather than inferred.
