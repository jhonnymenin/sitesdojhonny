import { ArrowRight, ShieldCheck, MonitorSmartphone, Headphones, Award } from "lucide-react";
import { CtaButton, Reveal, Section } from "./primitives";
import { MocMark } from "./Header";
import { checkoutUrl } from "@/lib/checkout";

const TRUST = [
  { icon: ShieldCheck, label: "Compra em ambiente seguro" },
  { icon: MonitorSmartphone, label: "Acesso em qualquer dispositivo" },
  { icon: Headphones, label: "Suporte especializado" },
  { icon: Award, label: "Certificado emitido pelo MOC" },
];

export function FinalCTA() {
  return (
    <Section>
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-[26px] leading-[1.2] font-semibold tracking-[-0.01em] text-cyan md:text-[36px]">
          Inscrição em ambiente seguro
        </h2>
        <p className="mt-4 text-base leading-[1.6] text-muted-foreground">
          Compra em ambiente seguro. Após a confirmação, enviamos as instruções de acesso por
          e-mail. Permanecemos à disposição — Equipe MOC.
        </p>
        <CtaButton href={checkoutUrl("combo", "final")} className="mt-7 w-full sm:w-auto">
          Garantir a condição do lote atual <ArrowRight size={18} />
        </CtaButton>
      </Reveal>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3">
            <Icon size={20} strokeWidth={1.5} className="shrink-0 text-electric" />
            <span className="text-sm text-muted-foreground">{label}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-8 pb-28 md:px-10 md:pb-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <MocMark className="h-8" />
        <div className="space-y-2 md:max-w-xl md:text-right">
          <p className="text-xs leading-relaxed text-muted-foreground">
            MOC | WorldMed Academy
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Aviso: o conteúdo tem finalidade educacional e não substitui avaliação clínica,
            protocolos institucionais nem julgamento médico individualizado.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface px-4 py-3 md:hidden">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <p className="label-mono text-muted-foreground">Lançamento · 30% OFF</p>
          <p className="truncate font-display text-base font-semibold text-foreground">
            R$ 2.030,00
          </p>
        </div>
        <CtaButton href={checkoutUrl("combo", "barra-mobile")} className="px-4 py-2.5 text-sm">
          Inscrever-se
        </CtaButton>
      </div>
    </div>
  );
}
