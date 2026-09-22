import { Radio, RefreshCw, Layers } from "lucide-react";
import dnaBanner from "@/assets/dna-oficial.jpg";
import { Chip, CourseName, CtaButton } from "./primitives";
import { Sponsors } from "./Sponsors";
import { CouponBadge } from "./CouponBadge";
import { checkoutUrl } from "@/lib/checkout";

const SPECS = [
  { icon: Radio, label: "Ao vivo", value: "5 encontros on-line ao vivo" },
  { icon: RefreshCw, label: "Conteúdo", value: "100% atualizado" },
  { icon: Layers, label: "Complementos", value: "Banco de Questões e Onco IA" },
];


export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden px-5 pt-32 pb-14 md:px-10 md:pt-40 md:pb-20"
      style={{
        backgroundImage: `url(${dnaBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/95 via-background/80 to-background/95 md:bg-gradient-to-r md:from-background md:via-background/85 md:to-background/35" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-background" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-t from-transparent to-background" />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <div className="max-w-2xl">
          <Chip className="text-[10px] sm:text-xs">
            X Curso Intensivo de Oncologia · 10ª edição
          </Chip>
          <h1 className="mt-6 font-course text-[36px] leading-[1.05] font-bold tracking-[-0.02em] text-heading md:text-[58px]">
            <CourseName>X Curso Intensivo de Oncologia</CourseName>
          </h1>
          <p className="mt-5 text-base leading-[1.6] text-muted-foreground md:text-lg">
            Formação completa e abrangente para oncologistas que estão se preparando para a prova de
            Título de Especialista em Oncologia Clínica (TEOC) e para oncologistas experientes que
            desejam revisar e atualizar seus conhecimentos.
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
            {SPECS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex min-w-0 items-start gap-3 sm:block">
                <Icon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-cyan sm:mt-0" />
                <div className="min-w-0">
                  <dt className="label-mono text-muted-foreground sm:mt-2">{label}</dt>
                  <dd className="mt-0.5 text-sm leading-snug text-foreground">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-8 rounded-md border border-cyan/40 bg-cyan/10 p-4 sm:p-5">
            <p className="label-mono text-orange">Condição especial de lançamento</p>
            <p className="mt-2 text-base leading-[1.6] text-foreground">
              DESCONTO de 30% até 30 de setembro.
            </p>
            <CouponBadge className="mt-4" />
          </div>

          <div className="mt-8">
            <CtaButton href={checkoutUrl("combo", "hero")} className="w-full sm:w-auto">
              Participar da 10ª edição
            </CtaButton>
          </div>
        </div>

        {/*
          Patrocinadores no canto inferior direito do hero, sobre o grafismo de
          DNA (print 01 da revisão). Só a partir de lg: abaixo disso a coluna de
          texto ocupa quase toda a largura e o bloco colidiria com ela, então
          ele desce para depois do CTA.
        */}
        <Sponsors className="mt-12 lg:absolute lg:right-0 lg:bottom-0 lg:mt-0" />
      </div>
    </section>
  );
}
