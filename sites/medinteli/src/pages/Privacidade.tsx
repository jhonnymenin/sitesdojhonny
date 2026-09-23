import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacidade = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 py-16 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-brand mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar para a página inicial
        </Link>

        <h1 className="text-3xl sm:text-4xl font-heading font-bold">Política de Privacidade</h1>
        <p className="text-sm text-muted-foreground mt-2">MedInteli</p>

        <div className="space-y-6 mt-8 text-base text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">1. Quem somos</h2>
            <p>
              A MedInteli oferece automação de atendimento por WhatsApp e uma plataforma de gestão
              para clínicas e consultórios. Esta política explica como tratamos os dados pessoais
              coletados neste site e na operação dos nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">2. Dados que coletamos</h2>
            <p>
              No site, coletamos os dados que você informa espontaneamente (como nome, e-mail,
              telefone e respostas do diagnóstico) e dados de navegação obtidos por cookies e
              ferramentas de medição, usados para entender o desempenho das nossas páginas e
              campanhas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">3. Como usamos os dados</h2>
            <p>
              Utilizamos as informações para responder ao seu contato, apresentar nossa solução,
              enviar o resultado do diagnóstico e melhorar nossos serviços e comunicações. Não
              vendemos dados pessoais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">4. Dados de pacientes</h2>
            <p>
              Quando a clínica contrata a MedInteli, ela permanece controladora dos dados dos seus
              pacientes e a MedInteli atua como operadora, tratando essas informações apenas para
              executar o atendimento, a agenda e o histórico contratados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">5. Compartilhamento</h2>
            <p>
              Podemos compartilhar dados com fornecedores de tecnologia necessários à prestação do
              serviço (como provedores de hospedagem, mensageria e análise), sempre limitados à
              finalidade contratada, ou quando exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">6. Seus direitos</h2>
            <p>
              Você pode solicitar a confirmação, o acesso, a correção, a portabilidade ou a exclusão
              dos seus dados, bem como revogar consentimentos, conforme a Lei Geral de Proteção de
              Dados (Lei 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">7. Contato</h2>
            <p>
              Para exercer seus direitos ou tirar dúvidas sobre esta política, escreva para{" "}
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

export default Privacidade;
