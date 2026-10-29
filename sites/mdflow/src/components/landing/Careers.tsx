import { GraduationCap, Stethoscope, Award, RefreshCw } from "lucide-react";
import { Section, SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const stages = [
  {
    icon: GraduationCap,
    title: "Estudante",
    text: "Preparação para provas e escolhas.",
  },
  {
    icon: Stethoscope,
    title: "Residente",
    text: "Apoio durante a residência.",
  },
  {
    icon: Award,
    title: "Especialista",
    text: "Preparação para título de especialista.",
  },
  {
    icon: RefreshCw,
    title: "Médico em atualização",
    text: "Educação médica continuada e atualização ao longo da carreira.",
  },
];

export function Careers() {
  return (
    <Section className="border-y border-border bg-surface">
      <SectionHeading
        eyebrow="Não é apenas sobre provas"
        title="A jornada do médico não termina na aprovação."
        description="A MDFlow acompanha diferentes momentos da formação médica."
      />

      <div className="relative mt-14">
        <div
          aria-hidden
          className="absolute left-6 top-0 hidden h-full w-px bg-border lg:left-0 lg:top-7 lg:h-px lg:w-full"
        />
        <ol className="grid gap-8 lg:grid-cols-4">
          {stages.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90} className="relative flex flex-col gap-4">
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card shadow-soft">
                <s.icon className="h-6 w-6 text-brand" />
              </span>
              <div>
                <h3 className="text-base font-bold text-foreground">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal
        delay={200}
        className="mt-12 rounded-2xl border border-border bg-card px-6 py-5 text-center text-sm font-semibold text-foreground shadow-soft sm:text-base"
      >
        Uma plataforma para diferentes fases da formação e da vida profissional do médico.
      </Reveal>
    </Section>
  );
}
