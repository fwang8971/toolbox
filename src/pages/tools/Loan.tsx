import ToolPlaceholder from "@/pages/tools/ToolPlaceholder";
import { useLocale } from "@/hooks/useLocale";

export default function Loan() {
  const { locale } = useLocale();
  return (
    <ToolPlaceholder
      title={locale === "zh" ? "贷款计算器" : "Loan Calculator"}
      description={
        locale === "zh"
          ? "估算月供，并用于不同利率/期限方案对比。"
          : "Estimate monthly payment and compare APR across offers."
      }
    />
  );
}
