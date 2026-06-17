import fs from "node:fs";
import path from "node:path";

const DEFAULT_SITE_URL = "https://toolbox-3kc.pages.dev";
const siteUrl = (process.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

const routes = [
  "/",
  "/tools",
  "/about",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
  "/tools/calculator",
  "/tools/mortgage",
  "/tools/loan",
  "/tools/compound-interest",
  "/tools/word-chain",
  "/tools/word-generator",
];

const publicDir = path.resolve("public");
fs.mkdirSync(publicDir, { recursive: true });

const robotsContent = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url>\n    <loc>${siteUrl}${route}</loc>\n  </url>`).join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsContent, "utf8");
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapContent, "utf8");

console.log(`Generated robots.txt and sitemap.xml for ${siteUrl}`);
