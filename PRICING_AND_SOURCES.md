# Pricing, Vendor URLs, and Technical Documentation

Last updated: **2026-08-21**

This page is the human-readable buying and documentation index for the hardware catalog. The machine-readable data is split by platform family under `data/`.

> Prices are point-in-time observations. Always compare currency, region, exact RAM/storage configuration, tax, shipping, stock state, warranty, and seller condition. A missing price means no defensible public price was found; it does not mean the hardware is free.

## Price types

- `msrp` — manufacturer-published suggested price.
- `vendor_store` — current manufacturer storefront price.
- `vendor_sale` — temporary or discounted storefront price.
- `observed_new` — dated price from a third-party new-hardware vendor.
- `observed_used` — dated secondary-market price.
- `quote_only` — sold through partners/distributors without a stable public price.
- `unavailable` — no defensible public price captured yet.

## Current systems and accelerator cards

| Hardware | Price observed | Availability | Vendor / buy | Technical documentation |
|---|---:|---|---|---|
| NVIDIA DGX Spark | **US$4,699 MSRP** | Available | [NVIDIA product](https://www.nvidia.com/en-us/products/workstations/dgx-spark/) | [User guide](https://docs.nvidia.com/dgx/dgx-spark/) · [Hardware guide](https://docs.nvidia.com/dgx/dgx-spark/hardware.html) · [UEFI guide](https://docs.nvidia.com/dgx/dgx-spark-uefi/) |
| ASUS Ascent GX10 | **US$3,999** / **CA$5,499** | Available; stock varies by region/channel | [US buy](https://www.asus.com/us/networking-iot-servers/desktop-ai-supercomputer/ultra-small-ai-supercomputers/asus-ascent-gx10/where-to-buy/) · [Canada buy](https://www.asus.com/ca-en/networking-iot-servers/desktop-ai-supercomputer/ultra-small-ai-supercomputers/asus-ascent-gx10/where-to-buy/) | [Technical specs](https://www.asus.com/us/networking-iot-servers/desktop-ai-supercomputer/ultra-small-ai-supercomputers/asus-ascent-gx10/techspec/) · [Manuals](https://www.asus.com/ca-en/networking-iot-servers/desktop-ai-supercomputer/ultra-small-ai-supercomputers/asus-ascent-gx10/helpdesk_manual?model2Name=ASUS-Ascent-GX10) · [Drivers / DGX OS](https://www.asus.com/us/networking-iot-servers/desktop-ai-supercomputer/ultra-small-ai-supercomputers/asus-ascent-gx10/helpdesk_download?model2Name=ASUS-Ascent-GX10) |
| HP ZGX Nano G1n | Store/configuration dependent | Available regionally | [HP store](https://www.hp.com/us-en/shop/slp/hp-workstations/zgx-nano) | [HP QuickSpecs](https://h20195.www2.hp.com/v2/GetDocument.aspx?docname=c09212373) |
| Lenovo ThinkStation PGX 30KL0002US | **US$5,849 observed** | Orderable; Lenovo dynamic pricing varies | [Lenovo product](https://www.lenovo.com/ca/en/p/workstations/thinkstation-p-series/Lenovo-ThinkStation-PGX-SFF/30kl0002us) | [Product/spec page](https://www.lenovo.com/ca/en/p/workstations/thinkstation-p-series/Lenovo-ThinkStation-PGX-SFF/30kl0002us) |
| Minisforum MS-S1 MAX 128GB + 2TB | **US$3,639** / about **CA$5,241.44** observed | Orderable when checked | [US store](https://store.minisforum.com/products/minisforum-ms-s1-max-mini-pc) · [Canada store](https://store.minisforum.com/en-ca/products/minisforum-ms-s1-max-mini-pc) | [Product/specification](https://www.minisforum.com/products/ms-s1-max) · [AMD Ryzen AI docs](https://ryzenai.docs.amd.com/en/latest/) |
| Minisforum N5 MAX 64GB | **US$2,599** / **CA$3,560.90** observed | US orderable; Canadian listing observed sold out | [US store](https://store.minisforum.com/products/minisforum-n5-max-ai-nas) · [Canada store](https://ca.minisforum.com/products/minisforum-n5-max-ai-nas) | [Product specification](https://store.minisforum.com/products/minisforum-n5-max-ai-nas) · [AMD Ryzen AI docs](https://ryzenai.docs.amd.com/en/latest/) |
| Minisforum N5 MAX 128GB | **US$3,999** | Listed but out of stock when checked | [US store](https://store.minisforum.com/products/minisforum-n5-max-ai-nas) | [Product specification](https://store.minisforum.com/products/minisforum-n5-max-ai-nas) |
| Qualcomm Dragonwing IQ-9075 EVK | No stable public price captured | Available via Qualcomm/channel buy path | [Qualcomm EVK](https://www.qualcomm.com/developer/hardware/qualcomm-iq-9075-evaluation-kit-evk) · [IQ-9075 platform](https://www.qualcomm.com/internet-of-things/products/iq9-series/iq-9075) | [IQ-9075 module brief](https://docs.qualcomm.com/doc/87-97354-1/87-97354-1_REV_C_Qualcomm_Dragonwing_IQ-9075_Module_Product_Brief.pdf) · [IQ9 product brief](https://docs.qualcomm.com/doc/87-83840-1/87-83840-1_REV_A_Qualcomm_IQ9_Series_Product_Brief.pdf) |
| Qualcomm Dragonwing IQ-8275 EVK | No stable public price captured | Available via Qualcomm/channel buy path | [Qualcomm EVK](https://www.qualcomm.com/developer/hardware/qualcomm-iq-8275-evaluation-kit-evk) · [IQ-8275 platform](https://www.qualcomm.com/internet-of-things/products/iq8-series/iq-8275) | [IQ-8275 platform documentation](https://www.qualcomm.com/internet-of-things/products/iq8-series/iq-8275) |
| Arduino VENTUNO Q | No defensible public price captured | Announced/channel availability developing | [Qualcomm developer hardware](https://www.qualcomm.com/developer/hardware) · [Qualcomm IoT developer page](https://www.qualcomm.com/developer/iot) | [IQ-8275 platform documentation](https://www.qualcomm.com/internet-of-things/products/iq8-series/iq-8275) |
| Tenstorrent Wormhole n150s | **US$999** | In stock when checked | [Tenstorrent cards](https://tenstorrent.com/hardware/cards) | [Wormhole specifications](https://docs.tenstorrent.com/docs-test/core/latest/aibs/wormhole/specifications.html) |
| Tenstorrent Wormhole n150d | **US$1,099** | In stock when checked | [Tenstorrent cards](https://tenstorrent.com/hardware/cards) | [Wormhole specifications](https://docs.tenstorrent.com/docs-test/core/latest/aibs/wormhole/specifications.html) |
| Tenstorrent Wormhole n300s | **US$1,399** | In stock when checked | [Tenstorrent cards](https://tenstorrent.com/hardware/cards) | [Wormhole specifications](https://docs.tenstorrent.com/docs-test/core/latest/aibs/wormhole/specifications.html) |
| Tenstorrent Wormhole n300d | **US$1,449** | In stock when checked | [Tenstorrent cards](https://tenstorrent.com/hardware/cards) | [Wormhole specifications](https://docs.tenstorrent.com/docs-test/core/latest/aibs/wormhole/specifications.html) |
| Lucebox R9700 + Strix Halo | **US$6,499** launch price; vendor states **US$7,900** afterward | Limited | [Lucebox](https://www.lucebox.com/) | [DeepSeek V4 heterogeneous benchmark](https://www.lucebox.com/blog/deepseek-v4-asymmetric-parallelism) |
| NYMPH AX1 | **US$1,190 vendor claim** | Experimental/watch | [NYMPH](https://nymphtech.com/) | Public technical detail currently limited to vendor material |
| AMD Instinct MI210 | Secondary-market variable | Used/refurbished market | [AMD product](https://www.amd.com/en/products/accelerators/instinct/mi200/mi210.html) | [MI210 product brief](https://www.amd.com/content/dam/amd/en/documents/instinct-business-docs/product-briefs/instinct-mi210-brochure.pdf) · [ROCm docs](https://rocm.docs.amd.com/) |
| ASUS NUC 16 Pro | Configuration/channel dependent | Available | [ASUS product](https://www.asus.com/ca-en/displays-desktops/nucs/nuc-mini-pcs/asus-nuc-16-pro/) | [ASUS support](https://www.asus.com/ca-en/displays-desktops/nucs/nuc-mini-pcs/asus-nuc-16-pro/helpdesk/) · [OpenVINO docs](https://docs.openvino.ai/) |

## Announced / future hardware

| Hardware | Pricing status | Vendor / product | Technical documentation |
|---|---|---|---|
| Qualcomm Dragonfly AI200 | Contact sales; no stable public numeric price captured | [AI200 product](https://www.qualcomm.com/data-center/products/qualcomm-dragonfly-ai200) | [AI200 rack/infrastructure note](https://www.qualcomm.com/news/onq/2026/03/ai-inference-that-scales-qualcomm-ai200-infrastructure-management-suite) · [AI accelerator overview](https://www.qualcomm.com/data-center/expertise/ai-accelerators) |
| Qualcomm Dragonfly AI250 | Not public; commercial HBC Gen 1 sampling expected mid-2027 | [AI250 product](https://www.qualcomm.com/data-center/products/qualcomm-dragonfly-ai250) | [Dragonfly roadmap announcement](https://www.qualcomm.com/news/releases/2026/06/qualcomm-unveils-comprehensive-data-center-roadmap-for-the-agent) · [Investor Day data-center deck](https://www.qualcomm.com/content/dam/qcomm-martech/dm-assets/documents/Investor-Day-2026_TPialis_Data-Center.pdf) |
| Qualcomm Dragonfly AI300 | Not public; commercial sampling expected 2028 | [AI300 product](https://www.qualcomm.com/data-center/products/qualcomm-dragonfly-ai300) | [Dragonfly roadmap announcement](https://www.qualcomm.com/news/releases/2026/06/qualcomm-unveils-comprehensive-data-center-roadmap-for-the-agent) · [AI accelerator overview](https://www.qualcomm.com/data-center/expertise/ai-accelerators) |
| AMD Ryzen AI Max PRO 400 Series | Not yet public; OEM-system pricing pending | [AMD announcement](https://www.amd.com/en/blogs/2026/amd-powers-next-generation-agent-computers-with-new-ryzen-ai-hal.html) | [Ryzen AI software](https://ryzenai.docs.amd.com/en/latest/) |
| AMD Kria AI SOM / Ryzen AI Embedded X100 | Partner / quote based | [Kria AI SOM](https://www.amd.com/en/products/system-on-modules/kria/ai.html) · [Kria portfolio](https://www.amd.com/en/products/system-on-modules/kria.html) | [Ryzen AI Embedded X100](https://www.amd.com/en/products/embedded/ryzen-ai/x100-advantage.html) · [Ryzen AI software](https://ryzenai.docs.amd.com/en/latest/) |
| NVIDIA Jetson T3000 | No public retail price yet; planned Q1 2027 | [NVIDIA announcement](https://blogs.nvidia.com/blog/jetson-thor-robotics-edge-ai-agent/) | [Jetson documentation](https://docs.nvidia.com/jetson/index.html) |
| NVIDIA Jetson T2000 | No public retail price yet; planned Q1 2027 | [NVIDIA announcement](https://blogs.nvidia.com/blog/jetson-thor-robotics-edge-ai-agent/) | [Jetson documentation](https://docs.nvidia.com/jetson/index.html) |

## Adaptive SoC / FPGA hardware

| Hardware | Pricing status | Vendor / product | Technical documentation |
|---|---|---|---|
| AMD Versal AI Edge Series Gen 2 | SKU / distributor / volume quote dependent | [AMD product](https://www.amd.com/en/products/adaptive-socs-and-fpgas/versal/ai-edge-series-gen-2.html) | [AM026 technical reference manual](https://docs.amd.com/r/en-US/am026-versal-ai-edge-prime-gen2-trm) · [DS1021 DC/AC data sheet](https://docs.amd.com/r/en-US/ds1021-versal-ai-edge-gen2) · [AM027 AIE-ML v2 architecture](https://docs.amd.com/r/en-US/am027-versal-aie-ml-v2) |
| Altera FPGA AI Suite / Agilex ecosystem | Board/device/license dependent | [FPGA AI Suite](https://www.altera.com/products/development-tools/fpga-ai-suite) | [FPGA AI Suite](https://www.altera.com/products/development-tools/fpga-ai-suite) |

## Important pricing notes

### Qualcomm Dragonfly pricing

All three Dragonfly generations are sales-led and no stable public numeric card/rack price was captured in this pass. AI200 is the near-term platform with deployments beginning in 2026; AI250 and AI300 remain forward-looking. Do not infer pricing from Cloud AI 100 or other Qualcomm accelerator families.

### Qualcomm Dragonwing pricing

Qualcomm exposes current EVK buy paths, but this pass did not find a stable public numeric price that could be recorded defensibly for IQ-9075 or IQ-8275. These entries remain `no_stable_public_price_captured`; future maintenance should promote a price only when the exact EVK/module, currency, region, stock state and seller can be dated.

### DGX Spark price change

NVIDIA increased the DGX Spark Founders Edition MSRP from **US$3,999 to US$4,699** in February 2026. This is a good example of why this repository stores `observed_at` and `kind` instead of treating a price as an immutable hardware specification.

### Regional prices must not be mixed

ASUS currently exposes GX10 pricing in both USD and CAD. Minisforum also has materially different regional storefront numbers. The scoring layer should convert currencies using a dated FX observation rather than simply comparing the numeric values.

### Used accelerators need price history

Cards such as MI210 can become exceptional LLM values when decommissioned hardware reaches the secondary market, but their useful price is not an MSRP. Used observations should eventually include seller or marketplace, condition, tested state, cooling hardware, shipping, region, observation date, quantity, and sold/listed status.

## Price-history format

The append-only `data/price-history.jsonl` layer is intended to preserve historical observations rather than overwrite them. New observations should include hardware ID, timestamp, amount, currency, region, kind, condition, availability, vendor, URL, shipping and notes whenever those fields are known.
