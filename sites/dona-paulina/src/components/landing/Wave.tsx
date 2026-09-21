export function WaveDivider({
  fill = "var(--color-background)",
  flip = false,
  className = "",
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none w-full leading-[0] ${className}`}
      style={{ transform: flip ? "rotate(180deg)" : undefined }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="block h-[60px] w-full md:h-[100px]"
      >
        <path
          d="M0,40 C240,100 480,0 720,40 C960,80 1200,20 1440,60 L1440,100 L0,100 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
