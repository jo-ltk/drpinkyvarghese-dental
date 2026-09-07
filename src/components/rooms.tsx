"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";
import { LOOKBOOK } from "@/content/clinic";
import { cn } from "@/lib/utils";

export function Rooms() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      if (reduced) return;

      // Parallax speed drift on individual frames
      gsap.utils.toArray<HTMLElement>("[data-room-frame]").forEach((frame) => {
        const speed = parseFloat(frame.dataset.speed ?? "0");
        if (!speed) return;
        const img = frame.querySelector<HTMLElement>("img");
        if (!img) return;

        gsap.to(img, {
          yPercent: speed * -35,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
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
      id="spaces"
      data-theme="paper"
      className="relative px-5 py-28 transition-colors duration-700 sm:px-8 md:px-12 md:py-40 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-current/15 pb-6">
          <div>
            <span className="meta text-current opacity-50">
              Nº05 — Spatial Architecture
            </span>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-light md:text-5xl lg:text-6xl text-current">
              Spaces of calm,
              <br />
              <em className="italic text-[var(--color-gold)]">
                composed for confidence.
              </em>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-current opacity-65 font-mono">
            Every room at Dr. Pinky Varghese&apos;s practice is composed for
            quiet focus — soft light, considered materials, and a pace that
            puts patients at ease.
          </p>
        </div>

        {/* Asymmetric Editorial Lookbook Grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:gap-16">
          {LOOKBOOK.map((item, index) => (
            <figure
              key={item.caption}
              className={cn(
                "group relative flex flex-col",
                index % 2 === 1 ? "sm:mt-16" : "",
              )}
            >
              <div
                data-room-frame
                data-speed={item.speed}
                data-cursor="SPACE"
                className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-current/15 bg-current/5 shadow-xl"
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="img-tone h-[120%] w-full -mt-[10%] object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              <figcaption className="mt-4 flex items-center justify-between font-mono text-[0.6875rem] uppercase tracking-wider text-current opacity-55 transition-opacity group-hover:opacity-90">
                <span>{item.caption}</span>
                <span className="text-[var(--color-gold)]">Space 0{index + 1}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
