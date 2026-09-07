"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ScrubWordsProps {
  text: string;
  className?: string;
  /** words to render in display italic with accent tone */
  accents?: string[];
}

/**
 * Editorial paragraph whose words progressively ink themselves in,
 * driven by ScrollTrigger scroll position.
 */
export function ScrubWords({ text, className, accents = [] }: ScrubWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const words = ref.current?.querySelectorAll<HTMLElement>("[data-word]");
      if (!words?.length) return;

      gsap.fromTo(
        words,
        { opacity: 0.38 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.45,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            end: "bottom 52%",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((word, i) => {
        const bare = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
        const isAccent = accents.some((a) => a.toLowerCase() === bare);
        return (
          <span
            key={i}
            data-word
            className={cn(
              "inline will-change-[opacity]",
              isAccent && "font-[family-name:var(--font-display)] italic text-[var(--color-gold)]",
            )}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}
