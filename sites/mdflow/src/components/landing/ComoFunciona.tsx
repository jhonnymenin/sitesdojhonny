import { ClipboardList, Compass, Rocket, Target } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

const passos = [
  {
    icon: Target,
    titulo: "Conte seus objetivos",
    texto: "Qual prova, quando, e quanto tempo você tem por semana.",
  },
  {
    icon: Compass,
    titulo: "Descubra seu ponto de partida",
    texto: "Um diagnóstico inicial mostra onde você está em cada área.",
  },
  {
    icon: ClipboardList,
    titulo: "Receba seu plano personalizado",
    texto: "Conteúdos, questões e revisões distribuídos no seu calendário.",
  },
  {
    icon: Rocket,
    titulo: "Evolua com seu copiloto",
    texto: "O plano se ajusta a cada acerto, erro e revisão que você faz.",
  },
];

export function ComoFunciona() {
  return (
    <Section id="como-funciona">
      <SectionHeading
        eyebrow="Como funciona"
        title="Do diagnóstico ao plano de estudos, em quatro passos."
      />

      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {passos.map((p, i) => (
          <Reveal
            as="li"
            key={p.titulo}
            delay={i * 70}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10">
                <p.icon className="h-5 w-5 text-brand" />
              </span>
              {/* O número é decorativo: a ordem já vem da <ol>. */}
              <span aria-hidden className="text-2xl font-extrabold text-border">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-lg font-bold leading-snug text-foreground">{p.titulo}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
