import { ArrowRight, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GradientButton } from "@/components/ui/GradientButton";
import { QuizLink, WhatsappLink } from "@/components/ui/TrackedLink";
import { WA_DEMO } from "@/constants";

interface InlineCTAProps {
  text: string;
  buttonLabel: string;
  variant?: "quiz" | "whatsapp";
  tone?: "soft" | "plain";
  origin?: string;
}

export const InlineCTA = ({
  text,
  buttonLabel,
  variant = "quiz",
  tone = "soft",
  origin = "inline_cta",
}: InlineCTAProps) => {
  const toneClass = tone === "soft" ? "bg-brand-tint" : "bg-card border border-border";

  return (
    <div className="container mx-auto px-4 sm:px-6">
      <ScrollReveal>
        <div
          className={`max-w-4xl mx-auto px-6 py-5 sm:py-6 rounded-2xl my-4 sm:my-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${toneClass}`}
        >
          <p className="text-base sm:text-lg text-foreground font-medium text-center sm:text-left">
            {text}
          </p>

          <div className="w-full sm:w-auto flex-shrink-0">
            {variant === "quiz" ? (
              <QuizLink className="block w-full sm:w-auto" origin={origin}>
                <GradientButton className="group w-full sm:w-auto min-h-[48px]">
                  {buttonLabel}
                  <ArrowRight aria-hidden="true" className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </GradientButton>
              </QuizLink>
            ) : (
              <WhatsappLink href={WA_DEMO} className="block w-full sm:w-auto" origin={origin}>
                <GradientButton variant="outline" className="w-full sm:w-auto min-h-[48px]">
                  <Phone aria-hidden="true" className="inline-block mr-2 w-4 h-4" />
                  {buttonLabel}
                </GradientButton>
              </WhatsappLink>
            )}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
