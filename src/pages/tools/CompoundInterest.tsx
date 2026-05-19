import { useLocale } from "@/hooks/useLocale";
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
    const url = `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, "")}${location.pathname}${search}`;
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
    </ToolShell>
  );
}
