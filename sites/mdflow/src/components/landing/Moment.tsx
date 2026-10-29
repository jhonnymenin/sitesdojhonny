import { Wrench, FlaskConical, Rocket } from "lucide-react";
import { Section, SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const milestones = [
  {
    icon: Wrench,
    tag: "Agora",
    text: "Plataforma em desenvolvimento avançado e principais jornadas em construção.",
    highlight: false,
  },
  {
    icon: FlaskConical,
    tag: "Próximo passo",
    text: "Finalização do produto, testes com usuários e parceiros.",
    highlight: false,
  },
  {
    icon: Rocket,
    tag: "Em aproximadamente 2 meses",
    text: "Lançamento da MDFlow.",
    highlight: true,
  },
];

export function Moment() {
  return (
    <Section className="border-t border-border bg-surface">
      <SectionHeading
        eyebrow="O momento atual"
        title="Estamos construindo o futuro da formação médica."
      />

      <ol className="mt-14 grid gap-5 lg:grid-cols-3">
        {milestones.map((m, i) => (
          <Reveal
            as="li"
            key={m.tag}
            delay={i * 100}
            className={
              m.highlight
                ? "flex flex-col gap-4 rounded-2xl border border-brand/30 bg-card p-6 shadow-lift ring-1 ring-brand/15"
                : "flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft"
            }
          >
            <div className="flex items-center justify-between">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  m.highlight ? "bg-brand text-primary-foreground" : "bg-brand/10 text-brand"
                }`}
              >
                <m.icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-bold tabular-nums text-muted-foreground">
                0{i + 1}
              </span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">{m.tag}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{m.text}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
