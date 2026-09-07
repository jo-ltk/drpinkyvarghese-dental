"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion";
import { ScrubWords } from "@/components/scrub-words";
import { clinic } from "@/content/clinic";

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

      gsap.from("[data-care-visual]", {
        clipPath: "inset(12% 12% 12% 12% round 40%)",
        autoAlpha: 0,
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 68%",
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
      className="relative overflow-hidden bg-[#f7f3eb] px-5 py-24 text-[#1a0f2e] transition-colors duration-700 sm:px-8 md:px-12 md:py-40 lg:px-16"
    >
      <div data-rule className="mb-4 h-px w-full bg-current opacity-12 md:mb-5" />
      <div
        data-gold-accent
        className="mb-12 h-px w-24 bg-[var(--color-gold)] md:mb-16"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 lg:items-center">
        <div className="lg:col-span-7">
          <span className="meta text-current opacity-50">
            Nº01 — Clinical Manifesto
          </span>

          <p className="mt-5 font-mono text-[0.62rem] tracking-[0.28em] text-[var(--color-gold-deep)] uppercase">
            Your Smile · Our Expertise
          </p>

          <h2 className="mt-3 font-editorial text-[2.2rem] leading-[1.08] font-light tracking-tight sm:text-4xl md:text-5xl">
            Comprehensive{" "}
            <span className="text-gold-accent italic">Dental Care</span>
          </h2>

          <div className="mt-8">
            <ScrubWords
              text="We believe dental care is an unhurried dialogue. Every smile designed with intention. Dr. Pinky Varghese exists to offer implantology and smile design with quiet precision — where your face, your goals, and your comfort remain the centre of every decision."
              accents={[
                "unhurried",
                "dialogue",
                "designed",
                "implantology",
                "precision",
              ]}
              className="font-display text-2xl leading-[1.25] font-light md:text-4xl lg:text-[2.75rem]"
            />
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-[var(--color-gold)]/20 pt-8 font-mono text-[0.65rem] tracking-widest text-current/70 uppercase sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <span>Implantology</span>
            <span className="hidden text-[var(--color-gold)] sm:inline">·</span>
            <span>Smile Design</span>
            <span className="hidden text-[var(--color-gold)] sm:inline">·</span>
            <span>Private Care</span>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div
            data-care-visual
            className="relative mx-auto max-w-sm lg:max-w-none"
          >
            <div className="clip-organic relative aspect-[4/5] overflow-hidden border border-[var(--color-gold)]/30 shadow-[0_24px_60px_rgba(26,15,46,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=85"
                alt="A confident, natural smile"
                loading="lazy"
                className="img-tone h-full w-full object-cover"
              />
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 -z-10 clip-organic border border-[var(--color-gold)]/25"
            />

            <div className="absolute -right-2 bottom-8 z-[2] flex size-20 flex-col items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--color-gold)_22%,#f7f3eb)] text-center shadow-md sm:size-24">
              <span className="font-mono text-[0.45rem] leading-tight tracking-[0.12em] text-[#3a2458] uppercase sm:text-[0.5rem]">
                Brighter
                <br />
                Lives
              </span>
            </div>
          </div>

          {/* Trust rhythm strip */}
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[var(--color-gold)]/20 pt-6 sm:grid-cols-4 sm:gap-0">
            {[
              { value: "4", label: "Locations" },
              { value: "Private", label: "Consultations" },
              { value: "Calm", label: "Pacing" },
              { value: clinic.location.split(",")[0], label: "Based" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center sm:px-3 ${
                  i > 0 ? "sm:border-l sm:border-[var(--color-gold)]/30" : ""
                }`}
              >
                <span className="font-editorial text-2xl font-light text-[#3a2458] sm:text-[1.65rem]">
                  {stat.value}
                </span>
                <span className="mt-1 font-mono text-[0.55rem] tracking-[0.16em] text-current/55 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
