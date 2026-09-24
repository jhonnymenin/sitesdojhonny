import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/site";
import logoNavbar from "@/assets/logo-navbar.png";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#procedimento", label: "Procedimento" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#blog", label: "Blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b hairline shadow-soft"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 h-24 flex items-center justify-between">
        <a href="#top" className="flex items-center group shrink-0">
          <img
            src={logoNavbar}
            alt="Dr. Antonio Rahal"
            className={`h-12 sm:h-14 md:h-16 w-auto max-w-[220px] sm:max-w-[280px] md:max-w-[340px] object-contain transition-all duration-700 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
        </a>


        <ul className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-[13px] tracking-wide transition-colors duration-300 ${
                  scrolled
                    ? "text-muted-foreground hover:text-brand"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className={
              scrolled
                ? "hidden sm:inline-flex btn-outline-brand !py-2.5 !px-6 !text-[11px]"
                : "hidden sm:inline-flex btn-outline-light !py-2.5 !px-6 !text-[11px]"
            }
          >
            Agendar Consulta
          </a>
          <button
            className={`lg:hidden p-2 ${scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-white/97 backdrop-blur-md border-t hairline px-6 py-6">
          <ul className="flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground hover:text-brand tracking-wide"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.header>
  );
}
