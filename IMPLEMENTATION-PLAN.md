# SecureWorks Website — Implementation Plan

## Overview
New Astro site for secureworksgroup.com.au. Replaces nothing — existing Google Ads landing pages stay on GitHub Pages. This is the organic + brand site.

**Timeline:** Ready by end of next week
**Stack:** Astro + GSAP + Lenis + Cloudflare Pages
**Repo:** ~/Projects/secureworks-website/

---

## Phase 0: Scaffold (Sequential — Must Complete First)
**Who:** Main terminal (Claude Code)
**Time:** ~30 min
**Blocks everything else**

- [ ] Create Astro project (minimal template)
- [ ] Install dependencies: gsap, lenis
- [ ] Add Cloudflare adapter
- [ ] Set up base layout component (header, footer, nav)
- [ ] Configure brand CSS variables (from existing site)
- [ ] Add View Transitions (2 lines)
- [ ] Set up Lenis smooth scroll
- [ ] Set up GSAP ScrollTrigger with cleanup on page transition
- [ ] Create reusable section-reveal animation pattern
- [ ] Verify dev server runs clean

**Output:** Working Astro site with layout, smooth scroll, and animations framework. Every subsequent task builds on this.

---

## Phase 1: Core Pages (Parallel — Subagents)
**Who:** 3-4 subagents running simultaneously
**Time:** ~2-3 hours total
**Depends on:** Phase 0 complete

Each subagent gets the layout, brand system, and a content brief. They build one page each as an Astro component.

### Stream A: Homepage
- Hero section (placeholder for 3D scroll — static image for now)
- Services grid (Patios, Fencing, Decking, Outdoor Living) with cards
- Social proof strip (1,200+ jobs, 59% repeat rate, 20+ years)
- Testimonials section (placeholder quotes until real ones ready)
- CTA sections throughout
- Phone number + hours in header (trust signal)

### Stream B: Service Pages (Patios)
- /patios-perth/ — parent page
- /patios-perth/insulated/ — child page
- Content Collections setup (markdown files for each service)
- Schema markup (LocalBusiness, Service)
- Internal linking (child → parent)
- ~700 words per page for SEO

### Stream C: Service Pages (Fencing + Decking)
- /fencing-perth/ — parent page
- /fencing-perth/colorbond/ — child page
- /decking-perth/ — parent page
- /decking-perth/composite/ — child page
- Same Content Collections pattern as Stream B

### Stream D: About + Contact + Projects
- /about/ — Marnin story, team, 1,200 jobs, 59% repeat rate
- /contact/ — contact form (placeholder until GHL integration)
- /projects/ — gallery grid (placeholder images until real photos ready)

---

## Phase 2: Interactive Features (Main Terminal)
**Who:** Main terminal (Claude Code) — iterative work
**Time:** ~3-4 hours
**Depends on:** Phase 0 + Homepage from Phase 1

### 2A: Multi-Step Contact Form
- Step 1: Visual project type cards (Patio / Fencing / Decking / Full Transformation)
- Step 2: Timeline + approximate size
- Step 3: Name, phone, email, suburb
- GSAP animated transitions between steps
- Form submits to a placeholder endpoint (GHL webhook wired up later)
- Place on homepage AND /contact/ page

### 2B: 3D Scroll Hero (When Marnin Has Images)
- Placeholder static hero until Kling video is generated
- Once video exists: FFmpeg frame extraction → WEBP sequence
- GSAP canvas scroll animation
- Desktop only — mobile gets static image
- This is the "holy shit" differentiator

### 2C: Section Animations
- Scroll-triggered reveals on all sections (GSAP ScrollTrigger)
- Staggered card animations on services grid
- Counter animations on stats (1,200+ jobs etc.)
- Keep it tasteful — 3 animation patterns max

---

## Phase 3: Content + Polish (Parallel)
**Who:** Subagents + Marnin
**Time:** 1-2 days
**Depends on:** Phase 1 + 2

### Marnin Does:
- [ ] Shoot 45-second welcome video (phone is fine)
- [ ] Gather 5-10 best project photos (drone aerials if possible)
- [ ] Before/after photo pairs (matching angles) for 3D scroll hero
- [ ] Generate Kling 3.0 video from before/after photos
- [ ] Team/crew photo with branded trucks
- [ ] Review copy on all pages

### Claude Code Does:
- [ ] Integrate real photos into gallery + service pages
- [ ] Embed video (lazy-loaded, muted autoplay loop)
- [ ] Process Kling video → WEBP frames → scroll animation
- [ ] Write blog posts (first 2-3 from SEO brief)
- [ ] Add FAQ accordion to homepage
- [ ] Process/timeline section ("How It Works")

---

## Phase 4: Forms + GHL Integration (End)
**Who:** Main terminal
**Time:** ~2 hours
**Depends on:** Phase 2A form already built

- [ ] Create Cloudflare Worker for form proxy (CORS handler)
- [ ] Set up GHL Inbound Webhook workflow
- [ ] Wire multi-step form → Worker → GHL webhook
- [ ] Add tags: website-lead, speed-to-lead, calculator-lead
- [ ] Configure instant SMS automation in GHL
- [ ] Test full loop: form submit → GHL contact created → SMS sent
- [ ] Add GHL webchat-to-SMS widget (the one acceptable iframe)

---

## Phase 5: SEO + Deploy
**Who:** Main terminal
**Time:** ~1-2 hours
**Depends on:** Everything above

- [ ] Schema markup on all pages (LocalBusiness, Service, FAQ)
- [ ] Meta titles + descriptions optimised for Perth keywords
- [ ] Sitemap generation (Astro built-in)
- [ ] robots.txt
- [ ] Open Graph / social sharing images
- [ ] Lighthouse audit — target 90+ on all metrics
- [ ] Deploy to Cloudflare Pages
- [ ] Connect secureworksgroup.com.au domain
- [ ] Test on mobile (375px, 768px, 1440px)

---

## Dependency Graph

```
Phase 0 (Scaffold)
    ├──→ Phase 1A (Homepage)      ──→ Phase 2B (3D Hero)
    ├──→ Phase 1B (Patio pages)       Phase 2C (Animations)
    ├──→ Phase 1C (Fence/Deck)
    ├──→ Phase 1D (About/Contact)
    └──→ Phase 2A (Form)          ──→ Phase 4 (GHL Integration)

Phase 1 + 2 ──→ Phase 3 (Content/Polish)
Phase 3 + 4 ──→ Phase 5 (SEO + Deploy)
```

---

## What Marnin Can Do In Parallel (Right Now)

While I build Phases 0-2, you can:
1. **Shoot the 45-second video** — script from the research: "G'day, I'm Marnin from SecureWorks..."
2. **Gather project photos** — 5-10 best ones, especially before/after pairs
3. **Generate the Kling 3.0 video** — upload before + after photos, use the construction transformation prompt
4. **Team photo** — crew + branded trucks
5. **Review the SEO keyword targets** from [[2026-03-06-seo-perth-outdoor-living]]

---

## File Structure (Target)

```
secureworks-website/
├── astro.config.mjs
├── package.json
├── IMPLEMENTATION-PLAN.md
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro        (header, footer, nav, meta)
│   ├── components/
│   │   ├── Hero.astro               (3D scroll hero / static fallback)
│   │   ├── ServicesGrid.astro       (service cards)
│   │   ├── MultiStepForm.astro      (contact form island)
│   │   ├── ProjectGallery.astro     (photo grid)
│   │   ├── Testimonials.astro       (testimonial cards)
│   │   ├── ProcessTimeline.astro    (how it works)
│   │   ├── FAQ.astro                (accordion)
│   │   ├── Stats.astro              (1200+ jobs, 59% repeat)
│   │   └── ScrollReveal.astro       (reusable animation wrapper)
│   ├── pages/
│   │   ├── index.astro              (homepage)
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── projects.astro
│   │   ├── patios-perth/
│   │   │   ├── index.astro
│   │   │   └── insulated.astro
│   │   ├── fencing-perth/
│   │   │   ├── index.astro
│   │   │   └── colorbond.astro
│   │   └── decking-perth/
│   │       ├── index.astro
│   │       └── composite.astro
│   ├── content/
│   │   └── services/               (markdown content for each service)
│   ├── styles/
│   │   └── global.css              (brand variables, base styles)
│   └── scripts/
│       ├── animations.js           (GSAP + ScrollTrigger + Lenis)
│       └── form.js                 (multi-step form logic)
├── public/
│   ├── images/                     (project photos, team photos)
│   ├── frames/                     (3D scroll WEBP frames)
│   ├── video/                      (Marnin intro video)
│   └── fonts/                      (if self-hosting)
└── workers/
    └── form-proxy.js               (Cloudflare Worker for GHL)
```
