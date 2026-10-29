import { useEffect, useState } from "react";
import { Brain, CalendarCheck, Layers, TrendingUp } from "lucide-react";
import { useInView } from "./Reveal";

const disciplines = [
  { label: "Clínica Médica", value: 82, tone: "bg-brand" },
  { label: "Cirurgia", value: 64, tone: "bg-brand-soft" },
  { label: "Pediatria", value: 71, tone: "bg-success" },
  { label: "Preventiva", value: 48, tone: "bg-warning" },
];

const curve = [28, 34, 33, 42, 51, 58, 57, 66, 74, 79, 86];

export function DashboardMock() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const target = 78;
    const id = window.setInterval(() => {
      frame += 1;
      setScore(Math.round(target * Math.min(1, frame / 40)));
      if (frame >= 40) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, [inView]);

  const width = 320;
  const height = 110;
  const points = curve
    .map((v, i) => `${(i / (curve.length - 1)) * width},${height - (v / 100) * height}`)
    .join(" ");

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-[3rem] bg-brand/10 blur-3xl dark:bg-brand/20"
      />
      <div className="rounded-2xl border border-border bg-card p-4 shadow-lift sm:p-5">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand" />
            <span className="text-sm font-semibold text-foreground">Minha jornada</span>
          </div>
          <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand">
            Plano recalculado hoje
          </span>
        </div>

        <div className="grid gap-4 pt-4 sm:grid-cols-5">
          <div className="sm:col-span-2 flex flex-col gap-4">
            <div className="rounded-xl border border-border bg-surface p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Score de preparação
              </p>
              <p className="mt-1 text-4xl font-extrabold tabular-nums text-foreground">
                {score}
                <span className="text-lg font-bold text-muted-foreground">/100</span>
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-brand transition-[width] duration-1000 ease-out"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-border p-4">
              {disciplines.map((d, i) => (
                <div key={d.label}>
                  <div className="flex items-center justify-between text-[11px] font-medium">
                    <span className="text-muted-foreground">{d.label}</span>
                    <span className="tabular-nums text-foreground">{d.value}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
                    <div
                      className={`h-full rounded-full ${d.tone} transition-[width] duration-1000 ease-out`}
                      style={{
                        width: inView ? `${d.value}%` : "0%",
                        transitionDelay: `${200 + i * 120}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-3 flex flex-col gap-4">
            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Evolução
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success">
                  <TrendingUp className="h-3.5 w-3.5" /> +21% em 8 semanas
                </span>
              </div>
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="mt-3 h-24 w-full overflow-visible"
                role="img"
                aria-label="Curva de evolução do desempenho"
              >
                <defs>
                  <linearGradient id="mdflow-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon
                  points={`0,${height} ${points} ${width},${height}`}
                  fill="url(#mdflow-area)"
                />
                <polyline
                  points={points}
                  fill="none"
                  stroke="var(--color-brand)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 1200,
                    strokeDashoffset: inView ? 0 : 1200,
                    transition: "stroke-dashoffset 1.6s ease-out",
                  }}
                />
              </svg>
            </div>

            <div className="rounded-xl border border-border p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Próximos passos recomendados
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {[
                  { icon: Brain, text: "Revisar lacuna: distúrbios ácido-base", tag: "IA" },
                  { icon: Layers, text: "20 questões — Pneumologia", tag: "Questões" },
                  { icon: CalendarCheck, text: "Flashcards do dia (32 cartas)", tag: "Revisão" },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center justify-between gap-3 rounded-lg bg-surface px-3 py-2.5"
                  >
                    <span className="flex items-center gap-2.5 text-xs font-medium text-foreground">
                      <item.icon className="h-4 w-4 shrink-0 text-brand" />
                      {item.text}
                    </span>
                    <span className="shrink-0 rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                      {item.tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
