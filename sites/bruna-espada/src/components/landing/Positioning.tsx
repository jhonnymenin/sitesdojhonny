import { Eyebrow, GoldRule, Highlight, Reveal } from "./ui";

export function Positioning() {
  return (
    <section className="relative bg-cream/45 py-24 md:py-36">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <Reveal>
          <Eyebrow>Posicionamento</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-[2.1rem] leading-[1.12] text-ink sm:text-5xl">
            Sua beleza não precisa de excessos.
            <span className="mt-2 block italic text-gold">Precisa de precisão.</span>
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <GoldRule className="my-12" />
        </Reveal>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal delay={120}>
            <p className="text-[1.0625rem] leading-[1.8] text-graphite">
              Não existe um procedimento ideal para todo mundo. Existe aquilo que respeita sua
              anatomia, sua pele, seus traços e aquilo que você deseja preservar.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-[1.0625rem] leading-[1.8] text-graphite">
              Por isso, aqui você não encontra resultados padronizados. Encontra escuta,
              conhecimento, técnica e um olhar individual para construir resultados naturais e
              coerentes com quem você é.
            </p>
          </Reveal>
        </div>

        <Reveal delay={260}>
          <div className="mt-16 md:mt-20">
            <Highlight>
              O objetivo não é mudar o seu rosto.
              <br />É valorizar aquilo que já faz parte de você.
            </Highlight>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
