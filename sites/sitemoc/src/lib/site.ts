// Origem pública do site. og:url, canonical e og:image precisam ser absolutos —
// crawlers não resolvem caminhos relativos.
//
// O domínio do cliente, que é o que o MOC indicou como URL da LP no documento de
// 29/09. Antes apontava para onco.on-dig.online, o domínio de homologação: os dois
// servem o mesmo site, e enquanto o canonical apontasse para a homologação o
// Google indexaria ela em vez da do cliente.
export const SITE_URL = "https://x-curso-intensivo-de-oncologia.mocbrasil.com";

export const siteUrl = (path = "/") => `${SITE_URL}${path}`;
