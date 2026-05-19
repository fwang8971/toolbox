import { Link } from "react-router-dom";
import { TOOL_CATEGORIES, type ToolDefinition } from "@/data/tools";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

export default function ToolCard({ tool }: { tool: ToolDefinition }) {
  const { locale, t } = useLocale();
  const categoryLabel =
    TOOL_CATEGORIES.find((c) => c.id === tool.category)?.label[locale] ??
    tool.category;
  return (
    <Link
      to={`/tools/${tool.slug}`}
      className={cn(
        "group relative rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition",
        "hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {tool.name[locale]}
          </div>
          <div className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
            {tool.description[locale]}
          </div>
        </div>
        <div className="shrink-0 rounded-full border border-zinc-200 px-2 py-1 text-[11px] font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
          {categoryLabel}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-zinc-500 dark:text-zinc-500">
          {t("common.noLogin")}
        </div>
        <div className="text-xs font-medium text-zinc-900 underline-offset-4 group-hover:underline dark:text-zinc-50">
          {t("common.open")}
        </div>
      </div>
    </Link>
  );
}
