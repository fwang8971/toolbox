import { Link } from "react-router-dom";
import { useMemo } from "react";
import { FaqList, SectionCard } from "@/components/ContentBlocks";
import PageShell from "@/components/PageShell";
import { useLocale } from "@/hooks/useLocale";
import { getAbsoluteUrl } from "@/lib/site";

export default function LoanComparisonGuide() {
  const { locale } = useLocale();

  const content = useMemo(() => {
    if (locale === "zh") {
      return {
        title: "贷款报价怎么比较，才不会只看到低月供",
        desc:
          "从年利率、还款期数、手续费和总成本四个角度，帮助你比较车贷、消费贷和教育分期等贷款方案。",
        intro:
          "很多贷款广告会优先展示“月供很低”或“每月只要多少”，但真正决定借款成本的，通常不是月供本身，而是利率、期数、费用和提前还款规则放在一起后的总结果。月供低，有时只是把成本向后摊得更长。",
        sections: [
          {
            title: "先看总成本，再看月供舒适度",
            body: [
              "月供是现金流视角，能帮助你判断每个月是否扛得住。",
              "总还款和总利息是成本视角，能帮助你判断这个方案长期是否划算。",
              "如果只看月供，很多更长期限的方案会显得更轻松，但总成本通常更高。",
            ],
          },
          {
            title: "APR 相同也不一定代表方案完全一样",
            body: [
              "即使广告里写的年利率接近，手续费、服务费、保险和违约规则也可能拉开真实成本差异。",
              "因此在比较报价时，最好把费用一并折算到整体成本里，而不是只盯一个利率数字。",
              "如果页面只能先做基础测算，至少也要先比较本金、APR 和期数的组合差异。",
            ],
          },
          {
            title: "期限越长，通常越适合现金流紧的人",
            body: [
              "拉长期限能降低月供，这对短期预算紧张的人很有吸引力。",
              "但更长的期限意味着利息累计时间更久，所以最终支付的总额通常会上升。",
              "真正合理的方案，不是最轻松的那一个，而是在可承受月供和可接受总成本之间取得平衡。",
            ],
          },
        ],
        compareTitle: "比较贷款时的实用顺序",
        compareSteps: [
          "先输入相同本金，对比不同期限下的月供和总利息。",
          "再在相同期限下比较不同 APR，观察总成本变化有多大。",
          "最后把额外费用和提前还款限制一起考虑，确认最低月供是否真的更划算。",
        ],
        toolsTitle: "建议搭配使用的页面",
        tools: [
          {
            to: "/tools/loan",
            title: "贷款计算器",
            desc: "直接输入本金、APR 和期数，比较月供与总利息。",
          },
          {
            to: "/tools/calculator",
            title: "在线计算器",
            desc: "适合快速复核手续费占比、预算比例和中间步骤。",
          },
        ],
        faqTitle: "常见问题",
        faqs: [
          {
            question: "月供最低的方案是不是最适合我？",
            answer:
              "不一定。最低月供往往来自更长期限，而更长期限通常会提高总利息。适合你的方案需要同时兼顾月供承受力和总成本。",
          },
          {
            question: "为什么不同平台写的 APR 看起来差不多，最后成本还是不一样？",
            answer:
              "因为有些产品还包含手续费、服务费、保险、提前还款限制等条件。APR 接近并不代表完整成本完全相同。",
          },
        ],
        ctaTitle: "下一步",
        ctaDesc: "把你拿到的两到三个贷款报价分别代入工具页，优先对比期限和 APR，再决定是否值得继续谈细节。",
      };
    }

    return {
      title: "How to compare loan offers without focusing only on payment",
      desc:
        "Compare APR, repayment length, fees, and total borrowing cost before choosing between auto loans, personal loans, or installment financing.",
      intro:
        "Many loan ads lead with a low monthly payment. That number matters for cash flow, but it does not tell the full story. Real borrowing cost usually depends on rate, term length, fees, and repayment rules together. A lower payment can simply mean the cost is stretched over more months.",
      sections: [
        {
          title: "Check total cost before comfort alone",
          body: [
            "Monthly payment is the cash flow view. It tells you whether the loan fits your budget month to month.",
            "Total paid and total interest are the cost view. They tell you whether the offer is expensive over the full repayment period.",
            "If you only look at payment, longer-term loans can appear attractive even when they cost much more overall.",
          ],
        },
        {
          title: "The same APR does not always mean the same offer",
          body: [
            "Even when the advertised rate looks similar, fees, service charges, insurance, or prepayment rules can create meaningful differences.",
            "That is why it helps to compare total cost, not only the headline rate.",
            "If you only have basic inputs at first, comparing principal, APR, and term length still gives a much better starting point than payment alone.",
          ],
        },
        {
          title: "Longer terms usually favor tighter budgets",
          body: [
            "Extending the term can reduce the monthly payment, which is helpful when short-term cash flow is tight.",
            "But a longer term usually means interest accrues for more time, raising the final cost.",
            "The best option is rarely the one with the lowest payment alone. It is the one that balances affordability with acceptable total cost.",
          ],
        },
      ],
      compareTitle: "Practical comparison order",
      compareSteps: [
        "Start with the same principal and compare different terms for payment and total interest.",
        "Then hold the term constant and compare multiple APR assumptions to see how much cost moves.",
        "Finally, add fees and prepayment restrictions so you can tell whether the lowest payment is actually the best deal.",
      ],
      toolsTitle: "Best pages to use next",
      tools: [
        {
          to: "/tools/loan",
          title: "Loan Calculator",
          desc: "Enter principal, APR, and months to compare payment and total interest directly.",
        },
        {
          to: "/tools/calculator",
          title: "Online Calculator",
          desc: "Use it for quick fee checks, budget ratios, and supporting math.",
        },
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Is the lowest monthly payment always the best offer?",
          answer:
            "No. The lowest payment often comes from a longer term, and a longer term usually raises total interest. A strong choice balances payment comfort with acceptable total cost.",
        },
        {
          question: "Why can two similar APR offers still cost different amounts?",
          answer:
            "Because some loans also include fees, service charges, insurance requirements, or prepayment limits. Similar APR does not guarantee identical real cost.",
        },
      ],
      ctaTitle: "Next Step",
      ctaDesc:
        "Put two or three real loan quotes into the calculator, compare term and APR first, and only then decide whether the lowest payment is worth it.",
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
          url: getAbsoluteUrl("/guides/loan-comparison-guide"),
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
              item: getAbsoluteUrl("/guides/loan-comparison-guide"),
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
              {locale === "zh" ? "贷款比较指南" : "Loan Guide"}
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

          <SectionCard title={content.compareTitle} className="mt-8">
            <div className="grid gap-3">
              {content.compareSteps.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-zinc-200 p-4 text-sm leading-7 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
                >
                  {item}
                </div>
              ))}
            </div>
          </SectionCard>

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
                to="/tools/loan"
                className="inline-flex h-10 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                {locale === "zh" ? "打开贷款计算器" : "Open Loan Calculator"}
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
