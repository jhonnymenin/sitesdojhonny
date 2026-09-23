import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = siteConfig.nav.map((n) => n.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    // Mantém o conjunto do que está na faixa central em vez de reagir a cada
    // entrada isolada. Sem isso, duas seções cruzando a faixa ao mesmo tempo
    // deixavam o destaque no que chegasse por último, e voltar ao topo — onde
    // nenhuma seção do menu está visível — mantinha o último item sublinhado.
    const visiveis = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visiveis.add(e.target.id);
          else visiveis.delete(e.target.id);
        });
        const atual = ids.find((id) => visiveis.has(id));
        setActive(atual ? `#${atual}` : "");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "border-b border-[color-mix(in_oklab,var(--silver)_50%,transparent)] bg-[color-mix(in_oklab,var(--ivory)_82%,transparent)] backdrop-blur-[6px]"
          : "border-b border-transparent"
      }`}
    >
      <div
        className={`shell flex items-center justify-between transition-all duration-700 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <a href="#top" aria-label="Outubro Prateado — início" className="shrink-0">
          <BrandLogo className={scrolled ? "h-8 md:h-9" : "h-9 md:h-11"} />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="ui-link"
              data-active={active === item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={siteConfig.ctas.join} className="btn-arch hidden md:inline-flex">
            Quero fazer parte
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`block h-px w-6 bg-ink transition-transform duration-500 ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-ink transition-transform duration-500 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-[color-mix(in_oklab,var(--silver)_40%,transparent)] bg-[color-mix(in_oklab,var(--ivory)_96%,transparent)] backdrop-blur-[8px] transition-[max-height] duration-700 lg:hidden ${
          open ? "max-h-[420px]" : "max-h-0 border-transparent"
        }`}
      >
        <nav aria-label="Navegação" className="shell flex flex-col py-4">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display-md border-b border-[color-mix(in_oklab,var(--silver)_28%,transparent)] py-3 text-[1.5rem] last:border-0"
            >
              {item.label}
            </a>
          ))}
          <a
            href={siteConfig.ctas.join}
            onClick={() => setOpen(false)}
            className="btn-arch mt-5 self-start"
          >
            Quero fazer parte
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
