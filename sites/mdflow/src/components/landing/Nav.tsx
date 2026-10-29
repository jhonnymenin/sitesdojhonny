import { useEffect, useState } from "react";
import logoDark from "@/assets/mdflow-logo-dark.webp";
import { cn } from "@/lib/utils";

const links = [
  { href: "#problema", label: "O problema" },
  { href: "#jornada", label: "Jornada" },
  { href: "#plataforma", label: "Plataforma" },
  { href: "#mercado", label: "Mercado" },
  { href: "#modelo", label: "Modelo" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-background/40 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoDark} alt="MDFlow" className="h-8 w-auto object-contain dark:hidden" />
          <img
            src={logoDark}
            alt=""
            aria-hidden
            className="hidden h-8 w-auto object-contain brightness-0 invert dark:block"
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-brand px-4 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Quero conhecer a MDFlow
        </a>
      </div>
    </header>
  );
}
