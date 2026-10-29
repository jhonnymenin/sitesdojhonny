import { useEffect, useState } from "react";
import { modalAberto } from "./SimposioModal";

export function LeadModal() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    /*
     * Não abrir por cima do pop-up do Simpósio. Dois modais na mesma visita é o
     * jeito mais rápido de alguém fechar a aba — e o do Simpósio tem prazo,
     * então ele vai primeiro. Se o outro estiver aberto, este reconsulta em vez
     * de desistir: a pessoa pode fechar o do Simpósio em dois segundos e aí a
     * captação continua valendo.
     */
    let t: ReturnType<typeof setTimeout>;
    const tentar = () => {
      if (modalAberto) {
        t = setTimeout(tentar, 2000);
        return;
      }
      setOpen(true);
      setShown(true);
    };
    t = setTimeout(tentar, 8000);

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) {
        setOpen(true);
        setShown(true);
        clearTimeout(t);
      }
    };
    document.addEventListener("mouseleave", onLeave);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [shown]);

  if (!open) return null;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const msg = `Olá! Meu nome é ${data.get("nome")}. Gostaria de passar pela triagem da Fundação para ser atendido. Programa de interesse: ${data.get("projeto")}. WhatsApp: ${data.get("whats")}`;
    window.open(`https://wa.me/5511930352436?text=${encodeURIComponent(msg)}`, "_blank");
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/60 px-4 animate-[fade-in_0.3s_ease-out]"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-card p-8 shadow-card animate-[fade-up_0.5s_ease-out]">
        <button
          onClick={() => setOpen(false)}
          aria-label="Fechar"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary-soft"
        >
          ×
        </button>
        {/*
          A pergunta é a que a Fundação pediu em 28/10/2026, no lugar de "Quer
          saber se temos vaga?". A triagem é o caminho real de entrada — quem
          chega pedindo vaga passa por ela de qualquer jeito —, e nomear isso
          na pergunta evita a expectativa de matrícula imediata.
        */}
        <h3 className="font-display text-2xl font-bold leading-tight text-charcoal">
          Deseja passar pela triagem da Fundação Dona Paulina para ser atendido?
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Preencha os campos e nossa equipe entrará em contato.
        </p>
        <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
          <input
            name="nome"
            required
            placeholder="Seu nome"
            className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
          <input
            name="whats"
            required
            placeholder="WhatsApp (com DDD)"
            className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
          <select
            name="projeto"
            required
            defaultValue=""
            className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          >
            <option value="" disabled>
              Projeto de interesse
            </option>
            <option>Viva D+</option>
            <option>Empregabilidade</option>
          </select>
          <button
            type="submit"
            className="mt-1 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft transition hover:scale-[1.02] hover:bg-primary-dark"
          >
            Quero passar pela triagem
          </button>
        </form>
      </div>
    </div>
  );
}
