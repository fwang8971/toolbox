import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useLocale } from "@/hooks/useLocale";
import PageShell from "@/components/PageShell";
import { SectionCard } from "@/components/ContentBlocks";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const { locale } = useLocale();

  const t = useMemo(() => {
    if (locale === "zh") {
      return {
        title: "页面未找到",
        desc: "你访问的页面不存在、已移动，或链接暂时不可用。",
        badge: "404",
        body: "请返回首页、工具列表或关于页面继续浏览站点内容。",
        home: "返回首页",
        tools: "查看工具",
        about: "关于本站",
      };
    }

    return {
      title: "Page Not Found",
      desc: "The page you requested does not exist, may have moved, or is temporarily unavailable.",
      badge: "404",
      body: "Return to the homepage, browse tools, or visit the about page to continue exploring the site.",
      home: "Back Home",
      tools: "Browse Tools",
      about: "About",
    };
  }, [locale]);

  return (
    <PageShell title={t.title} description={t.desc} robots="noindex, follow">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <SectionCard title={t.title} className="text-center">
            <div className="mx-auto inline-flex rounded-full border border-zinc-200 px-4 py-1 text-sm font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              {t.badge}
            </div>
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {t.body}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white",
                  "transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200",
                )}
              >
                {t.home}
              </Link>
              <Link
                to="/tools"
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800",
                  "transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700",
                )}
              >
                {t.tools}
              </Link>
              <Link
                to="/about"
                className="inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-medium text-zinc-500 underline underline-offset-4 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                {t.about}
              </Link>
            </div>
          </SectionCard>
        </div>
      </div>
    </PageShell>
  );
}
