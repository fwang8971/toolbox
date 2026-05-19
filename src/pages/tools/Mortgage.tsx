import ToolPlaceholder from "@/pages/tools/ToolPlaceholder";
import { useLocale } from "@/hooks/useLocale";

export default function Mortgage() {
  const { locale } = useLocale();
  return (
    <ToolPlaceholder
      title={locale === "zh" ? "房贷计算器" : "Mortgage Calculator"}
      description={
        locale === "zh"
          ? "计算月供、总利息与摊还表。"
          : "Calculate monthly payment and amortization schedule."
      }
    />
  );
}
