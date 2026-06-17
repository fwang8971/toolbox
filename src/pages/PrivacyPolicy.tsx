import { useMemo } from "react";
import PageShell from "@/components/PageShell";
import PolicyLinks from "@/components/PolicyLinks";
import { SectionCard } from "@/components/ContentBlocks";
import { useLocale } from "@/hooks/useLocale";

export default function PrivacyPolicy() {
  const { locale } = useLocale();

  const t = useMemo(() => {
    if (locale === "zh") {
      return {
        title: "隐私政策",
        subtitle:
          "本页面说明 Quick Tools 会收集哪些信息、如何使用这些信息，以及广告与分析相关的基本规则。",
        intro:
          "Quick Tools 尽量只保留网站正常运行所需的最少信息。我们不会要求你注册账号来使用基础工具功能。",
        sections: [
          {
            title: "我们可能收集的信息",
            body: [
              "站点可能使用本地存储保存语言、主题等偏好设置，方便你下次访问时继续使用相同体验。",
              "服务器、CDN 或第三方平台可能记录基础访问日志，例如访问时间、设备类型、浏览器信息和来源页面，用于安全、性能与运营分析。",
              "如果你主动通过邮箱联系站点，我们会收到你在邮件中提供的信息。",
            ],
          },
          {
            title: "信息的用途",
            body: [
              "用于提供工具功能、修复错误、优化页面性能与提升可用性。",
              "用于识别异常流量、滥用行为或安全风险，保护站点和访问者。",
              "用于理解哪些工具更受欢迎，从而优先改进真实有需求的页面。",
            ],
          },
          {
            title: "Cookie 与广告",
            body: [
              "如果站点启用 Google AdSense 或其他广告服务，第三方可能使用 Cookie 来展示更相关的广告并统计广告效果。",
              "不同地区可能适用不同的用户同意规则；当站点需要时，我们会显示相应的同意提示或管理选项。",
              "你也可以通过页脚中的 Cookie 设置重新打开同意横幅，选择仅必要功能或允许广告 Cookie。",
              "你可以在浏览器中清除 Cookie，或通过浏览器隐私设置限制第三方跟踪。",
            ],
          },
          {
            title: "第三方服务",
            body: [
              "站点可能使用 Cloudflare、Google AdSense、Google Search Console 或其他基础服务来托管、统计、加速与展示广告。",
              "这些第三方服务有各自的隐私政策与数据处理规则，我们建议你同时阅读其官方说明。",
            ],
          },
          {
            title: "你的选择",
            body: [
              "你可以随时停止使用本网站。",
              "你可以清除浏览器缓存、本地存储与 Cookie，以删除本地保存的偏好记录。",
              "如对隐私问题有疑问，可通过页面中的联系邮箱与我们联系。",
            ],
          },
        ],
      };
    }

    return {
      title: "Privacy Policy",
      subtitle:
        "This page explains what information Quick Tools may collect, how it is used, and the basics of advertising and analytics.",
      intro:
        "Quick Tools tries to keep data collection minimal and only uses what is necessary to run the site and improve usability.",
      sections: [
        {
          title: "Information We May Collect",
          body: [
            "The site may use local storage to remember language, theme, and other simple preferences.",
            "Hosting providers, CDNs, or third-party services may log standard request data such as timestamps, browser type, device details, and referring pages for security and performance purposes.",
            "If you contact us by email, we receive the information you include in that message.",
          ],
        },
        {
          title: "How We Use Information",
          body: [
            "To provide tool functionality, fix bugs, improve performance, and make the site easier to use.",
            "To detect abuse, invalid traffic, or security issues and protect the site and its visitors.",
            "To understand which tools are most useful so we can prioritize better content and features.",
          ],
        },
        {
          title: "Cookies and Advertising",
          body: [
            "If Google AdSense or similar services are enabled, third parties may use cookies to serve more relevant ads and measure performance.",
            "Different regions may require different consent flows; when needed, we will display consent or preference controls.",
            "You can also reopen the consent banner from the footer cookie settings link to keep essentials only or allow advertising cookies.",
            "You can clear cookies or limit tracking through your browser settings.",
          ],
        },
        {
          title: "Third-Party Services",
          body: [
            "The site may rely on services such as Cloudflare, Google AdSense, and Google Search Console for hosting, delivery, analytics, and advertising.",
            "Those services have their own privacy rules, so you should also review their official policies.",
          ],
        },
        {
          title: "Your Choices",
          body: [
            "You may stop using the website at any time.",
            "You may clear browser cache, cookies, and local storage to remove saved preferences.",
            "If you have privacy questions, contact us through the email address shown on the site.",
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
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {t.intro}
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
