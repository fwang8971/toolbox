import { useLocale } from "@/hooks/useLocale";
import { ComparisonTable, FaqList, SectionCard } from "@/components/ContentBlocks";
import ToolShell from "@/pages/tools/ToolShell";
import { amortizationSchedule, monthlyPayment, round2 } from "@/lib/finance";
import { getAbsoluteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

export default function Loan() {
  const { locale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const defaults = useMemo(
    () => ({
      currency: "USD",
      principal: "20000",
      annualRate: "9.5",
      months: "60",
    }),
    [],
  );

  const initial = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      currency: params.get("c") ?? defaults.currency,
      principal: params.get("p") ?? defaults.principal,
      annualRate: params.get("rate") ?? defaults.annualRate,
      months: params.get("m") ?? defaults.months,
    };
  }, [defaults, location.search]);

  const [currency, setCurrency] = useState(initial.currency);
  const [principal, setPrincipal] = useState(initial.principal);
  const [annualRate, setAnnualRate] = useState(initial.annualRate);
  const [months, setMonths] = useState(initial.months);
  const [copied, setCopied] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [calcCurrency, setCalcCurrency] = useState(initial.currency);
  const [calcPrincipal, setCalcPrincipal] = useState(initial.principal);
  const [calcAnnualRate, setCalcAnnualRate] = useState(initial.annualRate);
  const [calcMonths, setCalcMonths] = useState(initial.months);

  const parsed = useMemo(() => {
    const pRaw = Number(calcPrincipal) || 0;
    const p = Math.max(0, pRaw);
    const rate = Math.max(0, Number(calcAnnualRate) || 0);
    const m = Math.max(1, Math.floor(Number(calcMonths) || 0));
    const mp = monthlyPayment({
      principal: p,
      annualRatePercent: rate,
      termMonths: m,
    });
    const schedule = amortizationSchedule({
      principal: p,
      annualRatePercent: rate,
      termMonths: m,
    });
    const totalPaid = round2(schedule.reduce((sum, r) => sum + r.payment, 0));
    const totalInterest = round2(totalPaid - p);
    return { principal: p, annualRate: rate, months: m, mp, schedule, totalPaid, totalInterest };
  }, [calcAnnualRate, calcMonths, calcPrincipal]);

  const formatter = useMemo(() => {
    try {
      return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-US", {
        style: "currency",
        currency: calcCurrency,
        maximumFractionDigits: 2,
      });
    } catch {
      return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-US", {
        maximumFractionDigits: 2,
      });
    }
  }, [calcCurrency, locale]);

  const t = useMemo(() => {
    const zh = {
      title: "贷款计算器",
      desc: "输入贷款金额、年利率与期限，计算月供、总利息与还款明细。",
      currency: "币种",
      principal: "贷款金额",
      rate: "年利率（APR）",
      months: "期限（期/月）",
      monthly: "月供",
      totalInterest: "总利息",
      totalPaid: "总还款",
      schedule: "还款明细",
      month: "期数",
      payment: "还款",
      principalPart: "本金",
      interestPart: "利息",
      balance: "剩余本金",
      first12: "仅显示前 12 期",
      showAll: "显示全部",
      reset: "重置",
      calc: "计算",
      share: "复制分享链接",
      copied: "已复制",
      inputs: "输入",
      results: "结果",
    };
    const en = {
      title: "Loan Calculator",
      desc:
        "Enter principal, APR, and term to get monthly payment, total interest, and a payment breakdown.",
      currency: "Currency",
      principal: "Principal",
      rate: "APR",
      months: "Term (months)",
      monthly: "Monthly payment",
      totalInterest: "Total interest",
      totalPaid: "Total paid",
      schedule: "Breakdown",
      month: "Month",
      payment: "Payment",
      principalPart: "Principal",
      interestPart: "Interest",
      balance: "Balance",
      first12: "Show first 12",
      showAll: "Show all",
      reset: "Reset",
      calc: "Calculate",
      share: "Copy share link",
      copied: "Copied",
      inputs: "Inputs",
      results: "Results",
    };
    return locale === "zh" ? zh : en;
  }, [locale]);

  const content = useMemo(() => {
    if (locale === "zh") {
      return {
        explainTitle: "说明",
        explain: [
          "这个页面适合车贷、消费贷、教育贷等通用贷款场景，用于比较不同利率和期限的月供差异。",
          "如果你在几种贷款方案之间犹豫，可以只改一个参数，例如把期限从 36 个月改到 60 个月，快速看出月供与总利息的变化。",
        ],
        formulaTitle: "公式",
        formula: [
          "月供采用等额本息近似公式：月供 = P × r × (1 + r)^n ÷ ((1 + r)^n - 1)。",
          "其中 P 为贷款本金，r 为月利率，n 为总期数；总还款 = 月供 × 期数，总利息 = 总还款 - 本金。",
        ],
        exampleTitle: "示例",
        example: [
          "例如贷款 20,000，年利率 9.5%，期限 60 个月，你可以看到固定月供以及完整还款拆分。",
          "如果把期限拉长，月供通常会下降，但总利息往往会增加；如果把期限缩短，月供变高，但总利息通常更低。",
        ],
        faqTitle: "常见问题",
        caseTitle: "贷款场景案例",
        cases: [
          {
            title: "车贷方案比较",
            summary:
              "适合比较 36、48、60 个月等不同期限，看月供下降是否值得用更高总利息来换取。",
          },
          {
            title: "消费贷月供压力测试",
            summary:
              "当预算有限时，可以先看月供能否落在可接受范围，再决定是否缩短期限降低总成本。",
          },
          {
            title: "教育或培训分期",
            summary:
              "适合先估算固定月供，再与未来收入增长预期结合，判断是否适合分期。",
          },
        ],
        termCompareTitle: "不同期限对比",
        rateCompareTitle: "不同利率对比",
        compareTerm: "期限",
        compareRate: "年利率",
        compareMonthly: "月供",
        compareInterest: "总利息",
        comparePaid: "总还款",
        faqs: [
          {
            question: "为什么月供低了，总成本反而更高？",
            answer:
              "因为贷款期数变长后，利息累计时间更久，所以虽然每月压力更小，但总支付利息往往上升。",
          },
          {
            question: "这能直接代表 APR 或真实借款成本吗？",
            answer:
              "不一定。真实借款成本还可能包含手续费、保险、服务费和提前还款规则，因此本页更适合做基础测算。",
          },
        ],
      };
    }

    return {
      explainTitle: "What This Tool Does",
      explain: [
        "This calculator is useful for general loans such as personal loans, auto loans, and education financing.",
        "You can compare how loan length and APR change monthly cost and total interest before committing to a lender.",
      ],
      formulaTitle: "Formula",
      formula: [
        "Monthly payment follows the standard amortized loan formula: payment = P × r × (1 + r)^n ÷ ((1 + r)^n - 1).",
        "Total paid = monthly payment × number of months, and total interest = total paid - principal.",
      ],
      exampleTitle: "Example",
      example: [
        "For a 20,000 loan at 9.5% APR over 60 months, the tool shows a fixed monthly payment and a full repayment breakdown.",
        "A longer term usually lowers the monthly payment but increases the total interest paid over time.",
      ],
      faqTitle: "FAQ",
      caseTitle: "Loan Scenarios",
      cases: [
        {
          title: "Auto loan comparison",
          summary:
            "Compare 36, 48, and 60 month terms to see whether lower monthly payments are worth the extra interest.",
        },
        {
          title: "Budget stress test",
          summary:
            "Use the monthly payment result to check whether a loan fits your cash flow before committing.",
        },
        {
          title: "Education financing",
          summary:
            "Estimate a stable monthly cost first, then decide whether the repayment plan matches expected future income.",
        },
      ],
      termCompareTitle: "Term Comparison",
      rateCompareTitle: "APR Comparison",
      compareTerm: "Term",
      compareRate: "APR",
      compareMonthly: "Monthly",
      compareInterest: "Interest",
      comparePaid: "Total paid",
      faqs: [
        {
          question: "Why can a lower monthly payment cost more overall?",
          answer:
            "Because a longer repayment period gives interest more time to accumulate, raising the total cost of borrowing.",
        },
        {
          question: "Does this include all real borrowing costs?",
          answer:
            "Not always. Lenders may also charge fees, insurance, or penalties, so this tool is best for fast scenario comparison.",
        },
      ],
    };
  }, [locale]);

  const monthComparison = useMemo(() => {
    const monthOptions = Array.from(
      new Set(
        [36, parsed.months, 60, 84]
          .map((value) => Math.max(6, Math.round(value)))
          .sort((a, b) => a - b),
      ),
    );

    return monthOptions.map((termMonths) => {
      const schedule = amortizationSchedule({
        principal: parsed.principal,
        annualRatePercent: parsed.annualRate,
        termMonths,
      });
      const totalPaid = round2(schedule.reduce((sum, row) => sum + row.payment, 0));
      const totalInterest = round2(totalPaid - parsed.principal);
      return {
        label: locale === "zh" ? `${termMonths} 个月` : `${termMonths} mo`,
        monthly: formatter.format(
          round2(
            monthlyPayment({
              principal: parsed.principal,
              annualRatePercent: parsed.annualRate,
              termMonths,
            }),
          ),
        ),
        totalInterest: formatter.format(totalInterest),
        totalPaid: formatter.format(totalPaid),
      };
    });
  }, [formatter, locale, parsed.annualRate, parsed.months, parsed.principal]);

  const rateComparison = useMemo(() => {
    const rateOptions = Array.from(
      new Set(
        [Math.max(0, parsed.annualRate - 2), parsed.annualRate, parsed.annualRate + 2]
          .map((value) => round2(value))
          .sort((a, b) => a - b),
      ),
    );

    return rateOptions.map((rate) => {
      const schedule = amortizationSchedule({
        principal: parsed.principal,
        annualRatePercent: rate,
        termMonths: parsed.months,
      });
      const totalPaid = round2(schedule.reduce((sum, row) => sum + row.payment, 0));
      const totalInterest = round2(totalPaid - parsed.principal);
      return {
        label: `${rate}%`,
        monthly: formatter.format(
          round2(
            monthlyPayment({
              principal: parsed.principal,
              annualRatePercent: rate,
              termMonths: parsed.months,
            }),
          ),
        ),
        totalInterest: formatter.format(totalInterest),
        totalPaid: formatter.format(totalPaid),
      };
    });
  }, [formatter, parsed.annualRate, parsed.months, parsed.principal]);

  const schema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          name: t.title,
          description: t.desc,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Any",
          isAccessibleForFree: true,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: calcCurrency,
          },
          url: getAbsoluteUrl(location.pathname),
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
  }, [calcCurrency, content.faqs, location.pathname, t.desc, t.title]);

  const heroUrl = useMemo(() => {
    const prompt = encodeURIComponent(
      "Realistic photo of a personal loan calculator interface on a laptop screen with a notebook and pen, clean minimal desk, soft natural light, professional finance aesthetic, high detail, no text",
    );
    return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${prompt}&image_size=landscape_16_9`;
  }, []);

  function reset() {
    setCurrency(defaults.currency);
    setPrincipal(defaults.principal);
    setAnnualRate(defaults.annualRate);
    setMonths(defaults.months);
    setShowAll(false);
    setCalcCurrency(defaults.currency);
    setCalcPrincipal(defaults.principal);
    setCalcAnnualRate(defaults.annualRate);
    setCalcMonths(defaults.months);
    navigate({ pathname: location.pathname, search: "" }, { replace: true });
  }

  function buildSearch(next?: {
    currency: string;
    principal: string;
    annualRate: string;
    months: string;
  }) {
    const v = next ?? {
      currency: calcCurrency,
      principal: calcPrincipal,
      annualRate: calcAnnualRate,
      months: calcMonths,
    };
    const params = new URLSearchParams();
    params.set("c", v.currency);
    params.set("p", String(v.principal || ""));
    params.set("rate", String(v.annualRate || ""));
    params.set("m", String(v.months || ""));
    return `?${params.toString()}`;
  }

  function calculate() {
    setCalcCurrency(currency);
    setCalcPrincipal(principal);
    setCalcAnnualRate(annualRate);
    setCalcMonths(months);
    setShowAll(false);
    navigate(
      { pathname: location.pathname, search: buildSearch({ currency, principal, annualRate, months }) },
      { replace: true },
    );
  }

  async function copyShareLink() {
    const search = buildSearch();
    navigate({ pathname: location.pathname, search }, { replace: true });
    const url = getAbsoluteUrl(location.pathname, search);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      window.prompt(t.share, url);
    }
  }

  return (
    <ToolShell
      title={t.title}
      description={t.desc}
      schema={schema}
      footer={
        <>
          <Link
            to="/tools"
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white",
              "transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200",
            )}
          >
            {locale === "zh" ? "返回工具列表" : "Back to tools"}
          </Link>
          <Link
            to="/about"
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800",
              "transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700",
            )}
          >
            {locale === "zh" ? "政策说明" : "Policies"}
          </Link>
        </>
      }
    >
      <div className="mb-6 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        <img
          src={heroUrl}
          alt={locale === "zh" ? "贷款计算器示意图" : "Loan calculator illustration"}
          className="h-36 w-full object-cover sm:h-44"
          loading="lazy"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {t.inputs}
            </div>
            <div className="mt-3 grid grid-cols-1 gap-4">
              <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {t.currency}
                <select
                  className={cn(
                    "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                    "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                  )}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="CNY">CNY</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </label>

              <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {t.principal}
                <input
                  className={cn(
                    "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                    "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                  )}
                  inputMode="decimal"
                  type="number"
                  min={0}
                  step="100"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {t.rate} (%)
                  <input
                    className={cn(
                      "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                      "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                    )}
                    inputMode="decimal"
                    type="number"
                    min={0}
                    step="0.01"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(e.target.value)}
                  />
                </label>
                <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {t.months}
                  <input
                    className={cn(
                      "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                      "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                    )}
                    inputMode="numeric"
                    type="number"
                    min={1}
                    step="1"
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={calculate}
                  className={cn(
                    "inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white",
                    "transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200",
                  )}
                >
                  {t.calc}
                </button>
                <button
                  type="button"
                  onClick={copyShareLink}
                  className={cn(
                    "inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800",
                    "transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700",
                  )}
                >
                  {copied ? t.copied : t.share}
                </button>
              </div>

              <button
                type="button"
                onClick={reset}
                className="text-left text-sm font-medium text-zinc-500 underline underline-offset-4 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                {t.reset}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {t.results}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {t.monthly}
              </div>
              <div className="mt-1 text-lg font-semibold">
                {formatter.format(round2(parsed.mp))}
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {t.totalInterest}
              </div>
              <div className="mt-1 text-lg font-semibold">
                {formatter.format(parsed.totalInterest)}
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {t.totalPaid}
              </div>
              <div className="mt-1 text-lg font-semibold">
                {formatter.format(parsed.totalPaid)}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {t.schedule}
            </div>
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-800",
                "transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700",
              )}
            >
              {showAll ? t.first12 : t.showAll}
            </button>
          </div>

          <div className="mt-3 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-zinc-50 text-xs text-zinc-600 dark:bg-zinc-900/40 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2">{t.month}</th>
                  <th className="px-3 py-2">{t.payment}</th>
                  <th className="px-3 py-2">{t.principalPart}</th>
                  <th className="px-3 py-2">{t.interestPart}</th>
                  <th className="px-3 py-2">{t.balance}</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-950">
                {(showAll ? parsed.schedule : parsed.schedule.slice(0, 12)).map(
                  (r) => (
                    <tr
                      key={r.month}
                      className="border-t border-zinc-100 dark:border-zinc-900"
                    >
                      <td className="px-3 py-2">{r.month}</td>
                      <td className="px-3 py-2">{formatter.format(r.payment)}</td>
                      <td className="px-3 py-2">
                        {formatter.format(r.principal)}
                      </td>
                      <td className="px-3 py-2">
                        {formatter.format(r.interest)}
                      </td>
                      <td className="px-3 py-2">
                        {formatter.format(r.balance)}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SectionCard title={content.explainTitle}>
          {content.explain.map((item) => (
            <p key={item}>{item}</p>
          ))}
          <p>
            {locale === "zh" ? "继续比较：" : "Compare with: "}
            <Link className="underline underline-offset-4" to="/tools/mortgage">
              {locale === "zh" ? "房贷计算器" : "Mortgage Calculator"}
            </Link>
            {" / "}
            <Link
              className="underline underline-offset-4"
              to="/tools/calculator"
            >
              {locale === "zh" ? "在线计算器" : "Online Calculator"}
            </Link>
          </p>
        </SectionCard>

        <SectionCard title={content.formulaTitle}>
          {content.formula.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </SectionCard>

        <SectionCard title={content.exampleTitle}>
          {content.example.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </SectionCard>

        <SectionCard title={content.caseTitle}>
          <div className="grid gap-3">
            {content.cases.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800"
              >
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </div>
                <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title={content.termCompareTitle}>
          <ComparisonTable
            columns={[
              content.compareTerm,
              content.compareMonthly,
              content.compareInterest,
              content.comparePaid,
            ]}
            rows={monthComparison.map((row) => [
              row.label,
              row.monthly,
              row.totalInterest,
              row.totalPaid,
            ])}
          />
        </SectionCard>

        <SectionCard title={content.rateCompareTitle}>
          <ComparisonTable
            columns={[
              content.compareRate,
              content.compareMonthly,
              content.compareInterest,
              content.comparePaid,
            ]}
            rows={rateComparison.map((row) => [
              row.label,
              row.monthly,
              row.totalInterest,
              row.totalPaid,
            ])}
          />
        </SectionCard>

        <SectionCard title={content.faqTitle}>
          <FaqList items={content.faqs} />
        </SectionCard>
      </div>
    </ToolShell>
  );
}
