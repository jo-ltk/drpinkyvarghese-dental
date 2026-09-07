"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { useId, useState } from "react";
import { clinic } from "@/content/clinic";
import { cn } from "@/lib/utils";

type FormState = {
  service: string;
  timing: string;
  name: string;
  phone: string;
  notes: string;
};

const serviceOptions = [
  "Implant Consultation",
  "Smile Design Dialogue",
  "Ceramic Restorations",
  "Gentle Preventive Care",
  "General Oral Health Dialogue",
];

const timingOptions = [
  "Morning (09:00 – 12:00)",
  "Midday (12:00 – 15:00)",
  "Afternoon (15:00 – 18:00)",
];

export function Visit() {
  const formId = useId();
  const [values, setValues] = useState<FormState>({
    service: serviceOptions[0],
    timing: timingOptions[0],
    name: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Please provide your full name.";
    if (!values.phone.trim()) nextErrors.phone = "Please enter your contact phone.";
    return nextErrors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  }

  return (
    <section
      id="visit"
      data-theme="paper"
      className="relative px-5 py-28 transition-colors duration-700 sm:px-8 md:px-12 md:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Chapter Header */}
        <div className="mb-14 flex items-center justify-between border-b border-current/15 pb-5">
          <span className="meta text-current opacity-50">
            Nº07 — Consultation Concierge
          </span>
          <span className="font-mono text-xs text-[var(--color-gold)]">
            Pavilion Suite 4 · Kochi
          </span>
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Clinic Contact Information */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-light leading-[1.04] text-current">
                Reserve an
                <br />
                <em className="italic text-[var(--color-gold)]">
                  unhurried visit.
                </em>
              </h2>

              <p className="mt-6 text-sm sm:text-base leading-relaxed text-current opacity-70">
                Daily reservations with Dr. Pinky Varghese are limited to
                protect unhurried consultation time for implantology and smile
                design.
              </p>

              {/* Direct Concierge Access Cards */}
              <div className="mt-8 space-y-3 font-mono">
                <a
                  href={clinic.phoneHref}
                  data-cursor="CALL"
                  className="group flex items-center justify-between rounded-xl border border-current/15 bg-current/5 p-4 transition-colors hover:border-[var(--color-gold)] hover:bg-current/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)]">
                      <Phone className="size-4" />
                    </div>
                    <div>
                      <p className="text-[0.625rem] uppercase tracking-wider opacity-60">
                        Telephone Concierge
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-current">
                        {clinic.phoneDisplay}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="size-4 opacity-50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                </a>

                <a
                  href={clinic.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="CHAT"
                  className="group flex items-center justify-between rounded-xl border border-current/15 bg-current/5 p-4 transition-colors hover:border-[var(--color-gold)] hover:bg-current/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366]">
                      <MessageCircle className="size-4" />
                    </div>
                    <div>
                      <p className="text-[0.625rem] uppercase tracking-wider opacity-60">
                        WhatsApp Concierge
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-current">
                        Direct Inquiries & Fast-Track
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="size-4 opacity-50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                </a>

                <a
                  href={`mailto:${clinic.email}`}
                  data-cursor="MAIL"
                  className="group flex items-center justify-between rounded-xl border border-current/15 bg-current/5 p-4 transition-colors hover:border-[var(--color-gold)] hover:bg-current/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)]">
                      <Mail className="size-4" />
                    </div>
                    <div>
                      <p className="text-[0.625rem] uppercase tracking-wider opacity-60">
                        Private Records & Inquiries
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-current">
                        {clinic.email}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="size-4 opacity-50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                </a>
              </div>
            </div>

            {/* Address & Hours */}
            <div className="mt-10 border-t border-current/15 pt-6 space-y-3 font-mono text-xs opacity-65">
              <div className="flex items-start gap-2.5">
                <MapPin className="size-4 text-[var(--color-gold)] shrink-0 mt-0.5" />
                <span>{clinic.addressLines.join(", ")}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="size-4 text-[var(--color-gold)] shrink-0 mt-0.5" />
                <span>{clinic.hours}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Reservation Request Desk */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[var(--color-gold)]/25 bg-white p-6 sm:p-10 shadow-[0_24px_60px_rgba(26,15,46,0.08)]">
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)] mb-5">
                    <CheckCircle2 className="size-7" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-light text-current">
                    Consultation Request Received
                  </h3>
                  <p className="mt-3 max-w-md mx-auto text-xs sm:text-sm leading-relaxed text-current opacity-70">
                    Thank you, {values.name}. Our clinic concierge will reach
                    out via {values.phone} within one business day to coordinate
                    and confirm your dedicated reservation.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4 font-mono text-xs">
                    <a
                      href={clinic.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-black hover:opacity-95"
                    >
                      <MessageCircle className="size-4" />
                      <span>Confirm Faster via WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-2 rounded-full border border-current/30 px-6 py-3 font-medium text-current hover:bg-current/10"
                    >
                      <span>New Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Service Focus */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-mono text-[var(--color-gold)] mb-2.5">
                      1. Consultation Focus
                    </label>
                    <div className="grid gap-2 sm:grid-cols-2 font-mono">
                      {serviceOptions.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() =>
                            setValues((v) => ({ ...v, service: opt }))
                          }
                          className={cn(
                            "cursor-pointer rounded-xl border p-3 text-left text-xs transition-all",
                            values.service === opt
                              ? "border-[var(--color-gold)] bg-[var(--color-gold)]/15 text-current font-semibold"
                              : "border-current/15 bg-current/5 text-current opacity-70 hover:opacity-100",
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timing */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-mono text-[var(--color-gold)] mb-2.5">
                      2. Preferred Time Slot
                    </label>
                    <div className="grid gap-2 sm:grid-cols-3 font-mono">
                      {timingOptions.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setValues((v) => ({ ...v, timing: t }))}
                          className={cn(
                            "cursor-pointer rounded-xl border p-2.5 text-center text-xs transition-all",
                            values.timing === t
                              ? "border-[var(--color-gold)] bg-[var(--color-gold)]/15 text-current font-semibold"
                              : "border-current/15 bg-current/5 text-current opacity-70 hover:opacity-100",
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor={`${formId}-name`}
                        className="block text-xs uppercase tracking-wider font-mono text-[var(--color-gold)] mb-2"
                      >
                        3. Full Name *
                      </label>
                      <input
                        id={`${formId}-name`}
                        type="text"
                        required
                        value={values.name}
                        onChange={(e) =>
                          setValues((v) => ({ ...v, name: e.target.value }))
                        }
                        placeholder="e.g. Dr. Thomas Mathew"
                        className={cn(
                          "w-full rounded-xl border bg-current/5 px-4 py-3 text-sm text-current placeholder:text-current/30 focus:border-[var(--color-gold)] focus:outline-none",
                          errors.name ? "border-red-400" : "border-current/20",
                        )}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500 font-mono">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={`${formId}-phone`}
                        className="block text-xs uppercase tracking-wider font-mono text-[var(--color-gold)] mb-2"
                      >
                        4. Contact Phone *
                      </label>
                      <input
                        id={`${formId}-phone`}
                        type="tel"
                        required
                        value={values.phone}
                        onChange={(e) =>
                          setValues((v) => ({ ...v, phone: e.target.value }))
                        }
                        placeholder="+91 98470 00000"
                        className={cn(
                          "w-full rounded-xl border bg-current/5 px-4 py-3 text-sm text-current placeholder:text-current/30 focus:border-[var(--color-gold)] focus:outline-none",
                          errors.phone ? "border-red-400" : "border-current/20",
                        )}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500 font-mono">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label
                      htmlFor={`${formId}-notes`}
                      className="block text-xs uppercase tracking-wider font-mono text-[var(--color-gold)] mb-2"
                    >
                      5. Specific Inquiries or Notes (Optional)
                    </label>
                    <textarea
                      id={`${formId}-notes`}
                      rows={3}
                      value={values.notes}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, notes: e.target.value }))
                      }
                      placeholder="Share past dental experiences, anxiety considerations, or schedule preferences..."
                      className="w-full rounded-xl border border-current/20 bg-current/5 px-4 py-3 text-sm text-current placeholder:text-current/30 focus:border-[var(--color-gold)] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    data-cursor="SUBMIT"
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] py-4 text-xs font-mono font-semibold tracking-widest uppercase text-[#1a0f2e] transition-all hover:bg-[var(--color-gold-light)] hover:shadow-lg active:scale-[0.99] cursor-pointer"
                  >
                    <Sparkles className="size-4" />
                    <span>Request Confirmed Reservation</span>
                  </button>

                  <p className="text-center font-mono text-[0.625rem] uppercase tracking-wider text-current opacity-50">
                    Direct concierge response within 24 business hours ·
                    Unhurried consultation fee applies to treatment
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
