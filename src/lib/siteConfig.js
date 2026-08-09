export const SITE_URL = 'https://vanillezimte.com';
export const SITE_NAME = 'vanille & zimté';
export const SITE_TAGLINE = 'Baked with intention. Free from compromise.';

export const BUSINESS = {
  name: 'vanille & zimté',
  telephone: '+919599611077',
  email: 'vanilleundzimte@gmail.com',
  instagram: 'vanilleundzimte',
  city: 'Noida',
  areaServed: ['Noida', 'Delhi', 'New Delhi', 'Gurugram', 'Ghaziabad', 'Delhi NCR'],
};

// Fill these in once obtained — leave null to skip rendering the tag.
export const ANALYTICS = {
  ga4MeasurementId: null, // e.g. 'G-XXXXXXXXXX'
  googleSiteVerification: null,
  bingSiteVerification: null,
};

// Per-route canonical <link> meta descriptor — every route's meta() should
// include one pointing at its own path, since a shared/wrong canonical can
// tell crawlers every page is a duplicate of another.
export function canonicalTag(path) {
  return { tagName: 'link', rel: 'canonical', href: `${SITE_URL}${path}` };
}

// Open Graph/Twitter tags every route's meta() should spread in. React Router
// only renders the deepest matched route's meta() array — root.jsx's meta()
// is dropped entirely once a child route defines its own — so these can't
// live at the root alone and have to be repeated on every route.
export function socialMetaTags({ title, description }) {
  return [
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: `${SITE_URL}/assets/logo-full.png` },
    { property: 'og:image:width', content: '900' },
    { property: 'og:image:height', content: '760' },
    { property: 'og:image:alt', content: `${SITE_NAME} — gluten-free baking` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ];
}
