import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SIMPOSIO } from "@/lib/simposio";

/*
 * A faixa do topo da home.
 *
 * Até 7/11/2026 ela anuncia o II Simpósio; depois, volta sozinha para a campanha
 * "Laços que protegem", que é o conteúdo permanente. A troca é por data de
 * propósito: ninguém precisa lembrar de desfazer nada no dia seguinte ao evento,
 * e a doação não fica fora do ar por esquecimento.
 *
 * A DATA É LIDA NO CLIENTE, não no servidor. A página é renderizada na Vercel e
 * servida de cache; uma decisão tomada no servidor poderia congelar a faixa do
 * Simpósio depois do evento, ou a da campanha antes dele. O estado inicial é o
 * Simpósio — que é o que vale agora —, então não há troca piscando na tela.
 *
 * O desenho e o texto da campanha são os mesmos de antes, movidos para cá sem
 * alteração: o Sections.tsx concentra a página inteira e já foi revisado pela
 * Fundação, e aqui a faixa fica isolada para ser removida com uma linha.
 */
export function FaixaTopo() {
  const [passou, setPassou] = useState(false);

  useEffect(() => {
    const hoje = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    setPassou(hoje > SIMPOSIO.dataISO);
  }, []);

  if (passou) return <FaixaCampanha />;
  return <FaixaSimposio />;
}

function FaixaSimposio() {
  return (
    <div className="border-b border-primary/20 bg-primary-dark px-6 py-4 text-center text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 lg:flex-row lg:gap-8">
        <div className="flex items-center gap-3">
          <span className="inline-block h-2 w-2 shrink-0 animate-ping rounded-full bg-primary" />
          <span className="font-display text-lg font-bold tracking-[0.1em] text-white uppercase sm:text-xl lg:text-2xl">
            {SIMPOSIO.titulo} · inscrições abertas
          </span>
        </div>
        <p className="max-w-lg text-sm font-medium text-white sm:text-base">
          {SIMPOSIO.subtitulo}. {SIMPOSIO.dataLegivel}, {SIMPOSIO.horario}.
        </p>
        <Link
          to="/simposio"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground transition-all hover:bg-white hover:text-primary-dark sm:text-sm"
        >
          QUERO PARTICIPAR
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function FaixaCampanha() {
  return (
    <div className="border-b border-primary/20 bg-primary-dark px-6 py-4 text-center text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 lg:flex-row lg:gap-8">
        <div className="flex items-center gap-3">
          <span className="inline-block h-2 w-2 shrink-0 animate-ping rounded-full bg-primary" />
          <span className="font-display text-lg font-bold tracking-[0.1em] text-white uppercase sm:text-xl lg:text-2xl">
            Campanha Laços que protegem
          </span>
        </div>
        <p className="max-w-lg text-sm font-medium text-white sm:text-base">
          Sua doação transforma vidas. Apoie nossa causa e ajude a manter nossa missão!
        </p>
        <a
          href="#doacao"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground transition-all hover:bg-white hover:text-primary-dark sm:text-sm"
        >
          QUERO APOIAR
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
