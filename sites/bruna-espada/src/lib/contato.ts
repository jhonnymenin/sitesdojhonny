/*
 * Contato e redes do ateliê, num lugar só.
 *
 * O WhatsApp já existia em ui.tsx; o endereço completo, o Facebook e o TikTok
 * entraram em 13/10/2026, com os dados que a Bruna enviou.
 */

/** WhatsApp só com dígitos, no formato que o wa.me espera. */
export const WHATSAPP_NUMERO = "5511942457002";
export const WHATSAPP_LEGIVEL = "(11) 94245-7002";

export const ENDERECO = {
  logradouro: "Av. Senador Roberto Simonsen, 850",
  // Bairro conferido na base dos Correios: o CEP 09530-401 cobre os números
  // 251/252 a 1009/1010 da avenida, e o 850 cai nessa faixa.
  bairro: "Santo Antônio",
  cidade: "São Caetano do Sul",
  uf: "SP",
  cep: "09530-401",
} as const;

export const ENDERECO_LINHA = `${ENDERECO.logradouro} — ${ENDERECO.bairro}, ${ENDERECO.cidade} — ${ENDERECO.uf}`;

/** Abre o Google Maps pelo endereço, sem depender de place_id, que pode mudar. */
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${ENDERECO.logradouro}, ${ENDERECO.bairro}, ${ENDERECO.cidade} - ${ENDERECO.uf}, ${ENDERECO.cep}`,
)}`;

/*
 * O endereço do Facebook foi conferido: entre os perfis possíveis, só
 * `ateliebrunaespada` devolve a página real ("Ateliê Bruna Espada | São Caetano
 * do Sul SP"). Os outros caem na tela genérica do Facebook, que responde 200
 * mesmo quando o perfil não existe.
 */
export const REDES = [
  { nome: "Instagram", handle: "@brunaespada", url: "https://instagram.com/brunaespada" },
  { nome: "Facebook", handle: "Ateliê Bruna Espada", url: "https://www.facebook.com/ateliebrunaespada" },
  { nome: "TikTok", handle: "@brunaespada", url: "https://www.tiktok.com/@brunaespada" },
] as const;
