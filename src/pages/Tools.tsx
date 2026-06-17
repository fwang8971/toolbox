import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaqList, SectionCard } from "@/components/ContentBlocks";
import PageShell from "@/components/PageShell";
import PolicyLinks from "@/components/PolicyLinks";
import SearchBar from "@/components/SearchBar";
import ToolCard from "@/components/ToolCard";
import CategoryTabs from "@/components/CategoryTabs";
import { TOOL_CATEGORIES, TOOLS, type ToolCategory } from "@/data/tools";
import { useLocale } from "@/hooks/useLocale";
import { getAbsoluteUrl } from "@/lib/site";

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

  const content = useMemo(() => {
    if (locale === "zh") {
      return {
        intro:
          "这个页面汇总了当前所有可用工具，适合从搜索页、广告页或首页继续向下浏览。你可以按分类筛选，也可以直接搜索房贷、贷款、复利、计算器或英语工具。",
        groupsTitle: "热门使用场景",
        quickStartTitle: "如何快速找到合适工具",
        quickStarts: [
          "如果你关心月供、总利息和贷款方案对比，优先看房贷计算器和贷款计算器。",
          "如果你想估算长期资金增长，先用复利计算器，再配合在线计算器核对步骤。",
          "如果你来自英语学习场景，先按规则生成单词，再用接龙巩固拼写和反应。",
        ],
        featuredTitle: "高意图工具入口",
        featuredLinks: [
          {
            to: "/tools/mortgage",
            title: "房贷计算器",
            desc: "适合买房前比较月供、总利息和不同贷款年限。",
          },
          {
            to: "/tools/loan",
            title: "贷款计算器",
            desc: "适合车贷、消费贷或教育分期等通用借款场景。",
          },
          {
            to: "/tools/compound-interest",
            title: "复利计算器",
            desc: "适合长期投资、教育金和退休金目标测算。",
          },
        ],
        guideTitle: "先读专题，再选工具",
        guideDesc:
          "对于房贷和复利这类需要理解背景的主题，专题页能先解释比较框架和常见误区，再进入工具页做更具体的测算。",
        guideLinks: [
          {
            to: "/guides/mortgage-payment-guide",
            title: "房贷比较指南",
            desc: "帮助理解月供、总利息和首付之间的取舍。",
          },
          {
            to: "/guides/home-affordability-basics",
            title: "购房预算指南",
            desc: "帮助先判断房价区间、现金缓冲和购房风险。",
          },
          {
            to: "/guides/loan-comparison-guide",
            title: "贷款比较指南",
            desc: "帮助理解不同报价里 APR、期限和费用的作用。",
          },
          {
            to: "/guides/compound-interest-basics",
            title: "复利基础指南",
            desc: "帮助理解长期年限、收益率和定投节奏的作用。",
          },
        ],
        groups: [
          {
            title: "贷款与买房测算",
            desc: "先比较房贷月供，再切到通用贷款页看不同期限和利率的影响。",
            links: [
              { to: "/tools/mortgage", label: "房贷计算器" },
              { to: "/tools/loan", label: "贷款计算器" },
            ],
          },
          {
            title: "投资与复利规划",
            desc: "用复利计算器看长期增长，再用在线计算器做中间步骤辅助。",
            links: [
              { to: "/tools/compound-interest", label: "复利计算器" },
              { to: "/tools/calculator", label: "在线计算器" },
            ],
          },
          {
            title: "英语词汇练习",
            desc: "先用单词生成器做模式训练，再用单词接龙练习反应与拼写。",
            links: [
              { to: "/tools/word-generator", label: "单词生成器" },
              { to: "/tools/word-chain", label: "单词接龙" },
            ],
          },
        ],
        faqTitle: "常见问题",
        faqs: [
          {
            question: "这些工具需要登录吗？",
            answer:
              "不需要。当前全部工具都可以直接在线使用，适合快速试算、学习和分享链接。",
          },
          {
            question: "为什么工具页里还要加说明和 FAQ？",
            answer:
              "因为用户不仅需要结果，还需要知道结果怎么理解、适合什么场景以及有哪些限制，这也有助于搜索引擎理解页面价值。",
          },
        ],
      };
    }

    return {
      intro:
        "This page indexes all current tools and is designed for users who want to continue browsing after landing from search, social, or ads. Filter by category or search directly for mortgage, loan, compound interest, calculator, or word tools.",
      groupsTitle: "Popular Use Cases",
      quickStartTitle: "How To Find The Right Tool Fast",
      quickStarts: [
        "If you care about monthly payments, interest cost, and repayment options, start with the mortgage and loan calculators.",
        "If you want to project long-term growth, use the compound interest page first and the calculator for supporting math.",
        "If you are here for English practice, generate words by rule first and then use word chain for spelling drills.",
      ],
      featuredTitle: "High-Intent Entry Points",
      featuredLinks: [
        {
          to: "/tools/mortgage",
          title: "Mortgage Calculator",
          desc: "Useful for home-buying research, affordability checks, and term comparisons.",
        },
        {
          to: "/tools/loan",
          title: "Loan Calculator",
          desc: "Useful for auto loans, personal loans, education financing, and APR comparisons.",
        },
        {
          to: "/tools/compound-interest",
          title: "Compound Interest",
          desc: "Useful for long-term investing, education funds, and retirement planning.",
        },
      ],
      guideTitle: "Read A Guide First",
      guideDesc:
        "For topics like mortgages and compounding, a guide can explain the framework and common mistakes before you use the calculator.",
      guideLinks: [
        {
          to: "/guides/mortgage-payment-guide",
          title: "Mortgage Guide",
          desc: "Understand the trade-off between payment, interest cost, and down payment.",
        },
        {
          to: "/guides/home-affordability-basics",
          title: "Affordability Guide",
          desc: "Understand target price, cash buffer, and housing risk before borrowing.",
        },
        {
          to: "/guides/loan-comparison-guide",
          title: "Loan Comparison Guide",
          desc: "Understand how APR, fees, and term length shape real borrowing cost.",
        },
        {
          to: "/guides/compound-interest-basics",
          title: "Compounding Guide",
          desc: "Understand the role of timeline, return rate, and recurring contributions.",
        },
      ],
      groups: [
        {
          title: "Home and Loan Planning",
          desc: "Start with mortgage comparisons, then switch to the general loan page for term and APR trade-offs.",
          links: [
            { to: "/tools/mortgage", label: "Mortgage Calculator" },
            { to: "/tools/loan", label: "Loan Calculator" },
          ],
        },
        {
          title: "Investing and Compounding",
          desc: "Estimate long-term growth with the compound interest page and use the calculator for supporting math.",
          links: [
            { to: "/tools/compound-interest", label: "Compound Interest" },
            { to: "/tools/calculator", label: "Online Calculator" },
          ],
        },
        {
          title: "English Practice",
          desc: "Use the generator for pattern drills and the chain game for spelling and reaction practice.",
          links: [
            { to: "/tools/word-generator", label: "Word Generator" },
            { to: "/tools/word-chain", label: "Word Chain" },
          ],
        },
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Do these tools require an account?",
          answer:
            "No. All tools are currently free to use without login, which makes them suitable for quick calculations, study, and shareable links.",
        },
        {
          question: "Why do the tool pages include explanations and FAQ sections?",
          answer:
            "Because users need context, examples, and limitations, not only raw output. This also makes the pages more useful and more understandable to search engines.",
        },
      ],
    };
  }, [locale]);

  const schema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          name: t("tools.title"),
          description: t("tools.subtitle"),
          url: getAbsoluteUrl("/tools"),
          mainEntity: {
            "@type": "ItemList",
            itemListElement: TOOLS.map((tool, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: tool.name[locale],
              url: getAbsoluteUrl(`/tools/${tool.slug}`),
            })),
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: content.faqs.map((item) => ({
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
  }, [content.faqs, locale, t]);

  return (
    <PageShell
      title={t("tools.title")}
      description={t("tools.subtitle")}
      schema={schema}
    >
      <div className="container-page">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {t("tools.title")}
            </h1>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {t("tools.subtitle")}
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {content.intro}
            </p>
          </div>

          <PolicyLinks locale={locale} />

          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={t("tools.search.placeholder")}
            ariaLabel={locale === "zh" ? "搜索工具目录" : "Search tools in the directory"}
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

          <SectionCard title={content.quickStartTitle} className="mt-6">
            <div className="grid gap-3">
              {content.quickStarts.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-zinc-200 p-4 text-sm leading-7 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
                >
                  {item}
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title={content.groupsTitle} className="mt-6">
            <div className="grid gap-4 md:grid-cols-3">
              {content.groups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800"
                >
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {group.title}
                  </div>
                  <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {group.desc}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.links.map((item) => (
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
          </SectionCard>

          <SectionCard title={content.featuredTitle}>
            <div className="grid gap-4 md:grid-cols-3">
              {content.featuredLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-2xl border border-zinc-200 p-4 transition hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                >
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </div>
                  <div className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                    {item.desc}
                  </div>
                </Link>
              ))}
            </div>
          </SectionCard>

          <SectionCard title={content.guideTitle}>
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {content.guideDesc}
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {content.guideLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-2xl border border-zinc-200 p-4 transition hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                >
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </div>
                  <div className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                    {item.desc}
                  </div>
                </Link>
              ))}
            </div>
          </SectionCard>

          <SectionCard title={content.faqTitle}>
            <FaqList items={content.faqs} />
          </SectionCard>
        </div>
      </div>
    </PageShell>
  );
}
