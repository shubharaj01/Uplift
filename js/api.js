/**
 * api.js
 * Task 5 requirement: Fetch API usage against a free public API, with
 * graceful fallback content if the API is unreachable.
 *
 * Source: Quotable (https://api.quotable.io) — a free, no-key-required
 * quotes API. We request a short inspirational quote to power the
 * "Daily Inspiration" section.
 */

const QUOTE_API_URL = 'https://api.quotable.io/random?tags=inspirational|motivational&maxLength=140';
const QUOTE_FETCH_TIMEOUT_MS = 6000;

// Graceful fallback used if the API is slow, offline, or returns an error.
const FALLBACK_QUOTES = [
  { content: 'We are the architects of the future we choose to build.', author: 'Uplift Community' },
  { content: 'Small actions, repeated with care, become lasting change.', author: 'Uplift Community' },
  { content: 'No one can do everything, but everyone can do something.', author: 'Anonymous Volunteer' },
  { content: 'Community is what happens when people decide to show up for each other.', author: 'Uplift Community' },
  { content: 'Progress is a rhythm, not a race — keep showing up.', author: 'Uplift Community' },
];

document.addEventListener('DOMContentLoaded', () => {
  const quoteTextEl = document.getElementById('quoteText');
  const quoteAuthorEl = document.getElementById('quoteAuthor');
  const refreshBtn = document.getElementById('quoteRefreshBtn');

  if (!quoteTextEl || !quoteAuthorEl) return;

  loadQuote(quoteTextEl, quoteAuthorEl);

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => loadQuote(quoteTextEl, quoteAuthorEl));
  }
});

async function loadQuote(quoteTextEl, quoteAuthorEl) {
  setLoadingState(quoteTextEl, quoteAuthorEl);

  try {
    const data = await fetchWithTimeout(QUOTE_API_URL, QUOTE_FETCH_TIMEOUT_MS);
    renderQuote(quoteTextEl, quoteAuthorEl, data.content, data.author);
  } catch (error) {
    // Graceful fallback: never leave the widget empty or broken.
    console.warn('Quotable API unavailable, using fallback quote:', error);
    const fallback = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
    renderQuote(quoteTextEl, quoteAuthorEl, fallback.content, fallback.author);
  }
}

function setLoadingState(quoteTextEl, quoteAuthorEl) {
  quoteTextEl.textContent = "Loading today's quote…";
  quoteTextEl.classList.add('quote-loading');
  quoteAuthorEl.textContent = '—';
}

function renderQuote(quoteTextEl, quoteAuthorEl, content, author) {
  quoteTextEl.classList.remove('quote-loading');
  quoteTextEl.textContent = `\u201C${content}\u201D`;
  quoteAuthorEl.textContent = `— ${author}`;
}

/**
 * fetch() wrapped with an AbortController-based timeout so a hung
 * request doesn't leave the widget stuck on "Loading…" indefinitely.
 */
async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}
