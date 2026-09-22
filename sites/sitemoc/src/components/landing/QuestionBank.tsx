import { ClipboardList, CheckCircle2 } from "lucide-react";
import banner from "@/assets/banner-banco-questoes.png";
import { Chip, CourseName, CtaButton, Reveal } from "./primitives";
import { checkoutUrl } from "@/lib/checkout";

const STEPS = [
  "Responda à questão",
  "Confira o gabarito",
  "Acesse o comentário técnico do especialista",
  "Retome as questões sempre que desejar",
];

const FEATURES = [
  "350 questões",
  "Simulado com 50 questões",
  "Certificado de conclusão",
  "Comentários de especialistas em vídeo",
  "Módulos temáticos",
  "Acesso por 3 meses",
];

export function QuestionBank() {
  return (
    <section
      id="banco-questoes"
      className="relative isolate overflow-hidden bg-cover bg-center px-5 pt-16 pb-12 md:px-10 md:pt-24 md:pb-20"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/97 via-background/90 to-background/97 md:bg-gradient-to-r md:from-background md:via-background/88 md:to-background/45" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-gradient-to-b from-background/45 via-background/15 to-transparent md:w-[62%] md:bg-gradient-to-r md:from-background/55 md:via-background/25 md:to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-t from-transparent to-background" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-b from-transparent to-background" />

      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal className="max-w-3xl">
          <Chip>
            <ClipboardList size={14} strokeWidth={1.5} /> Banco de Questões 2026
          </Chip>
          <h2 className="mt-5 font-course text-[38px] leading-[1.05] font-bold text-heading sm:text-[46px] md:text-[58px]">
            <CourseName>Banco de Questões</CourseName>
          </h2>
          <h3 className="mt-4 max-w-2xl font-display text-xl leading-[1.25] font-semibold text-heading md:text-[28px]">
            Preparatório para a prova de Título em Oncologia
          </h3>
          <p className="mt-4 text-base leading-[1.6] text-muted-foreground md:text-lg">
            Prepare-se para a prova de Título de Especialista em Oncologia Clínica (TEOC) de forma
            estratégica com a 2ª edição do Banco de Questões, um ambiente de estudos exclusivo,
            dinâmico e eficiente.
          </p>
          <p className="mt-3 text-base leading-[1.6] text-muted-foreground">
            O banco possui 350 questões selecionadas das provas de título de especialista em
            Oncologia dos últimos 4 anos, incluindo a prova de 2025, revisadas e comentadas por
            especialistas do MOC em formato de vídeo.
          </p>
          <p className="mt-3 text-base leading-[1.6] text-muted-foreground">
            As questões estão organizadas em módulos temáticos para facilitar o estudo direcionado.
          </p>
          <p className="mt-3 text-base leading-[1.6] text-muted-foreground">
            Ao final do curso, realize um simulado com 50 questões, em um único acesso de 2 horas
            ininterruptas. O desempenho no simulado compõe a nota final do curso e a emissão do
            certificado.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 md:items-start">
          <Reveal className="glass rounded-lg p-5 sm:p-6">
            <h3 className="font-display text-lg font-semibold text-foreground">Como funciona?</h3>
            <ol className="mt-5 space-y-3">
              {STEPS.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="label-mono flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-[1.55] text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="glass rounded-lg p-5 sm:p-6">
            <h3 className="font-display text-lg font-semibold text-foreground">
              O que está incluso
            </h3>
            <ul className="mt-5 space-y-2.5">
              {FEATURES.map((f) => (
                <li key={f} className="flex gap-3 text-sm leading-[1.55] text-muted-foreground">
                  <CheckCircle2 size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-cyan" />
                  {f}
                </li>
              ))}
            </ul>
            <h3 className="mt-6 font-display text-lg font-semibold text-foreground">Para quem é?</h3>
            <p className="mt-2 text-sm leading-[1.55] text-muted-foreground">
              Médicos residentes de oncologia que prestarão a prova de título em 2026.
            </p>
            <p className="mt-2 text-sm leading-[1.55] text-muted-foreground">
              Aproveite essa nova ferramenta do MOC para reforçar seus estudos e aumentar sua
              confiança na prova de Título da SBOC!
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaButton href={checkoutUrl("questionBank", "banco-questoes")} className="w-full sm:w-auto">
            Quero o Banco de Questões
          </CtaButton>
          <CtaButton href="#inscricao" variant="outline" className="w-full sm:w-auto">
            Quero o Combo Completo
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
