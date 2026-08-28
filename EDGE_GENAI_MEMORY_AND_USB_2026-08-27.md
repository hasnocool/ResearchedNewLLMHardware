# Edge GenAI Memory and USB Accelerators — 2026-08-27

This research pass adds two categories that were underrepresented in the catalog: extremely low-power attachable GenAI accelerators and removable/embedded high-bandwidth memory built specifically for local AI systems.

## ASUS UGen300 USB / M.2 8GB

ASUS UGen300 uses the Hailo-10H accelerator with 8GB LPDDR4-4266 dedicated memory. Both the USB and M.2 variants are rated at 40 INT4 TOPS / 20 INT8 TOPS and 2.5W typical device power.

The USB model uses USB 3.1 Gen 2 Type-C at 10Gbps and measures 105 × 50 × 18mm. The M.2 version uses PCIe 3.0 x4 in a 2280 Key-M module. Both support x86 and Arm hosts and Hailo's Windows/Linux/Android software ecosystem.

The important LLM caveat is that these are not generic CUDA/Vulkan/GGUF devices. Hailo's practical path uses HailoRT, Dataflow Compiler, compiled HEF artifacts and Hailo-Ollama. Current Hailo model-zoo LLMs commonly use A8W4-style quantization.

Hailo publishes useful reference evidence for the underlying Hailo-10H platform:

| Model | Quantization | Context | Decode | Accelerator power | Evidence |
|---|---|---:|---:|---:|---|
| Qwen2-1.5B-Instruct | 4-bit group-wise weights, 8-bit activations/KV | 2048 | 9.45 tok/s | 2.1W average | Hailo manufacturer benchmark |
| Llama 3.2 1B Instruct | A8W4 | 2048 | 9.89 tok/s | not stated on model page | Hailo manufacturer benchmark |

These figures are **not claimed as measured ASUS UGen300 USB results**. USB transport, host software and integration can affect end-to-end performance.

Current Taiwan observations on 2026-08-27 were NT$6,380 for the USB 8GB version and NT$5,880 for the M.2 8GB version. Regional availability remains uneven.

## Longsys AIDIMM 128GB

AIDIMM is not an accelerator. It is a removable AI-oriented LPDDR5X memory module designed for compatible agent/AI host motherboards.

Longsys specifies:

- up to 128GB per module;
- native 256-bit width;
- up to 307.2GB/s bandwidth;
- four LPDDR5X packages on a single-sided module;
- dynamic 0.9–1.05V operation;
- FDVFS power tuning.

Longsys says a single module can support 70B+ edge LLMs. This is retained as a vendor claim. Capacity and bandwidth only determine whether a model can fit and how quickly weights can be supplied; actual token generation depends on the attached CPU/GPU/NPU and software stack.

AIDIMM should **not** be described as a normal JEDEC DDR5 DIMM. Motherboard compatibility must be confirmed per platform.

## Longsys AILPBGA 24–64GB

AILPBGA is a soldered/package-level high-bandwidth memory device for compact embedded AI systems rather than a replaceable module.

Longsys specifies:

- 24GB to 64GB capacity;
- 256-bit native width;
- up to 307GB/s bandwidth;
- 22 × 22mm package;
- LPDDR-compatible system integration;
- low-power positioning, but no defensible public wattage yet.

This is potentially useful for embedded local LLM hardware because it offers much more bandwidth than conventional narrow LPDDR implementations while retaining a compact form factor. No standalone compute is included, so framework and quantization support depend entirely on the host platform.

## Practical ranking

For an already-owned x86/Arm host that only needs small compiled LLM/VLM acceleration, UGen300 is the practical product today because it is shipping and has measurable Hailo-10H model evidence. Its 2.5W typical accelerator power makes it especially interesting for always-on and off-grid nodes.

AIDIMM is the more important architecture to watch for larger local models. A removable 128GB / 307.2GB/s memory module could make high-capacity agent systems easier to service and upgrade, but today it remains an OEM/platform technology with no public unit price and no universal host compatibility.

AILPBGA is the embedded counterpart: potentially excellent for compact 24–64GB AI systems, but it is a component for system designers rather than an end-user upgrade.

## Sources

- ASUS UGen300 technical specifications: https://www.asus.com/ca-fr/motherboards-components/ai-accelerator/ugen/ugen300-usb-8g/techspec/
- ASUS UGen300 announcement: https://press.asus.com/news/press-releases/asus-ugen300-usb-ai-accelerator-generative-ai-edge/
- Hailo Hailo-10H LLM deployment details: https://hailo.ai/blog/bringing-generative-ai-to-the-edge-llm-on-hailo-10h/
- Hailo Llama 3.2 1B model evidence: https://hailo.ai/products/hailo-software/model-explorer/generative-ai/llama3-2-1b-instruct/
- Longsys AIDIMM / AILPBGA announcement: https://cn.longsys.com/about/news/13961.html
- Taiwan UGen300 market observation: https://www.coolpc.com.tw/tw/shop/usbmachine/asus-ugen300-ai/
