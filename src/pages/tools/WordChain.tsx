import ToolPlaceholder from "@/pages/tools/ToolPlaceholder";
import { useLocale } from "@/hooks/useLocale";

export default function WordChain() {
  const { locale } = useLocale();
  return (
    <ToolPlaceholder
      title={locale === "zh" ? "单词接龙" : "Word Chain"}
      description={
        locale === "zh"
          ? "英文词汇小游戏：下一个单词必须以前一个词的末尾字母开头。"
          : "A quick word game for vocabulary and focus."
      }
    />
  );
}
