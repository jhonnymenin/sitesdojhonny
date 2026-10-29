import { useEffect, useState } from "react";
import { Section, Eyebrow } from "./SectionHeading";
import { Reveal, useInView } from "./Reveal";

function Counter({ target }: { target: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 55;
    const id = window.setInterval(() => {
      frame += 1;
      const p = Math.min(1, frame / total);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p === 1) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      +{value.toLocaleString("pt-BR")}
    </span>
  );
}

export function Market() {
  return (
    <Section id="mercado">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>Mercado</Eyebrow>
          <h2 className="text-balance text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl lg:text-[2.75rem]">
            O mercado não termina nos estudantes de medicina.
          </h2>
          <p className="max-w-xl leading-relaxed text-muted-foreground sm:text-lg">
            A MDFlow conecta diferentes públicos, instituições, players educacionais e indústria em
            uma única plataforma.
          </p>
          <p className="max-w-xl leading-relaxed text-muted-foreground">
            E um mercado ainda maior quando consideramos residentes, especialistas, instituições,
            players educacionais e parceiros da jornada médica.
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center shadow-lift"
        >
          <div
            aria-hidden
            className="grid-faint absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]"
          />
          <p className="text-5xl font-extrabold leading-none text-brand sm:text-7xl">
            <Counter target={180} /> mil
          </p>
          <p className="mt-4 text-lg font-bold uppercase tracking-[0.14em] text-foreground">
            Estudantes de medicina
          </p>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            no Brasil
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6 text-left">
            {[
              { k: "Residentes", v: "Jornada pós-graduação" },
              { k: "Especialistas", v: "Título e atualização" },
              { k: "Instituições", v: "Faculdades e parceiros" },
            ].map((item) => (
              <div key={item.k}>
                <p className="text-xs font-bold text-foreground">{item.k}</p>
                <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{item.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
