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

/**
 * URL de checkout de cada produto. Vazio = ainda não fornecido.
 *
 * Só o combo tem destino próprio até agora. O curso avulso e o Banco de Questões
 * seguem sem URL, então seus botões rolam para a seção de preços.
 */
const CHECKOUT_BASE: Record<Product, string> = {
  course: "",
  questionBank: "",
  combo:
    "https://cursosmocbrasil.eadplataforma.app/combo/x-curso-intensivo-de-oncologia-banco-de-questoes-2026-onco-ia",
};

/**
 * Cupom de desconto da campanha.
 *
 * ATENÇÃO: a EAD Plataforma **não aceita cupom por parâmetro de URL** — o código
 * é digitado num campo do próprio checkout (`<input name="product-coupom">`).
 * Por isso o cupom não vai na URL: ele é exibido na página, para a pessoa copiar
 * antes de ir para o checkout. Ver o componente CouponBadge.
 */
export const COUPON_CODE = "30PUBLI";

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
