import { Database, Repeat, Sparkles, Gauge } from "lucide-react";
import { Section } from "./SectionHeading";
import { Eyebrow } from "./SectionHeading";
import { Reveal } from "./Reveal";

const cycle = [
  { icon: Repeat, label: "Uso", text: "Cada questão, revisão e sessão de estudo." },
  { icon: Database, label: "Dados", text: "Sinais de aprendizagem organizados." },
  { icon: Sparkles, label: "Inteligência", text: "Padrões de domínio e esquecimento." },
  { icon: Gauge, label: "Personalização", text: "Recomendações mais precisas." },
];

export function DataAsset() {
  return (
    <Section>
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>Dados como ativo</Eyebrow>
          <h2 className="text-balance text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl lg:text-[2.75rem]">
            Inteligência que evolui com o aluno.
          </h2>
          <p className="max-w-xl leading-relaxed text-muted-foreground sm:text-lg">
            Quanto mais o aluno utiliza a MDFlow, mais a plataforma entende como ele aprende. Os
            dados geram um ciclo contínuo de personalização e precisão nas recomendações.
          </p>
          <p className="text-lg font-bold leading-snug text-brand">
            Mais uso. Mais inteligência. Mais personalização. Melhores resultados.
          </p>
        </Reveal>

        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-8 -z-10 rounded-full border border-dashed border-brand/25"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {cycle.map((c, i) => (
              <Reveal
                key={c.label}
                delay={i * 90}
                className={`rounded-2xl border border-border bg-card p-5 shadow-soft ${
                  i % 2 === 1 ? "sm:translate-y-6" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10">
                    <c.icon className="h-4.5 w-4.5 text-brand" />
                  </span>
                  <p className="text-sm font-bold text-foreground">{c.label}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
