import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CtaButton } from "./primitives";
import logoAzul from "@/assets/logo-curso-azul.png";
import logoBranco from "@/assets/logo-curso-branco.png";
import mocAzul from "@/assets/moc-azul.png";
import mocBranco from "@/assets/moc-branco.png";
import { checkoutUrl } from "@/lib/checkout";

const NAV = [
  { href: "#coordenadores", label: "Coordenação" },
  { href: "#sobre", label: "Curso Intensivo" },
  { href: "#programacao", label: "Ao vivo" },
  { href: "#banco-questoes", label: "Banco de Questões" },
  { href: "#oncoia", label: "Onco IA" },
  { href: "#inscricao", label: "Investimento" },
  { href: "#faq", label: "FAQ" },
];

/** Logotipo do X Curso Intensivo de Oncologia (usado fora do header). */
export function Logo({
  className,
  variant = "azul",
}: {
  className?: string;
  variant?: "azul" | "branco";
}) {
  return (
    <img
      src={variant === "branco" ? logoBranco : logoAzul}
      alt="X Curso Intensivo de Oncologia"
      width={1920}
      height={520}
      className={cn("h-11 w-auto object-contain md:h-12", className)}
    />
  );
}

/** Marca institucional MOC. */
export function MocMark({
  className,
  variant = "azul",
}: {
  className?: string;
  variant?: "azul" | "branco";
}) {
  return (
    <img
      src={variant === "branco" ? mocBranco : mocAzul}
      alt="MOC — Manual de Oncologia Clínica do Brasil"
      width={240}
      height={60}
      className={cn("h-7 w-auto object-contain", className)}
    />
  );
}


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
      className={cn(
        "fixed inset-x-0 top-12 z-40 border-b bg-background transition-shadow duration-300",
        scrolled ? "border-border shadow-[0_10px_30px_-24px_rgb(20_69_144/0.6)]" : "border-border",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="#top" className="flex min-w-0 items-center">
          <MocMark className="h-10 md:h-11" />
        </a>

        <nav className="hidden items-center gap-4 xl:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="label-mono whitespace-nowrap text-[11px] text-muted-foreground transition-colors hover:text-cyan"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CtaButton
            href={checkoutUrl("combo", "header")}
            className="hidden whitespace-nowrap px-4 py-2.5 text-sm sm:inline-flex"
          >
            Realizar inscrição
          </CtaButton>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-sm border border-border p-2 text-foreground xl:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-5 py-4 xl:hidden">
          <ul className="flex flex-col gap-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="label-mono text-muted-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <CtaButton href={checkoutUrl("combo", "header-mobile")} className="mt-5 w-full">
            Realizar inscrição
          </CtaButton>
        </div>
      ) : null}
    </header>
  );
}
