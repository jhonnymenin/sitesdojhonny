import { useState } from "react";

import { Eyebrow, Reveal } from "./ui";

export const faqItems = [
  {
    q: "Toda sobrancelha precisa de micropigmentação?",
    a: "Não. Dependendo da quantidade e condição dos fios, outras abordagens podem ser mais indicadas, como design, regeneração ou acompanhamento específico.",
  },
  {
    q: "Preciso remover uma micropigmentação antiga antes de fazer outra?",
    a: "Nem sempre. É necessário avaliar cor, profundidade, formato e quantidade de pigmento existente para decidir entre correção, neutralização ou despigmentação.",
  },
  {
    q: "Como é escolhida a técnica de micropigmentação?",
    a: "A escolha considera estrutura facial, características da pele, quantidade de fios, estilo da cliente e resultado desejado.",
  },
  {
    q: "Micropigmentação pode ficar natural?",
    a: "Sim. Naturalidade está diretamente ligada ao planejamento, à escolha da técnica e ao respeito às proporções de cada rosto.",
  },
  {
    q: "Quantas sessões de estética facial são necessárias?",
    a: "Depende da condição da pele, do objetivo e do protocolo indicado. Alguns procedimentos apresentam melhora já nas primeiras sessões; outros possuem resultados progressivos.",
  },
  {
    q: "Como saber qual procedimento é melhor para mim?",
    a: "A avaliação é justamente o momento de entender suas necessidades e definir o tratamento mais indicado para o seu caso.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="duvidas" className="bg-offwhite py-24 md:py-36">
      <div className="mx-auto max-w-[900px] px-6 md:px-10">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-6 text-[2.1rem] leading-[1.12] text-ink sm:text-[3rem]">
            Dúvidas <span className="italic text-gold">frequentes</span>
          </h2>
        </Reveal>

        <div className="mt-12 border-t border-gold/20">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={60 + i * 50}>
                <div className="border-b border-gold/20">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-5 py-6 text-left"
                  >
                    <span
                      className={`font-display text-[1.2rem] leading-snug transition-colors duration-300 sm:text-[1.4rem] ${
                        isOpen ? "text-gold" : "text-ink"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`relative h-4 w-4 shrink-0 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
                    >
                      <span className="absolute left-0 top-1/2 h-px w-4 bg-gold" />
                      <span className="absolute left-1/2 top-0 h-4 w-px bg-gold" />
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="min-h-0 pb-7 pr-8 text-[1rem] leading-[1.8] text-graphite">
                      {item.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
