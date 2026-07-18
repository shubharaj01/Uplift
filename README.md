# Uplift — Together We Build Tomorrow.

Uplift is a fictional community impact platform that connects volunteers, donors,
and communities around the local projects that need them most. This repository
contains a complete, static frontend build of the Uplift marketing site.

> This is a portfolio / internship demonstration project. There is no backend,
> no authentication, and no real donation processing — all interactivity runs
> entirely in the browser.

---

## Project Overview

Uplift aims to feel like a premium modern product rather than a traditional
NGO website: calm, warm, editorial, and confident. The single-page site walks
a visitor from an emotional hero moment, through concrete ways to get
involved, into proof of impact (metrics, stories, an active campaign
gallery), and finally into a low-friction volunteer registration form.

## Features

- **Semantic, accessible markup** — proper landmark elements (`header`,
  `main`, `section`, `footer`), one `<h1>` per page, a logical heading
  hierarchy, a skip-to-content link, and ARIA labelling on interactive
  groups (impact selector, gallery filters, accordion).
- **Fully responsive layout** — mobile-first Bootstrap grid with custom
  breakpoint refinements for tablet and desktop (see `scss/_responsive.scss`),
  not just a single stacked column at every width.
- **"Choose Your Catalyst" impact selector** — clicking Volunteer / Donate /
  Advocate swaps a detail panel via JavaScript (`js/main.js`).
- **Campaigns gallery with live filtering** — filter chips narrow the
  campaign grid by category (Water, Education, Health, Shelter, Food,
  Environment) with no page reload.
- **Animated impact counters** — numbers count up once the metrics section
  scrolls into view, using `IntersectionObserver` + `requestAnimationFrame`
  (`js/animations.js`). Respects `prefers-reduced-motion`.
- **Fetch API integration** — the "Daily Inspiration" section pulls a random
  quote from the free [Quotable](https://api.quotable.io) API, with a
  built-in timeout and a curated fallback quote list if the API is slow or
  unreachable (`js/api.js`).
- **Volunteer registration form** — client-side validation (no backend) for
  name, email, phone, interest, and message, with inline error messages and
  a success banner (`js/form.js`).
- **FAQ accordion** — built with Bootstrap's accordion component.
- **One isolated inline-CSS demonstration** — the "This Month's Spotlight"
  banner intentionally uses the `style=""` attribute directly in
  `index.html` (clearly commented) to satisfy that specific requirement,
  without affecting the maintainability of the rest of the stylesheet.

## Technologies Used

| Layer       | Choice                                   |
|-------------|-------------------------------------------|
| Markup      | Semantic HTML5                            |
| Styling     | Sass (SCSS) → compiled CSS, Bootstrap 5    |
| Interactivity | Vanilla JavaScript (ES6+), no frameworks |
| Data        | Fetch API (Quotable, with fallback)       |
| Icons       | [Lucide](https://lucide.dev) (via CDN)    |
| Fonts       | Google Fonts — Manrope & Plus Jakarta Sans |

No React, Vue, Angular, or Next.js. No build tooling is required to run the
site — open `index.html` directly or serve it with Live Server.

## Folder Structure

```
Uplift/
├── index.html
├── README.md
├── assets/
│   ├── images/        # Original hand-authored SVG illustrations
│   ├── icons/          # Favicon
│   └── fonts/          # (Google Fonts are loaded via CDN; empty by default)
├── css/
│   └── style.css       # Compiled output of scss/main.scss
├── scss/
│   ├── _variables.scss  # Design tokens: color, type, spacing, radii
│   ├── _mixins.scss     # Reusable mixins (breakpoints, glass, buttons…)
│   ├── _base.scss       # Resets and global element defaults
│   ├── _components.scss # Navbar, buttons, cards, chips, forms, accordion
│   ├── _sections.scss   # Per-section layout and styling
│   ├── _responsive.scss # Breakpoint-specific refinements
│   └── main.scss        # Entry point that forwards all partials
└── js/
    ├── main.js        # Navbar, impact selector, gallery filter, icons
    ├── api.js          # Fetch API + graceful fallback (quote widget)
    ├── form.js         # Volunteer form validation
    └── animations.js   # Scroll-triggered animated counters
```

## Setup Instructions

No installation is required to view the site:

1. Download or clone this folder.
2. Open `index.html` directly in a browser, **or** right-click it and choose
   "Open with Live Server" in VS Code for auto-reload during development.
3. An internet connection is needed for Google Fonts, Bootstrap, Lucide
   icons (loaded via CDN), and the live quote API — the quote widget will
   fall back to a local quote automatically if that request fails.

### Editing the styles

The stylesheet is authored in Sass. If you have Dart Sass installed:

```bash
# one-time build
sass scss/main.scss css/style.css --style=expanded

# rebuild automatically while editing
sass --watch scss/main.scss:css/style.css
```

`css/style.css` is committed pre-compiled, so the site works immediately
without running Sass — only rebuild it if you change a `.scss` partial.

## Internship Task Mapping

| # | Requirement | Where it's satisfied |
|---|-------------|------------------------|
| 1 | Semantic HTML | `index.html` — `header`, `nav`, `main`, `section[aria-labelledby]`, `figure`/`figcaption`, `footer` |
| 2 | Isolated inline-CSS demo | The "Spotlight Campaign" banner in `index.html` (clearly commented) |
| 3 | Fully responsive (desktop/tablet/mobile) | Bootstrap grid + `scss/_responsive.scss` breakpoint rules |
| 4 | Meaningful JS interactivity | Impact selector, gallery filter, FAQ accordion, animated counters, mobile nav — all in `js/` |
| 5 | Fetch API with fallback | `js/api.js` — Quotable API with timeout + local fallback quotes |
| 6 | Volunteer form + validation | `js/form.js` + the form in `index.html` (`#volunteer-form`) |
| 7 | Bootstrap (grid, navbar, cards, accordion, utilities) | Used throughout `index.html` |
| 8 | Sass architecture (variables/mixins/base/components/sections/responsive) | `scss/` folder, compiled into `css/style.css` |

## Accessibility Notes

- All images carry descriptive `alt` text; purely decorative flourishes are
  marked `aria-hidden`.
- Heading levels descend logically (`h1` → `h2` → `h3`) with no skipped
  levels.
- Interactive groups (impact selector, gallery filters) use
  `role="group"`/`aria-label` and `aria-pressed` where appropriate.
- Focus states are visible on every interactive element, and a skip link
  is provided for keyboard users.
- Color combinations were chosen to maintain readable contrast against the
  periwinkle/indigo primary color.

## Credits & Notes

- All illustrations in `assets/images/` and the favicon are original SVGs
  created for this project.
- "Uplift," its content, and its fictional volunteers (e.g., Amara Osei) are
  invented for demonstration purposes only.
