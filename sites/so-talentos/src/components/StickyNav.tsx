import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoSoTalentos from "@/assets/logo-so-talentos.png";

const links = [
  { label: "Sobre", href: "#sobre" },
  { label: "O que fazemos", href: "#servicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Artistas", href: "#artistas" },
  { label: "Contato", href: "#contato" },
];

const StickyNav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] gradient-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass border-b border-foreground/5" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-[72px]">
          <a href="#hero" aria-label="Só Talentos — início">
            <img src={logoSoTalentos} alt="Agência Só Talentos" className="h-12 w-auto" />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/60 hover:text-foreground text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button variant="gradient" size="sm" asChild>
              <a href="#contato">Solicitar orçamento</a>
            </Button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-foreground p-2"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <motion.div
            className="lg:hidden glass border-t border-foreground/5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 py-6 space-y-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-foreground/60 hover:text-foreground text-base font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button variant="gradient" size="lg" className="w-full" asChild>
                <a href="#contato" onClick={() => setOpen(false)}>
                  Solicitar orçamento
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
};

export default StickyNav;
