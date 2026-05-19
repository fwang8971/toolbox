import type { ReactNode } from "react";
import TopNav from "@/components/TopNav";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="pb-16 pt-10">{children}</main>
    </div>
  );
}

