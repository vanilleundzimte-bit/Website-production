// Generates sitemap.xml into build/client from the same route manifest used by
// react-router.config.js's prerender list, so the sitemap can't drift from the
// pages that actually got built.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { VZ_DATA } from '../src/data/products.js';
import { STATIC_ROUTES } from '../src/lib/siteRoutes.js';
import { SITE_URL } from '../src/lib/siteConfig.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'build', 'client');

const PRODUCT_LASTMOD = '2026-07-08';

const urls = [
  ...STATIC_ROUTES.map(r => ({ loc: r.path, lastmod: r.lastmod })),
  ...VZ_DATA.products.map(p => ({ loc: `/shop/${p.id}`, lastmod: PRODUCT_LASTMOD })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>
`;

if (!fs.existsSync(OUT_DIR)) {
  console.error(`[generate-seo-files] ${OUT_DIR} does not exist — run the build first.`);
  process.exit(1);
}

fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), xml, 'utf-8');
console.log(`[generate-seo-files] wrote sitemap.xml with ${urls.length} URLs`);
