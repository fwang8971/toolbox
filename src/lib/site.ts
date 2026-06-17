export const DEFAULT_SITE_URL = "https://toolbox-3kc.pages.dev";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export function getSiteUrl() {
  const configured = import.meta.env.VITE_SITE_URL?.trim();
  if (configured) {
    return trimTrailingSlash(configured);
  }

  if (typeof window !== "undefined") {
    const { origin, hostname } = window.location;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return trimTrailingSlash(origin);
    }
  }

  return DEFAULT_SITE_URL;
}

export function getBasePath() {
  const base = import.meta.env.BASE_URL ?? "/";
  return base === "/" ? "" : trimTrailingSlash(base);
}

export function getAbsoluteUrl(pathname = "/", search = "", hash = "") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const basePath = getBasePath();
  const fullPath = `${basePath}${normalizedPath}`.replace(/\/{2,}/g, "/");
  const finalSearch =
    search.length === 0 ? "" : search.startsWith("?") ? search : `?${search}`;
  const finalHash = hash.length === 0 ? "" : hash.startsWith("#") ? hash : `#${hash}`;
  return `${getSiteUrl()}${fullPath}${finalSearch}${finalHash}`;
}
