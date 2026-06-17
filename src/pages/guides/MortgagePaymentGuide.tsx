import { Link } from "react-router-dom";
import { useMemo } from "react";
import { FaqList, SectionCard } from "@/components/ContentBlocks";
import PageShell from "@/components/PageShell";
import { getAbsoluteUrl } from "@/lib/site";
import { useLocale } from "@/hooks/useLocale";

export default function MortgagePaymentGuide() {
  const { locale } = useLocale();

  const content = useMemo(() => {
    if (locale === "zh") {
      return {
        title: "房贷月供怎么比较更有效",
        desc:
          "理解房贷月供、总利息、贷款年限和首付比例之间的关系，帮助买房用户更理性地比较方案。",
        intro:
          "很多用户只盯着月供是否能接受，但真正影响购房决策的通常是四个维度：月供压力、总利息成本、首付占比，以及未来收入是否能覆盖更高的固定支出。",
        sections: [
          {
            title: "先看月供，再看总成本",
            body: [
              "月供决定你每个月的现金流压力，是最先需要确认的数字。",
              "但同样重要的是总利息。贷款期限拉长后，月供通常会下降，可总利息往往明显上升。",
              "如果两个方案月供都能接受，优先比较总利息和还款年限通常更有价值。",
            ],
          },
          {
            title: "首付比例会改变风险结构",
            body: [
              "更高首付通常意味着更低贷款本金，月供和总利息都会下降。",
              "如果你手里保留的流动资金过少，即使月供更低，也可能在装修、搬家或突发支出时带来压力。",
              "所以首付不是越高越好，而是要和保留应急资金一起看。",
            ],
          },
          {
            title: "比较房贷时建议的顺序",
            body: [
              "第一步：先输入真实房价、首付、利率和年限，确认月供是否在可承受范围。",
              "第二步：把年限做 20 年、25 年、30 年对比，看月供下降是否值得交换更高总利息。",
              "第三步：把利率做高低对比，预估未来利率变化或不同贷款报价的影响。",
            ],
          },
        ],
        examplesTitle: "适合先看的工具",
        examples: [
          {
            to: "/tools/mortgage",
            title: "房贷计算器",
            desc: "适合先看月供、总利息和摊还表。",
          },
          {
            to: "/tools/loan",
            title: "贷款计算器",
            desc: "适合把同样本金放到不同期限和利率方案里横向比较。",
          },
        ],
        faqTitle: "常见问题",
        faqs: [
          {
            question: "买房时是不是月供越低越好？",
            answer:
              "不一定。月供更低通常意味着贷款期限更长，而更长的期限往往带来更高总利息。真正合适的方案应该同时兼顾现金流和总成本。",
          },
          {
            question: "房贷计算时为什么还要看摊还表？",
            answer:
              "因为摊还表能看到每一期本金和利息的占比变化，帮助你理解前期为什么利息占比更高，也方便评估提前还款价值。",
          },
        ],
        ctaTitle: "下一步",
        ctaDesc: "读完比较思路后，直接用工具页把你的实际数字代入，通常最容易得到可执行结果。",
      };
    }

    return {
      title: "How to compare mortgage payments",
      desc:
        "Understand the relationship between mortgage payments, total interest, loan term, and down payment before choosing a home financing plan.",
      intro:
        "Many buyers focus only on whether the monthly payment feels affordable. In practice, the strongest mortgage decisions weigh four things together: monthly cash flow, total interest cost, down payment size, and whether future income can support fixed housing expense.",
      sections: [
        {
          title: "Check payment first, then total cost",
          body: [
            "Monthly payment is the first number to verify because it affects your ongoing cash flow.",
            "Total interest matters just as much. A longer term usually lowers the payment but often raises the overall borrowing cost.",
            "If two options both feel affordable month to month, comparing total interest and years remaining usually makes the trade-off clearer.",
          ],
        },
        {
          title: "Down payment changes the risk profile",
          body: [
            "A larger down payment usually lowers the loan balance, which reduces both payment and total interest.",
            "But using too much cash up front can leave less emergency liquidity for moving, repairs, or other early home costs.",
            "That means the best down payment is not always the highest one. It should be viewed together with your remaining cash buffer.",
          ],
        },
        {
          title: "A practical comparison order",
          body: [
            "Step 1: enter realistic home price, down payment, APR, and term to check whether the payment fits your budget.",
            "Step 2: compare 20, 25, and 30 year terms to see whether a lower payment is worth the additional interest.",
            "Step 3: compare multiple rate assumptions so you can understand how lender quotes or future rate changes affect the outcome.",
          ],
        },
      ],
      examplesTitle: "Best tools to open next",
      examples: [
        {
          to: "/tools/mortgage",
          title: "Mortgage Calculator",
          desc: "Use it first for monthly payment, total interest, and amortization schedule.",
        },
        {
          to: "/tools/loan",
          title: "Loan Calculator",
          desc: "Use it to compare the same principal across multiple term and APR options.",
        },
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Is the lowest monthly payment always best?",
          answer:
            "No. Lower monthly payment often comes from a longer term, and a longer term usually means more total interest. The best option balances affordability and total cost.",
        },
        {
          question: "Why should I review the amortization schedule?",
          answer:
            "It shows how principal and interest shift over time, explains why early payments often contain more interest, and helps you judge whether early repayment would matter.",
        },
      ],
      ctaTitle: "Next Step",
      ctaDesc:
        "After reading the comparison logic, plug your own numbers into the calculators to turn the guide into a real decision.",
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
          url: getAbsoluteUrl("/guides/mortgage-payment-guide"),
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
              item: getAbsoluteUrl("/guides/mortgage-payment-guide"),
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
              {locale === "zh" ? "房贷指南" : "Mortgage Guide"}
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
