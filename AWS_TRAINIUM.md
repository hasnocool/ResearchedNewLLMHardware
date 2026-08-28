# AWS Trainium3 and Trainium4

Last updated: **2026-08-28**

AWS Trainium is a cloud-only accelerator family rather than hardware that can normally be purchased as a standalone PCIe card. It still belongs in this catalog because it is purpose-built for large-model training and inference, exposes unusually large HBM capacity and scale-up fabrics, and is directly relevant to distributed LLM token economics.

## Trainium3 — current baseline

**Status:** generally available through Amazon EC2 Trn3 UltraServers  
**Process:** 3 nm AWS AI silicon  
**Per-chip FP8 compute:** 2.52 PFLOPS  
**Per-chip memory:** 144 GB HBM3e  
**Per-chip memory bandwidth:** 4.9 TB/s  
**UltraServer scale:** up to 144 Trainium3 chips  
**Maximum UltraServer HBM:** 20.7 TB aggregate  
**Maximum UltraServer aggregate memory bandwidth:** 706 TB/s  
**Scale-up:** NeuronSwitch-v1 / NeuronLink-v4, with AWS documenting 2 TB/s per-chip interconnect bandwidth  
**Software:** AWS Neuron, native PyTorch integration, JAX, Hugging Face Optimum Neuron, NxD Inference / vLLM-oriented inference paths, SageMaker, EKS, ECS, AWS Batch and ParallelCluster

AWS reports up to **4.4x higher performance**, **3.9x higher memory bandwidth at the UltraServer level**, and **more than 4x better performance per watt** than Trn2 UltraServers. AWS also reports that, on Amazon Bedrock, Trainium3 can deliver up to **3x Trainium2 performance** and **more than 5x output tokens per megawatt at similar per-user latency**. These are manufacturer comparisons and should not be treated as independent cross-platform tokens/watt measurements.

### Why Trainium3 matters for LLM inference

A single chip's 144 GB HBM3e capacity and 4.9 TB/s bandwidth make Trainium3 interesting even before scale-out. At UltraServer scale, the system is designed around trillion-parameter dense/MoE models, extended contexts and high-throughput serving. The main limitation for this repository is acquisition model: users consume Trainium3 through AWS rather than buying a card for a local workstation.

### Pricing

No standalone hardware price is applicable. EC2 pricing is service-, region-, commitment- and configuration-dependent, so this repository does not assign a fabricated per-chip purchase price. Cloud pricing observations should be captured separately when a stable, directly comparable Trn3 instance price is available for a named region and tenancy model.

## Trainium4 — announced next generation

**Status:** announced / expected to begin delivery in 2027  
**Final HBM capacity:** not yet publicly specified  
**Final memory bandwidth:** not yet publicly specified  
**Final chip power:** not yet publicly specified  
**Pricing:** not public

AWS previously disclosed design targets of at least:

- **6x Trainium3 FP4 processing performance**;
- **3x Trainium3 FP8 processing performance**;
- **4x Trainium3 memory bandwidth**;
- NVIDIA **NVLink Fusion** support for heterogeneous rack-scale integration.

On **2026-08-26**, NVIDIA and AWS disclosed an additional material architectural change: Annapurna Labs is adopting NVIDIA **NVHBM** for next-generation Trainium infrastructure. NVIDIA says NVHBM integrates a custom base die, memory controller and PHY and can provide, relative to standard HBM4e, up to:

- **30% higher memory bandwidth**;
- **15% lower HBM power**;
- **25% more compute-die area** through I/O-area savings;
- **30% higher end-to-end XPU performance** in NVIDIA's cited design analysis.

These NVHBM percentages are NVIDIA platform claims and are not yet measured Trainium4 production results. Do not derive a final Trainium4 HBM capacity, bandwidth or power figure from them until AWS publishes the shipping implementation.

## Evidence and ranking rules

Trainium3 can be ranked as a **mature cloud/distributed accelerator** because hardware and software are generally available. Trainium4 remains **high-priority watch / announced**.

Do not compare Trainium's aggregate UltraServer bandwidth with a single GPU or single-card bandwidth without clearly labeling scale. Likewise, do not compare AWS tokens-per-megawatt claims directly with independent wall-power benchmarks unless workload, model, precision, batch, latency target and system boundary are equivalent.

## Promotion / watch triggers

Track:

- final Trainium4 HBM capacity and physical bandwidth;
- final Trainium4 chip and system power;
- exact NVHBM implementation details and production measurements;
- Trainium4 instance/UltraServer availability and pricing;
- named-model prefill/decode results with context, batch and precision;
- independent tokens/sec/watt and tokens/dollar comparisons;
- Neuron/vLLM model coverage and conversion friction;
- heterogeneous Trainium + NVIDIA GPU behavior over NVLink Fusion.

## Official sources

- AWS Trainium: https://aws.amazon.com/ai/machine-learning/trainium/
- Amazon EC2 Trn3 UltraServers: https://aws.amazon.com/ec2/instance-types/trn3/
- AWS Trainium3 announcement: https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-ec2-trn3-ultraservers/
- AWS Trainium3 / Trainium4 roadmap: https://www.aboutamazon.com/news/aws/trainium-3-ultraserver-faster-ai-training-lower-cost
- AWS Neuron documentation: https://awsdocs-neuron.readthedocs-hosted.com/
- NVIDIA NVHBM / NVLink Fusion technical blog: https://developer.nvidia.com/blog/nvidia-nvlink-fusion-brings-nvhbm-to-next-generation-ai-infrastructure/
- NVIDIA / AWS infrastructure announcement: https://investor.nvidia.com/news/press-release-details/2026/AWS-and-NVIDIA-to-Deliver-2-Million-Additional-GPUs-and-Next-Generation-Infrastructure-for-Agentic-and-Physical-AI/default.aspx
