import { Link } from "react-router-dom";
import { FaqList, SectionCard } from "@/components/ContentBlocks";
import PageShell from "@/components/PageShell";
import PolicyLinks from "@/components/PolicyLinks";
import SearchBar from "@/components/SearchBar";
import ToolCard from "@/components/ToolCard";
import CategoryTabs from "@/components/CategoryTabs";
import { TOOL_CATEGORIES, TOOLS, type ToolCategory } from "@/data/tools";
import { getAbsoluteUrl } from "@/lib/site";
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

  const homeContent = useMemo(() => {
    if (locale === "zh") {
      return {
        trustTitle: "为什么这个站点更容易通过审核",
        trustItems: [
          {
            title: "有明确用途",
            desc: "每个工具都围绕真实搜索需求设计，并提供结果解释与使用说明。",
          },
          {
            title: "有完整政策页",
            desc: "隐私政策、服务条款和免责声明独立展示，提升透明度与信任感。",
          },
          {
            title: "有站内内链",
            desc: "相关工具互相跳转，帮助用户继续浏览，而不是只停留在单一表单。",
          },
        ],
        clustersTitle: "从这些主题开始使用",
        journeysTitle: "常见用户路径",
        journeys: [
          {
            title: "准备买房",
            desc: "先看房贷月供，再切换到贷款页比较不同期限和利率的总成本差异。",
            primary: { to: "/tools/mortgage", label: "先算房贷" },
            secondary: { to: "/tools/loan", label: "继续比较贷款" },
          },
          {
            title: "准备长期投资",
            desc: "先估算复利终值，再用在线计算器核对中间步骤和预算变化。",
            primary: { to: "/tools/compound-interest", label: "查看复利方案" },
            secondary: { to: "/tools/calculator", label: "打开在线计算器" },
          },
          {
            title: "练习英语词汇",
            desc: "先生成符合规则的单词，再用接龙做拼写和反应训练。",
            primary: { to: "/tools/word-generator", label: "生成单词" },
            secondary: { to: "/tools/word-chain", label: "开始接龙" },
          },
        ],
        ctaTitle: "从高意图页面开始更容易找到结果",
        ctaDesc:
          "如果你是从搜索进入本站，优先查看房贷、贷款和复利页面，通常能更快匹配真实测算需求。",
        ctaLinks: [
          { to: "/tools/mortgage", label: "房贷计算器" },
          { to: "/tools/loan", label: "贷款计算器" },
          { to: "/tools/compound-interest", label: "复利计算器" },
        ],
        faqTitle: "首页常见问题",
        faqs: [
          {
            question: "这些在线工具需要注册吗？",
            answer:
              "不需要。当前所有核心工具都可以直接打开使用，适合快速测算、英语练习和分享链接。",
          },
          {
            question: "这个站点主要提供哪些内容？",
            answer:
              "目前重点包括房贷计算器、贷款计算器、复利计算器、在线计算器，以及单词接龙和单词生成器等英语工具。",
          },
        ],
        clusters: [
          {
            title: "房贷与贷款",
            desc: "适合比较月供、总利息与不同贷款期限。",
            links: [
              { to: "/tools/mortgage", label: "房贷计算器" },
              { to: "/tools/loan", label: "贷款计算器" },
            ],
          },
          {
            title: "投资与复利",
            desc: "帮助你估算长期投入后的资产增长。",
            links: [
              { to: "/tools/compound-interest", label: "复利计算器" },
              { to: "/tools/calculator", label: "在线计算器" },
            ],
          },
          {
            title: "英语练习",
            desc: "用单词接龙和生成器做轻量词汇训练。",
            links: [
              { to: "/tools/word-chain", label: "单词接龙" },
              { to: "/tools/word-generator", label: "单词生成器" },
            ],
          },
        ],
      };
    }

    return {
      trustTitle: "Why This Site Feels More Trustworthy",
      trustItems: [
        {
          title: "Clear utility",
          desc: "Each tool solves a specific search-driven problem and explains the result.",
        },
        {
          title: "Complete policy pages",
          desc: "Privacy, terms, and disclaimer documents are available as separate pages.",
        },
        {
          title: "Helpful internal links",
          desc: "Related tools connect to each other so users can continue their journey.",
        },
      ],
      clustersTitle: "Start With These Topics",
      journeysTitle: "Common User Journeys",
      journeys: [
        {
          title: "Planning to buy a home",
          desc: "Start with mortgage payments, then switch to the loan page to compare longer terms and APR trade-offs.",
          primary: { to: "/tools/mortgage", label: "Start with mortgage" },
          secondary: { to: "/tools/loan", label: "Compare loan options" },
        },
        {
          title: "Planning long-term investing",
          desc: "Estimate compound growth first, then use the calculator to verify supporting numbers and budget changes.",
          primary: { to: "/tools/compound-interest", label: "View compound growth" },
          secondary: { to: "/tools/calculator", label: "Open calculator" },
        },
        {
          title: "Practicing English vocabulary",
          desc: "Generate pattern-based words first, then use word chain for spelling and reaction practice.",
          primary: { to: "/tools/word-generator", label: "Generate words" },
          secondary: { to: "/tools/word-chain", label: "Play word chain" },
        },
      ],
      ctaTitle: "Start With High-Intent Pages",
      ctaDesc:
        "If you arrived from search, the mortgage, loan, and compound interest pages usually match the strongest calculation intent first.",
      ctaLinks: [
        { to: "/tools/mortgage", label: "Mortgage Calculator" },
        { to: "/tools/loan", label: "Loan Calculator" },
        { to: "/tools/compound-interest", label: "Compound Interest" },
      ],
      faqTitle: "Home FAQ",
      faqs: [
        {
          question: "Do these online tools require sign-up?",
          answer:
            "No. All core tools can be used instantly without registration, which makes them useful for fast calculations, language practice, and shareable links.",
        },
        {
          question: "What kinds of tools does this site offer?",
          answer:
            "The site currently focuses on mortgage calculators, loan calculators, compound interest tools, a general calculator, and English word practice tools.",
        },
      ],
      clusters: [
        {
          title: "Mortgages and Loans",
          desc: "Compare monthly payments, total interest, and loan terms.",
          links: [
            { to: "/tools/mortgage", label: "Mortgage Calculator" },
            { to: "/tools/loan", label: "Loan Calculator" },
          ],
        },
        {
          title: "Investing and Compounding",
          desc: "Estimate long-term growth with recurring contributions.",
          links: [
            { to: "/tools/compound-interest", label: "Compound Interest" },
            { to: "/tools/calculator", label: "Online Calculator" },
          ],
        },
        {
          title: "English Practice",
          desc: "Use quick word games for lightweight vocabulary practice.",
          links: [
            { to: "/tools/word-chain", label: "Word Chain" },
            { to: "/tools/word-generator", label: "Word Generator" },
          ],
        },
      ],
    };
  }, [locale]);

  const schema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          name: "Quick Tools",
          url: getAbsoluteUrl("/"),
          inLanguage: locale === "zh" ? "zh-CN" : "en-US",
        },
        {
          "@type": "FAQPage",
          mainEntity: homeContent.faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        },
      ],
    };
  }, [homeContent.faqs, locale]);

  return (
    <PageShell
      title={t("home.title")}
      description={t("home.subtitle")}
      schema={schema}
    >
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
                  ariaLabel={locale === "zh" ? "搜索首页工具" : "Search tools on the homepage"}
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

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            {homeContent.trustTitle}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {homeContent.trustItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="text-sm font-semibold">{item.title}</div>
                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {homeContent.clustersTitle}
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {locale === "zh"
                  ? "按真实场景浏览相关工具，能更快找到合适的计算和练习页面。"
                  : "Browse related tools by use case to find the page you need faster."}
              </p>
            </div>
            <PolicyLinks locale={locale} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {homeContent.clusters.map((cluster) => (
              <div
                key={cluster.title}
                className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
              >
                <div className="text-sm font-semibold">{cluster.title}</div>
                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {cluster.desc}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cluster.links.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="inline-flex h-9 items-center justify-center rounded-xl bg-zinc-100 px-3 text-sm font-medium text-zinc-800 transition hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            {homeContent.journeysTitle}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {homeContent.journeys.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="text-sm font-semibold">{item.title}</div>
                <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {item.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to={item.primary.to}
                    className="inline-flex h-9 items-center justify-center rounded-xl bg-zinc-900 px-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    {item.primary.label}
                  </Link>
                  <Link
                    to={item.secondary.to}
                    className="inline-flex h-9 items-center justify-center rounded-xl border border-zinc-200 px-3 text-sm font-medium text-zinc-800 transition hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-700"
                  >
                    {item.secondary.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
          <h2 className="text-2xl font-semibold tracking-tight">{homeContent.ctaTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            {homeContent.ctaDesc}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {homeContent.ctaLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="inline-flex h-10 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <SectionCard title={homeContent.faqTitle} className="mt-10">
          <FaqList items={homeContent.faqs} />
        </SectionCard>
      </div>
    </PageShell>
  );
}
