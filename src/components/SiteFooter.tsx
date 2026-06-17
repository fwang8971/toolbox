import { Link } from "react-router-dom";
import { openCookieConsentSettings } from "@/lib/consent";
import { useLocale } from "@/hooks/useLocale";

export default function SiteFooter() {
  const { locale } = useLocale();

  const t =
    locale === "zh"
      ? {
          brand: "Quick Tools",
          desc:
            "面向真实搜索需求的在线工具站，提供房贷、贷款、复利、计算器和英语练习工具。",
          site: "站点",
          tools: "工具",
          guides: "专题",
          policies: "政策",
          contact: "联系",
          home: "首页",
          allTools: "全部工具",
          about: "关于我们",
          guideHub: "专题指南",
          mortgageGuide: "房贷比较指南",
          affordabilityGuide: "购房预算指南",
          rateGuide: "固定/浮动利率指南",
          downPaymentGuide: "首付准备指南",
          loanGuide: "贷款比较指南",
          payoffGuide: "提前还款指南",
          compoundGuide: "复利基础指南",
          investingGuide: "一次性投入 vs 定投",
          privacy: "隐私政策",
          terms: "服务条款",
          disclaimer: "免责声明",
          cookie: "Cookie 设置",
          mortgage: "房贷计算器",
          loan: "贷款计算器",
          compound: "复利计算器",
          calculator: "在线计算器",
          wordChain: "单词接龙",
          wordGenerator: "单词生成器",
          sitemap: "站点地图",
          ads: "ads.txt",
          copyright: "保留所有权利。",
        }
      : {
          brand: "Quick Tools",
          desc:
            "Search-driven online tools for mortgages, loans, compound interest, calculators, and English practice.",
          site: "Site",
          tools: "Tools",
          guides: "Guides",
          policies: "Policies",
          contact: "Contact",
          home: "Home",
          allTools: "All Tools",
          about: "About",
          guideHub: "Guides",
          mortgageGuide: "Mortgage Guide",
          affordabilityGuide: "Affordability Guide",
          rateGuide: "Fixed vs Variable Mortgage",
          downPaymentGuide: "Down Payment Guide",
          loanGuide: "Loan Comparison Guide",
          payoffGuide: "Early Payoff Guide",
          compoundGuide: "Compounding Guide",
          investingGuide: "Lump Sum vs Monthly Investing",
          privacy: "Privacy Policy",
          terms: "Terms",
          disclaimer: "Disclaimer",
          cookie: "Cookie Settings",
          mortgage: "Mortgage Calculator",
          loan: "Loan Calculator",
          compound: "Compound Interest",
          calculator: "Online Calculator",
          wordChain: "Word Chain",
          wordGenerator: "Word Generator",
          sitemap: "Sitemap",
          ads: "ads.txt",
          copyright: "All rights reserved.",
        };

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50/80 dark:border-zinc-900 dark:bg-zinc-950/80">
      <div className="container-page py-10">
        <div className="grid gap-8 md:grid-cols-5">
          <div>
            <div className="text-sm font-semibold tracking-tight">{t.brand}</div>
            <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {t.desc}
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold">{t.site}</div>
            <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Link to="/">{t.home}</Link>
              <Link to="/tools">{t.allTools}</Link>
              <Link to="/guides">{t.guideHub}</Link>
              <Link to="/about">{t.about}</Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">{t.tools}</div>
            <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Link to="/tools/mortgage">{t.mortgage}</Link>
              <Link to="/tools/loan">{t.loan}</Link>
              <Link to="/tools/compound-interest">{t.compound}</Link>
              <Link to="/tools/calculator">{t.calculator}</Link>
              <Link to="/tools/word-chain">{t.wordChain}</Link>
              <Link to="/tools/word-generator">{t.wordGenerator}</Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">{t.guides}</div>
            <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Link to="/guides">{t.guideHub}</Link>
              <Link to="/guides/mortgage-payment-guide">{t.mortgageGuide}</Link>
              <Link to="/guides/home-affordability-basics">{t.affordabilityGuide}</Link>
              <Link to="/guides/fixed-vs-variable-mortgage">{t.rateGuide}</Link>
              <Link to="/guides/down-payment-guide">{t.downPaymentGuide}</Link>
              <Link to="/guides/loan-comparison-guide">{t.loanGuide}</Link>
              <Link to="/guides/pay-off-loan-early-guide">{t.payoffGuide}</Link>
              <Link to="/guides/compound-interest-basics">{t.compoundGuide}</Link>
              <Link to="/guides/lump-sum-vs-monthly-investing">{t.investingGuide}</Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">{t.policies}</div>
            <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Link to="/privacy-policy">{t.privacy}</Link>
              <Link to="/terms">{t.terms}</Link>
              <Link to="/disclaimer">{t.disclaimer}</Link>
              <button
                type="button"
                onClick={openCookieConsentSettings}
                className="text-left"
              >
                {t.cookie}
              </button>
              <a href="/sitemap.xml">{t.sitemap}</a>
              <a href="/ads.txt">{t.ads}</a>
              <a href="mailto:1026365791@qq.com">{t.contact}</a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-900 dark:text-zinc-400">
          © 2026 Quick Tools. {t.copyright}
        </div>
      </div>
    </footer>
  );
}
