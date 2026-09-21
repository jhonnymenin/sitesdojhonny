import { Cta, Eyebrow, GoldRule, Highlight, Reveal } from "./ui";

export function Depigmentation() {
  return (
    <section className="bg-cream/45 py-24 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Despigmentação a laser</Eyebrow>
            <h2 className="mt-6 text-[2rem] leading-[1.16] text-ink sm:text-[2.6rem]">
              Às vezes, para construir algo novo, é preciso primeiro remover o que{" "}
              <span className="italic text-gold">já não representa você.</span>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-6 text-[1.0625rem] leading-[1.8] text-graphite lg:pt-4">
              <p>
                Micropigmentações antigas podem mudar de cor, perder definição ou deixar de combinar
                com o rosto ao longo do tempo.
              </p>
              <p>
                A despigmentação a laser permite remover progressivamente pigmentos indesejados,
                respeitando as características da pele, do pigmento e a resposta de cada organismo.
              </p>
              <p>Também realizamos avaliação para remoção de tatuagens.</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <GoldRule className="my-14" />
        </Reveal>

        <Reveal delay={220}>
          <Highlight>
            Cada caso exige estratégia.
            <br />
            Nem sempre corrigir significa cobrir.
          </Highlight>
          <div className="mt-12">
            <Cta variant="outline">Quero avaliar minha micropigmentação</Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
