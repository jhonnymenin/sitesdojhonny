import type { ReactNode } from "react";
import { AppHeader } from "./AppHeader";

export function AppPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <>
      <AppHeader title={title} subtitle={subtitle} />
      <div className="px-4 py-5">{children}</div>
    </>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-teal">{children}</h2>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="app-card flex flex-col items-center gap-1 px-6 py-10 text-center">
      <p className="font-display text-sm font-semibold text-navy">{title}</p>
      {description && <p className="text-xs leading-relaxed text-navy/55">{description}</p>}
    </div>
  );
}
