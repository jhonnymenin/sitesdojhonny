import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/contact";

/** Floating WhatsApp shortcut, always available on the page. */
const WhatsAppButton = () => (
  <motion.a
    href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar pelo WhatsApp"
    className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full gradient-primary glow-primary flex items-center justify-center text-primary-foreground"
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1.2, duration: 0.4 }}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
  >
    <MessageCircle className="w-6 h-6" />
  </motion.a>
);

export default WhatsAppButton;
