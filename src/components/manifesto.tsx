"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion";
import { ScrubWords } from "@/components/scrub-words";

export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-rule]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          once: true,
        },
      });

      gsap.from("[data-gold-accent]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="manifesto"
      data-theme="paper"
      className="relative px-5 py-32 transition-colors duration-700 sm:px-8 md:px-12 md:py-48 lg:px-16"
    >
      <div data-rule className="mb-4 h-px w-full bg-current opacity-12 md:mb-5" />
      <div
        data-gold-accent
        className="mb-14 h-px w-24 bg-[var(--color-gold)] md:mb-20"
      />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-3">
          <span className="meta text-current opacity-50">
            Nº01 — Clinical Manifesto
          </span>
        </div>

        <div className="md:col-span-9 lg:col-span-8">
          <ScrubWords
            text="We believe dental care is an unhurried dialogue. Every smile designed with intention. Dr. Pinky Varghese exists to offer implantology and smile design with quiet precision — where your face, your goals, and your comfort remain the centre of every decision."
            accents={["unhurried", "dialogue", "designed", "implantology", "precision"]}
            className="font-display text-3xl leading-[1.22] font-light md:text-5xl lg:text-[3.75rem]"
          />

          <div className="mt-12 flex flex-col gap-6 pt-10 border-t border-current/10 sm:flex-row sm:items-center sm:justify-between text-xs font-mono uppercase tracking-widest text-current/70">
            <span>Implantology</span>
            <span className="hidden sm:inline text-[var(--color-gold)]">·</span>
            <span>Smile Design</span>
            <span className="hidden sm:inline text-[var(--color-gold)]">·</span>
            <span>Private Care</span>
          </div>
        </div>
      </div>
    </section>
  );
}
