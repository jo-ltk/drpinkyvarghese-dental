"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion";
import { STUDY, type StudyPart } from "@/content/clinic";
import { cn } from "@/lib/utils";

type OrbitConfig = {
  /** Starting angle in degrees */
  angle: number;
  /** Elliptical radii as % of orbit field */
  rx: number;
  ry: number;
  scale: number;
};

type OrbitItem = {
  id: string;
  kind: "photo" | "disc" | "pill" | "orb";
  desktop: OrbitConfig;
  /** false = hide on mobile; omit = reuse desktop */
  mobile?: OrbitConfig | false;
  src?: string;
  alt?: string;
  className?: string;
};

const ORBIT: OrbitItem[] = [
  {
    id: "photo-restoration",
    kind: "photo",
    src: STUDY.img,
    alt: "Biomimetic Ceramic Margin",
    desktop: { angle: 210, rx: 45, ry: 36, scale: 1 },
    // Mobile: park lower-right, clear of centered copy
    mobile: { angle: 145, rx: 42, ry: 46, scale: 0.72 },
    className:
      "h-[min(26vw,8.5rem)] w-[min(26vw,8.5rem)] opacity-[0.55] sm:opacity-100 sm:h-[min(38vmin,22rem)] sm:w-[min(38vmin,22rem)] md:h-[min(46vmin,28rem)] md:w-[min(46vmin,28rem)] rounded-full overflow-hidden border border-current/20 shadow-2xl",
  },
  {
    id: "photo-microscopy",
    kind: "photo",
    src: STUDY.companionImg,
    alt: "High magnification diagnostic scan",
    desktop: { angle: 30, rx: 44, ry: 35, scale: 1 },
    // Mobile: park upper-left, clear of centered copy
    mobile: { angle: 315, rx: 40, ry: 44, scale: 0.68 },
    className:
      "h-[min(22vw,7rem)] w-[min(22vw,7rem)] opacity-[0.5] sm:opacity-100 sm:h-[min(32vmin,18rem)] sm:w-[min(32vmin,18rem)] md:h-[min(40vmin,24rem)] md:w-[min(40vmin,24rem)] rounded-full overflow-hidden border border-current/20 shadow-2xl",
  },
  {
    id: "disc-plum",
    kind: "disc",
    desktop: { angle: 290, rx: 42, ry: 40, scale: 1 },
    mobile: { angle: 250, rx: 46, ry: 48, scale: 0.7 },
    className:
      "size-[min(9vw,2.75rem)] sm:size-[min(12vmin,6rem)] rounded-full bg-[radial-gradient(circle_at_35%_30%,#4a2f6e_0%,#2b1a45_60%,#1a0f2e_100%)] shadow-lg border border-[var(--color-gold)]/20 md:size-[min(15vmin,8rem)]",
  },
  {
    id: "orb-gold",
    kind: "orb",
    desktop: { angle: 110, rx: 38, ry: 38, scale: 1 },
    mobile: { angle: 40, rx: 44, ry: 42, scale: 0.75 },
    className:
      "size-[min(5vw,1.5rem)] sm:size-[min(6vmin,3.2rem)] rounded-full bg-[radial-gradient(circle_at_30%_30%,#dfc49a_0%,#c9a96e_55%,#8f7340_100%)] shadow-md md:size-[min(8vmin,4.5rem)]",
  },
  {
    id: "pill-ivory",
    kind: "pill",
    desktop: { angle: 340, rx: 48, ry: 42, scale: 1 },
    // Decorative pills collide with copy on narrow screens
    mobile: false,
    className:
      "h-6 w-32 rounded-full bg-[linear-gradient(90deg,var(--color-gold)_0%,#f7f3eb_100%)] md:h-7 md:w-40 shadow-sm",
  },
  {
    id: "pill-lavender",
    kind: "pill",
    desktop: { angle: 150, rx: 46, ry: 40, scale: 1 },
    mobile: false,
    className:
      "h-5 w-28 rounded-full bg-[linear-gradient(90deg,#9a8bb5_0%,#f7f3eb_100%)] md:h-6 md:w-36 shadow-sm",
  },
];

const STATES = STUDY.states;
const STATE_COUNT = STATES.length;
const SCROLL_VH = 2.4;
const COPY_SWITCH_POINTS = Array.from(
  { length: Math.max(0, STATE_COUNT - 1) },
  (_, i) => ((i + 1) / STATE_COUNT) * 0.9,
);

export function AnatomyStudy() {
  const root = useRef<HTMLElement>(null);
  const orbitField = useRef<HTMLDivElement>(null);
  const [activeState, setActiveState] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rootEl = root.current;
        const field = orbitField.current;
        if (!rootEl || !field) return;

        const mobileMq = window.matchMedia("(max-width: 639px)");

        const collectItems = () => {
          const isMobile = mobileMq.matches;
          return ORBIT.map((item) => {
            const el = field.querySelector<HTMLElement>(
              `[data-orbit-id="${item.id}"]`,
            );
            if (!el) return null;

            if (isMobile && item.mobile === false) {
              gsap.set(el, { autoAlpha: 0, x: 0, y: 0 });
              return null;
            }

            gsap.set(el, { autoAlpha: 1 });
            const cfg =
              isMobile && item.mobile ? item.mobile : item.desktop;
            return { el, cfg, item };
          }).filter(
            (x): x is { el: HTMLElement; cfg: OrbitConfig; item: OrbitItem } =>
              Boolean(x),
          );
        };

        let itemEls = collectItems();

        const updateOrbit = (progress: number) => {
          const rect = field.getBoundingClientRect();
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const turn = progress * Math.PI * 1.5;
          // Mobile: shorter arc so items stay near edges, not through copy
          const turnScale = mobileMq.matches ? 0.55 : 1;
          const appliedTurn = turn * turnScale;

          itemEls.forEach(({ el, cfg }) => {
            const rad = (cfg.angle * Math.PI) / 180 + appliedTurn;
            const rxPx = (cfg.rx / 100) * cx;
            const ryPx = (cfg.ry / 100) * cy;
            const x = Math.cos(rad) * rxPx;
            const y = Math.sin(rad) * ryPx;

            gsap.set(el, {
              x,
              y,
              scale: cfg.scale,
              overwrite: "auto",
            });
          });

          let idx = 0;
          for (const point of COPY_SWITCH_POINTS) {
            if (progress >= point) idx += 1;
            else break;
          }
          setActiveState(Math.min(idx, STATE_COUNT - 1));
        };

        const pin = ScrollTrigger.create({
          trigger: rootEl,
          start: "top top",
          end: () => `+=${window.innerHeight * SCROLL_VH}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.65,
          onUpdate: (self) => {
            updateOrbit(self.progress);
          },
        });

        const onBreakpoint = () => {
          itemEls = collectItems();
          updateOrbit(pin.progress);
          ScrollTrigger.refresh();
        };
        mobileMq.addEventListener("change", onBreakpoint);

        updateOrbit(0);

        return () => {
          mobileMq.removeEventListener("change", onBreakpoint);
          pin.kill();
        };
      });
    },
    { scope: root },
  );

  const currentCopy = STATES[activeState];

  return (
    <section
      ref={root}
      id="anatomy"
      data-theme="paper"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-24 transition-colors duration-700 sm:px-8 sm:py-20 md:px-12 lg:px-16"
    >
      {/* Chapter header */}
      <div className="absolute top-10 inset-x-5 z-20 flex items-center justify-between border-b border-current/15 pb-4 sm:top-12 sm:inset-x-8 md:inset-x-12 lg:inset-x-16">
        <span className="meta text-current opacity-50">
          Nº03 — The Anatomy Study
        </span>
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-gold)]">
          <span>Phase 0{activeState + 1}</span>
          <span className="opacity-40">/</span>
          <span className="opacity-40">0{STATE_COUNT}</span>
        </div>
      </div>

      {/* Orbital stage — taller on mobile so copy has a clear center band */}
      <div
        ref={orbitField}
        className="relative flex w-full max-w-full items-center justify-center min-h-[min(72dvh,34rem)] sm:aspect-square sm:min-h-0 sm:w-[min(80vw,42rem)] md:w-[min(70vw,46rem)]"
      >
        {/* Floating orbital elements */}
        {ORBIT.map((item) => (
          <div
            key={item.id}
            data-orbit-id={item.id}
            data-cursor="STUDY"
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 will-change-transform",
              item.mobile === false && "hidden sm:block",
              item.className,
            )}
          >
            {item.src && (
              <img
                src={item.src}
                alt={item.alt ?? ""}
                className="img-tone h-full w-full object-cover"
                loading="lazy"
              />
            )}
          </div>
        ))}

        {/* Central focal copy — scrim keeps type readable over orbit media */}
        <div className="relative z-10 mx-auto w-full max-w-[22rem] px-3 text-center sm:max-w-sm sm:px-4">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-[color-mix(in_oklab,var(--bg)_88%,transparent)] blur-xl sm:bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] sm:blur-2xl"
          />
          <p className="mb-3 font-mono text-[0.625rem] tracking-[0.24em] text-[var(--color-gold)] uppercase">
            Smile Architecture
          </p>
          <h2 className="font-display text-[1.375rem] font-light leading-[1.3] text-current sm:text-3xl sm:leading-[1.25] md:text-4xl">
            {currentCopy.parts.map((part: StudyPart, i: number) => (
              <span
                key={i}
                className={
                  part.tone === "strong"
                    ? "font-normal text-current"
                    : "opacity-60"
                }
              >
                {part.text}
              </span>
            ))}
          </h2>
          <p className="mt-4 font-mono text-[0.6875rem] text-current opacity-45 sm:text-xs">
            Proportion · Material · Longevity
          </p>
        </div>
      </div>

      {/* Bottom phase tracker — clear of mobile CTA */}
      <div className="absolute bottom-24 z-20 flex items-center gap-3 sm:bottom-10">
        {STATES.map((state, i) => (
          <button
            type="button"
            key={state.id}
            onClick={() => setActiveState(i)}
            aria-label={`Go to phase ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              activeState === i
                ? "w-8 bg-[var(--color-gold)]"
                : "w-2 bg-current/20 hover:bg-current/40",
            )}
          />
        ))}
      </div>
    </section>
  );
}
