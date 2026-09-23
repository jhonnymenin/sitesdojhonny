import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Layers, MessageCircle, LayoutDashboard, Check, ArrowLeftRight, ArrowDown } from "lucide-react";

const whatsappPoints = [
  "Atende 24h de forma humanizada",
  "Agenda, remarca e confirma sozinha",
  "Faz follow-up de quem some",
  "Lembra do retorno e mede satisfação",
];

const platformPoints = [
  "Cadastro de pacientes e médicos",
  "Conversa e atende dentro do sistema",
  "Documentos do WhatsApp salvos sozinhos",
  "Agenda integrada e painel de resultados",
];

export const SystemOverview = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionTitle
          badge={{
            icon: <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand" />,
            text: "Como funciona o sistema",
          }}
          title={
            <>
              <span className="text-foreground">Não é só um robô de WhatsApp.</span>
              <br />
              <span className="text-brand shimmer-text">
                É o sistema que cuida da sua clínica inteira.
              </span>
            </>
          }
          subtitle="A MedInteli funciona em duas pontas conectadas: uma conversa com o paciente, a outra organiza tudo para você."
        />

        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-4 mt-8 sm:mt-10 max-w-6xl mx-auto">
          {/* Ponta 1: WhatsApp / Automação */}
          <ScrollReveal direction="left" className="flex-1">
            <div className="relative h-full bg-card border border-border rounded-2xl p-6 sm:p-8 overflow-hidden group transition-all duration-500 hover:border-brand/30">
              <div className="absolute inset-0 bg-brand-tint opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-brand-tint flex items-center justify-center mb-4 shadow-sm">
                  <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                </div>
                <span className="inline-block text-[11px] sm:text-xs text-brand font-medium mb-2">
                  No WhatsApp
                </span>
                <h3 className="text-lg sm:text-2xl font-heading font-bold text-foreground mb-4 leading-tight">
                  A automação conversa com o paciente
                </h3>
                <ul className="space-y-2.5">
                  {whatsappPoints.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-muted-foreground">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Conector central */}
          <div className="flex lg:flex-col items-center justify-center gap-3 lg:gap-2 lg:w-40 shrink-0">
            {/* Desktop: horizontal */}
            <motion.div
              className="hidden lg:flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-brand-tint flex items-center justify-center shadow-sm">
                <ArrowLeftRight className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-[10px] font-medium text-brand text-center leading-tight">
                conectados em<br />tempo real
              </span>
            </motion.div>

            {/* Mobile: vertical */}
            <motion.div
              className="flex lg:hidden flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-11 h-11 rounded-full bg-brand-tint flex items-center justify-center shadow-sm">
                <ArrowDown className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-[10px] font-medium text-brand">
                conectados em tempo real
              </span>
            </motion.div>
          </div>

          {/* Ponta 2: Plataforma / Gestão */}
          <ScrollReveal direction="right" className="flex-1">
            <div className="relative h-full bg-card border border-border rounded-2xl p-6 sm:p-8 overflow-hidden group transition-all duration-500 hover:border-brand-light/30">
              <div className="absolute inset-0 bg-brand-tint opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-brand-tint flex items-center justify-center mb-4 shadow-sm">
                  <LayoutDashboard className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                </div>
                <span className="inline-block text-[11px] sm:text-xs text-brand font-medium mb-2">
                  Na plataforma
                </span>
                <h3 className="text-lg sm:text-2xl font-heading font-bold text-foreground mb-4 leading-tight">
                  A clínica gerencia tudo em um lugar
                </h3>
                <ul className="space-y-2.5">
                  {platformPoints.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-muted-foreground">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Frase de fechamento */}
        <ScrollReveal>
          <p className="text-base sm:text-lg md:text-xl text-center text-muted-foreground max-w-3xl mx-auto mt-8 sm:mt-10 px-2">
            O que o paciente faz no WhatsApp aparece organizado na sua plataforma.{" "}
            <span className="text-foreground font-medium">Um não existe sem o outro.</span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
