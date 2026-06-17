import { Link } from "react-router-dom";
import { useMemo } from "react";
import { FaqList, SectionCard } from "@/components/ContentBlocks";
import PageShell from "@/components/PageShell";
import { getAbsoluteUrl } from "@/lib/site";
import { useLocale } from "@/hooks/useLocale";

export default function CompoundInterestBasics() {
  const { locale } = useLocale();

  const content = useMemo(() => {
    if (locale === "zh") {
      return {
        title: "复利为什么会拉开长期差距",
        desc:
          "理解复利的核心驱动因素，包括时间、收益率和定投节奏，帮助投资者更合理地设定长期目标。",
        intro:
          "很多人知道复利重要，但真正低估的是时间和持续投入的乘法效应。短期看差距可能不明显，长期看，小幅收益率差异和投入习惯差异都会被不断放大。",
        sections: [
          {
            title: "时间通常比频繁预测更重要",
            body: [
              "复利的关键不是每年都做到极高收益，而是尽可能让资金停留在市场中更久。",
              "同样的年化收益率下，投资 30 年和投资 10 年的结果差异通常远大于大多数人的直觉。",
              "这也是为什么长期目标更适合做复利测算，而短期目标更适合用预算和现金流模型来判断。",
            ],
          },
          {
            title: "定投能降低节奏中断的风险",
            body: [
              "很多人第一次测算时只看初始本金，但长期资产积累往往更依赖后续持续投入。",
              "即使单月投入不高，只要节奏稳定，长期累积后的结果也可能非常可观。",
              "因此在做复利规划时，月投入是否可持续，往往比起步金额更值得认真确认。",
            ],
          },
          {
            title: "收益率小差距会被长期放大",
            body: [
              "从 6% 提高到 8%，看起来只是两个百分点的变化，但如果周期足够长，最终资产差距可能非常明显。",
              "这也是为什么在工具页中比较不同收益率假设非常有必要，它能帮助你理解乐观、保守和中性情景之间的距离。",
              "做长期规划时，建议至少准备一个偏保守版本，避免对未来回报过于乐观。",
            ],
          },
        ],
        examplesTitle: "建议搭配使用的工具",
        examples: [
          {
            to: "/tools/compound-interest",
            title: "复利计算器",
            desc: "适合比较不同投资年限、收益率和月投入方案。",
          },
          {
            to: "/tools/calculator",
            title: "在线计算器",
            desc: "适合快速复核中间步骤、预算比例和临时方案。",
          },
        ],
        faqTitle: "常见问题",
        faqs: [
          {
            question: "复利是不是只适合高收益投资？",
            answer:
              "不是。复利更依赖时间、纪律和持续投入。收益率当然重要，但长期坚持本身往往比短期追求高收益更关键。",
          },
          {
            question: "做复利测算时最容易忽略什么？",
            answer:
              "最容易忽略的是投入能否长期持续，以及未来收益率是否过于乐观。很多计划不是算不出来，而是中途无法坚持。",
          },
        ],
        ctaTitle: "下一步",
        ctaDesc: "把你的初始资金、月投入和目标年限代入工具页，通常就能更快判断目标是否现实。",
      };
    }

    return {
      title: "Why compounding changes long-term outcomes",
      desc:
        "Understand how time, return rate, and recurring contributions work together so you can plan long-term investing more realistically.",
      intro:
        "Most people know compounding matters, but they often underestimate the multiplier created by time and steady contributions. Over short periods, the gap can look small. Over long periods, even modest differences in return or contribution habits can become large.",
      sections: [
        {
          title: "Time often matters more than constant prediction",
          body: [
            "The power of compounding does not require extreme returns every year. It mostly requires keeping capital invested for long enough.",
            "At the same annual rate, a 30 year horizon can look dramatically different from a 10 year horizon.",
            "That is why compounding is best used for long-term goals, while short-term goals often need cash flow and budgeting models instead.",
          ],
        },
        {
          title: "Recurring contributions reduce dependence on timing",
          body: [
            "Many first-time projections focus only on the starting balance, but long-term growth often depends more on steady later contributions.",
            "Even modest monthly additions can become meaningful when the habit is maintained.",
            "For planning, contribution sustainability often matters more than the initial amount alone.",
          ],
        },
        {
          title: "Small rate differences become large over time",
          body: [
            "Moving from 6% to 8% may sound minor, but over long periods it can create a substantial ending balance gap.",
            "That is why comparing multiple return assumptions is useful. It shows the distance between conservative, neutral, and optimistic outcomes.",
            "For long-term planning, it is usually wise to keep at least one conservative scenario in view.",
          ],
        },
      ],
      examplesTitle: "Best tools to pair with this guide",
      examples: [
        {
          to: "/tools/compound-interest",
          title: "Compound Interest Calculator",
          desc: "Use it to compare years, return assumptions, and monthly contribution plans.",
        },
        {
          to: "/tools/calculator",
          title: "Online Calculator",
          desc: "Use it for quick supporting math, budget ratios, and spot checks.",
        },
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Is compounding only useful for high-return investments?",
          answer:
            "No. Compounding depends heavily on time, consistency, and recurring investment habits. Return matters, but long-term discipline often matters just as much.",
        },
        {
          question: "What do people most often overlook in a compounding plan?",
          answer:
            "They often overlook whether contributions are sustainable and whether return assumptions are too optimistic. Many plans fail because the habit stops, not because the math was impossible.",
        },
      ],
      ctaTitle: "Next Step",
      ctaDesc:
        "Enter your starting balance, monthly contributions, and target timeline into the calculator to test whether your goal is realistic.",
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
          url: getAbsoluteUrl("/guides/compound-interest-basics"),
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
              item: getAbsoluteUrl("/guides/compound-interest-basics"),
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
              {locale === "zh" ? "复利指南" : "Compounding Guide"}
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

          <SectionCard title={content.examplesTitle} className="mt-8">
            <div className="grid gap-4 md:grid-cols-2">
              {content.examples.map((item) => (
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
                to="/tools/compound-interest"
                className="inline-flex h-10 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                {locale === "zh" ? "打开复利计算器" : "Open Compound Calculator"}
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
