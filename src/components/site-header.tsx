"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Phone, Sparkles, X } from "lucide-react";
import { clinic, navLinks } from "@/content/clinic";
import { cn } from "@/lib/utils";

const SCROLL_DELTA = 6;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);

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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          navHidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6 lg:px-10">
          <div
            className={cn(
              "flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 border",
              scrolled
                ? "border-current/15 bg-black/60 text-[#f4f0e8] shadow-2xl backdrop-blur-md"
                : "border-transparent bg-transparent text-[#f4f0e8]",
            )}
          >
            {/* Wordmark brand signature */}
            <a
              href="#top"
              data-cursor="TOP"
              className="group flex items-center gap-2 focus:outline-none"
            >
              <span className="font-editorial text-base sm:text-lg font-light tracking-tight text-current uppercase">
                {clinic.name}
              </span>
              <span className="size-1 rounded-full bg-[var(--color-bronze)]" />
              <span className="hidden sm:inline font-mono text-[0.625rem] tracking-[0.24em] text-current opacity-60 uppercase">
                Atelier
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden items-center gap-7 lg:flex"
              aria-label="Primary Navigation"
            >
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-cursor=""
                  className="group relative font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-current opacity-70 transition-opacity hover:opacity-100"
                >
                  <span>{item.label}</span>
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-bronze)] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Header Right Action Pill */}
            <div className="flex items-center gap-3">
              <a
                href="#visit"
                data-cursor="RESERVE"
                className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--color-bronze)]/60 bg-[var(--color-bronze)]/10 px-5 py-2 font-mono text-[0.6875rem] font-medium uppercase tracking-widest text-[#f4f0e8] backdrop-blur-xs transition-all duration-300 hover:bg-[var(--color-bronze)] hover:text-[#081411] active:scale-[0.98]"
              >
                <Sparkles className="size-3" />
                <span>Reserve</span>
              </a>

              {/* Mobile hamburger button */}
              <button
                type="button"
                className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-current/20 bg-black/40 text-current transition-transform active:scale-95 lg:hidden"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-between bg-[#081411] px-6 pt-24 pb-10 text-[#f4f0e8] transition-all duration-500 lg:hidden",
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none",
        )}
      >
        <nav className="flex flex-col divide-y divide-white/10">
          {navLinks.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-5 text-current transition-colors hover:text-[var(--color-bronze)]"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-[var(--color-bronze)]">
                  0{i + 1}
                </span>
                <span className="font-display text-2xl sm:text-3xl font-light tracking-tight">
                  {item.label}
                </span>
              </div>
              <ArrowUpRight className="size-4 opacity-50" />
            </a>
          ))}
        </nav>

        <div className="space-y-4 pt-6 border-t border-white/15 font-mono text-xs">
          <div className="flex items-center justify-between text-[#f4f0e8]/60">
            <span>Direct Concierge</span>
            <span className="text-[var(--color-bronze)]">{clinic.phoneDisplay}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={clinic.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 py-3 text-center uppercase tracking-widest text-[#f4f0e8]"
            >
              <Phone className="size-3.5" />
              <span>Call</span>
            </a>
            <a
              href="#visit"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-[var(--color-bronze)] py-3 text-center uppercase tracking-widest text-[#081411] font-semibold"
            >
              <span>Reserve</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
