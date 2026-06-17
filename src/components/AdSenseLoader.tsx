import { useEffect } from "react";
import {
  COOKIE_CONSENT_CHANGE_EVENT,
  hasAdsConsent,
  readCookieConsent,
} from "@/lib/consent";

const ADSENSE_CLIENT = "ca-pub-4696764143581176";
const ADSENSE_SCRIPT_ID = "adsense-script";

function ensureAdSenseScript() {
  if (typeof document === "undefined") {
    return;
  }

  if (document.getElementById(ADSENSE_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement("script");
  script.id = ADSENSE_SCRIPT_ID;
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
}

export default function AdSenseLoader() {
  useEffect(() => {
    if (hasAdsConsent()) {
      ensureAdSenseScript();
    }

    const handleConsentChange = () => {
      if (hasAdsConsent(readCookieConsent())) {
        ensureAdSenseScript();
      }
    };

    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, handleConsentChange);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, handleConsentChange);
    };
  }, []);

  return null;
}
