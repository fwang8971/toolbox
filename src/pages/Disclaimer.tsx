import { useMemo } from "react";
import PageShell from "@/components/PageShell";
import PolicyLinks from "@/components/PolicyLinks";
import { SectionCard } from "@/components/ContentBlocks";
import { useLocale } from "@/hooks/useLocale";

export default function Disclaimer() {
  const { locale } = useLocale();

  const t = useMemo(() => {
    if (locale === "zh") {
      return {
        title: "免责声明",
        subtitle:
          "Quick Tools 提供的是一般性信息与在线工具，不构成金融、法律、税务、医疗或其他专业意见。",
        sections: [
          {
            title: "信息仅供参考",
            body: [
              "本网站上的结果、说明和示例仅用于帮助你快速理解常见计算逻辑或单词练习规则。",
              "你在做贷款、投资、税务、法律或商业决策前，应结合正式合同、官方文件或专业人士意见进行确认。",
            ],
          },
          {
            title: "不保证绝对准确或适用",
            body: [
              "虽然我们会尽力保持公式、逻辑与页面内容清晰可用，但不保证任何结果在所有国家、地区、机构或业务场景下都完全准确。",
              "不同银行、平台、合同条款和法规可能导致实际结果与页面输出存在差异。",
            ],
          },
          {
            title: "第三方内容与链接",
            body: [
              "站点可能引用第三方服务、链接、公开规则或广告内容；这些内容由其各自提供方负责。",
              "我们不对第三方网站的可用性、准确性、隐私规则或业务行为承担责任。",
            ],
          },
          {
            title: "广告与收益声明",
            body: [
              "站点可能展示广告以支持运营。广告展示不代表我们对相关产品或服务作出推荐或担保。",
              "请勿将广告内容视为专业建议或购买决策依据。",
            ],
          },
        ],
      };
    }

    return {
      title: "Disclaimer",
      subtitle:
        "Quick Tools provides general information and online utilities only. Nothing on this site should be treated as professional advice.",
      sections: [
        {
          title: "Information for Reference Only",
          body: [
            "The results, explanations, and examples on this site are intended to help users understand common calculations and language exercises.",
            "Before making financial, legal, tax, or business decisions, you should confirm details with official documents or qualified professionals.",
          ],
        },
        {
          title: "No Guarantee of Universal Accuracy",
          body: [
            "We aim to keep the tools and content useful, but we do not guarantee that outputs are correct for every country, lender, platform, or contract.",
            "Actual outcomes may vary depending on local rules, bank policies, legal requirements, or business terms.",
          ],
        },
        {
          title: "Third-Party Links and Services",
          body: [
            "The site may reference third-party services, rules, public resources, or advertisements, which remain the responsibility of their respective providers.",
            "We are not responsible for the availability, accuracy, privacy practices, or conduct of third-party websites.",
          ],
        },
        {
          title: "Advertising Notice",
          body: [
            "The site may display ads to support operations. The presence of an ad does not mean we endorse or guarantee the advertised product or service.",
            "Please do not treat advertising content as professional or purchase advice.",
          ],
        },
      ],
    };
  }, [locale]);

  return (
    <PageShell title={t.title} description={t.subtitle}>
      <div className="container-page">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{t.title}</h1>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              {t.subtitle}
            </p>
          </div>

          <PolicyLinks locale={locale} />

          {t.sections.map((section) => (
            <SectionCard key={section.title} title={section.title}>
              {section.body.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </SectionCard>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

