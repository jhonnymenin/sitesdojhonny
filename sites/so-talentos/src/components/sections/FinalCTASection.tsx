import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { transition, staggerChild } from "@/lib/motion";
import { toast } from "sonner";
import { MessageCircle, ArrowRight } from "lucide-react";
import { whatsappLink } from "@/lib/contact";

interface QuoteForm {
  name: string;
  company: string;
  eventType: string;
  eventDate: string;
  city: string;
  message: string;
}

const emptyForm: QuoteForm = {
  name: "",
  company: "",
  eventType: "",
  eventDate: "",
  city: "",
  message: "",
};

const inputClass =
  "w-full bg-foreground/5 border border-foreground/10 rounded-inner px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors";

const FinalCTASection = () => {
  const [form, setForm] = useState<QuoteForm>(emptyForm);

  const update = (field: keyof QuoteForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  /** Builds the WhatsApp message from whatever the visitor filled in. */
  const buildMessage = (): string => {
    const lines = [
      "Olá! Gostaria de solicitar um orçamento.",
      form.name && `Nome: ${form.name}`,
      form.company && `Empresa: ${form.company}`,
      form.eventType && `Tipo de evento: ${form.eventType}`,
      form.eventDate && `Data: ${form.eventDate}`,
      form.city && `Cidade: ${form.city}`,
      form.message && `Detalhes: ${form.message}`,
    ].filter(Boolean);
    return lines.join("\n");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim()) {
      toast.error("Informe o seu nome para continuarmos.");
      return;
    }

    window.open(whatsappLink(buildMessage()), "_blank", "noopener,noreferrer");
    toast.success("Pedido pronto! Continue a conversa no WhatsApp.");
  };

  return (
    <section id="contato" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1600&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 to-secondary/15 mix-blend-overlay" />
      </div>

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition}
          >
            <p className="heading-sub text-primary text-xs tracking-[0.25em] mb-4">Fale conosco</p>
            <h2 className="heading-display text-foreground text-4xl md:text-5xl lg:text-6xl mb-8">
              Leve o artista ideal para o seu próximo <span className="text-gradient">evento</span>
            </h2>
            <p className="text-body text-lg mb-4">
              Se você procura uma atração que realmente faça a diferença, fale com a Agência Só
              Talentos.
            </p>
            <p className="text-body text-lg mb-8">
              Encontramos o talento certo para transformar o seu evento em uma experiência
              inesquecível.
            </p>
            <Button variant="heroOutline" size="xl" asChild>
              <a
                href={whatsappLink("Olá! Vim pelo site e gostaria de falar sobre um evento.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle /> Falar pelo WhatsApp
              </a>
            </Button>
          </motion.div>

          <motion.form
            className="premium-card backdrop-blur-md rounded-outer p-8 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={staggerChild(2)}
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="quote-name" className="heading-sub text-xs text-foreground/60 mb-2 block">
                Nome
              </label>
              <input
                id="quote-name"
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={inputClass}
                placeholder="Seu nome"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="quote-company" className="heading-sub text-xs text-foreground/60 mb-2 block">
                  Empresa
                </label>
                <input
                  id="quote-company"
                  type="text"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  className={inputClass}
                  placeholder="Opcional"
                />
              </div>
              <div>
                <label htmlFor="quote-type" className="heading-sub text-xs text-foreground/60 mb-2 block">
                  Tipo de evento
                </label>
                <input
                  id="quote-type"
                  type="text"
                  value={form.eventType}
                  onChange={(e) => update("eventType", e.target.value)}
                  className={inputClass}
                  placeholder="Festival, corporativo..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="quote-date" className="heading-sub text-xs text-foreground/60 mb-2 block">
                  Data
                </label>
                <input
                  id="quote-date"
                  type="date"
                  value={form.eventDate}
                  onChange={(e) => update("eventDate", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="quote-city" className="heading-sub text-xs text-foreground/60 mb-2 block">
                  Cidade
                </label>
                <input
                  id="quote-city"
                  type="text"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className={inputClass}
                  placeholder="Cidade / UF"
                />
              </div>
            </div>

            <div>
              <label htmlFor="quote-message" className="heading-sub text-xs text-foreground/60 mb-2 block">
                Detalhes
              </label>
              <textarea
                id="quote-message"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Público esperado, estilo musical, orçamento..."
              />
            </div>

            <Button variant="gradient" size="lg" className="w-full glow-primary" type="submit">
              Solicite um orçamento <ArrowRight />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
