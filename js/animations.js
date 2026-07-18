/**
 * animations.js
 * Lightweight, dependency-free scroll animations: animated counters for the
 * "Impact Metrics" section. Uses requestAnimationFrame for smooth counting
 * and IntersectionObserver so counters only run once, when scrolled into view.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCounters();
});

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;

    if (prefersReducedMotion) {
      el.textContent = `${target.toLocaleString()}+`;
      return;
    }

    const duration = 1800;
    let startTimestamp = null;

    const step = (timestamp) => {
      if (startTimestamp === null) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // ease-out for a natural deceleration toward the final value
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = `${value.toLocaleString()}+`;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = `${target.toLocaleString()}+`;
      }
    };

    window.requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}
