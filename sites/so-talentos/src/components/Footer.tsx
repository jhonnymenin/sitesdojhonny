import { Instagram, MessageCircle } from "lucide-react";
import logoSoTalentos from "@/assets/logo-so-talentos.png";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  whatsappLink,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/contact";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "O que fazemos", href: "#servicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Artistas", href: "#artistas" },
  { label: "Contato", href: "#contato" },
];

const Footer = () => (
  <footer className="border-t border-foreground/5 section-padding py-16">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <img src={logoSoTalentos} alt="Agência Só Talentos" className="h-10 w-auto mb-4" />
          <p className="text-body text-sm max-w-sm">
            Conectando artistas, marcas e público por meio da música.
          </p>
        </div>

        <div>
          <p className="heading-sub text-foreground text-xs tracking-[0.2em] mb-4">Navegação</p>
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-body text-sm hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="heading-sub text-foreground text-xs tracking-[0.2em] mb-4">Contato</p>
          <div className="space-y-2">
            <a
              href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-body text-sm hover:text-foreground transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-primary" />
              {WHATSAPP_DISPLAY}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-body text-sm hover:text-foreground transition-colors"
            >
              <Instagram className="w-4 h-4 text-primary" />@{INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-foreground/5 mt-12 pt-8">
        <p className="text-body text-xs text-center">
          © {new Date().getFullYear()} Agência Só Talentos. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
