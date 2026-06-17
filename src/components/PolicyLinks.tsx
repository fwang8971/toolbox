import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/types";

export default function PolicyLinks({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const labels =
    locale === "zh"
      ? {
          privacy: "隐私政策",
          terms: "服务条款",
          disclaimer: "免责声明",
        }
      : {
          privacy: "Privacy Policy",
          terms: "Terms",
          disclaimer: "Disclaimer",
        };

  const linkClass = cn(
    "inline-flex h-10 items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800",
    "transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700",
  );

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <Link to="/privacy-policy" className={linkClass}>
        {labels.privacy}
      </Link>
      <Link to="/terms" className={linkClass}>
        {labels.terms}
      </Link>
      <Link to="/disclaimer" className={linkClass}>
        {labels.disclaimer}
      </Link>
    </div>
  );
}

