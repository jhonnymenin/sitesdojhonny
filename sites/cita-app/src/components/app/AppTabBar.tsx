import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  CalendarDays,
  Users,
  FileText,
  MoreHorizontal,
  Info,
  Award,
  MessageCircle,
  Sparkles,
  Zap,
  ChevronRight,
  Camera,
} from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

const tabs: { to: string; label: string; icon: typeof Home; exact?: boolean }[] = [
  { to: "/", label: "Início", icon: Home, exact: true },
  { to: "/agenda", label: "Agenda", icon: CalendarDays },
  { to: "/palestrantes", label: "Palestrantes", icon: Users },
  { to: "/materiais", label: "Materiais", icon: FileText },
];

const moreLinks: { to: string; label: string; icon: typeof Home }[] = [
  // Primeiro da lista: é a única coisa do app que a pessoa faz ANTES do
  // evento, e é a que gera divulgação.
  { to: "/euvou", label: "#EuVou — monte a sua arte", icon: Camera },
  { to: "/interatividade", label: "Interatividade", icon: Zap },
  { to: "/informacoes", label: "Informações práticas", icon: Info },
  { to: "/patrocinadores", label: "Patrocinadores", icon: Award },
  { to: "/sobre", label: "Sobre o evento", icon: Sparkles },
  { to: "/contato", label: "Fale conosco", icon: MessageCircle },
];

export function AppTabBar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const moreActive = moreLinks.some((l) => pathname.startsWith(l.to));

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center">
        <div className="w-full max-w-[600px] border-t border-white/10 bg-navy-deep pb-safe text-white shadow-[0_-12px_40px_-24px_rgba(0,0,0,0.6)]">
          <ul className="grid grid-cols-5">
            {tabs.map(({ to, label, icon: Icon, exact }) => {
              const active = exact ? pathname === to : pathname.startsWith(to);
              return (
                <li key={to}>
                  <Link
                    to={to as never}
                    className={cn(
                      "app-tap flex h-16 flex-col items-center justify-center gap-1 text-[10px] font-medium tracking-wide",
                      active ? "text-leaf" : "text-white/60",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-10 items-center justify-center rounded-full transition-colors",
                        active && "bg-leaf/15",
                      )}
                    >
                      <Icon size={20} strokeWidth={active ? 2.2 : 1.7} />
                    </span>
                    {label}
                  </Link>
                </li>
              );
            })}
            <li>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className={cn(
                  "app-tap flex h-16 w-full flex-col items-center justify-center gap-1 text-[10px] font-medium tracking-wide",
                  moreActive ? "text-leaf" : "text-white/60",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-10 items-center justify-center rounded-full transition-colors",
                    moreActive && "bg-leaf/15",
                  )}
                >
                  <MoreHorizontal size={20} strokeWidth={moreActive ? 2.2 : 1.7} />
                </span>
                Mais
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="mx-auto max-w-[600px] border-none bg-white">
          <DrawerHeader className="pb-2">
            <DrawerTitle className="font-display text-base font-semibold text-navy">Mais</DrawerTitle>
          </DrawerHeader>
          <ul className="px-4 pb-8">
            {moreLinks.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to as never}
                  onClick={() => setOpen(false)}
                  className="app-tap flex items-center gap-3 rounded-2xl px-3 py-4 text-navy hover:bg-mist/60"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 text-teal">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span className="flex-1 text-sm font-medium">{label}</span>
                  <ChevronRight size={16} className="text-navy/30" />
                </Link>
              </li>
            ))}
          </ul>
        </DrawerContent>
      </Drawer>
    </>
  );
}
