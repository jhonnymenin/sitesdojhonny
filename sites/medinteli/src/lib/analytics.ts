/*
 * Google Analytics 4 e Meta Pixel.
 *
 * Os dois snippets ficavam embutidos no <head> do index.html, com os IDs no
 * código. Qualquer `npm run dev`, preview ou deploy de teste já disparava
 * `page_view` e `PageView` nas contas de produção e sujava os dados.
 *
 * Agora os IDs vêm de env, **sem valor padrão**: esta pasta é um espelho do site
 * que continua rodando no Lovable. Vazios, nada é carregado e nada é enviado.
 * Para ligar, defina `VITE_GA4_ID` e `VITE_META_PIXEL_ID` — valores em
 * `.env.example`.
 */

export const GA4_ID = (import.meta.env["VITE_GA4_ID"] as string | undefined) ?? "";
export const META_PIXEL_ID =
  (import.meta.env["VITE_META_PIXEL_ID"] as string | undefined) ?? "";

/** True quando o Pixel está habilitado nesta build (vale para o Pixel e a CAPI). */
export const pixelEnabled = META_PIXEL_ID !== "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean };
    _fbq?: unknown;
  }
}

function initGA4(): void {
  if (!GA4_ID || window.gtag) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // O gtag oficial precisa do `arguments`, então não dá para usar arrow function.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA4_ID);
}

function initMetaPixel(): void {
  if (!META_PIXEL_ID || window.fbq) return;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const fbq: any = function (...args: unknown[]) {
    // Enquanto o script oficial não carrega, os eventos ficam na fila.
    fbq.callMethod ? fbq.callMethod.apply(fbq, args) : fbq.queue.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
}

/** Carrega GA4 e Pixel, se configurados. Seguro para chamar mais de uma vez. */
export function initAnalytics(): void {
  if (typeof window === "undefined") return;
  initGA4();
  initMetaPixel();
}
