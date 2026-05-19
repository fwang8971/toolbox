import { useEffect, useMemo, useState } from "react";

type Variant = "male" | "female";

function normalizeVoiceName(name: string) {
  return name.toLowerCase().replace(/\s+/g, " ").trim();
}

function pickVoice(voices: SpeechSynthesisVoice[], variant: Variant) {
  const en = voices.filter((v) => v.lang?.toLowerCase().startsWith("en"));
  const list = en.length > 0 ? en : voices;
  if (list.length === 0) return null;

  const withGenderHint = list.filter((v) => {
    const n = normalizeVoiceName(v.name);
    if (variant === "female")
      return (
        n.includes("female") ||
        n.includes("woman") ||
        n.includes("zira") ||
        n.includes("susan") ||
        n.includes("siri")
      );
    return (
      n.includes("male") ||
      n.includes("man") ||
      n.includes("david") ||
      n.includes("mark") ||
      n.includes("alex")
    );
  });

  if (withGenderHint.length > 0) return withGenderHint[0];

  if (list.length === 1) return list[0];

  return variant === "female" ? list[1] : list[0];
}

export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    function load() {
      const v = synth.getVoices();
      setVoices(v);
    }
    load();
    synth.onvoiceschanged = load;
    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  const maleVoice = useMemo(() => pickVoice(voices, "male"), [voices]);
  const femaleVoice = useMemo(() => pickVoice(voices, "female"), [voices]);

  function speak(text: string, variant: Variant) {
    if (!text) return;
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const voice = variant === "male" ? maleVoice : femaleVoice;
    if (voice) utter.voice = voice;
    utter.rate = 0.95;
    utter.pitch = variant === "female" ? 1.1 : 0.95;
    utter.volume = 1;
    synth.speak(utter);
  }

  return { speak, supported: "speechSynthesis" in window, voicesCount: voices.length };
}

