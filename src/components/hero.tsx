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

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const exploreRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion()) return;

      const ease = gsap.parseEase(`cubic-bezier(${EASE_GSAP.join(",")})`);
      const tl = gsap.timeline({ defaults: { ease } });
      const desktopFig = root.current?.querySelector<HTMLElement>(
        "[data-hero-figures-desktop]",
      );
      const figuresStage = root.current?.querySelector<HTMLElement>(
        "[data-hero-figures]",
      );

      tl.from("[data-hero-env]", {
        scale: 1.05,
        autoAlpha: 0,
        duration: 1.4,
      })
        .from(
          figuresStage ?? "[data-hero-figures]",
          { yPercent: 6, autoAlpha: 0, duration: 1.1 },
          0.2,
        )
        .from("[data-hero-scrim]", { autoAlpha: 0, duration: 0.8 }, 0.1)
        .from(
          "[data-hero-line]",
          { yPercent: 100, duration: 0.85, stagger: 0.08 },
          0.35,
        )
        .from("[data-hero-eyebrow]", { autoAlpha: 0, duration: 0.45 }, 0.5)
        .from("[data-hero-sub]", { autoAlpha: 0, duration: 0.45 }, 0.8)
        .from("[data-hero-cta]", { autoAlpha: 0, duration: 0.5 }, 0.9)
        .from("[data-hero-side]", { autoAlpha: 0, duration: 0.5 }, 0.95)
        .from("[data-hero-foot]", { autoAlpha: 0, duration: 0.45 }, 1.0);

      // Environment subtle parallax
      gsap.to("[data-hero-env] img", {
        yPercent: 7,
        scale: 1.05,
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

      // Mobile parallax & fade out on scroll
      mm.add("(max-width: 639px)", () => {
        if (mobileFig) {
          gsap.to(mobileFig, {
            yPercent: -12,
            scale: 1.04,
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
          y: -20,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "35% top",
            scrub: true,
          },
        });

        gsap.to("[data-hero-copy]", {
          yPercent: -16,
          autoAlpha: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.55,
          },
        });

        gsap.to("[data-hero-foot]", {
          y: 20,
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

      // Desktop & Tablet scroll elevation
      mm.add("(min-width: 640px)", () => {
        if (desktopFig) {
          gsap.fromTo(
            desktopFig,
            { yPercent: 0, scale: 1, transformOrigin: "50% 100%" },
            {
              yPercent: -18,
              scale: 1.06,
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
            yPercent: -6,
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
          yPercent: -8,
          autoAlpha: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "42% top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Micro-physics: CTA pulsating concentric rings and magnetic cursor tracking
      const explore = exploreRef.current;
      if (!explore) return;

      const circle = explore.querySelector<HTMLElement>("[data-hero-cta-circle]");
      const arrow = explore.querySelector<HTMLElement>("[data-hero-cta-arrow]");
      const ring = explore.querySelector<HTMLElement>("[data-hero-cta-ring]");

      if (circle) {
        gsap.to(circle, {
          scale: 1.04,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
      if (arrow) {
        gsap.to(arrow, {
          x: 5,
          duration: 1.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 0.2,
        });
      }
      if (ring) {
        gsap.fromTo(
          ring,
          { scale: 1, autoAlpha: 0.4 },
          {
            scale: 1.45,
            autoAlpha: 0,
            duration: 2.6,
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
          x: dx * 0.15,
          y: dy * 0.18,
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
      className="relative flex min-h-dvh flex-col overflow-hidden text-[#f4f0e8]"
    >
      {/* z-0 — Full-bleed architectural atelier environment */}
      <div
        data-hero-env
        data-cursor="SANCTUARY"
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <img
          src={HERO_ENVIRONMENT}
          alt="Architectural dental sanctuary with natural light"
          draggable={false}
          className="pointer-events-none absolute inset-0 size-full scale-105 object-cover object-[center_40%] select-none brightness-[0.72] contrast-[1.08]"
        />
      </div>

      {/* Atmospheric lighting scrim */}
      <div
        data-hero-scrim
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(8,20,17,0.42)_0%,transparent_18%,transparent_68%,rgba(8,20,17,0.85)_100%)] sm:bg-[linear-gradient(90deg,rgba(8,20,17,0.72)_0%,rgba(8,20,17,0.28)_32%,transparent_58%),linear-gradient(to_top,rgba(8,20,17,0.88)_0%,rgba(8,20,17,0.24)_28%,transparent_55%)]"
      />

      {/* Central Stage */}
      <div className="relative z-[2] flex min-h-0 flex-1 flex-col justify-between">
        {/* Mobile top eyebrow */}
        <p
          data-hero-eyebrow
          className="relative z-[3] shrink-0 px-5 pt-[5rem] text-[0.52rem] leading-[1.65] font-mono tracking-[0.28em] uppercase text-[#f4f0e8]/60 sm:hidden"
        >
          {clinic.name} · Private Practice
        </p>

        {/* Sculptural architectural focal art */}
        <div
          data-hero-figures
          data-cursor="PRECISION"
          className="relative z-[2] flex min-h-0 w-full flex-1 items-end justify-center px-4 pt-4 sm:absolute sm:inset-x-0 sm:top-[6%] sm:bottom-0 sm:items-end sm:px-0 sm:pt-0 md:top-[4%] md:left-[16%] lg:left-[18%]"
        >
          <img
            data-hero-figures-mobile
            src={HERO_FIGURES_MOBILE}
            alt="Biomimetic dental precision atelier"
            draggable={false}
            className="pointer-events-none h-full max-h-[52vh] w-auto max-w-[90vw] origin-bottom rounded-2xl object-cover object-center shadow-[0_24px_64px_rgba(0,0,0,0.6)] will-change-transform select-none sm:hidden border border-white/10"
          />
          <img
            data-hero-figures-desktop
            src={HERO_FIGURES}
            alt="Biomimetic dental precision atelier"
            draggable={false}
            className="pointer-events-none hidden h-[84%] max-h-[82vh] w-auto origin-bottom rounded-[2.5rem] object-cover object-center shadow-[0_32px_80px_rgba(0,0,0,0.75)] will-change-transform select-none sm:block sm:scale-100 border border-white/15"
          />
        </div>

        {/* Editorial Typographic Narrative */}
        <div className="pointer-events-none relative z-[3] flex shrink-0 flex-col px-5 pt-2 pb-2 sm:flex-1 sm:px-8 sm:pt-28 sm:pb-0 md:px-12 md:pt-32 lg:px-16">
          <div
            data-hero-copy
            className="flex max-w-xl flex-col sm:mt-[min(12vh,6rem)]"
          >
            <div className="min-w-0">
              {/* Mobile single-line header */}
              <h1 className="font-editorial text-[clamp(1.4rem,7.4vw,2.15rem)] leading-none font-light tracking-[-0.02em] whitespace-nowrap text-[#f4f0e8] uppercase sm:hidden">
                <MaskLine>
                  Precision In Time
                  <sup className="ml-1 align-super text-[0.32em] font-mono tracking-normal normal-case text-[var(--color-bronze)]">
                    · PV
                  </sup>
                </MaskLine>
              </h1>

              {/* Desktop / tablet monumental stacked editorial lines */}
              <h1 className="font-editorial hidden text-[11.5vw] leading-[0.88] font-light tracking-[-0.02em] text-[#f4f0e8] uppercase sm:block md:text-[6.2vw] lg:text-[5.2vw]">
                <MaskLine>Where</MaskLine>
                <MaskLine>Precision</MaskLine>
                <MaskLine>Meets</MaskLine>
                <MaskLine>
                  Time
                  <sup className="ml-1.5 align-super text-[0.3em] font-mono tracking-normal normal-case text-[var(--color-bronze)]">
                    ®
                  </sup>
                </MaskLine>
              </h1>

              <p
                data-hero-sub
                className="mt-3 text-[0.52rem] font-mono leading-[1.7] tracking-[0.28em] uppercase text-[#f4f0e8]/70 sm:mt-8 sm:text-[0.58rem] sm:leading-normal sm:tracking-[0.3em] sm:text-[#f4f0e8]/60 md:mt-10"
              >
                <span className="block sm:inline">Biomimetic Dentistry</span>
                <span className="block sm:inline">
                  <span className="hidden sm:inline"> · </span>
                  Kochi, Kerala
                </span>
              </p>
            </div>

            {/* Signature Concentric Radar Magnetic CTA */}
            <a
              ref={exploreRef}
              href="#manifesto"
              data-hero-cta
              data-cursor="RESERVE"
              className="pointer-events-auto mt-6 mb-2 inline-flex w-fit items-center gap-4 sm:mt-14 sm:mb-0 sm:gap-5 md:mt-16"
            >
              <span className="relative flex size-[4.25rem] shrink-0 items-center justify-center sm:size-[5.25rem] md:size-[6.25rem]">
                <span
                  data-hero-cta-ring
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full border border-[var(--color-bronze)]/50"
                />
                <span
                  data-hero-cta-circle
                  className="relative z-[1] flex size-full items-center justify-center rounded-full bg-[#f4f0e8] text-[#081411] shadow-[0_0_0_1px_rgba(244,240,232,0.12)] will-change-transform transition-transform active:scale-[0.97]"
                >
                  <ArrowRight
                    data-hero-cta-arrow
                    className="size-[1.15rem] will-change-transform sm:size-6 md:size-6.5 text-[#081411]"
                    strokeWidth={1.2}
                  />
                </span>
              </span>
              <span className="flex flex-col gap-1 text-[0.55rem] font-mono leading-none tracking-[0.26em] uppercase text-[#f4f0e8]/85 sm:text-[0.6rem] sm:tracking-[0.28em] sm:text-[#f4f0e8]/80">
                <span>Explore The</span>
                <span>Clinical Atelier</span>
              </span>
            </a>
          </div>

          {/* Right-side practice info — desktop only */}
          <aside
            data-hero-side
            className="pointer-events-auto absolute right-8 bottom-8 hidden flex-col items-end gap-2 text-right sm:flex md:right-12 md:bottom-10 lg:right-16"
          >
            <span aria-hidden="true" className="mb-1 block h-px w-8 bg-[var(--color-bronze)]/60" />
            <span className="text-[0.55rem] font-mono tracking-[0.32em] uppercase text-[#f4f0e8]/50">
              EST. PRIVATE PRACTICE
            </span>
            <p className="max-w-[12rem] font-display text-[0.8rem] leading-[1.35] tracking-tight text-[#f4f0e8]">
              Single-Operatory Dedication
            </p>
            <a
              href="#visit"
              data-cursor="CONSULT"
              className="group mt-2 inline-flex items-center gap-1.5 text-[0.55rem] font-mono tracking-[0.22em] uppercase text-[var(--color-bronze)] transition-colors hover:text-white"
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

      {/* Bottom Editorial Information Bar */}
      <div
        data-hero-foot
        className="relative z-[3] border-t border-white/10 bg-transparent sm:bg-[rgba(6,14,12,0.8)] backdrop-blur-xs"
      >
        {/* Mobile bottom bar */}
        <div className="flex items-end justify-between gap-4 px-5 py-3.5 sm:hidden font-mono">
          <p className="text-[0.46rem] tracking-[0.22em] uppercase text-[#f4f0e8]/60">
            Biomimetic <span className="text-white/20">/</span> Unhurried{" "}
            <span className="text-white/20">/</span> Dedicated
          </p>
          <div className="flex flex-col items-end gap-1 text-right">
            <p className="text-[0.46rem] leading-[1.45] tracking-[0.22em] uppercase text-[#f4f0e8]/60">
              Kochi · Kerala
            </p>
            <span aria-hidden="true" className="block h-px w-8 bg-[var(--color-bronze)]/50" />
          </div>
        </div>

        {/* Desktop / Tablet three-column bottom bar */}
        <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-4 px-8 py-3 sm:grid md:px-12 md:py-3.5 lg:px-16 font-mono">
          <p className="truncate text-[0.52rem] tracking-[0.28em] uppercase text-[#f4f0e8]/55 md:text-[0.56rem]">
            Biomimetic <span className="text-white/20">/</span> Unhurried{" "}
            <span className="text-white/20">/</span> Dedicated
          </p>

          <div className="flex flex-col items-center gap-1">
            <span className="text-[0.52rem] tracking-[0.32em] uppercase text-[#f4f0e8]/70">
              Scroll
            </span>
            <span aria-hidden="true" className="h-4 w-px bg-[var(--color-bronze)]/60 md:h-5" />
          </div>

          <div className="flex items-center justify-end gap-4">
            <span
              aria-hidden="true"
              className="h-px w-14 bg-white/20 md:w-24 lg:w-32"
            />
            <p className="text-[0.52rem] tracking-[0.28em] uppercase text-[#f4f0e8]/55 md:text-[0.56rem]">
              Pavilion Suite 4 · The Crescent
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
