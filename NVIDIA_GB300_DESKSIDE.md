# NVIDIA GB300 Deskside AI Systems

Last updated: **2026-08-22**

This page tracks the **NVIDIA GB300 Grace Blackwell Ultra Desktop** compute platform and OEM deskside systems built on it. OEM systems are treated as variants of one shared compute architecture, not as independent silicon families.

## Platform

NVIDIA's current DGX Station specification exposes a much more complete picture than the earlier announcement-only material:

- **CPU:** NVIDIA Grace, 72 Arm Neoverse V2 cores
- **GPU:** NVIDIA Blackwell Ultra
- **GPU memory:** 252 GB HBM3e at **7.1 TB/s**
- **CPU memory:** 496 GB LPDDR5X at **396 GB/s**
- **Total coherent memory:** **748 GB**
- **NVLink-C2C:** **900 GB/s**
- **FP4 Tensor Core:** up to **20 PFLOPS sparse / 15 PFLOPS dense**
- **FP8 / FP6 Tensor Core:** 10 PFLOPS
- **FP16 / BF16 Tensor Core:** 5 PFLOPS
- **Networking:** ConnectX-8, up to **800 Gb/s**
- **Reference total system power:** **1,600 W**
- **Reference storage:** four M.2 Gen5 slots
- **MIG:** up to seven instances
- **Vendor model-capacity claim:** models up to 1 trillion parameters

The capacity is split across a 252 GB high-bandwidth GPU domain and 496 GB CPU-memory domain but exposed as a coherent CPU/GPU memory architecture. That makes GB300 materially different from simply adding separate host RAM to a conventional discrete GPU.

## NVIDIA DGX Station

**Status:** orderable through NVIDIA partner channels as of 2026-08-22.  
**OS:** Ubuntu with NVIDIA AI Developer Tools.  
**Price:** quote / partner channel; no stable public numeric NVIDIA reference-system price captured in this pass.

NVIDIA now labels DGX Station **Order Now**, so it should no longer be represented as generally unavailable. The earlier **DGX Station for Windows** announcement remains a separate Q4 2026 software/OS variant.

Useful documentation:

- https://www.nvidia.com/en-us/products/workstations/dgx-station/
- https://docs.nvidia.com/dgx/dgx-station-development-guide/Intro.html
- https://docs.nvidia.com/dgx/dgx-station-development-guide/index.html

## ASUS ExpertCenter Pro ET900N G3

**Status:** ASUS states it is available to order worldwide.  
**Pricing:** quote-only in the captured manufacturer material.

ASUS publishes:

- 748 GB coherent memory
- 496 GB LPDDR5X CPU memory at 396 GB/s
- 252 GB HBM3e GPU memory at 7.1 TB/s
- 1,600 W Titanium ATX PSU
- up to four M.2 NVMe drives / up to 8 TB in the current datasheet
- 10GbE, management Ethernet and two ConnectX-8 NIC ports
- 232 × 584 × 565 mm chassis, 27 kg

Sources:

- https://www.asus.com/rs-en/displays-desktops/workstations/performance/expertcenter-pro-et900n-g3/techspec/
- https://press.asus.com/news/press-releases/asus-expertcenter-pro-et900n-g3-nvidia-gb300-blackwell/
- https://dlcdnwebimgs.asus.com/files/media/235482bc-bbbe-4347-b7e9-0969da7f8268/asus-expertcenter-pro-et900n-g3-datasheet.pdf

## Dell Pro Max with GB300

**Model:** FCT6263  
**Status:** shipping / call-to-order depending region.

Dell publishes a 748 GB coherent-memory configuration using 496 GB LPDDR5X plus 252 GB HBM3e. The U.S. product page currently exposes a 16 TB reference storage configuration (4 × 4 TB Gen4 SSDs) and an optional RTX PRO 2000 Blackwell card.

### Canadian storefront observation

Dell Canada's storefront displayed **CA$372,895.28** for the indexed configurable system on 2026-08-22. This is an unusually high dynamic storefront figure, so the catalog records it as a dated manufacturer-store observation rather than interpreting it as GB300 MSRP or a representative market price.

Sources:

- https://www.dell.com/en-us/shop/cty/pdp/spd/dell-pro-max-fct6263-desktop
- https://www.dell.com/en-ca/shop/dell-desktops-workstations/dell-pro-max-with-gb300/spd/dell-pro-max-fct6263-desktop/xcto_fct6263_cax
- https://www.dell.com/en-us/dt/corporate/newsroom/announcements/detailpage.press-releases~usa~2026~03~dell-technologies-first-to-ship-nvidia-gb300-desktop-for-autonomous-ai-agents-with-nvidia-openshell.htm

## HP ZGX Fury

**Status:** pre-order / notify-me as of 2026-08-22.  
**Pricing:** no stable public numeric price captured.

HP publishes the same core GB300 memory split—496 GB LPDDR5X plus 252 GB HBM3e—and positions ZGX Fury for production inference, frontier-scale agents and multi-user on-prem serving. HP also includes its ZGX Toolkit on top of the NVIDIA software stack.

Sources:

- https://www.hp.com/us-en/workstations/ai-stations.html
- https://www.hp.com/us-en/newsroom/blogs/2026/unlock-ai-with-zgx-fury.html

## LLM relevance

GB300 is primarily a **capacity and software-maturity reference platform**, not a low-power recommendation. A 1,600 W reference system is far outside the compact/off-grid class represented by GB10, Apple Silicon or Strix Halo. Its value is that a single deskside node can host model sizes, long contexts and concurrent services that would otherwise require multiple accelerator cards or servers.

For ranking, prioritize:

1. real decode and prefill results on named 100B–1T-class models;
2. wall-power measurements under representative inference loads;
3. how runtimes place weights and KV cache between HBM3e and LPDDR5X;
4. two-node scaling over ConnectX-8;
5. delivered OEM pricing and support.

Structured records are in [`data/nvidia_gb300_deskside.json`](data/nvidia_gb300_deskside.json).
