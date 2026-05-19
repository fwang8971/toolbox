import type { ToolCategory } from "@/data/tools";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/types";
import { useLocale } from "@/hooks/useLocale";

export default function CategoryTabs({
  categories,
  active,
  onChange,
}: {
  categories: { id: ToolCategory; label: Record<Locale, string> }[];
  active: ToolCategory | "All";
  onChange: (next: ToolCategory | "All") => void;
}) {
  const { locale } = useLocale();
  const items = [
    { id: "All" as const, label: { en: "All", zh: "全部" } },
    ...categories,
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((c) => {
        const isActive = c.id === active;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onChange(c.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition",
              isActive
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-950"
                : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-700",
            )}
          >
            {c.label[locale]}
          </button>
        );
      })}
    </div>
  );
}
