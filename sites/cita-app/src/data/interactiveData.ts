/**
 * Área de Interatividade.
 * Estrutura preparada para integração futura — enquanto `enabled` for false,
 * o app mostra o estado "Interatividade disponível durante o evento."
 * Basta preencher as listas e marcar `enabled: true` quando o conteúdo existir.
 */

export type QuizQuestion = {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId?: string;
  explanation?: string;
  points?: number;
};

export type Poll = {
  id: string;
  question: string;
  options: { id: string; text: string; votes?: number }[];
  /** total de votos recebidos, quando disponível */
  totalVotes?: number;
};

export type AudienceQuestion = {
  id: string;
  sessionId: string;
  text: string;
  status: "pendente" | "aprovada" | "respondida";
  likes: number;
  createdAt: string;
};

export type LiveState = {
  /** id da sessão ativa em agendaData */
  activeSessionId?: string;
  currentPollId?: string;
  showResults: boolean;
};

export type InteractiveModule = {
  id: "quiz" | "enquetes" | "perguntas" | "ao-vivo";
  title: string;
  description: string;
  enabled: boolean;
};

export const interactiveData = {
  /** liga a área inteira quando a integração estiver ativa */
  enabled: false,
  emptyMessage: "Interatividade disponível durante o evento.",
  modules: [
    { id: "quiz", title: "Quiz", description: "Teste seus conhecimentos", enabled: false },
    { id: "enquetes", title: "Enquetes", description: "Participe das votações", enabled: false },
    {
      id: "perguntas",
      title: "Perguntas aos palestrantes",
      description: "Envie sua pergunta durante a sessão",
      enabled: false,
    },
    { id: "ao-vivo", title: "Votação ao vivo", description: "Participe das atividades interativas", enabled: false },
  ] as InteractiveModule[],
  quiz: [] as QuizQuestion[],
  polls: [] as Poll[],
  questions: [] as AudienceQuestion[],
  live: { showResults: false } as LiveState,
};
