"use client";

import { useRef } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { gsap, useGSAP } from "@/lib/motion";
import { clinic, HERO_FIGURES } from "@/content/clinic";
import { MagneticButton } from "@/components/magnetic-button";

export function Dentist() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-clinician-reveal]", {
        y: 36,
        autoAlpha: 0,
        duration: 0.95,
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

      gsap.from("[data-portrait-mask]", {
        scale: 1.08,
        autoAlpha: 0,
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
      data-theme="paper"
      className="relative overflow-hidden bg-[#f7f3eb] text-[#1a0f2e] transition-colors duration-700"
    >
      <div className="relative px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div
            data-clinician-reveal
            className="mb-12 flex items-center justify-between border-b border-[var(--color-gold)]/25 pb-5 md:mb-16"
          >
            <span className="meta text-current opacity-50">
              Nº04 — The Clinician
            </span>
            <span className="font-mono text-xs text-[var(--color-gold-deep)]">
              Kochi · Kerala
            </span>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="relative lg:col-span-5">
              <div
                data-portrait-mask
                data-cursor="DOCTOR"
                className="relative mx-auto max-w-md lg:max-w-none"
              >
                {/* Organic asymmetric crop with gold outline */}
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -inset-2 clip-organic border border-[var(--color-gold)]/40"
                  />
                  <div className="clip-organic relative aspect-[4/5] overflow-hidden shadow-[0_28px_70px_rgba(26,15,46,0.18)]">
                    <img
                      src={HERO_FIGURES}
                      alt={`${clinic.name} in private clinical consultation`}
                      loading="lazy"
                      className="img-tone-violet h-full w-full object-cover object-[center_15%]"
                    />
                  </div>
                </div>

                {/* Floating badge */}
                <div
                  data-clinician-reveal
                  className="absolute -right-1 -bottom-4 z-[2] flex size-[5.5rem] flex-col items-center justify-center rounded-full border border-[var(--color-gold)]/40 bg-[color-mix(in_oklab,var(--color-gold)_18%,#f7f3eb)] text-center shadow-md sm:-right-3 sm:size-24"
                >
                  <span className="font-mono text-[0.48rem] leading-tight tracking-[0.14em] text-[#3a2458] uppercase">
                    Healthy
                    <br />
                    Smiles
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center lg:col-span-7">
              <p
                data-clinician-reveal
                className="font-mono text-[0.62rem] tracking-[0.28em] text-[var(--color-gold-deep)] uppercase"
              >
                {clinic.role}
              </p>

              <h2
                data-clinician-reveal
                className="mt-3 font-editorial text-[2.4rem] leading-[1.05] font-light tracking-tight sm:text-4xl md:text-5xl"
              >
                {clinic.name}
              </h2>

              <p
                data-clinician-reveal
                className="mt-2 font-script text-[1.75rem] text-[#3a2458]/80 sm:text-[2rem]"
              >
                Your smile, designed with care
              </p>

              <div
                data-gold-line
                className="mt-5 h-px w-20 origin-left bg-[var(--color-gold)]/70"
              />

              <blockquote
                data-clinician-reveal
                className="mt-6 font-editorial text-xl leading-snug font-light text-current italic sm:text-2xl md:text-[1.75rem]"
              >
                “A smile is designed with patience — never hurried, never
                generic.”
              </blockquote>

              <div
                data-clinician-reveal
                className="mt-6 space-y-4 text-sm leading-relaxed text-current opacity-75 sm:text-base"
              >
                <p>
                  When you reserve time with Dr. Pinky Varghese, you receive
                  focused attention for implantology and smile design —
                  measured conversations, clear options, and care paced for
                  clarity.
                </p>
                <p>
                  Every consultation begins with listening: understanding your
                  goals, reviewing your history, and shaping a personal pathway
                  before any treatment decision is made.
                </p>
              </div>

              <div
                data-clinician-reveal
                className="mt-8 grid gap-4 border-t border-[var(--color-gold)]/20 pt-6 text-xs sm:grid-cols-2"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/25 text-[var(--color-gold-deep)]">
                    <Check className="size-3" />
                  </div>
                  <div>
                    <p className="font-mono font-medium text-current">
                      Private Consultation Focus
                    </p>
                    <p className="mt-0.5 text-current opacity-60">
                      Dedicated time for your questions and goals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/25 text-[var(--color-gold-deep)]">
                    <Check className="size-3" />
                  </div>
                  <div>
                    <p className="font-mono font-medium text-current">
                      Design-Led Planning
                    </p>
                    <p className="mt-0.5 text-current opacity-60">
                      Smile and implant pathways shaped around you.
                    </p>
                  </div>
                </div>
              </div>

              <div data-clinician-reveal className="mt-8">
                <MagneticButton
                  href="#visit"
                  data-cursor="RESERVE"
                  className="border-[var(--color-gold)]/50 bg-[#1a0f2e] text-[#f7f3eb]"
                >
                  <span>Reserve A Consultation</span>
                  <ArrowUpRight className="size-3.5" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
