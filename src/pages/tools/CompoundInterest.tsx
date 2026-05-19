import ToolPlaceholder from "@/pages/tools/ToolPlaceholder";
import { useLocale } from "@/hooks/useLocale";

export default function CompoundInterest() {
  const { locale } = useLocale();
  return (
    <ToolPlaceholder
      title={locale === "zh" ? "复利计算器" : "Compound Interest"}
      description={
        locale === "zh"
          ? "按复利周期与定投金额估算资产增长。"
          : "Project growth with compounding and recurring contributions."
      }
    />
  );
}
