# AMD Qwen3.8-27B Local Inference Evidence

Last updated: **2026-08-24**

This note tracks current Qwen3.8-27B inference evidence on AMD local-AI hardware. The purpose is to separate **software maturity and real model throughput** from synthetic TOPS figures.

## Why this matters

Qwen3.8-27B is a dense 27B model that AMD now supports on day zero through mainstream local runtimes. AMD states the model needs roughly **24 GB of VGM/VRAM** to run comfortably, putting it within reach of Ryzen AI Max+ systems and a single 32 GB Radeon AI PRO R9700.

## AMD manufacturer results

AMD published preliminary Windows results using `llama.cpp` with the Vulkan backend:

| Hardware | Runtime | MTP | Reported decode throughput |
|---|---|---:|---:|
| Ryzen AI Max+ 395 / Radeon 8060S | llama.cpp + Vulkan | 4 draft tokens | **up to 24.5 tok/s** |
| Radeon AI PRO R9700 32 GB | llama.cpp + Vulkan | 2 draft tokens | **up to 51.8 tok/s** |

AMD says the figures are average token-generation throughput across at least three runs and labels them preliminary/up-to values. The Ryzen test used a GMKtec EVO-X2 with 128 GB system memory and a 64 GB VGM allocation.

Source: https://www.amd.com/en/blogs/2026/run-qwen-3-8-27b-on-amd-ryzen-ai-max-and-radeon-graphics-cards-day-0.html

## Community Strix Halo evidence

Community testing provides useful corroboration while also showing how sensitive results are to runtime configuration.

One repeatedly measured Ryzen AI Max+ 395 / Radeon 8060S test reports:

- Q8_0 without MTP: about **7.3 tok/s** decode;
- Q8_0 with MTP: about **22.4 tok/s** decode;
- custom ROCmFP4 path: about **29.9 tok/s** decode;
- approximately **85 W package power** during the measured requests;
- three repetitions per configuration using llama.cpp timing output.

Source: https://www.reddit.com/r/StrixHalo/comments/1vsstxm/qwen3827b_benchmarks_on_strix_halo_q8_0_mtp_21_ts/

A separate public reproducibility repository documents a GMKtec EVO-X2 using Qwen3.8-27B UD-Q5_K_XL, Vulkan, full GPU offload, 128K context, embedded MTP with four draft tokens and q8_0 K/V cache for local coding-agent testing.

Source: https://github.com/erstmalreden/qwen3.8-27b-ryzen-ai-max-395-benchmarks

## Interpretation

The useful conclusion is not a single headline tok/s number. The new evidence shows:

1. **Qwen3.8-27B is a practical current workload for Strix Halo.** It no longer belongs only in theoretical model-fit estimates.
2. **MTP/speculative decoding matters materially.** Correctly configured MTP can substantially improve decode throughput on the iGPU.
3. **Runtime and quantization matter enough to prevent naive cross-result ranking.** Vulkan, stock ROCm, custom ROCmFP4, Q5 and Q8 results should remain separate observations.
4. **R9700 is much faster in AMD's current vendor comparison**, but Strix Halo offers a larger unified-memory pool and a much lower-power all-in-one system class.
5. **Prefill and long-context behavior still need more normalized testing.** Decode-only figures do not fully describe coding-agent or RAG workloads.

## Catalog policy

These results are stored in [`data/benchmark-observations-2026-08-24-amd-qwen38.json`](data/benchmark-observations-2026-08-24-amd-qwen38.json). Manufacturer and community evidence remain separately labeled. No result should be promoted into a normalized tokens/watt ranking unless wall power, quantization, context, runtime revision and generation settings are all available.
