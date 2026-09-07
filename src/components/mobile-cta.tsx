"use client";

import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { clinic } from "@/content/clinic";

export function MobileCta() {
  const [hidden, setHidden] = useState(false);

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

  if (hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pointer-events-none md:hidden">
      <div className="pointer-events-auto mx-auto flex max-w-sm items-center justify-between gap-3 rounded-full bg-[#1a0f2e]/92 p-2 text-white shadow-[0_16px_40px_rgba(10,5,20,0.55)] backdrop-blur-lg border border-[var(--color-gold)]/25">
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
          className="flex flex-1 min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-widest font-semibold text-[#1a0f2e] shadow-md transition-transform active:scale-95"
        >
          <Sparkles className="size-3.5" />
          <span>Reserve Consultation</span>
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </div>
  );
}
