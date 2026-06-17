import { useMemo } from "react";
import PageShell from "@/components/PageShell";
import PolicyLinks from "@/components/PolicyLinks";
import { SectionCard } from "@/components/ContentBlocks";
import { useLocale } from "@/hooks/useLocale";

export default function Terms() {
  const { locale } = useLocale();

  const t = useMemo(() => {
    if (locale === "zh") {
      return {
        title: "服务条款",
        subtitle:
          "使用 Quick Tools 即表示你同意以下基本使用规则。本站提供的是公开、免费的在线工具服务。",
        sections: [
          {
            title: "服务性质",
            body: [
              "Quick Tools 提供房贷、贷款、复利、单词练习和其他日常小工具，主要用于信息参考和效率提升。",
              "我们会持续改进功能，但不保证任何工具在所有场景下都完全适用于你的个人、商业或法律用途。",
            ],
          },
          {
            title: "允许的使用方式",
            body: [
              "你可以免费使用公开提供的工具页面，用于个人学习、参考或日常工作。",
              "你可以分享工具链接给其他人，但不得冒充为你自己的产品或误导用户来源。",
            ],
          },
          {
            title: "禁止行为",
            body: [
              "不得利用自动化脚本、爬虫、攻击流量或异常请求破坏站点稳定性。",
              "不得尝试绕过限制、注入恶意代码、抓取敏感信息或影响广告与统计系统。",
              "不得通过诱导、作弊或无效点击的方式干扰广告服务。",
            ],
          },
          {
            title: "知识产权与内容",
            body: [
              "本站页面结构、原创说明文案与品牌标识归站点维护者所有，除法律允许或获得许可外，不得整站复制转载。",
              "部分内容可能依赖公开规则、通用公式或第三方平台能力，这些权利归原提供方所有。",
            ],
          },
          {
            title: "服务变更与中断",
            body: [
              "我们可以在不事先通知的情况下修改、暂停或下线部分工具、页面或功能。",
              "对于因维护、升级、第三方故障或不可抗力导致的访问中断，我们不承担由此产生的直接损失。",
            ],
          },
        ],
      };
    }

    return {
      title: "Terms of Service",
      subtitle:
        "By using Quick Tools, you agree to these basic rules. The site provides free public utility tools.",
      sections: [
        {
          title: "Nature of the Service",
          body: [
            "Quick Tools offers calculators, word tools, and other simple utilities for reference and productivity.",
            "We try to keep the tools accurate and useful, but they may not fit every personal, business, or legal scenario.",
          ],
        },
        {
          title: "Permitted Use",
          body: [
            "You may use the public tools for personal learning, reference, or everyday work at no charge.",
            "You may share links to the tools, but you may not misrepresent the site as your own product or hide the source.",
          ],
        },
        {
          title: "Prohibited Conduct",
          body: [
            "You may not use bots, scraping abuse, attacks, or other traffic patterns that harm site stability.",
            "You may not attempt to inject malicious code, bypass limits, or interfere with advertising or analytics systems.",
            "You may not generate invalid ad clicks or manipulate monetization services.",
          ],
        },
        {
          title: "Intellectual Property",
          body: [
            "The original page structure, written content, and branding of the site belong to the site operator unless otherwise stated.",
            "Some features rely on public formulas, rules, or third-party platforms, and those rights remain with their respective owners.",
          ],
        },
        {
          title: "Changes and Availability",
          body: [
            "We may change, suspend, or remove tools and features at any time without prior notice.",
            "We are not liable for direct losses caused by maintenance, third-party failures, or service interruptions beyond reasonable control.",
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

