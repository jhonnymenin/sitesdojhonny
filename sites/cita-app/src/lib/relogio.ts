import { useEffect, useState } from "react";
import { agendaData, type AgendaItem } from "@/data/agendaData";
import { eventData } from "@/data/eventData";

/*
 * O relógio do evento.
 *
 * SÓ NO CLIENTE. A hora não pode ser calculada no servidor: a página é
 * renderizada lá e servida de cache, então um "acontecendo agora" assado no
 * servidor congelaria no horário do build e mostraria a mesa errada o dia
 * inteiro. Por isso o estado começa nulo — servidor e primeiro render do
 * navegador combinam — e a hora só entra depois de montar.
 *
 * SEMPRE NO FUSO DE SÃO PAULO, nunca no do aparelho. Quem vem de fora do estado
 * com o celular noutro fuso veria a programação deslocada. O `Intl` com
 * `formatToParts` é o jeito que não erra: devolve ano, mês, dia, hora e minuto
 * já convertidos, sem passar por `Date` intermediário.
 */
const FUSO = "America/Sao_Paulo";

type Instante = { dia: string; minutos: number };

function agoraEmSaoPaulo(d = new Date()): Instante {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: FUSO,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const v = (t: Intl.DateTimeFormatPartTypes) => partes.find((p) => p.type === t)?.value ?? "0";
  // "24" aparece à meia-noite em algumas implementações de hour12:false.
  const hora = Number(v("hour")) % 24;
  return { dia: `${v("year")}-${v("month")}-${v("day")}`, minutos: hora * 60 + Number(v("minute")) };
}

const emMinutos = (hhmm: string) => {
  const [h, m] = hhmm.replace("h", ":").split(":");
  return Number(h) * 60 + Number(m || 0);
};

/**
 * Começo e fim de cada atividade.
 *
 * A programação só traz o horário de início, então o fim de uma é o começo da
 * seguinte — é o que o próprio documento quer dizer com "08h30 - 09h30". A
 * última (encerramento) ganha 30 minutos, senão ficaria "acontecendo agora"
 * até a meia-noite.
 */
const FAIXAS = agendaData.map((a, i) => ({
  id: a.id,
  inicio: emMinutos(a.time),
  fim: i + 1 < agendaData.length ? emMinutos(agendaData[i + 1].time) : emMinutos(a.time) + 30,
}));

export type Estado = "passou" | "agora" | "aseguir";

export type Relogio = {
  /** false enquanto a hora ainda não foi lida (servidor e primeiro render) */
  pronto: boolean;
  /** true só no dia do evento, no fuso de São Paulo */
  noDia: boolean;
  minutos: number;
  estadoDe: (id: string) => Estado;
  /** a que está acontecendo agora, se houver */
  acontecendo: AgendaItem | null;
  /** a próxima a começar, se houver */
  aSeguir: AgendaItem | null;
  /** o evento já terminou hoje */
  terminou: boolean;
};

const PARADO: Relogio = {
  pronto: false,
  noDia: false,
  minutos: 0,
  estadoDe: () => "aseguir",
  acontecendo: null,
  aSeguir: null,
  terminou: false,
};

/**
 * Hora do evento, atualizada sozinha.
 *
 * Um minuto de intervalo basta: a programação é toda em blocos de 15 minutos ou
 * mais, e acordar o aparelho com mais frequência só gasta bateria de quem está
 * no congresso o dia inteiro. Além do intervalo, relê quando a aba volta a ficar
 * visível — celular guardado no bolso suspende o timer, e a pessoa não pode
 * desbloquear e ver a mesa de uma hora atrás.
 */
export function useRelogioDoEvento(): Relogio {
  const [instante, setInstante] = useState<Instante | null>(null);

  useEffect(() => {
    const ler = () => setInstante(agoraEmSaoPaulo());
    ler();
    const id = setInterval(ler, 60_000);
    const aoVoltar = () => {
      if (document.visibilityState === "visible") ler();
    };
    document.addEventListener("visibilitychange", aoVoltar);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", aoVoltar);
    };
  }, []);

  if (!instante) return PARADO;

  const noDia = instante.dia === eventData.isoDate;
  if (!noDia) return { ...PARADO, pronto: true };

  const m = instante.minutos;
  const atual = FAIXAS.find((f) => m >= f.inicio && m < f.fim) ?? null;
  const proxima = FAIXAS.find((f) => f.inicio > m) ?? null;

  const porId = (id: string | undefined) => agendaData.find((a) => a.id === id) ?? null;

  return {
    pronto: true,
    noDia: true,
    minutos: m,
    estadoDe: (id) => {
      const f = FAIXAS.find((x) => x.id === id);
      if (!f) return "aseguir";
      if (m >= f.fim) return "passou";
      if (m >= f.inicio) return "agora";
      return "aseguir";
    },
    acontecendo: porId(atual?.id),
    aSeguir: porId(proxima?.id),
    terminou: atual === null && proxima === null && m > FAIXAS[0].inicio,
  };
}
