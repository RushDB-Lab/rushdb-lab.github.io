<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-content">
          <div class="logo-container" aria-hidden="true">
            <div class="logo">
              <img src="/RushDB.png" alt="RushDB Logo" />
            </div>
          </div>
          <h1 class="hero-title">
            {{ t("hero.title") }}
          </h1>
          <p class="hero-subtitle">
            {{ t("hero.subtitle") }}
          </p>
          <div class="hero-actions">
            <a href="#about" class="cta-button">
              <span>{{ t("hero.actions.learnMore") }}</span>
              <span>→</span>
            </a>
            <a href="https://github.com/RushDB-Lab" class="secondary-button" target="_blank" rel="noopener noreferrer">
              <span class="inline">{{ t("hero.actions.openGithub") }}</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a href="#projects" class="secondary-button">
              <span class="inline">{{ t("hero.actions.viewProjects") }}</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div class="hero-panel" aria-hidden="true">
          <div class="panel">
            <div class="panel-inner">
              <div class="panel-kicker">
                <span class="panel-kicker-badge"></span>
                <span>{{ t("hero.panel.kicker") }}</span>
              </div>
              <div class="panel-title">
                {{ t("hero.panel.title") }}
              </div>
              <div class="panel-body">
                {{ t("hero.panel.body") }}
              </div>
              <div class="panel-metrics">
                <div class="metric">
                  <div class="metric-number">3</div>
                  <div class="metric-label">
                    {{ t("hero.panel.metrics.members") }}
                  </div>
                </div>
                <div class="metric">
                  <div class="metric-number">4</div>
                  <div class="metric-label">
                    {{ t("hero.panel.metrics.awards") }}
                  </div>
                </div>
                <div class="metric">
                  <div class="metric-number">1</div>
                  <div class="metric-label">
                    {{ t("hero.panel.metrics.openSource") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
