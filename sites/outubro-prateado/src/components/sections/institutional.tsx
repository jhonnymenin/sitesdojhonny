import { siteConfig } from "@/lib/site-config";

export function Institutional() {
  return (
    <section id="institucional" className="bg-ivory py-24 md:py-36">
      <div className="shell grid gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="eyebrow reveal" data-reveal="">
            07 — Institucional
          </p>
          <h2 className="display-lg reveal mt-8 max-w-[16ch] text-ink" data-reveal="">
            Longevidade é uma agenda <span className="italic">de todos.</span>
          </h2>
        </div>
        <div className="md:col-span-5 md:col-start-8 md:self-end">
          <p className="reveal measure text-[1.0625rem] leading-[1.75]" data-reveal="">
            Empresas e instituições podem apoiar o movimento e ocupar, com responsabilidade,
            territórios relevantes da longevidade.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={siteConfig.ctas.project} className="btn-arch">
              Conheça o projeto
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a href={siteConfig.ctas.team} className="btn-ghost">
              Fale com a equipe
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* clean space reserved for future supporters */}
      <div className="shell mt-20 md:mt-28">
        <p className="eyebrow">Apoiadores</p>
        <div className="mt-6 grid gap-px border-t border-[color-mix(in_oklab,var(--silver)_45%,transparent)] sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex h-28 items-center border-b border-[color-mix(in_oklab,var(--silver)_45%,transparent)]"
            >
              <span className="eyebrow text-silver">Espaço reservado</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
