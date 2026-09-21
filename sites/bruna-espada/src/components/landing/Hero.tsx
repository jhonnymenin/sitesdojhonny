import janela from "@/assets/bruna-janela.png";
import { Cta, GoldRule, Reveal, Watermark } from "./ui";

const specialties = ["Micropigmentação", "Regeneração", "Despigmentação", "Estética Avançada"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-offwhite pt-28 md:pt-36">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[70vh] bg-gradient-to-b from-cream/70 to-transparent"
      />
      <Watermark className="-left-32 bottom-4 hidden w-[360px] lg:block" opacity={0.04} />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-6 pb-20 md:px-10 md:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="max-w-xl">
          <Reveal>
            <p className="eyebrow">Ateliê Bruna Espada</p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-[2.6rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[4.6rem]">
              Não vendo
              <br />
              procedimentos.
              <span className="mt-3 block italic text-gold">Devolvo identidade.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-9 max-w-md space-y-5 text-[1.0625rem] leading-[1.75] text-graphite">
              <p>
                Beleza não é se transformar em outra pessoa. É olhar no espelho e reconhecer seus
                traços com mais equilíbrio, naturalidade e segurança.
              </p>
              <p>
                No Ateliê Bruna Espada, cada atendimento começa com uma avaliação individual para
                entender o que realmente faz sentido para você.
              </p>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10">
              <Cta>Agendar minha avaliação</Cta>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-12">
              <GoldRule />
              <p className="mt-5 text-[0.625rem] leading-[2] uppercase tracking-[0.24em] text-gold">
                {specialties.join(" · ")}
              </p>
              <p className="mt-5 text-xs tracking-[0.12em] text-muted-foreground">
                Atendimento em São Caetano do Sul – SP.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative">
          <div className="relative mx-auto max-w-[520px] lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 h-full w-full border border-gold/30 md:-left-6 md:-top-6"
            />
            <img
              src={janela}
              alt="Bruna Espada junto à janela, com camisa branca, segurando uma xícara"
              width={1236}
              height={1318}
              className="relative h-[62vh] min-h-[380px] w-full object-cover object-top md:h-[76vh]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
