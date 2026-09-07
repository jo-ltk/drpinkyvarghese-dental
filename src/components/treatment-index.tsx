"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/motion";
import { TREATMENTS } from "@/content/clinic";

/**
 * "The Treatment Index" — a pinned horizontal portfolio on desktop & tablet.
 * Vertical page scroll drives horizontal translation across treatments.
 * Each clinical photograph has an inner counter-drift for parallax depth.
 * Reduced-motion users get native smooth horizontal swipe.
 */
export function TreatmentIndex() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const trackEl = track.current;
        const rootEl = root.current;
        if (!trackEl || !rootEl) return;

        const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);

        const scrollTween = gsap.to(trackEl, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: rootEl,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Inner counter-drift on each photograph plate
        gsap.utils.toArray<HTMLElement>("[data-panel-img]", trackEl).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });

      // Native swipe when reduced motion is preferred
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const trackEl = track.current;
        const scroller = root.current;
        if (!trackEl || !scroller) return;

        scroller.style.overflowX = "auto";
        scroller.style.setProperty("-webkit-overflow-scrolling", "touch");
        trackEl.style.width = "max-content";

        return () => {
          scroller.style.overflowX = "";
          scroller.style.removeProperty("-webkit-overflow-scrolling");
          trackEl.style.width = "";
        };
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="treatments"
      data-theme="ink"
      className="relative overflow-x-clip transition-colors duration-700"
    >
      <div className="flex min-h-dvh items-center">
        <div
          ref={track}
          className="flex w-max flex-row items-center gap-[10vw] px-6 py-12 md:gap-[6vw] md:px-[7vw]"
        >
          {/* Intro statement panel */}
          <div className="w-[82vw] shrink-0 sm:w-[50vw] md:w-[28vw]">
            <span className="meta text-current opacity-50">
              Nº02 — The Treatment Index
            </span>
            <h2 className="mt-6 font-display text-4xl leading-[1.08] font-light md:text-5xl lg:text-6xl">
              Five protocols,
              <br />
              <em className="italic text-[var(--color-bronze)]">unhurried care.</em>
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-current opacity-65">
              Scroll through the index. Each procedure is designed to conserve
              natural biological structures and preserve enamel margins down to
              the micron.
            </p>
            <div className="mt-8">
              <a
                href="#visit"
                data-cursor="CONSULT"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--color-bronze)] hover:underline"
              >
                <span>Consultation Protocol</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>

          {/* Treatment plates */}
          {TREATMENTS.map((item) => (
            <article
              key={item.id}
              className="group relative w-[78vw] shrink-0 sm:w-[48vw] md:w-[32vw]"
            >
              {/* Giant ghost index numeral */}
              <div
                aria-hidden="true"
                className="pointer-events-none select-none font-editorial text-[14vw] sm:text-[10vw] md:text-[8vw] leading-none font-light text-current opacity-[0.08] -mb-6 md:-mb-10 pl-2"
              >
                {item.index}
              </div>

              {/* Photographic plate with counter-drift */}
              <div
                data-cursor="VIEW"
                className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-current/15 bg-current/5 shadow-2xl"
              >
                <img
                  data-panel-img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="img-tone pointer-events-none h-full w-[120%] -ml-[10%] object-cover will-change-transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081411]/85 via-transparent to-transparent" />

                {/* Plate code badge */}
                <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-widest text-[var(--color-bronze)] backdrop-blur-md border border-white/10">
                  {item.code}
                </div>

                <div className="absolute bottom-4 inset-x-4">
                  <span className="font-mono text-[0.625rem] uppercase tracking-widest text-[var(--color-bronze)]">
                    {item.duration}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-light text-[#f4f0e8] leading-snug">
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Plate caption and principles */}
              <div className="mt-5 space-y-2">
                <p className="font-mono text-xs text-[var(--color-bronze)] uppercase tracking-wider">
                  {item.nature}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-current opacity-70">
                  {item.copy}
                </p>
                <ul className="pt-2 flex flex-wrap gap-2 text-[0.6875rem] font-mono text-current opacity-55">
                  {item.disciplines.map((d) => (
                    <li key={d} className="rounded bg-current/5 px-2 py-0.5">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
