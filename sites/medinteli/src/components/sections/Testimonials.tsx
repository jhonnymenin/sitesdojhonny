import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GradientButton } from "@/components/ui/GradientButton";
import { ArrowRight, MessageSquare, Shield, Clock, UserCheck } from "lucide-react";
import { WA_DEMO } from "@/constants";
import { trackWhatsappClick } from "@/lib/tracking";

const badges = [
  { icon: Shield, text: "Sem compromisso" },
  { icon: UserCheck, text: "Demo personalizada" },
  { icon: Clock, text: "Resposta em até 24h" },
];

export const Testimonials = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-card/90 border border-border mb-4 sm:mb-6">
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand" />
              <span className="text-xs sm:text-sm text-muted-foreground">Veja na prática</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 sm:mb-6">
              Quer ver funcionando{" "}
              <span className="text-brand shimmer-text">
                antes de decidir?
              </span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Agende uma demonstração gratuita de 15 minutos. Mostramos o sistema rodando ao vivo, com cenários reais de clínicas como a sua. Sem compromisso, sem pressão.
            </p>

            {/* CTA */}
            <a href={WA_DEMO} onClick={() => trackWhatsappClick("testimonials")} target="_blank" rel="noopener noreferrer">
              <GradientButton size="lg" className="group">
                Agendar Minha Demo Gratuita
                <ArrowRight className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </GradientButton>
            </a>

            {/* Trust badges */}
            <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-4 sm:gap-6">
              {badges.map((badge) => (
                <motion.div
                  key={badge.text}
                  className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-card/80 border border-border"
                  whileHover={{ scale: 1.05 }}
                >
                  <badge.icon className="w-4 h-4 text-brand flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-muted-foreground">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
