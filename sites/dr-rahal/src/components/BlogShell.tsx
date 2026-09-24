import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { WHATSAPP_URL } from "@/lib/site";
import { Footer } from "./Footer";
import logoNavbar from "@/assets/logo-navbar.png";

export interface BlogShellProps {
  children: ReactNode;
}

/** Layout compartilhado das páginas de blog: header sóbrio + rodapé da LP. */
export function BlogShell({ children }: BlogShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b hairline">
        <nav className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between gap-6">
          <Link to="/" className="shrink-0">
            <img
              src={logoNavbar}
              alt="Dr. Antonio Rahal"
              className="h-10 sm:h-12 w-auto max-w-[220px] object-contain"
            />
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/blog" className="hidden sm:inline text-[13px] tracking-wide text-muted-foreground hover:text-brand transition-colors">
              Blog
            </Link>
            <Link to="/" className="hidden sm:inline text-[13px] tracking-wide text-muted-foreground hover:text-brand transition-colors">
              Voltar ao site
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-brand !py-2.5 !px-6 !text-[11px]"
            >
              Agendar
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
