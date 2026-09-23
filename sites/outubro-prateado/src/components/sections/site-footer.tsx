import { BrandLogo } from "@/components/brand-logo";
import { siteConfig } from "@/lib/site-config";

const footerLinks = [
  { label: "O movimento", href: "#movimento" },
  { label: "Os pilares", href: "#pilares" },
  { label: "Prateado Cast", href: "#cast" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Participe", href: "#participe" },
  { label: "Institucional", href: "#institucional" },
];

export function SiteFooter() {
  return (
    <footer className="bg-graphite py-16 text-paper md:py-20">
      <div className="shell grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <BrandLogo className="h-12" onDark />
          <p className="eyebrow mt-8" style={{ color: "#B7B8BA" }}>
            Outubro Prateado {siteConfig.year}
          </p>
          <p className="mt-3 font-serif text-[1.5rem] italic">Envelhecer é continuar.</p>
        </div>
        <nav aria-label="Rodapé" className="md:col-span-4 md:col-start-9">
          <ul className="grid gap-3 sm:grid-cols-2">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[0.8125rem] tracking-[0.08em] text-silver transition-colors duration-500 hover:text-paper"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        className="shell mt-14 border-t pt-6"
        style={{ borderColor: "color-mix(in oklab, #B7B8BA 30%, transparent)" }}
      >
        <p className="eyebrow" style={{ color: "#85878A" }}>
          © {siteConfig.year} Outubro Prateado
        </p>
      </div>
    </footer>
  );
}
