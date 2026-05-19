import { cn } from "@/lib/utils";
import { translateEnToZh } from "@/lib/translate";
import { useSpeech } from "@/hooks/useSpeech";
import { useEffect, useMemo, useState } from "react";

export default function WordTutor({
  locale,
  initialWord,
  suggestions,
}: {
  locale: "en" | "zh";
  initialWord?: string;
  suggestions?: string[];
}) {
  const { speak, supported, voicesCount } = useSpeech();
  const [word, setWord] = useState(initialWord ?? "");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof initialWord === "string") setWord(initialWord);
  }, [initialWord]);

  const t = useMemo(() => {
    const zh = {
      title: "读音与翻译",
      subtitle: "点击男声/女声朗读英文单词，并可翻译为中文。",
      input: "单词",
      male: "男声",
      female: "女声",
      translate: "翻译",
      translating: "翻译中…",
      translation: "中文释义",
      tip: "提示：朗读依赖浏览器语音引擎；翻译依赖公网接口。",
      noSpeech: "当前浏览器不支持朗读。",
      noVoice: "语音加载中…",
      errInput: "请输入英文单词",
      errLetters: "只允许 a-z 字母（可含连字符）",
      errTranslate: "翻译失败，请稍后重试",
      pick: "点选单词",
    };
    const en = {
      title: "Pronunciation & Translation",
      subtitle: "Speak the word with male/female voice and translate it to Chinese.",
      input: "Word",
      male: "Male",
      female: "Female",
      translate: "Translate",
      translating: "Translating…",
      translation: "Chinese",
      tip: "Speech depends on browser voices; translation uses a public API.",
      noSpeech: "Speech is not supported in this browser.",
      noVoice: "Loading voices…",
      errInput: "Enter an English word",
      errLetters: "Letters a-z only (hyphen allowed)",
      errTranslate: "Translation failed. Try again later.",
      pick: "Pick a word",
    };
    return locale === "zh" ? zh : en;
  }, [locale]);

  const cleaned = useMemo(() => word.trim().toLowerCase(), [word]);
  const valid = useMemo(() => /^[a-z]+(-[a-z]+)*$/.test(cleaned), [cleaned]);

  async function doTranslate() {
    setError(null);
    setTranslation("");
    if (!cleaned) {
      setError(t.errInput);
      return;
    }
    if (!valid) {
      setError(t.errLetters);
      return;
    }
    setLoading(true);
    try {
      const result = await translateEnToZh(cleaned);
      setTranslation(result);
    } catch {
      setError(t.errTranslate);
    } finally {
      setLoading(false);
    }
  }

  function speakMale() {
    setError(null);
    if (!cleaned) {
      setError(t.errInput);
      return;
    }
    if (!valid) {
      setError(t.errLetters);
      return;
    }
    if (!supported) {
      setError(t.noSpeech);
      return;
    }
    if (voicesCount === 0) {
      setError(t.noVoice);
      return;
    }
    speak(cleaned, "male");
  }

  function speakFemale() {
    setError(null);
    if (!cleaned) {
      setError(t.errInput);
      return;
    }
    if (!valid) {
      setError(t.errLetters);
      return;
    }
    if (!supported) {
      setError(t.noSpeech);
      return;
    }
    if (voicesCount === 0) {
      setError(t.noVoice);
      return;
    }
    speak(cleaned, "female");
  }

  const showSuggestions = (suggestions ?? []).slice(0, 24);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {t.title}
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {!supported ? t.noSpeech : voicesCount === 0 ? t.noVoice : null}
        </div>
      </div>

      {showSuggestions.length > 0 ? (
        <div className="mt-3">
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {t.pick}
          </div>
          <div className="mt-2 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {showSuggestions.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => {
                  setWord(w);
                  setTranslation("");
                  setError(null);
                }}
                className="shrink-0 rounded-xl bg-zinc-100 px-3 py-1 text-sm text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-6">
        <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200 sm:col-span-6">
          {t.input}
          <input
            className={cn(
              "mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900",
              "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
            )}
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="example"
          />
        </label>

        <button
          type="button"
          onClick={speakMale}
          disabled={!supported}
          className={cn(
            "inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800",
            "transition hover:border-zinc-300 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700",
            "sm:col-span-2",
          )}
        >
          {t.male}
        </button>
        <button
          type="button"
          onClick={speakFemale}
          disabled={!supported}
          className={cn(
            "inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800",
            "transition hover:border-zinc-300 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700",
            "sm:col-span-2",
          )}
        >
          {t.female}
        </button>

        <button
          type="button"
          onClick={doTranslate}
          disabled={loading}
          className={cn(
            "inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white",
            "transition hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200",
            "sm:col-span-2 sm:col-start-5",
          )}
        >
          {loading ? t.translating : t.translate}
        </button>
      </div>

      {error ? (
        <div className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</div>
      ) : null}

      {translation ? (
        <div className="mt-3 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-900 dark:bg-zinc-900/40 dark:text-zinc-100">
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {t.translation}
          </div>
          <div className="mt-1">{translation}</div>
        </div>
      ) : null}

      <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
        {t.tip}
      </div>
    </div>
  );
}
