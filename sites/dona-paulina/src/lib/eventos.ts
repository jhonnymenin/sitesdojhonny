/*
 * A agenda de eventos de 2027, como a Fundação mandou (PDF "Eventos 2027",
 * recebido em 30/10/2026).
 *
 * Fica em lib e não dentro do componente porque a lista é conteúdo da
 * Fundação, não layout: quando chegar a programação de 2028, troca-se só
 * este arquivo. Os acentos que faltavam no PDF original foram corrigidos
 * ("classicos" → "clássicos"); os nomes dos eventos não foram alterados.
 *
 * A lista NÃO esconde evento que já passou. Esconder dependeria da data do
 * navegador, que no SSR é a data do servidor — e a divergência entre as duas
 * quebraria a hidratação. Quando 2027 acabar, esta lista sai junto.
 */
export type Evento = { data: string; iso: string; nome: string };

export const EVENTOS_2027: Evento[] = [
  { data: "24/03", iso: "2027-03-24", nome: "Páscoa" },
  { data: "27/03", iso: "2027-03-27", nome: "III Festival Talentos com Síndrome de Down" },
  {
    data: "22/05",
    iso: "2027-05-22",
    nome: "Workshopping: Jogos clássicos e virtuais como ferramenta para Estimulação Cognitiva",
  },
  { data: "05/06", iso: "2027-06-05", nome: "Festa Junina" },
  {
    data: "16/10",
    iso: "2027-10-16",
    nome: "III Simpósio sobre Envelhecimento das Pessoas com Deficiência Intelectual",
  },
  { data: "27/10", iso: "2027-10-27", nome: "Festa do Halloween" },
  { data: "27/11", iso: "2027-11-27", nome: "Bazar de Natal" },
  { data: "13/12", iso: "2027-12-13", nome: "Encerramento atendimento 2027" },
];
