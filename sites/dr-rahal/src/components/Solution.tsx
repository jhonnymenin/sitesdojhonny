import { Reveal } from "./Reveal";
import { RahalMascot } from "./RahalMascot";
import nodulo from "@/assets/nodulo-ablacao.png";


const steps = [
  ["01", "Ultrassom guia", "Visualização contínua e precisão milimétrica."],
  ["02", "Agulha fina", "Acesso percutâneo, sem incisão."],
  [
    "03",
    "Radiofrequência / Microondas / Eletroporação / Alcoolização",
    "Modalidades de energias, distintas, caracterizadas por sua ALTA EFICÁCIA e por precisão milimétrica nos nódulos alvo, em mãos experientes.",
  ],
];


const benefits = [
  ["Sem cicatriz", "procedimento percutâneo guiado por ultrassom"],
  ["Preserva a tireoide", "o órgão permanece funcionando normalmente"],
  ["Sem internação", "realizado em regime ambulatorial"],
  ["Procedimento rápido", "duração média de 1 hora"],
  ["Retorno imediato", "atividades normais em 24–48h"],
  ["Alta efetividade", "redução média de até 90%, podendo os nódulos tratados inclusive desaparecer completamente (caso a caso)"],
];

export function Solution() {
  return (
    <section id="procedimento" className="overflow-hidden py-32 bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-start">
        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="label-eyebrow text-[10px]">Sobre a ablação de nódulos tireoideanos</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light text-4xl sm:text-5xl leading-[1.05]">
              Ablação térmica de <br />
              <span className="italic gradient-gold">nódulos tireoideanos</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground font-light leading-relaxed max-w-md">
              A radiofrequência e as microondas são as modalidades mais utilizadas. A escolha
              entre elas depende da localização, das dimensões e da textura de cada nódulo.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-4 text-base text-muted-foreground font-light leading-relaxed max-w-md">
              São técnicas muito menos invasivas que a cirurgia, com recuperação mais rápida e
              preservação da tireoide. O sucesso depende, acima de tudo, da seleção adequada dos
              nódulos e de uma avaliação criteriosa caso a caso.
            </p>
          </Reveal>


          <ul className="mt-12 divide-y hairline">
            {benefits.map(([title, desc], i) => (
              <Reveal key={title} delay={i * 0.05}>
                <li className="py-5 flex items-baseline gap-5">
                  <span className="font-display italic text-gold/70 text-sm shrink-0 w-6">0{i + 1}</span>
                  <div>
                    <span className="font-display text-foreground text-lg">{title}</span>
                    <span className="text-muted-foreground font-light"> — {desc}</span>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.15}>
          <div className="lg:sticky lg:top-32">
            <div className="relative bg-background overflow-hidden">
              {/* Frame corners */}
              <div className="absolute top-3 left-3 h-8 w-8 border-t border-l border-gold/60 z-10" />
              <div className="absolute bottom-3 right-3 h-8 w-8 border-b border-r border-gold/60 z-10" />

              <img
                src={nodulo}
                alt="Ilustração da tireoide com nódulo e agulha de ablação guiada por ultrassom"
                loading="lazy"
                className="w-full h-auto object-contain my-0"
              />

              <div className="px-6 pb-6 pt-6 border-t hairline">
                <div className="space-y-3">
                  {steps.map(([num, title, desc]) => (
                    <div key={num} className="flex items-baseline gap-4">
                      <span className="font-display italic text-gold text-sm shrink-0">{num}</span>
                      <div>
                        <div className="text-foreground text-sm">{title}</div>
                        <div className="text-muted-foreground text-xs font-light">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-end justify-end gap-5">
              <p className="text-sm text-muted-foreground font-light max-w-[220px] text-right leading-relaxed">
                A escolha da energia é individual — avaliada nódulo a nódulo.
              </p>
            </div>


          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="lg:col-span-2 grid items-end gap-8 border-t hairline pt-10 sm:grid-cols-[auto_minmax(0,1fr)]">
            <RahalMascot pose="present" size="lg" flip className="mx-auto sm:mx-0" />
            <p className="max-w-lg pb-8 font-display text-2xl italic text-muted-foreground sm:justify-self-end sm:text-right">
              Tecnologia explicada de forma simples, para uma decisão segura.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
