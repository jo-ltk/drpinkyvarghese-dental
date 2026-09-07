"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { gsap, isFinePointer } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  "data-cursor"?: string;
}

/**
 * Editorial CTA button that magnetically pulls toward cursor and snaps back elastically.
 * Upward-sweeping accent fill on hover.
 */
export function MagneticButton({
  children,
  className,
  href = "#",
  onClick,
  "data-cursor": cursorLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || !isFinePointer()) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, { x: dx * 0.22, y: dy * 0.32, duration: 0.55, ease: "power3.out" });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.85, ease: "elastic.out(1, 0.45)" });
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor={cursorLabel}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-current px-8 py-4 text-xs font-mono tracking-widest uppercase transition-colors duration-300",
        className,
      )}
    >
      {/* Accent fill sweeps up on hover */}
      <span className="absolute inset-0 translate-y-full rounded-full bg-[var(--color-gold)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
      <span className="relative z-10 flex items-center gap-2.5 transition-colors duration-500 group-hover:text-[#1a0f2e]">
        {children}
      </span>
    </a>
  );
}
