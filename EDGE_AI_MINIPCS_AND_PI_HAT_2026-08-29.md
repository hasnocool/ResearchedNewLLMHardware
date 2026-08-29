# Edge AI Mini PCs and Raspberry Pi GenAI HAT — 2026-08-29

This slice adds three current edge-oriented platforms that were not present in the repository search before insertion:

- **ASUS ExpertCenter PN55** — Ryzen AI 400 series mini PC platform with up to 55 vendor TOPS from the XDNA2 NPU. The announcement does not publish a verified public MSRP or complete-system wall-power measurement, so those fields remain unknown.
- **GIGABYTE BRIX Mainstream GB-BRU9-386H** — 0.46 L, 35 mm compact system based on Intel Core Ultra Series 3 with up to 50 vendor TOPS NPU performance. The announcement does not publish a verified public MSRP or complete-system wall-power measurement.
- **Raspberry Pi AI HAT+ 2** — Raspberry Pi 5 add-on board using Hailo-10H, with 8 GB on-board accelerator memory, a 40-TOPS vendor rating and an approximately 3 W board power limit. The price observation is for the add-on board only; the Raspberry Pi 5 host and peripherals are additional.

## Evidence and caveats

Vendor TOPS values are architecture-level claims, not direct LLM token-generation measurements. The Hailo-10H path uses compiled model artifacts and supported runtime tooling; arbitrary GGUF/GPTQ/AWQ models should not be assumed to run unchanged. Similarly, Ryzen AI and Intel NPU support depends on framework/runtime coverage and model conversion.

Power comparisons should not mix the AI HAT+ 2 board power limit with complete-system power. For PN55 and BRIX, the repository records platform positioning but does not invent a TDP or wall-power number that the cited announcements do not provide.

## Sources

- ASUS announcement: https://press.asus.com/news/press-releases/expertcenter-pn55-mini-pc-ryzen-ai-copilot-plus/
- GIGABYTE announcement: https://www.gigabyte.com/press/news/2396
- Raspberry Pi AI HAT+ 2 product page: https://www.raspberrypi.com/products/ai-hat-plus-2/
- Raspberry Pi AI HAT+ 2 announcement: https://www.raspberrypi.com/news/ai-hat-plus-2/
