<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { ui, type Lang } from '../../i18n/ui';

const props = defineProps<{
  lang: Lang;
  currentPath: string;
}>();

const translations = computed(() => ui[props.lang]);
const t = (key: string) => {
  const keys = key.split('.');
  let result: unknown = translations.value;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof result === 'string' ? result : key;
};

const isLanguageOpen = ref(false);
const isMenuOpen = ref(false);
const navbarBg = ref('rgba(5, 7, 18, 0.72)');
const activeSection = ref('');

const languageLabel = computed(() => t(`language.${props.lang}`));

const languages: Record<Lang, string> = {
  zh: '🇨🇳 中文',
  en: '🇬🇧 English',
  ja: '🇯🇵 日本語',
};

let navHighlightObserver: IntersectionObserver | null = null;

function toggleLanguageSwitcher() {
  isLanguageOpen.value = !isLanguageOpen.value;
}

function hideLanguageSwitcher() {
  isLanguageOpen.value = false;
}

function toggleNavMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeNavMenu() {
  isMenuOpen.value = false;
}

function switchLanguage(lang: Lang) {
  hideLanguageSwitcher();
  localStorage.setItem('rushdb-language', lang);

  // Navigate to the new language path
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/').filter(Boolean);

  if (pathParts[0] in languages) {
    pathParts[0] = lang;
  } else {
    pathParts.unshift(lang);
  }

  window.location.href = '/' + pathParts.join('/');
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavbarBg() {
  navbarBg.value = window.scrollY > 100 ? 'rgba(5, 7, 18, 0.82)' : 'rgba(5, 7, 18, 0.72)';
}

function onKeydown(e: KeyboardEvent) {
  if (e.key !== 'Escape') return;
  hideLanguageSwitcher();
  closeNavMenu();
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  if (!target.closest('.language-switcher')) hideLanguageSwitcher();

  if (isMenuOpen.value && !target.closest('.navbar') && !target.closest('.nav-toggle')) {
    closeNavMenu();
  }

  const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]:not(.nav-logo)');
  if (!anchor) return;

  const href = anchor.getAttribute('href');
  if (!href || href === '#') return;

  const targetEl = document.querySelector<HTMLElement>(href);
  if (!targetEl) return;

  event.preventDefault();
  closeNavMenu();
  targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setupNavHighlightObserver() {
  const sections = ['about', 'achievements', 'projects', 'members', 'news', 'contact'];

  navHighlightObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px',
    }
  );

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) navHighlightObserver?.observe(el);
  });
}

onMounted(() => {
  updateNavbarBg();
  window.addEventListener('scroll', updateNavbarBg, { passive: true });
  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', onDocumentClick);
  setupNavHighlightObserver();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateNavbarBg);
  document.removeEventListener('keydown', onKeydown);
  document.removeEventListener('click', onDocumentClick);
  navHighlightObserver?.disconnect();
  navHighlightObserver = null;
});
</script>

<template>
  <nav class="navbar" :class="{ 'menu-open': isMenuOpen }" :style="{ background: navbarBg }" role="navigation" :aria-label="t('a11y.mainNavigation')">
    <div class="nav-content">
      <a href="#" class="nav-logo" @click.prevent="scrollToTop">
        <img src="/RushDB.png" alt="RushDB Logo" class="nav-logo-img" />
        <span>&ensp;RushDB</span>
      </a>

      <!-- Desktop navigation -->
      <div class="nav-actions nav-desktop">
        <ul class="nav-links">
          <li>
            <a href="#about" :class="{ active: activeSection === 'about' }">{{ t('nav.about') }}</a>
          </li>
          <li>
            <a href="#achievements" :class="{ active: activeSection === 'achievements' }">{{ t('nav.achievements') }}</a>
          </li>
          <li>
            <a href="#projects" :class="{ active: activeSection === 'projects' }">{{ t('nav.projects') }}</a>
          </li>
          <li>
            <a href="#members" :class="{ active: activeSection === 'members' }">{{ t('nav.members') }}</a>
          </li>
          <li>
            <a :href="`/${lang}/blog/`" class="nav-blog-link">{{ t('nav.blog') }}</a>
          </li>
        </ul>

        <div class="language-switcher" :class="{ show: isLanguageOpen }">
          <div class="language-trigger" @click="toggleLanguageSwitcher">{{ languageLabel }}</div>
          <div class="language-dropdown">
            <button
              v-for="(label, langKey) in languages"
              :key="langKey"
              class="lang-btn"
              :class="{ active: lang === langKey }"
              :data-lang="langKey"
              @click="switchLanguage(langKey as Lang)"
            >
              {{ label }}
            </button>
          </div>
        </div>
        <a class="nav-cta" href="https://github.com/RushDB-Lab" target="_blank" rel="noopener noreferrer">
          {{ t('nav.github') }}
        </a>
      </div>

      <!-- Mobile hamburger button -->
      <button class="nav-toggle" type="button" :aria-label="t('nav.openMenu')" @click="toggleNavMenu">
        <span class="nav-toggle-bars" aria-hidden="true"></span>
      </button>

      <!-- Mobile menu -->
      <div class="nav-mobile-menu" :class="{ open: isMenuOpen }">
        <ul class="nav-mobile-links">
          <li>
            <a href="#about" :class="{ active: activeSection === 'about' }" @click="closeNavMenu">{{ t('nav.about') }}</a>
          </li>
          <li>
            <a href="#achievements" :class="{ active: activeSection === 'achievements' }" @click="closeNavMenu">{{ t('nav.achievements') }}</a>
          </li>
          <li>
            <a href="#projects" :class="{ active: activeSection === 'projects' }" @click="closeNavMenu">{{ t('nav.projects') }}</a>
          </li>
          <li>
            <a href="#members" :class="{ active: activeSection === 'members' }" @click="closeNavMenu">{{ t('nav.members') }}</a>
          </li>
          <li>
            <a :href="`/${lang}/blog/`" class="nav-blog-link">{{ t('nav.blog') }}</a>
          </li>
        </ul>

        <div class="nav-mobile-actions">
          <div class="language-switcher mobile-lang" :class="{ show: isLanguageOpen }">
            <div class="language-trigger" @click="toggleLanguageSwitcher">{{ languageLabel }}</div>
            <div class="language-dropdown">
              <button
                v-for="(label, langKey) in languages"
                :key="langKey"
                class="lang-btn"
                :class="{ active: lang === langKey }"
                :data-lang="langKey"
                @click="switchLanguage(langKey as Lang)"
              >
                {{ label }}
              </button>
            </div>
          </div>
          <a class="nav-cta mobile-cta" href="https://github.com/RushDB-Lab" target="_blank" rel="noopener noreferrer">
            {{ t('nav.github') }}
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
