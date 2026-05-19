const cache = new Map<string, string>();

export async function translateEnToZh(text: string) {
  const q = text.trim();
  if (!q) return "";
  const key = q.toLowerCase();
  const cached = cache.get(key);
  if (cached) return cached;

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=en|zh-CN`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("translate_failed");
  const data = (await res.json()) as {
    responseData?: { translatedText?: string };
  };
  const translated = data.responseData?.translatedText?.trim() ?? "";
  if (!translated) throw new Error("translate_empty");
  cache.set(key, translated);
  return translated;
}

