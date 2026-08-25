# AMD Instinct MI350P

Last updated: **2026-08-25**

AMD Instinct MI350P is tracked as a distinct **PCIe CDNA 4 inference accelerator**. It should not be merged with MI355X OAM modules or the newer MI400/CDNA 5 family: the form factor, memory capacity, scale-up characteristics, power envelope, and likely acquisition path are materially different.

## Why it matters for LLM inference

The MI350P combines **144 GB HBM3E** with **4 TB/s memory bandwidth** in a standard dual-slot PCIe card. That is a particularly useful combination for large quantized dense and MoE models because both model-fit capacity and autoregressive decode bandwidth are substantially above common workstation GPUs.

The card is also configurable from **600 W maximum TBP down to 450 W**, making it worth benchmarking as a performance-per-watt candidate rather than assuming the maximum-power mode is always optimal.

## Manufacturer specifications

| Field | MI350P |
|---|---:|
| Architecture | AMD CDNA 4 |
| Compute units | 128 |
| Stream processors | 8,192 |
| Matrix cores | 512 |
| Peak engine clock | 2.2 GHz |
| HBM capacity | 144 GB HBM3E ECC |
| Memory bandwidth | 4 TB/s |
| Memory interface | 4096-bit |
| Last-level cache | 128 MB |
| Peak MXFP4 matrix | 4.6 PFLOPS |
| Peak MXFP6 matrix | 4.6 PFLOPS |
| Peak MXFP8 matrix | 2.3 PFLOPS |
| Maximum TBP | 600 W |
| Configurable TBP | 450 W |
| Host interface | PCIe 5.0 x16 |
| Cooling | Passive server airflow |
| Form factor | FHFL, double-slot PCIe |

AMD also documents up to four isolated GPU partitions with **36 GB HBM3E per partition**.

## Software

AMD lists Linux x86-64 support with ROCm and common frameworks including PyTorch, TensorFlow, JAX and SGLang. For repository scoring, software maturity should be evaluated using actual ROCm/vLLM/SGLang/AIMS model coverage rather than assuming CUDA-equivalent coverage for every model.

## Deployment examples

Dell's PowerEdge XE7745 supports up to eight 600 W double-width PCIe accelerators and is one documented MI350P server platform. Dell currently exposes the platform through **Contact Sales**, so the catalog does not infer a card MSRP or representative server price.

ServeTheHome independently documented MI350P appearances in Dell, HPE and GIGABYTE systems during 2026. This is useful evidence that the card is moving into real OEM platforms, but it is not a substitute for independent LLM throughput testing.

## Benchmark evidence

AMD publishes July 2026 methodology for an **8× MI350P Dell PowerEdge XE7745** serving **Llama 3.3 70B Instruct FP8** with AIMS and ROCm 7.14.0 for token-per-dollar comparisons against NVIDIA alternatives. The currently captured source provides useful configuration detail but not a simple absolute tok/s result suitable for normalized cross-platform ranking, so this repository does **not** convert the claim into an invented throughput number.

## Pricing and availability

**Standalone public MSRP:** not captured.  
**Stable public OEM configuration price:** not captured.  
**Availability:** OEM / enterprise channel.

A third-party listing with zero stock currently displays an unusually high price, but it is not suitable as a representative market price and is therefore not promoted into normalized pricing data.

## Research priorities

1. Capture a real standalone or OEM delivered price.
2. Obtain independent Llama/Qwen/DeepSeek decode and prefill measurements.
3. Compare tokens/watt at 450 W and 600 W TBP.
4. Measure multi-card scaling over PCIe and server networking.
5. Track future secondary-market pricing because 144 GB / 4 TB/s could become unusually attractive when enterprise systems are decommissioned.

## Sources

- AMD product page: https://www.amd.com/en/products/accelerators/instinct/mi350/mi350p.html
- AMD product brochure: https://www.amd.com/content/dam/amd/en/documents/epyc-business-docs/other/amd-instinct-mi350p-product-brochure.pdf
- AMD MI350 family page: https://www.amd.com/en/products/accelerators/instinct/mi350.html
- AMD Advancing AI 2026 infrastructure analysis: https://www.amd.com/en/solutions/data-center/insights/7-takeaways-from-amd-advancing-ai-2026.html
- Dell PowerEdge XE7745: https://www.dell.com/en-ca/shop/ipovw/poweredge-xe7745
- Dell XE7745 manuals: https://www.dell.com/support/product-details/en-ca/product/poweredge-xe7745/resources/manuals
- ServeTheHome platform observation: https://www.servethehome.com/the-amd-instinct-mi350p-is-a-hbm-pcie-accelerator-that-has-been-all-over/
