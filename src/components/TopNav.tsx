import { Link, NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

export default function TopNav() {
  const { isDark, toggleTheme } = useTheme();
  const { locale, toggleLocale, t } = useLocale();
  const labels =
    locale === "zh"
      ? { home: "首页", guides: "专题", policies: "政策" }
      : { home: "Home", guides: "Guides", policies: "Policies" };

  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-900 dark:bg-zinc-950/60">
      <div className="container-page flex h-14 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-xl border border-zinc-200 bg-white text-sm font-semibold tracking-tight dark:border-zinc-800 dark:bg-zinc-950">
            QT
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">Quick Tools</div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {t("nav.tagline")}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition",
                isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900",
              )
            }
          >
            {labels.home}
          </NavLink>
          <NavLink
            to="/tools"
            className={({ isActive }) =>
              cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition",
                isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900",
              )
            }
          >
            {t("nav.tools")}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition",
                isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900",
              )
            }
          >
            {t("nav.about")}
          </NavLink>
          <NavLink
            to="/guides"
            className={({ isActive }) =>
              cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition",
                isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900",
              )
            }
          >
            {labels.guides}
          </NavLink>
          <NavLink
            to="/privacy-policy"
            className={({ isActive }) =>
              cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition",
                isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900",
              )
            }
          >
            {labels.policies}
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLocale}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-zinc-200 bg-white px-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
            aria-label="Toggle language"
          >
            {locale === "en" ? "EN" : "中文"}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex size-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </div>

      <div className="border-t border-zinc-200 md:hidden dark:border-zinc-900">
        <div className="container-page flex items-center gap-2 overflow-x-auto py-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition",
                isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900",
              )
            }
          >
            {labels.home}
          </NavLink>
          <NavLink
            to="/tools"
            className={({ isActive }) =>
              cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition",
                isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900",
              )
            }
          >
            {t("nav.tools")}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition",
                isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900",
              )
            }
          >
            {t("nav.about")}
          </NavLink>
          <NavLink
            to="/guides"
            className={({ isActive }) =>
              cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition",
                isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900",
              )
            }
          >
            {labels.guides}
          </NavLink>
          <NavLink
            to="/privacy-policy"
            className={({ isActive }) =>
              cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition",
                isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900",
              )
            }
          >
            {labels.policies}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
