import { UserRound, Landmark, Network, HeartPulse } from "lucide-react";
import { Section, SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const streams = [
  {
    icon: UserRound,
    title: "Assinaturas de alunos",
    text: "Acesso completo à plataforma para uma preparação mais inteligente e eficiente.",
  },
  {
    icon: Landmark,
    title: "Licenciamento institucional",
    text: "Soluções para faculdades e instituições acompanharem e elevarem o desempenho de seus alunos.",
  },
  {
    icon: Network,
    title: "Distribuição e parcerias",
    text: "Players educacionais e parceiros distribuem conteúdos e soluções dentro da jornada MDFlow.",
  },
  {
    icon: HeartPulse,
    title: "Projetos e conteúdos patrocinados",
    text: "Programas educacionais e jornadas desenvolvidas em parceria com a indústria.",
  },
];

export function BusinessModel() {
  return (
    <Section id="modelo">
      <SectionHeading eyebrow="Modelo de negócio" title="Um modelo de receita multifonte." />

      <div className="mt-14 grid divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {streams.map((s, i) => (
          <Reveal key={s.title} delay={i * 80} className="flex flex-col gap-4 p-6 lg:p-7">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
              <s.icon className="h-5 w-5 text-brand" />
            </span>
            <h3 className="text-sm font-bold leading-snug text-foreground">{s.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
