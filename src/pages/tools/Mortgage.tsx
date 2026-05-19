import { useLocale } from "@/hooks/useLocale";
import ToolShell from "@/pages/tools/ToolShell";
import { amortizationSchedule, monthlyPayment, round2 } from "@/lib/finance";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

export default function Mortgage() {
  const { locale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const defaults = useMemo(
    () => ({
      currency: "USD",
      price: "500000",
      downPct: "20",
      annualRate: "6.5",
      years: "30",
    }),
    [],
  );

  const initial = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      currency: params.get("c") ?? defaults.currency,
      price: params.get("price") ?? defaults.price,
      downPct: params.get("down") ?? defaults.downPct,
      annualRate: params.get("rate") ?? defaults.annualRate,
      years: params.get("years") ?? defaults.years,
    };
  }, [defaults, location.search]);

  const [currency, setCurrency] = useState(initial.currency);
  const [price, setPrice] = useState(initial.price);
  const [downPct, setDownPct] = useState(initial.downPct);
  const [annualRate, setAnnualRate] = useState(initial.annualRate);
  const [years, setYears] = useState(initial.years);
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);
  const [calcCurrency, setCalcCurrency] = useState(initial.currency);
  const [calcPrice, setCalcPrice] = useState(initial.price);
  const [calcDownPct, setCalcDownPct] = useState(initial.downPct);
  const [calcAnnualRate, setCalcAnnualRate] = useState(initial.annualRate);
  const [calcYears, setCalcYears] = useState(initial.years);

  const parsed = useMemo(() => {
    const p = Number(calcPrice) || 0;
    const dRaw = Number(calcDownPct) || 0;
    const d = Math.min(100, Math.max(0, dRaw));
    const rate = Math.max(0, Number(calcAnnualRate) || 0);
    const y = Math.max(1, Math.floor(Number(calcYears) || 0));
    const principal = p * (1 - d / 100);
    const termMonths = Math.max(1, Math.floor(y * 12));
    const mp = monthlyPayment({
      principal,
      annualRatePercent: rate,
      termMonths,
    });
    const schedule = amortizationSchedule({
      principal,
      annualRatePercent: rate,
      termMonths,
    });
    const totalPaid = round2(
      schedule.reduce((sum, r) => sum + r.payment, 0),
    );
    const totalInterest = round2(totalPaid - principal);
    return {
      homePrice: p,
      downPct: d,
      annualRate: rate,
      years: y,
      principal,
      termMonths,
      monthly: round2(mp),
      totalPaid,
      totalInterest,
      schedule,
    };
  }, [calcAnnualRate, calcDownPct, calcPrice, calcYears]);

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

  const numberFormatter = useMemo(() => {
    return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-US", {
      maximumFractionDigits: 2,
    });
  }, [locale]);

  const t = useMemo(() => {
    const zh = {
      title: "房贷计算器",
      desc: "输入房价、首付、利率与期限，计算月供、总利息与摊还表。",
      homePrice: "房价",
      downPayment: "首付比例",
      loanAmount: "贷款金额",
      rate: "年利率（APR）",
      years: "期限（年）",
      currency: "币种",
      monthly: "月供",
      totalInterest: "总利息",
      totalPaid: "总还款",
      schedule: "摊还表",
      month: "期数",
      payment: "还款",
      principal: "本金",
      interest: "利息",
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
      title: "Mortgage Calculator",
      desc:
        "Enter price, down payment, APR, and term to get monthly payment, total interest, and amortization schedule.",
      homePrice: "Home price",
      downPayment: "Down payment",
      loanAmount: "Loan amount",
      rate: "APR",
      years: "Term (years)",
      currency: "Currency",
      monthly: "Monthly payment",
      totalInterest: "Total interest",
      totalPaid: "Total paid",
      schedule: "Amortization",
      month: "Month",
      payment: "Payment",
      principal: "Principal",
      interest: "Interest",
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

  function buildSearch(next?: {
    currency: string;
    price: string;
    downPct: string;
    annualRate: string;
    years: string;
  }) {
    const v = next ?? {
      currency: calcCurrency,
      price: calcPrice,
      downPct: calcDownPct,
      annualRate: calcAnnualRate,
      years: calcYears,
    };
    const params = new URLSearchParams();
    params.set("c", v.currency);
    params.set("price", String(v.price || ""));
    params.set("down", String(v.downPct || ""));
    params.set("rate", String(v.annualRate || ""));
    params.set("years", String(v.years || ""));
    return `?${params.toString()}`;
  }

  function calculate() {
    setCalcCurrency(currency);
    setCalcPrice(price);
    setCalcDownPct(downPct);
    setCalcAnnualRate(annualRate);
    setCalcYears(years);
    setShowAll(false);
    navigate(
      { pathname: location.pathname, search: buildSearch({ currency, price, downPct, annualRate, years }) },
      { replace: true },
    );
  }

  function reset() {
    setCurrency(defaults.currency);
    setPrice(defaults.price);
    setDownPct(defaults.downPct);
    setAnnualRate(defaults.annualRate);
    setYears(defaults.years);
    setCalcCurrency(defaults.currency);
    setCalcPrice(defaults.price);
    setCalcDownPct(defaults.downPct);
    setCalcAnnualRate(defaults.annualRate);
    setCalcYears(defaults.years);
    setShowAll(false);
    navigate({ pathname: location.pathname, search: "" }, { replace: true });
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

  const heroUrl = useMemo(() => {
    const prompt = encodeURIComponent(
      "Realistic photo, flat lay of a modern mortgage calculator on a smartphone screen next to a small model house and a house key on a clean white desk, soft natural daylight, minimal fintech aesthetic, high detail, 4k, no text",
    );
    return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${prompt}&image_size=landscape_16_9`;
  }, []);

  return (
    <ToolShell title={t.title} description={t.desc} footer={
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
    }>
      <div className="mb-6 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        <img
          src={heroUrl}
          alt={locale === "zh" ? "房贷计算器示意图" : "Mortgage calculator illustration"}
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
                {t.homePrice}
                <input
                  className={cn(
                    "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                    "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                  )}
                  inputMode="decimal"
                  type="number"
                  min={0}
                  step="1000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {t.downPayment} (%)
                  <input
                    className={cn(
                      "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                      "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                    )}
                    inputMode="decimal"
                    type="number"
                    min={0}
                    max={100}
                    step="0.1"
                    value={downPct}
                    onChange={(e) => setDownPct(e.target.value)}
                  />
                </label>
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
              </div>

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
                {t.loanAmount}
              </div>
              <div className="mt-1 text-lg font-semibold">
                {formatter.format(parsed.principal)}
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {t.monthly}
              </div>
              <div className="mt-1 text-lg font-semibold">
                {formatter.format(parsed.monthly)}
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
                  <th className="px-3 py-2">{t.principal}</th>
                  <th className="px-3 py-2">{t.interest}</th>
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
                      <td className="px-3 py-2">
                        {formatter.format(r.payment)}
                      </td>
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

          <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
            {locale === "zh"
              ? `期限：${numberFormatter.format(parsed.termMonths)} 期｜总还款：${formatter.format(parsed.totalPaid)}`
              : `Term: ${numberFormatter.format(parsed.termMonths)} months · Total paid: ${formatter.format(parsed.totalPaid)}`}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
