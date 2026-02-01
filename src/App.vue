<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import AboutSection from "./sections/AboutSection.vue";
import AchievementsSection from "./sections/AchievementsSection.vue";
import ContactSection from "./sections/ContactSection.vue";
import HeroSection from "./sections/HeroSection.vue";
import MembersSection from "./sections/MembersSection.vue";
import NewsSection from "./sections/NewsSection.vue";
import ProjectsSection from "./sections/ProjectsSection.vue";

import type { Lang } from "./i18n";

const { t, locale } = useI18n({ useScope: "global" });

const currentYear = new Date().getFullYear();

const currentLang = computed<Lang>({
  get: () => locale.value as Lang,
  set: (lang) => {
    locale.value = lang;
  },
});
const isLanguageOpen = ref(false);
const isMenuOpen = ref(false);

const languageLabel = computed(() => {
  return t(`language.${currentLang.value}`);
});

const scrollProgress = ref(0);
const navbarBg = ref("rgba(5, 7, 18, 0.72)");
const showBackToTop = ref(false);
const activeSection = ref("");

let scrollRaf: number | null = null;
let pointerRaf: number | null = null;
let sectionObserver: IntersectionObserver | null = null;
let navHighlightObserver: IntersectionObserver | null = null;

function ensureBusuanziScriptLoaded() {
  const scriptId = "busuanzi-script";
  if (document.getElementById(scriptId)) return;

  const script = document.createElement("script");
  script.id = scriptId;
  script.async = true;
  script.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
  document.body.appendChild(script);
}

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

function applyLocaleDom(lang: Lang) {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : lang === "en" ? "en-US" : "ja-JP";

  const titles: Record<Lang, string> = {
    zh: "RushDB - 无限进步",
    en: "RushDB - Unlimited Progress",
    ja: "RushDB - 無限の進歩",
  };
  document.title = titles[lang];
}

async function detectLanguageByLocation(): Promise<Lang> {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (
    timezone.includes("Asia/Shanghai") ||
    timezone.includes("Asia/Beijing") ||
    timezone.includes("Asia/Chongqing") ||
    timezone.includes("Asia/Harbin") ||
    timezone.includes("Asia/Kashgar") ||
    timezone.includes("Asia/Urumqi")
  ) {
    return "zh";
  }

  if (timezone.includes("Asia/Tokyo") || timezone.includes("Asia/Seoul")) {
    return "ja";
  }

  const browserLang = navigator.language || navigator.languages[0];
  if (browserLang?.startsWith("zh")) return "zh";
  if (browserLang?.startsWith("ja") || browserLang?.startsWith("ko")) return "ja";
  return "en";
}

function switchLanguage(lang: Lang) {
  currentLang.value = lang;
  hideLanguageSwitcher();
  localStorage.setItem("rushdb-language", lang);
}

function updateScrollEffects() {
  navbarBg.value = window.scrollY > 100 ? "rgba(5, 7, 18, 0.82)" : "rgba(5, 7, 18, 0.72)";
  showBackToTop.value = window.scrollY > 300;

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = maxScroll > 0 ? window.scrollY / maxScroll : 0;

  scrollRaf = null;
}

function onScroll() {
  if (scrollRaf !== null) return;
  scrollRaf = window.requestAnimationFrame(updateScrollEffects);
}

function onPointerMove(event: PointerEvent) {
  if (event.pointerType === "touch") return;
  if (pointerRaf !== null) return;
  pointerRaf = window.requestAnimationFrame(() => {
    document.body.style.setProperty("--mx", `${event.clientX}px`);
    document.body.style.setProperty("--my", `${event.clientY}px`);
    pointerRaf = null;
  });
}

function onKeydown(e: KeyboardEvent) {
  if (e.key !== "Escape") return;
  hideLanguageSwitcher();
  closeNavMenu();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  if (!target.closest(".language-switcher")) hideLanguageSwitcher();

  if (isMenuOpen.value && !target.closest(".navbar") && !target.closest(".nav-toggle")) {
    closeNavMenu();
  }

  const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]:not(.nav-logo)');
  if (!anchor) return;

  const href = anchor.getAttribute("href");
  if (!href || href === "#") return;

  const targetEl = document.querySelector<HTMLElement>(href);
  if (!targetEl) return;

  event.preventDefault();
  closeNavMenu();
  targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setupSectionObserver() {
  const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target as HTMLElement;
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, observerOptions);

  document.querySelectorAll<HTMLElement>(".section").forEach((el) => {
    sectionObserver?.observe(el);
  });
}

function setupMemberCardHoverZIndex() {
  document.querySelectorAll<HTMLElement>(".member-card").forEach((card) => {
    const onEnter = () => {
      card.style.zIndex = "10";
    };
    const onLeave = () => {
      card.style.zIndex = "1";
    };
    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
  });
}

function setupNavHighlightObserver() {
  const sections = ["about", "achievements", "projects", "members", "news", "contact"];

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
      rootMargin: "-80px 0px -50% 0px",
    }
  );

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) navHighlightObserver?.observe(el);
  });
}

onMounted(async () => {
  document.documentElement.classList.add("js");

  const savedLang = localStorage.getItem("rushdb-language") as Lang | null;
  const selectedLang = savedLang ?? (await detectLanguageByLocation());
  switchLanguage(selectedLang);

  updateScrollEffects();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("keydown", onKeydown);
  document.addEventListener("click", onDocumentClick);

  setupSectionObserver();
  setupMemberCardHoverZIndex();
  setupNavHighlightObserver();
  ensureBusuanziScriptLoaded();
});

watch(
  () => currentLang.value,
  (lang) => {
    applyLocaleDom(lang);
  },
  { immediate: true }
);

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("keydown", onKeydown);
  document.removeEventListener("click", onDocumentClick);
  sectionObserver?.disconnect();
  sectionObserver = null;
  navHighlightObserver?.disconnect();
  navHighlightObserver = null;
});
</script>

<template>
  <a href="#main-content" class="skip-link">{{ t('a11y.skipToContent') }}</a>
  <div class="scroll-progress" :style="{ transform: `scaleX(${scrollProgress})` }" role="progressbar" :aria-valuenow="Math.round(scrollProgress * 100)" aria-valuemin="0" aria-valuemax="100" :aria-label="t('a11y.scrollProgress')"></div>
  <nav class="navbar" :class="{ 'menu-open': isMenuOpen }" :style="{ background: navbarBg }" role="navigation" :aria-label="t('a11y.mainNavigation')">
    <div class="nav-content">
      <a href="#" class="nav-logo" @click.prevent="scrollToTop">
        <img src="/RushDB.png" alt="RushDB Logo" class="nav-logo-img" />
        <span>&ensp;RushDB</span>
      </a>
      <div class="nav-actions">
        <button class="nav-toggle" type="button" :aria-label="t('nav.openMenu')" @click="toggleNavMenu">
          <span class="nav-toggle-bars" aria-hidden="true"></span>
        </button>
        <ul class="nav-links">
          <li>
            <a href="#about" :class="{ active: activeSection === 'about' }">{{ t("nav.about") }}</a>
          </li>
          <li>
            <a href="#achievements" :class="{ active: activeSection === 'achievements' }">{{ t("nav.achievements") }}</a>
          </li>
          <li>
            <a href="#projects" :class="{ active: activeSection === 'projects' }">{{ t("nav.projects") }}</a>
          </li>
          <li>
            <a href="#members" :class="{ active: activeSection === 'members' }">{{ t("nav.members") }}</a>
          </li>
          <li>
            <a href="#news" :class="{ active: activeSection === 'news' }">{{ t("nav.news") }}</a>
          </li>
          <li>
            <a href="#contact" :class="{ active: activeSection === 'contact' }">{{ t("nav.contact") }}</a>
          </li>
        </ul>

        <div class="language-switcher" :class="{ show: isLanguageOpen }">
          <div class="language-trigger" @click="toggleLanguageSwitcher">{{ languageLabel }}</div>
          <div class="language-dropdown">
            <button class="lang-btn" :class="{ active: currentLang === 'zh' }" data-lang="zh" @click="switchLanguage('zh')">
              {{ t("language.zh") }}
            </button>
            <button class="lang-btn" :class="{ active: currentLang === 'en' }" data-lang="en" @click="switchLanguage('en')">
              {{ t("language.en") }}
            </button>
            <button class="lang-btn" :class="{ active: currentLang === 'ja' }" data-lang="ja" @click="switchLanguage('ja')">
              {{ t("language.ja") }}
            </button>
          </div>
        </div>
        <a class="nav-cta" href="https://github.com/RushDB-Lab" target="_blank" rel="noopener noreferrer">
          {{ t("nav.github") }}
        </a>
      </div>
    </div>
  </nav>

  <HeroSection />

  <div class="container">
    <main id="main-content" class="main-content" role="main">
      <div class="content-inner">
        <AboutSection />
        <AchievementsSection />
        <ProjectsSection />
        <MembersSection />
        <NewsSection />
        <ContactSection />
      </div>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <p class="copyright">
          <span>{{ t("footer.copyright", { year: currentYear }) }}</span>
          <span class="footer-divider" aria-hidden="true"> · </span>
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">蜀ICP备2023035054号-3</a>
          <span class="busuanzi" aria-label="访问统计">
            <span class="busuanzi-row">
              <span id="busuanzi_container_site_uv">
                <span class="busuanzi-item" aria-label="UV">
                  <svg class="busuanzi-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M16 7c0 2.21-1.79 4-4 4S8 9.21 8 7s1.79-4 4-4 4 1.79 4 4Z"
                      stroke="currentColor"
                      stroke-width="1.8"
                    />
                    <path
                      d="M5 20c0-3.31 3.13-6 7-6s7 2.69 7 6"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />
                  </svg>
                  <span id="busuanzi_value_site_uv"></span>
                </span>
              </span>
              <span id="busuanzi_container_site_pv">
                <span class="busuanzi-item" aria-label="PV">
                  <svg class="busuanzi-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      stroke="currentColor"
                      stroke-width="1.8"
                    />
                  </svg>
                  <span id="busuanzi_value_site_pv"></span>
                </span>
              </span>
            </span>
          </span>
        </p>
      </div>
    </footer>
  </div>

  <!-- Back to Top Button -->
  <button
    v-show="showBackToTop"
    class="back-to-top"
    type="button"
    :aria-label="t('a11y.backToTop')"
    @click="scrollToTop"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  </button>
</template>
