import { ArrowRight } from "lucide-react";
import iconBlue from "@/assets/mdflow-icon-blue.png";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section id="contato" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
      <Reveal className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl bg-brand-deep px-6 py-16 text-center sm:px-14 lg:py-24">
        <div
          aria-hidden
          className="grid-faint absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand/40 blur-3xl"
        />
        <div className="relative flex flex-col items-center gap-7">
          <img
            src={iconBlue}
            alt=""
            aria-hidden
            className="h-12 w-auto brightness-0 invert"
          />
          <h2 className="max-w-3xl text-balance text-3xl font-extrabold leading-[1.1] text-primary-foreground sm:text-4xl lg:text-5xl">
            O futuro da formação médica já começou.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
            Use tecnologia e inteligência para formar melhores médicos. Faça parte da nova jornada de
            aprendizagem médica.
          </p>
          <a
            href="mailto:contato@mdflow.com.br?subject=Quero%20conhecer%20a%20MDFlow"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-background px-6 text-sm font-semibold text-brand shadow-lift transition-all hover:brightness-105 active:scale-[0.98]"
          >
            Quero conhecer a MDFlow
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/50">
            MDFlow — AI Medical Learning Network
          </p>
        </div>
      </Reveal>
    </section>
  );
}
