import {
  PlayCircle,
  Award,
  RefreshCw,
  Radio,
  ClipboardList,
  BrainCircuit,
} from "lucide-react";
import { Reveal, Section, SectionTitle } from "./primitives";

const WHY = [
  {
    icon: PlayCircle,
    title: "Formação completa",
    text: "Cerca de 140 aulas cobrindo as áreas da oncologia, com participação de +60 especialistas do Brasil.",
  },
  {
    icon: Award,
    title: "Preparação para a prova de título",
    text: "Estudo direcionado à prova de Título de Especialista em Oncologia Clínica (TEOC).",
  },
  {
    icon: RefreshCw,
    title: "Atualização científica",
    text: "Conteúdo on-line 100% atualizado, com revisão rápida e abrangente dos principais temas.",
  },
  {
    icon: Radio,
    title: "Conteúdo on-line e encontros ao vivo",
    text: "5 encontros on-line ao vivo, com acesso posterior à versão gravada na plataforma.",
  },
  {
    icon: ClipboardList,
    title: "Banco de Questões",
    text: "350 questões comentadas em módulos temáticos e simulado com 50 questões.",
  },
  {
    icon: BrainCircuit,
    title: "Onco IA",
    text: "Inteligência Artificial aplicada à prática clínica e a toda a jornada do paciente.",
  },
];

export function WhyJourney() {
  return (
    <Section id="jornada-completa">
      <Reveal className="max-w-3xl">
        <SectionTitle>Por que escolher a jornada completa?</SectionTitle>
        <p className="mt-4 text-base leading-[1.6] text-muted-foreground md:text-lg">
          X Curso Intensivo de Oncologia, Banco de Questões e Onco IA formam uma jornada
          complementar de formação, preparação e atualização.
        </p>
      </Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WHY.map(({ icon: Icon, title, text }) => (
          <Reveal key={title} className="glass rounded-lg p-5">
            <Icon size={22} strokeWidth={1.5} className="text-electric" />
            <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-[1.55] text-muted-foreground">{text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
