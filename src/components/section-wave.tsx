import { cn } from "@/lib/utils";

type WaveVariant = "to-paper" | "to-ink";

/**
 * Organic section transition — soft champagne-tinted curve between themes.
 */
export function SectionWave({
  variant = "to-paper",
  className,
}: {
  variant?: WaveVariant;
  className?: string;
}) {
  const fill = variant === "to-paper" ? "#f7f3eb" : "#1a0f2e";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none relative z-[4] -mt-px leading-[0]",
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[4.5rem] w-full sm:h-[5.5rem] md:h-[7rem]"
      >
        <path
          fill={fill}
          d="M0,48 C240,112 420,8 720,48 C1020,88 1200,16 1440,56 L1440,120 L0,120 Z"
        />
        <path
          fill="none"
          stroke="rgba(201,169,110,0.35)"
          strokeWidth="1.25"
          d="M0,48 C240,112 420,8 720,48 C1020,88 1200,16 1440,56"
        />
      </svg>
    </div>
  );
}
