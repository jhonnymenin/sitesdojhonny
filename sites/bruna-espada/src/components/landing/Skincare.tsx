import { Cta, Eyebrow, Highlight, Reveal } from "./ui";

const protocols = [
  {
    n: "01",
    title: "Hollywood Peel",
    text: "Para quem busca renovação, melhora dos poros, luminosidade e aspecto mais uniforme da pele.",
  },
  {
    n: "02",
    title: "Radiance Skin",
    text: "Para recuperar hidratação, viço e aquela aparência de pele bem cuidada.",
  },
  {
    n: "03",
    title: "Reviva Face",
    text: "Para quem deseja melhorar firmeza, densidade e estimular a regeneração da pele de forma progressiva.",
  },
  {
    n: "04",
    title: "Peeling Coreano",
    text: "Renovação gradual para melhorar textura, luminosidade e uniformidade.",
  },
  {
    n: "05",
    title: "Limpeza de Pele Enzimática",
    text: "Uma limpeza mais completa, que associa higienização profunda, renovação e equilíbrio da pele.",
  },
];

export function Skincare() {
  return (
    <section id="pele" className="bg-offwhite py-24 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <Eyebrow>Estética facial avançada</Eyebrow>
          <h2 className="mt-6 text-[2.4rem] leading-[1.08] text-ink sm:text-[3.4rem]">
            Sua pele fala.
            <span className="mt-2 block italic text-gold">
              O tratamento começa quando sabemos interpretar.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-14">
            <p className="text-[1.0625rem] leading-[1.8] text-graphite">
              Pele opaca, manchas, textura irregular, flacidez, oleosidade ou perda de viço não
              pedem necessariamente o mesmo tratamento.
            </p>
            <p className="text-[1.0625rem] leading-[1.8] text-graphite">
              Cada protocolo é escolhido de acordo com a necessidade da pele e com o objetivo de
              cada cliente.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 border-t border-gold/20">
          {protocols.map((p, i) => (
            <Reveal key={p.title} delay={80 + i * 70}>
              <article className="group grid grid-cols-[auto_minmax(0,1fr)] items-start gap-5 border-b border-gold/20 py-8 transition-colors duration-500 hover:bg-cream/50 md:grid-cols-[5rem_18rem_minmax(0,1fr)] md:items-center md:gap-8 md:px-4">
                <span className="font-display text-base text-gold/70">{p.n}</span>
                <h3 className="text-[1.45rem] leading-tight text-ink md:text-[1.6rem]">
                  {p.title}
                </h3>
                <p className="col-span-2 text-[0.9375rem] leading-[1.75] text-graphite md:col-span-1">
                  {p.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-14">
            <Highlight>
              Cada pele tem uma necessidade.
              <br />E cada protocolo deve ter um propósito.
            </Highlight>
          </div>
          <div className="mt-12">
            <Cta>Descobrir o melhor tratamento para minha pele</Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
