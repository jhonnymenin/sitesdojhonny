import { Reveal } from "./Reveal";
import { RahalMascot } from "./RahalMascot";


const primary = [
  { num: "I", title: "Ablação por Laser", tag: "I.L.A.", desc: "Energia laser de precisão para tratamento de nódulos tireoidianos sem cirurgia." },
  { num: "II", title: "Ablação por Radiofrequência", tag: "R.F.A.", desc: "Eliminação do nódulo sem cirurgia, guiada por ultrassom em tempo real.", badge: "Destaque" },
  { num: "III", title: "Ablação por Microondas", tag: "M.W.A.", desc: "Tecnologia também térmica que, por seu perfil de disseminação do calor gerado, pode ser a ESCOLHA em alguns tipos selecionados de nódulos.", badge: "Destaque" },
  { num: "IV", title: "Eletroporação Irreversível", tag: "I.R.E.", desc: "Energia não térmica, mas sim uma corrente elétrica FOCAL que mata os nódulos e preserva as estruturas nobres adjacentes." },
  { num: "V", title: "Ablação Química", tag: "Alcoolização (E.A.)", desc: "Tratamento percutâneo com agentes esclerosantes para nódulos císticos e mistos." },
];

const secondary = [
  { num: "VI", title: "Crioablação", tag: "Pioneirismo", desc: "Realizou os primeiros casos no Brasil de crioablação em cânceres mamários selecionados." },
];

const diagnostics = [
  {
    num: "01",
    title: "Ultrassonografia Multiparamétrica da Tireoide",
    tag: "TI-RADS",
    desc: "Avaliação detalhada da tireoide e do pescoço com classificação TI-RADS, elastografia e Doppler — a base para decidir o que precisa, e o que não precisa, ser tratado.",
  },
  {
    num: "02",
    title: "Punção Aspirativa e Biópsia de Tireoide e Cervical",
    tag: "Diagnóstico",
    desc: "Procedimentos guiados por ultrassom realizados com eficácia, rapidez e o máximo conforto para o paciente.",
  },
];


export function Services() {
  return (
    <section className="overflow-hidden py-32 bg-background border-y hairline">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="label-eyebrow text-[10px]">Serviços</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light text-4xl sm:text-5xl leading-[1.05]">
              Tratamentos em que é <br />
              <span className="italic gradient-gold">referência</span>.
            </h2>
          </Reveal>
        </div>

        <div className="mt-20">
          {primary.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <article className={`group grid grid-cols-12 gap-6 py-10 border-t hairline ${i === primary.length - 1 ? "border-b" : ""} hover:bg-surface/20 transition-colors duration-500 px-2`}>
                <div className="col-span-2 sm:col-span-1">
                  <span className="font-display italic text-gold/70 text-2xl">{s.num}</span>
                </div>
                <div className="col-span-10 sm:col-span-4">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-gold mb-2">{s.tag}</div>
                  <h3 className="font-display text-2xl sm:text-3xl text-foreground">{s.title}</h3>
                  {s.badge && (
                    <span className="inline-block mt-3 text-[10px] uppercase tracking-[0.22em] text-background bg-gradient-gold px-2.5 py-1">{s.badge}</span>
                  )}
                </div>
                <div className="col-span-12 sm:col-span-6 sm:col-start-7 text-muted-foreground font-light leading-relaxed text-[15px]">
                  {s.desc}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="label-eyebrow text-[10px]">Outras Técnicas</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-6 font-display font-light text-3xl sm:text-4xl leading-[1.1]">
              Também possui <span className="italic gradient-gold">expertise</span> em outras técnicas
            </h3>
          </Reveal>
        </div>

        <div className="mt-12">
          {secondary.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <article className={`group grid grid-cols-12 gap-6 py-10 border-t hairline ${i === secondary.length - 1 ? "border-b" : ""} hover:bg-surface/20 transition-colors duration-500 px-2`}>
                <div className="col-span-2 sm:col-span-1">
                  <span className="font-display italic text-gold/70 text-2xl">{s.num}</span>
                </div>
                <div className="col-span-10 sm:col-span-4">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-gold mb-2">{s.tag}</div>
                  <h3 className="font-display text-2xl sm:text-3xl text-foreground">{s.title}</h3>
                </div>
                <div className="col-span-12 sm:col-span-6 sm:col-start-7 text-muted-foreground font-light leading-relaxed text-[15px]">
                  {s.desc}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="label-eyebrow text-[10px]">Diagnóstico</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-6 font-display font-light text-3xl sm:text-4xl leading-[1.1]">
              Avaliação por <span className="italic gradient-gold">imagem</span> e diagnóstico
            </h3>
          </Reveal>
        </div>

        <div className="mt-12">
          {diagnostics.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <article className={`group grid grid-cols-12 gap-6 py-10 border-t hairline ${i === diagnostics.length - 1 ? "border-b" : ""} hover:bg-surface/20 transition-colors duration-500 px-2`}>
                <div className="col-span-2 sm:col-span-1">
                  <span className="font-display italic text-gold/70 text-2xl">{s.num}</span>
                </div>
                <div className="col-span-10 sm:col-span-4">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-gold mb-2">{s.tag}</div>
                  <h3 className="font-display text-2xl sm:text-3xl text-foreground">{s.title}</h3>
                </div>
                <div className="col-span-12 sm:col-span-6 sm:col-start-7 text-muted-foreground font-light leading-relaxed text-[15px]">
                  {s.desc}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t hairline text-center sm:text-left">
          <p className="font-display italic text-2xl sm:text-3xl text-foreground/90 max-w-md">
            Cada caso é avaliado individualmente, com indicação criteriosa.
          </p>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 grid items-end gap-8 border-t hairline pt-10 sm:grid-cols-[minmax(0,1fr)_auto]">
            <p className="max-w-lg pb-8 font-display text-2xl italic text-muted-foreground">
              Cada técnica tem uma indicação precisa — nunca uma solução genérica.
            </p>
            <RahalMascot pose="welcome" size="lg" className="mx-auto sm:mx-0" />
          </div>
        </Reveal>

      </div>
    </section>

  );
}
