# Tenstorrent / Razer Compact AI Accelerator

Last updated: **2026-09-02**

## Summary

Tenstorrent announced a first-generation compact AI accelerator device designed with Razer at CES 2026. It is intended to attach to laptops and workstations over Thunderbolt 4 or Thunderbolt 5 and run LLMs, image-generation models and other AI/ML workloads locally.

## What is publicly established

- **Vendor:** Tenstorrent, in partnership with Razer
- **Announcement:** January 6, 2026, CES 2026
- **Host connection:** Thunderbolt 4 or Thunderbolt 5
- **Architecture family:** Tenstorrent Wormhole
- **Software direction:** Tenstorrent open-source software stack; vendor says LLM workloads are supported
- **Scaling:** up to four devices can be daisy-chained for multi-chip development / larger models
- **Pricing:** not published in the announcement
- **Availability:** not published in the announcement; Tenstorrent said more information was forthcoming

## Why it matters

This is a rare announced external accelerator aimed at ordinary developer computers rather than a PCIe server or cloud-only system. The Thunderbolt attachment model could make Tenstorrent software and Wormhole multi-chip experimentation accessible from laptops, while the four-device daisy-chain claim gives it a credible clusterability angle for edge development.

## Important limitations

The announcement does **not** publish memory capacity, memory bandwidth, power draw, device dimensions, sustained LLM tok/s, model-size limits, exact Wormhole SKU, bridge topology, supported operating systems, or a purchase price. Those fields remain unknown and are not inferred here.

## Evidence quality

- Product existence / interface / four-device scaling: **manufacturer announcement**
- Real LLM throughput: **not yet published**
- Price and practical availability: **not yet published**

## Sources

- https://tenstorrent.com/en/newsroom/tenstorrent-unveils-first-gen-compact-ai-accelerator-device
- https://github.com/tenstorrent

## Research gaps

- Final product name and exact Wormhole configuration
- On-device memory capacity and bandwidth
- Whole-device power and cooling requirements
- Linux / Windows / macOS support details
- Official order page, price and shipping regions
- Reproducible LLM benchmarks with model, quantization, context and runtime
- Multi-device scaling efficiency over the external-link topology
