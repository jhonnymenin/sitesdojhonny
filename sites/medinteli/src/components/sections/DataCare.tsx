import { ShieldCheck, UserCheck, FileText } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const items = [
  {
    icon: ShieldCheck,
    title: "Finalidade definida",
    text: "As informações são usadas para conduzir o atendimento, a agenda e o histórico do paciente. Nada além disso.",
  },
  {
    icon: UserCheck,
    title: "Controle da clínica",
    text: "Você define quem da equipe acessa o quê dentro da plataforma, e pode solicitar exportação ou exclusão dos dados.",
  },
  {
    icon: FileText,
    title: "Termos claros",
    text: "Nosso contrato descreve como os dados são tratados, por quanto tempo e sob quais condições.",
  },
];

export const DataCare = () => {
  return (
    <section id="dados" className="bg-surface-alt py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold leading-[1.15] tracking-tight text-center text-balance max-w-3xl mx-auto">
            Dado de paciente é assunto sério
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-center max-w-2xl mx-auto mt-4 leading-relaxed">
            Sua clínica continua sendo a responsável pelos dados dos seus pacientes. Nosso papel é
            processar essas informações apenas para operar o atendimento que você contratou.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mt-10">
          {items.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <div className="h-full bg-card border border-border rounded-2xl p-6">
                <item.icon aria-hidden="true" className="w-6 h-6 text-brand" />
                <h3 className="text-lg font-heading font-bold text-foreground mt-4">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="/politica-de-privacidade" className="text-sm text-brand underline">
            Ler nossa política de privacidade
          </a>
        </div>
      </div>
    </section>
  );
};
