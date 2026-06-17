import { Link } from "react-router-dom";
import { useMemo } from "react";
import { FaqList, SectionCard } from "@/components/ContentBlocks";
import PageShell from "@/components/PageShell";
import { getAbsoluteUrl } from "@/lib/site";
import { useLocale } from "@/hooks/useLocale";

export default function DownPaymentGuide() {
  const { locale } = useLocale();

  const content = useMemo(() => {
    if (locale === "zh") {
      return {
        title: "首付准备多少才更稳妥",
        desc:
          "从首付比例、月供压力和应急资金三个维度，帮助准备买房的人判断首付不该只追求越高越好。",
        intro:
          "很多人会把首付理解成一个单独目标，好像只要尽量多付就更安全。实际上，首付只是买房方案的一部分。更高首付会降低月供和总利息，但也会压缩你手上的现金缓冲，所以真正稳妥的方案要把首付和应急资金一起考虑。",
        sections: [
          {
            title: "更高首付通常能降低长期成本",
            body: [
              "首付越高，贷款本金通常越低，因此月供和总利息也会一起下降。",
              "如果你对长期总成本很敏感，提高首付比例通常能带来比较直接的改善。",
              "这也是很多买房人愿意多攒首付的核心原因，但这不是唯一要看的指标。",
            ],
          },
          {
            title: "别把现金全部压进房子里",
            body: [
              "买房后往往还会遇到搬家、家具、维修和税费等额外支出。",
              "如果把可用现金几乎都变成首付，即使月供变低，也可能在后续几个月带来更大的现金流压力。",
              "首付方案需要和你的应急资金一起看，而不是只看贷款能否批下来。",
            ],
          },
          {
            title: "比较首付比例时建议这样做",
            body: [
              "先用房贷计算器分别测试 10%、15%、20% 和更高首付对应的月供变化。",
              "再估算付完首付后，账户里是否仍能保留几个月生活和住房开支的缓冲。",
              "如果更高首付只换来不大的月供下降，却让现金储备明显变薄，未必是更稳妥的选择。",
            ],
          },
        ],
        toolsTitle: "建议一起打开的页面",
        tools: [
          {
            to: "/tools/mortgage",
            title: "房贷计算器",
            desc: "直接比较不同首付比例下的月供、总利息和贷款金额。",
          },
          {
            to: "/guides/home-affordability-basics",
            title: "购房预算指南",
            desc: "继续判断房价区间、现金缓冲和收入稳定性是否匹配。",
          },
        ],
        faqTitle: "常见问题",
        faqs: [
          {
            question: "首付是不是越高越好？",
            answer:
              "不一定。首付更高通常能降低利息成本，但如果因此失去必要的现金缓冲，整体风险反而会升高。更稳妥的方案是兼顾月供和流动资金。",
          },
          {
            question: "如果首付不够，是不是就不该看房？",
            answer:
              "可以先做测算。你可以先估算不同首付比例对应的月供和总成本，再判断继续攒首付是否比立刻入场更合理。",
          },
        ],
        ctaTitle: "下一步",
        ctaDesc: "先比较几种首付比例的月供差异，再结合应急资金剩余量判断哪种方案更稳，不要只追求首付数字本身。",
      };
    }

    return {
      title: "How much down payment is actually safer",
      desc:
        "Balance down payment size, monthly payment pressure, and emergency cash before deciding how much to put down on a home.",
      intro:
        "A down payment is not just a savings target. A larger down payment can reduce monthly cost and total interest, but it can also drain the cash you may need after closing for repairs, moving, or everyday financial safety. The better plan weighs borrowing cost and liquidity together.",
      sections: [
        {
          title: "Higher down payments usually reduce long-term cost",
          body: [
            "When you put more money down, the mortgage principal is smaller, which often lowers both payment and total interest.",
            "That makes a larger down payment attractive for buyers who care strongly about long-term borrowing cost.",
            "But cost savings alone do not tell the full story.",
          ],
        },
        {
          title: "Avoid putting every available dollar into the home",
          body: [
            "Home purchases often come with moving costs, furnishing, repairs, taxes, and other early expenses.",
            "If nearly all your available cash goes into the down payment, a lower mortgage payment may still leave you with a more fragile position overall.",
            "That is why down payment planning should always be viewed together with your remaining emergency reserve.",
          ],
        },
        {
          title: "A practical way to compare down payment levels",
          body: [
            "Run multiple scenarios such as 10%, 15%, 20%, and higher using the mortgage calculator.",
            "Then estimate how much cash remains after closing and whether that buffer covers several months of living and housing costs.",
            "If a much larger down payment only lowers the payment slightly while draining your reserve, it may not be the strongest choice.",
          ],
        },
      ],
      toolsTitle: "Best pages to open next",
      tools: [
        {
          to: "/tools/mortgage",
          title: "Mortgage Calculator",
          desc: "Compare payment, total interest, and financed amount across multiple down payment levels.",
        },
        {
          to: "/guides/home-affordability-basics",
          title: "Affordability Guide",
          desc: "Continue by checking target price, emergency buffer, and income stability together.",
        },
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Is the biggest possible down payment always best?",
          answer:
            "No. A larger down payment can reduce interest cost, but if it leaves too little emergency cash, your overall financial risk may rise.",
        },
        {
          question: "If my down payment is still small, should I stop planning?",
          answer:
            "Not necessarily. You can still model different down payment scenarios now and decide whether waiting to save more is better than buying sooner.",
        },
      ],
      ctaTitle: "Next Step",
      ctaDesc:
        "Compare several down payment options in the calculator and judge them alongside the amount of emergency cash you would still have after closing.",
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
          url: getAbsoluteUrl("/guides/down-payment-guide"),
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
              item: getAbsoluteUrl("/guides/down-payment-guide"),
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
              {locale === "zh" ? "首付指南" : "Down Payment Guide"}
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
