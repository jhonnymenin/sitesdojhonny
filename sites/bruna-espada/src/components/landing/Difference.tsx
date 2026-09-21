import { Reveal } from "./ui";

const criteria = [
  "anatomia facial",
  "características da pele",
  "estrutura dos fios",
  "histórico de procedimentos",
  "expectativas",
  "rotina",
  "possibilidades reais de resultado",
];

export function Difference() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-champagne md:py-40">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />

      <div className="relative mx-auto max-w-[1100px] px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-gold-light">Diferencial</p>
          <h2 className="mt-6 text-[2.2rem] leading-[1.1] text-white sm:text-[3.2rem]">
            Aqui, o procedimento não começa na maca.
            <span className="mt-2 block italic text-champagne">Começa na conversa.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-20">
          <Reveal delay={100}>
            <p className="text-[1.0625rem] leading-[1.85] text-champagne/85">
              Antes de qualquer indicação, eu quero entender o que incomoda você, o que deseja
              melhorar e principalmente o que não quer perder.
            </p>
            <p className="mt-8 text-[0.6875rem] uppercase tracking-[0.28em] text-gold-light">
              A partir disso, avalio
            </p>
          </Reveal>

          <Reveal delay={160}>
            <ul>
              {criteria.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-4 border-b border-champagne/15 py-4 text-[0.9375rem] leading-relaxed text-champagne/90 last:border-0"
                >
                  <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-gold-light" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div className="mt-16 border-l border-champagne/40 pl-6 sm:pl-8">
            <p className="font-display text-2xl italic leading-[1.35] text-champagne sm:text-3xl">
              Só então definimos o melhor caminho. Porque fazer mais não significa necessariamente
              fazer melhor.
            </p>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <p className="mt-20 text-center font-display text-[1.9rem] leading-tight text-white sm:text-[2.8rem]">
            Precisão também é saber <span className="italic text-gold-light">quando não fazer.</span>
          </p>
        </Reveal>
      </div>
      
    </section>
  );
}
