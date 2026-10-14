import { useEffect, useState } from "react";
import { Smartphone, Share, SquarePlus, MoreVertical, X, Download } from "lucide-react";
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

const CHAVE_DISPENSADO = "cita-app:instalar-dispensado";

/*
 * "Adicionar à tela inicial".
 *
 * O ANDROID TEM API, O IPHONE NÃO. No Chrome o navegador avisa que o app é
 * instalável (`beforeinstallprompt`), guardamos o evento e um toque abre o
 * instalador nativo. No Safari do iOS não existe equivalente: o único caminho é
 * ensinar o gesto. Por isso o componente detecta a plataforma e mostra **só** as
 * instruções que servem para aquele aparelho — um passo a passo com telas de
 * dois sistemas faz a pessoa ler o que não interessa e desistir.
 *
 * QUANDO NÃO APARECE: quando o app já está rodando instalado (`display-mode:
 * standalone`, e no iOS o `navigator.standalone`), e quando a pessoa já fechou o
 * convite antes — a escolha fica no localStorage. Insistir num banner já
 * recusado é a forma mais rápida de alguém fechar o app.
 */
function ehIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  // iPadOS recente se identifica como Mac; o toque é o que o diferencia.
  return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

function jaInstalado(): boolean {
  if (typeof window === "undefined") return false;
  const standalone = window.matchMedia?.("(display-mode: standalone)").matches;
  const iosStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone;
  return Boolean(standalone || iosStandalone);
}

function usarInstalacao() {
  const [deferred, setDeferred] = useState<InstallPromptEvent | null>(null);
  const [instalado, setInstalado] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    const aoPoder = (e: Event) => {
      e.preventDefault();
      setDeferred(e as InstallPromptEvent);
    };
    const aoInstalar = () => setInstalado(true);
    window.addEventListener("beforeinstallprompt", aoPoder);
    window.addEventListener("appinstalled", aoInstalar);
    setInstalado(jaInstalado());
    setIos(ehIOS());
    return () => {
      window.removeEventListener("beforeinstallprompt", aoPoder);
      window.removeEventListener("appinstalled", aoInstalar);
    };
  }, []);

  return { deferred, setDeferred, instalado, setInstalado, ios };
}

function Instrucoes({ ios }: { ios: boolean }) {
  if (ios) {
    return (
      <div className="rounded-2xl bg-mist/60 p-4">
        <p className="text-[10px] font-bold tracking-[0.18em] text-teal uppercase">iPhone · Safari</p>
        <ol className="mt-3 space-y-3 text-sm leading-relaxed text-navy/75">
          <li className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-navy shadow-sm">
              <Share size={18} strokeWidth={1.8} />
            </span>
            <span className="pt-1.5">Toque em <strong className="font-semibold text-navy">Compartilhar</strong>, na barra de
            baixo</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-navy shadow-sm">
              <SquarePlus size={18} strokeWidth={1.8} />
            </span>
            <span className="pt-1.5">Role e escolha{" "}
            <strong className="font-semibold text-navy">Adicionar à Tela de Início</strong></span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white font-bold text-navy shadow-sm">
              3
            </span>
            <span className="pt-1.5">Confirme em <strong className="font-semibold text-navy">Adicionar</strong></span>
          </li>
        </ol>
        {/*
          O Safari é o único navegador do iPhone que instala. Quem abriu o link
          pelo Instagram ou pelo WhatsApp está num navegador embutido, onde o
          menu Compartilhar não tem essa opção — e ficaria procurando.
        */}
        <p className="mt-4 text-xs leading-relaxed text-navy/55">
          Não encontrou? Abra este endereço no <strong>Safari</strong> — dentro do Instagram ou do
          WhatsApp a opção não aparece.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-mist/60 p-4">
      <p className="text-[10px] font-bold tracking-[0.18em] text-teal uppercase">Android · Chrome</p>
      <ol className="mt-3 space-y-3 text-sm leading-relaxed text-navy/75">
        <li className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-navy shadow-sm">
            <MoreVertical size={18} strokeWidth={1.8} />
          </span>
            <span className="pt-1.5">Abra o menu do navegador, no canto superior</span>
          </li>
        <li className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-navy shadow-sm">
            <Download size={18} strokeWidth={1.8} />
          </span>
            <span className="pt-1.5">Escolha <strong className="font-semibold text-navy">Instalar aplicativo</strong> ou{" "}
          <strong className="font-semibold text-navy">Adicionar à tela inicial</strong></span>
          </li>
        <li className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white font-bold text-navy shadow-sm">
            3
          </span>
            <span className="pt-1.5">Confirme a instalação</span>
          </li>
      </ol>
    </div>
  );
}

/** Botão, para páginas internas. */
export function InstallApp() {
  const { deferred, setDeferred, instalado, setInstalado, ios } = usarInstalacao();
  const [ajuda, setAjuda] = useState(false);

  if (instalado) return null;

  const aoClicar = async () => {
    if (deferred) {
      await deferred.prompt();
      const escolha = await deferred.userChoice;
      if (escolha.outcome === "accepted") setInstalado(true);
      setDeferred(null);
      return;
    }
    setAjuda(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={aoClicar}
        className="app-tap flex w-full items-center justify-center gap-2 rounded-2xl bg-navy py-4 text-xs font-bold tracking-[0.16em] text-white uppercase"
      >
        <Smartphone size={15} /> Adicionar à tela inicial
      </button>
      <DialogInstalar aberto={ajuda} aoFechar={setAjuda} ios={ios} />
    </>
  );
}

function DialogInstalar({
  aberto,
  aoFechar,
  ios,
}: {
  aberto: boolean;
  aoFechar: (v: boolean) => void;
  ios: boolean;
}) {
  return (
    <Dialog open={aberto} onOpenChange={aoFechar}>
      <DialogContent className="max-w-[420px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-display text-base text-navy">
            Deixe o app na sua tela inicial
          </DialogTitle>
          <DialogDescription className="text-xs text-navy/55">
            São três toques. Depois é só abrir pelo ícone, como qualquer app.
          </DialogDescription>
        </DialogHeader>
        <Instrucoes ios={ios} />
      </DialogContent>
    </Dialog>
  );
}

/**
 * Convite na home. Some depois de instalado ou de recusado.
 *
 * Fica na primeira tela porque era aí que faltava: o botão existia só na página
 * de informações práticas, que quase ninguém abre antes do evento.
 */
export function InstallBanner() {
  const { deferred, setDeferred, instalado, setInstalado, ios } = usarInstalacao();
  const [ajuda, setAjuda] = useState(false);
  const [dispensado, setDispensado] = useState(true);

  useEffect(() => {
    // Só depois de montar: no servidor não há localStorage, e começar oculto
    // evita o banner piscar na tela de quem já dispensou.
    try {
      setDispensado(localStorage.getItem(CHAVE_DISPENSADO) === "1");
    } catch {
      setDispensado(false);
    }
  }, []);

  if (instalado || dispensado) return null;

  const aoClicar = async () => {
    if (deferred) {
      await deferred.prompt();
      const escolha = await deferred.userChoice;
      if (escolha.outcome === "accepted") setInstalado(true);
      setDeferred(null);
      return;
    }
    setAjuda(true);
  };

  const dispensar = () => {
    setDispensado(true);
    try {
      localStorage.setItem(CHAVE_DISPENSADO, "1");
    } catch {
      // Navegação privada: some nesta sessão e volta na próxima. Tudo bem.
    }
  };

  return (
    <>
      {/*
        Ícone + texto em cima, botão de largura inteira embaixo. Lado a lado, a
        390px, sobrava pouco para o texto: o título quebrava em duas linhas e o
        subtítulo em três, e o X encostava no título.
      */}
      <div className="app-card relative p-4">
        <button
          type="button"
          onClick={dispensar}
          aria-label="Dispensar"
          className="absolute top-1.5 right-1.5 flex h-9 w-9 items-center justify-center rounded-full text-navy/30"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 pr-8">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal text-white">
            <Smartphone size={20} strokeWidth={1.7} />
          </span>
          <div className="min-w-0">
            <p className="font-display text-[13px] leading-tight font-semibold text-navy">
              Deixe o app na sua tela inicial
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-navy/55">
              Abre direto no ícone, sem procurar o link
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={aoClicar}
          className="app-tap mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-navy py-3 text-[11px] font-bold tracking-[0.16em] text-white uppercase"
        >
          {deferred ? (
            <>
              <Download size={14} /> Instalar o app
            </>
          ) : (
            <>
              <Smartphone size={14} /> Ver como adicionar
            </>
          )}
        </button>
      </div>

      <DialogInstalar aberto={ajuda} aoFechar={setAjuda} ios={ios} />
    </>
  );
}
