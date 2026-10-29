import { ClipboardCheck, Target, Activity, TrendingUp } from "lucide-react";
import { Section, SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Diagnóstico inicial",
    lead: "Entendemos onde o aluno está.",
    text: "Uma avaliação inicial identifica conhecimentos, forças, fragilidades e prioridades.",
  },
  {
    icon: Target,
    title: "Jornada personalizada",
    lead: "O plano ideal para o objetivo do aluno.",
    text: "A MDFlow monta o plano considerando conteúdos, questões, revisões e metas semanais.",
  },
  {
    icon: Activity,
    title: "Ajuste contínuo por desempenho",
    lead: "A rota nunca fica desatualizada.",
    text: "A plataforma acompanha o desempenho e recalcula o caminho com base em erros, acertos, questões respondidas e evolução.",
  },
  {
    icon: TrendingUp,
    title: "Evolução e resultado",
    lead: "Clareza até o objetivo final.",
    text: "O aluno acompanha sua evolução com mais clareza, eficiência e direcionamento.",
  },
];

export function Journey() {
  return (
    <Section id="jornada">
      <SectionHeading
        eyebrow="Como funciona"
        title="Uma jornada personalizada para cada médico."
        description="Diagnóstico → Planejamento → Execução → Replanejamento. Um ciclo que se ajusta a cada semana de estudo."
      />

      <div className="relative mt-16">
        <div
          aria-hidden
          className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
        />
        <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="relative flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card shadow-soft">
                  <step.icon className="h-5 w-5 text-brand" />
                </span>
                <span className="text-sm font-bold tabular-nums text-brand">
                  0{i + 1}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold leading-snug text-foreground">{step.title}</h3>
                <p className="text-sm font-semibold text-foreground/80">{step.lead}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
