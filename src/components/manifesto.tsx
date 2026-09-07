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
      <div data-rule className="mb-14 h-px w-full bg-current opacity-15 md:mb-20" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-3">
          <span className="meta text-current opacity-50">
            Nº01 — Clinical Manifesto
          </span>
        </div>

        <div className="md:col-span-9 lg:col-span-8">
          <ScrubWords
            text="We believe dental care is an unhurried dialogue. Every tooth preserved down to the micron. Dr. Pinky Varghese exists to depart from conveyor-belt assembly — providing meticulous single-operatory dedication where living biology remains our master architect."
            accents={["unhurried", "dialogue", "preserved", "biology", "architect"]}
            className="font-display text-3xl leading-[1.22] font-light md:text-5xl lg:text-[3.75rem]"
          />

          <div className="mt-12 flex flex-col gap-6 pt-10 border-t border-current/10 sm:flex-row sm:items-center sm:justify-between text-xs font-mono uppercase tracking-widest text-current/60">
            <span>Single Patient Dedication</span>
            <span>Zero Intermediaries</span>
            <span>Microscopic Precision</span>
          </div>
        </div>
      </div>
    </section>
  );
}
