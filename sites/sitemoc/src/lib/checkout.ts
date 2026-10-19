/*
 * Destinos de compra da landing.
 *
 * O checkout da EAD Plataforma aceita o cupom **no caminho da URL**:
 *
 *   /checkout/combo/{id-do-combo}/{CUPOM}
 *
 * Essa URL monta o carrinho com o combo e o cupom já aplicado, e redireciona
 * para /cart?coupon=CUPOM. É o formato a usar — a página de produto sozinha
 * (/combo/{slug}) exige que a pessoa digite o cupom à mão e paga o preço cheio
 * se não souber o código.
 */

/** As três opções de compra da página. */
export type Product = "comboCompleto" | "comboIntensivo" | "bancoQuestoes";

/** Onde na página o clique aconteceu. Vai em utm_content. */
export type Placement =
  | "header"
  | "header-mobile"
  | "hero"
  | "urgencia"
  | "sobre"
  | "encontros"
  | "bonus"
  | "onco-ia"
  | "banco-questoes"
  | "precos"
  | "precos-intensivo"
  | "precos-banco"
  | "final"
  | "barra-mobile";

const CHECKOUT_HOST = "https://cursosmocbrasil.eadplataforma.app";

/**
 * Destino de cada opção de compra.
 *
 * Os combos usam a URL de checkout com cupom no caminho, que já monta o carrinho
 * com o desconto aplicado. O Banco de Questões avulso não tem cupom — vai para a
 * própria página do curso, onde a pessoa escolhe à vista ou parcelado.
 *
 * **O MOC troca os cupons a cada lote, e o cupom antigo PARA DE FUNCIONAR.** Não
 * basta trocar o texto da página: em 19/10/2026 o 30REDES já não aplicava nada e
 * o carrinho cobrava os R$ 3.799 cheios de quem clicava vendo "até 30% OFF".
 * Antes de cada virada de lote, abrir as duas URLs e ler o total.
 *
 * **Cupom vigente: 15PUBLI**, lote de 16 a 31/10/2026.
 *
 * Conferido em 19/10/2026, abrindo o carrinho com perfil de navegador novo para
 * cada URL — o carrinho da plataforma acumula itens entre medições, e uma sessão
 * reaproveitada soma os dois combos e dá um total que não existe:
 *
 *   15PUBLI — combo 16 → R$ 3.229,15 (15,00%)  | combo 20 → R$ 2.465,00 (15,00%)
 *   15MOC   — combo 16 → R$ 3.264,00 (14,08%)  | combo 20 → R$ 2.465,00 (15,00%)
 *   15REDES — não aplica em nenhum dos dois
 *   30REDES — expirado, não aplica mais
 *
 * Entre os dois que funcionam, o 15PUBLI é o escolhido: dá 15% cheios nos DOIS
 * combos, enquanto o 15MOC tira R$ 535 fixos do completo, que dá 14,08%. Com o
 * 15PUBLI a página pode dizer "15%" sem ressalva — o lote passado precisava de
 * "até 30%" justamente porque o cupom de lá não era percentual.
 *
 * O Banco de Questões avulso segue **sem cupom**, por decisão do MOC: a
 * plataforma só lê cupom no caminho para combos, e o PDF revisado aponta para a
 * página do curso em cursos.mocbrasil.com.
 */
const DESTINOS: Record<Product, string> = {
  /** Combo 16: X Curso Intensivo + Banco de Questões + ONCO IA — de R$ 3.799 por R$ 3.229,15. */
  comboCompleto: `${CHECKOUT_HOST}/checkout/combo/16/15PUBLI`,
  /** Combo 20: X Curso Intensivo + Banco de Questões, sem ONCO IA — de R$ 2.900 por R$ 2.465. */
  comboIntensivo: `${CHECKOUT_HOST}/checkout/combo/20/15PUBLI`,
  /**
   * Banco de Questões avulso — R$ 510 sem desconto, ou 2x de R$ 255.
   *
   * Vai para `cursos.mocbrasil.com`, **outro domínio** que o resto: é a URL que
   * o MOC mandou no PDF revisado. Não usa CHECKOUT_HOST de propósito.
   */
  bancoQuestoes: "https://cursos.mocbrasil.com/curso/banco-de-questoes-2026",
};

/**
 * Destino dos botões que não nomeiam um combo específico: a seção de
 * investimento, onde as duas opções ficam lado a lado. Mandar um CTA genérico
 * direto para um checkout foi o que fez a página anunciar R$ 2.030 e cobrar
 * R$ 2.659,30.
 */
export const PRICING_ANCHOR = "#inscricao";

/*
 * Sobre a medição por utm_content: os parâmetros abaixo sobrevivem ao primeiro
 * redirect (/cart/add/...) mas **são descartados no segundo**, e a página do
 * carrinho chega limpa, só com ?coupon=. Ou seja, eles não alimentam a analytics
 * da plataforma. Ficam porque não custam nada e o primeiro salto ainda os
 * carrega, mas não dá para medir por eles.
 *
 * A medição de "qual botão converteu" que o cliente pediu funciona pelo próprio
 * cupom: cupons distintos por origem aparecem separados no relatório de vendas
 * do MOC. Criar esses cupons depende deles.
 */
export function checkoutUrl(product: Product, placement: Placement): string {
  const url = new URL(DESTINOS[product]);
  url.searchParams.set("utm_source", "landing");
  url.searchParams.set("utm_medium", "site");
  url.searchParams.set("utm_campaign", "x-intensivo-oncologia");
  url.searchParams.set("utm_content", placement);
  return url.toString();
}

/** WhatsApp oficial de atendimento. */
const WHATSAPP_NUMBER = "5511978581148";

export function whatsappUrl(
  message = "Olá! Tenho interesse no X Curso Intensivo de Oncologia do MOC.",
): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
