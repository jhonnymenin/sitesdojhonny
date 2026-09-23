import { MessageCircle, LayoutDashboard, Headphones, MapPin, ShieldCheck, Clock } from "lucide-react";

const indicators = [
  { icon: MessageCircle, text: "Atendimento pelo WhatsApp" },
  { icon: LayoutDashboard, text: "Plataforma de gestão integrada" },
  { icon: Headphones, text: "Implantação acompanhada" },
  { icon: MapPin, text: "Suporte brasileiro" },
  { icon: ShieldCheck, text: "Dados tratados com cuidado" },
  { icon: Clock, text: "Rotina que não para às 18h" },
];

const Track = () => (
  <div className="fx-marquee items-center py-1" aria-hidden="true">
    {[...indicators, ...indicators].map((item, i) => (
      <div key={`${item.text}-${i}`} className="flex items-center gap-2.5 whitespace-nowrap">
        <item.icon className="w-4 h-4 text-brand flex-shrink-0" />
        <span className="text-sm font-medium text-foreground">{item.text}</span>
        <span className="ml-3 h-1 w-1 rounded-full bg-brand/40" />
      </div>
    ))}
  </div>
);

export const CredibilityBar = () => {
  return (
    <div className="relative bg-surface-alt border-y border-border py-4 sm:py-5 overflow-hidden">
      {/* Faixa em movimento contínuo */}
      <div className="relative">
        <Track />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface-alt to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface-alt to-transparent" />
      </div>

      {/* Versão acessível, sem movimento, para leitores de tela */}
      <ul className="sr-only">
        {indicators.map((item) => (
          <li key={item.text}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};
