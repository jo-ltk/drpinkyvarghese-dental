"use client";

import { useRef, type ReactNode } from "react";
import { ArrowRight, CalendarDays, Play } from "lucide-react";
import {
  gsap,
  useGSAP,
  EASE_GSAP,
  prefersReducedMotion,
} from "@/lib/motion";
import {
  clinic,
  HERO_FIGURES,
  HERO_FIGURES_MOBILE,
  SERVICE_PILLARS,
} from "@/content/clinic";
import { SectionWave } from "@/components/section-wave";
import { cn } from "@/lib/utils";

function MaskLine({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("block overflow-hidden pb-[0.05em]", className)}>
      <span data-hero-line className="block will-change-transform">
        {children}
      </span>
    </span>
  );
}

function ToothWatermark({ className }: { className?: string }) {
  return (
    <svg
      data-hero-tooth
      aria-hidden
      viewBox="0 0 200 260"
      className={cn("pointer-events-none text-white", className)}
    >
      <defs>
        <radialGradient id="toothGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(180,140,220,0.55)" />
          <stop offset="70%" stopColor="rgba(90,50,140,0.2)" />
          <stop offset="100%" stopColor="rgba(40,20,70,0)" />
        </radialGradient>
      </defs>
      <path
        fill="url(#toothGlow)"
        d="M100 18c-28 0-50 18-58 46-6 22-2 42 8 62 8 16 14 34 12 54-2 18 2 36 12 48 8 10 20 14 28 8 6-4 8-14 6-28-2-18 2-34 10-46 8 12 12 28 10 46-2 14 0 24 6 28 8 6 20 2 28-8 10-12 14-30 12-48-2-20 4-38 12-54 10-20 14-40 8-62C150 36 128 18 100 18z"
      />
    </svg>
  );
}

function GoldArc({ className }: { className?: string }) {
  return (
    <svg
      data-hero-ornament
      aria-hidden
      viewBox="0 0 360 120"
      fill="none"
      className={cn("pointer-events-none text-[var(--color-gold)]", className)}
    >
      <path
        data-gold-path
        className="gold-stroke"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.75"
        pathLength={1}
        d="M12 88 C 70 18, 140 8, 190 48 C 240 88, 290 28, 348 62"
      />
      <circle
        data-gold-dot
        cx="190"
        cy="48"
        r="2.25"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

function PillarIcon({ type }: { type: (typeof SERVICE_PILLARS)[number]["icon"] }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "implant":
      return (
        <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
          <path {...common} d="M16 4v8M12 8h8" />
          <path {...common} d="M13 12c0 8 1.5 14 3 16 1.5-2 3-8 3-16" />
          <path {...common} d="M11 14h10" />
        </svg>
      );
    case "smile":
      return (
        <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
          <path {...common} d="M8 14c2 6 14 6 16 0" />
          <circle {...common} cx="11" cy="11" r="1.2" fill="currentColor" />
          <circle {...common} cx="21" cy="11" r="1.2" fill="currentColor" />
          <rect {...common} x="7" y="8" width="18" height="14" rx="4" />
        </svg>
      );
    case "tech":
      return (
        <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
          <circle {...common} cx="16" cy="16" r="5" />
          <path {...common} d="M16 5v3M16 24v3M5 16h3M24 16h3M8 8l2 2M22 22l2 2M8 24l2-2M22 10l2-2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
          <path {...common} d="M16 6c-4 0-7 3-7 7 0 6 7 13 7 13s7-7 7-13c0-4-3-7-7-7z" />
          <circle {...common} cx="16" cy="13" r="2.5" />
        </svg>
      );
  }
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-gold-path]", { strokeDasharray: 1, strokeDashoffset: 0 });
        return;
      }

      const ease = gsap.parseEase(`cubic-bezier(${EASE_GSAP.join(",")})`);
      const tl = gsap.timeline({ defaults: { ease } });

      gsap.set("[data-gold-path]", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set("[data-gold-dot]", { scale: 0, transformOrigin: "50% 50%" });

      tl.from("[data-hero-atmosphere]", {
        autoAlpha: 0,
        scale: 1.04,
        duration: 1.35,
      })
        .from(
          "[data-hero-tooth]",
          { autoAlpha: 0, scale: 0.86, duration: 1.2 },
          0.15,
        )
        .from(
          "[data-hero-portrait]",
          {
            xPercent: 18,
            autoAlpha: 0,
            scale: 1.06,
            duration: 1.25,
            transformOrigin: "80% 50%",
          },
          0.28,
        )
        .from("[data-hero-eyebrow]", { y: 14, autoAlpha: 0, duration: 0.55 }, 0.45)
        .from(
          "[data-hero-line]",
          { yPercent: 115, duration: 0.95, stagger: 0.1 },
          0.55,
        )
        .from("[data-hero-support]", { y: 12, autoAlpha: 0, duration: 0.5 }, 0.9)
        .from(
          "[data-hero-signature]",
          { autoAlpha: 0, y: 10, duration: 0.55 },
          0.95,
        )
        .from("[data-hero-cta]", { y: 18, autoAlpha: 0, duration: 0.6 }, 1.05)
        .from("[data-hero-secondary]", { autoAlpha: 0, duration: 0.45 }, 1.2)
        .to(
          "[data-gold-path]",
          { strokeDashoffset: 0, duration: 1.2 },
          0.7,
        )
        .to("[data-gold-dot]", { scale: 1, duration: 0.4 }, 1.15)
        .from("[data-hero-pillars]", { y: 24, autoAlpha: 0, duration: 0.7 }, 1.25);

      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        gsap.to("[data-hero-portrait]", {
          yPercent: -8,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });

        gsap.to("[data-hero-copy]", {
          yPercent: -10,
          autoAlpha: 0.45,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.55,
          },
        });

        gsap.to("[data-hero-tooth]", {
          yPercent: 12,
          autoAlpha: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      mm.add("(min-width: 768px)", () => {
        gsap.to("[data-hero-portrait]", {
          yPercent: -12,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.85,
          },
        });

        gsap.to("[data-hero-copy]", {
          yPercent: -6,
          autoAlpha: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "35% top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to("[data-hero-ornament]", {
          yPercent: -20,
          autoAlpha: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      data-theme="ink"
      className="relative overflow-hidden bg-[#1a0f2e] text-[#f7f3eb]"
    >
      {/* Layered purple atmosphere — not a photo poster */}
      <div
        data-hero-atmosphere
        aria-hidden
        className="hero-atmosphere absolute inset-0 z-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.35] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        }}
      />

      <ToothWatermark className="absolute top-[18%] right-[-8%] z-[1] h-[58%] w-auto opacity-40 sm:right-[2%] sm:top-[12%] sm:h-[70%] sm:opacity-50" />

      <div className="relative z-[2] mx-auto flex min-h-[100svh] max-w-7xl flex-col px-5 pt-[4.75rem] pb-0 sm:px-8 sm:pt-[5.5rem] md:px-12 lg:px-16">
        {/* Asymmetric stage */}
        <div className="relative flex min-h-0 flex-1 flex-col md:grid md:grid-cols-12 md:items-end md:gap-6 lg:gap-10">
          {/* Copy column */}
          <div
            data-hero-copy
            className="relative z-[3] flex max-w-xl flex-col pt-2 md:col-span-6 md:pb-16 lg:col-span-5 lg:pb-20"
          >
            <GoldArc className="mb-3 h-8 w-36 opacity-90 sm:mb-5 sm:h-11 sm:w-48" />

            <p
              data-hero-eyebrow
              className="font-mono text-[0.58rem] tracking-[0.32em] text-[#f7f3eb]/70 uppercase sm:text-[0.62rem]"
            >
              {clinic.heroEyebrow}
            </p>

            <h1 className="mt-3 font-editorial text-[clamp(2.65rem,12vw,3.6rem)] leading-[0.92] font-light tracking-[-0.02em] text-[#f7f3eb] sm:mt-4 md:text-[clamp(3.4rem,6vw,5.4rem)]">
              <MaskLine>{clinic.heroHeadline[0]}</MaskLine>
              <MaskLine>
                A{" "}
                <span className="text-gold-accent italic">
                  {clinic.heroAccentWord}
                </span>
              </MaskLine>
            </h1>

            {/* Brand lockup — hero-level signal */}
            <div data-hero-signature className="mt-4 sm:mt-5">
              <p className="font-script text-[1.65rem] leading-none text-[#f7f3eb] sm:text-[2rem]">
                {clinic.name}
              </p>
              <p className="mt-1.5 font-mono text-[0.55rem] tracking-[0.24em] text-[var(--color-gold)]/85 uppercase">
                {clinic.role}
              </p>
            </div>

            <p
              data-hero-support
              className="mt-4 max-w-[17rem] text-[0.78rem] leading-relaxed tracking-[0.04em] text-[#f7f3eb]/72 uppercase sm:mt-5 sm:max-w-sm sm:text-[0.82rem]"
            >
              {clinic.heroSupport}
            </p>

            <div className="mt-7 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:items-center sm:gap-6">
              <a
                href="#visit"
                data-hero-cta
                data-cursor="BOOK"
                className="cta-gold pointer-events-auto inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2.5 rounded-full px-6 py-3.5 font-sans text-[0.78rem] font-semibold tracking-[0.06em] transition-[filter,transform] duration-300 sm:w-auto sm:min-w-[13.5rem]"
              >
                <CalendarDays className="size-4 shrink-0" strokeWidth={1.75} />
                <span>Book Appointment</span>
                <ArrowRight className="size-4 shrink-0 opacity-80" strokeWidth={1.75} />
              </a>

              <a
                href="#manifesto"
                data-hero-secondary
                data-cursor="STORY"
                className="pointer-events-auto inline-flex items-center gap-3 self-start text-[0.72rem] tracking-[0.08em] text-[#f7f3eb]/80 transition-colors hover:text-[var(--color-gold)]"
              >
                <span className="flex size-9 items-center justify-center rounded-full border border-[var(--color-gold)]/45 text-[var(--color-gold)]">
                  <Play className="size-3.5 fill-current" strokeWidth={1.5} />
                </span>
                <span className="font-mono text-[0.58rem] tracking-[0.22em] uppercase">
                  Our Story
                </span>
              </a>
            </div>
          </div>

          {/* Portrait column — overlaps layers */}
          <div className="relative z-[2] -mx-2 mt-2 flex flex-1 items-end justify-end md:col-span-6 md:mx-0 md:mt-0 md:min-h-[70vh] lg:col-span-7">
            <div
              data-hero-portrait
              data-cursor="DOCTOR"
              className="relative w-[min(92%,22rem)] origin-bottom will-change-transform sm:w-[min(88%,26rem)] md:absolute md:right-0 md:bottom-0 md:w-[min(100%,34rem)] lg:w-[min(100%,38rem)]"
            >
              {/* Soft purple glow behind portrait */}
              <div
                aria-hidden
                className="soft-glow-purple absolute top-[10%] right-[5%] h-[70%] w-[70%] blur-2xl"
              />

              <div className="relative clip-portrait-fade">
                <img
                  src={HERO_FIGURES_MOBILE}
                  alt={`${clinic.name}, ${clinic.role}`}
                  draggable={false}
                  className="img-tone-violet pointer-events-none relative z-[1] aspect-[4/5] w-full object-cover object-[center_12%] select-none sm:hidden"
                />
                <img
                  src={HERO_FIGURES}
                  alt={`${clinic.name}, ${clinic.role}`}
                  draggable={false}
                  className="img-tone-violet pointer-events-none relative z-[1] hidden aspect-[4/5] w-full object-cover object-[center_10%] select-none sm:block md:aspect-[3/4] md:max-h-[78vh]"
                />
              </div>

              {/* Floating signature + quote over the fade */}
              <div className="pointer-events-none absolute bottom-[18%] left-0 z-[2] max-w-[14rem] px-1 sm:bottom-[22%] sm:max-w-[16rem]">
                <p className="font-script text-[1.35rem] leading-none text-[var(--color-gold-light)] sm:text-[1.6rem]">
                  {clinic.name}
                </p>
                <p className="mt-2 font-editorial text-[0.82rem] leading-snug text-[#f7f3eb]/75 italic sm:text-[0.9rem]">
                  “{clinic.heroQuote}”
                </p>
              </div>

              {/* Thin gold contour accent */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-[8%] right-[6%] z-[2] h-[62%] w-[78%] rounded-[42%_58%_48%_52%/48%_42%_58%_52%] border border-[var(--color-gold)]/25"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ivory transition + service pillars */}
      <SectionWave variant="to-paper" className="relative z-[3]" />

      <div
        data-hero-pillars
        className="relative z-[3] bg-[#f7f3eb] px-5 pb-10 text-[#1a0f2e] sm:px-8 sm:pb-14 md:px-12 lg:px-16"
      >
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-6">
          {SERVICE_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="flex flex-col items-center gap-2.5 text-center"
            >
              <span className="flex size-12 items-center justify-center text-[#3a2458]">
                <PillarIcon type={pillar.icon} />
              </span>
              <span className="max-w-[7.5rem] text-[0.68rem] leading-snug font-medium tracking-[0.02em] text-[#2a1744] sm:text-[0.72rem]">
                {pillar.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
