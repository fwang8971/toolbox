import { useLocale } from "@/hooks/useLocale";
import { FaqList, SectionCard } from "@/components/ContentBlocks";
import { getAbsoluteUrl } from "@/lib/site";
import ToolShell from "@/pages/tools/ToolShell";
import { cn } from "@/lib/utils";
import WordTutor from "@/components/WordTutor";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

export default function WordGenerator() {
  const { locale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const defaults = useMemo(
    () => ({
      length: "5",
      count: "20",
      starts: "",
      ends: "",
      contains: "",
      exclude: "",
      pronounceable: "1",
    }),
    [],
  );

  const initial = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      length: params.get("l") ?? defaults.length,
      count: params.get("n") ?? defaults.count,
      starts: params.get("s") ?? defaults.starts,
      ends: params.get("e") ?? defaults.ends,
      contains: params.get("c") ?? defaults.contains,
      exclude: params.get("x") ?? defaults.exclude,
      pronounceable: params.get("p") ?? defaults.pronounceable,
    };
  }, [defaults, location.search]);

  const [length, setLength] = useState(initial.length);
  const [count, setCount] = useState(initial.count);
  const [starts, setStarts] = useState(initial.starts);
  const [ends, setEnds] = useState(initial.ends);
  const [contains, setContains] = useState(initial.contains);
  const [exclude, setExclude] = useState(initial.exclude);
  const [pronounceable, setPronounceable] = useState(initial.pronounceable === "1");
  const [words, setWords] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const t = useMemo(() => {
    const zh = {
      title: "单词生成器",
      desc: "按长度与字母规则生成单词列表，可用于练习、命名或 Wordle 类游戏。",
      length: "单词长度",
      count: "生成数量",
      starts: "必须以…开头",
      ends: "必须以…结尾",
      contains: "必须包含",
      exclude: "排除字母",
      pronounceable: "更像英文发音（辅音/元音交替）",
      generate: "生成",
      reset: "重置",
      result: "结果",
      copy: "复制结果",
      copied: "已复制",
      share: "复制分享链接",
      copiedLink: "已复制链接",
      errRules: "规则过于严格，尝试降低限制或减少排除字母。",
      tip: "提示：规则只做字母匹配，不校验是否为真实单词。",
    };
    const en = {
      title: "Word Generator",
      desc:
        "Generate word lists by length and letter rules for practice, naming, or Wordle-like games.",
      length: "Word length",
      count: "Count",
      starts: "Starts with",
      ends: "Ends with",
      contains: "Must contain",
      exclude: "Exclude letters",
      pronounceable: "Pronounceable (consonant/vowel)",
      generate: "Generate",
      reset: "Reset",
      result: "Results",
      copy: "Copy results",
      copied: "Copied",
      share: "Copy share link",
      copiedLink: "Copied link",
      errRules: "Rules are too strict. Relax constraints or remove exclusions.",
      tip: "Tip: This is pattern-based and does not validate real dictionary words.",
    };
    return locale === "zh" ? zh : en;
  }, [locale]);

  const content = useMemo(() => {
    if (locale === "zh") {
      return {
        explainTitle: "说明",
        explain: [
          "这个工具适合做字母模式训练、Wordle 类游戏练习、英语命名灵感或课堂小活动准备。",
          "你可以同时限制长度、开头、结尾、必须包含字母和排除字母，快速生成一组候选词。",
        ],
        formulaTitle: "生成逻辑",
        formula: [
          "系统会按你设置的长度和字母规则生成候选字符串。",
          "开启“更像英文发音”后，核心部分会更偏向辅音和元音交替，从而让结果更接近可读单词。",
          "本工具按模式生成，不保证输出一定是真实词典单词。",
        ],
        exampleTitle: "示例",
        example: [
          "如果长度为 5、开头为 st、结尾为 e，并要求包含 ar，系统会尽量生成同时满足这些条件的结果。",
          "如果规则过严，例如排除了太多字母或长度不够容纳所有限制，系统会提示你放宽条件。",
        ],
        faqTitle: "常见问题",
        faqs: [
          {
            question: "为什么生成失败或结果很少？",
            answer:
              "通常是因为规则过多、排除字母太多，或者长度不足以容纳开头、结尾和包含条件。可以先减少限制再试。",
          },
          {
            question: "我可以把结果用于真实英语学习吗？",
            answer:
              "可以把它作为字母模式和发音练习材料，但如果你需要真实词义和标准拼写，建议结合翻译或词典工具一起使用。",
          },
        ],
      };
    }

    return {
      explainTitle: "What This Tool Does",
      explain: [
        "This page helps with word-pattern drills, Wordle-style practice, naming ideas, and lightweight classroom activities.",
        "You can control length, prefixes, suffixes, required letters, and excluded letters to generate candidate words quickly.",
      ],
      formulaTitle: "Generation Logic",
      formula: [
        "The generator builds candidates based on the length and letter rules you enter.",
        "When pronounceable mode is on, the core letters lean toward consonant-vowel alternation to feel more word-like.",
        "Outputs are pattern-based and are not guaranteed to be real dictionary words.",
      ],
      exampleTitle: "Example",
      example: [
        "If the length is 5, the word must start with st, end with e, and include ar, the tool tries to generate results that match all those constraints.",
        "If the rules are too strict, the tool will ask you to relax them by removing exclusions or shortening required patterns.",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Why do I get no results or only a few results?",
          answer:
            "The rule set may be too restrictive, especially if the excluded letters remove too many options or the total length is too short.",
        },
        {
          question: "Can I use this for real vocabulary study?",
          answer:
            "Yes, but it works best as a pattern and pronunciation helper. For verified meanings and spellings, pair it with a dictionary or translation tool.",
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
          applicationCategory: "EducationalApplication",
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

  const normalizedRules = useMemo(() => {
    const l = Math.max(1, Math.min(20, Math.floor(Number(length) || 0)));
    const n = Math.max(1, Math.min(200, Math.floor(Number(count) || 0)));
    const toLetters = (s: string) => s.trim().toLowerCase().replace(/[^a-z]/g, "");
    const s = toLetters(starts);
    const e = toLetters(ends);
    const c = toLetters(contains);
    const x = toLetters(exclude);
    return { l, n, s, e, c, x, pronounceable };
  }, [contains, count, ends, exclude, length, pronounceable, starts]);

  function buildUrl() {
    const params = new URLSearchParams();
    params.set("l", String(length || ""));
    params.set("n", String(count || ""));
    if (starts) params.set("s", starts);
    if (ends) params.set("e", ends);
    if (contains) params.set("c", contains);
    if (exclude) params.set("x", exclude);
    params.set("p", pronounceable ? "1" : "0");
    return getAbsoluteUrl(location.pathname, `?${params.toString()}`);
  }

  async function copyShareLink() {
    const url = buildUrl();
    navigate({ pathname: location.pathname, search: `?${url.split("?")[1]}` }, { replace: true });
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 1200);
    } catch {
      window.prompt(t.share, url);
    }
  }

  async function copyResults() {
    const text = words.join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      window.prompt(t.copy, text);
    }
  }

  function reset() {
    setLength(defaults.length);
    setCount(defaults.count);
    setStarts(defaults.starts);
    setEnds(defaults.ends);
    setContains(defaults.contains);
    setExclude(defaults.exclude);
    setPronounceable(defaults.pronounceable === "1");
    setWords([]);
    setError(null);
    setSelected(undefined);
    navigate({ pathname: location.pathname, search: "" }, { replace: true });
  }

  function generate() {
    const { l, n, s, e, c, x } = normalizedRules;
    const vowels = ["a", "e", "i", "o", "u"];
    const consonants = "bcdfghjklmnpqrstvwxyz".split("");
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const allowed = alphabet.filter((ch) => !x.includes(ch));

    const tryBuild = () => {
      const prefix = s;
      const suffix = e;
      const coreLen = l - prefix.length - suffix.length;
      if (coreLen < 0) return null;

      const core: string[] = [];
      for (let i = 0; i < coreLen; i += 1) {
        const pool = pronounceable
          ? (i % 2 === 0 ? consonants : vowels)
          : allowed;
        const filtered = pool.filter((ch) => allowed.includes(ch));
        if (filtered.length === 0) return null;
        core.push(filtered[Math.floor(Math.random() * filtered.length)]);
      }

      let word = `${prefix}${core.join("")}${suffix}`;
      if (c && c.length <= word.length && !word.includes(c)) {
        if (c.length > l) return null;
        if (c.length <= coreLen) {
          const startMin = prefix.length;
          const startMax = prefix.length + coreLen - c.length;
          const pos =
            startMax >= startMin
              ? startMin + Math.floor(Math.random() * (startMax - startMin + 1))
              : startMin;
          word = `${word.slice(0, pos)}${c}${word.slice(pos + c.length)}`;
        } else {
          return null;
        }
      }
      if (c && !word.includes(c)) return null;
      if (x && [...word].some((ch) => x.includes(ch))) return null;
      if (s && !word.startsWith(s)) return null;
      if (e && !word.endsWith(e)) return null;
      if (![...word].every((ch) => allowed.includes(ch))) return null;
      return word;
    };

    const result = new Set<string>();
    let tries = 0;
    const maxTries = n * 200;
    while (result.size < n && tries < maxTries) {
      tries += 1;
      const w = tryBuild();
      if (w) result.add(w);
    }

    if (result.size === 0) {
      setError(t.errRules);
      setWords([]);
      return;
    }

    setError(null);
    const list = Array.from(result);
    setWords(list);
    setSelected(list[0]);
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {t.length}
                <input
                  className={cn(
                    "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                    "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                  )}
                  inputMode="numeric"
                  type="number"
                  min={1}
                  max={20}
                  step="1"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
              </label>
              <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {t.count}
                <input
                  className={cn(
                    "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                    "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                  )}
                  inputMode="numeric"
                  type="number"
                  min={1}
                  max={200}
                  step="1"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
              </label>
            </div>

            <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {t.starts}
              <input
                className={cn(
                  "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                  "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                )}
                value={starts}
                onChange={(e) => setStarts(e.target.value)}
                placeholder="ab"
              />
            </label>

            <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {t.ends}
              <input
                className={cn(
                  "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                  "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                )}
                value={ends}
                onChange={(e) => setEnds(e.target.value)}
                placeholder="ed"
              />
            </label>

            <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {t.contains}
              <input
                className={cn(
                  "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                  "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                )}
                value={contains}
                onChange={(e) => setContains(e.target.value)}
                placeholder="ar"
              />
            </label>

            <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {t.exclude}
              <input
                className={cn(
                  "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                  "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                )}
                value={exclude}
                onChange={(e) => setExclude(e.target.value)}
                placeholder="aeiou"
              />
            </label>

            <label className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={pronounceable}
                onChange={(e) => setPronounceable(e.target.checked)}
              />
              {t.pronounceable}
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={generate}
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white",
                  "transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200",
                )}
              >
                {t.generate}
              </button>
              <button
                type="button"
                onClick={reset}
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800",
                  "transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700",
                )}
              >
                {t.reset}
              </button>
              <button
                type="button"
                onClick={copyShareLink}
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800",
                  "transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700",
                )}
              >
                {copiedLink ? t.copiedLink : t.share}
              </button>
            </div>

            {error ? (
              <div className="text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            ) : (
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                {t.tip}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mb-4">
            <WordTutor locale={locale} initialWord={selected} suggestions={words} />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {t.result}
            </div>
            <button
              type="button"
              onClick={copyResults}
              disabled={words.length === 0}
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-800",
                "transition hover:border-zinc-300 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700",
              )}
            >
              {copied ? t.copied : t.copy}
            </button>
          </div>

          <div className="mt-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            {words.length === 0 ? (
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {locale === "zh" ? "点击“生成”后，这里会输出单词列表。" : "Click Generate to see the list here."}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {words.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setSelected(w)}
                    className={cn(
                      "rounded-xl px-3 py-2 text-sm",
                      selected === w
                        ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950"
                        : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800",
                    )}
                  >
                    {w}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SectionCard title={content.explainTitle}>
          {content.explain.map((item) => (
            <p key={item}>{item}</p>
          ))}
          <p>
            {locale === "zh" ? "推荐联动：" : "Pair with: "}
            <Link className="underline underline-offset-4" to="/tools/word-chain">
              {locale === "zh" ? "单词接龙" : "Word Chain"}
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
