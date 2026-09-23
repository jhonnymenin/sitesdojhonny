import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CHECKOUT_URL } from "@/lib/checkout";
import { trackInitiateCheckout, trackLead } from "@/lib/meta-pixel";
import { saveLead } from "@/lib/leads.functions";

export interface LeadCaptureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}

/** Máscara simples de telefone brasileiro: (11) 99999-9999 */
function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function LeadCaptureDialog({ open, onOpenChange, source = "purchase_card" }: LeadCaptureDialogProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const submitLead = useServerFn(saveLead);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const digits = phone.replace(/\D/g, "");

    if (trimmedName.length < 2) {
      setError("Informe seu nome completo.");
      return;
    }
    if (digits.length < 10) {
      setError("Informe um telefone válido com DDD.");
      return;
    }

    setLoading(true);
    // Dados válidos: o lead está formado antes mesmo da planilha responder.
    trackLead(source);
    try {
      // Registro do lead é best-effort: nunca deve bloquear a compra.
      await submitLead({ data: { name: trimmedName, phone, source } });
    } catch (err) {
      console.error("Falha ao registrar lead", err);
    } finally {
      trackInitiateCheckout(source);
      window.location.href = CHECKOUT_URL;
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Garanta sua vaga</DialogTitle>
          <DialogDescription className="text-white/60">
            Preencha seus dados para seguir com a inscrição no 1º lote.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="lead-name" className="text-white/80">Nome completo</Label>
            <Input
              id="lead-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              autoComplete="name"
              maxLength={120}
              required
              className="border-white/15 bg-white/[0.04] text-white placeholder:text-white/35"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="lead-phone" className="text-white/80">WhatsApp / Telefone</Label>
            <Input
              id="lead-phone"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              placeholder="(11) 99999-9999"
              inputMode="tel"
              autoComplete="tel"
              required
              className="border-white/15 bg-white/[0.04] text-white placeholder:text-white/35"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="shine group h-auto w-full bg-ember-gradient py-5 text-base font-bold text-[--ember-foreground] shadow-glow-ember hover:brightness-110"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Redirecionando…
              </>
            ) : (
              <>
                IR PARA O PAGAMENTO
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>

          <p className="flex items-center justify-center gap-2 text-center text-xs text-white/50">
            <ShieldCheck className="h-4 w-4 text-accent" />
            Seus dados são usados apenas para sua inscrição.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
