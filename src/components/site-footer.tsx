"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/motion";
import { Marquee } from "@/components/marquee";
import { MagneticButton } from "@/components/magnetic-button";
import { clinic } from "@/content/clinic";

const LINK_GROUPS = [
  {
    title: "Clinical Index",
    links: [
      { label: "Implant Consultation", href: "#treatments" },
      { label: "Smile Design Dialogue", href: "#treatments" },
      { label: "Ceramic Restorations", href: "#treatments" },
      { label: "Gentle Preventive Care", href: "#treatments" },
    ],
  },
  {
    title: "The Practice",
    links: [
      { label: "Manifesto", href: "#manifesto" },
      { label: "Anatomy Study", href: "#anatomy" },
      { label: "Spatial Architecture", href: "#spaces" },
      { label: "The Clinician", href: "#dentist" },
    ],
  },
  {
    title: "Concierge",
    links: [
      { label: clinic.phoneDisplay, href: clinic.phoneHref },
      { label: "Direct WhatsApp", href: clinic.whatsappHref },
      { label: clinic.email, href: `mailto:${clinic.email}` },
      { label: clinic.hours, href: "#visit" },
    ],
  },
];

export function SiteFooter() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-footer-reveal]", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          once: true,
        },
      });

      // Giant monumental wordmark rises out of the fold on scroll
      gsap.from("[data-wordmark]", {
        yPercent: 35,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <footer
      ref={root}
      id="footer"
      data-theme="ink"
      className="relative overflow-hidden transition-colors duration-700"
    >
      {/* Top Ticker Marquee */}
      <Marquee className="border-y border-current/15 py-3.5" duration={24}>
        <span className="meta flex items-center text-[var(--color-gold)]">
          <span className="px-6">Implantology & Smile Design</span>
          <span className="size-1 rounded-full bg-current" />
          <span className="px-6">By Confirmed Appointment Only</span>
          <span className="size-1 rounded-full bg-current" />
          <span className="px-6">Private Practice · Kochi</span>
          <span className="size-1 rounded-full bg-current" />
          <span className="px-6">Pavilion Suite 4 · The Crescent</span>
          <span className="size-1 rounded-full bg-current" />
        </span>
      </Marquee>

      <div className="px-5 pt-28 sm:px-8 md:px-12 md:pt-40 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            data-footer-reveal
            className="font-display text-4xl leading-[1.06] font-light sm:text-6xl md:text-7xl text-current"
          >
            Preserve beauty,
            <br />
            <em className="italic text-[var(--color-gold)]">design</em> with care.
          </h2>

          <div data-footer-reveal className="mt-12 flex justify-center">
            <MagneticButton href="#visit" data-cursor="CONSULT">
              <span className="flex items-center gap-2">
                Request Private Consultation
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </span>
            </MagneticButton>
          </div>
        </div>

        {/* 4-Column Structured Link Grid */}
        <div
          data-footer-reveal
          className="mt-28 grid grid-cols-2 gap-10 border-t border-current/15 pt-12 md:grid-cols-4"
        >
          <div>
            <span className="font-editorial text-lg text-current uppercase tracking-tight">
              {clinic.name}
              <sup className="text-[0.55em] font-mono text-[var(--color-gold)] ml-1">
                ®
              </sup>
            </span>
            <p className="meta mt-4 max-w-[18ch] text-current opacity-45">
              Implantology & smile design — private practice in Kochi
            </p>
          </div>

          {LINK_GROUPS.map((group) => (
            <nav key={group.title}>
              <span className="meta text-current opacity-45">{group.title}</span>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm font-mono text-current opacity-70 transition-colors duration-300 hover:opacity-100 hover:text-[var(--color-gold)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom Colophon */}
        <div className="meta mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 text-current opacity-40">
          <span>© {new Date().getFullYear()} {clinic.name} · All rights reserved.</span>
          <span>Pavilion Suite 4, The Crescent · Kochi, Kerala</span>
        </div>
      </div>

      {/* Giant Clipped Monumental Wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative h-[18vw] overflow-hidden select-none"
      >
        <span
          data-wordmark
          className="text-outline absolute inset-x-0 -bottom-[6vw] text-center font-display text-[22vw] leading-none font-light tracking-tighter"
        >
          VARGHESE
        </span>
      </div>
    </footer>
  );
}
