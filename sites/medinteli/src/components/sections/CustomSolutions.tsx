import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WA_CUSTOM } from "@/constants";
import { trackWhatsappClick } from "@/lib/tracking";

export const CustomSolutions = () => {
  return (
    <section className="bg-background pb-16 sm:pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <p className="max-w-3xl mx-auto text-center text-base sm:text-lg text-muted-foreground leading-relaxed">
            Precisa de algo que não está na lista? A gente avalia e{" "}
            <a
              href={WA_CUSTOM}
              onClick={() => trackWhatsappClick("custom_solutions")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline underline-offset-4"
            >
              constrói junto com você
            </a>
            .
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
