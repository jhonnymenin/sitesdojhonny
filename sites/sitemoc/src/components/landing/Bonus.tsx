import { CheckCircle2 } from "lucide-react";
import { CtaButton, Reveal, Section, SectionTitle } from "./primitives";
import { PRICING_ANCHOR } from "@/lib/checkout";

const AUDIENCE = [
  "Residentes de Clínica Médica que buscam aprofundamento em Oncologia",
  "Residentes de Oncologia em busca uma revisão abrangente",
  "Oncologistas em preparação para a prova de título de especialista",
  "Oncologistas experientes em busca de atualização rápida",
  "Profissionais de Saúde envolvidos no tratamento do câncer",
  "Assinantes do MOC que buscam formação e atualização contínuas",
];

export function Bonus() {
  return (
    <Section id="bonus">
      <Reveal className="max-w-3xl">
        <SectionTitle>Para quem é o X Curso Intensivo de Oncologia:</SectionTitle>
      </Reveal>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {AUDIENCE.map((item) => (
          <Reveal as="li" key={item} className="flex gap-3">
            <CheckCircle2 size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-cyan" />
            <span className="text-base leading-[1.55] text-muted-foreground">{item}</span>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-8">
        <CtaButton href={PRICING_ANCHOR} className="w-full sm:w-auto">
          Realizar a inscrição
        </CtaButton>
      </Reveal>
    </Section>
  );
}
