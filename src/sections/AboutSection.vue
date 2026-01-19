<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });
</script>

<template>
  <section class="section" id="about">
    <h2 class="section-title">
      {{ t("about.title") }}
    </h2>
    <div class="intro-container">
      <div class="intro-highlight">
        <div class="intro-icon">🚀</div>
        <h3 class="intro-subtitle">
          {{ t("about.subtitle") }}
        </h3>
      </div>
      <p class="intro-text">
        <i18n-t keypath="about.desc" tag="span">
          <template #brand>
            <strong>RushDB</strong>
          </template>
        </i18n-t>
      </p>
      <div class="intro-stats">
        <div class="stat-item">
          <div class="stat-number">3</div>
          <div class="stat-label">
            {{ t("about.stats.members") }}
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-number">4</div>
          <div class="stat-label">
            {{ t("about.stats.awards") }}
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-number">1</div>
          <div class="stat-label">
            {{ t("about.stats.projects") }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
