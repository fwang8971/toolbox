import PageShell from "@/components/PageShell";
import PolicyLinks from "@/components/PolicyLinks";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import type { ReactNode } from "react";

export default function ToolShell({
  title,
  description,
  schema,
  children,
  footer,
}: {
  title: string;
  description?: string;
  schema?: unknown;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const { locale, t } = useLocale();
  return (
    <PageShell title={title} description={description} schema={schema}>
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

          <PolicyLinks locale={locale} />
        </div>
      </div>
    </PageShell>
  );
}
