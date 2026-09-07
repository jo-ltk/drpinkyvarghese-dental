"use client";

import { useRef } from "react";
import { Quote } from "lucide-react";
import { gsap, useGSAP } from "@/lib/motion";
import { VOICES } from "@/content/clinic";

export function Voices() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-quote-card]", {
        y: 35,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="voices"
      data-theme="ink"
      className="relative px-5 py-28 transition-colors duration-700 sm:px-8 md:px-12 md:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex items-center justify-between border-b border-current/15 pb-5">
          <span className="meta text-current opacity-50">
            Nº06 — Patient Perspectives
          </span>
          <span className="font-mono text-xs text-[var(--color-gold)]">
            Patient Voices
          </span>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {VOICES.map((voice) => (
            <blockquote
              key={voice.name}
              data-quote-card
              className="relative flex flex-col justify-between rounded-2xl border border-[var(--color-gold)]/18 bg-white/[0.03] p-8 shadow-xl backdrop-blur-xs transition-transform duration-500 hover:-translate-y-1"
            >
              <div>
                <Quote className="size-6 text-[var(--color-gold)] opacity-80 mb-6" />
                <p className="font-display text-lg sm:text-xl font-light leading-[1.38] text-current">
                  “{voice.quote}”
                </p>
              </div>

              <footer className="mt-8 border-t border-current/10 pt-4">
                <cite className="not-italic font-mono text-xs font-semibold uppercase tracking-wider text-current block">
                  {voice.name}
                </cite>
                <span className="font-mono text-[0.6875rem] text-[var(--color-gold)] block mt-0.5">
                  {voice.note}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
