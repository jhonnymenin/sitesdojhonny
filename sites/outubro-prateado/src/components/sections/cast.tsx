import studio from "@/assets/cast-studio.jpg";
import { castEpisodes, siteConfig } from "@/lib/site-config";

export function Cast() {
  return (
    <section id="cast" className="bg-paper py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow reveal" data-reveal="">
              04 — Conteúdo
            </p>
            <h2 className="display-lg reveal mt-8 text-ink" data-reveal="">
              Outubro
              <br />
              Prateado
              <br />
              <span className="italic">Cast</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <p
              className="reveal font-serif text-[clamp(1.25rem,2vw,1.65rem)] leading-[1.35] text-graphite"
              data-reveal=""
            >
              Ciência, comportamento, histórias e conversas sobre como viver mais e melhor.
            </p>
            <p className="reveal measure mt-6 text-[1.0625rem] leading-[1.75]" data-reveal="">
              Uma temporada de videocasts conduzida pelo Prof. Wilson Jacob Filho e convidados,
              com temas como memória, movimento, afetividade, solidão, alimentação, tecnologia,
              trabalho, propósito e futuro da longevidade.
            </p>
            <a href={siteConfig.ctas.episodes} className="btn-ghost mt-8">
              Acompanhe os episódios
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>

        {/* main 16:9 block */}
        <figure className="zoomable image-mask relative mt-16 md:mt-24" data-reveal="">
          <img
            src={studio}
            alt="Estúdio de gravação com decoração clara e tons terrosos"
            width={1600}
            height={912}
            loading="lazy"
            className="aspect-16/9 w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, color-mix(in oklab, #202121 62%, transparent), transparent 58%)",
            }}
          />
          <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 p-6 md:p-10">
            <div>
              <span className="eyebrow" style={{ color: "#E9E1D6" }}>
                Outubro Prateado Cast
              </span>
              <p className="mt-2 font-serif text-[clamp(1.35rem,2.4vw,2rem)] italic text-paper">
                Episódio / Em breve
              </p>
            </div>
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full border border-[color-mix(in_oklab,#FBF9F5_65%,transparent)] text-paper transition-colors duration-500 hover:bg-[color-mix(in_oklab,#FBF9F5_16%,transparent)] md:h-20 md:w-20"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </figcaption>
        </figure>

        {/* episode rail */}
        <ul className="mt-10 grid gap-px border-t border-[color-mix(in_oklab,var(--silver)_45%,transparent)] sm:grid-cols-2 lg:grid-cols-4">
          {castEpisodes.map((ep) => (
            <li
              key={ep.number}
              className="reveal border-b border-[color-mix(in_oklab,var(--silver)_45%,transparent)] py-8"
              data-reveal=""
            >
              <p className="eyebrow">{ep.number}</p>
              <p className="mt-3 font-serif text-[1.5rem] italic text-deep-silver">
                {ep.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
