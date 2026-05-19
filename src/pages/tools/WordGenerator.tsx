import ToolPlaceholder from "@/pages/tools/ToolPlaceholder";
import { useLocale } from "@/hooks/useLocale";

export default function WordGenerator() {
  const { locale } = useLocale();
  return (
    <ToolPlaceholder
      title={locale === "zh" ? "单词生成器" : "Word Generator"}
      description={
        locale === "zh"
          ? "按长度/字母规则生成单词列表，用于练习或 Wordle 类游戏。"
          : "Generate word lists by length and letter rules for practice."
      }
    />
  );
}
