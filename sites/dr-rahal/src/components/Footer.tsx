import { Instagram, MessageCircle, MapPin } from "lucide-react";
import { WHATSAPP_URL, INSTAGRAM_URL } from "@/lib/site";
import logoFull from "@/assets/logo-rahal-full.png";

export function Footer() {
  return (
    <footer className="relative bg-white pt-20 pb-10 border-t hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid sm:grid-cols-2 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <img src={logoFull} alt="Dr. Antonio Rahal" className="h-24 w-auto" />
          <p className="mt-6 text-sm text-muted-foreground font-light leading-relaxed max-w-sm">
            Referência internacional em tratamento minimamente invasivo de tireoide.
            Atendimento em São Paulo.
          </p>
          <div className="mt-6 flex flex-col gap-2.5 text-sm">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors">
              <Instagram size={14} /> @antoniorahal
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors">
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="label-eyebrow text-[10px]">Tópicos</div>
          <ul className="mt-5 space-y-3 text-sm font-light">
            {[
              { label: "Sobre o Dr. Antonio Rahal", href: "#sobre" },
              { label: "Portfólio da clínica", href: "#portfolio" },
              { label: "Procedimentos de ablação", href: "#procedimento" },
              { label: "Depoimentos reais", href: "#depoimentos" },
              { label: "Nas mídias", href: "#press" },
            ].map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-muted-foreground hover:text-gold transition-colors">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="label-eyebrow text-[10px]">Contato</div>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground font-light">
            <li className="inline-flex items-center gap-2"><MapPin size={13} className="text-gold" /> São Paulo, SP</li>
          </ul>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-outline-brand mt-6 !py-2.5 !px-6 !text-[11px]">
            Agendar
          </a>
        </div>

      </div>

      <div className="mt-20 border-t hairline pt-7">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] tracking-wide text-muted-foreground/70">
          <span>© 2026 Dr. Antonio Rahal · Todos os direitos reservados</span>
          <span>CRM-SP · XXXXX</span>
        </div>
      </div>
    </footer>
  );
}
