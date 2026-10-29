import { ArrowRight, LineChart, Sparkles, Route } from "lucide-react";
import { DashboardMock } from "./DashboardMock";
import { Reveal } from "./Reveal";

const microBenefits = [
  { icon: Route, label: "Jornada personalizada" },
  { icon: Sparkles, label: "Decisões orientadas por IA" },
  { icon: LineChart, label: "Rota atualizada por desempenho" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-24 pt-16 sm:px-8 lg:pb-32">
      <div
        aria-hidden
        className="grid-faint pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        <div className="flex flex-col gap-7">
          <Reveal className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            AI Medical Learning Network
          </Reveal>

          <Reveal delay={60}>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Não vendemos conteúdo.{" "}
              <span className="text-brand">Entregamos tempo e aprovação.</span>
            </h1>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-4">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              A plataforma inteligente que organiza toda a preparação do médico em uma jornada
              personalizada, orientada por dados e inteligência artificial.
            </p>
            <p className="max-w-xl leading-relaxed text-muted-foreground">
              Da preparação para provas à formação médica contínua, a MDFlow transforma conteúdo,
              questões, revisões e desempenho em um caminho claro para cada aluno.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <a
              href="#contato"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-primary-foreground shadow-lift transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Quero conhecer a MDFlow
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>

          <Reveal delay={240}>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6">
              {microBenefits.map((b) => (
                <li
                  key={b.label}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                >
                  <b.icon className="h-4 w-4 text-brand" />
                  {b.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <DashboardMock />
        </Reveal>
      </div>
    </section>
  );
}
