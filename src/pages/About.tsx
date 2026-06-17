import PageShell from "@/components/PageShell";
import PolicyLinks from "@/components/PolicyLinks";
import { useLocale } from "@/hooks/useLocale";

export default function About() {
  const { locale, t } = useLocale();

  return (
    <PageShell title={t("about.title")} description={t("about.subtitle")}>
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
                {locale === "zh" ? "站点说明" : "About This Site"}
              </div>
              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {locale === "zh"
                  ? "Quick Tools 专注于可直接使用的在线工具。我们希望每个页面不仅能输出结果，还能解释结果如何得出、适合哪些场景以及相关风险提示。"
                  : "Quick Tools focuses on practical tools you can use immediately. Each page aims to provide not only results, but also explanations, examples, and context."}
              </div>
            </section>

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
                  href="mailto:fwang8971@gmail.com"
                >
                  fwang8971@gmail.com
                </a>
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-sm font-semibold">
                {locale === "zh" ? "政策页面" : "Policy Pages"}
              </div>
              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {locale === "zh"
                  ? "如果你需要查看更完整的隐私、条款和免责声明，可以直接访问以下独立页面。"
                  : "If you need the full privacy, terms, and disclaimer documents, use the dedicated pages below."}
              </div>
              <PolicyLinks locale={locale} className="mt-4" />
            </section>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
