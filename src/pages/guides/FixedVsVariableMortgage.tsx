import { Link } from "react-router-dom";
import { useMemo } from "react";
import { FaqList, SectionCard } from "@/components/ContentBlocks";
import PageShell from "@/components/PageShell";
import { getAbsoluteUrl } from "@/lib/site";
import { useLocale } from "@/hooks/useLocale";

export default function FixedVsVariableMortgage() {
  const { locale } = useLocale();

  const content = useMemo(() => {
    if (locale === "zh") {
      return {
        title: "固定利率和浮动利率房贷怎么选",
        desc:
          "从月供稳定性、利率预期和现金流缓冲三个角度，帮助准备买房的人比较固定利率和浮动利率房贷。",
        intro:
          "很多人在看房贷报价时，第一反应是先看起始利率高低。但固定利率和浮动利率真正区别不只在眼前的数字，而在于未来月供是否可能变化、你能否承受这种变化，以及你打算持有房屋多久。",
        sections: [
          {
            title: "固定利率更适合先锁定月供的人",
            body: [
              "固定利率的最大优势是月供更稳定，适合希望长期控制住房现金流的人。",
              "如果你更在意预算可预测性，或者家庭支出已经比较紧，固定利率通常更容易做长期安排。",
              "它的代价往往是初始利率未必最低，但你买到的是稳定性和更低的不确定性。",
            ],
          },
          {
            title: "浮动利率更依赖未来利率路径",
            body: [
              "浮动利率方案有时起始利率更低，因此前期月供可能更轻。",
              "但如果未来利率上升，月供也可能同步增加，这会直接影响你的每月现金流压力。",
              "只有当你能接受利率波动，或者预计持有时间不长，浮动利率才更有讨论价值。",
            ],
          },
          {
            title: "比较时别只盯起始利率",
            body: [
              "先用房贷计算器输入固定利率方案，确认你想要的稳定月供区间。",
              "再把浮动利率按更高和更低两种假设做情景测试，观察月供变化有多大。",
              "如果利率上行后的月供已经接近你的预算上限，那么再低的起始利率也可能不值得冒险。",
            ],
          },
        ],
        toolsTitle: "建议一起打开的页面",
        tools: [
          {
            to: "/tools/mortgage",
            title: "房贷计算器",
            desc: "先比较不同利率下的月供、总利息和贷款年限。",
          },
          {
            to: "/guides/down-payment-guide",
            title: "首付准备指南",
            desc: "继续看首付比例、现金缓冲和月供风险之间的平衡。",
          },
        ],
        faqTitle: "常见问题",
        faqs: [
          {
            question: "固定利率是不是一定更划算？",
            answer:
              "不一定。固定利率买的是稳定性，不一定在所有利率环境下都最低成本。是否更划算，取决于未来利率走势和你对月供波动的承受能力。",
          },
          {
            question: "如果我几年后可能换房，还要选固定利率吗？",
            answer:
              "可以比较。如果持有周期较短，浮动利率的前期低月供可能更有吸引力，但仍要先测试利率上行时你是否扛得住更高月供。",
          },
        ],
        ctaTitle: "下一步",
        ctaDesc: "把固定利率和浮动利率的两到三个报价代入房贷计算器，再做高低利率情景测试，通常最容易看清风险。",
      };
    }

    return {
      title: "How to choose between fixed and variable rate mortgages",
      desc:
        "Compare payment stability, rate expectations, and cash-flow buffer before choosing between fixed and variable mortgage options.",
      intro:
        "Many buyers focus on the starting rate first. In practice, the more important question is how much payment uncertainty you can handle, how long you expect to keep the home, and whether a future rate increase would stress your budget.",
      sections: [
        {
          title: "Fixed rates fit buyers who want payment stability",
          body: [
            "The main strength of a fixed rate mortgage is predictable monthly payment.",
            "That makes it useful for households that want long-term budget control or already have tight recurring expenses.",
            "The trade-off is that the starting rate is not always the cheapest, but you gain more certainty.",
          ],
        },
        {
          title: "Variable rates depend more on future rate moves",
          body: [
            "A variable rate can start lower, which may reduce the initial monthly payment.",
            "But if rates rise later, your payment can rise with them and put more pressure on cash flow.",
            "That means variable rate borrowing is easier to consider when you can tolerate uncertainty or expect a shorter holding period.",
          ],
        },
        {
          title: "Do not compare only the teaser rate",
          body: [
            "Model the fixed rate offer first to find a payment level that feels safe.",
            "Then run the variable rate offer under both lower and higher rate assumptions to see how much the payment could move.",
            "If the higher-rate scenario already pushes your budget too far, the lower starting rate may not be worth the risk.",
          ],
        },
      ],
      toolsTitle: "Best pages to open next",
      tools: [
        {
          to: "/tools/mortgage",
          title: "Mortgage Calculator",
          desc: "Compare monthly payment, total interest, and loan term across multiple rate assumptions.",
        },
        {
          to: "/guides/down-payment-guide",
          title: "Down Payment Guide",
          desc: "Continue with the balance between down payment size, cash buffer, and payment risk.",
        },
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Is a fixed rate mortgage always the better deal?",
          answer:
            "No. A fixed rate buys stability, not always the lowest possible cost. The better choice depends on future rate conditions and your tolerance for payment changes.",
        },
        {
          question: "What if I may move again in a few years?",
          answer:
            "Then a variable option can be worth comparing, but you should still test whether a higher-rate scenario would become uncomfortable before choosing it.",
        },
      ],
      ctaTitle: "Next Step",
      ctaDesc:
        "Put two or three real quotes into the mortgage calculator and test both conservative and optimistic rate scenarios before deciding.",
    };
  }, [locale]);

  const schema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: content.title,
          description: content.desc,
          url: getAbsoluteUrl("/guides/fixed-vs-variable-mortgage"),
          author: {
            "@type": "Organization",
            name: "Quick Tools",
          },
          publisher: {
            "@type": "Organization",
            name: "Quick Tools",
          },
          inLanguage: locale === "zh" ? "zh-CN" : "en-US",
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: locale === "zh" ? "首页" : "Home",
              item: getAbsoluteUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: locale === "zh" ? "专题指南" : "Guides",
              item: getAbsoluteUrl("/guides"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: content.title,
              item: getAbsoluteUrl("/guides/fixed-vs-variable-mortgage"),
            },
          ],
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
  }, [content, locale]);

  return (
    <PageShell title={content.title} description={content.desc} schema={schema}>
      <div className="container-page">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              {locale === "zh" ? "房贷利率指南" : "Mortgage Rate Guide"}
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">{content.title}</h1>
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {content.intro}
            </p>
          </div>

          <div className="mt-8 grid gap-6">
            {content.sections.map((section) => (
              <SectionCard key={section.title} title={section.title}>
                {section.body.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </SectionCard>
            ))}
          </div>

          <SectionCard title={content.toolsTitle} className="mt-8">
            <div className="grid gap-4 md:grid-cols-2">
              {content.tools.map((item) => (
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

          <SectionCard title={content.faqTitle} className="mt-8">
            <FaqList items={content.faqs} />
          </SectionCard>

          <SectionCard title={content.ctaTitle} className="mt-8">
            <p>{content.ctaDesc}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/tools/mortgage"
                className="inline-flex h-10 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                {locale === "zh" ? "打开房贷计算器" : "Open Mortgage Calculator"}
              </Link>
              <Link
                to="/guides"
                className="inline-flex h-10 items-center justify-center rounded-2xl border border-zinc-200 px-4 text-sm font-medium text-zinc-800 transition hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-700"
              >
                {locale === "zh" ? "返回专题页" : "Back to Guides"}
              </Link>
            </div>
          </SectionCard>
        </div>
      </div>
    </PageShell>
  );
}
