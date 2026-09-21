import retrato from "@/assets/bruna-retrato.png";
import { Cta, Eyebrow, Highlight, Reveal, Watermark } from "./ui";

const observations = ["Sua pele.", "Seus fios.", "Sua anatomia.", "Seu estilo.", "Sua rotina."];

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-offwhite py-24 md:py-36">
      <Watermark className="-right-32 top-24 w-[460px]" opacity={0.045} />

      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-6 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 h-full w-full border border-gold/30 md:-bottom-6 md:-right-6"
            />
            <img
              src={retrato}
              alt="Retrato de Bruna Espada, de blazer preto, sentada em uma poltrona"
              width={1024}
              height={1536}
              loading="lazy"
              className="relative h-[68vh] min-h-[420px] w-full object-cover object-top"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2 lg:pt-6">
          <Reveal>
            <Eyebrow>Sobre Bruna Espada</Eyebrow>
            <h2 className="mt-6 text-[2.1rem] leading-[1.12] text-ink sm:text-5xl">
              Mais de 10 anos dedicados à <span className="italic text-gold">beleza natural.</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-9 max-w-xl space-y-6 text-[1.0625rem] leading-[1.8] text-graphite">
              <p>
                Sou Bruna Espada, especialista em micropigmentação, regeneração de sobrancelhas,
                despigmentação a laser e estética avançada.
              </p>
              <p>
                Ao longo da minha trajetória, entendi que um bom resultado não começa na escolha de
                uma técnica.
              </p>
              <p className="font-display text-2xl italic text-ink">
                Começa na capacidade de observar.
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <ul className="mt-8 max-w-sm">
              {observations.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 border-b border-gold/15 py-3 text-[0.9375rem] text-graphite last:border-0"
                >
                  <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 max-w-xl space-y-6 text-[1.0625rem] leading-[1.8] text-graphite">
              <p>
                E principalmente, aquilo que você espera encontrar quando se olhar no espelho.
              </p>
              <p>
                É a partir dessa análise que desenvolvo protocolos personalizados, sempre buscando
                equilíbrio entre ciência, técnica e naturalidade.
              </p>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-12">
              <Highlight>Porque resultado bonito é resultado que combina com você.</Highlight>
            </div>
            <div className="mt-10">
              <Cta variant="outline">Quero conversar com a Bruna</Cta>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
