/*
 * Origem pública do app. og:url, canonical e og:image precisam ser absolutos —
 * crawler nenhum resolve caminho relativo.
 *
 * **PROVISÓRIO: endereço gerado pela Vercel.** Trocar pelo domínio final assim
 * que ele existir.
 *
 * Aqui estava `cita-app.vercel.app`, que eu havia deduzido pelo nome do projeto
 * sem conferir. Esse endereço é de outra pessoa — serve um site chamado "Cita —
 * Go where they can't". Ou seja, o canonical e o og:image deste app apontavam
 * para o site de um terceiro: buscador tratando a página alheia como a versão
 * boa, e link compartilhado puxando a imagem de lá. Nome de projeto não reserva
 * subdomínio na Vercel; o endereço válido é o que o painel mostra.
 *
 * O app tem o próprio `public/og-image.png`; antes da migração o og:image
 * apontava para `simposiocita.com.br`, que é o site institucional do evento —
 * outro projeto, outra arte.
 */
export const SITE_URL = "https://cita-app-joaovictormenin-6190s-projects.vercel.app";

export const siteUrl = (path = "/") => `${SITE_URL}${path}`;
