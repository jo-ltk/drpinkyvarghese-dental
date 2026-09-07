"use client";

import { useRef, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import {
  gsap,
  useGSAP,
  EASE_GSAP,
  prefersReducedMotion,
  isFinePointer,
} from "@/lib/motion";
import {
  clinic,
  HERO_ENVIRONMENT,
  HERO_FIGURES,
  HERO_FIGURES_MOBILE,
} from "@/content/clinic";
import { cn } from "@/lib/utils";

function MaskLine({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("block overflow-hidden pb-[0.04em]", className)}>
      <span data-hero-line className="block will-change-transform">
        {children}
      </span>
    </span>
  );
}

/** Elegant champagne ornamental arcs — drawn on entrance */
function GoldOrnament({ className }: { className?: string }) {
  return (
    <svg
      data-hero-ornament
      aria-hidden
      viewBox="0 0 420 180"
      fill="none"
      className={cn("pointer-events-none text-[var(--color-gold)]", className)}
    >
      <path
        data-gold-path
        className="gold-stroke"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
        pathLength={1}
        d="M20 140 C 80 40, 160 20, 210 70 C 260 120, 320 40, 400 90"
      />
      <path
        data-gold-path
        className="gold-stroke"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.35"
        pathLength={1}
        d="M40 160 C 110 70, 180 50, 230 95 C 280 140, 340 70, 390 110"
      />
      <circle
        data-gold-dot
        cx="210"
        cy="70"
        r="2.5"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const exploreRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion()) {
        gsap.set("[data-gold-path]", { strokeDasharray: 1, strokeDashoffset: 0 });
        return;
      }

      const ease = gsap.parseEase(`cubic-bezier(${EASE_GSAP.join(",")})`);
      const tl = gsap.timeline({ defaults: { ease } });
      const desktopFig = root.current?.querySelector<HTMLElement>(
        "[data-hero-figures-desktop]",
      );
      const figuresStage = root.current?.querySelector<HTMLElement>(
        "[data-hero-figures]",
      );

      gsap.set("[data-gold-path]", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set("[data-gold-dot]", { scale: 0, transformOrigin: "50% 50%" });

      tl.from("[data-hero-env]", {
        scale: 1.06,
        autoAlpha: 0,
        duration: 1.5,
      })
        .from(
          figuresStage ?? "[data-hero-figures]",
          { yPercent: 8, autoAlpha: 0, duration: 1.15 },
          0.18,
        )
        .from("[data-hero-scrim]", { autoAlpha: 0, duration: 0.9 }, 0.08)
        .from(
          "[data-hero-frame]",
          { scale: 1.04, autoAlpha: 0, duration: 1.1 },
          0.25,
        )
        .to(
          "[data-gold-path]",
          { strokeDashoffset: 0, duration: 1.35, stagger: 0.12 },
          0.4,
        )
        .to("[data-gold-dot]", { scale: 1, duration: 0.45 }, 0.95)
        .from(
          "[data-hero-line]",
          { yPercent: 110, duration: 0.9, stagger: 0.09 },
          0.45,
        )
        .from("[data-hero-eyebrow]", { autoAlpha: 0, y: 8, duration: 0.5 }, 0.55)
        .from("[data-hero-sub]", { autoAlpha: 0, duration: 0.5 }, 0.85)
        .from("[data-hero-cta]", { autoAlpha: 0, duration: 0.55 }, 0.95)
        .from("[data-hero-side]", { autoAlpha: 0, duration: 0.5 }, 1.0)
        .from("[data-hero-foot]", { autoAlpha: 0, duration: 0.45 }, 1.05);

      gsap.to("[data-hero-env] img", {
        yPercent: 8,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const mm = gsap.matchMedia();
      const mobileFig = root.current?.querySelector<HTMLElement>(
        "[data-hero-figures-mobile]",
      );

      mm.add("(max-width: 639px)", () => {
        if (mobileFig) {
          gsap.to(mobileFig, {
            yPercent: -10,
            scale: 1.03,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          });
        }

        gsap.to("[data-hero-eyebrow]", {
          y: -16,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "30% top",
            scrub: true,
          },
        });

        gsap.to("[data-hero-copy]", {
          yPercent: -12,
          autoAlpha: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.55,
          },
        });

        gsap.to("[data-hero-foot]", {
          y: 18,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "40% top",
            scrub: true,
          },
        });
      });

      mm.add("(min-width: 640px)", () => {
        if (desktopFig) {
          gsap.fromTo(
            desktopFig,
            { yPercent: 0, scale: 1, transformOrigin: "50% 100%" },
            {
              yPercent: -14,
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.85,
              },
            },
          );
        }

        if (figuresStage) {
          gsap.to(figuresStage, {
            yPercent: -5,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.1,
            },
          });
        }

        gsap.to("[data-hero-copy]", {
          yPercent: -6,
          autoAlpha: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "42% top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to("[data-hero-ornament]", {
          yPercent: -18,
          autoAlpha: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      const explore = exploreRef.current;
      if (!explore) return;

      const circle = explore.querySelector<HTMLElement>("[data-hero-cta-circle]");
      const arrow = explore.querySelector<HTMLElement>("[data-hero-cta-arrow]");
      const ring = explore.querySelector<HTMLElement>("[data-hero-cta-ring]");

      if (circle) {
        gsap.to(circle, {
          scale: 1.035,
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
      if (arrow) {
        gsap.to(arrow, {
          x: 4,
          duration: 1.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 0.2,
        });
      }
      if (ring) {
        gsap.fromTo(
          ring,
          { scale: 1, autoAlpha: 0.45 },
          {
            scale: 1.4,
            autoAlpha: 0,
            duration: 2.8,
            ease: "power1.out",
            repeat: -1,
            transformOrigin: "50% 50%",
          },
        );
      }

      if (!isFinePointer() || !contextSafe) return;

      const onMove = contextSafe((e: MouseEvent) => {
        const rect = explore.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        gsap.to(explore, {
          x: dx * 0.14,
          y: dy * 0.16,
          duration: 0.55,
          ease: "power3.out",
          overwrite: "auto",
        });
      });

      const onLeave = contextSafe(() => {
        gsap.to(explore, {
          x: 0,
          y: 0,
          duration: 0.85,
          ease: "elastic.out(1, 0.45)",
          overwrite: "auto",
        });
      });

      explore.addEventListener("mousemove", onMove);
      explore.addEventListener("mouseleave", onLeave);

      return () => {
        explore.removeEventListener("mousemove", onMove);
        explore.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      data-theme="ink"
      className="relative flex min-h-dvh flex-col overflow-hidden bg-[#1a0f2e] text-[#f7f3eb]"
    >
      {/* Full-bleed clinic atmosphere */}
      <div
        data-hero-env
        data-cursor="ATELIER"
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <img
          src={HERO_ENVIRONMENT}
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 size-full scale-105 object-cover object-[center_35%] select-none brightness-[0.55] contrast-[1.05] saturate-[0.85]"
        />
      </div>

      {/* Deep plum atmospheric scrim — brand first */}
      <div
        data-hero-scrim
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(26,15,46,0.72)_0%,rgba(26,15,46,0.35)_28%,rgba(26,15,46,0.45)_58%,rgba(26,15,46,0.92)_100%)] sm:bg-[linear-gradient(105deg,rgba(26,15,46,0.88)_0%,rgba(26,15,46,0.55)_38%,rgba(36,21,56,0.28)_62%,rgba(26,15,46,0.55)_100%),linear-gradient(to_top,rgba(26,15,46,0.94)_0%,rgba(26,15,46,0.2)_32%,transparent_55%)]"
      />

      {/* Subtle champagne wash in upper right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] z-[1] h-[55vh] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.14)_0%,transparent_68%)]"
      />

      <div className="relative z-[2] flex min-h-0 flex-1 flex-col justify-between">
        {/* Mobile brand eyebrow */}
        <p
          data-hero-eyebrow
          className="relative z-[3] shrink-0 px-5 pt-[5rem] text-[0.55rem] leading-[1.65] font-mono tracking-[0.28em] uppercase text-[#f7f3eb]/65 sm:hidden"
        >
          {clinic.practice} · {clinic.location}
        </p>

        {/* Portrait stage with gold frame */}
        <div
          data-hero-figures
          data-cursor="DOCTOR"
          className="relative z-[2] flex min-h-0 w-full flex-1 items-end justify-center px-5 pt-3 sm:absolute sm:inset-x-0 sm:top-[8%] sm:bottom-[8%] sm:items-center sm:justify-end sm:px-8 sm:pt-0 md:top-[6%] md:right-0 md:left-auto md:w-[52%] lg:w-[48%] lg:px-16"
        >
          <div
            data-hero-frame
            className="relative w-full max-w-[20rem] sm:max-w-none sm:h-full sm:w-auto"
          >
            {/* Gold framing detail */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-[3px] rounded-[1.35rem] sm:rounded-[2.4rem] border border-[var(--color-gold)]/35"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-2 rounded-[1.5rem] sm:rounded-[2.6rem] border border-[var(--color-gold)]/12"
            />

            <img
              data-hero-figures-mobile
              src={HERO_FIGURES_MOBILE}
              alt={`${clinic.name}, ${clinic.practice}`}
              draggable={false}
              className="img-tone-violet pointer-events-none aspect-[4/5] w-full origin-bottom rounded-[1.25rem] object-cover object-[center_20%] shadow-[0_28px_70px_rgba(10,5,20,0.65)] will-change-transform select-none sm:hidden"
            />
            <img
              data-hero-figures-desktop
              src={HERO_FIGURES}
              alt={`${clinic.name}, ${clinic.practice}`}
              draggable={false}
              className="img-tone-violet pointer-events-none hidden h-full max-h-[78vh] w-auto origin-center rounded-[2.25rem] object-cover object-[center_18%] shadow-[0_36px_90px_rgba(10,5,20,0.7)] will-change-transform select-none sm:block"
            />
          </div>
        </div>

        {/* Typographic brand narrative */}
        <div className="pointer-events-none relative z-[3] flex shrink-0 flex-col px-5 pt-5 pb-2 sm:flex-1 sm:justify-center sm:px-8 sm:pt-28 sm:pb-0 md:px-12 md:pt-32 lg:px-16">
          <div
            data-hero-copy
            className="flex max-w-xl flex-col sm:mt-0"
          >
            <GoldOrnament className="mb-3 h-10 w-40 opacity-90 sm:mb-6 sm:h-14 sm:w-56" />

            <div className="min-w-0">
              {/* Mobile — brand-first composition */}
              <h1 className="font-editorial text-[clamp(2.15rem,10.5vw,3.1rem)] leading-[0.95] font-light tracking-[-0.02em] text-[#f7f3eb] sm:hidden">
                <MaskLine>
                  <span className="text-[var(--color-gold)]">Dr.</span> Pinky
                </MaskLine>
                <MaskLine>Varghese</MaskLine>
              </h1>

              {/* Desktop / tablet — monumental brand */}
              <h1 className="font-editorial hidden text-[clamp(3.2rem,5.6vw,5.75rem)] leading-[0.92] font-light tracking-[-0.025em] text-[#f7f3eb] sm:block">
                <MaskLine>
                  <span className="text-[var(--color-gold)]">Dr.</span> Pinky
                </MaskLine>
                <MaskLine>Varghese</MaskLine>
              </h1>

              <div data-hero-sub className="mt-4 sm:mt-7">
                <div className="gold-rule mb-4 w-16 sm:mb-5 sm:w-20" />
                <p className="font-display text-[1.05rem] leading-snug tracking-wide text-[#f7f3eb] sm:text-[1.35rem] md:text-[1.5rem]">
                  {clinic.practice}
                </p>
                <p className="mt-2 max-w-[22rem] text-[0.85rem] leading-relaxed text-[#f7f3eb]/78 sm:mt-3 sm:text-[0.95rem]">
                  {clinic.tagline}
                </p>
                <p className="mt-3 text-[0.55rem] font-mono tracking-[0.28em] uppercase text-[var(--color-gold)]/80 sm:text-[0.58rem]">
                  Private Practice · {clinic.location}
                </p>
              </div>
            </div>

            <a
              ref={exploreRef}
              href="#manifesto"
              data-hero-cta
              data-cursor="ENTER"
              className="pointer-events-auto mt-7 mb-2 inline-flex w-fit items-center gap-4 sm:mt-12 sm:mb-0 sm:gap-5"
            >
              <span className="relative flex size-[4rem] shrink-0 items-center justify-center sm:size-[5rem] md:size-[5.5rem]">
                <span
                  data-hero-cta-ring
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full border border-[var(--color-gold)]/55"
                />
                <span
                  data-hero-cta-circle
                  className="relative z-[1] flex size-full items-center justify-center rounded-full bg-[#f7f3eb] text-[#1a0f2e] shadow-[0_0_0_1px_rgba(201,169,110,0.35)] will-change-transform transition-transform active:scale-[0.97]"
                >
                  <ArrowRight
                    data-hero-cta-arrow
                    className="size-[1.1rem] will-change-transform text-[#1a0f2e] sm:size-5"
                    strokeWidth={1.25}
                  />
                </span>
              </span>
              <span className="flex flex-col gap-1 text-[0.55rem] font-mono leading-none tracking-[0.26em] uppercase text-[#f7f3eb]/85 sm:text-[0.6rem] sm:tracking-[0.28em]">
                <span>Discover The</span>
                <span>Practice</span>
              </span>
            </a>
          </div>

          <aside
            data-hero-side
            className="pointer-events-auto absolute right-8 bottom-10 hidden flex-col items-end gap-2 text-right sm:flex md:right-12 md:bottom-12 lg:right-16"
          >
            <span aria-hidden="true" className="mb-1 block h-px w-10 bg-[var(--color-gold)]/55" />
            <span className="text-[0.55rem] font-mono tracking-[0.32em] uppercase text-[#f7f3eb]/45">
              Private · Appointment Only
            </span>
            <p className="max-w-[13rem] font-display text-[0.95rem] leading-[1.3] tracking-tight text-[#f7f3eb]">
              Implantology &amp; Smile Design
            </p>
            <a
              href="#visit"
              data-cursor="CONSULT"
              className="group mt-2 inline-flex items-center gap-1.5 text-[0.55rem] font-mono tracking-[0.22em] uppercase text-[var(--color-gold)] transition-colors hover:text-white"
            >
              <span>Reserve Consultation</span>
              <ArrowRight
                className="size-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                strokeWidth={1.2}
              />
            </a>
          </aside>
        </div>
      </div>

      {/* Bottom information bar */}
      <div
        data-hero-foot
        className="relative z-[3] border-t border-[var(--color-gold)]/15 bg-transparent sm:bg-[rgba(26,15,46,0.78)] backdrop-blur-xs"
      >
        <div className="flex items-end justify-between gap-4 px-5 py-3.5 sm:hidden font-mono">
          <p className="text-[0.46rem] tracking-[0.22em] uppercase text-[#f7f3eb]/55">
            Implantology <span className="text-[var(--color-gold)]/40">/</span>{" "}
            Smile Design
          </p>
          <div className="flex flex-col items-end gap-1 text-right">
            <p className="text-[0.46rem] leading-[1.45] tracking-[0.22em] uppercase text-[#f7f3eb]/55">
              Kochi · Kerala
            </p>
            <span aria-hidden="true" className="block h-px w-8 bg-[var(--color-gold)]/50" />
          </div>
        </div>

        <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-4 px-8 py-3.5 sm:grid md:px-12 lg:px-16 font-mono">
          <p className="truncate text-[0.52rem] tracking-[0.28em] uppercase text-[#f7f3eb]/50 md:text-[0.56rem]">
            Implantology <span className="text-[var(--color-gold)]/35">/</span>{" "}
            Smile Design <span className="text-[var(--color-gold)]/35">/</span>{" "}
            Private Care
          </p>

          <div className="flex flex-col items-center gap-1">
            <span className="text-[0.52rem] tracking-[0.32em] uppercase text-[#f7f3eb]/65">
              Scroll
            </span>
            <span aria-hidden="true" className="h-4 w-px bg-[var(--color-gold)]/55 md:h-5" />
          </div>

          <div className="flex items-center justify-end gap-4">
            <span
              aria-hidden="true"
              className="h-px w-14 bg-[var(--color-gold)]/20 md:w-24 lg:w-32"
            />
            <p className="text-[0.52rem] tracking-[0.28em] uppercase text-[#f7f3eb]/50 md:text-[0.56rem]">
              Pavilion Suite 4 · The Crescent
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
