import { Brain, Gauge, RefreshCw, Stethoscope } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

/* Só ícone e texto curto, como o brief pede — sem número, sem imagem. */
const itens = [
  {
    icon: Brain,
    titulo: "IA adaptativa e personalizada",
    texto: "O plano muda conforme você estuda, não uma vez por mês.",
  },
  {
    icon: Gauge,
    titulo: "Foco em desempenho e retenção",
    texto: "O que decide o próximo passo é o que você acerta e esquece.",
  },
  {
    icon: RefreshCw,
    titulo: "Revisão espaçada (SM-2)",
    texto: "O intervalo entre revisões segue um algoritmo testado há décadas.",
  },
  {
    icon: Stethoscope,
    titulo: "Preparação completa para o ENAMED",
    texto: "Conteúdo, questões, revisão e simulado no mesmo lugar.",
  },
];

export function Diferenciais() {
  return (
    <Section id="diferenciais" className="bg-surface">
      <SectionHeading eyebrow="Por que funciona" title="Baseado em ciência, feito para resultados." />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2">
        {itens.map((it, i) => (
          <Reveal
            as="li"
            key={it.titulo}
            delay={(i % 2) * 70}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10">
              <it.icon className="h-5 w-5 text-brand" />
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-bold leading-snug text-foreground">{it.titulo}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{it.texto}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
