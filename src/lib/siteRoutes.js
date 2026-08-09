// Single source of truth for static route paths — consumed by react-router.config.js
// (prerender list) and scripts/generate-seo-files.mjs (sitemap), so they can't drift.
// Product detail routes (/shop/:id) are appended separately from VZ_DATA.products.

export const STATIC_ROUTES = [
  { path: '/', lastmod: '2026-07-08' },
  { path: '/shop', lastmod: '2026-07-08' },
  { path: '/bulk-party-gifting', lastmod: '2026-07-08' },
  { path: '/custom-orders', lastmod: '2026-07-08' },
  { path: '/our-story', lastmod: '2026-07-08' },
  { path: '/faq', lastmod: '2026-07-08' },
];
