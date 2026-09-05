# Lenovo ThinkCentre X Ultra

**Status:** Announced  
**Announcement date:** 2026-09-03  
**Expected availability:** November 2026 (Lenovo announcement; regional timing may vary)  
**Tier:** S-potential  
**Compute platform:** AMD Ryzen AI Max+ PRO 495 / Gorgon Halo family

## Why it matters

ThinkCentre X Ultra is a compact 1.6 L workstation that packages AMD's high-memory Ryzen AI Max PRO platform into a business desktop form factor. Lenovo positions it for local agentic-AI development and says up to four systems can be connected in a cluster-ready architecture.

## Published specifications

- **CPU:** AMD Ryzen AI Max+ PRO 495, 16 cores / 32 threads
- **GPU:** integrated AMD Radeon 8065S, 40 graphics compute units
- **NPU:** up to 55 TOPS
- **Memory:** up to 128 GB LPDDR5X unified memory; Lenovo lists up to 8,533 MT/s
- **GPU-addressable allocation:** up to 96 GB from unified memory
- **Storage:** up to two 4 TB M.2 2280 Gen5 SSDs
- **Networking:** 10GbE, Wi-Fi 7, Bluetooth 5.4
- **I/O:** two Thunderbolt 4 ports, DisplayPort 2.1, HDMI 2.1
- **Size:** 183 × 183 × 51 mm
- **Starting weight:** 2 kg
- **Operating systems:** Windows 11, Linux AMD AI OS, Ubuntu certification

## Local-LLM relevance

The important characteristic is not the NPU TOPS figure by itself; it is the combination of 128 GB unified memory, a 40-CU integrated GPU, Linux/ROCm ecosystem access, 10GbE, and a small chassis. That makes it a plausible node for memory-heavy quantized models, model-serving pools, retrieval/agent workloads, and multi-node experiments where several independent services are distributed across systems.

Lenovo's cluster-ready claim should not be interpreted as proof of transparent unified memory or efficient single-model sharding. The announcement does not publish the interconnect topology, collective communication performance, or reproducible LLM throughput for a four-node configuration.

## Evidence and limitations

- All core specifications in this record come from Lenovo's September 3, 2026 manufacturer announcement.
- AMD's platform documentation lists up to 192 GB support for the Ryzen AI Max+ PRO 495 family, while this Lenovo system is specified at 128 GB.
- No authoritative Lenovo street price was found during the 2026-09-04 verification pass; pricing is therefore recorded as unavailable rather than estimated.
- No independent, reproducible decode/prefill benchmark or whole-system power measurement was found for this exact system.
- Treat this as an OEM system variant of the existing AMD Gorgon Halo / Ryzen AI Max PRO platform, not as a new silicon architecture.

## Sources

- Lenovo announcement: <https://news.lenovo.com/pressroom/press-releases/hybrid-ai-for-business-devices-displays-solutions/>
- AMD Ryzen AI Max PRO 400 platform information: <https://www.amd.com/en/blogs/2026/amd-powers-next-generation-agent-computers-with-new-ryzen-ai-hal.html>
