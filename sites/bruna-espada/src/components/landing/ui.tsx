import { useEffect, useRef, useState, type ReactNode } from "react";

import submarca from "@/assets/submarca-bruna-dourada.png";

export const WHATSAPP_URL =
  "https://wa.me/5511942457002?text=" +
  encodeURIComponent("Olá, Bruna! Gostaria de agendar minha avaliação.");

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-visible={visible}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function GoldRule({ className = "" }: { className?: string }) {
  return <div className={`rule-gold ${className}`} aria-hidden="true" />;
}

export function Watermark({
  className = "",
  opacity = 0.05,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <img
      src={submarca}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`pointer-events-none absolute select-none ${className}`}
      style={{ opacity }}
    />
  );
}

type CtaProps = {
  children: ReactNode;
  variant?: "primary" | "outline" | "light";
  className?: string;
};

export function Cta({ children, variant = "primary", className = "" }: CtaProps) {
  const base =
    "group inline-flex min-h-14 items-center justify-center gap-3 px-8 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] transition-all duration-500 sm:min-h-12";

  const styles: Record<string, string> = {
    primary:
      "bg-ink text-champagne border border-ink hover:bg-transparent hover:text-ink",
    outline:
      "border border-gold/50 text-ink hover:border-gold hover:bg-gold/8",
    light:
      "border border-champagne/40 bg-champagne text-ink hover:bg-transparent hover:text-champagne",
  };

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles[variant]} ${className}`}
    >
      <span className="text-center leading-relaxed">{children}</span>
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-500 group-hover:translate-x-1"
      >
        &#8594;
      </span>
    </a>
  );
}

export function Highlight({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <blockquote
      className={`border-l pl-6 text-2xl leading-[1.35] italic sm:pl-8 sm:text-3xl md:text-[2.1rem] ${
        tone === "dark"
          ? "border-champagne/50 text-champagne"
          : "border-gold/45 text-ink"
      }`}
    >
      {children}
    </blockquote>
  );
}
