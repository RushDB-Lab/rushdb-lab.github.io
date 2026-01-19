<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

import AboutSection from "./sections/AboutSection.vue";
import AchievementsSection from "./sections/AchievementsSection.vue";
import ContactSection from "./sections/ContactSection.vue";
import HeroSection from "./sections/HeroSection.vue";
import MembersSection from "./sections/MembersSection.vue";
import NewsSection from "./sections/NewsSection.vue";
import ProjectsSection from "./sections/ProjectsSection.vue";

type Lang = "zh" | "en" | "ja";

const currentLang = ref<Lang>("zh");
const isLanguageOpen = ref(false);
const isMenuOpen = ref(false);

const languageLabel = computed(() => {
  if (currentLang.value === "zh") return "🇨🇳 中文";
  if (currentLang.value === "ja") return "🇯🇵 日本語";
  return "🇬🇧 English";
});

const scrollProgress = ref(0);
const navbarBg = ref("rgba(5, 7, 18, 0.72)");

let scrollRaf: number | null = null;
let pointerRaf: number | null = null;
let sectionObserver: IntersectionObserver | null = null;

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

function applyLanguageDom(lang: Lang) {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : lang === "en" ? "en-US" : "ja-JP";

  const titles: Record<Lang, string> = {
    zh: "RushDB - 无限进步",
    en: "RushDB - Unlimited Progress",
    ja: "RushDB - 無限の進歩",
  };
  document.title = titles[lang];

  document.querySelectorAll<HTMLElement>(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  document.querySelectorAll<HTMLElement>(".lang-content").forEach((el) => {
    el.classList.toggle("active", el.classList.contains(`lang-${lang}`));
  });
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
  applyLanguageDom(lang);
}

function updateScrollEffects() {
  navbarBg.value = window.scrollY > 100 ? "rgba(5, 7, 18, 0.82)" : "rgba(5, 7, 18, 0.72)";

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
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("keydown", onKeydown);
  document.removeEventListener("click", onDocumentClick);
  sectionObserver?.disconnect();
  sectionObserver = null;
});
</script>

<template>
  <div class="scroll-progress" :style="{ transform: `scaleX(${scrollProgress})` }"></div>
  <nav class="navbar" :class="{ 'menu-open': isMenuOpen }" :style="{ background: navbarBg }">
    <div class="nav-content">
      <a href="#" class="nav-logo" @click.prevent="scrollToTop">
        <img src="/RushDB.png" alt="RushDB Logo" class="nav-logo-img" />
        <span>&ensp;RushDB</span>
      </a>
      <div style="display: flex; align-items: center; gap: 2rem">
        <button class="nav-toggle" type="button" aria-label="打开菜单" @click="toggleNavMenu">
          <span class="nav-toggle-bars" aria-hidden="true"></span>
        </button>
        <ul class="nav-links">
          <li>
            <a href="#about" class="lang-content lang-zh active">关于我们</a><a href="#about" class="lang-content lang-en">About Us</a
            ><a href="#about" class="lang-content lang-ja">私たちについて</a>
          </li>
          <li>
            <a href="#achievements" class="lang-content lang-zh active">竞赛成就</a
            ><a href="#achievements" class="lang-content lang-en">Achievements</a
            ><a href="#achievements" class="lang-content lang-ja">競技成果</a>
          </li>
          <li>
            <a href="#projects" class="lang-content lang-zh active">项目作品</a><a href="#projects" class="lang-content lang-en">Projects</a
            ><a href="#projects" class="lang-content lang-ja">プロジェクト</a>
          </li>
          <li>
            <a href="#members" class="lang-content lang-zh active">团队成员</a><a href="#members" class="lang-content lang-en">Team Members</a
            ><a href="#members" class="lang-content lang-ja">チームメンバー</a>
          </li>
          <li>
            <a href="#news" class="lang-content lang-zh active">相关报道</a><a href="#news" class="lang-content lang-en">Related News</a
            ><a href="#news" class="lang-content lang-ja">関連報道</a>
          </li>
          <li>
            <a href="#contact" class="lang-content lang-zh active">联系我们</a><a href="#contact" class="lang-content lang-en">Contact Us</a
            ><a href="#contact" class="lang-content lang-ja">お問い合わせ</a>
          </li>
        </ul>

        <div class="language-switcher" :class="{ show: isLanguageOpen }">
          <div class="language-trigger" @click="toggleLanguageSwitcher">{{ languageLabel }}</div>
          <div class="language-dropdown">
            <button class="lang-btn active" data-lang="zh" @click="switchLanguage('zh')">🇨🇳 中文</button>
            <button class="lang-btn" data-lang="en" @click="switchLanguage('en')">🇬🇧 English</button>
            <button class="lang-btn" data-lang="ja" @click="switchLanguage('ja')">🇯🇵 日本語</button>
          </div>
        </div>
        <a class="nav-cta" href="https://github.com/RushDB-Lab" target="_blank" rel="noopener noreferrer">
          <span class="lang-content lang-zh active inline">GitHub</span>
          <span class="lang-content lang-en inline">GitHub</span>
          <span class="lang-content lang-ja inline">GitHub</span>
        </a>
      </div>
    </div>
  </nav>

  <HeroSection />

  <div class="container">
    <main class="main-content">
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
        <p class="copyright">© 2025 RushDB. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
</template>
