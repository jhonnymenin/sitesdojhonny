import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollCounterAnimationProps {
  end: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const ScrollCounterAnimation = ({
  end,
  suffix = "",
  prefix = "",
  className,
}: ScrollCounterAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transforma o progresso do scroll (0-1) para o valor do contador
  const progress = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      const clampedProgress = Math.max(0, Math.min(1, latest));
      const newCount = Math.round(clampedProgress * end);
      setCount(newCount);
    });

    return () => unsubscribe();
  }, [progress, end]);

  return (
    <motion.div
      ref={ref}
      className={className}
    >
      {prefix}{count}{suffix}
    </motion.div>
  );
};
