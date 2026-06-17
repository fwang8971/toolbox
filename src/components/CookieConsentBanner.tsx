import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  COOKIE_CONSENT_OPEN_EVENT,
  readCookieConsent,
  saveCookieConsent,
} from "@/lib/consent";
import { useLocale } from "@/hooks/useLocale";

export default function CookieConsentBanner() {
  const { locale } = useLocale();
  const [visible, setVisible] = useState(() => readCookieConsent() === null);
  const [expanded, setExpanded] = useState(false);
  const [savedAdsConsent, setSavedAdsConsent] = useState(() => readCookieConsent()?.ads ?? false);

  useEffect(() => {
    const handleOpen = () => {
      setSavedAdsConsent(readCookieConsent()?.ads ?? false);
      setExpanded(true);
      setVisible(true);
    };

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpen);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpen);
    };
  }, []);

  const t = useMemo(() => {
    if (locale === "zh") {
      return {
        title: "Cookie 与广告同意",
        desc:
          "本站使用必要的本地存储来保存语言、主题等偏好。经你同意后，我们也会加载广告相关 Cookie，用于展示和衡量 AdSense 广告。",
        essential: "必要功能",
        essentialDesc: "始终开启，用于语言、主题和基础站点体验。",
        ads: "广告 Cookie",
        adsDesc: "仅在你同意后启用，用于加载 Google AdSense 并展示更相关的广告。",
        accept: "接受全部",
        essentialOnly: "仅必要功能",
        manage: "管理设置",
        saveAds: "允许广告 Cookie",
        currentOn: "当前状态：已允许广告 Cookie。",
        currentOff: "当前状态：仅必要功能。",
        policy: "查看隐私政策",
      };
    }

    return {
      title: "Cookie and Ad Consent",
      desc:
        "This site uses essential local storage for language, theme, and basic preferences. With your permission, it also loads ad-related cookies for Google AdSense delivery and measurement.",
      essential: "Essential",
      essentialDesc: "Always on for language, theme, and core site experience.",
      ads: "Advertising cookies",
      adsDesc: "Enabled only with your consent to load Google AdSense and support more relevant ads.",
      accept: "Accept all",
      essentialOnly: "Essential only",
      manage: "Manage settings",
      saveAds: "Allow advertising cookies",
      currentOn: "Current status: advertising cookies allowed.",
      currentOff: "Current status: essential only.",
      policy: "Read privacy policy",
    };
  }, [locale]);

  if (!visible) {
    return null;
  }

  const save = (ads: boolean) => {
    saveCookieConsent({ ads });
    setSavedAdsConsent(ads);
    setVisible(false);
    setExpanded(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="container-page py-4">
        <div className="grid gap-4 lg:grid-cols-[1.6fr_0.9fr] lg:items-end">
          <div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {t.title}
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {t.desc}{" "}
              <Link
                to="/privacy-policy"
                className="font-medium underline underline-offset-4"
              >
                {t.policy}
              </Link>
            </p>
            <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              {savedAdsConsent ? t.currentOn : t.currentOff}
            </div>

            {expanded ? (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {t.essential}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                    {t.essentialDesc}
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {t.ads}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                    {t.adsDesc}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <button
              type="button"
              onClick={() => save(true)}
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white",
                "transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200",
              )}
            >
              {expanded ? t.saveAds : t.accept}
            </button>
            <button
              type="button"
              onClick={() => save(false)}
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800",
                "transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700",
              )}
            >
              {t.essentialOnly}
            </button>
            {!expanded ? (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-medium text-zinc-500 underline underline-offset-4 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                {t.manage}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
