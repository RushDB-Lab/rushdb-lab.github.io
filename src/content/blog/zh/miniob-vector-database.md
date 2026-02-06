---
title: "MiniOB 向量数据库实现详解：从零构建高性能向量检索引擎"
description: "深入解析在 OceanBase 大赛中基于 MiniOB 实现的向量数据库内核，涵盖 HNSW 索引原理、SIMD 指令集加速、存储层适配及性能调优实战。"
pubDate: 2024-12-15
author: "明泰"
category: "database"
tags: ["vector-db", "miniob", "oceanbase", "hnsw", "cpp", "simd"]
---

# MiniOB 向量数据库实现详解

> **前言**：在第四届 OceanBase 数据库创新设计赛中，我们 **RushDB** 团队面临的挑战之一是在 MiniOB（Mini OceanBase）中引入对非结构化数据的支持。随着大模型（LLM）和 RAG（检索增强生成）技术的爆发，向量数据库成为了基础设施中的"新贵"。本文将详细复盘我们如何从零开始，在传统的行存数据库 MiniOB 中植入高性能的向量检索能力。

## 1. 为什么我们需要向量数据库？

传统的关系型数据库擅长处理结构化数据（如数字、字符串），但在面对图像、音频、文本等非结构化数据时显得力不从心。向量数据库的核心逻辑是将这些数据通过 Embedding 模型转化为高维向量（Vector），并基于**近似最近邻搜索（ANN）**算法快速找到相似的数据。

在本次比赛中，我们的目标不仅是存储向量，更是要实现毫秒级的相似度检索，支持以下典型场景：
- **推荐系统**：计算用户行为向量与物品向量的 Cosine 相似度。
- **语义搜索**：基于语义理解而非关键词匹配来检索文档。

## 2. 核心架构设计

在 MiniOB 的现有架构上，我们采用了**插件式索引架构**。向量数据在底层存储上依然利用 MiniOB 的 Tuple 机制（作为二进制 Blob 存储），但同时维护构建在内存中的 HNSW 索引结构。



### 2.1 索引算法选型：为何选择 HNSW？

在主流的 ANN 算法（如 IVFFlat, Annoy）中，我们选择了 **HNSW (Hierarchical Navigable Small World)**。

* **NSW (Navigable Small World)**：基于"六度分隔理论"，构建一个小世界网络，保证节点间的平均路径长度极短。
* **分层结构 (Hierarchical)**：借鉴 Skip List（跳表）的思想，将图分为多层。顶层稀疏，用于快速定位大概区域；底层稠密，用于精细查找。

相比于 IVFFlat 需要预聚类且召回率受限，HNSW 在高维数据（128维+）上实现了**性能与召回率的最佳平衡**。

### 2.2 数据结构定义

我们的 `HNSWIndex` 类设计如下，为了节省内存，我们使用了邻接表来存储图结构：

```cpp
struct Node {
    int id;                 // 记录 ID
    std::vector<float> vec; // 原始向量数据
    // 每一层的邻居节点列表
    std::vector<std::vector<int>> neighbors; 
};

class HNSWIndex {
public:
    // 插入向量，ef_construction 控制构建质量
    void insert(const std::vector<float>& vec, int id);
    // K-NN 搜索，ef_search 控制搜索深度
    std::vector<int> search(const std::vector<float>& query, int k);
    
private:
    int max_level_; // 当前最大层数
    int M_;         // 每个节点的最大连接数
    int ef_construction_; // 构建时的候选集大小
    std::vector<Node> nodes_; // 全局节点存储
    int entry_point_id_; // 入口节点 ID
    
    // 核心内部函数：在特定层搜索最近邻
    std::priority_queue<dist_pair> search_layer(
        const std::vector<float>& q, int ep, int ef, int level);
};

```

## 3. 关键性能优化

这是本次实现的重头戏。朴素的距离计算在处理百万级向量时会成为 CPU 瓶颈。

### 3.1 距离计算的数学原理

对于两个 `n` 维向量 `a` 和 `b`，欧几里得距离（L2）定义为：

<p><strong>d(a, b) = ||a - b||<sub>2</sub> = √(Σ<sub>i=1</sub><sup>n</sup> (a<sub>i</sub> - b<sub>i</sub>)<sup>2</sup>)</strong></p>

在比较大小时，我们通常省略开方运算以减少 CPU 开销。

### 3.2 SIMD 指令集加速 (AVX2)

利用 x86 架构的 AVX2 指令集，我们可以单指令并行处理 8 个 `float` 数据（256位寄存器）。相比标量代码，理论吞吐量提升 8 倍。

以下是我们的核心计算内核，使用了 FMA（Fused Multiply-Add）指令进一步加速：

```cpp
#include <immintrin.h>

// 假设 dim 是 8 的倍数，且地址已对齐
float euclidean_distance_sq_simd(const float* a, const float* b, int dim) {
    __m256 sum = _mm256_setzero_ps(); // 初始化累加寄存器为 0
    
    for (int i = 0; i < dim; i += 8) {
        // 加载数据到 YMM 寄存器
        __m256 va = _mm256_loadu_ps(a + i);
        __m256 vb = _mm256_loadu_ps(b + i);
        
        // 计算差值
        __m256 diff = _mm256_sub_ps(va, vb);
        
        // 乘加运算：sum += diff * diff
        // fmadd 相比 mul + add 减少了一次指令延迟和精度损失
        sum = _mm256_fmadd_ps(diff, diff, sum);
    }
    
    // 将 256 位寄存器内的 8 个 float 归约求和
    float result[8];
    _mm256_storeu_ps(result, sum);
    float total = 0.0f;
    for(int i=0; i<8; ++i) total += result[i];
    
    return total;
}

```

> **优化细节**：实际代码中，我们还加入了 **软件预取 (Software Prefetching)** 指令 `_mm_prefetch`，在计算当前向量距离时，提前将下一个待计算节点的向量数据拉入 L1 Cache，大幅减少了 Cache Miss 带来的流水线停顿。

## 4. 持久化与故障恢复

向量索引不仅存在于内存中，还需要持久化到磁盘以防宕机丢失。结合 MiniOB 的存储特性，我们设计了 WAL + Checkpoint 机制：

1. **WAL (Write-Ahead Logging)**：每次 `INSERT VECTOR` 操作，先写入日志。日志中包含向量数据和对应的 RowID。
2. **序列化**：在 Checkpoint 时，将内存中的 HNSW 图结构（层级关系、邻居表）序列化为二进制文件。
3. **恢复**：重启时，直接 mmap 映射索引文件，或者通过重放 WAL 重建最新的内存图结构。

## 5. 性能评估

我们在比赛提供的评测环境（Intel Xeon Platinum, 64GB RAM）上，使用 **SIFT1M** 数据集（100万条，128维）进行了压测。

**基准对比**：

* **Brute Force (暴力搜索)**：单次查询耗时约 200ms。
* **MiniOB HNSW (无 SIMD)**：单次查询耗时约 15ms。
* **MiniOB HNSW (AVX2优化)**：单次查询耗时 **< 3ms**。

**最终指标**：

| 指标 | 测试结果 | 说明 |
| --- | --- | --- |
| **QPS** | 2,500+ | 单线程吞吐量 |
| **查询延迟 (P99)** | 4.2 ms | Top-10 查询 |
| **Recall@10** | 98.5% | 几乎未丢失精度 |
| **内存占用** | ~1.2 GB | 包含原向量与图索引开销 |

## 6. 总结与展望

通过本次在 MiniOB 中实现向量数据库，我们深入理解了高维索引的复杂性。虽然 HNSW 性能优异，但也存在内存占用高的问题。

未来在 **RushDB** 的演进中，我们计划探索：

1. **向量量化 (Product Quantization, PQ)**：通过有损压缩将 float 压缩为 uint8，从而将内存占用降低 4-8 倍。
2. **DiskANN**：将图索引存储在 SSD 上，仅在内存缓存路由节点，实现单机亿级向量的低成本存储。

如果你对数据库内核开发感兴趣，欢迎在评论区交流，或者关注我的 GitHub (mmmttt000045)！
