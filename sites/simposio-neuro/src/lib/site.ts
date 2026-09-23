// Origem pública do site. og:url, canonical e og:image precisam ser absolutos —
// crawlers não resolvem caminhos relativos. Trocar o domínio aqui basta.
export const SITE_URL = "https://simposioneuro.on-dig.online";

export const siteUrl = (path = "/") => `${SITE_URL}${path}`;
