import { useEffect, useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { trackSectionOnce } from "@/lib/tracking";
import fotoCuidado from "@/assets/photo-cuidado-maos.jpg";

const rhythm = [
  "Automatizamos sem tornar o atendimento frio.",
  "Organizamos sem complicar.",
  "Conectamos sem perder a humanidade.",
];

export const Manifesto = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackSectionOnce("manifesto");
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="manifesto" className="photo-stage photo-stage-centered min-h-[620px] flex items-end py-12 sm:py-16 md:py-20">
      <img src={fotoCuidado} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6 text-left max-w-3xl">
            <ScrollReveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold leading-tight">
                <span className="photo-foreground">Automação com propósito.</span>{" "}
                <span className="text-brand-light">Tecnologia com sensibilidade.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-base sm:text-lg photo-muted leading-relaxed max-w-2xl">
                A automação não substitui o contato humano. Ela cuida do repetitivo e devolve tempo
                para a equipe estar onde é insubstituível: ao lado do paciente.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {rhythm.map((line) => (
                  <p
                    key={line}
                     className="text-sm photo-foreground leading-snug photo-panel rounded-lg px-4 py-4"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
