# Misbahullah Portfolio — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.0 | UI framework |
| react-dom | ^18.3.0 | React DOM renderer |
| gsap | ^3.12.0 | Core animation engine + ScrollTrigger plugin |
| @studio-freight/lenis | ^1.0.0 | Smooth scroll with inertia |
| imagesloaded | ^5.0.0 | Image preload detection before animations |
| vite | ^5.0.0 | Build tool (dev dependency) |
| @vitejs/plugin-react | ^4.0.0 | React Vite plugin (dev dependency) |
| typescript | ^5.0.0 | Type checking (dev dependency) |
| tailwindcss | ^3.4.0 | Utility CSS framework (dev dependency) |
| postcss | ^8.4.0 | CSS processing (dev dependency) |
| autoprefixer | ^10.4.0 | CSS vendor prefixes (dev dependency) |

No shadcn/ui components required — all UI is custom-built for this design.

---

## Component Inventory

### Layout (shared across page)

| Component | Source | Reuse |
|-----------|--------|-------|
| Navigation | Custom | Once — fixed nav with scroll-aware background |
| MobileMenuOverlay | Custom | Once — full-screen overlay menu |
| ScrollToTopButton | Custom | Once — fixed bottom-right button |
| Footer | Custom | Once |

### Sections (page-specific, used once each)

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Full-viewport bg image + parallax + text overlay |
| AboutSection | Custom | Two-column: text + image with clip-path wipe |
| EducationSection | Custom | Header + two education cards |
| ExperienceSection | Custom | Header + vertical timeline with 4 items |
| SkillsSection | Custom | Header + certification cards + skills grid with progress bars |
| PublicationsSection | Custom | Header + two publication cards |
| ContactSection | Custom | Two-column: info + contact form |

### Reusable Components (shared across sections)

| Component | Source | Used By |
|-----------|--------|---------|
| SectionLabel | Custom | All sections — JetBrains Mono uppercase caption |
| WordRevealHeading | Custom | About, Education, Skills, Publications sections — H2 word-by-word reveal |
| EducationCard | Custom | EducationSection (×2) |
| TimelineItem | Custom | ExperienceSection (×4) |
| CertificationCard | Custom | SkillsSection (×2) |
| SkillBar | Custom | SkillsSection (×9) |
| PublicationCard | Custom | PublicationsSection (×2) |
| ContactForm | Custom | ContactSection — full form with validation + submission states |
| ContactDetail | Custom | ContactSection (×3) — icon + text row |

### Hooks

| Hook | Purpose |
|------|---------|
| useLenis | Initialize Lenis smooth scroll, sync with GSAP ScrollTrigger |
| useScrollSpy | IntersectionObserver-based active section tracking for nav |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Hero parallax background | GSAP + ScrollTrigger | `gsap.to` with `yPercent: 30`, `scrub: true`, triggered on hero section | Low |
| Hero text entrance sequence | GSAP timeline | Sequential `gsap.from` on caption → H1 → subtitle → CTAs with increasing delays | Medium |
| Scroll-down chevron bounce | CSS keyframes | `@keyframes bounce { 0%,100% { translateY(0) } 50% { translateY(8px) } }`, no JS needed | Low |
| Word-by-word text reveal | GSAP + ScrollTrigger | Manual word wrapping into inner/outer spans, `gsap.from` with `yPercent: 100` and stagger `0.04s` | Medium |
| Horizontal clip-path image wipe | GSAP + ScrollTrigger | `gsap.fromTo` on `clipPath: inset()` property, `power3.out` easing | Low |
| Section fade-in pattern | GSAP + ScrollTrigger | `gsap.from` with `y: 20, opacity: 0, stagger: 0.15s` — reusable utility | Low |
| Education card stagger | GSAP + ScrollTrigger | `gsap.from` on cards with `y: 40, stagger: 0.2s`. Left border uses separate `scaleY` tween | Low |
| Timeline line draw | GSAP + ScrollTrigger | `gsap.from` on line with `scaleY: 0`, `transformOrigin: "top"`, `duration: 1.5s` | Low |
| Timeline item slide-in | GSAP + ScrollTrigger | `gsap.from` with dynamic `x` direction based on item index parity, `stagger: 0.25s` | Medium |
| Timeline dot scale | GSAP + ScrollTrigger | `gsap.from` with `scale: 0`, `ease: "back.out(1.7)"`, synced with items | Low |
| Certification card stagger | GSAP + ScrollTrigger | Standard section fade-in pattern | Low |
| Skills grid stagger | GSAP + ScrollTrigger | `gsap.from` on skill items, `stagger: 0.08s` | Low |
| Progress bar fill | GSAP + ScrollTrigger | `gsap.fromTo` width `0%` → target%, `duration: 0.8s`, indexed delay | Medium |
| Publication card stagger | GSAP + ScrollTrigger | Standard fade-in + left accent bar `scaleY` animation | Low |
| Contact section slide-in | GSAP + ScrollTrigger | Left column `x: -20→0`, right column `x: 20→0` with `0.15s` delay | Low |
| Nav background transition | CSS transition + JS | Toggle class based on scroll position past hero. CSS handles `background` and `backdrop-filter` transition | Low |
| Scroll-to-top button appear | CSS transition | Toggle class based on scrollY > 300. CSS handles `opacity` and `transform` | Low |
| Form button loading spinner | CSS keyframes | `@keyframes spin` rotating border element | Low |

---

## State & Logic Plan

### Contact Form State Machine

The form has 4 visual states managed by a single state variable: `idle` | `loading` | `success` | `error`.

- **idle**: Default state. Submit button shows "Send Message".
- **loading**: On submit, button shows "Sending..." with spinner. Form data posts via `fetch()` to external endpoint.
- **success**: On 2xx response, button shows "Message Sent!" with checkmark for 3s, then resets to idle.
- **error**: On network error or non-2xx, button shows error text for 4s, then resets to idle.

Validation runs before submission: required fields (name, email, message) + email regex format. Invalid fields show inline error messages below the input.

### Lenis ↔ GSAP ScrollTrigger Sync

Lenis instance created once at app level via `useLenis` hook. On every Lenis scroll event, call `ScrollTrigger.update()` to keep GSAP's scroll position in sync. Lenis `raf` loop drives the animation frame. Both libraries share the same scroll position — no duplication.

### Scroll Spy (Active Section)

IntersectionObserver watches each section's viewport position. When a section crosses `threshold: 0.3`, update active section state. Nav link highlight follows this state. Separate from ScrollTrigger — uses its own observer for performance (single callback vs. many ScrollTrigger instances).

### Image Preload Gate

Use `imagesloaded` to detect when all section images (hero-bg, about-portrait) are loaded before initializing GSAP ScrollTrigger animations. Prevents miscalculated trigger positions due to unloaded images shifting layout.

---

## Project Structure

```
/mnt/agents/output/app/
├── public/
│   ├── hero-bg.jpg
│   ├── about-portrait.jpg
│   └── cv-misbahullah.pdf
├── src/
│   ├── main.tsx                    # Entry point, font imports
│   ├── App.tsx                     # Root: Lenis provider + all sections + nav + footer + scroll-to-top
│   ├── index.css                   # Tailwind directives, CSS custom properties, keyframes
│   ├── hooks/
│   │   ├── useLenis.ts             # Lenis init + ScrollTrigger sync
│   │   └── useScrollSpy.ts         # IntersectionObserver for active section
│   ├── components/
│   │   ├── Navigation.tsx          # Fixed nav bar + mobile hamburger
│   │   ├── MobileMenuOverlay.tsx   # Full-screen mobile menu
│   │   ├── ScrollToTopButton.tsx   # Fixed scroll-to-top
│   │   ├── Footer.tsx              # Copyright + quick links
│   │   ├── SectionLabel.tsx        # Reusable uppercase caption
│   │   ├── WordRevealHeading.tsx   # H2 with word-by-word GSAP reveal
│   │   ├── EducationCard.tsx       # Education credential card
│   │   ├── TimelineItem.tsx        # Single timeline entry
│   │   ├── CertificationCard.tsx   # Certification credential card
│   │   ├── SkillBar.tsx            # Skill name + progress bar
│   │   ├── PublicationCard.tsx     # Research paper card
│   │   ├── ContactForm.tsx         # Form with validation + submit logic
│   │   └── ContactDetail.tsx       # Icon + text contact row
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── EducationSection.tsx
│       ├── ExperienceSection.tsx
│       ├── SkillsSection.tsx
│       ├── PublicationsSection.tsx
│       └── ContactSection.tsx
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```
