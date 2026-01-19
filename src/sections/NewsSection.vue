<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });
</script>

<template>
  <section class="section" id="news">
    <h2 class="section-title">
      {{ t("news.title") }}
    </h2>
    <div class="news-container">
      <a href="https://www.aao.cdut.edu.cn/info/1442/6588.htm" target="_blank" style="color: inherit; text-decoration: none; display: block">
        <div class="news-item">
          <div class="news-header">
            <div class="news-icon">📰</div>
            <div class="news-meta">
              <div class="news-title">
                {{ t("news.items.cdut.title") }}
              </div>
              <div class="news-source">
                {{ t("news.items.cdut.source") }}
              </div>
            </div>
          </div>
          <div class="news-desc">
            {{ t("news.items.cdut.desc") }}
          </div>
          <div class="news-tags">
            <span class="news-tag">
              {{ t("news.items.cdut.tags.t1") }}
            </span>
            <span class="news-tag">OceanBase</span>
            <span class="news-tag">
              {{ t("news.items.cdut.tags.t3") }}
            </span>
          </div>
        </div>
      </a>

      <a
        href="https://finance.sina.cn/2025-01-13/detail-ineevenv2707541.d.html"
        target="_blank"
        style="color: inherit; text-decoration: none; display: block"
      >
        <div class="news-item">
          <div class="news-header">
            <div class="news-icon">🏆</div>
            <div class="news-meta">
              <div class="news-title">
                {{ t("news.items.sina.title") }}
              </div>
              <div class="news-source">
                {{ t("news.items.sina.source") }}
              </div>
            </div>
          </div>
          <div class="news-desc">
            {{ t("news.items.sina.desc") }}
          </div>
          <div class="news-tags">
            <span class="news-tag">
              {{ t("news.items.sina.tags.t1") }}
            </span>
            <span class="news-tag">
              {{ t("news.items.sina.tags.t2") }}
            </span>
            <span class="news-tag">
              {{ t("news.items.sina.tags.t3") }}
            </span>
          </div>
        </div>
      </a>

      <a
        href="https://www.bilibili.com/opus/1035584488471527457?spm_id_from=333.1387.0.0"
        target="_blank"
        style="color: inherit; text-decoration: none; display: block"
      >
        <div class="news-item">
          <div class="news-header">
            <div class="news-icon">🎯</div>
            <div class="news-meta">
              <div class="news-title">
                {{ t("news.items.bilibili.title") }}
              </div>
              <div class="news-source">
                {{ t("news.items.bilibili.source") }}
              </div>
            </div>
          </div>
          <div class="news-desc">
            {{ t("news.items.bilibili.desc") }}
          </div>
          <div class="news-tags">
            <span class="news-tag">
              {{ t("news.items.bilibili.tags.t1") }}
            </span>
            <span class="news-tag">
              {{ t("news.items.bilibili.tags.t2") }}
            </span>
            <span class="news-tag">
              {{ t("news.items.bilibili.tags.t3") }}
            </span>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>
