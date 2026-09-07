# Page override: Home (single landing)

This file **overrides** `MASTER.md` for the public landing page.

## Reasoning

- Product: premium dental clinic — Implantology & Smile Design
- Brand identity: deep plum purple + champagne gold + ivory (from Dr. Pinky Varghese visual identity)
- Pattern: Hero-centric + Trust & Authority storytelling with cinematic dark/light scroll worlds
- Type: Cormorant Garamond (display) + Manrope (body) + IBM Plex Mono (meta)
- Style: Exaggerated editorial minimalism adapted for luxury dental — not a purple template

## Tokens (home)

| Role | Hex | Why |
|------|-----|-----|
| Ink | `#1A0F2E` | Deep plum brand ground |
| Paper | `#F7F3EB` | Ivory breathing room |
| Gold | `#C9A96E` | Champagne premium accent |
| Gold light | `#DFC49A` | Soft hover / highlight |
| Lavender | `#9A8BB5` | Soft muted violet |

## Sections

1. Hero — brand-first: Dr. Pinky Varghese · Implantology & Smile Design
2. Manifesto — ivory editorial statement
3. Treatment Index — dark horizontal pathways
4. Anatomy Study — ivory orbital storytelling
5. Clinician — dark portrait + philosophy
6. Spaces — ivory lookbook
7. Voices — dark testimonials
8. Visit — ivory consultation form
9. Footer — dark brand close

## Motion

- Hero: gold path draw, masked typography, layered parallax, magnetic CTA
- Sections: theme morph ink ↔ paper via ScrollTrigger
- Gold rules draw on enter
- Skip non-essential motion under `prefers-reduced-motion`

## Avoid on this page

Purple-everywhere templates, gold text walls, fake awards, neumorphism, cyan medical tropes, green botanical remnants.
