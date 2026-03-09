/* ============================================
   SecureWorks WA — Animation System
   Lenis smooth scroll + GSAP ScrollTrigger
   ============================================ */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* --- Lenis Smooth Scroll --- */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

// Sync Lenis with GSAP's ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Update ScrollTrigger when Lenis scrolls
lenis.on('scroll', ScrollTrigger.update);

/* --- Scroll Reveal Animations --- */

/**
 * Initialise all scroll-triggered animations.
 * GSAP.from() sets the initial hidden state via JS (not CSS),
 * so content stays visible if JS fails to load.
 */
function initAnimations() {
  // Animate elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach((el) => {
    const type = el.getAttribute('data-animate') || 'fade-up';
    const delay = parseFloat(el.getAttribute('data-delay') || '0');

    // Build the 'from' state based on animation type
    const fromVars = { opacity: 0 };
    switch (type) {
      case 'fade-up':
        fromVars.y = 30;
        break;
      case 'fade-in':
        break;
      case 'slide-left':
        fromVars.x = -30;
        break;
      case 'slide-right':
        fromVars.x = 30;
        break;
    }

    gsap.from(el, {
      ...fromVars,
      duration: 0.8,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Stagger children — parent has data-stagger attribute
  document.querySelectorAll('[data-stagger]').forEach((parent) => {
    const staggerDelay = parseFloat(parent.getAttribute('data-stagger') || '0.1');

    gsap.from(parent.children, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: staggerDelay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: parent,
        start: 'top 85%',
        once: true,
      },
    });
  });
}

/* --- View Transitions Cleanup --- */

// Kill ScrollTrigger instances before Astro swaps the page (prevents memory leaks)
document.addEventListener('astro:before-swap', () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});

// Re-initialise animations after View Transitions swap
document.addEventListener('astro:after-swap', () => {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    initAnimations();
  });
});

/* --- Initial Load --- */
// Astro scripts are type="module" so they run after DOM is parsed
initAnimations();
