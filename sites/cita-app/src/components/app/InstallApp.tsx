import { useEffect, useState } from "react";
import { Smartphone, Share, Plus, MoreVertical } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/** Botão "Adicionar à tela inicial": usa o fluxo nativo quando disponível. */
export function InstallApp() {
  const [deferred, setDeferred] = useState<InstallPromptEvent | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as InstallPromptEvent);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    if (window.matchMedia("(display-mode: standalone)").matches) setInstalled(true);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;

  const handleClick = async () => {
    if (deferred) {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === "accepted") setInstalled(true);
      setDeferred(null);
      return;
    }
    setShowHelp(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="app-tap flex w-full items-center justify-center gap-2 rounded-2xl bg-navy py-4 text-xs font-bold uppercase tracking-[0.16em] text-white"
      >
        <Smartphone size={15} /> Adicionar à tela inicial
      </button>

      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="max-w-[420px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-display text-base text-navy">Adicionar à tela inicial</DialogTitle>
            <DialogDescription className="text-xs text-navy/55">
              Siga o passo a passo do seu celular para instalar o app.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-2xl bg-mist/60 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal">iPhone · Safari</p>
              <ol className="mt-2 space-y-1.5 text-xs leading-relaxed text-navy/70">
                <li className="flex items-center gap-2">
                  <Share size={14} className="shrink-0 text-navy" /> Toque no botão Compartilhar
                </li>
                <li className="flex items-center gap-2">
                  <Plus size={14} className="shrink-0 text-navy" /> Escolha “Adicionar à Tela de Início”
                </li>
                <li>Confirme em “Adicionar”</li>
              </ol>
            </div>

            <div className="rounded-2xl bg-mist/60 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal">Android · Chrome</p>
              <ol className="mt-2 space-y-1.5 text-xs leading-relaxed text-navy/70">
                <li className="flex items-center gap-2">
                  <MoreVertical size={14} className="shrink-0 text-navy" /> Abra o menu do navegador
                </li>
                <li>Escolha “Instalar aplicativo” ou “Adicionar à tela inicial”</li>
                <li>Confirme a instalação</li>
              </ol>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
