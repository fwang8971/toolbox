import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

export default function ToolPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { t } = useLocale();
  return (
    <PageShell>
      <div className="container-page">
        <div className="flex max-w-3xl flex-col gap-6">
          <div>
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {t("tool.label")}
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {title}
            </h1>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {description}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              {t("tool.coming")}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/tools"
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white",
                "transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200",
              )}
            >
              {t("common.backToTools")}
            </Link>
            <Link
              to="/about"
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800",
                "transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700",
              )}
            >
              {t("common.policies")}
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
