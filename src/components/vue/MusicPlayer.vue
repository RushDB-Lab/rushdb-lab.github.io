<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { ui, type Lang } from '../../i18n/ui';

const props = defineProps<{
  lang: Lang;
}>();

const translations = ui[props.lang];
const isPlaying = ref(false);
const audioRef = ref<HTMLAudioElement | null>(null);

const musicSrc: Record<Lang, string> = {
  zh: '/RushDB_Dynasty.mp4',
  en: '/RushDB_Dominion.mp3',
  ja: '/RushDB_Dreams_Collide.mp3',
};

const STORAGE_KEY = 'rushdb-music-playing';

function toggle() {
  const audio = audioRef.value;
  if (!audio) return;

  if (isPlaying.value) {
    audio.pause();
    isPlaying.value = false;
  } else {
    audio.play().then(() => {
      isPlaying.value = true;
    }).catch(() => {
      isPlaying.value = false;
    });
  }

  try {
    localStorage.setItem(STORAGE_KEY, String(isPlaying.value));
  } catch {}
}

function onAudioEnded() {
  const audio = audioRef.value;
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {
      isPlaying.value = false;
    });
  }
}

onMounted(() => {
  const audio = audioRef.value;
  if (!audio) return;

  audio.volume = 0.5;

  // Autoplay unless user explicitly paused before
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'false') return;
  } catch {}

  audio.play().then(() => {
    isPlaying.value = true;
  }).catch(() => {
    // Browser blocked autoplay; retry on first user interaction
    isPlaying.value = false;
    const resumeOnce = () => {
      audio.play().then(() => {
        isPlaying.value = true;
        try { localStorage.setItem(STORAGE_KEY, 'true'); } catch {}
      }).catch(() => {});
      document.removeEventListener('click', resumeOnce);
      document.removeEventListener('touchstart', resumeOnce);
      document.removeEventListener('keydown', resumeOnce);
    };
    document.addEventListener('click', resumeOnce, { once: true });
    document.addEventListener('touchstart', resumeOnce, { once: true });
    document.addEventListener('keydown', resumeOnce, { once: true });
  });
});

onUnmounted(() => {
  const audio = audioRef.value;
  if (audio) {
    audio.pause();
  }
});
</script>

<template>
  <button
    class="music-player"
    :class="{ 'is-playing': isPlaying }"
    type="button"
    :aria-label="translations.a11y.musicToggle"
    @click="toggle"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z" />
    </svg>
  </button>
  <audio ref="audioRef" preload="auto" :src="musicSrc[lang]" @ended="onAudioEnded" />
</template>
