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
 * **O MOC troca os cupons de tempos em tempos.** Antes de cada campanha, abrir a
 * URL e conferir se o desconto ainda aplica — o carrinho mostra o percentual.
 *
 * **Cupom vigente: 30REDES**, pedido pelo MOC em 29/09/2026.
 *
 * Atenção ao combo completo: o 30REDES **não é 30%** nele. Conferido abrindo o
 * carrinho, ele tira R$ 1.070 fixos de R$ 3.799 — dá R$ 2.729,00, ou 28,17%. O
 * cupom anterior (30PUBLI) dava os 30% cheios, R$ 2.659,30. O preço exibido no
 * Pricing.tsx foi alinhado ao que o checkout cobra; se o MOC corrigir o cupom
 * para 30% de verdade, os dois lugares mudam juntos.
 *
 * No combo de 2 cursos o 30REDES dá 30% certinho: R$ 2.030,00, igual ao 30MOC.
 *
 * O Banco de Questões avulso segue **sem cupom**, e agora por decisão do MOC: a
 * primeira versão do PDF pedia 30REDES nele, mas a plataforma só lê cupom no
 * caminho para combos (/checkout/curso/37/30REDES responde /not-found). O PDF
 * revisado aponta para a página do curso em cursos.mocbrasil.com.
 *
 * Cupons conferidos em 29/09/2026, abrindo o carrinho com sessão limpa:
 *   30REDES — combo 16 → R$ 2.729,00 (28,17%)   | combo 20 → R$ 2.030,00 (30%)
 *   30PUBLI — combo 16 → R$ 2.659,30 (30%)      [anterior]
 *   30MOC   — combo 20 → R$ 2.030,00 (30%)      [anterior]
 */
const DESTINOS: Record<Product, string> = {
  /** Combo 16: X Curso Intensivo + Banco de Questões + ONCO IA — de R$ 3.799 por R$ 2.729. */
  comboCompleto: `${CHECKOUT_HOST}/checkout/combo/16/30REDES`,
  /** Combo 20: X Curso Intensivo + Banco de Questões, sem ONCO IA — de R$ 2.900 por R$ 2.030. */
  comboIntensivo: `${CHECKOUT_HOST}/checkout/combo/20/30REDES`,
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
