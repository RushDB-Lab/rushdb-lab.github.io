import { ui, defaultLang, type Lang } from './ui';

export { type Lang, defaultLang, ui } from './ui';

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<(typeof ui)[typeof defaultLang]>;

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let result: unknown = obj;
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof result === 'string' ? result : path;
}

export function getI18n(lang: Lang) {
  const translations = ui[lang] || ui[defaultLang];

  function t(key: TranslationKey, params?: Record<string, string | number>): string {
    let value = getNestedValue(translations as Record<string, unknown>, key);

    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        value = value.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
      });
    }

    return value;
  }

  return { t, lang, translations };
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, targetLang: Lang = lang) {
    return `/${targetLang}${path}`;
  };
}

export function getLocalizedUrl(url: URL, targetLang: Lang): string {
  const pathname = url.pathname;
  const [, currentLang, ...rest] = pathname.split('/');

  if (currentLang in ui) {
    return `/${targetLang}/${rest.join('/')}`;
  }

  return `/${targetLang}${pathname}`;
}

export const languages = {
  zh: '🇨🇳 中文',
  en: '🇬🇧 English',
  ja: '🇯🇵 日本語',
} as const;
