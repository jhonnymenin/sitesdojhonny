/**
 * Materiais científicos por sessão.
 * Basta preencher `driveUrl` com o link do Google Drive para liberar o acesso.
 * Enquanto estiver vazio, o app mostra o selo "Disponível em breve".
 * `sessionId` deve corresponder ao id da atividade em src/data/agendaData.ts.
 */
export type Material = {
  sessionId: string;
  title: string;
  subtitle?: string;
  driveUrl: string;
};

export const materialsData: Material[] = [
  { sessionId: "mesa-1", title: "Mesa 1", subtitle: "Integração do Cuidado e Jornada do Paciente", driveUrl: "" },
  { sessionId: "mesa-2", title: "Mesa 2", subtitle: "Hot Topics em Doenças Imunomediadas", driveUrl: "" },
  { sessionId: "mesa-3", title: "Mesa 3", subtitle: "Controvérsias em Doenças Imunomediadas", driveUrl: "" },
  { sessionId: "mesa-4", title: "Mesa 4", subtitle: "Aplicações Clínicas e Decisões Compartilhadas", driveUrl: "" },
  { sessionId: "mesa-5", title: "Mesa 5", subtitle: "Casos Clínicos Interativos", driveUrl: "" },
  { sessionId: "satelite-1", title: "Simpósio Satélite I", driveUrl: "" },
  { sessionId: "satelite-2", title: "Simpósio Satélite II", driveUrl: "" },
  { sessionId: "satelite-3", title: "Simpósio Satélite III", driveUrl: "" },
  { sessionId: "satelite-4", title: "Simpósio Satélite IV", driveUrl: "" },
];

export const materialBySession = (sessionId: string) =>
  materialsData.find((m) => m.sessionId === sessionId && m.driveUrl.trim() !== "");
