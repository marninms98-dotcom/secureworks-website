# SecureWorks WA — New Website (Astro)

## What This Project Is

The main organic + brand website for SecureWorks Group, built with Astro. Will be hosted on secureworksgroup.com.au via Cloudflare Pages. This is separate from the existing Google Ads landing pages (which stay on GitHub Pages at ~/Projects/secureworks-site/).

**Stack:** Astro + GSAP + ScrollTrigger + Lenis + View Transitions
**Hosting:** Cloudflare Pages (free tier)
**Forms:** Custom HTML → Cloudflare Worker → GHL Inbound Webhook (NO iframes)
**Domain:** secureworksgroup.com.au

---

## Company Overview

**Business:** SecureWorks WA Pty Ltd (ABN: 64689223416)
**Trading as:** SecureWorks Group
**Location:** Perth, Western Australia (servicing northern suburbs primarily)
**Founded:** 2022
**Stage:** Scaling from founder-led to operator-led

SecureWorks is a multi-division outdoor living construction company. Patios are the primary revenue driver.

### Services
- **Insulated Patios** (primary — SolarSpan panels by Bondor)
- **Non-insulated patios/carports** (Trimdek, SpanPlus, Corrugated sheets)
- **Colorbond Fencing**
- **Decking** (composite + hardwood)
- **Screening, blinds, shutters**
- **Outdoor kitchens, lighting, fans**

### Positioning
- "Outdoor living solutions provider" — NOT just patio builders
- Premium quality, fair pricing — not the cheapest, not luxury
- Tone: Confident but not arrogant. Plain English, not marketing speak. Consultative, not salesy.
- "Let's work out what suits your space" NOT "Get a FREE quote NOW"

### Key Stats
- 1,200+ jobs completed
- 59% repeat customer rate
- Marnin Stobbe is the founder/CEO and brand face

---

## Brand Guide

### Colours (EXACT — use these precisely)

| Name | HEX | CSS Variable | Use |
|------|-----|-------------|-----|
| SecureWorks Orange | #F15A29 | --orange | CTAs, accents, highlights. NEVER as large background fill. |
| Orange Hover | #d94d20 | --orange-hover | Button hover state |
| Dark Dusty Blue | #293C46 | --dark-blue | Headings, dark backgrounds, nav |
| Mid Dusty Blue | #4C6A7C | --mid-blue | Secondary text, labels, borders |
| Light Blue | #5d7f94 | --light-blue | Tertiary elements |
| Pale BG | #f4f7f9 | --pale-bg | Section backgrounds |
| Tint | #edf1f4 | --tint | Alternating rows, subtle cards |
| Body Text | #3a4f5c | --body-text | Default paragraph text |
| Near Black | #1a2a32 | --near-black | Strongest emphasis (NOT pure #000) |

**Never use:**
- Pure black (#000000) — use Dark Dusty Blue or Near Black
- Generic greys — use the blue-toned greys
- Orange as a large background fill

### Typography
- **Headings:** Plus Jakarta Sans 700/800 (or Helvetica Bold as fallback)
- **Body:** Plus Jakarta Sans 400/500
- **Web fallback:** -apple-system, BlinkMacSystemFont, sans-serif
- Labels: uppercase, letter-spacing: 0.05em, font-weight 700

### Logo
- Primary: House icon (dark blue) + orange underline + "SecureWorks" dark blue italic bold + "WA"
- White version for dark backgrounds
- Logo files: copy from ~/Projects/secureworks-site/assets/

---

## Technical Architecture

### Astro Setup
- View Transitions enabled (2 lines in layout)
- Islands architecture: only interactive components ship JS
- Content Collections for service pages (markdown → pages)
- File-based routing for SEO-friendly URLs

### Animations
- GSAP + ScrollTrigger for scroll animations
- Lenis for smooth scrolling
- CRITICAL: Kill ScrollTrigger instances on `astro:before-swap` to prevent memory leaks
- GSAP ticker synced with Lenis: `gsap.ticker.add((time) => lenis.raf(time * 1000))`
- Mobile: reduce or disable heavy animations
- Max 3 animation patterns (section reveals, staggered cards, counter animations)

### 3D Scroll Hero (Future)
- Kling 3.0 video → FFmpeg WEBP frame extraction → GSAP canvas scroll
- Desktop only — mobile gets static hero image
- Frames go in public/frames/
- Command: `ffmpeg -i input.mp4 -vf "fps=30" -c:v libwebp -quality 80 frames/frame_%04d.webp`

### Forms
- Custom HTML multi-step form (Astro island)
- Step 1: Visual project type cards (NOT text fields)
- Step 2: Timeline + size
- Step 3: Contact details (LAST — never first)
- Submits to Cloudflare Worker proxy → GHL Inbound Webhook
- Worker handles CORS, adds tags (website-lead, speed-to-lead)

### Performance Targets
- LCP under 2.5 seconds
- Lighthouse 90+ on all metrics
- All images: WebP format, lazy-loaded below fold
- Astro ships 0KB JS by default — only islands add JS

---

## Page Structure

```
/                              → Homepage (lands: "outdoor living perth", "backyard renovation")
/patios-perth/                 → Patio services (lands: "alfresco perth")
  /patios-perth/insulated/     → Insulated patios (child)
/fencing-perth/                → Fencing services (parent)
  /fencing-perth/colorbond/    → Colorbond fencing (child)
/decking-perth/                → Decking services (lands: "deck builders perth")
  /decking-perth/composite/    → Composite decking (child)
/outdoor-kitchens-perth/       → Outdoor kitchens (lands: "outdoor kitchen perth" — 880 searches/mo!)
/projects/                     → Project gallery
/about/                        → About (Marnin, team, story)
/contact/                      → Contact form
```

### SEO Rules
- Each service page: 700+ words, schema markup (LocalBusiness, Service)
- Internal links follow silo rules: child → parent only, no cross-silo

---

## Google Ads Strategy (Validated with Keyword Planner — 9 March 2026)

Full strategy doc: `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/WEBSITE RESEARCH/research-briefs/2026-03-09-google-ads-outdoor-living-strategy.md`

### This Site's Google Ads Keywords (don't overlap with existing landing pages)

| Keyword | Real Volume/mo | CPC Range | Landing Page |
|---------|---------------|-----------|-------------|
| outdoor kitchen perth | 880 | $0.90 - $4.64 | /outdoor-kitchens-perth/ |
| outdoor living perth | 140 (+27% YoY) | $1.07 - $3.99 | / (homepage) |
| backyard renovation perth | 70 | $1.90 - $5.38 | / (homepage) |
| alfresco perth | 50 | $1.19 - $3.91 | /patios-perth/ |
| deck builders perth | 50 | $2.73 - $8.41 | /decking-perth/ |
| merbau decking perth | 50 | $0.88 - $2.78 | /decking-perth/ |
| pergola builders perth | 40 | $2.07 - $6.01 | /patios-perth/ |
| backyard design perth | 30 | $1.12 - $3.32 | / (homepage) |
| outdoor room perth | 30 | $0.52 - $1.80 | / (homepage) |
| alfresco builders perth | 20 | $2.17 - $11.78 | /patios-perth/ |

### Keywords That Stay on Existing Landing Pages (DO NOT target from this site)
patios perth (1,600), fencing perth (1,300), decking perth (1,300), carport perth (720), colorbond fencing (720), pergola perth (720), pool fencing (720), composite decking (480), patio builders perth (390), patio installers (260), patio cost (210), timber decking (170), slat fencing (140), aluminium fencing (90)

### Key Findings
- "Insulated patio perth" = only 10 searches/month — use insulation as a page benefit, NOT as headline positioning
- "Outdoor kitchen perth" at 880/mo is the anchor keyword — needs a dedicated page
- "Outdoor living perth" at 140/mo with +27% growth — viable and cheap
- CPCs are $1-$4 for most outdoor living terms (much cheaper than service keywords)
- This site's primary value is SEO + brand. Google Ads is supplementary (~1,370 searches/mo total)

### Real Business Benchmarks (Use for Projections)
- CPL: $60 | Close rate: 25% (1 in 4) | Avg job: $7K (service keywords)
- GP margin: 40%+ | Cost per acquisition: $240 | GP per job after ads: $2,560
- Outdoor living/kitchen leads expected higher avg job ($15-$20K) due to bundled services

### Ads-First Page Requirements
Every page that receives ad traffic must have:
- UTM capture (JS reads URL params → sessionStorage → form hidden fields)
- GCLID capture (hidden field reads `gclid` URL param)
- Multi-step form with contact info LAST
- Phone number + hours in header
- CTA: "Free Design Consultation" (not "Free Quote")
- LCP < 2.5 seconds
- Perth-specific content and keywords throughout
- URL structure set for future content expansion

---

## Content / Copy Tone

### Voice
- Speak to homeowners directly ("you" / "your")
- Confident but not arrogant. Plain English.
- Consultative: "Let's work out what suits your space"
- NOT salesy: no "FREE quote NOW!!!" or urgency tactics
- Local Perth references welcome (weather, lifestyle)
- Write as if speaking to a couple — she's evaluating trust/communication, he's evaluating technical capability

### Key Messages
1. An insulated patio is genuine living space, not just shade
2. SolarSpan panels = roof + ceiling + insulation in one
3. We handle everything: design, engineering, council, build
4. Same team for patios + fencing + decking = one project, one contact
5. 1,200+ jobs, 59% repeat rate — the numbers speak

### Trust Signals (Research-Backed)
- Phone number with hours visible on every page (women make 80% of renovation decisions)
- Process/timeline section — $100K+ buyers prioritize process transparency
- Team photos with names — reduces "strangers in my home" anxiety
- Reviews mentioning communication quality, not just star ratings
- Lifestyle photos showing people using the space, not just empty structures

---

## Competitor Differentiation
- vs Stratco Outback: We're not a kit — every patio is custom designed
- vs cheap patio builders: Engineering-certified, proper footings, premium materials
- vs architect/builder: Specialist focus = faster, more efficient, better value
- vs EVERY Perth competitor: 3D scroll hero, zero-JS performance, app-like transitions

---

## Technical Product Knowledge

### Insulated Panels (SolarSpan by Bondor)
| Thickness | R-Value | Best For |
|-----------|---------|----------|
| 50mm | R1.2 | Standard patios, carports |
| 75mm | R1.8 | Larger spans, better insulation |
| 100mm | R2.4 | Maximum comfort, longest spans |

### Roof Styles
- **Flat/Skillion:** Modern lines, slopes away from house. Most popular.
- **Gable:** Peaked roof, adds height, suits federation homes.
- **Flyover:** Above existing roofline, open and airy.
- **Freestanding:** Standalone — poolside pavilions, outdoor kitchens.

### Cost Estimator
- Base rate: ~$650/m2
- Gable multiplier: 1.25x
- Hip multiplier: 1.35x
- Freestanding multiplier: 1.15x
- Show range ±15%, rounded to nearest $500

### Colorbond Colours
Surfmist, Classic Cream, Paperbark, Shale Grey, Dune, Basalt, Woodland Grey, Monument, Night Sky

---

## File Structure

```
secureworks-website/
├── CLAUDE.md                    (this file)
├── IMPLEMENTATION-PLAN.md       (build phases and dependency graph)
├── astro.config.mjs
├── package.json
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro     (header, footer, nav, meta, View Transitions)
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── ServicesGrid.astro
│   │   ├── MultiStepForm.astro  (island — ships JS)
│   │   ├── ProjectGallery.astro
│   │   ├── Testimonials.astro
│   │   ├── ProcessTimeline.astro
│   │   ├── FAQ.astro            (island — ships JS)
│   │   ├── Stats.astro
│   │   └── ScrollReveal.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── projects.astro
│   │   ├── patios-perth/
│   │   ├── fencing-perth/
│   │   └── decking-perth/
│   ├── content/
│   │   └── services/            (markdown for each service page)
│   ├── styles/
│   │   └── global.css           (brand variables, base styles, animations)
│   └── scripts/
│       ├── animations.js        (GSAP + ScrollTrigger + Lenis setup)
│       └── form.js              (multi-step form logic)
├── public/
│   ├── images/
│   ├── frames/                  (3D scroll WEBP frames)
│   └── video/
└── workers/
    └── form-proxy.js            (Cloudflare Worker for GHL webhook)
```

---

## Related Projects
- **Landing pages:** ~/Projects/secureworks-site/ (keep separate — Google Ads conversion history)
- **Patio scoping tool:** https://marninms98-dotcom.github.io/patio/
- **Fencing scoping tool:** https://marninms98-dotcom.github.io/fence-designer/
- **Research vault:** ~/Library/Mobile Documents/iCloud~md~obsidian/Documents/WEBSITE RESEARCH/

---

## AI Notes
- Perth, Western Australia — all references WA-specific
- Wind region: N2 standard suburban, N3 coastal
- Climate: Hot dry summers, mild wet winters
- Marnin is CEO, not a developer — keep code clean and well-commented
- This is an Astro project — DO NOT use React/Vue/Svelte unless explicitly needed as an island
- Prefer .astro components over framework components
- All interactive components must be islands (client:visible or client:load)
- Images must be WebP, lazy-loaded below fold
