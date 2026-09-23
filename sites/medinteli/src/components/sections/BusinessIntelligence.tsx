import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GradientButton } from "@/components/ui/GradientButton";
import { CheckCircle2, ArrowRight, BarChart3, Minus } from "lucide-react";
import { QUIZ_LINK } from "@/constants";
import { buildQuizUrl, trackQuizClick } from "@/lib/tracking";
import fotoEquipe from "@/assets/photo-equipe-dados.jpg";

const comparisons = [
  {
    without: "A equipe passa boa parte do dia mandando mensagem, ligando e remarcando.",
    with: "O sistema conduz essas etapas e a equipe acompanha.",
  },
  {
    without: "O paciente que deveria voltar em alguns meses acaba esquecendo.",
    with: "O lembrete de retorno chega no WhatsApp na hora certa.",
  },
];

export const BusinessIntelligence = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-surface-alt overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal>
          <SectionTitle
            badge={{
              icon: <BarChart3 className="w-4 h-4 text-brand" />,
              text: "Antes e depois",
            }}
            title={
              <>
                O que muda na{" "}
                <span className="text-brand shimmer-text">rotina da equipe</span>
              </>
            }
            subtitle="Mesma clínica, mesma equipe, com o repetitivo saindo do caminho."
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          <ScrollReveal className="relative min-h-[360px] lg:min-h-full overflow-hidden rounded-2xl">
            <img
              src={fotoEquipe}
              alt="Equipe de uma clínica analisando indicadores de atendimento na tela do computador"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-transparent" />
          </ScrollReveal>

        <div className="space-y-4 sm:space-y-6">
          {comparisons.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-0 items-stretch">
                {/* Hoje */}
                <div className="relative bg-muted border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-background flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-heading font-bold text-muted-foreground">Hoje</span>
                    <p className="text-sm sm:text-base text-muted-foreground mt-1 leading-relaxed">
                      {item.without}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center px-4">
                  <ArrowRight className="w-6 h-6 text-brand" />
                </div>

                {/* Com a MedInteli */}
                <div className="relative bg-brand-tint border border-brand/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-background flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-heading font-bold text-brand">Com a MedInteli</span>
                    <p className="text-sm sm:text-base text-foreground mt-1 leading-relaxed">
                      {item.with}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        </div>

        <ScrollReveal>
          <div className="text-center mt-8 sm:mt-10">
            <a href={buildQuizUrl(QUIZ_LINK)} onClick={() => trackQuizClick("businessintelligence")} target="_blank" rel="noopener noreferrer">
              <GradientButton size="lg" className="group">
                Fazer diagnóstico gratuito
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </GradientButton>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
