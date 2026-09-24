import { ArrowDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { RahalMascot } from "./RahalMascot";


const items = [
  ["01", "Nódulo na tireoide", "Crescimento detectado em ultrassom de rotina."],
  ["02", "Desconforto cervical", "Sensação persistente de pressão ou corpo estranho."],
  ["03", "Dificuldade para engolir", "Sintoma frequente em nódulos de maior volume."],
  ["04", "Alterações hormonais", "Hipertireoidismo, hipotireoidismo, oscilações de TSH."],
  ["05", "Indicação cirúrgica", "Existem alternativas menos invasivas. Reavalie."],
  ["06", "Preocupação estética", "Nódulos visíveis ou deformidade no pescoço."],
];

export function Problem() {
  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">

        <div className="max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="label-eyebrow text-[10px]">Diagnóstico</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light text-4xl sm:text-6xl leading-[1.05] tracking-tight">
              Você recebeu diagnóstico <br />
              de <span className="italic gradient-gold">nódulo na tireoide</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-lg text-muted-foreground font-light max-w-xl leading-relaxed">
              Esses sinais indicam a necessidade de avaliação especializada. Em muitos casos,
              existe uma alternativa elegante e definitiva ao bisturi.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([num, title, desc], i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="relative p-8 border-r border-b hairline group hover:bg-surface/30 transition-colors duration-500 h-full">
                <div className="font-display text-gold/40 text-2xl">{num}</div>
                <h3 className="mt-4 font-display text-2xl text-foreground">{title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-light">{desc}</p>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-20 pt-16 border-t hairline">
            <div className="text-center lg:text-left">
              <p className="font-display italic text-3xl sm:text-4xl text-foreground/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                "Sua tireoide pode ser preservada."
              </p>
              <a
                href="#procedimento"
                className="group inline-flex items-center gap-2 mt-10 text-gold font-light tracking-wide border-b border-gold/40 pb-1 hover:border-gold"
              >
                Sobre a ablação de nódulos <ArrowDown size={14} className="transition-transform group-hover:translate-y-1" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-16 grid items-end gap-8 border-t hairline pt-10 sm:grid-cols-[minmax(0,1fr)_auto]">
            <p className="max-w-md pb-6 font-display text-2xl italic text-muted-foreground">
              Informação clara também faz parte de um diagnóstico cuidadoso.
            </p>
            <RahalMascot pose="point" size="lg" className="mx-auto sm:mx-0" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
