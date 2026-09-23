import { Radio } from "lucide-react";
import { Chip, CtaButton, Reveal, Section, SectionTitle } from "./primitives";
import { PRICING_ANCHOR } from "@/lib/checkout";

const MEETINGS = [
  "Encontro 1",
  "Encontro 2",
  "Encontro 3",
  "Encontro 4",
  "Encontro 5",
];

export function LiveMeetings() {
  return (
    <Section id="programacao">
      <Reveal className="max-w-3xl">
        <Chip>Novidade da 10ª edição</Chip>
        <SectionTitle className="mt-5">
          Em 2026, o Curso Intensivo de Oncologia vai além das aulas gravadas
        </SectionTitle>
        <p className="mt-4 text-base leading-[1.6] text-muted-foreground md:text-lg">
          Você terá acesso a 5 encontros exclusivos, com atualizações dos principais congressos de
          2026 e 2027.
        </p>
        <p className="mt-3 text-base leading-[1.6] text-muted-foreground">
          Os encontros acontecerão em datas previstas de novembro de 2026 a março de 2027, após os
          principais congressos de oncologia.
        </p>
        <p className="mt-3 text-base leading-[1.6] text-muted-foreground">
          Cada encontro será uma oportunidade de aprofundamento e revisão. Os alunos poderão
          participar on-line ao vivo ou acessar a versão gravada na plataforma posteriormente.
        </p>
      </Reveal>

      <ol className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-5">
        {MEETINGS.map((label) => (
          <Reveal as="li" key={label} className="glass relative rounded-lg p-5">
            <span
              aria-hidden="true"
              className="pulse-live absolute top-5 right-5 h-2 w-2 rounded-full bg-cyan"
            />
            <Radio size={18} strokeWidth={1.5} className="text-electric" />
            <p className="label-mono mt-3 text-cyan">{label} | On-line ao vivo</p>
            <p className="mt-1.5 text-sm leading-snug text-foreground">Programação em breve</p>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-8">
        <CtaButton href={PRICING_ANCHOR} className="w-full sm:w-auto">
          Garantir acesso aos encontros
        </CtaButton>
      </Reveal>
    </Section>
  );
}
