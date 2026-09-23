import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight, Phone } from "lucide-react";
import { QUIZ_LINK, WA_DEMO } from "@/constants";
import { buildQuizUrl, trackQuizClick, trackWhatsappClick } from "@/lib/tracking";

export const CTA = () => {
  return (
    <section id="cta-final" className="relative py-12 sm:py-16 md:py-20 surface-deep overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-5 sm:mb-6 px-2 leading-[1.15] text-white">
            Mais inteligência para a clínica.
            <br />
            <span className="text-brand-light">Mais tempo para cuidar.</span>
          </h2>

          <p className="text-base sm:text-lg text-white/75 mb-8 sm:mb-10 max-w-2xl mx-auto px-4 leading-relaxed">
            Descubra onde sua clínica perde tempo, pacientes e oportunidades, e como recuperar com automação inteligente sem abrir mão da humanidade.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <a href={buildQuizUrl(QUIZ_LINK)} onClick={() => trackQuizClick("cta")} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <span className="group inline-flex items-center justify-center w-full sm:w-auto sm:min-w-[260px] rounded-full bg-gradient-brand text-primary-foreground font-semibold px-7 py-3.5 text-sm sm:text-base transition-transform hover:-translate-y-0.5">
                Começar meu diagnóstico gratuito
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a href={WA_DEMO} onClick={() => trackWhatsappClick("cta")} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <span className="inline-flex items-center justify-center w-full sm:w-auto sm:min-w-[220px] rounded-full border border-white/40 text-white font-medium px-7 py-3.5 text-sm sm:text-base transition-colors hover:bg-white/10">
                <Phone className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Falar com especialista
              </span>
            </a>
          </div>

          <p className="mt-8 text-sm text-white/60">Gratuito e sem compromisso.</p>
        </ScrollReveal>
      </div>
    </section>
  );
};
