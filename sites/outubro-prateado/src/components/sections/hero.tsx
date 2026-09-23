import heroImage from "@/assets/hero-couple.jpg";
import { SilverRibbon } from "@/components/silver-ribbon";
import { siteConfig } from "@/lib/site-config";

const signature = ["Longevidade", "Autonomia", "Conexão", "Protagonismo", "Respeito"];

export function Hero() {
  return (
    <section id="top" className="relative min-h-[92svh] overflow-hidden bg-ivory pt-28 md:pt-32">
      {/* warm light field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 78% 12%, color-mix(in oklab, var(--champagne) 30%, transparent) 0%, transparent 62%), radial-gradient(90% 70% at 8% 90%, color-mix(in oklab, var(--sand) 70%, transparent) 0%, transparent 60%)",
        }}
      />

      <div className="shell relative z-10 grid items-center gap-10 pb-16 md:grid-cols-12 md:gap-8 md:pb-20">
        <div className="md:col-span-6 md:pb-10 lg:col-span-5">
          <p className="eyebrow" data-reveal="" >
            Outubro Prateado {siteConfig.year}
          </p>
          <h1 className="display-xl mt-6 text-ink">
            <span className="block reveal" data-reveal="">
              Envelhecer
            </span>
            <span
              className="block reveal-slow italic text-graphite"
              data-reveal=""
              style={{ transitionDelay: "0.14s" }}
            >
              é continuar.
            </span>
          </h1>

          <div className="hairline mt-10 max-w-[220px]" />

          <p className="lede reveal mt-8" data-reveal="">
            Um movimento pela longevidade com saúde, autonomia, conexão, protagonismo e
            respeito.
          </p>
          <p
            className="reveal mt-5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-deep-silver"
            data-reveal=""
          >
            Com Prof. Dr. Wilson Jacob Filho como Embaixador Científico.
          </p>

          <div className="reveal mt-10" data-reveal="">
            <a href={siteConfig.ctas.follow} className="btn-arch">
              Quero acompanhar o movimento
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>

        {/* photography */}
        <div className="md:col-span-6 md:col-start-7 lg:col-span-7 lg:col-start-6">
          <figure className="zoomable image-mask relative" data-reveal="">
            <img
              src={heroImage}
              alt="Casal de idosos abraçado ao ar livre, sorrindo"
              width={1800}
              height={1200}
              className="aspect-4/5 w-full object-cover md:aspect-4/3"
              fetchPriority="high"
            />
          </figure>
        </div>
      </div>

      {/* ribbon crossing the composition */}
      <SilverRibbon
        className="pointer-events-none absolute bottom-[16%] left-0 h-[120px] w-[130%] md:h-[190px]"
        intensity={0.9}
      />

      <div className="shell relative flex flex-wrap items-center justify-between gap-6 border-t border-[color-mix(in_oklab,var(--silver)_45%,transparent)] py-5">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {signature.map((word, i) => (
            <li key={word} className="eyebrow flex items-center gap-5">
              {i > 0 && (
                <span aria-hidden="true" className="text-silver">
                  •
                </span>
              )}
              {word}
            </li>
          ))}
        </ul>
        <a href="#pausa" className="eyebrow flex items-center gap-3 hover:text-ink">
          Continue <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
