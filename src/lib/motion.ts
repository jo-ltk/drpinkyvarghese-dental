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
 * Ink: Deep architectural botanical pine ground + warm alabaster porcelain text.
 * Paper: Warm travertine alabaster ground + obsidian charcoal text.
 */
export const THEME = {
  /* Dark: hero botanical atelier pine + porcelain text */
  ink: { bg: "#081411", fg: "#f4f0e8" },
  /* Light: warm alabaster travertine ground + obsidian charcoal text */
  paper: { bg: "#f4f0e8", fg: "#121614" },
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
