/*
 * Meta Pixel (Facebook/Instagram).
 *
 * O ID vem de env **sem valor padrão, de propósito**. Com o ID embutido no
 * código, qualquer `npm run dev`, preview da Vercel ou deploy de teste dispararia
 * PageView e Lead na conta de anúncios real do MOC e sujaria a otimização da
 * campanha. Vazio, nada é carregado e nada é enviado.
 *
 * Para ligar, defina `VITE_META_PIXEL_ID` no painel da Vercel (Production).
 *
 * O **token da Conversions API não mora aqui.** Ele autoriza enviar eventos em
 * nome da conta do MOC, e este repositório é público. Se um dia a CAPI entrar,
 * o token fica em env de servidor (sem o prefixo VITE_, que vaza para o bundle)
 * e os eventos saem de uma rota de servidor, nunca do navegador.
 */

export const META_PIXEL_ID =
  (import.meta.env["VITE_META_PIXEL_ID"] as string | undefined) ?? "";

/** True quando o pixel está habilitado nesta build. */
export const pixelEnabled = META_PIXEL_ID !== "";

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
  if (!pixelEnabled || typeof window === "undefined" || window.fbq) return;

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

  fbq("init", META_PIXEL_ID);
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
  if (!pixelEnabled || typeof window === "undefined") return;
  window.fbq?.("track", "InitiateCheckout", {
    content_name: dados?.produto,
    value: dados?.valor,
    currency: "BRL",
  });
}

/** Clique num botão de WhatsApp: é o contato comercial, não a compra. */
export function trackContact(): void {
  if (!pixelEnabled || typeof window === "undefined") return;
  window.fbq?.("track", "Contact");
}
