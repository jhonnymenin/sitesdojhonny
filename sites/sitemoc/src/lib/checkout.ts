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

const CHECKOUT_HOST = "https://cursos.mocbrasil.com";

/**
 * Destino de cada opção de compra.
 *
 * O HOST É O DO MOC, cursos.mocbrasil.com, e não o cursosmocbrasil.eadplataforma.app.
 * Os dois são a mesma loja — ambos redirecionam para /cart/add/26/0/82 — mas o
 * primeiro é o domínio próprio deles e é o que vem nos links que o MOC manda.
 * Usar o endereço da plataforma fazia a LP divergir do material do cliente.
 *
 * **O MOC troca os cupons a cada lote, E TAMBÉM MEXE NO CUPOM JÁ EXISTENTE.**
 * Em 19/10 o 15PUBLI dava R$ 3.229,15 no combo completo (15% cheios); em 20/10
 * o mesmo cupom passou a dar R$ 3.264,00 (R$ 535 fixos). Ou seja, não basta
 * conferir na virada de lote: o preço da página pode envelhecer sozinho, sem
 * ninguém tocar em nada. Antes de qualquer publicação que fale de preço, abrir
 * as duas URLs e ler o total.
 *
 * **Cupom vigente: 15REDES**, pedido pelo MOC em 20/10/2026.
 *
 * Conferido em 20/10/2026, com perfil de navegador novo para cada URL — o
 * carrinho da plataforma acumula itens entre medições:
 *
 *   combo 16 (completo) → de R$ 3.799,00 por R$ 3.264,00, ou 2x de R$ 1.632,00
 *   combo 20 (2 cursos) → de R$ 2.900,00 por R$ 2.465,00, ou 2x de R$ 1.232,50
 *
 * ATENÇÃO AO PERCENTUAL: o cupom tira **R$ 535 fixos** do combo completo, o que
 * dá 14,08%, não 15%. No combo de 2 cursos dá 15% exatos. Por isso a página diz
 * "até 15%" — dizer "15%" seco seria anunciar um desconto que o carrinho não dá
 * no produto principal. Hoje o 15PUBLI devolve exatamente os mesmos valores.
 *
 * O Banco de Questões avulso segue **sem cupom**, por decisão do MOC: a
 * plataforma só lê cupom no caminho para combos.
 */
const DESTINOS: Record<Product, string> = {
  /** Combo 16: X Curso Intensivo + Banco de Questões + ONCO IA — de R$ 3.799 por R$ 3.264. */
  comboCompleto: `${CHECKOUT_HOST}/checkout/combo/16/15REDES`,
  /** Combo 20: X Curso Intensivo + Banco de Questões, sem ONCO IA — de R$ 2.900 por R$ 2.465. */
  comboIntensivo: `${CHECKOUT_HOST}/checkout/combo/20/15REDES`,
  /**
   * Banco de Questões avulso — R$ 510 sem desconto, ou 2x de R$ 255.
   *
   * Vai para `cursos.mocbrasil.com`, **outro domínio** que o resto: é a URL que
   * o MOC mandou no PDF revisado. Não usa CHECKOUT_HOST de propósito.
   */
  bancoQuestoes: `${CHECKOUT_HOST}/curso/banco-de-questoes-2026`,
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
