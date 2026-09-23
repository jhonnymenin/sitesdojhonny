import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MessageCircleOff, CalendarX, UserMinus, RotateCcw, FolderSearch } from "lucide-react";

const pains = [
  { icon: MessageCircleOff, title: "Mensagens sem resposta", note: "Contato perdido no volume do dia" },
  { icon: CalendarX, title: "Consultas esquecidas", note: "Faltas que ninguém reagenda" },
  { icon: UserMinus, title: "Pacientes que somem", note: "Sem follow-up depois do 1º contato" },
  { icon: RotateCcw, title: "Retornos não agendados", note: "Receita recorrente que evapora" },
  { icon: FolderSearch, title: "Informação espalhada", note: "Conversas, planilhas e agendas soltas" },
];

export const PainPoints = () => {
  return (
    <section className="surface-deep py-14 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <p className="text-center text-xs tracking-[0.18em] uppercase text-brand-light mb-3">
            O custo invisível
          </p>
          <h2 className="max-w-2xl mx-auto text-center text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">
            Sua clínica pode estar perdendo oportunidades todos os dias
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-5xl mx-auto mt-8">
          {pains.map((pain, i) => (
            <ScrollReveal key={pain.title} delay={i * 0.06}>
              <div className="card-dark h-full p-4 flex lg:flex-col items-start gap-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-brand/20 border border-brand/30 shrink-0">
                  <pain.icon className="w-4 h-4 text-brand-light" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-white leading-snug">{pain.title}</p>
                  <p className="text-xs text-white/55 leading-snug mt-1">{pain.note}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.15}>
          <div className="max-w-3xl mx-auto mt-8 flex items-center gap-4">
            <span className="flow-line flex-1 !bg-white/15 hidden sm:block" />
            <p className="text-center text-sm sm:text-base text-white/75 leading-snug sm:shrink-0 sm:max-w-md">
              A MedInteli transforma esse ruído em processo: automação no WhatsApp e gestão em um só lugar.
            </p>
            <span className="flow-line flex-1 !bg-white/15 hidden sm:block" />
          </div>

        </ScrollReveal>
      </div>
    </section>
  );
};

