import { Eyebrow, Highlight, Reveal } from "./ui";

const reasons = [
  "Sua sobrancelha já não tem a definição de antes.",
  "Sua micropigmentação antiga mudou de cor ou formato.",
  "Você percebeu falhas ou afinamento nos fios.",
  "Sua pele perdeu o viço.",
  "Manchas começaram a aparecer.",
  "A textura mudou.",
  "Ou você simplesmente sente que está na hora de se cuidar mais.",
];

export function Identification() {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[980px] px-6 md:px-10">
        <Reveal>
          <Eyebrow>Identificação</Eyebrow>
          <h2 className="mt-6 text-[2.1rem] leading-[1.14] text-ink sm:text-[3rem]">
            Talvez você tenha chegado até aqui{" "}
            <span className="italic text-gold">porque...</span>
          </h2>
        </Reveal>

        <ul className="mt-12 space-y-1">
          {reasons.map((r, i) => (
            <Reveal key={r} delay={60 + i * 60}>
              <li className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-5 border-b border-gold/20 py-5 text-[1.0625rem] leading-[1.7] text-graphite md:text-[1.15rem]">
                <span className="font-display text-sm text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {r}
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={180}>
          <div className="mt-14">
            <Highlight>
              Mas você não precisa chegar sabendo qual procedimento fazer. Essa decisão é construída
              a partir de uma avaliação.
            </Highlight>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
