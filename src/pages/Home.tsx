import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import SearchBar from "@/components/SearchBar";
import ToolCard from "@/components/ToolCard";
import CategoryTabs from "@/components/CategoryTabs";
import { TOOL_CATEGORIES, TOOLS, type ToolCategory } from "@/data/tools";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { useLocale } from "@/hooks/useLocale";

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "All">(
    "All",
  );
  const { locale, t } = useLocale();

  const visibleTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((t) => {
      if (activeCategory !== "All" && t.category !== activeCategory) {
        return false;
      }
      if (!q) {
        return true;
      }
      return (
        t.name[locale].toLowerCase().includes(q) ||
        t.description[locale].toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, locale, query]);

  return (
    <PageShell>
      <div className="container-page">
        <section className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              {t("home.badge.search")}
              <span className="text-zinc-400 dark:text-zinc-500">•</span>
              {t("home.badge.noSignup")}
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              {t("home.title")}
            </h1>
            <p className="mt-4 max-w-prose text-sm text-zinc-600 dark:text-zinc-400">
              {t("home.subtitle")}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/tools"
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white",
                  "transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200",
                )}
              >
                {t("home.cta.browse")}
              </Link>
              <a
                href="#popular"
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800",
                  "transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700",
                )}
              >
                {t("home.cta.popular")}
              </a>
            </div>

            <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {t("home.idea.kicker")}
              </div>
              <div className="mt-2 text-sm font-semibold">
                {t("home.idea.title")}
              </div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {t("home.idea.desc")}
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex flex-col gap-4">
                <SearchBar
                  value={query}
                  onChange={setQuery}
                  placeholder={t("home.search.placeholder")}
                />
                <CategoryTabs
                  categories={TOOL_CATEGORIES}
                  active={activeCategory}
                  onChange={setActiveCategory}
                />
              </div>

              <div
                id="popular"
                className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {visibleTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
