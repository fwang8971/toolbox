import { Link } from "react-router-dom";
import { useMemo } from "react";
import { FaqList, SectionCard } from "@/components/ContentBlocks";
import PageShell from "@/components/PageShell";
import { getAbsoluteUrl } from "@/lib/site";
import { useLocale } from "@/hooks/useLocale";

export default function Guides() {
  const { locale } = useLocale();

  const content = useMemo(() => {
    if (locale === "zh") {
      return {
        title: "专题指南",
        desc:
          "围绕房贷、贷款和复利这些高意图主题，提供更完整的背景说明、比较思路和工具入口，帮助用户理解结果并继续浏览站点。",
        intro:
          "这些专题页用于补充工具页之外的解释内容，适合从搜索结果进入后先了解概念，再跳转到对应工具页做具体测算。",
        cards: [
          {
            to: "/guides/mortgage-payment-guide",
            title: "房贷月供怎么比较更有效",
            desc: "解释年限、利率、首付和总利息之间的关系，并给出实际比较步骤。",
          },
          {
            to: "/guides/home-affordability-basics",
            title: "买房前怎么判断房子是否真的买得起",
            desc: "帮助理解房价区间、现金缓冲和收入稳定性之间的关系。",
          },
          {
            to: "/guides/loan-comparison-guide",
            title: "贷款报价怎么比较，才不会只看到低月供",
            desc: "解释 APR、期限、费用和总成本如何一起影响借款决策。",
          },
          {
            to: "/guides/compound-interest-basics",
            title: "复利为什么会拉开长期差距",
            desc: "解释投入周期、收益率和定投节奏如何共同影响最终资产。",
          },
        ],
        faqTitle: "专题页常见问题",
        faqs: [
          {
            question: "为什么工具站还要有专题页？",
            answer:
              "因为很多用户在开始计算前并不完全清楚要输入什么、结果代表什么。专题页能提供上下文和决策框架，也有助于搜索引擎理解站点主题深度。",
          },
          {
            question: "专题页和工具页有什么关系？",
            answer:
              "专题页解释思路和场景，工具页负责具体输入输出。两者互相链接，能让用户从阅读自然过渡到操作。",
          },
        ],
      };
    }

    return {
      title: "Guides",
      desc:
        "Longer-form pages for mortgages, loans, and compound growth that add context, comparisons, and next-step tool links beyond raw calculators.",
      intro:
        "These guide pages support users who arrive from search and need explanation first, then a calculator to continue with a specific scenario.",
      cards: [
        {
          to: "/guides/mortgage-payment-guide",
          title: "How to compare mortgage payments",
          desc: "Learn how term length, APR, down payment, and total interest change the decision.",
        },
          {
            to: "/guides/home-affordability-basics",
            title: "How to tell if a home is truly affordable",
            desc: "Use payment, cash buffer, and income stability together before choosing a target price.",
          },
          {
            to: "/guides/loan-comparison-guide",
            title: "How to compare loan offers",
            desc: "Understand how APR, fees, and term length shape the real borrowing cost.",
          },
        {
          to: "/guides/compound-interest-basics",
          title: "Why compounding changes long-term outcomes",
          desc: "Understand how time, return rate, and contribution habits shape ending balance.",
        },
      ],
      faqTitle: "Guide FAQ",
      faqs: [
        {
          question: "Why does a tool site need guide pages?",
          answer:
            "Because many users need context before they can use a calculator well. Guide pages explain inputs, outcomes, and trade-offs while strengthening topic depth for search engines.",
        },
        {
          question: "How do guides relate to the tool pages?",
          answer:
            "Guides explain the idea and scenario, while tool pages handle the actual calculation. Internal links connect reading intent with action intent.",
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
          name: content.title,
          description: content.desc,
          url: getAbsoluteUrl("/guides"),
          mainEntity: {
            "@type": "ItemList",
            itemListElement: content.cards.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.title,
              url: getAbsoluteUrl(item.to),
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
  }, [content]);

  return (
    <PageShell title={content.title} description={content.desc} schema={schema}>
      <div className="container-page">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight">{content.title}</h1>
            <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {content.intro}
            </p>
          </div>

          <section className="mt-8 grid gap-4 md:grid-cols-2">
            {content.cards.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
              >
                <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </div>
                <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {item.desc}
                </p>
              </Link>
            ))}
          </section>

          <SectionCard title={content.faqTitle} className="mt-8">
            <FaqList items={content.faqs} />
          </SectionCard>
        </div>
      </div>
    </PageShell>
  );
}
