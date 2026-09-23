import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  badge?: {
    icon: ReactNode;
    text: string;
  };
  title: ReactNode;
  subtitle?: string;
  mobileSubtitle?: string;
  className?: string;
}

export const SectionTitle = ({ badge, title, subtitle, mobileSubtitle, className }: SectionTitleProps) => {
  return (
    <div className={cn("flex flex-col items-center text-center mb-8 sm:mb-10", className)}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-sm font-medium text-brand mb-3"
        >
          {badge.text}
        </motion.span>
      )}

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-balance max-w-4xl mx-auto"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={cn(
              "text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-3 sm:mt-5 px-4",
              mobileSubtitle ? "hidden sm:block" : ""
            )}
          >
            {subtitle}
          </motion.p>
          {mobileSubtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="sm:hidden text-sm text-muted-foreground max-w-2xl mx-auto mt-2 px-4"
            >
              {mobileSubtitle}
            </motion.p>
          )}
        </>
      )}
    </div>
  );
};
