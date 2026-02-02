<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { ui, type Lang } from '../../i18n/ui';

const props = defineProps<{
  lang: Lang;
}>();

const translations = ui[props.lang];
const showBackToTop = ref(false);

function updateVisibility() {
  showBackToTop.value = window.scrollY > 300;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  updateVisibility();
  window.addEventListener('scroll', updateVisibility, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateVisibility);
});
</script>

<template>
  <button
    v-show="showBackToTop"
    class="back-to-top"
    type="button"
    :aria-label="translations.a11y.backToTop"
    @click="scrollToTop"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  </button>
</template>
