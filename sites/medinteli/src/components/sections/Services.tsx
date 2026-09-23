import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  Bot,
  RefreshCw,
  Calendar,
  Bell,
  MessageSquare,
  Star,
  RotateCcw,
  BarChart3,
  Zap,
} from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "Atendimento humanizado",
    description: "Responde no WhatsApp 24 horas por dia, de forma natural, e encaminha para a equipe quando a conversa pede atenção humana.",
    color: "",
  },
  {
    icon: Calendar,
    title: "Agendamento",
    description: "O paciente escolhe o horário e confirma pelo WhatsApp, sem ligação e sem espera.",
    color: "",
  },
  {
    icon: Bell,
    title: "Lembrete de consulta",
    description: "Lembretes e confirmações automáticas antes da consulta, para ajudar a reduzir faltas.",
    color: "",
  },
  {
    icon: RefreshCw,
    title: "Remarcação",
    description: "Quando o paciente precisa remarcar, o sistema já oferece novos horários disponíveis.",
    color: "",
  },
  {
    icon: MessageSquare,
    title: "Follow-up sem resposta",
    description: "Retoma o contato com quem não respondeu, mantendo a jornada em movimento.",
    color: "",
  },
  {
    icon: Star,
    title: "NPS pós consulta",
    description: "Pesquisa de satisfação enviada automaticamente depois do atendimento.",
    color: "",
  },
  {
    icon: RotateCcw,
    title: "Lembrete de retorno",
    description: "Avisa o paciente quando chega a hora de voltar, cuidando da continuidade do tratamento.",
    color: "",
  },
  {
    icon: BarChart3,
    title: "Painel de acompanhamento",
    description: "Agendamentos, conversas, faltas e retornos reunidos para apoiar suas decisões.",
    color: "",
  },
];

/* ── Grade de fluxo responsiva ── */
const FlowGrid = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start end", "end center"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={lineRef} className="relative">
      {/* Progress rail */}
      <div className="relative h-[2px] bg-muted rounded-full overflow-hidden mb-6">
        <motion.div
          className="absolute inset-y-0 left-0 right-0 bg-brand origin-left"
          style={{ scaleX }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {services.map((service, index) => {
          const Icon = service.icon;
          const dark = index % 3 === 1;
          return (
            <motion.div
              key={service.title}
              className={`relative rounded-2xl p-4 sm:p-5 h-full transition-colors ${
                dark
                  ? "surface-deep border border-white/10 text-white shadow-lg"
                  : "bg-card border border-border hover:border-brand/40"
              }`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: (index % 4) * 0.06, duration: 0.4 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    dark ? "bg-white/10" : "bg-brand-tint"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${dark ? "text-white" : "text-brand"}`} />
                </div>
                <span className={`text-[11px] font-mono ${dark ? "text-white/50" : "text-brand/50"}`}>
                  0{index + 1}
                </span>
              </div>
              <h3
                className={`text-sm font-heading font-bold mb-1 ${
                  dark ? "text-white" : "text-foreground"
                }`}
              >
                {service.title}
              </h3>
              <p
                className={`text-xs leading-relaxed ${
                  dark ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                {service.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};


export const Services = () => {
  return (
    <section id="solucao" className="relative py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 overflow-visible">
        {/* Section header */}
        <ScrollReveal>
          <SectionTitle
            badge={{
              icon: <Zap className="w-4 h-4 text-brand" />,
              text: "A automação",
            }}
            title={
              <>
                Uma jornada mais inteligente,
                <br />
                <span className="text-brand shimmer-text">
                  do primeiro contato ao retorno
                </span>
              </>
            }
            subtitle="A automação conduz cada etapa pelo WhatsApp e avisa a equipe quando a atenção humana faz diferença."
          />
        </ScrollReveal>

        {/* Responsive layouts */}
        <FlowGrid />
      </div>
    </section>
  );
};
