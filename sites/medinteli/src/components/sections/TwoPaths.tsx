import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GradientButton } from "@/components/ui/GradientButton";
import { ArrowRight } from "lucide-react";
import { QUIZ_LINK, WA_DEMO } from "@/constants";
import { buildQuizUrl, trackQuizClick, trackWhatsappClick } from "@/lib/tracking";

export const TwoPaths = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-surface-alt">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold leading-[1.15] tracking-tight text-center text-balance max-w-3xl mx-auto">
            Dois caminhos. <span className="text-brand shimmer-text">Um próximo passo.</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
          <ScrollReveal direction="left">
            <div className="h-full flex flex-col bg-card border border-brand rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground leading-snug">
                Ainda não sabe quanto sua clínica está perdendo?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed flex-1">
                Comece pelo diagnóstico gratuito e identifique os principais gargalos e oportunidades da sua operação.
              </p>
              <a href={buildQuizUrl(QUIZ_LINK)} onClick={() => trackQuizClick("twopaths")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block">
                <GradientButton size="lg" className="group w-full">
                  Fazer diagnóstico gratuito
                  <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </GradientButton>
              </a>
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 text-center">
                Resultado personalizado em cerca de 90 segundos.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="h-full flex flex-col bg-card border border-border rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground leading-snug">
                Já quer conhecer a solução?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed flex-1">
                Veja como a MedInteli integra atendimento, agenda, automações e gestão para acompanhar toda a jornada do paciente.
              </p>
              <a href={WA_DEMO} onClick={() => trackWhatsappClick("twopaths")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block">
                <GradientButton variant="outline" size="lg" className="w-full">
                  Falar com especialista
                </GradientButton>
              </a>
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 text-center">
                Conversa direta, sem compromisso.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
