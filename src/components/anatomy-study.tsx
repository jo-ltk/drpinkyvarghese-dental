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
    mobile: { angle: 210, rx: 40, ry: 30, scale: 0.88 },
    className:
      "h-[min(38vmin,22rem)] w-[min(38vmin,22rem)] md:h-[min(46vmin,28rem)] md:w-[min(46vmin,28rem)] rounded-full overflow-hidden border border-current/20 shadow-2xl",
  },
  {
    id: "photo-microscopy",
    kind: "photo",
    src: STUDY.companionImg,
    alt: "High magnification diagnostic scan",
    desktop: { angle: 30, rx: 44, ry: 35, scale: 1 },
    mobile: { angle: 30, rx: 38, ry: 28, scale: 0.85 },
    className:
      "h-[min(32vmin,18rem)] w-[min(32vmin,18rem)] md:h-[min(40vmin,24rem)] md:w-[min(40vmin,24rem)] rounded-full overflow-hidden border border-current/20 shadow-2xl",
  },
  {
    id: "disc-botanical",
    kind: "disc",
    desktop: { angle: 290, rx: 42, ry: 40, scale: 1 },
    mobile: { angle: 290, rx: 36, ry: 34, scale: 0.85 },
    className:
      "size-[min(12vmin,6rem)] rounded-full bg-[radial-gradient(circle_at_35%_30%,#1c382e_0%,#0c1c16_60%,#06100c_100%)] shadow-lg border border-white/10 md:size-[min(15vmin,8rem)]",
  },
  {
    id: "orb-bronze",
    kind: "orb",
    desktop: { angle: 110, rx: 38, ry: 38, scale: 1 },
    mobile: { angle: 110, rx: 34, ry: 34, scale: 0.85 },
    className:
      "size-[min(6vmin,3.2rem)] rounded-full bg-[radial-gradient(circle_at_30%_30%,#d8b888_0%,#a8895e_60%,#6d5535_100%)] shadow-md md:size-[min(8vmin,4.5rem)]",
  },
  {
    id: "pill-porcelain",
    kind: "pill",
    desktop: { angle: 340, rx: 48, ry: 42, scale: 1 },
    mobile: { angle: 340, rx: 42, ry: 36, scale: 0.8 },
    className:
      "h-6 w-32 rounded-full bg-[linear-gradient(90deg,var(--color-bronze)_0%,#f4f0e8_100%)] md:h-7 md:w-40 shadow-sm",
  },
  {
    id: "pill-titanium",
    kind: "pill",
    desktop: { angle: 150, rx: 46, ry: 40, scale: 1 },
    mobile: { angle: 150, rx: 40, ry: 34, scale: 0.8 },
    className:
      "h-5 w-28 rounded-full bg-[linear-gradient(90deg,#9ea39e_0%,#f4f0e8_100%)] md:h-6 md:w-36 shadow-sm",
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

        const isMobile = window.innerWidth < 640;

        // Position orbit items
        const itemEls = ORBIT.map((item) => {
          const el = field.querySelector<HTMLElement>(`[data-orbit-id="${item.id}"]`);
          const cfg = isMobile && item.mobile ? item.mobile : item.desktop;
          return { el, cfg, item };
        }).filter((x): x is { el: HTMLElement; cfg: OrbitConfig; item: OrbitItem } => Boolean(x.el && x.cfg));

        const updateOrbit = (progress: number) => {
          const rect = field.getBoundingClientRect();
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const turn = progress * Math.PI * 1.5;

          itemEls.forEach(({ el, cfg }) => {
            const rad = (cfg.angle * Math.PI) / 180 + turn;
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

          // Compute active state index
          let idx = 0;
          for (const point of COPY_SWITCH_POINTS) {
            if (progress >= point) idx += 1;
            else break;
          }
          setActiveState(Math.min(idx, STATE_COUNT - 1));
        };

        // ScrollTrigger pinning with progress scrub
        ScrollTrigger.create({
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

        updateOrbit(0);
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
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-20 transition-colors duration-700 sm:px-8 md:px-12 lg:px-16"
    >
      {/* Chapter header */}
      <div className="absolute top-10 inset-x-5 flex items-center justify-between border-b border-current/15 pb-4 sm:top-12 sm:inset-x-8 md:inset-x-12 lg:inset-x-16">
        <span className="meta text-current opacity-50">
          Nº03 — The Anatomy Study
        </span>
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-bronze)]">
          <span>Phase 0{activeState + 1}</span>
          <span className="opacity-40">/</span>
          <span className="opacity-40">0{STATE_COUNT}</span>
        </div>
      </div>

      {/* Center orbital stage */}
      <div
        ref={orbitField}
        className="relative flex aspect-square w-[min(90vw,36rem)] max-w-full items-center justify-center sm:w-[min(80vw,42rem)] md:w-[min(70vw,46rem)]"
      >
        {/* Floating orbital elements */}
        {ORBIT.map((item) => (
          <div
            key={item.id}
            data-orbit-id={item.id}
            data-cursor="STUDY"
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform",
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

        {/* Central focal copy */}
        <div className="relative z-10 mx-auto max-w-sm text-center px-4">
          <p className="font-mono text-[0.625rem] tracking-[0.24em] uppercase text-[var(--color-bronze)] mb-3">
            Biomimetic Protocol
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light leading-[1.25] text-current">
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
          <p className="mt-4 font-mono text-xs text-current opacity-45">
            Micro-Adhesive Interface · Zero Aggressive Reduction
          </p>
        </div>
      </div>

      {/* Bottom phase tracker indicators */}
      <div className="absolute bottom-10 flex items-center gap-3">
        {STATES.map((state, i) => (
          <button
            type="button"
            key={state.id}
            onClick={() => setActiveState(i)}
            aria-label={`Go to phase ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              activeState === i
                ? "w-8 bg-[var(--color-bronze)]"
                : "w-2 bg-current/20 hover:bg-current/40",
            )}
          />
        ))}
      </div>
    </section>
  );
}
