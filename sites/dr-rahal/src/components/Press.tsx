import { Reveal } from "./Reveal";

const outlets = [
  "Jovem Pan Saúde",
  "Veja",
  "Isto É",
  "Record",
  "Fala Brasil",
  "Tha Com Tudo",
  "Gazeta",
  "CNN Brasil",
  "Estado de Minas",
  "Correio Braziliense",
  "UOL",
  "Mariana Kotscho",
];

const articles: { outlet: string; title: string }[] = [
  { outlet: "Jovem Pan Saúde", title: "Entrevista 1 — Ablação de tireoide sem cirurgia" },
  { outlet: "Jovem Pan Saúde", title: "Entrevista 2 — Nódulos: quando tratar e quando acompanhar" },
  { outlet: "Jovem Pan Saúde", title: "Entrevista 3 — Avanços no tratamento minimamente invasivo" },
  { outlet: "Veja", title: "Reportagem 1 — A revolução no tratamento dos nódulos da tireoide" },
  { outlet: "Veja", title: "Reportagem 2 — Preservar a tireoide é possível" },
  { outlet: "Isto É", title: "O pioneiro brasileiro da ablação de tireoide" },
  { outlet: "Record", title: "Entrevista 1 — Técnica dispensa a cirurgia de tireoide" },
  { outlet: "Record · Fala Brasil", title: "Entrevista 2 — Ablação por radiofrequência na prática" },
  { outlet: "Record · Tha Com Tudo", title: "Entrevista 1 — Tireoide sem medo" },
  { outlet: "Record · Tha Com Tudo", title: "Entrevista 2 — Diagnóstico por ultrassom multiparamétrico" },
  { outlet: "Record · Tha Com Tudo", title: "Entrevista 3 — Recuperação e resultados da ablação" },
  { outlet: "Gazeta · Você Bonita", title: "Nódulos de tireoide: o que toda mulher precisa saber" },
  { outlet: "CNN · Sinais Vitais", title: "Ablação térmica muda o futuro do tratamento da tireoide" },
  { outlet: "Estado de Minas", title: "Tratamento sem cortes para nódulos da tireoide" },
  { outlet: "Correio Braziliense", title: "Medicina intervencionista chega à tireoide" },
  { outlet: "UOL", title: "Matéria 1 — Como funciona a ablação por radiofrequência" },
  { outlet: "UOL", title: "Matéria 2 — Quem pode fazer o procedimento" },
  { outlet: "Mariana Kotscho", title: "Conversa 1 — Cuidar da tireoide com acolhimento" },
  { outlet: "Mariana Kotscho", title: "Conversa 2 — Histórias de pacientes" },
];

export function Press() {
  return (
    <section id="press" className="py-32 border-y hairline bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="label-eyebrow text-[10px]">Nas Mídias</span>
              <span className="h-px w-10 bg-gold" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light text-3xl sm:text-4xl leading-[1.05]">
              Reconhecimento da <span className="italic gradient-gold">imprensa</span> <br />
              e da comunidade científica
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--surface)] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--surface)] to-transparent z-10" />
          <div className="flex gap-16 animate-marquee w-max items-center">
            {[...outlets, ...outlets].map((o, i) => (
              <div
                key={i}
                className="font-display italic text-2xl text-foreground/40 hover:text-gold transition-colors duration-500 whitespace-nowrap"
              >
                {o}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-px bg-[rgba(201,162,76,0.12)]">
          {articles.map((a, i) => (
            <Reveal key={`${a.outlet}-${a.title}`} delay={Math.min(i, 8) * 0.05}>
              <a href="#" className="group bg-background p-8 h-full flex flex-col hover:bg-surface/40 transition-colors duration-500">
                <span className="text-[10px] uppercase tracking-[0.28em] text-gold">{a.outlet}</span>
                <h3 className="mt-5 font-display text-xl sm:text-2xl leading-snug text-foreground flex-1">{a.title}</h3>
                <div className="mt-8 pt-5 border-t hairline flex items-center justify-end text-xs">
                  <span className="text-gold tracking-wide group-hover:translate-x-1 transition-transform">Ver entrevista →</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
