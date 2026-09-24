import { Star, Globe2, Zap, Heart, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { motion } from "framer-motion";
import { RahalMascot } from "./RahalMascot";

const items = [
  { icon: Star, title: "Pioneiro no Brasil", desc: "Os primeiros procedimentos de ablação de tireoide do Brasil, de toda a América Latina e do continente Americano foram realizados pelo Dr. Antonio Rahal e sua equipe. Desde as ablações por Laser já no final de 2010, quando era praticamente inimaginável tratar nódulos na tireoide sem cirurgia, passando pelas ablações por radiofrequência (primeira R.F.A. no país, em São Paulo, no Centro de Medicina Intervencionista do Hospital Albert Einstein), bem como as mais recentes ablações por Microondas (M.W.A.), com excelentes resultados nos casos bem selecionados." },
  { icon: Globe2, title: "Reconhecimento Global", desc: "Treina médicos em outros países, participa de congressos internacionais e colabora em pesquisas científicas sobre tireoide." },
  { icon: Zap, title: "Tecnologia de Ponta", desc: "Equipamentos de ultrassom e radiofrequência de última geração, com protocolo de segurança rigoroso em cada procedimento." },
  { icon: Heart, title: "Atendimento Humanizado", desc: "Cada paciente recebe atenção individualizada. O Dr. Rahal explica cada etapa do processo com clareza e empatia." },
  { icon: CheckCircle2, title: "Alta Efetividade", desc: "Redução média de até 90%, podendo os nódulos tratados inclusive desaparecer completamente (caso a caso)." },
];

export function Differentials() {
  return (
    <section id="diferenciais" className="overflow-hidden py-32 bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="label-eyebrow text-[10px]">Por que o Dr. Rahal</span>
              <span className="h-px w-10 bg-gold" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light text-3xl sm:text-4xl lg:text-5xl leading-[1.08]">
              O que torna as Consultas, os Procedimentos e, sobretudo,{" "}
              <span className="italic gradient-gold">as Ablações</span> com o Dr. Rahal verdadeiramente diferentes?
            </h2>
          </Reveal>
        </div>

        <div className="mt-24 space-y-2">
          {items.map((it, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, x: left ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className={`relative py-12 border-b hairline ${left ? "text-left" : "text-right lg:pl-[40%]"}`}
              >
                <span
                  className={`absolute font-display font-light text-[180px] leading-none gradient-gold opacity-[0.08] pointer-events-none select-none ${
                    left ? "-left-2 -top-6" : "-right-2 -top-6"
                  }`}
                  style={{ WebkitTextStroke: "1px #0B5E7A", color: "transparent", background: "none" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={`relative max-w-[600px] ${left ? "" : "ml-auto"}`}>
                  <div className={`flex items-center gap-3 ${left ? "" : "justify-end"}`}>
                    <div className="h-10 w-10 rounded-full border hairline grid place-items-center text-gold">
                      <it.icon size={16} strokeWidth={1.2} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold-deep">{String(i + 1).padStart(2, "0")} · {String(items.length).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-5 font-display text-3xl sm:text-4xl text-foreground">{it.title}</h3>
                  <p className="mt-4 text-muted-foreground font-light leading-relaxed">{it.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        <Reveal delay={0.15}>
          <div className="mt-16 grid items-end gap-8 border-t hairline pt-10 sm:grid-cols-[auto_minmax(0,1fr)]">
            <RahalMascot pose="present" size="lg" flip className="mx-auto sm:mx-0" />
            <p className="max-w-lg pb-8 font-display text-2xl italic text-muted-foreground sm:justify-self-end sm:text-right">
              Experiência técnica, atenção humana e escolhas individualizadas.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
