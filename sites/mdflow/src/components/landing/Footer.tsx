import logoDark from "@/assets/mdflow-logo-dark.webp";
import { cadastroUrl } from "@/lib/cadastro";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-5 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3">
          <img src={logoDark} alt="MDFlow" className="h-8 w-fit object-contain" />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            A MDFlow organiza a sua preparação para o ENAMED em um plano que se ajusta ao seu
            desempenho — com questões, revisões e simulados no mesmo lugar.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <a
            href={cadastroUrl("rodape")}
            className="text-sm font-semibold text-brand transition-opacity hover:opacity-80"
          >
            Criar minha conta gratuita
          </a>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MDFlow — AI Medical Learning Network
          </p>
        </div>
      </div>
    </footer>
  );
}
