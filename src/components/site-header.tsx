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
              "flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 border sm:px-6",
              scrolled
                ? "border-[var(--color-gold)]/20 bg-[#1a0f2e]/75 text-[#f7f3eb] shadow-[0_18px_50px_rgba(10,5,20,0.45)] backdrop-blur-md"
                : "border-transparent bg-transparent text-[#f7f3eb]",
            )}
          >
            <a
              href="#top"
              data-cursor="TOP"
              className="group flex min-w-0 items-center gap-2.5 focus:outline-none"
            >
              <span className="font-editorial text-[1.05rem] sm:text-lg font-light tracking-tight text-current">
                {clinic.name}
              </span>
              <span className="hidden size-1.5 shrink-0 rounded-full bg-[var(--color-gold)] sm:inline-block" />
              <span className="hidden truncate font-mono text-[0.58rem] tracking-[0.22em] text-[var(--color-gold)]/80 uppercase lg:inline">
                Smile Design
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
                  className="group relative font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-current opacity-70 transition-opacity hover:opacity-100"
                >
                  <span>{item.label}</span>
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#visit"
                data-cursor="RESERVE"
                className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/50 bg-[var(--color-gold)]/10 px-5 py-2 font-mono text-[0.6875rem] font-medium uppercase tracking-widest text-[#f7f3eb] backdrop-blur-xs transition-all duration-300 hover:bg-[var(--color-gold)] hover:text-[#1a0f2e] active:scale-[0.98]"
              >
                <Sparkles className="size-3 text-[var(--color-gold)] group-hover:text-inherit" />
                <span>Reserve</span>
              </a>

              <button
                type="button"
                className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-[var(--color-gold)]/25 bg-[#1a0f2e]/45 text-current transition-transform active:scale-95 lg:hidden"
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

      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-between bg-[#1a0f2e] px-6 pt-24 pb-10 text-[#f7f3eb] transition-all duration-500 lg:hidden",
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none",
        )}
      >
        <div className="gold-rule mb-2 w-full opacity-60" />
        <nav className="flex flex-col divide-y divide-[var(--color-gold)]/12">
          {navLinks.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-5 text-current transition-colors hover:text-[var(--color-gold)]"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-[var(--color-gold)]">
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

        <div className="space-y-4 pt-6 border-t border-[var(--color-gold)]/15 font-mono text-xs">
          <div className="flex items-center justify-between text-[#f7f3eb]/60">
            <span>Direct Concierge</span>
            <span className="text-[var(--color-gold)]">{clinic.phoneDisplay}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={clinic.phoneHref}
              className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--color-gold)]/30 py-3 text-center uppercase tracking-widest text-[#f7f3eb]"
            >
              <Phone className="size-3.5" />
              <span>Call</span>
            </a>
            <a
              href="#visit"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] py-3 text-center uppercase tracking-widest text-[#1a0f2e] font-semibold"
            >
              <span>Reserve</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
