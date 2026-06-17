import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    >
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </section>
  );
}

export function FaqList({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.question}
          className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800"
        >
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {item.question}
          </h3>
          <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ComparisonTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: Array<Array<string | ReactNode>>;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-zinc-50 text-xs text-zinc-600 dark:bg-zinc-900/40 dark:text-zinc-300">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-3 py-2 font-medium">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-t border-zinc-200 dark:border-zinc-800"
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-3 py-2 text-zinc-700 dark:text-zinc-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
