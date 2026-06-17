import { useLocale } from "@/hooks/useLocale";
import { ComparisonTable, FaqList, SectionCard } from "@/components/ContentBlocks";
import { getAbsoluteUrl } from "@/lib/site";
import ToolShell from "@/pages/tools/ToolShell";
import { compoundProjection } from "@/lib/finance";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

export default function CompoundInterest() {
  const { locale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const defaults = useMemo(
    () => ({
      currency: "USD",
      initial: "10000",
      monthly: "500",
      annualRate: "8",
      years: "20",
      freq: "12",
    }),
    [],
  );

  const initialState = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      currency: params.get("c") ?? defaults.currency,
      initial: params.get("i") ?? defaults.initial,
      monthly: params.get("m") ?? defaults.monthly,
      annualRate: params.get("rate") ?? defaults.annualRate,
      years: params.get("y") ?? defaults.years,
      freq: params.get("f") ?? defaults.freq,
    };
  }, [defaults, location.search]);

  const [currency, setCurrency] = useState(initialState.currency);
  const [initial, setInitial] = useState(initialState.initial);
  const [monthly, setMonthly] = useState(initialState.monthly);
  const [annualRate, setAnnualRate] = useState(initialState.annualRate);
  const [years, setYears] = useState(initialState.years);
  const [freq, setFreq] = useState(initialState.freq);
  const [copied, setCopied] = useState(false);
  const [calcCurrency, setCalcCurrency] = useState(initialState.currency);
  const [calcInitial, setCalcInitial] = useState(initialState.initial);
  const [calcMonthly, setCalcMonthly] = useState(initialState.monthly);
  const [calcAnnualRate, setCalcAnnualRate] = useState(initialState.annualRate);
  const [calcYears, setCalcYears] = useState(initialState.years);
  const [calcFreq, setCalcFreq] = useState(initialState.freq);

  const parsed = useMemo(() => {
    const i = Math.max(0, Number(calcInitial) || 0);
    const m = Math.max(0, Number(calcMonthly) || 0);
    const rate = Math.max(0, Number(calcAnnualRate) || 0);
    const y = Math.max(1, Math.floor(Number(calcYears) || 0));
    const f = Math.max(1, Math.floor(Number(calcFreq) || 12));
    return compoundProjection({
      initial: i,
      monthlyContribution: m,
      annualRatePercent: rate,
      years: y,
      compoundsPerYear: f,
    });
  }, [calcAnnualRate, calcFreq, calcInitial, calcMonthly, calcYears]);

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
      title: "复利计算器",
      desc: "输入初始资金、年化收益率、定投金额与复利周期，预估未来资产增长。",
      currency: "币种",
      initial: "初始资金",
      monthly: "每月定投",
      rate: "年化收益率（%）",
      years: "投资年限（年）",
      freq: "复利周期",
      freqMonthly: "每月复利",
      freqQuarterly: "每季度复利",
      freqYearly: "每年复利",
      freqDaily: "每日复利（近似）",
      end: "期末总资产",
      contributed: "累计投入",
      interest: "累计收益",
      table: "逐年明细",
      year: "年份",
      endBalance: "期末资产",
      totalContributed: "累计投入",
      totalInterest: "累计收益",
      reset: "重置",
      calc: "计算",
      share: "复制分享链接",
      copied: "已复制",
      inputs: "输入",
      results: "结果",
    };
    const en = {
      title: "Compound Interest",
      desc:
        "Project growth with an initial amount, recurring contributions, APR, and compounding frequency.",
      currency: "Currency",
      initial: "Initial",
      monthly: "Monthly contribution",
      rate: "Annual rate (%)",
      years: "Years",
      freq: "Compounding",
      freqMonthly: "Monthly",
      freqQuarterly: "Quarterly",
      freqYearly: "Yearly",
      freqDaily: "Daily (approx.)",
      end: "Ending balance",
      contributed: "Total contributed",
      interest: "Total interest",
      table: "Yearly breakdown",
      year: "Year",
      endBalance: "End balance",
      totalContributed: "Contributed",
      totalInterest: "Interest",
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
          "这个工具适合做长期投资、定投储蓄或教育金规划的粗略估算，帮助你理解时间和收益率对资产增长的影响。",
          "你可以同时调整初始资金、每月定投、年化收益率和复利频率，观察终值与累计收益如何变化。",
        ],
        formulaTitle: "公式",
        formula: [
          "复利的核心思想是“收益继续产生收益”。在离散复利下，单次本金增长可以写为 A = P × (1 + r / n)^(n × t)。",
          "本页同时考虑初始资金和持续定投，因此最终结果会综合初始本金的复利增长与每期新增投入后的增长。",
        ],
        exampleTitle: "示例",
        example: [
          "例如初始资金 10,000，每月定投 500，年化收益率 8%，投资 20 年，终值通常会明显高于单纯投入总额。",
          "如果你把收益率从 8% 改到 6%，或者把年限从 20 年改到 10 年，结果差异通常会非常明显。",
        ],
        caseTitle: "投资场景案例",
        cases: [
          {
            title: "退休金长期积累",
            summary:
              "适合估算每月固定投入在 20 到 30 年后的增长效果，帮助判断当前储蓄节奏是否足够。",
          },
          {
            title: "子女教育金准备",
            summary:
              "适合根据目标入学时间倒推投入周期，比较提高月供还是延长年限更容易达到目标金额。",
          },
          {
            title: "闲置资金再投资",
            summary:
              "如果已经有一笔初始资金，可以用它测试不同收益率和复利频率对最终资产的放大效果。",
          },
        ],
        insightTitle: "结果解读",
        faqTitle: "常见问题",
        yearCompareTitle: "不同年限对比",
        rateCompareTitle: "不同收益率对比",
        compareYears: "投资年限",
        compareRate: "年化收益率",
        compareEnd: "期末总资产",
        compareContributed: "累计投入",
        compareInterest: "累计收益",
        faqs: [
          {
            question: "为什么收益率只差几个百分点，结果差很多？",
            answer:
              "因为复利会在多年后放大细小差距，尤其在长期投资场景中，时间越长，收益率差异对终值影响越明显。",
          },
          {
            question: "这是不是对未来收益的承诺？",
            answer:
              "不是。本页只做数学投影，不代表实际投资回报；真实市场会受到波动、费用、税务和时点影响。",
          },
        ],
      };
    }

    return {
      explainTitle: "What This Tool Does",
      explain: [
        "Use this page to estimate long-term growth for investing, saving, or contribution-based goals.",
        "It helps you see how time, contribution size, and return rate combine to shape the final balance.",
      ],
      formulaTitle: "Formula",
      formula: [
        "Compound growth is based on the idea that gains can generate new gains over time.",
        "A common discrete compounding expression is A = P × (1 + r / n)^(n × t), while this page also includes recurring contributions in the projection.",
      ],
      exampleTitle: "Example",
      example: [
        "For an initial 10,000 balance, 500 added monthly, an 8% annual rate, and 20 years, the ending balance can be much larger than the total amount contributed.",
        "Small changes in annual return or investment duration can create large differences because compounding becomes stronger over time.",
      ],
      caseTitle: "Investment Scenarios",
      cases: [
        {
          title: "Retirement planning",
          summary:
            "Estimate how steady monthly contributions can grow over 20 to 30 years and check whether your current savings pace is enough.",
        },
        {
          title: "Education fund target",
          summary:
            "Work backward from a future education date and compare whether higher monthly deposits or a longer timeline is more realistic.",
        },
        {
          title: "Lump sum reinvestment",
          summary:
            "If you already have a starting balance, compare how APR and compounding frequency can amplify that capital over time.",
        },
      ],
      insightTitle: "Result Insights",
      faqTitle: "FAQ",
      yearCompareTitle: "Years Comparison",
      rateCompareTitle: "Rate Comparison",
      compareYears: "Years",
      compareRate: "Annual rate",
      compareEnd: "Ending balance",
      compareContributed: "Contributed",
      compareInterest: "Interest",
      faqs: [
        {
          question: "Why do small APR changes create big differences later?",
          answer:
            "Because compounding magnifies even small differences over long periods, especially when you keep contributing regularly.",
        },
        {
          question: "Is this a guaranteed investment result?",
          answer:
            "No. This is only a math-based projection and does not account for volatility, fees, taxes, or real market timing.",
        },
      ],
    };
  }, [locale]);

  const currentProjectionYear = parsed.rows[parsed.rows.length - 1]?.year ?? 0;

  const yearComparison = useMemo(() => {
    const yearOptions = Array.from(
      new Set(
        [10, currentProjectionYear, 20, 30]
          .map((value) => Math.max(1, Math.round(value)))
          .sort((a, b) => a - b),
      ),
    );

    return yearOptions.map((value) => {
      const projection = compoundProjection({
        initial: Number(calcInitial) || 0,
        monthlyContribution: Number(calcMonthly) || 0,
        annualRatePercent: Number(calcAnnualRate) || 0,
        years: value,
        compoundsPerYear: Math.max(1, Number(calcFreq) || 12),
      });
      return {
        label: locale === "zh" ? `${value} 年` : `${value} yr`,
        endBalance: formatter.format(projection.endBalance),
        totalContributed: formatter.format(projection.totalContributed),
        totalInterest: formatter.format(projection.totalInterest),
      };
    });
  }, [
    calcAnnualRate,
    calcFreq,
    calcInitial,
    calcMonthly,
    currentProjectionYear,
    formatter,
    locale,
  ]);

  const rateComparison = useMemo(() => {
    const baseRate = Math.max(0, Number(calcAnnualRate) || 0);
    const rateOptions = Array.from(
      new Set(
        [Math.max(0, baseRate - 2), baseRate, baseRate + 2]
          .map((value) => Math.round(value * 100) / 100)
          .sort((a, b) => a - b),
      ),
    );

    return rateOptions.map((value) => {
      const projection = compoundProjection({
        initial: Number(calcInitial) || 0,
        monthlyContribution: Number(calcMonthly) || 0,
        annualRatePercent: value,
        years: Math.max(1, Number(calcYears) || 1),
        compoundsPerYear: Math.max(1, Number(calcFreq) || 12),
      });
      return {
        label: `${value}%`,
        endBalance: formatter.format(projection.endBalance),
        totalContributed: formatter.format(projection.totalContributed),
        totalInterest: formatter.format(projection.totalInterest),
      };
    });
  }, [calcAnnualRate, calcFreq, calcInitial, calcMonthly, calcYears, formatter]);

  const insights = useMemo(() => {
    const contributed = formatter.format(parsed.totalContributed);
    const ending = formatter.format(parsed.endBalance);
    const interest = formatter.format(parsed.totalInterest);
    const interestDominant = parsed.totalInterest >= parsed.totalContributed * 0.5;
    const longHorizon = Math.max(1, Number(calcYears) || 1) >= 20;

    if (locale === "zh") {
      return [
        `当前方案下，累计投入约 ${contributed}，预计期末总资产约 ${ending}，其中累计收益约 ${interest}。`,
        interestDominant
          ? "收益部分已经占到较高比重，说明时间和复利开始主导结果，后期增长通常会更明显。"
          : "当前结果仍然主要由本金和持续定投推动，如果希望放大复利效果，通常需要更长周期或更高收益率。",
        longHorizon
          ? "这是偏长期的资金规划模型，更适合退休金、教育金或长期资产积累场景。"
          : "当前投资周期偏短，建议结合下方年限对比表，观察把周期拉长后的资产增长差异。",
      ];
    }

    return [
      `This setup projects about ${contributed} contributed, ${ending} ending balance, and ${interest} generated by growth.`,
      interestDominant
        ? "Growth already accounts for a meaningful share of the final balance, which shows compounding is doing more of the work over time."
        : "The outcome is still driven mostly by principal and recurring contributions, so a longer timeline or higher rate usually changes the picture more.",
      longHorizon
        ? "This is a long-horizon projection and fits goals such as retirement planning, education funding, or long-term wealth building."
        : "This is still a relatively short horizon, so the years comparison table is useful for seeing how much more time can improve the result.",
    ];
  }, [
    calcYears,
    formatter,
    locale,
    parsed.endBalance,
    parsed.totalContributed,
    parsed.totalInterest,
  ]);

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
      "Realistic photo of a tablet showing an investment growth chart and compound interest calculator interface, green upward line graph, coins and a small plant on a clean modern desk, soft light, minimal fintech aesthetic, high detail, no text",
    );
    return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${prompt}&image_size=landscape_16_9`;
  }, []);

  function reset() {
    setCurrency(defaults.currency);
    setInitial(defaults.initial);
    setMonthly(defaults.monthly);
    setAnnualRate(defaults.annualRate);
    setYears(defaults.years);
    setFreq(defaults.freq);
    setCalcCurrency(defaults.currency);
    setCalcInitial(defaults.initial);
    setCalcMonthly(defaults.monthly);
    setCalcAnnualRate(defaults.annualRate);
    setCalcYears(defaults.years);
    setCalcFreq(defaults.freq);
    navigate({ pathname: location.pathname, search: "" }, { replace: true });
  }

  function buildSearch(next?: {
    currency: string;
    initial: string;
    monthly: string;
    annualRate: string;
    years: string;
    freq: string;
  }) {
    const v = next ?? {
      currency: calcCurrency,
      initial: calcInitial,
      monthly: calcMonthly,
      annualRate: calcAnnualRate,
      years: calcYears,
      freq: calcFreq,
    };
    const params = new URLSearchParams();
    params.set("c", v.currency);
    params.set("i", String(v.initial || ""));
    params.set("m", String(v.monthly || ""));
    params.set("rate", String(v.annualRate || ""));
    params.set("y", String(v.years || ""));
    params.set("f", String(v.freq || ""));
    return `?${params.toString()}`;
  }

  function calculate() {
    setCalcCurrency(currency);
    setCalcInitial(initial);
    setCalcMonthly(monthly);
    setCalcAnnualRate(annualRate);
    setCalcYears(years);
    setCalcFreq(freq);
    navigate(
      {
        pathname: location.pathname,
        search: buildSearch({ currency, initial, monthly, annualRate, years, freq }),
      },
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
          alt={locale === "zh" ? "复利计算器示意图" : "Compound interest illustration"}
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
                {t.initial}
                <input
                  className={cn(
                    "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                    "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                  )}
                  inputMode="decimal"
                  type="number"
                  min={0}
                  step="100"
                  value={initial}
                  onChange={(e) => setInitial(e.target.value)}
                />
              </label>

              <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {t.monthly}
                <input
                  className={cn(
                    "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                    "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                  )}
                  inputMode="decimal"
                  type="number"
                  min={0}
                  step="10"
                  value={monthly}
                  onChange={(e) => setMonthly(e.target.value)}
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {t.rate}
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
                  {t.years}
                  <input
                    className={cn(
                      "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                      "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                    )}
                    inputMode="numeric"
                    type="number"
                    min={1}
                    step="1"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                  />
                </label>
              </div>

              <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {t.freq}
                <select
                  className={cn(
                    "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                    "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                  )}
                  value={freq}
                  onChange={(e) => setFreq(e.target.value)}
                >
                  <option value="12">{t.freqMonthly}</option>
                  <option value="4">{t.freqQuarterly}</option>
                  <option value="1">{t.freqYearly}</option>
                  <option value="365">{t.freqDaily}</option>
                </select>
              </label>

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
                {t.end}
              </div>
              <div className="mt-1 text-lg font-semibold">
                {formatter.format(parsed.endBalance)}
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {t.contributed}
              </div>
              <div className="mt-1 text-lg font-semibold">
                {formatter.format(parsed.totalContributed)}
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {t.interest}
              </div>
              <div className="mt-1 text-lg font-semibold">
                {formatter.format(parsed.totalInterest)}
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {t.table}
          </div>

          <div className="mt-3 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-zinc-50 text-xs text-zinc-600 dark:bg-zinc-900/40 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2">{t.year}</th>
                  <th className="px-3 py-2">{t.endBalance}</th>
                  <th className="px-3 py-2">{t.totalContributed}</th>
                  <th className="px-3 py-2">{t.totalInterest}</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-950">
                {parsed.rows.map((r) => (
                  <tr
                    key={r.year}
                    className="border-t border-zinc-100 dark:border-zinc-900"
                  >
                    <td className="px-3 py-2">{r.year}</td>
                    <td className="px-3 py-2">
                      {formatter.format(r.endBalance)}
                    </td>
                    <td className="px-3 py-2">
                      {formatter.format(r.contributed)}
                    </td>
                    <td className="px-3 py-2">{formatter.format(r.interest)}</td>
                  </tr>
                ))}
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
            {locale === "zh" ? "常一起使用：" : "Often used with: "}
            <Link className="underline underline-offset-4" to="/tools/calculator">
              {locale === "zh" ? "在线计算器" : "Online Calculator"}
            </Link>
            {" / "}
            <Link className="underline underline-offset-4" to="/tools/loan">
              {locale === "zh" ? "贷款计算器" : "Loan Calculator"}
            </Link>
          </p>
          <p>
            {locale === "zh" ? "先读专题：" : "Read next: "}
            <Link
              className="underline underline-offset-4"
              to="/guides/compound-interest-basics"
            >
              {locale === "zh" ? "复利基础指南" : "Compounding Guide"}
            </Link>
            {" / "}
            <Link
              className="underline underline-offset-4"
              to="/guides/lump-sum-vs-monthly-investing"
            >
              {locale === "zh" ? "一次性投入 vs 定投" : "Lump Sum vs Monthly Investing"}
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

        <SectionCard title={content.insightTitle}>
          <div className="grid gap-3">
            {insights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-zinc-200 p-4 text-sm leading-7 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
              >
                {item}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title={content.yearCompareTitle}>
          <ComparisonTable
            columns={[
              content.compareYears,
              content.compareEnd,
              content.compareContributed,
              content.compareInterest,
            ]}
            rows={yearComparison.map((row) => [
              row.label,
              row.endBalance,
              row.totalContributed,
              row.totalInterest,
            ])}
          />
        </SectionCard>

        <SectionCard title={content.rateCompareTitle}>
          <ComparisonTable
            columns={[
              content.compareRate,
              content.compareEnd,
              content.compareContributed,
              content.compareInterest,
            ]}
            rows={rateComparison.map((row) => [
              row.label,
              row.endBalance,
              row.totalContributed,
              row.totalInterest,
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
