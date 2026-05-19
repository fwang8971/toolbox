import type { Locale } from "@/i18n/types";
import { useMemo } from "react";
import { useLocaleStore } from "@/stores/locale";

type Messages = Record<string, string>;

const MESSAGES: Record<Locale, Messages> = {
  en: {
    "nav.tools": "Tools",
    "nav.about": "About",
    "nav.tagline": "No login. Instant results.",
    "common.noLogin": "No login",
    "common.open": "Open",
    "common.backToTools": "Back to tools",
    "common.policies": "Policies",
    "home.badge.search": "Built for search intent",
    "home.badge.noSignup": "No sign-up",
    "home.title": "Quick Tools for money, words, and everyday tasks.",
    "home.subtitle":
      "Clean UI. Instant results. Shareable links. We focus on tools people actually search for.",
    "home.cta.browse": "Browse all tools",
    "home.cta.popular": "Popular now",
    "home.search.placeholder": "Search: mortgage, compound, word…",
    "home.idea.kicker": "SEO-first idea (high CPM niches)",
    "home.idea.title": "Compliance + payroll calculators & templates",
    "home.idea.desc":
      "Start with long-tail pages like “California payroll tax calculator 2026”.",
    "tools.title": "Tools",
    "tools.subtitle": "Everything is free to use. No login required.",
    "tools.search.placeholder": "Search tools…",
    "tabs.all": "All",
    "about.title": "About",
    "about.subtitle":
      "Quick Tools is a simple, no-login utility site. We aim to provide fast and accurate results with clean UX.",
    "about.privacy.title": "Privacy",
    "about.privacy.desc":
      "This site may use cookies and local storage for basic functionality (e.g., theme preference). If we enable advertising, third parties like Google may use cookies to serve ads based on your visits.",
    "about.disclaimer.title": "Disclaimer",
    "about.disclaimer.desc":
      "The tools on this site are provided for informational purposes only and do not constitute financial, legal, or professional advice.",
    "about.contact.title": "Contact",
    "tool.coming": "Coming next: full calculator UI, charts, and shareable URLs.",
    "tool.label": "Tool",
  },
  zh: {
    "nav.tools": "工具",
    "nav.about": "关于",
    "nav.tagline": "无需登录，立即可用。",
    "common.noLogin": "无需登录",
    "common.open": "打开",
    "common.backToTools": "返回工具列表",
    "common.policies": "政策说明",
    "home.badge.search": "为搜索而生",
    "home.badge.noSignup": "无需注册",
    "home.title": "一站式小工具：金融计算、单词练习与日常效率。",
    "home.subtitle":
      "界面简洁、结果即时、链接可分享。优先做用户真实会搜索的工具页。",
    "home.cta.browse": "浏览全部工具",
    "home.cta.popular": "热门工具",
    "home.search.placeholder": "搜索：房贷、复利、单词…",
    "home.idea.kicker": "SEO 优先（高 CPM 方向）",
    "home.idea.title": "合规 + 薪资/税务计算器与模板",
    "home.idea.desc": "从长尾页切入，例如“加州薪资税计算器 2026”。",
    "tools.title": "工具",
    "tools.subtitle": "全部工具免费使用，无需登录。",
    "tools.search.placeholder": "搜索工具…",
    "tabs.all": "全部",
    "about.title": "关于",
    "about.subtitle":
      "Quick Tools 是一个无需登录的小工具网站，目标是用更清爽的体验提供快速、可靠的结果。",
    "about.privacy.title": "隐私",
    "about.privacy.desc":
      "本站可能使用 Cookie 和本地存储用于基础功能（例如主题偏好）。如启用广告，Google 等第三方可能会使用 Cookie 基于你的访问记录投放广告。",
    "about.disclaimer.title": "免责声明",
    "about.disclaimer.desc":
      "本站工具仅供信息参考，不构成任何金融、法律或专业建议。",
    "about.contact.title": "联系",
    "tool.coming": "下一步将补齐完整计算器交互、图表与可分享链接。",
    "tool.label": "工具",
  },
};

export function useLocale() {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const toggleLocale = useLocaleStore((s) => s.toggleLocale);

  const t = useMemo(() => {
    const messages = MESSAGES[locale];
    return (key: keyof (typeof MESSAGES)["en"]) => messages[key] ?? key;
  }, [locale]);

  return { locale, setLocale, toggleLocale, t };
}
