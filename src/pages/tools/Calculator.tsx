import { useLocale } from "@/hooks/useLocale";
import { FaqList, SectionCard } from "@/components/ContentBlocks";
import { getAbsoluteUrl } from "@/lib/site";
import ToolShell from "@/pages/tools/ToolShell";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

type Op = "+" | "-" | "×" | "÷";

function toNumber(value: string) {
  if (!value) return 0;
  if (value === "-") return -0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function formatNumber(locale: string, value: number) {
  if (!Number.isFinite(value)) return "Error";
  const abs = Math.abs(value);
  if (abs !== 0 && (abs >= 1e12 || abs < 1e-6)) {
    return value.toExponential(8).replace(/\.?0+e/, "e");
  }
  const formatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 10,
  });
  return formatter.format(value);
}

function compute(a: number, b: number, op: Op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "×") return a * b;
  return a / b;
}

export default function Calculator() {
  const { locale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const t = useMemo(() => {
    const zh = {
      title: "在线计算器",
      desc: "支持键盘输入与按钮操作，进行加减乘除、百分比、开方、倒数与记忆功能。",
      share: "复制分享链接",
      copied: "已复制",
      reset: "重置",
      memory: "记忆",
    };
    const en = {
      title: "Online Calculator",
      desc:
        "Keyboard + keypad calculator with +, -, ×, ÷, percent, sqrt, reciprocal, and memory.",
      share: "Copy share link",
      copied: "Copied",
      reset: "Reset",
      memory: "Memory",
    };
    return locale === "zh" ? zh : en;
  }, [locale]);

  const content = useMemo(() => {
    if (locale === "zh") {
      return {
        explainTitle: "说明",
        explain: [
          "这是一个适合日常快速计算的在线计算器，支持键盘输入、按钮操作和记忆键。",
          "除了加减乘除外，你还可以直接做百分比、平方根、倒数和正负号切换。",
        ],
        formulaTitle: "逻辑",
        formula: [
          "基础四则运算按当前输入值与待执行运算符顺序计算。",
          "百分比会把当前显示值除以 100；平方根会对当前值开方；倒数会把当前值转为 1 ÷ 当前值。",
          "记忆键 MC、MR、M+、M- 可帮助你在多步计算中暂存数值。",
        ],
        exampleTitle: "示例",
        example: [
          "如果你想估算折扣价格，可以先输入原价，再用百分比和乘法快速完成计算。",
          "如果你在贷款或复利页面需要中间算式，也可以把本页作为辅助计算器一起使用。",
        ],
        faqTitle: "常见问题",
        faqs: [
          {
            question: "为什么会出现 Error？",
            answer:
              "常见原因包括除以 0，或对负数执行平方根。出现 Error 后可点击 C 重置。",
          },
          {
            question: "这个计算器适合复杂财务公式吗？",
            answer:
              "它更适合快速辅助计算。复杂贷款、房贷和复利场景建议直接使用对应的专业工具页。",
          },
        ],
      };
    }

    return {
      explainTitle: "What This Tool Does",
      explain: [
        "This is a fast general-purpose calculator for everyday math with keyboard support and memory keys.",
        "It handles basic arithmetic as well as percent, square root, reciprocal, and sign switching.",
      ],
      formulaTitle: "Logic",
      formula: [
        "Standard operators apply to the current value and the stored pending operation.",
        "Percent divides the current display by 100, square root applies √x, and reciprocal converts the current value to 1 ÷ x.",
        "Memory keys let you store and reuse values during multi-step calculations.",
      ],
      exampleTitle: "Example",
      example: [
        "Use this calculator for quick discount checks, intermediate finance math, or verification while using the other tool pages.",
        "It works well as a helper when comparing mortgages, loans, or compounding scenarios.",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Why do I sometimes see Error?",
          answer:
            "Typical causes include division by zero or applying square root to a negative number. Press C to reset.",
        },
        {
          question: "Is this meant for advanced finance formulas?",
          answer:
            "It is best for quick support calculations. Use the dedicated mortgage, loan, and compound interest pages for richer financial scenarios.",
        },
      ],
    };
  }, [locale]);

  const schema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          name: t.title,
          description: t.desc,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          isAccessibleForFree: true,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
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
  }, [content.faqs, location.pathname, t.desc, t.title]);

  const initial = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const d = params.get("d");
    return typeof d === "string" && d.length > 0 ? d.slice(0, 32) : "0";
  }, [location.search]);

  const [display, setDisplay] = useState(initial);
  const [acc, setAcc] = useState<number | null>(null);
  const [pendingOp, setPendingOp] = useState<Op | null>(null);
  const [waiting, setWaiting] = useState(false);
  const [memory, setMemory] = useState(0);
  const [copied, setCopied] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const heroUrl = useMemo(() => {
    const prompt = encodeURIComponent(
      "Realistic photo of a modern pocket calculator with large display on a clean desk, soft natural light, minimal style, high detail, no text, no brand",
    );
    return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${prompt}&image_size=landscape_16_9`;
  }, []);

  const displayLocale = useMemo(() => (locale === "zh" ? "zh-CN" : "en-US"), [locale]);

  const formatted = useMemo(() => {
    if (display === "Error") return "Error";
    if (display === "-" || display.endsWith(".")) return display;
    return formatNumber(displayLocale, toNumber(display));
  }, [display, displayLocale]);

  function pushDigit(digit: string) {
    setDisplay((prev) => {
      if (prev === "Error") return digit;
      if (waiting) {
        setWaiting(false);
        return digit;
      }
      if (prev === "0") return digit;
      if (prev === "-0") return `-${digit}`;
      if (prev.length >= 20) return prev;
      return `${prev}${digit}`;
    });
  }

  function pushDot() {
    setDisplay((prev) => {
      if (prev === "Error") return "0.";
      if (waiting) {
        setWaiting(false);
        return "0.";
      }
      if (prev.includes(".")) return prev;
      return `${prev}.`;
    });
  }

  function clearAll() {
    setDisplay("0");
    setAcc(null);
    setPendingOp(null);
    setWaiting(false);
  }

  function backspace() {
    setDisplay((prev) => {
      if (prev === "Error") return "0";
      if (waiting) return prev;
      if (prev.length <= 1) return "0";
      if (prev.length === 2 && prev.startsWith("-")) return "0";
      return prev.slice(0, -1);
    });
  }

  function toggleSign() {
    setDisplay((prev) => {
      if (prev === "Error") return prev;
      if (prev === "0") return "-0";
      if (prev === "-0") return "0";
      if (prev.startsWith("-")) return prev.slice(1);
      return `-${prev}`;
    });
  }

  function applyPercent() {
    setDisplay((prev) => {
      if (prev === "Error") return prev;
      const n = toNumber(prev) / 100;
      return String(n);
    });
    setWaiting(false);
  }

  function applySqrt() {
    setDisplay((prev) => {
      if (prev === "Error") return prev;
      const n = toNumber(prev);
      if (n < 0) return "Error";
      return String(Math.sqrt(n));
    });
    setWaiting(false);
  }

  function applyReciprocal() {
    setDisplay((prev) => {
      if (prev === "Error") return prev;
      const n = toNumber(prev);
      if (n === 0) return "Error";
      return String(1 / n);
    });
    setWaiting(false);
  }

  function setOperator(op: Op) {
    if (display === "Error") return;
    const current = toNumber(display);
    if (acc === null) {
      setAcc(current);
      setPendingOp(op);
      setWaiting(true);
      return;
    }
    if (pendingOp && !waiting) {
      const next = compute(acc, current, pendingOp);
      setAcc(next);
      setDisplay(String(next));
    }
    setPendingOp(op);
    setWaiting(true);
  }

  function equals() {
    if (display === "Error") return;
    const current = toNumber(display);
    if (acc === null || !pendingOp) return;
    const next = compute(acc, current, pendingOp);
    setAcc(null);
    setPendingOp(null);
    setWaiting(true);
    setDisplay(String(next));
  }

  function memoryClear() {
    setMemory(0);
  }

  function memoryRecall() {
    setDisplay(String(memory));
    setWaiting(false);
  }

  function memoryAdd() {
    const n = toNumber(display);
    setMemory((m) => m + n);
    setWaiting(true);
  }

  function memorySub() {
    const n = toNumber(display);
    setMemory((m) => m - n);
    setWaiting(true);
  }

  function buildShareSearch(nextDisplay: string) {
    const params = new URLSearchParams(location.search);
    if (nextDisplay && nextDisplay !== "0" && nextDisplay !== "Error") {
      params.set("d", nextDisplay.slice(0, 32));
    } else {
      params.delete("d");
    }
    const next = params.toString();
    return next ? `?${next}` : "";
  }

  function updateUrl(nextDisplay: string) {
    navigate(
      { pathname: location.pathname, search: buildShareSearch(nextDisplay) },
      { replace: true },
    );
  }

  async function copyShareLink() {
    const search = buildShareSearch(display);
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

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
        pushDigit(e.key);
        return;
      }
      if (e.key === ".") {
        e.preventDefault();
        pushDot();
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        backspace();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        clearAll();
        return;
      }
      if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        equals();
        return;
      }
      if (e.key === "+") {
        e.preventDefault();
        setOperator("+");
        return;
      }
      if (e.key === "-") {
        e.preventDefault();
        setOperator("-");
        return;
      }
      if (e.key === "*") {
        e.preventDefault();
        setOperator("×");
        return;
      }
      if (e.key === "/") {
        e.preventDefault();
        setOperator("÷");
        return;
      }
      if (e.key === "%") {
        e.preventDefault();
        applyPercent();
        return;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const memActive = Math.abs(memory) > 0;

  const buttons: {
    label: string;
    onClick: () => void;
    variant?: "op" | "fn" | "danger";
    span?: number;
  }[] = [
    { label: "MC", onClick: memoryClear, variant: "fn" },
    { label: "MR", onClick: memoryRecall, variant: "fn" },
    { label: "M+", onClick: memoryAdd, variant: "fn" },
    { label: "M-", onClick: memorySub, variant: "fn" },
    { label: "C", onClick: clearAll, variant: "danger" },

    { label: "7", onClick: () => pushDigit("7") },
    { label: "8", onClick: () => pushDigit("8") },
    { label: "9", onClick: () => pushDigit("9") },
    { label: "÷", onClick: () => setOperator("÷"), variant: "op" },
    { label: "√", onClick: applySqrt, variant: "op" },

    { label: "4", onClick: () => pushDigit("4") },
    { label: "5", onClick: () => pushDigit("5") },
    { label: "6", onClick: () => pushDigit("6") },
    { label: "×", onClick: () => setOperator("×"), variant: "op" },
    { label: "%", onClick: applyPercent, variant: "op" },

    { label: "1", onClick: () => pushDigit("1") },
    { label: "2", onClick: () => pushDigit("2") },
    { label: "3", onClick: () => pushDigit("3") },
    { label: "-", onClick: () => setOperator("-"), variant: "op" },
    { label: "1/x", onClick: applyReciprocal, variant: "op" },

    { label: "0", onClick: () => pushDigit("0"), span: 1 },
    { label: ".", onClick: pushDot },
    { label: "±", onClick: toggleSign, variant: "op" },
    { label: "+", onClick: () => setOperator("+"), variant: "op" },
    { label: "=", onClick: equals, variant: "op" },
  ];

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
          alt={locale === "zh" ? "在线计算器示意图" : "Calculator illustration"}
          className={cn(
            "h-44 w-full object-cover sm:h-52",
            heroLoaded ? "opacity-100" : "opacity-0",
          )}
          loading="lazy"
          onLoad={() => setHeroLoaded(true)}
        />
      </div>

      <div className="mx-auto w-full max-w-sm">
        <div
          className={cn(
            "rounded-3xl border border-zinc-200 bg-white p-4",
            "dark:border-zinc-800 dark:bg-zinc-950",
          )}
        >
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {t.memory}: {memActive ? formatNumber(displayLocale, memory) : "—"}
            </div>
            <button
              type="button"
              onClick={copyShareLink}
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-800",
                "transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700",
              )}
            >
              {copied ? t.copied : t.share}
            </button>
          </div>

          <div
            className={cn(
              "mt-3 flex h-16 items-end justify-end rounded-2xl bg-zinc-50 px-3 font-mono text-3xl text-zinc-900",
              "dark:bg-zinc-900/40 dark:text-zinc-100",
            )}
          >
            {formatted}
          </div>

          <div className="mt-3 grid grid-cols-5 gap-2">
            {buttons.map((b) => (
              <button
                key={b.label}
                type="button"
                onClick={b.onClick}
                className={cn(
                  "h-12 rounded-2xl text-sm font-semibold",
                  "transition active:scale-[0.99]",
                  b.variant === "op"
                    ? "bg-emerald-100 text-emerald-950 hover:bg-emerald-200 dark:bg-emerald-400/20 dark:text-emerald-100 dark:hover:bg-emerald-400/30"
                    : b.variant === "danger"
                      ? "bg-orange-200 text-orange-950 hover:bg-orange-300 dark:bg-orange-400/20 dark:text-orange-100 dark:hover:bg-orange-400/30"
                      : "bg-zinc-100 text-zinc-950 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800",
                )}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <button
              type="button"
              onClick={backspace}
              className="underline underline-offset-2"
            >
              {locale === "zh" ? "退格" : "Backspace"}
            </button>
            <button
              type="button"
              onClick={() => {
                updateUrl(display);
              }}
              className="underline underline-offset-2"
            >
              {locale === "zh" ? "更新链接参数" : "Update URL"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SectionCard title={content.explainTitle}>
          {content.explain.map((item) => (
            <p key={item}>{item}</p>
          ))}
          <p>
            {locale === "zh" ? "推荐搭配：" : "Recommended with: "}
            <Link className="underline underline-offset-4" to="/tools/loan">
              {locale === "zh" ? "贷款计算器" : "Loan Calculator"}
            </Link>
            {" / "}
            <Link
              className="underline underline-offset-4"
              to="/tools/compound-interest"
            >
              {locale === "zh" ? "复利计算器" : "Compound Interest"}
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

        <SectionCard title={content.faqTitle}>
          <FaqList items={content.faqs} />
        </SectionCard>
      </div>
    </ToolShell>
  );
}
