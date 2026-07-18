/**
 * main.js
 * Core interactivity: icon rendering, sticky navbar shadow, mobile nav
 * auto-close, the "Choose Your Catalyst" impact selector, and the
 * campaigns gallery filter.
 */

document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initNavbarScrollShadow();
  initMobileNavAutoClose();
  initImpactSelector();
  initGalleryFilter();
});

/* ---------------------------------------------------------------------- */
/* Lucide icons                                                           */
/* ---------------------------------------------------------------------- */
function initIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

/* ---------------------------------------------------------------------- */
/* Sticky navbar shadow on scroll                                         */
/* ---------------------------------------------------------------------- */
function initNavbarScrollShadow() {
  const nav = document.querySelector('.uplift-navbar');
  if (!nav) return;

  const toggleShadow = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  toggleShadow();
  window.addEventListener('scroll', toggleShadow, { passive: true });
}

/* ---------------------------------------------------------------------- */
/* Close the mobile menu after a nav link is tapped                       */
/* ---------------------------------------------------------------------- */
function initMobileNavAutoClose() {
  const collapseEl = document.getElementById('navMain');
  if (!collapseEl || !window.bootstrap) return;

  const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });

  collapseEl.querySelectorAll('.nav-link, .btn-uplift-primary').forEach((link) => {
    link.addEventListener('click', () => {
      if (collapseEl.classList.contains('show')) {
        bsCollapse.hide();
      }
    });
  });
}

/* ---------------------------------------------------------------------- */
/* Impact selector — "Choose Your Catalyst"                               */
/* Task 4 requirement: meaningful JS interactivity                        */
/* ---------------------------------------------------------------------- */
const CATALYST_CONTENT = {
  volunteer: {
    title: 'Open Volunteer Opportunities',
    body: 'From weekend well-repair crews to after-school tutoring, our current volunteer slots span every skill level. Most roles need just 3–5 hours a month, and remote options are available for research and design support.',
    cta: { label: 'Register as a Volunteer', href: '#volunteer-form' },
  },
  donate: {
    title: 'Where Your Donation Goes',
    body: 'Every campaign publishes a transparent cost breakdown before it launches. Recurring monthly gifts help fund long-term maintenance — like well upkeep and clinic staffing — that one-time donations can\'t always cover.',
    cta: { label: 'View Active Campaigns', href: '#campaigns' },
  },
  advocate: {
    title: 'Amplify Community Voices',
    body: 'Advocates help turn field reports into stories people actually read: social copy, short-form video scripts, and translation support. No prior nonprofit experience required — just a willingness to listen first.',
    cta: { label: 'Share a Story', href: '#testimonial' },
  },
};

function initImpactSelector() {
  const group = document.getElementById('catalystGroup');
  const panel = document.getElementById('impact-detail-panel');
  if (!group || !panel) return;

  const buttons = Array.from(group.querySelectorAll('[data-catalyst]'));

  const renderPanel = (key) => {
    const content = CATALYST_CONTENT[key];
    if (!content) return;

    panel.innerHTML = `
      <h3 class="h4 mb-3">${content.title}</h3>
      <p class="mb-4">${content.body}</p>
      <a href="${content.cta.href}" class="btn-uplift-primary">${content.cta.label}</a>
    `;
  };

  const setActive = (key) => {
    buttons.forEach((btn) => {
      const isActive = btn.dataset.catalyst === key;
      btn.setAttribute('aria-pressed', String(isActive));
    });
    renderPanel(key);
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => setActive(btn.dataset.catalyst));
  });

  // Default state on load
  setActive('volunteer');
}

/* ---------------------------------------------------------------------- */
/* Campaigns gallery filter                                               */
/* Task 4 requirement: gallery filtering                                  */
/* ---------------------------------------------------------------------- */
function initGalleryFilter() {
  const filterBar = document.querySelector('.gallery-filters');
  const grid = document.getElementById('galleryGrid');
  const emptyMessage = document.getElementById('galleryEmptyMessage');
  if (!filterBar || !grid) return;

  const chips = Array.from(filterBar.querySelectorAll('[data-filter]'));
  const items = Array.from(grid.querySelectorAll('.gallery-col'));

  const applyFilter = (filter) => {
    let visibleCount = 0;

    items.forEach((item) => {
      const matches = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('d-none', !matches);
      if (matches) visibleCount += 1;
    });

    if (emptyMessage) {
      emptyMessage.classList.toggle('d-none', visibleCount > 0);
    }
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      applyFilter(chip.dataset.filter);
    });
  });
}
