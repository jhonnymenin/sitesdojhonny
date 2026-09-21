import { Cta, Eyebrow, GoldRule, Reveal } from "./ui";

const cards = [
  {
    n: "I",
    title: "Sobrancelhas",
    text: "Para trazer definição, equilíbrio e harmonia, preservando a identidade do olhar.",
  },
  {
    n: "II",
    title: "Lábios",
    text: "Para realçar contorno e tonalidade natural, deixando os lábios mais definidos e uniformes.",
  },
  {
    n: "III",
    title: "Olhos",
    text: "Para destacar o olhar com elegância e sutileza.",
  },
];

export function Micropigmentation() {
  return (
    <section id="cuidados" className="bg-cream/45 py-24 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <Eyebrow>Como posso cuidar de você?</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-[2.1rem] leading-[1.12] text-ink sm:text-5xl">
            Definição sem perder <span className="italic text-gold">naturalidade.</span>
          </h2>
          <p className="mt-4 text-[0.6875rem] uppercase tracking-[0.28em] text-gold">
            Micropigmentação
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-14">
            <p className="text-[1.0625rem] leading-[1.8] text-graphite">
              A micropigmentação pode corrigir falhas, valorizar os traços e trazer mais
              praticidade para a rotina.
            </p>
            <p className="text-[1.0625rem] leading-[1.8] text-graphite">
              Mas naturalidade não depende apenas da técnica. Depende da escolha certa de desenho,
              intensidade, formato e acabamento para cada rosto.
            </p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <GoldRule className="my-14" />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={160 + i * 90}>
              <article className="group h-full border border-gold/20 bg-white/70 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_18px_40px_-28px_rgba(17,17,17,0.28)] md:p-10">
                <span className="font-display text-lg text-gold/70">{card.n}</span>
                <h3 className="mt-6 text-[1.6rem] leading-tight text-ink">{card.title}</h3>
                <div className="mt-5 h-px w-10 bg-gold/40 transition-all duration-500 group-hover:w-16" />
                <p className="mt-5 text-[0.9375rem] leading-[1.75] text-graphite">{card.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={420}>
          <div className="mt-14">
            <Cta>Quero saber qual técnica é indicada para mim</Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
