import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "A MedInteli substitui minha equipe?",
    a: "Não. Ela automatiza tarefas repetitivas e organiza a jornada. Quando uma situação exige sensibilidade, avaliação ou atenção individual, o atendimento pode seguir com uma pessoa da equipe.",
  },
  {
    q: "O paciente precisa instalar algum aplicativo?",
    a: "Não. A experiência acontece pelo WhatsApp, um canal que o paciente já conhece e utiliza.",
  },
  {
    q: "O sistema ajuda a reduzir faltas?",
    a: "A MedInteli automatiza confirmações, lembretes e remarcações, ajudando a equipe a atuar de forma mais consistente sobre as causas operacionais das faltas.",
  },
  {
    q: "É possível acompanhar pacientes que não responderam?",
    a: "Sim. A plataforma permite estruturar follow-ups e manter a continuidade do contato sem depender de controles manuais.",
  },
  {
    q: "O diagnóstico é realmente gratuito?",
    a: "Sim. O diagnóstico inicial é gratuito, rápido e apresenta oportunidades de recuperação de acordo com as respostas fornecidas.",
  },
  {
    q: "Como funciona o atendimento pelo WhatsApp da clínica?",
    a: "A automação opera no número da sua clínica. Conversas, agendamentos e documentos ficam registrados na plataforma para a equipe consultar quando precisar.",
  },
  {
    q: "O que acontece com os dados se eu encerrar o contrato?",
    a: "Você pode solicitar a exportação das informações da sua clínica. As condições de retenção e exclusão estão descritas em contrato.",
  },
  {
    q: "Por onde devo começar?",
    a: "Se você ainda não conhece os gargalos da clínica, faça o diagnóstico gratuito. Se já busca uma solução para automatizar e organizar o atendimento, fale com um especialista.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="relative py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold leading-[1.15] tracking-tight text-center text-balance max-w-3xl mx-auto">
            Perguntas frequentes
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto mt-8">
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                <AccordionTrigger className="text-left text-base sm:text-lg font-heading font-medium py-5 hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
};
