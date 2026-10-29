import { Section, SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const noise = [
  "Videoaulas",
  "PDFs",
  "Questões",
  "Resumos",
  "Simulados",
  "Flashcards",
  "Anotações",
  "Guidelines",
  "Podcasts",
];

const ordered = [
  { step: "Hoje", text: "20 questões de Pneumologia" },
  { step: "Amanhã", text: "Revisão espaçada: 32 flashcards" },
  { step: "Quinta", text: "Aula + caso clínico de Nefrologia" },
  { step: "Domingo", text: "Simulado parcial e recálculo da rota" },
];

export function Problem() {
  return (
    <Section id="problema" className="border-y border-border bg-surface">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="O problema"
            title={
              <>
                Estudar mais não significa necessariamente{" "}
                <span className="text-brand">estudar melhor.</span>
              </>
            }
            description={
              <>
                O médico precisa lidar com uma enorme quantidade de conteúdos, questões, revisões e
                decisões sobre o que estudar — muitas vezes sem saber exatamente onde está, o que
                precisa melhorar ou qual deve ser o próximo passo.
              </>
            }
          />
          <Reveal delay={80} className="flex flex-col gap-2 border-l-2 border-brand pl-5">
            <p className="text-lg font-bold text-foreground">A MDFlow organiza essa jornada.</p>
            <p className="text-muted-foreground">
              Nossa tecnologia entende o momento de cada aluno e transforma dados de aprendizagem em
              recomendações personalizadas.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal className="rounded-2xl border border-dashed border-border bg-card/60 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Sem direção
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {noise.map((n, i) => (
                <span
                  key={n}
                  className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
                >
                  {n}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Muito conteúdo, nenhuma prioridade clara.
            </p>
          </Reveal>

          <Reveal
            delay={120}
            className="rounded-2xl border border-border bg-card p-5 shadow-lift ring-1 ring-brand/15"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
              Com a MDFlow
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {ordered.map((o) => (
                <li key={o.step} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span className="text-xs leading-relaxed">
                    <span className="font-semibold text-foreground">{o.step} · </span>
                    <span className="text-muted-foreground">{o.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-medium text-foreground">
              Uma rota por vez, sempre a próxima ação certa.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
