---
name: vocabulary
description: ALWAYS follow for every chat and every task. Master design craft stack combining Emil Kowalski animation vocabulary + design engineering, Taste Skill anti-slop frontend rules, and Impeccable design language. Use for any UI, frontend, landing page, product surface, motion, critique, redesign, polish, or when the user says anything about building or improving interfaces. Also use proactively on new chats before writing UI code.
---

# Vocabulary — Always-On Design Craft Stack

**This skill is mandatory.** On every chat, including brand-new chats, follow this stack before shipping UI. Do not wait for the user to name these skills.

## Sources (installed in this repo)

| Source | Path | Role |
|---|---|---|
| [Emil Kowalski skill](https://emilkowal.ski/skill) | `.cursor/skills/emil-design-eng`, `.cursor/skills/animation-vocabulary`, plus related Emil skills | Motion decisions, easing, duration, component polish, precise animation vocabulary |
| [Taste Skill](https://github.com/leonxlnx/taste-skill) | `.cursor/skills/taste-skill` | Anti-slop frontend: brief inference, dials, AI-tell bans, pre-flight |
| [Impeccable](https://github.com/pbakaus/impeccable) | `.cursor/skills/impeccable` | Design director craft floor, modes (Persuade/Operate/Read/Experience), critique/polish commands |

## Mandatory workflow (every UI-related request)

1. **Read the room** — Follow Taste Skill §0: state a one-line Design Read (`page kind` / `audience` / `vibe` / `system`). Ask at most one clarifying question if the brief truly diverges.
2. **Set dials** — `DESIGN_VARIANCE` / `MOTION_INTENSITY` / `VISUAL_DENSITY` from Taste Skill §1 unless the brief overrides.
3. **Load craft floor** — Before UI edits, read `.cursor/skills/impeccable/reference/craft-floor.md` and obey Verify + Refuse.
4. **Motion with intent** — Use Emil’s decision framework: should it animate → purpose → easing → duration. Prefer custom ease-out curves; never `ease-in` for UI; never animate high-frequency keyboard actions. Use **animation-vocabulary** terms when naming effects.
5. **Kill AI tells** — Taste Skill §9 (purple glow defaults, Inter-by-default, 3 equal feature cards, fake div screenshots, em-dashes, hero version pills, scroll cues, cream+terracotta premium default, etc.).
6. **Pre-flight** — Run Taste Skill §14 before calling the work done.
7. **Reviews** — When reviewing UI/motion, use Emil’s Before/After/Why markdown table format.

## Routing (load the matching skill file)

| User intent | Load |
|---|---|
| Name a motion (“what’s it called when…”) | `animation-vocabulary` |
| Build / tune a specific animation | `animate` + `emil-design-eng` |
| Audit / improve motion in the codebase | `review-animations` / `improve-animations` / `find-animation-opportunities` |
| Landing, portfolio, marketing, redesign anti-slop | `taste-skill` (+ `redesign-skill` when redesigning) |
| Aesthetic variants (soft / minimal / brutal) | `soft-skill` / `minimalist-skill` / `brutalist-skill` |
| Shape, critique, polish, distill, harden, typeset, layout, delight | `impeccable` → matching `reference/<command>.md` |
| Apple-like fluid motion principles | `apple-design` |
| Pick a trusted UI library | `pick-ui-library` |

## Non-negotiables (quick card)

- No AI-purple / indigo gradient defaults; no warm-cream + terracotta premium default; no Inter/Roboto/Arial as the expressive default.
- Buttons get press feedback (`scale(0.97)`); never enter from `scale(0)`; popovers are origin-aware (modals stay centered).
- UI motion usually ≤300ms; strong custom `ease-out`; springs for interruptible gestures.
- One accent, locked. Cards only when they hold interaction. No eyebrow kickers above headlines (Impeccable ban).
- Honor an existing project design system over reinventing aesthetics.
- Respect `prefers-reduced-motion` and contrast floors.

## When the task is not UI

Still keep this stack available. If the user later asks for UI in the same chat, apply it immediately without being re-prompted.
