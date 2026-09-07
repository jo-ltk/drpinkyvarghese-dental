"use client";

import { useRef } from "react";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { gsap, useGSAP } from "@/lib/motion";
import { clinic } from "@/content/clinic";
import { MagneticButton } from "@/components/magnetic-button";

export function Dentist() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-clinician-reveal]", {
        y: 35,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          once: true,
        },
      });

      gsap.from("[data-gold-line]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="dentist"
      data-theme="ink"
      className="relative px-5 py-28 transition-colors duration-700 sm:px-8 md:px-12 md:py-40 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div
          data-clinician-reveal
          className="mb-14 flex items-center justify-between border-b border-[var(--color-gold)]/20 pb-5"
        >
          <span className="meta text-current opacity-50">
            Nº04 — The Clinician
          </span>
          <span className="font-mono text-xs text-[var(--color-gold)]">
            Kochi · Kerala
          </span>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div
              data-clinician-reveal
              data-cursor="DOCTOR"
              className="group relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2.2rem] border border-[var(--color-gold)]/30 shadow-[0_32px_80px_rgba(10,5,20,0.55)] lg:max-w-none"
            >
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=85"
                alt={`${clinic.name} in private clinical consultation`}
                loading="lazy"
                className="img-tone-violet h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0f2e]/92 via-transparent to-transparent" />

              <div className="absolute bottom-5 inset-x-5 flex items-center justify-between rounded-xl bg-[#1a0f2e]/70 p-4 backdrop-blur-md border border-[var(--color-gold)]/20">
                <div>
                  <p className="font-display text-lg font-light text-[#f7f3eb]">
                    {clinic.name}
                  </p>
                  <p className="font-mono text-[0.625rem] uppercase tracking-widest text-[var(--color-gold)]">
                    Implantologist &amp; Smile Designer
                  </p>
                </div>
                <div className="flex size-9 items-center justify-center rounded-full border border-[var(--color-gold)]/50 bg-[var(--color-gold)]/10 font-mono text-xs text-[var(--color-gold)]">
                  PV
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-7">
            <h2
              data-clinician-reveal
              className="font-display text-3xl sm:text-4xl md:text-5xl font-light leading-[1.12] tracking-tight text-current"
            >
              “A smile is designed with patience — never hurried, never generic.”
            </h2>

            <div
              data-gold-line
              className="mt-5 h-px w-20 origin-left bg-[var(--color-gold)]/70"
            />

            <p
              data-clinician-reveal
              className="mt-5 font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-gold)]"
            >
              Implantologist &amp; Smile Designer · {clinic.name}
            </p>

            <div
              data-clinician-reveal
              className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-current opacity-75"
            >
              <p>
                When you reserve time with Dr. Pinky Varghese, you receive
                focused attention for implantology and smile design — measured
                conversations, clear options, and care paced for clarity.
              </p>
              <p>
                Every consultation begins with listening: understanding your
                goals, reviewing your history, and shaping a personal pathway
                before any treatment decision is made.
              </p>
            </div>

            <div
              data-clinician-reveal
              className="mt-8 grid gap-4 border-t border-[var(--color-gold)]/15 pt-6 sm:grid-cols-2 text-xs"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)] mt-0.5">
                  <Check className="size-3" />
                </div>
                <div>
                  <p className="font-medium font-mono text-current">
                    Private Consultation Focus
                  </p>
                  <p className="text-current opacity-60 mt-0.5">
                    Dedicated time for your questions and goals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)] mt-0.5">
                  <Sparkles className="size-3" />
                </div>
                <div>
                  <p className="font-medium font-mono text-current">
                    Design-Led Planning
                  </p>
                  <p className="text-current opacity-60 mt-0.5">
                    Smile and implant pathways shaped around you.
                  </p>
                </div>
              </div>
            </div>

            <div data-clinician-reveal className="mt-8">
              <MagneticButton href="#visit" data-cursor="RESERVE">
                <span>Reserve A Consultation</span>
                <ArrowUpRight className="size-3.5" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
