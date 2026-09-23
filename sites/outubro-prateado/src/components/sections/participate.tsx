import { SilverRibbon } from "@/components/silver-ribbon";
import { siteConfig } from "@/lib/site-config";

export function Participate() {
  return (
    <section id="participe" className="relative overflow-hidden bg-paper py-28 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 20% 10%, color-mix(in oklab, var(--champagne) 26%, transparent), transparent 60%)",
        }}
      />
      <SilverRibbon
        className="pointer-events-none absolute bottom-[8%] left-[-8%] h-[130px] w-[120%]"
        intensity={0.4}
      />
      <div className="shell relative grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="eyebrow reveal" data-reveal="">
            06 — Participe
          </p>
          <h2 className="display-lg reveal mt-8 max-w-[18ch] text-ink" data-reveal="">
            Essa conversa <span className="italic">precisa continuar.</span>
          </h2>
        </div>
        <div className="md:col-span-5 md:self-end">
          <p className="reveal measure text-[1.0625rem] leading-[1.75]" data-reveal="">
            Siga o Outubro Prateado, compartilhe os conteúdos e ajude a ampliar uma conversa
            necessária sobre longevidade no Brasil.
          </p>
          <a href={siteConfig.ctas.join} className="btn-arch mt-8">
            Quero fazer parte
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
          {siteConfig.social.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-6">
              {siteConfig.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="ui-link">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
