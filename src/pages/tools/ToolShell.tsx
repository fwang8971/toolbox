import PageShell from "@/components/PageShell";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import type { ReactNode } from "react";

export default function ToolShell({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const { t } = useLocale();
  return (
    <PageShell>
      <div className="container-page">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <div>
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {t("tool.label")}
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {title}
            </h1>
            {description ? (
              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {description}
              </div>
            ) : null}
          </div>

          <div
            className={cn(
              "rounded-3xl border border-zinc-200 bg-white p-6",
              "dark:border-zinc-800 dark:bg-zinc-950",
            )}
          >
            {children}
          </div>

          {footer ? (
            <div className="flex flex-wrap items-center gap-3">{footer}</div>
          ) : null}
        </div>
      </div>
    </PageShell>
  );
}
