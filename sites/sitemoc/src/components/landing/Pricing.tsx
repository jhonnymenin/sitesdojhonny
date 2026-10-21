import { ArrowRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chip, CtaButton, Reveal, Section, SectionTitle } from "./primitives";
import { checkoutUrl } from "@/lib/checkout";


/*
 * Evolução dos lotes. Os valores são os que o checkout cobra, não uma conta
 * feita aqui: a plataforma aplica o cupom sobre o combo inteiro.
 *
 * Conferidos em 20/10/2026 abrindo o carrinho com o cupom vigente 15REDES, em
 * perfil de navegador novo para cada URL — o carrinho acumula entre medições.
 *   combo completo    → de R$ 3.799,00 por R$ 3.264,00, ou 2x de R$ 1.632,00
 *   combo de 2 cursos → de R$ 2.900,00 por R$ 2.465,00, ou 2x de R$ 1.232,50
 *
 * O cupom tira R$ 535 FIXOS do combo completo, não 15%: dá 14,08%. No combo de
 * 2 cursos dá 15% exatos. É o mesmo comportamento do lote de lançamento, e o
 * motivo de a página dizer "até 15%".
 *
 * Estes números valiam R$ 3.229,15 em 19/10 e mudaram no dia seguinte sem
 * mudança de lote: o MOC alterou o próprio cupom. Preço nesta página não
 * envelhece só na virada de lote — reconferir sempre.
 *
 * O lote de lançamento saiu da tabela por ter acabado. Mostrar um preço mais
 * barato que ninguém pode mais pegar gera arrependimento, não urgência; a
 * urgência vem da linha de baixo, que é o que acontece em 1º de novembro.
 *
 * `oncoIa` é a diferença entre os dois combos — quanto custa acrescentar o
 * Onco IA —, não um produto vendido à parte.
 */
const LOTS = [
  {
    period: "Condição especial — 15% de desconto",
    detail: "De 16 a 31 de outubro.",
    intensivo: "R$ 2.465,00",
    oncoia: "R$ 799,00",
    total: "R$ 3.264,00",
    current: true,
  },
  {
    period: "Valor regular",
    detail: "A partir de 1º de novembro.",
    intensivo: "R$ 2.900,00",
    oncoia: "R$ 899,00",
    total: "R$ 3.799,00",
    current: false,
  },
];

const COLUNAS = ["Lote", "Intensivo + Banco", "Acréscimo do Onco IA", "Combo completo"];

/*
 * As três opções de compra da seção. Os valores são os que o carrinho da EAD Plataforma
 * cobra com o cupom do lote vigente — conferidos abrindo cada checkout. Ao trocar
 * de lote ou de cupom, atualizar aqui e em src/lib/checkout.ts: os dois têm que
 * mudar juntos, senão a página anuncia um valor e o carrinho cobra outro.
 */
const OFFERS = [
  {
    product: "comboCompleto" as const,
    placement: "precos" as const,
    name: "Combo completo",
    includes: "X Curso Intensivo de Oncologia + Banco de Questões + Onco IA.",
    from: "De R$ 3.799,00",
    price: "R$ 3.264",
    cents: ",00",
    installments: "ou 2x de R$ 1.632,00",
    cta: "Garantir o combo completo",
    featured: true,
  },
  {
    product: "comboIntensivo" as const,
    placement: "precos-intensivo" as const,
    name: "Intensivo + Banco de Questões",
    includes: "X Curso Intensivo de Oncologia + Banco de Questões, sem o Onco IA.",
    from: "De R$ 2.900,00",
    price: "R$ 2.465",
    cents: ",00",
    installments: "ou 2x de R$ 1.232,50",
    cta: "Garantir esta condição",
    featured: false,
  },
  {
    product: "bancoQuestoes" as const,
    placement: "precos-banco" as const,
    name: "Banco de Questões",
    includes: "Só o Banco de Questões 2026, sem o curso.",
    // Única opção sem desconto: não há "de/por", então o lugar do valor riscado
    // fica com o aviso, para o card não parecer que perdeu informação.
    from: null,
    price: "R$ 510",
    cents: ",00",
    installments: "à vista, ou 2x de R$ 255,00",
    cta: "Quero o Banco de Questões",
    featured: false,
  },
];

export function Pricing() {
  return (
    <Section id="inscricao">
      <Reveal className="max-w-3xl">
        <SectionTitle>Escolha a sua opção</SectionTitle>
        <p className="mt-4 font-display text-lg font-semibold text-foreground">
          X Curso Intensivo de Oncologia + Banco de Questões + Onco IA
        </p>
        <p className="mt-3 max-w-2xl text-base leading-[1.6] text-muted-foreground md:text-lg">
          Três formas de entrar. Escolha a sua.
        </p>
      </Reveal>

      {/*
        Aqui havia três cartões repetindo o conteúdo do Curso, do Banco de
        Questões e do Onco IA — cada um já tem a sua própria seção logo acima
        nesta página, com mais detalhe. Quem chega nos preços já leu; o que
        falta é o valor e o botão. Eram 150 palavras ditas pela segunda vez.
      */}

      {/*
        Painel chapado: fundo sólido e borda. Antes havia um halo ciano de
        `blur-[90px]` atrás e um `glow-cyan` em volta — dois borrões sobre a
        seção que é a mais importante da página. O destaque agora vem do
        contraste do fundo com o da seção, que é reto e não desfoca nada.
      */}
      <Reveal className="relative mt-12">
        <div className="relative rounded-lg border border-border bg-surface p-6 sm:p-8 md:p-10">
          {/*
            "até 15%", e não "15%": medido no carrinho, o cupom tira R$ 535
            FIXOS do combo completo, o que dá 14,08%; no combo de 2 cursos dá os
            15% exatos. Afirmar 15% seco seria anunciar um desconto que o
            carrinho não dá justamente no produto principal.
          */}
          <Chip>Lote atual • até 15% OFF até 31 de outubro</Chip>
          <SectionTitle className="mt-5 max-w-2xl">
            Garanta a sua inscrição com desconto exclusivo
          </SectionTitle>

          {/*
            As três opções de compra, cada uma com o preço que a plataforma
            realmente cobra e o link do seu próprio checkout. Antes havia um bloco
            só: anunciava R$ 2.030 (que é o combo sem Onco IA) e o botão levava ao
            combo de três produtos, a R$ 2.659,30 — a pessoa via um valor e pagava
            outro, R$ 629,30 maior.
          */}
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {OFFERS.map((offer) => (
              <div
                key={offer.product}
                // A seção roda no tema azul, onde --cyan é branco: `bg-cyan/10`
                // dava um azul lavado e fazia o card secundário, de fundo sólido,
                // parecer o principal. O destaque vem do fundo sólido com borda
                // clara; o secundário recua para fundo transparente.
                className={cn(
                  "flex flex-col rounded-lg border p-6 sm:p-7",
                  offer.featured
                    ? "border-cyan bg-surface-container shadow-[0_18px_44px_-24px_rgb(0_0_0/0.55)]"
                    : "border-border bg-transparent",
                )}
              >
                {offer.featured ? <Chip>Mais completo</Chip> : null}
                <h3
                  className={cn(
                    "font-display text-xl font-semibold text-foreground",
                    offer.featured ? "mt-4" : "",
                  )}
                >
                  {offer.name}
                </h3>
                <p className="mt-2 text-sm leading-[1.55] text-muted-foreground">
                  {offer.includes}
                </p>

                {offer.from ? (
                  <p className="mt-6 text-sm text-muted-foreground line-through">{offer.from}</p>
                ) : (
                  <p className="mt-6 text-sm text-muted-foreground">Sem desconto</p>
                )}
                <p className="mt-1 font-display text-[38px] leading-none font-bold text-cyan md:text-[46px]">
                  {offer.price}
                  <span className="text-2xl">{offer.cents}</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{offer.installments}</p>

                <div className="mt-6 flex-1" />
                <CtaButton
                  href={checkoutUrl(offer.product, offer.placement)}
                  variant={offer.featured ? "primary" : "outline"}
                  className="w-full"
                >
                  {offer.cta} <ArrowRight size={18} />
                </CtaButton>
              </div>
            ))}
          </div>

          <p className="label-mono mt-6 flex items-center gap-2 text-muted-foreground">
            <Lock size={14} strokeWidth={1.5} /> Inscrição em ambiente seguro • Condição válida até
            31 de outubro
          </p>

          {/*
            No mobile a tabela de lotes virava três cartões de quatro números
            cada — doze valores num celular, e dois dos lotes nem estão em
            vigor. Fica só a próxima mudança de preço, que é a informação que
            cria urgência; a tabela inteira segue no desktop, onde cabe.
          */}
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:hidden">
            Em 1º de novembro os valores voltam ao preço cheio: o combo completo passa de
            R$ 3.264,00 para R$ 3.799,00.
          </p>

          <div className="mt-10 hidden md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  {COLUNAS.map((h) => (
                    <th key={h} className="label-mono py-3 pr-4 text-muted-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LOTS.map((lot) => (
                  <tr
                    key={lot.period}
                    className={cn(
                      "border-b border-border/60 text-sm",
                      lot.current ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <td className="py-4 pr-4">
                      <span className="font-display font-semibold">{lot.period}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">{lot.detail}</span>
                    </td>
                    <td className="py-4 pr-4">{lot.intensivo}</td>
                    <td className="py-4 pr-4">{lot.oncoia}</td>
                    <td className="py-4 pr-4">{lot.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            Compra em ambiente seguro. Após a confirmação, enviamos as instruções de acesso por
            e-mail.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
