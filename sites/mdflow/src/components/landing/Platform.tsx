import { CalendarRange, BookOpen, HelpCircle, Layers, BarChart3, BrainCircuit } from "lucide-react";
import { Section, SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const features = [
  {
    icon: CalendarRange,
    title: "Plano de estudos personalizado",
    text: "Rotina inteligente e adaptativa de acordo com objetivo, disponibilidade e desempenho.",
    tone: "text-brand",
  },
  {
    icon: BookOpen,
    title: "Conteúdos integrados",
    text: "Conteúdos próprios e de parceiros organizados dentro da jornada do aluno.",
    tone: "text-brand-soft",
  },
  {
    icon: HelpCircle,
    title: "Questões e avaliações",
    text: "Banco inteligente de questões e simulados para medir conhecimento e evolução.",
    tone: "text-success",
  },
  {
    icon: Layers,
    title: "Flashcards e revisões",
    text: "Revisão espaçada e ativa dos temas que precisam ser consolidados.",
    tone: "text-accent",
  },
  {
    icon: BarChart3,
    title: "Dashboard de desempenho",
    text: "Indicadores por disciplina, tema, competência e objetivo.",
    tone: "text-warning",
  },
  {
    icon: BrainCircuit,
    title: "IA + recomendações",
    text: "Identificação de lacunas e recomendações sobre o que estudar, revisar ou praticar a seguir.",
    tone: "text-brand",
  },
];

export function Platform() {
  return (
    <Section id="plataforma" className="border-y border-border bg-surface">
      <SectionHeading
        eyebrow="O que a plataforma entrega"
        title="Tudo o que o aluno precisa em uma única jornada."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal
            key={f.title}
            delay={i * 70}
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface transition-colors group-hover:bg-brand/10">
              <f.icon className={`h-5 w-5 ${f.tone}`} />
            </span>
            <h3 className="text-base font-bold leading-snug text-foreground">{f.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{f.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
