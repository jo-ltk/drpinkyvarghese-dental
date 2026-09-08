"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { clinic } from "@/content/clinic";
import { gsap, useGSAP, EASE_GSAP, prefersReducedMotion } from "@/lib/motion";

function openSiteMenu() {
  window.dispatchEvent(new Event("open-site-menu"));
}

function BrandMark({ className }: { className?: string }) {
  return (
    <a href="#top" className={className}>
      <span className="block text-[0.95rem] font-extrabold tracking-[0.04em] text-black uppercase sm:text-[1.05rem]">
        Dr Pinky
      </span>
      <span className="mt-0.5 block text-[0.62rem] font-normal tracking-[0.01em] text-black/70 sm:text-[0.7rem]">
        quality healthcare.
      </span>
    </a>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const ease = gsap.parseEase(`cubic-bezier(${EASE_GSAP.join(",")})`);
      const q = gsap.utils.selector(root.current);

      gsap
        .timeline({ defaults: { ease } })
        .from(q("[data-hero-photo]"), {
          autoAlpha: 0,
          scale: 1.06,
          duration: 1.15,
        })
        .from(
          q("[data-hero-nav]"),
          { y: -12, autoAlpha: 0, duration: 0.55 },
          0.2,
        )
        .from(
          q("[data-hero-copy]"),
          { y: 16, autoAlpha: 0, duration: 0.55 },
          0.35,
        )
        .from(
          q("[data-hero-title]"),
          { y: 24, autoAlpha: 0, duration: 0.7 },
          0.55,
        )
        .from(
          q("[data-hero-cta]"),
          { y: 18, autoAlpha: 0, duration: 0.5 },
          0.7,
        );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      data-theme="ink"
      className="relative bg-[#0c0c0c] px-2 pt-2 pb-3 text-black sm:px-3 sm:pt-3 sm:pb-4 md:px-4"
    >
      {/* ——— MOBILE ——— */}
      <div className="font-hero relative isolate flex min-h-[calc(100svh-0.5rem)] flex-col overflow-hidden rounded-[1.75rem] bg-white md:hidden">
        <header
          data-hero-nav
          className="relative z-20 flex items-start justify-between gap-3 border-b border-black/10 bg-white px-5 py-3.5"
        >
          <BrandMark className="leading-none" />
          <a
            href={clinic.phoneHref}
            className="pt-1 text-right text-[0.8rem] font-medium text-black"
          >
            Dental Emergency
          </a>
        </header>

        <div className="relative min-h-0 flex-1">
          <div data-hero-photo className="absolute inset-0">
            <Image
              src="/hero-portrait-mobile.png"
              alt={`${clinic.name} — smile and dental care`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_22%]"
            />
          </div>

          <div className="relative z-10 flex h-full min-h-[calc(100svh-4.25rem)] flex-col px-5 pt-4 pb-6 text-white">
            <button
              type="button"
              onClick={openSiteMenu}
              className="w-full rounded-full border border-white/85 bg-white/12 py-2.5 text-center text-[0.95rem] font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              Menu
            </button>

            <p
              data-hero-copy
              className="mx-auto mt-[22vh] max-w-[16.5rem] text-center text-[0.82rem] leading-[1.55] font-medium text-white"
            >
              We wish to provide professional dental services that match the
              current technologies
            </p>

            <div className="mt-auto flex items-end justify-between gap-3">
              <div data-hero-title>
                <p className="text-[0.78rem] font-medium text-white">
                  Trusted Dentist in {clinic.location.replace(", Kerala", "")}
                </p>
                <h1 className="mt-1 text-[clamp(3.35rem,16vw,4.6rem)] leading-[0.86] font-extrabold tracking-[-0.04em] text-white">
                  Dental
                  <br />
                  Care
                </h1>
              </div>

              <a
                href="#manifesto"
                data-hero-cta
                aria-label="Scroll to next section"
                className="mb-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-white/90 text-white transition-transform active:scale-95"
              >
                <ChevronDown className="size-5" strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ——— DESKTOP / TABLET ——— */}
      <div className="font-hero relative isolate hidden min-h-[calc(100svh-1.25rem)] overflow-hidden rounded-[2.25rem] bg-white md:block md:rounded-[2.75rem]">
        <div data-hero-photo className="absolute inset-0 z-0">
          <Image
            src="/hero-portrait.png"
            alt={`${clinic.name} — smile and dental care`}
            fill
            priority
            sizes="100vw"
            className="object-contain object-right"
          />
        </div>

        <div className="relative z-10 flex min-h-[calc(100svh-1.25rem)] flex-col px-8 pt-7 pb-8 md:px-10 lg:px-12">
          <header
            data-hero-nav
            className="grid grid-cols-[1fr_auto_1fr] items-start gap-2"
          >
            <BrandMark className="justify-self-start leading-none" />

            <button
              type="button"
              onClick={openSiteMenu}
              className="justify-self-center rounded-full border border-black bg-white px-6 py-2 text-[0.85rem] font-medium text-black transition-colors hover:bg-black hover:text-white"
            >
              Menu
            </button>

            <a
              href={clinic.phoneHref}
              className="justify-self-end pt-1 text-right text-[0.9rem] font-medium text-black"
            >
              Dental Emergency
            </a>
          </header>

          <p
            data-hero-copy
            className="absolute top-[46%] left-10 max-w-[15.5rem] text-[0.8rem] leading-relaxed text-black/80 lg:left-12"
          >
            We wish to provide professional dental services that match the
            current technologies.
          </p>

          <div className="mt-auto flex items-end justify-between gap-6 pt-0">
            <div data-hero-title className="max-w-xl">
              <p className="text-[0.9rem] font-medium text-black">
                Trusted Dentist in {clinic.location.replace(", Kerala", "")}.
              </p>
              <h1 className="mt-1 text-[clamp(3.4rem,10vw,8.25rem)] leading-[0.82] font-extrabold tracking-[-0.045em] text-black">
                Dental
                <br />
                Care
              </h1>
            </div>

            <div
              data-hero-cta
              className="max-w-[16.5rem] self-end pb-1 text-right text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
            >
              <p className="text-[1.05rem] leading-snug font-medium">
                We believe in the power of your smile
              </p>
              <p className="mt-3 text-[0.8rem] font-medium text-white/95">
                Free Consultation
              </p>
              <a
                href="#visit"
                data-cursor="BOOK"
                className="mt-3 inline-flex min-h-10 items-center justify-center rounded-full bg-white px-6 py-2.5 text-[0.85rem] font-bold text-black transition-transform hover:bg-white/92 active:scale-[0.98]"
              >
                Book Online
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
