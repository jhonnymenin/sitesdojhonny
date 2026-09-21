import { Cta, Eyebrow, Reveal } from "./ui";

const slots = ["Sobrancelhas", "Lábios", "Regeneração", "Pele"];

export function Results() {
  return (
    <section className="bg-cream/45 py-24 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <Eyebrow>Antes e depois</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-[2.1rem] leading-[1.14] text-ink sm:text-[3rem]">
            Resultado natural não precisa de{" "}
            <span className="italic text-gold">explicação.</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 max-w-md space-y-1 text-[1.0625rem] leading-[1.85] text-graphite">
            <p>Ele aparece nos detalhes.</p>
            <p>Na harmonia do rosto.</p>
            <p>Na sobrancelha que parece pertencer àquela pessoa.</p>
            <p>Na pele que volta a ter viço.</p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {slots.map((label, i) => (
            <Reveal key={label} delay={120 + i * 80}>
              <figure className="flex aspect-[3/4] flex-col items-center justify-center gap-4 border border-gold/25 bg-white/50 p-6 text-center">
                <span className="font-display text-3xl text-gold/40">{String(i + 1).padStart(2, "0")}</span>
                <div className="h-px w-8 bg-gold/30" />
                <figcaption className="text-[0.625rem] uppercase tracking-[0.26em] text-gold">
                  {label}
                </figcaption>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Espaço reservado para registro real
                </p>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220}>
          <div className="mt-20 border-t border-gold/20 pt-14 text-center">
            <p className="font-display text-[2.1rem] leading-tight text-ink sm:text-[3rem]">
              &ldquo;Você fez alguma coisa?&rdquo;
            </p>
            <p className="mt-6 text-[0.6875rem] uppercase tracking-[0.28em] text-gold">E não</p>
            <p className="mt-6 font-display text-[1.7rem] italic leading-tight text-graphite sm:text-[2.2rem]">
              &ldquo;O que você fez?&rdquo;
            </p>
            <p className="mt-12 font-display text-xl italic text-ink sm:text-2xl">
              O melhor resultado é aquele que parece seu.
            </p>
            <div className="mt-10 flex justify-center">
              <Cta variant="outline">Ver resultados / Agendar avaliação</Cta>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
