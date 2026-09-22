import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Os destinos de compra vivem em src/lib/checkout.ts. Cada CTA monta o seu com
// checkoutUrl(produto, posição), para que o cupom e o utm_content saiam certos.

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("px-5 py-12 md:px-10 md:py-20", className)}>
      <div className="mx-auto w-full max-w-[1280px]">{children}</div>
    </section>
  );
}

export function Reveal({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: ReactNode;
  as?: "div" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Component = Tag as "div";
  return (
    <Component ref={ref} data-visible={visible} className={cn("reveal", className)}>
      {children}
    </Component>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-2 rounded-sm bg-cyan/15 px-3 py-1.5 text-cyan",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Nome do curso — receberia Barmeno; asset ainda não disponível no projeto. */
export function CourseName({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("font-course", className)}>{children}</span>;
}

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display text-[28px] leading-[1.18] font-bold tracking-[-0.01em] text-heading md:text-[40px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function CtaButton({
  children,
  href,
  variant = "primary",
  className,
}: {
  children: ReactNode;
  /** Obrigatório: use checkoutUrl(produto, posição) ou uma âncora interna. */
  href: string;
  variant?: "primary" | "outline";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-sans text-base font-bold tracking-[0.01em] transition-all duration-150 hover:scale-[1.02]",
        variant === "primary"
          ? "bg-cyan text-cyan-foreground hover:glow-cyan"
          : "border border-cyan/60 text-cyan hover:bg-cyan/10",
        className,
      )}
    >
      {children}
    </a>
  );
}
