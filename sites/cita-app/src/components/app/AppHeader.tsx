import { Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import logoAsset from "@/assets/logo-simposio-v2.png";

export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 border-b border-navy/10 bg-white/90 backdrop-blur-md">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
        <button
          type="button"
          aria-label="Voltar"
          onClick={() => router.history.back()}
          className="app-tap flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist/70 text-navy"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate font-display text-base font-semibold tracking-tight text-navy">{title}</h1>
          {subtitle && <p className="truncate text-[11px] text-navy/50">{subtitle}</p>}
        </div>
        <Link to="/" aria-label="Início" className="app-tap shrink-0">
          <img src={logoAsset} alt="" className="h-8 w-auto object-contain" />
        </Link>
      </div>
    </header>
  );
}
