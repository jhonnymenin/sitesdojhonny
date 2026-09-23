import logoOn from "@/assets/logo-oneducacao.png";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black/40 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
        <div>
          <img src={logoOn} alt="On Educação" className="h-8 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Conectando você ao futuro da educação em saúde, ciência e neurociência clínica.
          </p>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">O Evento</div>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>1º Simpósio Técnico e Prático</li>
            <li>Neurociência da Memória</li>
            <li>5 de Dezembro de 2026</li>
            <li>Centro de Convenções Millenium · SP</li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">Institucional</div>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><a href="#" className="transition-colors hover:text-white">Política de Privacidade</a></li>
            <li><a href="#" className="transition-colors hover:text-white">Termos de Uso</a></li>
            <li><a href="#" className="transition-colors hover:text-white">Contato</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 px-6 pt-6 text-xs text-white/40">
        © {new Date().getFullYear()} On Educação · Todos os direitos reservados
      </div>
    </footer>
  );
}
