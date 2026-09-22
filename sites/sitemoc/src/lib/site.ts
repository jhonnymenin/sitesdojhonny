// Origem pública do site. og:url, canonical e og:image precisam ser absolutos —
// crawlers não resolvem caminhos relativos.
//
// REVISAR NA PUBLICAÇÃO (item 3 da revisão): hoje aponta para o domínio de
// homologação. Trocar aqui e em mais nenhum lugar quando o domínio final sair.
export const SITE_URL = "https://onco.on-dig.online";

export const siteUrl = (path = "/") => `${SITE_URL}${path}`;
