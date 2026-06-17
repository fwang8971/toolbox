import type { ReactNode } from "react";
import AdSenseLoader from "@/components/AdSenseLoader";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import SiteFooter from "@/components/SiteFooter";
import TopNav from "@/components/TopNav";
import Seo from "@/components/Seo";

export default function PageShell({
  title,
  description,
  canonical,
  robots,
  schema,
  children,
}: {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  schema?: unknown;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AdSenseLoader />
      <Seo
        title={title}
        description={description}
        canonical={canonical}
        robots={robots}
        schema={schema}
      />
      <TopNav />
      <main className="flex-1 pb-16 pt-10">{children}</main>
      <SiteFooter />
      <CookieConsentBanner />
    </div>
  );
}
