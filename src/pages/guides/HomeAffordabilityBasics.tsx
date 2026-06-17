import { Link } from "react-router-dom";
import { useMemo } from "react";
import { FaqList, SectionCard } from "@/components/ContentBlocks";
import PageShell from "@/components/PageShell";
import { useLocale } from "@/hooks/useLocale";
import { getAbsoluteUrl } from "@/lib/site";

export default function HomeAffordabilityBasics() {
  const { locale } = useLocale();

  const content = useMemo(() => {
    if (locale === "zh") {
      return {
        title: "买房前怎么判断房子是否真的买得起",
        desc:
          "从月供、首付、应急资金和收入稳定性四个角度，帮助你在正式贷款前先判断房价区间是否合理。",
        intro:
          "很多人把“银行愿意贷多少”当成“自己买得起多少”，但这两个问题并不相同。真正的可负担性，通常要一起看月供压力、首付后的现金余额、未来收入稳定性，以及购房后短期内可能出现的额外支出。",
        sections: [
          {
            title: "不要只看银行批多少额度",
            body: [
              "银行给出的可贷额度更多代表金融机构愿意承担的风险，不一定代表你的家庭现金流会感到轻松。",
              "买房后的真实压力还包括物业、税费、保险、搬家、家具和维修等支出，因此购房预算通常要低于理论最高贷款额度。",
              "如果预算过于贴近极限，未来利率波动或收入短暂下降时，月供压力会更明显。",
            ],
          },
          {
            title: "月供只是第一道筛选",
            body: [
              "月供必须先落在可承受区间，这是判断是否继续看的第一步。",
              "但首付后的现金余额同样重要。如果为了凑首付把流动资金几乎用尽，入住后的应急能力会明显下降。",
              "更稳妥的做法通常是同时保留一笔生活和维修缓冲资金，而不是把所有现金都压到首付里。",
            ],
          },
          {
            title: "把收入稳定性和未来计划一起考虑",
            body: [
              "如果未来几年存在换工作、生育、搬家或创业计划，就不能只按当前收入水平判断房贷是否安全。",
              "对单一收入家庭或浮动收入较高的人群来说，保守一点的房价区间通常更容易长期维持。",
              "购房决策不是一次性通过审批，而是未来十几年都能持续承担。",
            ],
          },
        ],
        checklistTitle: "买房前快速检查清单",
        checklist: [
          "先算出月供，再确认购房后是否还能保留至少几个月的生活缓冲资金。",
          "把利率提高一点重新测算，确认利率上行时现金流是否仍可承受。",
          "把装修、搬家、家具和保险等一次性成本纳入预算，而不是只看房价与首付。",
        ],
        toolsTitle: "下一步建议打开的页面",
        tools: [
          {
            to: "/tools/mortgage",
            title: "房贷计算器",
            desc: "先确认月供、总利息和贷款本金变化。",
          },
          {
            to: "/guides/mortgage-payment-guide",
            title: "房贷比较指南",
            desc: "继续理解年限、利率和首付之间的取舍逻辑。",
          },
        ],
        faqTitle: "常见问题",
        faqs: [
          {
            question: "银行能批下来，是不是就代表买得起？",
            answer:
              "不一定。审批通过说明金融机构愿意放贷，但不代表你的家庭现金流、应急储备和未来计划都足够轻松。",
          },
          {
            question: "首付越高就一定越好吗？",
            answer:
              "不一定。更高首付确实能降低月供和利息，但如果因此几乎耗尽流动资金，购房后的风险反而会上升。",
          },
        ],
        ctaTitle: "下一步",
        ctaDesc: "先把目标房价、首付比例和利率代入房贷工具，再用保守一点的收入假设复核一次。",
      };
    }

    return {
      title: "How to tell if a home is truly affordable",
      desc:
        "Use payment, down payment, cash buffer, and income stability together before deciding whether a target home price is realistic.",
      intro:
        "Many buyers treat the maximum amount a lender will approve as the amount they can safely afford. Those are not the same. Real affordability usually depends on monthly payment, cash left after down payment, income stability, and the extra costs that arrive soon after closing.",
      sections: [
        {
          title: "Do not rely on lender approval alone",
          body: [
            "A lender approval amount reflects the risk a bank is willing to take, not necessarily the most comfortable budget for your household.",
            "Real housing cost also includes taxes, insurance, moving, furniture, repairs, and maintenance.",
            "When a home budget is too close to the maximum, even a modest rate change or income interruption can feel much heavier.",
          ],
        },
        {
          title: "Monthly payment is only the first screen",
          body: [
            "The payment has to fit your budget, so it is the first number to check.",
            "But the cash you keep after the down payment matters too. Using nearly all savings for the upfront payment can leave too little margin after moving in.",
            "A safer plan often keeps an emergency buffer instead of pushing every available dollar into the down payment.",
          ],
        },
        {
          title: "Include income stability and future plans",
          body: [
            "If the next few years may include job changes, a new child, relocation, or a business risk, affordability should be judged more conservatively.",
            "For single-income households or variable income, a lower target price often creates a more durable plan.",
            "A home decision is not just about getting approved today. It is about sustaining the cost for many years.",
          ],
        },
      ],
      checklistTitle: "Quick affordability checklist",
      checklist: [
        "Calculate the payment first, then confirm you still keep a healthy cash buffer after closing.",
        "Re-run the numbers with a slightly higher rate to see whether your cash flow still works.",
        "Include moving, furnishing, insurance, and repair costs instead of budgeting only for price and down payment.",
      ],
      toolsTitle: "Best next pages to open",
      tools: [
        {
          to: "/tools/mortgage",
          title: "Mortgage Calculator",
          desc: "Check payment, total interest, and financed amount first.",
        },
        {
          to: "/guides/mortgage-payment-guide",
          title: "Mortgage Guide",
          desc: "Continue with payment, term, and down payment trade-off logic.",
        },
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "If the bank approves me, does that mean I can afford it?",
          answer:
            "Not always. Approval only means a lender is willing to issue the loan. It does not guarantee that your monthly cash flow, savings buffer, and life plans make the purchase comfortable.",
        },
        {
          question: "Is a higher down payment always better?",
          answer:
            "Not always. It can reduce payment and interest, but if it leaves too little liquidity afterward, the total risk can rise.",
        },
      ],
      ctaTitle: "Next Step",
      ctaDesc:
        "Run your target home price, down payment, and rate through the mortgage calculator, then repeat with a more conservative budget assumption.",
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
          url: getAbsoluteUrl("/guides/home-affordability-basics"),
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
              item: getAbsoluteUrl("/guides/home-affordability-basics"),
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
              {locale === "zh" ? "购房预算指南" : "Affordability Guide"}
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

          <SectionCard title={content.checklistTitle} className="mt-8">
            <div className="grid gap-3">
              {content.checklist.map((item) => (
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
