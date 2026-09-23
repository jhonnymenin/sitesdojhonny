import { Brain, Users, GraduationCap, Building2, BadgeCheck, Sparkles, Stethoscope, FlaskConical } from "lucide-react";

const items = [
  { icon: Brain, label: "Neurociência da Memória" },
  { icon: Users, label: "250 Participantes" },
  { icon: GraduationCap, label: "Cerimônia de Diplomas" },
  { icon: Building2, label: "Centro de Convenções Millenium" },
  { icon: BadgeCheck, label: "Certificação Reconhecida" },
  { icon: Sparkles, label: "Prática Imersiva" },
  { icon: Stethoscope, label: "Casos Clínicos Reais" },
  { icon: FlaskConical, label: "Ciência de Ponta" },
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <section aria-label="Pilares do evento" className="relative overflow-hidden border-y border-white/10 bg-black/30 py-6 backdrop-blur">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
      <div className="marquee-track flex w-max items-center gap-10">
        {row.map(({ icon: Icon, label }, i) => (
          <div key={i} className="flex items-center gap-3 whitespace-nowrap">
            <Icon className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">{label}</span>
            <span className="text-white/20">◆</span>
          </div>
        ))}
      </div>
    </section>
  );
}
