<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { ui, type Lang } from '../../i18n/ui';

const props = defineProps<{
  lang: Lang;
}>();

const translations = ui[props.lang];
const t = translations.about;
const milestones = [
  { time: t.milestones.meet.time, event: t.milestones.meet.event },
  { time: t.milestones.awards.time, event: t.milestones.awards.event },
  { time: t.milestones.foundation.time, event: t.milestones.foundation.event },
];

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

  const statsEl = document.querySelector('.intro-stats');
  if (statsEl) observer.observe(statsEl);
});

onUnmounted(() => {
  observer?.disconnect();
  observer = null;
});

// Replace {brand} placeholder
const descriptionHtml = t.desc.replace('{brand}', '<strong>RushDB</strong>');
</script>

<template>
  <section class="section" id="about">
    <h2 class="section-title">{{ t.title }}</h2>
    <div class="intro-container">
      <div class="intro-highlight">
        <div class="intro-icon">🚀</div>
        <h3 class="intro-subtitle">{{ t.subtitle }}</h3>
      </div>
      <p class="intro-text" v-html="descriptionHtml"></p>
      <div class="intro-timeline-shell">
        <div class="intro-timeline" role="list" aria-label="Team timeline">
          <div v-for="(item, index) in milestones" :key="index" class="timeline-item" role="listitem">
            <div class="timeline-time">{{ item.time }}</div>
            <div class="timeline-marker" aria-hidden="true">
              <span class="timeline-dot"></span>
            </div>
            <p class="timeline-event">{{ item.event }}</p>
          </div>
        </div>
      </div>
      <div class="intro-stats">
        <div class="stat-item">
          <div class="stat-number">{{ membersCount }}</div>
          <div class="stat-label">{{ t.stats.members }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ awardsCount }}</div>
          <div class="stat-label">{{ t.stats.awards }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ projectsCount }}</div>
          <div class="stat-label">{{ t.stats.projects }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
