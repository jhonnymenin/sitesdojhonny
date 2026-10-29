/*
 * Chave Pix da Fundação.
 *
 * Mesma chave para o Simpósio e para a Campanha Laços que Protegem — veio da
 * Fundação em 27/10/2026 (a correção que a Camila mandou, não o primeiro
 * número) e foi repetida no briefing de 28/10 para a Campanha.
 *
 * Vão dois formatos de propósito. `exibicao` é o que a pessoa lê e confere;
 * `chave` é o que o botão copia, no formato E.164 (+55 e DDD), que é como o Pix
 * registra uma chave de celular. Copiar o número bonitinho, com parênteses e
 * hífen, faz o aplicativo do banco recusar — e aí a doação não acontece e
 * ninguém descobre por quê.
 *
 * NÃO HÁ "COPIA E COLA" COM VALOR EMBUTIDO. Gerar um BR Code estático exige o
 * nome e a cidade do recebedor exatamente como registrados no Pix; errar isso
 * produz um código que o banco recusa. Enquanto esses dados não vierem da
 * Fundação, o valor é mostrado em texto e a pessoa digita.
 */
export const PIX = {
  tipo: "Celular",
  exibicao: "(11) 99103-2148",
  chave: "+5511991032148",
} as const;
