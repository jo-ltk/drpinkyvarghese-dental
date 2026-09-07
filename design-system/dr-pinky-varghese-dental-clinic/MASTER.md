# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Dr Pinky Varghese Dental Clinic
**Generated:** 2026-09-07
**Category:** Luxury Healthcare / Premium Dental
**Design Dials:** Variance 4/10 (Balanced) | Motion 8/10 (Complex) | Density 3/10 (Spacious)

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Ink / Deep Plum | `#1A0F2E` | `--color-ink` |
| Plum | `#241538` | `--color-plum` |
| Violet Surface | `#3A2458` | `--color-violet` |
| Soft Lavender | `#9A8BB5` | `--color-lavender` |
| Champagne Gold | `#C9A96E` | `--color-gold` |
| Gold Light | `#DFC49A` | `--color-gold-light` |
| Gold Deep | `#A8894E` | `--color-gold-deep` |
| Ivory Paper | `#F7F3EB` | `--color-paper` |
| Pure White | `#FFFFFF` | `--color-white` |
| On Gold | `#1A0F2E` | `--color-on-brand` |

**Hierarchy:** Purple = brand/depth · Ivory = breath · White = clarity · Champagne gold = restrained accent only.

### Typography

- **Heading / Display:** Cormorant Garamond
- **Body / UI:** Manrope
- **Meta / Labels:** IBM Plex Mono
- **Mood:** luxury, dental, elegant, feminine-professional, editorial

### Spacing

Spacious density: 4 / 8 / 24 / 32 / 48 / 64 / 96 px rhythm.

### Motion

GSAP + ScrollTrigger + `@gsap/react`. Luxury pacing — gold line draws, typography reveals, image masking, subtle parallax. Respect `prefers-reduced-motion`.

### Anti-Patterns

- ❌ Purple background + gold text everywhere
- ❌ Harsh yellow metallics
- ❌ Random purple gradients
- ❌ Script fonts as primary UI type
- ❌ Invented medical credentials or awards
- ❌ Cheap template card farms

## Pre-Delivery Checklist

- [ ] Gold used as accent only
- [ ] Purple tonal family consistent
- [ ] Ivory/white sections for cinematic contrast
- [ ] Brand name hero-level in first viewport
- [ ] Mobile hero composition premium
- [ ] Touch targets ≥44px
- [ ] Reduced motion respected
