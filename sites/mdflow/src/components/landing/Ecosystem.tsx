import { Users, Building2, Share2, FlaskConical } from "lucide-react";
import { Section, SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const players = [
  {
    icon: Users,
    title: "Alunos",
    text: "Experiência personalizada e orientada a resultados, desde o primeiro dia de estudo até a conquista do objetivo.",
  },
  {
    icon: Building2,
    title: "Instituições de ensino",
    text: "Tecnologia e dados para acompanhar, engajar e potencializar o aprendizado dos alunos.",
  },
  {
    icon: Share2,
    title: "Players educacionais",
    text: "Distribuição de conteúdos e soluções dentro da jornada MDFlow.",
  },
  {
    icon: FlaskConical,
    title: "Indústria",
    text: "Programas educacionais, conteúdos e jornadas patrocinadas com acesso qualificado ao médico em formação.",
  },
];

export function Ecosystem() {
  return (
    <Section className="border-y border-border bg-surface">
      <SectionHeading
        eyebrow="Ecossistema"
        title="Uma plataforma. Diferentes possibilidades."
        description="Um ecossistema que gera valor para todos os públicos da formação médica."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {players.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 80}
            className="group flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10">
              <p.icon className="h-5 w-5 text-brand" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
