/*
 * Origem pública do site. og:url, canonical e og:image precisam ser absolutos —
 * crawlers não resolvem caminhos relativos.
 *
 * **Com www, de propósito.** Na Vercel o domínio de produção é
 * `www.fdpsq.org.br`; o apex `fdpsq.org.br` responde 308 redirecionando para
 * ele. O canonical tem que apontar para a URL final, a que a pessoa realmente
 * acessa: declarar uma que redireciona faz o buscador dar um salto a mais e
 * abre espaço para ele escolher sozinho qual versão indexar.
 *
 * O par `fundacaodonapaulina.org.br` (com e sem www) serve o mesmo conteúdo e
 * deve redirecionar para cá — senão os dois domínios competem entre si.
 *
 * Trocar o domínio aqui basta para o site inteiro; o sitemap.xml e o robots.txt
 * em public/ são estáticos e precisam ser trocados à mão junto.
 */
export const SITE_URL = "https://www.fdpsq.org.br";

export const siteUrl = (path = "/") => `${SITE_URL}${path}`;
