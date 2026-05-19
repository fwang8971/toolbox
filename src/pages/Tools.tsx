import { useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import SearchBar from "@/components/SearchBar";
import ToolCard from "@/components/ToolCard";
import CategoryTabs from "@/components/CategoryTabs";
import { TOOL_CATEGORIES, TOOLS, type ToolCategory } from "@/data/tools";
import { useLocale } from "@/hooks/useLocale";

export default function Tools() {
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
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {t("tools.title")}
            </h1>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {t("tools.subtitle")}
            </div>
          </div>

          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={t("tools.search.placeholder")}
          />

          <CategoryTabs
            categories={TOOL_CATEGORIES}
            active={activeCategory}
            onChange={setActiveCategory}
          />

          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
