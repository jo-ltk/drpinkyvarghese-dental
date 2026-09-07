"use client";

import { useRef } from "react";
import { ArrowUpRight, Check, ShieldCheck, Sparkles } from "lucide-react";
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
        {/* Chapter Header */}
        <div
          data-clinician-reveal
          className="mb-14 flex items-center justify-between border-b border-current/15 pb-5"
        >
          <span className="meta text-current opacity-50">
            Nº04 — The Clinician
          </span>
          <span className="font-mono text-xs text-[var(--color-bronze)]">
            Kochi · Kerala
          </span>
        </div>

        {/* Editorial Split */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <div
              data-clinician-reveal
              data-cursor="DOCTOR"
              className="group relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2.2rem] border border-current/20 shadow-[0_32px_80px_rgba(0,0,0,0.6)] lg:max-w-none"
            >
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=85"
                alt="Dr. Pinky Varghese in private clinical consultation"
                loading="lazy"
                className="img-tone h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081411]/90 via-transparent to-transparent" />

              {/* Signature badge */}
              <div className="absolute bottom-5 inset-x-5 flex items-center justify-between rounded-xl bg-black/60 p-4 backdrop-blur-md border border-white/10">
                <div>
                  <p className="font-display text-lg font-light text-[#f4f0e8]">
                    {clinic.name}
                  </p>
                  <p className="font-mono text-[0.625rem] uppercase tracking-widest text-[var(--color-bronze)]">
                    Principal Clinician · Biomimetic Practice
                  </p>
                </div>
                <div className="flex size-9 items-center justify-center rounded-full border border-[var(--color-bronze)]/50 bg-[var(--color-bronze)]/10 font-mono text-xs text-[var(--color-bronze)]">
                  PV
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <h2
              data-clinician-reveal
              className="font-display text-3xl sm:text-4xl md:text-5xl font-light leading-[1.12] tracking-tight text-current"
            >
              “Unhurried care is not a luxury sentiment. It is the biological
              prerequisite for precision.”
            </h2>

            <p
              data-clinician-reveal
              className="mt-4 font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-bronze)]"
            >
              Clinical Philosophy · {clinic.name}
            </p>

            <div
              data-clinician-reveal
              className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-current opacity-75"
            >
              <p>
                When you reserve time with Dr. Pinky Varghese, you are granted
                the quiet focus dentistry demands. We do not shuffle between
                cubicles or delegate surgical margins to rotating staff.
              </p>
              <p>
                Every restorative sitting begins with comprehensive diagnostic
                listening — examining occlusion dynamics, airway comfort, and
                enamel conservation on high-definition displays before any
                procedure is performed.
              </p>
            </div>

            {/* Core Commitments Checklist */}
            <div
              data-clinician-reveal
              className="mt-8 grid gap-4 border-t border-current/15 pt-6 sm:grid-cols-2 text-xs"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-bronze)]/20 text-[var(--color-bronze)] mt-0.5">
                  <Check className="size-3" />
                </div>
                <div>
                  <p className="font-medium font-mono text-current">Single-Operatory Focus</p>
                  <p className="text-current opacity-60 mt-0.5">
                    Zero double-booking during your consultation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-bronze)]/20 text-[var(--color-bronze)] mt-0.5">
                  <Sparkles className="size-3" />
                </div>
                <div>
                  <p className="font-medium font-mono text-current">Microscopic Scrutiny</p>
                  <p className="text-current opacity-60 mt-0.5">
                    High magnification adhesive margins.
                  </p>
                </div>
              </div>
            </div>

            {/* Magnetic action */}
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
