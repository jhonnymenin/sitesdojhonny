import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Termos = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 py-16 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-brand mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar para a página inicial
        </Link>

        <h1 className="text-3xl sm:text-4xl font-heading font-bold">Termos de Uso</h1>
        <p className="text-sm text-muted-foreground mt-2">MedInteli</p>

        <div className="space-y-6 mt-8 text-base text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">1. Aceitação</h2>
            <p>
              Ao navegar neste site ou utilizar os serviços da MedInteli, você concorda com estes
              termos. Se não concordar, recomendamos não utilizar o site nem contratar os serviços.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">2. Sobre o serviço</h2>
            <p>
              A MedInteli fornece automação de atendimento por WhatsApp e uma plataforma de gestão
              para clínicas. O escopo, os prazos e os valores de cada contratação são definidos na
              proposta comercial e no contrato firmado com a clínica.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">3. Uso adequado</h2>
            <p>
              O contratante se compromete a utilizar a plataforma de forma lícita, respeitando as
              regras do WhatsApp, a legislação de saúde aplicável e a proteção de dados dos
              pacientes. É vedado o envio de mensagens não autorizadas pelos destinatários.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">4. Responsabilidades</h2>
            <p>
              A MedInteli não substitui avaliação clínica nem decisões médicas. As informações
              apresentadas no diagnóstico gratuito são estimativas baseadas nas respostas fornecidas
              e têm caráter informativo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">5. Propriedade intelectual</h2>
            <p>
              Marca, textos, layout, software e materiais deste site pertencem à MedInteli e não
              podem ser reproduzidos sem autorização prévia por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">6. Alterações e contato</h2>
            <p>
              Estes termos podem ser atualizados a qualquer momento, com publicação nesta página.
              Dúvidas podem ser enviadas para{" "}
              <a href="mailto:contato@medinteli.com" className="text-brand underline">
                contato@medinteli.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Termos;
