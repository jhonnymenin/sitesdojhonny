import portrait from "@/assets/pillar-autonomy.jpg";

export function Movement() {
  return (
    <section id="movimento" className="bg-ivory py-24 md:py-36">
      <div className="shell grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <p className="eyebrow reveal" data-reveal="">
            01 — O movimento
          </p>
          <h2 className="display-lg reveal mt-8 text-ink" data-reveal="">
            Mais vida
            <br />
            <span className="italic">nos anos.</span>
          </h2>
          <div className="hairline mt-12 max-w-[380px]" />
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
            {["2026", "Brasil", "Movimento pela longevidade"].map((item) => (
              <dd key={item} className="eyebrow">
                {item}
              </dd>
            ))}
          </dl>
        </div>

        <div className="md:col-span-5 md:pt-4">
          <div className="reveal measure space-y-6 text-[1.0625rem] leading-[1.75]" data-reveal="">
            <p>
              Viver mais é uma conquista. Mas longevidade não é apenas acrescentar anos à
              vida. É continuar fazendo escolhas, aprendendo, convivendo, amando, trabalhando
              quando quiser, criando projetos e sendo protagonista da própria história.
            </p>
            <p className="text-deep-silver">
              O Outubro Prateado nasce para mudar a forma como o Brasil enxerga e se prepara
              para o envelhecimento.
            </p>
          </div>
          <figure className="zoomable image-mask mt-12 md:mt-16" data-reveal="">
            <img
              src={portrait}
              alt="Mulher com mais de 60 anos em uma aula de dança, em movimento"
              width={1200}
              height={1504}
              loading="lazy"
              className="aspect-4/3 w-full object-cover"
            />
            <figcaption className="eyebrow mt-4">
              Continuar trabalhando, criando e decidindo
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
