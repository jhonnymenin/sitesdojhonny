import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CheckCircle2, Sparkles, MessageSquare, Clock, RefreshCw } from "lucide-react";

const features = [
  {
    icon: RefreshCw,
    title: "Cobertura completa do ciclo do paciente",
    tagline: "Acompanhamento contínuo",
    benefits: ["Atendimento 24h", "Agendamento e remarcação", "Lembretes e follow-ups", "NPS e retorno"],
    gradient: "",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp nativo, linguagem real",
    tagline: "No canal que o paciente já usa",
    benefits: ["Mensagens humanizadas", "Personalização por clínica", "Respostas instantâneas", "Sem app para instalar"],
    gradient: "",
  },
  {
    icon: Clock,
    title: "Implantação acompanhada, do início ao uso",
    tagline: "Sem instalar aplicativo",
    benefits: ["Implantação acompanhada", "Zero instalação", "Treinamento simples", "Suporte contínuo"],
    gradient: "",
  },
];

export const Features = () => {
  return (
    <section id="features" className="relative py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <ScrollReveal>
          <SectionTitle
            badge={{
              icon: <Sparkles className="w-4 h-4 text-brand" />,
              text: "Diferenciais",
            }}
            title={
              <>
                A tecnologia assume o repetitivo.
                <br />
                <span className="text-brand shimmer-text">
                  Sua equipe assume o que importa.
                </span>
              </>
            }
            subtitle="Com a MedInteli, o atendimento não depende de alguém lembrar cada mensagem, confirmação ou retorno."
          />
        </ScrollReveal>

        {/* Features */}
        <div className="space-y-4 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.08}>
              <div className="group grid lg:grid-cols-[1.1fr_0.9fr] gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_20px_44px_-24px_rgba(0,0,0,0.4)] hover:-translate-y-0.5">
                {/* Conteúdo */}
                <div className="p-5 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand-tint">
                      <feature.icon className="w-5 h-5 text-brand" />
                    </span>
                    <span className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-2xl font-heading font-bold text-foreground leading-snug mb-4">
                    {feature.title}
                  </h3>

                  <ul className="flex flex-wrap gap-2">
                    {feature.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-alt px-2.5 py-1 text-[11px] sm:text-[13px] text-foreground/75"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Painel de destaque — contraste alternado */}
                <div
                  className={`relative flex items-center px-5 py-4 sm:p-8 ${
                    index % 2 === 0 ? "surface-deep" : "bg-gradient-brand"
                  }`}
                >
                  <div className="absolute top-0 left-0 h-full w-px bg-white/10 hidden lg:block" />
                  <p
                    className={`text-base sm:text-2xl font-heading font-bold leading-snug ${
                      index % 2 === 0 ? "text-white" : "text-primary-foreground"
                    }`}
                  >
                    {feature.tagline}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed text-center mt-8 px-4">
            A plataforma mantém a jornada em movimento e sinaliza quando a atenção humana é necessária.
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
};
