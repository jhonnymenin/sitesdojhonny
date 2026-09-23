/*
 * Destinos de compra da landing (item 4 da revisão).
 *
 * Havia um único placeholder ("#CHECKOUT_URL_EAD") por trás de todos os botões,
 * então nenhum deles levava a lugar nenhum. Agora cada CTA declara o produto que
 * vende e o lugar da página de onde partiu, e a URL final é montada aqui.
 */

export type Product = "course" | "questionBank" | "combo";

/** Onde na página o clique aconteceu. Vai em utm_content, para a métrica. */
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
  | "final"
  | "barra-mobile";

/*
 * O checkout da EAD Plataforma aceita o cupom **no caminho da URL**:
 *
 *   /checkout/combo/{id-do-combo}/{CUPOM}
 *
 * Essa URL monta o carrinho com o combo e o cupom já aplicado, e redireciona
 * para /cart?coupon=CUPOM. É o formato a usar — a página de produto sozinha
 * (/combo/{slug}) exige que a pessoa digite o cupom à mão e pague o preço cheio
 * se não souber o código.
 */
const CHECKOUT_HOST = "https://cursosmocbrasil.eadplataforma.app";

/** Combo 16 = X Curso Intensivo + Banco de Questões + ONCO IA (de R$ 3.799). */
const COMBO_ID = "16";

/**
 * Cupom do lote vigente. **O MOC troca os cupons de tempos em tempos**, então
 * conferir antes de cada campanha: basta abrir a URL e ver se o desconto aplica.
 *
 * Conhecidos até 23/09/2026:
 *   30PUBLI — 30% off no combo 16  → R$ 2.659,30   (lote de lançamento)
 *   15PUBLI — 15% off no combo 16  → R$ 3.229,15   (lote de outubro)
 *   30MOC   — 30% off no combo 20 (Intensivo + Banco, sem ONCO IA) → R$ 2.030,00
 */
const COUPON = "30PUBLI";

/**
 * URL de checkout de cada produto. Vazio = não vendido avulso nesta página.
 *
 * O curso e o Banco de Questões não têm venda avulsa aqui: o Banco existe
 * solto na plataforma (R$ 510, sem desconto), mas ficou de fora de propósito
 * para não abrir uma saída mais barata no meio do funil.
 */
const CHECKOUT_BASE: Record<Product, string> = {
  course: "",
  questionBank: "",
  combo: `${CHECKOUT_HOST}/checkout/combo/${COMBO_ID}/${COUPON}`,
};

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

/** Destino usado enquanto o checkout real não é fornecido: a seção de preços. */
const FALLBACK = "#inscricao";

export function checkoutUrl(product: Product, placement: Placement): string {
  const base = CHECKOUT_BASE[product];
  if (!base) return FALLBACK;

  const url = new URL(base);
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
