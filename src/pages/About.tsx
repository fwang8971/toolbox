import PageShell from "@/components/PageShell";
import { useLocale } from "@/hooks/useLocale";

export default function About() {
  const { t } = useLocale();

  return (
    <PageShell>
      <div className="container-page">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight">
            {t("about.title")}
          </h1>
          <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            {t("about.subtitle")}
          </div>

          <div className="mt-8 space-y-6">
            <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-sm font-semibold">
                {t("about.privacy.title")}
              </div>
              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {t("about.privacy.desc")}
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-sm font-semibold">
                {t("about.disclaimer.title")}
              </div>
              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {t("about.disclaimer.desc")}
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-sm font-semibold">
                {t("about.contact.title")}
              </div>
              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                <a
                  className="underline underline-offset-4"
                  href="mailto:1026365791@qq.com"
                >
                  1026365791@qq.com
                </a>
                <span className="mx-2 text-zinc-400">/</span>
                <a
                  className="underline underline-offset-4"
                  href="mailto:fwang8971@gmai.com"
                >
                  fwang8971@gmai.com
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
