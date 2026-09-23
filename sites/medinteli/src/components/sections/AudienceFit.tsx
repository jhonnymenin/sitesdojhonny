import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import fotoAmbiente from "@/assets/photo-ambiente-clinica.jpg";

const items = [
  { text: "Reduzir o volume de tarefas manuais da equipe", emphasis: false },
  { text: "Diminuir faltas e melhorar a ocupação da agenda", emphasis: false },
  { text: "Recuperar pacientes que deixaram de responder ou de retornar", emphasis: false },
  { text: "Organizar conversas, documentos e informações em um só lugar", emphasis: false },
  { text: "Padronizar processos sem padronizar o cuidado", emphasis: true },
  { text: "Ter dados mais claros para tomar decisões", emphasis: false },
];

export const AudienceFit = () => {
  return (
    <section className="relative bg-background py-12 sm:py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-14 items-stretch max-w-6xl mx-auto">
          <ScrollReveal className="relative min-h-[420px] sm:min-h-[520px] lg:min-h-[640px] overflow-hidden rounded-2xl">
            <img
              src={fotoAmbiente}
              alt="Sala de atendimento de uma clínica organizada e bem iluminada"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/20 to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 text-sm photo-muted">Uma operação mais organizada abre espaço para um atendimento mais presente.</p>
          </ScrollReveal>

          <div className="flex flex-col justify-center">
            <ScrollReveal>
              <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium text-foreground">
              Para clínicas que querem crescer sem perder a essência
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mt-5 leading-relaxed">
              A MedInteli foi feita para clínicas e consultórios que querem:
            </p>
              </div>
            </ScrollReveal>

          <div className="grid grid-cols-1 gap-y-5 mt-8">
            {items.map((item, i) => (
              <ScrollReveal key={item.text} delay={i * 0.06}>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                  <span
                    className={`text-base text-foreground leading-relaxed ${
                      item.emphasis ? "font-medium" : ""
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
