"use client";

import { CalendarDays, MapPin, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { clinic } from "@/content/clinic";

export function MobileCta() {
  const [hidden, setHidden] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const visit = document.getElementById("visit");
    if (!visit) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(visit);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowLocations(window.scrollY > window.innerHeight * 0.85);
      setPastHero(window.scrollY > window.innerHeight * 0.72);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden || !pastHero) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="pointer-events-auto mx-auto flex max-w-md flex-col gap-2">
        {/* Consulting locations bar — appears after hero */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            showLocations
              ? "max-h-16 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 translate-y-3"
          }`}
        >
          <div className="flex items-center gap-2 rounded-full border border-[var(--color-gold)]/25 bg-[#1a0f2e]/92 px-3.5 py-2.5 text-[#f7f3eb] shadow-[0_12px_32px_rgba(10,5,20,0.45)] backdrop-blur-lg">
            <MapPin
              className="size-3.5 shrink-0 text-[var(--color-gold)]"
              strokeWidth={1.75}
            />
            <p className="min-w-0 truncate font-mono text-[0.52rem] tracking-[0.14em] text-[#f7f3eb]/85 uppercase">
              <span className="text-[var(--color-gold)]">Consulting at</span>{" "}
              {clinic.consultingAt.join(" · ")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 rounded-full border border-[var(--color-gold)]/25 bg-[#1a0f2e]/92 p-1.5 text-white shadow-[0_16px_40px_rgba(10,5,20,0.55)] backdrop-blur-lg">
          <a
            href={clinic.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366] transition-transform active:scale-95"
            aria-label="Direct WhatsApp Concierge"
          >
            <MessageCircle className="size-5" />
          </a>

          <a
            href="#visit"
            className="cta-gold flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 font-sans text-[0.72rem] font-semibold tracking-[0.04em] transition-[filter,transform] active:scale-95"
          >
            <CalendarDays className="size-3.5" strokeWidth={1.75} />
            <span>Book Appointment</span>
          </a>
        </div>
      </div>
    </div>
  );
}
