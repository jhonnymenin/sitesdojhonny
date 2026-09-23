import { Check, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GradientButton } from "@/components/ui/GradientButton";
import { QUIZ_LINK } from "@/constants";
import { buildQuizUrl, trackQuizClick } from "@/lib/tracking";
import fotoRecepcao from "@/assets/photo-recepcao-paciente.jpg";

const benefits = [
  "Tenha uma visão mais clara dos gargalos do atendimento",
  "Identifique perdas relacionadas a faltas, retornos e contatos sem continuidade",
  "Entenda quais etapas podem ser automatizadas sem perder a humanização",
  "Receba um diagnóstico personalizado para a realidade da sua clínica",
];

export const DiagnosticBridge = () => {
  return (
    <section className="bg-surface-alt py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium text-foreground">
                Antes de automatizar, descubra onde sua clínica perde
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mt-5 leading-relaxed mx-auto lg:mx-0">
                Em poucos passos, o diagnóstico gratuito analisa pontos da sua operação e
                apresenta oportunidades reais de recuperação com automação inteligente.
              </p>

              <div className="mt-8">
                <a href={buildQuizUrl(QUIZ_LINK)} onClick={() => trackQuizClick("diagnosticbridge")} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
                  <GradientButton className="group w-full sm:w-auto min-h-[52px]">
                    Descobrir quanto minha clínica pode recuperar
                    <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </GradientButton>
                </a>
                <p className="text-sm text-muted-foreground mt-3">
                  Gratuito, rápido e personalizado.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="space-y-6">
              <img
                src={fotoRecepcao}
                alt="Profissional de saúde atendendo uma paciente na clínica"
                loading="lazy"
                className="w-full h-56 sm:h-64 object-cover rounded-2xl shadow-sm"
              />
              <ul className="space-y-5">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                    <span className="text-base text-foreground leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
