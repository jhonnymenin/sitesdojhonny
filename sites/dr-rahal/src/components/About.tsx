import { Reveal } from "./Reveal";
import clinic from "@/assets/dr-rahal-clinic.jpeg";
import symbol from "@/assets/symbol-rahal.png";

const timeline = [
  ["Graduação", "Faculdade de Medicina da USP-SP", "Integrou a equipe de acadêmicos dos Drs. Angelita Gama, Joaquim Gama-Rodrigues e Anoi Castro, acompanhando cerca de 600 cirurgias antes da conclusão do curso."],
  ["Residência", "INRAD — HC-FMUSP", "Instituto de Radiologia do Hospital das Clínicas."],
  ["Pós-graduação", "ICESP — Instituto do Câncer do Estado de São Paulo", "Onco-radiologia e procedimentos intervencionistas guiados por imagem."],
  ["2011", "Primeiras ablações de tireoide do Brasil", "Pela técnica de laser, no Hospital Israelita Albert Einstein, com excelentes resultados."],
  ["2016", "1º artigo brasileiro da classificação TI-RADS", "Coautor pelo Departamento de Imagem do Einstein — hoje o TI-RADS é adotado mundialmente."],
  ["2018", "Fellow Master Course em ablação por radiofrequência", "Asan Medical Center, Seul (Coreia do Sul), centro pioneiro absoluto na técnica."],
  ["Hoje", "Consultório e hospital", "Consultas, ultrassonografia multiparamétrica da tireoide e do pescoço, punções e biópsias e, sobretudo, ablação."],
];


export function About() {
  return (
    <section id="sobre" className="relative py-32 bg-background overflow-hidden">
      <img
        src={symbol}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 w-[600px] opacity-[0.03]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-[42%_58%] gap-16 lg:gap-20">
        <Reveal>
          <div className="relative">
            <div className="absolute -top-3 -left-3 h-10 w-10 border-t border-l border-gold/60 z-10" />
            <div className="absolute -bottom-3 -right-3 h-10 w-10 border-b border-r border-gold/60 z-10" />
            <div className="relative aspect-[3/4] overflow-hidden bg-surface">
              <img src={clinic} alt="Dr. Antonio Rahal na clínica" className="absolute inset-0 w-full h-full object-cover duotone-warm my-0" />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(180deg, transparent 55%, rgba(11,58,82,0.9) 100%)" }}
              />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--brand-soft)]">Em campo</div>
                <div className="font-display italic text-white/95 text-lg mt-1">Hospital de referência · SP</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="label-eyebrow text-[10px]">O Especialista</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light text-4xl sm:text-5xl leading-[1.05]">
              Pioneiro. <br />
              Pesquisador. <br />
              <span className="italic gradient-gold">Referência.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-lg text-foreground/85 font-light leading-relaxed dropcap">
              Olá, sejam bem-vindos. Sou Antonio Rahal, médico intervencionista e radiologista
              com foco em tireoide, formado pela Faculdade de Medicina da USP-SP, com residência
              no INRAD-HC-FMUSP e pós-graduação no ICESP.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-5 text-base text-muted-foreground font-light leading-relaxed">
              Dedico-me a consultas, à ultrassonografia multiparamétrica da tireoide e do pescoço,
              às punções e biópsias e, sobretudo, à técnica de ablação. Participo ativamente da
              produção de artigos científicos sobre tireoide nas revistas mais respeitadas do
              Brasil e do mundo.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-5 text-base text-muted-foreground font-light leading-relaxed italic">
              Sou aficcionado por preservar tireoides — sempre que possível e sob estreito
              balizamento ético e científico. E, mais do que isso, por ouvir cada paciente e
              oferecer a melhor experiência e o maior acolhimento possível.
            </p>
          </Reveal>


          <div className="mt-12 relative pl-8 border-l hairline">
            <ul className="space-y-9">
              {timeline.map(([label, title, desc], i) => (
                <Reveal key={title} delay={i * 0.08}>
                  <li className="relative">
                    <span className="absolute -left-[35px] top-2 h-1.5 w-1.5 rounded-full bg-gold" />
                    <div className="text-[10px] uppercase tracking-[0.3em] text-gold">{label}</div>
                    <div className="font-display text-xl text-foreground mt-1.5">{title}</div>
                    <div className="text-sm text-muted-foreground font-light mt-0.5">{desc}</div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
