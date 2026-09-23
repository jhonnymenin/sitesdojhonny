import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GradientButton } from "@/components/ui/GradientButton";
import { Check, Star, Zap, Building2, MessageSquare } from "lucide-react";
import { WA_DEMO, QUIZ_LINK } from "@/constants";
import { buildQuizUrl, trackQuizClick, trackWhatsappClick } from "@/lib/tracking";

const features = [
  "Atendimento humanizado 24h no WhatsApp",
  "Agendamento e remarcação automáticos",
  "Lembretes de consulta e de retorno",
  "Follow-up para quem não responde",
  "NPS pós consulta automático",
  "Plataforma de gestão completa (CRM)",
  "Cadastro de pacientes e médicos",
  "Documentos do paciente salvos automaticamente",
  "Agenda integrada em tempo real",
  "Conversa com pacientes pela plataforma",
  "Dashboard de acompanhamento",
  "Suporte dedicado e implantação acompanhada",
];

export const Pricing = () => {
  return (
    <section id="pricing" className="relative py-12 sm:py-16 md:py-20 bg-surface-alt">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal>
          <SectionTitle
            badge={{
              icon: <Star className="w-4 h-4 text-brand" />,
              text: "Plano",
            }}
            title={
              <>
                Automação e plataforma
                <br />
                <span className="text-brand shimmer-text">
                  em um plano só
                </span>
              </>
            }
            subtitle="Tudo que sua clínica precisa para conduzir a jornada do paciente e organizar a gestão."
          />
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <motion.div
              className="fx-glow-border relative bg-card border border-brand/40 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-sm"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-tint" />

              <motion.div
                className="absolute -top-3 sm:-top-4 right-4 sm:right-6 px-4 sm:px-6 py-1.5 rounded-full bg-brand-tint text-brand text-xs sm:text-sm font-medium flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Tudo Incluso
              </motion.div>

              <div className="text-center mb-6 sm:mb-8 pt-4">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-brand-tint border border-border mb-4">
                  <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-brand" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-2">Plano completo MedInteli</h3>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Automação no WhatsApp e plataforma de gestão completa. Tudo em um plano só.
                </p>
              </div>

              {/* Features grid — animate container once instead of each item */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand/20 text-brand flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm sm:text-base text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </motion.div>

              <a href={WA_DEMO} onClick={() => trackWhatsappClick("pricing")} target="_blank" rel="noopener noreferrer" className="block">
                <GradientButton variant="primary" className="w-full" size="lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Falar com especialista
                </GradientButton>
              </a>

              <p className="text-center text-sm text-muted-foreground mt-4">
                <a href={buildQuizUrl(QUIZ_LINK)} onClick={() => trackQuizClick("pricing")} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-brand transition-colors">
                  Ainda em dúvida? Faça o diagnóstico gratuito
                </a>
              </p>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
