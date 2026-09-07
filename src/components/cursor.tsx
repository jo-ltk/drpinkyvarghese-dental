"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/motion";

const IDLE_SIZE = 11;
const ACTIVE_SIZE = 74;

/**
 * Companion cursor dot.
 * Lerps after the mouse pointer; expands to a capsule with label
 * when hovering interactive targets with [data-cursor="LABEL"].
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    document.documentElement.classList.add("has-cursor");
    gsap.set(el, {
      x: -100,
      y: -100,
      width: IDLE_SIZE,
      height: IDLE_SIZE,
      opacity: 0.85,
    });
    gsap.set(labelRef.current, { autoAlpha: 0, scale: 0.7 });

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const expand = (label: string) => {
      if (labelRef.current) labelRef.current.textContent = label;
      activeRef.current = true;
      gsap.to(el, {
        width: ACTIVE_SIZE,
        height: ACTIVE_SIZE,
        opacity: 1,
        duration: 0.55,
        ease: "expo.out",
        overwrite: "auto",
      });
      gsap.to(labelRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.35,
        delay: 0.04,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const contract = () => {
      activeRef.current = false;
      gsap.to(labelRef.current, {
        autoAlpha: 0,
        scale: 0.7,
        duration: 0.2,
        ease: "power2.in",
        overwrite: "auto",
      });
      gsap.to(el, {
        width: IDLE_SIZE,
        height: IDLE_SIZE,
        opacity: 0.85,
        duration: 0.45,
        ease: "power3.inOut",
        overwrite: "auto",
      });
      if (labelRef.current) labelRef.current.textContent = "";
    };

    const resolveTarget = (node: EventTarget | null) => {
      if (!(node instanceof Element)) return null;
      const hit = node.closest<HTMLElement>("[data-cursor]");
      if (!hit) return null;
      const label = hit.dataset.cursor?.trim() ?? "";
      return label ? { hit, label } : null;
    };

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const resolved = resolveTarget(e.target);
      if (resolved) expand(resolved.label);
      else if (activeRef.current) contract();
    };

    const onOut = (e: MouseEvent) => {
      const leaving = resolveTarget(e.target);
      const entering = resolveTarget(e.relatedTarget);
      if (leaving && !entering) contract();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[110] flex size-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-gold)] shadow-[0_0_0_1.5px_rgba(247,243,235,0.9)] will-change-transform"
    >
      <span
        ref={labelRef}
        className="meta pointer-events-none select-none text-[0.52rem] font-mono leading-none tracking-widest text-[#1a0f2e]"
      />
    </div>
  );
}
