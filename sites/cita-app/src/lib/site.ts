/*
 * Origem pública do app. og:url, canonical e og:image precisam ser absolutos —
 * crawler nenhum resolve caminho relativo.
 *
 * Domínio do app do evento, servido pela Vercel. É um subdomínio de
 * simposiocita.com.br, que é outro projeto: o site institucional. São duas
 * coisas diferentes e cada uma tem a própria arte de compartilhamento — o
 * og:image daqui é o `public/og-image.png` deste app.
 */
export const SITE_URL = "https://app.simposiocita.com.br";

export const siteUrl = (path = "/") => `${SITE_URL}${path}`;
