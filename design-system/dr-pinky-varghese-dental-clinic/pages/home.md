# Page override: Home (single landing)

This file **overrides** `MASTER.md` for the public landing page.

## Reasoning (verified)

- Product: dental clinic / healthcare service, C-end patients, first contact on a phone.
- Skill `--design-system` returned **Neumorphism** + cyan `#ECFEFF` + **Atkinson Hyperlegible**. Neumorphism is marked `Accessibility: risk:high`. Cyan wash + health-green CTA reads as a generic medical template (user constraint + skill anti-pattern: neon / template tropes).
- Landing match: **Trust & Authority + Conversion** (`trust-authority-conversion`) — Hero (mission) → proof → solution → CTA. No fake stats, logos, or awards.
- Style applied: **Exaggerated Minimalism** (`exaggerated-minimalism`) adapted for healthcare: oversized type, extreme negative space, black/ink + paper, **single chromatic accent**. Low a11y risk vs neumorphism.
- Color: Dental Practice foreground `#0C4A6E` as the only brand chroma (from `colors.csv` Dental Practice). Paper `#F3EEE6` replaces cyan background. CTA uses the same deep teal — not `#059669` (generic “health green”).
- Type: **Figtree** from pairing “Medical Clean” for UI/body (readability). **Fraunces** for display only (editorial, agency-grade contrast with medical sans). Atkinson remains available in MASTER for other surfaces; home does not use it.
- Density 3/10 spacious tokens kept. Motion 7: scroll reveals + one pin sequence; **no** `back.out` overshoot on medical copy; **no** auto-rotating testimonial carousel (skill carousel a11y cost vs two static quotes).
- CTA: hero + post-proof visit form. Mobile sticky book bar with `scroll-padding` so focus is not fully obscured (UX: Focus Not Obscured).

## Tokens

| Role | Hex | Why |
|------|-----|-----|
| Paper | `#F3EEE6` | Warm, unhurried, not hospital white or cyan |
| Ink | `#141210` | High contrast on paper |
| Brand / CTA | `#0C4A6E` | Dental Practice foreground; single accent |
| On CTA | `#F3EEE6` | 4.5:1+ on teal |
| Muted | `#5C574F` | Secondary copy |
| Line | `#D8D0C4` | Hairline dividers, not card chrome |
| Destructive | `#DC2626` | From MASTER |

## Sections

1. Hero — concept “Nothing here is rushed.”
2. Dentist — who, approach; no invented credentials
3. Care — numbered index, not card grid
4. Rooms — spatial proof (imagery), pin/horizontal on desktop
5. Voices — two static quotes (names clearly placeholder)
6. Visit — appointment form (front-end only) + contact placeholders
7. Footer

## Motion

- Hero: clip-up lines + image scale 1.08→1 (ScrollTrigger scrub optional on image only)
- Sections: opacity + 12px y, `power1.out`, 350ms, start `top 88%`
- Care: stagger 0.06 on rows
- Rooms: desktop pin + x; mobile stacked
- Skip all non-essential motion when `prefers-reduced-motion: reduce`

## Avoid on this page

Neumorphism shadows, cyan `#ECFEFF`, green `#059669` CTAs, emoji icons, auto carousels, fake patient counts, card farms, glassmorphism, AI purple/pink gradients.
