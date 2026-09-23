import { ReactNode } from "react";
import { QUIZ_LINK } from "@/constants";
import { buildQuizUrl, trackQuizClick, trackWhatsappClick } from "@/lib/tracking";

interface LinkProps {
  children: ReactNode;
  className?: string;
  origin?: string;
}

export const QuizLink = ({ children, className, origin = "lp" }: LinkProps) => (
  <a
    href={buildQuizUrl(QUIZ_LINK)}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
    onClick={() => trackQuizClick(origin)}
  >
    {children}
  </a>
);

interface WhatsappLinkProps extends LinkProps {
  href: string;
}

export const WhatsappLink = ({ children, className, href, origin = "lp" }: WhatsappLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
    onClick={() => trackWhatsappClick(origin)}
  >
    {children}
  </a>
);
