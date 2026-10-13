import {
  PlayCircle,
  CalendarClock,
  Users,
  Radio,
  Award,
  ClipboardList,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { CtaButton, Reveal, Section, SectionTitle } from "./primitives";
import { checkoutUrl } from "@/lib/checkout";

const RECEIVES = [
  { icon: PlayCircle, text: "Cerca de 140 aulas cobrindo as áreas da oncologia" },
  { icon: Users, text: "Participação de +60 especialistas do Brasil" },
  { icon: CalendarClock, text: "Acesso por 1 ano" },
  { icon: Award, text: "Certificado de conclusão" },
  { icon: Radio, text: "BÔNUS - 5 encontros on-line ao vivo" },
  { icon: ClipboardList, text: "BÔNUS - Banco de Questões (3 meses)" },
  { icon: Sparkles, text: "BÔNUS - Assinatura MOC após conclusão do curso (60 dias)" },
  { icon: Layers, text: "Opção de Combo com Onco IA" },
];

/*
 * Público-alvo, que antes era uma seção inteira entre a programação e o Banco
 * de Questões. Virou um bloco daqui: são seis linhas de qualificação, não
 * justificavam uma parada própria no meio da página — e quem está decidindo
 * quer saber "é para mim?" junto com "o que eu recebo", não três rolagens
 * depois.
 */
const AUDIENCE = [
  "Residentes de Clínica Médica que buscam aprofundamento em Oncologia",
  "Residentes de Oncologia em busca uma revisão abrangente",
  "Oncologistas em preparação para a prova de título de especialista",
  "Oncologistas experientes em busca de atualização rápida",
  "Profissionais de Saúde envolvidos no tratamento do câncer",
  "Assinantes do MOC que buscam formação e atualização contínuas",
];

export function About() {
  return (
    <Section id="sobre">
      <Reveal className="max-w-3xl">
        <SectionTitle>Conteúdo on-line 100% atualizado</SectionTitle>
        <p className="mt-4 text-base leading-[1.6] text-muted-foreground md:text-lg">
          Revisão dos principais temas da oncologia de forma rápida e abrangente.
        </p>
      </Reveal>

      <Reveal className="mt-10">
        <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
          O que você recebe
        </h3>
      </Reveal>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {RECEIVES.map(({ icon: Icon, text }) => (
          <Reveal as="li" key={text} className="glass flex gap-3 rounded-lg p-4">
            <Icon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-electric" />
            <span className="text-sm leading-[1.5] text-muted-foreground">{text}</span>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-12">
        <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
          Para quem é
        </h3>
      </Reveal>
      <ul className="mt-6 grid gap-x-8 gap-y-3 md:grid-cols-2">
        {AUDIENCE.map((item) => (
          <Reveal as="li" key={item} className="flex gap-3">
            <CheckCircle2 size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-cyan" />
            <span className="text-sm leading-[1.55] text-muted-foreground">{item}</span>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-10">
        {/* Item 5 do PDF: vai direto ao checkout do combo de 2 cursos. */}
        <CtaButton href={checkoutUrl("comboIntensivo", "sobre")} className="w-full sm:w-auto">
          Realizar a inscrição
        </CtaButton>
      </Reveal>
    </Section>
  );
}
