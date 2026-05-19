import type { Locale } from "@/i18n/types";

export type ToolCategory = "Finance" | "English" | "Text" | "Image" | "File" | "Security";

export type ToolDefinition = {
  slug: string
  name: Record<Locale, string>
  description: Record<Locale, string>
  category: ToolCategory
  isMvp: boolean
}

export const TOOL_CATEGORIES: {
  id: ToolCategory
  label: Record<Locale, string>
}[] = [
  { id: "Finance", label: { en: "Finance", zh: "金融" } },
  { id: "English", label: { en: "English", zh: "英语" } },
  { id: "Text", label: { en: "Text", zh: "文本" } },
  { id: "Image", label: { en: "Image", zh: "图片" } },
  { id: "File", label: { en: "File", zh: "文件" } },
  { id: "Security", label: { en: "Security", zh: "安全/合规" } },
]

export const TOOLS: ToolDefinition[] = [
  {
    slug: "mortgage",
    name: { en: "Mortgage Calculator", zh: "房贷计算器" },
    description: {
      en: "Monthly payment, total interest, and amortization schedule.",
      zh: "月供、总利息与还款计划表（摊还表）。",
    },
    category: "Finance",
    isMvp: true,
  },
  {
    slug: "loan",
    name: { en: "Loan Calculator", zh: "贷款计算器" },
    description: {
      en: "General loan calculator for monthly payment and APR comparison.",
      zh: "通用贷款月供测算，可用于利率/期限方案对比。",
    },
    category: "Finance",
    isMvp: true,
  },
  {
    slug: "compound-interest",
    name: { en: "Compound Interest", zh: "复利计算器" },
    description: {
      en: "Growth projection with contributions and compounding periods.",
      zh: "支持定投与复利周期的资产增长预估。",
    },
    category: "Finance",
    isMvp: true,
  },
  {
    slug: "word-chain",
    name: { en: "Word Chain", zh: "单词接龙" },
    description: {
      en: "A quick word game: next word must start with the last letter.",
      zh: "英文单词接龙：下一个单词以最后一个字母开头。",
    },
    category: "English",
    isMvp: true,
  },
  {
    slug: "word-generator",
    name: { en: "Word Generator", zh: "单词生成器" },
    description: {
      en: "Generate words by length/letters for practice and games like Wordle.",
      zh: "按长度/字母规则生成单词列表，可用于 Wordle 练习。",
    },
    category: "English",
    isMvp: true,
  },
]
