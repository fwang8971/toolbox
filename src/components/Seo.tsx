import { useEffect } from "react";
import { getAbsoluteUrl, getSiteUrl } from "@/lib/site";

function upsertMetaByName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, json: unknown) {
  let el = document.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-seo-id", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(json);
}

function removeJsonLd(id: string) {
  document.querySelector(`script[data-seo-id="${id}"]`)?.remove();
}

export default function Seo({
  title,
  description,
  canonical,
  robots,
  schema,
}: {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  schema?: unknown;
}) {
  useEffect(() => {
    const siteName = "Quick Tools";
    const defaultDescription =
      "Free online mortgage calculator, loan calculator, compound interest calculator, online calculator, word chain, and word generator tools.";

    const finalTitle =
      title && title.trim().length > 0
        ? title.trim() === siteName
          ? siteName
          : `${title.trim()} · ${siteName}`
        : siteName;

    const finalDescription =
      description && description.trim().length > 0
        ? description.trim()
        : defaultDescription;

    const finalCanonical =
      canonical && canonical.trim().length > 0
        ? canonical.trim()
        : getAbsoluteUrl(location.pathname);
    const finalRobots =
      robots && robots.trim().length > 0 ? robots.trim() : "index,follow";
    const ogImage = getAbsoluteUrl("/favicon.svg");

    document.title = finalTitle;
    upsertMetaByName("description", finalDescription);
    upsertMetaByName("robots", finalRobots);
    upsertLink("canonical", finalCanonical);

    upsertMetaByProperty("og:site_name", siteName);
    upsertMetaByProperty("og:type", "website");
    upsertMetaByProperty("og:title", finalTitle);
    upsertMetaByProperty("og:description", finalDescription);
    upsertMetaByProperty("og:url", finalCanonical);
    upsertMetaByProperty("og:image", ogImage);

    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", finalTitle);
    upsertMetaByName("twitter:description", finalDescription);
    upsertMetaByName("twitter:image", ogImage);

    upsertJsonLd("default-webpage", {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: finalTitle,
      description: finalDescription,
      url: finalCanonical,
      isPartOf: {
        "@type": "WebSite",
        name: siteName,
        url: getSiteUrl(),
      },
    });

    if (schema) {
      upsertJsonLd("page-schema", schema);
    } else {
      removeJsonLd("page-schema");
    }
  }, [canonical, description, robots, schema, title]);

  return null;
}
