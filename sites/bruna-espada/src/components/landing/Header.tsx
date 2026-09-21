import { useEffect, useState } from "react";

import logoGold from "@/assets/logo-bruna-dourada.png";
import { WHATSAPP_URL } from "./ui";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#cuidados", label: "Micropigmentação" },
  { href: "#pele", label: "Estética" },
  { href: "#processo", label: "Processo" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/15 bg-offwhite/90 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 md:px-10 lg:grid-cols-[1fr_auto_1fr]">
        <a href="#top" className="flex min-w-0 items-center" aria-label="Ateliê Bruna Espada">
          <img
            src={logoGold}
            alt="Ateliê Bruna Espada"
            className="h-11 w-auto object-contain md:h-14"
          />
        </a>

        <nav className="hidden justify-center gap-9 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-[0.6875rem] uppercase tracking-[0.2em] text-graphite/80 transition-colors duration-300 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 border border-gold/45 px-6 py-3 text-[0.625rem] uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:border-gold hover:bg-gold/10 sm:inline-block"
          >
            Agendar avaliação
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span className={`block h-px w-6 bg-ink transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-gold/15 bg-offwhite/95 backdrop-blur-md transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-gold/10 py-4 text-[0.75rem] uppercase tracking-[0.2em] text-graphite last:border-0"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
