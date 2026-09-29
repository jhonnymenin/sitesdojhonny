/*
 * Meta Pixel (Facebook/Instagram).
 *
 * Ele só dispara nos domínios de produção listados abaixo. Em localhost e em
 * preview da Vercel nada é carregado e nada é enviado.
 *
 * O **token da Conversions API não mora aqui.** Ele autoriza enviar eventos em
 * nome da conta do MOC, e este repositório é público. Se um dia a CAPI entrar,
 * o token fica em env de servidor (sem o prefixo VITE_, que vaza para o bundle)
 * e os eventos saem de uma rota de servidor, nunca do navegador.
 */

/*
 * Domínios em que o pixel pode disparar. O ID fica no código porque Pixel ID não
 * é segredo — ele aparece no HTML de qualquer site que roda o pixel —, mas o
 * disparo é preso a estes hosts de propósito.
 *
 * O risco real nunca foi o ID vazar: é `npm run dev` ou um preview da Vercel
 * mandar evento para a conta de anúncios de verdade e sujar a otimização da
 * campanha. Em agosto isso aconteceu com outro cliente. Com a trava por host,
 * localhost e *.vercel.app ficam mudos sem depender de ninguém lembrar de
 * configurar env.
 */
const HOSTS_DE_PRODUCAO = [
  "onco.on-dig.online",
  "x-curso-intensivo-de-oncologia.mocbrasil.com",
];

/** Pixel da campanha do MOC. */
const PIXEL_DO_MOC = "28806691242248179";

/**
 * `VITE_META_PIXEL_ID` tem prioridade: serve para testar com ID falso e para
 * desligar tudo (basta definir vazio no painel da Vercel) sem precisar de deploy
 * de código.
 */
const ID_DO_ENV = (import.meta.env["VITE_META_PIXEL_ID"] as string | undefined) ?? "";

function idParaEsteAmbiente(): string {
  if (ID_DO_ENV !== "") return ID_DO_ENV;
  if (typeof window === "undefined") return "";
  return HOSTS_DE_PRODUCAO.includes(window.location.hostname) ? PIXEL_DO_MOC : "";
}

/** True quando o pixel pode disparar aqui. Depende do host, então só no cliente. */
export function pixelEnabled(): boolean {
  return idParaEsteAmbiente() !== "";
}

type FbqFn = ((...args: unknown[]) => void) & {
  queue?: unknown[];
  callMethod?: (...args: unknown[]) => void;
  push?: unknown;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

/** Injeta o snippet oficial uma única vez. Seguro para chamar mais de uma vez. */
export function initMetaPixel(): void {
  const id = idParaEsteAmbiente();
  if (id === "" || typeof window === "undefined" || window.fbq) return;

  // Fila própria enquanto o SDK não carrega — é o snippet que o Meta entrega.
  const fbq: FbqFn = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else (fbq.queue = fbq.queue || []).push(args);
  };
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = window._fbq || fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", id);
  fbq("track", "PageView");
}

/**
 * Clique num botão que leva ao checkout.
 *
 * `InitiateCheckout` é o evento padrão do Meta para "entrou no carrinho", que é
 * exatamente o que estes botões fazem: mandam para a EAD Plataforma com o combo
 * e o cupom já montados. A compra em si acontece fora do nosso domínio, então
 * `Purchase` não tem como sair daqui — teria que vir da plataforma do MOC.
 */
export function trackInitiateCheckout(dados?: { produto?: string; valor?: number }): void {
  if (typeof window === "undefined" || !pixelEnabled()) return;
  window.fbq?.("track", "InitiateCheckout", {
    content_name: dados?.produto,
    value: dados?.valor,
    currency: "BRL",
  });
}

/** Clique num botão de WhatsApp: é o contato comercial, não a compra. */
export function trackContact(): void {
  if (typeof window === "undefined" || !pixelEnabled()) return;
  window.fbq?.("track", "Contact");
}

/**
 * A pessoa chegou a ver a seção de investimento.
 *
 * `ViewContent` é disparado uma vez por carregamento, quando o bloco de preços
 * entra na tela — não no load da página. Numa landing longa, quem rola até os
 * valores demonstrou interesse real, e é esse público que vale mandar para o
 * Meta otimizar.
 */
export function trackViewContent(): void {
  if (typeof window === "undefined" || !pixelEnabled()) return;
  window.fbq?.("track", "ViewContent", {
    content_name: "Seção de investimento",
    content_category: "Preços",
  });
}

/**
 * Evento **personalizado**, pedido pelo MOC para os três cards de preço.
 *
 * Fica ao lado do InitiateCheckout, não no lugar dele: o padrão alimenta a
 * otimização automática do Meta, e o personalizado permite ver no Ads Manager
 * qual das três opções a pessoa escolheu — coisa que o InitiateCheckout sozinho
 * não separa, porque dispara igual nos botões espalhados pela página.
 */
export function trackOfertaSelecionada(dados: {
  produto: string;
  valor: number;
  plano: string;
}): void {
  if (typeof window === "undefined" || !pixelEnabled()) return;
  window.fbq?.("trackCustom", "OfertaSelecionada", {
    produto: dados.produto,
    valor: dados.valor,
    plano: dados.plano,
    currency: "BRL",
  });
}
