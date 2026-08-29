# Edge AI refresh — 2026-08-29

## Raspberry Pi AI HAT+ 2

Raspberry Pi's current product page lists the AI HAT+ 2 at **US$200** as of 2026-08-29. Earlier launch coverage listed **US$130** on 2026-01-15. Both values are retained as dated observations because channel, region, tax, and launch pricing can change. The durable hardware record remains the same: Hailo-10H accelerator, 8 GB on-board memory, 40 TOPS (INT4 vendor figure), and approximately 3 W add-on board power.

The current official documentation also makes the physical constraints clearer: the board is approximately 66 x 56.5 mm and approximately 14 mm high with the supplied heatsink. It requires a Raspberry Pi 5 host and should be treated as a compiled-artifact edge accelerator rather than a generic GPU for arbitrary model files.

## AMD Ryzen AI Max+ 395 benchmark observation

AMD's 2026-08-14 Qwen 3.8 27B page documents a current benchmark configuration using a GMKtec EVO X2 AI Mini PC with Ryzen AI Max+ 395, 128 GB system memory, 64 GB virtual graphics memory, Windows 11 Pro 25H2, Vulkan, llama.cpp, and MTP=4. The accessible public result context did not expose the numeric token-generation result, so this repository records the configuration and provenance without fabricating throughput.

## Interpretation

The Raspberry Pi AI HAT+ 2 remains a strong ultra-low-power edge option for supported GenAI and multimodal artifacts, but its practical model coverage depends on Hailo's supported compiler/runtime path. The AMD benchmark entry is useful for future trend tracking, while remaining explicitly incomplete until the numeric result table is available.
