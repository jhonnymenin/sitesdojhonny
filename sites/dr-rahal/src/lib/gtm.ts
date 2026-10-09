/*
 * Google Tag Manager.
 *
 * O container ID não é segredo — ele aparece no HTML de qualquer site que roda
 * GTM —, mas o carregamento é preso aos domínios de produção de propósito.
 *
 * A trava importa mais aqui do que num pixel solto. O GTM é um contêiner: o que
 * dispara de verdade são as tags que o cliente configurar dentro dele — GA4,
 * conversões do Google Ads, remarketing. Um `npm run dev` ou um preview da
 * Vercel sujaria todas de uma vez, e sem a trava isso dependeria de alguém
 * lembrar de configurar env. Em agosto um caso assim sujou a conta de anúncios
 * de outro cliente.
 */

/** Container do Dr. Rahal, enviado pelo Victor em 09/10/2026. */
const CONTAINER_ID = "GTM-5G82TJ49";

/**
 * Domínios em que o GTM pode carregar.
 *
 * O apex responde 308 para o www, mas fica na lista porque quem chega pelo apex
 * recebe o HTML só depois do redirecionamento — e se um dia o apex passar a
 * servir direto, o rastreamento não para silenciosamente.
 */
const HOSTS_DE_PRODUCAO = ["www.drrahaltireoide.com", "drrahaltireoide.com"];

/**
 * `VITE_GTM_ID` tem prioridade: serve para testar com um container falso e para
 * desligar tudo (basta definir vazio no painel da Vercel) sem deploy de código.
 */
const ID_DO_ENV = (import.meta.env["VITE_GTM_ID"] as string | undefined) ?? "";

export function idParaEsteAmbiente(): string {
  if (ID_DO_ENV !== "") return ID_DO_ENV;
  if (typeof window === "undefined") return "";
  return HOSTS_DE_PRODUCAO.includes(window.location.hostname) ? CONTAINER_ID : "";
}

/** O id que o `<noscript>` precisa renderizar no servidor. Ver GoogleTagManager.tsx. */
export const GTM_CONTAINER_ID = CONTAINER_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Injeta o snippet oficial uma única vez. Seguro para chamar mais de uma vez.
 *
 * É o mesmo código que o Victor mandou, só reescrito como função em vez de IIFE
 * minificada: o `dataLayer` é criado, o evento `gtm.js` entra nele com o
 * timestamp de início, e o script do container é acrescentado de forma assíncrona.
 */
export function initGtm(): void {
  const id = idParaEsteAmbiente();
  if (id === "" || typeof window === "undefined") return;
  // Já carregado — acontece em navegação client-side, que remonta o componente.
  if (document.getElementById("gtm-script")) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(script);
}
