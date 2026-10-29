import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="max-w-3xl text-balance text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <div className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </div>
      ) : null}
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
