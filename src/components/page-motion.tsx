"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // 1. Accessibility: Prefers Reduced Motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".hero-line-inner",
            ".hero-image",
            "[data-reveal]",
            "[data-care-row]",
            "body",
          ],
          { clearProps: "all" },
        );
      });

      // 2. High-Craft Motion Choreography
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // --- Hero Entrance Choreography ---
        const heroLines = gsap.utils.toArray<HTMLElement>(".hero-line-inner");
        if (heroLines.length) {
          gsap.from(heroLines, {
            yPercent: 120,
            duration: 1.25,
            ease: "power3.out",
            stagger: 0.12,
            delay: 0.1,
          });
        }

        const heroImage = document.querySelector(".hero-image");
        if (heroImage) {
          gsap.from(heroImage, {
            scale: 1.15,
            duration: 1.8,
            ease: "power2.out",
          });

          // Subtle Scroll Parallax on Hero Image
          gsap.to(heroImage, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: "#top",
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }

        // --- Viewport Element Reveals ---
        const revealElements = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        revealElements.forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 20,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // --- Care Treatment Ledger Stagger ---
        const careRows = gsap.utils.toArray<HTMLElement>("[data-care-row]");
        if (careRows.length) {
          gsap.from(careRows, {
            opacity: 0,
            y: 24,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#care",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // --- Global Scroll-Driven Chromatic Evolution ---
        // Smoothly transitions body background between distinct atmospheric moods
        const chromaticSections = [
          { id: "#philosophy", bg: "#f7f5f0", text: "#141210" },
          { id: "#dentist", bg: "#121110", text: "#f6f3ec" },
          { id: "#care", bg: "#efece4", text: "#141210" },
          { id: "#spaces", bg: "#0c0b0a", text: "#f6f3ec" },
          { id: "#voices", bg: "#f7f5f0", text: "#141210" },
          { id: "#visit", bg: "#181716", text: "#f6f3ec" },
        ];

        chromaticSections.forEach((section) => {
          const triggerEl = document.querySelector(section.id);
          if (triggerEl) {
            ScrollTrigger.create({
              trigger: triggerEl,
              start: "top 55%",
              end: "bottom 55%",
              onEnter: () => {
                gsap.to("body", {
                  backgroundColor: section.bg,
                  color: section.text,
                  duration: 0.7,
                  ease: "power2.out",
                });
              },
              onEnterBack: () => {
                gsap.to("body", {
                  backgroundColor: section.bg,
                  color: section.text,
                  duration: 0.7,
                  ease: "power2.out",
                });
              },
            });
          }
        });
      });

      // 3. Desktop Pinned Spatial Journey
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const pin = document.querySelector<HTMLElement>(".rooms-pin");
          const track = document.querySelector<HTMLElement>(".rooms-track");
          if (!pin || !track) return;

          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 120);

          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              start: "top top+=70",
              end: () => `+=${distance()}`,
              scrub: 0.8,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        },
      );

      // Refresh ScrollTrigger once fonts and layout settle
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      return () => {
        clearTimeout(timer);
        mm.revert();
      };
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
