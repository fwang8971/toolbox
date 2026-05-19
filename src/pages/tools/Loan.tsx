import { useLocale } from "@/hooks/useLocale";
import ToolShell from "@/pages/tools/ToolShell";
import { amortizationSchedule, monthlyPayment, round2 } from "@/lib/finance";
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
    </ToolShell>
  );
}
