import { BrainCircuit, CheckCircle2, FileText } from "lucide-react";
import banner from "@/assets/banner-oncoia.png";
import { Chip, CourseName, CtaButton, Reveal } from "./primitives";
import { checkoutUrl } from "@/lib/checkout";

const HIGHLIGHTS = [
  "IA na prática clínica",
  "Jornada completa do paciente",
  "Workshop de implementação",
  "Ferramentas de uso imediato",
];

const JOURNEY = [
  "Rastreamento e diagnóstico",
  "Diagnóstico de precisão",
  "Decisão terapêutica",
  "Tratamento personalizado",
  "Monitoramento e análise de desfechos",
];

const SPECS = [
  "Conteúdo validado",
  "13 aulas + workshop",
  "Mais de 11 horas",
  "Acesso on demand",
  "Certificação WorldMed Academy + MOC",
];

const MATERIALS = [
  "Prompts testados",
  "Checklists de adoção",
  "Comparativos de ferramentas",
  "Mapas de testes moleculares",
  "Modelos para pacientes",
  "Guias de implementação",
];

export function OncoIA() {
  return (
    <section
      id="oncoia"
      className="relative isolate overflow-hidden bg-cover bg-center px-5 pt-16 pb-12 md:px-10 md:pt-24 md:pb-20"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/92 via-background/84 to-background/95 md:bg-gradient-to-r md:from-background/98 md:via-background/82 md:to-background/38" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-gradient-to-b from-background/55 via-background/20 to-transparent md:w-[64%] md:bg-gradient-to-r md:from-background/75 md:via-background/30 md:to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-t from-transparent to-background" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-b from-transparent to-background" />

      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal className="max-w-3xl">
          <Chip>
            <BrainCircuit size={14} strokeWidth={1.5} /> Onco IA
          </Chip>
          <h2 className="mt-5 font-course text-[38px] leading-[1.05] font-bold text-heading sm:text-[46px] md:text-[58px]">
            <CourseName>Onco IA</CourseName>
          </h2>
          <h3 className="mt-4 max-w-2xl font-display text-xl leading-[1.25] font-semibold text-heading md:text-[28px]">
            O presente e o futuro da Oncologia com Inteligência Artificial
          </h3>
          <p className="label-mono mt-4 text-cyan">
            Aulas ao vivo · Início em 17 de novembro de 2026
          </p>
          <p className="mt-3 text-base leading-[1.6] text-muted-foreground md:text-lg">
            IA aplicada ao diagnóstico, à decisão clínica e a toda a jornada do paciente.
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <Reveal as="li" key={h} className="glass rounded-lg p-4 text-sm text-foreground">
              {h}
            </Reveal>
          ))}
        </ul>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Reveal className="glass rounded-lg p-5 sm:p-6">
            <p className="label-mono text-cyan">Coordenação acadêmica</p>
            <ul className="mt-3 space-y-1.5 text-base text-foreground">
              <li>Dra. Camilla Yamada</li>
              <li>Dr. Felipe Roth</li>
              <li>Dr. Thiago William Carnier Jorge</li>
            </ul>
            <p className="label-mono mt-6 text-cyan">Embaixador</p>
            <p className="mt-2 text-base text-foreground">Dr. Antonio Carlos Buzaid</p>
          </Reveal>

          <Reveal className="glass rounded-lg p-5 sm:p-6">
            <p className="label-mono text-cyan">Da detecção aos desfechos</p>
            <ul className="mt-4 space-y-2.5">
              {JOURNEY.map((j) => (
                <li key={j} className="flex gap-3 text-sm leading-[1.55] text-muted-foreground">
                  <CheckCircle2 size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-cyan" />
                  {j}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {SPECS.map((s) => (
            <span
              key={s}
              className="rounded-sm border border-border px-3.5 py-1.5 text-sm text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <Reveal className="glass mt-6 rounded-lg p-5 sm:p-6">
          <p className="text-base leading-[1.6] text-foreground">
            Cada aluno conclui o curso com um plano para implementar a IA na rotina profissional em
            até 30 dias.
          </p>
          <p className="label-mono mt-6 flex items-center gap-2 text-cyan">
            <FileText size={14} strokeWidth={1.5} /> Materiais complementares
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {MATERIALS.map((m) => (
              <li key={m} className="flex gap-3 text-sm leading-[1.55] text-muted-foreground">
                <CheckCircle2 size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-cyan" />
                {m}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-[1.55] text-muted-foreground">
            Conheça boas práticas, limites e critérios para uma adoção ética e segura.
          </p>
        </Reveal>

        <Reveal className="mt-8">
          {/* Onco IA não é comercializado avulso nesta página. */}
          <CtaButton href={checkoutUrl("comboCompleto", "onco-ia")} className="w-full sm:w-auto">
            Incluir o Onco IA no Combo
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
