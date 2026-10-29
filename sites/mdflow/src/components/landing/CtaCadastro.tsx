import { ArrowRight } from "lucide-react";
import iconBlue from "@/assets/mdflow-icon-blue.png";
import { cadastroUrl } from "@/lib/cadastro";
import { Reveal } from "./Reveal";

/*
 * Chamada para cadastro.
 *
 * Fundo azul-escuro e botão branco, como o brief pede.
 *
 * O ESPAÇO DA ARTE É DO MASCOTE DO CÉREBRO. Ele não existe no repositório nem
 * no app — vasculhei os dois. Enquanto não chega, fica o ícone oficial da
 * marca, que é arte de verdade da MDFlow. Trocar é substituir este import.
 */
export function CtaCadastro() {
  return (
    <section id="cadastro" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
      <Reveal className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl bg-brand-deep">
        <div className="grid items-center gap-10 px-6 py-14 sm:px-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:py-16">
          <div className="flex flex-col gap-6">
            <h2 className="text-balance text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl">
              Comece agora. O acesso está gratuito na fase de testes.
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Prepare-se para o ENAMED com uma plataforma que evolui com você.
            </p>
            <a
              href={cadastroUrl("cta-final")}
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-brand-deep transition-all hover:bg-white/90 active:scale-[0.98] sm:w-auto"
            >
              Quero testar gratuitamente
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={iconBlue}
              width={1234}
              height={1336}
              loading="lazy"
              alt=""
              aria-hidden
              className="h-40 w-auto object-contain sm:h-52"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
