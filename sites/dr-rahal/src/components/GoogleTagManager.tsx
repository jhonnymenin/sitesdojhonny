import { useEffect } from "react";
import { initGtm, GTM_CONTAINER_ID } from "@/lib/gtm";

/** Carrega o container do GTM, só nos domínios de produção. */
export function GoogleTagManager() {
  useEffect(() => {
    initGtm();
  }, []);

  return null;
}

/**
 * O `<noscript>` do GTM, para quem navega com JavaScript desligado.
 *
 * Vai no topo do `<body>`, que é onde o Google manda pôr, e é renderizado no
 * servidor **sem a trava de domínio** — de propósito, e sem risco:
 *
 * O navegador só busca o conteúdo de um `<noscript>` quando o JavaScript está
 * desligado. Em desenvolvimento, em preview e nos testes automatizados o JS está
 * sempre ligado, então este iframe nunca chega a ser carregado nesses ambientes.
 * Pôr a trava aqui não protegeria nada e, pior, quebraria o único caso em que
 * ele serve: a trava roda no cliente, e quem está sem JavaScript nunca executa
 * código nenhum para decidir.
 */
export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
