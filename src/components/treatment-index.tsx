"use client";

import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";
import { TREATMENTS } from "@/content/clinic";
import { cn } from "@/lib/utils";

/**
 * Editorial treatment presentation — vertical storytelling on mobile,
 * pinned horizontal portfolio on desktop.
 */
export function TreatmentIndex() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const trackEl = track.current;
          const rootEl = root.current;
          if (!trackEl || !rootEl) return;

          const distance = () =>
            Math.max(0, trackEl.scrollWidth - window.innerWidth);

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

          gsap.utils
            .toArray<HTMLElement>("[data-panel-img]", trackEl)
            .forEach((img) => {
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
        },
      );

      mm.add("(max-width: 767px)", () => {
        if (prefersReducedMotion()) return;

        gsap.utils
          .toArray<HTMLElement>("[data-treat-mobile]", root.current)
          .forEach((card) => {
            gsap.from(card, {
              y: 40,
              autoAlpha: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                once: true,
              },
            });
          });

        gsap.from("[data-treat-intro]", {
          y: 28,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            once: true,
          },
        });
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
      {/* ——— Mobile editorial stack ——— */}
      <div className="md:hidden px-5 py-20 sm:px-8">
        <div data-treat-intro className="mb-12">
          <span className="meta text-current opacity-50">
            Nº02 — The Treatment Index
          </span>
          <h2 className="mt-5 font-editorial text-[2.35rem] leading-[1.05] font-light tracking-tight">
            Five pathways,
            <br />
            <em className="text-gold-accent italic">one refined practice.</em>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-current opacity-65">
            Each pathway is designed around clarity, comfort, and lasting
            aesthetic confidence — never a catalogue of identical options.
          </p>
        </div>

        <div className="space-y-14">
          {TREATMENTS.map((item, i) => {
            const odd = i % 2 === 1;
            return (
              <article
                key={item.id}
                data-treat-mobile
                className="relative"
                onMouseEnter={() => setActive(i)}
              >
                <div
                  className={cn(
                    "relative overflow-hidden",
                    odd ? "ml-4 mr-0" : "mr-4 ml-0",
                  )}
                >
                  <div
                    className={cn(
                      "relative aspect-[5/6] overflow-hidden border border-[var(--color-gold)]/25",
                      odd
                        ? "rounded-[2.5rem_0.75rem_2.5rem_0.75rem]"
                        : "rounded-[0.75rem_2.5rem_0.75rem_2.5rem]",
                    )}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      className="img-tone-violet h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0f2e]/90 via-[#1a0f2e]/15 to-transparent" />

                    <span className="absolute top-4 left-4 font-editorial text-4xl font-light text-[var(--color-gold)]/35">
                      {item.index}
                    </span>

                    <div className="absolute right-4 bottom-4 left-4">
                      <span className="font-mono text-[0.58rem] tracking-[0.22em] text-[var(--color-gold)] uppercase">
                        {item.duration}
                      </span>
                      <h3 className="mt-1 font-editorial text-[1.55rem] leading-tight font-light text-[#f7f3eb]">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Gold contour offset */}
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-2 -z-10 border border-[var(--color-gold)]/20",
                      odd
                        ? "translate-x-2 translate-y-2 rounded-[2.5rem_0.75rem_2.5rem_0.75rem]"
                        : "-translate-x-2 translate-y-2 rounded-[0.75rem_2.5rem_0.75rem_2.5rem]",
                    )}
                  />
                </div>

                <div className="mt-5 space-y-3">
                  <p className="font-mono text-[0.65rem] tracking-[0.18em] text-[var(--color-gold)] uppercase">
                    {item.nature}
                  </p>
                  <p className="text-sm leading-relaxed text-current opacity-70">
                    {item.copy}
                  </p>
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {item.disciplines.map((d) => (
                      <li
                        key={d}
                        className="rounded-full border border-[var(--color-gold)]/20 px-2.5 py-1 font-mono text-[0.6rem] tracking-wide text-current opacity-55"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <a
          href="#visit"
          className="cta-gold mt-14 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.78rem] font-semibold tracking-[0.05em]"
        >
          <span>Book a Consultation</span>
          <ArrowRight className="size-4" />
        </a>
      </div>

      {/* ——— Desktop / tablet horizontal index ——— */}
      <div className="hidden md:flex min-h-dvh items-center">
        <div
          ref={track}
          className="flex w-max flex-row items-center gap-[10vw] px-6 py-12 md:gap-[6vw] md:px-[7vw]"
        >
          <div className="w-[50vw] shrink-0 md:w-[28vw]">
            <span className="meta text-current opacity-50">
              Nº02 — The Treatment Index
            </span>
            <h2 className="mt-6 font-display text-4xl leading-[1.08] font-light md:text-5xl lg:text-6xl">
              Five pathways,
              <br />
              <em className="text-gold-accent italic">one refined practice.</em>
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-current opacity-65">
              Scroll through the index. Each pathway is designed around clarity,
              comfort, and lasting aesthetic confidence.
            </p>
            <div className="mt-8">
              <a
                href="#visit"
                data-cursor="CONSULT"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[var(--color-gold)] uppercase hover:underline"
              >
                <span>Consultation Protocol</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>

            <div className="mt-10 flex gap-2">
              {TREATMENTS.map((t, i) => (
                <span
                  key={t.id}
                  aria-hidden
                  className={cn(
                    "h-1 w-6 rounded-full transition-colors",
                    i === active
                      ? "bg-[var(--color-gold)]"
                      : "bg-[var(--color-gold)]/25",
                  )}
                />
              ))}
            </div>
          </div>

          {TREATMENTS.map((item, i) => (
            <article
              key={item.id}
              className="group relative w-[48vw] shrink-0 md:w-[32vw]"
              onMouseEnter={() => setActive(i)}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none -mb-6 select-none pl-2 font-editorial text-[10vw] leading-none font-light text-current opacity-[0.08] md:-mb-10 md:text-[8vw]"
              >
                {item.index}
              </div>

              <div
                data-cursor="VIEW"
                className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-[var(--color-gold)]/20 bg-current/5 shadow-2xl"
              >
                <img
                  data-panel-img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="img-tone-violet pointer-events-none -ml-[10%] h-full w-[120%] object-cover will-change-transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0f2e]/88 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 rounded-full border border-[var(--color-gold)]/25 bg-[#1a0f2e]/65 px-3 py-1 font-mono text-[0.625rem] tracking-widest text-[var(--color-gold)] uppercase backdrop-blur-md">
                  {item.code}
                </div>

                <div className="absolute inset-x-4 bottom-4">
                  <span className="font-mono text-[0.625rem] tracking-widest text-[var(--color-gold)] uppercase">
                    {item.duration}
                  </span>
                  <h3 className="font-display text-xl leading-snug font-light text-[#f7f3eb] sm:text-2xl">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <p className="font-mono text-xs tracking-wider text-[var(--color-gold)] uppercase">
                  {item.nature}
                </p>
                <p className="text-xs leading-relaxed text-current opacity-70 sm:text-sm">
                  {item.copy}
                </p>
                <ul className="flex flex-wrap gap-2 pt-2 font-mono text-[0.6875rem] text-current opacity-55">
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
