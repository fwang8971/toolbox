import { create } from "zustand";
import type { Locale } from "@/i18n/types";

function detectLocale(): Locale {
  const saved = localStorage.getItem("locale");
  if (saved === "en" || saved === "zh") {
    return saved;
  }
  const lang = navigator.language.toLowerCase();
  return lang.startsWith("zh") ? "zh" : "en";
}

type LocaleState = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
};

export const useLocaleStore = create<LocaleState>((set, get) => ({
  locale: (() => {
    const initial = detectLocale();
    document.documentElement.setAttribute("lang", initial === "zh" ? "zh-CN" : "en");
    return initial;
  })(),
  setLocale: (next) => {
    localStorage.setItem("locale", next);
    document.documentElement.setAttribute("lang", next === "zh" ? "zh-CN" : "en");
    set({ locale: next });
  },
  toggleLocale: () => {
    const next: Locale = get().locale === "en" ? "zh" : "en";
    get().setLocale(next);
  },
}));
