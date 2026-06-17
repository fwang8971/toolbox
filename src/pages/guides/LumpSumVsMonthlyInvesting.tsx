import { Link } from "react-router-dom";
import { useMemo } from "react";
import { FaqList, SectionCard } from "@/components/ContentBlocks";
import PageShell from "@/components/PageShell";
import { getAbsoluteUrl } from "@/lib/site";
import { useLocale } from "@/hooks/useLocale";

export default function LumpSumVsMonthlyInvesting() {
  const { locale } = useLocale();

  const content = useMemo(() => {
    if (locale === "zh") {
      return {
        title: "一次性投入和每月定投怎么选",
        desc:
          "从时间在市场中的作用、波动承受能力和执行纪律三个角度，帮助投资者比较一次性投入和每月定投。",
        intro:
          "当手里有一笔可投资资金时，很多人会卡在同一个问题上：是一次性投入，还是分成每月慢慢买入。两种方法没有对所有人都绝对正确的答案，关键在于你是否更看重更早开始复利、还是更看重控制情绪和波动压力。",
        sections: [
          {
            title: "一次性投入更强调尽早进入市场",
            body: [
              "如果长期回报主要来自更长时间在市场里，那么一次性投入往往能让资金更早开始复利。",
              "这也是一次性投入在长期假设下常被优先讨论的原因，因为钱更早工作，理论上更容易放大时间优势。",
              "但它也意味着你更快暴露在短期波动里，心理压力可能更大。",
            ],
          },
          {
            title: "每月定投更适合分散入场节奏",
            body: [
              "定投的优势不一定是收益更高，而是更容易坚持和控制情绪。",
              "如果你担心刚投入就遇到市场下跌，分批进入通常会让你更容易执行完整计划。",
              "对于持续有工资结余的人来说，定投也更贴近真实现金流习惯。",
            ],
          },
          {
            title: "真正重要的是你能不能长期执行",
            body: [
              "如果一次性投入后你很容易在波动里慌张卖出，那么理论上的效率优势就很难兑现。",
              "如果定投节奏过慢，导致大量现金长期闲置，也可能错失本该更早开始的复利时间。",
              "所以比较时要同时看投入方式、持有周期和你自己的行为稳定性。",
            ],
          },
        ],
        toolsTitle: "建议一起打开的页面",
        tools: [
          {
            to: "/tools/compound-interest",
            title: "复利计算器",
            desc: "分别模拟一次性投入和每月定投，比较终值、累计投入和收益差异。",
          },
          {
            to: "/tools/calculator",
            title: "在线计算器",
            desc: "适合快速拆分月度投入、目标金额和中间预算步骤。",
          },
        ],
        faqTitle: "常见问题",
        faqs: [
          {
            question: "一次性投入是不是一定比定投更好？",
            answer:
              "不一定。一次性投入更强调尽早开始复利，但如果你承受不了短期波动、最后反而中途退出，结果未必比稳定定投更好。",
          },
          {
            question: "定投是不是更安全？",
            answer:
              "定投更像是降低择时压力和情绪波动的方法，不代表没有风险。它仍然会受到市场回撤、收益率变化和持有周期影响。",
          },
        ],
        ctaTitle: "下一步",
        ctaDesc: "把一次性投入金额和每月定投金额分别代入复利计算器，拉长到 10 年、20 年再比较，通常更容易看清差异。",
      };
    }

    return {
      title: "How to choose between lump-sum investing and monthly contributions",
      desc:
        "Compare time in the market, volatility tolerance, and execution discipline before choosing lump-sum investing or monthly contributions.",
      intro:
        "When you have cash available to invest, the big question often becomes whether to invest it all now or spread it over time. Neither approach is automatically right for everyone. The better choice usually depends on how much you value earlier compounding versus smoother emotional execution during market swings.",
      sections: [
        {
          title: "Lump-sum investing emphasizes getting money to work earlier",
          body: [
            "If long-term returns depend heavily on time in the market, investing sooner can give the money more time to compound.",
            "That is why lump-sum investing is often discussed as the more efficient long-run path in theory.",
            "The trade-off is that you face market volatility sooner, which can feel uncomfortable if prices fall right after investing.",
          ],
        },
        {
          title: "Monthly investing spreads the entry process",
          body: [
            "The main strength of monthly investing is not always higher return. It is often easier behaviorally.",
            "If you worry about putting money in right before a decline, spreading purchases over time can reduce emotional stress.",
            "For people who invest from ongoing income, monthly investing also matches real cash flow better.",
          ],
        },
        {
          title: "Execution matters as much as theory",
          body: [
            "If lump-sum investing causes you to panic and sell during volatility, the theoretical advantage may disappear.",
            "If you spread investing too slowly and leave a large cash pile idle for too long, you may lose valuable compounding time.",
            "That is why the best comparison includes timeline, behavior, and contribution pattern together.",
          ],
        },
      ],
      toolsTitle: "Best pages to open next",
      tools: [
        {
          to: "/tools/compound-interest",
          title: "Compound Interest Calculator",
          desc: "Model lump-sum and monthly contribution scenarios and compare ending balance, contributions, and growth.",
        },
        {
          to: "/tools/calculator",
          title: "Online Calculator",
          desc: "Use it for quick budget splits, target amount math, and supporting steps.",
        },
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Is lump-sum investing always better than monthly investing?",
          answer:
            "Not always. It can be more efficient in theory because money starts compounding earlier, but if you cannot stay invested through volatility, the result can be worse than a steady contribution plan.",
        },
        {
          question: "Does monthly investing mean lower risk?",
          answer:
            "It can reduce timing stress, but it does not remove market risk. Returns still depend on volatility, long-term rate assumptions, and how long you stay invested.",
        },
      ],
      ctaTitle: "Next Step",
      ctaDesc:
        "Model both your lump-sum amount and your monthly contribution plan in the compound interest tool over 10 and 20 years to see the trade-off more clearly.",
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
          url: getAbsoluteUrl("/guides/lump-sum-vs-monthly-investing"),
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
              item: getAbsoluteUrl("/guides/lump-sum-vs-monthly-investing"),
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
              {locale === "zh" ? "投资节奏指南" : "Investing Rhythm Guide"}
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
                to="/tools/compound-interest"
                className="inline-flex h-10 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                {locale === "zh" ? "打开复利计算器" : "Open Compound Interest Tool"}
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
