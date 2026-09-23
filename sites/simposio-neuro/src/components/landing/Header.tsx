import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import logoOn from "@/assets/logo-oneducacao.png";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#coordenacao", label: "Coordenação" },
  { href: "#programacao", label: "Programa" },
  { href: "#local", label: "Local" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
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
          ? "border-b border-white/10 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <img src={logoOn} alt="On Educação" className="h-7 w-auto" />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Button
          asChild
          size="sm"
          className="shine bg-ember-gradient font-semibold text-[--ember-foreground] shadow-glow-ember hover:brightness-110"
        >
          <a href="#inscricao">Inscreva-se</a>
        </Button>
      </div>
    </header>
  );
}
