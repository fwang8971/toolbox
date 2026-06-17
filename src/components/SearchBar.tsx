import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchBar({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  ariaLabel?: string;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
      <input
        type="search"
        aria-label={ariaLabel ?? placeholder ?? "Search tools"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search tools…"}
        className={cn(
          "h-11 w-full rounded-2xl border border-zinc-200 bg-white pl-9 pr-3 text-sm text-zinc-950",
          "outline-none transition focus:border-zinc-400",
          "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600",
        )}
      />
    </div>
  );
}
