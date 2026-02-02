---
title: "MiniOB Vector Database Implementation"
description: "Deep dive into vector database technical details, including index construction, similarity calculation, and query optimization"
pubDate: 2024-12-15
author: "Tai Ming"
category: "database"
tags: ["vector-db", "miniob", "oceanbase", "hnsw"]
---

# MiniOB Vector Database Implementation

In the 4th OceanBase Database Innovation Design Competition, our team implemented vector database functionality. This article provides a detailed technical overview.

## Vector Database Overview

A vector database is a specialized database system for storing and retrieving high-dimensional vector data. It plays a crucial role in:

- **Recommendation Systems**: Similar user or item recommendations based on user behavior vectors
- **Image Search**: Converting images to feature vectors for similar image retrieval
- **Natural Language Processing**: Storage and semantic search of text embedding vectors

## Core Technical Implementation

### 1. HNSW Index

We adopted the Hierarchical Navigable Small World (HNSW) algorithm for vector indexing:

```cpp
class HNSWIndex {
public:
    void insert(const std::vector<float>& vec, int id);
    std::vector<int> search(const std::vector<float>& query, int k);
private:
    int max_level_;
    std::vector<std::vector<Node>> layers_;
};
```

### 2. Distance Calculation Optimization

To improve query performance, we implemented SIMD-accelerated distance calculation:

```cpp
float euclidean_distance_simd(const float* a, const float* b, int dim) {
    __m256 sum = _mm256_setzero_ps();
    for (int i = 0; i < dim; i += 8) {
        __m256 va = _mm256_loadu_ps(a + i);
        __m256 vb = _mm256_loadu_ps(b + i);
        __m256 diff = _mm256_sub_ps(va, vb);
        sum = _mm256_fmadd_ps(diff, diff, sum);
    }
    // ... reduction sum
}
```

## Performance Test Results

On a dataset of 1 million 128-dimensional vectors, our implementation achieved:

| Metric | Value |
|--------|-------|
| Insert Speed | 10,000 rows/sec |
| Query Latency | < 5ms (top-10) |
| Recall Rate | > 95% |

## Conclusion

Through optimizing index structures and distance calculations, we successfully implemented efficient vector database functionality in MiniOB, laying the foundation for future competitions and research.
