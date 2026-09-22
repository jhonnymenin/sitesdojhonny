import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CtaButton, Reveal, Section, SectionTitle } from "./primitives";
import { whatsappUrl } from "@/lib/checkout";

const FAQS = [
  {
    q: "Quais são as formas de pagamento?",
    a: "À vista no Cartão de Crédito, Boleto ou Pix ou parcelado em 2x no Cartão de Crédito.",
  },
  {
    q: "Quando serão realizados os encontros ao vivo?",
    a: "Datas, horários, temas e professores serão divulgados nos canais oficiais.",
  },
  {
    q: "Como receberei o acesso?",
    a: "O acesso ao X Curso Intensivo de Oncologia e ao Banco de Questões será liberado automaticamente após a matrícula no ambiente MOC. O acesso ao Onco IA será compartilhado por e-mail.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <Reveal className="max-w-3xl">
        <SectionTitle>Perguntas frequentes</SectionTitle>
      </Reveal>

      <div className="mt-8 max-w-3xl divide-y divide-border border-y border-border">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-display text-base font-semibold text-foreground md:text-lg">
                  {item.q}
                </span>
                <ChevronDown
                  size={20}
                  strokeWidth={1.5}
                  className={cn(
                    "shrink-0 text-cyan transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen ? (
                <p className="pb-5 text-sm leading-[1.6] text-muted-foreground md:text-base">
                  {item.a}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <Reveal className="mt-10 max-w-3xl">
        <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
          Ainda tem dúvidas?
        </h3>
        <p className="mt-3 text-base leading-[1.6] text-muted-foreground">
          Fale com a equipe e escolha a melhor opção para sua formação.
        </p>
        <CtaButton href={whatsappUrl("Olá! Tenho dúvidas sobre o X Curso Intensivo de Oncologia.")} variant="outline" className="mt-5">
          Fale com nossa equipe
        </CtaButton>
      </Reveal>
    </Section>
  );
}
