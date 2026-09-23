import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { WA_LINK, QUIZ_LINK } from "@/constants";
import logoMedInteli from "@/assets/logo-medinteli.png";
import { buildQuizUrl, trackQuizClick, trackWhatsappClick } from "@/lib/tracking";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const serviceLinks = ["Atendimento 24h", "Agendamento automático", "Follow-up", "Lembretes de consulta"];
  const legalLinks = [
    { label: "Política de Privacidade", href: "/politica-de-privacidade" },
    { label: "Termos de Uso", href: "/termos-de-uso" },
  ];

  return (
    <footer className="relative bg-brand-deep text-white/70">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <motion.div
              className="mb-4 sm:mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <img src={logoMedInteli} alt="Med Inteli" className="h-10 sm:h-12 w-auto" />
            </motion.div>

            <p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-6 max-w-sm">
              Automação no WhatsApp e plataforma de gestão para clínicas médicas. Mais inteligência para a clínica, mais tempo para cuidar.
            </p>

            {/* Contact info */}
            <div className="space-y-2 sm:space-y-3">
              <a href="mailto:contato@medinteli.com" className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-white/70 hover:text-white transition-colors">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="truncate">contato@medinteli.com</span>
              </a>
              <a href={WA_LINK} onClick={() => trackWhatsappClick("footer")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-white/70 hover:text-white transition-colors">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                (11) 94895-0747
              </a>
              <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-white/70">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                São Paulo, Brasil
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-sm sm:text-base mb-3 sm:mb-4 text-white">Serviços</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href={buildQuizUrl(QUIZ_LINK)} onClick={() => trackQuizClick("footer")} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors">
                  Fazer diagnóstico gratuito
                </a>
              </li>
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#solucao"
                    className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors relative group"
                  >
                    {link}
                    <span className="absolute left-0 -bottom-px w-0 h-px bg-background group-hover:w-full transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-bold text-sm sm:text-base mb-3 sm:mb-4 text-white">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-px w-0 h-px bg-background group-hover:w-full transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-background/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-white/60 text-center md:text-left">
            © {currentYear} Med Inteli. Todos os direitos reservados.
          </p>

          <motion.a
            href={WA_LINK}
            onClick={() => trackWhatsappClick("footer_bottom")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/80 hover:text-white border border-background/20 rounded-xl px-4 py-2 transition-colors"
            whileHover={{ scale: 1.03 }}
          >
            <Phone className="w-4 h-4" />
            Falar no WhatsApp
          </motion.a>
        </div>
      </div>
    </footer>
  );
};
