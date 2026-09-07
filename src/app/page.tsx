"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, THEME, type ThemeName } from "@/lib/motion";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { TreatmentIndex } from "@/components/treatment-index";
import { AnatomyStudy } from "@/components/anatomy-study";
import { Dentist } from "@/components/dentist";
import { Rooms } from "@/components/rooms";
import { Voices } from "@/components/voices";
import { Visit } from "@/components/visit";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCta } from "@/components/mobile-cta";
import { Cursor } from "@/components/cursor";
import { Grain } from "@/components/grain";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function Home() {
  const main = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--bg", THEME.ink.bg);
    document.documentElement.style.setProperty("--fg", THEME.ink.fg);
  }, []);

  useGSAP(
    () => {
      // Dynamic theme morphing — smoothly animates root CSS variables between dark (ink) & light (paper) worlds
      // Only section-level theme markers (direct children of main)
      gsap.utils
        .toArray<HTMLElement>("main > [data-theme], footer[data-theme]")
        .forEach((section) => {
          const theme = THEME[section.dataset.theme as ThemeName];
          if (!theme) return;

          ScrollTrigger.create({
            trigger: section,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              if (!self.isActive) return;
              gsap.to(document.documentElement, {
                "--bg": theme.bg,
                "--fg": theme.fg,
                duration: 0.85,
                ease: "power2.out",
                overwrite: "auto",
              });
            },
          });
        });

      document.fonts?.ready?.then(() => ScrollTrigger.refresh());
    },
    { scope: main },
  );

  return (
    <SmoothScroll>
      <Cursor />
      <Grain />
      <SiteHeader />
      <main ref={main} className="relative">
        <Hero />
        <Manifesto />
        <TreatmentIndex />
        <AnatomyStudy />
        <Dentist />
        <Rooms />
        <Voices />
        <Visit />
      </main>
      <SiteFooter />
      <MobileCta />
    </SmoothScroll>
  );
}
