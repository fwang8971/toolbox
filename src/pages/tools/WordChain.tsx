import { useLocale } from "@/hooks/useLocale";
import ToolShell from "@/pages/tools/ToolShell";
import { cn } from "@/lib/utils";
import WordTutor from "@/components/WordTutor";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

export default function WordChain() {
  const { locale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const initialWords = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const raw = params.get("w");
    if (!raw) return [] as string[];
    return raw
      .split(",")
      .map((s) => decodeURIComponent(s).trim())
      .filter(Boolean)
      .slice(0, 200);
  }, [location.search]);

  const [words, setWords] = useState<string[]>(initialWords);
  const [nextWord, setNextWord] = useState("");
  const [rejectRepeats, setRejectRepeats] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const t = useMemo(() => {
    const zh = {
      title: "单词接龙",
      desc: "下一个单词必须以前一个单词的末尾字母开头。适合练习词汇与专注力。",
      input: "输入单词",
      add: "加入",
      undo: "撤销",
      reset: "重置",
      rule: "规则",
      ruleText: "只能输入英文字母（a-z）。大小写不敏感。",
      required: "下一词首字母",
      score: "有效单词数",
      repeats: "禁止重复",
      share: "复制分享链接",
      copied: "已复制",
      errEmpty: "请输入单词",
      errLetters: "只允许 a-z 字母",
      errStart: "开头字母不符合规则",
      errRepeat: "该单词已出现",
      history: "已输入列表",
      first: "你可以输入任意起始单词。",
    };
    const en = {
      title: "Word Chain",
      desc:
        "The next word must start with the last letter of the previous word. Great for vocabulary practice.",
      input: "Enter a word",
      add: "Add",
      undo: "Undo",
      reset: "Reset",
      rule: "Rules",
      ruleText: "Letters only (a-z). Case-insensitive.",
      required: "Next starts with",
      score: "Valid words",
      repeats: "No repeats",
      share: "Copy share link",
      copied: "Copied",
      errEmpty: "Type a word first",
      errLetters: "Letters a-z only",
      errStart: "Wrong starting letter",
      errRepeat: "Already used",
      history: "History",
      first: "Start with any word.",
    };
    return locale === "zh" ? zh : en;
  }, [locale]);

  const requiredLetter = useMemo(() => {
    const last = words[words.length - 1];
    if (!last) return null;
    const ch = last.trim().slice(-1).toLowerCase();
    return ch ? ch : null;
  }, [words]);

  const tutorSuggestions = useMemo(() => {
    const recent = words.slice(-20).reverse();
    const unique: string[] = [];
    for (const w of recent) {
      if (!unique.includes(w)) unique.push(w);
    }
    return unique;
  }, [words]);

  function normalizeWord(value: string) {
    return value.trim().toLowerCase();
  }

  function validate(word: string) {
    if (!word) return t.errEmpty;
    if (!/^[a-z]+$/i.test(word)) return t.errLetters;
    if (requiredLetter && word[0].toLowerCase() !== requiredLetter)
      return t.errStart;
    if (rejectRepeats && words.includes(word)) return t.errRepeat;
    return null;
  }

  function addWord() {
    const normalized = normalizeWord(nextWord);
    const err = validate(normalized);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setWords((prev) => [...prev, normalized]);
    setNextWord("");
    setSelected(normalized);
  }

  function undo() {
    setError(null);
    setWords((prev) => prev.slice(0, -1));
  }

  function reset() {
    setError(null);
    setWords([]);
    setNextWord("");
    setRejectRepeats(true);
    setSelected(undefined);
    navigate({ pathname: location.pathname, search: "" }, { replace: true });
  }

  function buildUrl() {
    const params = new URLSearchParams();
    if (words.length > 0) {
      params.set(
        "w",
        words.map((w) => encodeURIComponent(w)).join(","),
      );
    }
    return `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, "")}${location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
  }

  async function copyShareLink() {
    const url = buildUrl();
    navigate(
      { pathname: location.pathname, search: url.split("?")[1] ? `?${url.split("?")[1]}` : "" },
      { replace: true },
    );
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {t.rule}
              </div>
              <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                {t.ruleText}
              </div>
              <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                {requiredLetter ? (
                  <>
                    {t.required}：{" "}
                    <span className="font-semibold">{requiredLetter}</span>
                  </>
                ) : (
                  t.first
                )}
              </div>
            </div>

            <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {t.input}
              <input
                className={cn(
                  "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
                  "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
                )}
                value={nextWord}
                onChange={(e) => setNextWord(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addWord();
                }}
                placeholder={requiredLetter ? `${requiredLetter}...` : undefined}
              />
            </label>

            {error ? (
              <div className="text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            ) : null}

            <label className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={rejectRepeats}
                onChange={(e) => setRejectRepeats(e.target.checked)}
              />
              {t.repeats}
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={addWord}
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white",
                  "transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200",
                )}
              >
                {t.add}
              </button>
              <button
                type="button"
                onClick={undo}
                disabled={words.length === 0}
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800",
                  "transition hover:border-zinc-300 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700",
                )}
              >
                {t.undo}
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
            </div>

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
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {t.score}
              </div>
              <div className="mt-1 text-lg font-semibold">{words.length}</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {t.required}
              </div>
              <div className="mt-1 text-lg font-semibold">
                {requiredLetter ?? "—"}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <WordTutor
              locale={locale}
              initialWord={selected}
              suggestions={tutorSuggestions}
            />
          </div>

          <div className="mt-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {t.history}
          </div>
          <div className="mt-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            {words.length === 0 ? (
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {locale === "zh" ? "还没有内容，先输入一个单词开始。" : "No words yet. Add one to start."}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {words.map((w, idx) => (
                  <button
                    key={`${w}-${idx}`}
                    type="button"
                    onClick={() => setSelected(w)}
                    className={cn(
                      "inline-flex items-center rounded-xl px-3 py-1 text-sm",
                      selected === w
                        ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950"
                        : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800",
                    )}
                  >
                    {idx + 1}. {w}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
