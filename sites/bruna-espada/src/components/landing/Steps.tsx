import { Eyebrow, Reveal } from "./ui";

const steps = [
  {
    n: "01",
    title: "Conversa",
    text: "Tudo começa entendendo sua principal queixa e aquilo que você espera do tratamento.",
  },
  {
    n: "02",
    title: "Avaliação",
    text: "Analisamos pele, fios, anatomia, histórico e características individuais.",
  },
  {
    n: "03",
    title: "Planejamento",
    text: "Definimos a técnica ou protocolo mais adequado para o seu caso.",
  },
  {
    n: "04",
    title: "Procedimento",
    text: "O tratamento é realizado respeitando segurança, naturalidade e individualidade.",
  },
  {
    n: "05",
    title: "Acompanhamento",
    text: "Quando necessário, acompanhamos a evolução e ajustamos o plano ao longo do processo.",
  },
];

export function Steps() {
  return (
    <section id="processo" className="bg-offwhite py-24 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <Eyebrow>Como funciona</Eyebrow>
          <h2 className="mt-6 text-[2.1rem] leading-[1.12] text-ink sm:text-[3rem]">
            Seu atendimento em <span className="italic text-gold">5 etapas</span>
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-px bg-gold/20 md:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={80 + i * 80} className="bg-offwhite">
              <li className="flex h-full flex-col gap-5 bg-offwhite p-8 md:p-7">
                <span className="font-display text-3xl text-gold/70">{s.n}</span>
                <h3 className="text-[1.35rem] leading-tight text-ink">{s.title}</h3>
                <p className="text-[0.9375rem] leading-[1.75] text-graphite">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
