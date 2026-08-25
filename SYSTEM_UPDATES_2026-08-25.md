# System updates — 2026-08-25

This maintenance note records two material system-level changes discovered from current manufacturer sources. Neither entry represents a new silicon architecture; both are tracked as variants of compute platforms already represented in the repository.

## Framework Desktop — Ryzen AI Max+ PRO 495 / 192GB

**Status:** coming soon  
**Shared compute platform:** AMD Gorgon Halo / Ryzen AI Max+ PRO 495  
**Memory:** 192GB unified LPDDR5X  
**Memory data rate:** up to LPDDR5X-8533 per AMD processor specification  
**Maximum graphics-addressable memory:** up to 160GB  
**CPU:** 16 cores / 32 threads, up to 5.2GHz boost  
**GPU:** Radeon 8065S, 40 RDNA 3.5 compute units  
**NPU:** up to 55 TOPS  
**Processor cTDP:** 45–120W

Framework's official Desktop page currently displays **“192GB coming soon.”** The captured manufacturer page does not publish a stable price or exact shipping date for this configuration, so neither is inferred from the existing 128GB model.

This is a high-priority local-LLM watch because 192GB total unified memory and up to 160GB graphics-addressable memory create a materially larger single-node model-capacity tier than current 128GB Strix Halo systems.

### Vendor and documentation

- Framework Desktop: https://frame.work/desktop
- Framework Desktop specifications: https://frame.work/desktop?tab=specs
- Framework machine-learning information: https://frame.work/desktop?tab=machine-learning
- AMD Ryzen AI Max+ PRO 495 specification: https://www.amd.com/en/products/processors/laptop/ryzen-pro/ai-max-pro-400-series/amd-ryzen-ai-max-plus-pro-495.html

### Promotion triggers

Promote from `coming_soon` when Framework publishes an orderable configuration and defensible delivered price. Also capture exact system power behavior, final memory configuration, Linux/ROCm support, and reproducible LLM prefill/decode measurements.

---

## ASUS NUC 16 Pro — memory-family correction

ASUS's official NUC 16 Pro datasheet shows that the product family has **two materially different memory paths**:

### Core Ultra X9 / X7 variants

- onboard dual-channel LPDDR5X or LPDDR5
- up to **96GB**
- Intel Arc Graphics

The existing `asus-nuc-16-pro-96gb` record remains valid for this branch of the family.

### Core Ultra 7 / 5 variants

- dual-channel **DDR5 CSO-DIMM**
- up to **128GB**
- removable/expandable memory rather than the onboard LPDDR path

Therefore, **96GB must not be treated as the maximum memory capacity for the entire NUC 16 Pro family**. A separate normalized 128GB CSO-DIMM variant has been added to `data/current_system_variants.json`.

ASUS also documents two M.2 2280 NVMe sockets — one PCIe Gen5 x4 and one PCIe Gen4 x4 — plus dual 2.5GbE, Wi-Fi 7 and Bluetooth 6.0.

### Vendor and documentation

- ASUS NUC 16 Pro product page: https://www.asus.com/ca-en/displays-desktops/nucs/nuc-mini-pcs/asus-nuc-16-pro/
- ASUS NUC 16 Pro datasheet: https://dlcdnwebimgs.asus.com/files/media/202512/61637bcb-4aaa-4a1f-a35d-ba97011a86c9/asus-nuc-16-pro-datasheet.pdf
- ASUS support: https://www.asus.com/ca-en/displays-desktops/nucs/nuc-mini-pcs/asus-nuc-16-pro/helpdesk/

## Evidence policy

Both changes are based on manufacturer sources. No price is stored where a stable configuration-specific public price was not defensibly captured, and neither system is counted as a separate silicon architecture from its underlying AMD or Intel compute platform.
