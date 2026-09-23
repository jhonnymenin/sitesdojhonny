import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => { localStorage.setItem("cookie-consent", "accepted"); setVisible(false); };
  const reject = () => { localStorage.setItem("cookie-consent", "rejected"); setVisible(false); };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50 premium-card rounded-outer p-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] as unknown as [number, number, number, number] }}
        >
          <p className="heading-sub text-foreground text-sm mb-2">Este site usa cookies</p>
          <p className="text-body text-xs mb-4">Utilizamos cookies para melhorar sua experiência de navegação.</p>
          <div className="flex gap-3">
            <Button variant="hero" size="sm" onClick={accept}>Aceitar</Button>
            <Button variant="ghost" size="sm" onClick={reject}>Recusar</Button>
            <Button variant="ghost" size="sm" onClick={reject}>Personalizar</Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
