import { motion } from "framer-motion";
import { GradientButton } from "@/components/ui/GradientButton";
import { Bot, ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { QUIZ_LINK, WA_DEMO } from "@/constants";
import { buildQuizUrl, trackQuizClick, trackWhatsappClick } from "@/lib/tracking";
import heroConsulta from "@/assets/photo-consulta-humana.jpg";

const chatMessages = [
  { from: "patient", text: "Oi, preciso remarcar minha consulta de amanhã", delay: 0.8 },
  { from: "bot", text: "Claro! Tenho horários na quinta às 14h ou sexta às 10h. Qual fica melhor pra você?", delay: 1.8 },
  { from: "patient", text: "Quinta às 14h", delay: 2.8 },
  { from: "bot", text: "Pronto, remarcado para quinta às 14h. Vou te lembrar na véspera.", delay: 3.8 },
];

const ChatMock = ({ className = "", showCaption = true }: { className?: string; showCaption?: boolean }) => (
  <div
    className={className}
    role="img"
    aria-label="Simulação de conversa no WhatsApp: uma paciente pede para remarcar a consulta e a automação da MedInteli oferece novos horários, confirma a quinta-feira às 14h e avisa que enviará um lembrete na véspera."
  >
    <motion.div
      className="bg-card border border-border rounded-2xl p-5 shadow-sm"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="flex-1 text-left">
          <span className="text-sm font-heading font-bold text-foreground">MedInteli</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-brand" />
            <span className="text-[10px] text-muted-foreground">Online</span>
          </div>
        </div>
      </div>

      {/* Chat bubbles */}
      <div className="space-y-3">
        {chatMessages.map((msg, i) => (
          <motion.div
            key={i}
            className={`flex ${msg.from === "patient" ? "justify-start" : "justify-end"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: msg.delay, duration: 0.4 }}
          >
            <div
              className={`px-3 py-2 rounded-xl text-xs leading-relaxed max-w-[85%] text-left ${
                msg.from === "patient"
                  ? "bg-muted text-foreground rounded-tl-sm"
                  : "bg-brand-tint text-foreground border border-brand/20 rounded-tr-sm"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>

    {showCaption && (
      <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
        Conversa real conduzida pela automação. Quando precisa de atenção humana, a equipe assume.
      </p>
    )}
  </div>
);

export const Hero = () => {
  return (
    <section className="photo-stage min-h-[760px] sm:min-h-[800px] lg:min-h-[860px] flex items-center pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
      <img
        src={heroConsulta}
        alt=""
        aria-hidden="true"
        loading="eager"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[64%_center] sm:object-center"
      />
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,.65fr)] lg:items-end gap-10 lg:gap-16">
          {/* Left column */}
          <div className="text-left max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-card/10 px-3 py-1.5 text-xs sm:text-sm font-medium photo-foreground mb-5 backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-brand" />
              Automação inteligente para clínicas médicas
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-5 sm:mb-6 max-w-3xl leading-[1.08] photo-foreground"
            >
              Mais inteligência para a clínica.
              <br />
              <span className="text-brand-light">Mais tempo para cuidar.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg photo-muted max-w-2xl leading-relaxed mb-7 sm:mb-8"
            >
              Automação via WhatsApp e uma plataforma completa para organizar o atendimento,
              reduzir perdas e acompanhar toda a jornada do paciente, sem transformar o cuidado
              em uma conversa fria e impessoal.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center"
            >
              <a href={buildQuizUrl(QUIZ_LINK)} onClick={() => trackQuizClick("hero")} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <GradientButton className="group w-full sm:w-auto min-h-[52px]">
                  Fazer meu diagnóstico gratuito
                  <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </GradientButton>
              </a>
              <a href={WA_DEMO} onClick={() => trackWhatsappClick("hero")} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <GradientButton variant="onDarkOutline" className="w-full sm:w-auto min-h-[52px]">
                  <Phone className="inline-block mr-2 w-4 h-4" />
                  Falar com especialista
                </GradientButton>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-sm photo-muted mt-4 sm:mt-5"
            >
              Descubra em cerca de 90 segundos onde sua clínica pode estar perdendo oportunidades.
            </motion.p>

          </div>

          {/* Prova visual do atendimento */}
          <motion.div
            className="w-full max-w-md lg:justify-self-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="photo-panel rounded-2xl p-3 sm:p-4 shadow-lg">
              <ChatMock showCaption={false} />
              <div className="flex items-center gap-2 px-1 pt-3 text-xs photo-muted">
                <CheckCircle2 className="h-4 w-4 text-brand-light flex-none" />
                A automação conduz. Sua equipe assume quando necessário.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
