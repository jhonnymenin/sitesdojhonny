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

/** Os dois combos vendidos na página. Não há venda avulsa. */
export type Product = "comboCompleto" | "comboIntensivo";

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
  | "final"
  | "barra-mobile";

const CHECKOUT_HOST = "https://cursosmocbrasil.eadplataforma.app";

/**
 * Destino de cada opção de compra.
 *
 * Os dois usam a URL de checkout com cupom no caminho, que já monta o carrinho
 * com o desconto aplicado.
 *
 * **O MOC troca os cupons de tempos em tempos.** Antes de cada campanha, abrir a
 * URL e conferir se o desconto ainda aplica — o carrinho mostra o percentual.
 *
 * Cupons conhecidos em 23/09/2026:
 *   30PUBLI — 30% no combo 16 → R$ 2.659,30  (lote de lançamento, em uso)
 *   15PUBLI — 15% no combo 16 → R$ 3.229,15  (lote de outubro)
 *   30MOC   — 30% no combo 20 → R$ 2.030,00  (lote de lançamento, em uso)
 */
const DESTINOS: Record<Product, string> = {
  /** Combo 16: X Curso Intensivo + Banco de Questões + ONCO IA — de R$ 3.799. */
  comboCompleto: `${CHECKOUT_HOST}/checkout/combo/16/30PUBLI`,
  /** Combo 20: X Curso Intensivo + Banco de Questões, sem ONCO IA — de R$ 2.900. */
  comboIntensivo: `${CHECKOUT_HOST}/checkout/combo/20/30MOC`,
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
