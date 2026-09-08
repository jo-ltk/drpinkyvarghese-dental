"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CalendarDays, Phone } from "lucide-react";
import { clinic, navLinks } from "@/content/clinic";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, EASE_GSAP, prefersReducedMotion } from "@/lib/motion";

const SCROLL_DELTA = 6;

function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("size-9 shrink-0 sm:size-10", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="monoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dfc49a" />
          <stop offset="55%" stopColor="#c9a96e" />
          <stop offset="100%" stopColor="#a8894e" />
        </linearGradient>
      </defs>
      <circle
        cx="20"
        cy="20"
        r="18.5"
        fill="none"
        stroke="url(#monoGold)"
        strokeWidth="1"
        opacity="0.7"
      />
      <text
        x="20"
        y="24.5"
        textAnchor="middle"
        fill="url(#monoGold)"
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "15px",
          fontWeight: 500,
          letterSpacing: "0.04em",
        }}
      >
        DP
      </text>
      {/* Subtle implant stem through P */}
      <path
        d="M24.5 12v14"
        stroke="url(#monoGold)"
        strokeWidth="0.9"
        opacity="0.55"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const line3 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const openFromHero = () => setMenuOpen(true);
    window.addEventListener("open-site-menu", openFromHero);
    return () => window.removeEventListener("open-site-menu", openFromHero);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setPastHero(y > window.innerHeight * 0.72);

      if (menuOpen) return;

      const diff = y - lastScrollY.current;
      if (Math.abs(diff) < SCROLL_DELTA) return;

      if (y > 80 && diff > 0) {
        setNavHidden(true);
      } else if (diff < 0) {
        setNavHidden(false);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useGSAP(
    () => {
      const ease = `cubic-bezier(${EASE_GSAP.join(",")})`;
      const reduced = prefersReducedMotion();

      if (menuOpen) {
        gsap.to(line1.current, {
          y: 6,
          rotate: 45,
          duration: reduced ? 0 : 0.35,
          ease,
        });
        gsap.to(line2.current, {
          autoAlpha: 0,
          scaleX: 0,
          duration: reduced ? 0 : 0.2,
          ease,
        });
        gsap.to(line3.current, {
          y: -6,
          rotate: -45,
          duration: reduced ? 0 : 0.35,
          ease,
        });

        const panel = menuRef.current;
        if (!panel) return;

        gsap.set(panel, { pointerEvents: "auto" });
        const tl = gsap.timeline({ defaults: { ease } });
        tl.fromTo(
          panel,
          { autoAlpha: 0, clipPath: "inset(0 0 100% 0)" },
          {
            autoAlpha: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: reduced ? 0.01 : 0.55,
          },
        ).from(
          "[data-menu-item]",
          {
            y: 28,
            autoAlpha: 0,
            duration: reduced ? 0.01 : 0.45,
            stagger: 0.06,
          },
          "-=0.25",
        );
      } else {
        gsap.to(line1.current, { y: 0, rotate: 0, duration: 0.3, ease });
        gsap.to(line2.current, {
          autoAlpha: 1,
          scaleX: 1,
          duration: 0.25,
          ease,
        });
        gsap.to(line3.current, { y: 0, rotate: 0, duration: 0.3, ease });

        const panel = menuRef.current;
        if (!panel) return;
        gsap.to(panel, {
          autoAlpha: 0,
          clipPath: "inset(0 0 100% 0)",
          duration: reduced ? 0.01 : 0.4,
          ease,
          onComplete: () => {
            gsap.set(panel, { pointerEvents: "none" });
          },
        });
      }
    },
    { dependencies: [menuOpen] },
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          !pastHero && !menuOpen
            ? "pointer-events-none -translate-y-full opacity-0"
            : navHidden && !menuOpen
              ? "-translate-y-full"
              : "translate-y-0",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6 lg:px-10">
          <div
            className={cn(
              "flex items-center justify-between gap-3 rounded-full px-3.5 py-2.5 transition-all duration-500 sm:px-5 sm:py-3",
              scrolled || menuOpen
                ? "border border-[var(--color-gold)]/20 bg-[#1a0f2e]/78 text-[#f7f3eb] shadow-[0_16px_40px_rgba(10,5,20,0.4)] backdrop-blur-md"
                : "border border-transparent bg-transparent text-[#f7f3eb]",
            )}
          >
            <a
              href="#top"
              data-cursor="TOP"
              className="group flex min-w-0 items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
            >
              <Monogram />
              <span className="flex min-w-0 flex-col leading-none">
                <span className="font-script text-[1.2rem] tracking-wide text-[#f7f3eb] sm:text-[1.35rem]">
                  {clinic.shortName}
                </span>
                <span className="mt-0.5 hidden font-mono text-[0.5rem] tracking-[0.2em] text-[var(--color-gold)]/80 uppercase sm:block">
                  {clinic.role}
                </span>
              </span>
            </a>

            <nav
              className="hidden items-center gap-7 lg:flex"
              aria-label="Primary Navigation"
            >
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-cursor=""
                  className="group relative font-mono text-[0.6875rem] tracking-[0.2em] text-current uppercase opacity-70 transition-opacity hover:opacity-100"
                >
                  <span>{item.label}</span>
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="#visit"
                data-cursor="BOOK"
                className="cta-gold inline-flex min-h-10 items-center gap-1.5 rounded-full px-3.5 py-2.5 font-sans text-[0.68rem] font-semibold tracking-[0.04em] shadow-[0_8px_20px_rgba(10,5,20,0.35)] transition-[filter,transform] duration-300 sm:min-h-11 sm:gap-2 sm:px-5 sm:text-[0.72rem]"
              >
                <CalendarDays className="size-3.5 shrink-0" strokeWidth={1.75} />
                <span className="sm:hidden">Book Now</span>
                <span className="hidden sm:inline">Book Appointment</span>
              </a>

              <button
                ref={burgerRef}
                type="button"
                className={cn(
                  "relative flex size-11 cursor-pointer items-center justify-center rounded-full border border-[var(--color-gold)]/30 bg-[#1a0f2e]/35 text-current transition-transform active:scale-95",
                  menuOpen ? "" : "lg:hidden",
                )}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className="relative flex h-[12px] w-[16px] flex-col justify-between">
                  <span
                    ref={line1}
                    className="block h-px w-full origin-center bg-current"
                  />
                  <span
                    ref={line2}
                    className="block h-px w-full origin-center bg-current"
                  />
                  <span
                    ref={line3}
                    className="block h-px w-full origin-center bg-current"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        className="fixed inset-0 z-40 flex flex-col justify-between bg-[#1a0f2e] px-6 pt-24 pb-10 text-[#f7f3eb] opacity-0"
        style={{ clipPath: "inset(0 0 100% 0)", pointerEvents: "none" }}
        aria-hidden={!menuOpen}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 80% 20%, rgba(74,40,110,0.55), transparent 60%)",
          }}
        />

        <div className="relative">
          <div className="gold-rule mb-6 w-full opacity-50" />
          <nav className="flex flex-col" aria-label="Mobile Navigation">
            {navLinks.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                data-menu-item
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between border-b border-[var(--color-gold)]/12 py-4 text-current transition-colors hover:text-[var(--color-gold)]"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.65rem] text-[var(--color-gold)]">
                    0{i + 1}
                  </span>
                  <span className="font-editorial text-[1.75rem] font-light tracking-tight sm:text-3xl">
                    {item.label}
                  </span>
                </div>
                <ArrowUpRight className="size-4 opacity-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </nav>
        </div>

        <div data-menu-item className="relative space-y-4 border-t border-[var(--color-gold)]/15 pt-6 font-mono text-xs">
          <div className="flex items-center justify-between text-[#f7f3eb]/60">
            <span className="tracking-[0.18em] uppercase">Direct Concierge</span>
            <span className="text-[var(--color-gold)]">{clinic.phoneDisplay}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={clinic.phoneHref}
              className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--color-gold)]/30 py-3 text-center tracking-widest text-[#f7f3eb] uppercase"
            >
              <Phone className="size-3.5" />
              <span>Call</span>
            </a>
            <a
              href="#visit"
              onClick={() => setMenuOpen(false)}
              className="cta-gold flex min-h-12 items-center justify-center gap-2 rounded-full py-3 text-center tracking-widest uppercase"
            >
              <CalendarDays className="size-3.5" />
              <span>Book</span>
            </a>
          </div>
          <p className="text-center font-mono text-[0.55rem] tracking-[0.16em] text-[#f7f3eb]/45 uppercase">
            Consulting · {clinic.consultingAt.slice(0, 2).join(" · ")}
          </p>
        </div>
      </div>
    </>
  );
}
