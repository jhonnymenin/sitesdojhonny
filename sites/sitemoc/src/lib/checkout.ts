/*
 * Destinos de compra da landing (item 4 da revisão).
 *
 * Havia um único placeholder ("#CHECKOUT_URL_EAD") por trás de todos os botões,
 * então nenhum deles levava a lugar nenhum. Agora cada CTA declara o produto que
 * vende e o lugar da página de onde partiu, e a URL final é montada aqui.
 *
 * PARA PUBLICAR, preencher CHECKOUT_BASE e COUPON abaixo. Enquanto uma base
 * estiver vazia, os botões daquele produto rolam para a seção de inscrição em
 * vez de apontar para uma âncora morta — nada quebra na mão do usuário.
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

/** URL de checkout de cada produto. Vazio = ainda não fornecido. */
const CHECKOUT_BASE: Record<Product, string> = {
  course: "",
  questionBank: "",
  combo: "",
};

/**
 * Cupom de desconto por produto, acordado para facilitar a métrica.
 * Vazio = não aplica cupom na URL.
 */
const COUPON: Record<Product, string> = {
  course: "",
  questionBank: "",
  combo: "",
};

/** Nome do parâmetro de cupom no checkout. Varia conforme a plataforma. */
const COUPON_PARAM = "cupom";

/** Destino usado enquanto o checkout real não é fornecido: a seção de preços. */
const FALLBACK = "#inscricao";

export function checkoutUrl(product: Product, placement: Placement): string {
  const base = CHECKOUT_BASE[product];
  if (!base) return FALLBACK;

  const url = new URL(base);
  const coupon = COUPON[product];
  if (coupon) url.searchParams.set(COUPON_PARAM, coupon);
  url.searchParams.set("utm_source", "landing");
  url.searchParams.set("utm_medium", "site");
  url.searchParams.set("utm_campaign", "x-intensivo-oncologia");
  url.searchParams.set("utm_content", placement);
  return url.toString();
}

/** True enquanto qualquer destino de checkout estiver pendente. */
export const checkoutPending = Object.values(CHECKOUT_BASE).some((url) => !url);

/**
 * Canal de atendimento do botão "Fale com nossa equipe".
 * Vazio = cai na seção de inscrição. Preencher com o WhatsApp oficial.
 */
export const SUPPORT_URL = "";

export const supportUrl = () => SUPPORT_URL || FALLBACK;
