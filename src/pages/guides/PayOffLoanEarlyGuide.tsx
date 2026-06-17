import { Link } from "react-router-dom";
import { useMemo } from "react";
import { FaqList, SectionCard } from "@/components/ContentBlocks";
import PageShell from "@/components/PageShell";
import { getAbsoluteUrl } from "@/lib/site";
import { useLocale } from "@/hooks/useLocale";

export default function PayOffLoanEarlyGuide() {
  const { locale } = useLocale();

  const content = useMemo(() => {
    if (locale === "zh") {
      return {
        title: "贷款要不要提前还，先看这 3 个判断点",
        desc:
          "从利率高低、现金缓冲和提前还款限制三个角度，帮助借款人判断提前还款是否真的值得。",
        intro:
          "很多人手里有一笔额外现金后，会先想到把贷款提前还掉。这个方向不一定错，但是否值得，通常取决于三个问题：你的贷款利率高不高、提前还款后手上是否还留有缓冲，以及贷款合同里有没有额外限制或费用。",
        sections: [
          {
            title: "高利率贷款更值得优先比较提前还款",
            body: [
              "如果贷款利率本身较高，提前还款通常更容易带来确定性的利息节省。",
              "相反，如果贷款利率已经较低，提前还款的收益可能不如保留现金或用于其他更高优先级用途。",
              "第一步不是立刻还，而是先用贷款计算器看剩余期限下大概还要支付多少利息。",
            ],
          },
          {
            title: "别为了少付利息把缓冲全部清空",
            body: [
              "提前还款之后，如果手头几乎没有应急资金，一次失业、医疗或维修支出就可能把你推回更高成本的借款。",
              "所以提前还款能否执行，要和现金储备一起评估，而不是只看节省了多少利息。",
              "能省下来的利息很重要，但流动性不足带来的风险也是真实成本。",
            ],
          },
          {
            title: "还款前先确认合同规则",
            body: [
              "有些贷款会有提前还款限制、手续费或特定时间窗口。",
              "如果存在违约金，提前还款的净收益可能会被明显削弱。",
              "在做决定前，最好把违约金、剩余期限和预计节省利息放在一起比较。",
            ],
          },
        ],
        toolsTitle: "建议一起打开的页面",
        tools: [
          {
            to: "/tools/loan",
            title: "贷款计算器",
            desc: "先估算不同期限和利率下的月供与总利息，再判断提前还款空间。",
          },
          {
            to: "/tools/calculator",
            title: "在线计算器",
            desc: "适合快速复核违约金、节省利息和现金余额之间的差异。",
          },
        ],
        faqTitle: "常见问题",
        faqs: [
          {
            question: "提前还款是不是一定能省钱？",
            answer:
              "大多数情况下能省一部分利息，但是否划算还要看违约金、机会成本和你剩下的现金缓冲。如果为此失去流动性，整体决策未必更优。",
          },
          {
            question: "手里有一笔钱，应该全部拿去提前还吗？",
            answer:
              "不建议先默认全部拿去还。更稳妥的做法是先留好应急资金，再比较部分提前还款和保留现金两种方案的风险与收益。",
          },
        ],
        ctaTitle: "下一步",
        ctaDesc: "先估算剩余利息，再把可能的提前还款金额、违约金和现金缓冲一起算清楚，通常能避免只凭感觉做决定。",
      };
    }

    return {
      title: "Should you pay off a loan early? Start with these 3 checks",
      desc:
        "Use interest rate, cash reserve, and prepayment restrictions to decide whether paying off a loan early is actually worth it.",
      intro:
        "When people receive extra cash, paying down debt feels like an obvious move. Sometimes it is. But the strongest decision usually depends on three things: how expensive the debt is, how much liquidity you would still have afterward, and whether the loan contract includes penalties or restrictions.",
      sections: [
        {
          title: "Higher-rate debt deserves earlier comparison",
          body: [
            "If the loan APR is relatively high, early repayment is more likely to create meaningful and predictable interest savings.",
            "If the loan is already cheap, the benefit may be smaller and other priorities may matter more.",
            "That is why the first step is to estimate the remaining interest cost, not to pay immediately.",
          ],
        },
        {
          title: "Do not erase your cash buffer to save interest",
          body: [
            "After a large prepayment, too little emergency cash can force you back into even more expensive borrowing when life happens.",
            "That means liquidity risk should be compared with the interest savings.",
            "Lower interest cost matters, but losing resilience also has a real price.",
          ],
        },
        {
          title: "Check the contract before sending extra money",
          body: [
            "Some loans include prepayment penalties, timing rules, or administrative fees.",
            "If those charges are material, the net gain from early repayment may be much smaller than expected.",
            "Compare penalty cost, time remaining, and expected interest savings together before deciding.",
          ],
        },
      ],
      toolsTitle: "Best pages to open next",
      tools: [
        {
          to: "/tools/loan",
          title: "Loan Calculator",
          desc: "Estimate payment and interest under different terms before judging prepayment value.",
        },
        {
          to: "/tools/calculator",
          title: "Online Calculator",
          desc: "Use it to compare penalties, saved interest, and remaining cash side by side.",
        },
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Does early repayment always save money?",
          answer:
            "It often saves some interest, but the real decision also depends on penalties, opportunity cost, and how much emergency cash remains afterward.",
        },
        {
          question: "If I have extra cash, should I use all of it on the loan?",
          answer:
            "Usually not by default. It is safer to protect your emergency reserve first and then compare partial prepayment against keeping cash available.",
        },
      ],
      ctaTitle: "Next Step",
      ctaDesc:
        "Estimate remaining interest first, then compare your prepayment amount, any penalty cost, and your post-payment cash buffer before acting.",
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
          url: getAbsoluteUrl("/guides/pay-off-loan-early-guide"),
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
              item: getAbsoluteUrl("/guides/pay-off-loan-early-guide"),
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
              {locale === "zh" ? "还款指南" : "Repayment Guide"}
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
