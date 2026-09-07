import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** Signature entrance ease — soft expo-out. */
export const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
export const EASE_GSAP = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-morph worlds — synchronized with CSS variables in `globals.css`.
 * Ink: Deep plum purple ground + ivory text.
 * Paper: Ivory ground + deep plum text.
 */
export const THEME = {
  /* Dark: deep plum + ivory */
  ink: { bg: "#1a0f2e", fg: "#f7f3eb" },
  /* Light: ivory + plum charcoal */
  paper: { bg: "#f7f3eb", fg: "#1a0f2e" },
} as const;

export type ThemeName = keyof typeof THEME;

export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const isFinePointer = () => {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(pointer: fine)").matches;
};

export { gsap, ScrollTrigger, useGSAP };
