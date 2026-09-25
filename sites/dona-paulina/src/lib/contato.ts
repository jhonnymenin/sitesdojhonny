/*
 * Dados de contato da Fundação.
 *
 * O endereço, o telefone fixo e o e-mail vêm da página /contato/ do site
 * anterior da própria Fundação (o WordPress que ficou no ar de 2016 até a
 * migração), recuperada do Internet Archive. Não são dados inventados nem
 * copiados de diretório de terceiros.
 *
 * O WhatsApp é o que já estava no rodapé e no botão flutuante do site novo.
 */

/** Telefone fixo, como a pessoa lê. */
export const TELEFONE_FIXO = "(11) 5561-7308";

/** O mesmo telefone em E.164, para o link tel: e o JSON-LD. */
export const TELEFONE_FIXO_E164 = "+551155617308";

export const EMAIL = "fdpsq@fdpsq.org.br";

/** WhatsApp só com dígitos, no formato que o wa.me espera. */
export const WHATSAPP_NUMERO = "5511930352436";
export const WHATSAPP_LEGIVEL = "+55 11 93035-2436";

export const ENDERECO = {
  logradouro: "Av. Vereador José Diniz, 2436",
  // A Fundação sempre se descreveu como Brooklin, e é assim que a região é
  // conhecida; nos Correios a mesma faixa consta como Santo Amaro. Mantido
  // Brooklin no texto, que é o que a pessoa reconhece, com o CEP correto.
  bairro: "Brooklin",
  cidade: "São Paulo",
  uf: "SP",
  // 04604-004, e não o 04604-006 que estava na página antiga da Fundação.
  // Pelos Correios (ViaCEP), o 04604-006 cobre os números 3292–3530 da avenida;
  // o 2436 cai na faixa 2302–2690, que é o 04604-004. O site antigo publicava o
  // CEP errado — conferido na base oficial, não copiado de diretório.
  cep: "04604-004",
} as const;

export const ENDERECO_LINHA = `${ENDERECO.logradouro} — ${ENDERECO.bairro}, ${ENDERECO.cidade} — ${ENDERECO.uf}, CEP ${ENDERECO.cep}`;

/** Abre o Google Maps pelo endereço, sem depender de um place_id que pode mudar. */
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${ENDERECO.logradouro}, ${ENDERECO.bairro}, ${ENDERECO.cidade} - ${ENDERECO.uf}, ${ENDERECO.cep}`,
)}`;

export function whatsappUrl(
  mensagem = "Olá! Quero saber mais sobre a Fundação Dona Paulina de Souza Queiroz.",
): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}
