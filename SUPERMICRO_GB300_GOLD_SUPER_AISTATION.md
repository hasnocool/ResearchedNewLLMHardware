# Supermicro Gold Super AIstation GB300

**Last researched:** 2026-09-05  
**Status:** shipping / vendor-channel availability observed  
**Compute platform:** NVIDIA GB300 Grace Blackwell Ultra Desktop Superchip (shared platform; do not count as new silicon)

## Why it matters

Supermicro's Gold Super AIstation is a newly visible OEM implementation of the GB300 deskside platform. It is relevant because it turns the previously quote-led 748 GB coherent-memory class into a concrete channel-listed system with a dated numeric price observation.

## Captured configuration and evidence

- **Total coherent memory:** 748 GB
  - 252 GB HBM3e on the Blackwell Ultra GPU
  - 496 GB LPDDR5X system memory on the 72-core Grace CPU
- **Peak tensor performance:** up to 20 PFLOPS sparse FP4 (NVIDIA platform claim)
- **System power:** 1,600 W class
- **Networking:** dual 400 GbE / ConnectX-8 class networking in the reported configuration
- **Storage:** 2 × 1 TB M.2 plus 2 × 2 TB M.2 in the observed reseller configuration
- **Cooling:** direct-to-chip liquid cooling
- **Weight:** approximately 88 lb / 40 kg in secondary reporting

The capacity, architecture, and power figures are inherited from the GB300 platform record and should not be interpreted as independently measured throughput.

## Pricing observations

| Observed date | Region | Price | Stock state | Source | Evidence |
|---|---|---:|---|---|---|
| 2026-09-01 | US | **US$92,887.47** | selling / quote-to-order | [TechRadar report](https://www.techradar.com/pro/nvidia-gb300-dgx-station-desktop-pc-goes-on-sale-for-almost-usd91-100-7x-costlier-than-a-256gb-ram-mac-studio-m5-ultra-but-with-748gb-ram) | reputable secondary reporting of Supermicro launch |
| 2026-09-05 | CA | **CA$136,734** | add-to-cart / new arrival | [DirectDial Canada listing](https://www.directdial.com/ca/item/supermicro-optimized-gold-super-aistation-gb300-w-2x-1tb-m-2-2x-2t/ars-511gd-nb-lcc-01-) | reputable vendor listing; reseller MSRP and sale price |

These are dated storefront/channel observations, not normalized MSRP. Taxes, shipping, configuration, warranty, and reseller margin may materially change delivered cost.

## LLM-inference assessment

This is a **capacity-first enterprise workstation**, not a low-power or value-oriented local-inference purchase. Its main advantage is fitting very large models in one coherent memory domain while retaining CUDA, TensorRT, PyTorch, and NVIDIA's broader software ecosystem. Its main disadvantages are acquisition cost, 1.6 kW-class power, liquid-cooling complexity, and poor suitability for ordinary home or small-office deployment.

No independently reproducible, model-specific tok/s benchmark was located in this maintenance pass. Keep any vendor claims separate from normalized comparisons.

## Authoritative and technical links

- [NVIDIA DGX Station / GB300](https://www.nvidia.com/en-us/products/workstations/dgx-station/)
- [NVIDIA DGX Station development guide](https://docs.nvidia.com/dgx/dgx-station-development-guide/Intro.html)
- [Supermicro product family](https://www.supermicro.com/en/products/system/ai)

## Data-quality notes

- This is an OEM/system-variant record under the existing GB300 platform, not a new accelerator architecture.
- The US and Canadian prices are preserved as separate historical observations because they differ by region, configuration and reseller.
- No missing price, bandwidth, or benchmark field has been inferred beyond the shared GB300 platform record.
