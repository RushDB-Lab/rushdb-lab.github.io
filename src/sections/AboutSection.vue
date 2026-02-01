<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const membersCount = ref(0);
const awardsCount = ref(0);
const projectsCount = ref(0);
const hasAnimated = ref(false);

let observer: IntersectionObserver | null = null;

function animateCounter(target: number, setter: (val: number) => void, duration = 1500) {
  const startTime = performance.now();
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    setter(Math.floor(easeOut * target));
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
}

function startCounterAnimation() {
  if (hasAnimated.value) return;
  hasAnimated.value = true;
  animateCounter(3, (val) => (membersCount.value = val));
  animateCounter(4, (val) => (awardsCount.value = val));
  animateCounter(1, (val) => (projectsCount.value = val));
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounterAnimation();
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsEl = document.querySelector(".intro-stats");
  if (statsEl) observer.observe(statsEl);
});

onUnmounted(() => {
  observer?.disconnect();
  observer = null;
});
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
          <div class="stat-number">{{ membersCount }}</div>
          <div class="stat-label">
            {{ t("about.stats.members") }}
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ awardsCount }}</div>
          <div class="stat-label">
            {{ t("about.stats.awards") }}
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ projectsCount }}</div>
          <div class="stat-label">
            {{ t("about.stats.projects") }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
