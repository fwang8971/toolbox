export type CookieConsent = {
  essential: true;
  ads: boolean;
  updatedAt: string;
};

export const COOKIE_CONSENT_KEY = "quick-tools-cookie-consent";
export const COOKIE_CONSENT_CHANGE_EVENT = "quick-tools-cookie-consent-change";
export const COOKIE_CONSENT_OPEN_EVENT = "quick-tools-cookie-consent-open";

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    if (typeof parsed.ads !== "boolean") {
      return null;
    }
    return {
      essential: true,
      ads: parsed.ads,
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function saveCookieConsent(consent: Pick<CookieConsent, "ads">) {
  if (typeof window === "undefined") {
    return;
  }

  const next: CookieConsent = {
    essential: true,
    ads: consent.ads,
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_CHANGE_EVENT, { detail: next }));
}

export function openCookieConsentSettings() {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT));
}

export function hasAdsConsent(consent = readCookieConsent()) {
  return Boolean(consent?.ads);
}
